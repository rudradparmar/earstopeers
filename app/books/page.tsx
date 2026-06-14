import { featuredBooks, classicBooks } from "@/lib/mockBooks";
import Image from "next/image";

export const metadata = {
  title: "Books — EARSTOPEERS",
  description: "Discover top-rated books, from sci-fi epics to timeless classics.",
};

export default function BooksPage() {
  return (
    <div className="text-white">
      {/* Hero Banner */}
      <div className="category-hero" style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400&h=500&fit=crop)",
      }}>
        <div className="category-hero-overlay">
          <div className="container">
            <h1 className="display-4 fw-bold">📚 Books</h1>
            <p className="lead">
              Must-read titles from bestselling fiction to timeless literature.
            </p>
          </div>
        </div>
      </div>

      <main className="container py-5">
        {/* Featured Books */}
        <section className="mb-5">
          <h2 className="section-title">⭐ Top Picks</h2>
          <div className="row">
            {featuredBooks.map((book) => (
              <div className="col-6 col-md-3 mb-4" key={book.id}>
                <div className="book-card">
                  <div className="book-card-img-wrapper">
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={300}
                      height={400}
                      className="book-card-img"
                    />
                    <span className="game-rating-badge">
                      ⭐ {book.rating}
                    </span>
                  </div>
                  <div className="book-card-body">
                    <h5 className="book-card-title">{book.title}</h5>
                    <p className="book-card-author">by {book.author}</p>
                    <div className="book-card-meta">
                      <span className="badge bg-warning text-dark me-1">{book.genre}</span>
                      <span className="text-secondary small">{book.pages} pages · {book.year}</span>
                    </div>
                    <p className="book-card-desc">{book.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Classics */}
        <section className="mb-5">
          <h2 className="section-title">📖 Timeless Classics</h2>
          <div className="row">
            {classicBooks.map((book) => (
              <div className="col-6 col-md-3 mb-4" key={book.id}>
                <div className="book-card">
                  <div className="book-card-img-wrapper">
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={300}
                      height={400}
                      className="book-card-img"
                    />
                    <span className="game-rating-badge">
                      ⭐ {book.rating}
                    </span>
                  </div>
                  <div className="book-card-body">
                    <h5 className="book-card-title">{book.title}</h5>
                    <p className="book-card-author">by {book.author}</p>
                    <div className="book-card-meta">
                      <span className="badge bg-warning text-dark me-1">{book.genre}</span>
                      <span className="text-secondary small">{book.pages} pages · {book.year}</span>
                    </div>
                    <p className="book-card-desc">{book.description}</p>
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
