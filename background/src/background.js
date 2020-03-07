// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
// let tabs = [...document.querySelectorAll("a.tabnav-tab")];
// console.log(chrome);
// alert("here");
// alert(JSON.stringify(chrome.tabs));
// chrome.tabs.executeScript({ file: "pull_request.js" });

// chrome.tabs.executeScript(null, {
//   code: "document.body.style.backgroundColor='red'"
// });
// for (let i = 0; i < tabs.length; i++) {
//   tabs[i].addEventListener(
//     "click",
//     function() {
//       alert("here");
//       console.log("should be refreshing");
//       chrome.runtime.reload();
//       // proxyStore.dispatch(reloadExtension());
//     },
//     false
//   );
// }
// When tabs are switched we need to make sure codegem is loading in it's data accordingly.
chrome.runtime.onMessage.addListener(function(message, callback) {
  if (message == "Pull Request") {
    chrome.tabs.executeScript({ file: "pull_request.js" });
  } else if (message == "Review") {
    chrome.tabs.executeScript({ file: "review.js" });
  }
  sendResponse("we did it!");
});

function test(info) {
  console.log(info);
  // var searchstring = info.selectionText;
  // chrome.tabs.create({ url: "http://maps.google.com/maps?q=" + searchstring });
}

console.log("in background trip");
chrome.contextMenus.create({
  title: "Add to ebay",
  contexts: ["selection"],
  onclick: test
});

chrome.contextMenus.create({
  title: "Add me please",
  contexts: ["selection"],
  onclick: console.log("HI THERE")
});

// chrome.contextMenus.create(object createProperties, function callback)
