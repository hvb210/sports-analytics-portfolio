/*
 * commting this since, our tag would always go on foreign domain 
 * and under no condition this will be allowed 
 * Minify this file to jivoxWidgetApiV2.min.js using JSCompress @ https://jscompress.com/
*/
var isInLayout = false,
	url= window.location.href,
	objectName = getParameterValue(url,"objectName"),
	parentAccess = false,
	isExternalWg = false,
	isExtAsInline = false,
	isStandardInline = false,
    jvxWidgetNode = null;
try{
    jvxWidgetNode = document.getElementById("jvxWidget");
	isInLayout = (jvxWidgetNode && jvxWidgetNode.getAttribute("data-is-in-layout")) ? true : false;
    /* 
       - we check for parent access to invoke jivox API methods directly 
       - our jivox widgets will be loaded inside an iframe and the widget iframe will be placed inside the layout frame
       - we will have parent access only if the widget is inline(or same origin policy)
       - we do post message to layout framework for invoking API methods, if we do not have parent access 
    */
    if(!isInLayout){
        var assetID = window.frameElement.id;
        parentAccess = true; 
    }
}catch(e){}
if(!isInLayout){
	if(parentAccess){
		isExtAsInline = jvx_validate(window.frameElement.getAttribute("extFilePath"));
		/*if(isExternalWg && jvx_validate(dynamicData)){
			jvx_raiseDYEvent(dynamicData);
		}*/
		if(!isExtAsInline){
			isStandardInline = true;
		}
	}else{
		isInLayout = false;
		isExternalWg = true;
		var adUnitType = getParameterValue(url,"adUnitType"),
			isCampaign = Number(getParameterValue(url,"isCampaign")),
			campaignId = getParameterValue(url,"campaignId"),
			externalStartEventId = getParameterValue(url,"externalStartEventId"),
			adId = getParameterValue(url,"adId"),
			creativeUnitType = getParameterValue(url,"creativeUnitType"),
			placementId = getParameterValue(url,"placementId"),
			siteId = getParameterValue(url,"siteId"),
			eventReportingURL = getParameterValue(url,"reportingURL"),
			isMobile = getParameterValue(url,"isMobile"),
			assetID = getParameterValue(url,"assetID"),
			clickTagURL = getParameterValue(url,"clickTag"),
			serverURL = getParameterValue(url,"serverURL"),
			dynamicData = "",
			DYReportingKey = "",
			DYselectedGroup = "",
			DYselectedRule = "",
			resolveDynDataURL = "",
			maxDynAPICall ="",
			maxDynAPICallCnt = 0,
			dyn__serviceList = "",
			isDynamic = Number(getParameterValue(url,"isDynamic")),
			debugWidget = getParameterValue(url,"debugWidget");
	}
}
function jvx_raiseEventOnWindow(msg){
		  var event; 
		  if(document.createEvent) {
			event = document.createEvent("HTMLEvents");
			event.initEvent(msg, true, true);
		  } else {
			event = document.createEventObject();
			event.eventType = msg;
		  }
		  event.eventName = msg;
		  var ele = document.getElementById("jvx_eventHandler");
		  if (document.createEvent) {
			ele.dispatchEvent(event);
		  } else {
			ele.fireEvent("on" + event.eventType, event);
		  }
}
if(isStandardInline){
	try{
	var jvx_iframeBody = document.getElementsByTagName("body")[0];
	var jQuery = function (selector) { return parent.jQuery(selector, jvx_iframeBody); };
	var $jvx = jQuery;
	}catch(e){}
}
function getParameterValue(queryStr,key){
	if(queryStr == null || queryStr == "") return "";
	var queryStrArr = queryStr.split("&"),queryStrArrLen = queryStrArr.length,tempArr = null,retVal = "";
	for(var i=0; i<queryStrArrLen; i++){
		tempArr = queryStrArr[i].split("=");
		if(key == tempArr[0]) retVal = tempArr[1];
	}
	return retVal;
}

