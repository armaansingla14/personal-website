import { useEffect } from "react";

const SITE_URL = "https://www.armaansingla.me";
const SITE_NAME = "Armaan Singla";
const TWITTER_HANDLE = "@armsingla";
const DEFAULT_IMAGE = `${SITE_URL}/og/og-default.png`;

type SeoProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
};

const upsertMeta = (
  attr: "name" | "property",
  key: string,
  content: string,
) => {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const removeMeta = (attr: "name" | "property", key: string) => {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
};

const Seo = ({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_IMAGE,
  jsonLd,
  noindex = false,
}: SeoProps) => {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    upsertMeta("name", "description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    if (noindex) {
      upsertMeta("name", "robots", "noindex, nofollow");
    } else {
      upsertMeta("name", "robots", "index, follow");
    }

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:image", image);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:site", TWITTER_HANDLE);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    const JSONLD_ID = "seo-jsonld";
    document.getElementById(JSONLD_ID)?.remove();
    if (jsonLdString) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = JSONLD_ID;
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(JSONLD_ID)?.remove();
      removeMeta("name", "robots");
    };
  }, [title, description, path, type, image, jsonLdString, noindex]);

  return null;
};

export default Seo;
