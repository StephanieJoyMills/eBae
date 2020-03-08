chrome.runtime.onMessage.addListener(function(message, callback) {
	chrome.tabs.query({active:true, currentWindow:true}, function(tab) {
	  chrome.tabs.update({url: "localhost:3000"});
	});
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
	chrome.tabs.create({url:"https://auth.ebay.com/oauth2/authorize?client_id=OscarShi-eBae-PRD-069eabc89-3a165e8f&response_type=code&redirect_uri=Oscar_Shi-OscarShi-eBae-P-pqjdex&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly"});
}
