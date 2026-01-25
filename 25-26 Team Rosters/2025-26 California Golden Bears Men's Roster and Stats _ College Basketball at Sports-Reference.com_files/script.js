var carouselCount = true;
let layoutType, slideClicked = false, currentSlide = [0, 0], sliding = true, slideCount, links = [[], []];
let ratingData = [0,0,0,0];

myFT.on("instantads", function (e) {
    init();

    layoutType = variables.layoutType_frameCount.split('|')[0].toLowerCase(); 
    slideCount = parseInt(variables.layoutType_frameCount.split('|')[1]);
    if(variables.layoutType_frameCount.split('|')[2]) ratingData = (variables.layoutType_frameCount.split('|')[2]).split(',');
    main.classList.add(layoutType);

    
    createAd();
    
    myFT.applyClickTag(logo_img, 1, variables.clicktag1_url);
    myFT.applyClickTag(ctaContainer, 1, variables.clicktag1_url);

    document.fonts.ready.then(() => {
        fontsLoaded = true;
        if(allImagesLoaded) {
            setTimeout(startAnimation, 250);
        }
    });

    if(layoutType == 'product') {
        reveiwCarousel.style.display = 'none';

        if(!variables.main_feed_endpoint && !variables.main_default_feed_endpoint){
            feedLoadError()
            return;
        }

        const feedParams = new FTFeedParams();
        feedParams.segmentId = "";
        feedParams.feedEndpoint = variables.main_feed_endpoint || ' ';
        feedParams.defaultFeedEndpoint = variables.main_default_feed_endpoint;
        const ftFeed = new FTFeed(myFT, feedParams);
        ftFeed.getFeed(feedLoaded, feedLoadError);
    } else {
        carouselCount =false
        // preload([]);
        reveiwCarousel.style.display = 'none';
        let varData = []
        for (let i = 1; i <= slideCount; i++) {
            let row = {
                powerfeeds_image: variables[`carousel${i}_img`],
                powerfeeds_name: variables[`f${i}_headline_txt`],
                powerfeeds_subname: variables[`f${i}_subheadline_txt`],
                nameCss: variables[`f${i}_headline_face_size_hex_alignment_xy`],
                subnameCss: variables[`f${i}_subheadline_face_size_hex_alignment_xy`],
                product_rating_average: ratingData[i-1],
                link: variables[`clicktag${i+1}_url`],
                top_rated: 'n/a'
            };

            varData.push(row);
            
        }

        dataHandler(varData)
    }
});

function feedLoaded(feedData) {
    if(feedData.length == 0) {
        feedLoadError();
    }

    trace(feedData)

    dataHandler(feedData); 
    feedfail_img.style.display = 'none';

}

function dataHandler(feedData){
    const imageList = [];
    let dataIndex = 0, trackingString = '';

    for(let i = 0; i < slideCount; i++) {
        
        if(!feedData[dataIndex]) {
            continue;
        }
        if(layoutType == 'product'){
            trackingString += feedData[dataIndex].brand + '|' + feedData[dataIndex].powerfeeds_id	 + '|' + feedData[dataIndex].powerfeeds_price + '|';
        }
        createSlide(1, i, feedData[dataIndex], imageList);
        dataIndex++

        if(carouselCount){
            if(!feedData[dataIndex]) {
                continue;
            }
    
            if(layoutType == 'product'){
                trackingString += feedData[dataIndex].brand + '|' + feedData[dataIndex].powerfeeds_id	 + '|' + feedData[dataIndex].powerfeeds_price + '|';
            }
            createSlide(2, i, feedData[dataIndex], imageList);
            dataIndex++;
        }
        
    }
    preload(imageList);
    if(layoutType == 'product'){
        productCarousel1.addEventListener('click', () => {
            slideClicked = true;
            myFT.clickTag(2+currentSlide[0], links[0][currentSlide[0]]);
        });
    
        productCarousel2.addEventListener('click', () => {
            slideClicked = true;
            myFT.clickTag(2+currentSlide[1], links[1][currentSlide[1]]);
            console.log('clicktag count', 2+currentSlide[1], links[1][currentSlide[1]])
        });
    } else{
        productImageContainer1.addEventListener('click', () => {
            slideClicked = true;
            myFT.clickTag(2+currentSlide[0], links[0][currentSlide[0]]);
        });
    }


    trace(trackingString)

    if(layoutType == 'product') Tracker.impressionTrackEvent(trackingString);
}

