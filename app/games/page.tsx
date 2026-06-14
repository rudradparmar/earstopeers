import { featuredGames, upcomingGames } from "@/lib/mockGames";
import Image from "next/image";

export const metadata = {
  title: "Games — EARSTOPEERS",
  description: "Explore top-rated and upcoming video games.",
};

export default function GamesPage() {
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
        {/* Featured / Top Rated */}
        <section className="mb-5">
          <h2 className="section-title">🏆 Top Rated</h2>
          <div className="row">
            {featuredGames.map((game) => (
              <div className="col-6 col-md-3 mb-4" key={game.id}>
                <div className="game-card">
                  <div className="game-card-img-wrapper">
                    <Image
                      src={game.image}
                      alt={game.title}
                      width={300}
                      height={400}
                      className="game-card-img"
                    />
                    <span className="game-rating-badge">
                      ⭐ {game.rating}
                    </span>
                    <div className="game-card-overlay">
                      <span className="badge bg-warning text-dark me-1">{game.genre}</span>
                      <span className="badge bg-secondary">{game.platform}</span>
                    </div>
                  </div>
                  <div className="game-card-body">
                    <h5 className="game-card-title">{game.title}</h5>
                    <p className="game-card-dev">{game.developer} · {game.releaseYear}</p>
                    <p className="game-card-desc">{game.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming */}
        <section className="mb-5">
          <h2 className="section-title">📅 Upcoming Releases</h2>
          <div className="row">
            {upcomingGames.map((game) => (
              <div className="col-6 col-md-3 mb-4" key={game.id}>
                <div className="game-card upcoming">
                  <div className="game-card-img-wrapper">
                    <Image
                      src={game.image}
                      alt={game.title}
                      width={300}
                      height={400}
                      className="game-card-img"
                    />
                    <span className="game-upcoming-badge">Coming {game.releaseYear}</span>
                  </div>
                  <div className="game-card-body">
                    <h5 className="game-card-title">{game.title}</h5>
                    <p className="game-card-dev">{game.developer} · {game.platform}</p>
                    <p className="game-card-desc">{game.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
