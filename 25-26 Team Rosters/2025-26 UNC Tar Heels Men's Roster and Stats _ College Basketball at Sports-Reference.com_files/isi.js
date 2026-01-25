/* eslint-disable */
/*
   ISI Functions
 */

var scrollInterval;
var isiOuter = document.getElementById('isi_outer');

var revealDelay = isi.params.revealDelay;
var autoScroll = isi.params.autoScroll;
var autoScrollDelay = Number(isi.params.autoScrollDelay);
var autoScrollLoops = Number(isi.params.autoScrollLoops) - 1;
var scrollbarWidth = isi.params.scrollbarWidth;
var scrollSpeed = Number(isi.params.scrollSpeed);
var scrollRevSpeed = Number(isi.params.scrollRevSpeed);
var returnToTop = isi.params.returnToTop;
var showUpDownButtons = isi.params.showUpDownButtons;
var trackTopOffset = (showUpDownButtons) ? scrollbarWidth : Number(isi.params.trackTopOffset);
var trackBottomOffset = (showUpDownButtons) ? scrollbarWidth : Number(isi.params.trackBottomOffset);

var isiWidth = Number(isi.params.isiWidth);
var isiHeight = Number(isi.params.isiHeight);
// var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
// var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var divScrollHeight = 0;
var incrementedScrollHeight = 1;
var incrementedRevScrollHeight = 5;
var currentScrollHeight = 0;

var isiFunctions = {
  init: function() {
    scroller.scrollbar('isi_outer', autoScroll, autoScrollDelay, isiWidth, isiHeight, showUpDownButtons, scrollbarWidth);
    setTimeout(function() {
      scroller.refresh();
    }, 200);
    setTimeout(function() {
      document.body.classList.add('isi');
    }, revealDelay);
  },
  repeat: function() {
    if (autoScrollLoops > 0) {
      autoScrollLoops -= 1;
      setTimeout(function() {
        isi.reverseScroll(true);
      }, 2000);
    } else {
      if (returnToTop) {
        setTimeout(function() {
          isi.reverseScroll(false);
        }, 2000);
      }
    }
  },
  startScrolling: function() {
    // console.log('start scrolling');
    scrollInterval = window.setInterval(function() {
      divScrollHeight = isiOuter.scrollHeight - isi.params.isiHeight, currentScrollHeight += incrementedScrollHeight;
      if (divScrollHeight > currentScrollHeight) {
        isiOuter.scrollTop = currentScrollHeight;
      } else {
        clearInterval(scrollInterval);
        isi.repeat();
      };
    }, scrollSpeed);
  },
  stopScrolling: function() {
    isiOuter, clearInterval(scrollInterval);
  },
  reverseScroll: function(restartScroll) {
    // console.log('reverse scrolling');
    scrollInterval = window.setInterval(function() {
      currentScrollHeight -= incrementedRevScrollHeight;
      if (currentScrollHeight > 0) {
        isiOuter.scrollTop = currentScrollHeight;
      } else {
        clearInterval(scrollInterval);
        currentScrollHeight = 0;
        isiOuter.scrollTop = 0;

        if (restartScroll) {
          setTimeout(function() {
            isi.startScrolling();
          }, autoScrollDelay);
        }
      };
    }, scrollRevSpeed);
  }
};

Object.assign(isi, isiFunctions);


