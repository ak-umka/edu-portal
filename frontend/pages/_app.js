import "bootstrap/dist/css/bootstrap.min.css";
import withRedux from "next-redux-wrapper";
import store from "@/redux/store";
import { Provider } from "react-redux";
import "@/public/styles.scss";
import { useDispatch } from "react-redux";
import { checkAutoLogin } from "@/redux/selector/authSelector";
import { useEffect } from "react";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAutoLogin(dispatch);
  }, []);

  return (
    <div>
      <Provider store={store}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </div>
  );
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
