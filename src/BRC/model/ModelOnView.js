var brc = brc || {};
brc.Object = {
	_zongYaZhuAry : [],//押注的数据收集
	_zhuangInfor : {},//当前庄家的信息
	_userInfor :{},//用户的信息
	_gameInfor :{} ,//游戏的信息
	_shaiZiDianShu : [],//骰子的点数数组
	_yongHuXinXi : [],//收集用户信息
	_zhuangJiaXinXi : [],//收集庄家信息
	_teShuZuoWeiWanJia : [],//特殊座位玩家
	_wuZuoWeiWanJia : [],//无座玩家
	_qushiData : [],//趋势
	_biaoqingData : {},//表情
	_hongbaoData : [],//红包信息
	_hongBaoResult : {},//领取红包的结果
	_xuanZhuBtnFeng : [100,500,1000,10000,100000],//进入房间选注分
	_blastInitData : {},//爆奖奖励初始状态
	_blastUpdateData : {},//点击宝箱后爆奖奖励数据
	_jiangChiListData : {},//奖池奖励列表
	_brcRoomMsgDataArray : [],//百人场房间信息
	_cleanArray : [],
	_shangZuoShiJian : 30,
	_shangZhuangShiJian : 30,
	_biaoQingJianGe : 30,
	_xiaZhuCiShu : 50,
		youZiTuiChuQingKongShuJu : function() {
			brc.Object._cleanArray = [brc.Object._yongHuXinXi,brc.Object._zhuangJiaXinXi,brc.Object._teShuZuoWeiWanJia,brc.Object._wuZuoWeiWanJia];
			for(var key in brc.Object._cleanArray){
				brc.Object._cleanArray[key].splice(0,brc.Object._cleanArray.length);
			}
		},
		youXiZhuangTaiFuZhi : function(data,view) {//游戏状态
			_ZongYaZhuAry = [];
			cc.log("<<<<<<<<<<<<<<<数据接收游戏状态");
			if(data.cbGameStatus != 101){
				view.setZongYaZhuShu("","",data.lAllBetScore);
			}
			//庄家
			brc.Object._zhuangInfor.wChairID = data.wBankerUser;//当前庄家
			brc.Object._zhuangInfor.cbBankerTime = data.cbBankerTime;//庄家局数
			brc.Object._zhuangInfor.lBankerWinScore = data.lBankerWinScore;//庄家赢分
			brc.Object._zhuangInfor.lBankerScore = data.lBankerScore;//庄家分数
			brc.Object._zhuangInfor.lEndBankerScore = data.lEndBankerScore;//庄家成绩
			brc.Object._zhuangInfor.lApplyBankerCondition = data.lApplyBankerCondition;//申请条件
			//玩家
			brc.Object._userInfor.lUserMaxScore = data.lUserMaxScore;//玩家最大下注
			brc.Object._userInfor.lEndUserScore = data.lEndUserScore;//玩家成绩
			//游戏信息
			brc.Object._gameInfor.cbTimeLeave = data.cbTimeLeave - 2;
			brc.Object._gameInfor.cbGameStatus = data.cbGameStatus;//游戏状态
			brc.Object._gameInfor.szGameRoomName  = data.szGameRoomName;//房间名称
			brc.Object._gameInfor.lAreaLimitScore  = data.lAreaLimitScore;//区域限制
			brc.Object._userInfor.lApplySpChairCondition = data.lApplySpChairCondition;//上坐限制
			if(data.lBetScore.length > 0){
				brc.Object._xuanZhuBtnFeng = data.lBetScore;//选注分
			}

			for ( var key in data.wSpChairUserArray) {
				if(data.wSpChairUserArray[key] != 65535){
					var number = 	brc.shuZuChaZhao(1, brc.Object._yongHuXinXi, data.wSpChairUserArray[key]);
					number.wSpChairID = key;
					brc.Object._teShuZuoWeiWanJia.push(number);
				}
			}
			brc.cleanArray.push(brc.Object._teShuZuoWeiWanJia);
			brc.Object._wuZuoWeiWanJia = brc.Object._yongHuXinXi.slice(0);
			brc.shuZuChaZhao(5, brc.Object._wuZuoWeiWanJia,  brc.Object._teShuZuoWeiWanJia);
			//骰子点数
			brc.Object._shaiZiDianShu = data.cbDicePoint;
		},

		youXiKongXian : function(data) {
			//庄家
			cc.log("<<<<<<<<<<<<<<<数据接收游戏空闲");
			brc.Object._zhuangInfor.wChairID = data.wBankerUser;//当前庄家
			brc.Object._zhuangInfor.cbBankerTime = data.cbBankerTime;//庄家局数
			brc.Object._zhuangInfor.lBankerWinScore = data.lBankerWinScore;//庄家赢分
			brc.Object._zhuangInfor.lBankerScore = data.lBankerScore;//庄家分数
			brc.Object._zhuangInfor.lApplyBankerCondition = data.lApplyBankerCondition;//申请条件
			brc.Object._zhuangInfor.bEnableSysBanker = data.bEnableSysBanker;//是否系统坐庄
			if(data.lBetScore.length > 0){
				brc.Object._xuanZhuBtnFeng = data.lBetScore;//选注分
			}
			for ( var key in data.wSpChairUserArray) {
				if(data.wSpChairUserArray[key] != 65535){
					var number = 	brc.shuZuChaZhao(1, brc.Object._yongHuXinXi, data.wSpChairUserArray[key]);
					number.wSpChairID = key;
					brc.Object._teShuZuoWeiWanJia.push(number);
				}
			}
			brc.cleanArray.push(brc.Object._teShuZuoWeiWanJia);
			brc.Object._wuZuoWeiWanJia = brc.Object._yongHuXinXi.slice(0);
			brc.shuZuChaZhao(5, brc.Object._wuZuoWeiWanJia,  brc.Object._teShuZuoWeiWanJia);
			//玩家
			brc.Object._userInfor.lUserMaxScore = data.lUserMaxScore;//玩家最大下注	
			//游戏信息
			brc.Object._gameInfor.cbTimeLeave = data.cbTimeLeave - 1;//剩余时间
			brc.Object._gameInfor.szGameRoomName  = data.szGameRoomName;//房间名称
			brc.Object._gameInfor.lAreaLimitScore  = data.lAreaLimitScore;//区域限制
			brc.Object._userInfor.lApplySpChairCondition = data.lApplySpChairCondition;//上坐限制
			//骰子点数
			brc.Object._shaiZiDianShu = data.cbDicePoint;

		},
		
		youXiJieShu : function(data) {
			//游戏信息
			brc.Object._gameInfor.cbTimeLeave = data.cbTimeLeave;//剩余时间
			//庄家
			brc.Object._zhuangInfor.lBankerScore = data.lBankerScore;//庄家当前一局得分
			brc.Object._zhuangInfor.lBankerTotallScore = data.lBankerTotallScore;//庄家成绩
			brc.Object._zhuangInfor.nBankerTime = data.nBankerTime;//做庄次数
			//骰子点数
			brc.Object._shaiZiDianShu = data.cbDicePoint; //筛子点数
			//玩家
			brc.Object._userInfor.lUserReturnScore = data.lUserReturnScore;//返回积分
			
			//赢家
			brc.Object._winner = data.cbWinner;
			
			//连胜连败场数
			brc.Object._userInfor.WinLostStreak = data.WinLostStreak;
		},
		youXiKaiShi : function(data){
			//庄家
			brc.Object._zhuangInfor.wChairID = data.wBankerUser;//当前庄家
			brc.Object._zhuangInfor.lBankerScore = data.lBankerScore;//庄家分数
			//玩家
			brc.Object._userInfor.lUserMaxScore = data.lUserMaxScore;//玩家最大下注	
			//游戏信息
			brc.Object._gameInfor.cbTimeLeave = data.cbTimeLeave - 3;
			brc.Object._gameInfor.nChipRobotCount = data.nChipRobotCount;//人数上限
		},
		yongHuXingXi : function(data) {//用户的信息收集
			for(var key in data.tagMobileUserInfoHead_BR){
				data.tagMobileUserInfoHead_BR[key].cbMemberOrder = data.tagMobileUserInfoHead_BR[key].cbMemberOrder%9;
				data.tagMobileUserInfoHead_BR[key].wFaceID = data.tagMobileUserInfoHead_BR[key].wFaceID%8;
				brc.Object._yongHuXinXi.push(data.tagMobileUserInfoHead_BR[key]);
			}
			brc.cleanArray.push(brc.Object._yongHuXinXi);
			brc.Object._wuZuoWeiWanJia = brc.Object._yongHuXinXi.slice(0);
			brc.shuZuChaZhao(5, brc.Object._wuZuoWeiWanJia,  brc.Object._teShuZuoWeiWanJia);
			brc.Object._userInfor.lUserScore = 	brc.shuZuChaZhao(2, brc.Object._yongHuXinXi,USER_dwUserID).lScore;
		},
		shuaXingYongXinXi : function(data){
			var number = data.UserScore;
			for(var key in brc.Object._yongHuXinXi){
				if(brc.Object._yongHuXinXi[key].dwUserID == data.dwUserID){
					brc.Object._yongHuXinXi[key].lScore = number.lScore;
					brc.Object._yongHuXinXi[key].dwWinCount = number.dwWinCount;
					brc.Object._yongHuXinXi[key].dwLostCount = number.dwLostCount;
					brc.Object._yongHuXinXi[key].dwDrawCount = number.dwDrawCount;
					brc.Object._yongHuXinXi[key].dwFleeCount = number.dwFleeCount;
					brc.Object._yongHuXinXi[key].dwExperience = number.dwExperience;
					if(brc.Object._yongHuXinXi[key].dwUserID == USER_dwUserID){
						brc.Object._userInfor.lUserScore = brc.Object._yongHuXinXi[key].lScore;
					}
				}
			}
		},
		yongHuZhuangTai : function(data) {//在用户信息中剔除退出游戏离线的玩家
			brc.shuZuChaZhao(4, brc.Object._yongHuXinXi,data.dwUserID);
			brc.shuZuChaZhao(4, brc.Object._zhuangJiaXinXi,data.dwUserID);
			brc.shuZuChaZhao(4, brc.Object._teShuZuoWeiWanJia,data.dwUserID);
			brc.shuZuChaZhao(4, brc.Object._wuZuoWeiWanJia,data.dwUserID);
		},
		shouJiZhangJia : function(data) {//庄家信息的收集
			brc.shuZuChaZhao(5, brc.Object._wuZuoWeiWanJia,  brc.Object._teShuZuoWeiWanJia);
			var number = brc.shuZuChaZhao(1, brc.Object._yongHuXinXi,data.wApplyUser);
			brc.Object._zhuangJiaXinXi.push(number);
			brc.cleanArray.push(brc.Object._zhuangJiaXinXi);
		},
		zhuangJiaQuXiao : function(data) {//取消庄家的信息收集
			
			brc.shuZuChaZhao(3, brc.Object._zhuangJiaXinXi, data.wCancelUser);
		},
		zuoWeiXinXi : function(data) {//座位信息区分
			var number = 	brc.shuZuChaZhao(1, brc.Object._yongHuXinXi, data.wApplyUser);
			number.wSpChairID = data.wSpChairID;
			for(var key in brc.Object._teShuZuoWeiWanJia){
				if( brc.Object._teShuZuoWeiWanJia[key].wSpChairID == data.wSpChairID){
					brc.Object._teShuZuoWeiWanJia.splice(key,1);
				}
			}
			brc.Object._teShuZuoWeiWanJia.push(number);
			brc.Object._wuZuoWeiWanJia = brc.Object._yongHuXinXi.slice(0);
			brc.shuZuChaZhao(5, brc.Object._wuZuoWeiWanJia,  brc.Object._teShuZuoWeiWanJia);
		},
		quXiaoZuoWei : function(data) {//取消座位数据处理
			for ( var key in brc.Object._teShuZuoWeiWanJia) {
				if(brc.Object._teShuZuoWeiWanJia[key].wSpChairID == data.wSpChairID){
					if(brc.Object._teShuZuoWeiWanJia[key].dwUserID  == USER_dwUserID){
						brc.biBieController.self._isShangZuo = false;
					}
					brc.Object._teShuZuoWeiWanJia[key].wSpChairID = 0;
					brc.Object._wuZuoWeiWanJia.push(brc.Object._teShuZuoWeiWanJia[key]);
					brc.Object._teShuZuoWeiWanJia.splice(key, 1);
				}
			}
			
		},
		zhuangJiaXinXi : function(data){//庄家信息赋值
			if(data.wBankerUser == 65535){
				for ( var key1 in brc.Object._teShuZuoWeiWanJia) {
					if(brc.Object._teShuZuoWeiWanJia[key1].wSpChairID == 99 ){
						brc.Object._teShuZuoWeiWanJia.splice(key1, 1);
					}
				}
			}else{
				for ( var key in brc.Object._yongHuXinXi) {
					if(brc.Object._yongHuXinXi[key].wChairID == data.wBankerUser){
						brc.Object._zhuangInfor.wChairID = brc.Object._yongHuXinXi[key].wChairID;//当前庄家
						brc.Object._zhuangInfor.lBankerScore = brc.Object._yongHuXinXi[key].lScore;//庄家分数
						brc.Object._zhuangInfor.wFaceID = brc.Object._yongHuXinXi[key].wFaceID%8;//庄家头像
						brc.Object._zhuangInfor.szNickName = brc.Object._yongHuXinXi[key].szNickName;//庄家昵称
						brc.Object._zhuangInfor.dwUserID = brc.Object._yongHuXinXi[key].dwUserID;//当前庄家userId
						brc.Object._zhuangInfor.cbMemberOrder = brc.Object._yongHuXinXi[key].cbMemberOrder;//当前庄家vip
						brc.Object._zhuangInfor.dwWinCount = brc.Object._yongHuXinXi[key].cbMemberOrder;//当前庄家胜利
						brc.Object._zhuangInfor.dwLostCount = brc.Object._yongHuXinXi[key].cbMemberOrder;//当前庄家负
						brc.Object._zhuangInfor.lScore = brc.Object._yongHuXinXi[key].lScore;//庄家分数
						brc.shuZuChaZhao(3,  brc.Object._zhuangJiaXinXi, data.wBankerUser);
						for ( var key1 in brc.Object._teShuZuoWeiWanJia) {
							var number = brc.Object._yongHuXinXi[key];
							number.wSpChairID = 99;
							if(brc.Object._teShuZuoWeiWanJia[key1].wSpChairID == 99 ){
								brc.Object._teShuZuoWeiWanJia.splice(key1, 1);
								brc.Object._teShuZuoWeiWanJia.push(number);
								return ;
							}
							if(key1 == (brc.Object._teShuZuoWeiWanJia.length-1) || brc.Object._teShuZuoWeiWanJia.length == 0){
								brc.Object._teShuZuoWeiWanJia.push(number);
							}
						}
						if(brc.Object._teShuZuoWeiWanJia.length == 0){
							var number = brc.Object._yongHuXinXi[key];
							number.wSpChairID = 99;
							brc.Object._teShuZuoWeiWanJia.push(number);
						}
					}	
				}
			}
//			brc.shuZuChaZhao(4,  brc.Object._wuZuoWeiWanJia, brc.Object._zhuangInfor.dwUserID);//刷新无座玩家的数据
			brc.Object._wuZuoWeiWanJia = brc.Object._yongHuXinXi.slice(0);
			brc.shuZuChaZhao(5, brc.Object._wuZuoWeiWanJia,  brc.Object._teShuZuoWeiWanJia);
		},
		 quShiMessage : function(data,type) {//趋势
			switch (type) {
			case 0://第一次进入白人场后，服务器发过来的趋势
				brc.cleanArray.push(brc.Object._qushiData);
				for (var key in data.cbWinner){
					var number = data.cbWinner[key] ;
					if (number == 0) {
						break;
					};
					var number1 = (number & 0xf);
					var number2 = ((number >> 4) & 0xf);
					brc.Object._qushiData.push([number1,number2]);
				};
				break;
			case 1://每局结束后，记录趋势骰子数
				if(brc.Object._qushiData.length > 29){
					brc.Object._qushiData.splice(0,1);
				};
				brc.Object._qushiData.push([data[0],data[1]]);

				break;
			default:
				break;
			}
			 
		},
		peiZhiWenJian : function(data){
			if(data){
				if(data.Banker){
					brc.Object._shangZhuangShiJian = data.Banker;
				}
				if(data.Bet){
					brc.Object._xiaZhuCiShu = data.Bet;
				}
				if(data.Chair){
					brc.Object._shangZuoShiJian = data.Chair;
				}
				if(data.Face){
					brc.Object._biaoQingJianGe = data.Face;
				}
			}
		},
		biaoqingshow : function(data){//表情显示
			brc.Object._biaoqingData = data;
		},
		hongbaoShow : function(data) {//红包
			brc.Object._hongbaoData = data;
		},
		getHongBaoResult : function(data){//返回领取红包结果
			brc.Object._hongBaoResult = data;
		},
		getBlastInitData : function(data) {//获取爆奖奖励初始状态
			brc.Object._blastInitData = data;
		},
		getBlastUpdateData : function(data) {//点击宝箱后爆奖奖励更新数据
			brc.Object._blastUpdateData = data;
		},
		getJiangChiListData : function(data){//获取奖池奖励列表信息
			brc.Object._jiangChiListData = data;
		},
};