// call Adlib.screenshotterEnd() on the last animation code.
// do not delete initAnimation function since this is the first function that will be called after initialization of defaultValues.
// if ever there is a video for this ad, you can use myVideo as the variable to play the video.
// sample tween codes:
// tween.to("#disclaimerWrapper", {opacity:0.99,duration: 1,ease: "power2.out"},"-=1");
// tween.set("#frame1HeadlineWrapper",{opacity:1})
let tween;
var slideIndex = 1, slideIndicator = 1, buttonClick=0, above4="no";
let endTween;
let classActive="cards-monthly";



// Check Blank Image
function checkBlankImage(element) { return (defaultValues[element].indexOf("blank") !== -1 || defaultValues[element] === "" || defaultValues[element] === null || defaultValues[element] === undefined); }

function initAnimation() {
     // place all fluid elements before text resize and css attrib.
     removeY3VzdG9t(["uiElement1","uiElement2","uiElement3","ctaColor1","trigger"]);
     document.querySelector("#customColorBG-container").style.background = defaultValues.uiElement3;

     document.querySelector(
        "#gradientColor"
      ).style.background = `linear-gradient(to top, ${defaultValues.uiElement1} 0%, rgba(4, 15, 68, 0.00) 100%)`;

     document.querySelector("#gradientColor").style.opacity =
        defaultValues.uiElement2;

     document.querySelector("#gradientColorFullImage").style.background = `linear-gradient(to right, ${defaultValues.uiElement1}  0%, rgba(0, 0, 0, 0.00) 100%)`;
     document.querySelector("#gradientColorFullImage").style.opacity =
        defaultValues.uiElement2;


     var f1subheadline1 = defaultValues.frame1Subheadline;
     var f1subheadline2 = defaultValues.frame1Subheadline2;
     var f1subheadline3 = defaultValues.frame1Subheadline3;
     var replacef1subheadline1_openBracket, replacef1subheadline1_closingBracket, replacef1subheadline2_openBracket, replacef1subheadline2_closingBracket, replacef1subheadline3_openBracket, replacef1subheadline3_closingBracket;   

     replacef1subheadline1_openBracket = f1subheadline1.replaceAll('[', '<span>');
     replacef1subheadline1_closingBracket = replacef1subheadline1_openBracket.replaceAll(']', '</span>');

     replacef1subheadline2_openBracket = f1subheadline2.replaceAll('[', '<span>');
     replacef1subheadline2_closingBracket = replacef1subheadline2_openBracket.replaceAll(']', '</span>');

     replacef1subheadline3_openBracket = f1subheadline3.replaceAll('[', '<span>');
     replacef1subheadline3_closingBracket = replacef1subheadline3_openBracket.replaceAll(']', '</span>');

     document.getElementById('frame1subheadline-text').innerHTML = replacef1subheadline1_closingBracket;
     document.getElementById('frame1subheadline2-text').innerHTML = replacef1subheadline2_closingBracket;
     document.getElementById('frame1subheadline3-text').innerHTML = replacef1subheadline3_closingBracket;

     document.querySelector("#cta-box").style.background = defaultValues.ctaColor1;

     showDivs(slideIndex,1,"default",200);
     triggerDisplay();
     contentValidation();
     Adlib.textResize(); // This is optional if your build doesn't use text resize you can delete this
     Adlib.templateCSS(this); // DO NOT DELETE THIS
     startAnimation();
}
function startAnimation() {  
     document.querySelector("#mainContent").style.opacity = 1;
     tween = gsap.timeline();
     takeScreenshot();
    tween.addLabel("autoanimation")
     .to(this, {onStart: () => {
                        plusDivs(1,"auto", buttonClick+=0);
               }, onComplete: () => {
                        tween.to(this,{onComplete:takeScreenshot,duration:.5},"autoanimation+=1.75");
               }},"autoanimation+=1.75")
     .to(this, {onStart: () => {
                        plusDivs(1,"auto", buttonClick+=0);
                    }, onComplete: () => {
                        tween.to(this,{onComplete:takeScreenshot,duration:.5},"autoanimation+=3.5");
               }},"autoanimation+=3.5")
     .to(this, {onStart: () => {
                       slidingtoRight('default');
                    }, onComplete: () => {
                        tween.to(this,{onComplete:takeScreenshot,duration:.75},"autoanimation+=5.25");
               }},"autoanimation+=5.25")
     .to(this, {onStart: () => {
                        plusDivs(1,"auto", buttonClick+=0);
                    }, onComplete: () => {
                        tween.to(this,{onComplete:takeScreenshot,duration:.5},"autoanimation+=7");
               }},"autoanimation+=7")
     .to(this, {onStart: () => {
                        plusDivs(1,"auto", buttonClick+=0);
                    }, onComplete: () => {
                        tween.to(this,{onComplete:animationEnd,duration:.5},"autoanimation+=8.80");
               }},"autoanimation+=8.75");

}
function animationEnd() {
     // call this function on the very end of the last animation.     
     takeScreenshot();
     setTimeout(function() {adlibEnd();},200);
     endTween = "yes";
}


