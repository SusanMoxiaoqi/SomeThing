
var Dice_this = null;
var size = null;
var isShouFeng = null;
var DiceGameLayer = cc.Layer.extend({
	_rootNode : null,
    _plates : [],
    _heGuan : null,//Second_heguan
    _heGuanMoren : null,
    _heGuanKaishi : null,
    _heGuanDakai : null,
    _heGuanFennu : null,
    _heGuanKu : null,
    _heGuanKaixin : null,
    _heGuanYao : null,
    _jiantouDaBtn : null,
    _jiantouHeBtn : null,
    _jiantouXiaoBtn : null,
    _yaDaBtn : null,
    _yaHeBtn : null,
    _yaXiaoBtn : null,
    _secondFlash : null,
    _secondDiezi : null,
    _shangLshaizi : null,
    _shangRshaizi : null,
    _qianLshaizi : null,
    _qianRshaizi : null,
    _leftFlashGold : null,
    _middleFlashGold : null,
    _rightFlashGold : null,
    _BetGold : null,
    _SecondShouFenBtn : null,
    _SecondJixuBtn : null,
    _wanjiaResult : 0,//玩家押注的状态0、1、2分别小、和、大
    _serverResult : 1,//服务器返回的状态0、1、2分别小、和、大
    _diceLResult : 0,
    _diceRResult : 5,//记录两个骰子的大小
    _secondWinScore : 0,
    //_time : 0,//监听异常情况，比如网络出现问题
    _secondShengzi : null,//绳子
    _secondDefen : 0,
    _secondYazhu : 0,
    _isGetData : false,
    _winScoreLable : null,
    _loseScoreLable : null,
    _daXiao : [Effect_res.biBei2Dian,Effect_res.biBei3Dian,Effect_res.biBei4Dian,Effect_res.biBei5Dian,Effect_res.biBei6Dian,Effect_res.biBei7Dian,Effect_res.biBei8Dian,Effect_res.biBei9Dian,Effect_res.biBei10Dian,Effect_res.biBei11Dian,Effect_res.biBei12Dian,],
    _cuiCuSound : [Effect_res.biBeiCui1,Effect_res.biBeiCui2,Effect_res.biBeiCui3,Effect_res.biBeiCui4,Effect_res.biBeiCui5],
    //名字起反了Second_shangshai00与Second_qianshai00
    _shazi_qianArr : ["Second_shangshai00.png","Second_shangshai01.png","Second_shangshai02.png","Second_shangshai03.png","Second_shangshai04.png","Second_shangshai05.png"],
    _shaizi_shangArr : ["Second_qianshai00.png","Second_qianshai01.png","Second_qianshai02.png","Second_qianshai03.png","Second_qianshai04.png","Second_qianshai05.png",],
	ctor : function() {
		cc.spriteFrameCache.addSpriteFrames("res/shz/DiceGame/Second_GoldFlash.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/DiceGame/Second_zujian.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/DiceGame/HeGuan.plist");
		this._super();
		cc.log("+++++++++++++++++++++++++++++++DiceGameScene ctor");
		Dice_this = this;
		size = cc.winSize;
		Dice_this._secondWinScore = winScore;
		
		this.schedule(function() {
			gameSever.sendMessage(CMD_SHZ_HEARTBEAT,SUB_SHZ_HEARTBEAT,{},GAMENAME);
		}, 5.0, cc.REPEAT_FOREVER,0.1);
		Dice_this.initScene();
		cc.log("*************************************1");
		/**用户信息*/
		var node = UserInformation.create(2);
		USERNODE = node;
		node.x=  0;
		node.y = 0;
		this.addChild(node,10);
		cc.log("*************************************2");
		Dice_this.AddRecordResult();
		
		return true;
	},
	/***/
	heguanAction : function() {
		Dice_this._heGuan.stopAllActions();
		Dice_this._secondDiezi.setVisible(false);
//		var flashRepeat = cc.repeatForever(cc.blink(8, 10));
//		flashRepeat.retain();
//		Dice_this._heGuanYao = Producer.ProduceFrameAnimation("Second_heguan_yao", 28, 0, 0.10);
		Dice_this._heGuanYao = cc.sequence(cc.callFunc(function() {
		Dice_this._heGuan.setPositionY(428);
		}, this),
		Producer.ProduceFrameAnimation("Second_heguan_yao", 28, 0, 0.10)
		);
		this.scheduleOnce(function() {
			cc.audioEngine.playEffect(Effect_res.biBeiYao);
		}, 0.8);
		
	    var heguanAction1 =	cc.sequence(
			Dice_this._heGuanYao,
				cc.callFunc(function() {
					cc.audioEngine.stopAllEffects();
					Dice_this._secondFlash.runAction(cc.repeatForever(cc.blink(8, 10)));
					Dice_this.setButtonBrightAndTouchenable(true,true,true);
					//Dice_this._heGuan.setPositionY(Dice_this._heGuan.getPositionY()-20);
					Dice_this._heGuan.setPositionY(411);
					//Dice_this._heGuanMoren = Producer.ProduceFrameAnimation("Second_heguan_mo", 8, 0, 0.15);
					var repeatForMoren = cc.repeatForever(Producer.ProduceFrameAnimation("Second_heguan_mo", 8, 0, 0.2));
					Dice_this._heGuan.runAction(repeatForMoren);
				}, this)
				
		);
	    Dice_this._heGuan.runAction(heguanAction1);
	},
	/***/
	setButtonBrightAndTouchenable : function(bright,enable,visible) {
		
		Dice_this._jiantouDaBtn.setBright(bright);
		Dice_this._jiantouDaBtn.setTouchEnabled(enable);
		Dice_this._jiantouDaBtn.setVisible(visible);
		Dice_this._jiantouHeBtn.setBright(bright);
		Dice_this._jiantouHeBtn.setTouchEnabled(enable);
		Dice_this._jiantouHeBtn.setVisible(visible)
		Dice_this._jiantouXiaoBtn.setBright(bright);
		Dice_this._jiantouXiaoBtn.setTouchEnabled(enable);
		Dice_this._jiantouXiaoBtn.setVisible(visible);
		Dice_this._yaDaBtn.setBright(bright);
		Dice_this._yaDaBtn.setTouchEnabled(enable);
		Dice_this._yaDaBtn.setVisible(visible);
		Dice_this._yaHeBtn.setBright(bright);
		Dice_this._yaHeBtn.setTouchEnabled(enable);
		Dice_this._yaHeBtn.setVisible(visible);
		Dice_this._yaXiaoBtn.setBright(bright);
		Dice_this._yaXiaoBtn.setTouchEnabled(enable);
		Dice_this._yaXiaoBtn.setVisible(visible);
		if (visible) {
			var action = cc.sequence(
					cc.moveBy(0.5, 0, -30),
					cc.moveBy(0.5, 0, 30)
					).repeatForever();
			Dice_this._jiantouDaBtn.runAction(action);
			Dice_this._jiantouHeBtn.runAction(action.clone());
			Dice_this._jiantouXiaoBtn.runAction(action.clone());
			Dice_this.schedule(function() {
				var num = Math.floor(Math.random()*5);
				cc.audioEngine.playEffect(Dice_this._cuiCuSound[num]);
			}, 5.0)
		}else{
			Dice_this._jiantouDaBtn.stopAllActions();
			Dice_this._jiantouHeBtn.stopAllActions();
			Dice_this._jiantouXiaoBtn.stopAllActions();
			Dice_this.unscheduleAllCallbacks();
		};

	},
	/***/
	yaZhuAnNiuCallbackFun : function(sender,type) {
		cc.audioEngine.stopAllEffects();
		cc.audioEngine.playEffect(Effect_res.biBeiYaZhu);
		cc.log("sender.tag = ",sender.getTag());
		Dice_this._secondFlash.stopAllActions();
		Dice_this._secondFlash.setVisible(false);
		Dice_this._secondDiezi.setVisible(true);
		Dice_this.setButtonBrightAndTouchenable(false, false, false);
		Dice_this._BetGold.setVisible(true);
		if (sender.getTag() == 18 || sender.getTag() == 16) {//小
			Dice_this._wanjiaResult = 0;
			Dice_this._BetGold.setPositionX(200);
		}else if (sender.getTag() == 15 || sender.getTag() == 19) {//和
			Dice_this._wanjiaResult = 1;
			Dice_this._BetGold.setPositionX(533);
		}else if (sender.getTag() == 17 || sender.getTag() == 14) {//大
			Dice_this._wanjiaResult = 2;
			Dice_this._BetGold.setPositionX(865);
        };
        cc.log(" Dice_this._secondWinScoreLLLLLLLLLLLLLLLLLLLLLLLL", Dice_this._secondWinScore);
        Dice_this._time = 0;
        Dice_this.scheduleUpdate();
        gameSever.sendMessage(MDM_GF_GAME,SUB_C_SCENE2_BUY_TYPE,{double_type : 2,buy_type : Dice_this._wanjiaResult,bet_score : Dice_this._secondWinScore},GAMENAME);
	},
	/***/
	getBetResultDataFromServer : function() {
		
	},
	update : function() {
		this._time++;
		if (this._time>450) {
			this.unscheduleUpdate();
			AutomaticLink.startUpAutomaticLink(gameSever,10,2010);
		}
	},
	/***/
	afterGetBetResultDataFromServer : function() {
		Dice_this.unscheduleUpdate();
//		Dice_this._heGuanDakai = Producer.ProduceFrameAnimation("Second_heguan_dakai", 5, 0, 0.15);
		Dice_this._heGuanDakai = cc.sequence(cc.callFunc(function() {
		Dice_this._heGuan.setPositionY(416);
		var num = Dice_this._diceLResult+Dice_this._diceRResult;
		cc.audioEngine.playEffect(Dice_this._daXiao[num]);
		Dice_this._shangLshaizi.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(Dice_this._shazi_qianArr[Dice_this._diceLResult]));
		Dice_this._shangRshaizi.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(Dice_this._shazi_qianArr[Dice_this._diceRResult]));	
		}, this),
		Producer.ProduceFrameAnimation("Second_heguan_dakai", 5, 0, 0.15)
		);
		//var dakai2 = Producer.ProduceFrameAnimation("Second_heguan_dakai", 14, 5, 0.15);
		Dice_this._heGuan.stopAllActions();
		var heGuanAction3 = cc.sequence(
				Dice_this._heGuanDakai,
				Producer.ProduceFrameAnimation("Second_heguan_dakai", 14, 5, 0.15),	
				cc.callFunc(function() {
					Dice_this.replaceRecordPlate();
					Dice_this._qianLshaizi.setVisible(true);
					Dice_this._qianLshaizi.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(Dice_this._shaizi_shangArr[Dice_this._diceLResult]));
					Dice_this._qianRshaizi.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(Dice_this._shaizi_shangArr[Dice_this._diceRResult]));
					if (Dice_this._serverResult == 0) {
						Dice_this._qianLshaizi.setPositionX(210);
					} else if(Dice_this._serverResult == 1){
						Dice_this._qianLshaizi.setPositionX(533);
					}else if (Dice_this._serverResult == 2) {
						Dice_this._qianLshaizi.setPositionX(825);
					};
					
					
					if (Dice_this._wanjiaResult == Dice_this._serverResult) {//玩家压中了
						cc.log("你赢了");
						cc.audioEngine.playEffect(Effect_res.biBeiYing);
						var heGuanAction4;
						if (Dice_this._wanjiaResult == 1) {//玩家压中且是和
							cc.log("荷官怒了");
							Dice_this._secondWinScore *= 6;
//							Dice_this._heGuanFennu = Producer.ProduceFrameAnimation("Second_heguan_nu", 26, 0, 0.1);
							Dice_this._heGuanFennu = cc.sequence(cc.callFunc(function() {
							Dice_this._heGuan.setPositionY(436);
							}, this),
							Producer.ProduceFrameAnimation("Second_heguan_nu", 26, 0, 0.1)
							);
							heGuanAction4 = Dice_this._heGuanFennu;
							
							Dice_this._middleFlashGold.setVisible(true);
							var flasfAction = Producer.ProduceFrameAnimation("Second_Mgold", 10, 0, 0.15);
							flasfAction = cc.sequence(
									flasfAction,
									cc.callFunc(function() {
										this.setVisible(false);
									}, Dice_this._middleFlashGold)
									);
							Dice_this._middleFlashGold.runAction(flasfAction);
						}else{//玩家押中但不是和
							Dice_this._heGuanKu = Producer.ProduceFrameAnimation("Second_heguan_ku", 26, 0, 0.1);
							Dice_this._heGuanKu = cc.sequence(cc.callFunc(function() {
							Dice_this._heGuan.setPositionY(423);
							}, this),
							Dice_this._heGuanKu
							);
							heGuanAction4 = Dice_this._heGuanKu;
							if (Dice_this._diceLResult == Dice_this._diceRResult) {//玩家压中且两个骰子相同
							cc.log("荷官怒了");
							Dice_this._secondWinScore *=4;
							if (Dice_this._serverResult == 0) {//玩家压中且两个骰子相同且压中为小
								Dice_this._leftFlashGold.setVisible(true);
								var flasfAction = Producer.ProduceFrameAnimation("Second_Lgold", 10, 0, 0.15);
								flasfAction = cc.sequence(
										flasfAction,
										cc.callFunc(function() {
											this.setVisible(false);
										}, Dice_this._leftFlashGold)
								);
								Dice_this._leftFlashGold.runAction(flasfAction);
							} else if (Dice_this._serverResult == 2){//玩家压中且两个骰子相同且压中为大
								Dice_this._rightFlashGold.setVisible(true);
								var flasfAction = Producer.ProduceFrameAnimation("Second_Rgold", 10, 0, 0.15);
								flasfAction = cc.sequence(
										flasfAction,
										cc.callFunc(function() {
											this.setVisible(false);
										}, Dice_this._rightFlashGold)
								);
								Dice_this._rightFlashGold.runAction(flasfAction);
							};
							}else if (Dice_this._diceLResult != Dice_this._diceRResult) {//玩家压中且两个骰子不同
							cc.log("荷官哭了");
							Dice_this._secondWinScore *=2;
							if (Dice_this._serverResult == 0) {//玩家压中且两个骰子不同且压中为小
								Dice_this._leftFlashGold.setVisible(true);
								var flasfAction = Producer.ProduceFrameAnimation("Second_Lgold", 17, 0, 0.15);
								flasfAction = cc.sequence(
										flasfAction,
										cc.callFunc(function() {
											this.setVisible(false);
										}, Dice_this._leftFlashGold)
								);
								Dice_this._leftFlashGold.runAction(flasfAction);
							} else if (Dice_this._serverResult == 2){//玩家压中且两个骰子不同且压中为大
								Dice_this._rightFlashGold.setVisible(true);
								var flasfAction = Producer.ProduceFrameAnimation("Second_Rgold", 17, 0, 0.15);
								flasfAction = cc.sequence(
										flasfAction,
										cc.callFunc(function() {
											this.setVisible(false);
										}, Dice_this._rightFlashGold)
								);
								Dice_this._rightFlashGold.runAction(flasfAction);
							};
                          }
						  }
						//Dice_this._secondDefen -= Math.floor(Dice_this._secondDefen*0.01);//要从每次比倍得分中减掉百分之一的税收
						Dice_this._secondDefen.setString(Dice_this._secondWinScore.toString());
						Dice_this._winScoreLable.setVisible(true);
						var str = "胜 +"+Producer.changeNumberToString(Dice_this._secondWinScore);
						Dice_this._winScoreLable.setString(str);
					var heguanAction5 =	cc.sequence(
								heGuanAction4,
								cc.callFunc(function() {
//									Dice_this._heGuanMoren = Producer.ProduceFrameAnimation("Second_heguan_mo", 8, 0, 0.15);
									Dice_this._heGuanMoren = cc.sequence(cc.callFunc(function() {
									Dice_this._heGuan.setPositionY(413);
									}, this),
									Producer.ProduceFrameAnimation("Second_heguan_mo", 8, 0, 0.5)
									);
									var repeatForMoren = cc.repeatForever(Dice_this._heGuanMoren);
									Dice_this._heGuan.runAction(repeatForMoren);
									Dice_this.setSoufenJixuBtn(true, true);

								}, this)
								);
					
					Dice_this._heGuan.runAction(heguanAction5);
					}else if (Dice_this._wanjiaResult != Dice_this._serverResult) {//玩家没有压中
						gameSever.sendMessage(MDM_GF_GAME,SUB_C_SCORE,{},GAMENAME);
						cc.log("你输了");
						cc.audioEngine.playEffect(Effect_res.biBeiShu);
						Dice_this._loseScoreLable.setVisible(true);
						var str = "败 -"+Producer.changeNumberToString(Dice_this._secondWinScore);
						Dice_this._loseScoreLable.setString(str);
						winScore = Dice_this._secondWinScore = 0;
						Dice_this._secondDefen.setString(Dice_this._secondWinScore.toString());
						Dice_this._heGuanKaixin = Producer.ProduceFrameAnimation("Second_heguan_kaixin", 7, 0, 0.15);
						Dice_this._heGuanKaixin = cc.sequence(cc.callFunc(function() {
						Dice_this._heGuan.setPositionY(416);
						}, this),
						Dice_this._heGuanKaixin
						);
						Dice_this._heGuan.runAction(cc.repeatForever(Dice_this._heGuanKaixin));
						Dice_this.scheduleOnce(function() {
							var trans = new cc.TransitionFade(3.0, new MainGameScene(), cc.color(100, 100, 100, 255));  
							cc.director.runScene(trans);  
						}, 2.0);

                    };
				}, this)
				);
		Dice_this._heGuan.runAction(heGuanAction3);
		
	},
	/***/
	initScene : function() {
		cc.log(Dice_this,size.width,size.height);
		Dice_this._rootNode =  ccs.load("res/shz/DiceGame/MainScene.json").node;
		Dice_this.addChild(Dice_this._rootNode);

		Dice_this._heGuan = Dice_this._rootNode.getChildByName("Second_heguan");
		Dice_this._jiantouDaBtn = Dice_this._rootNode.getChildByName("Second_jiantouDaBtn");
		Dice_this._jiantouDaBtn.addClickEventListener(function() {
			Dice_this.yaZhuAnNiuCallbackFun(this);
		});

		Dice_this._jiantouHeBtn = Dice_this._rootNode.getChildByName("Second_jiantouHeBtn");
		Dice_this._jiantouHeBtn.addClickEventListener(function() {
			Dice_this.yaZhuAnNiuCallbackFun(this);
		});

		Dice_this._jiantouXiaoBtn = Dice_this._rootNode.getChildByName("Second_jiantouXiaoBtn");
		Dice_this._jiantouXiaoBtn.addClickEventListener(function() {
			Dice_this.yaZhuAnNiuCallbackFun(this);
		});

		Dice_this._yaDaBtn = Dice_this._rootNode.getChildByName("Second_yadaBtn");
		Dice_this._yaDaBtn.addClickEventListener(function() {
			Dice_this.yaZhuAnNiuCallbackFun(this);
		});

		Dice_this._yaHeBtn = Dice_this._rootNode.getChildByName("Second_yaHeBtn");
		Dice_this._yaHeBtn.addClickEventListener(function() {
			Dice_this.yaZhuAnNiuCallbackFun(this);
		});

		Dice_this._yaXiaoBtn = Dice_this._rootNode.getChildByName("Second_yaXiaoBtn");
		Dice_this._yaXiaoBtn.addClickEventListener(function() {
			Dice_this.yaZhuAnNiuCallbackFun(this);
		});

		Dice_this._leftFlashGold = Dice_this._rootNode.getChildByName("Second_LFlashgold");
		Dice_this._middleFlashGold = Dice_this._rootNode.getChildByName("Second_MFlashgold");
		Dice_this._rightFlashGold = Dice_this._rootNode.getChildByName("Second_RFlashgold");
		Dice_this._BetGold = Dice_this._rootNode.getChildByName("Second_bet_gold");
		Dice_this._secondDiezi = Dice_this._rootNode.getChildByName("Second_diezi");
		Dice_this._shangLshaizi = Dice_this._secondDiezi.getChildByName("Second_shangLshazi");
		Dice_this._shangRshaizi = Dice_this._secondDiezi.getChildByName("Second_shangRshaizi");
		Dice_this._qianLshaizi = Dice_this._rootNode.getChildByName("Second_qianshai1");
		Dice_this._qianRshaizi = Dice_this._qianLshaizi.getChildByName("Second_qianshai2");
		Dice_this._secondDiezi.setVisible(false);
		Dice_this._secondFlash = Dice_this._rootNode.getChildByName("Second_flash");	
		Dice_this._SecondShouFenBtn =  Dice_this._rootNode.getChildByName("Second_shoufenBtn");
		Dice_this._SecondShouFenBtn.addClickEventListener(function() {
			
			Dice_this.shouFenAnNiuCallbackFun(this);
		});

		Dice_this._SecondJixuBtn = Dice_this._rootNode.getChildByName("Second_jixuBtn");
		Dice_this._SecondJixuBtn.addClickEventListener(function() {
			Dice_this.jiXuAnNiuCallbackFun(this);
		});

		Dice_this.setButtonBrightAndTouchenable(false, false,false);
		Dice_this.setSoufenJixuBtn(false, false);
		Dice_this._secondShengzi = Dice_this._rootNode.getChildByName("Second_shengzi");
		Dice_this._secondYazhu =  Dice_this._rootNode.getChildByName("Second_yazhu");
		Dice_this._secondYazhu.setString(Dice_this._secondWinScore.toString());
		Dice_this._secondDefen =  Dice_this._rootNode.getChildByName("Second_defen");
		Dice_this._secondDefen.setString(0);

		this._winScoreLable = new cc.LabelBMFont("12345","res/shz/DiceGame/shengli_1.fnt");
		this._winScoreLable.x = cc.winSize.width/2;
		this._winScoreLable.y = cc.winSize.height/2+100;
		this.addChild(this._winScoreLable, 1);
		this._winScoreLable.setVisible(false);
		var loseScoreLable = new cc.LabelBMFont("12345","res/shz/DiceGame/shibai_1.fnt");
		this._loseScoreLable = loseScoreLable;
		loseScoreLable.x = cc.winSize.width/2;
		loseScoreLable.y = cc.winSize.height/2+100;
		this.addChild(loseScoreLable, 1);
		loseScoreLable.setVisible(false);

		
	},
	/***/
	shouFenAnNiuCallbackFun : function() {
		
//		USER_lUserScore+=Dice_this._secondWinScore;
//		Dice_this._yuanbao_lable.setString(Producer.changeNumberToString(USER_lUserScore));
		cc.log("你选择了收分，退出比倍");
		Dice_this.setSoufenJixuBtn(false, false);
		winScore = Dice_this._secondWinScore;
		USER_lUserScore = USER_lUserScore + winScore - Math.floor(winScore*0.01) + choujiiangWinScore;
		YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
		Dice_this.scheduleOnce(function() {
			var trans = new cc.TransitionFade(3.0, new MainGameScene(), cc.color(100, 100, 100, 255));  
			cc.director.runScene(trans);  
		}, 0.1);

	},
	/***/
	jiXuAnNiuCallbackFun : function() {
		this.scheduleOnce(function() {
			cc.audioEngine.playEffect(Effect_res.biBeiYao);
		}, 0.5);
		
		cc.log("你选择了继续比倍游戏");
		this._winScoreLable.setVisible(false);
		this._loseScoreLable.setVisible(false);
		Dice_this._BetGold.setVisible(false);
		Dice_this._qianLshaizi.setVisible(false);
		Dice_this.setSoufenJixuBtn(false, false);
		Dice_this._secondDefen.setString(0);
		Dice_this._secondYazhu.setString(Dice_this._secondWinScore.toString());
		Dice_this.heguanAction();
	},
	setSoufenJixuBtn : function(bright,enable,visible) {
		Dice_this._isGetData = false;
		Dice_this._SecondShouFenBtn.setBright(bright);
		Dice_this._SecondShouFenBtn.setTouchEnabled(enable);
		Dice_this._SecondJixuBtn.setBright(bright);
		Dice_this._SecondJixuBtn.setTouchEnabled(enable);
	},
	/***/
	AddRecordResult : function() {
		cc.log("bet_notes.length",bet_notes.length);
		for ( var i = 0; i < bet_notes.length; i++) {
			var str;
			if (bet_notes[i] == 0) {
				str = "Second_jiluXiaoNormal.png";
				if (i == bet_notes.length-1) {
					str = "Second_jiluXiaoFlash.png";	
				}
			}else if (bet_notes[i] == 1) {
				str = "Second_jiluHeNormal.png";
				if (i == bet_notes.length-1) {
					str = "Second_jiluHeFlash.png";	
				}
			}else if (bet_notes[i] == 2) {	
				str = "Second_jiluDaNormal.png";
				if (i == bet_notes.length-1) {
					str = "Second_jiluDaFlash.png";	
				}
			}
			var record_plate = cc.Sprite.createWithSpriteFrameName(str);
			record_plate.x = 135+(record_plate.getContentSize().width+10)*i;
			record_plate.y = -20;
			Dice_this._plates[i] = record_plate;
			Dice_this._secondShengzi.addChild(record_plate,i);
		};
	},

		//为记录结果的数组bet_notes赋值，若数组的长度大于12，则先删除第一个元素，再加入一个元素，在数组的结尾		
	replaceRecordPlate : function(){
			if (bet_notes.length<12) {
					var str2;
					if (bet_notes[bet_notes.length-1] == 0) {
						str2 = "Second_jiluXiaoNormal.png";
					}else if (bet_notes[bet_notes.length-1] == 1) {
						str2 = "Second_jiluHeNormal.png";
					}else{
						str2 = "Second_jiluDaNormal.png";
					}
					if(bet_notes.length>0){
						Dice_this._plates[bet_notes.length-1].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(str2));
					}
				
				bet_notes.push(Dice_this._serverResult);
				var str;
				if (Dice_this._serverResult == 0) {
					str = "Second_jiluXiaoFlash.png";
				}else if (Dice_this._serverResult == 1) {
					str = "Second_jiluHeFlash.png";
				}else{
					str = "Second_jiluDaFlash.png";
				}
				var record_plate = cc.Sprite.createWithSpriteFrameName(str);
				//record_plate.x = 200+50*(bet_notes.length-1);
				record_plate.x = size.width,
				record_plate.y = -20;
				record_plate.runAction(cc.moveBy(0.4, -(size.width - (135+79*(bet_notes.length-1))), 0));
				Dice_this._plates.push(record_plate);
				Dice_this._secondShengzi.addChild(record_plate);
				return;
			};
			//若数组的长度大于12
			for (var i = 0; i < bet_notes.length; i++) {
				if (i == bet_notes.length-1) {
					var str1;
					if (bet_notes[i] == 0) {
						str1 = "Second_jiluXiaoNormal.png";
					}else if (bet_notes[i] == 1) {
						str1 = "Second_jiluHeNormal.png";
					}else{
						str1 = "Second_jiluDaNormal.png";
					}	
					Dice_this._plates[i].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(str1));
				}
				if (i == 0) {
					var s0 = Dice_this._plates[0];
					Dice_this._plates[i].runAction(cc.Sequence(
							cc.moveBy(0.4, -250, 0),
							cc.callFunc(function() {
								s0.removeFromParent(true);
							}, this)
					));
				}else{
					Dice_this._plates[i].runAction(cc.moveBy(0.4, -79, 0));
					cc.log("Dice_this._plates[i].getPositionX() = ",Dice_this._plates[i].getPositionX());
				}
			};

			bet_notes.shift();	
			Dice_this._plates.shift();
			bet_notes.push(Dice_this._serverResult);
			var str;
			if (Dice_this._serverResult == 0) {
				str = "Second_jiluXiaoFlash.png";
			}else if (Dice_this._serverResult == 1) {
				str = "Second_jiluHeFlash.png";
			}else{
				str = "Second_jiluDaFlash.png";
			}
			var record_plate = cc.Sprite.createWithSpriteFrameName(str);
			record_plate.x = size.width,
			record_plate.y = -20;
			record_plate.runAction(cc.moveBy(0.4, -(size.width - (135+79*(bet_notes.length-1))),0));
			
			Dice_this._plates.push(record_plate);
			Dice_this._secondShengzi.addChild(record_plate);
	},
	onEnter:function(){
		this._super();
		this.heguanAction();
		cc.log("+++++++++++++++++++++++++++++++DiceGameScene onEnter");
	},
	onExit:function(){
		this._super();
		RUNINGSCENE = null;
	   Dice_this._secondWinScore = 0;
		this._plates = [];

		cc.log("+++++++++++++++++++++++++++++++DiceGameLayer onExit");
	},
	onExitTransitionDidFinish : function(){
		this._super();
		cc.log("+++++++++++++++++++++++++++++++DiceGameScene onExitTransitionDidFinish");
		RUNINGSCENE = "DiceGame";
	},
	onExitTransitionDidStart : function(){
		this._super();
		cc.log("+++++++++++++++++++++++++++++++DiceGameScene onExitTransitionDidStart");
	}
});

var DiceGameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new DiceGameLayer();
		this.addChild(layer);
	},
});

