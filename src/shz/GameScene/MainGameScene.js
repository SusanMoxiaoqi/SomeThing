
var mainScene_this = null;
var firstKaishi = "firstKaiShi";
var firstBiBei = "firstBiBei";
var MainGameLayer = cc.Layer.extend({
	sprite:null,
	bounceNumber : 0,
	allEqual : 10,//控制是否有全盘奖的状态，默认为10，既没有中全盘奖，0-9为全盘奖，11，12为全盘兵器将和全盘人物奖
	allEqualData : {},//全盘奖时，接收服务器返回的200，112的全盘奖数据
	elementArray : [],
	Toplayer : null,
	linelayer : null,
	PlusBetScore_button : null,
	MinusBetScore_button : null,
	MaxBet_button : null,
	start_button : null,
	zhezhao_layer : null,//中奖后的遮照层
	Dice_button : null,//比倍按钮
	GetScore_button : null,//收分按钮
	win_score : null,
	win_jiangquan : null,
	winMultiple : 0,//中奖的倍数之和
	jiangQuanBei : 0,//中奖奖券的倍数
	getscore : false,//中奖后是否立即点击得分按钮，默认为false(现在不用了，所以在任何地方都赋值为false)
	nameDownArr : [],           //声明一个数组来存放从服务器获取的随机数据（每个方格变暗的图片名字,判断得分情况也用它）
	starButtonState : 0,        // 当为0时开始按钮显示开始，为1时显示停止，为2时显示得分
	allOcin : null,//闪烁的全盘奖的图标
	_borderLayer : null,
	_Mixlayer : null,
	_isPause : true,         //模糊的动画是否停止
	_success : false,            // 判断是否成功的从网络获取数据
	_stoped : false,//控制停止按钮，默认为false，当开始停止后为true，再次点击停止按钮无效
	_betscore : 0,//刚进入主场景时显示的总押分
	nn : 0,//中奖后每条中奖线上的贴图依次执行闪光动作时使用
	_bet_score : null,
	_all_score : null,
	_touXiang : null,
	_touXiangBtn : null,
	bgImage : null,
	eleZorder : null,//记录15个精灵贴图的Zorder
	_yuanbao_lable : null,
	_UserId_lable : null,
	_Auto_button : null,
	_Mix_n : 0,//控制模糊动画的转动时间
	_Mix_i : 0,
	_WinIndex : [],
	_LineIndex : [],
	_isKongxian : true,
	_zhongZhiLayer : null,
	_spritesActions : [],
	_isybtx : false,
	_soundKind : [],//一起执行动画时的音效种类
	_isFanHui : false,
	zaiXianLingQu_time : 0,
	zaiXianLingQu_time_ary : [],
	clipNode : null,
	_exitTime : 0,
	_resultSounds : [Effect_res.jiangQuan,Effect_res.shuiHuZhuan,Effect_res.zhongYiTang,Effect_res.tiTianXingDao,Effect_res.songjiang,Effect_res.linChong,Effect_res.luZhiShen,Effect_res.jinDao,Effect_res.yinQiang,Effect_res.tieFu],
	getDescription : function() {
		return "MainGameScene";
	},
	repleaceStatus : function() {
		cc.log("重置老虎机界面………………………………………");
		zuZhiBack  = false;//如果进入小玛丽或比倍后这个也要重置
		mainScene_this.bounceNumber = 0;
		mainScene_this.allEqual = 10;
		mainScene_this.jiangQuanBei = 0;
		mainScene_this.winMultiple = 0;
		mainScene_this._isPause = true;
		mainScene_this._success = false;
		mainScene_this._stoped = false;
		mainScene_this.nn = 0;
		mainScene_this._Mix_i = 0;
		mainScene_this._Mix_n = 0;
		mainScene_this.starButtonState = 0;
		mainScene_this._isybtx = false;
		mainScene_this._isKongxian = true;
		mainScene_this._Auto_button.setTouchEnabled(true);
		mainScene_this._Auto_button.setBright(true);
		mainScene_this.start_button.setTouchEnabled(true);
		mainScene_this.start_button.setBright(true);
		cc.log("重置老虎机界面………………………………………1");
		mainScene_this._Auto_button.loadTextures("First_zidong_up.png", "First_zidong_down.png", "First_zidong_dis.png", ccui.Widget.PLIST_TEXTURE);
		mainScene_this.start_button.loadTextures("First_kaishi_up.png", "First_kaishi_down.png", "First_kaishi_dis.png", ccui.Widget.PLIST_TEXTURE);
		mainScene_this._zhongZhiLayer.setLocalZOrder(-1);
		mainScene_this.zhezhao_layer.setLocalZOrder(-1);
		mainScene_this._borderLayer = borderLayer;/**添加borderLayer*/
		mainScene_this.addChild(mainScene_this._borderLayer, 90);
		mainScene_this.setDisableFunctionButton(true,true);
		
		for ( var i3 in mainScene_this.elementArray) {
		mainScene_this.elementArray[i3].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(nameArr[i3]));
		mainScene_this.elementArray[i3].setType(getSpriteTypeForName(nameArr[i3]));
		mainScene_this.elementArray[i3].setImageName(nameArr[i3]);
		mainScene_this.elementArray[i3].spriteRunBufferAction();
		}
		var node = UserInformation.create(1);
		USERNODE = node;
        node.x=  0;
        node.y = 0;
        mainScene_this.addChild(node,92,92);
  
        cc.log("重置老虎机界面………………………………………2");
        cc.log("重置老虎机界面………………………………………3");
        //奖池
        JiangChi.setJiangChiParent(this);
        mainScene_this.addChild(JiangChi,50,152);
        JiangChi.schedule(function() {
        		cc.log("请求奖池");
        		loginServer.sendMessage(MDM_MB_USER_SERVICE, SUB_MB_GET_REWARD_POOL,{wKindID : 203});
        }, 10.0,cc.REPEAT_FOREVER,0.1);

        if (winScore>0) {
        	gameSever.sendMessage(MDM_GF_GAME,SUB_C_SCORE,{},GAMENAME);
        	mainScene_this.AutoDefen(mainScene_this);
        };
        
		cc.log("重置老虎机界面结束……………………………………4");
	},
	ctor:function () {
		// ////////////////////////////
		// 1. super init first
		
		this._super();
		cc.log("+++++++++++++++++++++++++++++++1mainscene");	
		for (var nm = 0; nm < youxi_resourcesplist.length; nm++) {
			var array_element = youxi_resourcesplist[nm];
			cc.spriteFrameCache.addSpriteFrames(array_element);
		}
		cc.log("+++++++++++++++++++++++++++++++2mainscene");	

		var size = cc.winSize;	
		var _this = this;
		mainScene_this = this;
		mainScene_this._isFanHui = false;
		if (isJiangQuan) {
			Element_up = Element_up_youjiang;
			Element_down = Element_down_youjiang;
		} else {
			Element_up = Element_up_wujiang;
			Element_down = Element_down_wujiang;
		}
		_this._betscore = NumberOfLines*whichScene[BetScoreIndex];//刚进入主场景时显示的总押分	
//		_this._zhongZhiLayer = new zhongZhiLayer();
//		this.addChild(_this._zhongZhiLayer, 0);
		cc.log("+++++++++++++++++++++++++++++++3mainscene");	
		_this.initScene();/**初始化场景*/
		cc.log("+++++++++++++++++++++++++++++++10mainscene");	
		/**用户信息*/
		var node = UserInformation.create(1);
		USERNODE = node;
		node.x=  0;
		node.y = 0;
		this.addChild(node,92,92);
		cc.log("+++++++++++++++++++++++++++++++11mainscene");	
		_this._borderLayer = borderLayer;/**添加borderLayer*/
		_this.addChild(_this._borderLayer, 90);
		_this.addTopNode();/**添加上部的按钮*/
		_this.creatZhezhaoLayer();/**创建遮照层，遮照层上有收分，比倍按钮，当中奖时显示出来，其他情况隐藏*/
		cc.log("+++++++++++++++++++++++++++++++13mainscene");	
		_this._zhongZhiLayer = new zhongZhiLayer();
		this.addChild(_this._zhongZhiLayer, -1);
		this.createSpritesActions();
		

		cc.log("+++++++++++++++++++++++++++++++14mainscene");
		return true;
	},
	/**进入场景时把所有的发光图片和序列动画生产出来 */
	createSpritesActions : function() {
		cc.log("$%$%$%$%$%$%$%$%$%$%$%",this._spritesActions.length);
		if (this._spritesActions.length>0) {//当首次进入老虎机界面时会创建10个帧动画动作，当在比倍，小玛丽场景和老虎机界面来回切换时不要再重新创建这些动作。
			return;
		};
		for (var i = 0; i < Element_up.length; i++) {
			var xuLie = Producer.ProduceFrameAnimation("result_"+(i)+"_3_", 19, 0, 0.15);
			xuLie.retain();
			this._spritesActions.push(xuLie);
		}
	},
	/**从服务器得到需要现实的15张贴图精灵*/
	getNameofSpriteFromServer : function() {
		var zongyafen = NumberOfLines*whichScene[BetScoreIndex];
		gameSever.sendMessage(MDM_GF_GAME,SUB_C_SCENE1_START,{bet_score : zongyafen},GAMENAME);
		cc.log("getNameofSpriteFromServer");
	},
	/**创建遮照层，遮照层上有收分，比倍按钮，当中奖时显示出来，其他情况隐藏*/
	creatZhezhaoLayer : function() {
		var _this = this;
		var size = cc.winSize;
		var rootNode = ccs.load("res/shz/MainGameScene/Bibeishoufen.json").node;
		rootNode.x= size.width/2;
		rootNode.y =size.height/2;
		rootNode.tag = 10;
		_this.zhezhao_layer = new shouFenBibeiLayer(rootNode);
		_this.zhezhao_layer.tag = 144;
		_this.Dice_button = rootNode.getChildByName("First_bibeiBtn");
		_this.addChild(_this.zhezhao_layer, 0);
		_this.zhezhao_layer.setVisible(false);
		_this.Dice_button.addClickEventListener(function() {
			if (_this.zhezhao_layer.getLocalZOrder() <= 0) {
				return;
			};
			if(!slocal.getItem(firstBiBei) || slocal.getItem(firstBiBei) == "false"){
				var biBeiFaGuang = mainScene_this.getChildByTag(144).getChildByTag(44);
				biBeiFaGuang.stopAllActions();
				biBeiFaGuang.setVisible(false);
				slocal.setItem(firstBiBei,"true");
			}
			if (mainScene_this.allEqual != 10 ) {//如果是全盘奖把全盘奖的下元宝的特效去掉
				cc.audioEngine.stopAllEffects();
				cc.audioEngine.stopMusic(true);
				if(mainScene_this._isybtx){
					cc.log("mainScene_this.removeChildByTag(111, true);");
					mainScene_this._isybtx = false;
					if(mainScene_this.getChildByTag(111)){
						mainScene_this.removeChildByTag(111, true);
					}
					
				}
			}
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			isAuto = false;
			mainScene_this._isKongxian = true;
			_this.stopAllActions();
			for ( var i in _this.elementArray) {
				_this.elementArray[i].stopchildAction(_this.eleZorder[i],nameArr[i]);
			_this._borderLayer.stopAllChildAction();
			//_this.elementArray[i].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(nameArr[i]));
			};
			if (winScore<=0) {
				var xinxi = {Describe : "只赢取奖券，无法进行比倍！",errorCode : 1002,isBack : false};
				var tishi = TiShiKuang.create(xinxi);
				cc.director.getRunningScene().addChild(tishi,1000);
			}else{
			var trans = new cc.TransitionFade(1.0, new DiceGameScene(), cc.color(100, 100, 100, 255));  
			cc.director.runScene(trans);  
			};
		});
		if(!slocal.getItem(firstBiBei) || slocal.getItem(firstBiBei) == "false"){
			var biBeiFaGuang = cc.Sprite.createWithSpriteFrameName("bibei_d.png");
			biBeiFaGuang.x  = 710;
			biBeiFaGuang.y =393;
			biBeiFaGuang.tag =44;
			_this.zhezhao_layer.addChild(biBeiFaGuang,2);
			var action1 = cc.fadeOut(1.0);
			var action1Back = action1.reverse();
			var delay = cc.delayTime(1);

			biBeiFaGuang.runAction(cc.sequence(action1 , action1Back).repeatForever());
		}
		
		_this.GetScore_button = rootNode.getChildByName("First_shoufenBtn");
		_this.GetScore_button.addClickEventListener(function() {
			if (_this.zhezhao_layer.getLocalZOrder() <= 0) {
				return;
			};
			mainScene_this._isKongxian = true;
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			
			_this.AutoDefen(this);
		});
//		//显示获奖分数 
		var defen = rootNode.getChildByName("First_defen");
		var jiangquan= rootNode.getChildByName("First_jiangquan");
		if (isJiangQuan) {
			jiangquan.setVisible(true);
			defen.setVisible(false);
			var Lwin_score = jiangquan.getChildByName("Node_2");//临时使用显示压线文本代替每次赢分
			var poi = Lwin_score.getPosition();
			_this.win_score = new cc.LabelBMFont("0","res/shz/MainGameScene/jiangquan-2.fnt");
			_this.win_score.x = poi.x;
			_this.win_score.y = poi.y;
			jiangquan.addChild(_this.win_score);
			_this.win_score .setString(winScore.toString());
			var Lwin_jiangquan = jiangquan.getChildByName("Node_3");
			var poi = Lwin_jiangquan.getPosition();
			_this.win_jiangquan = new cc.LabelBMFont("0","res/shz/MainGameScene/jiangquan-1.fnt");
			_this.win_jiangquan.x = poi.x;
			_this.win_jiangquan.y = poi.y;

			jiangquan.addChild(_this.win_jiangquan);
			
		} else {
			jiangquan.setVisible(false);
			defen.setVisible(true);
			var Lwin_score = defen.getChildByName("First_winScore");//临时使用显示压线文本代替每次赢分
			var poi = Lwin_score.getPosition();
			_this.win_score = new cc.LabelBMFont("0","res/shz/MainGameScene/01.fnt");
			_this.win_score.x = poi.x;
			_this.win_score.y = poi.y;
			defen.addChild(_this.win_score);
			_this.win_score .setString(winScore.toString());
		}
		
	},
	/**开启时间回调,控制将要显示图片时的时间间隔*/
	dayin :function(){
		//cc.log(i);	
		if (mainScene_this._Mix_i<15) {
			mainScene_this._stoped = true;
//			cc.log("nameArr[mainScene_this._Mix_i]",nameArr[mainScene_this._Mix_i]);
			mainScene_this.elementArray[mainScene_this._Mix_i].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(nameArr[mainScene_this._Mix_i]));
			mainScene_this.elementArray[mainScene_this._Mix_i].setImageName(nameArr[mainScene_this._Mix_i]);			
			mainScene_this.elementArray[mainScene_this._Mix_i].setType(getSpriteTypeForName(nameArr[mainScene_this._Mix_i]));
			mainScene_this.elementArray[mainScene_this._Mix_i].spriteRunBufferAction();
			mainScene_this._Mix_i++;
		}else{
			mainScene_this._stoped = false;
			mainScene_this.unschedule(mainScene_this.dayin);
			mainScene_this._Mix_i = 0;
			mainScene_this._Mixlayer.setPause();
			mainScene_this._isPause = true;
			mainScene_this.start_button.loadTextures("First_kaishi_up.png", "First_kaishi_down.png", "First_kaishi_dis.png", ccui.Widget.PLIST_TEXTURE);
			mainScene_this.starButtonState = 0;
			mainScene_this.getScoreFromResult();//判定得分情况，根据得分情况，改变按钮的状态
			
		}
	},
	/** 开启定时器，控制模糊动画的执行时间*/
	jishiStop : function() {
		
		if (mainScene_this._success) {
			if (mainScene_this._Mix_n >= 16) {
				mainScene_this._Mix_n = 0;
				mainScene_this.unschedule(mainScene_this.jishiStop);
				mainScene_this.schedule(mainScene_this.dayin, 0.05);
				mainScene_this._isPause = true;
			};
			if (mainScene_this.starButtonState == 0) {//当从服务器获取贴图成功，且开始按钮状态为零时，且不是自动游戏时，开始按钮变为停止
				if (!isAuto) {
					mainScene_this.start_button.loadTextures("First_tingzhi_up.png", "First_tingzhi_down.png", "First_tingzhi_dis.png", ccui.Widget.PLIST_TEXTURE);
					mainScene_this.starButtonState = 1;
				};
			};
		};
		mainScene_this._Mix_n ++;
		if (mainScene_this._Mix_n == 150) {
			cc.audioEngine.stopAllEffects();
			mainScene_this._Mixlayer.setPause();
			mainScene_this._isPause = true;
			mainScene_this.unschedule(mainScene_this.jishiStop);
			mainScene_this._success = false;
			var parent = mainScene_this.getParent();
			parent.unschedule(parent.daoJiShiLingJIang);
			AutomaticLink.startUpAutomaticLink(gameSever,10,2010);
		}
	},

	/**点击开始按钮后，把押线，压分，比倍，道具等按钮设置为不可点击状态
	 每个周期之后，再把他们设置为可点击*/
	setDisableFunctionButton : function(bright,enable) {
		
		this.PlusBetScore_button.setTouchEnabled(enable);
		this.PlusBetScore_button.setBright(bright);
		this.MinusBetScore_button.setTouchEnabled(enable);
		this.MinusBetScore_button.setBright(bright);  
		topNode.setButtonBrightAndTouchEnable(bright, enable);
	},

	/** 判断得分情况*/
	getScoreFromResult : function() {
		var _this = mainScene_this;
		//每次判断得分情况时，首先把全盘奖和小玛丽初始化
		this.allEqual = 10;
		bounceNumber = 0;
		winScore = 0;
		choujiiangWinScore = 0;
		var winIndex = [];//把所有中奖线的情况记录下来
		var lineIndex = [];//记录那一条线是中奖的
		this._soundKind = [];//每次使用完数组后，一定要把它给清空，若提前点击终止层，同样需要把它清空,在使用它的前一步把它再次清空，防止发生错误。
		//先判断是否为全盘奖
		if (NumberOfLines == 9&&bounceNumber == 0) {		//判断是否全盘相同
			this.allEqual = this.elementArray[0].getType();
			for (var i4 = 1; i4 < 15; i4++) {
				if (this.elementArray[i4].getType() != this.allEqual ) {
					this.allEqual = 10;
					break;
				}
			};
		};
		if (this.allEqual == 10) {//全盘兵器奖
			this.allEqual = 12;
			for (var i5 = 0; i5 < 15; i5++) {
				if (this.elementArray[i5].getType() <7) {
					this.allEqual = 10;
					break;
				};
			};
		};
		if (this.allEqual == 10) {		//判断是否全盘人物奖
			this.allEqual = 11;
			for (var i6 = 0; i6 < 15; i6++) {
				if (this.elementArray[i6].getType() <4||this.elementArray[i6].getType() >6) {
					this.allEqual = 10;
					break;
				};
			};
		};
		if (this.allEqual != 10) {
			for ( var iterable_element in ScoreLines) {
				winIndex.push(ScoreLines[iterable_element]);
			};
			lineIndex = [0,1,2,3,4,5,6,7,8];
			for (var int = 0; int < 9; int++) {
			var suijishu = Math.ceil(Math.random()*3);
			var jishu = (this.allEqual-10)*3;
			var yinxiao =(this.allEqual > 10)?( jishu + suijishu) : this.allEqual; 
			this._soundKind.push(yinxiao);
			}
		};
		if (this.allEqual !=0) {//全盘奖倍率
			this.winMultiple = winMultipleAllEqualList[this.allEqual];
		}else if (this.allEqual ==0) {//全盘奖奖券倍率
			this.jiangQuanBei = winMultipleAllEqualList[this.allEqual];
		};
		/**判断普通的中奖情况
		 * 如果存在全盘奖的话，跳过普通中奖情况的判断
		 * */
		if (this.allEqual == 10) {
		for(var i=0;i<NumberOfLines;i++)
		{
			var line=ScoreLines[i];
			var zcount=0;
			var dcount=0;
			var ztempIndex = [];//记录一条线的记录结果，正序记录
			ztempIndex.push(line[0]);
			//每条线先从左至右判断一次
			for(var j=0;j<4;j++){
				var sprite1=this.elementArray[line[j]];
				var sprite2=this.elementArray[line[j+1]];
				if(sprite1.getTempType()==1||sprite2.getTempType()==1){
					if(sprite1.getTempType()==1){
						sprite1.setTempType(sprite2.getTempType());
					}else {
						sprite2.setTempType(sprite1.getTempType());
					}
				}
				var sPriteType=sprite1.getTempType();
				var sPriteType2=sprite2.getTempType();
				if(sPriteType==sPriteType2){
					ztempIndex.push(line[j+1]);
					zcount++;
				}else{
					break;
				}
			};
			if (ztempIndex.length>2) {
				winIndex.push(ztempIndex);//如果数组的长度大于二（即中奖了）则把他装进赢得数组
				lineIndex.push(i);
				var lenInde1 = ztempIndex.length-3;
				var type1 = this.elementArray[line[ztempIndex.length-1]].getTempType();
				if (type1 == 0) {
					this.jiangQuanBei = this.jiangQuanBei + winMultipleList[type1][lenInde1];
				}else{
					this.winMultiple = this.winMultiple + winMultipleList[type1][lenInde1];
				};
				this._soundKind.push(type1);
			};

			//每次比较完以后，把他们的临时属性还原
			for(var j=0;j<5;j++){
				var sprite1=this.elementArray[line[j]];
				sprite1.setType(sprite1.getType());//这个函数实现了临时属性的改变
			}

			var dtempIndex = [];//记录一条线的记录结果，反序记录
			dtempIndex.push(line[4]);
			//每条线再从右至左判断一次
			if (zcount!=4) {		
				for(var j=4;j>0;j--){
					var sprite1=this.elementArray[line[j]];
					var sprite2=this.elementArray[line[j-1]];
					if(sprite1.getTempType()==1||sprite2.getTempType()==1){
						if(sprite1.getTempType()==1){
							sprite1.setTempType(sprite2.getTempType());
						}else {
							sprite2.setTempType(sprite1.getTempType());
						}
					}

					var sPriteType=sprite1.getTempType();
					var sPriteType2=sprite2.getTempType();
					if(sPriteType==sPriteType2){
						dtempIndex.push(line[j-1]);
						dcount++;
					}else{
						break;
					}
				}
			}
			if (dtempIndex.length>2) {
				winIndex.push(dtempIndex);//如果数组的长度大于二（即中奖了）则把他装进赢得数组
				lineIndex.push(i);
				var lenInde1 = dtempIndex.length-3;
				var type1 = this.elementArray[line[5-dtempIndex.length]].getTempType();
				if (type1 == 0) {
					this.jiangQuanBei = this.jiangQuanBei + winMultipleList[type1][lenInde1];
				}else{
					this.winMultiple = this.winMultiple + winMultipleList[type1][lenInde1];
				};
				this._soundKind.push(type1);
			};
			zcount = 0;
			dcount = 0;

			for(var j=0;j<5;j++){
				var sprite1=this.elementArray[line[j]];
				sprite1.setType(sprite1.getType());
			}			
		};
		};
		for ( var lineNum in lineIndex) {
			this.linelayer.judgementWhichOneLineDisplay(lineIndex[lineNum],false,1.0);//每条线中奖后，把所在的线显示出来一秒的时间		//测试需要，应该为1.0
		};
		if (winIndex.length<=0 && this.allEqual == 10) {
			this._isKongxian = true;
			_this.linelayer.setDisplayLinesAndLight(0);
			this.setDisableFunctionButton(true,true);
			this._Auto_button.setTouchEnabled(true);
			this._Auto_button.setBright(true);  
				this.starButtonState = 0;
				this.start_button.loadTextures("First_kaishi_up.png", "First_kaishi_down.png", "First_kaishi_dis.png", ccui.Widget.PLIST_TEXTURE);
				if (isAuto) {
					this._isKongxian = false;
					this.AutoKaishi(this);
				}
		}
		if (winIndex.length>0 ) {//长度大于零。则有中奖线
			_this._zhongZhiLayer.setLocalZOrder(100);
			//获奖后把开始按钮的状态改为2，且改变他的显示图片
			this.starButtonState = 2;
			_this.start_button.setBright(false);
			_this.start_button.setTouchEnabled(false);
			_this._Auto_button.setBright(false);
			_this._Auto_button.setTouchEnabled(false);
			//this.start_button.loadTextures("backscore_0.png", "backscore_1.png", "backscore_2.png", ccui.Widget.PLIST_TEXTURE);
			if (isAuto) {
				this.start_button.loadTextures("First_kaishi_up.png", "First_kaishi_down.png", "First_kaishi_dis.png", ccui.Widget.PLIST_TEXTURE);
			}
			//判断是否有小玛丽
			bounceNumber = 0;
			for (var i2 = 0; i2 < winIndex.length; i2++) {
				var tempArray = winIndex[i2];
				var n1 = 0;
				//cc.log(tempArray);
				for (var i21 = 0; i21 < tempArray.length; i21++) {
					type21 = this.elementArray[tempArray[i21]].getType();
					if (type21 == 1) {
						n1++;
					}else {break;};	
				}
				if (tempArray.length == 5&&(n1 == 0|| n1==1)) {//这是一种特殊情况，中奖的贴图个数为5，而且右边可以得到小玛丽奖励
					n1 = 0;
					for (var i22 = 4; i22 >=0; i22--) {
						type22 = this.elementArray[tempArray[i22]].getType();
						if (type22 == 1) {
							n1++;
						}else{break;};	
					}
				}
				switch (n1) {
				case 3:
					bounceNumber +=1;
					break;
				case 4:
					bounceNumber +=2;
					break;
				case 5:
					bounceNumber +=3;
					break;
				default:
					break;
				}
				//bounceNumber = 0;//测试需要
			};
			//每次老虎机后的结算分数
			winScore = whichScene[BetScoreIndex]*this.winMultiple;
			this.win_score.setString(winScore.toString());
			if (isJiangQuan) {
				var core =  mainScene_this.jiangQuanBei*whichScene[BetScoreIndex];
				_this.win_jiangquan.setString(Producer.changeNumberToString(core));
			}
			this._WinIndex = winIndex;
			this._LineIndex = lineIndex;
			cc.log("中奖后调用动画的函数");
			this.scheduleOnce(this.afterWinAction(winIndex,lineIndex), 1.0);//测试需要，应该为1.0
		}
	},

	
	/**获奖后执行的动画，把所有图片变暗之后执行的动画，
	 首先把所有中奖的线上的方格图片按训序执行发光的动作，
	 然后再全部在一起执行动画*/
	
	
	/**获奖后执行动画之前，首先把所有的图片变暗*/
	afterWinAction : function(winIndex,lineIndex) {
		return function(){
			if (this.getscore) {
				cc.log("this.getscore return()");
			return;
		}
		for ( var i in this.elementArray) {
			this.elementArray[i].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(this.nameDownArr[i]));
		};
		//this.afterWinAction2(winIndex,lineIndex);		
		var len = winIndex.length;
		cc.log("winIndex.length",winIndex.length,lineIndex.length,winIndex.toString(),lineIndex.toString());
		this.schedule(this.afterWinAction3(winIndex,lineIndex), 0.8, len-1,0.1);//API中repeat默认加一
		};
	},
	/**把每条线的中奖图标闪光一次*/
	afterWinAction3 : function(winIndex,lineIndex) {
		return function() {
			if (this.getscore) {
				this.unschedule(this.afterWinAction3(winIndex,lineIndex));
				this.nn = 0;
				return;
			};
			cc.audioEngine.playEffect(Effect_res.dingShan);
			cc.log("afterWinAction3",lineIndex[this.nn],this.nn);
			this.linelayer.judgementWhichOneLineDisplay(lineIndex[this.nn], false, 0.6);
			var numb = Math.floor(Math.random()*5);
			for ( var mm in winIndex[this.nn]) {
				var ss = winIndex[this.nn][mm];
				var type1 = this.elementArray[ss].getType();
				//var acttd = Producer.ProduceFrameAnimation("result_"+type1+"_2_", 5, 0, 0.15);
				var acttd = this._spritesActions[type1].clone();
				this.elementArray[ss].runchildAction(ss,acttd,numb,false,type1);
			}
			this.nn++;
			if (this.nn == winIndex.length) {
				this.nn = 0;
				this.scheduleOnce(this.afterWinAction4(winIndex,lineIndex), 0.8)
			};
		};
	},
	/**然后所有中奖的图片一起执行最后的帧动画*/
	afterWinAction4 : function(winIndex,lineIndex) {
		return function() {
			if (this.getscore) {
				this.unschedule(this.afterWinAction4(winIndex, lineIndex));
				this.unscheduleAllCallbacks()
				return;
			};

			var numb = Math.floor(Math.random()*5);	
			var isTwink = false;
			if (this.allEqual != 10) {//如果是全盘奖外框会闪烁
				isTwink = true;
			}
			for (var nm = 0; nm < winIndex.length; nm++) {	
				cc.audioEngine.playEffect(this._resultSounds[this._soundKind[nm]]);
				for ( var mm in winIndex[nm]) {
					var ss = winIndex[nm][mm];
					if(this.elementArray[ss].getisAction())continue;
					var type1 = this.elementArray[ss].getType();
					var acttd = this._spritesActions[type1].clone();
					this.elementArray[ss].runchildAction1(ss,acttd,numb,isTwink);			
				}
			};
			this._soundKind = [];//每次使用完数组后，一定要把它给清空，若提前点击终止层，同样需要把它清空。
			this.scheduleOnce(this.afterWinAction5(winIndex,lineIndex), 3.1);
		};
	},
	afterWinAction5 : function(winIndex,lineIndex) { 
		var _this = mainScene_this;
		return function() {
			cc.log("中奖分数",winScore.toString());
			_this._zhongZhiLayer.setLocalZOrder(-1);
			cc.log(winIndex.toString(),lineIndex.toString());
			for ( var iii in lineIndex) {
				cc.log("afterWinAction5",lineIndex[iii],iii);
				if (iii > 8) {
					continue;
				};
				mainScene_this.linelayer.judgementWhichOneLineDisplay(lineIndex[iii], true, 0);
			};
			for ( var iiii in mainScene_this.elementArray) {
				mainScene_this.elementArray[iiii].stopchildAction(mainScene_this.eleZorder[iiii],nameArr[iiii]);
			};
			//出现小玛丽的情况
			if (bounceNumber!=0) {
				cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/Dragon_feichu.plist");
				mainScene_this.linelayer.setDisplayLinesAndLight(0);
				cc.audioEngine.playEffect(Effect_res.laohuji_feilong);
				var dragon = cc.Sprite.createWithSpriteFrameName("Dragon_00.png");
				dragon.x = cc.winSize.width/2;
				dragon.y = cc.winSize.height/2;
				mainScene_this.addChild(dragon, 100);
				var dra = Producer.ProduceFrameAnimation("Dragon_", 10, 0, 0.2);
				dragon.runAction(cc.sequence(
						dra,
						cc.callFunc(function() {
							dragon.removeFromParent(true);
							cc.director.runScene(new SlotMachineScene());
						}, this)

				));
				return;
			};

			/**获奖后把遮照层显示出来*/
			mainScene_this.zhezhao_layer.setVisible(true);
			mainScene_this.zhezhao_layer.setLocalZOrder(100);
			zuZhiBack = true;
			//出现全盘奖的情况
			if (mainScene_this.allEqual != 10 ) {
				cc.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<",mainScene_this.allEqual);
				var parame = {icon : mainScene_this.allEqualData.icon,index : mainScene_this.allEqualData.index,beishu : whichScene[BetScoreIndex]*9};
				choujiiangWinScore = chouJiangPeiZhi[ mainScene_this.allEqualData.icon][mainScene_this.allEqualData.index]*(whichScene[BetScoreIndex]*9);
				var jiangLayer = new chouJiangLayer(parame);
				mainScene_this.addChild(jiangLayer,200,112);
				isAuto = false;
				return;
			}
			
					
					if (isAuto) {
//						cc.log("~~~~~~~~~~~~~~~~~~~~发送收分afterWinAction5");
//						gameSever.sendMessage(MDM_GF_GAME,SUB_C_SCORE,{},GAMENAME);
						mainScene_this.scheduleOnce(function() {
							if (isAuto) {	
								gameSever.sendMessage(MDM_GF_GAME,SUB_C_SCORE,{},GAMENAME);
								mainScene_this.AutoDefen(mainScene_this);
								mainScene_this.scheduleOnce(function() {
									mainScene_this.AutoKaishi(mainScene_this);
								},0.5);
								
							};
						}, 1.0);
					}
		};
	},



	/** 初始化场景*/
	initScene : function() {
		var size = cc.winSize;
	    var _this = this;
		cc.log("+++++++++++++++++++++++++++++++4mainscene");	
		var Widjet = ccs.load("res/shz/MainGameScene/MainScene.json");
		var rootNode = Widjet.node;
		cc.log("+++++++++++++++++++++++++++++++5mainscene");	
		_this.addChild(rootNode, 15, 1);
		_this.bgImage =rootNode.getChildByName("First_bg");
		_this.start_button = ccui.helper.seekWidgetByName(rootNode, "First_kaishiBtn");
		_this.start_button.addClickEventListener(function() {
			// 点击开始按钮时，保证押线不显示
			if(!slocal.getItem(firstKaishi) || slocal.getItem(firstKaishi) == "false"){
				slocal.setItem(firstKaishi,"true");
				mainScene_this.clipNode.setVisible(false);
			}
			_this.linelayer.setDisplayLinesAndLight(0);
			if(_this.starButtonState == 0){
				_this.AutoKaishi(this);
			}else if (_this.starButtonState == 1) {//即将停止时点击停止按钮会有问题（有的停止了，有的还没停止）//设置个属性，开始停止以后，再点击停止无效
				_this.AutoTingzhi();
			}else if (_this.starButtonState == 2) {
				_this.AutoDefen(this);
			} 

		});
		_this._Auto_button = ccui.helper.seekWidgetByName(rootNode, "First_zidongBtn");
		_this._Auto_button.addClickEventListener(_this.AutoButtonCallBack);
		_this.linelayer = new AddLinesLayer(size,0,0);
		_this.addChild(_this.linelayer, 15);
		
		// 水浒传背景图片
		var shuihu_bg = rootNode.getChildByName("First_shuihuzhuan");//20
		shuihu_bg.setVisible(false);
//		var shuihu_bg_action = Producer.ProduceFrameAnimation("First_shuihuzhuan_", 10, 0, 0.1);
//		shuihu_bg.runAction(cc.repeatForever(shuihu_bg_action));
		
		var ych_texiao = new cc.ParticleSystem("res/shz/GameHall/yhc.plist");
		ych_texiao.x = shuihu_bg.x,
		ych_texiao.y = shuihu_bg.y-40;
		rootNode.addChild(ych_texiao,1,111);
		
		var faGuang = cc.Sprite("res/shz/GameHall/guang.png");
		faGuang.x = shuihu_bg.x;
		faGuang.y = shuihu_bg.y-43;
		rootNode.addChild(faGuang,1,112);
		
		var action1 = cc.fadeOut(3.0);
		var action1Back = action1.reverse();
		var delay = cc.delayTime(1);

		faGuang.runAction(cc.sequence(action1, delay, action1Back).repeatForever());
		
		var shuiHuZhuan_biaoti = cc.Sprite("res/shz/GameHall/biaoti.png");
		
		shuiHuZhuan_biaoti.x = shuihu_bg.x;
		shuiHuZhuan_biaoti.y = shuihu_bg.y-43;
		rootNode.addChild(shuiHuZhuan_biaoti,1,113);
		
		
		
//		// 显示压线个数（文本）
//		var bet_line = rootNode.getChildByName("bet_line");//20
//		bet_line.setString(NumberOfLines);
		/**
		// 压线减按钮
		_this.MinusBetLine_button = rootNode.getChildByName("MinusBetLine_button");//20
		_this.MinusBetLine_button.addClickEventListener(function() {
			if (NumberOfLines == 1) {
				NumberOfLines = 9;
			}else{
				NumberOfLines--;
			}
			bet_line.setString(NumberOfLines.toString());	
			all_score.setString(((NumberOfLines)*(whichScene[BetScoreIndex])).toString());
			_this.linelayer.setDisplayLinesAndLight(NumberOfLines);
		});
		// 压线增按钮
		_this.PlusBetLine_button = rootNode.getChildByName("PlusBetLine_button");//20
		_this.PlusBetLine_button.addClickEventListener(function() {
			if (NumberOfLines == 9) {
				NumberOfLines = 1;
			} else {
				NumberOfLines++;
			}
			bet_line.setString(NumberOfLines.toString());	
			all_score.setString(((NumberOfLines)*(whichScene[BetScoreIndex])).toString());
			_this.linelayer.setDisplayLinesAndLight(NumberOfLines);
		});
		 */
//		// 显示压分
		var all_score = rootNode.getChildByName("First_allbetscore");//20
		_this._all_score = all_score;
		all_score.setString(_this._betscore.toString());
		
		var bet_score = rootNode.getChildByName("First_betscore");//20
		_this._bet_score = bet_score;
		bet_score.setString(whichScene[BetScoreIndex].toString())

		// 压分减按钮
		_this.MinusBetScore_button = rootNode.getChildByName("First_jianzhuBtn");//20
		_this.MinusBetScore_button.addClickEventListener(function() {
			mainScene_this.yinCangXuanXiangKuang();//当左上角的选项框出现时，点击其它按钮时，把它隐藏起来
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			if (BetScoreIndex>0) {
				BetScoreIndex--;
			} else {
				BetScoreIndex = 9;
			}
			bet_score.setString(whichScene[BetScoreIndex].toString());
			all_score.setString(((NumberOfLines)*(whichScene[BetScoreIndex])).toString());
		});

		// 压分增按钮
		_this.PlusBetScore_button = rootNode.getChildByName("First_jiazhuBtn");//20
		_this.PlusBetScore_button.addClickEventListener(function() {
			mainScene_this.yinCangXuanXiangKuang();//当左上角的选项框出现时，点击其它按钮时，把它隐藏起来
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			if (BetScoreIndex<9) {
				BetScoreIndex++;
			} else {
				BetScoreIndex = 0;
			}
			bet_score.setString(whichScene[BetScoreIndex].toString());
			all_score.setString(((NumberOfLines)*(whichScene[BetScoreIndex])).toString());
		});

//		// 执行模糊转动的动作
		cc.log("+++++++++++++++++++++++++++++++7mainscene");	
		_this._Mixlayer = new MixupCircleLayer();
		cc.log("+++++++++++++++++++++++++++++++8mainscene");	
		_this.addChild(_this._Mixlayer, 0);
		//创建15个主要的精灵贴图
		_this.eleZorder = [14,13,12,11,10,9,8,7,6,5,4,3,2,1,0];
		
		for (var i = 0; i < 15; i++) {
			// 这里产生的精灵是继承自Node，在其上加了一个精灵，所以后面对其操作时，需要分清楚是对它本身操作，还是对其子节点操作
			var data = {
					name : nameArr[i],
					plaxeY : 0,
					Zorder : _this.eleZorder[i],
					xiaBiao : i,
			};
			var element = MySprite.create(data);
			element.attr({
				x :90 + Math.floor(i / 3) * 195,
				y : 390 - (i % 3)*142,
				anchorX: 0,
				anchorY: 0
			});
			element.setPlace(390 - (i % 3)*142);
			element.setVisible(true);
			//cc.pool
			_this.elementArray[i] = element;
			_this.addChild(element,_this.eleZorder[i],i);
		}
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/laoHuJiTeXiao.plist");
		if(!slocal.getItem(firstKaishi) || slocal.getItem(firstKaishi) == "false"){
			
			var  winSprite	= cc.Sprite.createWithSpriteFrameName("kaishikuang_d.png");
			var winSize		=   winSprite.getContentSize();
//			//光效
			var lightSprite	= cc.Sprite.createWithSpriteFrameName("zhegai2_d.png");
			lightSprite.setPosition(cc.p(0, 0));
			//裁剪节点
			mainScene_this.clipNode	= cc.ClippingNode();
			mainScene_this.clipNode.setPosition(cc.p(mainScene_this.start_button.x, mainScene_this.start_button.y));
			rootNode.addChild(mainScene_this.clipNode);
			mainScene_this.clipNode.alphaThreshold	= 0.05;
			mainScene_this.clipNode.setContentSize(winSize);
			mainScene_this.clipNode.stencil	=  winSprite;
			mainScene_this.clipNode.addChild( winSprite);
			mainScene_this.clipNode.addChild(lightSprite);
			mainScene_this.clipNode.setScale(1);
			var moveAct	= cc.rotateBy(4, 360);
			lightSprite.runAction(cc.repeatForever(moveAct));
		}else {
			slocal.setItem(firstKaishi , "true");
		}

		
		
		cc.log("+++++++++++++++++++++++++++++++9mainscene");	
	},
	/**自动开始游戏的回调函数*/
	AutoButtonCallBack : function() {
		if (mainScene_this._isKongxian) {
			
			if (!isAuto) {
				cc.log("开始自动游戏");
				mainScene_this._Auto_button.loadTextures("First_shoudong_up.png", "First_shoudong_down.png", "First_shoudong_dis.png", ccui.Widget.PLIST_TEXTURE);
				mainScene_this.AutoKaishi(this);
				mainScene_this.start_button.setBright(false);
				mainScene_this.start_button.setTouchEnabled(false);
			}else if (isAuto) {
				cc.log("自动结束，开始手动====");
				isAuto = false;
				mainScene_this._Auto_button.loadTextures("First_zidong_up.png", "First_zidong_down.png", "First_zidong_dis.png", ccui.Widget.PLIST_TEXTURE);
				mainScene_this.start_button.setBright(true);
				mainScene_this.start_button.setTouchEnabled(true);
			};
		}else {
			if (!isAuto) {
				mainScene_this._Auto_button.loadTextures("First_shoudong_up.png", "First_shoudong_down.png", "First_shoudong_dis.png", ccui.Widget.PLIST_TEXTURE);
				isAuto = true;
				mainScene_this.start_button.setBright(false);
				mainScene_this.start_button.setTouchEnabled(false);
			}else if (isAuto) {

				mainScene_this._Auto_button.loadTextures("First_zidong_up.png", "First_zidong_down.png", "First_zidong_dis.png", ccui.Widget.PLIST_TEXTURE);
				isAuto = false;
				cc.log("自动结束，开始手动++++++1");
				mainScene_this.start_button.setBright(true);
				mainScene_this.start_button.setTouchEnabled(true);
			};
}
		
	},
	JudgeUSER_lUserScoreWithallBetScore : function() {
		var _this = this;
		var allBetScore = (NumberOfLines*(whichScene[BetScoreIndex]));
		cc.log("++++++++++++++++++USER_lUserScore",USER_lUserScore);
		if (USER_lUserScore<allBetScore) {
			if (BetScoreIndex>0) {
				for (var betindex = BetScoreIndex-1; betindex >= 0; betindex--) {
					allBetScore = (NumberOfLines*(whichScene[betindex]));
					if (USER_lUserScore>=allBetScore) {
						BetScoreIndex = betindex;
						_this._bet_score.setString(whichScene[BetScoreIndex].toString());
						_this._all_score.setString(((NumberOfLines)*(whichScene[BetScoreIndex])).toString());
						
						return allBetScore;
					};
				};
			};
			allBetScore = (NumberOfLines*(whichScene[BetScoreIndex]));
			var number = USER_lUserScore + USER_lUserInsure;
			cc.log("当前金额：："+USER_lUserScore+"银行金额：："+USER_lUserInsure);
			if(number>2000){
				isAuto = false;
				var xinxi = {Describe : USER_lUserInsure,errorCode : 6,isBack : false};//弹出充值框
				var tishi = TiShiKuangZiDingYi.create(xinxi);
				cc.director.getRunningScene().addChild(tishi,1000);
			}else{
				isAuto = false;
				var data = {dwUserID : USER_dwUserID ,szMachineID : USER_zhangHao , szUserkey:""};
				_this.start_button.setTouchEnabled(false);
				gameSever.sendMessage(MDM_GF_GAME, SUB_C_GET_TAKE_GOLD,data,GAMENAME);
				
			}
		
			return 0;
		};
		return allBetScore;
	},
	/**自动开始游戏后的得分判定，*/
	AutoKaishi : function(sender) {
		mainScene_this.yinCangXuanXiangKuang();//当左上角的选项框出现时，点击其它按钮时，把它隐藏起来
		var _this = this;
		cc.log("@@@allBetScore1",(NumberOfLines*(whichScene[BetScoreIndex])));
		var allBetScore = _this.JudgeUSER_lUserScoreWithallBetScore();
		cc.log("@@@allBetScore2",allBetScore);
		if (allBetScore == 0) {
			cc.log("1@@@allBetScore"+allBetScore);
			return;
		};
		mainScene_this._exitTime = 0;
		mainScene_this._isKongxian = false;
		cc.audioEngine.playEffect(Effect_res.zhuanDong);
		if (sender.getDescription() === "Button") {
			var name = sender.getName();
			if (name === "First_kaishiBtn") {
			} else if(name === "First_zidongBtn"){
				mainScene_this.start_button.setBright(false);
				mainScene_this.start_button.setTouchEnabled(false);
				isAuto = true;
				mainScene_this._Auto_button.loadTextures("First_shoudong_up.png", "First_shoudong_down.png", "First_shoudong_dis.png", ccui.Widget.PLIST_TEXTURE);
			}
		}else if (sender.getDescription() === "MainGameScene") {
			mainScene_this.start_button.setBright(false);
			mainScene_this.start_button.setTouchEnabled(false);
        };	
        USER_lUserScore -=allBetScore;
        YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
        mainScene_this.linelayer.setDisplayLinesAndLight(0);
        mainScene_this.start_button.setBright(false);
        mainScene_this.start_button.setTouchEnabled(false);
        mainScene_this._Auto_button.setBright(false);
        mainScene_this._Auto_button.setTouchEnabled(false);
        mainScene_this._success = false;
		YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
		//点击开始按钮后，把押线，压分，比倍，道具等按钮设置为不可点击状态
		mainScene_this.setDisableFunctionButton(false,false);
		//从服务器获取数据，每个方格所要显示的贴图
		cc.log("______________________USER_lUserScore",USER_lUserScore);
		mainScene_this.getNameofSpriteFromServer();
		mainScene_this.getscore = false;
		if(mainScene_this._isPause){
			cc.log("开始转动模糊动画@@@@@@@@@@@@@@@@@@@@");
			mainScene_this._Mixlayer.setResume();
			mainScene_this._isPause = false;
			for (var nuu = 0; nuu < 15; nuu++) {
				mainScene_this.elementArray[nuu].setVisible(false);
			}
			mainScene_this.schedule(mainScene_this.jishiStop, 0.1);
		}
		
		
	},
	AutoDefen : function(sender) {
		mainScene_this.yinCangXuanXiangKuang();//当左上角的选项框出现时，点击其它按钮时，把它隐藏起来
		if (mainScene_this.allEqual != 10 ) {//如果是全盘奖把全盘奖的下元宝的特效去掉
			cc.audioEngine.stopAllEffects();
			cc.audioEngine.stopMusic(true);
			cc.log("mainScene_this.allEqual",mainScene_this.allEqual);
			if(mainScene_this._isybtx){
				mainScene_this._isybtx = false;
				if(mainScene_this.getChildByTag(111)){
					mainScene_this.removeChildByTag(111, true);
				}
			}
		};
		if (sender &&  sender.getDescription() != "MainGameScene") {
			cc.log("~~~~~~~~~~~~~~~~~~~~发送收分AutoDefen");
			gameSever.sendMessage(MDM_GF_GAME,SUB_C_SCORE,{},GAMENAME);
			};	
		cc.audioEngine.stopAllEffects();
		cc.audioEngine.playEffect(Effect_res.shouFen);
		mainScene_this.linelayer.setDisplayLinesAndLight(0);

		mainScene_this._Auto_button.setBright(true);
		mainScene_this._Auto_button.setTouchEnabled(true);
		if (sender && sender.getDescription() === "Button") {
			cc.log("自动结束，开始手动");
			isAuto = false;
			mainScene_this._Auto_button.loadTextures("First_zidong_up.png", "First_zidong_down.png", "First_zidong_dis.png", ccui.Widget.PLIST_TEXTURE);

			mainScene_this.start_button.setBright(true);
			mainScene_this.start_button.setTouchEnabled(true);
			cc.log("点击了收分");
		}

		mainScene_this._success = false;
		mainScene_this.nn = 0;//中奖后每条中奖线上的贴图依次执行闪光动作时使用，每次点击得分按钮后再次把他置为零
		//上部状态栏上的按钮可以被点击
		//_this.Toplayer.setIsButtonCanTouch(255, true);
		mainScene_this.setDisableFunctionButton(true,true);//当点击得分按钮后，把所有按钮的状态还原
		mainScene_this.getscore = false;//中奖后是否立即点击得分按钮，默认为false
		//_this.Toplayer.setTotalScore(winScore);// 点击得分按钮后，把中奖分数加到总分中
		
		YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
		//当点击得分按钮后，把得分的倍率和，得分重置为零
		mainScene_this.winMultiple = 0;
		mainScene_this.jiangQuanBei = 0;
		winScore = 0;
		choujiiangWinScore = 0;
		mainScene_this.bgImage.stopAllActions();
		for ( var i in mainScene_this.elementArray) {
			mainScene_this.elementArray[i].stopchildAction(mainScene_this.eleZorder[i],nameArr[i]);
			mainScene_this._borderLayer.stopAllChildAction();
		//	mainScene_this.elementArray[i].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(nameArr[i]));
		}
		mainScene_this.start_button.loadTextures("First_kaishi_up.png", "First_kaishi_down.png", "First_kaishi_dis.png", ccui.Widget.PLIST_TEXTURE);
		mainScene_this.starButtonState = 0;
		mainScene_this.zhezhao_layer.setVisible(false);
		mainScene_this.zhezhao_layer.setLocalZOrder(0);
		zuZhiBack  = false;
	},
	AutoTingzhi : function() {
		
		mainScene_this.yinCangXuanXiangKuang();//当左上角的选项框出现时，点击其它按钮时，把它隐藏起来
		if(mainScene_this._stoped){//解决了转动已经开始停止，点击了停止按钮会出现bug的问题
			return;
		};
		mainScene_this._Mix_n = 0;
		cc.audioEngine.stopAllEffects();
		cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
		mainScene_this._Mixlayer.setPause();
		mainScene_this._isPause = true;
		mainScene_this.unschedule(mainScene_this.jishiStop);
		mainScene_this.unschedule(mainScene_this.dayin);
		mainScene_this._success = false;
		for ( var i3 in mainScene_this.elementArray) {
			mainScene_this.elementArray[i3].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(nameArr[i3]));
			mainScene_this.elementArray[i3].setType(getSpriteTypeForName(nameArr[i3]));
			mainScene_this.elementArray[i3].setImageName(nameArr[i3]);
			mainScene_this.elementArray[i3].spriteRunBufferAction();
		}
		mainScene_this.getScoreFromResult();//判定得分情况，根据得分情况，改变按钮的状态
		
	},
	addTopNode : function() {
		var size = cc.winSize;
		mainScene_this = this;
		var fileName = "res/shz/MainGameScene/TopNode.json";
		var rootNode =topNode.creatSceneTopNode(fileName,mainScene_this);
		rootNode.x = size.width/2;
		rootNode.y = size.height/2;
		mainScene_this.addChild(rootNode, 91, 60);
		cc.log("###########$$$$$$");
		cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/zaiXianFaGuang.plist");
		var First_chongzhiBtn = rootNode.getChildByName("First_chongzhiBtn");
		var yuanDi =cc.Sprite.createWithSpriteFrameName("yuan.png")
		yuanDi.x = First_chongzhiBtn.x-90;
		yuanDi.y = First_chongzhiBtn.y+3;
	   rootNode.addChild(yuanDi,2,196);
	   var shanGuang = cc.Sprite.createWithSpriteFrameName("shanguang.png");
	   shanGuang.x = First_chongzhiBtn.x-90;
	   shanGuang.y = First_chongzhiBtn.y+3;
	   rootNode.addChild(shanGuang,2,198);
	   shanGuang.setVisible(false);
	   
		
		var zxlj_btn = new ccui.Button("baoxiang-1.png","baoxiang-1.png","baoxiang-2.png",ccui.Widget.PLIST_TEXTURE);
		zxlj_btn.x =  First_chongzhiBtn.x-90;
		zxlj_btn.y =  First_chongzhiBtn.y+3;
		zxlj_btn.addClickEventListener(function() {
			if(mainScene_this.zaiXianLingQu_time  == 0){
				cc.audioEngine.playEffect(Effect_res.zaiXianLingJiang);
				gameSever.sendMessage(MDM_GF_GAME,SUB_C_QUERY_ONLINE_REWARD_TIME,{},GAMENAME);
			}else {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				zaiXianLingJiang.createZaiXianLayer(1,cc.director.getRunningScene());
			}
		});
		zxlj_btn.tag = 99;
		rootNode.addChild(zxlj_btn,10);
		
		var shijianDi = cc.Sprite.createWithSpriteFrameName("shijian.png");
		shijianDi.x = First_chongzhiBtn.x-90;
		shijianDi.y = First_chongzhiBtn.y-30+6;
		rootNode.addChild(shijianDi,10,197); 
		
		var jingE = cc.LabelBMFont("+1000","res/shz/xiaomali.fnt");
		jingE.setScale(0.3)
		jingE.x = zxlj_btn.x;
		jingE.y = zxlj_btn.y+5+3;
		rootNode.addChild(jingE,11,200);
		jingE.setVisible(false);
		
		
		var time_jishi = cc.LabelTTF("00"+":"+"00","Arial","15");
		time_jishi.setColor(cc.color.WHITE);
		time_jishi.x = zxlj_btn.x;
		time_jishi.y = zxlj_btn.y-30+3;
		rootNode.addChild(time_jishi,10,199);
		this.yingCangLiangJIang(false);
		
	},
	yingCangLiangJIang : function(isVisible){
		if(mainScene_this.getChildByTag(60)){
			var jsShiView = mainScene_this.getChildByTag(60).getChildByTag(199);
			var shijianDi = mainScene_this.getChildByTag(60).getChildByTag(197);
			var yuanDi = mainScene_this.getChildByTag(60).getChildByTag(196);
			var zxlj_btn = mainScene_this.getChildByTag(60).getChildByTag(99);

			jsShiView.setVisible(isVisible);
			shijianDi.setVisible(isVisible);
			yuanDi.setVisible(isVisible);
			zxlj_btn.setVisible(isVisible);
		}
	
	}
	,

	yinCangXuanXiangKuang : function() {
		if (topNode._isVisible) {//当左上角的选项框出现时，点击其它按钮时，把它隐藏起来
			topNode._xuanXiangBtn.loadTextures("btn_xuanxiang_1.png", "btn_xuanxiang_2.png", "btn_xuanxiang_3.png", ccui.Widget.PLIST_TEXTURE);
			topNode._xuanxiangBg.setVisible(false);
			topNode._isVisible = false;
		};
	},

	onEnter:function(){
		this._super();
		//喇叭
//		var laBaLayer = new laBaTiaoLayer(this);
//		this.addChild(laBaLayer, 100, 151);
		JiangChi.schedule(function() {
			cc.log("请求奖池");
			loginServer.sendMessage(MDM_MB_USER_SERVICE, SUB_MB_GET_REWARD_POOL,{wKindID : 203});
		}, 10.0,cc.REPEAT_FOREVER,0.1);

		if (winScore>0) {
			cc.log("~~~~~~~~~~~~~~~~~~~~发送收分ctor");
			gameSever.sendMessage(MDM_GF_GAME,SUB_C_SCORE,{},GAMENAME);
			mainScene_this.AutoDefen(mainScene_this);
		};
		var listener1 = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false,
			onTouchBegan: function (touch, event) {
			mainScene_this.yinCangXuanXiangKuang();
				return true;
			},
			onTouchMoved: function (touch, event) {
			},
			onTouchEnded: function (touch, event) {
			
			}
		});		
		cc.eventManager.addListener(listener1, this);
		
		var that = this;
		cc.eventManager.addListener({

			event: cc.EventListener.KEYBOARD,
			onKeyReleased: function(keyCode, event){
				var keyCode = keyCode.toString();
				cc.log("RRRRRRRRRRRRRRRR",keyCode);
				cc.director.getScheduler().unscheduleAllCallbacksForTarget(this);
				if (keyCode == 6 && !zuZhiBack) {			
					topNode.fanhuifun();
				};
				if (keyCode == 6 && topNode._isVisible) {
				that.yinCangXuanXiangKuang();
				};
			}
		}, that);
		if( mainScene_this.getChildByTag(60).getChildByTag(198)){
			var shanGuang = mainScene_this.getChildByTag(60).getChildByTag(198);
			if(mainScene_this.zaiXianLingQu_time == 0){
				if(shanGuang.getNumberOfRunningActions() == 0){
					shanGuang.runAction(cc.rotateBy(0.3, 90, 90).repeatForever());
				}
			}

		}
		cc.log("+++++++++++++++++++++++++++++++mainscene onEnter");
	},
	getNativeKeyName:function(keyCode) {
		var allCode = Object.getOwnPropertyNames(cc.KEY);
		var keyName = "";
		cc.log("sdfghjkl;sdfghjdfghjkxdcfvgbhnjm");
		for(var x in allCode){
			if(cc.KEY[allCode[x]] == keyCode){
				keyName = allCode[x];
				break;
			}
		}
		return keyName;
	},
	onExit:function(){
		this._super();
		RUNINGSCENE = null;
		mainScene_this.pause();
		this.linelayer.setDisplayLinesAndLight(0);
		this._borderLayer.removeFromParent(false);
		cc.eventManager.removeListeners(this, false);
		if(this.getChildByTag(92)){
			this.removeChildByTag(92);
		}
		if(this.getChildByTag(151)){
			this.removeChildByTag(151);
		}
		if(this.getChildByTag(152)){
			this.removeChildByTag(152);
		}
		if(this.getChildByTag(153)){
			this.removeChildByTag(153);
		}
        this._Mixlayer.repleaceAnimation();
		cc.log("+++++++++++++++++++++++++++++++mainscene onExit");
	},
	onEnterTransitionDidFinish : function(){
		this._super();
		cc.log("+++++++++++++++++++++++++++++++mainscene onEnterTransitionDidFinish");
		RUNINGSCENE = "MainGame";
		gameSever.sendMessage(MDM_GF_GAME,SUB_C_QUERY_ONLINE_REWARD_CONFIG,{},GAMENAME);//查询在线奖励配置结果
	},
	onExitTransitionDidStart : function(){
		this._super();
		
		cc.log("+++++++++++++++++++++++++++++++mainscene onExitTransitionDidStart");
	}
});

