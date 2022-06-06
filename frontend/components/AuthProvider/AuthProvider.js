import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Router from "next/router";

function AuthProvider(props) {
  const route = useRouter().route;
  const protectedRoutes = ["/create/post", "/create/subd", "/create/schedule"];
  const isProtected = (route) => protectedRoutes.includes(route);

  const Unauthorized = () => {
    Router.replace("/signin");
  };

  const checkAuth = () => {
    if (!props.loggedIn && isProtected(route)) return Unauthorized();
    return;
  };

  useEffect(() => {
    let timer = setTimeout(() => checkAuth(), 1);

    return () => {
      clearTimeout(timer);
    };
  }, [props.loggedIn]);

  return <>{props.children}</>;
}

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(AuthProvider);
