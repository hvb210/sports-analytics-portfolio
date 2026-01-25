var _tl;
var repeatCount = 0;
var
_btnExit = document.getElementById('btn-exit'),
_banner = document.getElementById('banner');

function elem(id){return document.querySelector(id)};

var _loadedImages = 0,
    _imageArray = new Array('./assets/bg.jpg', './assets/headline.png', './assets/magnesium_bottle.png', './assets/probiotics_bottle.png', './assets/multi_bottle.png', './assets/cta.png');

this.addEventListener('DOMContentLoaded', preloadImages);

function preloadImages() {
    for (var i = 0; i < _imageArray.length; i++) {
        var _tempImage = new Image();
        _tempImage.addEventListener('load', trackProgress);
        _tempImage.src = _imageArray[i];
    }
}

function trackProgress(){
    _loadedImages++;
    if(_loadedImages == _imageArray.length) loadCSS();
}

function loadCSS(){
  console.log("loadCSS called...");
    var css = document.createElement( 'link' );
    css.setAttribute( 'rel', 'stylesheet' );
    css.setAttribute( 'type', 'text/css' );
    css.setAttribute( 'href', "./css/style.css" );
    document.getElementsByTagName('head')[0].appendChild(css);
    css.addEventListener('load', loadGSPA, false);
}

function loadGSPA(){
   console.log("loadGSPA called...");
    ipGSPA = document.createElement('script');
    ipGSPA.setAttribute('type', 'text/javascript');
    ipGSPA.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
    document.getElementsByTagName('head')[0].appendChild(ipGSPA);

    ipGSPA.addEventListener('load', init, false);
}

function init() {
  _tl = gsap.timeline();

  initAnimations();

}


function initAnimations() {

  _tl
    .set('.banner', { display:"block"})
    .fromTo('#cta', 1, {y: 70}, {y:-1, ease: "power4.out"})
    .fromTo('#multi_bottle', 1.25, {y: 590}, {y:-1, ease: "power4.out"}, '-=1.25')
    .fromTo('#magnesium_bottle', 1.25, {y: 590}, {y:-1, ease: "power4.out"}, '<')
    .fromTo('#probiotics_bottle', 1.25, {y: 590}, {y:-1, ease: "power4.out"}, '<')
    .to('#magnesium_bottle', 1.25, {x:-90, ease: "power4.out"}, '-=0.6')
    .to('#probiotics_bottle', 1.25, {x:90, ease: "power4.out"}, '<')
  ;
  
}
