import React from "react";
import { Provider } from "mobx-react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import AuctionStore from "./stores/AuctionStore";
import AuthStore from "./stores/AuthStore";
import OverlayStore from "./stores/OverlayStore";
import { Auth0Provider } from "./react-auth0-spa";
import history from "./utils/history";
import "./style.scss";
import "./normalize.scss";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Provider
    auctionStore={AuctionStore}
    authStore={AuthStore}
    routerHistory={history}
    overlayStore={OverlayStore}
  >
    <Auth0Provider
      authStore={AuthStore}
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
