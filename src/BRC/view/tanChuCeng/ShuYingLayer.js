//输赢界面
var brc = brc || {};
brc.shuYingLayer = brc.BaseLayer.extend({
	_isPutPoolInt : false,
	_guangXiao : null,
	_gongXi : null,
	_diTu : null,
	_dianPingJiXu : null,
	_shuYingShuZi : [],
	_yongHuTouXiang : null,
	_zhuanGuang : null,
	_beiJingGuang : null,
	_xingXingAry : [],
	ctor:function(Data){
		this._super(true);
		//this.init(Data);
		var self = this;
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function(touch, event){
				if(!self._isPutPoolInt){
					self._isPutPoolInt = true;
					cc.pool.putInPool(self);
				}
				return true;
			}
		}, self);
		this.initNew(Data);
	},
	initNew : function(Data){
        var self = this;
		self._rootNode = new ccs.load("res/br_res/jieSuanNode.json").node;
		self._rootNode.anchorX = 0.5;
		self._rootNode.anchorY = 0.5;
		self._rootNode.x = cc.winSize.width/2;
		self._rootNode.y = cc.winSize.height/2;
		self.addChild(self._rootNode,0,1);
        self._guangXiao = self._rootNode.getChildByName("BR_huangGuang");
		self._gongXi = self._rootNode.getChildByName("BR_gongXi");
		self._diTu = self._rootNode.getChildByName("BR_diTu");
		self._dianPingJiXu = self._rootNode.getChildByName("BR_dianPingJiXu");
		self._diTu.x = 500;
		self._yongHuTouXiang = self._diTu.getChildByName("yongHuTouXiang");
		self._yongHuTouXiang.setSpriteFrame(touXiangFrame[USER_wFaceID]);
		self._zhuanGuang = self._rootNode.getChildByName("BR_zhuanGuang");
		self._beiJingGuang = self._rootNode.getChildByName("BR_beiJingGuang");
		self._diGuang = self._rootNode.getChildByName("BR_diGuang");
		var jiaHao = self._diTu.getChildByName("jiaHao");
		self._shuYingShuZi.push(jiaHao);
		self.createShuZiTiaoDong(Data+"");
        self.runActionAndAnimation();
		self.createXingXing();
		self.xingAction();
		self.scheduleOnce(self.hideSelfLayer ,6);
	},
	createXingXing : function(){
		var self = this;
		for(var i = 0 ;i<3 ;i++){
			var sprite = cc.Sprite.createWithSpriteFrameName("BR_JS_xingxing.png");
			var number = Math.random()*360;
			sprite.setRotation(number);
			self._rootNode.addChild(sprite);
			self._xingXingAry.push(sprite);
		}
	},
	xingAction : function(){
		var self = this;
		for(var key in self._xingXingAry){
			var number = Math.random()*50+50;
			if(self._xingXingAry[key]){
				self._xingXingAry[key].opacity = 500;
				var action ;
				if(key == 0){
					self._xingXingAry[key].setPosition(cc.p(number,100+number));
					self._xingXingAry[key].setScale(0.8);
					action = cc.sequence(cc.moveTo(0.5,cc.p(self._xingXingAry[key].x+100,self._xingXingAry[key].y+100)),cc.spawn(cc.moveBy(1,cc.p(+50,+50)),cc.fadeOut(0.5)));
				}else if(key == 1) {
					self._xingXingAry[key].setPosition(cc.p(-number,100+number));
					self._xingXingAry[key].setScale(0.8);
					action = cc.sequence(cc.moveTo(0.5,cc.p(self._xingXingAry[key].x-100,self._xingXingAry[key].y+100)),cc.spawn(cc.moveBy(1,cc.p(-50,+50)),cc.fadeOut(0.5)));
				}else if(key == 2){
					self._xingXingAry[key].setPosition(cc.p(number,100-number));
					self._xingXingAry[key].setScale(1);
					action = cc.sequence(cc.moveTo(0.5,cc.p(self._xingXingAry[key].x+100,self._xingXingAry[key].y-100)),cc.spawn(cc.moveBy(1,cc.p(+50,-50)),cc.fadeOut(0.5)));
				}
				self._xingXingAry[key].runAction(action);
			}
		}
	},
	hideSelfLayer : function(){
        var self = this;
		if(!self._isPutPoolInt){
            self._isPutPoolInt = true;
			cc.pool.putInPool(self);
		}
	},
	createShuZiTiaoDong : function (string){
        var self = this;
		for(var i = 0; i < string.length ; i++){
           var sprite =  cc.Sprite.createWithSpriteFrameName("BR_JS_"+string[i]+".png");
			sprite.y = self._shuYingShuZi[0].y;
			sprite.x = self._shuYingShuZi[0].x + 38*(i+1);
			self._diTu.addChild(sprite,0,i);
			self._shuYingShuZi.push(sprite);
		}
	},
	runActionAndAnimation : function(){
        var self = this;
		self._guangXiao.setScale(0.8);
		self._diGuang.setScale(0.5);
		self._guangXiao.opacity = 1000;
		self._diGuang.opacity = 1000;
		cc.audioEngine.playEffect(Effect_res_exist.dj_kaijiangOnce);
		var action = cc.sequence(cc.moveTo(0.3,cc.p(0,self._diTu.y)),cc.callFunc(function (nodeExecutingAction, value) {
			for(var key in self._shuYingShuZi){
				var action = cc.sequence(cc.delayTime(0.05*key),cc.jumpTo(0.3,cc.p(self._shuYingShuZi[key].x,self._shuYingShuZi[key].y),20,1));
				self._shuYingShuZi[key].runAction(action);
			}
			self._dianPingJiXu.opacity = 0;
			self._dianPingJiXu.runAction(cc.sequence(cc.fadeIn(1),cc.fadeIn(1).reverse()).repeatForever());
		}, this));
		self._gongXi.setScale(0.1);
		self._gongXi.runAction(cc.ScaleTo.create(0.8,1).easing(cc.easeElasticInOut(0.4)));
		self._zhuanGuang.runAction(cc.repeatForever(cc.rotateBy(12, 360)))
        self._diTu.runAction(action);
		self._guangXiao.runAction(cc.sequence(cc.delayTime(0.3),cc.ScaleTo.create(0.5,1.6),cc.spawn(cc.ScaleTo.create(0.3,1.9),cc.fadeOut(0.3))));
		self._diGuang.runAction(cc.sequence(cc.ScaleTo.create(0.8,1.2),cc.spawn(cc.ScaleTo.create(0.5,1.3),cc.fadeOut(0.3))));
		//self._guangXiao.runAction(cc.sequence(cc.delayTime(0.3),cc.ScaleTo.create(0.5,1.8)));
		//self._diGuang.runAction(cc.sequence(cc.ScaleTo.create(0.8,1.2)));
		//self._guangXiao.runAction(Producer.ProduceFrameAnimation("BR_guangXiao_", 24, 0, 0.1));
	},
	unuse : function() {
		var self = this;
		self._gongXi.stopAllActions();
		self._diTu.stopAllActions();
		self._zhuanGuang.stopAllActions();
		self._guangXiao.stopAllActions();
		self.unscheduleAllCallbacks();
		self._isPutPoolInt = false;
		for(var key in self._shuYingShuZi){
			self._shuYingShuZi[key].stopAllActions();
			if(key != 0){
				self._diTu.removeChild(self._shuYingShuZi[key]);
			}
		}
		self._xingXingAry.splice(0,self._xingXingAry.length);
		self._dianPingJiXu.stopAllActions();
		self._shuYingShuZi.splice(0,self._shuYingShuZi.length);
		self.removeFromParent(false);
	},
	reuse : function(Data) {
		var self = this;
		self._yongHuTouXiang.setSpriteFrame(touXiangFrame[USER_wFaceID]);
		var jiaHao = self._diTu.getChildByName("jiaHao");
		self._diTu.x = 500;
		self.createXingXing();
		self._shuYingShuZi.push(jiaHao);
		self.createShuZiTiaoDong(Data + "");
		self.runActionAndAnimation();
		self.xingAction();
		self.scheduleOnce(self.hideSelfLayer ,6);
	}
});

brc.shuYingLayer.create = function(Data){
	if (cc.pool.hasObject(brc.shuYingLayer)) {
		return cc.pool.getFromPool(brc.shuYingLayer,Data);	
    }else{
    	return new brc.shuYingLayer(Data);
    };
};