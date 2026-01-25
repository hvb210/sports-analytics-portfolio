   //DV wrapping
   var JVX_CAMPAIGNID = campaignId,
   JVX_SITEID = siteId,
   JVX_PLACEMENTID = placementId,
   JVX_Containerid="wrapper",
   JVX_GROUPID = encodeURIComponent(parent.DYReportingKey);
   JVX_ap_DataSignal6 = getParam('ap_DataSignal6');
   dvUrl = "https://cdn.doubleverify.com/dvtp_src.js#ctx=589953&cmp="+JVX_CAMPAIGNID+"&sid="+JVX_SITEID+"&plc="+JVX_PLACEMENTID+"&num=&adid=&advid=&adsrv=125&btreg="+JVX_Containerid+"&btadsrv=jivox&crt="+JVX_GROUPID+"&turl="+JVX_ap_DataSignal6+"&crtname=&chnl=&unit=&pid=&uid=&tagtype=&dvtagver=6.1.src";
   console.log(dvUrl)
   var newScript = document.createElement("script");
   newScript.src = dvUrl;
   document.body.appendChild(newScript);

   function getParam(name){
      let map1 = parent.playerParamsMap;
      if(typeof map1[name] !== 'undefined'){
        return map1[name];
      }
      return '';
   }
   
   
   