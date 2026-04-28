// app/details/[type]/[id]/page.tsx
// app/details/[type]/[id]/page.tsx

import { getDetails } from "@/lib/api";

export default async function DetailsPage({ params }) {
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
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  const cast = data.credits?.cast?.slice(0, 5) || [];

  return (
    <div className="text-white">
      
      {/* 🎬 BACKDROP */}
      {backdrop && (
        <div
          className="w-full h-[400px] bg-cover bg-center flex items-end"
          style={{
            backgroundImage: `url(${backdrop})`,
          }}
        >
          <div className="w-full bg-gradient-to-t from-black to-transparent p-6">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
        </div>
      )}

      <div className="p-6 grid md:grid-cols-3 gap-6">
        
        {/* 🎞 POSTER */}
        <img
          src={poster}
          alt={title}
          className="rounded-xl shadow-lg"
        />

        {/* 📄 INFO */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-semibold">{title}</h2>

          <p className="text-yellow-400">⭐ {rating}</p>

          <p className="text-gray-300">
            {data.overview || "No description available."}
          </p>

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
                className="w-full h-64 rounded-lg"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}






















/*import { getDetails } from "@/lib/api";

export default async function DetailsPage({ params }) {
  const { id, type } = await params;
  const data = await getDetails(id, type);

  if (!data) {
    return <div className="p-6">Failed to load</div>;
  }

  const title = data.title || data.name;

  return (
    <div className="p-6">
      <div
        className="w-full h-64 bg-cover bg-center rounded-xl mb-6"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        }}
      />

      <div className="flex gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          className="w-48 rounded-xl"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-yellow-400 mb-2">
            ⭐ {data.vote_average?.toFixed(1)}
          </p>
          <p className="text-gray-300 max-w-xl">{data.overview}</p>
        </div>
      </div>
    </div>
  );
}*/