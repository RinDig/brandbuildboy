import { NextResponse } from "next/server";
import { spawn } from "child_process";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function collectOutput(stream: NodeJS.ReadableStream) {
  let data = "";
  stream.on("data", (chunk) => {
    data += chunk.toString();
  });
  return () => data;
}

export async function POST(request: Request) {
  const body = await request.json();
  const website = body?.website?.toString().trim();

  if (!website) {
    return NextResponse.json(
      { error: "Website is required." },
      { status: 400 }
    );
  }

  const pythonBin =
    process.env.PYTHON_BIN || (process.platform === "win32" ? "python" : "python3");
  const child = spawn(
    pythonBin,
    ["-m", "agent.discover_cli", "--website", website],
    { cwd: process.cwd(), env: process.env }
  );

  const getStdout = collectOutput(child.stdout);
  const getStderr = collectOutput(child.stderr);

  const exitCode: number = await new Promise((resolve) => {
    child.on("close", resolve);
  });

  const stdout = getStdout();
  const stderr = getStderr();

  if (exitCode !== 0) {
    return NextResponse.json(
      { error: "Discovery failed", details: stderr || stdout },
      { status: 500 }
    );
  }

  try {
    const data = JSON.parse(stdout);
    return NextResponse.json({ categories: data });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid discovery output", details: stdout },
      { status: 500 }
    );
  }
}
