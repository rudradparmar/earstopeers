"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { getReviews, deleteReview, type Review } from "@/lib/review";
import StarRating from "./StarRating";

interface ReviewListProps {
  contentId: string;
  contentType: string;
  refreshTrigger: number;
}

export default function ReviewList({
  contentId,
  contentType,
  refreshTrigger,
}: ReviewListProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      const data = await getReviews(contentId, contentType);
      setReviews(data);
      setLoading(false);
    }

    fetchReviews();
  }, [contentId, contentType, refreshTrigger]);

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete your review?")) return;

    setDeletingId(reviewId);
    const { error } = await deleteReview(reviewId);

    if (error) {
      alert("Failed to delete review: " + error);
      setDeletingId(null);
      return;
    }

    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    setDeletingId(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDisplayName = (review: Review) => {
    return review.profiles?.username || "Anonymous User";
  };

  const getAvatarInitial = (review: Review) => {
    const name = getDisplayName(review);
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="reviews-loading">
        <div className="spinner-border spinner-border-sm text-warning" role="status">
          <span className="visually-hidden">Loading reviews...</span>
        </div>
        <span className="ms-2 text-secondary">Loading reviews...</span>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="reviews-empty">
        <p className="text-secondary mb-0">
          No reviews yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="reviews-list">
      <p className="text-secondary mb-3">
        {reviews.length} review{reviews.length !== 1 ? "s" : ""}
      </p>

      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-header">
            <div className="reviewer-info">
              {review.profiles?.avatar_url ? (
                <img
                  src={review.profiles.avatar_url}
                  alt={getDisplayName(review)}
                  className="reviewer-avatar"
                />
              ) : (
                <div className="reviewer-avatar-placeholder">
                  {getAvatarInitial(review)}
                </div>
              )}
              <div>
                <span className="reviewer-name">{getDisplayName(review)}</span>
                <span className="review-date">
                  {formatDate(review.created_at)}
                </span>
              </div>
            </div>

            <div className="review-actions">
              <StarRating value={review.rating} readonly size="sm" />
              {user?.id === review.user_id && (
                <button
                  className="btn btn-sm btn-outline-danger ms-2"
                  onClick={() => handleDelete(review.id)}
                  disabled={deletingId === review.id}
                >
                  {deletingId === review.id ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    />
                  ) : (
                    "🗑️"
                  )}
                </button>
              )}
            </div>
          </div>

          {review.comment && (
            <p className="review-comment">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
}
