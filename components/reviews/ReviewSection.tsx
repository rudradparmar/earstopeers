"use client";

import { useState } from "react";
import AddReview from "./AddReview";
import ReviewList from "./ReviewList";

interface ReviewSectionProps {
  contentId: string;
  contentType: string;
}

export default function ReviewSection({
  contentId,
  contentType,
}: ReviewSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleReviewAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <section className="reviews-section">
      <h3 className="reviews-section-title">
        <span className="me-2">💬</span>
        Reviews
      </h3>

      <div className="reviews-grid">
        <div className="reviews-form-col">
          <AddReview
            contentId={contentId}
            contentType={contentType}
            onReviewAdded={handleReviewAdded}
          />
        </div>

        <div className="reviews-list-col">
          <ReviewList
            contentId={contentId}
            contentType={contentType}
            refreshTrigger={refreshTrigger}
          />
        </div>
      </div>
    </section>
  );
}
