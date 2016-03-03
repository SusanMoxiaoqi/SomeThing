cc.eventManager.addCustomListener("server_game_message"+BRCBIBEI, function(event){
	var data = event.getUserData().body;
	SocketManager.log(data);
	if (waitQuan.xianShi) {
		waitQuan.unuse();
	} ;
	if (event.getUserData().mainCmdId == 0 && event.getUserData().subCmdId == 1) {
		cc.log("/game*********************************/");
		gameSever.sendMessage(0,1,{},BRCBIBEI);
		return;
	}else if (event.getUserData().mainCmdId == 2 && event.getUserData().subCmdId == 101) {	
		return;
	}else if (event.getUserData().mainCmdId == 2 && event.getUserData().subCmdId == 103) {	
		return;
	} else if (event.getUserData().mainCmdId == brc.MDM_GR_USER && event.getUserData().subCmdId == brc.SUB_GR_REQUEST_FAILURE) {//请求失败3-103
		brc.loading._time = 8;
		shortTips.create({cueStr : data.szDescribeString,percentPosition : cc.p(0.5,0.5)});

		SocketManager.closeServer(true, false);
		return;
	}else if (event.getUserData().mainCmdId == brc.MDM_GR_USER  && event.getUserData().subCmdId == brc.SUB_GR_USER_ENTER ) {//房间用户信息	3，100
		brc.Object.yongHuXingXi(data);
		return;
	}else if (event.getUserData().mainCmdId == brc.MDM_GR_USER  && event.getUserData().subCmdId == brc.SUB_GR_USER_SCORE ) {//房间用户信息 3，101
		brc.Object.shuaXingYongXinXi(data);
	}else if (event.getUserData().mainCmdId == brc.MDM_GR_USER && event.getUserData().subCmdId == brc.SUB_GR_USER_STATUS) {	//用户状态 3，102
		var number = data.UserStatus.cbUserStatus;
		if(number == 0 || number == 6 || number == 1){
			brc.Object.yongHuZhuangTai(data);
		}
	}else if (event.getUserData().mainCmdId == brc.SUB_GR_USER_ENTER  && event.getUserData().subCmdId == brc.SUB_GR_USER_ENTER ) {//登录成功100，100
		if(brc.jiShuYouWuXingHao < 60 && !brc.biBieController.self){
			if(brc.loading){
				brc.loading.unschedule(brc.loading.runTime);
				brc.loading._time = 0;
			}
			cc.director.runScene(new brc.biBieController);
		}
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_SCREEN_FREE_NEW) {// 游戏场景空闲200，113
		brc.Object._gameInfor.cbGameStatus = 0;
		brc.Object.youXiKongXian(data);
		brc.biBieController.self._paterLayer.setYaZhuBtnLoad();
		if(data.wBankerUser != 65535){
			brc.Object.zhuangJiaXinXi(data);
			brc.biBieController.self._paterLayer.setZhuangJiaXinXi(false);
		}else{
			brc.biBieController.self._paterLayer.setZhuangJiaXinXi(true);
		}
		brc.biBieController.self.youXiDengDaiXiaZhu();
		brc.biBieController.self.setZuoWeiType()

		//brc.biBieController.self.updateWuZuoPlayer();//刷新无座玩家的信息
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_SCREEN_PLACE_JETTON_NEW) {	// 游戏场景下注200，114
		
		brc.Object.youXiZhuangTaiFuZhi(data, brc.biBieController.self._paterLayer);
		brc.biBieController.self._paterLayer.setYaZhuBtnLoad();
		if(data.wBankerUser != 65535){
			brc.Object.zhuangJiaXinXi(data);
			brc.biBieController.self._paterLayer.setZhuangJiaXinXi(false);
		}else{
			brc.biBieController.self._paterLayer.setZhuangJiaXinXi(true);
		}
		switch (data.cbGameStatus) {
		case 0:
			brc.Object._gameInfor.cbGameStatus = data.cbGameStatus;
			brc.biBieController.self.youXiDengDaiXiaZhu();
			break;
		case 100:
			brc.Object._gameInfor.cbGameStatus = data.cbGameStatus;
			if(data.cbTimeLeave<=3){
				//brc.Object._gameInfor.cbGameStatus = 102;
				brc.biBieController.self.youXiDengDaiXiaZhu(false ,false);
			}else {
				brc.biBieController.self.youXiDengDaiXiaZhu(true);
			}
			break;
		case 101:
			brc.Object._gameInfor.cbGameStatus = data.cbGameStatus;
			brc.biBieController.self.youXiDengDaiXiaZhu();
			break;

		default:
			break;
		}
		brc.biBieController.self.setZuoWeiType();

		//brc.biBieController.self.updateWuZuoPlayer();//刷新无座玩家的信息
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_SCREEN_END_NEW) {// 游戏场景结束200，115
		brc.Object.youXiZhuangTaiFuZhi(data, brc.biBieController.self._paterLayer);
		brc.biBieController.self._paterLayer.setYaZhuBtnLoad();
		if(data.wBankerUser != 65535){
			brc.Object.zhuangJiaXinXi(data);
			brc.biBieController.self._paterLayer.setZhuangJiaXinXi(false);
		}else{
			brc.biBieController.self._paterLayer.setZhuangJiaXinXi(true);
		}
		brc.Object._gameInfor.cbGameStatus = data.cbGameStatus;
		brc.biBieController.self.youXiDengDaiXiaZhu(false,false);
		brc.biBieController.self.setZuoWeiType();

		//brc.biBieController.self.updateWuZuoPlayer();//刷新无座玩家的信息
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_SCENE_WAIT_SHAKE) {	//等待摇色子场景200，116
		brc.Object._gameInfor.cbGameStatus = 0;
		brc.Object.youXiKongXian(data);
		if(data.wBankerUser != 65535){
			brc.Object.zhuangJiaXinXi(data);
			brc.biBieController.self._paterLayer.setZhuangJiaXinXi(false);
		}else{
			brc.biBieController.self._paterLayer.setZhuangJiaXinXi(true);
		}

		brc.biBieController.self.youXiDengDaiXiaZhu();
		brc.biBieController.self.setZuoWeiType();
		brc.biBieController.self.updateWuZuoPlayer();//刷新无座玩家的信息
		brc.biBieController.self._paterLayer.setYaZhuBtnLoad();
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_SCENE_SHAKE_DICE) {	//摇色子场景200，117
		brc.Object._gameInfor.cbGameStatus = 0;
		brc.Object.youXiKongXian(data);
		if(data.wBankerUser != 65535){
			brc.Object.zhuangJiaXinXi(data);
			brc.biBieController.self._paterLayer.setZhuangJiaXinXi(false);
		}else{
			brc.biBieController.self._paterLayer.setZhuangJiaXinXi(true);
		}

		brc.biBieController.self.youXiKaiShi();
		brc.biBieController.self.setZuoWeiType();
		brc.biBieController.self.updateWuZuoPlayer();//刷新无座玩家的信息
		brc.biBieController.self._paterLayer.setYaZhuBtnLoad();
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_GAME_START) {//游戏开始200，100
		cc.log("游戏开始")
		brc.Object.youXiKaiShi(data);
		brc.biBieController.self.youXiKaiShi();
		brc.biBieController.self.youXiKaiShiLuoJiChuLi();
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_GAME_END) {	//游戏结束200，102
		cc.log("游戏结束")
		brc.Object.youXiJieShu(data);
		brc.biBieController.self.gengGaiYuanBao(2, data.lUserScore,data.lBankerScore,data.SpChairUserScore,data.cbDicePoint);
		if(data.lBankerScore < 0){
			brc.biBieController.self.kaiDaXiao(1,data);
		}else{
			brc.biBieController.self.kaiDaXiao(2,data);
		}
		brc.Object.quShiMessage(data.cbDicePoint,1);//记录每一局的大小，为了趋势界面的信息刷新
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_GAME_FREE) {	//游戏空闲200，97
		brc.Object._gameInfor.cbTimeLeave = data.cbTimeLeave - 1;//剩余时间
		brc.Object._gameInfor.cbGameStatus = 0;
		brc.biBieController.self.youXiDengDaiXiaZhu();
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_WAIT_SHAKE) {	//等待摇色子200，98

		brc.Object._gameInfor.cbTimeLeave = data.cbTimeLeave;//剩余时间
		brc.Object._gameInfor.cbGameStatus = 105;
		if(brc.biBieController.self._isZhuangJia){
			brc.biBieController.self._paterLayer.setZhuangJiaYaoYao("YES");
		}
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_SHAKE_DICE) {	//摇色子动画200，99
		if(brc.biBieController.self._isZhuangJia){
			brc.biBieController.self._paterLayer.setZhuangJiaYaoYao("NO");
		}

	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME_ZHU_TIMESTART && event.getUserData().subCmdId == brc.SUB_S_GAME_TIMESTART) {	//游戏距开始时间9，1
		brc.Object._gameInfor.cbTimeLeave = data.cbTimeLeave;//剩余时间
		brc.Object._gameInfor.cbGameStatus = 0;
		brc.biBieController.self.youXiDengDaiXiaZhu();
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_PLACE_JETTON) {//用户下注200，101
		brc.biBieController.self.yaZhuChengGong(data);
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_PLACE_JETTON_COLLECT) {//无座用户下注200，1010
		brc.biBieController.self.wuZuoYaZhu(data);
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_PLACE_JETTON_FAIL) {//下注失败200，107
		cc.log("下注失败！");
		brc.biBieController.self.xiaZhuShiBai(data);
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_APPLY_BANKER) {//庄家列表200，103
		brc.Object.shouJiZhangJia(data);
		if(brc.biBieController.self._paterLayer._zhuangTableView){
			brc.biBieController.self._paterLayer._zhuangTableView.reloadData();
		}
		brc.biBieController.self._paterLayer.isZaiZhuangJiaLieBiao(true,data.wApplyUser);
		if(brc.biBieController.self._paterLayer._zhuangLieBiao){
			brc.biBieController.self._paterLayer._zhuangLieBiao.jianCeZhuangSelf();
		}
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_CANCEL_BANKER) {//庄家取消申请200，108
		brc.biBieController.self._paterLayer.isZaiZhuangJiaLieBiao(false,data.wCancelUser);
		brc.Object.zhuangJiaQuXiao(data);
		if(brc.biBieController.self._paterLayer._zhuangTableView){
			brc.biBieController.self._paterLayer._zhuangTableView.reloadData();
		}
		if(brc.biBieController.self._paterLayer._zhuangLieBiao){
			brc.biBieController.self._paterLayer._zhuangLieBiao.jianCeZhuangSelf();
		}
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_ZUOWEI_SHENGQING) {//有座玩家200，120
		brc.Object.zuoWeiXinXi(data);
		brc.biBieController.self.shangZuoWei(data.wSpChairID);
		//brc.biBieController.self.updateWuZuoPlayer();//刷新无座玩家的信息
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_ZUOWEI_QUXIAO) {//取消座位200，121
		brc.Object.quXiaoZuoWei(data);
		brc.biBieController.self.setXiaZuo(data.wSpChairID);
		//brc.biBieController.self.updateWuZuoPlayer();//刷新无座玩家的信息
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_CHANGE_BANKER) {//切换庄家200，104
		brc.Object.zhuangJiaXinXi(data);
		if(data.wBankerUser == 65535){
			brc.biBieController.self._paterLayer.setZhuangJiaXinXi(true);
		}else{
			brc.biBieController.self._paterLayer.setZhuangJiaXinXi(false);
		}
		if(brc.biBieController.self._paterLayer._zhuangTableView){
			brc.biBieController.self._paterLayer._zhuangTableView.reloadData();
		}
		if(brc.biBieController.self._paterLayer._zhuangLieBiao){
			brc.biBieController.self._paterLayer._zhuangLieBiao.jianCeZhuangSelf();
		}
		//brc.biBieController.self.updateWuZuoPlayer();//刷新无座玩家的信息
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_C_QUSHI) {//游戏输赢走势200 ,106
		brc.Object.quShiMessage(data,0);
		brc.biBieController.self._paterLayer.setQuShiShu();
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_C_BIAOQINGGET) {//表情200 ,122
		brc.Object.biaoqingshow(data);
		brc.biBieController.self._paterLayer.setBiaoQingShow();
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_C_BIAOQINGGET) {//下座成功200 ,121
		brc.biBieController.self._paterLayer._biaoqingBool = false;
	}else if (event.getUserData().mainCmdId == 100 && event.getUserData().subCmdId == brc.SUB_S_GAME_LABA) {//喇叭 100-200
		var number = data.wType & 0x02;
		if(number){
			shortTips.create({cueStr :data.szString,percentPosition : cc.p(0.5,0.5)});
			var number = data.wType & 0x0200;
			if(number){
				brc.biBieController.self.scheduleOnce(function(){
					cc.director.runScene(new GameHallScene());
				},2);
			}
		}else{
			if(data){
				brc.laBaArray.push(data.szString);
			}
		}
	}else if (event.getUserData().mainCmdId == brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_JCXINXI) {//红包滚动公告 100-200
		//brc.biBieController.self._paterLayer.jiangChi_BR.sheZhiStr(data.lScore);
	}if(event.getUserData().mainCmdId == MDM_GR_INSURE && event.getUserData().subCmdId == SUB_GR_USER_INSURE_SUCCESS){//游戏内取款成功
		var data = event.getUserData().body;
		if(data){
			if(TiShiKuang_ZDY.caoZuoFanKui){
				TiShiKuang_ZDY.caoZuoFanKui.setString(data.szDescribeString);
			}
			if(TiShiKuang_ZDY.Btn_three){
				TiShiKuang_ZDY.Btn_three.setTouchEnabled(true);
			}
			USER_lUserScore += data.lVariationScore;
			brc.Object._userInfor.lUserScore = USER_lUserScore;
			USER_lUserInsure=data.lUserInsure;
			brc.biBieController.self._userInformation._yuanbao.setString(Producer.changeNumberToString(USER_lUserScore));
		}
		if(brc.biBieController.self){
			if(brc.biBieController.self._youXiZhuangTai == 3){
				brc.biBieController.self._paterLayer.isJingYongBtn(true, 5);
			}
		}
	}else if(event.getUserData().mainCmdId == MDM_GR_INSURE && event.getUserData().subCmdId == SUB_GR_USER_INSURE_FAILURE){//游戏内取款失败
		var data = event.getUserData().body;
		if(TiShiKuang_ZDY.Btn_three){
			TiShiKuang_ZDY.Btn_three.setTouchEnabled(true);
		}
		if(TiShiKuang_ZDY.caoZuoFanKui){
			TiShiKuang_ZDY.caoZuoFanKui.setString(data.szDescribeString);
		}
	}else if(event.getUserData().mainCmdId ==  brc.SUB_S_GAME && event.getUserData().subCmdId == brc.SUB_S_GAME_CONFIG){//
		var obj = data.GameConfig.slice(1,-2);
		var number = eval("("+obj+")");
		brc.Object.peiZhiWenJian(number);


	}
	brc.jiShuYouWuXingHao = 0;
	if(brc.biBieController.self._duanXianTiShi){
		cc.pool.putInPool(brc.biBieController.self._duanXianTiShi);
		brc.biBieController.self._duanXianTiShi = null;
		if(cc.sys.os == cc.sys.OS_IOS){
			brc.biBieController.self.schedule(brc.biBieController.self.iosJianCeWangLuo,2,cc.REPEAT_FOREVER,0.1);
		}
		brc.biBieController.self.schedule(brc.biBieController.self.jiShiDuanXian, 1, cc.REPEAT_FOREVER);
		brc.biBieController.self._userInformation._yuanbao.setString(Producer.changeNumberToString(brc.Object._userInfor.lUserScore));
	}
});

cc.eventManager.addCustomListener("server_game_open"+BRCBIBEI, function(event){
	cc.log("MMMMMMMMMMMMMMMMserver_game_open");
	if(brc.isChongLian){
		AutomaticLink.AutomaticLinkSuccess = true;
		brc.isChongLian = false;
	}

		var hash = md5( USER_szPassword );
		gameSever.sendMessage(MDM_GR_LOGON,SUB_GR_LOGON_MOBILE,
				{wGameID:wServerID,dwProcessVersion:0,cbDeviceType:0,wBehaviorFlags:4096,wPageTableCount:1,dwUserID:USER_dwUserID,szPassword:hash,szMachineID:MachineID},false,false);
		console.log("MMMMMMMMMMMMMMMMserver_game_open1");

});

cc.eventManager.addCustomListener("server_game_close"+BRCBIBEI, function(event){
	if(!brc.isChongLian){
		brc.duanXianChongLian();
	}
});
cc.eventManager.addCustomListener("server_game_error"+BRCBIBEI, function(event){	
	IsGameLogin = 0;

});