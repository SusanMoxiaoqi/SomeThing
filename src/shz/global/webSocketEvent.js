
cc.eventManager.addCustomListener("server_game_message"+GAMENAME, function(event){
	if (event.getUserData().mainCmdId == CMD_SHZ_HEARTBEAT && event.getUserData().subCmdId == SUB_SHZ_HEARTBEAT) {

		cc.log("/game*********************************/");
		gameSever.sendMessage(CMD_SHZ_HEARTBEAT,SUB_SHZ_HEARTBEAT,{},GAMENAME);
		return;
	}else if(event.getUserData().mainCmdId == MDM_GF_FRAME && event.getUserData().subCmdId == SUB_GF_SYSTEM_MESSAGE){//接收喇叭消息
		var  data = event.getUserData().body;
		labaXiaoxi.addDataTonewsArr(data.szString);
		return;
	}else if(event.getUserData().mainCmdId == MDM_CM_SYSTEM && event.getUserData().subCmdId == SUB_CM_SYSTEM_MESSAGE){//接收系统消息
		return;
	}else if(event.getUserData().mainCmdId == MDM_GR_LOGON && event.getUserData().subCmdId == SUB_GR_LOGON_DELAY){//登录延迟
		var time = event.getUserData().body.dwDelayTime;
		SocketManager.closeServer(true, false);
		cc.director.getRunningScene().scheduleOnce(function() {
			gameSever=SocketManager.getGameServer(GAMENAME);	
		}, time)
		return;
	}else if (event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_SCENE) {	//游戏场景状态，判断是否为奖券场
		var JIANG = event.getUserData().body.bHaveLottery;
		isJiangQuan = JIANG;
		if (isJiangQuan) {
			cc.log(" 奖券场");
		};
		return;
	}else if (event.getUserData().mainCmdId == MDM_GR_LOGON && event.getUserData().subCmdId == SUB_GR_LOGON_FINISH) {	//登录游戏房间完成
		cc.log("登陆游戏房间成功后，发送上分命令");
		gameSever.sendMessage(MDM_GF_GAME,SUB_C_ADD_CREDIT_SCORE,{},GAMENAME);//上分
		return;
	}else if (event.getUserData().mainCmdId == MDM_GR_CONFIG && event.getUserData().subCmdId == SUB_GR_CONFIG_SERVER) {	
		return;
	}else if (event.getUserData().mainCmdId == MDM_GR_CONFIG && event.getUserData().subCmdId == SUB_GR_CONFIG_FINISH) {	
		return;
	}else if (event.getUserData().mainCmdId == MDM_GR_USER && event.getUserData().subCmdId == SUB_GR_USER_ENTER) {	
		return;
	}else if (event.getUserData().mainCmdId == MDM_GR_USER && event.getUserData().subCmdId == SUB_GR_USER_STATUS) {	
		return;
	}else if (event.getUserData().mainCmdId == MDM_GF_FRAME && event.getUserData().subCmdId == SUB_GF_GAME_STATUS) {	
		return;
	}else if (event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_PERSON_RESULT) {	
		return;
	}
	if (waitQuan.xianShi) {
		waitQuan.unuse("webSocketEvent43");
	} ;
	SocketManager.log(event.getUserData().body);
	if (event.getUserData().mainCmdId == MDM_GR_LOGON && event.getUserData().subCmdId == SUB_GR_LOGON_FAILURE) {	//登录游戏房间失败
		if (gameSever) {
			cc.log("销毁游戏链接");
			SocketManager.closeServer(true, false);
		};
		var data = event.getUserData().body;
		cc.log("1###data.szDescribeString",data.szDescribeString);
		var xinxi = {Describe : data.szDescribeString,errorCode : data.lResultCode,isBack : false};
		var tishi =TiShiKuang.create(xinxi);
		cc.director.getRunningScene().addChild(tishi,1000);
	}else if (event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_ADD_CREDIT_SCORE_SUCCESS) {	//上分成功
    	USER_lUserScore = event.getUserData().body.credit_score_;
    	var Data = {type : 0, array : youxi_resources};
    	if (IsGameLogin == 1) {
    		IsGameLogin = 0;
    		cc.director.runScene(new loadindScene(Data));	
    	}else if(IsGameLogin == 2){
    		IsGameLogin = 0;
    		cc.director.runScene(new MainGameScene());	
    	}	
    	return;
	}else if (event.getUserData().mainCmdId == MDM_GR_LOGON && event.getUserData().subCmdId == SUB_GR_LOGON_RECONNECT_SUCCESS) {//小玛丽重连成功
		eventdate = event.getUserData().body;
		bounceNumber = eventdate.wMarryTimes;
		if (bounceNumber>0) {
			gameSever.sendMessage(MDM_GF_GAME,SUB_C_SCENE3_START,{bonus_game_times : bounceNumber,bet_score : Slot_this.Third_betScore});
		}else{
			Slot_this.creatJieSuanJieMian();
		}
	}else if (event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_SCORE) {	//收分返回的数据
		USER_lUserScore = event.getUserData().body.credit_score_;//当前的总分
		USER_lLottery = USER_lLottery + event.getUserData().body.lLottery;//当前的奖券
		YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
		USERNODE.shoufenTexiao();//收分后的特效
		JiangQuanSp.setString(Producer.changeNumberToString(USER_lLottery));

	}else if (event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_SCENE2_RESULT) {	//比倍
		cc.log("DiceGameScene event.getUserData().mainCmdId",event.getUserData().mainCmdId,"event.getUserData().subCmdId",event.getUserData().subCmdId);
		SocketManager.log(event.getUserData());
		//cc.log("DiceGameScene event.getUserData().body",event.getUserData().body);
		var dicepoints = event.getUserData().body.dice_points;
		Dice_this._diceLResult = (dicepoints & 0xff);
		Dice_this._diceRResult = ((dicepoints >> 8) & 0xff);
		var serRes = Dice_this._diceLResult+Dice_this._diceRResult;
		if (serRes<5) {
			Dice_this._serverResult = 0;
		}else if (serRes == 5) {
			Dice_this._serverResult = 1;
		}else if (serRes>5) {
			Dice_this._serverResult = 2;
		};
		cc.log("Dice_this._diceLResult,Dice_this._diceRResult",Dice_this._diceLResult,Dice_this._diceRResult);

		Dice_this.afterGetBetResultDataFromServer();
	}else if (event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_SCENE3_RESULT) { //小玛丽
		var RollingResult = event.getUserData().body.rolling_result_icons;
		var RotateResult = event.getUserData().body.rotate_result;
		Slot_this.afterGetDataFromServer(RollingResult, RotateResult)

	}else if (event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_SCENE1_START) {		//老虎机
//		SocketManager.log(event.getUserData());
		cc.log("mainscene+++++++ event.getUserData().body",event.getUserData().body.result_icons);
		var Lresult_icons = event.getUserData().body.result_icons;
		var LZresult_icons = Producer.TransformationArrayFromServerToClient(Lresult_icons);
		for (var i1 = 0; i1 < 15; i1++) {
			var randNum=LZresult_icons[i1];
			nameArr[i1] = Element_up[randNum];
			mainScene_this.nameDownArr[i1] = Element_down[randNum];			
		}

		if (mainScene_this._success == false) {
			mainScene_this._success = true;	
			if (!isAuto) {
				mainScene_this.start_button.setBright(true);
				mainScene_this.start_button.setTouchEnabled(true);
				mainScene_this._Auto_button.setBright(true);
				mainScene_this._Auto_button.setTouchEnabled(true);
			}else{
				mainScene_this._Auto_button.setBright(true);
				mainScene_this._Auto_button.setTouchEnabled(true);
			}

		};
	}else if (event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_OVERALL_REWARD) { //全盘奖时的抽奖数据
		mainScene_this.allEqualData = event.getUserData().body;
//		var icon =  event.getUserData().body.icon;
//		var index = event.getUserData().body.index;
	}else if(event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_TAKE_GOLD_SUCCESS){//救济金领取成功
		var data = event.getUserData().body;
		if(data){
			USER_lUserScore = data.lTakeGold;
			YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
			var number;
			if(data.dwTotalCount != data.dwTakeCount){
				number = data.dwTotalCount - data.dwTakeCount;
			}else{
				number = 0;
			}
			mainScene_this.start_button.setTouchEnabled(true);
			var xinxi = {Describe : number,errorCode : 7,isBack : false};//弹出充值框
			var tishi = TiShiKuangZiDingYi.create(xinxi);
			cc.director.getRunningScene().addChild(tishi,1000);
		}

	}else if(event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_TAKE_GOLD_FAILURE){//救济金领取失败
		var data = event.getUserData().body;
		if(data){
			var XinXi ;
			if(data.lResultCode == 2){
				XinXi = {Describe : "好汉银两不足，请充值！",errorCode : 201,isBack : false};
			}else{
				XinXi = {Describe : data.szDescribeString,errorCode : 201,isBack : false};
			}
			mainScene_this.start_button.setTouchEnabled(true);

			var tishi = TiShiKuangZiDingYi.create(XinXi);
			cc.director.getRunningScene().addChild(tishi,1000);
		}


	}else if(event.getUserData().mainCmdId == MDM_GR_INSURE && event.getUserData().subCmdId == SUB_GR_USER_INSURE_SUCCESS){//游戏内取款成功
		var data = event.getUserData().body;
		if(data){
			if(TiShiKuang_ZDY.caoZuoFanKui){
				TiShiKuang_ZDY.caoZuoFanKui.setString(data.szDescribeString);
			}
			if(TiShiKuang_ZDY.Btn_three){
				TiShiKuang_ZDY.Btn_three.setTouchEnabled(true);
			}
			USER_lUserScore += data.lVariationScore;
			USER_lUserInsure=data.lUserInsure;
			YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
		}
	}else if(event.getUserData().mainCmdId == MDM_GR_INSURE && event.getUserData().subCmdId == SUB_GR_USER_INSURE_FAILURE){//游戏内取款失败
		var data = event.getUserData().body;
		if(TiShiKuang_ZDY.Btn_three){
			TiShiKuang_ZDY.Btn_three.setTouchEnabled(true);
		}

		if(TiShiKuang_ZDY.caoZuoFanKui){
			TiShiKuang_ZDY.caoZuoFanKui.setString(data.szDescribeString);
		}
	}else if(event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_RESULT_ONLINE_REWARD_CONFIG){	//在线奖励配置结果
		var data = event.getUserData().body;
		if(RUNINGSCENE == "MainGame"){
			cc.log("在线领奖：：bEnable:"+data.bEnable+"dwTotalCount"+data.dwTotalCount+"dwGetCount"+data.dwGetCount+"dwNeedTime"+data.dwNeedTime);
		}
		if(data){
			if(data.dwGetCount <7){
				if(RUNINGSCENE == "MainGame"){
					mainScene_this.yingCangLiangJIang(true);
				}
			}else{
				return;
			}
			if(zaiXianLingJiang){
				zaiXianLingJiang.lingJiangCiShu = data.dwGetCount;
				zaiXianLingJiang.keLingJiangZongShu = data.dwTotalCount;
				if(zaiXianLingJiang.tableView){
					zaiXianLingJiang.tableView.reloadData();
				}
			}
			if(RUNINGSCENE == "MainGame"){
				mainScene_this.zaiXianLingQu_time_ary = data.dwRewardInfo;
				mainScene_this.zaiXianLingQu_time = data.dwNeedTime;			
				var parent = mainScene_this.getParent();
				parent.schedule(parent.daoJiShiLingJIang, 1.0, cc.REPEAT_FOREVER);
			}
		}

	}else if(event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_RESULT_ONLINE_REWARD_TIME){		//奖励剩余时间
		var data = event.getUserData().body;

		if(data.dwLeftTime == 0){
			gameSever.sendMessage(MDM_GF_GAME,SUB_C_GET_ONLINE_REWARD,{},GAMENAME);
		}else if(200>data.dwLeftTime > 0){
//			mainScene_this.zaiXianLingQu_time = data.dwLeftTime;
//			var parent = mainScene_this.getParent();
//			parent.schedule(parent.daoJiShiLingJIang, 1.0, cc.REPEAT_FOREVER);
		}else{
			gameSever.sendMessage(MDM_GF_GAME,SUB_C_QUERY_ONLINE_REWARD_CONFIG,{},GAMENAME);
		}

	}else if(event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_TAKE_ONLINE_REWARD){//在线奖励结果
		var data = event.getUserData().body;
		if(data){
			if(data.lResultCode == 0){
				var jingE = mainScene_this.getChildByTag(60).getChildByTag(200);//字体分数
				var jsShiView = mainScene_this.getChildByTag(60).getChildByTag(199);//计时文字
				var shanGuang = mainScene_this.getChildByTag(60).getChildByTag(198); //闪光动画
				var zxlj_btn = mainScene_this.getChildByTag(60).getChildByTag(99);
				if(RUNINGSCENE == "MainGame"){
					if(mainScene_this.zaiXianLingQu_time_ary){
						mainScene_this.zaiXianLingQu_time = mainScene_this.zaiXianLingQu_time_ary[data.dwHaveTakeCounts][1];
					}

					var parent = mainScene_this.getParent();
					parent.schedule(parent.daoJiShiLingJIang, 1.0, cc.REPEAT_FOREVER);
					var number = 0  ;
					jingE.setString("+"+data.lRewardScore);
					jingE.setVisible(true);
					zxlj_btn.setBright(false);
					zxlj_btn.setTouchEnabled(false);
					var action = cc.Sequence(//领奖时宝箱动作
							cc.scaleBy(0.01,1.2),
							cc.MoveTo(1.5,cc.p(jingE.x, jingE.y+70)),
							cc.callFunc(function (nodeExecutingAction, value) {
								jingE.setVisible(false);
								jingE.y -=70;
								jingE.setScale(0.3)
								shanGuang.stopAllActions();
								shanGuang.setVisible(false);
								zxlj_btn.setBright(true);
								zxlj_btn.setTouchEnabled(true);
								if(data.dwHaveTakeCounts == 7){
									mainScene_this.yingCangLiangJIang(false);
								}
							}, this));
					jingE.runAction(action);
				}
				zaiXianLingJiang.lingJiangCiShu = data.dwHaveTakeCounts;
				USER_lUserScore += data.lRewardScore;
				cc.log("USER_lUserScore::"+USER_lUserScore+"data.lRewardScore::"+data.lRewardScore+"number::"+number);
				YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
				if(zaiXianLingJiang){
					if(zaiXianLingJiang.tableView && zaiXianLingJiang.tableView.getDescription() ){
						zaiXianLingJiang.tableView.reloadData();
					}
				}
				var XinXi = {Describe : "恭喜领奖成功！",errorCode : 0,isBack : false};
				var tishi = TiShiKuang.create(XinXi);
				cc.director.getRunningScene().addChild(tishi,1000);

			}else if(data.wResult == 1){
				var XinXi = {Describe : "您今日以领取完毕！请明天继续。",errorCode : 0,isBack : false};
				var tishi = TiShiKuang.create(XinXi);
				cc.director.getRunningScene().addChild(tishi,1000);
				mainScene_this.yingCangLiangJIang(false);
			}else if(data.wResult == 2){

			}
		}


	}else if(event.getUserData().mainCmdId == MDM_GF_GAME && event.getUserData().subCmdId == SUB_S_RESET_ONLINE_REWARD){
		gameSever.sendMessage(MDM_GF_GAME,SUB_C_QUERY_ONLINE_REWARD_CONFIG,{},GAMENAME);
	}
});

