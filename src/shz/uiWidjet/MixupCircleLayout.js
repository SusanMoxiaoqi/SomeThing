var MixupCircleLayout = ccui.Layout.extend({
	_name : "MixupCircleLayer",
	_duration : 0.6,//控制模糊动画转动的快慢
	_mixup1 : null,
	_mixup2 : null,
	_isAction : false,
	_addNum : 0,
	ctor:function (AddNum) {
		this._super();
		this._addNum = AddNum;
		this.setClippingEnabled(true);
		this.setContentSize(cc.size(176, 150));
		this._mixup1 = new cc.Sprite("#running.png");
		this._mixup1.setAnchorPoint(0, 0);
		this._mixup1.attr({
			x : 0,                  
			y : -AddNum,                             
		});
		this.addChild(this._mixup1, 0);
		this._mixup2 = new cc.Sprite("#running.png");
		this._mixup2.setAnchorPoint(0, 0);
		this._mixup2.attr({
			x : 0,                  
			y : 1224-AddNum,                             
		});
		this.addChild(this._mixup2, 0);
	},
	initData : function(AddNum) {
		this._mixup1.setPositionY(-AddNum);
		this._mixup2.setPositionY(1224-AddNum);
	},
	reuse : function(AddNum) {
		this.initData(AddNum);
	},
	unuse : function() {
//		this.retain();
	},
	setPause:function(){
		this._mixup1.pause();
		this._mixup2.pause();
	},
	setResume:function(){
		if (this._isAction) {
			this._mixup1.resume();
			this._mixup2.resume();
		}else {
			this._isAction = true;
			var AddNum1 = Math.floor(Math.random()*1000);
			this._addNum = AddNum1;
			this.initData(AddNum1);
			this._mixup1.runAction(cc.repeatForever(
					cc.sequence(
							cc.moveBy(this._duration, 0, -1224),
							cc.callFunc(function() {
								if (this._mixup1.getPositionY() == -1224-this._addNum) {
									this._mixup1.setPositionY(-this._addNum);
								}			
							}, this))
			));
			this._mixup2.runAction(cc.repeatForever(
					cc.sequence(
							cc.moveBy(this._duration, 0, -1224),
							cc.callFunc(function() {
								if (this._mixup2.getPositionY() == -this._addNum) {
									this._mixup2.setPositionY(1224-this._addNum);
								}
							}, this))
			));
		}
	},
	getname:function(){
		return this._name;
	},

});