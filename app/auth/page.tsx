"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type AuthView = "login" | "register" | "forgot";

export default function AuthPage() {
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);

    try {
      if (view === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/");
      } else {
        // Register
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: username,
            },
          },
        });
        if (error) throw error;

        if (data.user) {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            username: username || email.split("@")[0],
          });
        }

        setSuccess(
          "Account created! Check your email for confirmation, or log in if email confirmation is disabled."
        );
        setView("login");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;

      setSuccess(
        "Password reset link sent! Check your email inbox (and spam folder) for a link to reset your password."
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    clearMessages();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // Forgot Password View
  if (view === "forgot") {
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
                    Enter your email and we&apos;ll send you a link to reset
                    your password.
                  </p>
                </div>

                {/* Error / Success */}
                {error && (
                  <div className="alert alert-danger py-2 mb-3">{error}</div>
                )}
                {success && (
                  <div className="alert alert-success py-2 mb-3">{success}</div>
                )}

                {/* Reset Form */}
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-3">
                    <label className="form-label text-secondary">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control auth-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Sending reset link...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>

                {/* Back to login */}
                <div className="text-center">
                  <button
                    className="btn btn-link forgot-password-link"
                    onClick={() => {
                      setView("login");
                      clearMessages();
                    }}
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isLogin = view === "login";

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
                  {isLogin
                    ? "Welcome back! Sign in to continue."
                    : "Create an account to get started."}
                </p>
              </div>

              {/* Toggle buttons */}
              <div className="auth-toggle mb-4">
                <button
                  className={`auth-toggle-btn ${isLogin ? "active" : ""}`}
                  onClick={() => {
                    setView("login");
                    clearMessages();
                  }}
                >
                  Sign In
                </button>
                <button
                  className={`auth-toggle-btn ${!isLogin ? "active" : ""}`}
                  onClick={() => {
                    setView("register");
                    clearMessages();
                  }}
                >
                  Register
                </button>
              </div>

              {/* Error / Success */}
              {error && (
                <div className="alert alert-danger py-2 mb-3">{error}</div>
              )}
              {success && (
                <div className="alert alert-success py-2 mb-3">{success}</div>
              )}

              {/* Email/Password Form */}
              <form onSubmit={handleEmailAuth}>
                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label text-secondary">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control auth-input"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label text-secondary">Email</label>
                  <input
                    type="email"
                    className="form-control auth-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary">Password</label>
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

                {/* Forgot Password Link */}
                {isLogin && (
                  <div className="text-end mb-3">
                    <button
                      type="button"
                      className="btn btn-link forgot-password-link p-0"
                      onClick={() => {
                        setView("forgot");
                        clearMessages();
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-warning w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </>
                  ) : isLogin ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="auth-divider">
                <span>or</span>
              </div>

              {/* Google OAuth */}
              <button
                onClick={handleGoogleLogin}
                className="btn btn-outline-light w-100 google-btn"
              >
                <svg
                  className="me-2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
