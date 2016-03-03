(function (console, $hx_exports) { "use strict";
$hx_exports.by = $hx_exports.by || {};
$hx_exports.by.utils = $hx_exports.by.utils || {};
var by = {};
by.utils = {};
by.utils.BYSocket = $hx_exports.by.utils.BYSocket = function(_url,_serverName,_reLinkCount) {
	if(_serverName == null) _serverName = "login";
	this.socket = null;
	this.msgList = null;
	this.isMyClose = false;
	this.isConnect = false;
	this.isReady = false;
	this.isGame = false;
	if(_reLinkCount==null) _reLinkCount = 3;
	this.curLinkCount=0;
	this.reLinkCount=_reLinkCount;
	this.url = _url;
	if(_serverName != "login") this.isGame = true;
	this.serverName = _serverName;
	this.initSocket();
};
by.utils.BYSocket.prototype = {
	initSocket: function() {
		this.msgList = [];
		this.isMyClose = false;
		this.socket = new WebSocket(this.url);
		this.socket.binaryType = "arraybuffer";
		this.socket.onopen = $bind(this,this.onOpenHandle);
		this.socket.onclose = $bind(this,this.onCloseHandle);
		this.socket.onerror = $bind(this,this.onErrorHandle);
		this.socket.onmessage = $bind(this,this.onMessageHandle);
	}
	,onOpenHandle: function(event) {
		this.curLinkCount=0;
		this.isConnect = true;
		this.isReady = false;
		if(this.isGame) {
			var ccEvent = new cc.EventCustom("server_game_open"+this.serverName);
			ccEvent.setUserData(event);
			cc.eventManager.dispatchEvent(ccEvent);
		} else {
			var ccEvent1 = new cc.EventCustom("server_login_open");
			ccEvent1.setUserData(event);
			cc.eventManager.dispatchEvent(ccEvent1);
		}
	}
	,onCloseHandle: function(event) {
		this.socket = null;
		this.isConnect = false;
		this.isReady = false;
		if(this.isGame) {
			var ccEvent = new cc.EventCustom("server_game_close"+this.serverName);
			ccEvent.setUserData(event);
			cc.eventManager.dispatchEvent(ccEvent);
		} else {
			var ccEvent1 = new cc.EventCustom("server_login_close");
			ccEvent1.setUserData(event);
			cc.eventManager.dispatchEvent(ccEvent1);
		}
		
	}
	,onErrorHandle: function(event) {
		this.socket = null;
		this.isConnect = false;
		this.isReady = false;
		if(this.isGame) {
			var ccEvent = new cc.EventCustom("server_game_error"+this.serverName);
			ccEvent.setUserData(event);
			cc.eventManager.dispatchEvent(ccEvent);
		} else {
			var ccEvent1 = new cc.EventCustom("server_login_error");
			ccEvent1.setUserData(event);
			cc.eventManager.dispatchEvent(ccEvent1);
		}
	}
	,onMessageHandle: function(event) {
		if(this.isReady == false) {
			var msg = new Uint8Array(event.data);
			var len = msg.length;
			var reply = new Uint8Array(len);
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				reply[msg[i]] = i;
			}
			if(this.socket != null) this.socket.send(reply.buffer);
			this.isReady = true;
			if(this.msgList != null) {
				var cacheMsg = null;
				while(this.msgList.length > 0) {
					cacheMsg = this.msgList.shift();
					var buffer = by.utils.BYSocket.BinUtils.makeSendPacket(cacheMsg.mainCmd,cacheMsg.subCmd,cacheMsg.msg,cacheMsg.map,cacheMsg.zip,this.serverName);
						if(this.socket != null) this.socket.send(buffer);
				}
			}
			return;
		}
		var _msg = by.utils.BYSocket.BinUtils.buffer2Obj(event.data,this.serverName);
		_msg.server = this;
		if(this.isGame) {
			var ccEvent = new cc.EventCustom("server_game_message"+this.serverName);
			ccEvent.setUserData(_msg);
			cc.eventManager.dispatchEvent(ccEvent);
		} else {
			var ccEvent1 = new cc.EventCustom("server_login_message");
			ccEvent1.setUserData(_msg);
			cc.eventManager.dispatchEvent(ccEvent1);
		}
	}
	,sendMessage: function(mainCmd,subCmd,obj,isMap,isCompress) {
		console.log(">>>>>>>>>>>>>>>>>>"+mainCmd+";"+subCmd);
		if(isCompress == null) isCompress = true;
		if(isMap == null) isMap = true;
		if(this.socket == null && this.isMyClose == false) this.initSocket();
		if(this.isReady == false) {
			if(this.msgList != null) this.msgList.push({ mainCmd : mainCmd, subCmd : subCmd, msg : obj, map : isMap, zip : isCompress});
			return;
		}
		var buffer = by.utils.BYSocket.BinUtils.makeSendPacket(mainCmd,subCmd,obj,isMap,isCompress,this.serverName);
		this.socket.send(buffer);
	},
	close:function(){
		this.isMyClose = true;//主动关闭连接
		if (this.socket != null){
			this.socket.close();
			this.socket = null;
		}
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
by.utils.BYSocket.BinUtils = exports.by.utils.BinaryUtils;
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
