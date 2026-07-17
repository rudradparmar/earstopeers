// app/books/[id]/page.tsx

import { getBookDetails, secureImage, stripHtml } from "@/lib/books";
import ReviewSection from "@/components/reviews/ReviewSection";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const book = await getBookDetails(id);

  if (!book) {
    return <div className="p-6">Not found</div>;
  }

  const info = book.volumeInfo;
  const cover = secureImage(
    info.imageLinks?.large || info.imageLinks?.medium || info.imageLinks?.thumbnail
  );
  const description = stripHtml(info.description);

  return (
    <div className="text-white">

      {/* 📚 HERO — dark gradient with cover + info */}
      <div className="w-full bg-gradient-to-b from-zinc-800 to-black">
        <div className="max-w-6xl mx-auto p-6 pt-16 flex flex-col md:flex-row gap-8 items-center md:items-end">

          {cover && (
            <img
              src={cover}
              alt={info.title}
              className="w-48 md:w-64 shrink-0 rounded-xl shadow-lg"
            />
          )}

          <div className="space-y-4 pb-2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">{info.title}</h1>

            <p className="text-gray-300">
              by {info.authors?.join(", ") || "Unknown"}
            </p>

            {info.averageRating && (
              <p className="text-yellow-400">⭐ {info.averageRating} / 5</p>
            )}

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {info.categories?.slice(0, 4).map((c) => (
                <span key={c} className="badge bg-warning text-dark">
                  {c}
                </span>
              ))}
            </div>

            <p className="text-gray-300">
              {info.pageCount ? `${info.pageCount} pages · ` : ""}
              {info.publishedDate || ""}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-10">

        {/* 📄 DESCRIPTION */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About this book</h3>
          <p className="text-gray-300 whitespace-pre-line">
            {description || "No description available."}
          </p>
        </div>
      </div>

      {/* 💬 REVIEWS SECTION */}
      <div className="container py-4">
        <ReviewSection contentId={id} contentType="book" />
      </div>
    </div>
  );
}