var reqData = null;
var storeEventReq = {}, jvx_callbacks = {};
var passThroughParams = ['ap_gdpr','ap_gdpr_consent','gdpr','gdpr_consent','ap_gdpr_consent_v2','us_privacy'];
function getAddnlQSParams(){
	var queryStr = '';
	if(playerParamsMap){
		for(var i=0,len=passThroughParams.length;i<len;i++){
			if(playerParamsMap.hasOwnProperty(passThroughParams[i])){
				queryStr += '&' + passThroughParams[i] + '=' + playerParamsMap[passThroughParams[i]];
			}
		}
	}
	return queryStr;
}
var jvxAd = {
	"getUnitType": function(){
		try{
			if(debugWidget) 
				debuglog("Invoking getUnitType()");
			return getUnitType();
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking getUnitType() on parent");
				return parent.getUnitType();
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting getUnitType message to parent");
				window.parent.postMessage('jvxAPIGetData:getUnitType', "*");
			}
		}
	},
	"openClickThrough": function(url, event){
		try{
			if(debugWidget) 
				debuglog("Invoking openClickThrough() "+url);
			openClickThrough(url, event);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking openClickThrough() on parent "+url);
				parent.openClickThrough(url, event);
			}catch(e){
				var jvx_url_msg = 'jvxAPI:openClickThrough';
				if(typeof url != "undefined"){
					jvx_url_msg += ':'+encodeURIComponent(url);
				}
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting openClickThrough message to parent "+url);
				window.parent.postMessage(jvx_url_msg, "*");
			}
		}
	},
	"loadCmacro": function(){
		try{
			if(debugWidget) 
				debuglog("Invoking loadCmacro() on parent");
			parent.loadCmacro();
		}catch(e){
		}
	},
	"openURL": function(url){
		try{
			if(debugWidget) 
				debuglog("Invoking openURL() "+url);
			openURL(url);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking openURL() on parent "+url);
				parent.openURL(url);
			}catch(e){
				var jvx_url_msg = 'jvxAPI:openURL';
				if(typeof url != "undefined"){
					jvx_url_msg += ':'+encodeURIComponent(url);
				}
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting openURL message to parent "+url);
				window.parent.postMessage(jvx_url_msg, "*");
			}
		}
	},
	"recordEvent": function(eventId,addnlParam){
		if(!isCampaign) return;
		try{
			if(debugWidget) 
				debuglog("Invoking recordEvent() for "+eventId+" params:"+addnlParam);
			recordEvent(eventId,addnlParam);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking recordEvent() on parent for "+eventId+" params:"+addnlParam);
				parent.recordEvent(eventId,addnlParam);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting recordEvent message to parent for "+eventId+" params:"+addnlParam);
				window.parent.postMessage('jvxAPI:recordEvent:'+eventId+':'+addnlParam, "*");
			}
		}
	},
	"trackDCMClick": function(clickUrl,creativeVariant){
		if(!isCampaign) return;
		try{
			if(debugWidget) 
				debuglog("Invoking trackDCMClick() for creative Variant:"+creativeVariant+" params:"+clickUrl);
				trackDCMClick(clickUrl,creativeVariant);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking trackDCMClick() on parent for creative Variant: "+creativeVariant+" params:"+clickUrl);
					parent.trackDCMClick(clickUrl,creativeVariant);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting trackDCMClick message to parent for creative Variant: "+creativeVariant+" params:"+clickUrl);
					window.parent.postMessage('jvxAPI:trackDCMClick:'+encodeURIComponent(clickUrl)+':'+creativeVariant, "*");
			}	
		}		
	},			
	"recordCustomEvent": function(eventId, isInteractive, addnlParam){
		if(!isCampaign) return;
		if(typeof(isInteractive) == 'undefined') {
			isInteractive = true;
		}
		if(isInteractive) {
			if(debugWidget) 
				debuglog("Invoking recordEvent() for interactive event for "+eventId);
			this.recordEvent(externalStartEventId + parseInt(eventId));
		} else {
			if(debugWidget)
				debuglog("Invoking recordEvent() for non-interactive event for "+eventId);
			this.recordEvent(externalStartEventId + 20000 + parseInt(eventId));
		}
	},
	"showAsset": function(assetID){
		try{
			if(debugWidget)
				debuglog("Invoking showAsset() for "+assetID);
			showAsset(assetID);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking showAsset() on parent for "+assetID);
				parent.showAsset(assetID);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting showAsset message to parent for "+assetID);
				window.parent.postMessage('jvxAPI:showAsset:'+assetID, "*");
			}
		}
	},
	"hideAsset": function(assetID){
		try{
			if(debugWidget) 
				debuglog("Invoking hideAsset() for "+assetID);
			hideAsset(assetID);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking hideAsset() on parent for "+assetID);
				parent.hideAsset(assetID);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting hideAsset message to parent for "+assetID);
				window.parent.postMessage('jvxAPI:hideAsset:'+assetID, "*");
			}
		}
	},
	"renderAsset": function(assetID){
		try{
			if(debugWidget) 
				debuglog("Invoking renderAsset() for "+assetID);
			renderAsset(assetID);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking renderAsset() on parent for "+assetID);
				parent.renderAsset(assetID);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting renderAsset message to parent for "+assetID);
				window.parent.postMessage('jvxAPI:renderAsset:'+assetID, "*");
			}
		}
	},
	"invokeAsset": function(assetID,assetEventType,fireTracker){
		try{
			if(typeof fireTracker == "undefined") var fireTracker = 1;
			if(debugWidget) 
				debuglog("Invoking invokeAsset() for "+assetID);
			invokeAsset(assetID,assetEventType,fireTracker);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking invokeAsset() on parent for "+assetID);
				parent.invokeAsset(assetID,assetEventType,fireTracker);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting invokeAsset message to parent for "+assetID);
				window.parent.postMessage('jvxAPI:invokeAsset:'+assetID+":"+assetEventType+":"+fireTracker, "*");
			}
		}
	},
	"invokeAnim": function(assetID,animID){
		try{
			if(debugWidget) 
				debuglog("Invoking invokeAnim() for Asset:"+assetID+" Anim:"+animID);
			invokeAnim(assetID,animID);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking invokeAnim() on parent for Asset:"+assetID+" Anim:"+animID);
				parent.invokeAnim(assetID,animID);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting invokeAnim message to parent for Asset:"+assetID+" Anim:"+animID);
				window.parent.postMessage('jvxAPI:invokeAnim:'+assetID+":"+animID, "*");
			}
		}
	},
	"reloadAsset": function(assetID){
		try{
			if(debugWidget) 
				debuglog("Invoking reloadAsset() for "+assetID);
			reloadAsset(assetID);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking reloadAsset() on parent for "+assetID);
				parent.reloadAsset(assetID);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting reloadAsset message to parent for "+assetID);
				window.parent.postMessage('jvxAPI:reloadAsset:'+assetID, "*");
			}
		}
	},
	"pauseVideo": function(assetID){
		try{
			if(debugWidget) 
				debuglog("Invoking pauseVideo() for "+assetID);
			pauseVideo(assetID,1);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking pauseVideo() on parent for "+assetID);
				parent.pauseVideo(assetID,1);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting pauseVideo message to parent for "+assetID);
				window.parent.postMessage('jvxAPI:pauseVideo:'+assetID, "*");
			}
		}
	},
	"restartVideo": function(assetID){
		try{
			if(debugWidget) 
				debuglog("Invoking restartVideo() for "+assetID);
			restartVideo(assetID);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking restartVideo() on parent for "+assetID);
				parent.restartVideo(assetID);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting restartVideo message to parent for "+assetID);
				window.parent.postMessage('jvxAPI:restartVideo:'+assetID, "*");
			}
		}
	},
	"resumeVideo": function(assetID){
		try{
			if(debugWidget) 
				debuglog("Invoking resumeVideo() for "+assetID);
			resumeVideo(assetID);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking resumeVideo() on parent for "+assetID);
				parent.resumeVideo(assetID);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting resumeVideo message to parent for "+assetID);
				window.parent.postMessage('jvxAPI:resumeVideo:'+assetID, "*");
			}
		}
	},
	"setVideoVolume": function(assetID,vol){
		try{
			if(debugWidget) 
				debuglog("Invoking setVideoVolume() for "+assetID+" volume="+vol);
			setVideoVolume(assetID,vol);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking setVideoVolume() on parent for "+assetID+" volume="+vol);
				parent.setVideoVolume(assetID,vol);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting setVideoVolume message to parent for "+assetID+" volume="+vol);
				window.parent.postMessage('jvxAPI:setVideoVolume:'+assetID+":"+vol, "*");
			}
		}
	},
	"showGroups": function(groupName){
		try{
			if(debugWidget) 
				debuglog("Invoking showGroups() for "+groupName);
			showGroups(groupName);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking showGroups() on parent for "+groupName);
				parent.showGroups(groupName);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting showGroups message to parent for "+groupName);
				window.parent.postMessage('jvxAPI:showGroups:'+groupName, "*");
			}
		}
	},
	"hideGroups": function(groupName){
		try{
			if(debugWidget) 
				debuglog("Invoking hideGroups() for "+groupName);
			hideGroups(groupName);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking hideGroups() on parent for "+groupName);
				parent.hideGroups(groupName);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting hideGroups message to parent for "+groupName);
				window.parent.postMessage('jvxAPI:hideGroups:'+groupName, "*");
			}
		}
	},
	"getStorageData": function(getName,callback){
		try{
			if(debugWidget) 
				debuglog("Invoking getStorageData() for "+getName);
			return getStorageData(getName);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking getStorageData() on parent for "+getName);
				return parent.getStorageData(getName);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting getStorageData message to parent for "+getName);
				window.parent.postMessage('jvxAPIGetData:getStorageData:'+getName, "*");
				if(typeof getName != "undefined"){
					if(storeEventReq.hasOwnProperty(getName)){
						delete storeEventReq[getName];
					}
					storeEventReq['getStorageData'] = callback;
				}
			}
		}
	},
	"setStorageData": function(setName,useSessionStorage){
		try{
			if(debugWidget) 
				debuglog("Invoking setStorageData() for "+setName);
			setStorageData(setName,useSessionStorage);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking setStorageData() on parent for "+setName);
				parent.setStorageData(setName,useSessionStorage);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting setStorageData message to parent for "+setName);
				window.parent.postMessage('jvxAPI:setStorageData:'+setName+':'+useSessionStorage, "*");
			}
		}
	},
	"isCampaign": function(){
		var isLive = false;
		try{
			var siteId  = (url.match(/siteId=(.*)&/)[1]).split("&")[0];
		}catch(e){}
		if((typeof isCampaign != "undefined" && isCampaign) || (typeof siteId != "undefined" && siteId !=null && siteId  != "" && siteId )){
			isLive = true;
		}
		if(debugWidget) 
			debuglog("isCampaign = "+isLive);
		
		return isLive;
	},
	"on": function(msg,methodName){
		try{
			$('#eventHandler').on(msg,methodName);
		}catch(e){
			try{
				 parent.$('#eventHandler').on(msg,methodName);
			}catch(e){
				attachEventListener(document.getElementById("jvx_eventHandler"),msg,methodName,false);
			}
		}
	},
	"raiseEvent": function(msg){
		try{
			if(debugWidget) 
				debuglog("Invoking raiseEvent() for "+msg);
			raiseEvent(msg);
		}catch(e){
			try{
				var windowID = jvx_validate(assetID) ? assetID : window.frameElement.id;
				var msg_f = (msg.indexOf(windowID+".") == -1) ? (windowID+"."+msg) : msg;
				if(isExtAsInline){
					parent.raiseEvent(msg);
				}
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking raiseEvent() on parent for "+msg_f);
				
				parent.raiseEvent(msg_f);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting raiseEvent message to parent for "+msg+" and "+msg_f);
				window.parent.postMessage('jvxAPI:raiseEvent:'+msg, "*");
				window.parent.postMessage('jvxAPI:raiseEvent:'+msg_f, "*");
			}
		}
	},
	"invokeBaseMethod": function(key,value){
		try{
			if(debugWidget) 
				debuglog("Invoking invokeBaseMethod() for "+key+" "+value);
			invokeBaseMethod(key,value);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking invokeBaseMethod() on parent for "+key+" "+value);
				parent.invokeBaseMethod(key,value);
			}catch(e){
				if(debugWidget) {
					debuglog("Exception:"+e.toString()+": Posting invokeBaseMethod to parent for "+key+" "+value);
				}
				window.parent.postMessage('jvxAPI:invokeBaseMethod:'+key,value, "*");
			}
		}
	},
	"invokeExpMethod": function(key,value){
		try{
			if(debugWidget) 
				debuglog("Invoking invokeExpMethod() for "+key+" "+value);
			invokeExpMethod(key,value);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking invokeExpMethod() on parent for "+key+" "+value);
				parent.invokeExpMethod(key,value);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting invokeExpMethod to parent for "+key+" "+value);
				window.parent.postMessage('jvxAPI:invokeExpMethod:'+key,value, "*");
			}
		}
	},
	"raiseEventOnBase": function(msg){
		try{
			if(debugWidget) 
				debuglog("Invoking raiseEventOnBase() for "+msg);
			raiseEventOnBase(msg);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking raiseEventOnBase() on parent for "+msg);
				parent.raiseEventOnBase(msg);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting raiseEventOnBase to parent for "+msg);
				window.parent.postMessage('jvxAPI:raiseEventOnBase:'+msg, "*");
			}
		}
	},
	"raiseEventOnExp": function(msg){
		try{
			if(debugWidget) 
				debuglog("Invoking raiseEventOnExp() for "+msg);
			raiseEventOnExp(msg);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking raiseEventOnExp() on parent for "+msg);
				parent.raiseEventOnExp(msg);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting raiseEventOnExp message to parent for "+msg);
				window.parent.postMessage('jvxAPI:raiseEventOnExp:'+msg, "*");
			}
		}
	},
	"recordEventByName": function(event_name, isInteractive, addnlParam, asset){
		if(!isCampaign) return;
		try{
			var event_name = event_name,
				addnlParam = jvx_validate(addnlParam) ? addnlParam : "",
				asset = jvx_validate(asset) ? asset : "";
			if(debugWidget) 
				debuglog("Invoking recordEventByName() for "+event_name+":interactive="+isInteractive+":asset="+asset+":params="+addnlParam);
			recordEventByName(event_name, isInteractive, addnlParam,asset);
		}catch(e){
			try{
				var windowID = asset != "" ? asset : (jvx_validate(assetID) ? assetID : window.frameElement.id);
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking recordEventByName() on parent for "+event_name+":interactive="+isInteractive+":asset="+windowID+":params="+addnlParam);
				parent.recordEventByName(event_name, isInteractive, addnlParam,windowID);
			}catch(e){
				var msg = encodeURIComponent(event_name)+':'+isInteractive+':'+addnlParam+':'+ windowID;
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting recordEventByName message to parent for "+msg);
				window.parent.postMessage('jvxAPI:recordEventByName:'+msg, "*");
			}
		}
	},
	"doAssetVariantReporting": function(type, assetid){
		if(!isCampaign) return;
		try{
			doAssetVariantReporting(type, assetid);
		}catch(e){
			try{
				parent.doAssetVariantReporting(type, assetid);
			}catch(e){
				var msg = type+':'+assetid;
				window.parent.postMessage('jvxAPI:doAssetVariantReporting:'+msg, "*");
			}
		}
	},
	"recordAssetVariation": function(type, assetVariantList, dropCookie){
		if(!isCampaign) return;
		try{
			if(debugWidget){
				debuglog("Recording recordAssetVariation() for "+type);
			}
			recordAssetVariation(type, assetVariantList, dropCookie);
		}catch(e){
			try{
				parent.recordAssetVariation(type, assetVariantList, dropCookie);
			}catch(e){
				var msg = type+':'+assetVariantList+':'+dropCookie;
				window.parent.postMessage('jvxAPI:recordAssetVariation:'+msg, "*");
			}
		}
	},
	/*record interaction events from widgets
	-eventType holds click, hover or custom events
	-isInteractive holds boolean value(true/false) or undefined
	-widgetEventId holds integer and based on isInteractive value eventId is calculated with externalStartEventId
		-true : widgetEventId + externalStartEventId
		-false : widgetEventId + 20000 + externalStartEventId
		-undefined : widgetEventId
	*/
	"recordInteractionEvent": function(eventType, widgetEventId, isInteractive, event){
		if(!isCampaign) return;
		var eventId = parseInt(widgetEventId);
		if(typeof(isInteractive) != "undefined"){
			if(isInteractive){
				eventId += externalStartEventId;
			}else{
				eventId += 20000 + externalStartEventId;
			}
		}
		try{
			recordInteractionEvent(assetID, eventType, eventId, event);
		}catch(e){
			try{
				parent.recordInteractionEvent(assetID, eventType, eventId, event);
			}catch(e){
				var msg = assetID+':'+encodeURIComponent(eventType)+':'+eventId;
				window.parent.postMessage('jvxAPI:recordInteractionEvent:'+msg, "*");
			}
		}
	},
	"raiseAndRecordEvent": function(eventName, eventType, widgetEventId, isInteractive){
		if(eventName){
			this.raiseEvent(eventName);
		}
		this.recordInteractionEvent(eventType, widgetEventId, isInteractive);
	},
	"getCreativeSize": function(cb){
		if(typeof(jvx_callbacks["getCreativeSize"]) == 'undefined') jvx_callbacks["getCreativeSize"]= [];
		jvx_callbacks["getCreativeSize"].push((typeof(cb) != "undefined")? cb: "");
		if(debugWidget) 
			debuglog("Posting getCreativeSize message to top");
		top.postMessage(objectName+":getCreativeSize","*");
	},
	"initialDimension": function(width,height){
		if(debugWidget) 
			debuglog("Posting initialDimension message to top: width:"+width+" height:"+height);
		top.postMessage(objectName+":initialDimension:"+width+":"+height+"","*");
	},
	"resizeCreative": function(width,height,effect, cb){
		if(typeof(jvx_callbacks["resizeComplete"]) == 'undefined') jvx_callbacks["resizeComplete"]= [];
		jvx_callbacks["resizeComplete"].push((typeof(cb) != "undefined")? cb: "");
		if(debugWidget) 
			debuglog("Posting resizeCreative message to top: width:"+width+" height:"+height+" effect:"+effect);
		top.postMessage(objectName+":resizeCreative:"+width+":"+height+":"+effect+"","*");
	},
	/*parallax code*/
	"leaveBehindCreative": function(pos,scalePer, cb){
		if(typeof(jvx_callbacks["leaveBehindComplete"]) == 'undefined') jvx_callbacks["leaveBehindComplete"]= [];
		jvx_callbacks["leaveBehindComplete"].push((typeof(cb) != "undefined")? cb: "");
		if(debugWidget) 
			debuglog("Posting leaveBehindCreative message to top: Pos:"+pos+" scalePer:"+scalePer);
		top.postMessage(objectName+":leaveBehindCreative:"+pos+":"+scalePer+"","*");
	},
	"retainOriginalCreative": function(cb){
		if(typeof(jvx_callbacks["retainOriginalComplete"]) == 'undefined') jvx_callbacks["retainOriginalComplete"]= [];
		jvx_callbacks["retainOriginalComplete"].push((typeof(cb) != "undefined")? cb: "");
		if(debugWidget) 
			debuglog("Posting retainOriginalCreative message to top");
		top.postMessage(objectName+":retainOriginalCreative","*");
	},
	/*parallax code end*/
	"getCreativePosition": function(cb){
		if(typeof(jvx_callbacks["getCreativePosition"]) == 'undefined') jvx_callbacks["getCreativePosition"]= [];
		jvx_callbacks["getCreativePosition"].push((typeof(cb) != "undefined")? cb: "");
		if(debugWidget) 
			debuglog("Posting getCreativePosition message to top");
		top.postMessage(objectName+":getCreativePosition","*");
	},
	"setHeightForInOutViewport": function(height){
		if(debugWidget) 
			debuglog("Posting setHeightForInOutViewport message to top: height:"+height);
		top.postMessage(objectName+":setHeightForInOutViewport:"+height,"*");
	},
	"getResult":function(callback){
		attachEventListener(window.parent, "message", callback, false);
	},
	"clientErrorLog": function(data,msg){
		if(data == '' || data == null || data == 'undefined'){
			if(msg != ''){
				jvxErr([{"message": msg}]);
			}
			return false;
		}
		return true;
	},
	"dynamicDataRequestObj": {},
	/*get - inputs to build dynamic data request query (like database name, keyvalue, callback function name)*/
	"assetDBReq": function(service){
		this.dynamicDataRequestObj['currentService'] = undefined;
		var isParamValid = this.clientErrorLog(service,'Invalid database name parameter');
		if(!isCampaign || !isParamValid) return this;
		var dynDataReqObj = this.dynamicDataRequestObj;
		if (!dynDataReqObj.hasOwnProperty('dataBase')) { 
			dynDataReqObj['dataBase'] = {};
		}
		var	queryObj = dynDataReqObj['dataBase'];
		service=((service).split('|')[1] == 'dbUserDef') ? service : service+'|db';
		dynDataReqObj['currentService'] = service;
		if (!queryObj.hasOwnProperty(service)) { 
			queryObj[service] = {};
			queryObj[service]['dbName'] = service;
		}
		return this;
	},
	/*get - primary keys for the data to return from the database*/
	"keys": function(keyVal){
		var isParamValid = this.clientErrorLog(keyVal,'Invalid keys parameter');
		if(!isCampaign || !isParamValid || typeof this.dynamicDataRequestObj['currentService'] == 'undefined') return this;
		var dynDataReqObj = this.dynamicDataRequestObj,
			queryObj = dynDataReqObj['dataBase'],
		    currentService = queryObj[dynDataReqObj['currentService']];
		if (currentService.hasOwnProperty('key')) { 
			currentService['key'] += ','+String(keyVal);
		}else{
			currentService['key'] = String(keyVal);
		}
		currentService['lastUpdatedkey'] = String(keyVal);
		var keyStr = currentService['key'].split(',');
		currentService['key'] = this.removeDuplicates(keyStr);  
		return this; 
	},
	/*get - Data signal and its property for the data to return from the database*/
	"withDataSignal": function(signalType,keyVal){
		var matchedSignal,
			matchedKeyValue,
			dynS = dyn__serviceList,
			signalType = (signalType).toLowerCase(),
			allDataSignals = [],
			allKeysOfMatchedSignal = [];
		for(var attr in dynS){
			allDataSignals.push(attr);
			if((attr).toLowerCase() == signalType){
				matchedSignal = attr;
			}
		}
		if(!dynS.hasOwnProperty(matchedSignal)){
			this.clientErrorLog('','Invalid Data Signal - should match with the below Data Signal list - \n['+String(allDataSignals)+']');
			return this;
		}
		keyVal = ( signalType == "tagvarservice" || signalType == "cookiedata") ?(((signalType == "tagvarservice")?"datasignal":"jvxdynsl_group")+keyVal):keyVal;
		for(var attr in dynS[matchedSignal]){
			allKeysOfMatchedSignal.push(attr);
			if((attr).toLowerCase() == (keyVal).toLowerCase()){
				matchedKeyValue = attr;
			}
		}
		if(!dynS[matchedSignal].hasOwnProperty(matchedKeyValue)){
			this.clientErrorLog('','Invalid property of Data Signal('+ matchedSignal+') - should match with the below property list - \n['+String(allKeysOfMatchedSignal)+']');
			return this;
		}
		var finalKeys = matchedSignal+":"+matchedSignal+"."+matchedKeyValue;
		finalKeys = dynamicData[finalKeys]
		this.keys(finalKeys);
		return this;
	},
	/*get - how many data should be return from the database*/
	"max": function(maxVal){
		var isParamValid = this.clientErrorLog(maxVal,'');
		if(!isCampaign || !isParamValid || typeof this.dynamicDataRequestObj['currentService'] == 'undefined') return this;
		var dynDataReqObj = this.dynamicDataRequestObj,
			queryObj = dynDataReqObj['dataBase'],
			currentService = queryObj[dynDataReqObj['currentService']];
		currentService['max'] = maxVal;
		return this;
	},
	/*get - in which order (firstMatch or random) the data should be return from the database*/
	"order": function(order){
		var isParamValid = this.clientErrorLog(order,'');
		if(!isCampaign || !isParamValid || typeof this.dynamicDataRequestObj['currentService'] == 'undefined') return this;
		var dynDataReqObj = this.dynamicDataRequestObj,
			queryObj = dynDataReqObj['dataBase'],
			currentService = queryObj[dynDataReqObj['currentService']];
		currentService['order'] = order;
		return this;
	},
	/*get - in which orderBy (columnName) the data should be return from the database*/
	"orderBy": function(orderBy){
		var isParamValid = this.clientErrorLog(orderBy,'');
		if(!isCampaign || !isParamValid || typeof this.dynamicDataRequestObj['currentService'] == 'undefined') return this;
		var dynDataReqObj = this.dynamicDataRequestObj,
			queryObj = dynDataReqObj['dataBase'],
			currentService = queryObj[dynDataReqObj['currentService']];
		currentService['orderBy'] = orderBy;
		return this;
	},
	/*return user defined query object*/
	"build": function(order){
		if(!isCampaign || typeof this.dynamicDataRequestObj['currentService'] == 'undefined') return this;
		var dynDataReqObj = this.dynamicDataRequestObj,
			queryObj = dynDataReqObj['dataBase'],
			currentService = queryObj[dynDataReqObj['currentService']];
		return JSON.parse(JSON.stringify(queryObj[dynDataReqObj['currentService']]));
	},
	/*set callback method to get response for dynamic data request */
	"dynamicDataCallback": function(callback){
		var dynDataReqObj = this.dynamicDataRequestObj;
		dynDataReqObj['callback'] = callback;
		return this;
	},
	/*Restrict max api calls from getDynamicService per session*/
	"hasAPICallExceedLimit": function(){
		maxDynAPICallCnt++;
		if(maxDynAPICallCnt > Number(maxDynAPICall)){
			this.clientErrorLog('','Maximum '+ maxDynAPICall+' API calls allowed from getDynamicService per session');
			return true;
		}else{
			return false; 
		}
	},
	/*get - the dynamic data from the database*/
	"get": function(){
		if(!isCampaign) return this;
		if(this.hasAPICallExceedLimit()) return this;
		var i,
			dynDataReqObj = this.dynamicDataRequestObj;
			queryObj = this.dynamicDataRequestObj['dataBase'],
			dynDataReqObj['queryStr'] = '',
			argLen = arguments.length;
			checkdbKey = (arguments.length > 0) ? 'dbUserDef' : 'db';
		if(argLen > 0){
			for (var i = 0; i < argLen; i++) {
				if(typeof arguments[i]['dbName'] != 'undefined' && typeof arguments[i]['lastUpdatedkey'] != 'undefined'){
					var db = this.assetDBReq(arguments[i]['dbName']+'UserDef').keys(arguments[i]['lastUpdatedkey']).max(arguments[i]['max']).order(arguments[i]['order']).orderBy(arguments[i]['orderBy']).build();	
				}
			}
		}
		for (var key in queryObj){
			var isDb = (key).split('|')[1];
			if(isDb == checkdbKey){
				this.updateQuery(queryObj[key]);
				if(isDb == 'dbUserDef'){
					delete queryObj[key];
				}
			}
		}
		if(dynDataReqObj['queryStr'] != ''){
			var url = resolveDynDataURL+"?";
			if(typeof playerParamsMap != "undefined" && playerParamsMap.hasOwnProperty("debugWidget") && playerParamsMap.debugWidget == 1)
			{
			 	url += "debugWidget=1&"
			}
			url += 'campaignId='+campaignId+dynDataReqObj['queryStr']+'&callback='+dynDataReqObj['callback']+'&r_='+Math.random();
			url += getAddnlQSParams();
			var script = document.createElement('script');
			script.src = url;
			document.getElementsByTagName('body')[0].appendChild(script);
		}
	},
	/* to remove duplicates from an object*/
	"removeDuplicates":function(list){
		var uniqueArray = list.filter(function(elem, pos,arr) {
			return arr.indexOf(elem) == pos;
		}); 
		return uniqueArray;
	},
	/* to update query for dynamic data request*/
	"updateQuery":function(obj){
		var dynDataReqObj = this.dynamicDataRequestObj,
		    dbName = (obj['dbName']).split("|")[0],
		    queryStr='';
		queryStr += '&var='+dbName+':'+dbName;
		queryStr += '&ap_'+dbName+'='+obj['key'];
		if (obj.hasOwnProperty('max')) { 
		  queryStr += '&ap_'+dbName+':max='+obj['max'];
		}
		if (obj.hasOwnProperty('order')) { 
		  queryStr += '&ap_'+dbName+':order='+obj['order'];
		}
		if (obj.hasOwnProperty('orderBy')) {
		  queryStr += '&ap_'+dbName+':orderBy='+obj['orderBy'];
		}
		dynDataReqObj['queryStr'] += queryStr;
	},
	"getDynamicService":function(services,key,callback){
		if(!isCampaign) return;
		if(this.hasAPICallExceedLimit()) return this;
		if(typeof services == "string") services = services.split(",");
		if(typeof key == "string") key = key.split(",");
		var queryStr = "campaignId="+campaignId,
			arrayLen = services.length,
			keyArrLen = key.length,
			keyValueArr = null,
			url = resolveDynDataURL+"?";
		for(var i=0; i<keyArrLen; i++){
			keyValueArr = key[i].split("=");
			queryStr += "&"+keyValueArr[0]+"="+keyValueArr[1];
		}
		for(var i=0; i<arrayLen; i++) queryStr += "&var="+services[i];
		queryStr += "&callback="+callback+'&r_='+Math.random();
		url += queryStr;
		url += getAddnlQSParams();
		var script = document.createElement('script');
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	},
	"getCarousel": function(ccards, callback){	//ccards - number of carousel cards
		var queryStr = "campaignId="+campaignId,
			url = evalDynRulesCarousel+"?";
		var queryParams = ['bDim', 'bUnitId', 'es_pId', 'creativeUnitType', 'siteId'];
		if(playerParamsMap){
			for(var i=0,len=queryParams.length;i<len;i++){
				if(playerParamsMap.hasOwnProperty(queryParams[i])){
					queryStr += '&' + queryParams[i] + '=' + playerParamsMap[queryParams[i]];
				}
			}
			for(var key in playerParamsMap) { 				//Adding all the dataSignals to evalDynamic call
				if(key.indexOf('ap_DataSignal') > -1) {
					queryStr += '&' + key + '=' + playerParamsMap[key];
				}        
			}
		}
		queryStr += "&callback="+callback+"&ccards="+ccards;
		url += queryStr;
		url += getAddnlQSParams();
		var script = document.createElement('script');
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	},
	"getDynamicData":function(){
		if(debugWidget) { 
			debuglog("Invoking getDynamicData()");
			try {
				debuglog("dynamicData : "+dynamicData.stringify());	
			} catch (e){ }
		}
		return dynamicData;
	},
	"getCreativeVariant":function(){
		return DYReportingKey;
	},
	"getSelectedCreativeMaster":function(){
		return DYselectedGroup;
	},
	"getSelectedSegment":function(){
		return DYselectedRule;
	},
	"isExtWidget":function(){
		if(debugWidget) 
			debuglog("isExtWidget? "+isExternalWg);
		return isExternalWg;
	},
	"isExtAsInlineWidget":function(){
		if(debugWidget) 
			debuglog("isExtAsInlineWidget? "+isExtAsInline);
		return isExtAsInline;
	},
	"isInlineWidget":function(){
		if(debugWidget) 
			debuglog("isInlineWidget? "+isStandardInline);
		return isStandardInline;
	},
	"isDynamic":function(){
		if(debugWidget) 
			debuglog("isDynamic? "+isDynamic);
		return isDynamic;
	},
	"getAssetEventType":function(assetIDList){
		try{
			if(debugWidget) 
				debuglog("Invoking getAssetEventType() for "+assetIDList);
			return getAssetEventType(assetIDList);
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking getAssetEventType("+assetIDList+") on parent");
				return parent.getAssetEventType(assetIDList);
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting getAssetEventType message to parent");
				window.parent.postMessage('jvxAPIGetData:getAssetEventType:'+assetIDList, "*");
			}
		}
	},
	"getAssetInteractionDetails":function(assetIds,callback){
		window.parent.postMessage('jvxAssetInteraction:'+encodeURIComponent(JSON.stringify(arguments)), "*");
		var getAIDetails = encodeURIComponent(JSON.stringify(arguments));
		try{
			if(debugWidget) 
				debuglog("Invoking getAssetInteractionDetails() for "+getAIDetails);
				
			return JSON.parse(decodeURIComponent(getAssetInteractionDetails(getAIDetails)));
		}catch(e){
			try{
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Invoking getAssetInteractionDetails() on parent for "+getAIDetails);
				return JSON.parse(decodeURIComponent(parent.getAssetInteractionDetails(getAIDetails)));
			}catch(e){
				if(debugWidget) 
					debuglog("Exception:"+e.toString()+": Posting getAssetInteractionDetails message to parent for "+getAIDetails);
				window.parent.postMessage('jvxAPIGetData:getAssetInteractionDetails:'+getAIDetails, "*");
				if(typeof getAIDetails != "undefined"){
					if(storeEventReq.hasOwnProperty(getAIDetails)){
						delete storeEventReq[getAIDetails];
					}
					storeEventReq['getAssetInteractionDetails'] = callback;
				}
			}
		}
	},
	"appendHTML":function(asset_ID, data, targetElemID){
		try{
			if(debugWidget) 
				debuglog("Invoking appendHTML() for "+asset_ID+", Target element:"+targetElemID);
			if(asset_ID == "self"){
				var appendElemID = (targetElemID == undefined) ? assetID : targetElemID;
				var appendElem = document.getElementById(appendElemID) != null ? document.getElementById(appendElemID) : document.body;
				appendElem.innerHTML += data;	
			}else{
				var assetHTML = parent.document.getElementById(asset_ID);
				var appendAssestElem = assetHTML.contentDocument.getElementById(targetElemID) != null ? assetHTML.contentDocument.getElementById(targetElemID) : assetHTML.contentDocument.body;
				appendAssestElem.innerHTML += data;
			}
		}catch(e){
			if(debugWidget) 
				debuglog("Exception:"+e.toString()+": Posting appendHTML message to parent for "+asset_ID+", Target element:"+targetElemID);
			window.parent.postMessage('jvxAPI:appendHTML:'+asset_ID+':'+data+':'+targetElemID, "*");
		}
			
	},
	"replaceHTML":function(asset_ID, data, targetElemID){
		try{
			if(debugWidget) 
				debuglog("Invoking replaceHTML() for "+asset_ID+", Target element:"+targetElemID);
			if(asset_ID == "self"){
				var appendElemID = (targetElemID == undefined) ? assetID : targetElemID;
				var appendElem = document.getElementById(appendElemID) != null ? document.getElementById(appendElemID) : document.body;
				appendElem.innerHTML = data;
			}else{
				var assetHTML = parent.document.getElementById(asset_ID);
				var appendAssestElem = assetHTML.contentDocument.getElementById(targetElemID) != null ? assetHTML.contentDocument.getElementById(targetElemID) : assetHTML.contentDocument.body;
				appendAssestElem.innerHTML = data;
			}
			
		}catch(e){
			if(debugWidget) 
				debuglog("Exception:"+e.toString()+": Posting replaceHTML message to parent for "+asset_ID+", Target element:"+targetElemID);
			window.parent.postMessage('jvxAPI:replaceHTML:'+asset_ID+':'+data+':'+targetElemID, "*");
		}
	}
}
function jvx_validate(val){
	return (typeof val == "undefined" || val == null || val == "" || !val) ? false : true;
}
if(typeof console == "undefined" || typeof console.log == "undefined"){
	window.console = {
		log: function () {}
	};
}
function debuglog(str) {
	console.log("Jivox Widget API:"+str);
}
function receiveMsgOnWidgetConfig(action){
	if(typeof invokeAction == 'function' ){ 
		invokeAction(action);
	}
}

