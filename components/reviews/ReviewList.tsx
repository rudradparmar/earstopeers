"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { getReviews, deleteReview, updateReview, type Review } from "@/lib/review";
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

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

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

  const startEditing = (review: Review) => {
    setEditingId(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment || "");
    setEditError(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditRating(0);
    setEditComment("");
    setEditError(null);
  };

  const handleEditSubmit = async (reviewId: string) => {
    setEditError(null);

    if (editRating === 0) {
      setEditError("Please select a rating.");
      return;
    }

    if (!editComment.trim()) {
      setEditError("Please write a comment.");
      return;
    }

    setEditSubmitting(true);

    const result = await updateReview({
      reviewId,
      rating: editRating,
      comment: editComment.trim(),
    });

    setEditSubmitting(false);

    if (result.error) {
      setEditError(result.error);
      return;
    }

    // Update the review in the local list
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? { ...r, rating: editRating, comment: editComment.trim() }
          : r
      )
    );

    cancelEditing();
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

      {reviews.map((review) => {
        const isEditing = editingId === review.id;
        const isOwner = user?.id === review.user_id;

        return (
          <div key={review.id} className={`review-card ${isEditing ? "review-card-editing" : ""}`}>
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
                {!isEditing && (
                  <StarRating value={review.rating} readonly size="sm" />
                )}
                {isOwner && !isEditing && (
                  <>
                    <button
                      className="btn btn-sm btn-outline-warning ms-2"
                      onClick={() => startEditing(review)}
                      title="Edit review"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger ms-1"
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
                  </>
                )}
              </div>
            </div>

            {isEditing ? (
              <div className="review-edit-form">
                {/* Edit Rating */}
                <div className="mb-3">
                  <label className="form-label text-secondary small">Rating</label>
                  <div>
                    <StarRating value={editRating} onChange={setEditRating} size="md" />
                  </div>
                </div>

                {/* Edit Comment */}
                <div className="mb-3">
                  <label className="form-label text-secondary small">Comment</label>
                  <textarea
                    className="form-control review-textarea"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    rows={3}
                    maxLength={1000}
                  />
                  <div className="text-end mt-1">
                    <small className="text-secondary">
                      {editComment.length}/1000
                    </small>
                  </div>
                </div>

                {/* Edit Error */}
                {editError && (
                  <div className="alert alert-danger py-2 mb-3">{editError}</div>
                )}

                {/* Edit Actions */}
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditSubmit(review.id)}
                    disabled={editSubmitting || editRating === 0}
                  >
                    {editSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-1" role="status" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={cancelEditing}
                    disabled={editSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              review.comment && (
                <p className="review-comment">{review.comment}</p>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}

