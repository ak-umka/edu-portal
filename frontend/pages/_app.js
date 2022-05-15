import "bootstrap/dist/css/bootstrap.min.css";
import withRedux from "next-redux-wrapper";
import store from "@/redux/store";
import "@/public/styles.css";

function MyApp({ Component, pageProps, store }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
