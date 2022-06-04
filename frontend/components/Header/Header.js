import data from "@/public/data.json";
import { connect, useDispatch } from "react-redux";
import { logout } from "@/redux/action/authAction";

function Header(props) {
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light w-100">
      <div className="container mx-auto ">
        <a className="navbar-brand m-4 text-primary" href="/">
          <strong>E-Portal</strong>
        </a>
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
              <a className="nav-link active " aria-current="page" href="/">
                Home
              </a>
            </li>
            {props.loggedIn ? (
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/create/post"
                >
                  Create
                </a>
              </li>
            ) : (
              <></>
            )}
            {props.auth?.user?.role === "admin" ? (
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/create/subd"
                >
                  Create Subd
                </a>
              </li>
            ) : (
              <></>
            )}
          </ul>
          {props.loggedIn ? (
            <a
              className="btn btn-outline-primary m-1"
              onClick={() => dispatch(logout())}
            >
              Log out
            </a>
          ) : (
            <div className="auth-buttons">
              <a className="btn btn-outline-primary m-1" href="/signup">
                Sign Up
              </a>
              <a className="btn btn-primary m-1" href="/signin">
                Sign In
              </a>
            </div>
          )}
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
