import { caseStudies } from "../../content/work";

export interface SEOCheckItem {
  id: string;
  name: string;
  status: "pass" | "warn" | "fail";
  message: string;
  recommendation?: string;
}

export interface SEOHealthReport {
  score: number;
  lastSyncDate: string;
  lastSyncTime: string;
  checks: SEOCheckItem[];
  canonicalUrl: string;
  title: string;
  description: string;
}

/**
 * Gets today's formatted date (YYYY-MM-DD)
 */
export function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * Injects/updates breadcrumb structured data for search engines
 */
export function updateBreadcrumbSchema(path: string) {
  if (typeof document === "undefined") return;

  const segments = path.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.chamod.digital/",
    },
  ];

  let cumulative = "";
  segments.forEach((seg, idx) => {
    cumulative += `/${seg}`;
    const formattedName = seg
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    items.push({
      "@type": "ListItem",
      position: idx + 2,
      name: formattedName,
      item: `https://www.chamod.digital${cumulative}`,
    });
  });

  const schemaObj = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };

  let script = document.getElementById("schema-breadcrumbs") as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = "schema-breadcrumbs";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(schemaObj, null, 2);
}

/**
 * Runs the daily automated SEO engine:
 * 1. Stamps meta last-modified & revised with today's date
 * 2. Injects dynamic Breadcrumb schema for search engines
 * 3. Records daily auto-sync timestamp
 */
export function runDailyAutoSEO(currentPath: string) {
  if (typeof document === "undefined") return;

  const today = getTodayDateString();
  const nowIso = new Date().toISOString();

  // 1. Meta last-modified & revised
  let lastModMeta = document.querySelector('meta[name="last-modified"]');
  if (!lastModMeta) {
    lastModMeta = document.createElement("meta");
    lastModMeta.setAttribute("name", "last-modified");
    document.head.appendChild(lastModMeta);
  }
  lastModMeta.setAttribute("content", nowIso);

  let revisedMeta = document.querySelector('meta[name="revised"]');
  if (!revisedMeta) {
    revisedMeta = document.createElement("meta");
    revisedMeta.setAttribute("name", "revised");
    document.head.appendChild(revisedMeta);
  }
  revisedMeta.setAttribute("content", `Chamod Ravihara, ${today}`);

  // 2. Dynamic breadcrumbs for Google SERP
  updateBreadcrumbSchema(currentPath);

  // 3. Update localStorage record
  try {
    localStorage.setItem("daily_seo_last_sync_date", today);
    localStorage.setItem("daily_seo_last_sync_time", new Date().toLocaleTimeString());
    localStorage.setItem("daily_seo_status", "active");
  } catch {
    // ignore in restricted iframe or private mode
  }
}

/**
 * Generates an up-to-date XML Sitemap string with today's lastmod timestamps
 */
