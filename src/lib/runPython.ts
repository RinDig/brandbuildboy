import "server-only";

import { spawn } from "child_process";

export interface PythonRunResult {
  bin: string;
  exitCode: number;
  stdout: string;
  stderr: string;
}

function getPythonCandidates(): string[] {
  const explicit = process.env.PYTHON_BIN?.trim();
  const defaults =
    process.platform === "win32"
      ? ["python", "py", "python3"]
      : ["python3", "python"];
  if (!explicit) return defaults;
  return Array.from(new Set([explicit, ...defaults]));
}

function runWithBin(bin: string, args: string[]): Promise<PythonRunResult | null> {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, { cwd: process.cwd(), env: process.env });
    let stdout = "";
    let stderr = "";
    let settled = false;

    const finish = (value: PythonRunResult | null) => {
      if (!settled) {
        settled = true;
        resolve(value);
      }
    };

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      const err = error as NodeJS.ErrnoException;
      if (err.code === "ENOENT") {
        finish(null);
        return;
      }
      if (!settled) {
        settled = true;
        reject(error);
      }
    });
    child.on("close", (code) => {
      finish({
        bin,
        exitCode: code ?? 1,
        stdout,
        stderr,
      });
    });
  });
}

export async function runPythonCommand(args: string[]): Promise<PythonRunResult> {
  const candidates = getPythonCandidates();
  for (const bin of candidates) {
    const result = await runWithBin(bin, args);
    if (result) return result;
  }
  throw new Error(
    `No Python runtime found. Tried: ${candidates.join(", ")}`
  );
}
