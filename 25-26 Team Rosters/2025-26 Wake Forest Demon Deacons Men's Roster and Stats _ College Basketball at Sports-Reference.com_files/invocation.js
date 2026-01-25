var creativeSize = `${template.width}x${template.height}`; // Set the width and height of the ad.
var devDynamicContent = {}; // Variable for studio invocation code.
function exitCall() {
            var activeNow = document.querySelector('.active').id;
            var caseIndex=slideIndex;

            if(activeNow=="pill-yearly") {
                caseIndex=slideIndex+3;
            }

            switch (caseIndex) {
                case 1: Enabler.exitOverride("Frame 1 Clickthrough", defaultValues.frame1Overlay+Adlib.utmParser(defaultValues.uiElement4)); break;
                case 2: Enabler.exitOverride("Frame 2 Clickthrough", defaultValues.frame2Overlay+Adlib.utmParser(defaultValues.uiElement4)); break;
                case 3: Enabler.exitOverride("Frame 3 Clickthrough", defaultValues.frame3Overlay+Adlib.utmParser(defaultValues.uiElement4)); break;
                case 4: Enabler.exitOverride("Frame 4 Clickthrough", defaultValues.frame4Overlay+Adlib.utmParser(defaultValues.uiElement4)); break;
                case 5: Enabler.exitOverride("Frame 5 Clickthrough", defaultValues.frame5Overlay+Adlib.utmParser(defaultValues.uiElement4)); break;
                case 6: Enabler.exitOverride("Frame 6 Clickthrough", defaultValues.frame6Overlay+Adlib.utmParser(defaultValues.uiElement4)); break;
            }
        }
