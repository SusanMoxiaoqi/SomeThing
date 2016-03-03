var brc = brc || {};
//表情动画
brc.biaoqianganimation = cc.Node.extend({
	_biaoqingSprite : null,
	ctor : function(type) {
		this._super();
		brc.biaoqianganimation.self = this;
		this.init(type);
	},
	init : function(type) {
		cc.spriteFrameCache.addSpriteFrames("res/br_res/baiRenTanChuRes/BiaoQing.plist");
		
		var biaoqingArray = ["BR_FenNu_","BR_Han_","BR_DeYi_","BR_Kun_","BR_QingTianPili_"
		                     ,"BR_JingE_","BR_BaoCou_","BR_aonao_","BR_KeLian_","BR_Daku_"
		                     ,"BR_MaiMeng_","BR_BaiFo_","BR_DaZhaoHu_","BR_DaXiao_"];
		var biaoqingCount = [3,2,9,9,6,2,3,8,4,3,4,5,14,2];
		var biaoqingSprite = cc.Sprite.createWithSpriteFrameName(biaoqingArray[type]+"0.png");
		var animate = Producer.ProduceFrameAnimation(biaoqingArray[type], biaoqingCount[type], 6, 0.1);
		
		var repeateForAction = cc.repeatForever(animate);
		biaoqingSprite.runAction(repeateForAction);
		this.addChild(biaoqingSprite, 10);
		this._biaoqingSprite = biaoqingSprite;
		this.scheduleOnce(this.removeAcion, 2.8);
	},
	
	removeAcion : function() {
		this._biaoqingSprite.stopAllActions();
		this.removeFromParent(false);
	},
}); 