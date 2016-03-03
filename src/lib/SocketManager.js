(function (console, $hx_exports) { "use strict";
$hx_exports.by = $hx_exports.by || {};
$hx_exports.by.utils = $hx_exports.by.utils || {};
Math.__name__ = true;
var by = {};
by.utils = {};
by.utils.SocketManager = $hx_exports.by.utils.SocketManager = function() { };
by.utils.SocketManager.__name__ = true;
by.utils.SocketManager.setLoginUrl = function(_url) {
	by.utils.SocketManager.loginUrl = _url;
};
by.utils.SocketManager.setGameUrl = function(_url) {
	by.utils.SocketManager.gameUrl = _url;
};
by.utils.SocketManager.getLoginServer = function(_reLinkCount) {
	if(by.utils.SocketManager.loginUrl == null) throw "请先调用  setLoginUrl";
	if(by.utils.SocketManager.loginSocket == null) {
		by.utils.SocketManager.loginSocket =  new exports.by.utils.BYSocket(by.utils.SocketManager.loginUrl,_reLinkCount)
	}else{
		by.utils.SocketManager.loginSocket.socket = null;
		by.utils.SocketManager.loginSocket.url = by.utils.SocketManager.loginUrl;
		by.utils.SocketManager.loginSocket.initSocket();
	}
	return by.utils.SocketManager.loginSocket;
};
by.utils.SocketManager.getGameServer = function(gameName,_reLinkCount) {
	if(by.utils.SocketManager.gameUrl == null) throw "请先调用  setGameUrl";
	if(by.utils.SocketManager.gameSocket == null) {
		by.utils.SocketManager.gameSocket =  new exports.by.utils.BYSocket(by.utils.SocketManager.gameUrl,gameName,_reLinkCount)
		}else{
			by.utils.SocketManager.gameSocket.socket = null;
			by.utils.SocketManager.gameSocket.url = by.utils.SocketManager.gameUrl;
			by.utils.SocketManager.gameSocket.initSocket();
		}
	if(by.utils.SocketManager.gameSocket.serverName != gameName) by.utils.SocketManager.gameSocket.serverName = gameName;
	return by.utils.SocketManager.gameSocket;
};
by.utils.SocketManager.closeServer = function(isGame,isDestroy) {
	if(isDestroy == null) isDestroy = false;
	if(isGame == null) isGame = false;
	if(isGame) {
		if(by.utils.SocketManager.gameSocket != null) {
			by.utils.SocketManager.gameSocket.close();
			if(isDestroy) by.utils.SocketManager.gameSocket = null;
		}
		return;
	}
	if(by.utils.SocketManager.loginSocket != null) {
		by.utils.SocketManager.loginSocket.close();
		if(isDestroy) by.utils.SocketManager.loginSocket = null;
	}
};
by.utils.SocketManager.log = function(v) {
	if (typeof(CONFIG) == "undefined") {
		return;
	};
	if(CONFIG.deBug == "Release"){
		return;
	}
	haxe.Log.trace(v,{ fileName : "SocketManager.hx", lineNumber : 109, className : "by.utils.SocketManager", methodName : "log"});
};
var haxe = {};
haxe.Log = function() { };
haxe.Log.__name__ = true;
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js.Boot.__string_rec(o[i1],s); else str2 += js.Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
String.__name__ = true;
Array.__name__ = true;
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
var SocketManager = exports.by.utils.SocketManager;
