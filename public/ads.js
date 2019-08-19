function addScript(filename, scriptId, id) {
    var scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = filename;
    scriptElement.id = scriptId;
    var foundElement = id ? document.getElementById(id) : undefined;
    var element = foundElement ? foundElement : document.body;
    element.appendChild(scriptElement);
}
function removeChildren(id) {
    var node = document.getElementById(id);
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
function loadAds() {
    if (!isAdLoaded) {
        addScript("//www.bcloudhost.com/cb5c5ebbb34a3d640a9e24728351d177/invoke.js", "adsterraAd", "adsterraAdDiv");
        addScript("//p362977.clksite.com/adServe/banners?tid=362977_711293_0&type=footer&size=22", "rhFooter", "rhFooterDiv");
        addScript("//p362977.clksite.com/adServe/banners?tid=362977_711293_3&type=floating_banner&size=6&side=right&position=bottom", "rhFloatingDiv");
        isAdLoaded = true;
    }
    addScript("//p362977.clksite.com/adServe/banners?tid=362977_711293_1", "rhBanner", "rhBannerDiv");
}

var isAdLoaded = false;

function removeAds() {
    removeChildren("rhBannerDiv");
    // removeChildren("adsterraAdDiv");
}
function reloadAds() {
    removeAds();
    loadAds();
}
