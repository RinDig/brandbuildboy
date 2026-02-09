import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { runPythonCommand } from "@/lib/runPython";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseLinks(raw: string | null) {
  if (!raw) return [];
  return raw
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const company = formData.get("company")?.toString().trim();
  const sector = formData.get("sector")?.toString().trim();
  const brand = (formData.get("brand")?.toString().trim().toLowerCase() || "eduba")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "eduba";
  const slug = formData.get("slug")?.toString().trim();
  const website = formData.get("website")?.toString().trim();
  const context = formData.get("context")?.toString().trim() || "";
  const links = parseLinks(formData.get("links")?.toString() || "");
  const autoLinks = formData
    .getAll("autoLink")
    .map((item) => item.toString().trim())
    .filter(Boolean);
  const include = formData.getAll("include").map((item) => item.toString());
  const exclude = parseLinks(formData.get("exclude")?.toString() || "");
  const documents = formData.getAll("documents").filter((file) => file instanceof File) as File[];

  if (!company || !sector) {
    return NextResponse.json(
      { error: "Company and sector are required." },
      { status: 400 }
    );
  }

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "eduba-create-"));
  const docPaths: string[] = [];

  try {
    for (const file of documents) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filename = file.name || `document-${docPaths.length + 1}`;
      const filePath = path.join(tmpDir, filename);
      await fs.writeFile(filePath, buffer);
      docPaths.push(filePath);
    }

    const args = [
      "-m",
      "agent.cli",
      "--company",
      company,
      "--sector",
      sector,
      "--brand",
      brand,
      "--context",
      context,
    ];

    if (slug) {
      args.push("--slug", slug);
    }

    if (website) {
      args.push("--website", website);
    }

    include.forEach((category) => args.push("--include", category));
    exclude.forEach((pattern) => args.push("--exclude", pattern));

    docPaths.forEach((doc) => args.push("--doc", doc));
    [...new Set([...links, ...autoLinks])].forEach((link) =>
      args.push("--link", link)
    );

    const { exitCode, stdout, stderr } = await runPythonCommand(args);

    if (exitCode !== 0) {
      const details = stderr || stdout;
      console.error(
        "[create-page] agent failed",
        JSON.stringify(
          {
            exitCode,
            brand,
            company,
            sector,
            slug: slug || null,
            website: website || null,
            detailsPreview: details.slice(0, 4000),
          },
          null,
          2
        )
      );
      return NextResponse.json(
        { error: "Agent run failed", details },
        { status: 500 }
      );
    }

    const publishedLine = stdout
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line.startsWith("Published:"));
    const url = publishedLine ? publishedLine.replace("Published:", "").trim() : null;

    return NextResponse.json({ url, output: stdout });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[create-page] unhandled error", error);
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
}