cc.eventManager.addCustomListener("server_game_open"+GAMENAME, function(event){
	console.log("MMMMMMMMMMMMMMMMserver_game_open");
	if (IsGameLogin ==1 || IsGameLogin ==2) {
		AutomaticLink.AutomaticLinkSuccess = true;
		var hash = md5( USER_szPassword );
		gameSever.sendMessage(MDM_GR_LOGON,SUB_GR_LOGON_MOBILE,
				{wGameID:wServerID,dwProcessVersion:0,cbDeviceType:0,wBehaviorFlags:4096,wPageTableCount:1,dwUserID:USER_dwUserID,szPassword:hash,szMachineID:MachineID},false,false);
		console.log("MMMMMMMMMMMMMMMMjjjjserver_game_open1");
	};
});

cc.eventManager.addCustomListener("server_game_close"+GAMENAME, function(event){	
	if (gameSever.isMyClose || RUNINGSCENE == "SlotMachine") {//主动关闭连接不作处理，因为他在关闭的地方已经做过处理了。在小玛丽场景需要自动重连。
		return;
	}
	if (waitQuan.xianShi) {
		waitQuan.unuse();
	};
	IsGameLogin = 0;

	if (sys.os == sys.OS_ANDROID) {
		if (RUNINGSCENE == "MainGame") {
			var parent = mainScene_this.getParent();
			parent.unschedule(parent.daoJiShiLingJIang);
			if (mainScene_this._isPause == false) {
				mainScene_this._Mixlayer.setPause();
				mainScene_this._isPause = true;
			};
		};
		AutomaticLink.startUpAutomaticLink(gameSever,10,2010);
	}
	console.log("MMMMMMMMMMMMMMMMserver_game_close");
});
cc.eventManager.addCustomListener("server_game_error"+GAMENAME, function(event){	
	IsGameLogin = 0;
	console.log("MMMMMMMMMMMMMMMMserver_game_error");
//	var XinXi = {Describe : "您的网络不稳定!!!!!!，请重新登录！",errorCode : 1006,isBack : true};//无法登录游戏
//	var tishi = TiShiKuang.create(XinXi);
//	cc.director.getRunningScene().addChild(tishi,1000);

});


