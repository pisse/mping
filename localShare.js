(function(G, window, undefined) {
    var _init = false,
        _iframe = null,
        _ready = false,
        _handler = [],
        _core = null;

    G.app.localShare = function(fn) {
        if (false === _init) {
            G.app.localShare.onComplete = function() {
                _core = _iframe.contentWindow.storageCore;
                for (var i = 0, len = _handler.length; i < len; i++) {
                    typeof _handler[i] === "function" && _handler[i].call(_core)
                }
                _ready = true;
                _handler = null;
                _iframe = null;
                delete G.app.localShare.onComplete
            };

            //var _prefix = ('https:' == document.location.protocol) ? G.prefix.st_ssl : G.prefix.st;
            _iframe = document.createElement("IFRAME");
            _iframe.src = '/proxy.htm?v=xxxx';
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
})(G, window);