// Remove <p class="Y3VzdG9t"> tag
function removeY3VzdG9t(elems) {
     elems.forEach((e) => { defaultValues[e] = defaultValues[e].replace(/<[^>]*>?/gm, ''); });
}


function slidingtoLeft(leftAction){
     var activeNow = document.querySelector('.active').id;
     slidingtoLeftgsap = gsap.timeline();

     if(leftAction=="click" && endTween!="yes") {
          tween.kill()
          animationEnd();
     }

     if(activeNow!="pill-monthly") {
          var yearlyCardPrev = document.getElementsByClassName("cards-yearly");
          var monthlyCardPrev = document.getElementsByClassName("cards-monthly");
          var y = document.getElementsByClassName("indicator");

          // slidingtoLeftgsap.set(["#card1"],{x:0});
          classActive="cards-monthly";
          slidingtoLeftgsap.add("anim")
          .fromTo(yearlyCardPrev[slideIndex-1],{opacity:1, x:0},{opacity:0,x:0, ease: "power2.in"},"anim+=0")
          .fromTo("#white-container", {x:97}, {x:0, ease: "power2.inOut"},"anim+=0")
          .to(this,{ onComplete:()=>{
               document.getElementById("pill-yearly").classList.remove("active");
               document.querySelector('#pill-monthly').classList.add("active");
          }},"anim-=0.2")
          .fromTo(yearlyCardPrev[slideIndex-1],{opacity:1, x:0},{opacity:0,x:0, ease: "power2.in"},"anim+=0")
          .fromTo(monthlyCardPrev[0],{opacity:0, x:0},{display:"flex",opacity:1,x:0, ease: "power2.in"},"anim+=.5")
          .to(this,{ onComplete:()=>{
               //set indicators to display none
               for (j = 0; j < y.length; j++) {
                    y[j].style.backgroundColor = "rgba(255, 255, 255, 0.15)";
               }

               //set indicator to active
               y[0].style.backgroundColor = "rgba(255, 255, 255, 0.50)";
          }},"anim+=0");
          

           slideIndex=1; 

          // showDivs(slideIndex,1,"click");

     }    
}

function slidingtoRight(rightAction){
     var activeNow = document.querySelector('.active').id;

     slidingtoRightgsap = gsap.timeline();

     if(rightAction=="click" && endTween!="yes") {
          tween.kill()
          animationEnd();
     }

     if(activeNow!="pill-yearly") {
          var monthlyCardPrev = document.getElementsByClassName("cards-monthly");
          var yearlyCardPrev = document.getElementsByClassName("cards-yearly");
          var y = document.getElementsByClassName("indicator");

          // for (i = 0; i < x.length; i++) {
          //      x[i].style.display = "none";  
          // }

          classActive="cards-yearly";
          slidingtoRightgsap.add("anim")
          .fromTo(monthlyCardPrev[slideIndex-1],{opacity:1, x:0},{opacity:0,x:0, ease: "power2.in"},"anim+=0")
          .fromTo("#white-container", {x:0}, {x:97, ease: "power2.inOut"},"anim+=0")
          .to(this,{ onComplete:()=>{
               document.getElementById("pill-monthly").classList.remove("active");
               document.querySelector('#pill-yearly').classList.add("active");
          }},"anim-=0.2")
          .fromTo(monthlyCardPrev[slideIndex-1],{opacity:1, x:0},{opacity:0,x:0, ease: "power2.in"},"anim+=0")
          .fromTo(yearlyCardPrev[0],{opacity:0, x:0},{display:"flex",opacity:1,x:0, ease: "power2.in"},"anim+=.5")
          .to(this,{ onComplete:()=>{
               //set indicators to display none
               for (j = 0; j < y.length; j++) {
                    y[j].style.backgroundColor = "rgba(255, 255, 255, 0.15)";
               }

               //set indicator to active
               y[0].style.backgroundColor = "rgba(255, 255, 255, 0.50)";
          }},"anim+=0");

          slideIndex=1; 


          // tween.fromTo(x[slideIndex-1],{opacity:0},{opacity:1, ease: "power2.in"});    

          // showDivs(slideIndex,1,"click");
     }
     
}