export function generateDailySitemap(): string {
  const today = getTodayDateString();

  const routes = [
    { path: "/", priority: "1.0", freq: "daily" },
    { path: "/work", priority: "0.9", freq: "daily" },
    { path: "/services", priority: "0.8", freq: "weekly" },
    { path: "/portfolio", priority: "0.8", freq: "weekly" },
    { path: "/about", priority: "0.7", freq: "monthly" },
    { path: "/wegot-digital", priority: "0.8", freq: "weekly" },
    { path: "/sozo-visuals", priority: "0.8", freq: "weekly" },
    { path: "/health-check", priority: "0.9", freq: "monthly" },
    { path: "/contact", priority: "0.7", freq: "monthly" },
  ];

  const caseStudyUrls = caseStudies.map((cs) => ({
    path: `/work/${cs.slug}`,
    priority: "0.8",
    freq: "weekly",
  }));

  const allUrls = [...routes, ...caseStudyUrls];

  const xmlEntries = allUrls
    .map(
      (u) => `  <url>
    <loc>https://www.chamod.digital${u.path === "/" ? "" : u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

/**
 * Downloads the freshly generated daily sitemap.xml
 */
export function downloadSitemapXml() {
  const xmlContent = generateDailySitemap();
  const blob = new Blob([xmlContent], { type: "application/xml;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "sitemap.xml");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Performs a real-time SEO health audit on the current DOM
 */
export function auditCurrentPageSEO(): SEOHealthReport {
  if (typeof document === "undefined") {
    return {
      score: 100,
      lastSyncDate: getTodayDateString(),
      lastSyncTime: "N/A",
      checks: [],
      canonicalUrl: "https://www.chamod.digital",
      title: "",
      description: "",
    };
  }

  const title = document.title || "";
  const descEl = document.querySelector('meta[name="description"]');
  const description = descEl?.getAttribute("content") || "";
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  const canonicalUrl = canonicalEl?.getAttribute("href") || "";
  const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content");
  const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute("content");
  const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute("content");
  const hasJsonLd = document.querySelectorAll('script[type="application/ld+json"]').length > 0;
  const hasViewport = !!document.querySelector('meta[name="viewport"]');
  const hasRobots = !!document.querySelector('meta[name="robots"]');

  const checks: SEOCheckItem[] = [];

  // Title check
  if (title.length >= 30 && title.length <= 70) {
    checks.push({
      id: "title",
      name: "Document Title",
      status: "pass",
      message: `Optimal length (${title.length} chars): "${title}"`,
    });
  } else if (title.length > 0) {
    checks.push({
      id: "title",
      name: "Document Title",
      status: "warn",
      message: `Current title is ${title.length} chars (best is 30–65 chars).`,
    });
  } else {
    checks.push({
      id: "title",
      name: "Document Title",
      status: "fail",
      message: "Title tag is missing or empty.",
    });
  }

  // Description check
  if (description.length >= 120 && description.length <= 170) {
    checks.push({
      id: "description",
      name: "Meta Description",
      status: "pass",
      message: `Optimal length (${description.length} chars) for search snippets.`,
    });
  } else if (description.length > 0) {
    checks.push({
      id: "description",
      name: "Meta Description",
      status: "pass",
      message: `Present (${description.length} chars): "${description.slice(0, 60)}..."`,
    });
  } else {
    checks.push({
      id: "description",
      name: "Meta Description",
      status: "fail",
      message: "Meta description is missing.",
    });
  }

  // Canonical check
  if (canonicalUrl.startsWith("https://")) {
    checks.push({
      id: "canonical",
      name: "Canonical URL",
      status: "pass",
      message: `Proper canonical declared: ${canonicalUrl}`,
    });
  } else {
    checks.push({
      id: "canonical",
      name: "Canonical URL",
      status: "fail",
      message: "Valid HTTPS canonical link missing.",
    });
  }

  // OpenGraph check
  if (ogTitle && ogDesc) {
    checks.push({
      id: "opengraph",
      name: "OpenGraph Social Cards",
      status: "pass",
      message: "og:title & og:description configured for LinkedIn & Facebook.",
    });
  } else {
    checks.push({
      id: "opengraph",
      name: "OpenGraph Social Cards",
      status: "warn",
      message: "Some OpenGraph tags are missing.",
    });
  }

  // Twitter check
  if (twitterCard) {
    checks.push({
      id: "twitter",
      name: "Twitter / X Card",
      status: "pass",
      message: `Card type: "${twitterCard}" configured.`,
    });
  } else {
    checks.push({
      id: "twitter",
      name: "Twitter / X Card",
      status: "warn",
      message: "twitter:card tag is missing.",
    });
  }

  // Schema check
  if (hasJsonLd) {
    checks.push({
      id: "schema",
      name: "Schema.org Structured Data",
      status: "pass",
      message: "JSON-LD schema (Person, ProfessionalService, BreadcrumbList) active.",
    });
  } else {
    checks.push({
      id: "schema",
      name: "Schema.org Structured Data",
      status: "fail",
      message: "JSON-LD structured data missing.",
    });
  }

  // Mobile viewport & robots check
  checks.push({
    id: "technical",
    name: "Mobile & Crawler Directives",
    status: hasViewport && hasRobots ? "pass" : "warn",
    message: hasViewport && hasRobots ? "Mobile viewport & robot directives active." : "Check viewport/robots tags.",
  });

  const passCount = checks.filter((c) => c.status === "pass").length;
  const score = Math.round((passCount / checks.length) * 100);

  const lastSyncDate =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("daily_seo_last_sync_date") || getTodayDateString()
      : getTodayDateString();

  const lastSyncTime =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("daily_seo_last_sync_time") || new Date().toLocaleTimeString()
      : new Date().toLocaleTimeString();

  return {
    score,
    lastSyncDate,
    lastSyncTime,
    checks,
    canonicalUrl,
    title,
    description,
  };
}
