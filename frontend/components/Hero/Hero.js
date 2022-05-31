function Hero() {
  return (
    <div className="hero">
      <div className="container mx-auto">
        <div
          className="row align-items-center justify-content-center"
          style={{ height: "500px" }}
        >
          <div className="col-7 text-center">
            <h1>
              The easiest and fastest way to{" "}
              <div className="text-primary">Learn</div> in Agriculture
            </h1>
            <div className="d-flex justify-center">
              <a className="btn btn-primary m-4" href="/article">
                Explore
              </a>
              <a className="btn btn-outline-primary m-4" href="/subds">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
