import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, connect } from "react-redux";
import { signup } from "@/redux/action/authAction";
import { useRouter } from "next/router";

function SignUp(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  function onSubmit(email, password) {
    dispatch(signup(email, password));
  }

  useEffect(() => {
    if (!props.loggedIn) return router.push("signin");
  }, [props.loggedIn]);

  useEffect(() => {
    console.log(props.errorMessage);
  }, [props.errorMessage]);

  return (
    <section className="sign-up">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                The best offer <br />
                <span className="text-primary">for your business</span>
              </h1>
              <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                quibusdam tempora at cupiditate quis eum maiores libero
                veritatis? Dicta facilis sint aliquid ipsum atque?
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {props.errorMessage && <div>User already exists</div>}
                    {/* Email */}
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        {...register("email", {
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <span className="text-danger">Email is required</span>
                      )}
                    </div>

                    {/* Password */}
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        {...register("password", {
                          required: true,
                          minLength: 6,
                        })}
                      />
                      {errors.password && (
                        <span className="text-danger">
                          Password is required
                        </span>
                      )}
                    </div>

                    {/* Submit  */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Sign up
                    </button>
                  </form>
                  <p>
                    If you've registered already,{" "}
                    <a className="link-primary" href="/signin">
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps)(SignUp);
