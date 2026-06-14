import { getPopularAnime, getTopRatedAnime, getTrendingAnime } from "@/lib/api";
import ContentCard from "@/components/ContentCard";

export const metadata = {
  title: "Anime — EARSTOPEERS",
  description: "Discover popular and top rated anime series.",
};

export default async function AnimePage() {
  const [popular, topRated, trending] = await Promise.all([
    getPopularAnime(),
    getTopRatedAnime(),
    getTrendingAnime(),
  ]);

  const hero = popular[0];
  const heroBackdrop = hero?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${hero.backdrop_path}`
    : null;

  return (
    <div className="text-white">
      {/* Hero Banner */}
      {heroBackdrop && (
        <div
          className="category-hero"
          style={{ backgroundImage: `url(${heroBackdrop})` }}
        >
          <div className="category-hero-overlay">
            <div className="container">
              <h1 className="display-4 fw-bold">🐉 Anime</h1>
              <p className="lead">
                Japanese animation at its finest — from classics to new hits.
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="container py-5">
        {/* Trending Anime */}
        {trending.length > 0 && (
          <section className="mb-5">
            <h2 className="section-title">📈 Trending This Week</h2>
            <div className="row">
              {trending.slice(0, 8).map((item) => (
                <div className="col-6 col-md-3 mb-4" key={item.id}>
                  <ContentCard item={{ ...item, media_type: "tv" }} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Popular */}
        <section className="mb-5">
          <h2 className="section-title">🔥 Popular Anime</h2>
          <div className="row">
            {popular.slice(0, 12).map((item) => (
              <div className="col-6 col-md-3 mb-4" key={item.id}>
                <ContentCard item={{ ...item, media_type: "tv" }} />
              </div>
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section className="mb-5">
          <h2 className="section-title">⭐ Top Rated Anime</h2>
          <div className="row">
            {topRated.slice(0, 12).map((item) => (
              <div className="col-6 col-md-3 mb-4" key={item.id}>
                <ContentCard item={{ ...item, media_type: "tv" }} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
