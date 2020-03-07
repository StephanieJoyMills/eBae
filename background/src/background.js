chrome.runtime.onMessage.addListener(function(message, callback) {
	chrome.tabs.query({active:true, currentWindow:true}, function(tab) {
	  chrome.tabs.remove(tab[0].id, function() { });
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
	chrome.tabs.create({url:"https://auth.sandbox.ebay.com/oauth2/authorize?client_id=OscarShi-eBae-SBX-f69ec6afc-ae2b9610&response_type=code&redirect_uri=Oscar_Shi-OscarShi-eBae-S-xjmrehj&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/buy.order.readonly https://api.ebay.com/oauth/api_scope/buy.guest.order https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.marketplace.insights.readonly https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly https://api.ebay.com/oauth/api_scope/buy.shopping.cart https://api.ebay.com/oauth/api_scope/buy.offer.auction https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.email.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.phone.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.address.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.name.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.status.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.item.draft https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/sell.item"});
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
