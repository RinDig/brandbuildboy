"use client";

import { useState } from "react";
import styles from "@/app/create-page/page.module.scss";

interface ChatFormProps {
  slug: string;
  title: string;
  pageTag: string;
  brandKey?: string;
}

export function ChatForm({
  slug,
  title,
  pageTag,
  brandKey = "eduba",
}: ChatFormProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [website, setWebsite] = useState("");
  const [discovering, setDiscovering] = useState(false);
  const [discoveryError, setDiscoveryError] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState<Record<string, string[]>>({});
  const [selectedPaths, setSelectedPaths] = useState<Record<string, boolean>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("slug", slug);
    formData.set("brand", brandKey);

    selectedPaths &&
      Object.entries(selectedPaths).forEach(([url, selected]) => {
        if (selected) {
          formData.append("autoLink", url);
        }
      });

    try {
      const response = await fetch("/api/sector-chat", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setStatus("error");
        setError(data.error || "Failed to update page");
        return;
      }

      setStatus("success");
      setResult(data.url || "Page updated. Check the logs for details.");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  const handleDiscover = async () => {
    if (!website) return;
    setDiscovering(true);
    setDiscoveryError(null);
    try {
      const response = await fetch("/api/discover-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website }),
      });
      const data = await response.json();
      if (!response.ok) {
        setDiscoveryError(data.error || "Failed to discover site paths");
        setDiscovering(false);
        return;
      }
      setDiscovered(data.categories || {});
      setSelectedPaths({});
    } catch (err) {
      setDiscoveryError(
        err instanceof Error ? err.message : "Unexpected discovery error"
      );
    } finally {
      setDiscovering(false);
    }
  };

  const togglePath = (url: string) => {
    setSelectedPaths((prev) => ({ ...prev, [url]: !prev[url] }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.kicker}>SECTOR CHAT</div>
        <h1 className={styles.title}>Refine {title}</h1>
        <p className={styles.subtitle}>
          Use the chat to tailor {pageTag.toLowerCase()} content, pricing, and
          positioning for this specific company.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="hidden" name="brand" value={brandKey} />
        <input type="hidden" name="sector" value={title} />
        <div className={styles.section}>
          <div className={styles.sectionMeta}>
            <span>001</span>
            <span className={styles.sectionSlash}>/</span>
            <span>INSTRUCTIONS</span>
          </div>
          <div className={styles.sectionBody}>
            <label className={styles.label}>
              Company website (optional)
              <input
                name="website"
                className={styles.input}
                placeholder="https://company.com"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </label>
            <label className={styles.label}>
              Instructions for the agent
              <textarea
                name="instructions"
                className={styles.textarea}
                placeholder="Example: Tighten the hero, emphasize regulatory requirements, adjust pricing for a mid-market team."
                required
              />
            </label>
            <label className={styles.label}>
              Additional context (optional)
              <textarea
                name="context"
                className={styles.textarea}
                placeholder="Paste extra notes, business goals, or constraints."
              />
            </label>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionMeta}>
            <span>002</span>
            <span className={styles.sectionSlash}>/</span>
            <span>SOURCES</span>
          </div>
          <div className={styles.sectionBody}>
            <div className={styles.discoveryRow}>
              <div className={styles.checkboxLabel}>Auto-pull discovery</div>
              <button
                type="button"
                className={styles.discoverButton}
                onClick={handleDiscover}
                disabled={!website || discovering}
              >
                {discovering ? "Discovering..." : "Discover Paths"}
              </button>
            </div>
            {discoveryError && (
              <div className={styles.discoveryError}>{discoveryError}</div>
            )}
            {Object.keys(discovered).length > 0 && (
              <div className={styles.discoveryGrid}>
                {Object.entries(discovered).map(([category, urls]) => (
                  <div key={category} className={styles.discoveryGroup}>
                    <div className={styles.discoveryTitle}>{category}</div>
                    {urls.length === 0 && (
                      <div className={styles.discoveryEmpty}>No links found.</div>
                    )}
                    {urls.map((url) => (
                      <label key={url} className={styles.checkboxItem}>
                        <input
                          type="checkbox"
                          checked={Boolean(selectedPaths[url])}
                          onChange={() => togglePath(url)}
                        />
                        <span>{url}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            )}
            <label className={styles.label}>
              Attach documents
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
                placeholder="https://example.com/market-brief"
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
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Updating..." : "Update Page"}
          </button>
          <p className={styles.helper}>
            This will overwrite the current sector content for {slug} in Sanity.
          </p>
        </div>

        {status === "success" && result && (
          <div className={styles.result}>
            <span className={styles.resultLabel}>Updated:</span>
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
  );
}
