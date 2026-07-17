// lib/games.ts — RAWG API (https://rawg.io/apidocs)

const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export interface RawgGame {
  id: number;
  name: string;
  slug: string;
  background_image: string | null;
  background_image_additional?: string | null;
  rating: number; // 0–5
  metacritic: number | null;
  released: string | null; // "YYYY-MM-DD"
  genres?: { id: number; name: string }[];
  platforms?: { platform: { id: number; name: string } }[];
  developers?: { id: number; name: string }[];
  description_raw?: string;
  esrb_rating?: { name: string } | null;
}

function ensureEnv() {
  if (!API_KEY) {
    throw new Error("Missing RAWG_API_KEY environment variable");
  }
}

export async function getTopRatedGames(page = 1): Promise<RawgGame[]> {
  try {
    ensureEnv();
    const res = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&ordering=-metacritic&page_size=8&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`RAWG list failed: ${res.status}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("RAWG ERROR:", err);
    return [];
  }
}

export async function getUpcomingGames(): Promise<RawgGame[]> {
  try {
    ensureEnv();
    const today = new Date().toISOString().slice(0, 10);
    const nextYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const res = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&dates=${today},${nextYear}&ordering=-added&page_size=4`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`RAWG upcoming failed: ${res.status}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("RAWG ERROR:", err);
    return [];
  }
}

export async function searchGames(query: string): Promise<RawgGame[]> {
  try {
    ensureEnv();
    const res = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=12`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`RAWG search failed: ${res.status}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("RAWG SEARCH ERROR:", err);
    return [];
  }
}

export async function getGameDetails(id: string): Promise<RawgGame | null> {
  try {
    ensureEnv();
    const res = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`RAWG details failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("RAWG DETAILS ERROR:", err);
    return null;
  }
}
