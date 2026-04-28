// src/components/cards/ContentCard.tsx

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ContentCard({ item }) {
  const router = useRouter();

  const handleClick = () => {
    const mediaType = item.media_type || "movie";
    router.push(`/details/${mediaType}/${item.id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      
      <Image
        src={
          item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "/placeholder.png"
        }
        alt={item.title || item.name}
        width={300}   // ✅ REQUIRED
        height={450}  // ✅ REQUIRED
        className="rounded"
      />

      <h3>{item.title || item.name}</h3>
    </div>
  );
}

/*
import { ContentItem } from "@/types";

interface Props {
  item: ContentItem;
  onClick?: (id: number) => void;
}

export default function ContentCard({ item, onClick }: Props) {
  return (
    <div
      onClick={() => onClick?.(item.id)}
      className="relative cursor-pointer rounded-xl overflow-hidden bg-gray-900 hover:scale-105 transition-transform"
    >
      {/* Image *}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-64 object-cover"
      />

      {/* Rating badge /}
      {item.rating && (
        <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded">
          ⭐ {item.rating}
        </div>
      )}

      {/* Overlay *}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent p-3">
        <h3 className="text-sm font-semibold">{item.title}</h3>
        {item.year && <p className="text-xs text-gray-300">{item.year}</p>}
      </div>
    </div>
  );
}
*/
