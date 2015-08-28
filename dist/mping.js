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
                 rData = {data:[] };
            tools.extend(rData, reportData['common']);

            tools.extend(rData, this.options);

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

}(window));;/**
 * @fileoverview 这个文件是所有事件id与事件等级对应表
 */

;(function(window){

    var Events = {
        'MHome_FocusPic':1,
        'Mhome_Classification':1,
        'Mhome_Cart':1,
        'MRecharge_Recharge':1,
        'MHome_Lottery':1,
        'MHome_MyJD':1,
        'MHome_HandSeckill':1,
        'MHome_ActivitiesInFloors':1,
        'MHome_ThemeHall':1,
        'MHome_Searchthi':2,
        'MHome_Search':1,
        'MHome_SearchDropDownAssociationalWords':1,
        'MHome_SearchDropDownHistoryWords':1,
        'MHome_AirTicket':1,
        'MHome_Icons':1,
        'MHomeGuessYouLike_Login':1,
        'MHomeGuessYouLike_Products':1,
        'MHomeGuessYouLike_Similarities':1,
        'MHomeSimilarities_Products':1,
        'MHome_FloatEntrance':1,
        'MHome_BacktoTop':1,
        'MVirtual_ProductDetail_Expose':1,
        'MProductList_Search':2,
        'MSearch_Search':2,
        'MSearch_SearchButton':2,
        'MSearch_Searchthi':2,
        'MSearch_SearchDropDownAssociationalWords':2,
        'MSearch_HistoryRecords':2,
        'MSearch_HotWords':2,
        'MSearch_Productid':3,
        'MCommonHead_NavigateButton':1,
        'MCommonHead_home':1,
        'MCommonHead_CategorySearch':1,
        'MCommonHead_Cart':1,
        'MCommonHead_MYJD':1,
        'MCommonHTail_Account':1,
        'MCommonHTail_ToTop':1,
        'MCommonHTail_ClientApp':1,
        'MDownLoadFloat_OpenNow':1,
        'MGroupBuy_ChannelIcons':2,
        'MJingDouHome_Activity':2,
        'MJingDouHome_JindouExCoupon':2,
        'MJingDouHome_JingdouBuyLottery':2,
        'MJingDouHome_Jump':2,
        'MJingDouHome_Cut':2,
        'MJingDouHome_ProductPic':2,
        'MJingDouShare_GetMyJingdou':2,
        'MJingDouJigsaw_Jigsaw_Expose':2,
        'MMyJDOrders_Categories':2,
        'MMyJDFollowed_Commodities':2,
        'MMyJDFollowed_Shops':2,
        'MMyJDFollowed_Commodity':2,
        'MMyJDFollowed_Shop':2,
        'MMyJDBrowsedHistory_Commodites':2,
        'MMyJDService_Categories':2,
        'MMyJDAccountManage_Categories':2,
        'MMyJD_Ordersnotpay':2,
        'MMyJD_Ordersnotreceiving':2,
        'MMyJD_MyMessages':2,
        'MMyJD_FuntionMenus':2,
        'MMyJD_GuessYouLike':2,
        'MHandSecKill_Commodity':2,
        'MHandSecKill_Tag':2,
        'MHandSecKill_GotoAPPA':2,
        'Jshop_FocusPic':4,
        'Jshop_ProductID':4,
        'Jshop_CategoryTab':4,
        'Jshop_ProductID_Category':4,
        'Jshop_Navigation':4,
        'Jshop_CountDown':4,
        'Jshop_Lottery':4,
        'Jshop_GroupBuy':4,
        'Jshop_ShopRec':4,
        'Jshop_PromoRec':4,
        'Jshop_PromoTurns':4,
        'Jshop_PreSale':4,
        'Jshop_Html_Content':4,
        'Jshop_ImgWord':4,
        'Jshop_PullDown':4,
        'Jshop_PullDown_ProductID':4,
        'Jshop_AddtoCart':4,
        'MActivity_Productid':4,
        'MActivity_Share':4,
        'MActivity_DownloadApp':4,
        'Mactivity_ReturnHome':4,
        'MActivity_Button001':4,
        'MActivity_Button002':4,
        'MActivity_Button003':4,
        'MActivity_Button004':4,
        'MActivity_Button005':4,
        'MActivity_Button006':4,
        'MActivity_Button007':4,
        'ScantoGift_Upload':4,
        'ScantoGift_UploadSuccess':4,
        'ScantoGift_UploadFail':4,
        '3DStreet_Building':4,
        '3DStreet_BoardURL':4,
        '3DStreet_JDButton':4,
        '3DStreet_CategoryURL':4,
        '3DStreet_Game':4,
        '3DStreet_Share':4,
        'BrandStreet_BrandSaleTab':4,
        'BrandStreet_BrandShowTab':4,
        'BrandStreet_BrandNewTab':4,
        'BrandStreetSale_Activityid':4,
        'BrandStreetSale_BrandPic':4,
        'BrandStreetSale_SortbySale':4,
        'BrandStreetSale_SortbyAmount':4,
        'BrandStreetSale_Productid':4,
        'BrandStreetShow_FocusPic':4,
        'BrandStreetShow_Category':4,
        'BrandStreetShow_Activityid':4,
        'Shopping1111A_Bargain':4,
        'Shopping1111A_BrandToday':4,
        'Shopping1111A_Floor':4,
        'Shopping1111B_ToUrl':4,
        'Accessory_CategoryFilter':4,
        'Accessory_Category':4,
        'Accessory_BrandFilter':4,
        'Accessory_Brand':4,
        'Accessory_Filter':4,
        'Accessory_Productid':4,
        'Accessory_ProductMore':4,
        'AccessoryDetail_SortbyAmount':4,
        'AccessoryDetail_SortbyEvaluate':4,
        'AccessoryDetail_SortbyPrice':4,
        'AccessoryDetail_SortbyNew':4,
        'MProductShow_ProductSku':4,
        'MPresell_GetPermission':4,
        'MPresell_Rule':4,
        'MPresell_Reserve':4,
        'MPresell_AddtoCart':4,
        'MPresell_Productid':4,
        'MPresell_Confirm':4,
        'MPresell_Cancel':4,
        'MCutiPhone_StrollMall':4,
        'MCutiPhone_DetailRule':4,
        'MCutiPhone_HelpCutPrice':4,
        'MCutiPhone_HelpShare':4,
        'MCutiPhone_JoinTogether':4,
        'MCutiPhone_InformTa':4,
        'MCutiPhone_StrollButtom':4,
        'MCutiPhone_SharetoAll':4,
        'MTCL_CustomizeTCL':4,
        'MTCL_MyCustomization':4,
        'MTCL_ChoosePanel':4,
        'MTCL_ChooseRemoter':4,
        'MTCL_ChooseLabel':4,
        'MTCL_PersonalLabel':4,
        'MTCL_ThisIsIt':4,
        'MTCL_OrderDetail':4,
        'MMCD_APlanReduce5':4,
        'MMCD_APlanPayOnline':4,
        'MMCD_BPlanReduce5':4,
        'MMCD_BPlanPayOnline':4,
        'MMCDDownLoad_DownloadNow':4,
        'MMCD_AddToCart':4,
        'MMCD_GoRegister':4,
        'MTSWCJingCoupon_GetVouchers':4,
        'MTSWCFirstLinkVote_Submit':4,
        'MTSWCFirstLinkVoteResult_Next':4,
        'MTSWCFirstLinkPersonalCouppon_GetVouchers':4,
        'MTSWCFirstLinkPersonalCouppon_NextLink':4,
        'MTSWCFirstLinkPersonalCouppon_Invite':4,
        'MTSWCSecondLinkVote_Submit':4,
        'MTSWCStarVoteWin_Next':4,
        'MTSWCScore_GetVouchers':4,
        'MTSWCScore_MoreFunInvestment':4,
        'MobileWare_TreasureBoxEntrance':4,
        'MMobileWareLocate_Search':4,
        'MMobileWareLocate_Searchthi':4,
        'MMobileWareLocate_Locating':4,
        'MMobileWareLocate_HistoryAddr':4,
        'MMobileWareLocate_AssociateAddr':4,
        'MMobileWareCommonHead_GoToCart':4,
        'MMobileWareCommonHead_ChangeAddr':4,
        'MMobileWareProductList_BackToTop':4,
        'MMobileWareProductList_Product':4,
        'MMobileWareProductDetail_ProductMsg':4,
        'MMobileWareProductDetail_ProductIntroduction':4,
        'MMobileWareProductDetail_ProductSpecification':4,
        'MMobileWareProductDetail_ProductPackage':4,
        'MMobileWareProductDetail_AddToCart':4,
        'MMobileWareProductDetail_DeliveryAddr':4,
        'MMobileWareCart_DeleteProduct':4,
        'MMobileWareCart_NumIncrease':4,
        'MMobileWareCart_NumDecrease':4,
        'MMobileWareCart_SelectAll':4,
        'MMobileWareCart_CheckOut':4,
        'MMobileWareCheckout_ChangeAddr':4,
        'MMobileWareCheckout_MapCoordinate':4,
        'MMobileWareCheckout_OrderSubmit':4,
        'MMobileWareCheckout_PaperInvoice':4,
        'MYuepao_FireCrackersForFree':4,
        'MYuepao_Share':4,
        'MYuepao_SetoffAndGetPrize':4,
        'MYuepao_AskforGift':4,
        'MYuepao_GotoNewYearShop':4,
        'MYuepao_NewYearRaffle':4,
        'MYuepao_Regulation':4,
        'MYuepao_OnceAgain':4,
        'MYuepao_IGive':4,
        'MYuepao_IWantPlay':4,
        'MYuepao_UpdateNow':4,
        'MYuepao_HelpFriend':4,
        'MYuepao_TellOthers':4,
        'Shopcart_Productid':5,
        'Shopcart_Stroll':5,
        'Shopcart_Label':5,
        'Shopcart_Getresent':5,
        'Shopcart_Warranty':5,
        'Shopcart_Pay':5,
        'Shopcart_AddtoCart':5,
        'Shopcart_Present':5,
        'MProductdetail_Photo':5,
        'MProductdetail_Productinfo':5,
        'MProductdetail_Saleinfo':5,
        'MProductdetail_Shopid':5,
        'MProductdetail_GuessYouLike':5,
        'MProductdetail_Addtocart':5,
        'MProductdetail_Easybuy':5,
        'MProductdetail_GotoCart':5,
        'MProductdetail_AddtoFollowed':5,
        'MNeworder_Submit':5,
        'MNeworder_Function':5,
        'MNeworder_Address':5,
        'MNeworder_PayType':5,
        'MNeworder_ProdictList':5,
        'MPayFinish_OrderList':5,
        'MPayFinish_SecKill':5,
        'MPayFinish_GetJDBean':5,
        'MPayFinish_AllOrders':5,
        'MPayFinish_HandSecKill':5,
        'MHome_OrderSubmit':5,
        'MPayFinish_HomeMain':5,
        'MLOCOffLineProductDetail_BuyNow':2,
        'MLOCShopList_Call':3,
        'MLOCCheckOut_Submit':4,
        'LOCOffLineProductDetail_BuyNow':2,
        'LOCOnLineProductDetail_BuyNow':2,
        'MLOCOnLineProductDetail_BuyNow':2,
        'MLOCShopList_CallMap':3,
        'MFlashbuy_NewArrival':2,
        'MFlashbuy_LastSale':2,
        'MFlashbuy_ActivityForecast':2,
        'Mflashbuy_FocusPic':2,
        'MFlashbuy_NewArrivalFloor':2,
        'MFlashbuy_LastSaleFloor':2,
        'MFlashbuy_ActivityForecastFloor':2,
        'MFlashbuy_ProductPic':3,
        'MPresell_FocusPic':2,
        'MPresell_More':2,
        'MPresell_NewArrivalFloor':2,
        'MPresell_GetFreshFloor':2,
        'MPresell_SmartLifeFloor':2,
        'MPresell_BranchVenues':2,
        'MPresell_ProductList':3,
        'MTopic_FocusPic':3,
        'MTopic_SecKill':3,
        'MTopic_Floors':3,
        'MTopic_Products':3,
        'MTopic_Menus':3,
        'MTopic_Classify':3,
        'MTopic_recommend':3,
        'MTopic_brand':3,
        'Jshop_AD_button':4,
        'Jshop_AD_TopCarousel ':4,
        'Jshop_AD_Tab':4,
        'Jshop_AD_Picture':4,
        'Jshop_AD_Rolled':4,
        'Jshop_AD_Close':4,
        'Jshop_Hot_Tab':4,
        'Jshop_Hot_ProductID':4,
        'Jshop_Commended_ProductID ':4,
        'Jshop_Commended_GotoShop':4,
        'Jshop_Commended_Pic':4,
        'Jshop_Commended_Url':4,
        'MShopCheckIn_Pic':2,
        'MShopCheckIn_CheckInGetGift':2,
        'MShopCheckIn_RecommendShopid':2,
        'MShopCheckIn_MoreShops':2,
        'ShopHome_CheckInGetGift':3,
        'ShopCheckIn_Productid':4,
        'MJingDouHome_CouponCenter':1,
        'MWidget_Sign':1,
        'Widget_Operate':1,
        'Widget_Commodity':1,
        'Widget_More':1,
        'MJingDouHome_Checkin':2,
        'MSeckill_OrderSubmit':5,
        'MMyJD_MyPurse':2,
        'MMyJD_MyFollows':2,
        'MMyJD_BrowserHistory':2,
        'MMyJD_ServiceManager':2,
        'MMyJD_AccountManager':2,
        'MMyJD_MyAppointment':2,
        'MMyJD_ApplicationRecommend':2,
        'MMyJD_JCode':2,
        'MNeworder_Coupons':5,
        'MNeworder_Jdcard':5,
        'MNeworder_JdBean':5,
        'MNeworder_Invoice':5,
        'MNeworder_RestAccount':5,
        'MNeworder_GuessYouLike':5,
        'MNeworder_UnavaliableCoupons':5,
        'MMyJD_AllOrders':2,
        'MSaleBDCoupon_BannerPic':3,
        'MSaleBDCouponResult_BannerPic':3,
        'MShopcart_Productid':5,
        'MShopcart_EditAmount':5,
        'MShopcart_Amount':5,
        'MShopcart_Stroll':5,
        'MShopcart_CheckProd':5,
        'MShopcart_CheckAll':5,
        'MShopcart_Label':5,
        'MShopcart_Getresent':5,
        'MShopcart_Warranty':5,
        'MShopcart_Delete':5,
        'MShopcart_Pay':5,
        'MShopcart_AddtoCart':5,
        'MShopcart_Present':5,
        'MShopcartDeleteProduct_Sure':5,
        'MShopcartDeleteProduct_Cancel':5,
        'MShopcart_Login':5,
        'MShopcart_ShopEntrance':5,
        'MShopcart_GuessYouLikeFold':5,
        'MShopcart_GuessYouLike':5,
        'MShopcart_SimilaritiesEntrance':5,
        'MShopcart_SimilaritiesProductList':5,
        'MCategory_1st':2,
        'MCategory_3rd':2,
        'MCategory_Banner':2,
        'MCategory_Recommend':2,
        'MList_AdProducts':3,
        'MListFilter_Brand':3,
        'MListFilter_Back':3,
        'MListFilter_Address':3,
        'MShopLIst_JDShop':3,
        'MShopLIst_POPShop':3,
        'MShopcart_LoginEmptyCart':5,
        'MShopcart_LoginFullCart':5,
        'MJDMembersHome_SecKillProducts':3,
        'MJDMembersSecKill_Products':4,
        'MJDMembersHome_MemberProducts':3,
        'MJDMembersHome_MemberProductsToCart':3,
        'MJDMembersHome_AllMemberProducts':3,
        'MJDMembersSpecialSale_Categories':4,
        'MJDMembersSpecialSale_Products':4,
        'MJDMembers_FocusPic':3,
        'MJDMembers_Shopid':3,
        'MJDMembers_GetCoupon':3,
        'MVacationHonme_banner':3,
        'MVacationHonme_Destinations':3,
        'MVacationHonme_More':3,
        'MVacationHonme_HotDestinations':3,
        'MVacationHonme_SetOutCity':3,
        'MVacationHonme_SearchBox':3,
        'MVacationHonme_RecommendedProducts':3,
        'MVacationSearch_HotWord':4,
        'MVacationSearchResult_SearchBox':4,
        'MVacationSearchResult_Synthesize':4,
        'MVacationSearchResult_SalesVolume':4,
        'MVacationSearchResult_Price':4,
        'MVacationSearchResult_Fliter':4,
        'MVacationSearchResult_Lines':4,
        'MVacationProductDetail_Calendar':5,
        'MVacationProductDetail_ProductPoint':5,
        'MVacationProductDetail_Schedule':5,
        'MVacationProductDetail_Comment':5,
        'MVacationProductDetail_Costs':5,
        'MVacationProductDetail_ReserveNotice':5,
        'MVacationProductDetail_VisaInfo':5,
        'MVacationProductDetail_ContactService':5,
        'MVacationProductDetail_Call':5,
        'MVacationProductDetail_ReserveNow':5,
        'MJingDouHome_ShopCheckin':2,
        'MJingDouHome_GetJBean':2,
        'MJingDouHome_Topic':2,
        'MProductdetail_Specification':5,
        'MProductdetail_ProductdetailEntrance':5,
        'MProductdetail_Address':5,
        'MProductdetail_FirstAddress':5,
        'MProductdetail_SecondAddress':5,
        'MProductdetail_ThirdAddress':5,
        'MProductdetail_AskServiceEntrance':5,
        'MProductdetail_ProductCommentEntrance':5,
        'MProductdetail_ProductShowEntrance':5,
        'MProductdetail_ServiceInfo':5,
        'MProductdetail_Advert':5,
        'MProductdetail_ConsultEntrance':5,
        'MSearch_ClearHistory':1,
        'MProductdetail_Insurances':5,
        'MSearch_ChangeKeyWords':1,
        'MHome_SearchButton':2,
        'MProductdetail_SalesPromotion':5,
        'MProductdetail_Back':5,
        'MProductdetail_PreferentialPackage':5,
        'MProductdetail_PackageAddToCart':5,
        'MProductdetail_InsurancesSelect':5,
        'MProductdetail_FourthAddress':5,
        'MTicketsProductdetail_Tab':5,
        'MTicketsSearchResult_Fliter':4,
        'MTicketsProductdetail_TicketBomb':5,
        'MTicketsProductdetail_MoreTickets':5,
        'MTicketsSearchResult_SightSpot':4,
        'MTicketsHome_Theme':3,
        'MTicketsProductdetail_ReserveNow':5,
        'MTicketsSearchResult_SearchBox':4,
        'MTicketsHome_SightSpot':3,
        'MTicketsHome_SearchBox':3,
        'MTicketsSearchResult_SalesVolume':4,
        'MTicketsSearchResult_Price':4,
        'MTicketsSearchResult_Synthesize':4,
        'MTicketsProductdetail_ReserveNotice':5,
        'MTicketsProductdetail_SightDescription':5,
        'MTicketsProductdetail_Comments':5,
        'MTicketsHome_Banner':3,
        'MTicketsHome_Location':3,
        'MTicketsThemes_Theme':4,
        'MTicketsSearch_Hotword':4,
        'MTicketsProductdetail_Map':5,
        'MTicketsHome_More':3,
        'MFlashbuy_CategoryBeautyFloor':2,
        'MTwelve_Play':4
    };

    /**
     * @namespace 该命名空间下包含事件
     * @memberOf ping
     */
    MPing.events = {};
    MPing.events.map=  Events;

}(window));
;
;(function(window){
    /*
     * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
     * Digest Algorithm, as defined in RFC 1321.
     * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
     * Distributed under the BSD License
     * See http://pajhome.org.uk/crypt/md5 for more info.
     */

    /*
     * Configurable variables. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     */
    var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
    var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
    function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
    function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
    function hex_hmac_md5(k, d)
      { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
    function b64_hmac_md5(k, d)
      { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
    function any_hmac_md5(k, d, e)
      { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

    /*
     * Perform a simple self-test to see if the VM is working
     */
    function md5_vm_test()
    {
      return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    }

    /*
     * Calculate the MD5 of a raw string
     */
    function rstr_md5(s)
    {
      return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    function rstr_hmac_md5(key, data)
    {
      var bkey = rstr2binl(key);
      if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

      var ipad = Array(16), opad = Array(16);
      for(var i = 0; i < 16; i++)
      {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
      }

      var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
      return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
     * Convert a raw string to a hex string
     */
    function rstr2hex(input)
    {
      try { hexcase } catch(e) { hexcase=0; }
      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var output = "";
      var x;
      for(var i = 0; i < input.length; i++)
      {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
               +  hex_tab.charAt( x        & 0x0F);
      }
      return output;
    }

    /*
     * Convert a raw string to a base-64 string
     */
    function rstr2b64(input)
    {
      try { b64pad } catch(e) { b64pad=''; }
      var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var output = "";
      var len = input.length;
      for(var i = 0; i < len; i += 3)
      {
        var triplet = (input.charCodeAt(i) << 16)
                    | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                    | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
        for(var j = 0; j < 4; j++)
        {
          if(i * 8 + j * 6 > input.length * 8) output += b64pad;
          else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
        }
      }
      return output;
    }

    /*
     * Convert a raw string to an arbitrary string encoding
     */
    function rstr2any(input, encoding)
    {
      var divisor = encoding.length;
      var i, j, q, x, quotient;

      /* Convert to an array of 16-bit big-endian values, forming the dividend */
      var dividend = Array(Math.ceil(input.length / 2));
      for(i = 0; i < dividend.length; i++)
      {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
      }

      /*
       * Repeatedly perform a long division. The binary array forms the dividend,
       * the length of the encoding is the divisor. Once computed, the quotient
       * forms the dividend for the next step. All remainders are stored for later
       * use.
       */
      var full_length = Math.ceil(input.length * 8 /
                                        (Math.log(encoding.length) / Math.log(2)));
      var remainders = Array(full_length);
      for(j = 0; j < full_length; j++)
      {
        quotient = Array();
        x = 0;
        for(i = 0; i < dividend.length; i++)
        {
          x = (x << 16) + dividend[i];
          q = Math.floor(x / divisor);
          x -= q * divisor;
          if(quotient.length > 0 || q > 0)
            quotient[quotient.length] = q;
        }
        remainders[j] = x;
        dividend = quotient;
      }

      /* Convert the remainders to the output string */
      var output = "";
      for(i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);

      return output;
    }

    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    function str2rstr_utf8(input)
    {
      var output = "";
      var i = -1;
      var x, y;

      while(++i < input.length)
      {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
        {
          x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
          i++;
        }

        /* Encode output as utf-8 */
        if(x <= 0x7F)
          output += String.fromCharCode(x);
        else if(x <= 0x7FF)
          output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                        0x80 | ( x         & 0x3F));
        else if(x <= 0xFFFF)
          output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                        0x80 | ((x >>> 6 ) & 0x3F),
                                        0x80 | ( x         & 0x3F));
        else if(x <= 0x1FFFFF)
          output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                        0x80 | ((x >>> 12) & 0x3F),
                                        0x80 | ((x >>> 6 ) & 0x3F),
                                        0x80 | ( x         & 0x3F));
      }
      return output;
    }

    /*
     * Encode a string as utf-16
     */
    function str2rstr_utf16le(input)
    {
      var output = "";
      for(var i = 0; i < input.length; i++)
        output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                      (input.charCodeAt(i) >>> 8) & 0xFF);
      return output;
    }

    function str2rstr_utf16be(input)
    {
      var output = "";
      for(var i = 0; i < input.length; i++)
        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                       input.charCodeAt(i)        & 0xFF);
      return output;
    }

    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    function rstr2binl(input)
    {
      var output = Array(input.length >> 2);
      for(var i = 0; i < output.length; i++)
        output[i] = 0;
      for(var i = 0; i < input.length * 8; i += 8)
        output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
      return output;
    }

    /*
     * Convert an array of little-endian words to a string
     */
    function binl2rstr(input)
    {
      var output = "";
      for(var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
      return output;
    }

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    function binl_md5(x, len)
    {
      /* append padding */
      x[len >> 5] |= 0x80 << ((len) % 32);
      x[(((len + 64) >>> 9) << 4) + 14] = len;

      var a =  1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d =  271733878;

      for(var i = 0; i < x.length; i += 16)
      {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
        d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
        b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
        d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
        c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
        d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
        d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

        a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
        d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
        c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
        b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
        d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
        c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
        d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
        c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
        a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
        d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
        c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
        b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
        d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
        b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
        d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
        c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
        d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
        a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
        d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
        b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
        d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
        c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
        d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
        d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
        a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
        d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
        b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return Array(a, b, c, d);
    }

    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    function md5_cmn(q, a, b, x, s, t)
    {
      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
    }
    function md5_ff(a, b, c, d, x, s, t)
    {
      return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t)
    {
      return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t)
    {
      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t)
    {
      return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safe_add(x, y)
    {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bit_rol(num, cnt)
    {
      return (num << cnt) | (num >>> (32 - cnt));
    }

    MPing.tools || (MPing.tools = {});
    MPing.tools.md5 =  {
        hex_md5 : hex_md5
    };

}(window));