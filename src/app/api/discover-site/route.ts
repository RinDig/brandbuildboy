import { NextResponse } from "next/server";
import { runPythonCommand } from "@/lib/runPython";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const website = body?.website?.toString().trim();

  if (!website) {
    return NextResponse.json(
      { error: "Website is required." },
      { status: 400 }
    );
  }

  const { exitCode, stdout, stderr } = await runPythonCommand([
    "-m",
    "agent.discover_cli",
    "--website",
    website,
  ]);

  if (exitCode !== 0) {
    return NextResponse.json(
      { error: "Discovery failed", details: stderr || stdout },
      { status: 500 }
    );
  }

  try {
    const data = JSON.parse(stdout);
    return NextResponse.json({ categories: data });
  } catch {
    return NextResponse.json(
      { error: "Invalid discovery output", details: stdout },
      { status: 500 }
    );
  }
}
