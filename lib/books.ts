// lib/books.ts — Google Books API (no key required; optional key raises quota)

const BASE_URL = "https://www.googleapis.com/books/v1";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY; // optional

export interface BookVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    imageLinks?: {
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
    };
  };
}

function withKey(url: string) {
  return API_KEY ? `${url}&key=${API_KEY}` : url;
}

// Google Books serves image links over http — force https
export function secureImage(url?: string): string | null {
  return url ? url.replace(/^http:/, "https:") : null;
}

export function stripHtml(html?: string): string {
  return html ? html.replace(/<[^>]+>/g, "") : "";
}

async function searchVolumes(query: string, maxResults: number): Promise<BookVolume[]> {
  try {
    const res = await fetch(
      withKey(
        `${BASE_URL}/volumes?q=${encodeURIComponent(query)}&orderBy=relevance&maxResults=${maxResults}&printType=books&langRestrict=en`
      ),
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`Google Books failed: ${res.status}`);
    const data = await res.json();
    const items: BookVolume[] = data.items || [];
    // skip volumes without a cover so cards aren't blank
    return items.filter((b) => b.volumeInfo?.imageLinks?.thumbnail);
  } catch (err) {
    console.error("BOOKS ERROR:", err);
    return [];
  }
}

export async function getTopBooks(): Promise<BookVolume[]> {
  return searchVolumes("subject:fiction", 8);
}

export async function getClassicBooks(): Promise<BookVolume[]> {
  const books = await searchVolumes("subject:classics", 8);
  return books.slice(0, 4);
}

export async function getBookDetails(id: string): Promise<BookVolume | null> {
  try {
    const url = `${BASE_URL}/volumes/${encodeURIComponent(id)}${API_KEY ? `?key=${API_KEY}` : ""}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Google Books details failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("BOOKS DETAILS ERROR:", err);
    return null;
  }
}
