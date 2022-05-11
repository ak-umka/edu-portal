function SignUp() {
    return (
      <section className="sign-up">
        <div
          className="px-4 py-5 px-md-5 text-center text-lg-start"
          style={{backgroundColor:"hsl(0, 0%, 96%)"}}
        >
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  The best offer <br />
                  <span className="text-primary">for your business</span>
                </h1>
                <p style={{color:"hsl(217, 10%, 50.8%)"}}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
              </div>
  
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form>
                      {/* Email */}
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3"
                          className="form-control"
                        />
                        <label className="form-label" for="form3Example3">
                          Email address
                        </label>
                      </div>
  
                      {/* Password */}
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4"
                          className="form-control"
                        />
                        <label className="form-label" for="form3Example4">
                          Password
                        </label>
                      </div>
  
                      {/* Submit  */}
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        Sign up
                      </button>
                    </form>
                    <p>If you've registered already, <a href="/signin">Sign In</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default SignUp;