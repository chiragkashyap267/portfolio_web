"use client";

import { useEffect, useState } from "react";

type Website = {
  title: string;
  description: string;
  platform: string;
  category?: string;
  image?: string;
  url: string;
};

function ensureHttps(url: string): string {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

export default function WebOnlyClient() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/websites", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setWebsites(Array.isArray(data) ? data : []))
      .catch(() => setWebsites([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.h1}>Websites I&apos;ve Built</h1>
        <p style={styles.subtitle}>
          A collection of live websites designed &amp; developed by{" "}
          <strong>Chirag Kashyap</strong> — WordPress, Shopify, and custom web
          projects.
        </p>
        <a href="/" style={styles.backLink}>
          ← Back to Portfolio
        </a>
      </div>

      {/* Grid */}
      <div style={styles.grid}>
        {loading && <p style={styles.msg}>Loading websites…</p>}

        {!loading && websites.length === 0 && (
          <p style={styles.msg}>No websites found.</p>
        )}

        {websites.map((site, i) => (
          <div key={i} style={styles.card}>
            {site.image && (
              <img
                src={site.image}
                alt={site.title}
                loading="lazy"
                style={styles.img}
              />
            )}

            <div style={styles.cardBody}>
              {/* Tags row */}
              <div style={styles.tagRow}>
                {site.platform && (
                  <span style={{ ...styles.tag, ...styles.tagPlatform }}>
                    {site.platform}
                  </span>
                )}
                {site.category && (
                  <span style={{ ...styles.tag, ...styles.tagCat }}>
                    {site.category}
                  </span>
                )}
              </div>

              <h2 style={styles.cardTitle}>{site.title}</h2>
              <p style={styles.cardDesc}>{site.description}</p>

              <a
                href={ensureHttps(site.url)}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.visitBtn}
              >
                Visit Website →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={{ margin: 0, color: "#888", fontSize: 13 }}>
          © {new Date().getFullYear()} Chirag Kashyap &nbsp;·&nbsp;{" "}
          <a href="/" style={styles.footerLink}>
            chiragkashyapwebdev.vercel.app
          </a>
        </p>
      </div>
    </div>
  );
}

/* ─── Plain inline styles — no Tailwind, no MUI ─── */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0d0d0d",
    color: "#e8e8e8",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    padding: "0 0 60px",
  },
  header: {
    maxWidth: 860,
    margin: "0 auto",
    padding: "60px 24px 40px",
    borderBottom: "1px solid #222",
  },
  h1: {
    fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
    fontWeight: 700,
    margin: "0 0 12px",
    color: "#fff",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: 15,
    color: "#aaa",
    margin: "0 0 20px",
    lineHeight: 1.6,
  },
  backLink: {
    display: "inline-block",
    fontSize: 13,
    color: "#00C896",
    textDecoration: "none",
    border: "1px solid rgba(0,200,150,0.35)",
    padding: "5px 14px",
    borderRadius: 6,
  },
  grid: {
    maxWidth: 1100,
    margin: "48px auto 0",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 24,
  },
  card: {
    backgroundColor: "#161616",
    border: "1px solid #2a2a2a",
    borderRadius: 10,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  img: {
    width: "100%",
    height: 195,
    objectFit: "cover",
    display: "block",
    borderBottom: "1px solid #222",
  },
  cardBody: {
    padding: "18px 20px 22px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: 10,
  },
  tagRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  tag: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 9px",
    borderRadius: 99,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  tagPlatform: {
    backgroundColor: "rgba(0,200,150,0.1)",
    color: "#00C896",
    border: "1px solid rgba(0,200,150,0.25)",
  },
  tagCat: {
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#888",
    border: "1px solid #2a2a2a",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
    color: "#fff",
    lineHeight: 1.3,
  },
  cardDesc: {
    fontSize: 13.5,
    color: "#888",
    margin: 0,
    lineHeight: 1.65,
    flex: 1,
  },
  visitBtn: {
    display: "inline-block",
    marginTop: 6,
    fontSize: 13,
    fontWeight: 600,
    color: "#fff",
    backgroundColor: "#00C896",
    padding: "8px 18px",
    borderRadius: 7,
    textDecoration: "none",
    alignSelf: "flex-start",
  },
  msg: {
    color: "#666",
    fontSize: 14,
    gridColumn: "1 / -1",
  },
  footer: {
    maxWidth: 1100,
    margin: "60px auto 0",
    padding: "24px 24px 0",
    borderTop: "1px solid #1e1e1e",
    textAlign: "center",
  },
  footerLink: {
    color: "#00C896",
    textDecoration: "none",
  },
};
