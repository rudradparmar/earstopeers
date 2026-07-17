// app/details/[type]/[id]/page.tsx

import { getDetails } from "@/lib/api";
import ReviewSection from "@/components/reviews/ReviewSection";

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string; type: string }>;
}) {
  const { id, type } = await params;

  const data = await getDetails(id, type);

  if (!data) {
    return <div className="p-6">Not found</div>;
  }

  const title = data.title || data.name;
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "/placeholder.png";

  const backdrop = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : null;

  const rating = data.vote_average?.toFixed(1);

  const trailer = data.videos?.results?.find(
    (vid: { type: string; site: string; key: string }) =>
      vid.type === "Trailer" && vid.site === "YouTube"
  );

  const cast: { id: number; name: string; profile_path: string | null }[] =
    data.credits?.cast?.slice(0, 5) || [];

  return (
    <div className="text-white">

      {/* 🎬 HERO — backdrop with poster + info overlaid */}
      <div
        className="relative w-full bg-cover bg-center"
        style={backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}
      >
        {/* dark overlay so text stays readable */}
        <div className="bg-black/70 bg-gradient-to-t from-black via-black/70 to-black/40">
          <div className="max-w-6xl mx-auto p-6 pt-16 flex flex-col md:flex-row gap-8 items-center md:items-end">

            {/* 🎞 POSTER */}
            <img
              src={poster}
              alt={title}
              className="w-48 md:w-64 shrink-0 rounded-xl shadow-lg"
            />

            {/* 📄 INFO */}
            <div className="space-y-4 pb-2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>

              <p className="text-yellow-400">⭐ {rating}</p>

              <p className="text-gray-300">
                {data.overview || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-10">

        {/* 👥 CAST */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Top Cast</h3>
          <div className="flex gap-4 overflow-x-auto">
            {cast.map((actor) => (
              <div key={actor.id} className="text-center w-24">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "/placeholder.png"
                  }
                  className="rounded-lg"
                />
                <p className="text-sm mt-1">{actor.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ▶️ TRAILER */}
        {trailer && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Trailer</h3>
            <iframe
              className="w-full max-w-3xl mx-auto aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* 💬 REVIEWS SECTION */}
      <div className="container py-4">
        <ReviewSection contentId={id} contentType={type} />
      </div>
    </div>
  );
}