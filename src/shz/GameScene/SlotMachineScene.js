
var Slot_this;
var SlotMachineLayer = cc.Layer.extend({
	rollingresult:[4,6,8,5],
    rotateresult:8,
    icons : ["exit.png","luzhishen.png","qiang.png","zhongyitang.png","fuzi.png","dadao.png","exit.png","songjiang.png","luzhishen.png",
                 "qiang.png","fuzi.png","titianxingdao.png","exit.png","linchong.png","dadao.png","fuzi.png","luzhishen.png","songjiang.png",
                 "exit.png","linchong.png","qiang.png","fuzi.png","dadao.png","titianxingdao.png"],
    icon_sprites : [],//四周转动的小图标
    image_sprites : [],//中间四个判断的图标
    bet_sprites : [],//中奖后闪烁的倍数图标
    bet_numbers : [2,5,10,20,50,70,100,200,20,500,20],
    border_sprites : [],//中奖后闪烁的框
    mix_layouts : [],//模糊动画时，四个layout
    exit : [0,6,12,18],
    fuzi : [4,10,15,21],
    qiang :[2,9,20,2],
    dadao : [5,14,22,14],
    luzhishen : [1,8,16,16],
    linchong : [13,19,13,19],
    songjiang : [7,17,7,17],
    titianxingdao : [11,23,11,23],
    zhongyitang : [3,3,3,3],
    icon24 : [],//[this.fuzi,this.qiang,this.dadao,this.luzhishen,this.linchong,this.songjiang,this.titianxingdao,this.zhongyitang,this.exit],
    seconds_back : [8,16,24,40],
    seconds_front : [40,24,16,8],
    seconds_mid : [],
    seconds : [],
    before_weizhi : 0,//记录上一次转动停留的位置,默认为0
    YS : 0,
    SZ : 0,
    ZT : 0,
    Third_winScore : 0,
    Third_scoreText : null,
    Third_winText : null,
    Third_betText : null,
    Third_timesText : null,
    Third_betScore : 0,
    //_time : 0,//监听异常情况，比如网络出现问题
    isZhongJiang : false,//中奖的话，进行下一轮转动时的中间时间间隔会长一些，不中奖，则时间间隔会短
    isTuichu : false,//如果是推出的话，就不要再请求网络获取数据了。因为请求网络后5秒得不到数据，就会弹出网络链接错误请重试提示框
    _resultSounds : [Effect_res.tieFu,Effect_res.yinQiang,Effect_res.jinDao,Effect_res.luZhiShen,Effect_res.linChong,Effect_res.songjiang,Effect_res.tiTianXingDao,Effect_res.zhongYiTang],
  //  zhuandongyinxiao : false,
	ctor:function () {
		this._super();
		Slot_this = this;
		cc.log("slot ctor");
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/result/result1.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/result/result2.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/result/result3.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/result/result4.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/result/result5.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/result/result6.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/result/result7.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/result/result8.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/result/result9.plist");
		Slot_this.icon24  =  [this.fuzi,this.qiang,this.dadao,this.luzhishen,this.linchong,this.songjiang,this.titianxingdao,this.zhongyitang,this.exit,this.exit];
		var size = cc.winSize;
		Slot_this.Third_betScore = 9*whichScene[BetScoreIndex];
		Slot_this.initScene();
		Slot_this.creatMixLayouts();
		this.scheduleOnce(this.getDataFromServer, 0.5);
		return true;
	},
	update : function() {
		this._time++;
		cc.log("HHHHHHHHHHH",this._time);
		if (this._time == 30) {
			if (!waitQuan.xianShi) {
				cc.director.getRunningScene().addChild(waitQuan,1000);
				waitQuan.reuse(60);
			};
		};
		if (this._time>1800) {
			if (waitQuan.xianShi) {
				waitQuan.unuse("slotmachineScene76");
			} ;
			Slot_this.scheduleUpdate();
			var XinXi = {Describe : "您的网络不稳定，请重新登录！",errorCode : 1005,isBack : true};//小玛丽断线
			var tishi = TiShiKuang.create(XinXi);
			cc.director.getRunningScene().addChild(tishi,1000);
		}
		if (this._time==900) {
			SocketManager.closeServer(true, false);
			gameSever.isMyClose = false;
			this.schedule(this.checkNetwork, 2.0, cc.REPEAT_FOREVER);
	
		}
	},
	checkNetwork:function(){
		var type = 0;
		//得到网络环境
		if (sys.os == sys.OS_IOS) {
			type = jsb.reflection.callStaticMethod("netWork", "getCurrentNetworkStatus");
		}else if(sys.os == sys.OS_ANDROID){
			type = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getNetworkIsWifi", "()I");
		};
		cc.log("LLLLLLLLLLLLLL网络状态",type,this._time);
		if (type != 0) {
			var hash = md5( USER_szPassword );	
			gameSever.sendMessage(MDM_GR_LOGON,SUB_GR_LOGON_RECONNECT,{wGameID : wServerID,dwUserID : USER_dwUserID,szPassword : hash},false,false);
			Slot_this.unschedule(Slot_this.checkNetwork);
		}
	},
	getDataFromServer : function() {
		Slot_this.seconds_mid = [];//每次都要把它清空（很重要）
		Slot_this._time = 0;
		Slot_this.scheduleUpdate();
		
		cc.log("9*whichScene[BetScoreIndex]", Slot_this.Third_betScore,bounceNumber);
		gameSever.sendMessage(MDM_GF_GAME,SUB_C_SCENE3_START,{bonus_game_times : bounceNumber,bet_score : Slot_this.Third_betScore},GAMENAME);
	},
	afterGetDataFromServer : function(RollingResult,RotateResult) {
		if (waitQuan.xianShi) {
			waitQuan.unuse("webSocketEvent364");
		} ;
		Slot_this.unscheduleUpdate();
		for (var xx = 0; xx < 4; xx++) {
			Slot_this.rollingresult[xx] = RollingResult[xx]//从服务器得到数据
		}
		Slot_this.rotateresult = RotateResult;//从服务器得到数据
		var suiji_rotateresult = Math.floor(Math.random()*4);//表示转动的图标停在某一种图标的第几个上（此时对应的就是它的具体位置了）
		cc.log("Slot_this.rotateresult",Slot_this.rotateresult);
		var weizhi_icon = Slot_this.icon24[Slot_this.rotateresult][suiji_rotateresult];
		cc.log("weizhi_icon,Slot_this.rollingresult",weizhi_icon,Slot_this.rollingresult.toString());

		var buquan =(24- Slot_this.before_weizhi)%24;
		cc.log("Slot_this.before_weizhi ,weizhi_icon,buquan,40+weizhi_icon+buquan+8",Slot_this.before_weizhi,weizhi_icon,buquan,(40+weizhi_icon+buquan+8).toString());
		for (var i = 0; i < (40+weizhi_icon+buquan); i++) {
			Slot_this.seconds_mid[i] = 2;
		};
		var secondsArr = Slot_this.seconds_front.concat(Slot_this.seconds_mid);
		Slot_this.seconds = secondsArr.concat(Slot_this.seconds_back);
		Slot_this.before_weizhi = weizhi_icon;
		Slot_this.kaishiLuoji();
	},
	kaishiLuoji : function() {
		this.schedule(Slot_this.zhuanQuan, 0.01);
		cc.log(Slot_this.seconds.toString(),Slot_this.seconds.length.toString());
		for (var i = 0; i < Slot_this.mix_layouts.length; i++) {
			Slot_this.image_sprites[i] .setVisible(false);
			var array_element = Slot_this.mix_layouts[i];
			array_element.setResume();
		}
	},
	zhuanQuan : function() {
		if (Slot_this.SZ < Slot_this.seconds.length) {
		
			if (Slot_this.YS >= Slot_this.seconds[Slot_this.SZ]) {
				
				if (Slot_this.SZ==0) {
					cc.audioEngine.playEffect(Effect_res.xiaomali_zhuandong1);
				} else if(Slot_this.SZ==4){
					cc.audioEngine.playEffect(Effect_res.xiaomali_zhuandong2, true);
					//Slot_this.zhuandongyinxiao = true;
				}else if (Slot_this.SZ>= Slot_this.seconds.length-4) {
					cc.audioEngine.stopAllEffects()
					cc.audioEngine.playEffect(Effect_res.xiaomali_tingliu);
                }
				if (Slot_this.SZ == (Slot_this.seconds.length-40)) {//中间转轮停止转动
					cc.log("}}}}}}}}}}}}}}}}}}{{{{{{{{{{{{{{{{{{{{{");
					for (var i = 0; i < Slot_this.mix_layouts.length; i++) {
						var array_element = Slot_this.mix_layouts[i];
						array_element.setPause();
					};
					for (var i = 0; i < Slot_this.image_sprites.length; i++) {
						var array_element = Slot_this.image_sprites[i];
						var image_x = Slot_this.rollingresult[i]
						array_element.setSpriteFrame(Element_up[image_x]);	
						array_element.setVisible(true);
						array_element.runAction(cc.sequence(
								cc.moveBy(0.2, 0, -10),
								cc.moveBy(0.2, 0, 10)
						));
					}
				};
				
				
				
				Slot_this.SZ++;
				Slot_this.ZT++;
				var icon_x =(Slot_this.ZT)%24;
				//cc.log("Slot_this.SZ,Slot_this.ZT,icon_x",Slot_this.SZ,Slot_this.ZT,icon_x);
				if (icon_x == 0) {
					Slot_this.icon_sprites[23].runAction(cc.fadeOut(0.4));
				} else {
					Slot_this.icon_sprites[icon_x-1].runAction(cc.fadeOut(0.4));
				};
				Slot_this.icon_sprites[icon_x].setOpacity(255);
				Slot_this.YS = 0;
			}else {
	Slot_this.YS++;
}		
		}else{
			//Slot_this.zhuandongyinxiao = false;
			Slot_this.SZ = 0;
			Slot_this.unschedule(Slot_this.zhuanQuan);
			Slot_this.JudgingWinningResults2();
			Slot_this.JudgingWinningResults();
			if (Slot_this.isTuichu) {
				Slot_this.isTuichu = false;
				return;
				}else{
			if (Slot_this.isZhongJiang) {
				Slot_this.scheduleOnce(Slot_this.getDataFromServer, 3.5);
				Slot_this.isZhongJiang = false;
			}else{
				Slot_this.scheduleOnce(Slot_this.getDataFromServer, 1.0);
			}
		};
		}
	},
	//判断转圈图标与转动的图标是否有相同的
	JudgingWinningResults : function() {
		if (Slot_this.rotateresult == 9) {
			bounceNumber --;
			Slot_this.Third_timesText.setString(bounceNumber.toString()); 
			if (bounceNumber<=0) {
				cc.log("退出");
				Slot_this.isTuichu = true;
				//Slot_this.unschedule(Slot_this.getDataFromServer());
				if (Slot_this.isZhongJiang) {
					this.scheduleOnce(Slot_this.creatJieSuanJieMian, 3.5);
				}else{
				Slot_this.creatJieSuanJieMian();
				}
			}
		
		}else {
			for (var i = 0; i < Slot_this.rollingresult.length; i++) {
				var IX= Slot_this.rollingresult[i];
				if (Slot_this.rotateresult == IX) {
					cc.audioEngine.playEffect(Slot_this._resultSounds[IX]);
					Slot_this.isZhongJiang = true;//有中奖图标
					Slot_this.icon_sprites[Slot_this.before_weizhi].runAction(cc.blink(3.0, 15));
					var type1 = (9-IX);
					Slot_this.image_sprites[i].runAction(mainScene_this._spritesActions[type1].clone());
					Slot_this.bet_sprites[IX].runAction(cc.blink(3.0, 15));
					Slot_this.borderRunAction(Slot_this.border_sprites[i]);
					winScore+=(Slot_this.Third_betScore)*(Slot_this.bet_numbers[Slot_this.rotateresult]);
					Slot_this.Third_winText.setString(winScore.toString());
				}
			}
        }
	},
	//判断转圈的图标是否有三个以上相同的
	JudgingWinningResults2 : function() {
		var left_count = 1;
		for (var i = 0; i < 3; i++) {
			if(Slot_this.rollingresult[i+1] == Slot_this.rollingresult[0]){
				left_count ++;
			}else{break;};
		};
		if (left_count >=3) {//从左向右判断
			Slot_this.isZhongJiang = true;//有中奖图标
			var index = Slot_this.rollingresult[0];
			cc.audioEngine.playEffect(Slot_this._resultSounds[index]);
			for (var i = 0; i < left_count; i++) {
				var array_element = Slot_this.image_sprites[i];
				var type1 = (9-index);
				array_element.runAction(mainScene_this._spritesActions[type1].clone());
				Slot_this.borderRunAction(Slot_this.border_sprites[i]);
			};
			if (left_count == 3) {
				Slot_this.bet_sprites[8].runAction(cc.blink(3.0, 15));
				winScore+=(Slot_this.Third_betScore)*(Slot_this.bet_numbers[8]);
				Slot_this.Third_winText.setString(winScore.toString());
			}else if (left_count == 4) {
				Slot_this.bet_sprites[9].runAction(cc.blink(3.0, 15));
				winScore+=(Slot_this.Third_betScore)*(Slot_this.bet_numbers[9]);
				Slot_this.Third_winText.setString(winScore.toString());
           }
			return;
		}
		var right_count = 1;
		for (var i = 3; i > 0; i--) {//从右向左判断
			if(Slot_this.rollingresult[i-1] == Slot_this.rollingresult[3]){
				right_count ++;
			}else{break;};
		};
		if (right_count == 3) {
			Slot_this.isZhongJiang = true;//有中奖图标
			var index = Slot_this.rollingresult[3];
			cc.audioEngine.playEffect(Slot_this._resultSounds[index]);
			for (var i = 0; i <3; i++) {
				var array_element = Slot_this.image_sprites[3-i];
				var type1 = (9-index);
				array_element.runAction(mainScene_this._spritesActions[type1].clone());
				Slot_this.borderRunAction(Slot_this.border_sprites[3-i]);
				
			};
			Slot_this.bet_sprites[10].runAction(cc.blink(3.0, 15));
			winScore+=(Slot_this.Third_betScore)*(Slot_this.bet_numbers[10]);
			Slot_this.Third_winText.setString(winScore.toString());
		} 
	},
	creatMixLayouts : function() {
		for (var i = 0; i < 4; i++) {
			var AddNum = Math.floor(Math.random()*800);
			var Mix_layout = new MixupCircleLayout(AddNum);
			Mix_layout.x = (Slot_this.image_sprites[i] .getPositionX());
			Mix_layout.y = (Slot_this.image_sprites[i] .getPositionY());
			Slot_this.addChild(Mix_layout);
			Slot_this.mix_layouts[i] = Mix_layout; 
		};
	},
	initScene : function() {
		var rootNode = ccs.load("res/shz/SlotGame/MainScene.json").node;
		Slot_this.addChild(rootNode,1);
		//rootNode.setVisible(false);
		for (var i = 0; i < 24; i++) {//四周转动的图标tag从50到73
			var icon_sprite = rootNode.getChildByTag(i+50);
			Slot_this.icon_sprites[i] = icon_sprite;
		};
		for (var i = 0; i < 4; i++) {//中间四个转动的图标Tag从21到24
			var image_suiji = Math.floor(Math.random()*9);
			var image_sprite = rootNode.getChildByTag(i+21);
			image_sprite.setSpriteFrame(Element_up[image_suiji]);	
			Slot_this.image_sprites[i] = image_sprite;
		};
		for (var i = 0; i < 11; i++) {//中奖后闪烁的倍数图标tag从10到20
			var bet_sprite = rootNode.getChildByTag(i+10);
			Slot_this.bet_sprites[i] = bet_sprite;
		};
		for (var i = 0; i < 4; i++) {//中奖后闪烁的框tag从27到30
			var border_sprite = rootNode.getChildByTag(i+27);
			Slot_this.border_sprites[i] = border_sprite;
			//border_sprite.setVisible(true);
		};
		Slot_this.Third_scoreText = rootNode.getChildByName("credit_Text");
		Slot_this.Third_scoreText.setString(USER_lUserScore.toString());
		Slot_this.Third_winText = rootNode.getChildByName("totalwin_text");
		Slot_this.Third_winText.setString(winScore.toString());
		Slot_this.Third_betText = rootNode.getChildByName("totalbrt_Text");
		Slot_this.Third_betText.setString(Slot_this.Third_betScore.toString());
		Slot_this.Third_timesText = rootNode.getChildByName("Times_Text");
		Slot_this.Third_timesText.setString(bounceNumber.toString()); 
	},
	borderRunAction : function(self) {
		var borderaction = Producer.ProduceFrameAnimation("Third_border_", 5, 0, 0.15);
		var REBA = cc.Repeat(borderaction,4);
		self.runAction(cc.sequence(
				cc.callFunc(function(){
					self.setVisible(true);
				}, self),
				REBA,
				cc.callFunc(function(){
					self.setVisible(false);
				}, self)
		));
	},
	creatJieSuanJieMian : function() {
		var self = Slot_this;
		cc.audioEngine.playEffect(Effect_res.xiaomali_jiesuan);
		var jieSuan = ccs.load("res/shz/SlotGame/jieSuan.json").node;
		jieSuan.scaleX = 0.1;
		jieSuan.scaleY = 0.1;
		jieSuan.runAction(cc.scaleTo(0.5, 1, 1));
		jieSuan.x = cc.winSize.width/2;
		jieSuan.y = cc.winSize.height/2;
		var zhezhao = TestPushBox.create(jieSuan);
		self.addChild(zhezhao,100);
		var yingfen = jieSuan.getChildByName("Node_1");
		var pos = yingfen.getPosition();
		var str = "+"+winScore.toString();
		var yingfen = new cc.LabelBMFont(str,"res/shz/xiaomali.fnt");
		yingfen.x = pos.x;
		yingfen.y = pos.y;
		jieSuan.addChild(yingfen);
		var biBeiBtn = jieSuan.getChildByName("Button_1");
		biBeiBtn.addClickEventListener(function() {
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			isAuto = false;
			var trans = new cc.TransitionFade(1.0, new DiceGameScene(), cc.color(100, 100, 100, 255));  
			cc.director.runScene(trans); 
		});
		var shouFenBtn = jieSuan.getChildByName("Button_2");
		shouFenBtn.addClickEventListener(function() {
			USER_lUserScore = USER_lUserScore + winScore - Math.floor(winScore*0.01);
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			var trans = cc.TransitionFade(1.0,new MainGameScene(),cc.color(100, 100, 100, 100));
			cc.director.runScene(trans);
		});
	},
	onEnter:function(){
		this._super();
		
		cc.audioEngine.playMusic(Music_res.xiaomali_bgm, true);
		var numberAry =["res/shz/MainGameScene/Dragon_feichu"];
		removeResources(numberAry);
		cc.log("slot enter");
	},
	onExit:function(){
		this._super();
		RUNINGSCENE = null;
		Slot_this = null;
		cc.audioEngine.stopMusic(Music_res.xiaomali_bgm);
		cc.log("slot exit");
		var numberAry =["res/shz/SlotGame/Third_zujian"];
		removeResources( numberAry);
	},
	onExitTransitionDidFinish : function(){
		this._super();
		cc.log("+++++++++++++++++++++++++++++++SlotMachineScene onExitTransitionDidFinish");
		RUNINGSCENE = "SlotMachine"
	},
	onExitTransitionDidStart : function(){
		this._super();
		cc.log("+++++++++++++++++++++++++++++++SlotMachineScene onExitTransitionDidStart");
	}
});

var SlotMachineScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new SlotMachineLayer();
		this.addChild(layer);
	}
});
