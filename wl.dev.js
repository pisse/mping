/*
 * JSON
 */
(function ($) {
    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
    //var escapeable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
    $.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function (o) {
        if (o === null) {
            return 'null';
        }
        var type = typeof o;
        if (type === 'undefined') {
            return undefined;
        }
        if (type === 'number' || type === 'boolean') {
            return '' + o;
        }
        if (type === 'string') {
            return $.quoteString(o);
        }
        if (type === 'object') {
            if (typeof o.toJSON === 'function') {
                return $.toJSON(o.toJSON());
            }
            if (o.constructor === Date) {
                var month = o.getUTCMonth() + 1,
                    day = o.getUTCDate(),
                    year = o.getUTCFullYear(),
                    hours = o.getUTCHours(),
                    minutes = o.getUTCMinutes(),
                    seconds = o.getUTCSeconds(),
                    milli = o.getUTCMilliseconds();
                if (month < 10) {
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day;
                }
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                if (milli < 100) {
                    milli = '0' + milli;
                }
                if (milli < 10) {
                    milli = '0' + milli;
                }
                return '"' + year + '-' + month + '-' + day + 'T' +
                    hours + ':' + minutes + ':' + seconds +
                    '.' + milli + 'Z"';
            }
            if (o.constructor === Array) {
                var ret = [];
                for (var i = 0; i < o.length; i++) {
                    ret.push($.toJSON(o[i]) || 'null');
                }
                return '[' + ret.join(',') + ']';
            }
            var name,
                val,
                pairs = [];
            for (var k in o) {
                type = typeof k;
                if (type === 'number') {
                    name = '"' + k + '"';
                } else if (type === 'string') {
                    name = $.quoteString(k);
                } else {
                    continue;
                }
                type = typeof o[k];
                if (type === 'function' || type === 'undefined') {
                    continue;
                }
                val = $.toJSON(o[k]);
                pairs.push(name + ':' + val);
            }
            return '{' + pairs.join(',') + '}';
        }
    };
    $.evalJSON = typeof JSON === 'object' && JSON.parse
        ? JSON.parse
        : function (src) {
        return eval('(' + src + ')');
    };
    $.secureEvalJSON = typeof JSON === 'object' && JSON.parse
        ? JSON.parse
        : function (src) {

        var filtered =
            src.replace(/\\["\\\/bfnrtu]/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, '');

        if (/^[\],:{}\s]*$/.test(filtered)) {
            return eval('(' + src + ')');
        } else {
            throw new SyntaxError('Error parsing JSON, source is not valid.');
        }
    };
    $.quoteString = function (string) {
        if (string.match(escapeable)) {
            return '"' + string.replace(escapeable, function (a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };
})(jQuery||$);

/*
 *Cookies 86400000
 */
function setCookieMills(name, value, MillsTime) {
    var exp = new Date();
    exp.setTime(exp.getTime() + MillsTime);
    var cdomain = window.document.domain.indexOf('360buy') >= 0 ? '.360buy.com' : '.jd.com';
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=" + cdomain;
}
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}
function deleteCookie(name) {
    var c = getCookie(name);
    if (c != null) {
        setCookieMills(name, '', -1);
    }
}

//seClick
function seClick(type, Kword, sku) {
    var name = "seWids" + type;
    var reWids = getCookie(name);
    if (reWids != null) {
        var pos = reWids.toString().indexOf(sku);
        if (pos < 0) {
            reWids = reWids + "," + sku;
        }
    }
    else {
        reWids = sku;
    }
    setCookieMills(name, reWids, 86400000);

    log(2, 2, Kword, sku);
}
function appendJSONCookie(cookieName, key, wid, Mills) {
    var ns = eval('(' + getCookie(cookieName) + ')');
    if (ns == null || ns == '') {
        ns = new Object();
    }
    if (ns[key] == null) {
        ns[key] = '';
    }
    var pos = ns[key].indexOf(wid);
    if (pos < 0) {
        ns[key] = ns[key] + "," + wid;
    }
    setCookieMills(cookieName, $.toJSON(ns), Mills);
}
function reBook(t, sku, num) {
    var d = "_rtbook";
    var wid = sku.toString().split('#')[0];
    appendJSONCookie(d, t, wid, 86400000);
    log(3, t, wid, num);
}
function fe(t, s, n) {
    log('f', t, s, n);
}
function reClick2012(k, sku, num) {
    var z = "reHome2012";
    var wid = sku.toString().split('#')[0];
    appendJSONCookie(z, k, wid, 86400000);
    log(3, k, wid, num);
}
function reClickCube(c, d) {
    var cu = "_rdCube";
    appendJSONCookie(cu, 'p' + c, d, 86400000);
}
function mark(sku, type) {
    log(1, type, sku);
}
function isMeta(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return true;
    var which = e.which, button = e.button;
    if (!which && button !== undefined) {
        return (!button & 1) && (!button & 2) && (button & 4);
    } else if (which === 2) {
        return true;
    } else if (button === 2) {
        return true;
    }
    return false;
}
//page click
document.onclick = function (e) {
    e = e || event;
    if( !e.clientX && !e.clientY && !e.pageX && !e.pageY ) { return; }
    var da = document, wd = window;
    var el = tag = e.srcElement || e.target;
    var d = $(tag).attr('clstag');
    var cls = '';
    while (!d) {
        tag = tag.parentNode;
        if (!tag || (tag.nodeName == 'BODY')) {
            break;
        }
        d = $(tag).attr('clstag');
    }
    if (d) {
        var j = d.split('|'), k = j[1], t = j[2], s = j[3];
        if (k === 'keycount') {
            $(el).attr('href') ? log(t, s, 'Q', $(el).attr('href')) : log(t, s, 'Q');
            cls = t + '|' + s;
            if ($(el).attr('href') && /http:\/\/.*?/.exec($(el).attr('href')) && $(el).attr('target') !== '_blank' && !isMeta(e)) {
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                setTimeout(function () {
                    wd.location.href = $(el).attr('href');
                }, 200);
            }
        }
    }
    var locationhost = this.location.hostname.toLowerCase();
    if (/(sale|mall|jmall|pop).(jd|360buy).com/.test(locationhost) || wd.ja_heat_map) {
        var x=0, y=0, page_width = wd.screen.width>=1210 && locationhost=='item.jd.com' ? 1210 : 990,
            offset_left=da.body.clientWidth>page_width ? Math.round((da.body.clientWidth-page_width)/2) : 0 ;
        //Math.round($('#shortcut-2013').children().eq(0).offset().left)
        if(e.pageX || e.pageY){
            x=e.pageX; y=e.pageY;
        } else {
            x=e.clientX + da.body.scrollLeft - da.body.clientLeft;//Êó±êµÄx×ø±ê
            y=e.clientY + da.body.scrollTop - da.body.clientTop;
        }
        log('d', 'c', cls || '-', x + 'x' + y, da.body.scrollWidth + 'x' + da.body.scrollHeight,offset_left);
    }
};

//HashMap
function HashMap() {
    this.values = new Object();
}
HashMap.prototype.Set = function (key, value) {
    this.values[key] = value;
};
HashMap.prototype.Get = function (key) {
    return this.values[key];
};
HashMap.prototype.Contains = function (key) {
    return this.values.hasOwnProperty(key);
};
HashMap.prototype.Remove = function (key) {
    delete this.values[key];
};

var SucInfoMethod = {
    Init: function () {
        this.orderDetailMap = new HashMap();
        this.rSM = new HashMap();
        var ods = SucInfo_OrderDetail.toString().split(",");
        for (var i = 0; i < ods.length; i++) {
            var values = ods[i].split(":");
            this.orderDetailMap.Set(values[0], values[1]);
            this.sku = values[0];
        }
    },
    GetSkuNum: function (sku) {
        return this.orderDetailMap.Get(sku);
    },
    Contains: function (sku) {
        return this.orderDetailMap.Contains(sku);
    },
    GetDefaultSku: function () {
        return this.sku;
    },
    ARS: function (sku) {
        this.rSM.Set(sku, 0);
    },
    RSContains: function (sku) {
        if (this.rSM.Contains(sku))
            return 1;
        else
            return 0;
    }
};

function RecommendTrans(recName, tag, logtype) {
    var cookieNames = recName.split(',');
    for (var i = 0; i < cookieNames.length; i++) {
        var recCookies = eval('(' + getCookie(cookieNames[i]) + ')');
        for (var k in recCookies) {
            if (recCookies[k] != '') {
                if (k == "cai2012") {
                    loginfo(recCookies[k], k.toString(), "R", logtype);
                } else {
                    loginfo(recCookies[k], k.toString(), tag, logtype);
                }
            }
        }
    }
}
function simpleMold(cookieArrary, tag, prefix, logtype, flag) {
    for (var i = 0; i < cookieArrary.length; i++) {
        var mt = getCookie(prefix + cookieArrary[i]);
        if (mt != null && mt != '') {
            loginfo(mt, cookieArrary[i], tag, logtype, flag);
        }
    }
}
function complexMold(cookieArrary, tag, prefix, logtype, flag) {
    for (var i = 0; i < cookieArrary.length; i++) {
        var items = eval('(' + getCookie(prefix + cookieArrary[i]) + ')');
        if (items != null) {
            for (var k in items) {
                if (items[k] != '') {
                    loginfo(items[k], k.toString(), tag, logtype, flag);
                }
            }
        }
    }
}
function loginfo(CartWare, rtype, name, logtype, flag) {
    var strs = CartWare.split(',');
    var id = SucInfo_OrderId, ordertype = SucInfo_OrderType, orderdetail = SucInfo_OrderDetail;
    for (var i = 0; i < strs.length; i++) {
        if (strs[i].length > 0) {
            var wid = strs[i].toString().split('#')[0];
            if (SucInfoMethod.Contains(wid)) {
                if (flag) {
                    log(logtype, name, rtype.concat('.o'), id, ordertype, orderdetail, wid + ':' + SucInfoMethod.GetSkuNum(wid));
                    log('4', 'R' + rtype.concat('.o'), id, ordertype, orderdetail, wid, SucInfoMethod.GetSkuNum(wid));
                }
                else {
                    log(logtype, name + rtype, id, ordertype, orderdetail, wid, SucInfoMethod.GetSkuNum(wid));
                }
            }
        }
    }
}

function isChecked() {
    SucInfo_OrderId = window.SucInfo_OrderId || JA.util.getParameter(document.location.href, 'suc_orderid') || undefined;
    SucInfo_OrderType = window.SucInfo_OrderType || JA.util.getParameter(document.location.href, 'suc_ordertype') || undefined;
    SucInfo_OrderDetail = window.SucInfo_OrderDetail || decodeURIComponent(JA.util.getParameter(document.location.href, 'suc_sku')) || undefined;
    return SucInfo_OrderId && SucInfo_OrderDetail;
}

//page load
function funLoad() {
    var pin = getCookie('pin');
    if (pin != null && pin.length > 0) {
        setCookieMills('rpin', pin, 259200000);
    }
}
function Clublog() {
    var p = this.location.pathname.toLowerCase();
    var h = this.location.hostname.toLowerCase();
    if ((p.indexOf('/cart.html', 0) >= 0) || (p.indexOf('shoppingcart', 0) >= 0)) {
        log('R2&Page', 'Show');
    }
    else if (p.indexOf('user_home', 0) >= 0) {
        log('R3&Page', 'Show');
    }
    else if ((p.indexOf('initcart.html', 0) >= 0) || (p.indexOf('addtocart.html', 0) >= 0) || (p.indexOf('initcart.aspx', 0) >= 0)) {
        log('R4R5&Page', 'Show');
    }
    else if ((p.indexOf('normal/list.action', 0) >= 0) || (p.indexOf('orderlist.aspx', 0) >= 0)) {
        log('DDR&Page', 'Show');
    }
    else if (h == 'home.360buy.com') {
        if (p == '/') {
            log('R3&Page', 'Show');
        }
    }
}
function getHistory() {
    var pid = decodeURIComponent(escape(getCookie("pin")));
    var his = getCookie("_ghis");
    var domain = window.document.location.host.toLowerCase().indexOf('360buy.com') >= 0 ? '360buy' : 'jd';
    if (his == null && pid != null) {
        var hisuri = "http://gh." + domain + ".com/BuyHistory.aspx?mid=" + encodeURIComponent(pid);
        $.ajax({
            url: hisuri,
            type: "GET",
            dataType: 'jsonp',
            success: function (result) {
                var sskus = result.SSkus;
                var insterest = result.UserInsterest;
                if (sskus.toString().length > 0) {
                    setCookieMills("_ghis", sskus.toString().substring(0, 51));
                }
                if (insterest.toString().length > 0) {
                    setCookieMills("_ghit", insterest);
                }
            }
        });
    }
}

//user browse
(function () {
    function HashMap() {
        this.values = new Object();
    }

    HashMap.prototype.Set = function (key, value) {
        this.values[key] = value;
    };
    HashMap.prototype.Get = function (key) {
        return this.values[key]
    };
    HashMap.prototype.Contains = function (key) {
        return this.values.hasOwnProperty(key)
    };
    HashMap.prototype.Remove = function (key) {
        delete this.values[key];
    };

    function SortedHashMap(IComparer, IGetKey) {
        this.IComparer = IComparer;
        this.IGetKey = IGetKey;
        this.a = new Array();
        this.h = new HashMap();
    }

    SortedHashMap.prototype.Add = function (key, value) {
        if (this.ContainsKey(key)) {
            this.Remove(key);
        }
        this.a.push(value);
        this.a.sort(this.IComparer);
        for (var i = 0; i < this.a.length; i++) {
            var key = this.IGetKey(this.a[i]);
            this.h.Set(key, i);
        }
    };
    SortedHashMap.prototype.Insert = function (value, maxlength) {
        for (var i = 0, l = this.a.length; i < l; i++) {
            if (this.a[i].s === value.s) {
                this.a.splice(i, 1);
                break;
            }
        }
        if (this.a.length >= maxlength) {
            this.a.splice(maxlength - 1, 1);
        }
        this.a.unshift(value);
    };
    SortedHashMap.prototype.Get = function (key) {
        return this.a[this.h.Get(key)];
    };
    SortedHashMap.prototype.Count = function () {
        return this.a.length;
    };
    SortedHashMap.prototype.Remove = function (key) {
        if (!this.h.Contains(key))
            return;
        var index = this.h.Get(key);
        this.a.splice(index, 1);
        this.h.Remove(key);
    };
    SortedHashMap.prototype.ContainsKey = function (key) {
        return this.h.Contains(key);
    };
    SortedHashMap.prototype.Clear = function () {
        this.a = new Array();
        this.h = new HashMap();
    };
    SortedHashMap.prototype.GetJson = function () {
        //return JSON.stringify(this.a)
        return $.toJSON(this.a);
    };

    function ThirdType(thirdType, sku, value) {
        this.t = thirdType;
        this.v = 5;
        this.s = 0;
        if (arguments.length > 1) {
            this.s = sku;
        }
        if (arguments.length > 2) {
            this.v = value;
        }
    }

    ThirdType.prototype.Increase = function () {
        this.v = this.v + 2;
    };
    ThirdType.prototype.Decrease = function () {
        this.v = this.v - 1;
    };
    ThirdType.prototype.SetSku = function (sku) {
        this.s = sku;
    };

    Ttracker = {
        IComparer: function (a, b) {
            return b.v - a.v;
        },
        IGetKey: function (a) {
            return a.t;
        },
        isbook: function (id) {
            return id > 10000000 && id < 20000000;
        },

        trace: function () {
            if ( typeof pageConfig!='object' || typeof pageConfig.product!='object' ) return;
            var sortid = pageConfig.product.cat instanceof Array && pageConfig.product.cat[2];
            if (!sortid) return;
            var wid = $('#name').attr('PshowSkuid') || pageConfig.product.skuid;
            this.view(sortid, wid);
            this.viewtypewid();
        },
        viewtypewid: function () {
            var maps = Ttracker.util.Vv('typewid');
            if (maps) {
                Ttracker.util.Wv('typewid', '', -63072E6);
            }
        },
        viewhisotry: function (t, s, cname) {
            var nview = { t: t, s: s };
            var bookmap = new SortedHashMap(this.IComparer, this.IGetKey);
            var bview = Ttracker.util.Vv(cname);
            if (bview) {
                try {
                    if (bview.indexOf('.') > 0) {
                        var viewarray = bview.split('|');
                        for (var j = viewarray.length - 1; j >= 0; j--) {
                            var book = viewarray[j].split('.');
                            bookmap.Insert({ t: Number(book[0]), s: Number(book[1]) }, 8);
                        }
                    } else {
                        var bviews = eval('(' + bview + ')');
                        if (bviews.length > 0 && bviews[0].d != undefined)
                            Ttracker.util.Wv(cname, '', -63072E6);
                        else {
                            for (var i = bviews.length - 1; i >= 0; i--) {
                                bookmap.Insert(bviews[i], 8);
                            }
                        }
                    }
                }
                catch (e) {
                    Ttracker.util.Wv(cname, '', -63072E6);
                }
            }
            bookmap.Insert(nview, 8);
            var cvalue = '';
            for (var k = 0, klen = bookmap.a.length; k < klen; k++) {
                cvalue += (bookmap.a[k].t + '.' + bookmap.a[k].s + (k == klen - 1 ? '' : '|'));
            }
            cvalue && Ttracker.util.Wv(cname, cvalue, 63072E6);
        },
        viewrate: function (t, s, cname) {
            var ntw = { t: t, s: s, v: 5 };
            var sitesortmap = new SortedHashMap(this.IComparer, this.IGetKey);
            var vrate = Ttracker.util.Vv(cname);
            if (vrate) {
                try {
                    if (vrate.indexOf('.') > 0) {
                        var ratearray = vrate.split('|');
                        for (var j = ratearray.length - 1; j >= 0; j--) {
                            var tw = ratearray[j].split('.');
                            var tv = Number(tw[2] || 0), tid = Number(tw[0]);
                            tv = t === tid ? tv : (tv - 1);
                            sitesortmap.Add(Number(tw[0]), { t: Number(tw[0]), s: Number(tw[1]), v: tv }, 8);
                        }
                    } else {
                        var vrates = eval('(' + vrate + ')');
                        if (vrates.length > 0 && vrates[0].d != undefined)
                            Ttracker.util.Wv(cname, '', -63072E6);
                        else {
                            for (var i = 0; i < vrates.length; i++) {
                                var rate = vrates[i];
                                if (rate.t != t) rate.v -= 1;
                                sitesortmap.Add(rate.t, rate);
                            }
                        }
                    }
                }
                catch (e) {
                    Ttracker.util.Wv(cname, '', -63072E6);
                }
            }
            if (!sitesortmap.ContainsKey(t)) {
                sitesortmap.Add(t, ntw);
            } else {
                var curtt = sitesortmap.Get(t);
                curtt.s = s ? s : curtt.s;
                curtt.v += 2;
            }
            if (sitesortmap.Count() > 8) {
                var del = sitesortmap.a[sitesortmap.Count() - 1];
                sitesortmap.Remove(del.t);
            }
            var cvalue = '';
            for (var k = 0, klen = sitesortmap.a.length; k < klen; k++) {
                cvalue += (sitesortmap.a[k].t + '.' + sitesortmap.a[k].s + '.' + sitesortmap.a[k].v + (k == klen - 1 ? '' : '|'));
            }
            cvalue && Ttracker.util.Wv(cname, cvalue, 63072E6);
        },
        view: function (t, s) {
            var tid = Number(t), sku = Number(s), _this = this;
            $.ajax({
                url:'http://diviner.jd.com/cookie?ck='+tid+'.'+sku,
                dataType:'jsonp',
                success:function(json){
                    if (typeof(json)=='object' && json.errCode==0) {
                        _this.util.Wv('atw', '', -63072E6);
                        if (_this.isbook(sku)) {
                            _this.util.Wv('btw', '', -63072E6);
                            _this.util.Wv('bview', '', -63072E6);
                        }
                    }
                }
            });
            $.ajax({
                url:'http://x.jd.com/aview?ck='+tid+'.'+sku,
                dataType:'jsonp',
                success:function(res){
                    if (typeof(res)=='object' && res.errCode==0) {
                        _this.util.Wv('aview', '', -63072E6);
                    }
                }
            });
        }
    };
    Ttracker.util = {
        Wv: function (n, v, t) {
            var d = window.document.domain.indexOf('360buy') >= 0 ? '.360buy.com' : '.jd.com';
            n = n + "=" + v + "; path=/; ";
            t && (n += "expires=" + (new Date(new Date().getTime() + t)).toGMTString() + "; ");
            n += "domain=" + d + ";";
            document.cookie = n
        },
        Vv: function (n) {
            for (var b = [], c = document.cookie.split(";"), n = RegExp("^\\s*" + n + "=\\s*(.*?)\\s*$"), d = 0; d < c.length; d++) {
                var e = c[d]['match'](n);
                e && b.push(e[1])
            }
            return b[0];
        }
    };
    Ttracker.trace();
})();

//JA statisc
(function () {
    var W = window,
        D = document,
        aa = encodeURIComponent,
        bb = decodeURIComponent,
        g = void 0,
        p = "push",
        y = "join",
        s = "split",
        l = "length",
        ind = "indexOf",
        pr = "prototype",
        t = "toLowerCase";
    var JDA = {};
    JDA.util = {
        join: function (args) {
            if (args instanceof Array) {
                var argstring = '';
                for (var i = 0, len = args.length; i < len; i++) {
                    argstring += args[i] + ((i == len - 1) ? '' : '|||');
                }
                return argstring;
            }
            return args;
        },
        getParameter: function (url, name) {
            var f = new RegExp('(?:^|&|[\?]|[\/])' + name + '=([^&]*)');
            var result = f.exec(url);
            return result ? aa(result[1]) : '';
        },
        Wv: function (n, v, d, t) {
            n = n + "=" + v + "; path=/; ";
            t && (n += "expires=" + (new Date(new Date().getTime() + t)).toGMTString() + "; ");
            d && (n += "domain=" + d + ";");
            D.cookie = n
        },
        Vv: function (n) {
            for (var b = [], c = D.cookie[s](";"), name = RegExp("^\\s*" + n + "=\\s*(.*?)\\s*$"), d = 0; d < c[l]; d++) {
                var e = c[d]['match'](name);
                e && b[p](e[1])
            }
            return b;
        }
    };
    var Ba = 0;

    function K(a) {
        return (a ? "_" : "") + Ba++
    }

    var Ca = K(), O = K(), L = K(), Dm = K(), Fa = K(), Ha = K(), Ja = K(), Ia = K(), tn = K(), tl = K(), mp = K(), mr = K(), mh = K(), 
        fl = K(), br = K(), bv = K(), co = K(), cs = K(), cd = K(), ml = K(), je = K(), cr = K(), wb = K(), xb = K(), yb = K(), zb = K(),
        cb = K(), se = K(), usc = K(), ucp = K(), umd = K(), uct = K(), et = K(), tad = K(), ak = K(), pin = K(), pinid=K();
    var lr = function () {
        var c = {};
        this.set = function (a, b) {
            c[a] = b;
        };
        this.get = function (a) {
            return c[a] !== g ? c[a] : null;
        };
        this.m = function (b) {
            var x = this.get(b);
            var y = x == g || x === "" ? 0 : 1 * x;
            c[b] = y + 1;
        };
        this.set(Ca, 'UA-J2011-1');
        var ndo = window.document.domain.indexOf('360buy') >= 0 ? '360buy.com' : 'jd.com';
        this.set(Dm, ndo);
        this.set(L, dh());
        this.set(Fa, Math.round((new Date).getTime() / 1E3));
        this.set(Ha, 15552E6);
        this.set(Ja, 1296E6);
        this.set(Ia, 18E5);
        this.set(fl, Jc());
        var b = bo();
        this.set(br, b.name);
        this.set(bv, b.version);
        this.set(co, os());
        var ci = Hc();
        this.set(cs, ci.D);
        this.set(cd, ci.C);
        this.set(ml, ci.language);
        this.set(je, ci.javaEnabled);
        this.set(cr, ci.characterSet);
        this.set(se, $c);
        this.set(et, new Date().getTime());
        var c_pin = JDA.util.Vv('pin');
        this.set(pin, c_pin[l] ? c_pin[0] : '-');
        var c_pinid = '',tmp_pinid;
        if( (tmp_pinid=JDA.util.Vv('pinId')) && tmp_pinid[l] ) {
            c_pinid = tmp_pinid[0];
        }
        this.set(pinid, c_pinid || '-');
    };
    var $c = "baidu:wd,baidu:word,haosou.com:q,so.com:q,so.360.cn:q,360so.com:q,360sou.com:q,baidu:q1,m.baidu:word,m.baidu:w,wap.soso:key,m.so:q,page.yicha:key,sz.roboo:q,i.easou:q,wap.sogou:keyword,google:q,soso:w,sogou:query,youdao:q,ucweb:keyword,ucweb:word,114so:kw,yahoo:p,yahoo:q,live:q,msn:q,bing:q,aol:query,aol:q,daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,lycos:query,ask:q,netscape:query,cnn:query,about:terms,mamma:q,voila:rdata,virgilio:qs,alice:qs,yandex:text,najdi:q,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,ozu:q,terra:query,rambler:query".split(","),
        fa = function () {
            return Math.round((new Date).getTime() / 1E3);
        },
        pa = function () {
            return Math.round(Math.random() * 2147483647);
        },
        ud = function () {
            return pa() ^ Ic() & 2147483647;
        },
        dh = function () {
            return oa(D.domain);
        },
        Hc = function () {
            var a = {}, b = W.navigator, c = W.screen;
            a.D = c ? c.width + "x" + c.height : "-";
            a.C = c ? c.colorDepth + "-bit" : "-";
            a.language = (b && (b.language || b.browserLanguage) || "-")[t]();
            a.javaEnabled = b && b.javaEnabled() ? 1 : 0;
            a.characterSet = D.characterSet || D.charset || "-";
            return a;
        },
        Jc = function () {
            var b, c, d, e;
            d = "ShockwaveFlash";
            if ((b = (b = window.navigator) ? b.plugins : g) && b[l] > 0)
                for (c = 0; c < b[l] && !e; c++)
                    d = b[c], d['name'][ind]("Shockwave Flash") > -1 && (e = d.description[s]("Shockwave Flash ")[1]);
            else {
                d = d + "." + d;
                try {
                    c = new ActiveXObject(d + ".7"), e = c.GetVariable("$version")
                } catch (f) {
                }
                if (!e) try {
                    c = new ActiveXObject(d + ".6"), e = "WIN 6,0,21,0", c.AllowScriptAccess = "always", e = c.GetVariable("$version")
                } catch (i) {
                }
                if (!e) try {
                    c = new ActiveXObject(d), e = c.GetVariable("$version")
                } catch (m) {
                }
                e && (e = e[s](" ")[1][s](","), e = e[0] + "." + e[1] + " r" + e[2])
            }
            var _r2 = JDA.util.Vv('_r2');
            b = e ? (e + (_r2[l] > 0 ? ("_" + _r2[0]) : "")) : "-";
            var limgs = JDA.util.Vv('limgs');
            b = b + (limgs[l] > 0 ? ("_" + limgs[0]) : "");
            return b;
        },
        C = function (a) {
            return g == a || "-" == a || "" == a
        },
        oa = function (a) {
            var b = 1, c = 0, d;
            if (!C(a)) {
                b = 0;
                for (d = a[l] - 1; d >= 0; d--)
                    c = a.charCodeAt(d), b = (b << 6 & 268435455) + c + (c << 14), c = b & 266338304, b = c != 0 ? b ^ c >> 21 : b
            }
            return b
        },
        Ic = function () {
            var Fc = Hc();
            for (var a = Fc, b = W.navigator, a = b.appName + b.version + a.language + b.platform + b.userAgent + a.javaEnabled + a.D + a.C + (D.cookie ? D.cookie : "") + (D.referrer ? D.referrer : ""), b = a.length, c = W.history.length; c > 0;)
                a += c-- ^ b++;
            return oa(a);
        },
        bo = function () {
            var b = { name: "other", version: "0" }, ua = navigator.userAgent.toLowerCase();
            browserRegExp = {
                se360: /360se/,
                se360_2x: /qihu/,
                ie: /msie[ ]([\w.]+)/,
                firefox: /firefox[|\/]([\w.]+)/,
                chrome: /chrome[|\/]([\w.]+)/,
                safari: /version[|\/]([\w.]+)(\s\w.+)?\s?safari/,
                opera: /opera[|\/]([\w.]+)/
            };
            for (var i in browserRegExp) {
                var match = browserRegExp[i].exec(ua);
                if (match) {
                    b.name = i;
                    b.version = match[1] || "0";
                    break;
                }
            }
            return b;
        },
        os = function () {
            var o = /(win|android|linux|nokia|ipad|iphone|ipod|mac|sunos|solaris)/.exec(navigator.platform.toLowerCase());
            return o == null ? "other" : o[0];
        },
        jwo = function () {
            var jwov = '', cookienames = ['jwotest_product', 'jwotest_list', 'jwotest_cart', 'jwotest_orderinfo', 'jwotest_homepage', 'jwotest_other1', 'jwotest_other2', 'jwotest_other3'];
            for (var i = 0, len = cookienames.length; i < len; i++) {
                var cooks = JDA.util.Vv(cookienames[i]);
                if (cooks[l] == 0) continue;
                var matchs = bb(cooks[0]).match(/=(.*?)&/gi), wovs = [];
                if (matchs == null) continue;
                $.each(matchs, function (j, m) {
                    wovs.push(j == 0 ? "T" + m.substring(1, m.length - 1) : m.substring(1, m.length - 1));
                });
                jwov += wovs[y]('-') + ';';
            }
            return jwov;
        },
        gc = function (a) {
            a.set(tn, D.location.hostname);
            a.set(tl, D.title.replace(/\$/g, ''));
            a.set(mp, D.location.pathname);
            a.set(mr, D.referrer.replace(/\$/g, ''));
            a.set(mh, D.location.href);
            var jda = JDA.util.Vv('__jda'), da = jda[l] > 0 ? jda[0][s]('.') : null;
            a.set(O, da && !C(da[1]) ? da[1] : ud());
            a.set(wb, da ? da[2] : a.get(Fa));
            a.set(xb, da ? da[3] : a.get(Fa));
            a.set(yb, da ? da[4] : a.get(Fa));
            a.set(zb, da ? da[5] : 1);
            var jdz = JDA.util.Vv('__jdv'), dz = jdz[l] > 0 ? jdz[0][s]('|') : null, step = dz && dz.length==5 ? 1 : 0;
            a.set(usc, dz ? dz[0+step] : 'direct');
            a.set(ucp, dz ? dz[1+step] : '-');
            a.set(umd, dz ? dz[2+step] : 'none');
            a.set(uct, dz ? dz[3+step] : '-');
            var jdb = JDA.util.Vv('__jdb'), db = jdb[l] > 0 ? jdb[0][s]('.') : null, step = db && db.length==4 ? 1 : 0;
            a.set(cb, db ? db[0+step] : 0);
            a.set(tad, jwo() || '-');
            var clkid = JA.util.Vv('clickid'), clk = clkid[l] && clkid[0];
            a.set(ak, clk);
            return !0;
        },
        ge = function () {
            var jdb = JDA.util.Vv('__jdb'), db = jdb[l] > 0 ? jdb[0][s]('.') : null;
            if (db && db.length==1) {
                return db[0] * 1;
            } else if (db && db.length == 4) {
                return db[1] * 1;
            } else {
                return 0;
            }
        },
        gd = function (a) {
            var hrf = D.location.search, rfr = D.referrer, d = a.get(Dm), utsr = JDA.util.getParameter(hrf, 'utm_source'), umz = [], z1 = a.get(usc), z2 = a.get(ucp), z3 = a.get(umd), isnewsession = JDA.util.Vv('__jdb')[l] == 0;
            if (utsr) {
                var camp = JDA.util.getParameter(hrf, 'utm_campaign'), medi = JDA.util.getParameter(hrf, 'utm_medium'), term = JDA.util.getParameter(hrf, 'utm_term');
                umz[p](utsr);
                umz[p](camp || '-');
                umz[p](medi || '-');
                umz[p](term || 'not set');
                a.set(uct, umz[3]);
            } else {
                var rdomain = rfr && rfr[s]('/')[2], b = false;
                if (rdomain && rdomain[ind](d) < 0) {
                    for (var ss = a.get(se), i = 0; i < ss.length; i++) {
                        var e = ss[i][s](':');
                        if (rdomain[ind](e[0][t]()) > -1 && rfr[ind]((e[1] + "=")[t]()) > -1) {
                            var x = JDA.util.getParameter(rfr, e[1]);
                            umz[p](e[0]);
                            umz[p]('-');
                            umz[p]('organic');
                            umz[p](x || 'not set');
                            a.set(uct, umz[3]);
                            b = true;
                            break;
                        }
                    }
                    if (!b) {
                        if (rdomain[ind]('zol.com.cn') > -1) {
                            umz[p]('zol.com.cn');
                            umz[p]('-');
                            umz[p]('cpc');
                            umz[p]('not set');
                        } else {
                            umz[p](rdomain);
                            umz[p]('-');
                            umz[p]('referral');
                            umz[p]('-');
                        }
                    }
                }
            }
            if (isnewsession || (!isnewsession && umz[l] > 0 && (umz[0] !== z1 || umz[1] !== z2 || umz[2] !== z3) && umz[2] !== 'referral')) {
                a.set(usc, umz[0] || a.get(usc));
                a.set(ucp, umz[1] || a.get(ucp));
                a.set(umd, umz[2] || a.get(umd));
                a.set(uct, umz[3] || a.get(uct));
                ta(a);
            } else {
                Rc(a);
            }
        },
        Xc = function (a, b) {//visit+1
            var u = b.split('.');
            a.set(wb, u[2]);
            a.set(xb, u[4]);
            a.set(yb, fa());
            a.m(zb);
            a.set(cb, 1);
        },
        Wc = function (a) {
            var b = a.get(Fa);
            a.set(O, ud());
            a.set(wb, b);
            a.set(xb, b);
            a.set(yb, b);
            a.set(zb, 1);
            a.set(cb, 1);
        },
        Rc = function (a) {//pv+1
            a.m(cb);
        },
        pc = function (a) {
            return [a.get(L), a.get(O) || '-', a.get(wb) || '-', a.get(xb) || '-', a.get(yb) || '-', a.get(zb) || 1][y]('.');
        },
        qc = function (a) {
            return [a.get(L), a.get(cb) || 1, a.get(O) + '|' + a.get(zb) || 1, a.get(yb) || a.get(Fa)][y]('.');
        },
        vc = function (a) {
            return [a.get(L), a.get(usc) || D.domain, a.get(ucp) || '(direct)', a.get(umd) || 'direct', a.get(uct) || '-'][y]('|');
        },
        ta = function (a) {
            var ma = JDA.util.Vv('__jda');
            ma.length == 0 ? Wc(a) : Xc(a, ma[0]);
        };
    var ja = new lr(),
        zd = function () {
            this.a = {};
            this.add = function (b, c) {
                this.a[b] = c;
            };
            this.get = function (b) {
                return this.a[b];
            };
            this.toString = function () {
                return this.a[y]("&")
            };
        },
        Ed = function (a, b) {
            b.add('jdac', a.get(Ca)), b.add('jduid', a.get(O)), b.add('jdsid', a.get(O) + "|" + a.get(zb)), b.add("jdje", a.get(je)), b.add("jdsc", a.get(cd)), b.add("jdsr", a.get(cs)), b.add("jdul", a.get(ml)), b.add("jdcs", a.get(cr)), b.add("jddt", a.get(tl) || '-'), b.add("jdmr", aa(a.get(mr))), b.add("jdhn", a.get(tn) || '-'), b.add("jdfl", a.get(fl)), b.add("jdos", a.get(co)), b.add("jdbr", a.get(br)), b.add("jdbv", a.get(bv)), b.add('jdwb', a.get(wb)), b.add('jdxb', a.get(xb)), b.add('jdyb', a.get(yb)), b.add('jdzb', a.get(zb)), b.add('jdcb', a.get(cb)), b.add('jdusc', a.get(usc) || 'direct'), b.add('jducp', a.get(ucp) || '-'), b.add('jdumd', a.get(umd) || '-'), b.add('jduct', a.get(uct) || '-'), b.add('jdlt', typeof jdpts != 'object' ? 0 : jdpts._st == undefined ? 0 : a.get(et) - jdpts._st), b.add('jdtad', a.get(tad)), b.add('jdak', a.get(ak)), b.add('pinid', a.get(pinid));
        },
        Ad = function (a, b, tad, step) {
            b.add('jdac', a.get(Ca)), b.add('jduid', a.get(O)), b.add('jdsid', a.get(O) + "|" + a.get(zb)), b.add("jdje", '-'), b.add("jdsc", '-'), b.add("jdsr", '-'), b.add("jdul", '-'), b.add("jdcs", '-'), b.add("jddt", '-'), b.add("jdmr", aa(a.get(mr))), b.add("jdhn", '-'), b.add("jdfl", '-'), b.add("jdos", '-'), b.add("jdbr", '-'), b.add("jdbv", '-'), b.add('jdwb', '-'), b.add('jdxb', '-'), b.add('jdyb', '-'), b.add('jdzb', a.get(zb)), b.add('jdcb', step ? (ge() + step) : a.get(cb)), b.add('jdusc', '-'), b.add('jducp', '-'), b.add('jdumd', '-'), b.add('jduct', '-'), b.add('jdlt', 0), b.add('jdtad', tad), b.add('jdak', a.get(ak)), b.add('pinid', a.get(pinid));
        },
        St = function () {
            gc(ja) && gd(ja);
            var c = new zd(), d = ja.get(Dm);
            Ed(ja, c);
            JDA.util.Wv("__jda", pc(ja), d, ja.get(Ha));
            JDA.util.Wv("__jdb", qc(ja), d, ja.get(Ia));
            JDA.util.Wv("__jdc", ja.get(L), d);
            JDA.util.Wv("__jdv", vc(ja), d, ja.get(Ja));
            JDA.util.Wv("clickid", '0', d, -846E5);
            return c.a;
        },
        Nt = function () {
            var c = new zd();
            Ed(ja, c);
            return c.a;
        },
        At = function (ad_data, step) {
            var c = new zd();
            Ad(ja, c, ad_data, step);
            return c.a;
        };
    JDA.tracker = {
        sendOld: function (t1, t2, cs, data) {
            var ps = cs && (cs.jdac + '||' + cs.jdje + '||' + cs.jdsc + '||' + cs.jdsr + '||' + cs.jdul + '||' + cs.jdcs + '||' + aa(cs.jddt) + '||' + cs.jdhn + '||' + cs.jdfl + '||' + cs.jdos + '||' + cs.jdbr + '||' + cs.jdbv + '||' + cs.jdwb + '||' + cs.jdxb + '||' + cs.jdyb + '||' + cs.jdzb + '||' + cs.jdcb + '||' + cs.jdusc + '||' + cs.jducp + '||' + cs.jdumd + '||' + cs.jduct + '||' + cs.jdlt + '||' + cs.jdtad );
            if(ps){ ps += '||' + aa(cs.pinid); }
            var cscuri = ("https:" == document.location.protocol ? "https://cscssl" : "http://csc") + ".jd.com/log.ashx"
                + "?type1=" + aa(t1)
                + "&type2=" + aa(t2)
                + "&pin=" + aa(ja.get(pin))
                + "&uuid=" + cs.jduid
                + "&sid=" + cs.jdsid
                + (cs.jdak ? ("&utmp=" + document.location.href + aa('&clickid=' + cs.jdak)) : '')
                + "&referrer=" + aa(cs.jdmr || '-')
                + "&jinfo=" + ps
                + "&data=" + aa(data)
                + "&callback=?";
            $.getJSON(cscuri, function () {});
        },
        sendNew: function (t, vsstring) {
            var cs = Nt();
            var traceurl = ("https:" == document.location.protocol ? "https://mercuryssl" : "http://mercury") + ".jd.com/log.gif"
                + "?t=" + t
                + "&m=" + ja.get(Ca)
                + "&pin=" + aa(ja.get(pin))
                + "&uid=" + cs.jduid
                + "&sid=" + cs.jdsid
                + (cs.jdak ? ("&cul=" + document.location.href + aa('&clickid=' + cs.jdak)) : '')
                + "&v=" + aa(vsstring)
                + "&ref=" + aa(D.referrer)
                + "&rm=" + (new Date).getTime();
            var d = new Image(1, 1);
            d.src = traceurl;
            d.onload = function () { d.onload = null; d.onerror = null; };
            d.onerror = function () { d.onload = null; d.onerror = null; };
        },
        ngloader: function (t, vs) {
            var vsstring = "";
            for (var v in vs) {
                vsstring += ((v + "=" + vs[v]) + "$");
            }
            vsstring += 'pinid='+ja.get(pinid)+ "$";
            vsstring = vsstring.substring(0, vsstring.length - 1);
            this.sendNew(t, vsstring);
        },
        ngloaderJSON : function(t, obj){
            obj['pinid'] = ja.get(pinid);
            this.sendNew(t, $.toJSON(obj));
        },
        bloading: function (t1, t2, data) {
            var me = St();
            this.loading(t1, t2, me, data);
            var mejson = { je: me.jdje, sc: me.jdsc, sr: me.jdsr, ul: me.jdul, cs: me.jdcs, dt: me.jddt, hn: me.jdhn, fl: me.jdfl, os: me.jdos, br: me.jdbr, bv: me.jdbv, wb: me.jdwb, xb: me.jdxb, yb: me.jdyb, zb: me.jdzb, cb: me.jdcb, usc: me.jdusc, ucp: me.jducp, umd: me.jdumd, uct: me.jduct, lt: me.jdlt, ct: data, tad: me.jdtad};
            this.ngloader('www.100000', mejson);
            //log js version
            (me.jduid%1000)===1 && this.ngloader('jsver.000000', { jsfile: 'wl', jsver: '20141223'});
        },
        loading: function (t1, t2, cs, data) {
            this.sendOld(t1, t2, cs, JA.util.join(data));
        },
        aloading: function (t1, t2, data) {
            var cs = Nt();
            this.loading(t1, t2, cs, data);
        },
        aloadingJSON: function (t1, t2, data) {
            var cs = Nt();
            this.sendOld(t1, t2, cs, $.toJSON(data));
        },
        adshow: function (data) {
            var cs = At(data);
            this.loading('AD', 'IM', cs, '');
        },
        adclick: function (data) {
            var cs = At(data, 1);
            this.loading('AD', 'CL', cs, '');
        }
    };
    window.JA = JDA;
    JDA.tracker.bloading('J', 'A', new Date().getTime());
    var ebook = $('.w .crumb a').length === 5 && /e.jd.com\/products\/(\d*)-(\d*)-(\d*).html[\w\W]*?e.jd.com\/(\d*).html/.exec($('.w .crumb').html());
    if ((window.pageConfig && window.pageConfig.product && window.pageConfig.product.cat) || ebook) {
        JDA.tracker.ngloader('item.010001', { sku: ebook[4] || window.pageConfig.product.skuid,
            cid1: ebook[1] || window.pageConfig.product.cat[0],
            cid2: ebook[2] || window.pageConfig.product.cat[1],
            cid3: ebook[3] || window.pageConfig.product.cat[2],
            brand: ebook ? '0' : window.pageConfig.product.brand});
    }
    (function () {
        //ordered
        if (isChecked()) {
            SucInfoMethod.Init();
            var _dist = getCookie('_distM');
            if (_dist && _dist == SucInfo_OrderId) {
                return true;
            }
            var hps = ["p000", "p100", "np000", "np100"];
            for (var i = 0; i < hps.length; i++) {
                var hpsm = getCookie(hps[i]);
                if (hpsm != null && hpsm != "") {
                    log('HomePageOrder', hps[i]);
                }
            }
            var rs = "1:2:3:4:5:1a:1b:BR1:BR2:BR3:BR4:BR5:DDR:GR1:GR2:GR3:GR4:VR1:VR2:VR3:VR4:VR5:NR:CR1:CR2:CR3:SR1:SR2:SR3:SR4:Indiv&Simi:Indiv&OthC:Indiv&AllC:Zd";
            simpleMold(rs.split(":"), 'R', 'reWids', '4');

            var reCookieNames = "Club,ThirdRec,AttRec,OCRec,SORec,EBRec,BookSpecial,BookTrack,BookHis,Coupon,GlobalTrack,GlobalHis,History,historyreco_s,historyreco_c";
            complexMold(reCookieNames.split(','), 'R', 'reWids', '4');
            //rod
            var rods = ["v", "TrackRec", "TrackHis", "CouDan", "CarAcc", "Zd", "Tc", "g", "s", "Book", "BookSpecial", "BookTrack", "BookHis", "GlobalTrack", "GlobalHis", "History", "Hiss", "Hisc", "simi", "GThirdRec", "PtoAccy", "AtoAccy"];
            complexMold(rods, 'o', 'rod', 'd', true);
            //home
            RecommendTrans("reHome2012,_rtbook", "N", '4');
            //reClickCube
            complexMold(["_rdCube"], 'Cube', '', '4');
            simpleMold(["SEO"], 'S', 'seWids', '4');

            setCookieMills('_distM', SucInfo_OrderId, 86400000);
            setCookieMills("_ghis", "", -1);
            log('7', '2', SucInfo_OrderId, SucInfo_OrderType, SucInfo_OrderDetail);
            JA && JA.tracker.ngloader('order.100000', { orderid: SucInfo_OrderId, ordertype: SucInfo_OrderType, orderdetail: SucInfo_OrderDetail })
        }
    })();
})();
function log(type1, type2) {
    var args = Array.prototype.slice.call(arguments);
    args = args && args.slice(2);
    JA && JA.tracker.aloading(type1, type2, args);
    JA && JA.tracker.ngloader('other.000000', { t1: type1, t2: type2, p0: JA.util.join(args) });
}
function logJSON(type1, type2, obj) {
    if(!JA)  return !1;
    JA.tracker.aloadingJSON(type1, type2, obj);
    JA.tracker.ngloaderJSON('other.000000', { t1: type1, t2: type2, p0: obj });
}
(function () {
    if (typeof jdpts != "object") {
        return;
    }
    if (jdpts._cls) {
        log(jdpts._cls.split(".")[0], jdpts._cls.split(".")[1]);
    }
})();
Clublog();
