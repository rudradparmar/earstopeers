import { getTechNews } from "@/lib/news";
import Link from "next/link";

export const metadata = {
  title: "Tech News — EARSTOPEERS",
  description: "Latest technology news from around the world.",
};

export default async function TechPage() {
  const news = await getTechNews(10);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="text-white">
      {/* Hero Banner */}
      <div
        className="category-hero"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=500&fit=crop)",
        }}
      >
        <div className="category-hero-overlay">
          <div className="container">
            <h1 className="display-4 fw-bold">💻 Tech News</h1>
            <p className="lead">
              Stay up to date with the latest in technology, AI, and innovation.
            </p>
          </div>
        </div>
      </div>

      <main className="container py-5">
        {news.length === 0 ? (
          <div className="text-center py-5">
            <h2 className="mb-3">📰 No articles available</h2>
            <p className="text-secondary">
              Add a <code>GNEWS_API_KEY</code> to your <code>.env.local</code>{" "}
              to fetch live tech news, or check back later.
            </p>
            <Link href="/" className="btn btn-outline-warning">
              ← Back to Home
            </Link>
          </div>
        ) : (
          <>
            {/* Featured article — first one gets a big card */}
            {news[0] && (
              <section className="mb-5">
                <a
                  href={news[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <div className="tech-featured-card">
                    <div className="row g-0 align-items-center">
                      <div className="col-md-6">
                        {news[0].image ? (
                          <img
                            src={news[0].image}
                            alt={news[0].title}
                            className="tech-featured-img"
                          />
                        ) : (
                          <div className="tech-card-placeholder tech-featured-placeholder">
                            💻
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="tech-featured-body">
                          <span className="badge bg-warning text-dark mb-2">
                            {news[0].source.name}
                          </span>
                          <h2 className="tech-featured-title">
                            {news[0].title}
                          </h2>
                          <p className="text-secondary">
                            {news[0].description}
                          </p>
                          <p className="small text-muted">
                            {formatDate(news[0].publishedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </section>
            )}

            {/* Rest of articles in grid */}
            <section>
              <h2 className="section-title">📰 More Headlines</h2>
              <div className="row">
                {news.slice(1).map((article, idx) => (
                  <div key={idx} className="col-md-6 col-lg-4 mb-4">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      <div className="tech-card h-100">
                        {article.image ? (
                          <img src={article.image} alt={article.title} />
                        ) : (
                          <div className="tech-card-placeholder">💻</div>
                        )}

                        <div className="tech-card-body">
                          <span className="badge bg-warning text-dark mb-2">
                            {article.source.name}
                          </span>

                          <h5 className="tech-card-title">{article.title}</h5>
                          <p className="text-muted small tech-card-desc-text">
                            {article.description}
                          </p>

                          <p className="small text-muted mb-0">
                            {formatDate(article.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
