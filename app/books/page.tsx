import Image from "next/image";
import Link from "next/link";
import { getTopBooks, getClassicBooks, secureImage, stripHtml, type BookVolume } from "@/lib/books";

export const metadata = {
  title: "Books — EARSTOPEERS",
  description: "Discover top-rated books, from sci-fi epics to timeless classics.",
};

function BookCard({ book }: { book: BookVolume }) {
  const info = book.volumeInfo;
  const cover = secureImage(info.imageLinks?.thumbnail);

  return (
    <div className="col-6 col-md-3 mb-4">
      <Link href={`/books/${book.id}`} className="text-decoration-none text-white">
        <div className="book-card">
          <div className="book-card-img-wrapper">
            {cover && (
              <Image
                src={cover}
                alt={info.title}
                width={300}
                height={400}
                className="book-card-img"
                unoptimized
              />
            )}
            {info.averageRating && (
              <span className="game-rating-badge">⭐ {info.averageRating}</span>
            )}
          </div>
          <div className="book-card-body">
            <h5 className="book-card-title">{info.title}</h5>
            <p className="book-card-author">
              by {info.authors?.join(", ") || "Unknown"}
            </p>
            <div className="book-card-meta">
              {info.categories?.[0] && (
                <span className="badge bg-warning text-dark me-1">
                  {info.categories[0]}
                </span>
              )}
              <span className="text-secondary small">
                {info.pageCount ? `${info.pageCount} pages · ` : ""}
                {info.publishedDate?.slice(0, 4) || ""}
              </span>
            </div>
            <p className="book-card-desc">
              {stripHtml(info.description).slice(0, 120)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default async function BooksPage() {
  const [topPicks, classics] = await Promise.all([
    getTopBooks(),
    getClassicBooks(),
  ]);

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
          {topPicks.length === 0 && (
            <p className="text-secondary">
              Couldn&apos;t load books right now. Please try again later.
            </p>
          )}
          <div className="row">
            {topPicks.map((book) => (
              <BookCard book={book} key={book.id} />
            ))}
          </div>
        </section>

        {/* Classics */}
        <section className="mb-5">
          <h2 className="section-title">📖 Timeless Classics</h2>
          {classics.length === 0 && (
            <p className="text-secondary">
              Couldn&apos;t load books right now. Please try again later.
            </p>
          )}
          <div className="row">
            {classics.map((book) => (
              <BookCard book={book} key={book.id} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
