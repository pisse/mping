;(function(window){

    (function(w, undefined) {
        if (w.localStorage !== undefined && !(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1)) {
            w.mbaShareCore = w.localStorage;
            return;
        }

        function UserData(file) {
            this.dom = document.getElementById("share_core");
            this.file = file || "user_data_default";
        };

        UserData.prototype = {
            setItem: function(k, v) {
                this.dom.setAttribute(k, v);
                this.dom.save(this.file);
            },

            getItem: function(k) {
                try { // 处理文件可能被QQ管家之类的东东删掉的情况
                    this.dom.load(this.file);
                }
                catch(e) {
                    return null;
                }
                return this.dom.getAttribute(k);
            },

            removeItem: function(k) {
                this.dom.removeAttribute(k);
                this.dom.save(this.file);
            },

            clear: function() {
                try { // 处理文件可能被QQ管家之类的东东删掉的情况
                    this.dom.load(this.file);
                    now = new Date(new Date().getTime() - 1);
                    this.dom.expires = now.toUTCString();
                    this.dom.save(this.file);
                } catch(e) {}
            }
        };

        w.mbaShareCore = new UserData("local_storage");
    })(window);

    var _encode = (function() {
        var escapeMap = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        function encodeString(source) {
            if (/["\\\x00-\x1f]/.test(source)) {
                source = source.replace(/["\\\x00-\x1f]/g,
                    function(match) {
                        var c = escapeMap[match];
                        if (c) {
                            return c
                        }
                        c = match.charCodeAt();
                        return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
                    })
            }
            return '"' + source + '"'
        }
        function encodeArray(source) {
            var result = ["["],
                l = source.length,
                preComma,
                i,
                item;
            for (i = 0; i < l; i++) {
                item = source[i];
                switch (typeof item) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if (preComma) {
                            result.push(",")
                        }
                        result.push(_encode(item));
                        preComma = 1
                }
            }
            result.push("]");
            return result.join("")
        }
        function pad(source) {
            return source < 10 ? "0" + source: source
        }
        function encodeDate(source) {
            return '"' + source.getFullYear() + "-" + pad(source.getMonth() + 1) + "-" + pad(source.getDate()) + "T" + pad(source.getHours()) + ":" + pad(source.getMinutes()) + ":" + pad(source.getSeconds()) + '"'
        }
        return function(value) {
            switch (typeof value) {
                case "undefined":
                    return "undefined";
                case "number":
                    return isFinite(value) ? String(value) : "null";
                case "string":
                    return encodeString(value);
                case "boolean":
                    return String(value);
                default:
                    if (value === null) {
                        return "null"
                    } else {
                        if (value instanceof Array) {
                            return encodeArray(value)
                        } else {
                            if (value instanceof Date) {
                                return encodeDate(value)
                            } else {
                                var result = ["{"],
                                    encode = _encode,
                                    preComma,
                                    item;
                                for (key in value) {
                                    if (value.hasOwnProperty(key)) {
                                        item = value[key];
                                        switch (typeof item) {
                                            case "undefined":
                                            case "unknown":
                                            case "function":
                                                break;
                                            default:
                                                if (preComma) {
                                                    result.push(",")
                                                }
                                                preComma = 1;
                                                result.push(encode(key) + ":" + encode(item))
                                        }
                                    }
                                }
                                result.push("}");
                                return result.join("")
                            }
                        }
                    }
            }
        }
    })();

    var _decode = function(string, secure) {
        if (typeof(string) != "string" || !string.length) {
            return null
        }
        if (secure && !(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(string.replace(/\\./g, "@").replace(/"[^"\\\n\r]*"/g, ""))) {
            return null
        }
        try {
            return eval("(" + string + ")")
        } catch(e) {
            return {}
        }
    }

    var storageCore = {
        setItem : function(key, value, expires) {
            var data = {
                'data' : value,
                'expires' : expires !== undefined ? ( new Date().getTime() + ( parseInt(expires, 10) || 0 ) ) : 0
            };
            mbaShareCore.setItem(key, _encode(data));
        },

        getItem : function(key) {
            var ret = null,
                val = mbaShareCore.getItem(key);
            if (val) {
                val = _decode( val );
                if ( val.expires ===0 ||  new Date().getTime() < val.expires ) {
                    ret = val.data;
                }
                else {
                    this.removeItem(key);
                }
            }

            return ret;
        },

        removeItem : function(key) {
            mbaShareCore.removeItem(key);
        },

        clear : function() {
            mbaShareCore.clear();
        }
    };

    MPing.tools || (MPing.tools = {});
    MPing.tools.lstg =  storageCore;

    try{
        //上报localstg里面的click并上报
        var mba_click = storageCore.getItem("mba_click");
        if(mba_click){
            var image = new Image(1,1);
            image.src = mba_click;
            storageCore.removeItem("mba_click");
        }
    } catch(e){}


}(window));