
//var Data = {Describe : "网络连接错误，请检查网络后，重新链接",errorCode : 0,isBack : true};
var TiShiKuang_ZDY = null;
var TiShiKuangZiDingYi = cc.LayerColor.extend({
	_miaoshu : null,
	Btn_two : null,
	Btn_one : null,
	Btn_three : null,
	_isBack : false,
	lingQuChengGong : null,
	caoZuoFanKui : null,
	aNode : null,
	ctor:function (Data) { 
		this._super(cc.color(0,0,0,50));
		if (Data.isBack == undefined) Data.isBack = false;
		this._isBack = Data.isBack;
		var _this = this;
		TiShiKuang_ZDY = this;
		zuZhiBack = true;
		_this.aNode = null;
		this.chuLiData(Data);
		return true;
	},

	unuse : function() {
		cc.log("yyyyyyyyyyyyyyyyyyyyyyunuse");
		zuZhiBack = false;
		this.caoZuoFanKui = null;
		if(this._miaoshu){
			this._miaoshu.setString("提示框");
		}
		if(this.getChildByTag(1)){
			this.removeChildByTag(1);
		}
		this.removeFromParent(false);

	},
	reuse : function(Data) {
		zuZhiBack = true;
		if (Data.isBack == null) Data.isBack = false;
		this._isBack = Data.isBack;
		this.chuLiData(Data);	
		if(this._miaoshu){
			this._miaoshu.setString(Data.Describe);
		}
	},
	chuLiData : function(Data) {
		var _this = this;
		if(Data.errorCode == 4 || Data.errorCode == 5){
			_this.aNode = ccs.load("res/shz/TanChuCeng/liBaoTiShi.json").node;
			_this._miaoshu = _this.aNode.getChildByName("duiHuanMa_text");
			_this._miaoshu.setString(Data.Describe);
			_this.Btn_one = _this.aNode.getChildByName("queDing_btn");
			_this.Btn_two = _this.aNode.getChildByName("fuZhi_btn");
			_this.lingQuChengGong = _this.aNode.getChildByName("lingQuChengGong");
		}else if(Data.errorCode == 6 || Data.errorCode == 202 || Data.errorCode == 8){
			_this.aNode = ccs.load("res/shz/TanChuCeng/tishi_chongZhiNew.json").node;
			_this.Btn_one = _this.aNode.getChildByName("Btn_hong");
			_this.Btn_two = _this.aNode.getChildByName("Btn_lv");
			_this.Btn_three = _this.aNode.getChildByName("quKuan_btn");
			var textNode = _this.aNode.getChildByName("wenBenKuang");
			_this.caoZuoFanKui = _this.aNode.getChildByName("caoZuoFanKui");
			_this._miaoshu = new cc.EditBox(cc.size(305.00,47.00),new cc.Scale9Sprite("shurukuang.png"));
			_this._miaoshu.setFontColor(cc.color.BLACK);
			_this._miaoshu.setFont("Arial",20);
			_this._miaoshu.setPosition(textNode.x, textNode.y);
			_this._miaoshu.setDelegate(_this);
			_this._miaoshu.setMaxLength(20);
			_this._miaoshu.setPlaceHolder("  请输入取款金额");
			_this._miaoshu.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);//修改为不使用密文
			_this._miaoshu.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);


			_this.aNode.addChild(_this._miaoshu);
			if(Data.Describe){
				_this._miaoshu.setString(Data.Describe);
			}

		}else if(Data.errorCode == 7){
			_this.aNode = ccs.load("res/shz/TanChuCeng/tiShi_jiuJiJIng.json").node;
			_this.Btn_one = _this.aNode.getChildByName("Btn_lv");
			_this.Btn_two = _this.aNode.getChildByName("Btn_hong");
			var cishu = _this.aNode.getChildByName("lingQu_ci");
			_this._miaoshu = cc.LabelBMFont("1", "res/shz/TanChuCeng/tanChuCengRes/lingqu01.fnt");
			_this._miaoshu.x = cishu.x;
			_this._miaoshu.y = cishu.y;
			_this.aNode.addChild(_this._miaoshu,20,11);
		}else{
	       _this.aNode = ccs.load("res/shz/TanChuCeng/tiShiZiDingYi.json").node;
	       _this._miaoshu = _this.aNode.getChildByName("showTiShiWenZi");
	       _this._miaoshu.setString(Data.Describe);
	       _this.Btn_one = _this.aNode.getChildByName("Button_zuo");
	       _this.Btn_two = _this.aNode.getChildByName("Button_you");
        }
		_this.aNode.x = cc.winSize.width/2;
		_this.aNode.y = cc.winSize.height/2;
		_this.addChild(_this.aNode,1,1);
		
		switch (Data.errorCode) {
		case 202:
			if(_this.caoZuoFanKui){
				_this.caoZuoFanKui.setString("");
			}

			_this.Btn_one.addClickEventListener(function() {
				cc.pool.putInPool(_this);
				ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/JJJ_CZ"];
				removeResources(numberAry);

			});
			_this.Btn_two.addClickEventListener(function() {
				cc.pool.putInPool(_this);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/JJJ_CZ"];
				removeResources(numberAry);
			});
			_this.Btn_three.addClickEventListener(function() {

				var money = _this._miaoshu.getString();
				if(money>0){
					_this.Btn_three.setTouchEnabled(false);
				}
				cc.pool.putInPool(_this);
				if (!waitQuan.xianShi) {
					waitQuan.reuse();
					cc.director.getRunningScene().addChild(waitQuan,1000);
				};
				loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_USER_TAKE_SCORE,{dwUserID : USER_dwUserID,lTakeScore : money,szPassword : md5(USER_szPassword),szMachineID : "",szUserkey : ""});
			});
			break;
		case 201:
			_this.Btn_one.getChildByName("tiShibtnTittle").setSpriteFrame("buchong.png");
			_this.Btn_one.addClickEventListener(function() {
				cc.pool.putInPool(_this);
				ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
				_this.chongZhiLaoHuJi();
				
			});
			_this.Btn_two.getChildByName("tiShibtnTittle").setSpriteFrame("XTXX_guanbi.png");
			_this.Btn_two.addClickEventListener(function() {
				if (!_this._isBack) {
					_this.chongZhiLaoHuJi();
					cc.pool.putInPool(_this);
				}else if (_this._isBack) {
					IsDengLu = false;
					SocketManager.closeServer(true, true);
					SocketManager.closeServer(false, true);
					var trans = cc.TransitionFade(1.0,new loginScene(),cc.color(1001, 100, 100, 100));
					cc.director.runScene(trans);
				};
			});

			break;
		case 1:
			_this.Btn_one.getChildByName("tiShibtnTittle").setSpriteFrame("ckgg.png");
			_this.Btn_one.addClickEventListener(function() {
				cc.pool.putInPool(_this);
				gongGao.creatGonggaoLayer(cc.director.getRunningScene());
				
			});
			_this.Btn_two.getChildByName("tiShibtnTittle").setSpriteFrame("lxkf.png");
			_this.Btn_two.addClickEventListener(function() {
				cc.pool.putInPool(_this);
				sheZhi.creatSheZhiLayer(cc.director.getRunningScene());
			
			})

			break;
		case 2002:
			_this.Btn_one.getChildByName("tiShibtnTittle").setSpriteFrame("quxiao.png");
			_this.Btn_one.addClickEventListener(function() {
				cc.pool.putInPool(_this);
			});
			_this.Btn_two.getChildByName("tiShibtnTittle").setSpriteFrame("queding.png");
			_this.Btn_two.addClickEventListener(function() {
				cc.pool.putInPool(_this);
				cc.director.end();
				if(sys.os = sys.OS_ANDROID){
					sheBeiUid = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "exit", "()V");		
				};
			});
			break;
		case 2010://经典场断线处理
			_this.Btn_two.getChildByName("tiShibtnTittle").setSpriteFrame("btn-fhdl.png");
			_this.Btn_two.addClickEventListener(function() {
				cc.director.resume();
				MAINLAYER.release();
				MAINLAYER = null;
				mainScene_this._isFanHui = true;
				cc.pool.removeObject(MySprite);
				mainScene_this.elementArray = [];
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

			cc.spriteFrameCache.removeSpriteFrames();
			cc.textureCache.removeAllTextures();
			IsDengLu = false;

			SocketManager.closeServer(true, false);
			var trans = cc.TransitionFade(1.0,new loginScene(),cc.color(1001, 100, 100, 100));
			cc.director.runScene(trans);			
			});
			_this.Btn_one.getChildByName("tiShibtnTittle").setSpriteFrame("btn-cxlj.png");
			_this.Btn_one.addClickEventListener(function() {
				var type = 0;
				//得到网络环境
				if (sys.os == sys.OS_IOS) {
					type = jsb.reflection.callStaticMethod("netWork", "getCurrentNetworkStatus");
				}else if(sys.os == sys.OS_ANDROID){
					type = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getNetworkIsWifi", "()I");
				};
				if (type == 0) {
					if (!waitQuan.xianShi) {
						waitQuan.reuse(1.0);
						cc.director.getRunningScene().addChild(waitQuan,1000);
					}
					return;
				}else{
					if (!waitQuan.xianShi) {
						waitQuan.reuse(30.0);
						cc.director.getRunningScene().addChild(waitQuan,1000);
					}
					IsGameLogin = 2;
					SocketManager.getGameServer(GAMENAME);
				}
			});
			break;
		case 2011://百人场断线处理
			_this.Btn_two.getChildByName("tiShibtnTittle").setSpriteFrame("btn-fhdl.png");
			_this.Btn_two.addClickEventListener(function() {
				cc.director.resume();
				
				//释放资源
				for ( var ip = 0; ip < youxi_resourcesplist.length;ip++) {
					cc.spriteFrameCache.removeSpriteFramesFromFile(youxi_resourcesplist[ip]);
				};
				for (var i = 0; i < youxi_resources.length; i++) {
					cc.textureCache.removeTextureForKey(youxi_resources[i]);
				};
				bounceNumber = 0;
				winScore = 0;
				choujiiangWinScore = 0;

				cc.spriteFrameCache.removeSpriteFrames();
				cc.textureCache.removeAllTextures();
				IsDengLu = false;

				SocketManager.closeServer(true, false);
				var trans = cc.TransitionFade(1.0,new loginScene(),cc.color(1001, 100, 100, 100));
				cc.director.runScene(trans);			
			});
			_this.Btn_one.getChildByName("tiShibtnTittle").setSpriteFrame("btn-cxlj.png");
			_this.Btn_one.addClickEventListener(function() {
				brc.chingLian();
			});
			break;
		case 3:
			_this.Btn_one.getChildByName("tiShibtnTittle").setSpriteFrame("queding.png");
			if(Data.isBack){
				_this.Btn_one.addClickEventListener(function() {
					loginServer.sendMessage(MDM_MB_ACTIVITIES_SERVICE,SUB_MB_REQUEST_BANDIT_SCENE,{dwUserID : USER_dwUserID});
					xianShiLiBao.isTanChu_JFTS = false;
					cc.pool.putInPool(_this);
				});
				_this.Btn_two.addClickEventListener(function() {
					xianShiLiBao.isTanChu_JFTS = false;
					cc.pool.putInPool(_this);
				});
				
				
			}else {
				_this.Btn_one.addClickEventListener(function() {
					xianShiLiBao.creatHttp(8);
					cc.pool.putInPool(_this);
				});
				_this.Btn_two.addClickEventListener(function() {
					cc.pool.putInPool(_this);
				});
			}

			break;
		case 4:
			if(_this._isBack){
				_this.aNode.getChildByName("lingQuChengGong").setVisible(true);
			}else{
				_this.aNode.getChildByName("lingQuChengGong").setVisible(false);
			}
			_this.Btn_one.addClickEventListener(function() {
		        
				cc.pool.putInPool(_this);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/liBaoLingQu"];
				removeResources(numberAry);
//				cc.spriteFrameCache.removeSpriteFramesFromFile("res/shz/TanChuCeng/tanChuCengRes/liBaoLingQu.plist");
//				cc.textureCache.removeTextureForKey("res/shz/TanChuCeng/tanChuCengRes/liBaoLingQu.png");
			});
			_this.Btn_two.addClickEventListener(function() {
				var string = _this._miaoshu.getString();
				if(xianShiLiBao){
					xianShiLiBao.duiHuanMa =string;
				}
				if(cc.sys.os == cc.sys.OS_IOS){
					jsb.reflection.callStaticMethod("shangCheng", "iosFuZhiJianTieBan:",string); 
					
				}else if(cc.sys.os == cc.sys.OS_ANDROID){
					jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "copyClipboard", 
							"(Ljava/lang/String;)V", string);
				}
			});
		
		break;
		case 5:
			_this.lingQuChengGong.setSpriteFrame("shibai.png");
			_this.Btn_one.addClickEventListener(function() {
				cc.pool.putInPool(_this);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/liBaoLingQu"];
				removeResources(numberAry);
			});
			_this.Btn_two.addClickEventListener(function() {
			
			});

			break;
		case 6://游戏内取款
			if(_this.caoZuoFanKui){
				_this.caoZuoFanKui.setString("");
			}
			
			_this.Btn_one.addClickEventListener(function() {
				cc.pool.putInPool(_this);
				ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
				_this.chongZhiLaoHuJi();
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/JJJ_CZ"];
				removeResources(numberAry);
				
			});
			_this.Btn_two.addClickEventListener(function() {
				cc.pool.putInPool(_this);
				_this.chongZhiLaoHuJi();
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/JJJ_CZ"];
				removeResources(numberAry);
			});
			_this.Btn_three.addClickEventListener(function() {
				
				var money = _this._miaoshu.getString();
				if(money>0){
					_this.Btn_three.setTouchEnabled(false);
				}
				gameSever.sendMessage(MDM_GR_INSURE, SUB_GR_TAKE_SCORE_REQUEST,{cbActivityGame:true ,lTakeScore:money, szInsurePass:md5(USER_szPassword)},GAMENAME);
			});
		    break;
			case 8://百人游戏内取款
				if(_this.caoZuoFanKui){
					_this.caoZuoFanKui.setString("");
				}

				_this.Btn_one.addClickEventListener(function() {
					cc.pool.putInPool(_this);
					ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
					var numberAry =["res/shz/TanChuCeng/tanChuCengRes/JJJ_CZ"];
					removeResources(numberAry);

				});
				_this.Btn_two.addClickEventListener(function() {
					cc.pool.putInPool(_this);
					var numberAry =["res/shz/TanChuCeng/tanChuCengRes/JJJ_CZ"];
					removeResources(numberAry);
				});
				_this.Btn_three.addClickEventListener(function() {

					var money = _this._miaoshu.getString();
					if(money>0){
						_this.Btn_three.setTouchEnabled(false);
					}
					gameSever.sendMessage(MDM_GR_INSURE, SUB_GR_TAKE_SCORE_REQUEST,{cbActivityGame:true ,lTakeScore:money, szInsurePass:md5(USER_szPassword)},BRCBIBEI);
				});
				break;
		case 7://领取救济金
			_this._miaoshu.setString(Data.Describe);
			_this.Btn_one.addClickEventListener(function() {
				cc.pool.putInPool(_this);
				_this.chongZhiLaoHuJi();
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/JJJ_CZ"];
				removeResources(numberAry);
			});
			_this.Btn_two.addClickEventListener(function() {
				cc.pool.putInPool(_this);
				ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
				_this.chongZhiLaoHuJi();
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/JJJ_CZ"];
				removeResources(numberAry);
				
			});
			break;
		case 20:
			_this.Btn_one.getChildByName("tiShibtnTittle").setSpriteFrame("queding.png");
			if(Data.isBack){
				_this.Btn_one.addClickEventListener(function() {
					cc.pool.putInPool(_this);
					loginServer.sendMessage(103,7,{dwUserID : USER_dwUserID , 
						dwEnergy : huoDong_JF.self.dangQianNengLiang ,
						lScore : huoDong_JF.self.zongDeFeng});
					cc.director.runScene(new GameHallScene());

				});
				_this.Btn_two.addClickEventListener(function() {
					cc.pool.putInPool(_this);
				});
			}

			break;
			case 21:
				_this.Btn_one.getChildByName("tiShibtnTittle").setSpriteFrame("queding.png");
				if(Data.isBack){
					_this.Btn_one.addClickEventListener(function() {
						cc.pool.putInPool(_this);
						cc.director.runScene(new GameHallScene());
					});
					_this.Btn_two.addClickEventListener(function() {
						cc.pool.putInPool(_this);
					});
				}

				break;
		default:
			break;
		}
	},
	chongZhiLaoHuJi : function() {
		for ( var i in mainScene_this.elementArray) {
			mainScene_this.elementArray[i].stopchildAction(mainScene_this.eleZorder[i],nameArr[i]);
			mainScene_this._borderLayer.stopAllChildAction();
			//mainScene_this.elementArray[i].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(nameArr[i]));
		};
		mainScene_this._Auto_button.loadTextures("First_zidong_up.png", "First_zidong_down.png", "First_zidong_dis.png", ccui.Widget.PLIST_TEXTURE);
		mainScene_this._Auto_button.setBright(true);
		mainScene_this._Auto_button.setTouchEnabled(true);
		mainScene_this.start_button.loadTextures("First_kaishi_up.png", "First_kaishi_down.png", "First_kaishi_dis.png", ccui.Widget.PLIST_TEXTURE);
		mainScene_this.start_button.setBright(true);
		mainScene_this.start_button.setTouchEnabled(true);
		isAuto = false;
		mainScene_this._success = false;
		mainScene_this.starButtonState = 0;
		mainScene_this._isKongxian = true;
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

TiShiKuangZiDingYi.create = function(Data){
	cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/jc_sz_ts_xt.plist");
	cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/GongYong.plist");
	if (cc.pool.hasObject(TiShiKuangZiDingYi)) {
		return cc.pool.getFromPool(TiShiKuangZiDingYi,Data);	
	}else{
		return new TiShiKuangZiDingYi(Data);
	};
};










