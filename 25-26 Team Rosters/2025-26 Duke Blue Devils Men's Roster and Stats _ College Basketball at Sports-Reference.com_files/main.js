/*
 *  Animation Functions
 */

var animation = {
  init: function() {
    if (typeof rm !== "undefined") {
      rm.hideLoader();
    }
    animation.begin();
  },
  begin: function() {
    stepDelays.forEach(function(obj, index) {
      // console.log(stepDelays[index]);
      setTimeout(function() {
        var f = index + 1;
        document.body.classList.add('step_' + f);
      }, stepDelays[index]);
    });
  }
};


/*
 *  Upon Enabler initialization, add listeners and start animation
 */

var isiPresent = (document.querySelectorAll('#isi').length > 0) ? true : false;
var isiShow = false;

var startBanner = function(e) {
//   if (isiPresent) {
//     isi.init();
//   }
  if (typeof rm !== "undefined") {
    rm.loadSubloadAssets();
  }
  for (var [key, value] of Object.entries(exits.handlerMap)) {
    exits.addListener(`${key}`, `${value}`);
  }
  animation.init();
};

var enablerInitHandler = function(e) {
  if (isiPresent) {
    isi.init();
  }
  if (!isiShow) { // Test for ISI reveal query string; if false, start animation
    startBanner();
  }
};

window.onload = function() {
  if (Enabler.isInitialized()) {
    enablerInitHandler();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
  }
};

/* Place global animation scripts here */

/* Place size-specific animation scripts here */
