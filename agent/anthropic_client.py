from __future__ import annotations

import json

from anthropic import Anthropic

MAX_JSON_PARSE_RETRIES = 2
RETRY_INSTRUCTION = (
    "Your previous response was not valid JSON. Return ONLY valid JSON."
    " Do not include markdown fences, explanations, or comments."
    " Use double quotes for keys and string values, and do not use trailing commas."
)


def strip_code_fence(text: str) -> str:
    cleaned = text.strip()
    if not cleaned.startswith("```"):
        return cleaned
    lines = cleaned.splitlines()
    if len(lines) >= 3 and lines[0].startswith("```") and lines[-1].startswith("```"):
        return "\n".join(lines[1:-1]).strip()
    return cleaned


def parse_json(text: str) -> dict:
    cleaned = strip_code_fence(text)
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as first_error:
        start = cleaned.find("{")
        end = cleaned.rfind("}")
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(cleaned[start : end + 1])
            except json.JSONDecodeError as second_error:
                raise ValueError(f"Invalid JSON from model: {second_error}") from second_error
        raise ValueError(f"Non-JSON model response: {first_error}") from first_error


class AnthropicClient:
    def __init__(
        self,
        api_key: str,
        model: str,
        temperature: float,
        max_output_tokens: int,
        parse_retries: int = MAX_JSON_PARSE_RETRIES,
    ):
        self.client = Anthropic(api_key=api_key)
        self.model = model
        self.temperature = temperature
        self.max_output_tokens = max_output_tokens
        self.parse_retries = max(0, parse_retries)

    def _request_text(
        self, system_prompt: str, user_prompt: str, temperature: float | None = None
    ) -> str:
        response = self.client.messages.create(
            model=self.model,
            max_tokens=self.max_output_tokens,
            temperature=self.temperature if temperature is None else temperature,
            system=system_prompt.strip(),
            messages=[
                {
                    "role": "user",
                    "content": [{"type": "text", "text": user_prompt.strip()}],
                }
            ],
        )

        chunks = []
        for block in response.content:
            if getattr(block, "type", "") == "text":
                chunks.append(getattr(block, "text", ""))

        text = "\n".join(chunks).strip()
        if not text:
            raise ValueError("Anthropic response had no text content")
        return text

    def generate_json(self, system_prompt: str, user_prompt: str) -> dict:
        base_prompt = user_prompt.strip()
        text = self._request_text(system_prompt, base_prompt)
        last_error: Exception | None = None

        for attempt in range(self.parse_retries + 1):
            try:
                return parse_json(text)
            except Exception as err:
                last_error = err
                if attempt >= self.parse_retries:
                    break
                retry_prompt = (
                    f"{base_prompt}\n\n"
                    f"{RETRY_INSTRUCTION}\n"
                    f"Previous parse error: {err}\n"
                    "Re-output the full JSON object now."
                )
                text = self._request_text(system_prompt, retry_prompt, temperature=0.0)

        preview = text[:1200].replace("\n", " ")
        raise ValueError(
            "Failed to parse Anthropic JSON after "
            f"{self.parse_retries + 1} attempts: {last_error}. "
            f"Response preview: {preview}"
        )
