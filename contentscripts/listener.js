
console.log("hasda");
let hoverElem = null;
$(document).ready(function(){
  $('*').on('mouseenter', function(){
    console.log($(this).find('img').length);
    if($(this).is("img")){
      hoverElem = $(this)[0];
    }else if($(this).find('img').length > 0){
      hoverElem = $($(this).find('img')[0])[0]; //console.log(hoverElem.html())
    }
  });
  chrome.runtime.onMessage.addListener(function(message, callback){
    let tmp = null;
    let price = null;
    while($(hoverElem) != null){
      hoverElem = $(hoverElem);
      data = hoverElem.find(":contains($)").filter(function (){
        return ($(this).text().includes("$"));
      });
      if(data.length > 0){
        price = $(data[0]).text().match(/\$[0-9]+\.?[0-9]*/);
        alert(price);
        break;
      }
      hoverElem = $($(hoverElem).parent());
    }
    console.log(hoverElem.src);
  });
});
