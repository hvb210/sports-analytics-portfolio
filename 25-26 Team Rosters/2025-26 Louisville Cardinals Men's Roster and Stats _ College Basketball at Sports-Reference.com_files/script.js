var TL = gsap.timeline();
var replayBtn = false;

function checkLastTwoChars(str) {
  // Check that the string has at least two characters
  if (str.length >= 9) {
    return str.slice(-2) === '00';
  }
  return false;
}

function initiate(){
  // var dyData = jvxAd.getDynamicData();
  // var selectedDB = dyData['IBM-CTPOA-2767'];
  // if (selectedDB === undefined || selectedDB === "undefined") {
  //   var selectedRow = fallback();
  // } else {
  //   var selectedRow = selectedDB[0];
  // }

  //Set Dynamic Values
  var arrow_color = document.getElementById('arrow-color').innerHTML;
  // document.getElementById('background_image').src = selectedRow.background_image_970x250;
  // document.getElementById('background_image').alt = selectedRow.background_image_970x250_alt_text;

  // document.getElementById('copy').innerHTML = selectedRow.copy_970x250;
  // document.getElementById('copy').style = selectedRow.copy_style_970x250;

  // document.getElementById('copy').style.color = selectedRow.copy_color_970x250;
  // document.getElementById('cta-copy').innerHTML = selectedRow.cta_copy_970x250;
  // document.getElementById('cta-copy').style.color = selectedRow.cta_copy_color_970x250;
  // document.getElementById('cta-btn').style.background = selectedRow.cta_btn_color_970x250;
  // if ( checkLastTwoChars(selectedRow.cta_btn_color_970x250) ){
  //   document.getElementById('cta-btn').style.borderColor=selectedRow.cta_copy_color_970x250;
  //   document.getElementById('cta-btn').style.borderWidth="2px";
  //   document.getElementById('cta-btn').style.borderStyle="solid";
  // }
  document.getElementById('polygon').style.fill= arrow_color;
  let arrow_size='16'
  document.getElementById('arrow').setAttribute("viewBox", "0 0 "+ arrow_size + " " + arrow_size);
  document.getElementById('_Transparent_Rectangle_').setAttribute("width", arrow_size);
  document.getElementById('_Transparent_Rectangle_').setAttribute("height", arrow_size);
  // document.getElementById('arrow').src = selectedRow.arrow_970x250;
  // document.getElementById('arrow').alt = selectedRow.arrow_970x250_alt_text;

  //document.getElementById('url').href = selectedRow.url_970x250;

  //Add Listeners
  // document.getElementById("banner").addEventListener("click", exitActions);
  // document.getElementById("replay").addEventListener("mouseenter", mouseEnter);
  // document.getElementById("replay").addEventListener("click", replayAd);

  //Start Animation
  showAd();
}

function mouseEnter() {
  if (replayBtn == false){
    replayBtn = true;
    gsap.to("#replay", { duration:.5,rotation:360, ease:"power1.inOut", onComplete:function(){replayBtn=false, gsap.set("#replay", { rotation:0 })} }) 
  }
}

function replayAd() {
  TL.restart();
  console.log("Restart");
}

// function exitActions(e) {
//   jvxAd.openClickThrough();
//   console.log("Click");
// }

function fallback(){
  var defaultValue = {
    background_image_970x250: "images/IBM_DCO2025_brandcampaign_Global_drummer_970x250.jpg",
    background_image_970x250_alt_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum.",
    copy_970x250: "Focus on what matters with prioritied alerts based on specific business risk",
    copy_style_970x250:"",
    copy_color_970x250: "#000000",
    copy_fontSize_970x250: "",
    cta_btn_color_970x250: "#0f62fe",
    cta_copy_color_970x250: "#FFFFFF",
    cta_copy_970x250: "Button action",
    // arrow_970x250: "images/Arrow_16.svg",
    // arrow_970x250_alt_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum."
    //url_970x250: "https://www.ibm.com/services",
  }

  return defaultValue;
}

showAd = function () {
    
  textFit(document.getElementById('copy'), {minFontSize:24, maxFontSize: 36, multiLine: true})

  TL.set("#wrapper", { autoAlpha:1 })
    .set("#copy", {perspective: 400})
    .from("#background_image, #logo1", { duration:.1, autoAlpha:0, ease:"power1.out" }, 0)
    .from('#copy', { duration: 0.55, autoAlpha: 0, y:20, ease: "power1.out", stagger: 0.6}, "+0.4")    
    .from("#cta-btn", { duration: 0.55, autoAlpha:0, y:20, ease:"power1.out", stagger: 0.6 }, "+0.8")
    .from("#arrow", { duration:.9, x:-10, autoAlpha:0, ease:"back.out(4)" }, 0)
    .from("#replay", { duration:.9, rotation:-90, autoAlpha:0, ease:"power1.out" }, 0)
    .to("#arrow", { duration:.7, x:8, yoyo:true, repeat:3, ease:"power1.inOut" })
    .to("#arrow", { duration:.7, x:8, yoyo:true, repeat:3, ease:"power1.inOut" },"+=1.5")
};