var videoCuePoint = [
  //"cuePoint:funcName" ex. "1:firstAninmation" please do not included the parenthesis after the function name.
]
function initDynamic() {
  if (checkEnvironment() === 'tools') {
    for (var i=0;i<Object.keys(defaultValues).length;i++) {
      Object.keys(defaultValues)[i];
    }
  } else {
    // paste studio invocation code here, and delete the devDynamicContent declaration as it is already declared outside this function.
    Enabler.setProfileId(10945369);

    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1 = [{}];
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0]._id = 0;
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].id = "0224c3d6-197e-424d-b64a-9b3728882ac3";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].Reporting_Label = "492004c2-70a2-49d0-bcce-31d817dc68e4-81ce8bc1-a484-4941-b3d3-c5ab5985f13f-5a63fefd-38a9-462e-b55b-04946b262c83-O9JJvakNtu-71e7a537-2879-4ac0-9c60-42755e145e79-613bb43ab30dfec4395bf4384860d633d0417bb3a5fcf0b448238c2db2636643";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].Variant_name = "test_gradient";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].Active = false;
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].logo = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].logo.Url = "https://app.smartly.io/warren/images/dd7309b9-6b10-4b08-91be-c5c85d08df08/blob?resized_reduced_hbomax_logo.png";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].legal = "";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].legal2 = "";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].legal3 = "Select Titles in 4K";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].bgMask1 = "MONTHLY";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].bgMask2 = "YEARLY";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].bgMask3 = "Pick Your Plan";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].bgMask4 = "PREPAY & SAVE";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].ctaText = "<span style=\"color: rgb(255, 255, 255);\">SELECT PLAN<\/span>";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].trigger = "Three Shows (Default)";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].baseImage = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].baseImage.Url = "https://dyle7zu5kwqf5.cloudfront.net/105b5725-e263-43e6-8ab0-3b1753996b75/BaseImage.png";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].ctaColor1 = "#333E4A";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].baseImage2 = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].baseImage2.Url = "https://dyle7zu5kwqf5.cloudfront.net/105b5725-e263-43e6-8ab0-3b1753996b75/BaseImage.png";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].baseImage3 = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].baseImage3.Url = "https://dyle7zu5kwqf5.cloudfront.net/105b5725-e263-43e6-8ab0-3b1753996b75/BaseImage.png";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].baseImage4 = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].baseImage4.Url = "https://dyle7zu5kwqf5.cloudfront.net/105b5725-e263-43e6-8ab0-3b1753996b75/BaseImage.png";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].baseImage5 = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].baseImage5.Url = "https://dyle7zu5kwqf5.cloudfront.net/105b5725-e263-43e6-8ab0-3b1753996b75/BaseImage.png";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].baseImage6 = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].baseImage6.Url = "https://dyle7zu5kwqf5.cloudfront.net/105b5725-e263-43e6-8ab0-3b1753996b75/BaseImage.png";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].uiElement1 = "#1C2732";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].uiElement2 = "1";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].uiElement3 = "#1C2732";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].uiElement4 = "?utm_source=dv360&amp;utm_medium=paid-display&amp;utm_id=cm|dynamicCampaignIdUTM|dynamicSiteIdUTM|dynamicPlacementIdUTM|dynamicCreativeIdUTM";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Image = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Image.Url = "https://app.smartly.io/warren/images/ca5748da-fb40-4ea8-8f60-d0a4c15a3a2d/blob?300x250_Frame 1 Background@2x.png";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].CreativeName = "test_gradient_300x250";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].URL_Parameter = "";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Overlay = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Overlay.Url = "https://auth.max.com/product?route=ad-lite-monthly";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame2Overlay = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame2Overlay.Url = "https://auth.max.com/product?route=ad-free-monthly";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame3Overlay = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame3Overlay.Url = "https://auth.max.com/product?route=ultimate-monthly";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame4Overlay = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame4Overlay.Url = "https://auth.max.com/product?route=ad-lite-annual";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame5Overlay = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame5Overlay.Url = "https://auth.max.com/product?route=ad-free-annual";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame6Overlay = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame6Overlay.Url = "https://auth.max.com/product?route=ultimate-annual";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].customVariable = "\/* Custom Variable 1 *\/";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Headline = "Basic With Ads";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame2Headline = "Standard";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame3Headline = "Premium";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame4Headline = "Basic With Ads";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame5Headline = "Standard";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame6Headline = "Premium";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].customVariable2 = "\/* Custom Variable 2 *\/";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].customVariable3 = "April 2025 Plan Picker Multi - TLOU S2, The Pitt, The White Lotus S3";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].customVariable4 = "C035041_ENG_MULTI_MLT_PLP_SUP_ANB_300X250_DCO_GOTCURBS12ALK";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].customVariable5 = "\/* Custom Variable 5 *\/";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Headline2 = "<span style=\"color: rgb(157, 157, 157);\">Watch with limited ads.<\/span>";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Headline3 = "$9.99";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame2Headline2 = "<span style=\"color: rgb(157, 157, 157);\">Watch on the go.<\/span>";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame2Headline3 = "$16.99";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame3Headline2 = "<span style=\"color: rgb(157, 157, 157);\">Watch on the go and in 4K.<\/span>";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame3Headline3 = "$20.99";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame4Headline2 = "<span style=\"color: rgb(157, 157, 157);\">Watch with limited ads.<\/span>";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame4Headline3 = "$99.99";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame5Headline2 = "<span style=\"color: rgb(157, 157, 157);\">Watch on the go.<\/span>";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame5Headline3 = "$169.99";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame6Headline2 = "<span style=\"color: rgb(157, 157, 157);\">Watch on the go and in 4K.<\/span>";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame6Headline3 = "$209.99";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Background = {};
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Background.Url = "https://app.smartly.io/warren/images/ca5748da-fb40-4ea8-8f60-d0a4c15a3a2d/blob?300x250_Frame 1 Background@2x.png";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Subheadline = "";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Subheadline2 = "";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Subheadline3 = "";
    devDynamicContent.REBRAND__MAX__US__PLAN_PICKER_Sheet1[0].frame1Subheadline4 = "";
    Enabler.setDevDynamicContent(devDynamicContent);
    Adlib.assignInvocationCode(); // DO NOT DELETE THIS CODE, This will automatically assign invocation code to defaultValues
  }
}
function populate() {
  //Adlib.preloadDelay = 100;
  //Adlib.fpsSettings(60); // uncomment this if you want to change the FPS used in the creative          
  Adlib.populateElements(); // DO NOT DELETE THIS. automatically assign the defaultValues to the elements within the ad.
  /*****************************************
  If you need to manually assign a defaultValue to a style of an element, add it below.
  *****************************************/
};