import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import store from "@/redux/store";

function MyApp({ Component, pageProps, store }) {
  return (
    <>
      {/* <Provider store={store}>
        <Component {...pageProps} />
      </Provider> */}
      <Component {...pageProps} />
    </>
  );
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
