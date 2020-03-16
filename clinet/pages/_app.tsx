import Head from "next/head";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import AppLayout from "../components/AppLayout";
import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleWare, { Task } from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "../reducers";
import rootSaga from "../sagas";
import { Provider } from "react-redux";
import { loadUserRequest } from "../reducers/user";
import Axios from "axios";
import Helmet from "react-helmet";

const App = ({ Component, store, pageProps }) => {
  return (
      <Provider store={store}>
        <Helmet
          title="NodeBird"
          htmlAttributes={{ lang: "ko" }}
          meta={[
            {
              charset: "UTF-8"
            },
            {
              name: "viewport",
              content: "width=device-width,minimum-scale=1,initial-scale=1"
            },
            {
              "http-equiv": "X-UA-Compatible",
              content: "IE=edge"
            }
          ]}
          link={[
            {
              rel: "stylesheet",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.7/antd.min.css"
            },
            {
              rel: "stylesheet",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            },
            {
              rel: "stylesheet",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            }
          ]}
        />
        {/* <Head>
                <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.7/antd.min.css"
                ></link>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </Head> */}
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
  );
};

App.getInitialProps = async context => {
  const { ctx } = context;
  let pageProps = {};
  const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
  const state = ctx.store.getState();
  if (ctx.isServer && cookie) {
    Axios.defaults.headers.Cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch(loadUserRequest());
  }

  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(ctx);
  }

  return { pageProps };
};
type TypeStore = Store & {
  sagaTask?: Task;
};

const configueStore = (initialState, options) => {
  const sagaMiddleWare = createSagaMiddleWare();
  const middleware = [sagaMiddleWare];
  const composeEnhancers = composeWithDevTools({});
  const store: TypeStore = createStore(
    RootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  store.sagaTask = sagaMiddleWare.run(rootSaga);
  return store;
};

export default withRedux(configueStore)(withReduxSaga(App));
