function Hero() {
  return (
    <div className="hero">
      <div className="container mx-auto">
        <div
          className="row align-items-center justify-content-center"
          style={{ height: "400px" }}
        >
          <div className="col-6 text-center">
            <h1>
              The easiest and fastest way to{" "}
              <div className="text-primary">Learn</div> in Agriculture
            </h1>
            <a className="btn btn-primary mt-4" href="/article">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
