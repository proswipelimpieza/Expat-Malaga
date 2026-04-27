import { getAllArticles, CATEGORIES } from "@/lib/articles";

const SITE_URL = "https://expatmalaga.org";
const SITE_TITLE = "Expat Málaga";
const SITE_DESCRIPTION =
  "Le guide indépendant des Français qui s'installent en Andalousie.";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = getAllArticles().slice(0, 50);

  const items = articles
    .map((a) => {
      const { title, description, category, slug, date } = a.frontmatter;
      const url = `${SITE_URL}/${category}/${slug}`;
      const catLabel = CATEGORIES[category]?.label ?? category;
      const pubDate = new Date(date).toUTCString();

      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(catLabel)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>fr</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
