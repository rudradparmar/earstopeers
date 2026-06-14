import { getPopularTV, getTopRatedTV } from "@/lib/api";
import ContentCard from "@/components/ContentCard";

export const metadata = {
  title: "TV Shows — EARSTOPEERS",
  description: "Browse popular and top rated TV shows.",
};

export default async function TVPage() {
  const [popular, topRated] = await Promise.all([
    getPopularTV(),
    getTopRatedTV(),
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
              <h1 className="display-4 fw-bold">📺 TV Shows</h1>
              <p className="lead">
                Binge-worthy series from every genre.
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="container py-5">
        {/* Popular */}
        <section className="mb-5">
          <h2 className="section-title">🔥 Popular TV Shows</h2>
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
          <h2 className="section-title">⭐ Top Rated</h2>
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