function createSlide(slideIndex, serial,  data, imageList) {
    const baseDiv = document.getElementById('productCarousel' + slideIndex);
    const imageContainer = document.getElementById('productImageContainer' + slideIndex);
    const dotContainer = document.getElementById('productDotContainer' + slideIndex);
    const dotHolder = document.getElementById('productDots' + slideIndex);

    let titleCss = layoutType == 'product' ? variables.carousel_copy_headline_face_size_hex_alignment_xy : data.nameCss;
    let subtitleCss = data.subnameCss;

    const dot = createElement('div', 'dot' + slideIndex + '_' + serial, ['dot']);
    if(serial != 0) {
        dotContainer.style.display = 'flex'
    } else {
        dot.classList.add('filled')
    }
    dotHolder.appendChild(dot);
    dot.addEventListener('click', () => {
        // if(sliding) {
        //     return;
        // }
        sliding = true;
        slideClicked = true;
        dotClicked(slideIndex, serial);
    });
    const postFix = + slideIndex + '_' + serial;

    const image = createElement('img', 'productImage' + postFix, ['productImage', 'slideImage']);
    imageList.push([image, data.powerfeeds_image])
    imageContainer.appendChild(image);

    const titleSubTitleWrap = createElement('div', 'titleSubTitleWrap' + postFix, ['titleSubTitleWrap', 'titleSubTitleWrap']);

    const title = createElement('div', 'productTitle' + postFix, ['productTitle', 'title']);
    setText(title, data.powerfeeds_name, titleCss)
    if(layoutType == 'review'){
        titleSubTitleWrap.appendChild(title);
        baseDiv.appendChild(titleSubTitleWrap);
    }
    else
        baseDiv.appendChild(title);

    if(layoutType == 'review' && data.powerfeeds_subname){
        const subTitle = createElement('div', 'productsubTitle' + postFix, ['productsubTitle', 'subTitle']);
        setText(subTitle, data.powerfeeds_subname, subtitleCss)
        titleSubTitleWrap.appendChild(subTitle);
        baseDiv.appendChild(titleSubTitleWrap);
    }

    const starContainer = createElement('div', 'starContainer' + postFix, ['productStarContainer', 'starContainer']);
    const stars = createElement('div', 'stars' + serial, ['stars']);
    const starCount = Math.round(data.product_rating_average);

   if(starCount && starCount >= 4 ) {
        createStar(stars, starCount, 'star');
    }
    
    
    starContainer.appendChild(stars)
    baseDiv.appendChild(starContainer);

    if(data.top_rated.toLowerCase() == 'top rated') {
        const topRated = createElement('img', 'topRatedImage' + postFix, ['topRated']);
        topRated.src = 'top_rated.png';
        baseDiv.appendChild(topRated);
    }

    links[slideIndex - 1].push(data.link);
}

function createStar(container, starCount, className) {
    for(let i = 0; i < starCount; i++) {
        const goldStar = createElement('img', '', ['goldstar', className]);
        goldStar.src = 'gold_star.svg'
        container.appendChild(goldStar);
    }
    for(let i = starCount; i < 5; i++) {
        const whiteStar = createElement('img', '', ['whiteStar', className]);
        whiteStar.src = 'gray_star.svg'
        container.appendChild(whiteStar);
    }
}

