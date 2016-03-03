
//var Data = {Describe : "网络连接错误，请检查网络后，重新链接",errorCode : 0,isBack : true};
var TiShiKuang = cc.LayerColor.extend({
	_miaoshu : null,
	_quedingBtn : null,
	_isBack : false,
	_errorCode : 0,
	ctor:function (Data) { 
		var _this = this;
		if (Data.isBack == undefined) Data.isBack = false;
		this._isBack = Data.isBack;
		this._errorCode = Data.errorCode;
		this._super(cc.color(0,0,0,50));
		zuZhiBack = true;
		var aNode = ccs.load("res/shz/TanChuCeng/tiShi.json").node;
		aNode.x = cc.winSize.width/2;
		aNode.y = cc.winSize.height/2;
		this.addChild(aNode,0,1);
		this._miaoshu = aNode.getChildByName("Describe_Text");
		this._miaoshu.setString(Data.Describe);
		this._quedingBtn = aNode.getChildByName("Button_queding");
		this._quedingBtn.addClickEventListener(function() {
			cc.log("hhhhhhhhhhhhhhhhhh",this.errorCode,this.isBack);
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);

			if(_this._errorCode == 199){
				cc.pool.putInPool(_this);
			}else if(_this._errorCode == 188){
				if(huoDong_JF.isShow){
					cc.director.runScene(new GameHallScene());
				}
				cc.pool.putInPool(_this);
			}else if(_this._errorCode == 100){
				if(huoDong_JF.isShow){
					cc.director.runScene(new GameHallScene());
				}
			}else if (!_this._isBack) {
				cc.pool.putInPool(_this);
				if(xianShiLiBao.isXianShiLiBao){
					xianShiLiBao.isTanChu_JFTS = false;
				}
			}else if (_this._isBack) {
				cc.director.resume();
				if (MAINLAYER) {
					
					MAINLAYER.release();
					MAINLAYER = null;
					mainScene_this._isFanHui = true;
					cc.pool.removeObject(MySprite);
					mainScene_this.elementArray = [];
					if (Data.errorCode == 2001) {
						mainScene_this.unscheduleAllCallbacks();
						mainScene_this._Mixlayer.setPause();
						mainScene_this._isPause = true;
						mainScene_this._success = false;
						for ( var i3 in mainScene_this.elementArray) {
							mainScene_this.elementArray[i3].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(nameArr[i3]));
							mainScene_this.elementArray[i3].setType(getSpriteTypeForName(nameArr[i3]));
							mainScene_this.elementArray[i3].setImageName(nameArr[i3]);
							mainScene_this.elementArray[i3].spriteRunBufferAction();
						}
					};
					var o = mainScene_this._spritesActions.pop();
					while (o) {
						o.release();
						o = mainScene_this._spritesActions.pop();
					}
					mainScene_this._spritesActions = [];
					//释放资源
					for ( var ip = 0; ip < youxi_resourcesplist.length;ip++) {
						cc.spriteFrameCache.removeSpriteFramesFromFile(youxi_resourcesplist[ip]);
					};
					for (var i = 0; i < youxi_resources.length; i++) {
						cc.textureCache.removeTextureForKey(youxi_resources[i]);
					};

	
					isAuto = false;
					bounceNumber = 0;
					winScore = 0;
					choujiiangWinScore = 0;
					
				};
				IsDengLu = false;
				
				SocketManager.closeServer(true, false);
				var trans = cc.TransitionFade(1.0,new loginScene(),cc.color(1001, 100, 100, 100));
				cc.director.runScene(trans);			
			};
		});
		return true;
	},
	unuse : function(Data) {
		zuZhiBack = false;
		Data = null;
		this._miaoshu.setString("提示框");
		this.removeFromParent(false);
		this.retain();
	},
	reuse : function(Data) {
		zuZhiBack = true;
		if (Data.isBack == null) Data.isBack = false;
		this._isBack = Data.isBack;
		this._errorCode = Data.errorCode;
		if(Data.Describe){
			cc.log("#############@@@@@@!!!$!"+this.Describe);
			this._miaoshu.setString(Data.Describe);

		}
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
				cc.log("tishi onTouchesEnded.. ");
			}
		});		

		cc.eventManager.addListener(listener1, this);
	}

});

TiShiKuang.create = function(Data){
	if (Data.isBack == true && MAINLAYER) {
		cc.director.pause();
	}
	
	if (cc.pool.hasObject(TiShiKuang)) {
		cc.log("KKKKKKKKKKKK1",Data.errorCode,Data.Describe,Data.isBack);
		return cc.pool.getFromPool(TiShiKuang,Data);	
	}else{
		cc.log("KKKKKKKKKKKK2",Data.errorCode,Data.Describe,Data.isBack);
		return new TiShiKuang(Data);
	};
};










