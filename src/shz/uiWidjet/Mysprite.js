
var MySprite = cc.Sprite.extend({
	sprite : null,
	spriteName:null,
	PlaceY:null,//记录初始化时的Y坐标
	MixupAction:null,
	type:0,
	tempType:0,
	isAction : false,
	border : ["border_00.png","border_01.png","border_02.png"],
	_localZOrder : 0,
	_borderLayer : null,
	_xiaBiao : 0,
	_guang : null,
//	var data = {
//			name : nameArr[i],
//			plaxeY : 0,
//			Zorder : _this.eleZorder[i],
//			xiaBiao : i,
//	};
	ctor:function(data){
		this._super("#"+data.name);
		this.spriteName=data.name;
		this.PlaceY = data.plaxeY?data.plaxeY : 0;
		this._localZOrder = data.Zorder?data.Zorder : 0;
		this._xiaBiao = data.xiaBiao;
		this._borderLayer = borderLayer;
		var clipnN = new ccui.Layout;
		clipnN.setClippingEnabled(true);
		clipnN.setContentSize(176, 130);
		clipnN.anchorX = 0;
		clipnN.anchorY = 0;
		clipnN.x = 0;
		clipnN.y = 0;
		this.addChild(clipnN);
		var guang = new cc.Sprite("#guang.png");
		this._guang = guang;
		guang.x = 0;
		guang.y = 150;
		clipnN.addNode(guang);
		return true;
	},
	runchildAction : function(mm,action,num,isTwinkle,type) {//带有闪光的那个动画
		if(!this.isAction){
			this.isAction = true;
			this.runAction(cc.Sequence(
				cc.callFunc(function() {
					this.setLocalZOrder(this._localZOrder+15);
					this._borderLayer.judgementWhichOneBorderDisplay(mm,num,isTwinkle);
				},this),
				//action,
				cc.callFunc(function() {
					this.setSpriteFrame("result_"+type+"_2_00.png");
					this._guang.runAction(cc.moveBy(0.5, 176, -150));
				}, this),
				cc.delayTime(0.5),
				cc.callFunc(function() {
					this.setSpriteFrame("result_"+type+"_1.png");
					this._guang.setPosition(0, 150);
					this.isAction = false;
					this.setLocalZOrder(this._localZOrder);
					this._borderLayer.stopWhichChildAction(mm);
				},this)
				));
		}
	},
	runchildAction1 : function(mm,action,num,isTwinkle) {//最后的个帧动画
		if(!this.isAction){
			this.isAction = true;
			this.runAction(cc.Sequence(
					cc.callFunc(function() {
						this.setLocalZOrder(this._localZOrder+15);
						this._borderLayer.judgementWhichOneBorderDisplay(mm,num,isTwinkle);
					},this),
					action,
					cc.delayTime(0.2),
					cc.callFunc(function() {
						this.isAction = false;
						this.setLocalZOrder(this._localZOrder);
						this._borderLayer.stopWhichChildAction(mm);
					},this)
			));
		}
	},
	stopchildAction : function(eleOrder,frameName) {
		this.stopAllActions();
		this._guang.stopAllActions();
		this._guang.setPosition(0, 150);
		this.isAction = false;
		this.setLocalZOrder(eleOrder);
		this._borderLayer.stopWhichChildAction(this._xiaBiao);
		this.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(frameName));
	},
	setisAction : function(isaction) {
		this.isAction = isaction;
	},
	getisAction : function() {
		return this.isAction;
	},
	setImageName:function (aImageName) {
		this.spriteName = aImageName;
	},
	setType:function (type) {
		this.type = type;
		this.tempType = type;
	},
	getType:function () {
	return this.type;		
	},
	setTempType:function (type) {
		this.tempType = type;
	},
	getTempType:function () {
	   return	this.tempType;
	},
	setPlace:function (aPlaceY) {
		this.PlaceY = aPlaceY;
	},
	getImageName:function () {
		return this.spriteName;
	},
	getPlace:function () {
		return this.PlaceY;
	},
	getMixupAction:function(){
		return this.MixupAction;
	},
	spriteRunBufferAction:function(){
		this.setVisible(true);
		this.stopAllActions();
		this.setPositionY(this.PlaceY);
		this.runAction(
				cc.Sequence(
						cc.moveBy(0.1, 0, -30),
						cc.moveBy(0.1, 0, 30)
				));
	},
	spriteChongZhiPostion:function(){
		this.setVisible(true);
		this.stopAllActions();
		this.setPositionY(this.PlaceY);
	},
	unuse : function() {

//		this.retain();
	},
	reuse : function(data) {
		this.spriteName=data.name;
		this.setSpriteFrame(data.name);
		this.PlaceY = data.plaxeY?data.plaxeY : 0;
		this._localZOrder = data.Zorder?data.Zorder : 0;
		this._xiaBiao = data.xiaBiao;
		this._borderLayer = borderLayer;
		this._guang.setPosition(0, 130);
	},
});


MySprite.create = function(data){
	if (cc.pool.hasObject(MySprite)) {
		cc.log("已存在");
		return cc.pool.getFromPool(MySprite,data);	
	}else{
		cc.log("重新创建");
		return new MySprite(data);
	};
};

//创建你的精灵
//var sprite = new MySprite(texture,cc.rect(0,0,480,320));
