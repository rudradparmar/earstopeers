import Link from "next/link";

const categories = [
  {
    name: "Movies",
    icon: "🎬",
    href: "/movies",
    color: "text-danger",
  },
  {
    name: "TV Shows",
    icon: "📺",
    href: "/tv",
    color: "text-primary",
  },
  {
    name: "Anime",
    icon: "🐉",
    href: "/anime",
    color: "text-success",
  },
  {
    name: "Games",
    icon: "🎮",
    href: "/games",
    color: "text-warning",
  },
  {
    name: "Books",
    icon: "📚",
    href: "/books",
    color: "text-light",
  },
  {
    name: "Tech",
    icon: "💻",
    href: "/tech",
    color: "text-info",
  },
];

export default function Categories() {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5">Browse by Category</h2>

        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat.name} className="col-md-4 col-lg-2">
              <Link href={cat.href} className="text-decoration-none">
                <div className="card text-center h-100 hover-card">
                  <div className="card-body">
                    <div
                      className={`mb-3 ${cat.color}`}
                      style={{ fontSize: "2.5rem" }}
                    >
                      {cat.icon}
                    </div>
                    <h5 className="card-title">{cat.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
