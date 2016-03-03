var baoXiang = baoXiang || {};

baoXiang.Node = cc.Node.extend({
	_baoXiangBtn : null,//宝箱精灵
	_baoXiangType : 0,//宝箱的种类
	isRun : false,//是否在动作
	_jingBiShu : null,//宝箱弹出的分数
	ctor : function(type) {
		this._super();
		this.init(type);
	},
	//初始化
	init : function(type) {
		var self = this;
		if(type == 1){
			self._baoXiangBtn  = cc.Sprite.createWithSpriteFrameName("JF_xiang_1.png");
		}else if(type == 2){
			self._baoXiangBtn  = cc.Sprite.createWithSpriteFrameName("JF_xiangFG_1.png");
		}
		self._jingBiShu = cc.LabelBMFont("+1000","res/shz/xiaomali.fnt");
		self._jingBiShu.setScale(0.3);
		self.addChild(self._jingBiShu ,5,100);
		self._jingBiShu.setVisible(false);
		self._baoXiangType = type;
		self.setScale(0.3);
		self.addChild(self._baoXiangBtn, 0, 1);
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches:true,
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}, this);
		
	},
	//触摸开始
	onTouchBegan:function(touch, event) {
		var number ;
		var self  = event.getCurrentTarget();
		var rect = touch.getLocation();
		var btn = self._baoXiangBtn;
		if(!self.isRun){
			if(rect.x >= self.x-btn.width/2 && rect.x <= self.x+btn.width/2 &&rect.y >= self.y-btn.height/2 &&rect.y <= self.y+btn.height/2 ){
				self.baoXiangDianJi(true);
				return true;
			}
		}
		
		return false;
	},
	//触摸滑动
	onTouchMoved:function(touch, event) {
	},
	//触摸结束
	onTouchEnded:function(touch, event) {
		return false;
	},
	//点击宝箱时运行函数
	baoXiangDianJi : function(isYiJianQu) {
		var self = this;
		cc.audioEngine.playEffect(Effect_res.zaiXianLingJiang);
        //是否时一键拾取调用		
		if(isYiJianQu){
			if(self.x > 568){
				var number ;
				for ( var key in huoDong_JF.self.baoXianYouAry) {
                      if(self.tag == huoDong_JF.self.baoXianYouAry[key].tag){
                    	  number = key;
                    	  break;
                      }
				}
				if(huoDong_JF.self.baoXianYouAry.length > (number+1)){
					huoDong_JF.self.baoXianYouAry.splice(number, 1);
					huoDong_JF.self.youAryDle.push(self.x);	
				}else{
					huoDong_JF.self.baoXianYouAry.splice(number, 1);
					huoDong_JF.self.youAryDle.push(self.x);		
				}

			}else{
				for ( var key in huoDong_JF.self.baoXianZuoAry) {
					if(self.tag == huoDong_JF.self.baoXianZuoAry[key].tag){
						number = key;
						break;
					}
				}	
				if(huoDong_JF.self.baoXianZuoAry.length > (number+1)){
					huoDong_JF.self.baoXianZuoAry.splice(number, 1);
					huoDong_JF.self.zuoAryDle.push(self.x);	
				}else{
					huoDong_JF.self.baoXianZuoAry.splice(number, 1);
					huoDong_JF.self.zuoAryDle.push(self.x);		
				}
			}
		}else{
			huoDong_JF.self.runYiJianTeXiao(false);
		}
		if(huoDong_JF.self.baoXianZuoAry.length == 0 && huoDong_JF.self.baoXianYouAry.length == 0 ){
			huoDong_JF.self.runYiJianTeXiao(false);
		}
		
		var animate;
		
		var _jingBiShu = self.getChildByTag(100);
		if(self._baoXiangType == 1){
			animate = Producer.ProduceFrameAnimation("JF_xiang_", 3, 10, 0.1);
			_jingBiShu.setString("+80");
			huoDong_JF.self.zongDeFeng += 80;
		}else if(self._baoXiangType == 2){
			animate = Producer.ProduceFrameAnimation("JF_xiangFG_", 3,10, 0.1);
			_jingBiShu.setString("+200");
			huoDong_JF.self.zongDeFeng += 200;
		}
		slocal.setItem("JF_ZDF",huoDong_JF.self.zongDeFeng);
		var action1 = cc.RotateBy(0.03, 5, 5);
		var action2 = cc.RotateBy(0.03, -5, -5);
		var action3 = cc.sequence(action1,action1.reverse() ,action2, action2.reverse(),action1,action1.reverse() ,action2, action2.reverse());
		var action5 =cc.sequence(
				action3,
				animate,
				cc.callFunc(function (nodeExecutingAction, value) {
					if(self._baoXiangType == 1){
						self._baoXiangBtn.setSpriteFrame("JF_xiang_3.png")
					}else if(self._baoXiangType == 2){
						self._baoXiangBtn.setSpriteFrame("JF_xiangFG_3.png")
					}
					
					_jingBiShu.setVisible(true);
					var action4 = cc.Sequence(
							cc.scaleBy(0.01,1.2),
							cc.MoveTo(0.8,cc.p(_jingBiShu.x, _jingBiShu.y+60)),
							cc.callFunc(function (nodeExecutingAction, value) {
								loginServer.sendMessage(103,7,{dwUserID : USER_dwUserID , 
									dwEnergy : huoDong_JF.self.dangQianNengLiang ,
									lScore : huoDong_JF.self.zongDeFeng});
								huoDong_JF.youXiDeFeng.setString(huoDong_JF.self.zongDeFeng);
								self.removeChildByTag(100, true);
								_jingBiShu.y -=60;
								_jingBiShu.setScale(0.3);
								huoDong_JF.rootNode.removeChild(self);
							}, this));
					_jingBiShu.runAction(action4);
				
				}, this));
		self._baoXiangBtn.runAction(action5);
	},
	//宝箱弹出的动作
	spriteRunAction : function(spriteX , spriteY ) {
		var self = this;
		self.isRun = true;
		var controlPoints2 = [ cc.p(self.x, self.y),
		                       cc.p(spriteX, self.y+250),
		                       cc.p(spriteX, spriteY) ];
		var action4 = cc.Sequence(
				cc.scaleTo(0.5,1.5)
		);
		self.runAction(action4);
		var bezierTo1 = cc.bezierTo(0.5, controlPoints2);
		var action =cc.sequence(
				bezierTo1,
				cc.callFunc(function (nodeExecutingAction, value) {
					self.isRun = false;
				}, this));
		self.runAction(action);
	},
	onExit : function() {
		this._super();
	}
}); 