cc.eventManager.addCustomListener("server_login_close", function(event){	
	console.log("MMMMMMMMMMMMMMMMserver_login_close");

	if (IsDengLu) {//若登录不成功尝试其他服务器,首先判断网络连接状况 
		if (waitQuan.xianShi) {
			waitQuan.unuse();
		} ;
		SocketManager.closeServer(false, false);
		var type = 0;
		//得到网络环境
		if (sys.os == sys.OS_IOS) {
			type = jsb.reflection.callStaticMethod("netWork", "getCurrentNetworkStatus");
		}else if(sys.os == sys.OS_ANDROID){
			type = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getNetworkIsWifi", "()I");
		};
		//没有网络，
		if (type == 0) {
			IsDengLu = false;
			var xinxi = {Describe : "无法链接网络，请检查移动网络\n是否链接！",errorCode : 2006,isBack : false};//		
			cc.director.runScene(new loginScene(xinxi));
			return;
		};


		if(serVerIp == beiYongSer){
			IsDengLu = false;
			var xinxi = {Describe : "您的网络不稳定，请重试！\n若仍无法登陆，请查看公告或联系客服！",errorCode : 2000,isBack : false};//无法登录大厅,自定义		
			cc.director.runScene(new loginScene(xinxi));
			return;
		};
		for (var i = 0; i < serverList.length; i++) {
			cc.log("CCCCCCCCCCCCCCCCCCCC",serVerIp.ipconfig,serverList[i].ipconfig);		
			if (serVerIp == serverList[i]) {
				serverList.splice(i, 1);
				break;
			};
		};
		var length = serverList.length;
		cc.log("UUUUUUUUUUU",length);
		if (length>0) {
			var num = Math.floor(Math.random()*(length));
			if( serverList[num].ipconfig ){
				serVerIp = serverList[num];
				LOGINURL = "ws://" + serverList[num].ipconfig + ":6515/login";
				GAMEURL = "ws://" + serverList[num].ipconfig + ":6515/game";
			};
		}else{
			LOGINURL = "ws://" + beiYongSer + ":6515/login";
			GAMEURL = "ws://" + beiYongSer + ":6515/game";
			serVerIp = beiYongSer;
		};
		cc.log("UUUUUUUUUUU",serVerIp);
		Producer.creatLoginSever();
		if (!waitQuan.xianShi) {
			cc.director.getRunningScene().addChild(waitQuan,1000);
			waitQuan.reuse(30);
		}
	};
});

