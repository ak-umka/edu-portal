import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, connect } from "react-redux";
import { signup } from "@/redux/action/authAction";
import { useRouter } from "next/router";

function AdminSignUp(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState("admin");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  function onSubmit(email, password, role) {
    dispatch(signup(email, password, role));
  }

  useEffect(() => {
    if (props.errorMessage === "User successfully created") {
      router.push("/admin/signin");
    }
  }, [props.errorMessage]);

  return (
    <div className="admin-sign-up">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <div className="row gx-lg-5 justify-content-center align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <h2 className="text-primary text-center m-4">
                    Sign Up as Admin
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email-form">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email-form"
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
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password-form">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password-form"
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

                    {/* Role */}
                    <div className="form-outline mb-4">
                      <input
                        className="form-control"
                        value={role}
                        hidden
                        onChange={(e) => setRole(e.target.value)}
                        {...register("role", {
                          required: true,
                        })}
                      />
                      {errors.role && (
                        <span className="text-danger">Role is required</span>
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
                    If you haven't registered yet,{" "}
                    <a className="link-primary" href="/admin/signin">
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps)(AdminSignUp);
