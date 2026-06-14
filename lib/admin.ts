import { supabase } from "./supabase";

export interface AdminReview {
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

export interface AdminUser {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  is_admin: boolean;
}

/**
 * Check if a user is an admin.
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .single();

  return data?.is_admin === true;
}

/**
 * Fetch all reviews across all content.
 */
export async function getAllReviews(): Promise<AdminReview[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, profiles(username, avatar_url)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("ADMIN FETCH REVIEWS ERROR:", error);
    return [];
  }

  return data as AdminReview[];
}

/**
 * Fetch all user profiles.
 */
export async function getAllUsers(): Promise<AdminUser[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("ADMIN FETCH USERS ERROR:", error);
    return [];
  }

  return data as AdminUser[];
}

/**
 * Admin delete any review (must have RLS policy or service role for this).
 * Note: With the anon key, this will only work if the RLS policy
 * allows deletion. You may need a separate "admin can delete" policy.
 */
export async function adminDeleteReview(
  reviewId: string
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId);

  if (error) {
    console.error("ADMIN DELETE REVIEW ERROR:", error);
    return { error: error.message };
  }

  return { error: null };
}
