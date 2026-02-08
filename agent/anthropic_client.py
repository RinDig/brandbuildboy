from __future__ import annotations

import json

from anthropic import Anthropic


def parse_json(text: str) -> dict:
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1:
            return json.loads(text[start : end + 1])
        raise


class AnthropicClient:
    def __init__(self, api_key: str, model: str, temperature: float, max_output_tokens: int):
        self.client = Anthropic(api_key=api_key)
        self.model = model
        self.temperature = temperature
        self.max_output_tokens = max_output_tokens

    def generate_json(self, system_prompt: str, user_prompt: str) -> dict:
        response = self.client.messages.create(
            model=self.model,
            max_tokens=self.max_output_tokens,
            temperature=self.temperature,
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

        return parse_json(text)
