//cookie存储事件串
var EventSeriesCookie = {
    updateSeries: function(eventId){
        var curSeries = this.getCookiePart("mba_cur_e"),
            eventLevel = eventId && MPing.events.map[eventId];

        if(!eventLevel) return;//找不到事件对应的等级，退出

        var cur_arr, start;
        !curSeries ? ( cur_arr = [], start = 0 ) : (cur_arr = curSeries.split("|"), start = parseInt(eventLevel)-1);
        for(var i= start; i<5; i++ ){
            cur_arr[i] = (i== parseInt(eventLevel)-1) ? eventId : "";
        }

        this.setCookiePart("mba_cur_e", cur_arr.join("|"));
    },
    addSeries: function(id){
        var comSeries = this.getCookiePart("mba_cur_com"),
            curSeries = this.getCookiePart("mba_cur_e"),
            comObj = {}, n, start, len;

        if(!curSeries) return; //当前没有事件,不能保存sku对应的事件串

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

var tools = new Tools();

(function(){
    var timestamp=(new Date()).getTime();
    //设置mba_muid
    if(!tools.getCookie("mba_muid")){
        tools.setCookie("mba_muid" ,tools.getUniq() ,1*365*24*60*60*1000 );//1年过期
    }else{
        tools.setCookie("mba_muid" ,tools.getCookie("mba_muid") ,1*365*24*60*60*1000 );//1年过期
    }

    //设置mba_sid
    if(!tools.getCookie("mba_sid")){
        tools.setCookie("mba_sid" ,timestamp+"" + parseInt(Math.random()*9999999999999999) ,30*60*1000 );//半小时过期
    }else{
        tools.setCookie("mba_sid" ,tools.getCookie("mba_sid") ,30*60*1000 );//半小时过期
    }
})();