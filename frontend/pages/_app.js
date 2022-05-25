import "bootstrap/dist/css/bootstrap.min.css";
import withRedux from "next-redux-wrapper";
import store from "@/redux/store";
import "@/public/styles.scss";
import { useDispatch } from 'react-redux';
import { checkAutoLogin } from "@/redux/selector/authSelector";
import { useEffect } from "react";

function MyApp({ Component, pageProps, store }) {

  const dispatch = useDispatch();
  useEffect(() => {
      checkAutoLogin(dispatch);
  }, []);

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
