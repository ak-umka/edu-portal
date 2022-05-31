import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useEffect } from "react";
import Router from "next/router";

function AuthProvider(props) {
  const router = useRouter();
  const protectedRoutes = ["/create/post", "/create/subd"];
  const isProtected = (route) => protectedRoutes.includes(route);

  const Unauthorized = () => {
    Router.replace("/signin");
  };

  useEffect(() => {
    const route = router.route;
    // if (!props.loggedIn && isProtected(route)) return Unauthorized();
  }, [props.loggedIn]);

  return <>{props.children}</>;
}

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(AuthProvider);
