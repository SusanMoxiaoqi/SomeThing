

var TestPushBox = cc.LayerColor.extend({
	money : null,
	ctor:function (aNode) { 
		this._super(cc.color(0,0,0,150));
		zuZhiBack = true;
		this.addChild(aNode,0,1);
		return true;
	},
	unuse : function() {
		zuZhiBack = false;
		cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
		if(this.getChildByTag(1)){
			this.removeChildByTag(1);
		}
		this.removeFromParent(false);
		cc.log("unuse");
		
//		this.retain();
	},
	reuse : function(aNode) {
		cc.log("resue");
		zuZhiBack = true;
		this.setVisible(true);
		this.addChild(aNode,0,1);
		this.setVisible(true);
	},
	onEnter:function(){
		
		this._super();
		var listener1 = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				return true;
			},
			onTouchMoved: function (touch, event) {
			},
			onTouchEnded: function (touch, event) {
				cc.log("test sprite onTouchesEnded.. =====");
			}
		});		
		
		cc.eventManager.addListener(listener1, this);
	},
	onExit : function(){
		this._super();
		zuZhiBack = false;
	}

});

TestPushBox.create = function(aNode){
	if (cc.pool.hasObject(TestPushBox)) {
		cc.log("已存在");
		return cc.pool.getFromPool(TestPushBox,aNode);	
	}else{
		cc.log("重新创建");
		return new TestPushBox(aNode);
	};
};










