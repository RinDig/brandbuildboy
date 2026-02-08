"use client";

import { useState } from "react";
import { Layout } from "@/components/Layout";
import styles from "@/app/create-page/page.module.scss";
import { getBrandTheme } from "@/lib/brands";

const defaultSector = "Enterprise";

interface CreatePageFormProps {
  brandKey?: string;
}

interface QuickFormDefaults {
  companyName: string;
  productName: string;
  sectorLabel: string;
  subtitle: string;
  contextPlaceholder: string;
}

function getQuickFormDefaults(brand: string): QuickFormDefaults {
  if (brand === "vigilore" || brand === "armetor") {
    return {
      companyName: "Armetor",
      productName: "VigilOre",
      sectorLabel: "Mining Compliance and Loss Prevention",
      subtitle:
        "Paste a meeting summary and optional website. We will generate a VigilOre-focused sector page aligned to Armetor positioning.",
      contextPlaceholder:
        "Example: Ministry meeting discussed rapid pilot in one mining region, focus on revenue recovery, audit cycle reduction, and dashboard visibility for regulators.",
    };
  }

  return {
    companyName: "",
    productName: "",
    sectorLabel: defaultSector,
    subtitle:
      "Paste a strong meeting summary and optional website. The agent will generate and publish a branded sector page.",
    contextPlaceholder:
      "Paste key discussion points, goals, constraints, and outcomes.",
  };
}

export function CreatePageForm({ brandKey = "eduba" }: CreatePageFormProps) {
  const brand = getBrandTheme(brandKey);
  const defaults = getQuickFormDefaults(brand.key);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("brand", brand.key);

    const productName = formData.get("product")?.toString().trim();
    const context = formData.get("context")?.toString().trim() || "";
    if (productName) {
      const productContext = `Product focus: ${productName}`;
      formData.set("context", context ? `${productContext}\n\n${context}` : productContext);
    }

    const sector = formData.get("sector")?.toString().trim();
    formData.set("sector", sector || defaults.sectorLabel);

    try {
      const response = await fetch("/api/create-page", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setStatus("error");
        setError(data.error || "Failed to generate page");
        return;
      }

      setStatus("success");
      setResult(data.url || "Page created. Check the logs for details.");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  return (
    <Layout brandKey={brand.key}>
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.kicker}>CREATE PAGE</div>
          <h1 className={styles.title}>Build a branded page fast</h1>
          <p className={styles.subtitle}>{defaults.subtitle}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="hidden" name="brand" value={brand.key} />
          <div className={styles.section}>
            <div className={styles.sectionMeta}>
              <span>001</span>
              <span className={styles.sectionSlash}>/</span>
              <span>CORE INPUTS</span>
            </div>
            <div className={styles.sectionBody}>
              <label className={styles.label}>
                Company name
                <input
                  name="company"
                  className={styles.input}
                  placeholder="Armetor"
                  defaultValue={defaults.companyName}
                  required
                />
              </label>
              <label className={styles.label}>
                Product / solution name (optional)
                <input
                  name="product"
                  className={styles.input}
                  placeholder="VigilOre"
                  defaultValue={defaults.productName}
                />
              </label>
              <label className={styles.label}>
                Company website (optional, enables quick web scrape)
                <input
                  name="website"
                  className={styles.input}
                  placeholder="https://company.com"
                />
              </label>
              <label className={styles.label}>
                Meeting summary / prompt
                <textarea
                  name="context"
                  className={styles.textarea}
                  placeholder={defaults.contextPlaceholder}
                  required
                />
              </label>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionMeta}>
              <span>002</span>
              <span className={styles.sectionSlash}>/</span>
              <span>ADVANCED (OPTIONAL)</span>
            </div>
            <div className={styles.sectionBody}>
              <details className={styles.advancedDetails}>
                <summary className={styles.advancedSummary}>
                  Expand advanced controls
                </summary>
                <div className={styles.advancedBody}>
                  <div className={styles.row}>
                    <label className={styles.label}>
                      Sector label
                      <input
                        name="sector"
                        className={styles.input}
                        defaultValue={defaults.sectorLabel}
                        placeholder="Mining Compliance and Loss Prevention"
                      />
                    </label>
                    <label className={styles.label}>
                      Custom slug (optional)
                      <input
                        name="slug"
                        className={styles.input}
                        placeholder="vigilore-national-rollout"
                      />
                    </label>
                  </div>
                  <label className={styles.label}>
                    Attach supporting documents
                    <input
                      type="file"
                      name="documents"
                      className={styles.fileInput}
                      multiple
                      accept=".pdf,.docx,.txt,.md"
                    />
                  </label>
                  <label className={styles.label}>
                    Links (one per line)
                    <textarea
                      name="links"
                      className={styles.textarea}
                      placeholder="https://example.com/case-study"
                    />
                  </label>
                  <label className={styles.label}>
                    Exclude URLs or keywords (one per line)
                    <textarea
                      name="exclude"
                      className={styles.textarea}
                      placeholder={`careers
press
https://example.com/old-post`}
                    />
                  </label>
                </div>
              </details>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Generating..." : "Generate Page"}
            </button>
            <p className={styles.helper}>
              The agent publishes to Sanity and returns a live preview URL.
            </p>
          </div>

          {status === "success" && result && (
            <div className={styles.result}>
              <span className={styles.resultLabel}>Published:</span>
              <a className={styles.resultLink} href={result} target="_blank">
                {result}
              </a>
            </div>
          )}
          {status === "error" && error && (
            <div className={styles.error}>{error}</div>
          )}
        </form>
      </div>
    </Layout>
  );
}
