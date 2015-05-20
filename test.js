(function() {
    var h = {},
        mt = {},
        c = {
            id: "8333924b8852a0b8715c9231ba887ede",
            dm: ["gsmell.sinaapp.com"],
            js: "tongji.baidu.com/hm-web/js/",
            etrk: [{
                id: "goo",
                eventType: "onclick"
            }],
            icon: '',
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
    var p = !0,
        q = null,
        r = !1;
    mt.i = {};
    mt.i.Da = /msie (\d+\.\d+)/i.test(navigator.userAgent);
    mt.i.cookieEnabled = navigator.cookieEnabled;
    mt.i.javaEnabled = navigator.javaEnabled();
    mt.i.language = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "";
    mt.i.Fa = (window.screen.width || 0) + "x" + (window.screen.height || 0);
    mt.i.colorDepth = window.screen.colorDepth || 0;
    mt.cookie = {};
    mt.cookie.set = function(a, e, g) {
        var b;
        g.F && (b = new Date, b.setTime(b.getTime() + g.F));
        document.cookie = a + "=" + e + (g.domain ? "; domain=" + g.domain : "") + (g.path ? "; path=" + g.path : "") + (b ? "; expires=" + b.toGMTString() : "") + (g.Ra ? "; secure" : "")
    };
    mt.cookie.get = function(a) {
        return (a = RegExp("(^| )" + a + "=([^;]*)(;|$)").exec(document.cookie)) ? a[2] : q
    };
    mt.m = {};
    mt.m.O = function(a) {
        return document.getElementById(a)
    };
    mt.m.pa = function(a) {
        var e;
        for (e = "A";
             (a = a.parentNode) && 1 == a.nodeType;)
            if (a.tagName == e) return a;
        return q
    };
    (mt.m.U = function() {
        function a() {
            if (!a.w) {
                a.w = p;
                for (var d = 0, e = b.length; d < e; d++)
                    b[d]()
            }
        }

        function e() {
            try {
                document.documentElement.doScroll("left")
            } catch (b) {
                setTimeout(e, 1);
                return
            }
            a()
        }
        var g = r,
            b = [],
            d;
        document.addEventListener ? d = function() {
            document.removeEventListener("DOMContentLoaded", d, r);
            a()
        } : document.attachEvent && (d = function() {
            "complete" === document.readyState && (document.detachEvent("onreadystatechange", d), a())
        });
        (function() {
            if (!g) if (g = p, "complete" === document.readyState) a.w = p;
            else if (document.addEventListener) document.addEventListener("DOMContentLoaded", d, r), window.addEventListener("load", a, r);
            else if (document.attachEvent) {
                document.attachEvent("onreadystatechange", d);
                window.attachEvent("onload", a);
                var b = r;
                try {
                    b = window.frameElement == q
                } catch (n) {}
                document.documentElement.doScroll && b && e()
            }
        })();
        return function(d) {
            a.w ? d() : b.push(d)
        }
    }()).w = r;
    mt.event = {};
    mt.event.c = function(a, e, g) {
        a.attachEvent ? a.attachEvent("on" + e, function(b) {
            g.call(a, b)
        }) : a.addEventListener && a.addEventListener(e, g, r)
    };
    mt.event.preventDefault = function(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = r
    };
    mt.o = {};
    mt.o.parse = function() {
        return (new Function('return (" + source + ")'))()
    };
    mt.o.stringify = function() {
        function a(b) {
            /["\\-]/.test(b) && (b = b.replace(/["\\-]/g, function(b) {
                var a = g[b];
                if (a) return a;
                a = b.charCodeAt();
                return "\\u00" + Math.floor(a / 16).toString(16) + (a % 16).toString(16)
            }));
            return '"' + b + '"'
        }

        function e(a) {
            return 10 > a ? "0" + a : a
        }
        var g = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        return function(b) {
            switch (typeof b) {
                case "undefined":
                    return "undefined";
                case "number":
                    return isFinite(b) ? String(b) : "null";
                case "string":
                    return a(b);
                case "boolean":
                    return String(b);
                default:
                    if (b === q) return "null";
                    if (b instanceof Array) {
                        var d = ["["],
                            g = b.length,
                            n, f, k;
                        for (f = 0; f < g; f++)
                            switch (k = b[f], typeof k) {
                                case "undefined":
                                case "function":
                                case "unknown":
                                    break;
                                default:
                                    n && d.push(","), d.push(mt.o.stringify(k)), n = 1
                            }
                        d.push("]");
                        return d.join("")
                    }
                    if (b instanceof Date) return '"' + b.getFullYear() + "-" + e(b.getMonth() + 1) + "-" + e(b.getDate()) + "T" + e(b.getHours()) + ":" + e(b.getMinutes()) + ":" + e(b.getSeconds()) + '"';
                    n = ["{"];
                    f = mt.o.stringify;
                    for (g in b)
                        if (Object.prototype.hasOwnProperty.call(b, g)) switch (k = b[g], typeof k) {
                            case "undefined":
                            case "unknown":
                            case "function":
                                break;
                            default:
                                d && n.push(","), d = 1, n.push(f(g) + ":" + f(k))
                        }
                    n.push("}");
                    return n.join("")
            }
        }
    }();
    mt.lang = {};
    mt.lang.e = function(a, e) {
        return "[object " + e + "]" === {}.toString.call(a)
    };
    mt.lang.Oa = function(a) {
        return mt.lang.e(a, "Number") && isFinite(a)
    };
    mt.lang.Qa = function(a) {
        return mt.lang.e(a, "String")
    };
    mt.localStorage = {};
    mt.localStorage.C = function() {
        if (!mt.localStorage.f) try {
            mt.localStorage.f = document.createElement("input"), mt.localStorage.f.type = "hidden", mt.localStorage.f.style.display = "none", mt.localStorage.f.addBehavior("#default#userData"), document.getElementsByTagName("head")[0].appendChild(mt.localStorage.f)
        } catch (a) {
            return r
        }
        return p
    };
    mt.localStorage.set = function(a, e, g) {
        var b = new Date;
        b.setTime(b.getTime() + g || 31536E6);
        try {
            window.localStorage ? (e = b.getTime() + "|" + e, window.localStorage.setItem(a, e)) : mt.localStorage.C() && (mt.localStorage.f.expires = b.toUTCString(), mt.localStorage.f.load(document.location.hostname), mt.localStorage.f.setAttribute(a, e), mt.localStorage.f.save(document.location.hostname))
        } catch (d) {}
    };
    mt.localStorage.get = function(a) {
        if (window.localStorage) {
            if (a = window.localStorage.getItem(a)) {
                var e = a.indexOf("|"),
                    g = a.substring(0, e) - 0;
                if (g && g > (new Date).getTime()) return a.substring(e + 1)
            }
        } else if (mt.localStorage.C()) try {
            return mt.localStorage.f.load(document.location.hostname), mt.localStorage.f.getAttribute(a)
        } catch (b) {}
        return q
    };
    mt.localStorage.remove = function(a) {
        if (window.localStorage) window.localStorage.removeItem(a);
        else if (mt.localStorage.C()) try {
            mt.localStorage.f.load(document.location.hostname), mt.localStorage.f.removeAttribute(a), mt.localStorage.f.save(document.location.hostname)
        } catch (e) {}
    };
    mt.sessionStorage = {};
    mt.sessionStorage.set = function(a, e) {
        if (window.sessionStorage) try {
            window.sessionStorage.setItem(a, e)
        } catch (g) {}
    };
    mt.sessionStorage.get = function(a) {
        return window.sessionStorage ? window.sessionStorage.getItem(a) : q
    };
    mt.sessionStorage.remove = function(a) {
        window.sessionStorage && window.sessionStorage.removeItem(a)
    };
    mt.W = {};
    mt.W.log = function(a, e) {
        var g = new Image,
            b = "mini_tangram_log_" + Math.floor(2147483648 * Math.random()).toString(36);
        window[b] = g;
        g.onload = g.onerror = g.onabort = function() {
            g.onload = g.onerror = g.onabort = q;
            g = window[b] = q;
            e && e(a)
        };
        g.src = a
    };
    mt.B = {};
    mt.B.va = function() {
        var a = "";
        if (navigator.plugins && navigator.mimeTypes.length) {
            var e = navigator.plugins["Shockwave Flash"];
            e && e.description && (a = e.description.replace(/^.*\s+(\S+)\s+\S+$/, "$1"))
        } else if (window.ActiveXObject) try {
            if (e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))(a = e.GetVariable("$version")) && (a = a.replace(/^.*\s+(\d+),(\d+).*$/, "$1.$2"))
        } catch (g) {}
        return a
    };
    mt.B.ha = function(a, e, g, b, d) {
        return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="' + a + '" width="' + g + '" height="' + b + '"><param name="movie" value="' + e + '" /><param name="flashvars" value="' + (d || "") + '" /><param name="allowscriptaccess" value="always" /><embed type="application/x-shockwave-flash" name="' + a + '" width="' + g + '" height="' + b + '" src="' + e + '" flashvars="' + (d || "") + '" allowscriptaccess="always" /></object>'
    };
    mt.url = {};
    mt.url.l = function(a, e) {
        var g = a.match(RegExp("(^|&|\\?|#)(" + e + ")=([^&#]*)(&|$|#)", ""));
        return g ? g[3] : q
    };
    mt.url.Na = function(a) {
        return (a = a.match(/^(https?:)\/\//)) ? a[1] : q
    };
    mt.url.sa = function(a) {
        return (a = a.match(/^(https?:\/\/)?([^\/\?#]*)/)) ? a[2].replace(/.*@/, "") : q
    };
    mt.url.Q = function(a) {
        return (a = mt.url.sa(a)) ? a.replace(/:\d+$/, "") : a
    };
    mt.url.Ma = function(a) {
        return (a = a.match(/^(https?:\/\/)?[^\/]*(.*)/)) ? a[2].replace(/[\?#].*/, "").replace(/^$/, "/") : q
    };
    h.g = {
        Ba: "http://tongji.baidu.com/hm-web/welcome/ico",
        K: "hm.baidu.com/hm.gif",
        aa: "baidu.com",
        ya: "hmmd",
        za: "hmpl",
        xa: "hmkw",
        wa: "hmci",
        Aa: "hmsr",
        p: 0,
        j: Math.round(+new Date / 1E3),
        protocol: "https:" == document.location.protocol ? "https:" : "http:",
        Pa: 0,
        fa: 6E5,
        ga: 10,
        M: 1024,
        ea: 1,
        q: 2147483647,
        X: "cc cf ci ck cl cm cp cw ds ep et fl ja ln lo lt nv rnd si st su v cv lv api tt u".split(" ")
    };
    (function() {
        var a = {
            n: {},
            c: function(a, g) {
                this.n[a] = this.n[a] || [];
                this.n[a].push(g)
            },
            s: function(a, g) {
                this.n[a] = this.n[a] || [];
                for (var b = this.n[a].length, d = 0; d < b; d++)
                    this.n[a][d](g)
            }
        };
        return h.k = a
    })();
    (function() {
        function a(a, b) {
            var d = document.createElement("script");
            d.charset = "utf-8";
            e.e(b, "Function") && (d.readyState ? d.onreadystatechange = function() {
                if ("loaded" === d.readyState || "complete" === d.readyState) d.onreadystatechange = q, b()
            } : d.onload = function() {
                b()
            });
            d.src = a;
            var l = document.getElementsByTagName("script")[0];
            l.parentNode.insertBefore(d, l)
        }
        var e = mt.lang;
        return h.load = a
    })();
    (function() {
        function a() {
            var a = "";
            h.b.a.nv ? (a = encodeURIComponent(document.referrer), window.sessionStorage ? g.set("Hm_from_" + c.id, a) : e.set("Hm_from_" + c.id, a, 864E5)) : a = (window.sessionStorage ? g.get("Hm_from_" + c.id) : e.get("Hm_from_" + c.id)) || "";
            return a
        }
        var e = mt.localStorage,
            g = mt.sessionStorage;
        return h.N = a
    })();
    (function() {
        var a = h.g,
            e = mt.B,
            g = {
                init: function() {
                    if ("" !== c.icon) {
                        var b;
                        b = c.icon.split("|");
                        var d = a.Ba + "?s=" + c.id,
                            g = ("http:" == a.protocol ? "http://eiv" : "https://bs") + ".baidu.com" + b[0] + "." + b[1];
                        switch (b[1]) {
                            case "swf":
                                b = e.ha("HolmesIcon" + a.j, g, b[2], b[3], "s=" + d);
                                break;
                            case "gif":
                                b = '<a href="' + d + '" target="_blank"><img border="0" src="' + g + '" width="' + b[2] + '" height="' + b[3] + '"></a>';
                                break;
                            default:
                                b = '<a href="' + d + '" target="_blank">' + b[0] + "</a>"
                        }
                        document.write(b)
                    }
                }
            };
        h.k.c("pv-b", g.init);
        return g
    })();
    (function() {
        var a = mt.m,
            e = mt.event,
            g = {
                Z: function() {
                    e.c(document, "click", g.ka());
                    for (var b = c.etrk.length, d = 0; d < b; d++) {
                        var l = c.etrk[d],
                            n = a.O(decodeURIComponent(l.id));
                        n && e.c(n, l.eventType, g.la())
                    }
                },
                la: function() {
                    return function(a) {
                        (a.target || a.srcElement).setAttribute("HM_fix", a.clientX + ":" + a.clientY);
                        h.b.a.et = 1;
                        h.b.a.ep = "{id:" + this.id + ",eventType:" + a.type + "}";
                        h.b.h()
                    }
                },
                ka: function() {
                    return function(a) {
                        var d = a.target || a.srcElement;
                        if (d) {
                            var g = d.getAttribute("HM_fix"),
                                e = a.clientX + ":" + a.clientY;
                            if (g && g == e) d.removeAttribute("HM_fix");
                            else if (g = c.etrk.length, 0 < g) {
                                for (e = {}; d && d != document.body;)
                                    d.id && (e[d.id] = ""), d = d.parentNode;
                                for (d = 0; d < g; d++) {
                                    var f = decodeURIComponent(c.etrk[d].id);
                                    e.hasOwnProperty(f) && (h.b.a.et = 1, h.b.a.ep = "{id:" + f + ",eventType:" + a.type + "}", h.b.h())
                                }
                            }
                        }
                    }
                }
            };
        h.k.c("pv-b", g.Z);
        return g
    })();
    (function() {
        var a = mt.m,
            e = mt.event,
            g = mt.i,
            b = h.g,
            d = [],
            l = {
                Y: function() {
                    c.ctrk && (e.c(document, "mouseup", l.da()), e.c(window, "unload", function() {
                        l.z()
                    }), setInterval(function() {
                        l.z()
                    }, b.fa))
                },
                da: function() {
                    return function(a) {
                        a = l.qa(a);
                        if ("" !== a) {
                            var f = (b.protocol + "//" + b.K + "?" + h.b.V().replace(/ep=[^&]*/, "ep=" + encodeURIComponent("[" + a + "]"))).length;
                            f + (b.q + "").length > b.M || (f + encodeURIComponent(d.join(",") + (d.length ? "," : "")).length + (b.q + "").length > b.M && l.z(), d.push(a), (d.length >= b.ga || /t:a/.test(a)) && l.z())
                        }
                    }
                },
                qa: function(d) {
                    if (0 === b.ea) {
                        var f = d.target || d.srcElement,
                            k = f.tagName.toLowerCase();
                        if ("embed" == k || "object" == k) return ""
                    }
                    g.Da ? (f = Math.max(document.documentElement.scrollTop, document.body.scrollTop), k = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft), k = d.clientX + k, f = d.clientY + f) : (k = d.pageX, f = d.pageY);
                    var m = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;
                    switch (c.align) {
                        case 1:
                            k -= m / 2;
                            break;
                        case 2:
                            k -= m
                    }
                    k = "{x:" + k + ",y:" + f + ",";
                    f = d.target || d.srcElement;
                    return k = (d = "a" == f.tagName.toLowerCase() ? f : a.pa(f)) ? k + ("t:a,u:" + encodeURIComponent(d.href) + "}") : k + "t:b}"
                },
                z: function() {
                    0 !== d.length && (h.b.a.et = 2, h.b.a.ep = "[" + d.join(",") + "]", h.b.h(), d = [])
                }
            };
        h.k.c("pv-b", l.Y);
        return l
    })();
    (function() {
        var a = mt.m,
            e = h.g,
            g = h.load,
            b = h.N;
        h.k.c("pv-b", function() {
            c.rec && a.U(function() {
                for (var d = 0, l = c.rp.length; d < l; d++) {
                    var n = c.rp[d][0],
                        f = c.rp[d][1],
                        k = a.O("hm_t_" + n);
                    if (f && !(2 == f && !k || k && "" !== k.innerHTML)) k = "", k = Math.round(Math.random() * e.q), k = 4 == f ? "http://crs.baidu.com/hl.js?" + ["siteId=" + c.id, "planId=" + n, "rnd=" + k].join("&") : "http://crs.baidu.com/t.js?" + ["siteId=" + c.id, "planId=" + n, "from=" + b(), "referer=" + encodeURIComponent(document.referrer), "title=" + encodeURIComponent(document.title), "rnd=" + k].join("&"), g(k)
                }
            })
        })
    })();
    (function() {
        var a = h.g,
            e = h.load,
            g = h.N;
        h.k.c("pv-b", function() {
            if (c.trust && c.vcard) {
                var b = a.protocol + "//trust.baidu.com/vcard/v.js?" + ["siteid=" + c.vcard, "url=" + encodeURIComponent(document.location.href), "source=" + g(), "rnd=" + Math.round(Math.random() * a.q)].join("&");
                e(b)
            }
        })
    })();
    (function() {
        function a() {
            return function() {
                h.b.a.nv = 0;
                h.b.a.st = 4;
                h.b.a.et = 3;
                h.b.a.ep = h.D.ta() + "," + h.D.ra();
                h.b.h()
            }
        }

        function e() {
            clearTimeout(A);
            var a;
            y && (a = "visible" == document[y]);
            B && (a = !document[B]);
            f = "undefined" == typeof a ? p : a;
            if ((!n || !k) && f && m) t = p, s = +new Date;
            else if (n && k && (!f || !m)) t = r, u += +new Date - s;
            n = f;
            k = m;
            A = setTimeout(e, 100)
        }

        function g(a) {
            var k = document,
                b = "";
            if (a in k) b = a;
            else for (var d = ["webkit", "ms", "moz", "o"], f = 0; f < d.length; f++) {
                var m = d[f] + a.charAt(0).toUpperCase() + a.slice(1);
                if (m in k) {
                    b = m;
                    break
                }
            }
            return b
        }

        function b(a) {
            if (!("focus" == a.type || "blur" == a.type) || !(a.target && a.target != window)) m = "focus" == a.type || "focusin" == a.type ? p : r, e()
        }
        var d = mt.event,
            l = h.k,
            n = p,
            f = p,
            k = p,
            m = p,
            v = +new Date,
            s = v,
            u = 0,
            t = p,
            y = g("visibilityState"),
            B = g("hidden"),
            A;
        e();
        (function() {
            var a = y.replace(/[vV]isibilityState/, "visibilitychange");
            d.c(document, a, e);
            d.c(window, "pageshow", e);
            d.c(window, "pagehide", e);
            "object" == typeof document.onfocusin ? (d.c(document, "focusin", b), d.c(document, "focusout", b)) : (d.c(window, "focus", b), d.c(window, "blur", b))
        })();
        h.D = {
            ta: function() {
                return +new Date - v
            },
            ra: function() {
                return t ? +new Date - s + u : u
            }
        };
        l.c("pv-b", function() {
            d.c(window, "unload", a())
        });
        return h.D
    })();
    (function() {
        var a = mt.lang,
            e = h.g,
            g = h.load,
            b = {
                Ca: function(b) {
                    if ((void 0 === window._dxt || a.e(window._dxt, "Array")) && "undefined" !== typeof h.b) {
                        var l = h.b.G();
                        g([e.protocol, "//datax.baidu.com/x.js?si=", c.id, "&dm=", encodeURIComponent(l)].join(""), b)
                    }
                },
                Ka: function(b) {
                    if (a.e(b, "String") || a.e(b, "Number")) window._dxt = window._dxt || [], window._dxt.push(["_setUserId", b])
                }
            };
        return h.ia = b
    })();
    (function() {
        function a(k) {
            for (var b in k)
                if ({}.hasOwnProperty.call(k, b)) {
                    var f = k[b];
                    g.e(f, "Object") || g.e(f, "Array") ? a(f) : k[b] = String(f)
                }
        }

        function e(a) {
            return a.replace ? a.replace(/'/g, "'0").replace(/\*/g, "'1").replace(/!/g, "'2") : a
        }
        var g = mt.lang,
            b = mt.o,
            d = h.g,
            l = h.k,
            n = h.ia,
            f = {
                R: q,
                r: [],
                A: 0,
                S: r,
                init: function() {
                    f.d = 0;
                    f.R = {
                        push: function() {
                            f.J.apply(f, arguments)
                        }
                    };
                    l.c("pv-b", function() {
                        f.ma();
                        f.na()
                    });
                    l.c("pv-d", f.oa);
                    l.c("stag-b", function() {
                        h.b.a.api = f.d || f.A ? f.d + "_" + f.A : ""
                    });
                    l.c("stag-d", function() {
                        h.b.a.api = 0;
                        f.d = 0;
                        f.A = 0
                    })
                },
                ma: function() {
                    var a = window._hmt;
                    if (a && a.length) for (var b = 0; b < a.length; b++) {
                        var d = a[b];
                        switch (d[0]) {
                            case "_setAccount":
                                1 < d.length && /^[0-9a-z]{32}$/.test(d[1]) && (f.d |= 1, window._bdhm_account = d[1]);
                                break;
                            case "_setAutoPageview":
                                if (1 < d.length && (d = d[1], r === d || p === d)) f.d |= 2, window._bdhm_autoPageview = d
                        }
                    }
                },
                na: function() {
                    if ("undefined" === typeof window._bdhm_account || window._bdhm_account === c.id) {
                        window._bdhm_account = c.id;
                        var a = window._hmt;
                        if (a && a.length) for (var b = 0, d = a.length; b < d; b++)
                            g.e(a[b], "Array") && "_trackEvent" !== a[b][0] && "_trackRTEvent" !== a[b][0] ? f.J(a[b]) : f.r.push(a[b]);
                        window._hmt = f.R
                    }
                },
                oa: function() {
                    if (0 < f.r.length) for (var a = 0, b = f.r.length; a < b; a++)
                        f.J(f.r[a]);
                    f.r = q
                },
                J: function(a) {
                    if (g.e(a, "Array")) {
                        var b = a[0];
                        if (f.hasOwnProperty(b) && g.e(f[b], "Function")) f[b](a)
                    }
                },
                _trackPageview: function(a) {
                    if (1 < a.length && a[1].charAt && "/" == a[1].charAt(0)) {
                        f.d |= 4;
                        h.b.a.et = 0;
                        h.b.a.ep = "";
                        h.b.H ? (h.b.a.nv = 0, h.b.a.st = 4) : h.b.H = p;
                        var b = h.b.a.u,
                            g = h.b.a.su;
                        h.b.a.u = d.protocol + "//" + document.location.host + a[1];
                        f.S || (h.b.a.su = document.location.href);
                        h.b.h();
                        h.b.a.u = b;
                        h.b.a.su = g
                    }
                },
                _trackEvent: function(a) {
                    2 < a.length && (f.d |= 8, h.b.a.nv = 0, h.b.a.st = 4, h.b.a.et = 4, h.b.a.ep = e(a[1]) + "*" + e(a[2]) + (a[3] ? "*" + e(a[3]) : "") + (a[4] ? "*" + e(a[4]) : ""), h.b.h())
                },
                _setCustomVar: function(a) {
                    if (!(4 > a.length)) {
                        var b = a[1],
                            d = a[4] || 3;
                        if (0 < b && 6 > b && 0 < d && 4 > d) {
                            f.A++;
                            for (var s = (h.b.a.cv || "*").split("!"), g = s.length; g < b - 1; g++)
                                s.push("*");
                            s[b - 1] = d + "*" + e(a[2]) + "*" + e(a[3]);
                            h.b.a.cv = s.join("!");
                            a = h.b.a.cv.replace(/[^1](\*[^!]*){2}/g, "*").replace(/((^|!)\*)+$/g, "");
                            "" !== a ? h.b.setData("Hm_cv_" + c.id, encodeURIComponent(a), c.age) : h.b.Ea("Hm_cv_" + c.id)
                        }
                    }
                },
                _setReferrerOverride: function(a) {
                    1 < a.length && (h.b.a.su = a[1].charAt && "/" == a[1].charAt(0) ? d.protocol + "//" + window.location.host + a[1] : a[1], f.S = p)
                },
                _trackOrder: function(d) {
                    d = d[1];
                    g.e(d, "Object") && (a(d), f.d |= 16, h.b.a.nv = 0, h.b.a.st = 4, h.b.a.et = 94, h.b.a.ep = b.stringify(d), h.b.h())
                },
                _trackMobConv: function(a) {
                    if (a = {
                        webim: 1,
                        tel: 2,
                        map: 3,
                        sms: 4,
                        callback: 5,
                        share: 6
                    }[a[1]]) f.d |= 32, h.b.a.et = 93, h.b.a.ep = a, h.b.h()
                },
                _trackRTPageview: function(d) {
                    d = d[1];
                    g.e(d, "Object") && (a(d), d = b.stringify(d), 512 >= encodeURIComponent(d).length && (f.d |= 64, h.b.a.rt = d))
                },
                _trackRTEvent: function(e) {
                    e = e[1];
                    if (g.e(e, "Object")) {
                        a(e);
                        e = encodeURIComponent(b.stringify(e));
                        var m = function(a) {
                                var b = h.b.a.rt;
                                f.d |= 128;
                                h.b.a.et = 90;
                                h.b.a.rt = a;
                                h.b.h();
                                h.b.a.rt = b
                            },
                            l = e.length;
                        if (900 >= l) m.call(this, e);
                        else for (var l = Math.ceil(l / 900), s = "block|" + Math.round(Math.random() * d.q).toString(16) + "|" + l + "|", u = [], t = 0; t < l; t++)
                            u.push(t), u.push(e.substring(900 * t, 900 * t + 900)), m.call(this, s + u.join("|")), u = []
                    }
                },
                _setUserId: function(a) {
                    a = a[1];
                    n.Ca();
                    n.Ka(a)
                }
            };
        f.init();
        h.ba = f;
        return h.ba
    })();
    (function() {
        function a() {
            "undefined" == typeof window["_bdhm_loaded_" + c.id] && (window["_bdhm_loaded_" + c.id] = p, this.a = {}, this.H = r, this.init())
        }
        var e = mt.url,
            g = mt.W,
            b = mt.B,
            d = mt.lang,
            l = mt.cookie,
            n = mt.i,
            f = mt.localStorage,
            k = mt.sessionStorage,
            m = h.g,
            v = h.k;
        a.prototype = {
            I: function(a, b) {
                a = "." + a.replace(/:\d+/, "");
                b = "." + b.replace(/:\d+/, "");
                var d = a.indexOf(b);
                return -1 < d && d + b.length == a.length
            },
            T: function(a, b) {
                a = a.replace(/^https?:\/\//, "");
                return 0 === a.indexOf(b)
            },
            t: function(a) {
                for (var b = 0; b < c.dm.length; b++)
                    if (-1 < c.dm[b].indexOf("/")) {
                        if (this.T(a, c.dm[b])) return p
                    } else {
                        var d = e.Q(a);
                        if (d && this.I(d, c.dm[b])) return p
                    }
                return r
            },
            G: function() {
                for (var a = document.location.hostname, b = 0, d = c.dm.length; b < d; b++)
                    if (this.I(a, c.dm[b])) return c.dm[b].replace(/(:\d+)?[\/\?#].*/, "");
                return a
            },
            P: function() {
                for (var a = 0, b = c.dm.length; a < b; a++) {
                    var d = c.dm[a];
                    if (-1 < d.indexOf("/") && this.T(document.location.href, d)) return d.replace(/^[^\/]+(\/.*)/, "$1") + "/"
                }
                return "/"
            },
            ua: function() {
                if (!document.referrer) return m.j - m.p > c.vdur ? 1 : 4;
                var a = r;
                this.t(document.referrer) && this.t(document.location.href) ? a = p : (a = e.Q(document.referrer), a = this.I(a || "", document.location.hostname));
                return a ? m.j - m.p > c.vdur ? 1 : 4 : 3
            },
            getData: function(a) {
                try {
                    return l.get(a) || k.get(a) || f.get(a)
                } catch (b) {}
            },
            setData: function(a, b, d) {
                try {
                    l.set(a, b, {
                        domain: this.G(),
                        path: this.P(),
                        F: d
                    }), d ? f.set(a, b, d) : k.set(a, b)
                } catch (e) {}
            },
            Ea: function(a) {
                try {
                    l.set(a, "", {
                        domain: this.G(),
                        path: this.P(),
                        F: -1
                    }), k.remove(a), f.remove(a)
                } catch (b) {}
            },
            Ia: function() {
                var a, b, d, f, e;
                m.p = this.getData("Hm_lpvt_" + c.id) || 0;
                13 == m.p.length && (m.p = Math.round(m.p / 1E3));
                b = this.ua();
                a = 4 != b ? 1 : 0;
                if (d = this.getData("Hm_lvt_" + c.id)) {
                    f = d.split(",");
                    for (e = f.length - 1; 0 <= e; e--)
                        13 == f[e].length && (f[e] = "" + Math.round(f[e] / 1E3));
                    for (; 2592E3 < m.j - f[0];)
                        f.shift();
                    e = 4 > f.length ? 2 : 3;
                    for (1 === a && f.push(m.j); 4 < f.length;)
                        f.shift();
                    d = f.join(",");
                    f = f[f.length - 1]
                } else d = m.j, f = "", e = 1;
                this.setData("Hm_lvt_" + c.id, d, c.age);
                this.setData("Hm_lpvt_" + c.id, m.j);
                d = m.j == this.getData("Hm_lpvt_" + c.id) ? "1" : "0";
                if (0 === c.nv && this.t(document.location.href) && ("" === document.referrer || this.t(document.referrer))) a = 0, b = 4;
                this.a.nv = a;
                this.a.st = b;
                this.a.cc = d;
                this.a.lt = f;
                this.a.lv = e
            },
            V: function() {
                for (var a = [], b = 0, d = m.X.length; b < d; b++) {
                    var f = m.X[b],
                        e = this.a[f];
                    "undefined" != typeof e && "" !== e && a.push(f + "=" + encodeURIComponent(e))
                }
                b = this.a.et;
                this.a.rt && (0 === b ? a.push("rt=" + encodeURIComponent(this.a.rt)) : 90 === b && a.push("rt=" + this.a.rt));
                return a.join("&")
            },
            Ja: function() {
                this.Ia();
                this.a.si = c.id;
                this.a.su = document.referrer;
                this.a.ds = n.Fa;
                this.a.cl = n.colorDepth + "-bit";
                this.a.ln = n.language;
                this.a.ja = n.javaEnabled ? 1 : 0;
                this.a.ck = n.cookieEnabled ? 1 : 0;
                this.a.lo = "number" == typeof _bdhm_top ? 1 : 0;
                this.a.fl = b.va();
                this.a.v = "1.0.87";
                this.a.cv = decodeURIComponent(this.getData("Hm_cv_" + c.id) || "");
                1 == this.a.nv && (this.a.tt = document.title || "");
                var a = document.location.href;
                this.a.cm = e.l(a, m.ya) || "";
                this.a.cp = e.l(a, m.za) || "";
                this.a.cw = e.l(a, m.xa) || "";
                this.a.ci = e.l(a, m.wa) || "";
                this.a.cf = e.l(a, m.Aa) || ""
            },
            init: function() {
                try {
                    this.Ja(), 0 === this.a.nv ? this.Ha() : this.L(".*"), h.b = this, this.ca(), v.s("pv-b"), this.Ga()
                } catch (a) {
                    var b = [];
                    b.push("si=" + c.id);
                    b.push("n=" + encodeURIComponent(a.name));
                    b.push("m=" + encodeURIComponent(a.message));
                    b.push("r=" + encodeURIComponent(document.referrer));
                    g.log(m.protocol + "//" + m.K + "?" + b.join("&"))
                }
            },
            Ga: function() {
                function a() {
                    v.s("pv-d")
                }
                "undefined" === typeof window._bdhm_autoPageview || window._bdhm_autoPageview === p ? (this.H = p, this.a.et = 0, this.a.ep = "", this.h(a)) : a()
            },
            h: function(a) {
                var b = this;
                b.a.rnd = Math.round(Math.random() * m.q);
                v.s("stag-b");
                var f = m.protocol + "//" + m.K + "?" + b.V();
                v.s("stag-d");
                b.$(f);
                g.log(f, function(f) {
                    b.L(f);
                    d.e(a, "Function") && a.call(b)
                })
            },
            ca: function() {
                var a = document.location.hash.substring(1),
                    b = RegExp(c.id),
                    d = -1 < document.referrer.indexOf(m.aa) ? p : r,
                    f = e.l(a, "jn"),
                    g = /^heatlink$|^select$/.test(f);
                a && (b.test(a) && d && g) && (a = document.createElement("script"), a.setAttribute("type", "text/javascript"), a.setAttribute("charset", "utf-8"), a.setAttribute("src", m.protocol + "//" + c.js + f + ".js?" + this.a.rnd), f = document.getElementsByTagName("script")[0], f.parentNode.insertBefore(a, f))
            },
            $: function(a) {
                var b = k.get("Hm_unsent_" + c.id) || "",
                    d = this.a.u ? "" : "&u=" + encodeURIComponent(document.location.href),
                    b = encodeURIComponent(a.replace(/^https?:\/\//, "") + d) + (b ? "," + b : "");
                k.set("Hm_unsent_" + c.id, b)
            },
            L: function(a) {
                var b = k.get("Hm_unsent_" + c.id) || "";
                b && ((b = b.replace(RegExp(encodeURIComponent(a.replace(/^https?:\/\//, "")).replace(/([\*\(\)])/g, "\\$1") + "(%26u%3D[^,]*)?,?", "g"), "").replace(/,$/, "")) ? k.set("Hm_unsent_" + c.id, b) : k.remove("Hm_unsent_" + c.id))
            },
            Ha: function() {
                var a = this,
                    b = k.get("Hm_unsent_" + c.id);
                if (b) for (var b = b.split(","), d = function(b) {
                    g.log(m.protocol + "//" + decodeURIComponent(b).replace(/^https?:\/\//, ""), function(b) {
                        a.L(b)
                    })
                }, f = 0, e = b.length; f < e; f++)
                    d(b[f])
            }
        };
        return new a
    })();
    var w = h.g,
        x = h.load;
    if (c.apps) {
        var z = [w.protocol, "//ers.baidu.com/app/s.js?"];
        z.push(c.apps);
        x(z.join(""))
    }
    var C = h.g,
        D = h.load;
    if (c.conv && "http:" === C.protocol) {
        var E = ["http://page.baidu.com/conversion_js.php?sid="];
        E.push(c.conv);
        D(E.join(""))
    }
    var F = h.g,
        G = h.load;
    c.lxb && G([F.protocol, "//lxbjs.baidu.com/lxb.js?sid=", c.lxb].join(""));
    var H = h.load,
        I = h.g.protocol;
    if (c.qiao) {
        for (var J = [I + "//goutong.baidu.com/site/"], K = c.id, L = 5381, M = K.length, N = 0; N < M; N++)
            L = (33 * L + Number(K.charCodeAt(N))) % 4294967296;
        2147483648 < L && (L -= 2147483648);
        J.push(L % 1E3 + "/");
        J.push(c.id + "/b.js");
        J.push("?siteId=" + c.qiao);
        H(J.join(""))
    }(function() {
        var a = mt.m,
            e = mt.event,
            g = mt.url,
            b = mt.o;
        try {
            if (window.performance && performance.timing && "undefined" !== typeof h.b) {
                var d = +new Date,
                    l = function(a) {
                        var b = performance.timing,
                            d = b[a + "Start"] ? b[a + "Start"] : 0;
                        a = b[a + "End"] ? b[a + "End"] : 0;
                        return {
                            start: d,
                            end: a,
                            value: 0 < a - d ? a - d : 0
                        }
                    },
                    n = q;
                a.U(function() {
                    n = +new Date
                });
                var f = function() {
                    var a, f, e;
                    e = l("navigation");
                    f = l("request");
                    e = {
                        netAll: f.start - e.start,
                        netDns: l("domainLookup").value,
                        netTcp: l("connect").value,
                        srv: l("response").start - f.start,
                        dom: performance.timing.domInteractive - performance.timing.fetchStart,
                        loadEvent: l("loadEvent").end - e.start
                    };
                    a = document.referrer;
                    var k = q;
                    f = q;
                    if ("www.baidu.com" === (a.match(/^(http[s]?:\/\/)?([^\/]+)(.*)/) || [])[2]) k = g.l(a, "qid"), f = g.l(a, "click_t");
                    a = k;
                    e.qid = a != q ? a : "";
                    f != q ? (e.bdDom = n ? n - f : 0, e.bdRun = d - f) : (e.bdDom = 0, e.bdRun = 0);
                    h.b.a.et = 87;
                    h.b.a.ep = b.stringify(e);
                    h.b.h()
                };
                e.c(window, "load", function() {
                    setTimeout(f, 500)
                })
            }
        } catch (k) {}
    })();
    (function() {
        var a = h.g,
            e = {
                init: function() {
                    try {
                        if ("http:" === a.protocol) {
                            var b = document.createElement("IFRAME");
                            b.setAttribute("src", "http://boscdn.bpc.baidu.com/v1/holmes-moplus/mp-cdn.html");
                            b.style.display = "none";
                            b.style.width = "1";
                            b.style.height = "1";
                            b.La = "0";
                            document.body.appendChild(b)
                        }
                    } catch (d) {}
                }
            },
            g = navigator.userAgent.toLowerCase(); - 1 < g.indexOf("android") && -1 === g.indexOf("micromessenger") && e.init()
    })();
    (function() {
        if ("378f3aa9b8779062c8de4dc247dd8874" === c.id) {
            var a = function(a) {
                    if (a.item) {
                        for (var b = a.length, d = Array(b); b--;)
                            d[b] = a[b];
                        return d
                    }
                    return [].slice.call(a)
                },
                e = {
                    click: function() {
                        for (var b = [], d = a(document.getElementsByTagName("a")), d = [].concat.apply(d, a(document.getElementsByTagName("area"))), e = /openZoosUrl\(/, g = 0, l = d.length; g < l; g++)
                            e.test(d[g].getAttribute("onclick")) && b.push(d[g]);
                        return b
                    }
                },
                g = function(a, b) {
                    for (var d in a)
                        if (a.hasOwnProperty(d) && b.call(a, d, a[d]) === r) return r
                },
                b = function(a, b) {
                    return Object.prototype.toString.call(a) === "[object " + b + "]"
                };
            window._hmt = window._hmt || [];
            var d, l = "/zoosnet" + (/\/$/.test("/zoosnet") ? "" : "/"),
                n = function(a, e) {
                    if (d === e) {
                        window._hmt.push(["_trackPageview", l + a]);
                        for (var g = +new Date; 500 >= +new Date - g;);
                        return r
                    }
                    if (b(e, "Array") || b(e, "NodeList")) for (var g = 0, n = e.length; g < n; g++)
                        if (d === e[g]) {
                            window._hmt.push(["_trackPageview", l + a + "/" + (g + 1)]);
                            for (g = +new Date; 500 >= +new Date - g;);
                            return r
                        }
                };
            (function(a, b, d) {
                a.addEventListener ? a.addEventListener(b, d, p) : a.attachEvent && a.attachEvent("on" + b, d)
            })(document, "click", function(a) {
                a = a || window.event;
                d = a.target || a.srcElement;
                var k = {};
                for (g(e, function(a, d) {
                    k[a] = b(d, "Function") ? d() : document.getElementById(d)
                }); d && d !== document && g(k, n) !== r;)
                    d = d.parentNode
            })
        }
    })();
})();