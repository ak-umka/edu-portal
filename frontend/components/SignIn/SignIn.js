import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, connect } from "react-redux";
import { login } from "@/redux/action/authAction";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

function SignIn(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  function onSubmit(email, password) {
    dispatch(login(email, password));
  }

  useEffect(() => {
    if (props.loggedIn) {
      router.push("/");
    }
  }, [props.loggedIn]);

  return (
    <section className="sign-in">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                {t("common:SignUpAndIn.title")} <br />
                <span className="text-primary">{t("common:SignUpAndIn.titlePrimary")} </span>
              </h1>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
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

                    {/* Submit  */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      {t("common:SignUpAndIn.SignIn")}
                    </button>
                  </form>
                  <p>
                    {t("common:SignUpAndIn.MessageSignIn")}
                    <Link href="/signup">
                      <a className="link-primary">
                        {" "}
                        {t("common:SignUpAndIn.SignUp")}
                      </a>
                    </Link>
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

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(SignIn);