var scroller = {
  aConts: [],
  mouseY: 0,
  N: 0,
  asd: 0,
  sc: 0,
  sp: 0,
  to: 0,
  scrollbar: function(s, t, e, o, n, l, w) {
    window.autoscroll = t;
    window.timeautoscroll = e;
    var c = document.getElementById(s);
    var i = document.getElementById(s).parentNode.id;
    if (con = document.getElementById(i), c.style.height = n + "px", c.style.overflow = "auto", c.style.display = "block", document.getElementById(i).style.width = o + "px", document.getElementById(i).style.height = n + "px", c.addEventListener("wheel", function() {
      isi.stopScrolling();
    }), c.addEventListener("touchstart", function() {
      isi.stopScrolling();
    }), !scroller.init()) return !1;
    var r = c.cloneNode(!1);
    return 1 == t && (scrollInterval = setTimeout(isi.startScrolling, e)), r.style.overflow = "", c.parentNode.appendChild(r), r.appendChild(c), c.style.position = "", c.style.left = c.style.top = "12px", scroller.aConts[scroller.N++] = c, c.sg = !1, c.st = this.create_div("sb_track", c, r), c.st.style.height=(isiHeight-trackTopOffset-trackBottomOffset)+"px", c.st.style.top=trackTopOffset+"px", c.sb = this.create_div("sb_thumb", c, r), c.su = this.create_div("sb_up", c, r), c.sd = this.create_div("sb_down", c, r), c.sb.onmousedown = function(s) {
      return this.cont.sg || (s || (s = window.event), scroller.asd = this.cont, this.cont.yZ = s.screenY, this.cont.sZ = c.scrollTop, this.cont.sg = !0, this.className = "sb_thumb sb_active"), !1;
    }, c.st.onmousedown = function(s) {
      isi.stopScrolling(), s || (s = window.event), scroller.asd = this.cont, scroller.mouseY = s.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      for (var t = this.cont, e = 0; null != t; t = t.offsetParent) e += t.offsetTop;
      this.cont.scrollTop = (scroller.mouseY - e - this.cont.ratio * this.cont.offsetHeight / 2 - this.cont.sw) / this.cont.ratio, this.cont.sb.onmousedown(s);
    }, c.su.onmousedown = c.su.ondblclick = function() {
      isi.stopScrolling();
      return scroller.mousedown(this, -1), !1;
    }, c.sd.onmousedown = c.sd.ondblclick = function() {
      isi.stopScrolling();
      return scroller.mousedown(this, 1), !1;
    }, c.su.onmouseout = c.su.onmouseup = scroller.clear, c.sd.onmouseout = c.sd.onmouseup = scroller.clear, c.sb.onmouseover = function() {
      return this.cont.sg || (this.className = "sb_thumb sb_over"), !1;
    }, c.sb.onmouseout = function() {
      return this.cont.sg || (this.className = "sb_thumb"), !1;
    }, c.sb_onscroll = function() {
      // test if height of .sb_thumb has been set via CSS (and therefore differs from programmatically calculated height)
      if (window.getComputedStyle(c.sb).height !== c.sb.style.height) { // if thumb height is set via CSS
        this.ratio = (this.offsetHeight - (this.sb.offsetHeight + trackTopOffset + trackBottomOffset)) / (this.scrollHeight - this.offsetHeight),
        this.sb.style.top = Math.floor(isiOuter.scrollTop * this.ratio + trackTopOffset) + "px";
      } else { // if thumb height is set programmatically
        this.ratio = (this.offsetHeight - (trackTopOffset + trackBottomOffset)) / this.scrollHeight,
        this.sb.style.top = Math.floor(this.scrollTop * this.ratio + trackTopOffset) + "px";
      }
    }, c.sw = w, c.sb_onscroll(), scroller.refresh(), scroller.parameters(o, l, c), c.onscroll = c.sb_onscroll, c;
  },
  init: function() {
    function s(s, t, e) {
      return window.addEventListener ? (s.addEventListener(t, e, !1), scroller.w3c = !0, !0) : !!window.attachEvent && s.attachEvent("on" + t, e);
    }
    return !(window.oper || !window.addEventListener && !window.attachEvent || (s(window.document, "mousemove", scroller.onmousemove), s(window.document, "mouseup", scroller.onmouseup), s(window, "resize", scroller.refresh), 0));
  },
  parameters: function(s, t, e) {
    var scrollDiff = isiOuter.offsetWidth - isiOuter.clientWidth;
    s += scrollDiff;
    t || (document.getElementsByClassName("sb_up")[0].style.display = "none", document.getElementsByClassName("sb_down")[0].style.display = "none"), document.getElementsByClassName("sb_container")[0].setAttribute("id", "sb_container"), document.getElementsByClassName("sb_container")[0].style.top = "0", document.getElementsByClassName("sb_container")[0].style.position = "relative", e.style.width = s + "px", document.getElementsByClassName("sb_thumb")[0].onclick = function() {
      isi.stopScrolling();
    }, document.getElementsByClassName("sb_thumb")[0].addEventListener("mousedown", function() {
      isi.stopScrolling();
    });
  },
  create_div: function(s, t, e) {
    var o = document.createElement("div");
    return o.cont = t, o.className = s, e.appendChild(o), o;
  },
  clear: function() {
    return clearTimeout(scroller.to), scroller.sc = 0, !1;
  },
  refresh: function() {
    for (var s = 0, t = scroller.N; t > s; s++) {
      var e = scroller.aConts[s];
      e.sb_onscroll(), e.sb.style.width = e.st.style.width = e.su.style.width = e.su.style.height = e.sd.style.width = e.sd.style.height = e.sw + "px", e.sb.style.height = Math.ceil(Math.max(.5 * e.sw, e.ratio * e.offsetHeight)) + "px", e.st.style.height=isiShow ? (isiOuter.offsetHeight-trackTopOffset-trackBottomOffset)+"px" : (isiHeight-trackTopOffset-trackBottomOffset)+"px";
    }
  },
  arrow_scroll: function() {
    0 != scroller.sc && (scroller.asd.scrollTop += 6 * scroller.sc / scroller.asd.ratio, scroller.to = setTimeout(scroller.arrow_scroll, scroller.sp), scroller.sp = 32);
  },
  mousedown: function(s, t) {
    0 == scroller.sc && (s.cont.sb.className = "sb_thumb sb_active", scroller.asd = s.cont, scroller.sc = t, scroller.sp = 400, scroller.arrow_scroll());
  },
  onmousemove: function(s) {
    s || (s = window.event), scroller.mouseY = s.screenY, scroller.asd.sg && (scroller.asd.scrollTop = scroller.asd.sZ + (scroller.mouseY - scroller.asd.yZ) / scroller.asd.ratio);
  },
  onmouseup: function(s) {
    s || (s = window.event);
    var t = s.target ? s.target : s.srcElement;
    scroller.asd && document.releaseCapture && scroller.asd.releaseCapture(), scroller.asd && (scroller.asd.sb.className = t.className.indexOf("scrollbar") > 0 ? "sb_thumb sb_over" : "sb_thumb"), document.onselectstart = "", scroller.clear(), scroller.asd.sg = !1;
  }
};