cc.eventManager.addCustomListener("server_login_error", function(event){	
	console.log("MMMMMMMMMMMMMMMMserver_login_error");



});


cc.eventManager.addCustomListener("server_login_open", function(event){
	console.log("MMMMMMMMMMMMMMMMserver_login_open");
	if (IsDengLu) {//登录完成后把IsDengLu改为false

		var hash = md5( USER_szPassword);
		var Accounts = SDKHelper.thirdSdkLogin?md5(USER_zhangHao) : USER_zhangHao;
		var thirdPartyID = SDKHelper.thirdSdkLogin?USER_zhangHao : "0";
		loginServer.sendMessage( MDM_MB_LOGON,SUB_MB_FAST_REGISTER_ACCOUNTS,{

			wModuleID:203,
			dwPlazaVersion:1.0,
			szMachineID:MachineID,
			cbDeviceType:1,
			szLogonPass:hash,
			szInsurePass:hash,
			wFaceID:"",
			cbGender:"",
			cbRegType:sheBeiLeiXing,
			szAccounts:Accounts,
			szNickName:SDKHelper.prefix,
			szSpreader:QUDAOHAO,
			szPassPortID:0,
			szCompellation:"xiaoqi",
			cbValidateFlags:0,
			wLocalTime:0,
			szMobilePhone:"0",
			szThirdPartyID:thirdPartyID});
		cc.log("USER_zhangHao,szPassword",USER_zhangHao,USER_szPassword);
	}else{
		loginServer.sendMessage(MDM_MB_LOGON,SUB_MB_RELOGON,{dwUserID : USER_dwUserID});
	}

});

