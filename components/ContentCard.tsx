"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { TMDBItem } from "@/types";

interface ContentCardProps {
  item: TMDBItem;
}

export default function ContentCard({ item }: ContentCardProps) {
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
        alt={item.title || item.name || "Content"}
        width={300}
        height={450}
        className="rounded"
      />

      <h3>{item.title || item.name}</h3>
    </div>
  );
}
