import { NextResponse } from "next/server";
import { insightPosts } from "@/data/insightsContent";
import { siteConfig } from "@/data/siteConfig";

export function GET() {
  const items = insightPosts
    .map((post) => {
      const link = `${siteConfig.url}/insights/${post.slug}`;
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${link}</link>
          <guid>${link}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description><![CDATA[${post.description}]]></description>
        </item>
      `;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${siteConfig.title} Insights</title>
        <link>${siteConfig.url}</link>
        <description>${siteConfig.description}</description>
        <language>${siteConfig.locale}</language>
        ${items}
      </channel>
    </rss>`;

  return new NextResponse(rss, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