function dotClicked(carouselSerial, nextSerial) {
    if(nextSerial > slideCount) {
        return; 
    }
    const currentSerial = currentSlide[carouselSerial - 1];
    const currentPostfix = carouselSerial + '_' + currentSerial;
    const nextPostfix = carouselSerial + '_' + nextSerial;
    const moveTl = gsap.timeline();
    

    if(currentSerial == nextSerial) {
        return;
    } else if(nextSerial > currentSerial) {
        moveTl.set('#productImage' + nextPostfix, {left: '50%', right: 'auto', zIndex: 2});
        moveTl.set('#productImage' + currentPostfix, {left: 0, right: 'auto'});
        moveTl.addLabel('start');
        moveTl.to('#productImage' + nextPostfix, .5, {left: '0%'}, 'start');
    } else {
        moveTl.set('#productImage' + nextPostfix, {left: 'auto', right: '50%', zIndex: 2});
        moveTl.set('#productImage' + currentPostfix, {left: 'auto', right: 0});
        moveTl.addLabel('start');
        moveTl.to('#productImage' + nextPostfix, .5, {right: '0%'}, 'start');
    }

    moveTl.to('#productImage' + currentPostfix, .5, {width: 0}, 'start');
    moveTl.to(['#starContainer' + currentPostfix, '#productTitle' + currentPostfix, '#productsubTitle' + currentPostfix, 'topRatedImage' + currentPostfix], .5, {opacity: 0}, 'start');
    moveTl.to(['#starContainer' + nextPostfix, '#productTitle' + nextPostfix,'#productsubTitle' + nextPostfix, 'topRatedImage' + nextPostfix], .5, {opacity: 1}, 'start');
    moveTl.set('#productImage' + nextPostfix, {zIndex: 5});
    moveTl.set('#productImage' + currentPostfix, {zIndex: 1, width: '100%', onComplete: () => sliding = false});

    document.getElementById('dot' + currentPostfix).classList.remove('filled');
    document.getElementById('dot' + nextPostfix).classList.add('filled');

    currentSlide[carouselSerial - 1] = nextSerial;
}

function feedLoadError() {
    feedfail_img.src = variables.feedfail_img;
    feedfail_img.style.display = 'block';
    myFT.applyClickTag(feedfail_img, 1, variables.clicktag1_url); 
}


function createAd() {

    
    logo_img.style.width = variables.logo_width_xy.split('|')[0] + 'px';
    setXY(logo_img, variables.logo_width_xy.split('|')[1]);

        // headline, subheadline for product leyout 
    setText(document.getElementById('pf1_headline_txt'), variables['f1_headline_txt'], variables['f1_headline_face_size_hex_alignment_xy']);
    setText(document.getElementById('pf1_subheadline_txt'), variables['f1_subheadline_txt'], variables['f1_subheadline_face_size_hex_alignment_xy']);


    for(let i = 1; i <= 4; i++) {
        setText(document.getElementById('f' + i + '_headline_txt'), variables['f' + i + '_headline_txt'], variables['f' + i + '_headline_face_size_hex_alignment_xy']);
        setText(document.getElementById('f' + i + '_subheadline_txt'), variables['f' + i + '_subheadline_txt'], variables['f' + i + '_subheadline_face_size_hex_alignment_xy']);
    }

    cta_text.innerHTML = variables.cta_text;
    const ctaStyles = variables.cta_txt_face_size_hex_hexHover_alignment_xy.split('|');
    const ctaBoxStyles = variables.cta_outlineHex_bgHex_bgHexHover.split('|');
    
    cta_text.style.fontSize = ctaStyles[1] + 'px';
    cta_text.classList.add(ctaStyles[0]);
    setCtaColor(ctaStyles[2], ctaBoxStyles[1]);
    cta_textContainer.style.justifyContent = ctaStyles[4];
    ctaContainer.style.borderColor = ctaBoxStyles[0]
    setXY(ctaContainer, ctaStyles[5]);
    setAdditionalCss(cta_text, ctaStyles, 6);
    setAdditionalCss(ctaContainer, ctaBoxStyles, 3);

    ctaContainer.addEventListener('mouseover', () => setCtaColor(ctaStyles[3], ctaBoxStyles[2]));
    ctaContainer.addEventListener('mouseout', () => setCtaColor(ctaStyles[2], ctaBoxStyles[1]));

}

