"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event from Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setSessionReady(true);
        setChecking(false);
      }
    });

    // Also check if there's already a session (user clicked the link)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionReady(true);
      }
      setChecking(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="auth-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="auth-card-dark text-center py-5">
                <div
                  className="spinner-border text-warning mb-3"
                  role="status"
                />
                <p className="text-secondary mb-0">
                  Verifying your reset link...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <div className="auth-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="auth-card-dark text-center">
                <div className="mb-4">
                  <span style={{ fontSize: "3rem" }}>🔗</span>
                </div>
                <h3 className="text-white mb-3">Invalid or Expired Link</h3>
                <p className="text-secondary mb-4">
                  This password reset link is invalid or has expired. Please
                  request a new one.
                </p>
                <Link href="/auth" className="btn btn-warning">
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="auth-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="auth-card-dark text-center">
                <div className="mb-4">
                  <span style={{ fontSize: "3rem" }}>✅</span>
                </div>
                <h3 className="text-white mb-3">Password Updated!</h3>
                <p className="text-secondary mb-0">
                  Your password has been successfully reset. Redirecting you to
                  the homepage...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="auth-card-dark">
              {/* Logo */}
              <div className="text-center mb-4">
                <Link href="/" className="text-decoration-none">
                  <h2 className="auth-logo">🎧 EARSTOPEERS</h2>
                </Link>
                <p className="text-secondary">
                  Choose a new password for your account.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="alert alert-danger py-2 mb-3">{error}</div>
              )}

              {/* Reset Form */}
              <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                  <label className="form-label text-secondary">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control auth-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control auth-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                {/* Password strength hint */}
                <div className="password-hint mb-3">
                  <small className="text-secondary">
                    🔒 Password must be at least 6 characters
                  </small>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Updating password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
