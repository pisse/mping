(function(window){

    //静态值初始化
    var Options = {
        ProjectId: "3", //项目ID
        Biz: "mba",   //业务类型
        Key: "5YT%aC89$22OI@pQ",
        Method:{
            bpReport: 'bp.report',
            bpSearch: 'bp.search'
        },
        Client: {
            IOS_M: {
                UAname: 'iPhone', value: 'IOS-M'
            },
            ANDROID_M: {
                UAname: 'android', value: 'ANDROID-M'
            },
            IPAD_M: {
                UAname: 'iPad', value: 'iPad-M'
            },
            MICRO_M: {
                UAname: 'MicroMessenger', value: 'WEIXIN-M'
            },
            MM: {
                UAname: 'MM', value: 'M-M'
            }

        },
        Type: {
            PV: "1",
            PERFORMANCE: "2",
            CLICK: "3",
            ORDER: "4"
        },
        Storage: {
            current: "mba_cur_series",
            cached: "mba_cached_series"
        },
        MCookie: {
            sessionCookieTimeout: 30*60*1000, //半小时
            visitorCookieTimeout: 1*180*24*60*60*1000 //半年
        }
    };

    //上报数据
    var reportData = {
        common: {
            report_ts:"",     //时间戳
            method:"",
            token:"",         //用于校验 md5(report_ts + key)
            proj_id:"",       //项目ID
            biz:"",            //业务类型
            uid:"",           //京东pin 未登录为空
            pinid:"",        //加密pin
            guid:"",          //用户唯一标识
            client:"",        //IOS:原生iphone  ANDROID:原生安卓 IPAD:原生IPAD WP:原生Windows Phone
                                    //IOS-M: iphone M页  ANDROID-M：安卓M页 IPAD-M：IPAD M页 WEIXIN-M：微信M页 WP-M：WP M页  M-M: M版M页
            appv:"",          //app 版本号
            resolu: "",       //设备屏分辨率
            device:"",        //设备名称
            osv:"",           //操作系统版本号
            build:"",        //
            net_type:"",     //2g,3g
            sdkv:"",          //SDK版本号
            channel:""        //渠道信息
        }
    };

    /**
     * MPing核心库，用于开辟一个程序入口
     */
    function MPing( param ){
        this._init();

        if ( typeof( param ) === "function" ) {
            this.ready = param;
        }

        var self = this;
        document.addEventListener("DOMContentLoaded", function(e) {
            self.ready();
        }, false);
    }
    MPing.prototype = {
        //初始化
        _init: function(){
            this.initCommonData();
            this.initUid();
        },
        initCommonData: function(){
            var tools = MPing.tools.Tools,
                md5 =  MPing.tools.md5,
                optionsClient = Options.Client,
                common = reportData['common'],
                userAgent = navigator.userAgent;

            //内嵌
            if(userAgent.indexOf('jdapp') > -1){
                var gUAInfo = userAgent.split(";");

                if( gUAInfo[1] == optionsClient['IOS_M']['UAname'] ){
                    common['client'] = optionsClient['IOS_M']['value'] ;
                }else if(gUAInfo[1] == optionsClient['ANDROID_M']['UAname']){
                    common['client'] = optionsClient['ANDROID_M']['value'] ;
                }else if(gUAInfo[1] == optionsClient['IPAD_M']['UAname']){
                    common['client'] = optionsClient['IPAD_M']['value'] ;
                }
                common['device'] = common['client'];
                common['appv'] = gUAInfo[2];
                common['osv'] = gUAInfo[3];
                common['guid'] = gUAInfo[4];
             //   common['build'] = gUAInfo[5];
             //   common['net_type'] = gUAInfo[6];
            } else {
                if( userAgent.indexOf( optionsClient['MICRO_M']['UAname'] ) > -1 ){
                    common['client'] =  optionsClient['MICRO_M']['value'] ;
                }else{
                    common['client'] =  optionsClient['MM']['value']
                }
                common['device'] = this._getOs();
            }

            common['proj_id'] = Options['ProjectId'];
            common['biz'] = Options['Biz'];
            common['method'] = Options['Method']['bpReport'];
            common['report_ts'] = tools.getCurTime();
            common['resolu'] = window.innerWidth + "*" + window.innerHeight;
            common['token'] = md5.hex_md5( common['report_ts'] + Options['Key']);
            common['reserved1'] = this._getShortRefer( document.referrer );
           // common['reserved2'] = userAgent;
            common['reserved3'] = this._reservedCookies();
        },
        _reservedCookies: function(){
            var tools = MPing.tools.Tools,
                r_cookies = ['__jda', '__jdv', '__jdb', '__jdu', '__jdb', 'mu_subsite', 'mt_xid', 'unpl'],
                ret = [];

            for(var i= 0, len = r_cookies.length;  i<len; i++){
                ret.push( tools.getCookie( r_cookies[i] ) );
            }

            return ret.join("_").replace(/\|/g, "_");
        },
        _getShortRefer: function(url){
            if(!url) return "";

            if(url.indexOf("360buy.com")>-1 || url.indexOf("jd.com")>-1 || url.length<128) return url;

            var tools = MPing.tools.Tools;
            var keywords = ["word","wd", "text","p","keyword","q"], q=[];
            if(url.indexOf("?") >-1){
                for(var i=0; i<keywords.length; i++){
                    var v = tools.getParameter(url, keywords[i]);
                    v && q.push( keywords[i]+"="+v );
                }
                return url.substr(0, url.indexOf("?")+1) + q.join("&");
            }else {
                return url;
            }
        },
        _getOs: function(){
            var ua = navigator.userAgent.toLowerCase(), m = /android|iphone|ipad|ipod|windows phone|symbianos|nokia|bb/,
                p = /linux|windows|mac|sunos|solaris/, o = m.exec(ua) || p.exec(ua);
            return o == null ? "other" : o[0];
        },
        _getBrowserInfo: function(){
            var ua = navigator.userAgent;
            var re = /(UCBrowser|CriOS|MQQBrowser|baidubrowser|GaoSuBrowerIPhone|MicroMessenger|Safari)\/(.*?)(?:\s{1}|$)/i;
            var match = re.exec(ua), ret = {};
            if( match ){
                ret['browser'] = match[1];  //浏览器
                ret['borwser_version'] = match[2]; //浏览器版本号
                ret['mobile_model'] = this._getOs(); //手机型
            }
            return ret;
        },
        initUid:function(){
            var tools = MPing.tools.Tools,
                timestamp=(new Date()).getTime();

            if(tools.isEmbedded() || tools.isMobile() ){
                var mcookie = new MCookie(),
                    sidseq = mcookie.getSidSeq();
                this.options.mba_muid = mcookie.getMuid();

                this.options.mba_sid = sidseq[0];
                this.privates.mba_seq = sidseq[1];

                if(tools.isEmbedded()){
                    this.privates.pv_sid =  sidseq[0];
                    this.privates.pv_seq = sidseq[1];
                }
            }

            var pinid = tools.getCookie("pinId");
                //uid = tools.getCookie("pin");

            this.options.pinid = pinid ? pinid : "";
            this.options.uid = pinid ? pinid : "";

            this.options.pin_sid = tools.getParameter(window.location.href, "sid") || tools.getCookie("sid");
        },

        //图片上报数据
        send: function( request ,callback){

            if(this.isSpider()) return; //爬虫不上报

            this.sendByRequest(request, callback);

            /*var sendData = encodeURIComponent( JSON.stringify( this.getReportData( request ) ));
            var interfaceUrl = "http://stat.m.jd.com/stat/access.jpg?";
            var param = [];
            param.push('data=' + sendData);
            var url = interfaceUrl + param.join('&');
            var image = new Image(1,1);
            image.onload = function(){
                image.onload = null;
                image = null;
                callback && callback();
            };
            image.src = url;*/
        },
        //ajax上报
        sendByRequest: function(request, callback){
            var xhr =  new window.XMLHttpRequest();
            xhr.open("POST",  document.location.protocol + "//stat.m.jd.com/stat/access", true);
            xhr.setRequestHeader("Content-Type", "text/plain");
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    callback && callback();
                    xhr = null;
                }
            };

            var sendData = JSON.stringify( this.getReportData( request ) );
            //sendData = sendData.replace(/\&/g, ",");//替换掉所有的&字符
            xhr.send(sendData);
        },
        getReportData: function( request ){
            var tools = MPing.tools.Tools,
                 rData = {data:[] },
                 browserInfo = this._getBrowserInfo();

            tools.extend(rData, reportData['common']);

            tools.extend(rData, this.options);

            tools.extend(rData, browserInfo);

            if( request instanceof MPing.Request ){
                var pData = request.getReportObj();
                pData['pinid'] = this.options['pinid'];
                pData['uid'] = this.options['uid'];

                pData['mba_seq'] = this.privates['mba_seq'];

                if(tools.isEmbedded()){
                    pData['pv_sid'] = this.privates['pv_sid'];
                    pData['pv_seq'] = this.privates['pv_seq'];
                }
                rData.data.push( pData );
            }
            return rData;
        },
        isSpider: function(){
            var ua =  navigator.userAgent;
            var re_spider = /Googlebot|Feedfetcher-Google|Mediapartners-Google|Adsbot-Google|Sogou\s{1}web\s{1}spider|Sogou\s{1}inst\s{1}spider|Sogou\s{1}inst\s{1}spider\/4\.0|HaoSouSpider|360Spider|Baiduspider|bingbot|qihoobot|YoudaoBot|Sosospider|Sogou\s{1}web\s{1}spider|iaskspider|msnbot|Yahoo!\s{1}Slurp|Yahoo!\s{1}Slurp\s{1}China|yisouspider|msnbot/;
            var ret = re_spider.test(ua);
            return ret;
        }
    }

    MPing.prototype.options = {
        uid: "",
        pinid: "",
        mba_muid: "",
        mba_sid: "",

        pin_sid: ""//内嵌页上报sid
    };
    MPing.prototype.privates = {
        mba_seq: "",
        pv_sid: "", //内嵌页与app共同维护
        pv_seq: "" //内嵌页与app共同维护
    };

    MPing.prototype.ready = function ( ) {}

    function Request( name ) {
        //初始化
        this.name = name;
    }
    MPing.Request = Request;

    Request.prototype.getReportObj = function() {
        var report_obj = {};
        for (var key in this) {
            if ( typeof this[ key ] !== "function" && key !== "name" ) {
                report_obj[key] = this[ key ] ? (this[ key ]+"") : "";
            }
        }
        return report_obj;
    }
    Request.prototype.getTime = function(){
        var time = ((new Date()).valueOf())/1000 + "";
        return time;
    }
    Request.prototype.setTs = function( tsName ) {
        this[tsName] = this.getTime();
    }
    Request.prototype.setPageParam = function() {
        var urlInfo = this.getUrlInfo();

        this.page_name = urlInfo[0];
        this.page_param = urlInfo[1];
    }
    Request.prototype.getUrlInfo = function(url){
        url || (url = window.location.href );
        var urlInfo = url.split("#")[0].split("?");
        return urlInfo;
    }

    /**
     * @memberOf MPing.inputs
     * @name PV
     * @class
     * @constructor
     * @example
     * @extends MPing.inputs.Request
     * @property {String}  type:"1",         //上报类型：1.PV 2.性能 3.点击
     * @property {String}  uid:"",           //京东pin 未登录为空
     * @property {String}  pinid:"",           //京东加密pin 未登录为空
     * @property {String}  mba_muid:"",     //新用户首次访问M页和Jshop时生成以上ID，只有在用户清除cookie时才会重新生成新ID。
     * @property {String}  mba_sid:"",      //新访次内生成访次ID，sid随机生成，访次超过30分钟会重新生成ID。
     * @property {String}  uid_cat:"",       //1.微博登录 2.QQ登录
     * @property {String}  open_count:"",    //客户端累计打开次数
     * @property {String}  page_ts:"",       //页面加载开始时间戳（精确到微秒）
     * @property {String}  lon:"",           //经度
     * @property {String}  lat:"",           //纬度
     * @property {String}  net_type:"",      //网络类型，枚举：wifi,2g,3g和空
     * @property {String}  page_name:"",     //当前页面类名或（M页）去参URL
     * @property {String}  page_param:"",     //当前页面参数
     * @property {String}  utm_source:"",     //来源
     * @property {String}  utm_medium:"",     //媒介
     * @property {String}  utm_term:"",       //关键字
     * @property {String}  utm_campaign:""   //广告系列
     */
    function PV() {
        Request.call(this, "PV", null);

        this.type = Options.Type.PV;

        this.setTs("page_ts");
        this.setPageParam();
        this.setSourceParam();
        this.setPvParams();
    }
    PV.prototype = new Request();
    PV.prototype.setSourceParam = function(){
        var url = window.location.search,
            tools = MPing.tools.Tools,
            sourceParams = ['utm_source', "utm_medium", "utm_term", "utm_campaign"],
            sourceReg = new RegExp('.*(' + sourceParams.join("|") + ')=.*' );

        if( sourceReg.test(url) ){
            var searchObj = tools.getSearchObj(url);
            for(var i= 0, l=sourceParams.length; i < l; i++){
                var key = sourceParams[i];
                this[key] = searchObj[key];
            }
        }
    }
    PV.prototype.setPvParams = function(){
        var tools = MPing.tools.Tools;

        this.jdv = tools.getCookie("__jdv");
    }

    /**
     * @memberOf MPing.inputs
     * @name Click
     * @class
     * @constructor
     * @example
     * @extends MPing.inputs.Request
     * @param {String} eventId               事件Id
     * @param {String} update                更新事件串
     * @property {String} type:"3",         上报类型：1.PV 2.性能 3.点击
     * @property {String} uid:"",           京东pin 未登录为空
     * @property {String}  pinid:"",        京东加密pin 未登录为空
     * @property {String} mba_muid:"",      新用户首次访问M页和Jshop时生成以上ID，只有在用户清除cookie时才会重新生成新ID。
     * @property {String} mba_sid:"",       新访次内生成访次ID，sid随机生成，访次超过30分钟会重新生成ID。
     * @property {String} click_ts:"",      点击事件发生时间戳
     * @property {String} lon:"",           经度
     * @property {String} lat:"",           纬度
     * @property {String} net_type:"",      网络类型，枚举：wifi,2g,3g和空
     * @property {String} page_name:"",     当前页面类名或（M页）去参URL
     * @property {String} page_param:"",    当前页面参数
     * @property {String} event_id:"",      自定义事件ID
     * @property {String} event_func:"",    点击事件函数名称
     * @property {String} event_param:"",   事件参数
     * @property {String} next_page_name:"",要去的页面类名
     * @property {String} next_page_param:""要去的页面参数
     */
    function Click(eventId) {
        Request.call(this, "Click", null);

        this.type = Options.Type.CLICK;
        this.event_id = eventId;

        this.setTs("click_ts");
        this.setPageParam();
        //this.updateEventSeries();
    }
    Click.prototype = new Request();
    Click.prototype.updateEventSeries = function(){
        MPing.EventSeries && MPing.EventSeries.updateSeries(this);
    }
    Click.attachEvent = function( cClass ){
        if(Click.attachedEvent) return;

        cClass||(cClass = "J_ping");
        var _click = "touchstart" in window ? "touchstart" : "click",
             root = document.querySelector('body'),
            tools =  MPing.tools.Tools;

        root.addEventListener(_click, function(e) {
            //冒泡查找元素
            var target;
            for(var el = e.target; el != root; ){
                if( el.className && el.className.indexOf( cClass ) > -1 ){
                    target = el; break;
                } else {
                    el = el.parentNode ? el.parentNode : root;
                }
            }
            if( target ){
                var href = tools.attr(target, 'href');
                var redirect = (function(){
                    return function(){
                        if( href && /http:\/\/.*?/.exec(href) && tools.attr(target, 'target') !== '_blank' ) window.location.href = href;
                    }
                })();

                var eventId = target.getAttribute('report-eventid') ? target.getAttribute('report-eventid'): "",
                    page_name = target.getAttribute('report-pagename') ? target.getAttribute('report-pagename'): "",
                    page_param = target.getAttribute('report-pageparam') ? target.getAttribute('report-pageparam'): "";

                var click = new MPing.inputs.Click( eventId );
                var mping = new MPing();
                click.event_param = target.getAttribute('report-eventparam') ? target.getAttribute('report-eventparam'): "";
                //click.event_func = target.getAttribute('report-eventfunc') ? target.getAttribute('report-eventfunc'): "";
                if(page_name) click.page_name = page_name;
                if(page_param) click.page_param = page_param;

                click.updateEventSeries();
                //mping.send(click);
                mping.sendByRequest(click);

                if (href && /http:\/\/.*?/.exec(href) && tools.attr(target, 'target') !== '_blank' ) {
                     e.preventDefault ? e.preventDefault() : e.returnValue = false;
                     setTimeout(function () {
                        window.location.href = href;
                     }, 100);
                 }

            }
        }, false);

        Click.attachedEvent = true;
    }

    /**添加购物车，生成sku对应事件串
     * @memberOf MPing.inputs
     * @name Click
     * @class
     * @constructor
     * @example
     * @extends MPing.inputs.Click
     * @param {String} eventId
     * @param {String} skuId
     */
    function AddCart(eventId, skuId) {
        Click.call(this, eventId, null);

        //this.skuId = skuId;
        //this.addSeries(skuId);
        this.reportAsOrder(skuId);
    }
    AddCart.prototype = new Click();
    AddCart.prototype.addSeries = function(id){
        MPing.EventSeries.addSeries(id);
    }
    AddCart.prototype.reportAsOrder = function(skuId){
        if(skuId){
            var order = new Order(skuId);
            var mping = new MPing();
            mping.send(order);
        }
    }

    //删除购物车，删除sku对应事件串
    function RmCart(eventId, skuId) {
        Click.call(this, eventId, null);

        //this.skuId = skuId;
        //this.deleteSeries(skuId);
    }
    RmCart.prototype = new Click();
    RmCart.prototype.deleteSeries = function(id){
        var tools = MPing.tools.Tools;
        if(tools.isArray(id)){
            for(var i= 0, len = id.length; i<len; i++){
                MPing.EventSeries.deleteSeries(id[i]);
            }
        } else {
            MPing.EventSeries.deleteSeries(id);
        }
    }

    //添加订单，提交并删除sku对应事件串
    function Order(skuId) {
        Request.call(this, "Order", null);

        this.type = Options.Type.ORDER;

        this.prod_id = skuId;

        this.setTs("order_ts");
        //this.setParams();
        //this.deleteSeries(skuId);
    }
    Order.prototype = new Request();
    Order.prototype.deleteSeries = function(id){
        MPing.EventSeries.deleteSeries(id);
    }
    Order.prototype.setPageParam = function(){}
    Order.prototype.setParams = function() {
        var report_obj = {},
            tools = MPing.tools.Tools;
    }

    /**
     * @namespace 该命名空间下包含用于基础的输入相关类型
     * @memberOf MPing
     */
    MPing.inputs = {};
    MPing.inputs.PV 	= PV;
    MPing.inputs.Click 	= Click;
    MPing.inputs.AddCart 	= AddCart;
    MPing.inputs.RmCart 	= RmCart;
    MPing.inputs.Order 	= Order;

    //localstorage存储事件串
    var EventSeriesLocal = {
        eventSeries: {},
        getSeries: function(callback){
            var tools = MPing.tools.Tools,
                mcookie = new MCookie(),
                sidseq = mcookie.getSidSeq();
            var ret = {
                m_source:  tools.isEmbedded() ? '1' : "0",
                event_series: this.eventSeries,
                jda:  tools.getCookie("__jda")
            };
            if(tools.isEmbedded()){
                ret["pv_sid"] = sidseq[0]+"";
                ret["pv_seq"] = sidseq[1]+"";
                ret['pv_timestamp'] = new Date().getTime()+"";
            } else {
                ret['mba_muid'] = mcookie.getMuid();
                ret['mba_sid'] = sidseq[0]+"";
            }
            return JSON.stringify(ret);
        },
        androidSeries: function(){
            var json_str = this.getSeries();

            try{
                window.AndriodPing.setSeries( json_str );
            }catch(e){
                //console.log(e);
            }
        },
        writeSeries: function(series){
            if(!series) return;
        },

        updateSeries: function(req){
            if( !MPing.tools.Tools.isEmbedded()) return;

            var eventId = req['event_id'],
                eventLevel = eventId && MPing.events && MPing.events.map[eventId];

            if(!eventLevel) return;//找不到事件对应的等级，退出

            this.eventSeries['event_id'] = eventId;
            this.eventSeries['event_level'] = eventLevel;
            this.eventSeries['event_param'] = req['event_param'];
            this.eventSeries['page_name'] = req['page_name'];
            this.eventSeries['page_param'] = req['page_param'];
        },
        addSeries: function(id){
            var comSeries = this.getCookiePart("mba_cur_com"),
                curSeries = this.getCookiePart("mba_cur_e"),
                comObj = {}, n, start, len;

            curSeries || (curSeries={});

            if(comSeries){
                for(n = comSeries.split("!"), start = 0,len= n.length; start<len; start++){
                    var f = n[start].split("=");
                    comObj[f[0]] = f[1];
                }
            }
            comObj[id] = curSeries;
            this.setCookiePart("mba_cur_com", this.param(comObj, "=", "!"));
        },
        deleteSeries: function(id){
            var comSeries = this.getCookiePart("mba_cur_com"),
                comObj = {}, n, start, len;

            if(!comSeries) return; //当前保存事件串，退出

            for(n = comSeries.split("!"), start = 0,len= n.length; start<len; start++){
                var f = n[start].split("=");
                if (f[0] != a) {
                    comObj[f[0]] = f[1];
                }
            }
            this.setCookiePart("mba_cur_com", this.param(comObj, "=", "!"));
        },

        subCookieParts: {},

        getCookiePart: function(){
            try {
                var name = "mba_event_series=", start = document.cookie.indexOf(name), len = null, ret = "";
                if (!(start > -1))
                    return null;
                if (len = document.cookie.indexOf(";", start), -1 == len && (len = document.cookie.length), len = document.cookie.substring(start + name.length, len), 0 < len.length) {
                    for (name = len.split("&"), start = 0, len = name.length; len > start; start++) {
                        var f = name[start].split("=");
                        if (decodeURIComponent(f[0]) == a) {
                            ret = decodeURIComponent(f[1]);
                            break
                        }
                    }
                    return ret
                }
            } catch (g) {
                return null
            }
        },
        setCookiePart: function(name, value){
            if (value)
                try {
                    this.subCookieParts = this.getAllSubCookies(), name = name.toString(), value = value.toString(),
                        this.subCookieParts[encodeURIComponent(name)] = encodeURIComponent(value), this.setSubCookieValue();
                } catch (c) {
                }
        },
        getAllSubCookies: function(){
            var name = "mba_event_series=", start = document.cookie.indexOf(name), c = null, d = {};
            if (start > -1) {
                if (c = document.cookie.indexOf(";", start), -1 == c && (c = document.cookie.length), c = document.cookie.substring(start + name.length, c), 0 < c.length)
                    for (name = c.split("&"), start = 0, c = name.length; c > start; start++) {
                        var e = name[start].split("=");
                        d[decodeURIComponent(e[0])] = decodeURIComponent(e[1])
                    }
                return d
            }
            return {}
        },
        setSubCookieValue: function(){
            var name = "mba_event_series=", b = [];
            for (var c in this.subCookieParts)
                c && "function" != typeof this.subCookieParts[c] && b.push(c + "=" + this.subCookieParts[c]);
            if(0 < b.length){
                name += b.join("&"), name += "; path=/; domain=" + this.getDomain() + ";";
                document.cookie = name, this.subCookieParts = {};
            }
        },
        getDomain: function(){
            return MPing.tools.Tools.getTopDomain();
        },
        param: function(obj,assign_symbol, and_symbol){
            if (assign_symbol === undefined || assign_symbol === null) {
                assign_symbol = "=";
            }
            if (and_symbol === undefined || and_symbol === null) {
                and_symbol = "&";
            }
            var keyvalue_array = [];
            for (var key in obj) {
                if ( typeof this[ key ] !== "function") {
                    keyvalue_array.push( (new Array(key, assign_symbol, this[key] )).join("") );
                }
            }
            return keyvalue_array.join( and_symbol );
        }
    };
    MPing.EventSeries = EventSeriesLocal;

    function Tools(){}
    Tools.prototype = {
        getCurTime: function(){
            var time = ((new Date()).valueOf())/1000 + "";
            return time;
        },
        getUniq:function(){
            var uniq = (new Date()).getTime() + '-';
            for (var i = 1; i <= 18; i++) {
                var n = Math.floor(Math.random() * 16.0).toString(16);
                uniq += n;
            }
            return uniq;
        },
        extend: function(obj) {
            if (!this.isObject(obj)) return obj;
            var source, prop;
            for (var i = 1, length = arguments.length; i < length; i++) {
                source = arguments[i];
                for (prop in source) {
                    if ( Object.prototype.hasOwnProperty.call(source, prop) && source[prop]) {
                        obj[prop] = source[prop];
                    }
                }
            }
            return obj;
        },
        isObject: function(obj) {
            var type = typeof obj;
            return type === 'object' && !!obj;
        },
        isArray: function(obj){
            return Object.prototype.toString.call(obj) === '[object Array]';
        },
        isString: function(obj){
            return Object.prototype.toString.call(obj) === '[object String]';
        },
        isFunction: function(obj){
            return Object.prototype.toString.call(obj) === '[object Function]';
        },
        isMobile: function(){
            /*var u = navigator.userAgent,
                flag = false;

            if(u.indexOf('jdapp') > -1) {
                flag = true;
            } else {
                var o = /(win|mac|sunos|solaris)/.exec(navigator.platform.toLowerCase());
                flag = o == null ? true : false
            }*/
            return true;
        },
        isEmbedded: function(){
            return navigator.userAgent.indexOf('jdapp') > -1 ;
        },
        attr: function(node, name){
            var result;
            return ( node && node.nodeType !== 1 ? undefined :
                (!(result = node.getAttribute(name)) && name in node) ? node[name] : result
                );
        },
        getCookie: function(name){  //取cookies函数
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            if(arr != null) return decodeURI(arr[2]); return null;
        },
        setCookie: function setCookie(name,value,expires){   //两个参数，一个是cookie的名子，一个是值
            var exp  = new Date();    //new Date("December 31, 9998");
            if(expires === null || expires === undefined){
                expires = 30*60*1000
            }

            exp.setTime(exp.getTime() + expires);
            document.cookie = name + "="+ encodeURI (value) + ";expires=" + exp.toGMTString() + ";path=/;domain=" + this.getRootDomain(this.getDomain()) +";";
        },
        getRootDomain:function (str){
            //去掉结尾的/
            str = str.replace(/\/$/ig,"");
            //去掉http://
            str = str.replace(/^(http|ftp|https|ssh):\/\//ig,"");
            //替换掉域名结尾
            str = str.replace(/(.hk|.com|.info|.net|.org|.me|.mobi|.us|.biz|.xxx|.ca|.mx|.tv|.ws|.com.ag|.net.ag|.org.ag|.ag|.am|.asia|.at|.be|.com.br|.net.br|.com.bz|.net.bz|.bz|.cc|.com.co|.net.co|.com.co|.co|.de|.com.es|.nom.es|.org.es|.es|.eu|.fm|.fr|.gs|.co.in|.firm.in|.gen.in|.ind.in|.net.in|.org.in|.in|.it|.jobs|.jp|.ms|.com.mx|.nl|.nu|.co.nz|.net.nz|.org.nz|.se|.tc|.tk|.com.tw|.idv.tw|.org.tw|.tw|.co.uk|.me.uk|.org.uk|.vg|.com.cn|.gov|.gov.cn|.cn)$/ig,"%divide%$1");

            var tail = str.split("%divide%")[1];
            if(typeof(tail)==="undefined")tail="";
            str = str.split("%divide%")[0];

            var strarr = str.split(".");

            return "."+strarr[strarr.length-1]+tail;
        },
        getDomain:function (){
            var _url = window.location.href;
            //去掉http://
            _url = _url.replace(/^(http|ftp|https|ssh):\/\//ig,"");

            return _url.split("/")[0];
        },
        getTopDomain: function(){
            var a = (location.hostname + "/").match(/[\w-]+\.(com|info|net|org|me|mobi|hk|us|biz|xxx|ca|mx|tv|ws|am|asia|at|be|bz|cc|co|de|nom|es|eu|fm|fr|gs|firm|gen|ind|in|it|jobs|jp|ms|nl|nu|se|tc|tk|idv|tw|vg|gov|cn|ha)(\.(cn|hk|jp|tw|kr|mo|uk|ag|es|co|nz|in|br|bz|mx))*\//gi);
            return a ? 0 < a.length ? a[0].substr(0, a[0].length - 1) : void 0 : document.domain
        },

        contains:  function(str, sub){
            return (str["indexOf"](sub) > -1);
        },

        getSearchObj: function(url){
            url || (url = location.search);
            var q = (url + '').replace(/(&amp;|\?)/g, "&").split('&');
            var r = {};
            for (var i = 0, l= q.length; i < l; i++) {
                var pos = q[i].indexOf('=');
                if ( - 1 == pos) continue;
                r[q[i].substr(0, pos).replace(/[^a-zA-Z0-9_]/g, '')] = decodeURIComponent(q[i].substr(pos + 1));
            }
            return r;
        },
        getParameter: function(url, name) {
            var f = url.match(RegExp("(^|&|\\?|#)(" + name + ")=([^&#]*)(&|$|#)", ""));
            return f ? f[3] : null
        },
        compare: function(a,b){
            var sidseq_a = a.split("."), sidseq_b = b.split("."),
                sid_a = parseFloat(sidseq_a[0]), seq_a = parseFloat(sidseq_a[1]),
                sid_b = parseFloat(sidseq_b[0]), seq_b =parseFloat( sidseq_b[1]);
            var ret;
            if(sid_a>sid_b){
                ret = a;
            } else if(sid_a==sid_b){
                ret = seq_a>=seq_b ? a : b;
            } else{
                ret = b;
            }
            return ret;
        }
    };

    var tools = new Tools();

    var MCookie = function(){
        //单例
        if(!MCookie._instance){
            MCookie._instance = this;
        }else{
            return MCookie._instance;
        }

        var _mbaMuidSeq,
            _mbaSidSeq;

        //读取mba_muid
        this.getMuid = function(){
            this.setMuid();
            return  _mbaMuidSeq[0];
        };
        //读取mba_sid,mba_seq
        this.getSidSeq = function(){
            var ret;
            this.setSid();
            ret = (_mbaSidSeq||[]).slice(0);
            for(var i=0; i<ret.length; i++){
                ret[i] = ret[i] + "";
            }
            return ret;
        };

        this.setMuid = function(){
            if(!tools.getCookie("mba_muid")){
                _mbaMuidSeq[0] = tools.getUniq();
            }else {
                _mbaMuidSeq[0] = tools.getCookie("mba_muid").split(".")[0];
            }
            this.setMuidCookie();
        };
        this.setSid = function( type){
            //内嵌页使用app带过来的pv_sid,pv_seq
            if(tools.isEmbedded()){
                this.setPVSid(type);
                return;
            }

            if(!tools.getCookie("mba_sid")){
                _mbaSidSeq[0] = new Date().getTime() + "" + parseInt(Math.random()*9999999999999999);
                //pv初始化为1，点击初始化为0
                _mbaSidSeq[1] = (type==="pv" ? 1 : 0);
            }else {
                _mbaSidSeq = tools.getCookie("mba_sid").split(".");
                _mbaSidSeq[1] = (_mbaSidSeq[1]==undefined ? 1: _mbaSidSeq[1])*1 + (type==="pv" ? 1 : 0);
            }
            this.setSidCookie();
        };

        this.setPVSid = function(type){
            var ua =  navigator.userAgent,
                app_sid_seq_index = ua.indexOf('pv/'),
                app_sid_seq, //来自app
                cookie_sid_seq,//来自cookie,
                pv_sid;
            if( app_sid_seq_index > -1 ){
                var endIdx = ua.indexOf(";", app_sid_seq_index );
                if(endIdx < 0){
                    endIdx = ua.length;
                }
                app_sid_seq = ua.substring(app_sid_seq_index + 3, endIdx);
            }else{
                app_sid_seq = '1.0';
            }


            if(tools.getCookie("mba_sid")){
                cookie_sid_seq = tools.getCookie("mba_sid");
            } else{
                var m_muid = tools.getCookie("mba_muid") ,m_muid_arr =  m_muid.split(".");//从mba_muid cookie中取得上一次的sid
                if(m_muid_arr.length == 3){
                    var pre_sid = m_muid_arr[1], pre_timestamp = parseInt(m_muid_arr[2]);
                    if(new Date().getTime() - pre_timestamp > Options.MCookie.sessionCookieTimeout ){//超过半小时
                        cookie_sid_seq = [pre_sid*1+1, 0].join(".");
                    }else{
                        cookie_sid_seq = [pre_sid, 0].join(".");
                    }
                } else{
                    cookie_sid_seq = '1.0';
                }
            }
            //pv_sid = parseFloat(app_sid_seq)> parseFloat(cookie_sid_seq) ? app_sid_seq : cookie_sid_seq;
            pv_sid = tools.compare(app_sid_seq, cookie_sid_seq);

            _mbaSidSeq[0] = pv_sid.split(".")[0];
            _mbaSidSeq[1] = (pv_sid.split  (".")[1] ? pv_sid.split(".")[1]: 0)*1  + (type==="pv" ? 1 : 0) ;

            _mbaMuidSeq[1] = _mbaSidSeq[0];
            _mbaMuidSeq[2] = new Date().getTime();

            this.setSidCookie();
            this.setMuidCookie();
        }

        this.setMuidCookie = function(){
            tools.setCookie("mba_muid" ,_mbaMuidSeq.join(".") ,Options.MCookie.visitorCookieTimeout );//半年过期
        };
        this.setSidCookie = function(){
            tools.setCookie("mba_sid" ,_mbaSidSeq.join(".") ,Options.MCookie.sessionCookieTimeout );//半小时过期
        };

        //初始化
        this.initialize = function(){
            _mbaMuidSeq = [];
            _mbaSidSeq = [];

            this.setMuid();
            this.setSid('pv');

            return this;
        };

        this.initialize();
        return MCookie._instance;
    };

    (function(){

        if(!tools.isMobile()) return; //PC端不写cookie

        new MCookie();
    })();


    /**
     * @namespace 该命名空间下包含工具类以及相关方法（API），Tools模块
     * @memberOf Ping
     */
    MPing.tools || (MPing.tools = {});
    MPing.tools.Tools =  tools;

    //document.domain = tools.getTopDomain();
    window.MPing = MPing;


    /*AMD support*/
    /*if (typeof define === 'function' && define.amd) {
        define('MPing', [], function() {
            return MPing;
        });
    }*/

}(window));