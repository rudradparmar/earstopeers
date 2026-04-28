export default function Hero() {
  return (
    <section className="bg-dark text-white py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold">Welcome to EARSTOPEERS</h1>
            <p className="lead">
              Movies, TV Shows, Anime, Games & Tech — all in one place.
            </p>
            <button className="btn btn-warning me-3">Explore</button>
          </div>

          <div className="col-lg-6">
            <img src="/hero.svg" alt="hero" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
}
