var BorderLayer = cc.Layer.extend({
	
	_borderArr : new Array(),
	_name : "BorderLayer",
	_borderIcon : ["border_00.png","border_01.png","border_02.png","border_03.png","border_04.png"],
	ctor:function () {
		this._super();
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/ButtonLightsBorders.plist");
		for (var i = 0; i < 15; i++) {
			// 这里产生的精灵是继承自Node，在其上加了一个精灵，所以后面对其操作时，需要分清楚是对它本身操作，还是对其子节点操作
			var node1 = new cc.Sprite("#border_00.png");
			node1.x = (80 + Math.floor(i / 3) *195);
			node1.y = (385 - (i % 3)*142),
			node1.setAnchorPoint(0, 0);
			this._borderArr[i] = node1;
			node1.setVisible(false);
			this.addChild(node1, 0);
		}
		return true;
	},
	judgementWhichOneBorderDisplay : function(ss,numb,istwink){
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/ButtonLightsBorders.plist");
		this._borderArr[ss].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(this._borderIcon[numb]));
		this._borderArr[ss].setVisible(true);
		if (istwink) {
			var btwinkle = Producer.ProduceFrameAnimation("border_", 3, 0, 0.1);
			this._borderArr[ss].runAction(cc.repeatForever(btwinkle));
		}
	},
	stopAllChildAction : function() {
		for ( var i in this._borderArr) {
			this._borderArr[i].stopAllActions();
			this._borderArr[i].setVisible(false);
		}
	},
	stopWhichChildAction : function(number) {
		this._borderArr[number].stopAllActions();
		this._borderArr[number].setVisible(false);
	},
	startRunAction : function() {

	},

	setPause:function(){
		for ( var i in this._borderArr) {
			this._borderArr[i].setPause();
		}

	},
	setResume:function(){
		for ( var i in this._borderArr) {
			this._borderArr[i].setResume();
		}
	},
	getname:function(){
		return this._name;
	},
	onEnter:function(){
		this._super();
		cc.log("BorderLayer enter");
	},
	onExit:function(){
		
		this._super();
		this.isAction = 0;
		for ( var i in this._borderArr) {
			this._borderArr[i].stopAllActions();
			this._borderArr[i].setVisible(false);
		}
	}
});
var borderLayer  = new BorderLayer();
borderLayer.retain();
