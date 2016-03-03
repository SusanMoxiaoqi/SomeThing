

var zhongZhiLayer = cc.LayerColor.extend({
	money : null,
	ctor:function () { 
		this._super(cc.color(255, 255, 255, 0));
		this.setOpacity(0);
		return true;
	},
	unuse : function() {
//		this.retain();
	},
	reuse : function() {
		this.removeFromParent(false);
	},
	onEnter:function(){

		this._super();
		var listener1 = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				if (mainScene_this._zhongZhiLayer.getLocalZOrder() == -1 || bounceNumber >0 || mainScene_this.allEqual != 10) {
					return false;
				};
				cc.log("zhongzhi touch onTouchBegan");
				isAuto = false;
				mainScene_this._soundKind = [];//每次使用完数组后，一定要把它给清空，若提前点击终止层，同样需要把它清空。
				mainScene_this.getscore = true;
				mainScene_this.unscheduleAllCallbacks();
				for ( var i in mainScene_this.elementArray) {
					mainScene_this.elementArray[i].stopchildAction(mainScene_this.eleZorder[i],nameArr[i]);
					mainScene_this._borderLayer.stopAllChildAction();
//					mainScene_this.elementArray[i].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(nameArr[i]));
					mainScene_this.elementArray[i].spriteChongZhiPostion();
				};
				mainScene_this.afterWinAction5(mainScene_this._WinIndex,mainScene_this._LineIndex)();
				return true;
			},
			onTouchMoved: function (touch, event) {
			},
			onTouchEnded: function (touch, event) {
				cc.log("zhongzhi touch onTouchEnded.. ");
			}
		});		

		cc.eventManager.addListener(listener1, this);
	}

});

zhongZhiLayer.create = function(){
	if (cc.pool.hasObject(zhongZhiLayer)) {
		return cc.pool.getFromPool(zhongZhiLayer);	
	}else{
		return new zhongZhiLayer();
	};
};










