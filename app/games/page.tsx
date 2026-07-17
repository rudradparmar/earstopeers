import Image from "next/image";
import Link from "next/link";
import { getTopRatedGames, getUpcomingGames, searchGames, type RawgGame } from "@/lib/games";

export const metadata = {
  title: "Games — EARSTOPEERS",
  description: "Explore top-rated and upcoming video games.",
};

function GameCard({ game, upcoming = false }: { game: RawgGame; upcoming?: boolean }) {
  return (
    <div className="col-6 col-md-3 mb-4" key={game.id}>
      <Link href={`/games/${game.id}`} className="text-decoration-none text-white">
        <div className={`game-card${upcoming ? " upcoming" : ""}`}>
          <div className="game-card-img-wrapper">
            {game.background_image && (
              <Image
                src={game.background_image}
                alt={game.name}
                width={300}
                height={400}
                className="game-card-img"
              />
            )}
            {upcoming ? (
              <span className="game-upcoming-badge">
                Coming {game.released?.slice(0, 4) || "soon"}
              </span>
            ) : (
              <>
                <span className="game-rating-badge">
                  ⭐ {game.rating?.toFixed(1)}
                </span>
                <div className="game-card-overlay">
                  {game.genres?.[0] && (
                    <span className="badge bg-warning text-dark me-1">
                      {game.genres[0].name}
                    </span>
                  )}
                  {game.platforms?.[0] && (
                    <span className="badge bg-secondary">
                      {game.platforms[0].platform.name}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="game-card-body">
            <h5 className="game-card-title">{game.name}</h5>
            <p className="game-card-dev">
              {upcoming
                ? game.platforms?.[0]?.platform.name || ""
                : `${game.released?.slice(0, 4) || "TBA"}${game.metacritic ? ` · Metacritic ${game.metacritic}` : ""}`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  if (query) {
    const results = await searchGames(query);
    return (
      <div className="text-white">
        <main className="container py-5">
          <form action="/games" method="GET" className="d-flex mb-4" style={{ maxWidth: 480 }}>
            <input
              className="form-control me-2"
              type="search"
              name="q"
              placeholder="Search games..."
              defaultValue={query}
              aria-label="Search games"
            />
            <button className="btn btn-outline-warning" type="submit">
              Search
            </button>
          </form>

          <h1 className="search-results-title">
            Results for &ldquo;{query}&rdquo;
          </h1>

          {results.length === 0 ? (
            <p className="text-secondary">
              No games found. Try a different search term.
            </p>
          ) : (
            <div className="row">
              {results.map((game) => (
                <GameCard game={game} key={game.id} />
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  const [topRated, upcoming] = await Promise.all([
    getTopRatedGames(),
    getUpcomingGames(),
  ]);

  return (
    <div className="text-white">
      {/* Hero Banner */}
      <div className="category-hero" style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&h=500&fit=crop)",
      }}>
        <div className="category-hero-overlay">
          <div className="container">
            <h1 className="display-4 fw-bold">🎮 Games</h1>
            <p className="lead">
              Top-rated titles and the most anticipated upcoming releases.
            </p>
          </div>
        </div>
      </div>

      <main className="container py-5">
        <form action="/games" method="GET" className="d-flex mb-5" style={{ maxWidth: 480 }}>
          <input
            className="form-control me-2"
            type="search"
            name="q"
            placeholder="Search games..."
            aria-label="Search games"
          />
          <button className="btn btn-outline-warning" type="submit">
            Search
          </button>
        </form>

        {/* Featured / Top Rated */}
        <section className="mb-5">
          <h2 className="section-title">🏆 Top Rated</h2>
          {topRated.length === 0 && (
            <p className="text-secondary">
              Couldn&apos;t load games right now. Please try again later.
            </p>
          )}
          <div className="row">
            {topRated.map((game) => (
              <GameCard game={game} key={game.id} />
            ))}
          </div>
        </section>

        {/* Upcoming */}
        <section className="mb-5">
          <h2 className="section-title">📅 Upcoming Releases</h2>
          {upcoming.length === 0 && (
            <p className="text-secondary">
              Couldn&apos;t load upcoming games right now. Please try again later.
            </p>
          )}
          <div className="row">
            {upcoming.map((game) => (
              <GameCard game={game} upcoming key={game.id} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
