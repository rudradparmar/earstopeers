import { getTechNews } from "@/lib/news";
import Link from "next/link";

export default async function TechNews() {
  const news = await getTechNews(4);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="bg-dark text-white py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>💻 Latest Tech News</h2>
          <Link href="/tech" className="btn btn-sm btn-outline-warning">
            View All →
          </Link>
        </div>

        <div className="row">
          {news.map((article, idx) => (
            <div key={idx} className="col-md-6 col-lg-3 mb-4">
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
      </div>
    </section>
  );
}