function contentValidation() {
     // baseimage 
     var baseImageArray = ["baseImage", "baseImage3", "baseImage5"];
     var baseImageContainerIdArray = ["baseimg1", "baseimg3","baseimg5"];
     for(var ctr=0; ctr < baseImageArray.length; ctr++) {
          // if((baseImageArray[ctr].indexOf("blank") > -1)) {
          if(checkBlankImage(baseImageArray[ctr])) {
               document.getElementById(baseImageContainerIdArray[ctr]).style.display = "none";
          }      
     }

     // frame 1 subheadline - key art title
     var f1subheadlineArray = [defaultValues.frame1Subheadline, defaultValues.frame1Subheadline2, defaultValues.frame1Subheadline3];
     var f1subheadlineContainerIdArray = ["frame1subheadline-text", "frame1subheadline2-text","frame1subheadline3-text"];
     for(var ctr=0; ctr < f1subheadlineArray.length; ctr++) {
          if(Adlib.isEmpty(f1subheadlineArray[ctr])) {
               document.getElementById(f1subheadlineContainerIdArray[ctr]).style.display = "none";
          }      
     }

     // headline - Promo name
     var frameHeadlineArray = [defaultValues.frame1Headline, defaultValues.frame2Headline, defaultValues.frame3Headline, defaultValues.frame4Headline, defaultValues.frame5Headline, defaultValues.frame6Headline];
     var frameHeadlineContainerIdArray = ["frame1headline-text","frame2headline-text","frame3headline-text","frame4headline-text","frame5headline-text","frame6headline-text",];
     for(var ctr=0; ctr < frameHeadlineArray.length; ctr++) {
          if(Adlib.isEmpty(frameHeadlineArray[ctr])) {
               document.getElementById(frameHeadlineContainerIdArray[ctr]).style.display = "none";
          }      
     }

     // headline2 - Promo Description
     var frameHeadline2Array = [defaultValues.frame1Headline2, defaultValues.frame2Headline2, defaultValues.frame3Headline2, defaultValues.frame4Headline2, defaultValues.frame5Headline2, defaultValues.frame6Headline2];
     var frameHeadline2ContainerIdArray = ["frame1headline2-text","frame2headline2-text","frame3headline2-text","frame4headline2-text","frame5headline2-text","frame6headline2-text",];
     for(var ctr=0; ctr < frameHeadline2Array.length; ctr++) {
          if(Adlib.isEmpty(frameHeadline2Array[ctr])) {
               document.getElementById(frameHeadline2ContainerIdArray[ctr]).style.display = "none";
          }      
     }

     // headline3 - Price
     var frameHeadline3Array = [defaultValues.frame1Headline3, defaultValues.frame2Headline3, defaultValues.frame3Headline3, defaultValues.frame4Headline3, defaultValues.frame5Headline3, defaultValues.frame6Headline3];
     var frameHeadline3ContainerIdArray = ["frame1headline3-text","frame2headline3-text","frame3headline3-text","frame4headline3-text","frame5headline3-text","frame6headline3-text",];
     for(var ctr=0; ctr < frameHeadline3Array.length; ctr++) {
          if(Adlib.isEmpty(frameHeadline3Array[ctr])) {
               document.getElementById(frameHeadline3ContainerIdArray[ctr]).style.display = "none";
          }      
     }

     // legal - disclaimer 
     var legalArray = [defaultValues.legal, defaultValues.legal2, defaultValues.legal3];
     var legalContainerIdArray = ["legal-text", "legal2-text","legal3-text","legal4-text", "legal5-text","legal6-text"];
     for(var ctr=0; ctr < legalArray.length; ctr++) {
          if(Adlib.isEmpty(legalArray[ctr])) {
               document.getElementById(legalContainerIdArray[ctr]).style.display = "none";
               document.getElementById(legalContainerIdArray[ctr+3]).style.display = "none";
          }      
     }

     // frame1Image - curve image
     // if((defaultValues.frame1Image.indexOf("blank") > -1)) {
     if(checkBlankImage("frame1Image")) {
          document.getElementById("curve-container").style.display = "none";
     }

     //frame1Subheadline4 - Supporting Text for logo
     if(Adlib.isEmpty(defaultValues.frame1Subheadline4))
     {
          document.getElementById("frame1subheadline4-container").style.display = "none";
     }
  
}

