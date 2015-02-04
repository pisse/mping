(function(MPing, window, undefined) {
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
    //document.addEventListener("DOMContentLoaded", function(e) {
        MPing.tools.localShare();
    //}, false);

})(MPing, window);
