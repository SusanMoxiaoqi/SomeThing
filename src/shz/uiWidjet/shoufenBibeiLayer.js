

var shouFenBibeiLayer = cc.LayerColor.extend({
	money : null,
	ctor:function (aNode) { 
		this._super(cc.color(0,0,0,150));
		this.addChild(aNode,0,1);
		return true;
	},

	unuse : function() {
		if(this.getChildByTag(1)){
			this.removeChildByTag(1);
		}
		this.removeFromParent(false);
		cc.log("unuse");

//		this.retain();
	},
	reuse : function(aNode) {
		this.addChild(aNode,0,1);
	},
	onEnter:function(){

		this._super();
		var listener1 = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
			var order =mainScene_this.zhezhao_layer.getLocalZOrder()
			if (order <= 0) {
				return false;
			}
			if (mainScene_this.allEqual != 10) {//如果是全盘奖把全盘奖的下元宝的特效去掉
				cc.audioEngine.stopMusic(true);
				mainScene_this.removeChildByTag(111, true);
			}
				mainScene_this._isKongxian = true;
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				mainScene_this.AutoDefen(mainScene_this.GetScore_button);
				return true;
			},
			onTouchMoved: function (touch, event) {
			},
			onTouchEnded: function (touch, event) {
				cc.log("shoufen sprite onTouchesEnded.. ");
			}
		});		

		cc.eventManager.addListener(listener1, this);
	}

});

shouFenBibeiLayer.create = function(aNode){
	if (cc.pool.hasObject(shouFenBibeiLayer)) {
		cc.log("已存在");
		return cc.pool.getFromPool(shouFenBibeiLayer,aNode);	
	}else{
		cc.log("重新创建");
		return new shouFenBibeiLayer(aNode);
	};
};










