"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthButtons from "./auth/authButtons";
import { useAuth } from "./auth/AuthProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { isAdmin } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark sticky-top" style={{ padding: "0.75rem 0" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          🎧 EARSTOPEERS
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation content — custom show/hide */}
        <div className={`navbar-menu ${isOpen ? "navbar-menu-open" : ""}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/movies" onClick={() => setIsOpen(false)}>
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/tv" onClick={() => setIsOpen(false)}>
                TV Shows
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/anime" onClick={() => setIsOpen(false)}>
                Anime
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/games" onClick={() => setIsOpen(false)}>
                Games
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/books" onClick={() => setIsOpen(false)}>
                Books
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link text-warning" href="/admin" onClick={() => setIsOpen(false)}>
                  🛡️ Admin
                </Link>
              </li>
            )}
          </ul>

          {/* Search bar */}
          <form className="d-flex me-3 navbar-search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search movies, shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
            <button className="btn btn-outline-warning" type="submit">
              Search
            </button>
          </form>

          {/* Auth buttons */}
          <div className="navbar-auth">
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
}