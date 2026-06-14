"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const sizeClass =
    size === "sm"
      ? "star-rating-sm"
      : size === "lg"
      ? "star-rating-lg"
      : "";

  return (
    <div
      className={`star-rating-container ${sizeClass}`}
      onMouseLeave={() => !readonly && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hovered || value);

        return (
          <span
            key={star}
            className={`star ${isFilled ? "star-filled" : "star-empty"} ${
              readonly ? "" : "star-interactive"
            }`}
            onClick={() => !readonly && onChange?.(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            role={readonly ? "img" : "button"}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
