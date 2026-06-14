import type { TMDBItem } from "@/types";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

function ensureEnv() {
  if (!API_KEY || !BASE_URL) {
    throw new Error("Missing TMDB environment variables");
  }
}

// ─── Trending ──────────────────────────────────────────

export async function getTrending(): Promise<TMDBItem[]> {
  ensureEnv();
  const res = await fetch(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch trending");
  const data = await res.json();
  return data.results;
}

// ─── Movies ────────────────────────────────────────────

export async function getPopularMovies(page = 1): Promise<TMDBItem[]> {
  ensureEnv();
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  const data = await res.json();
  return data.results;
}

export async function getTopRated(page = 1): Promise<TMDBItem[]> {
  ensureEnv();
  const res = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch top rated");
  const data = await res.json();
  return data.results;
}

export async function getNowPlaying(): Promise<TMDBItem[]> {
  ensureEnv();
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch now playing");
  const data = await res.json();
  return data.results;
}

// ─── TV Shows ──────────────────────────────────────────

export async function getPopularTV(page = 1): Promise<TMDBItem[]> {
  ensureEnv();
  const res = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch popular TV");
  const data = await res.json();
  return data.results;
}

export async function getTopRatedTV(page = 1): Promise<TMDBItem[]> {
  ensureEnv();
  const res = await fetch(
    `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${page}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch top rated TV");
  const data = await res.json();
  return data.results;
}

// ─── Anime (Japanese Animation via TMDB Discover) ─────

export async function getPopularAnime(page = 1): Promise<TMDBItem[]> {
  ensureEnv();
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&sort_by=popularity.desc&page=${page}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch popular anime");
  const data = await res.json();
  return data.results;
}

export async function getTopRatedAnime(page = 1): Promise<TMDBItem[]> {
  ensureEnv();
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&sort_by=vote_average.desc&vote_count.gte=100&page=${page}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch top rated anime");
  const data = await res.json();
  return data.results;
}

export async function getTrendingAnime(): Promise<TMDBItem[]> {
  ensureEnv();
  // Use trending + filter for animation
  const res = await fetch(
    `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch trending anime");
  const data = await res.json();
  // Filter for animation genre (16) from trending
  return data.results.filter(
    (item: TMDBItem & { genre_ids?: number[] }) =>
      item.genre_ids?.includes(16)
  );
}

// ─── Search ────────────────────────────────────────────

export async function searchMulti(
  query: string,
  page = 1
): Promise<{ results: TMDBItem[]; totalPages: number; totalResults: number }> {
  ensureEnv();
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to search");
  const data = await res.json();
  return {
    results: data.results.filter(
      (item: TMDBItem) => item.media_type === "movie" || item.media_type === "tv"
    ),
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}

// ─── Details ───────────────────────────────────────────

export async function getDetails(
  id: string,
  type = "movie"
): Promise<TMDBItem | null> {
  ensureEnv();
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits,videos`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) {
      console.error("TMDB ERROR:", res.status, type, id);
      throw new Error("Failed to fetch details");
    }
    return await res.json();
  } catch (err) {
    console.error("DETAILS ERROR:", err);
    return null;
  }
}