function msgReceived(msg,methodName){
 	if(storeEventReq.hasOwnProperty(msg)){
		if(msg == "getAssetInteractionDetails"){
			this[storeEventReq[msg]](methodName);
		} else {
		 	storeEventReq[msg]();
		}
	}else if(typeof methodName != "undefined" && storeEventReq.hasOwnProperty(methodName)){
		storeEventReq[methodName](msg);
	}
}
function attachEventListener(target, eventType, functionRef, capture){
	try{
		if(typeof target.addEventListener != "undefined"){
			target.addEventListener(eventType, functionRef, capture);
		}else{
			target.attachEvent("on" + eventType, functionRef);
		}	
	}catch(e){}
	
};
if(parentAccess && !isInLayout){
	/*if(!isInLayout){
		parent.dummyMethodToAccess();
	}*/
	function eventListner(msg){
	   /* var dotIndex = msg.indexOf("."),//(msg.search("player") == -1) ? 8 : 6,
			assetID = msg.substr(0,dotIndex),
			eventTypeStr = msg.substr(dotIndex+1,msg.length-1);*/
		try{
			msgReceived(msg);
		}catch(e){}
	}
}else{
	function listenLayoutPostMsg(e){
			if(typeof e.data != "string"){
                return;
            }
			var s = e.data.split(':', 10);
			if(s && s.length >= 2 && s[0] == "layoutWidgetListner" ){
				if(s[1] == "response"){
					reqData = s[2];
					try{
						postMsgRecived();
					}catch(e){}
				}else if(s[1] == "eventListner"){
					var msg = s[2];
					try{
						if(msg == "raiseEvent"){
							jvx_raiseEventOnWindow(s[3]);
						}
						if(msg == "getAssetInteractionDetails"){
							msgReceived(msg,JSON.parse(decodeURIComponent(s[3])));
						}else{
							msgReceived(msg,s[3]);
						}
					}catch(e){}
				}else if(s[1] == "invokeB2E"){
					var msg = s[2];
					try{
						window[s[2]](s[3]);
					}catch(e){}
				}else if(s[1] == "dynamicData"){
					dynamicData = JSON.parse(decodeURIComponent(s[2]));
					jvx_raiseDYEvent();
					if(isDynamic){
						try{initiate();}catch(e){}
					}
				}else if(s[1] == "replaceHTML"){
					try{		
						jvxAd.replaceHTML("self",s[2],s[3]);
					}catch(e){}
				}else if(s[1] == "appendHTML"){
					try{
						jvxAd.appendHTML("self",s[2],s[3]);
					}
					catch(e){}
				}
			}
			
	}
	attachEventListener(window, "message", listenLayoutPostMsg, false);
}
function jvx_raiseDYEvent(){
	try{
		jvx_raiseEventOnWindow("onDynamicDataLoad");
		if(typeof onDynamicDataLoad != "undefined"){
			onDynamicDataLoad(dynamicData);
		} 
	}catch(e){ 
		if(typeof console.oldLog == "undefined") { 
			console.log(e);
		}
		else {
			console.oldLog(e);
		}
	}
}
function jvxErr(errMsg){
	var errMsgLen = errMsg.length;
	if(errMsgLen == 0) return;
	for(var i=0;i<errMsgLen;i++){
		console.log(errMsg[i].message);
	}
}
if(!isInLayout){
attachEventListener(window.parent, "message", function(e){
            if(typeof e.data != "string"){
                return;
            }
			var s = e.data.split(':', 10), cb = "",res = "";

			if(typeof(jvx_callbacks[s[1]]) != "undefined"){
				cb = jvx_callbacks[s[1]].shift();
				if(s[1] == 'getCreativeSize')res = [s[2], s[3]];
				if(s[1] == 'getCreativePosition')res = [s[2], s[3]];
			}
			else if(typeof(jvx_callbacks[s[3]]) != "undefined"){

				cb = jvx_callbacks[s[3]].shift();
				res = "resizeComplete";
			}
			if(typeof(cb) == "function") cb(res);

		}, false);
}

