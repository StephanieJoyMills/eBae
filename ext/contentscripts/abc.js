$(document).ready(function(){
  chrome.runtime.sendMessage({greeting: "hello"});
})
