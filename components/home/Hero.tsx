import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section text-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold">Welcome to EARSTOPEERS</h1>
            <p className="lead">
              Movies, TV Shows, Anime, Games, Books &amp; Tech — all in one place.
            </p>
            <Link href="/movies" className="btn btn-warning btn-lg me-3">
              Explore
            </Link>
            <Link href="/auth" className="btn btn-outline-light btn-lg">
              Join Now
            </Link>
          </div>

          <div className="col-lg-6 text-center">
            <Image
              src="/logo.png"
              alt="EARSTOPEERS"
              width={550}
              height={350}
              className="img-fluid hero-image"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
