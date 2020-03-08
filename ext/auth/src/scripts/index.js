import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import { Store, applyMiddleware } from "webext-redux";

import thunkMiddleware from "redux-thunk";
import PR from "./components/PR";
// ??
const store = new Store();
const middleware = [thunkMiddleware];
const proxyStore = applyMiddleware(store, ...middleware);

proxyStore.ready().then(() => {
  let hook = document.getElementsByTagName("body")[0];

  let anchor = document.createElement("div");
  let id = "auth-anchor";
  anchor.id = id;
  hook.insertBefore(anchor, hook.children[0]);
  // console.log(hook);
  // let myImage = document.createElement("img");

  // let iconUrl = chrome.runtime.getURL("images/image.png");
  // console.log(iconUrl);
  // myImage.src = iconUrl;
  // hook.insertBefore(myImage, hook.children[0]);

  render(
    <Provider store={proxyStore}>{<PR />}</Provider>,
    document.getElementById(id)
  );
});
