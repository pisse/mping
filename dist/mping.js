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

        this.ready();
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
                userAgent = navigator.userAgent

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
        },
        initUid:function(){
            MPing.tools.localShare(function(){
                var timestamp=(new Date()).getTime(),
                    _localShare = this,
                    tools = MPing.tools.Tools;
                //设置mba_muid
                if(!_localShare.getItem("mba_muid")){
                    _localShare.setItem("mba_muid" ,tools.getUniq() ,1*365*24*60*60*1000 );//1年过期
                }else{
                    tools.setItem("mba_muid" ,tools.getItem("mba_muid") ,1*365*24*60*60*1000 );//1年过期
                }

                //设置mba_sid
                if(!tools.getItem("mba_sid")){
                    tools.setItem("mba_sid" ,timestamp+"" + parseInt(Math.random()*9999999999999999) ,30*60*1000 );//半小时过期
                }else{
                    tools.setItem("mba_sid" ,tools.getItem("mba_sid") ,30*60*1000 );//半小时过期
                }
            });
        },
        setUserIds: function(){
            MPing.tools.localShare(function(){
                var _localShare = this,
                    tools = MPing.tools.Tools;

                var uid = tools.getCookie("pinId");
                this.options.uid = uid ? uid : "";
                this.options.mba_muid = _localShare.getItem("mba_muid")
                this.options.mba_sid = _localShare.getItem("mba_sid");

                if( !this.options.mba_muid ){ //mba_muid过期
                    _localShare.setItem("mba_muid" ,tools.getUniq() ,1*365*24*60*60*1000 );//1年过期
                    this.options.mba_muid = _localShare.getItem("mba_muid");
                }
                if( !this.options.mba_sid ){ //mba_sid过期
                    _localShare.setItem("mba_sid" ,(new Date()).getTime() +"" + parseInt(Math.random()*9999999999999999) ,30*60*1000 );//半小时过期
                    this.options.mba_sid = _localShare.getItem("mba_sid");
                }
            });
        },

        //上报数据
        send: function( request ){
            var self = this;
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

            this.setUserIds();
            tools.extend(rData, this.options);

            if( request instanceof MPing.Request ){
                var pData = request.getReportObj();
                pData['uid'] = this.options['uid'];
                rData.data.push( pData );
            }
            return rData;
        }
    }

    MPing.prototype.options = {
        uid: "",
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
            var ret;
            MPing.tools.localShare(function(){
                var _localShare = this,
                    keys = Options['Storage'],
                    current = _localShare.getItem(keys['current']),
                    tools = MPing.tools.Tools;

                if( (current && tools.isObject(current)) ){
                    ret = JSON.stringify(current);
                }

                if(tools.isFunction(callback)){
                    callback.call(null ,ret);
                }
            });
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
                    current = JSON.parse(series);
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
}(window));;
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

}(window));;(function(MPing, window, undefined) {
    var _init = false,
        _iframe = null,
        _ready = false,
        _handler = [],
        _core = null;

    MPing.tools.localShare = function(fn) {
        if (false === _init) {
            MPing.tools.localShare.onComplete = function() {
                _core = _iframe.contentWindow.storageCore;
                for (var i = 0, len = _handler.length; i < len; i++) {
                    typeof _handler[i] === "function" && _handler[i].call(_core)
                }
                _ready = true;
                _handler = null;
                _iframe = null;
                delete MPing.tools.localShare.onComplete
            };

            //var _prefix = ('https:' == document.location.protocol) ? G.prefix.st_ssl : G.prefix.st;
            _iframe = document.createElement("IFRAME");
            _iframe.src = 'http://h5.m.jd.com/active/track/proxy.html?v=xxxx';
            _iframe.style.display = "none";
            _init = true;
            document.body.insertBefore(_iframe, document.body.firstChild);
        }

        if (_ready) {
            typeof fn === "function" && fn.call(_core);
        } else {
            _handler.push(fn);
        }
    };

    //预加载
    MPing.tools.localShare();

})(MPing, window);
;/**
 * @fileoverview 这个文件是所有事件id与事件等级对应表
 */

