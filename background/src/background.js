chrome.runtime.onMessage.addListener(function(message, callback) {
  if (message == "xxx") {
    // chrome.tabs.executeScript({ file: "script.js" });
  }
});

let addToStore = function(e) {
  alert("testing testing");
  //  chrome.tabs.executeScript({ file: "pop-up-thingie.js" });
};

chrome.contextMenus.create({
  title: "Add to eBay Store",
  contexts: ["page", "selection", "image", "link"]
});

chrome.contextMenus.onClicked.addListener(addToStore);
