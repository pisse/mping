var ping = ping || {};
ping = (function(){
	var gtKey = "5YT%aC89$22OI@pQ";
	var gproId = 3;        //京东上海H5项目ID
	var firstEnterClick = false; //是否第一次进入click方法
	var gUserPin = "";    //用户id
	var page_param = "";   //init时传递page_param，有些活动地址没有参数，需要通过参数来指定page_param，如jshop
	var reportHeader = {
		report_ts:"",     //时间戳
		method:"bp.report",
		token:"",         //用于校验 md5(report_ts + key)
		proj_id:"",       //项目ID
		uid:"",           //京东pin 未登录为空
		guid:"",          //用户唯一标识
		client:"",        //IOS:原生iphone  ANDROID:原生安卓 IPAD:原生IPAD WP:原生Windows Phone  
		                  //IOS-M: iphone M页  ANDROID-M：安卓M页 IPAD-M：IPAD M页 WEIXIN-M：微信M页 WP-M：WP M页  M-M: M版M页
		appv:"",          //app 版本号
		resolu: "",       //设备屏分辨率
		device:"",        //设备名称
		osv:"",           //操作系统版本号
		sdkv:"",          //SDK版本号
		channel:""        //渠道信息
	};
	var reportPv = {
		type:"1",         //上报类型：1.PV 2.性能 3.点击
		uid:"",           //京东pin 未登录为空
		uid_cat:"",       //1.微博登录 2.QQ登录
		open_count:"",    //客户端累计打开次数
		page_ts:"",       //页面加载开始时间戳（精确到微秒）
		lon:"",           //经度
		lat:"",           //纬度
		net_type:"",      //网络类型，枚举：wifi,2g,3g和空
		page_name:"",     //当前页面类名或（M页）去参URL
		page_param:""     //当前页面参数
	};
	var reportClick = {
		type:"3",         //上报类型：1.PV 2.性能 3.点击
		uid:"",           //京东pin 未登录为空
		click_ts:"",      //点击事件发生时间戳
		lon:"",           //经度
		lat:"",           //纬度
		net_type:"",      //网络类型，枚举：wifi,2g,3g和空
		page_name:"",     //当前页面类名或（M页）去参URL
		page_param:"",    //当前页面参数
		event_id:"",      //自定义事件ID
		event_func:"",    //点击事件函数名称
		event_param:"",   //事件参数
		next_page_name:"",//要去的页面类名
		next_page_param:""//要去的页面参数
	};
	var getGuid = function(){
		var guid = "";
		for (var i = 1; i <= 32; i++) {
			var n = Math.floor(Math.random() * 16.0).toString(16);
			guid += n;
			if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
				guid += "-";
		}
		return guid;
	}
	var reportHeaderData = function(){
		reportHeader.proj_id = gproId + "";
		var gUA = navigator.userAgent;
		if(gUA.indexOf('jdapp') > -1){
			var gUAInfo = gUA.split(";");
			if(gUAInfo[1] == "iPhone"){
				reportHeader.client = "IOS-M";
			}else if(gUAInfo[1] == "android"){
				reportHeader.client = "ANDROID-M";
			}
			reportHeader.appv = gUAInfo[2];
			reportHeader.osv = gUAInfo[3];
			reportHeader.guid = gUAInfo[4];		
		}else{
			if(gUA.indexOf('MicroMessenger') > -1){
				reportHeader.client = "WEIXIN-M";
			}else{
				reportHeader.client = "M-M";
			}
			reportHeader.guid = getGuid();
		}
		reportHeader.report_ts = ((new Date()).valueOf())/1000 + "";
		reportHeader.resolu = window.innerWidth + "*" + window.innerHeight;
		reportHeader.token = hex_md5(reportHeader.report_ts + gtKey);
	}
	var splitUrl = function(url){
		var urlInfo = url.split("#");
		var locationInfo = urlInfo[0].split("?");
		return locationInfo;
	}
	var reportPvData = function(){
		reportPv.page_ts = ((new Date()).valueOf())/1000 + "";	
		var urlInfo = splitUrl(location.href);
		reportPv.page_name = urlInfo[0];
		if (page_param != "") {
			reportPv.page_param = page_param;
		}else{
			reportPv.page_param = urlInfo[1];
		}
		sendReport("pv");
	}
	var reportClickData = function(){
		var urlInfo = splitUrl(location.href);
		reportClick.page_name = urlInfo[0];
		if (page_param != "") {
			reportClick.page_param = page_param;
		}else{
			reportClick.page_param = urlInfo[1];
		}

	}
	var pv = function(){
		reportPvData();
	}
	var bindClickEvent = function(){
		var _click = "touchstart" in window ? "touchstart" : "click";
		document.querySelector('body').addEventListener(_click, function(e) {
			//冒泡查找元素
			var el, root = document.querySelector('body');
			if (e.target.className && e.target.className.indexOf('J_ping') > -1) {
				el = e.target;
			} else {
				var p = e.target;
				while (p != root && p.className && p.className.indexOf('J_ping') < 0) {
					p = p.parentNode;
				}
				if (p.className && p.className.indexOf('J_ping') > -1) {
					el = p;
				}
			}
			if (el != null) {
				if (el.getAttribute('report-eventparam')) {
					reportClick.event_param = el.getAttribute('report-eventparam');
				}
				if (el.getAttribute('report-eventid')) {
					reportClick.event_id = el.getAttribute('report-eventid');
				}
				if (el.getAttribute('report-eventfunc')) {
					reportClick.event_func = el.getAttribute('report-eventfunc');
				}
				reportClick.click_ts = ((new Date()).valueOf())/1000 + "";
				sendReport("click");
			}
		},false);
	}
	var urlParse = function(name){
		var regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
		var urlInfo = regex.exec(location.href);
		var param = urlInfo[9];
		if(param && param != ""){
			var paramInfo = param.split("&");
			for(var i = 0; i < paramInfo.length; i++){
				var obj = paramInfo[i];
				var objInfo = obj.split("=");
				if(objInfo[0] == name){
					return decodeURIComponent(objInfo[1]);
				}
			}
		}
		return false;
	}
	var fillUserInfo = function(data){
		console.log(data);
		var upin = data.userPin || "";
		gUserPin = upin;
		pv();
	}
	var getUserInfo = function(sid){
		var url = "http://h5.m.jd.com/h5api.jsp?";
		var param = [];
		param.push('sid=' + sid);
		param.push('callback=ping.fillUserInfo');
		url = url + param.join('&');
        var script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script); 
	}
	var init = function(obj){
		var upin = "";
		var isGetUserInfo = false;
		if(obj && obj.userPin){
			upin = obj.userPin;
		}else if (urlParse('userPin')) {
			upin = urlParse('userPin');   
		}else{
			var r = new RegExp("(^|;|\\s+)" + "userPin" + "=([^;]*)(;|$)");
			var m = document.cookie.match(r);
			upin =  (!m ? "" : unescape(m[2]));
		}
		if(upin == ""){
			var sessionId = "";
			if(obj && obj.sid){
				sessionId = obj.sid;
			}else{
				sessionId = urlParse('sid');
			}
			if(sessionId && sessionId != ""){
				isGetUserInfo = true;
				getUserInfo(sessionId);
			}
		}else{
			gUserPin = upin;
		}		
		reportHeaderData();
		if( obj && obj.pageParam ){
			page_param = obj.pageParam;
		}
		if( ( !obj || !obj.pv) || (obj.pv && obj.pv == true)){
			if(!isGetUserInfo){
				pv();
			}
		}
		if( (!obj || !obj.click) || (obj.click && obj.click == true)){
			click();
		}
	}
	var click = function(obj){
		if(firstEnterClick == false){
			firstEnterClick = true;
			reportClickData();
			bindClickEvent();
		}
		if(obj && ((obj.report_eventid &&obj.report_eventid != "") ||
			(obj.report_eventparam && obj.report_eventparam != "") ||
			obj.report_eventfunc && obj.report_eventfunc != "") ){
			reportClick.event_param = obj.report_eventparam;
			reportClick.event_id = obj.report_eventid;
			reportClick.event_func = obj.report_eventfunc;
			reportClick.click_ts = ((new Date()).valueOf())/1000 + "";
			sendReport("click");
		}	
	}
	var send = function(type){
		var data = reportHeader;
		data.data = [];
		if(type == "pv"){
			data.data.push(reportPv);
		}else if(type == "click"){
			data.data.push(reportClick);
		}
		var dataInfo = encodeURIComponent(JSON.stringify(data));
		var interfaceUrl = "http://stat.m.jd.com/stat/access.jpg?";
		var param = [];
		param.push('data=' + dataInfo);
		var url = interfaceUrl + param.join('&');
		var image = new Image(1,1);
		image.src = url;
	}
	var fillUserPin = function(){
		reportHeader.uid = gUserPin;
		reportPv.uid = gUserPin;
		reportClick.uid = gUserPin;
	}
	var sendReport = function(type){
		fillUserPin();
		send(type);
	}
	return {
		init: init,
		pv : pv,
		click : click,
		fillUserInfo : fillUserInfo
	}
}());