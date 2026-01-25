	function startAd() {

		var tapEvent = "click";

		clickScreen.addEventListener(tapEvent, function() {
			clickthrough();
		}, false);

		clickScreen.addEventListener("mouseover", function() {
			rollover();
		}, false);

		clickScreen.addEventListener("mouseout", function() {
			rollout();
		}, false);

		function rollover() {
			if (resolved == true) {
				//
			}
		}

		function rollout() {
			if (resolved == true) {
				//
			}
		}

		function clickthrough() {
			//Enabler.exit('Main Exit');
			window.open(window.clickTag || window.clickTAG, "_blank");
		}

		startAllAnimations();
	};

	function startAllAnimations() {
        
		var tl = gsap.timeline();
//FRAME 1 TRANSITION IN
		tl.to("#copy-1-1", {x:0, duration:.9 });
		


		//FRAME 1 TRANSITION OUT
		tl.to("#copy-1-1, #image-1-1", {delay:3, opacity:0, duration:.3 });
		
		//FRAME 2 TRANSITION IN
		tl.to("#image-2-1", {delay:.5, opacity:1, duration:.9});
		tl.to("#copy-2-1", {x:0, duration:.9 }, "<");

		//FRAME 2 TRANSITION OUT
		tl.to("#copy-2-1, #image-2-1", {delay:3, opacity:0, duration:.3 });
		
		//FRAME 3 TRANSITION IN
		tl.to("#image-3-1", {delay:.5, opacity:1, duration:.9});
		tl.to("#copy-3-1", {x:0, duration:.9 }, "<");

		//FRAME 3 TRANSITION OUT
		tl.to("#copy-3-1, #image-3-1", {delay:3, opacity:0, duration:.3 });

		//FRAME 4 TRANSITION IN
		tl.to("#image-4-1", {delay:.5, opacity:1, duration:.9});
		tl.to("#copy-4-1", {x:0, duration:.9 }, "<");

		//FRAME 4 TRANSITION OUT
		tl.to("#image-4-1", {delay:3, opacity:0, duration:.3 });


		//FRAME 5 TRANSITION IN
		tl.to("#image-5-1", {delay:.5, opacity:1, duration:.9});
		tl.to("#copy-5-2", {x:0, duration:.9 }, "<");

		//FRAME 6 TRANSITION IN
		tl.to("#background-6", {delay:3.5, opacity:1, duration:.9});
		tl.to("#copy-6-1", {delay:.5, opacity:1, duration:.9});
		tl.to("#btn-6-1", {delay:.5, opacity:1, duration:.9});
		

}

	// function to preload images
	function preloadimages(arr){
			var newimages=[], loadedimages=0
			var postaction=function(){}
			var arr=(typeof arr!="object")? [arr] : arr
			function imageloadpost(){
					loadedimages++
					if (loadedimages==arr.length){
							postaction(newimages) //call postaction and pass in newimages array as parameter
					}
			}
			for (var i=0; i<arr.length; i++){
					newimages[i]=new Image()
					newimages[i].src=arr[i]
					newimages[i].onload=function(){
							imageloadpost()
					}
					newimages[i].onerror=function(){
							imageloadpost()
					}
			}
			return { //return blank object with done() method
					done:function(f){
							postaction=f || postaction //remember user defined callback functions to be called when images load
					}
			}
	}

	var preloadassets = [
        'images/logo-1.png',
        
	];

	window.onload = (function() {
		preloadimages(preloadassets).done(function(){

			//checkEnabler();
			startAd();

		})

	});
//</script>