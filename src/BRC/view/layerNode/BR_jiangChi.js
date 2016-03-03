var brc = brc || {};
brc.jiangChiNode = cc.Node.extend({
	_nodeArr : [],
	_parent : null,
	ctor : function() {
		this._super();
		var self = this;
		for ( i = 0;i<10;i++) {
			var bNode = new aJiangChiNode();
			bNode.setSpriteBg(false);
			bNode.x = 20.5*i;
			bNode.y = 0;
			this.addChild(bNode);
			this._nodeArr[i] = bNode;
		}
	},
	initZhi : function(num) {
		var str = numStr.toString();
		var len = str.length;
		for (var i = len; i < 10; i++) {
			str = "0".concat(str);
		};
		for ( var i in this._nodeArr) {
			this._nodeArr[i].initZhi(str[i]);
		};
	},
	sheZhiStr : function(numStr) {
		var str = numStr.toString();
		var len = str.length;
		for (var i = len; i < 10; i++) {
			str = "0".concat(str);
		};
		for ( var i in this._nodeArr) {
			this._nodeArr[i].sheZhiZhi(str[i]);
		};
	},

});