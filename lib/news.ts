/**
 * Tech News API — Uses GNews API (free tier: 100 requests/day).
 *
 * Set GNEWS_API_KEY in your .env.local file.
 * Get a free key at: https://gnews.io/
 *
 * Falls back to mock data if no API key is set.
 */

import { techNews as mockTechNews } from "./mockTech";

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
const GNEWS_BASE = "https://gnews.io/api/v4";

/**
 * Fetch top tech headlines.
 * Returns up to `count` articles. Falls back to mock data if no API key.
 */
export async function getTechNews(count = 8): Promise<NewsArticle[]> {
  if (!GNEWS_API_KEY) {
    console.warn("GNEWS_API_KEY not set — using mock tech news data.");
    return mockTechNews.map((item) => ({
      title: item.title,
      description: item.description,
      url: "#",
      image: item.image,
      publishedAt: item.date,
      source: { name: item.category, url: "#" },
    }));
  }

  try {
    const res = await fetch(
      `${GNEWS_BASE}/top-headlines?category=technology&lang=en&max=${count}&apikey=${GNEWS_API_KEY}`,
      { next: { revalidate: 600 } } // cache for 10 min
    );

    if (!res.ok) {
      console.error("GNews API error:", res.status);
      throw new Error("GNews API failed");
    }

    const data = await res.json();

    return (data.articles || []).map(
      (article: {
        title: string;
        description: string;
        url: string;
        image: string | null;
        publishedAt: string;
        source: { name: string; url: string };
      }) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.image,
        publishedAt: article.publishedAt,
        source: article.source,
      })
    );
  } catch (err) {
    console.error("Tech news fetch error:", err);
    // Fallback to mock data
    return mockTechNews.map((item) => ({
      title: item.title,
      description: item.description,
      url: "#",
      image: item.image,
      publishedAt: item.date,
      source: { name: item.category, url: "#" },
    }));
  }
}

/**
 * Search tech news by query.
 */
export async function searchTechNews(
  query: string,
  count = 10
): Promise<NewsArticle[]> {
  if (!GNEWS_API_KEY) {
    return [];
  }

  try {
    const res = await fetch(
      `${GNEWS_BASE}/search?q=${encodeURIComponent(query)}&lang=en&max=${count}&apikey=${GNEWS_API_KEY}`,
      { next: { revalidate: 600 } }
    );

    if (!res.ok) throw new Error("GNews search failed");

    const data = await res.json();
    return (data.articles || []).map(
      (article: {
        title: string;
        description: string;
        url: string;
        image: string | null;
        publishedAt: string;
        source: { name: string; url: string };
      }) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.image,
        publishedAt: article.publishedAt,
        source: article.source,
      })
    );
  } catch (err) {
    console.error("Tech news search error:", err);
    return [];
  }
}
