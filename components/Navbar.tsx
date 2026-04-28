"use client";

import Link from "next/link";
import AuthButtons from "./auth/authButtons";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          🎧 EARSTOPEERS
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/movies">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/tv">TV Shows</Link>
            </li>
          </ul>

          <form className="d-flex me-3">
            <input className="form-control me-2" placeholder="Search..." />
            <button className="btn btn-outline-warning">Search</button>
          </form>

          <div>
            <AuthButtons />
            
          </div>
        </div>
      </div>
    </nav>
  );
}