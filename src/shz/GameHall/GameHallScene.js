var GameHalll = null;
var _huanYingYu = 0;
var shouChong_url = "http://m1-api.baiyishuihu.com/index.php/Api/Firstrecharge/get_recharge_info.php?";
var isShowBtn = 0;
//进入游戏的TAG，用来从游戏返回的时候显示不同的房间
var __pTag_EnterGame = 0;
var GameHallLayer = cc.Layer.extend({  
	_rootNode : null,
	_screenShotBtn : null,
	_listBtn : null,
	_shotBegin : false,
	_backBtn : null,
	_helpBtn : null,
	_settingBtn : null,
	_messageBtn : null,
	_bankBtn : null,
	_qiandaoBtn : null,
	_ChongZhiBtn : null,
	_limitedPackageBtn : null,
	_shangChengBtn : null,
	isYouHongDian : [],
	_isBack : false,
	_caidanXian : false,
	//选中按钮的tag值
	btnTag:0,
	_yanFen : ["押分:10-100","押分:100-1000","押分:1000-1万","押分:1万-10万",],
	//判断排行榜中是否有可领取奖励
	_hongdian : null,
	__Btn_Room_BRC : null,
	__Btn_Room_JDC : null,
	// 0 是百人场，经典场 两个按钮， 1 是进入百人场和经典场
	__Btn_Tag : 0,
	// 经典场NODE
	__pNode_Classcial : null,
	// 百人场NODE
	__pNode_BRC : null,
	_brcRoomListNode : null,//百人场房间列表
	_brcRoomSpace : 75,//百人场房间列表运动偏移量
	_lastRoomListArray : [],//百人场房间列表的入场限制
	_roomNameArray : ["浪子燕青","浪里白条张顺","呼保义宋江","托塔天王晁盖","玉麒麟卢俊义","智多星吴用","入云龙公孙胜","大刀关胜","豹子头林冲","霹雳火秦明","双鞭呼延灼","小李广花荣"],
	ctor : function() {
		cc.log("================GameHallLayer.ctor()");

		this._super();
		var size = cc.winSize;
		GameHalll = this;
		this._isBack = false;	
		cc.log("11111111111",loginServer.isMyClose);
		cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/ButtonLightsBorders.plist");
		//cc.spriteFrameCache.addSpriteFrames("res/br_res/baiRenTanChuRes/BRC_RoomList.plist");
		this.initScene();

		this.creatHttp(2);
		USER_HaveLiBao = true;
		GameHalll._limitedPackageBtn.getChildByTag(20).setVisible(true);
		loginServer.sendMessage(103,3);
		if(!shuiHuZhuanUrl){
			this.creatHttp(3);
		}
		/**个人信息*/
		var node = UserInformation.create(0);
		USERNODE = node;
		node.x=  97.5;
		node.y = 53.5;
		this.addChild(node,1);
		mainScene_isOn = true;
		zuZhiBack = false;
		//this.isShowHongDian();
		return true;
	},  

	creatHttp : function(type) {
		var testHttp = cc.loader.getXMLHttpRequest();
		var data ;
		var sign = hex_md5( USER_zhangHao +hex_md5(USER_szPassword));
		if(type == 1){
			var channwlStr; 
			if(typeof(CONFIG) == "undefined"){
				channwlStr = "SHZ";
			}else{
				channwlStr = CONFIG.channelNumber;
			};
			data = "userid="+USER_dwUserID+"&channelname="+channwlStr+"&sign="+sign;
			if(shuiHuZhuanUrl){
				testHttp.open("POST", shuiHuZhuanUrl.shouChong_url);
			}else{
				testHttp.open("POST", shouChong_url);
			}
		}else if(type == 2){
			var platform ;
			if (cc.sys.os == cc.sys.OS_ANDROID) {
				platform = "android";
			}else if (cc.sys.os == cc.sys.OS_IOS){
				platform = "ios";
			}
			data = "userid=" + USER_dwUserID + "&platform"+platform;
			testHttp.open("POST", huoQuHongDian);
		}else if(type == 3){
			testHttp.open("get", "http://phonegameupdate.oss-cn-hangzhou.aliyuncs.com/shz_url/shuiHuZhuan_url.txt");
		}
		streamXHREvents(testHttp);
		testHttp.onreadystatechange = function() {
			if (waitQuan.xianShi) {
				waitQuan.unuse("GameHallScene71");
			} ;
			if(testHttp.readyState == 4 && testHttp.status == 200){
				var jieshouData = testHttp.responseText;
				var obj = 	eval("("+jieshouData+")");
				cc.log("DATA::$$$$"+jieshouData);
				if(GameHalll){
					if(type == 1){
						if(obj.status == "success"){
							if(GameHalll.youHongDong){
								GameHalll.youHongDong.setVisible(true);
								ChongZhiNew._firstPay = true;
							}
						}else{
							ChongZhiNew._firstPay = false;
						}
					}else if(type == 2){

						if(obj.status == "success"){
							var  j = 0;

							if(obj.result.day_limit >0){
								USER_HaveLiBao = true;
								GameHalll._limitedPackageBtn.getChildByTag(20).setVisible(true);
								return;
							}else if(obj.result.day_recharge >0){
								USER_HaveLiBao = true;
								GameHalll._limitedPackageBtn.getChildByTag(20).setVisible(true);
								return;
							}
							for ( var key in obj.result.gift_packet) {
								if(obj.result.gift_packet[key] > 0){
									USER_HaveLiBao = true;
									GameHalll._limitedPackageBtn.getChildByTag(20).setVisible(true);
									return;
								}
							}
							if(xianShiLiBao.isXianShiLiBao){
								if(obj.result.day_limit >0){
									var honddian = xianShiLiBao.xianLiang_btn.getChildByTag(6)
									honddian.setVisible(true);
								}else if(obj.result.day_recharge >0){
									var honddian = xianShiLiBao.mrcz_btn .getChildByTag(6)
									honddian.setVisible(true);
								}
								for ( var key in obj.result.gift_packet) {
									if(obj.result.gift_packet[key] > 0){
										USER_HaveLiBao = true;
										GameHalll._limitedPackageBtn.getChildByTag(20).setVisible(true);
										return;
									}
								}
							}else{

							}


							USER_HaveLiBao = false;
							GameHalll._limitedPackageBtn.getChildByTag(20).setVisible(false);
						}else{
							USER_HaveLiBao = false;
							GameHalll._limitedPackageBtn.getChildByTag(20).setVisible(false);
						}

					}else if(type == 3){
						shuiHuZhuanUrl = obj;
						cc.log("/////////////////"+jieshouData);
					}
				}

			}

		};
		if(type == 3){
			testHttp.send("");
		}else{
			testHttp.send(data);
			cc.log("DATA::"+data);
		}



		if (!waitQuan.xianShi) {
			cc.director.getRunningScene().addChild(waitQuan,1000);
			waitQuan.reuse();
		}


	},
	initScene : function() {
		var self = this;
		cc.log("this",this);


		var Widjet= ccs.load("res/shz/GameHall/MainScene.json");

		self._rootNode = Widjet.node;
		self.addChild(self._rootNode);
		self._screenShotBtn = self._rootNode.getChildByName("GameHall_jietu");
		//var s = new ccui.Button;
		//判断首冲事件

		self._screenShotBtn.addTouchEventListener(this.buttonClick,	this);
		//this.setZOrder(z)

		self._backBtn = ccui.helper.seekWidgetByName(self._rootNode, "GameHall_fanhui");
		self._backBtn.addTouchEventListener(this.buttonClick,	this);

		self._duijiu = ccui.helper.seekWidgetByName(self._rootNode, "GameHall_duijiu");
		self._duijiu.addTouchEventListener(this.buttonClick,this);

		self._caidan = ccui.helper.seekWidgetByName(self._rootNode, "GameHall_caidan");
		self._caidan.addTouchEventListener(this.buttonClick,this);

		self._bankBtn = ccui.helper.seekWidgetByName(self._rootNode, "GameHall_yinhang");
		self._bankBtn.addTouchEventListener(this.buttonClick,this);

		//充值
		self._ChongZhiBtn = ccui.helper.seekWidgetByName(self._rootNode, "GameHall_chongzhi");

		self._ChongZhiBtn.addTouchEventListener(this.buttonClick,this);


		//首冲获取数据

		cc.log("查询活动=========");
		GameHalll.youHongDong = cc.Sprite.createWithSpriteFrameName("huodong.png");
		GameHalll.youHongDong.x = self._ChongZhiBtn.x;
		GameHalll.youHongDong.y = self._ChongZhiBtn.y+70;
		self._rootNode.addChild(GameHalll.youHongDong , 15);
		GameHalll.youHongDong.setVisible(false);
		this.creatHttp(1);

		self._messageBtn = ccui.helper.seekWidgetByName(self._rootNode, "GameHall_xiaoxi");
		self._messageBtn.addTouchEventListener(this.buttonClick,this);

		if(USER_HaveMail == 1){
			self._messageBtn.getChildByTag(20).setVisible(true);
		}else{
			self._messageBtn.getChildByTag(20).setVisible(false);
		}

		//限时礼包
		self._limitedPackageBtn = ccui.helper.seekWidgetByName(self._rootNode, "GameHall_libao");
		self._limitedPackageBtn.addTouchEventListener(this.buttonClick,this);

		self._qiandaoBtn = ccui.helper.seekWidgetByName(self._rootNode, "GameHall_qiandao");
		self._qiandaoBtn.addTouchEventListener(this.buttonClick,this);
		if(USER_HaveQiandao){
			GameHalll._qiandaoBtn.getChildByTag(20).setVisible(true);
		}else{
			GameHalll._qiandaoBtn.getChildByTag(20).setVisible(false);
		}



		self._listBtn = self._rootNode.getChildByName("GameHall_paihangbang");
		self._listBtn.addTouchEventListener(this.buttonClick,this);
		var hongDian = cc.Sprite.createWithSpriteFrameName("hongdian.png");
		hongDian.x = 55;
		hongDian.y = 65;
		hongDian.setVisible(false);
		self._hongdian = hongDian;
		self._listBtn.addChild(hongDian,10,6);

		if(USER_HaveReward == 1){
			self._listBtn.getChildByTag(20).setVisible(true);
		}else{
			self._listBtn.getChildByTag(20).setVisible(false);
		}
		//商城
		self._shangChengBtn = ccui.helper.seekWidgetByName(self._rootNode, "GameHall_shangcheng");
		self._shangChengBtn.addTouchEventListener(this.buttonClick,this);

		var faGuang = self._rootNode.getChildByName("faGuang_tu");
		var action1 = cc.fadeOut(3.0);
		var action1Back = action1.reverse();
		var delay = cc.delayTime(1);

		//创建百人场的房间列表
		//self.setBrcRoomList();

		faGuang.runAction(cc.sequence(action1, delay, action1Back).repeatForever());
//		var xuangchang = ccs.load("res/shz/GameHall/xuangchang.json").node;
//		self.addChild(xuangchang,10);
//		var scroll = xuangchang.getChildByTag(30);

		//经典场 百人场，进入游戏的时候默认的是两个按钮，从不同的房间进入游戏，返回之后进入不同的房间
		this.create_room_button( this );

		if( __pTag_EnterGame == 1 )
		{
			//经典场返回回来的
			GameHalll.__Btn_Room_BRC.setVisible( false );
			GameHalll.__Btn_Room_JDC.setVisible( false );
			this.loadClasscialRoom( this ,0);
		}
		else if( __pTag_EnterGame == 2 )
		{
			//百人场返回回来的
			GameHalll.__Btn_Room_BRC.setVisible( false );
			GameHalll.__Btn_Room_JDC.setVisible( false );
			this._brcRoomListNode.setVisible(true);
			GameHalll.__Btn_Tag = 2;
		}

	},

	//大厅百人场按钮回调
	touchEventBRC : function(sendr,type) {
		var touchEndTag	= sendr.getTag();
		switch( type ){
		case ccui.Widget.TOUCH_ENDED:
			cc.log("水浒传百人场");
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);

			if(brc.Object._brcRoomMsgDataArray[touchEndTag]){
				if(USER_lUserScore >= brc.Object._brcRoomMsgDataArray[touchEndTag].lMinEnterScore){
					var Data = {type : 1, array : baiRen_resources ,wServerID : brc.Object._brcRoomMsgDataArray[touchEndTag].wServerID};
					cc.director.runScene(new loadindScene(Data));
				}else{
					shortTips.create({cueStr :"银两不足"+brc.Object._brcRoomMsgDataArray[touchEndTag].lMinEnterScore + "两，无法进入房间。" ,percentPosition : cc.p(0.5,0.5)});
				}
			}else{
				shortTips.create({cueStr :"房间未开启!",percentPosition : cc.p(0.5,0.5)});
			}


			//var action1 = cc.sequence(cc.moveBy(0.2, cc.p(-850, 0)),
			//		cc.callFunc(function (nodeExecutingAction, value) {
			//			GameHalll.__Btn_Room_JDC.setVisible( false );
			//		}, GameHalll.__Btn_Room_JDC));
			//GameHalll.__Btn_Room_JDC.runAction(action1);
			//
			//GameHalll.__Btn_Room_BRC.runAction(cc.sequence(cc.moveBy(0.2, cc.p(850, 0)),
			//		cc.callFunc(function (nodeExecutingAction, value) {
			//			GameHalll.__Btn_Room_BRC.setVisible( false );
			//			GameHalll._brcRoomListNode.setVisible(true);
			//			__pTag_EnterGame = 2;
			//			GameHalll.__Btn_Tag = 2;
			//			GameHalll._brcRoomListNode.y = 308 - GameHalll._brcRoomSpace + 450;
			//			GameHalll._brcRoomListNode.runAction(cc.moveBy(1.2, cc.p(0,-450)).easing(cc.easeElasticOut(0.5)));
			//		}, GameHalll.__Btn_Room_BRC)));
			break;
		default:
			break;
		}
	},

	//大厅经典场按钮回调
	touchEventJDC : function(sendr,type) {
		switch( type ){
		case ccui.Widget.TOUCH_ENDED:
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);

			GameHalll.__Btn_Room_JDC.runAction(cc.sequence(cc.moveBy(0.2, cc.p(-850, 0)),
					cc.callFunc(function (nodeExecutingAction, value) {
						GameHalll.__Btn_Room_JDC.setVisible( false );
						GameHalll.loadClasscialRoom( GameHalll ,1);
					}, GameHalll.__Btn_Room_JDC)));

			GameHalll.__Btn_Room_BRC.runAction(cc.sequence(cc.moveBy(0.2, cc.p(850, 0)),
					cc.callFunc(function (nodeExecutingAction, value) {
						GameHalll.__Btn_Room_BRC.setVisible( false );
					}, GameHalll.__Btn_Room_BRC)));

			break;
		default:
			break;
		}
	},

	create_room_button : function( self )
	{
		GameHalll.__Btn_Room_BRC = new ccui.Button();
		GameHalll.__Btn_Room_BRC.setTouchEnabled(true);
		GameHalll.__Btn_Room_BRC.loadTextures("res/shz/GameHall/BaiRenChangResource/GameHallBaiRenChang.png",
				"res/shz/GameHall/BaiRenChangResource/GameHallBaiRenChang.png", "",ccui.Widget.LOCAL_TEXTURE);
		GameHalll.__Btn_Room_BRC.addTouchEventListener( this.touchEventBRC, this );
		GameHalll.__Btn_Room_BRC.x = 790
		GameHalll.__Btn_Room_BRC.y = 300;
		GameHalll.__Btn_Room_BRC.tag = 0;
		self.addChild( GameHalll.__Btn_Room_BRC,10 );

		GameHalll.__Btn_Room_JDC = new ccui.Button();
		GameHalll.__Btn_Room_JDC.setTouchEnabled(true);
		GameHalll.__Btn_Room_JDC.loadTextures("res/shz/GameHall/BaiRenChangResource/GameHallJingDianChang.png",
				"res/shz/GameHall/BaiRenChangResource/GameHallJingDianChang.png", "",ccui.Widget.LOCAL_TEXTURE);
		GameHalll.__Btn_Room_JDC.addTouchEventListener( this.touchEventJDC, this );
		GameHalll.__Btn_Room_JDC.x = 350
		GameHalll.__Btn_Room_JDC.y = 300;
		self.addChild( GameHalll.__Btn_Room_JDC,10 );

		GameHalll.__Btn_Tag = 0;
	},

	//显示经典场
	loadClasscialRoom : function(self,type)
	{
		GameHalll.__pNode_Classcial = ccs.load("res/shz/GameHall/xuangchang.json").node;
		self.addChild( GameHalll.__pNode_Classcial,10 );
		var scroll = GameHalll.__pNode_Classcial.getChildByTag(30);
		for (var i = 0; i < 4; i++) {
			var FANGJIAN  = fangJianData[i];
			var xBtn = scroll.getChildByTag(i+35);
			FANGJIAN.fangJianBtn = xBtn;
			xBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.xuanZeFangJian);
				self.enterMainScene(this);
			});
			var yafen = xBtn.getChildByTag(i+50);
			var pos = yafen.getPosition();
			yafen = new cc.LabelBMFont("123","res/shz/GameHall/yafen_number_1.fnt");
			yafen.x = pos.x;
			yafen.y = pos.y;
			xBtn.addChild(yafen);
			yafen.setString(FANGJIAN.yaFen);
			var renshu =  xBtn.getChildByTag(i+40);
			FANGJIAN.XrenShu = renshu;
			var str = "在线人数："+FANGJIAN.dwOnLineCount+"人";
			renshu.setString(str);
			var jbjq = xBtn.getChildByTag(i+46);
			var isJbJqX = FANGJIAN.isJiangQuan;
			jbjq.setVisible(isJbJqX);
		};

		GameHalll.__Btn_Tag = 1;
		__pTag_EnterGame = 1;

		if(type == 1){//切换百人和经典时，有运动效果
			GameHalll.__pNode_Classcial.x = GameHalll.__pNode_Classcial.getContentSize().width;
			GameHalll.__pNode_Classcial.runAction(cc.moveBy(0.8, cc.p(-GameHalll.__pNode_Classcial.getContentSize().width,0)).easing(cc.easeElasticOut(1.2)));
		}else{
			GameHalll.__pNode_Classcial.x = 0;
		}
	},
	buttonClick : function(send,type) {
		switch (type) {
		case ccui.Widget.TOUCH_BEGAN:
			if (!GameHalll.btnTag) {
				GameHalll.btnTag = send.getTag();
			}
		case ccui.Widget.TOUCH_MOVED:
			break;
		case ccui.Widget.TOUCH_ENDED:
			var touchEndTag	= send.getTag();
			if (touchEndTag == GameHalll.btnTag) {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				switch (send.getTag()) {
				case 61://返回
					cc.log(" GameHalll.__Btn_Tag == ",GameHalll.__Btn_Tag );
					if( GameHalll.__Btn_Tag == 0 )//返回登陆界面
					{
						if (loginServer) {
							SocketManager.closeServer(false, false);
						}
						IsDengLu = false;
						GameHalll._isBack = true
						cc.director.runScene(new loginScene());
						//如果是返回登陆界面，TAG值初始化
						__pTag_EnterGame = 0;
						var o = fangJianData_wServerID_array.pop();
						while (o) {
							o = fangJianData_wServerID_array.pop();
						}
						var e = brc.Object._brcRoomMsgDataArray.pop();
						while (e) {
							e = brc.Object._brcRoomMsgDataArray.pop();
						}
					}
					else if(GameHalll.__Btn_Tag == 2){//从百人场房间列表中返回
						GameHalll.__Btn_Room_JDC.x = -850 + 390;
						GameHalll.__Btn_Room_BRC.x = 850 + 750;
						GameHalll._brcRoomListNode.runAction(cc.sequence(cc.moveBy(0.2, cc.p(0, 450)),
								cc.callFunc(function (nodeExecutingAction, value) {
									GameHalll._brcRoomListNode.setVisible(false);
									GameHalll.__Btn_Room_JDC.setVisible(true);
									GameHalll.__Btn_Room_JDC.runAction(cc.moveBy(0.4, cc.p(850, 0)).easing(cc.easeElasticOut(1.2)));
									GameHalll.__Btn_Room_BRC.setVisible(true);
									GameHalll.__Btn_Room_BRC.runAction(cc.moveBy(0.4, cc.p(-850, 0)).easing(cc.easeElasticOut(1.2)));
									GameHalll.__Btn_Tag = 0;
								}, GameHalll._brcRoomListNode)));
					}else{//从经典场房间列表中返回
						if( GameHalll.__pNode_Classcial )
						{
							GameHalll.__Btn_Room_JDC.x = -850 + 390;
							GameHalll.__Btn_Room_BRC.x = 850 + 750;
							GameHalll.__pNode_Classcial.runAction(cc.sequence(cc.moveBy(0.2, cc.p(GameHalll.__pNode_Classcial.getContentSize().width, 0)),
									cc.callFunc(function (nodeExecutingAction, value) {
										GameHalll.__Btn_Room_JDC.setVisible(true);
										GameHalll.__Btn_Room_JDC.runAction(cc.moveBy(0.4, cc.p(850, 0)).easing(cc.easeElasticOut(1.2)));
										GameHalll.__Btn_Room_BRC.setVisible(true);
										GameHalll.__Btn_Room_BRC.runAction(cc.moveBy(0.4, cc.p(-850, 0)).easing(cc.easeElasticOut(1.2)));
										GameHalll.__Btn_Tag = 0;

										GameHalll.__pNode_Classcial.removeFromParent();
										GameHalll.__pNode_Classcial = null;
									}, GameHalll.__pNode_Classcial)));
						}
					}
					break;
				case 62://系统消息
					xiTongXiaoXi.creatXiTongXiaoXiLayer(GameHalll);
					break;
				case 63://截图分享
					FenXiang.creatFenXiangLayer(GameHalll);
					break;
				case 64://限时礼包
					xianShiLiBao.createXianShiLiBaoLayer(GameHalll);
					break;
				case 65://每日签到
//					IS_HALL_CHECK = false;
					qianDao.creatQianDaoLayer(GameHalll);
//					leijichognzhi.createljczlayer(GameHalll);
					break;
				case 66://聚义堂
//					paiHang.creatPaiHangLayer(GameHalll);
//					leijichognzhi.createljczlayer(GameHalll);
					paihangbanglayer.creatPaiHangLayer(GameHalll,1);
					break;
				case 57://充值
					//ChongZhi.creatChongZhiLayer(GameHalll);
					ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene(), 0);
					break;
				case 56://银行
					yinHang.creatYinHangLayer(GameHalll);

					break;
				case 76://商城
					shangCheng.creatChongZhiLayer(GameHalll);
					break;
				case 59://对酒
					/**用户请求拼酒信息*/
					if (!waitQuan.xianShi) {
						cc.director.getRunningScene().addChild(waitQuan,1000);
						waitQuan.reuse(15,0,"正在获取用户拼酒信息. . .");
					};
					loginServer.sendMessage(MDM_MB_ACTIVITIES_SERVICE, SUB_MB_QUERY_USER_DRINK_INFO,{dwUserID : USER_dwUserID});
					break;
				case 58://菜单
					GameHalll.chuliCaidan();
					break;
				case 90://设置
					sheZhi.creatSheZhiLayer(GameHalll);
					break;
				case 89://帮助
					bangZhu.creatBangZhuLayer(GameHalll);
					break;
				default:
					break;
				}


			}
			GameHalll.btnTag = 0;
			break;
		default:
			break;
		}


	},
	enterMainScene : function(sender) {	
		var ind = sender.getTag()-35;
		if (ind<fangJianData.length) {
			wServerID = 	fangJianData[ind].wServerID;
			if (wServerID == 0) {
				shortTips.create({cueStr : "房间正在维护中，请选择其他房间进入！"});
				return;
			}
			var type = 0;
			//得到网络环境
			if (sys.os == sys.OS_IOS) {
				type = jsb.reflection.callStaticMethod("netWork", "getCurrentNetworkStatus");
			}else if(sys.os == sys.OS_ANDROID){
				type = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getNetworkIsWifi", "()I");
			};
			//没有网络，
			if(type==0){
				shortTips.create({cueStr : "无法链接网络，请检查移动网络\n是否链接！"});
				return;
			}
			whichScene= scene[sender.getTag()-35];
			assignValueNameArr();//每次从大厅进入主场景前，给NameArr重新赋值，
			IsGameLogin = 1;
			SocketManager.setGameUrl(GAMEURL);
			gameSever=SocketManager.getGameServer(GAMENAME);	
			if (!waitQuan.xianShi) {
				cc.director.getRunningScene().addChild(waitQuan,1000);
				waitQuan.reuse(30,100);
			}
		}


		//cc.director.runScene(new loadindScene());	
	},
	/**菜单栏*/
	chuliCaidan : function() {
		if (!GameHalll._caidanXian) {
			var caidan = ccs.load("res/shz/GameHall/CaiDan.json").node;
			caidan.x = 1074;
			caidan.y = 183;
			GameHalll.addChild(caidan,10,10);
			GameHalll._caidanXian = true;
			var rootNode = caidan.getChildByName("candan_bg");
			var seting = rootNode.getChildByName("GameHall_shezhi");
			seting.addTouchEventListener(GameHalll.buttonClick,this);
			var bangzhu = rootNode.getChildByName("GameHall_bangzhu");
			bangzhu.addTouchEventListener(GameHalll.buttonClick,this);
		}else {
			GameHalll.removeChildByTag(10, false);
			GameHalll._caidanXian = false;
		}
	},
	onEnter:function(){
		this._super();
		cc.log("++++++++++++++++++++++++++++GameHallLayer onEnter");
		cc.audioEngine.stopMusic(false);
		cc.audioEngine.playMusic(Music_res.daTing, true);
		//刷新数据
		loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_QUERY_MOBILE_USER_INFO,{dwUserID : USER_dwUserID,szUserkey : ""});
		loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_QUERY_INSURE_INFO,{dwUserID : USER_dwUserID,szUserkey : ""});
		labaXiaoxi.creatLabaLayer(this,10);
		if (_huanYingYu == 0) {
			var welcome = "欢迎玩家：“" + USER_szNickName + "”进入“百易水浒传”游戏大厅";
			labaXiaoxi.addDataTonewsArr(welcome);
			_huanYingYu++;
		}

		//奖池
		JiangChi.setJiangChiParent(this);
		this.addChild(JiangChi,1);
		JiangChi.schedule(function() {
			cc.log("请求奖池");
			loginServer.sendMessage(MDM_MB_USER_SERVICE, SUB_MB_GET_REWARD_POOL,{wKindID : 203});
		}, 5.0,cc.REPEAT_FOREVER,0.1);
		//定时器，获取在线信息,每三十秒获取一次在线信息，不过刚进入场景会首次获取在线信息
		this.schedule(function(){
				var serverIdNum = fangJianData_wServerID_array.length;
				if (serverIdNum == 0) return;
				loginServer.sendMessage(MDM_GP_SERVER_LIST, SUB_GP_GET_ONLINE, {dwUserID:USER_dwUserID, wServerCount:fangJianData_wServerID_array.length, szUserKey:"", wOnLineServerID:fangJianData_wServerID_array});
				cc.log("获取在线信息",serverIdNum,fangJianData_wServerID_array.toString());
		},30,cc.REPEAT_FOREVER,0.1);
		//充值配置
		loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_QUERY_RECHARGE_CONFIG,{dwChannelID :  	parseInt(QUDAOHAO, 10)});

		//发送排行榜是否有可领取的奖励请求，为了显示红点
		loginServer.sendMessage(104,4,{dwUserID : USER_dwUserID});

		//释放登陆资源
		for (var i = 0; i < denglu_resources.length; i++) {
			cc.textureCache.removeTextureForKey(denglu_resources[i]);
		}


		var that = this;
		var TouchListener = cc.EventListener.create({  
			swallowTouches: true,  
			event: cc.EventListener.TOUCH_ONE_BY_ONE,  
			onTouchBegan:function(touch,event){return true},  
			onTouchEnded:function(touch,event){
				if(GameHalll._caidanXian) {
					GameHalll.removeChildByTag(10, false);
					GameHalll._caidanXian = false;
				}},   
		});  
		cc.eventManager.addListener(TouchListener, this);
		//键盘监听事件，处理安卓的返回键
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  function(keyCode, event){
				var label = event.getCurrentTarget();
				//label.setString("Key " + (cc.sys.isNative ? that.getNativeKeyName(keyCode) : String.fromCharCode(keyCode) ) + "(" + keyCode.toString()  + ") was pressed!");
			},
			onKeyReleased: function(keyCode, event){
				var keyCode = keyCode.toString();
				if (keyCode == 6 && !zuZhiBack && waitQuan.errCode != 100) {
					GameHalll._isBack = true;
					cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
					if (loginServer) {
						SocketManager.closeServer(false, false);
					}
					IsDengLu = false;
					cc.director.runScene(new loginScene());
				}
			}
		}, that);


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
		cc.audioEngine.stopMusic(false);
		NiChengSp = null;
		mainScene_isOn = false;
		GameHalll.isYouHongDian = [];	
		cc.log("++++++++++++++++++++++++++++GameHallLayer onExit");
		xianShiLiBao.isXianShiLiBao = false;
		__pTag_EnterGame = 0;
		cc.log("++++++++++++++++++++++++++++GameHallLayer onExit111");
		GameHalll = null;
		//释放大厅资源

	},

	//判断排行榜是否有红点
	checkPaihangHongdian : function(data){
		if(!GameHalll._hongdian){
			return;
		}
		GameHalll._hongdian.setVisible(false);
		if(data){
			var resultData = eval("("+data.rewardList+")");
			if(resultData){
				GameHalll._hongdian.setVisible(true);
			}
		}
	},

	//创建百人场的房间列表
	setBrcRoomList : function() {
		var self = this;
		if(!self._brcRoomListNode){
			var roomlist = new cc.Node();
			roomlist.x = 560;
			roomlist.y = 308 - GameHalll._brcRoomSpace;
			self._brcRoomListNode = roomlist;

			//房间列表
			for(var i = 0;i < 6; i++){
				var roomCell = new ccs.load("res/br_res/BrcRoomListCellNode.json").node;
				roomCell.x = (i%3)*300 - 300;
				roomCell.y = -Math.floor(i/3)*175 + 65;
				roomlist.addChild(roomCell,100,i);
				var roomBtn = roomCell.getChildByName("BRC_Room_Btn");//房间点击
				roomBtn.tag = i;
				roomBtn.addTouchEventListener(GameHalll.RoomListClick,this);

				var limitCount = roomCell.getChildByName("BRC_Room_limtCount");//入场限制
				limitCount.setString("最少携带0");

				var name = roomCell.getChildByName("BRC_Room_name");//房间名字
				name.setSpriteFrame("BRC_room_"+(i+1)+".png");

				var peopleCount = roomCell.getChildByName("BRC_Room_people");//在线人数
				peopleCount.setString("在线人数0/0");

				var tieLian = roomCell.getChildByName("BRC_room_lock_1");//铁链
				tieLian.setVisible(false);
			}
			self._brcRoomListNode.setVisible(false);

			var stencil = new cc.DrawNode();
			var rectangle = [cc.p(0, 0),cc.p(1130, 0),cc.p(1130, 500 - GameHalll._brcRoomSpace),cc.p(0, 500 - GameHalll._brcRoomSpace)];
			var white = cc.color(255, 0, 0, 255);
			stencil.drawPoly(rectangle, white, 1, white);
			//裁剪节点
			var clippingNode = new cc.ClippingNode();
			clippingNode.setPosition(cc.winSize.width/2 - 1130/2,cc.winSize.height/2 - 310 + GameHalll._brcRoomSpace);
			clippingNode.setContentSize(stencil.getContentSize());
			clippingNode.stencil = stencil;
			clippingNode.addChild(self._brcRoomListNode);
			self._rootNode.addChild(clippingNode,1000);
		}

		self.updateRoomListMsg();
	},
	//刷新房间信息
	updateRoomListMsg : function() {
		var self = this;
		//按照wSortID排序
		var lastRoomListArray = brc.Object._brcRoomMsgDataArray.sort(function(a,b) {
			return a.wSortID - b.wSortID;
		});
		self._lastRoomListArray = lastRoomListArray;
		for(var i = 0;i<6;i++){
			var tieLian = self._brcRoomListNode.getChildByTag(i).getChildByName("BRC_room_lock_1");//铁链
			tieLian.setVisible(true);
		}
		for(var j = 0; j < lastRoomListArray.length; j++){
			var tieLian = self._brcRoomListNode.getChildByTag(j).getChildByName("BRC_room_lock_1");//铁链
			tieLian.setVisible(false);
			var limitCount = self._brcRoomListNode.getChildByTag(j).getChildByName("BRC_Room_limtCount");//入场限制
			var limitString;
			if(lastRoomListArray[j].lMinEnterScore < 10000){
				limitString = lastRoomListArray[j].lMinEnterScore;
			}else{
				limitString = Math.floor(lastRoomListArray[j].lMinEnterScore/10000) + "万";
			}
			limitCount.setString("最少携带"+ limitString);

			var name = self._brcRoomListNode.getChildByTag(j).getChildByName("BRC_Room_name");//房间名字

			for(var p = 0; p < self._roomNameArray.length; p++){
				if(lastRoomListArray[j].fangJianMingZi == self._roomNameArray[p]){
					name.setSpriteFrame("BRC_room_"+(p+1)+".png");
				}
			}

			var peopleCount = self._brcRoomListNode.getChildByTag(j).getChildByName("BRC_Room_people");//在线人数
			peopleCount.setString("在线人数"+ lastRoomListArray[j].dwOnLineCount +"/"+lastRoomListArray[j].dwFullCount);
		}
	},

	//点击进入相应的百人场游戏
	RoomListClick : function(send,type) {
		switch (type) {
		case ccui.Widget.TOUCH_BEGAN:
		case ccui.Widget.TOUCH_MOVED:
			break;
		case ccui.Widget.TOUCH_ENDED:
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			var touchEndTag	= send.getTag();

			if(brc.Object._brcRoomMsgDataArray[touchEndTag]){
				if(USER_lUserScore >= GameHalll._brcRoomMsgDataArray[touchEndTag].lMinEnterScore){
					var Data = {type : 1, array : baiRen_resources ,wServerID : brc.Object._brcRoomMsgDataArray[touchEndTag].wServerID};
					cc.director.runScene(new loadindScene(Data));
				}else{
					shortTips.create({cueStr :"银两不足!",percentPosition : cc.p(0.5,0.5)});
				}
			}else{
				shortTips.create({cueStr :"房间未开启!",percentPosition : cc.p(0.5,0.5)});
			}
		}
	}

});  
var JiangChi = null;
var GameHallScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		if (JiangChi == null) {
			JiangChi = new jiangChiNode();//使用全局变量，因为在游戏场景也要用到它
			JiangChi.retain();
			JiangChi.setAnchorPoint(0.5, 0.5);
			JiangChi.x = 400;
			JiangChi.y = 535;
		}
		var layer = new GameHallLayer();
		this.addChild(layer);
	}
})