;(function(window){

    var Events = {
        'StartPhoto_StartPic':1,
        'NavigationBar_MyJD':1,
        'NavigationBar_Discover':1,
        'NavigationBar_Home':1,
        'NavigationBar_Classification':1,
        'NavigationBar_Shopcart':1,
        'Home_Shortcut':1,
        'Home_ProductList':1,
        'Home_FloorCustomize':1,
        'Home_HandSeckill':1,
        'Home_Floor':1,
        'Home_FloatingFloor':1,
        'Home_GoodShopCate':1,
        'Home_Search':1,
        'Home_VSearch':1,
        'Home_ThemeCustom':1,
        'Home_ThemeStreet':1,
        'Home_FocusPic':1,
        'Home_SeckillWord':1,
        'Home_SeckillSlideIn':1,
        'Home_Category':1,
        'Home_BrandGuideSlideIn':1,
        'Home_StreetSlideIn':1,
        'Home_Scan':1,
        'Search_Search':1,
        'Home_ThemeMore':1,
        'Classification_CateCustomize':2,
        'Discover_Applications':2,
        'Discover_Xiaobing':2,
        'OrderList_BuyAgain':2,
        'OrderList_GotoShop':2,
        'MessageCenter_Productid':2,
        'FloorCustomize_Productid':2,
        'MyFollow_Productid':2,
        'MyJD_Ordersnotfinish':2,
        'MyJD_MyFollow':2,
        'MyJD_HistoryLog':2,
        'MyJD_GuessYouLike':2,
        'Shake_Result':2,
        'GoodShop_Shopid':2,
        'GoodShop_ProductNew':2,
        'GoodShop_ProductSale':2,
        'ShopList_Productid':2,
        'MyJD_MyMessage':2,
        'Presell_Productid':2,
        'HandSeckill_Productid':2,
        'HandSeckill_MoreOnSale':2,
        'HandSeckill_ShopOnSale':2,
        'Classification_BCategory':2,
        'BCategory_activityid':2,
        'ThemeStreet_GotoStreet':2,
        'ThemeStreet_MoreRecommend':2,
        'CutDown_Productid':2,
        'Scan_Scan_Scan':2,
        'Search_Scan':2,
        'Discover_Scan':2,
        'Search_Searchthi':2,
        'Search_History':2,
        'Search_Hotword':2,
        'Search_AssociativeWord':2,
        'Search_VSearch':2,
        'Classification_VSearch':2,
        'Discover_Story':2,
        'Discover_Stroll':2,
        'Discover_Activities':2,
        'Discover_Shake':2,
        'Discover_Nearby':2,
        'Home_Productid':2,
        'HomeList_Productid':2,
        'Search_TopLabel':2,
        'Search_MiddleLabel':2,
        'Search_OnehourLabel':2,
        'JDTopList_ProductID':2,
        'Applications_Applications':3,
        'StockShelf_Productid':3,
        'XiaobingChat_Productid':3,
        'XiaobingChat_Activityid':3,
        'XiaobingChat_Shopid':3,
        'MyFollow_Shopid':3,
        'Shopid_Search':3,
        'Shopid_ActivityBanner':3,
        'Shopid_Acitivityid':3,
        'Shopid_Productid':3,
        'ShopProductNew_Productid':3,
        'ShopProductSale_Productid':3,
        'Activity_Productid':3,
        'MCategory_SCategory':3,
        'GoodProduct_GoodProductid':3,
        'RecommendPro_RecommendProid':3,
        'RecommendPro_DirectBuy':3,
        'CutDownResult_GotoCart':3,
        'Stroll_Productid':3,
        'StrollWellChosen_Productid':3,
        'StrollRecommend_Productid':3,
        'StrollRecommend_EasyBuy':3,
        'StrollSimilar_ProductDetail':3,
        'Picture_Productid':3,
        'Searchlist_Productid':3,
        'Searchlist_Moresupplier':3,
        'Searchlist_VSearch':3,
        'Searchlist_ShopPopup':3,
        'Searchlist_Shopid':3,
        'Productlist_Productid':3,
        'Productdetail_Like':4,
        'PushMessage_OpenMessage':5,
        'Orderdetail_BuyAgain':5,
        'Orderdetail_Shopid':5,
        'Shopcart_GuessYouLike':5,
        'Shopcart_Label':5,
        'Shopcart_Getresent':5,
        'MessageCenter_Message':5,

        //M事件
        'MHome_Category':1,
        'MHome_ShopCart':1,
        'MHome_Recharge':1,
        'MHome_Lottery':1,
        'MHome_MyJD':1,
        'MHome_Search':1,
        'MHome_FocusPic':1,
        'MHome_HandSecKill':1,
        'MHome_Floor':1,
        'MHome_Searchthi':2,
        'BrandStreetSale_Activityid':2,
        'BrandStreetSale_Productid':2,
        'BrandStreetShow_FocusPic':2,
        'BrandStreetShow_Activityid':2,
        'MCategory_Searchthi':2,
        'MCategory_SCategory':2,
        'MHandSeckill_Productid':2,
        'MMyJD_MyMessage':2,
        'MMyJD_MyFollow':2,
        'MMyJD_MyHistory':2,
        'MMyJD_MyReserve':2,
        'MMyJD_GuessYouLike':2,
        'MMyFollow_Productid':2,
        'Shopid_Productid':3,
        'MProductlist_Productid':3,
        'MActivity_Productid':3,
        'Jshop_ProductID':3,
        'Jshop_ProductID_Category':3,
        'Jshop_CountDown':3,
        'Jshop_GroupBuy':3,
        'Jshop_ShopRec':3,
        'Jshop_PromoRec':3,
        'Jshop_PromoTurns':3,
        'Jshop_PreSale':3,
        'Jshop_ImgWord':3,
        'Jshop_Html_Content':3
    };

    /**
     * @namespace 该命名空间下包含事件
     * @memberOf ping
     */
    MPing.events = {};
    MPing.events.map=  Events;

}(window));
