import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Store } from "webext-redux";

import App from "./components/app/App";

const proxyStore = new Store();

const anchor = document.createElement("div");
anchor.id = "rcr-anchor";

let element = document.querySelector(`a[href*="${id}"]`);
let img = element.getElementsByTagName("img")[0].getAttribute("src");
let price = "";
let title = "";
let count = 10;
while (count > 0 && (price == "" || title == "")) {
  let text = element.innerText;
  if (text !== "") {
    let checkCurrency = text.split("$");
    if (checkCurrency.length !== 1) {
      price = checkCurrency[checkCurrency.length - 1];
    } else {
      title = checkCurrency[0];
    }
  }
  count--;
  element = element.parentElement;
}

document.body.insertBefore(anchor, document.body.childNodes[0]);
proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <App price={price} title={title} img={img} />
    </Provider>,
    document.getElementById("rcr-anchor")
  );
});