cc.eventManager.addCustomListener("server_login_message", function(event){
	if(event.getUserData().mainCmdId == MDM_MB_LOGON && event.getUserData().subCmdId == SUB_MB_LOGON_DELAY ) {
		var time = event.getUserData().body.dwDelayTime;
		var kaiShi_btn ;
		if(loginScene_this){
			kaiShi_btn = loginScene_this.getChildByTag(13);
			kaiShi_btn.setTouchEnabled(false);
		}
		cc.log("+||+|+|+|+");
		var interval = 0.25; // every 1/4 of second
		var repeat = cc.REPEAT_FOREVER; // how many repeats. cc.REPEAT_FOREVER means forever
		var delay = time; // start after 2 seconds;
		var  paused = false; // not paused. queue it now.
		var node_tanchi = cc.director.getScheduler();
		node_tanchi.scheduleCallbackForTarget(this, function() {
			cc.log("+||+|+|+|+");
			var hash = md5( USER_szPassword);
			var Accounts = SDKHelper.thirdSdkLogin?md5(USER_zhangHao) : USER_zhangHao;
			var thirdPartyID = SDKHelper.thirdSdkLogin?USER_zhangHao : "0";
			loginServer.sendMessage( MDM_MB_LOGON,SUB_MB_FAST_REGISTER_ACCOUNTS,{

				wModuleID:203,
				dwPlazaVersion:1.0,
				szMachineID:MachineID,
				cbDeviceType:1,
				szLogonPass:hash,
				szInsurePass:hash,
				wFaceID:"",
				cbGender:"",
				cbRegType:sheBeiLeiXing,
				szAccounts:Accounts,
				szNickName:SDKHelper.prefix,
				szSpreader:QUDAOHAO,
				szPassPortID:0,
				szCompellation:"xiaoqi",
				cbValidateFlags:0,
				wLocalTime:0,
				szMobilePhone:"0",
				szThirdPartyID:thirdPartyID});

			if(loginScene_this){
				kaiShi_btn = loginScene_this.getChildByTag(13);
				kaiShi_btn.setTouchEnabled(false);
			}

			node_tanchi.unscheduleAllCallbacksForTarget(this);
		}, interval, repeat, delay, paused);

		return;

	}else  if (event.getUserData().mainCmdId == CMD_SHZ_HEARTBEAT && event.getUserData().subCmdId == SUB_SHZ_HEARTBEAT) {
		cc.log("/login*********************************/");
		loginServer.sendMessage(CMD_SHZ_HEARTBEAT,SUB_SHZ_HEARTBEAT,{});
		return;
	}else if(event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_REWARD_POOL_INFO){//查询奖池返回数据
		SocketManager.log(event.getUserData().body);
		JiangChi.sheZhiStr( event.getUserData().body.lRewardPoolScore);
		//排行榜是否打开，记录奖池的钱数
		if(paihangbanglayer.isPaihangbangOpen){
			paihangbanglayer.nowJiangchiCount = event.getUserData().body.lRewardPoolScore;
		}
		return;
	}else if(event.getUserData().mainCmdId == MDM_GP_SERVER_LIST && event.getUserData().subCmdId == SUB_GR_KINE_ONLINE){//3.2.13 类型在线
		// return;
	}else if(event.getUserData().mainCmdId == MDM_GP_SERVER_LIST && event.getUserData().subCmdId == SUB_GR_SERVER_ONLINE){//3.2.14 房间在线
		var data = event.getUserData().body.OnLineInfoServer;
		if(GameHalll){
			if(GameHalll.__pTag_EnterGame==1){//经典场
				for (var int = 0; int < data.length; int++) {
					var serverID = data[int].wServerID;
					var ishave = Producer.haveThisServerID(serverID, fangJianData);
					if (ishave == false) continue;
					var FANGJIAN =	getFangJianByServerID(serverID);
					if(FANGJIAN){
						FANGJIAN.dwOnLineCount = data[int].dwOnLineCount;
						var str = "在线人数："+FANGJIAN.dwOnLineCount+"人";
						if (FANGJIAN.XrenShu) {
							FANGJIAN.XrenShu.setString(str);
						};
					}
				};
			}else {//百人场
				for (var int = 0; int < data.length; int++) {
					var serverID = data[int].wServerID;
					var ishave = Producer.haveThisServerID(serverID, brc.Object._brcRoomMsgDataArray);
					if (ishave == false) continue;
					for (var j = 0; j < brc.Object._brcRoomMsgDataArray.length; j++) {
						if (brc.Object._brcRoomMsgDataArray[j].wServerID == serverID) {
							brc.Object._brcRoomMsgDataArray[j].dwOnLineCount = data[int].dwOnLineCount;
						}
					}
				}
				//GameHalll.updateRoomListMsg();
			}
		}else{//百人场
			if(brc.biBieController.self){
				if(data.length > 0){
					for (var key in data){
						var serverID = data[key].wServerID;
						var ishave = Producer.haveThisServerID(serverID, brc.Object._brcRoomMsgDataArray);
						if (ishave == false) continue;
							if(brc.biBieController.self._paterLayer._wuZuoShu){
								brc.biBieController.self._paterLayer._wuZuoShu.setString(data[key].dwOnLineCount);
							}else{
								brc.biBieController.self._paterLayer._wuZuoShu = brc.biBieController.self._paterLayer._rootNode.getChildByName("BR_wuZuoRenDi").getChildByName("wuZuoRenShu");
								brc.biBieController.self._paterLayer._wuZuoShu.setString(data[key].dwOnLineCount);
							}
						}
				}
			}
		}
		
		//return;
	}else if(event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_PROPERTY_TRUMPET){//接收喇叭消息
		var  data = event.getUserData().body;
		cc.log("*******************"+data.szTrumpetContent);
		labaXiaoxi.addDataTonewsArr(data.szTrumpetContent);
		return;
	}else if (event.getUserData().mainCmdId==MDM_MB_LOGON && event.getUserData().subCmdId == SUB_MB_LOGON_SUCCESS) {//登录成功
		SocketManager.log(event.getUserData().body);
		var userData = event.getUserData().body;
		USER_wFaceID = userData.wFaceID;
		USER_wFaceID = USER_wFaceID%8;
		USER_cbGender = userData.cbGender;
		USER_dwGameID = userData.dwGameID;
		USER_dwUserID = userData.dwUserID;
		USER_lUserScore = userData.lUserScore;
		USER_szNickName  = userData.szNickName;
		USER_szNickName = USER_szNickName.split('\0')[0];
		USER_dwExperience = userData.dwExperience;
		USER_lLottery = userData.lLottery;
		USER_dwLoveLiness = userData.dwLoveLiness;
		USER_wMemOrder	=userData.wMemOrder%9;	
		USER_HaveMail = userData.cbHaveMail;
		USER_HaveReward = userData.cbHaveReward;
		initFangJianInfor();
		return;
	}
	else if(event.getUserData().mainCmdId == 104 && event.getUserData().subCmdId == 102){//排行榜是否有可领取的奖励返回
		var data = event.getUserData().body;
		if(paihangbanglayer.isPaihangbangOpen){
			paihangbanglayer.checkIsHongdian(data);
		}else if(GameHalll){
			GameHalll.checkPaihangHongdian(data);
		}
		return;
	}else if(event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_RESULT_WEEK_REWARD ){//周奖励返回命令
		var data = event.getUserData().body;
		cc.log("lRewardScore:============"+ data.lRewardScore);
		USER_ZhouJiangLi = data.lRewardScore;

		//排行榜是否打开
		if(paihangbanglayer.isPaihangbangOpen){
			paihangbanglayer.weekJiangchiCount = USER_ZhouJiangLi;
		}else{
			jiangChiXinXi._ZhouJiangLi.setString(USER_ZhouJiangLi);
		}
		return;
	}
	if (waitQuan.xianShi) {
		waitQuan.unuse("webSocketEvent364");
	} ;
	SocketManager.log(event.getUserData().body);

	if (event.getUserData().mainCmdId==MDM_MB_LOGON && event.getUserData().subCmdId == SUB_MB_LOGON_FAILURE) {//登录失败
		SocketManager.closeServer(false, false);
		var data = event.getUserData().body;
		var xinxi = {Describe : data.szDescribeString,errorCode : data.lResultCode,isBack : true};
		if (data.lResultCode == 10000) {//账号在另一台机器登陆		
			var tishi =TiShiKuang.create(xinxi);
			cc.director.getRunningScene().addChild(tishi,1001);
		}else {
			fangJianData = FANGJIANDATA;
			cc.director.runScene(new loginScene(xinxi));
		}	
	}else if (event.getUserData().mainCmdId==MDM_MB_SERVER_LIST && event.getUserData().subCmdId == SUB_MB_LIST_SERVER) {//游戏房间，房间列表
		var data = event.getUserData().body;
		if (data.wKindID == 203) {
			for (var int = 0; int < fangJianData.length; int++) {
				if (int == (data.wSortID-1)) {
					var fangJian = fangJianData[int];
					fangJian.wSortID = data.wSortID;
					fangJian.wServerID = data.wServerID;
					fangJian.dwOnLineCount = data.dwOnLineCount;
					fangJian.fangJianMingZi  = data.szServerName;
					var str = data.szServerName;
					var result = str.search(/非/);
					if (result >=0) {
						fangJian.isJiangQuan  = false;
					} else {
						fangJian.isJiangQuan  = true;
					}
				};	
			};
		}
		if(data.wKindID == 122){//百人场房间列表信息
			var fangJian = new Object();
			fangJian.wKindID = data.wKindID;
			fangJian.wSortID = data.wSortID;
			fangJian.wServerID = data.wServerID;
			fangJian.dwOnLineCount = data.dwOnLineCount;
			fangJian.fangJianMingZi  = data.szServerName;
			fangJian.dwFullCount = data.dwFullCount;
			fangJian.lMinEnterScore = data.lMinEnterScore;
			brc.Object._brcRoomMsgDataArray.push(fangJian);
		}
		return;

	}else if (event.getUserData().mainCmdId==MDM_MB_SERVER_LIST && event.getUserData().subCmdId == SUB_MB_LIST_FINISH) {//登录完成
		var serverNumber= 0;
		for ( var i in fangJianData) {	
			if (fangJianData[i].wServerID == 0) {		
				continue;
			}
			fangJianData_wServerID_array.push( fangJianData[i].wServerID );
			serverNumber++;
		};
		for ( var i in brc.Object._brcRoomMsgDataArray) {	
			if (brc.Object._brcRoomMsgDataArray[i].wServerID == 0) {		
				continue;
			}
			fangJianData_wServerID_array.push( brc.Object._brcRoomMsgDataArray[i].wServerID );
			serverNumber++;
		};
		addCommandCMD_GP_ServerOnline(serverNumber);
		IS_HALL_CHECK = true;
		//cc.log("查询签到，每次执行登录操作完成后，查询签到，若可以签到，直接弹出签到界面");
		cc.director.runScene(new GameHallScene());
		//查询签到，每次执行登录操作完成后，查询签到，若可以签到，直接弹出签到界面	
		//发送是否有可领取的奖励请求
		loginServer.sendMessage(104,4,{dwUserID : USER_dwUserID});
		loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_REQUITE_SIGNIN,{dwUserID : USER_dwUserID,dwDays : 0, localTime : dateStr,szNowTime:"",szUserkey : ""});
		IsDengLu = false;
	}else if (event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_USER_FACE_INFO) {//修改头像成功

		USER_wFaceID = event.getUserData().body.wFaceID;
		USER_wFaceID = USER_wFaceID%8;
		cc.log("DDDDDDDDDDDDDDDDDDDDDDfaceid",touXiangFrame[USER_wFaceID]);
		TouXiangSp.setSpriteFrame(touXiangFrame[USER_wFaceID]);


	} else if(event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_USER_INSURE_INFO){//银行查询结果
		var data = event.getUserData().body;
		USER_lUserScore = data.lUserScore;
		USER_lUserInsure = data.lUserInsure;
		if(yinHang._parent){
			if(yinHang.isShow ){
				yinHang.shuaXin();
			}
		}

	}else if(event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_USER_INSURE_SUCCESS){//银行操作成功
		var data = event.getUserData().body;
		USER_lUserScore = data.lUserScore;
		USER_lUserInsure = data.lUserInsure;
		YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
		shortTips.create({cueStr : data.szDescribeString});
		if(yinHang.isShow ){
			yinHang.shuaXin();
		}
	}else if(event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_OPERATE_FAILURE){//查询银行和头像修改失败
		var data = event.getUserData().body;
		var xinxi = {Describe : data.szDescribeString,errorCode : data.lResultCode,isBack : false};
		var tishi = TiShiKuang.create(xinxi);
		cc.director.getRunningScene().addChild(tishi,1000);
	}else if(event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_USER_INSURE_FAILURE){//银行操作失败
		var data = event.getUserData().body;
		var xinxi = {Describe : data.szDescribeString,errorCode : data.lResultCode,isBack : false};
		var tishi = TiShiKuang.create(xinxi);
		cc.director.getRunningScene().addChild(tishi,1000);
	}else if(event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_GET_SIGNIN){//签到查询返回
		var nowTime = event.getUserData().body.szNowTime.slice(0,10);
		var pretime = event.getUserData().body.localTime.slice(0,10);
		if (IS_HALL_CHECK) {
			cc.log("nowTime,pretime",nowTime,pretime);
			IS_HALL_CHECK = false;
			if(GameHalll){
				if (nowTime == pretime) {
					USER_HaveQiandao = false;
					GameHalll._qiandaoBtn.getChildByTag(20).setVisible(false);
					return;
				} else {
					USER_HaveQiandao = true;
					GameHalll._qiandaoBtn.getChildByTag(20).setVisible(true);
					qianDao.creatQianDaoLayer(cc.director.getRunningScene());

					return;
				};
			}
		};

		qianDao._dwDays = event.getUserData().body.dwDays;
		qianDao._dwDays = qianDao._dwDays>6 ? 6 : qianDao._dwDays;
		cc.log("pretime,nowTime",event.getUserData().body.localTime.slice(0,10),nowTime);
		if (qianDao._isFront) {
			if (nowTime == pretime ) {
				cc.log("nowTime,pretime---",nowTime,pretime);
				qianDao._qiandaoBtn.setBright(false);
				qianDao._qiandaoBtn.setTouchEnabled(false);
				qianDao._Particle.setVisible(false);
			} else {
				qianDao._qiandaoBtn.setBright(true);
				qianDao._qiandaoBtn.setTouchEnabled(true);
				qianDao._Particle.setVisible(true);
			};
			qianDao.shuaXinQianDao(qianDao._rootNode);
		};

	}else if(event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_OPERATE_SUCCESS){//签到，修改昵称等操作成功的命令
		loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_QUERY_MOBILE_USER_INFO,{dwUserID : USER_dwUserID,szUserkey : ""});//签到成功后，动态刷新用户数据
		var data = event.getUserData().body;
		var cueStr1 = data.szDescribeString || "签到成功";
		if (qianDao._isFront) {
			var mydate = new Date();
			var dateStr = mydate.toLocaleString();
			cc.pool.putInPool(qianDao.zhezhao);
			var numberAry =["res/shz/TanChuCeng/tanChuCengRes/meiriqiandao_new"];
			removeResources(numberAry);
			qianDao._isFront = false;
			cueStr1 = "恭喜您,签到成功！获得 "+qianDao._jiangliJine+" 银两！";
			loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_REQUITE_SIGNIN,{dwUserID : USER_dwUserID,dwDays : 0, localTime : dateStr,szNowTime:"",szUserkey : ""});		
		}
		if(USER_HaveQiandao){

			GameHalll._qiandaoBtn.getChildByTag(20).setVisible(false);
			USER_HaveQiandao = false;
		};
		shortTips.create({cueStr : cueStr1})

	}else if (event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_MOBILE_USER_INFO) {//动态刷新
		var data = event.getUserData().body;
		if (!MAINLAYER) {
			USER_lLottery = data.lLottery;
			USER_lUserScore = data.lUserScore
		}	
		USER_szNickName  = data.szNickName;
		USER_szNickName = USER_szNickName.split('\0')[0];
		USER_wMemOrder = data.wMemOrder%9;
		USER_dwExperience = data.dwExperience;
		ChongZhiNew.sprite_vip_Set();
		ChongZhiNew.nengliangtiaoSet();
		YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
		JiangQuanSp.setString(Producer.changeNumberToString(USER_lLottery));
		NiChengSp.setString(USER_szNickName);
		VipSp.loadTextures(VIPS[USER_wMemOrder], VIPS[USER_wMemOrder], VIPS[USER_wMemOrder], ccui.Widget.PLIST_TEXTURE);
		loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_QUERY_INSURE_INFO,{dwUserID : USER_dwUserID,szUserkey : ""});
	}else if (event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_RECHARE_SUCCESS) {//得到充值成功的命令
		ChongZhiNew._firstPay = false;
		if (GameHalll) {
			GameHalll.youHongDong.setVisible(false);
		};
		loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_QUERY_MOBILE_USER_INFO,{dwUserID : USER_dwUserID,szUserkey : ""});
		if (waitQuan.xianShi) waitQuan.unuse("webSocketEvent472");
		var xinxi = {Describe : "恭喜您充值成功，请前往银行查询！",errorCode : 1009,isBack : false};
		var tishi =TiShiKuang.create(xinxi);
		cc.director.getRunningScene().addChild(tishi,1000);
		if(xianShiLiBao.isXianShiLiBao){
			if(!xianShiLiBao.mrcz_btn.isBright()){
				xianShiLiBaoMrcz.creatHttp();//每日充值
			}else if(!xianShiLiBao.xianLiang_btn.isBright()){
				xianShiLiBao.creatHttp(3);//每日限量
			}
		};
	}else if(event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_RESULT_EXCHANGE_CDKEY){
		var data = event.getUserData().body;
		cc.log("duihuama: ",data.lExchangeScore);
		if(data){
			if(data.lExchangeScore){
				var xinxi = {Describe :"恭喜您，兑换成功！\n您获得了 "+ data.lExchangeScore+" 银两！",errorCode :1010,isBack : false};
				var tishi = TiShiKuang.create(xinxi);
				cc.director.getRunningScene().addChild(tishi,1000);
			}else{
				if( xianShiLiBao.duihuanma_tishi){
					xianShiLiBao.duihuanma_tishi.setString(data.szDescribeString);
				}
			}
		}
		cc.log("duihuama123123: ",data.szDescribeString);

	}else if (event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_RESULT_SHARE_GAME) {//分享成功
		cc.log("SSSSSS----");
		if (event.getUserData().body.lShareScore>0) {
			var xinxi = {Describe : "恭喜您，今日首次分享成功！\n您获得了  "+event.getUserData().body.lShareScore+"  银两！",type:1,errorCode : 1011,isBack : false};
			var tishi =TiShiKuang.create(xinxi);
			cc.director.getRunningScene().addChild(tishi,1000);
			USER_lUserScore += event.getUserData().body.lShareScore;
			return;
		}
		var xinxi1 = {Describe : "恭喜您，分享成功！" ,errorCode : 1011,isBack : false};
		var tishi1 =TiShiKuang.create(xinxi1);
		cc.director.getRunningScene().addChild(tishi1,1000);
	}else if (event.getUserData().mainCmdId == MDM_MB_ACTIVITIES_SERVICE && event.getUserData().subCmdId == SUB_MB_RESULT_USER_DRINK_INFO) { //获取用户对酒信息
		GameHalll._isBack = true;
		cc.director.runScene(new DuiJiuScene(event.getUserData().body));
	}else if (event.getUserData().mainCmdId == MDM_MB_ACTIVITIES_SERVICE && event.getUserData().subCmdId == SUB_MB_RESULT_DRINK_ONCE) { //对饮一次结果
		if (DUIJIU == null)return; 
		DUIJIU.duiJiuResult(event.getUserData().body,1);
	}else if (event.getUserData().mainCmdId == MDM_MB_ACTIVITIES_SERVICE && event.getUserData().subCmdId == SUB_MB_RESULT_DRINK_TEN_TIMES) { //对饮十次结果
		if (DUIJIU == null)return; 
		DUIJIU.duiJiuResult(event.getUserData().body,10);
	}else if (event.getUserData().mainCmdId == MDM_MB_ACTIVITIES_SERVICE && event.getUserData().subCmdId == SUB_MB_ACTIVITY_FAILURE) { //拼酒活动失败
		var data = event.getUserData().body;
		var xinxi = {Describe : data.szDescribeString || "对酒活动失败",errorCode : 103900,isBack : false};
		var tishi = TiShiKuang.create(xinxi);
		cc.director.getRunningScene().addChild(tishi,1000);
	}else if (event.getUserData().mainCmdId == MDM_MB_USER_SERVICE && event.getUserData().subCmdId == SUB_MB_RESULT_RECHARGE_CONFIG) { ////充值配置结果
		ChongZhiNew.getPayData(event.getUserData().body);
	}else if(event.getUserData().mainCmdId == 104 && event.getUserData().subCmdId == 100){//处理查询排行的命令cc.log("排行榜信息============");
		var data = event.getUserData().body;
		paihangbanglayer.receiveData(data);
	}else if(event.getUserData().mainCmdId == 104 && event.getUserData().subCmdId == 900){//排行榜操作失败
		var data = event.getUserData().body;
		paihangbanglayer.showSuccessOrFailure(false,data);
	}else if(event.getUserData().mainCmdId == 104 && event.getUserData().subCmdId == 901){//排行榜操作成功
		paihangbanglayer.showSuccessOrFailure(true,null);
	}else if(event.getUserData().mainCmdId == 104 && event.getUserData().subCmdId == 101){//排行榜滚动信息获取
		var data = event.getUserData().body;
		paihangbanglayer.createClippingNode(data.resultMassage);
	}
	else if(event.getUserData().mainCmdId == 103 && event.getUserData().subCmdId == 1){//开启活动
		var data = event.getUserData().body;
		xianShiLiBao.JF_hongDian = true;
		if(Slot_this){

		}else{
			var xinxi1 = {Describe : "进山剿匪活动开始，是否进入！" ,errorCode : 3,isBack : true};
			var tishi1 =TiShiKuangZiDingYi.create(xinxi1);
			cc.director.getRunningScene().addChild(tishi1,1000);
		}
	}else if(event.getUserData().mainCmdId == 103 && event.getUserData().subCmdId == 2){//活动结束
		var data = event.getUserData().body;
		var defeng = slocal.getItem("JF_ZDF");
		var beiLv = slocal.getItem("JF_NLDHL");
		xianShiLiBao.JF_hongDian = false;
		var huoDongId = slocal.getItem("JF_ID");
		if(data.wActivityID != huoDongId){
			slocal.setItem("JF_ZDF",0);
			slocal.setItem("JF_NLDHL",0);
			slocal.setItem("JF_ID",data.wActivityID);
		}
		if(!huoDong_JF.isShow && defeng > 0 && !huoDong_JF.isShiJianDao){
			var xinxi1 = {Describe : "恭喜你在进山剿匪中获得"+defeng*beiLv+"金币！请稍后到银行查看。" ,errorCode : 188,isBack : false};
			var tishi1 =TiShiKuang.create(xinxi1);
			cc.director.getRunningScene().addChild(tishi1,1000);
		}
		huoDong_JF.isShiJianDao = false;
		slocal.setItem("JF_ZDF",0);
		slocal.setItem("JF_NLDHL",0);
		qianPaiBa = 0;
		houPaiBa = 0;
		baoXiangjiShu = 0;
	}else if(event.getUserData().mainCmdId == 103 && event.getUserData().subCmdId == 4){//活动时间结果
		var data = event.getUserData().body;
		var huoDongId = slocal.getItem("JF_ID");
		if(data.wActivityID != huoDongId){
			slocal.setItem("JF_ZDF",0);
			slocal.setItem("JF_NLDHL",0);
			slocal.setItem("JF_ID",data.wActivityID);
		}
		if(!huoDong_JF.isShiJianDao){

			if(data.bStarted){
				xianShiLiBao.JF_hongDian = true;
				var xinxi1 = {Describe : "进山剿匪活动开始，是否进入！" ,errorCode : 3,isBack : true};
				var tishi1 =TiShiKuangZiDingYi.create(xinxi1);
				cc.director.getRunningScene().addChild(tishi1,1000);
			}else{
				if(xianShiLiBao.isXianShiLiBao){
					var xinxi = {Describe :  "活动尚未开启，请耐心等待！",errorCode : 1,isBack : false};
					var tishi =TiShiKuang.create(xinxi);
					cc.director.getRunningScene().addChild(tishi,1000);
				}
			}
		}


	}else if(event.getUserData().mainCmdId == 103 && event.getUserData().subCmdId == 6){//活动场景结果
		var data = event.getUserData().body;
		if( data.dwTime > 0){
			xianShiLiBao.JF_hongDian = false;
			if(RUNINGSCENE){
				topNode.fanhuifun();
				gameSever.sendMessage(MDM_GF_GAME,SUB_C_SCORE,{},GAMENAME);
			}
			if(DUIJIU){

			}
			var scene = new huoDong_JF.scene(data);
			cc.director.runScene(scene); 
		}else{
			var xinxi = {Describe :  "活动已结束，请等待下次活动！",errorCode : 199,isBack : false};
			var tishi =TiShiKuang.create(xinxi);
			cc.director.getRunningScene().addChild(tishi,1000);
		}
	}else if(event.getUserData().mainCmdId == 103 && event.getUserData().subCmdId == 9){//活动排行榜
		var data = event.getUserData().body;
		if(data.szRanklist){
			var obj = 	eval("("+data.szRanklist+")");  
			cc.log("!!!!!!!!!!!+++"+obj);
			if(JF_paiHang._tableView && obj){
				JF_paiHang.dataTable.splice(0, JF_paiHang.dataTable.length);
				JF_paiHang.dataTable = obj;
				JF_paiHang._self.gerRenTiaoShuJu(JF_paiHang._rootPaihang);
				JF_paiHang._tableView.reloadData();
			}	
		}
	}
});