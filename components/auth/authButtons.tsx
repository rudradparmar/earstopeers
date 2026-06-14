"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

export default function AuthButtons() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center">
        <div
          className="spinner-border spinner-border-sm text-warning"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="d-flex align-items-center gap-2">
        <div className="user-badge">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="Avatar"
              className="navbar-avatar"
            />
          ) : (
            <span className="navbar-avatar-placeholder">
              {(user.email || "U").charAt(0).toUpperCase()}
            </span>
          )}
          <span className="navbar-username d-none d-md-inline">
            {user.user_metadata?.full_name || user.email?.split("@")[0]}
          </span>
        </div>
        <button onClick={logout} className="btn btn-sm btn-outline-danger">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex gap-2">
      <button
        onClick={() => router.push("/auth")}
        className="btn btn-outline-warning"
      >
        Login
      </button>
    </div>
  );
}