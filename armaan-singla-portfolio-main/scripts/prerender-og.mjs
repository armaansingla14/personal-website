/*
 * Post-build prerender for per-route <head> metadata.
 *
 * This site is a client-rendered Vite SPA: every path is rewritten to
 * index.html, whose static <head> carries the homepage title/description/OG
 * tags. Google runs the JS and sees the per-route tags injected by
 * src/components/Seo.tsx, but non-JS crawlers (X, LinkedIn, Slack, Discord,
 * Facebook, and the raw pre-JS HTML any tool fetches) never do — so every
 * route looks like the homepage before hydration.
 *
 * Fix: after `vite build`, clone the built dist/index.html into a static
 * per-route file with that route's real <head>. Vercel serves these before the
 * SPA fallback (see vercel.json rewrites), and the SPA still boots normally
 * (same hashed bundle) so React Router renders the page.
 *
 * Runs as part of `npm run build` (see package.json / vercel.json buildCommand).
 * Zero dependencies. Keep PAGES in sync with the <Seo> props in src/pages/*.
 */
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve(process.cwd(), "dist");
const SITE_URL = "https://www.armaansingla.me";
const DEFAULT_IMAGE = `${SITE_URL}/og/og-default.png`;

// One entry per canonical route. `home: true` is served by index.html itself
// (no separate file is written) — it's here only so nothing references it by
// mistake. All non-home routes get a prerendered dist/<path>/index.html.
const PAGES = [
  { path: "/", home: true },
  {
    path: "/work",
    title: "Work | Armaan Singla",
    description:
      "Armaan Singla's work experience across software engineering, AI, security, and data, including AMD, Geotab, Scotiabank, and co-founding Ordinum.",
  },
  {
    path: "/projects",
    title: "Projects | Armaan Singla",
    description:
      "Engineering and AI projects by Armaan Singla, spanning machine learning, computer vision, agents, and full-stack applications.",
  },
  {
    path: "/writing",
    title: "Writing | Armaan Singla",
    description:
      "Essays by Armaan Singla on AI, intelligence, progress, and technology.",
  },
  {
    path: "/art",
    title: "Art | Armaan Singla",
    description:
      "A gallery of paintings, engravings, and photographs Armaan Singla keeps coming back to.",
  },
  {
    path: "/writing/riemann-hypothesis",
    title:
      "If AI Solves the Riemann Hypothesis, Will Humans Understand the Answer? | Armaan Singla",
    description:
      "What Anthropic's Riemann result actually means, why AI may begin discovering things humans cannot fully understand, and what happens when machines stop repeating knowledge and start creating it.",
    type: "article",
    image: `${SITE_URL}/og/og-riemann.png`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline:
        "If AI Solves the Riemann Hypothesis, Will Humans Understand the Answer?",
      description:
        "What Anthropic's Riemann result actually means, why AI may begin discovering things humans cannot fully understand, and what happens when machines stop repeating knowledge and start creating it.",
      author: { "@type": "Person", name: "Armaan Singla", url: SITE_URL },
      datePublished: "2026-08-15",
      image: `${SITE_URL}/og/og-riemann.png`,
      mainEntityOfPage: `${SITE_URL}/writing/riemann-hypothesis`,
    },
  },
];

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Replace the content="..." of a <meta name|property="key"> tag.
const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, "i");
  if (!re.test(html)) throw new Error(`meta ${attr}="${key}" not found`);
  return html.replace(re, `$1${esc(value)}$2`);
};

const buildPage = (template, page) => {
  const url = `${SITE_URL}${page.path}`;
  const type = page.type ?? "website";
  const image = page.image ?? DEFAULT_IMAGE;
  let html = template;

  html = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${esc(page.title)}</title>`,
  );
  html = html.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/i,
    `$1${esc(url)}$2`,
  );

  html = setMeta(html, "name", "description", page.description);

  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:type", type);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:image", image);

  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  html = setMeta(html, "name", "twitter:image", image);

  // Only pages with an explicit override replace the site-wide Person+WebSite
  // JSON-LD (the article uses BlogPosting); the rest keep index.html's graph.
  if (page.jsonLd) {
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>`,
    );
  }

  return html;
};

const templatePath = path.join(DIST, "index.html");
if (!fs.existsSync(templatePath)) {
  throw new Error("dist/index.html not found — run vite build first");
}
const template = fs.readFileSync(templatePath, "utf8");

for (const page of PAGES) {
  if (page.home) continue;
  const html = buildPage(template, page);
  const outPath = path.join(DIST, page.path.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`prerender-og: wrote ${path.relative(DIST, outPath)}`);
}
