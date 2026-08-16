/*
 * Post-build prerender for per-route social (Open Graph / X) tags.
 *
 * This site is a client-rendered Vite SPA: every path is rewritten to
 * index.html, whose static <head> carries the homepage OG tags. Google runs
 * the JS and sees the per-route tags injected by src/components/Seo.tsx, but
 * non-JS scrapers (X, LinkedIn, Slack, Discord, Facebook) never do — so shared
 * article links show the homepage card.
 *
 * Fix: after `vite build`, clone the built dist/index.html into a static
 * per-route file with the article-specific head. Vercel checks the filesystem
 * before applying the catch-all rewrite, so scrapers get this file while the
 * SPA still boots (same hashed bundle) and React Router renders the essay.
 *
 * Runs as part of `npm run build` (see package.json). Zero dependencies.
 */
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve(process.cwd(), "dist");
const SITE_URL = "https://www.armaansingla.me";

// One entry per prerendered route. Keep in sync with src/data/essays.ts.
const ROUTES = [
  {
    out: "writing/riemann-hypothesis/index.html",
    url: `${SITE_URL}/writing/riemann-hypothesis`,
    title:
      "If AI Solves the Riemann Hypothesis, Will Humans Understand the Answer? | Armaan Singla",
    description:
      "What Anthropic's Riemann result actually means, why AI may begin discovering things humans cannot fully understand, and what happens when machines stop repeating knowledge and start creating it.",
    image: `${SITE_URL}/og/og-riemann.png`,
    type: "article",
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
  const re = new RegExp(
    `(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`,
    "i",
  );
  if (!re.test(html)) throw new Error(`meta ${attr}="${key}" not found`);
  return html.replace(re, `$1${esc(value)}$2`);
};

const buildRoute = (template, route) => {
  let html = template;

  html = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${esc(route.title)}</title>`,
  );
  html = html.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/i,
    `$1${esc(route.url)}$2`,
  );

  html = setMeta(html, "name", "description", route.description);

  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", route.description);
  html = setMeta(html, "property", "og:type", route.type);
  html = setMeta(html, "property", "og:url", route.url);
  html = setMeta(html, "property", "og:image", route.image);

  html = setMeta(html, "name", "twitter:title", route.title);
  html = setMeta(html, "name", "twitter:description", route.description);
  html = setMeta(html, "name", "twitter:image", route.image);

  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">${JSON.stringify(
      route.jsonLd,
    )}</script>`,
  );

  return html;
};

const templatePath = path.join(DIST, "index.html");
if (!fs.existsSync(templatePath)) {
  throw new Error(`dist/index.html not found — run vite build first`);
}
const template = fs.readFileSync(templatePath, "utf8");

for (const route of ROUTES) {
  const html = buildRoute(template, route);
  const outPath = path.join(DIST, route.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`prerender-og: wrote ${route.out}`);
}
