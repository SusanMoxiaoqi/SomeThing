var brc = brc || {};
brc.clipperNode = cc.Node.extend({
	_clipper : null,
	_isHide : true,
	_actionKaiShi : false,
	_width : null,
	_height : null,
	_node : null,
	ctor : function(node,width ,height ) {
		this._super();
		this._width = width;
		this._height = height;
		this._node = node;
		this.init(node,width ,height);
	},
	init : function(node,width ,height) {
		var self = this;
		node.x = width/2;
		node.y = height/2 + height;
		if(!self._clipper){
			self._clipper = new cc.ClippingNode();
			self._clipper.width = width;
			self._clipper.height = height ;
			self._clipper.anchorX = 0.5;
			self._clipper.anchorY = 0.5;
			self.addChild(self._clipper,0,1);
			//绘制节点
			var stencil = new cc.DrawNode();
			var rectangle = [cc.p(0, 0),cc.p(width, 0),
			                 cc.p(width, height),
			                 cc.p(0, height)];
			var white = cc.color(255, 255, 255, 255);
			stencil.drawPoly(rectangle, white, 1, white);
			self._clipper.stencil = stencil;
		}
		self._clipper.addChild(node, 0, 1);
	},
	runClipper : function(view) {
		var self = this;
		if(self._isHide){
			if(!self._actionKaiShi){
				self._actionKaiShi = true;
				self._node.setVisible(true);
				var action1 = cc.Sequence(
						cc.MoveTo(0.5,cc.p(self._width/2, self._height/2)).easing(cc.easeElasticOut(1.5)),
						cc.callFunc(function (nodeExecutingAction, value) {
							self._actionKaiShi = false;
							self._isHide = false;
							view._isXuanCha = true;
						}, this)
				);
				self._node.runAction(action1);
			}
		}else{
			if(!self._actionKaiShi){
				self._actionKaiShi = true;
				var action1 = cc.Sequence(
						cc.MoveTo(0.3,cc.p(self._width/2, self._height/2+self._height)),
						cc.callFunc(function (nodeExecutingAction, value) {
							self._actionKaiShi = false;
							self._isHide = true;
							view._isXuanCha = false;
							self._node.setVisible(false);
						}, this)
				);
				self._node.runAction(action1);
			}
		}
	},
	onExit : function() {
		this._super();
	}
}); 