/* Slide Show */

// showDivs(slideIndex);

function plusDivs(n,triggerButton, noOfClicks) {
     plusDivsgsap = gsap.timeline();
     var positionOfPrev;

     if(triggerButton=="arrowButton" && noOfClicks==1  && endTween!="yes") {
          tween.kill()
          animationEnd();
     }

     if(n=="1" && slideIndex<6){
          plusDivsgsap.set(["#card1","#card2","#card3","#card4","#card5","#card6"],{x:200});
          positionOfPrev=-200;
     } else if(n=="-1") {
          plusDivsgsap.set(["#card1","#card2","#card3","#card4","#card5","#card6"],{x:-200});
          positionOfPrev=200;
     }


     showDivs(slideIndex += n,n,"default",positionOfPrev);
}

function showDivs(n,n2,activeNowId,posOfPrev,slideNumber,posOfCurrent) {
 

     slideIndicator = slideIndex;
     showDivsgsap = gsap.timeline();


     var i;
     var currentCards = document.getElementsByClassName(classActive);
     var y = document.getElementsByClassName("indicator");


     

     if (n >= 4) {slideIndex = 1; slideIndicator = 1; above4="yes";}
     if (n < 1) {slideIndex = currentCards.length, slideIndicator = 3}


     for (i = 0; i < currentCards.length; i++) {
          currentCards[i].style.display = "none";  
     }


     //set indicators to display none
     for (j = 0; j < y.length; j++) {
          y[j].style.backgroundColor = "rgba(255, 255, 255, 0.15)";
     }

     //set indicator to active
     y[slideIndicator-1].style.backgroundColor = "rgba(255, 255, 255, 0.50)";

     //set card to active
     showDivsgsap.addLabel("next");


     if (n2=="1") {
          //display prev
          if (above4=="yes") {
               showDivsgsap.fromTo(currentCards[2],{x:0, display:"flex"},{x: posOfPrev,duration:.5, ease: "expo.inOut"},"next");
               above4="no";
          } else {
               showDivsgsap.fromTo(currentCards[slideIndex-2],{x:0, display:"flex"},{x: posOfPrev,duration:.5, ease: "expo.inOut"},"next");
          }
          
          //display next 
          showDivsgsap.to(currentCards[slideIndex-1],{opacity:1,display:"flex",x:0,duration:.5, ease: "expo.inOut"},"next");
     } else if (n2=="-1") {

          //display prev
          if(slideIndex==3) {
               showDivsgsap.fromTo(currentCards[0],{x:0, display:"flex"},{x: posOfPrev,duration:.5, ease: "expo.inOut"},"next");
          } else {
               showDivsgsap.fromTo(currentCards[slideIndex],{x:0, display:"flex"},{x: posOfPrev,duration:.5, ease: "expo.inOut"},"next");
          }
          


          //display next
          showDivsgsap.to(currentCards[slideIndex-1],{display:"flex",x:0,opacity:1,duration:.5, ease: "expo.inOut"},"next");

     }
     
  
     
}


