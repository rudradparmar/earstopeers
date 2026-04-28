import { techNews } from "@/lib/mockTech";

export default function TechNews() {
  return (
    
    <section className="bg-dark text-white py-5">
      <div className="container">
        <div className="d-flex justify-content-between mb-4">
          <h2>Latest Tech News</h2>
        </div>

        <div className="row">
          {techNews.map((news) => (
            <div key={news.id} className="col-md-6 col-lg-3 mb-4">
              <div className="tech-card h-100">
                <img src={news.image} alt={news.title} />

                <div className="tech-card-body">
                  <span className="badge bg-warning text-dark mb-2">
                    {news.category}
                  </span>

                  <h5>{news.title}</h5>
                  <p className="text-muted small">
                    {news.description}
                  </p>

                  <p className="small text-muted">
                    {news.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}