"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { submitReview, getUserReview } from "@/lib/review";
import { supabase } from "@/lib/supabase";
import StarRating from "./StarRating";
import { useEffect } from "react";

interface AddReviewProps {
  contentId: string;
  contentType: string;
  onReviewAdded: () => void;
}

export default function AddReview({
  contentId,
  contentType,
  onReviewAdded,
}: AddReviewProps) {
  const { user, loading: authLoading } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hasExistingReview, setHasExistingReview] = useState(false);
  const [checkingExisting, setCheckingExisting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Check if user already has a review for this content
  useEffect(() => {
    async function checkExisting() {
      if (!user) {
        setHasExistingReview(false);
        return;
      }
      setCheckingExisting(true);
      const existing = await getUserReview(user.id, contentId, contentType);
      setHasExistingReview(!!existing);
      setCheckingExisting(false);
    }

    checkExisting();
  }, [user, contentId, contentType]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.href,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!user) {
      setError("You must be logged in to submit a review.");
      return;
    }

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a comment.");
      return;
    }

    setSubmitting(true);

    const result = await submitReview({
      userId: user.id,
      contentId,
      contentType,
      rating,
      comment: comment.trim(),
    });

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    setRating(0);
    setComment("");
    setHasExistingReview(true);
    onReviewAdded();

    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  // Loading state
  if (authLoading || checkingExisting) {
    return (
      <div className="add-review-card">
        <div className="text-center py-3">
          <div
            className="spinner-border spinner-border-sm text-warning"
            role="status"
          />
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="add-review-card add-review-login-prompt">
        <div className="text-center">
          <p className="mb-3 text-secondary">
            Sign in to share your thoughts
          </p>
          <button onClick={handleLogin} className="btn btn-warning">
            <span className="me-2">🔑</span>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // Already reviewed
  if (hasExistingReview) {
    return (
      <div className="add-review-card">
        <div className="text-center">
          <p className="text-success mb-0">
            ✅ You&apos;ve already reviewed this. You can delete your review above to
            submit a new one.
          </p>
        </div>
      </div>
    );
  }

  // Review form
  return (
    <div className="add-review-card">
      <h4 className="add-review-title">Write a Review</h4>

      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div className="mb-3">
          <label className="form-label text-secondary">Your Rating</label>
          <div>
            <StarRating value={rating} onChange={setRating} size="lg" />
          </div>
        </div>

        {/* Comment */}
        <div className="mb-3">
          <label htmlFor="reviewComment" className="form-label text-secondary">
            Your Review
          </label>
          <textarea
            id="reviewComment"
            className="form-control review-textarea"
            placeholder="What did you think? Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={1000}
          />
          <div className="text-end mt-1">
            <small className="text-secondary">
              {comment.length}/1000
            </small>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger py-2 mb-3" role="alert">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="alert alert-success py-2 mb-3" role="alert">
            🎉 Review submitted successfully!
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-warning w-100"
          disabled={submitting || rating === 0}
        >
          {submitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              />
              Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </div>
  );
}