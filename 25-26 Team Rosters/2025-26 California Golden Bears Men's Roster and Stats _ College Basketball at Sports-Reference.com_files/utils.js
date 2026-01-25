let adWidth, adHeight, variables;
let fontsLoaded = false, allImagesLoaded = false;
const notImg = RegExp('blank|null|1x1');

function init() {
	main.classList.add(checkPlatform(0), checkPlatform(1));
	adWidth = myFT.manifestProperties.width;
	adHeight = myFT.manifestProperties.height;
	variables = myFT.instantAds;
}


function setAdditionalCss(element, list , startIndex) {
    for(let i = startIndex; i < list.length; i++) {
        const propertyValue = list[i].split(":");
		element.style.setProperty(propertyValue[0], propertyValue[1]);
    }
}

function setXY(element, xyPos) {
	var x = xyPos.trim().split(",")[0];
	var y = xyPos.trim().split(",")[1];
	if (x && Number(x.trim()))if (x.indexOf("+") > -1 || x.indexOf("-") > -1) { element.style.marginLeft = Number(x) + "px" } else { element.style.left = x + "px"; }
	if (y && Number(y.trim()))if (y.indexOf("+") > -1 || y.indexOf("-") > -1) { element.style.marginTop = Number(y) + "px" } else { element.style.top = y + "px"; }
  }
  function $(t){return (t.substr(0,1)=="#")?document.querySelector(t):document.querySelectorAll(t);}
  function createElement(t,id, c){const e = document.createElement(t);if(id)e.id = id;if(c)c.forEach(cName=> e.classList.add(cName)); return e;}
  function shrinkr(e){var t=parseInt(window.getComputedStyle(e,null).getPropertyValue("font-size")),l=0,i=0;"content-box"==window.getComputedStyle(e,null).getPropertyValue("box-sizing")&&(l=parseInt(window.getComputedStyle(e,null).getPropertyValue("padding-top"))+parseInt(window.getComputedStyle(e,null).getPropertyValue("padding-bottom")),i=parseInt(window.getComputedStyle(e,null).getPropertyValue("padding-left"))+parseInt(window.getComputedStyle(e,null).getPropertyValue("padding-right")));var n=e.clientWidth-i,o=parseInt(window.getComputedStyle(e,null).getPropertyValue("max-height"))-1;isNaN(o)&&(o=e.clientHeight-1),o-=l;var p=document.createElement("div");for(p.innerHTML=e.innerHTML,e.appendChild(p),p.style.position="absolute",p.style.margin="0px",p.style.padding="0px",p.style.visibility="hidden",p.style.fontFamily="inherit",p.style.fontSize=t+"px";(p.clientHeight>o||p.clientWidth>n)&&4!==t;)t--,p.style.fontSize=t+"px",e.style.fontSize=t+"px";e.removeChild(p)}
  function checkPlatform(){try{var e=[];navigator.platform.toLowerCase().indexOf("mac")>-1?e[0]="macOS":navigator.platform.toLowerCase().indexOf("win")>-1?e[0]="windows":navigator.userAgent.match(/iPhone|iPad|iPod/i)?e[0]="iOS":navigator.userAgent.match(/Opera Mini/i)?e[0]="opera":navigator.userAgent.match(/Android/i)?e[0]="android":navigator.userAgent.match(/BlackBerry/i)?e[0]="BlackBerry":(navigator.userAgent.match(/IEMobile/i)||navigator.userAgent.match(/WPDesktop/i))&&(e[0]="WindowsPhone");var r=window.navigator.userAgent.indexOf("MSIE "),n=window.navigator.userAgent.indexOf("Edge/"),o=window.navigator.userAgent.indexOf("Trident/");return navigator.userAgent.toLowerCase().indexOf("chrome")>-1?e[1]="chrome":navigator.userAgent.toLowerCase().indexOf("firefox")>-1?e[1]="firefox":navigator.vendor&&navigator.vendor.toLowerCase().indexOf("apple")>-1?e[1]="safari":(r>0||n>0||o>0)&&(e[1]="IE"),e}catch(a){console.error("Error on checkPlatform(): "+a.message)}}
  function checkLocal(){
	  const parsedUrl = new URL(window.location.href);
	  if (parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1' || parsedUrl.hostname === '::1') {
		  return true; // It's localhost
		}
  }
  function trace(c,l=0){checkLocal() && console.log(`trace console ${l}=> `, c)}