function Hero() {
  return (
    <div className="hero">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container mx-auto">
          <div className="row gx-lg-5 align-items-center justify-content-center">
            <div className="col-7 mb-5 mb-lg-0 text-center">
              <h1>
                The easiest and fastest way to{" "}
                <div className="text-primary">Learn</div> in Agriculture
              </h1>
              <div className="d-flex justify-center">
                <a className="btn btn-primary m-4" href="/schedule">
                  Schedule
                </a>
                <a className="btn btn-outline-primary m-4" href="/subds">
                  Assignments
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
