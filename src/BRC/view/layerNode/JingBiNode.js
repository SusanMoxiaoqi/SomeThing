var brc = brc || {};

brc.jingBiNode = cc.Node.extend({
	_jinBi : null,
	_jingBiYaNa : 0,
	_type : 0,
	_isFeiRuZhuang : false,
	_speed : 0.5,
	ctor : function(Data) {
		this._super();
		this.init();
	},
	init : function() {
		var self = this;
		self._jinBi  = cc.Sprite.createWithSpriteFrameName("BR_tongBi.png");
		self._jinBi.setScale(0.8);
		self.addChild(self._jinBi, 0, 1);
	},
	//更改金币图片
	setSpriteFrameImage : function(type) {
		var self = this;
		switch (type){
			case 1:
				self._jinBi.setSpriteFrame("BR_yingBi.png");
				break;
			case 2:
				self._jinBi.setSpriteFrame("BR_tongBi.png");
				break;
			case 3:
				self._jinBi.setSpriteFrame("BR_jingZhuan.png");
				break;
			default :

				break;
		}
		self._type = type;
	},
	spriteRunActionWanJia : function(delayTimes, rect){
		var self = this;
		var number = Math.random()*5;
		var number1 = Math.random()*5;
		var data = (rect.x+number*8 - self.x)/2 + self.x + 100;
		var data1 = ( rect.y+number1*8- self.y)/2 + self.y;
		var action =cc.sequence(
			delayTimes,
			cc.callFunc(function (nodeExecutingAction, value) {
				self.setVisible(true);
			}, this),
			cc.moveTo(self._speed,cc.p(rect.x ,rect.y)),
			cc.callFunc(function (nodeExecutingAction, value) {
				self.setVisible(false);
			}, this));
		self.runAction(action);
	},
	//金币飞出动作
    spriteRunAction : function(type , spriteX , spriteY ,delayTime) {
    	var self = this;
		if(type == 1 || type == 3){
			var number = (Math.random()-0.5)*10;
			var number1 = (Math.random()-0.5)*10;
		}else{
			var number = (Math.random()-0.5)*6;
			var number1 = (Math.random()-0.5)*6;
		}
		var data = (spriteX+number*15 - self.x)/2 + self.x;
		var data1 = ( spriteY+number1*15- self.y)/2 + self.y + 100;
    	var controlPoints2 = [ cc.p(self.x, self.y),
    	                       cc.p(data,data1),
    	                       cc.p(spriteX+number*15, spriteY+number1*13) ];
		if(self._type == 3){
			var rotate = Math.random()*360;
			self.setRotation(rotate);
			var bezierTo1 = cc.spawn(cc.bezierTo(self._speed, controlPoints2),cc.RotateBy(self._speed,360));
		}else{
			var bezierTo1 = cc.bezierTo(self._speed, controlPoints2);
		}

		var scaleTo = cc.sequence(cc.scaleTo(0.3,0.8));
    	var action;
		action =cc.sequence(
			cc.callFunc(function(){
				self.setVisible(true);
			}),
			bezierTo1);
		if(type >=3){
			self.runAction(cc.sequence(delayTime,action));
		}else{
			self.runAction(action);
		}

	},
	unuse : function(Data) {
		var self = this;
		self.stopAllActions();
		self.removeFromParent(false);
	},
	reuse : function(Data) {

	},
	onExit : function() {
		this._super();
	}
});
brc.jingBiNode.create = function(Data){
	if (cc.pool.hasObject(brc.jingBiNode)) {
		return cc.pool.getFromPool(brc.jingBiNode,Data);
	}else{
		return new brc.jingBiNode(Data);
	};
};
