import { searchMulti } from "@/lib/api";
import ContentCard from "@/components/ContentCard";
import Link from "next/link";

export const metadata = {
  title: "Search — EARSTOPEERS",
  description: "Search for movies, TV shows, and more.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  if (!query) {
    return (
      <div className="container py-5 text-white text-center">
        <div className="search-empty-state">
          <h1 className="display-5 mb-3">🔍 Search EARSTOPEERS</h1>
          <p className="text-secondary lead">
            Use the search bar above to find movies, TV shows, and anime.
          </p>
        </div>
      </div>
    );
  }

  const { results, totalResults } = await searchMulti(query);

  return (
    <div className="container py-5 text-white">
      <div className="mb-4">
        <h1 className="search-results-title">
          Results for &ldquo;{query}&rdquo;
        </h1>
        <p className="text-secondary">
          {totalResults} result{totalResults !== 1 ? "s" : ""} found
        </p>
      </div>

      {results.length === 0 ? (
        <div className="search-empty-state">
          <h2 className="mb-3">😕 No results found</h2>
          <p className="text-secondary">
            Try a different search term or{" "}
            <Link href="/" className="text-warning">
              browse categories
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="row">
          {results.map((item) => (
            <div className="col-6 col-md-3 mb-4" key={`${item.media_type}-${item.id}`}>
              <ContentCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