function setCtaColor(text, bg) {
    cta_text.style.color = text;
    // ctaUnderline.style.backgroundColor = text;
    ctaBG.style.backgroundColor = bg;
}



function setText(element, text, styles) {
    element.classList.add(checkPlatform(0), checkPlatform(1))
    const styleList = styles.split('|');
    !!text.trim() ? element.innerHTML = text : null;

    if(styleList[0]) element.classList.add(styleList[0])
    if(styleList[1]) element.style.fontSize = styleList[1] + 'px';
    if(styleList[2]) element.style.color = styleList[2];
    if(styleList[3]) {
        element.style.textAlign = styleList[3];
        element.style.justifyContent = styleList[3];
    }

    if(styleList[4]) setXY(element, styleList[4]);

    setAdditionalCss(element, styleList , 5)
}

function preload(carouselImages) {
    const varImages = myFT.manifestProperties.instantAds
        .filter(e => e.type == 'image')
        .map(e => e.name);
    // const varImages = [];
    const imageCount = varImages.length + carouselImages.length;
	let imageLoaded = 0;

    varImages.forEach(e => {
        const currentImage = document.getElementById(e);
        currentImage.src = variables[e];
        currentImage.addEventListener('load', iLoad, false);
    });

    carouselImages.forEach(e => {
        e[0].addEventListener('load', iLoad, false);
        e[0].src = e[1];
    });

    
    function iLoad() {
        // trace(imageLoaded)
        imageLoaded++;
        if (imageLoaded == imageCount) {
            trace('preload done');
            allImagesLoaded = true;
            if(fontsLoaded) {
                setTimeout(startAnimation, 250);
            }
        }
    }
}

function startAnimation() {
    const tl = gsap.timeline();
    tl.set('.productImage', {opacity: 0});
    tl.set([main], { opacity: 1, delay: .5 });

    if(layoutType == 'product') {
        tl.fromTo(['#productImage1_0', '#productImage2_0','#productTxtWrap'], .7, {scale: 1.2, opacity: 0 }, { opacity: 1, scale: 1 });
        tl.set('.productImage', {opacity: 1, onComplete: () => sliding = false});
            // if(variables.f1_headline_txt.trim() !== '' && variables.f1_subheadline_txt.trim()  !== ''){
            // tl.set('#productTxtWrap', {opacity: 1 });
            // tl.to('#productTxtWrap', 0.3, {opacity: 0, delay: 2 });
        // }

        
        let delay = 3;
        if(slideCount > 1 ){ 
            for (let i = 1; i < slideCount; i++) {
                gsap.delayedCall(delay, () => {
                    console.log(delay);
                    if(slideClicked) {
                        return;
                    }   
                    dotClicked(1,i);
                    dotClicked(2,i);
                });
                delay+=3;
            }
        }


    } else { 
        tl.fromTo(['#productImage1_0', '#logo_img', ], .5, {scale: 1.1, opacity: 0 }, { opacity: 1, scale: 1 });
        tl.fromTo(['#productTitle1_0', '#productsubTitle1_0', '#starContainer1_0' ], 0.9, {x: 5, opacity: 0 }, { opacity: 1, x: 0, delay: -0.5, ease: "expoScale(1,2,none)", stagger: 0.2 });
        // tl.to(['#ctaContainer' ], 0.9, {x: 5, opacity: 0 }, { opacity: 1, x: 0, delay: -0.5, ease: "expoScale(1,2,none)", stagger: 0.2 });
        tl.to(['#manyDots','#ctaContainer'], .75, { opacity: 1, delay: -.5, ease: "power1.out",});
        tl.set('.productImage', {opacity: 1, onComplete: () => sliding = false});
        let delay = 3;
        if(slideCount > 1 ){ 
            for (let i = 1; i < slideCount; i++) {
                gsap.delayedCall(delay, () => {
                    console.log(delay);
                    if(slideClicked) {
                        return;
                    }   
                    dotClicked(1,i);
                });
                delay+=3;
            }
        }

    }

    trace(tl.duration());
}


