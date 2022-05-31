import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useEffect } from "react";

function AuthProvider(props) {
  const router = useRouter();
  const protectedRoutes = ["/create/post", "/create/subd"];
  const isProtected = (route) => protectedRoutes.includes(route);

  const Unauthorized = () => {
    router.replace("/signin");
  };

  useEffect(() => {
    const route = router.route;
    console.log(isProtected(route));
    if (!props.loggedIn && isProtected(route)) Unauthorized();
    return;
  }, [props.loggedIn]);

  return <>{props.children}</>;
}

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(AuthProvider);