var MAINLAYER = null;
var MainGameScene = cc.Scene.extend({
	_time : 0,
	_daojishi : null,
	_tuichuNode : null,
	onEnter:function () {
		this._super();
		this._time = 0;
        var layer;// = new MainGameLayer();
		if (!MAINLAYER) {
			cc.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^1");
			layer  = new MainGameLayer();
			MAINLAYER = layer;
			MAINLAYER.retain();	
			//奖池
			JiangChi.setJiangChiParent(layer);
			layer.addChild(JiangChi,50,152);
		}else{
			cc.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^2");
			 layer = MAINLAYER; 
			 layer.repleaceStatus();
		};	
		MAINLAYER.resume();
		this.addChild(layer);
		//喇叭消息框
		labaXiaoxi.creatLabaLayer(layer,100,153);
		
		var tuichuNode = new cc.Sprite("res/shz/MainGameScene/tuichutishi_bg.png");
		this._tuichuNode = tuichuNode;
		tuichuNode.x = cc.winSize.width/2;
		tuichuNode.y = cc.winSize.height/2;
		this.addChild(tuichuNode, 1001);
		var daojishi = new cc.LabelBMFont("60","res/shz/MainGameScene/tuichujishi.fnt");
		this._daojishi = daojishi;
		daojishi.x= 631;
		daojishi.y = 30;
		tuichuNode.addChild(daojishi);
		tuichuNode.setVisible(false);
		
		this.schedule(this.dengDaiChaoShi, 1.0, cc.REPEAT_FOREVER,1.0);
	},
	dengDaiChaoShi : function() {
		if (mainScene_this._exitTime < 120) {
			this._tuichuNode.setVisible(false);
		}else {
			var str = (180-mainScene_this._exitTime).toString();
			this._tuichuNode.setVisible(true);
			this._daojishi.setString(str);
		};
		if (mainScene_this._exitTime == 180) {
			this.unschedule(this.dengDaiChaoShi);
			topNode.fanhuifun();
		}
		mainScene_this._exitTime++;
	},
	
	daoJiShiLingJIang : function() {
		if(!MAINLAYER){
			cc.director.getScheduler().unscheduleAllCallbacksForTarget(this);
			return;
		}
		var  time_fen;
		var time_miao;
		var jsShiView = mainScene_this.getChildByTag(60).getChildByTag(199);//计时文字

		var actionUp = cc.jumpBy(1, cc.p(0, 0), 20, 1);
		if(	mainScene_this.zaiXianLingQu_time == 0){
			var jsShiView = mainScene_this.getChildByTag(60).getChildByTag(199);//计时文字
			var shanGuang = mainScene_this.getChildByTag(60).getChildByTag(198); //闪光动画
			jsShiView.setString("点击领取");
			shanGuang.runAction(cc.rotateBy(0.3, 90, 90).repeatForever());
			shanGuang.setVisible(true);
			cc.log("++++++++++++++++++++++++");
			var parent = mainScene_this.getParent();
			parent.unschedule(parent.daoJiShiLingJIang);
			mainScene_this.zaiXianLingQu_time = 0;
			if(zaiXianLingJiang.isZaiXianLayerShow){
				for (var i = 0; i < zaiXianLingJiang.fengMiao_ary.length; i++) {
					zaiXianLingJiang.fengMiao_ary[i].setString("00");
				}

			}
			return;
		}
		for (var i = 2; i > 0; i--) {
			if(i >1){
				time_miao =mainScene_this.zaiXianLingQu_time%60;
				if(time_miao<10){
					time_miao = "0"+time_miao;
				}
			}else if( i == 1){
				time_fen =Math.floor(mainScene_this.zaiXianLingQu_time/60);
				if(time_fen<10){
					time_fen = "0"+time_fen;
				}
			}
		}
		if(zaiXianLingJiang.isZaiXianLayerShow){
			for (var i =zaiXianLingJiang.fengMiao_ary.length; i >0; i--) {

				if(i >1){
					zaiXianLingJiang.fengMiao_ary[i-1].setString(time_miao) ;
				}else if( i == 1){
					zaiXianLingJiang.fengMiao_ary[i-1].setString(time_fen) ;
				}
			}
		}
		jsShiView.setString(time_fen + ":"+time_miao);
		mainScene_this.zaiXianLingQu_time--;
	},
});












