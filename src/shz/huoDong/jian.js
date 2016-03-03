

var jian = cc.Node.extend({
    feiXingBiLiZhi : 1,//箭飞出的距离的比例值
    jianPengZhuangQu : null,//弓箭的碰撞区域
    radius : 10,//碰撞区域的半径
	ctor:function (Data) { 
		this._super();
		jian.self = this;
		var self = this;
		this.feiXingBiLiZhi = 1;
		this.setScale(1);
		this.init();
		 
		return true;
	},
	onEnter : function() {
		this._super();
	},
    init : function() {
        var self = this;
    	var sprite = cc.Sprite.createWithSpriteFrameName("JF_jian.png");
    	sprite.anchorX = 0.5;
    	sprite.anchorY = 0.5;
    	self.addChild(sprite,0,1);
    	self.createPengZhuangQu();
    	
	},
	//创建碰撞区域
	createPengZhuangQu : function() {
		var self =this;
		if(!self.jianPengZhuangQu){
			self.jianPengZhuangQu = new cc.DrawNode();
			this.addChild(self.jianPengZhuangQu, 10);
			self.jianPengZhuangQu.drawDot(cc.p(0, 85),self.radius, cc.color(0, 100, 100, 128));
			
		}
		self.jianPengZhuangQu.setVisible(false);
	},
	//箭射出的动作以及弓射出箭特效
	jianSheJi : function( point,rotation) {
		var self = this;
		var sprite = huoDong_JF.self.JF_jianAry[huoDong_JF.self.JF_jianAry.length-1];
		var dx = point.x-this.x;
		var dy = point.y-this.y;
		var juLi = Math.sqrt(dx*dx + dy*dy);
		var zongJuLi = Math.sqrt(cc.winSize.width*cc.winSize.width + cc.winSize.height*cc.winSize.height);
		var biLi = zongJuLi/juLi;
		var endX = biLi*dx+this.x;
		var endY = biLi*dy+this.y;
		var action =  cc.Sequence(
				cc.moveTo(1.5,cc.p(endX, endY)),
				cc.callFunc(function (nodeExecutingAction, value) {
					self.unschedule(self.jianFeiXingBianHua);
					if(huoDong_JF.self.JF_jianAry.length>0){
						huoDong_JF.rootNode.removeChild(huoDong_JF.self.JF_jianAry[0]);
						cc.pool.putInPool(self);
						huoDong_JF.self.JF_jianAry.shift();
					}
				}, this)
				);
		huoDong_JF.teXiao.setVisible(true);
		if(!huoDong_JF.self.isTeXiao){
			huoDong_JF.self.isTeXiao =true;
			if(!huoDong_JF.self.faSheTeXiaoAnimation ){
				var animate = Producer.ProduceFrameAnimation("faSheTeXiao_", 4, 1, 0.05);
				huoDong_JF.self.faSheTeXiaoAnimation = cc.Sequence(
						animate,
						cc.callFunc(function (nodeExecutingAction, value) {
//							cc.audioEngine.playEffect(Effect_res.JF_sheJian),
							huoDong_JF.self.faSheTeXiaoAnimation.retain();
							huoDong_JF.teXiao.setVisible(false);
							huoDong_JF.self.isTeXiao =false;
						}, this));
				huoDong_JF.teXiao.runAction(huoDong_JF.self.faSheTeXiaoAnimation);
			}else{
				huoDong_JF.teXiao.runAction(huoDong_JF.self.faSheTeXiaoAnimation);
			}
		}
		sprite.schedule(sprite.jianFeiXingBianHua, 0.15, cc.REPEAT_FOREVER);
		sprite.runAction(action);
	},
	//箭射出时按照比例变小
	jianFeiXingBianHua : function(dt) {
		this.setScale(this.feiXingBiLiZhi);
		this.feiXingBiLiZhi -= 0.10;
	},
	//移除箭
	jianRemove : function(idx) {
		var self = this;
		if(huoDong_JF.self.JF_jianAry.length>0){
			cc.pool.putInPool(this);
			huoDong_JF.self.JF_jianAry[idx].stopAllActions();
			huoDong_JF.rootNode.removeChild(huoDong_JF.self.JF_jianAry[idx]);
			huoDong_JF.self.JF_jianAry.splice(idx, 1);

		}
	},
	unuse : function() {
	},
	
	reuse : function() {
		var self = this;
		this.feiXingBiLiZhi = 1;
		this.setScale(1);
	}
});

jian.create = function(){
	if (cc.pool.hasObject(jian)) {
		return cc.pool.getFromPool(jian);	
	}else{
		return new jian();
	};
};










