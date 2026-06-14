"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  getAllReviews,
  getAllUsers,
  adminDeleteReview,
  type AdminReview,
  type AdminUser,
} from "@/lib/admin";
import StarRating from "@/components/reviews/StarRating";

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"reviews" | "users">("reviews");
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/");
    }
  }, [authLoading, user, isAdmin, router]);

  useEffect(() => {
    async function loadData() {
      if (!isAdmin) return;
      setLoadingData(true);
      const [reviewsData, usersData] = await Promise.all([
        getAllReviews(),
        getAllUsers(),
      ]);
      setReviews(reviewsData);
      setUsers(usersData);
      setLoadingData(false);
    }

    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Delete this review?")) return;
    setDeletingId(reviewId);
    const { error } = await adminDeleteReview(reviewId);
    if (error) {
      alert("Error: " + error);
    } else {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    }
    setDeletingId(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Show nothing while checking auth
  if (authLoading || !isAdmin) {
    return (
      <div className="container py-5 text-center text-white">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page text-white">
      <div className="container py-5">
        {/* Header */}
        <div className="mb-4">
          <h1 className="display-5 fw-bold">🛡️ Admin Panel</h1>
          <p className="text-secondary">
            Manage reviews and users across EARSTOPEERS.
          </p>
        </div>

        {/* Stats */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="admin-stat-card">
              <h3>{reviews.length}</h3>
              <p>Total Reviews</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="admin-stat-card">
              <h3>{users.length}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="admin-stat-card">
              <h3>{users.filter((u) => u.is_admin).length}</h3>
              <p>Admins</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs mb-4">
          <button
            className={`admin-tab ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            📝 Reviews ({reviews.length})
          </button>
          <button
            className={`admin-tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Users ({users.length})
          </button>
        </div>

        {loadingData ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status" />
          </div>
        ) : activeTab === "reviews" ? (
          /* Reviews Table */
          <div className="admin-table-dark">
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Content</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review.id}>
                      <td>
                        <span className="text-warning">
                          {review.profiles?.username || "Anonymous"}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-secondary me-1">
                          {review.content_type}
                        </span>
                        {review.content_id}
                      </td>
                      <td>
                        <StarRating value={review.rating} readonly size="sm" />
                      </td>
                      <td>
                        <span className="text-truncate d-inline-block" style={{ maxWidth: "200px" }}>
                          {review.comment}
                        </span>
                      </td>
                      <td className="text-secondary">
                        {formatDate(review.created_at)}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteReview(review.id)}
                          disabled={deletingId === review.id}
                        >
                          {deletingId === review.id ? (
                            <span className="spinner-border spinner-border-sm" />
                          ) : (
                            "🗑️"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {reviews.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-secondary py-4">
                        No reviews yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Users Table */
          <div className="admin-table-dark">
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Username</th>
                    <th>Joined</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>
                        {u.avatar_url ? (
                          <img
                            src={u.avatar_url}
                            alt={u.username || "User"}
                            className="admin-user-avatar"
                          />
                        ) : (
                          <div className="reviewer-avatar-placeholder" style={{ width: 32, height: 32, fontSize: "0.8rem" }}>
                            {(u.username || "U").charAt(0).toUpperCase()}
                          </div>
                        )}
                      </td>
                      <td>{u.username || "—"}</td>
                      <td className="text-secondary">
                        {formatDate(u.created_at)}
                      </td>
                      <td>
                        {u.is_admin ? (
                          <span className="badge bg-warning text-dark">Admin</span>
                        ) : (
                          <span className="badge bg-secondary">User</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
