chrome.runtime.onMessage.addListener(function(message, callback) {
  if (message == "xxx") {
    // chrome.tabs.executeScript({ file: "script.js" });
  }
});

let addToStore = function(info, tab) {
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
  contexts: ["page", "selection", "image", "link"],
  onclick: getword
});

function getword(info, tab) {
  alert(info.linkUrl);
  let link = info.linkUrl;
  let content = link.split("=").length == 1 ? link.split("/") : link.split("=");
  let id = JSON.stringify(content[content.length - 1]);
  chrome.tabs.executeScript(
    tab.id,
    {
      code: `let id = ${id};`
    },
    function() {
      chrome.tabs.executeScript(tab.id, { file: "content.js" });
    }
  );
}
