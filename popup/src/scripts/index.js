import App from "./components/app/App";

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import { Store, applyMiddleware } from "webext-redux";

import thunkMiddleware from "redux-thunk";
const store = new Store();
const middleware = [thunkMiddleware];
const proxyStore = applyMiddleware(store, ...middleware);

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <App />
    </Provider>,
    document.getElementById("popup-anchor")
  );
});
