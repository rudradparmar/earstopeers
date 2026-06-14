import { supabase } from "./supabase";

export interface Review {
  id: string;
  user_id: string;
  content_id: string;
  content_type: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles?: {
    username: string | null;
    avatar_url: string | null;
  };
}

/**
 * Fetch all reviews for a specific content item, joined with profile data.
 */
export async function getReviews(
  contentId: string,
  contentType: string
): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, profiles(username, avatar_url)")
    .eq("content_id", contentId)
    .eq("content_type", contentType)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("FETCH REVIEWS ERROR:", error);
    return [];
  }

  return data as Review[];
}

/**
 * Check if the current user already has a review for this content.
 */
export async function getUserReview(
  userId: string,
  contentId: string,
  contentType: string
): Promise<Review | null> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", userId)
    .eq("content_id", contentId)
    .eq("content_type", contentType)
    .maybeSingle();

  if (error) {
    console.error("GET USER REVIEW ERROR:", error);
    return null;
  }

  return data;
}

/**
 * Submit a new review. Returns the inserted review or an error message.
 */
export async function submitReview(params: {
  userId: string;
  contentId: string;
  contentType: string;
  rating: number;
  comment: string;
}): Promise<{ data: Review | null; error: string | null }> {
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      user_id: params.userId,
      content_id: params.contentId,
      content_type: params.contentType,
      rating: params.rating,
      comment: params.comment,
    })
    .select()
    .single();

  if (error) {
    console.error("SUBMIT REVIEW ERROR:", error);

    // Handle duplicate constraint
    if (error.code === "23505") {
      return { data: null, error: "You have already reviewed this content." };
    }

    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Update an existing review's rating and/or comment.
 */
export async function updateReview(params: {
  reviewId: string;
  rating: number;
  comment: string;
}): Promise<{ data: Review | null; error: string | null }> {
  const { data, error } = await supabase
    .from("reviews")
    .update({
      rating: params.rating,
      comment: params.comment,
    })
    .eq("id", params.reviewId)
    .select()
    .single();

  if (error) {
    console.error("UPDATE REVIEW ERROR:", error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Delete a review by ID. Only works if RLS allows (user owns the review).
 */
export async function deleteReview(
  reviewId: string
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId);

  if (error) {
    console.error("DELETE REVIEW ERROR:", error);
    return { error: error.message };
  }

  return { error: null };
}