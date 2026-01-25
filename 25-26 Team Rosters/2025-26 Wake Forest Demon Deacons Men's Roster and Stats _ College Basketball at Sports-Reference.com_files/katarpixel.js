// Kantar Pixel ------
var JVX_SITEID = siteId,
JVX_PLACEMENTID = placementId,
JVX_GROUPID = encodeURIComponent(parent.DYReportingKey);
const kantarUrl = "https://secure.insightexpressai.com/adServer/adServerESI.aspx?script=false&bannerID=12791326&siteID="+JVX_SITEID+"&creativeID="+JVX_GROUPID+"&placementID="+JVX_PLACEMENTID+"&redir=https://secure.insightexpressai.com/adserver/1pixel.gif";
console.log(kantarUrl)
const pixel = document.createElement("img");
pixel.src = kantarUrl;
pixel.width = 1;
pixel.height = 1;
pixel.style.display = "none";
document.body.appendChild(pixel);




