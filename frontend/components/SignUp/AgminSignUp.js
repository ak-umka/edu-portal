import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, connect, useStore } from "react-redux";
import { signup } from "@/redux/action/authAction";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

function AdminSignUp(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [role, setRole] = useState("admin");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function onSubmit(email, password, role, firstname, lastname) {
    dispatch(signup(email, password, role, firstname, lastname));
  }

  useEffect(() => {
    if (props.errorMessage === "User successfully created") {
      router.push("/signin");
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
                    {t("common:SignUpAndIn.AdminTitle")}
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Firstname */}
                    <div className="form-outline mb-4">
                      <label className="form-label">
                        {t("common:SignUpAndIn.Firstname")}
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        className="form-control"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        {...register("firstname", {
                          required: true,
                        })}
                      />
                      {errors.firstname && (
                        <span className="text-danger">
                          {t("common:SignUpAndIn.Firstname")}
                          {t("common:SignUpAndIn.IsRequired")}
                        </span>
                      )}
                    </div>
                    {/* Lastname */}
                    <div className="form-outline mb-4">
                      <label className="form-label">
                        {t("common:SignUpAndIn.Lastname")}
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        className="form-control"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        {...register("lastname", {
                          required: true,
                        })}
                      />
                      {errors.firstname && (
                        <span className="text-danger">
                          {t("common:SignUpAndIn.Lastname")}
                          {t("common:SignUpAndIn.IsRequired")}
                        </span>
                      )}
                    </div>
                    {/* Email */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email-form">
                        {t("common:SignUpAndIn.Email")}
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
                        <span className="text-danger">
                          {t("common:SignUpAndIn.Email")}
                          {t("common:SignUpAndIn.IsRequired")}
                        </span>
                      )}
                    </div>
                    {/* Password */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password-form">
                        {t("common:SignUpAndIn.Password")}
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
                          {t("common:SignUpAndIn.Password")}
                          {t("common:SignUpAndIn.IsRequired")}
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
                      {t("common:SignUpAndIn.SignUp")}
                    </button>
                  </form>
                  <p>
                    {t("common:SignUpAndIn.MessageSignUp")}
                    <Link className="link-primary" href="/signin">
                      <a className="link-primary">
                        {" "}
                        {t("common:SignUpAndIn.SignIn")}
                      </a>
                    </Link>
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
