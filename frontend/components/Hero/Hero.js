function Hero() {
  return (
    <div className="hero">
      <div className="row align-items-center">
        <div className="col d-flex justify-content-center">
          <div className="hero-content">
            <h5 style={{ color: "#32383d" }}>
              We empower you to learn what you love.
            </h5>
            <a className="btn btn-primary mt-4">Learn more</a>
          </div>
        </div>
        <div className="col">
          <img src="/img/hero/hero.svg" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
