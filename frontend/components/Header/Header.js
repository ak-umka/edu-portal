import { connect, useDispatch } from "react-redux";
import { logout } from "@/redux/action/authAction";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function Header(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  let { asPath } = useRouter();

  const anchorIndex = asPath.indexOf("/");
  const path = anchorIndex ? asPath.substring(0, anchorIndex) : asPath;

  return (
    <nav className="navbar navbar-expand-lg navbar-light w-100">
      <div className="container mx-auto ">
        <Link href="/">
          <a
            className="navbar-brand m-4 text-primary"
            style={{ fontSize: "26px" }}
          >
            <strong>A-Engineer</strong>
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link active " aria-current="page">
                  {t("common:Home.Header.Home")}
                </a>
              </Link>
            </li>
            {props.loggedIn ? (
              <li className="nav-item">
                <Link href="/create/post">
                  <a className="nav-link active" aria-current="page">
                    {t("common:Home.Header.CreatePost")}
                  </a>
                </Link>
              </li>
            ) : (
              <></>
            )}
            {props.auth?.user?.role === "admin" ? (
              [
                {
                  name: t("common:Home.Header.CreateAssignment"),
                  link: "subd",
                },
                {
                  name: t("common:Home.Header.CreateSchedule"),
                  link: "schedule",
                },
              ].map((item, idx) => (
                <li className="nav-item" key={idx}>
                  <Link href={`/create/${item.link}`}>
                    <a className="nav-link active" aria-current="page">
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
          {props.loggedIn ? (
            <a
              className="btn btn-outline-primary m-1"
              onClick={() => dispatch(logout())}
            >
              {t("common:Home.Header.LogOut")}
            </a>
          ) : (
            <div className="auth-buttons">
              <Link href="/signup">
                <a className="btn btn-outline-primary m-1">
                  {t("common:Home.Header.SignUp")}
                </a>
              </Link>
              <Link href="/signin">
                <a className="btn btn-outline-primary m-1">
                  {t("common:Home.Header.SignIn")}
                </a>
              </Link>
            </div>
          )}
          <div className="navbar-end ">
            <div className="navbar-item ">
              <Link href={path} locale="en">
                <a className="text-secondary m-2 text-decoration-none">EN</a>
              </Link>
              <Link href={path} locale="ru">
                <a className="text-secondary m-2 text-decoration-none">RU</a>
              </Link>
              <Link href={path} locale="kz">
                <a className="text-secondary text-decoration-none">KZ</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  auth: state.auth.auth,
});

export default connect(mapStateToProps)(Header);
