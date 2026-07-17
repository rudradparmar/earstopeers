// app/games/[id]/page.tsx

import { getGameDetails } from "@/lib/games";
import ReviewSection from "@/components/reviews/ReviewSection";

export default async function GameDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const game = await getGameDetails(id);

  if (!game) {
    return <div className="p-6">Not found</div>;
  }

  const backdrop = game.background_image_additional || game.background_image;
  const poster = game.background_image;
  const platforms = game.platforms?.map((p) => p.platform.name) || [];
  const developers = game.developers?.map((d) => d.name) || [];

  return (
    <div className="text-white">

      {/* 🎮 HERO — backdrop with cover + info overlaid */}
      <div
        className="relative w-full bg-cover bg-center"
        style={backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}
      >
        <div className="bg-black/70 bg-gradient-to-t from-black via-black/70 to-black/40">
          <div className="max-w-6xl mx-auto p-6 pt-16 flex flex-col md:flex-row gap-8 items-center md:items-end">

            {poster && (
              <img
                src={poster}
                alt={game.name}
                className="w-64 md:w-80 shrink-0 rounded-xl shadow-lg"
              />
            )}

            <div className="space-y-4 pb-2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold">{game.name}</h1>

              <p className="text-yellow-400">
                ⭐ {game.rating?.toFixed(1)} / 5
                {game.metacritic ? ` · Metacritic ${game.metacritic}` : ""}
              </p>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {game.genres?.map((g) => (
                  <span key={g.id} className="badge bg-warning text-dark">
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-300">
                {game.description_raw?.slice(0, 600) || "No description available."}
                {game.description_raw && game.description_raw.length > 600 ? "…" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-10">

        {/* ℹ️ DETAILS */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Details</h3>
          <div className="space-y-1 text-gray-300">
            <p>Released: {game.released || "TBA"}</p>
            {developers.length > 0 && <p>Developer: {developers.join(", ")}</p>}
            {platforms.length > 0 && <p>Platforms: {platforms.join(", ")}</p>}
            {game.esrb_rating && <p>ESRB: {game.esrb_rating.name}</p>}
          </div>
        </div>
      </div>

      {/* 💬 REVIEWS SECTION */}
      <div className="container py-4">
        <ReviewSection contentId={id} contentType="game" />
      </div>
    </div>
  );
}
