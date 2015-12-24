(function(){
	var url = {
		DOWN_APP_URL : "http://m.jd.com/download/downApp.html",
		DOWN_APP_IOS : "http://union.m.jd.com/download/go.action?to=http%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fid414245413&client=apple&unionId=12532&subunionId=m-top&key=e4dd45c0f480d8a08c4621b4fff5de74",
		DOWN_APP_ANDROID : "http://m.jd.com/download/downApp.html",
		DOWN_WEIXIN : "http://a.app.qq.com/o/simple.jsp?pkgname=com.jingdong.app.mall&g_f=991850",
		DOWN_IPAD : "https://itunes.apple.com/cn/app/jing-dong-hd/id434374726?mt=8",
		INTENT_URL : "openApp.jdMobile://360buy?params=",
		Chrome_Intent : "intent://m.jd.com/#Intent;scheme=openApp.jdMobile;package=com.jingdong.app.mall;end"
			
	};
	var isChrome = M.browser.getBrowser().browser == 'chrome';
	var isAndroid = M.browser.getOs().os == 'android';
	var isWeiXin = navigator.userAgent.indexOf("MicroMessenger") >= 0;
	var isInstall = false;
	var IframeId = 'plugIn_downloadAppPlugIn_loadIframe';
	var IframeHasRender = false;
	
	
	function getIntentUrl (){
		return  url.INTENT_URL+"&r="+(new Date()).getTime();
	}
	
	function getChromeIntent (intent){
		return  "intent://m.jd.com/#Intent;scheme="+intent+";package=com.jingdong.app.mall;end";
	}
	
	function downWeixincheck(){
        WeixinJSBridge.invoke("getInstallState", {packageName: "com.jingdong.app.mall",packageUrl: "openApp.jdMobile://"},
            function(e) {
                var n = e.err_msg, r = 0;
                if( n.indexOf("get_install_state:yes") > -1){
                    isInstall = true;
                }
            }
        );
    }
	
	function install(){
		if(isWeiXin){
			if(isInstall){
				location.href = getIntentUrl();
			}else{
				location.href = url.DOWN_WEIXIN;
			}
			return;
		}
		if(M.browser.getOs().cline == 'ipad' ){
			redirect(url.DOWN_IPAD);
		}else if(M.browser.getOs().cline == 'iphone'){
			redirect(url.DOWN_APP_IOS);
		}else{
			redirect(url.DOWN_APP_URL);
		}
	}
	
	function redirect (afterUrl){
		var intentUrl = "";
		if(isChrome){
			if(isAndroid){
				intentUrl = getChromeIntent();
			}else{
				intentUrl = getIntentUrl();
			}
		}else{
			intentUrl = getIntentUrl();
		}
		$('#'+IframeId).attr('src', intentUrl);
		setTimeout(function(){
			location.href = afterUrl;
		},100);
	}
	if(isWeiXin){
		if (window.WeixinJSBridge && WeixinJSBridge.invoke) {
			downWeixincheck();
		}else {
			document.addEventListener("WeixinJSBridgeReady", downWeixincheck, !1);
		}
	}
	
	$.fn.downloadAppPlugIn = function(){
		$(this).on('click', function(e){
			if(!IframeHasRender){
				$('body').append('<iframe id="'+IframeId+'" style="display:none;width:0px;height:0px;"></iframe>');
				IframeHasRender = true;
			}
			install();
		});
	}
})();