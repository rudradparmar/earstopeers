"use client";

import { supabase } from "@/lib/supabase";

export default function AuthButtons() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex gap-2">
      <button onClick={login} className="btn btn-outline-light">
        Login
      </button>
      <button onClick={logout} className="btn btn-outline-danger">
        Logout
      </button>
    </div>
  );
}