if(isDynamic && parentAccess && !isInLayout){
	(function(){
		// make dynamicData available to widget in JSON format
		var parentRef = window.parent;
		// creativeVariant is decoded value of DYReportingKey
		DYReportingKey = (parentRef && parentRef.creativeVariant) ? parentRef.creativeVariant : "";
		DYselectedGroup = (parentRef && parentRef.DYselectedGroup) ? parentRef.DYselectedGroup : "";
		DYselectedRule = (parentRef && parentRef.DYselectedRule) ? parentRef.DYselectedRule : "";
		resolveDynDataURL = (window.parent && window.parent.resolveDynDataURL) ? window.parent.resolveDynDataURL : "";
		evalDynRulesCarousel = (window.parent && window.parent.evalDynRulesCarousel) ? window.parent.evalDynRulesCarousel : "";
		maxDynAPICall = (window.parent && window.parent.maxDynAPICall) ? window.parent.maxDynAPICall : 5;
		maxDynAPICallCnt = 0;
		dyn__serviceList = (window.parent && window.parent.dyn__serviceList) ? window.parent.dyn__serviceList : "";
		var dyn_data = (window.parent && window.parent.dynamicJSONData) ? window.parent.dynamicJSONData : "";
		if(dyn_data && dyn_data['data']){
			dynamicData = dyn_data['data'];
		}
	})();
}

attachEventListener(window,"load",function(){
	if(!isInLayout){
		(function creatEventHandler(){
			var ele = document.createElement("div");
			ele.id = "jvx_eventHandler";
			ele.style.position = "absolute";
			ele.style.top = "-1000px";
			ele.style.left = "-1000px";
			document.body.appendChild(ele);
		})();
	}
	
	if((isStandardInline || isExtAsInline) && isDynamic){
		jvx_raiseDYEvent(dynamicData);
	}
	try{ 
		if((!isDynamic || !isExternalWg) && !isInLayout){
			if(typeof initiate != "undefined"){
				initiate();
			}
		}
	} catch(e){ 
		if(typeof console.oldLog == "undefined") { 
			console.log(e);
		}
		else {
			console.oldLog(e);
		}
	}
},false);
