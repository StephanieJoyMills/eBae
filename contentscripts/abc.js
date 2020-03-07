$(document).ready(function(){
  alert("HI");
  chrome.runtime.sendMessage({greeting: "hello"});
})
