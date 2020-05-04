import React from "react";
import NavBar from "./components/NavBar";
import { Prompt, Redirect } from 'react-router-dom';

import { Router, Switch } from "react-router-dom";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import AuctionsPage from './pages/AuctionsPage';
import CreateAuctionPage from './pages/CreateAuctionPage';
import LoadingSpinner from './components/LoadingSpinner';
import { inject, observer } from 'mobx-react';

const App = (props) => {
  const { overlayStore } = props;

  return (
    <div className="App">
      <LoadingSpinner display={overlayStore.displaySpinner} />
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <PrivateRoute path="/" exact component={AuctionsPage} />
          <PrivateRoute path="/auctions" component={AuctionsPage} />
          <PrivateRoute path="/create" component={CreateAuctionPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default inject('overlayStore')(observer(App));
