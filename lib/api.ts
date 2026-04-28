const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

export async function getTrending() {
    if (!API_KEY || !BASE_URL) {
    throw new Error("Missing TMDB environment variables");
  }
  const res = await fetch(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
    { next: { revalidate: 60 } } // cache for 60s
  );

  if (!res.ok) throw new Error("Failed to fetch trending");

  const data = await res.json();
  return data.results;
}

export async function getTopRated() {
  const res = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch top rated");

  const data = await res.json();
  return data.results;
}

export async function getDetails(id: string, type = "movie") {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits,videos`,
      { next: { revalidate: 60 } }
    );

    //if (!res.ok) throw new Error("Failed to fetch details");
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
/*export async function getDetails(id: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`,
      { next: { revalidate: 60 } }
    );
    const res = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits,videos`,
    );
    if (!res.ok) throw new Error("Failed to fetch details");

    return await res.json();
  } catch (err) {
    console.error("DETAILS ERROR:", err);
    return null;
  }
}*/
console.log("API KEY:", process.env.TMDB_API_KEY);
console.log("BASE URL:", process.env.TMDB_BASE_URL);