function triggerDisplay() {
     if(defaultValues.trigger == "Full Image") {
          //stack container
          var logostackContainer = document.getElementById("stack-container");
          var logostackContainerClass = document.getElementById("stack-container").className;
          logostackContainer.classList.remove(logostackContainerClass);
          logostackContainer.classList.add("stack-container-full-image");

          //logo container
          var logoContainer = document.getElementById("logo-container");
          var logoContainerClass = document.getElementById("logo-container").className;
          logoContainer.classList.remove(logoContainerClass);
          logoContainer.classList.add("logo-container-full-image");

          //frame1subheadline container
          var frame1subheadlineContainer = document.getElementById("frame1subheadline4-container");
          var frame1subheadlineContainerClass = document.getElementById("frame1subheadline4-container").className;
          frame1subheadlineContainer.classList.remove(frame1subheadlineContainerClass);
          frame1subheadlineContainer.classList.add("frame1subheadline4-full-image-container");

          //frame1subheadline
          var frame1subheadlineContainer = document.getElementById("frame1subheadline4");
          var frame1subheadlineContainerClass = document.getElementById("frame1subheadline4").className;
          frame1subheadlineContainer.classList.remove(frame1subheadlineContainerClass);
          frame1subheadlineContainer.classList.add("frame1subheadline4-full-image");

          document.getElementById("singletitle-container").style.display = "none";
          document.getElementById("baseimgmaincontainer").style.display = "none";
          document.getElementById("frame1bg-container").style.display = "none";
          document.getElementById('gradientColor').style.display = "none";
          // document.getElementById("frame1bg-container").style.display = "visible";

          var baseheadlinestack = document.getElementsByClassName("base-headline-stack");
          for (var ctr = 0; ctr < baseheadlinestack.length; ctr++) {
               baseheadlinestack[ctr].style.display = "none";  

          }
     } else if (defaultValues.trigger == "Single Title") {
          document.getElementById("baseimgmaincontainer").style.display = "none";
          document.getElementById('gradientColorFullImage').style.display = "none";
          document.getElementById("fullimage-container").style.display = "none";
          document.getElementById('gradientColor').style.display = "none";
          document.getElementById("stack-container").style.top = "84px";
          document.getElementById("stack-container").style.left = "28px";
          document.getElementById("cta-flex").style.left = "740px";
          document.getElementById("bgmask3-container").style.left = "726px";
          document.getElementById("bgmask4-container").style.left = "829px";
          document.getElementById("pill-container").style.left = "730px";
          document.getElementById("left-arrow").style.left = "710px";
          document.getElementById("right-arrow").style.left = "940px";
          document.getElementById("indicator-container").style.left = "806px";
          document.getElementById("card-container").style.left = "730px";
          document.getElementById("stack-container").style.height = "83px";
          document.getElementById("logo-container").style.height = "53px";
          document.getElementById("logo-container").style.width = "190px";




          var baseheadlinestack = document.getElementsByClassName("base-headline-stack");

          for (var ctr = 0; ctr < baseheadlinestack.length; ctr++) {
               baseheadlinestack[ctr].style.display = "none";  
          }



     } else if (defaultValues.trigger == "Three Shows (Default)") {
          document.getElementById("singletitle-container").style.display = "none";
          document.getElementById("fullimage-container").style.display = "none";
          document.getElementById("gradientColorFullImage").style.display = "none";

     }
}

function showIndicator(num,slideNo,activeNowId) {

     if(endTween!="yes") {
          tween.kill()
          animationEnd();
     }

     if(slideNo>6) {slideNo=6;}
     else if(slideNo<1) {slideNo=1;} 

     showIndicatorgsap = gsap.timeline();
     var i,j, showIndicatorNum, slideNo2;
     var x = document.getElementsByClassName(classActive);
     var y = document.getElementsByClassName("indicator");

     showIndicatorNum = num;
     slideNo2 = slideNo;

     if(slideNo>3) {
          showIndicatorNum+=3;
          slideNo2-=3;
     }

     slideIndex=showIndicatorNum;

     if(slideNo2!=num) {
          if(showIndicatorNum>slideNo) {
               showIndicatorgsap.fromTo(x[slideNo-1],{x:0, display:"flex"},{opacity:1,x: -200,duration:.5, ease: "expo.inOut"},"next");
               showIndicatorgsap.fromTo(x[showIndicatorNum-1],{x:200, display:"flex"},{opacity:1,display:"flex",x:0,duration:.5, ease: "expo.inOut"},"next");
          } else {
               showIndicatorgsap.fromTo(x[slideNo-1],{x:0, display:"flex"},{opacity:1,x: 200,duration:.5, ease: "expo.inOut"},"next");
               showIndicatorgsap.fromTo(x[showIndicatorNum-1],{x:-200, display:"flex"},{opacity:1,display:"flex",x:0,duration:.5, ease: "expo.inOut"},"next");
          }

     }
     
     //set indicators to display none
     for (j = 0; j < y.length; j++) {
          y[j].style.backgroundColor = "rgba(255, 255, 255, 0.15)";
     }

 
     //set indicator to active
     y[num-1].style.backgroundColor = "rgba(255, 255, 255, 0.50)";


}
