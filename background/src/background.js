chrome.runtime.onMessage.addListener(function(message, callback) {
  if (message == "xxx") {
    // chrome.tabs.executeScript({ file: "script.js" });
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == "complete" && tab.active) {
    chrome.tabs.executeScript({ file: "listener.js" });
  }
});

let addToStore = function(e) {
  alert("testing testing");
  chrome.tabs.executeScript({ file: "content.js" });

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(
      response
    ) {
      console.log(response.farewell);
    });
  });
  chrome.runtime.sendMessage({ greeting: "hello" });
  //  chrome.tabs.executeScript({ file: "pop-up-thingie.js" });
};

chrome.contextMenus.create({
  title: "Add to eBay Store",
  contexts: ["page", "selection", "image", "link"]
});

chrome.contextMenus.onClicked.addListener(addToStore);
