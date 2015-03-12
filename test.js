(function() {
    var h = {},
        mt = {},
        c = {
            id: "e9e114d958ea263de46e080563e254c4",
            dm: ["news.baidu.com"],
            js: "tongji.baidu.com/hm-web/js/",
            etrk: [],icon: '',
            ctrk: true,
            align: 1,
            nv: -1,
            vdur: 1800000,
            age: 31536000000,
            rec: 0,
            rp: [],
            trust: 0,
            vcard: 0,
            qiao: 0,
            lxb: 0,
            conv: 0,
            apps: ''
        };
    var p = !0, q = null, r = !1;
    mt.g = {};
    mt.g.ua = /msie (\d+\.\d+)/i.test(navigator.userAgent);
    mt.g.cookieEnabled = navigator.cookieEnabled;
    mt.g.javaEnabled = navigator.javaEnabled();
    mt.g.language = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "";
    mt.g.wa = (window.screen.width || 0) + "x" + (window.screen.height || 0);
    mt.g.colorDepth = window.screen.colorDepth || 0;
    mt.cookie = {};
    mt.cookie.set = function(a, b, f) {
        var d;
        f.D && (d = new Date, d.setTime(d.getTime() + f.D));
        document.cookie = a + "=" + b + (f.domain ? "; domain=" + f.domain : "") + (f.path ? "; path=" + f.path : "") + (d ? "; expires=" + d.toGMTString() : "") + (f.Ka ? "; secure" : "")
    };
    mt.cookie.get = function(a) {
        return (a = RegExp("(^| )" + a + "=([^;]*)(;|$)").exec(document.cookie)) ? a[2] : q
    };
    mt.p = {};
    //id获取元素
    mt.p.Ca = function(a) {
        return document.getElementById(a)
    };
    //获取a元素的直接子节点
    mt.p.ha = function(a) {
        var b;
        for (b = "A"; (a = a.parentNode) && 1 == a.nodeType; )
            if (a.tagName == b)
                return a;
        return q
    };
    //事件加载
    (mt.p.Ja = function() {
        function a() {
            //只执行一次，d为函数数组
            if (!a.t) {
                a.t = p;
                for (var b = 0, g = d.length; b < g; b++)
                    d[b]()
            }
        }
            //多重事件，ie
        function b() {
            try {
                document.documentElement.doScroll("left")
            } catch (d) {
                setTimeout(b, 1);
                return
            }
            a()
        }
        var f = r, d = [], g;
        document.addEventListener ? g = function() {
            document.removeEventListener("DOMContentLoaded", g, r);
            a()
        } : document.attachEvent && (g = function() {
            "complete" === document.readyState && (document.detachEvent("onreadystatechange", g), a())
        });
        (function() {
            if (!f)
                if (f = p, "complete" === document.readyState)
                    a.t = p;
                else if (document.addEventListener)
                    document.addEventListener("DOMContentLoaded",
                        g, r), window.addEventListener("load", a, r);
                else if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", g);
                    window.attachEvent("onload", a);
                    var d = r;
                    try {
                        d = window.frameElement == q
                    } catch (m) {
                    }
                    document.documentElement.doScroll && d && b()
                }
        })();
        return function(b) {
            a.t ? b() : d.push(b)
        }
    }()).t = r;
    mt.event = {};
    mt.event.d = function(a, b, f) {
        a.attachEvent ? a.attachEvent("on" + b, function(d) {
            f.call(a, d)
        }) : a.addEventListener && a.addEventListener(b, f, r)
    };
    mt.event.preventDefault = function(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = r
    };
    mt.n = {};
    mt.n.parse = function() {
        return (new Function('return (" + source + ")'))()
    };
    mt.n.stringify = function() {
        function a(a) {
            /["\\\x00-\x1f]/.test(a) && (a = a.replace(/["\\\x00-\x1f]/g, function(a) {
                var b = f[a];
                if (b)
                    return b;
                b = a.charCodeAt();
                return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
            }));
            return '"' + a + '"'
        }
        function b(a) {
            return 10 > a ? "0" + a : a
        }
        var f = {"\b": "\\b","\t": "\\t","\n": "\\n","\f": "\\f","\r": "\\r",'"': '\\"',"\\": "\\\\"};
        return function(d) {
            switch (typeof d) {
                case "undefined":
                    return "undefined";
                case "number":
                    return isFinite(d) ? String(d) : "null";
                case "string":
                    return a(d);
                case "boolean":
                    return String(d);
                default:
                    if (d === q)
                        return "null";
                    if (d instanceof Array) {
                        var g = ["["], f = d.length, m, e, k;
                        for (e = 0; e < f; e++)
                            switch (k = d[e], typeof k) {
                                case "undefined":
                                case "function":
                                case "unknown":
                                    break;
                                default:
                                    m && g.push(","), g.push(mt.n.stringify(k)), m = 1
                            }
                        g.push("]");
                        return g.join("")
                    }
                    if (d instanceof Date)
                        return '"' + d.getFullYear() + "-" + b(d.getMonth() + 1) + "-" + b(d.getDate()) + "T" + b(d.getHours()) + ":" + b(d.getMinutes()) + ":" + b(d.getSeconds()) + '"';
                    m = ["{"];
                    e = mt.n.stringify;
                    for (f in d)
                        if (Object.prototype.hasOwnProperty.call(d, f))
                            switch (k =
                                d[f], typeof k) {
                                case "undefined":
                                case "unknown":
                                case "function":
                                    break;
                                default:
                                    g && m.push(","), g = 1, m.push(e(f) + ":" + e(k))
                            }
                    m.push("}");
                    return m.join("")
            }
        }
    }();
    mt.lang = {};
    mt.lang.e = function(a, b) {
        return "[object " + b + "]" === {}.toString.call(a)
    };
    mt.lang.Ga = function(a) {
        return mt.lang.e(a, "Number") && isFinite(a)
    };
    mt.lang.Ia = function(a) {
        return mt.lang.e(a, "String")
    };
    mt.localStorage = {};
    mt.localStorage.A = function() {
        if (!mt.localStorage.f)
            try {
                mt.localStorage.f = document.createElement("input"), mt.localStorage.f.type = "hidden", mt.localStorage.f.style.display = "none", mt.localStorage.f.addBehavior("#default#userData"), document.getElementsByTagName("head")[0].appendChild(mt.localStorage.f)
            } catch (a) {
                return r
            }
        return p
    };
    mt.localStorage.set = function(a, b, f) {
        var d = new Date;
        d.setTime(d.getTime() + f || 31536E6);
        try {
            window.localStorage ? (b = d.getTime() + "|" + b, window.localStorage.setItem(a, b)) : mt.localStorage.A() && (mt.localStorage.f.expires = d.toUTCString(), mt.localStorage.f.load(document.location.hostname), mt.localStorage.f.setAttribute(a, b), mt.localStorage.f.save(document.location.hostname))
        } catch (g) {
        }
    };
    mt.localStorage.get = function(a) {
        if (window.localStorage) {
            if (a = window.localStorage.getItem(a)) {
                var b = a.indexOf("|"), f = a.substring(0, b) - 0;
                if (f && f > (new Date).getTime())
                    return a.substring(b + 1)
            }
        } else if (mt.localStorage.A())
            try {
                return mt.localStorage.f.load(document.location.hostname), mt.localStorage.f.getAttribute(a)
            } catch (d) {
            }
        return q
    };
    mt.localStorage.remove = function(a) {
        if (window.localStorage)
            window.localStorage.removeItem(a);
        else if (mt.localStorage.A())
            try {
                mt.localStorage.f.load(document.location.hostname), mt.localStorage.f.removeAttribute(a), mt.localStorage.f.save(document.location.hostname)
            } catch (b) {
            }
    };
    mt.sessionStorage = {};
    mt.sessionStorage.set = function(a, b) {
        if (window.sessionStorage)
            try {
                window.sessionStorage.setItem(a, b)
            } catch (f) {
            }
    };
    mt.sessionStorage.get = function(a) {
        return window.sessionStorage ? window.sessionStorage.getItem(a) : q
    };
    mt.sessionStorage.remove = function(a) {
        window.sessionStorage && window.sessionStorage.removeItem(a)
    };
    mt.L = {};
    mt.L.log = function(a, b) {
        var f = new Image, d = "mini_tangram_log_" + Math.floor(2147483648 * Math.random()).toString(36);
        window[d] = f;
        f.onload = f.onerror = f.onabort = function() {
            f.onload = f.onerror = f.onabort = q;
            f = window[d] = q;
            b && b(a)
        };
        f.src = a
    };
    mt.M = {};
    //获取flash版本
    mt.M.oa = function() {
        var a = "";
        if (navigator.plugins && navigator.mimeTypes.length) {
            var b = navigator.plugins["Shockwave Flash"];
            b && b.description && (a = b.description.replace(/^.*\s+(\S+)\s+\S+$/, "$1"))
        } else if (window.ActiveXObject)
            try {
                if (b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))
                    (a = b.GetVariable("$version")) && (a = a.replace(/^.*\s+(\d+),(\d+).*$/, "$1.$2"))
            } catch (f) {
            }
        return a
    };
    mt.M.Ba = function(a, b, f, d, g) {
        return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="' + a + '" width="' + f + '" height="' + d + '"><param name="movie" value="' + b + '" /><param name="flashvars" value="' + (g || "") + '" /><param name="allowscriptaccess" value="always" /><embed type="application/x-shockwave-flash" name="' + a + '" width="' + f + '" height="' + d + '" src="' + b + '" flashvars="' + (g || "") + '" allowscriptaccess="always" /></object>'
    };
    mt.url = {};
    //获取url参数
    mt.url.k = function(a, b) {
        var f = a.match(RegExp("(^|&|\\?|#)(" + b + ")=([^&#]*)(&|$|#)", ""));
        return f ? f[3] : q
    };
    //获取协议
    mt.url.Ea = function(a) {
        return (a = a.match(/^(https?:)\/\//)) ? a[1] : q
    };
    //获取主域
    mt.url.la = function(a) {
        return (a = a.match(/^(https?:\/\/)?([^\/\?#]*)/)) ? a[2].replace(/.*@/, "") : q
    };
    //去掉端口号
    mt.url.P = function(a) {
        return (a = mt.url.la(a)) ? a.replace(/:\d+$/, "") : a
    };
    //路径
    mt.url.Da = function(a) {
        return (a = a.match(/^(https?:\/\/)?[^\/]*(.*)/)) ? a[2].replace(/[\?#].*/, "").replace(/^$/, "/") : q
    };
    h.B = {
        Fa: "http://tongji.baidu.com/hm-web/welcome/ico",
        J: "hm.baidu.com/hm.gif",
        Y: "baidu.com",
        ra: "hmmd",
        sa: "hmpl",
        qa: "hmkw",
        pa: "hmci",
        ta: "hmsr",
        l: 0,
        i: Math.round(+new Date / 1E3),
        protocol: "https:" == document.location.protocol ? "https:" : "http:",
        Ha: 0,
        ca: 6E5,
        da: 10,
        N: 1024,
        ba: 1,
        m: 2147483647,
        V: "cc cf ci ck cl cm cp cw ds ep et fl ja ln lo lt nv rnd si st su v cv lv api tt u".split(" ")
    };

    //函数队列
    (function() {
        var a = {j: {},d: function(a, f) {
            this.j[a] = this.j[a] || [];
            this.j[a].push(f)
        },q: function(a, f) {
            this.j[a] = this.j[a] || [];
            for (var d = this.j[a].length, g = 0; g < d; g++)
                this.j[a][g](f)
        }};
        return h.r = a
    })();
    //异步加载js
    (function() {
        function a(a, d) {
            var g = document.createElement("script");
            g.charset = "utf-8";
            b.e(d, "Function") && (g.readyState ? g.onreadystatechange = function() {
                if ("loaded" === g.readyState || "complete" === g.readyState)
                    g.onreadystatechange = q, d()
            } : g.onload = function() {
                d()
            });
            g.src = a;
            var n = document.getElementsByTagName("script")[0];
            n.parentNode.insertBefore(g, n)
        }
        var b = mt.lang;
        return h.load = a
    })();
    (function() {
        var a = mt.p, b = mt.event, f = mt.g, d = h.B, g = [],
        n = {
            W: function() {
                c.ctrk && (b.d(document, "mouseup", n.aa()), b.d(window, "unload", function() {
                    n.w()
                }), setInterval(function() {
                    n.w()
                }, d.ca))
            },
            aa: function() {
                return function(a) {
                    a = n.ia(a);
                    if ("" !== a) {
                        var b = (d.protocol + "//" + d.J + "?" + h.b.U().replace(/ep=[^&]*/, "ep=" + encodeURIComponent("[" + a + "]"))).length;
                        b + (d.m + "").length > d.N || (b + encodeURIComponent(g.join(",") + (g.length ? "," : "")).length + (d.m + "").length > d.N && n.w(), g.push(a), (g.length >= d.da || /t:a/.test(a)) && n.w())
                    }
                }
            },
            ia: function(b) {
                if (0 === d.ba) {
                    var e = b.target || b.srcElement, k = e.tagName.toLowerCase();
                    if ("embed" == k || "object" == k)
                        return ""
                }
                f.ua ? (e = Math.max(document.documentElement.scrollTop, document.body.scrollTop), k = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft), k = b.clientX + k, e = b.clientY + e) : (k = b.pageX, e = b.pageY);
                var l = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;
                switch (c.align) {
                    case 1:
                        k -= l / 2;
                        break;
                    case 2:
                        k -= l
                }
                k = "{x:" + k + ",y:" + e + ",";
                e = b.target || b.srcElement;
                return k = (b = "a" == e.tagName.toLowerCase() ? e : a.ha(e)) ? k + ("t:a,u:" + encodeURIComponent(b.href) + "}") : k + "t:b}"
            },w: function() {
                0 !== g.length && (h.b.a.et = 2, h.b.a.ep = "[" + g.join(",") + "]", h.b.h(), g = [])
            }
        };
        h.r.d("pv-b", n.W);
        return n
    })();

    (function() {
        function a() {
            return function() {
                h.b.a.nv = 0;
                h.b.a.st = 4;
                h.b.a.et = 3;
                h.b.a.ep = h.C.ma() + "," + h.C.ka();
                h.b.h()
            }
        }
        function b() {
            clearTimeout(x);
            var a;
            w && (a = "visible" == document[w]);
            y && (a = !document[y]);
            e = "undefined" == typeof a ? p : a;
            if ((!m || !k) && e && l)
                u = p, t = +new Date;
            else if (m && k && (!e || !l))
                u = r, s += +new Date - t;
            m = e;
            k = l;
            x = setTimeout(b, 100)
        }
        //document属性，兼容
        function f(a) {
            var k = document, b = "";
            if (a in k)
                b = a;
            else
                for (var t = ["webkit", "ms", "moz", "o"], d = 0; d < t.length; d++) {
                    var s = t[d] + a.charAt(0).toUpperCase() + a.slice(1);
                    if (s in k) {
                        b =
                            s;
                        break
                    }
                }
            return b
        }
        function d(a) {
            if (!("focus" == a.type || "blur" == a.type) || !(a.target && a.target != window))
                l = "focus" == a.type || "focusin" == a.type ? p : r, b()
        }
        var g = mt.event, n = h.r, m = p, e = p, k = p, l = p, v = +new Date, t = v, s = 0, u = p, w = f("visibilityState"), y = f("hidden"), x;
        b();
        (function() {
            var a = w.replace(/[vV]isibilityState/, "visibilitychange");
            g.d(document, a, b);
            g.d(window, "pageshow", b);
            g.d(window, "pagehide", b);
            "object" == typeof document.onfocusin ? (g.d(document, "focusin", d), g.d(document, "focusout", d)) : (g.d(window, "focus", d),
                g.d(window, "blur", d))
        })();
        h.C = {ma: function() {
            return +new Date - v
        },ka: function() {
            return u ? +new Date - t + s : s
        }};
        n.d("pv-b", function() {
            g.d(window, "unload", a())
        });
        return h.C
    })();
    (function() {
        function a(k) {
            for (var b in k)
                if ({}.hasOwnProperty.call(k, b)) {
                    var e = k[b];
                    d.e(e, "Object") || d.e(e, "Array") ? a(e) : k[b] = String(e)
                }
        }
        function b(a) {
            return a.replace ? a.replace(/'/g, "'0").replace(/\*/g, "'1").replace(/!/g, "'2") : a
        }
        var f = mt.L, d = mt.lang, g = mt.n, n = h.B, m = h.r, e = {Q: q,o: [],z: 0,R: r,init: function() {
            e.c = 0;
            e.Q = {push: function() {
                e.I.apply(e, arguments)
            }};
            m.d("pv-b", function() {
                e.ea();
                e.fa()
            });
            m.d("pv-d", e.ga);
            m.d("stag-b", function() {
                h.b.a.api = e.c || e.z ? e.c + "_" + e.z : ""
            });
            m.d("stag-d", function() {
                h.b.a.api =
                    0;
                e.c = 0;
                e.z = 0
            })
        },ea: function() {
            var a = window._hmt;
            if (a && a.length)
                for (var b = 0; b < a.length; b++) {
                    var d = a[b];
                    switch (d[0]) {
                        case "_setAccount":
                            1 < d.length && /^[0-9a-z]{32}$/.test(d[1]) && (e.c |= 1, window._bdhm_account = d[1]);
                            break;
                        case "_setAutoPageview":
                            if (1 < d.length && (d = d[1], r === d || p === d))
                                e.c |= 2, window._bdhm_autoPageview = d
                    }
                }
        },fa: function() {
            if ("undefined" === typeof window._bdhm_account || window._bdhm_account === c.id) {
                window._bdhm_account = c.id;
                var a = window._hmt;
                if (a && a.length)
                    for (var b = 0, f = a.length; b < f; b++)
                        d.e(a[b],
                            "Array") && "_trackEvent" !== a[b][0] && "_trackRTEvent" !== a[b][0] ? e.I(a[b]) : e.o.push(a[b]);
                window._hmt = e.Q
            }
        },ga: function() {
            if (0 < e.o.length)
                for (var a = 0, b = e.o.length; a < b; a++)
                    e.I(e.o[a]);
            e.o = q
        },I: function(a) {
            if (d.e(a, "Array")) {
                var b = a[0];
                if (e.hasOwnProperty(b) && d.e(e[b], "Function"))
                    e[b](a)
            }
        },_trackPageview: function(a) {
            if (1 < a.length && a[1].charAt && "/" == a[1].charAt(0)) {
                e.c |= 4;
                h.b.a.et = 0;
                h.b.a.ep = "";
                h.b.G ? (h.b.a.nv = 0, h.b.a.st = 4) : h.b.G = p;
                var b = h.b.a.u, d = h.b.a.su;
                h.b.a.u = n.protocol + "//" + document.location.host +
                    a[1];
                e.R || (h.b.a.su = document.location.href);
                h.b.h();
                h.b.a.u = b;
                h.b.a.su = d
            }
        },_trackEvent: function(a) {
            2 < a.length && (e.c |= 8, h.b.a.nv = 0, h.b.a.st = 4, h.b.a.et = 4, h.b.a.ep = b(a[1]) + "*" + b(a[2]) + (a[3] ? "*" + b(a[3]) : "") + (a[4] ? "*" + b(a[4]) : ""), h.b.h())
        },_setCustomVar: function(a) {
            if (!(4 > a.length)) {
                var d = a[1], f = a[4] || 3;
                if (0 < d && 6 > d && 0 < f && 4 > f) {
                    e.z++;
                    for (var t = (h.b.a.cv || "*").split("!"), s = t.length; s < d - 1; s++)
                        t.push("*");
                    t[d - 1] = f + "*" + b(a[2]) + "*" + b(a[3]);
                    h.b.a.cv = t.join("!");
                    a = h.b.a.cv.replace(/[^1](\*[^!]*){2}/g, "*").replace(/((^|!)\*)+$/g,
                        "");
                    "" !== a ? h.b.setData("Hm_cv_" + c.id, encodeURIComponent(a), c.age) : h.b.va("Hm_cv_" + c.id)
                }
            }
        },_setReferrerOverride: function(a) {
            1 < a.length && (h.b.a.su = a[1].charAt && "/" == a[1].charAt(0) ? n.protocol + "//" + window.location.host + a[1] : a[1], e.R = p)
        },_trackOrder: function(b) {
            b = b[1];
            d.e(b, "Object") && (a(b), e.c |= 16, h.b.a.nv = 0, h.b.a.st = 4, h.b.a.et = 94, h.b.a.ep = g.stringify(b), h.b.h())
        },_trackMobConv: function(a) {
            if (a = {webim: 1,tel: 2,map: 3,sms: 4,callback: 5,share: 6}[a[1]])
                e.c |= 32, h.b.a.et = 93, h.b.a.ep = a, h.b.h()
        },_trackRTPageview: function(b) {
            b =
                b[1];
            d.e(b, "Object") && (a(b), b = g.stringify(b), 512 >= encodeURIComponent(b).length && (e.c |= 64, h.b.a.rt = b))
        },_trackRTEvent: function(b) {
            b = b[1];
            if (d.e(b, "Object")) {
                a(b);
                b = encodeURIComponent(g.stringify(b));
                var f = function(a) {
                    var b = h.b.a.rt;
                    e.c |= 128;
                    h.b.a.et = 90;
                    h.b.a.rt = a;
                    h.b.h();
                    h.b.a.rt = b
                }, m = b.length;
                if (900 >= m)
                    f.call(this, b);
                else
                    for (var m = Math.ceil(m / 900), t = "block|" + Math.round(Math.random() * n.m).toString(16) + "|" + m + "|", s = [], u = 0; u < m; u++)
                        s.push(u), s.push(b.substring(900 * u, 900 * u + 900)), f.call(this, t + s.join("|")),
                            s = []
            }
        },_setUserId: function(a) {
            a = a[1];
            if (d.e(a, "String") || d.e(a, "Number")) {
                var b = h.b.F(), g = "hm-" + h.b.a.v;
                e.T = e.T || Math.round(Math.random() * n.m);
                f.log("//datax.baidu.com/x.gif?si=" + c.id + "&dm=" + encodeURIComponent(b) + "&ac=" + encodeURIComponent(a) + "&v=" + g + "&li=" + e.T + "&rnd=" + Math.round(Math.random() * n.m))
            }
        }};
        e.init();
        h.Z = e;
        return h.Z
    })();

    (function() {
        function a() {
            "undefined" == typeof window["_bdhm_loaded_" + c.id] && (window["_bdhm_loaded_" + c.id] = p, this.a = {}, this.G = r, this.init())
        }

        var b = mt.url, //url信息
            f = mt.L, //log
            d = mt.M,//flash
            g = mt.lang, //类型判断
            n = mt.cookie, //cookie工具
            m = mt.g, //global
            e = mt.localStorage,
            k = mt.sessionStorage,
            l = h.B,
            v = h.r;
        a.prototype = {
            H: function(a, b) {
                a = "." + a.replace(/:\d+/, "");
                b = "." + b.replace(/:\d+/, "");
                var d = a.indexOf(b);
                return -1 < d && d + b.length == a.length
            },
            S: function(a, b) {
                a = a.replace(/^https?:\/\//, "");
                return 0 === a.indexOf(b)
            },

            s: function(a) {
                for (var d = 0; d < c.dm.length; d++)
                    if (-1 <
                        c.dm[d].indexOf("/")) {
                        if (this.S(a, c.dm[d]))
                            return p
                    } else {
                        var e = b.P(a);
                        if (e && this.H(e, c.dm[d]))
                            return p
                    }
                return r
            },
            //获取hostname
            F: function() {
                for (var a = document.location.hostname, b = 0, d = c.dm.length; b < d; b++)
                    if (this.H(a, c.dm[b]))
                        return c.dm[b].replace(/(:\d+)?[\/\?#].*/, "");
                return a
            },
            O: function() {
                for (var a = 0, b = c.dm.length; a < b; a++) {
                    var d = c.dm[a];
                    if (-1 < d.indexOf("/") && this.S(document.location.href, d))
                        return d.replace(/^[^\/]+(\/.*)/, "$1") + "/"
                }
                return "/"
            },
            na: function() {
                if (!document.referrer)
                    return l.i - l.l > c.vdur ? 1 : 4;
                var a =
                    r;
                this.s(document.referrer) && this.s(document.location.href) ? a = p : (a = b.P(document.referrer), a = this.H(a || "", document.location.hostname));
                return a ? l.i - l.l > c.vdur ? 1 : 4 : 3
            },
            getData: function(a) {
                try {
                    return n.get(a) || k.get(a) || e.get(a)
                } catch (b) {
                }
            },
            setData: function(a, b, d) {
                try {
                    n.set(a, b, {domain: this.F(),path: this.O(),D: d}), d ? e.set(a, b, d) : k.set(a, b)
                } catch (f) {
                }
            },
            va: function(a) {
                try {
                    n.set(a, "", {domain: this.F(),path: this.O(),D: -1}), k.remove(a), e.remove(a)
                } catch (b) {
                }
            },
            za: function() {
                var a, b, d, e, f;
                l.l = this.getData("Hm_lpvt_" +
                    c.id) || 0;
                13 == l.l.length && (l.l = Math.round(l.l / 1E3));
                b = this.na();
                a = 4 != b ? 1 : 0;
                if (d = this.getData("Hm_lvt_" + c.id)) {
                    e = d.split(",");
                    for (f = e.length - 1; 0 <= f; f--)
                        13 == e[f].length && (e[f] = "" + Math.round(e[f] / 1E3));
                    for (; 2592E3 < l.i - e[0]; )
                        e.shift();
                    f = 4 > e.length ? 2 : 3;
                    for (1 === a && e.push(l.i); 4 < e.length; )
                        e.shift();
                    d = e.join(",");
                    e = e[e.length - 1]
                } else
                    d = l.i, e = "", f = 1;
                this.setData("Hm_lvt_" + c.id, d, c.age);
                this.setData("Hm_lpvt_" + c.id, l.i);
                d = l.i == this.getData("Hm_lpvt_" + c.id) ? "1" : "0";
                if (0 === c.nv && this.s(document.location.href) &&
                    ("" === document.referrer || this.s(document.referrer)))
                    a = 0, b = 4;
                this.a.nv = a;
                this.a.st = b;
                this.a.cc = d;
                this.a.lt = e;
                this.a.lv = f
            },
            U: function() {
                for (var a = [], b = 0, d = l.V.length; b < d; b++) {
                    var e = l.V[b], f = this.a[e];
                    "undefined" != typeof f && "" !== f && a.push(e + "=" + encodeURIComponent(f))
                }
                b = this.a.et;
                this.a.rt && (0 === b ? a.push("rt=" + encodeURIComponent(this.a.rt)) : 90 === b && a.push("rt=" + this.a.rt));
                return a.join("&")
            },
            Aa: function() {
                this.za();
                this.a.si = c.id;
                this.a.su = document.referrer;
                this.a.ds = m.wa;
                this.a.cl = m.colorDepth + "-bit";
                this.a.ln = m.language;
                this.a.ja = m.javaEnabled ? 1 : 0;
                this.a.ck = m.cookieEnabled ? 1 : 0;
                this.a.lo = "number" == typeof _bdhm_top ? 1 : 0;
                this.a.fl = d.oa();
                this.a.v = "1.0.75";
                this.a.cv = decodeURIComponent(this.getData("Hm_cv_" + c.id) || "");
                1 == this.a.nv && (this.a.tt = document.title || "");
                var a = document.location.href;
                this.a.cm = b.k(a, l.ra) || "";
                this.a.cp = b.k(a, l.sa) || "";
                this.a.cw = b.k(a, l.qa) || "";
                this.a.ci = b.k(a, l.pa) || "";
                this.a.cf = b.k(a, l.ta) || ""
            },
            init: function() {
                try {
                    this.Aa(), 0 === this.a.nv ? this.ya() : this.K(".*"), h.b = this, this.$(),
                        v.q("pv-b"), this.xa()
                } catch (a) {
                    var b = [];
                    b.push("si=" + c.id);
                    b.push("n=" + encodeURIComponent(a.name));
                    b.push("m=" + encodeURIComponent(a.message));
                    b.push("r=" + encodeURIComponent(document.referrer));
                    f.log(l.protocol + "//" + l.J + "?" + b.join("&"))
                }
            },
            xa: function() {
                function a() {
                    v.q("pv-d")
                }
                "undefined" === typeof window._bdhm_autoPageview || window._bdhm_autoPageview === p ? (this.G = p, this.a.et = 0, this.a.ep = "", this.h(a)) : a()
            },
            h: function(a) {
                var b = this;
                b.a.rnd = Math.round(Math.random() * l.m);
                v.q("stag-b");
                var d = l.protocol + "//" +
                    l.J + "?" + b.U();
                v.q("stag-d");
                b.X(d);
                f.log(d, function(d) {
                    b.K(d);
                    g.e(a, "Function") && a.call(b)
                })
            },
            $: function() {
                var a = document.location.hash.substring(1), d = RegExp(c.id), e = -1 < document.referrer.indexOf(l.Y) ? p : r, f = b.k(a, "jn"), g = /^heatlink$|^select$/.test(f);
                a && (d.test(a) && e && g) && (a = document.createElement("script"), a.setAttribute("type", "text/javascript"), a.setAttribute("charset", "utf-8"), a.setAttribute("src", l.protocol + "//" + c.js + f + ".js?" + this.a.rnd), f = document.getElementsByTagName("script")[0], f.parentNode.insertBefore(a,
                    f))
            },
            X: function(a) {
                var b = k.get("Hm_unsent_" + c.id) || "", d = this.a.u ? "" : "&u=" + encodeURIComponent(document.location.href), b = encodeURIComponent(a.replace(/^https?:\/\//, "") + d) + (b ? "," + b : "");
                k.set("Hm_unsent_" + c.id, b)
            },
            K: function(a) {
                var b = k.get("Hm_unsent_" + c.id) || "";
                b && ((b = b.replace(RegExp(encodeURIComponent(a.replace(/^https?:\/\//, "")).replace(/([\*\(\)])/g, "\\$1") + "(%26u%3D[^,]*)?,?", "g"), "").replace(/,$/, "")) ? k.set("Hm_unsent_" + c.id, b) : k.remove("Hm_unsent_" + c.id))
            },
            ya: function() {
                var a = this, b = k.get("Hm_unsent_" +
                    c.id);
                if (b)
                    for (var b = b.split(","), d = function(b) {
                        f.log(l.protocol + "//" + decodeURIComponent(b).replace(/^https?:\/\//, ""), function(b) {
                            a.K(b)
                        })
                    }, e = 0, g = b.length; e < g; e++)
                        d(b[e])
            }
        };
        return new a
    })();
})();
