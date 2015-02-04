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

            if(userAgent.indexOf('jdapp') > -1){
                var gUAInfo = userAgent.split(";");

                if( gUAInfo[1] == optionsClient['IOS_M']['UAname'] ){
                    common['client'] = optionsClient['IOS_M']['value'] ;
                }else if(gUAInfo[1] == optionsClient['ANDROID_M']['UAname']){
                    common['client'] = optionsClient['ANDROID_M']['value'] ;
                }
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
            }

            common['proj_id'] = Options['ProjectId'];
            common['biz'] = Options['Biz'];
            common['method'] = Options['Method']['bpReport'];
            common['report_ts'] = tools.getCurTime();
            common['resolu'] = window.innerWidth + "*" + window.innerHeight;
            common['token'] = md5.hex_md5( common['report_ts'] + Options['Key']);
            common['reserved1'] = document.referrer;
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
        initUid:function(){
            var self = this;

            var pinid = tools.getCookie("pinId");
            self.options.pinid = pinid ? pinid : "";

            MPing.tools.localShare(function(){
                var timestamp=(new Date()).getTime(),
                    _localShare = this,
                    tools = MPing.tools.Tools;
                //设置mba_muid
                if(!_localShare.getItem("mba_muid")){
                    _localShare.setItem("mba_muid" ,tools.getUniq() ,1*365*24*60*60*1000 );//1年过期
                }else{
                    _localShare.setItem("mba_muid" ,_localShare.getItem("mba_muid") ,1*365*24*60*60*1000 );//1年过期
                }

                //设置mba_sid
                if(!_localShare.getItem("mba_sid")){
                    _localShare.setItem("mba_sid" ,timestamp+"" + parseInt(Math.random()*9999999999999999) ,30*60*1000 );//半小时过期
                }else{
                    _localShare.setItem("mba_sid" ,_localShare.getItem("mba_sid") ,30*60*1000 );//半小时过期
                }

                self.options.mba_muid = _localShare.getItem("mba_muid");
                self.options.mba_sid = _localShare.getItem("mba_sid");
            });
        },

        //上报数据
        send: function( request ){
            var self = this;

            //爬虫不上报
            if(this.isSpider()) return;

            MPing.tools.localShare(function(){
                var sendData = encodeURIComponent( JSON.stringify( self.getReportData( request ) ));
                var interfaceUrl = "http://stat.m.jd.com/stat/access.jpg?";
                var param = [];
                param.push('data=' + sendData);
                var url = interfaceUrl + param.join('&');
                var image = new Image(1,1);
                image.src = url;
            });
        },
        getReportData: function( request ){
            var tools = MPing.tools.Tools,
                 rData = {data:[] };
            tools.extend(rData, reportData['common']);

            tools.extend(rData, this.options);

            if( request instanceof MPing.Request ){
                var pData = request.getReportObj();
                pData['pinid'] = this.options['pinid'];
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
        pinid: "",
        mba_muid: "",
        mba_sid: ""
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
        this.updateEventSeries();
    }
    Click.prototype = new Request();
    Click.prototype.updateEventSeries = function(){
        MPing.EventSeries && MPing.EventSeries.updateSeries(this);
    }
    Click.attachEvent = function( cClass ){
        cClass||(cClass = "J_ping");
        var _click = "touchstart" in window ? "touchstart" : "click",
             root = document.querySelector('body');

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
                var eventId = target.getAttribute('report-eventid') ? target.getAttribute('report-eventid'): "";
                var click = new MPing.inputs.Click( eventId );
                var mping = new MPing();
                click.event_param = target.getAttribute('report-eventparam') ? target.getAttribute('report-eventparam'): "";
                //click.event_func = target.getAttribute('report-eventfunc') ? target.getAttribute('report-eventfunc'): "";
                mping.send(click);
            }
        }, false);
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
        this.addSeries(skuId);
    }
    AddCart.prototype = new Click();
    AddCart.prototype.addSeries = function(id){
        MPing.EventSeries.addSeries(id);
    }

    //删除购物车，删除sku对应事件串
    function RmCart(eventId, skuId) {
        Click.call(this, eventId, null);

        //this.skuId = skuId;
        this.deleteSeries(skuId);
    }
    RmCart.prototype = new Click();
    RmCart.prototype.deleteSeries = function(id){
        MPing.EventSeries.deleteSeries(id);
    }

    //添加订单，提交并删除sku对应事件串
    function Order(skuId) {
        Request.call(this, "Order", null);

        this.type = Options.Type.ORDER;

        this.skuId = skuId;

        this.setTs("order_ts");
        this.setParams();
        this.deleteSeries(skuId);
    }
    Order.prototype = new Request();
    Order.prototype.deleteSeries = function(id){
        MPing.EventSeries.deleteSeries(id);
    }
    Order.prototype.setPageParam = function(){}
    Order.prototype.setParams = function() {
        var report_obj = {},
            tools = MPing.tools.Tools;
        var self = this;
        MPing.EventSeries.getSeriesById(this['skuId'], function(skuSeries){
            if(skuSeries && tools.isObject(skuSeries)){
                for(var key in skuSeries){
                    var sObj = skuSeries[key];
                    if( sObj && tools.isObject(sObj) ){
                        var level = parseInt(sObj['level']);
                        self['lv' + level + '_event_id'] = sObj['event_id'];
                        self['lv' + level + '_event_param'] = sObj['event_param'];
                        self['lv' + level + '_page_name'] = sObj['page_name'];
                        self['lv' + level + '_page_param'] = sObj['page_param'];
                    };
                }
            }
        });
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
        getSeries: function(callback){
            var ret = {
                m_source: '1'
            };
            MPing.tools.localShare(function(){
                var _localShare = this,
                    keys = Options['Storage'],
                    current = _localShare.getItem(keys['current']),
                    mba_uid = _localShare.getItem("mba_muid"),
                    mba_sid = _localShare.getItem("mba_sid"),
                    tools = MPing.tools.Tools;

                ret['mba_muid'] = mba_uid;
                ret['mba_sid'] = mba_sid;
                if( (current && tools.isObject(current)) ){
                    ret['event_series'] = current;
                }

                if(tools.isFunction(callback)){
                    callback.call(null ,ret);
                }
            });
            return JSON.stringify(ret);
        },
        getMSeries: function(){
            var ret = this.getSeries();
            var re_mSource = /(?:"m_source"):"(1)"/;
            ret = ret.replace(re_mSource, '"m_source":"0"');
            return ret;
        },
        getCached: function(callback){
            var ret;
            MPing.tools.localShare(function(){
                var _localShare = this,
                    keys = Options['Storage'],
                    cached = _localShare.getItem(keys['cached']),
                    tools = MPing.tools.Tools;

                if( (cached && tools.isObject(cached)) ){
                    ret = JSON.stringify(cached);
                }

                if(tools.isFunction(callback)){
                    callback.call(null ,ret);
                }
            });
            return ret;
        },
        writeSeries: function(series){
            if(!series) return;

            MPing.tools.localShare(function(){
                var _localShare = this,
                    keys = Options['Storage'],
                    tools = MPing.tools.Tools,
                    current;

                try {
                    series = JSON.parse(series);
                    current = series['event_series'];
                    if( (current && tools.isObject(current)) ){
                        _localShare.setItem(keys['current'], current);
                    }
                }catch(e){}
            });
        },

        updateSeries: function(request){
            if( request instanceof Request){
                var eventId = request['event_id'], eventLevel = eventId && MPing.events.map[ eventId ],
                    tools = MPing.tools.Tools;

                if(eventLevel == undefined || eventLevel=="" || eventLevel == null) return;//找不到事件对应的等级，退出

                MPing.tools.localShare(function(){
                    var _localShare = this,
                        eObj = {
                            level: eventLevel,
                            event_id: eventId,
                            event_param: request['event_param'],
                            page_name: request['page_name'],
                            page_param: request['page_param']
                        },
                        keys = Options['Storage'];

                    var curSeries = _localShare.getItem(keys['current']), start, index = parseInt(eventLevel)-1;

                    !(curSeries && tools.isObject(curSeries)) ? ( curSeries = {}, start = 0 ) : ( start = index );
                    for(var i= start; i<5; i++ ){
                        curSeries[i] = (i== index) ? eObj : ""; //更新当前事件串
                    }

                    _localShare.setItem(keys['current'], curSeries);
                });
            }
        },
        getSeriesById: function(id, callback){
            var ret,
                tools = MPing.tools.Tools;

            if( !(id && tools.isString(id)) ) return;

            MPing.tools.localShare(function(){
                var _localShare = this,
                    keys = Options['Storage'],
                    cached = _localShare.getItem(keys['cached']);

                if(cached && tools.isObject(cached) && cached.hasOwnProperty(id)){
                    ret = cached[id]; //返回sku对应的事件串以上报
                }

                if(tools.isFunction(callback)){
                    callback.call(null ,ret);
                }
            });
            return ret;
        },
        addSeries: function(id){
            var tools = MPing.tools.Tools;

            if( !(id && tools.isString(id)) ) return;

            MPing.tools.localShare(function(){
                var _localShare = this,
                    keys = Options['Storage'],
                    cached = _localShare.getItem(keys['cached']),
                    current = _localShare.getItem(keys['current']);

                (cached && tools.isObject(cached)) || (cached = {});
                (current && tools.isObject(current)) || (current = {});

                cached[id] = current;//设置sku对应的事件串数组
                _localShare.setItem(keys['cached'], cached); //更新已缓存的事件串
                _localShare.removeItem(keys['current']); //删除当前事件串
            });
        },
        deleteSeries: function(id){
            var tools = MPing.tools.Tools;

            if( !(id && tools.isString(id)) ) return;

            MPing.tools.localShare(function(){
                var _localShare = this,
                    keys = Options['Storage'],
                    cached = _localShare.getItem(keys['cached']);

                if(cached && tools.isObject(cached) && cached.hasOwnProperty(id)){
                    delete cached[id]; //删除sku对应的事件串
                    _localShare.setItem(keys['cached'], cached); //更新已缓存的事件串
                }
            });
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
            var uniq = "";
            for (var i = 1; i <= 32; i++) {
                var n = Math.floor(Math.random() * 16.0).toString(16);
                uniq += n;
                if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                    uniq += "-";
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
            str = str.replace(/(.com|.info|.net|.org|.me|.mobi|.us|.biz|.xxx|.ca|.mx|.tv|.ws|.com.ag|.net.ag|.org.ag|.ag|.am|.asia|.at|.be|.com.br|.net.br|.com.bz|.net.bz|.bz|.cc|.com.co|.net.co|.com.co|.co|.de|.com.es|.nom.es|.org.es|.es|.eu|.fm|.fr|.gs|.co.in|.firm.in|.gen.in|.ind.in|.net.in|.org.in|.in|.it|.jobs|.jp|.ms|.com.mx|.nl|.nu|.co.nz|.net.nz|.org.nz|.se|.tc|.tk|.com.tw|.idv.tw|.org.tw|.tw|.co.uk|.me.uk|.org.uk|.vg|.com.cn|.gov|.gov.cn|.cn)$/ig,"%divide%$1");

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
        }
    };

    var tools = new Tools();



    /**
     * @namespace 该命名空间下包含工具类以及相关方法（API），Tools模块
     * @memberOf Ping
     */
    MPing.tools || (MPing.tools = {});
    MPing.tools.Tools =  tools;

    document.domain = tools.getTopDomain();
    window.MPing = MPing;
}(window));