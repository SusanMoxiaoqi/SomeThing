
var brc = brc || {} ;
brc.loading = null;
brc.biBieController = cc.Scene.extend({
	_paterLayer : null,//比倍的界面
	_jingBiZu : [],//收集所有界面上显示的金币
	_jingBiZhuang : [],//飞向庄家的金币
	_youXiZhuangTai : 0,//游戏当前的运行场景
	_userInformation : null,//用户信息
	_isZhuangJia : false,//当前用户是否时庄家
	_isShangZuo : false,//当前用户知否上坐
	_selfSpChairID : 0,//自己上坐的座位标示
	_jingBiRect : {} ,//飞出金币不同位位置
	_nowBet  : 0,//当前押注钱
	_musicPath : null,//背景音乐路径
	_isDaoJisShi : false,//判断倒计时显示时状态只
	_duanXianTiShi : null,//断线的提示框
	_wuRenYing : false,//判断是否没有人赢钱
	_isShengLi : false,//判断我自己是否胜利
	_shengLiNumber : null,//胜利赢得钱
	_jieSuanYingQuYu : 0,//赢的区域（0:大，1:和，2:小，3:对1，4：对2。。。。。。）
	_yaZhuCiShu : 0,//判断押注次数
	_shangZuoShiJian : 0,//上坐间隔时间
	_kaiShiNode : null,//开始动画node
	_kaiShiAction : null,//开始动画
	_heGuanWeiShiY : 550,//荷官人物Y坐标
	_heGuanShuoDeHua : ["来来来,买大买小,买定离手了啊！","快下吧!大爷!","手快有,手慢无啦!","大丈夫,爽快点儿!"],
	_isHeGuanShuoHua : false,
	_yaZhuJiaoHu : false,
	_jiShiShangZhuang : false,
	ctor : function() {
		cc.log("================brc.ctor()");
		this._super();
		brc.biBieController.self = this;
		for (var i = 0; i < baiRen_resourcesplist.length; i++) {
			var array_element = baiRen_resourcesplist[i];
			cc.spriteFrameCache.addSpriteFrames(array_element);
		}
		this.faFuQinKongShuZu();
		this.jiaZaiJieMian();
	},
	onEnter : function() {
		cc.log("================brc.onEnter()");

		this._super();
		var self = this;
		//播放百人场背景音乐音乐
		var random = Math.random()*10;
		var musicPath;
		if(random < 5){
			musicPath = Music_res_exist.BRC_bgm1;
		}else{
			musicPath = Music_res_exist.BRC_bgm2;
		}
		cc.audioEngine.playMusic(musicPath, false);
		this._musicPath = musicPath;
		this.schedule(this.repeatPlayeMusic, 180, cc.REPEAT_FOREVER);
		this.schedule(this.jiShiDuanXian, 1, cc.REPEAT_FOREVER);
	},
	onExit : function() {
		this._super();
		cc.log("================brc.onExit()");
		brc.tuiChuScene(true);
	},
	//计时断线提示框
	jiShiDuanXian : function() {
		var self = this;
		brc.jiShuYouWuXingHao++;
		if(brc.jiShuYouWuXingHao == 60){
			if(!brc.isChongLian){
				brc.duanXianChongLian();
			}
		}
	},
	//创建场景界面
	jiaZaiJieMian : function() {
		var self = this;
		self._paterLayer = new brc.biBeiView();
		self.addChild(self._paterLayer);
		self._paterLayer.createZuoWei();
		self._kaiShiNode = ccs.load("res/br_res/cocosStudioAction/kaiShiNode.json").node;
		self._kaiShiAction = ccs.load("res/br_res/cocosStudioAction/kaiShiNode.json").action;
		self._kaiShiNode.runAction(self._kaiShiAction);
		self._kaiShiNode.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
		self._paterLayer.addChild(self._kaiShiNode,100);
		self._kaiShiNode.setVisible(false);
		self.schedule(function(){
				var serverIdNum = fangJianData_wServerID_array.length;
				if (serverIdNum == 0) return;
				loginServer.sendMessage(MDM_GP_SERVER_LIST, SUB_GP_GET_ONLINE, {dwUserID:USER_dwUserID, wServerCount:fangJianData_wServerID_array.length, szUserKey:"", wOnLineServerID:fangJianData_wServerID_array});
				cc.log("获取在线信息",serverIdNum);
		},5,cc.REPEAT_FOREVER,0.1);
		//押注显示分数
		self._paterLayer.BR_yaZhuQian_L = self._paterLayer._rootNode.getChildByName("BR_yaZhuQian_L");
		self._paterLayer.BR_yaZhuQian_L.setLocalZOrder(100);
		self._paterLayer.BR_yaZhuQian_M = self._paterLayer._rootNode.getChildByName("BR_yaZhuQian_M");
		self._paterLayer.BR_yaZhuQian_M.setLocalZOrder(100);
		self._paterLayer.BR_yaZhuQian_R = self._paterLayer._rootNode.getChildByName("BR_yaZhuQian_R");
		self._paterLayer.BR_yaZhuQian_R.setLocalZOrder(100);
		for ( var key in self._paterLayer._yaZhuBtn) {
			if(self._paterLayer._yaZhuBtn[key]){
				brc.btnDianJI(self._paterLayer._yaZhuBtn[key], self.yaZhuBtnClick ,self);
			}
		}
		self._userInformation = UserInformation.create(4);
		USERNODE = self._userInformation;
		self._userInformation.x=  0;
		self._userInformation.y = 0;
		self._paterLayer._rootNode.addChild(self._userInformation,10);
		cc.log("^^^^^^^^^^^^^",self._userInformation._niCheng.width);
		if(self._userInformation._niCheng.width > 150){
			self._userInformation._niCheng.width = 150;
			self._userInformation._niCheng.x = self._userInformation._niCheng.x-10
		}
		if(cc.sys.os == cc.sys.OS_IOS){
			self.schedule(self.iosJianCeWangLuo,2,cc.REPEAT_FOREVER,0.1);
		}
	},
	iosJianCeWangLuo : function(){
		var self = this;
		var  type = jsb.reflection.callStaticMethod("netWork", "getCurrentNetworkStatus");
		if(type == 0){
			if(!brc.isChongLian){
				brc.duanXianChongLian();
			}
		}
	},
	//玩家上座界面显示
	setZuoWeiType : function(wSpChairID) {
		var self = this;
		for ( var key in self._paterLayer._zuoWeiArray) {
			for ( var keyTow in brc.Object._teShuZuoWeiWanJia) {
				if(brc.Object._teShuZuoWeiWanJia[keyTow].wSpChairID == self._paterLayer._zuoWeiArray[key]._wSpChairID ){
					self._paterLayer._zuoWeiArray[key].setTuPian(true, brc.Object._teShuZuoWeiWanJia[keyTow]);
					self._paterLayer._zuoWeiArray[key]._isYouRen = true;
					self._paterLayer._zuoWeiArray[key].setBtnType();
				}
				if( brc.Object._teShuZuoWeiWanJia[keyTow].dwUserID == USER_dwUserID){
					brc.biBieController.self._isShangZuo = true;
					brc.biBieController.self._selfSpChairID = brc.Object._teShuZuoWeiWanJia[keyTow].wSpChairID;
				}
			}
		}
	},
	//上坐纪录间隔时间
	shangZuoShiJian : function(){
		var self = this;
		self._shangZuoShiJian ++;
		if(self._shangZuoShiJian >= brc.Object._shangZuoShiJian){
			self.unschedule(self.shangZuoShiJian);
		}
	},
	//上坐调用函数
	shangZuoWei : function(wSpChairID) {
		var self = this;
		for ( var key in self._paterLayer._zuoWeiArray) {
				if(self._paterLayer._zuoWeiArray[key]._wSpChairID == wSpChairID ){
					for ( var keyTow in brc.Object._teShuZuoWeiWanJia) {
						if(brc.Object._teShuZuoWeiWanJia[keyTow].wSpChairID == wSpChairID){
							self._paterLayer._zuoWeiArray[key].setTuPian(true, brc.Object._teShuZuoWeiWanJia[keyTow]);
						}
					}
					self._paterLayer._zuoWeiArray[key]._isYouRen = true;
					self._paterLayer._zuoWeiArray[key].setBtnType();
					if( self._paterLayer._zuoWeiArray[key]._data.dwUserID == USER_dwUserID){
						self._shangZuoShiJian = 1;
						self.schedule(self.shangZuoShiJian,1,cc.REPEAT_FOREVER);
						brc.biBieController.self._isShangZuo = true;
						brc.biBieController.self._selfSpChairID = brc.Object._teShuZuoWeiWanJia[keyTow].wSpChairID;
					}
				}
		}
	},
	//下坐调用函数
	setXiaZuo : function(wSpChairID){
		var self = this;
		for ( var key in self._paterLayer._zuoWeiArray) {
			if( self._paterLayer._zuoWeiArray[key]._wSpChairID == wSpChairID){
				if(self._paterLayer._zuoWeiArray[key]._data && (self._paterLayer._zuoWeiArray[key]._data.dwUserID == USER_dwUserID)){
					self._paterLayer._biaoqingBool = false;
					self._isShangZuo = false;
				}
				self._paterLayer._zuoWeiArray[key]._dangJuYaZhu = 0;
				self._paterLayer._zuoWeiArray[key]._isYouRen = false;
				self._paterLayer._zuoWeiArray[key].setTuPian(false);
				self._paterLayer._zuoWeiArray[key].setBtnType();
			}
		}

	},
	//游戏等待
	youXiDengDaiXiaZhu : function(isXiaZhu,bool) {
		if (bool == undefined) bool = true;
		var self = this;
		self._paterLayer._BR_heguan.stopAllActions();
		cc.log("==============游戏等待============");
		self._paterLayer._BR_heguan.setPositionY(self._heGuanWeiShiY);
		var heguanAction1 =	cc.sequence(
				cc.callFunc(function() {
					if(isXiaZhu){
						self.isDianJiDongZuo(true);
						self._youXiZhuangTai = 3;
						if(!brc.biBieController.self._isZhuangJia){
							self._paterLayer.isJingYongBtn(true, 5);
						}
					}else{
						self.isDianJiDongZuo(false);
						if(!brc.biBieController.self._isZhuangJia){
							self._paterLayer.isJingYongBtn(false, 5);
						}
					}
					//self._paterLayer._BR_heguan.setPositionY(411);
					var repeatForMoren = cc.repeatForever(Producer.ProduceFrameAnimation("BR_Second_heguan_mo", 8, 0, 0.2));
					self._paterLayer._BR_heguan.runAction(repeatForMoren);
					self._isDaoJisShi = false;
					if(bool){
						self.unschedule(self.setYouXiShiJian);
						self.schedule(self.setYouXiShiJian, 1, cc.REPEAT_FOREVER);
					}
				}, this)
		);
		
		if(!brc.biBieController.self._isZhuangJia){
			self._paterLayer.isJingYongBtn(false, 5);
		}
		self._paterLayer._BR_heguan.runAction(heguanAction1);
		self._youXiZhuangTai = 1;
	},
	heGuanShuoHua : function(string){
		var self = this;
		if(!self._zhuangTiShiTiao){
			self._zhuangTiShiTiao = cc.Sprite.createWithSpriteFrameName("BR_zuoWeiTiShiTiao.png");
			self._zhuangTiShiTiao.x = cc.winSize.width/2 + 40;
			self._zhuangTiShiTiao.y = cc.winSize.height/2 + 240;
			self._zhuangTiShiTiao.anchorX = 0;
			self._zhuangTiShiTiao.anchorY = 0;
			self._paterLayer.addChild(self._zhuangTiShiTiao , 100);
			var tiShiYu = cc.LabelTTF(string,"Arial",16);
			tiShiYu.x = self._zhuangTiShiTiao.width/2;
			tiShiYu.y = self._zhuangTiShiTiao.height/2;
			self._zhuangTiShiTiao.addChild(tiShiYu,1,11);
			self._zhuangTiShiTiao.flippedX = 180;
			tiShiYu.setColor(cc.color.BLACK);
		}else{
			var tiShiYu = self._zhuangTiShiTiao.getChildByTag(11);
			tiShiYu.setString(string);
		}
		self._zhuangTiShiTiao.setScale(0.1);
		cc.log("************************",string);
		self._zhuangTiShiTiao.setVisible(true);
		self._zhuangTiShiTiao.runAction(cc.sequence(cc.scaleTo(0.3,1).easing(cc.easeElasticOut(0.5))));
		self.scheduleOnce(function(){
			self._zhuangTiShiTiao.setVisible(false);
		},3);
	},
	//游戏不同时间计时
	setYouXiShiJian : function() {
		var self = this;
		brc.Object._gameInfor.cbTimeLeave--;
		var xingXi ;
		switch (brc.Object._gameInfor.cbGameStatus) {
		case 0:
			self._paterLayer._youXiShiJian.setSpriteFrame(self._paterLayer._shiJianTiShiYu[3]);
			self.chongZhiJieMian();
			break;
		case 100:
			self._paterLayer._youXiShiJian.setSpriteFrame(self._paterLayer._shiJianTiShiYu[1]);
			if(!self._isHeGuanShuoHua && brc.Object._gameInfor.cbTimeLeave <=10 && brc.Object._gameInfor.cbTimeLeave >= 6 ){
				var number = Math.floor(Math.random()*4) + 6;
				if(number == brc.Object._gameInfor.cbTimeLeave ){
					self._isHeGuanShuoHua = true;
					var number1 = Math.floor(Math.random()*3);
					cc.log(")))))))))))11",number1,self._heGuanShuoDeHua[number1]);
					self.heGuanShuoHua(self._heGuanShuoDeHua[number1]);
				}else{
					if(brc.Object._gameInfor.cbTimeLeave == 6){
						self._isHeGuanShuoHua = true;
						var number1 = Math.floor(Math.random()*4);
						cc.log(")))))))))))11",number1,self._heGuanShuoDeHua[number1]);
						self.heGuanShuoHua(self._heGuanShuoDeHua[number1]);
					}
				}

			}
			break;
		case 101:
			self._paterLayer._youXiShiJian.setSpriteFrame(self._paterLayer._shiJianTiShiYu[3]);
			self.chongZhiJieMian();
			break;
		case 102:
			self._paterLayer._youXiShiJian.setSpriteFrame(self._paterLayer._shiJianTiShiYu[2]);
			break;
		case 105:
			self._paterLayer._youXiShiJian.setSpriteFrame(self._paterLayer._shiJianTiShiYu[0]);
			break;

		default:
			break;
		}
		if(!self._isDaoJisShi){
			self._isDaoJisShi = true;
			self._paterLayer._youXiShiJian.setVisible(true);
			self._paterLayer._youXiShiJianMiao.setVisible(true);
		}
		self._paterLayer._youXiShiJianMiao.setString(brc.Object._gameInfor.cbTimeLeave);
		if(brc.Object._gameInfor.cbTimeLeave <= 0){
			self.unschedule(self.setYouXiShiJian);
			brc.Object._gameInfor.cbTimeLeave = 0;
			self._isDaoJisShi = false;
			self._paterLayer._youXiShiJian.setVisible(false);
			self._paterLayer._youXiShiJianMiao.setVisible(false);
			self.isDianJiDongZuo(false);
		}
	},
	//游戏开大小
	kaiDaXiao : function(type , data) {
		var self = this;
		cc.log("==============游戏开大小============");
		self._paterLayer._BR_heguan.stopAllActions();
		if(!brc.biBieController.self._isZhuangJia){
			self._paterLayer.isJingYongBtn(false, 5);
		}
		self._paterLayer._youXiShiJian.setVisible(false);
		self._paterLayer._youXiShiJianMiao.setVisible(false);
		self.isDianJiDongZuo(false);
		var  action1 = cc.sequence(
			cc.callFunc(function() {
				self._paterLayer._BR_heguan.setPositionY(557);
				self._paterLayer._BR_heguan.setPositionX(559);
			}, this),
			Producer.ProduceFrameAnimation("BR_Second_heguan_dakai", 5, 0, 0.15),
			cc.callFunc(function() {
				brc.biBieController.self._paterLayer.setShaiZi(brc.Object._shaiZiDianShu , true);
				Producer.ProduceFrameAnimation("BR_Second_heguan_dakai", 14, 5, 0.15);
				self.jingBiRun(data.cbDicePoint);
			}, this)
		);
		var heGuanAction3 = cc.sequence(
			action1,
			cc.callFunc(function() {
				var action2 ;
				if(type == 1){
					cc.audioEngine.playEffect(Effect_res.biBeiYing);
					action2 = cc.sequence(cc.callFunc(function() {
							self._paterLayer._BR_heguan.setPositionY(567);
							//self._paterLayer._BR_heguan.setPositionX(570);
							self._paterLayer._dieZi.setPositionX(570);
						}, self),
						Producer.ProduceFrameAnimation("BR_Second_heguan_ku", 26, 0, 0.1)
					);
				}else{
					cc.audioEngine.playEffect(Effect_res.biBeiShu);
					action2 = cc.sequence(cc.callFunc(function() {
							self._paterLayer._BR_heguan.setPositionY(558);
							//self._paterLayer._BR_heguan.setPositionX(550);
						}, self),
						Producer.ProduceFrameAnimation("BR_Second_heguan_kaixin", 7, 0, 0.15),
						Producer.ProduceFrameAnimation("BR_Second_heguan_kaixin", 7, 0, 0.15),
						Producer.ProduceFrameAnimation("BR_Second_heguan_kaixin", 7, 0, 0.15)
					);
				}
				var	action3 =	cc.sequence(
					action2,
					cc.callFunc(function() {
						if(self._isShengLi){
							var  jieSuan = brc.shuYingLayer.create(self._shengLiNumber);
							brc.biBieController.self._paterLayer.addChild(jieSuan ,1000);
						}
					}, self),
					cc.callFunc(function() {
						var action4 = cc.sequence(cc.callFunc(function() {
								self._paterLayer._BR_heguan.setPositionY(self._heGuanWeiShiY);
								self._paterLayer._BR_heguan.setPositionX(568);
								self._paterLayer._dieZi.setPositionX(555);
							}, this),
							Producer.ProduceFrameAnimation("BR_Second_heguan_mo", 8, 0, 0.2)
						);
						var repeatForMoren = cc.repeatForever(action4);
						self._paterLayer._BR_heguan.runAction(repeatForMoren);
						self._paterLayer._dieZi.setVisible(false);
					}, this)
				);
				self._paterLayer._BR_heguan.runAction(action3);
			},this)
		);
		self._paterLayer._BR_heguan.runAction(heGuanAction3);
		self._youXiZhuangTai = 2;
	},
	//金币第一次飞动作
	jingBiFirstRun : function(key,key2){
		var self = this;
			self._paterLayer._yaZhuBtn[key].quYuJingBi[key2].spriteRunActionWanJia(cc.delayTime(0.005 * key2),cc.p(746,597));
			if(self._jingBiZhuang.length<200){
				self._jingBiZhuang.push(self._paterLayer._yaZhuBtn[key].quYuJingBi[key2]);
			}
	},//金币第一次飞逻辑
	jingBiRun : function(array){
		var self = this;
		var touXiang = self._paterLayer._rootNode.getChildByName("zhuangTouXiang");
		var number = array[0] + array[1];
		var data ;
		for(var key in self._paterLayer._yaZhuBtn){
			if(self._paterLayer._yaZhuBtn[key].quYuJingBi.length > 0){
				for (var key2 in self._paterLayer._yaZhuBtn[key].quYuJingBi){
					if(self._paterLayer._yaZhuBtn[key].quYuJingBi[key2]){
						if(self._jieSuanYingQuYu > 2){
							if(self._jieSuanYingQuYu > 5){
								if(self._paterLayer._yaZhuBtn[key].quYuZhi != 0 && self._paterLayer._yaZhuBtn[key].quYuZhi != self._jieSuanYingQuYu){
									self.jingBiFirstRun(key,key2)
								}
							}else{
								if(self._paterLayer._yaZhuBtn[key].quYuZhi != 2 && self._paterLayer._yaZhuBtn[key].quYuZhi != self._jieSuanYingQuYu){
									self.jingBiFirstRun(key,key2)
								}
							}
						}else{
							if(self._paterLayer._yaZhuBtn[key].quYuZhi != self._jieSuanYingQuYu){
								self.jingBiFirstRun(key,key2)
							}
						}
					}
				}
			}
		}
		cc.audioEngine.playEffect(Effect_res.BR_jingBi);
		self.cleanJieMianShu(2);
		for(var key in self._paterLayer._yaZhuBtn){
			if(self._jieSuanYingQuYu > 2) {
				if (self._jieSuanYingQuYu <= 5) {
					if(key != 2 && key != self._jieSuanYingQuYu){
						self._paterLayer._yaZhuBtn[key].quYuJingBi.splice(0,self._paterLayer._yaZhuBtn[self._jieSuanYingQuYu].quYuJingBi.length);
					}
				} else {
					if(key != 0 && key != self._jieSuanYingQuYu){
						self._paterLayer._yaZhuBtn[key].quYuJingBi.splice(0,self._paterLayer._yaZhuBtn[self._jieSuanYingQuYu].quYuJingBi.length);
					}
				}
			}else{
				if(key != self._jieSuanYingQuYu){
					self._paterLayer._yaZhuBtn[key].quYuJingBi.splice(0,self._paterLayer._yaZhuBtn[self._jieSuanYingQuYu].quYuJingBi.length);
				}
			}
		}

		if(self._jingBiZu.length > 0 && self._jingBiZhuang.length > 0){
			self.scheduleOnce(function(){
				self._paterLayer.createFeiRuTeXiao(cc.p(746,597),"BR_ZZ_guangQuan.png");
			},0.5);
		}
		if(!self._wuRenYing) {
			self.scheduleOnce(self.jingBiTwo, 1.5);
		}else{
			brc.biBieController.self._paterLayer.setQuShiShu();
		}
	},
	//金币第二此飞逻辑
	jingBiTwo : function(){
		var self = this;
		var rect = self._paterLayer._rootNode.getChildByName("zhuangTouXiang").getPosition();
		if(self._jingBiZhuang.length<100){
			var number = 100 - self._jingBiZhuang.length;
			for(var i = 0 ;i < number;i++){
				var jinBi = brc.jingBiNode.create();
				//jinBi.x =  rect.x + (Math.random()-0.5)*50;
				//jinBi.y = rect.y + (Math.random()-0.5)*50;
				jinBi.x = rect.x;
				jinBi.y = rect.y;
				self._paterLayer._rootNode.addChild(jinBi, 10);
				jinBi.setSpriteFrameImage(2);
				self._jingBiZhuang.push(jinBi);
				self._jingBiZu.push(jinBi);
				jinBi.setVisible(false);
			}
		}
		var spriteAry = self.puanDuanYaZhongZhu(self._paterLayer._yaZhuBtn);
		for(var key in self._jingBiZhuang){
			var number = Math.floor(self._jingBiZhuang.length/spriteAry.length);
			self._jingBiZhuang[key].setSpriteFrameImage(2);
			//zhuangJingBi[key].setVisible(true);
			if(key < number){
				self._jingBiZhuang[key].spriteRunAction(3,spriteAry[0].x,spriteAry[0].y,cc.delayTime(0.005 * key));
				spriteAry[0].quYuJingBi.push(self._jingBiZhuang[key]);
				self._jingBiZhuang[key]._jingBiYaNa = spriteAry[0].quYuZhi;
			}else{
				self._jingBiZhuang[key].spriteRunAction(4,spriteAry[1].x,spriteAry[1].y,cc.delayTime(0.005 * (key-number+1)));
				spriteAry[1].quYuJingBi.push(self._jingBiZhuang[key]);
				self._jingBiZhuang[key]._jingBiYaNa = spriteAry[1].quYuZhi;
			}
		}
		cc.audioEngine.playEffect(Effect_res.BR_jingBi);
		self.scheduleOnce(self.jingBiRunThree,1.5);
	},
	feiRuDongDuo : function(sprite , delayTime ,postion){
		var self = this;
		for(var key in self._paterLayer._zuoWeiArray){
			if(self._paterLayer._zuoWeiArray[key].x == postion.x && self._paterLayer._zuoWeiArray[key].y == postion.y){
				if(self._paterLayer._zuoWeiArray[key]._isYouRen){
					sprite.spriteRunActionWanJia(delayTime,postion);
				}else{
					sprite.spriteRunActionWanJia(delayTime,cc.p(1096,594));
				}
			}else{
				sprite.spriteRunActionWanJia(delayTime,postion);
			}
		}


	},
	//金币第三次飞动作
	jintBuRunThreeZiFangFa : function(number){
		var self = this;
		if(self._paterLayer._yaZhuBtn[number].shuiYaZhu.length > 0){
			var data = self._paterLayer._yaZhuBtn[number].quYuJingBi.length/self._paterLayer._yaZhuBtn[number].shuiYaZhu.length;
			for (var key2 in self._paterLayer._yaZhuBtn[number].quYuJingBi) {
				var number3 = Math.floor(key2 / data);
				if (self._paterLayer._yaZhuBtn[number].shuiYaZhu[number3]) {
					self._paterLayer._yaZhuBtn[number].quYuJingBi[key2].spriteRunActionWanJia(cc.delayTime(0.005 * (key2-data*number3)), self._paterLayer._yaZhuBtn[number].shuiYaZhu[number3]);
				}
			}
		}else{
			for (var key2 in self._paterLayer._yaZhuBtn[number].quYuJingBi) {
					self._paterLayer._yaZhuBtn[number].quYuJingBi[key2].spriteRunActionWanJia(cc.delayTime(0.005 * key2),cc.p(1096,594));
			}
		}
		self.scheduleOnce(function(){
			for(var key3 in self._paterLayer._yaZhuBtn[number].shuiYaZhu ){
				self._paterLayer.createFeiRuTeXiao(self._paterLayer._yaZhuBtn[number].shuiYaZhu[key3],"BR_ZW_guangQuan.png");
			}
		},0.5);
	},
	//金币第三次飞逻辑
	jingBiRunThree : function(){
		var self = this;
		if(self._jieSuanYingQuYu > 2){
			if(self._jieSuanYingQuYu > 5){
				self.jintBuRunThreeZiFangFa(0)
			}else{
				self.jintBuRunThreeZiFangFa(2)
			}
		}
		cc.audioEngine.playEffect(Effect_res.BR_jingBi);
		self.jintBuRunThreeZiFangFa(self._jieSuanYingQuYu);
		self.scheduleOnce(function(){
			brc.biBieController.self._paterLayer.setQuShiShu();
			if(self._shengLiNumber > 0){
				self._userInformation._yuanbao.runAction(cc.sequence(cc.scaleTo(0.15,1.3),cc.delayTime(0.3),cc.scaleTo(0.15,1)));
			}
		},0.5);
		self.scheduleOnce(function(){
			self.chongZhiJieMian();
		},1.5);
	},
	//游戏开始荷官摇骰子
	youXiKaiShi : function( ) {
		var self = this;
		self._paterLayer._BR_heguan.stopAllActions();
		cc.log("==============游戏开始荷官摇骰子============");
		var action = cc.sequence(
			cc.callFunc(function() {
				self._kaiShiNode.setVisible(true);
				self._kaiShiAction.gotoFrameAndPlay(0,30,false);
				self.scheduleOnce(function(){
					cc.audioEngine.playEffect(Effect_res_exist.BR_kaiShi);
				},0.25)

				self.isDianJiDongZuo(false);
			}, this),
			Producer.ProduceFrameAnimation("BR_Second_heguan_yao", 28, 0, 0.10),
			cc.callFunc(function() {
				self._kaiShiNode.setVisible(false);
			}, this)
		);
		this.scheduleOnce(function() {
			cc.audioEngine.playEffect(Effect_res.biBeiYao);
		}, 0.8);
		var	heguanAction1 =	cc.sequence(
					action,
					cc.callFunc(function() {
						self._kaiShiNode.setVisible(false);
						self._paterLayer._BR_heguan.setPositionY(self._heGuanWeiShiY);
						var repeatForMoren = cc.repeatForever(Producer.ProduceFrameAnimation("BR_Second_heguan_mo", 8, 0, 0.2));
						self._paterLayer._BR_heguan.runAction(repeatForMoren);
						self.isDianJiDongZuo(true);
						if(!brc.biBieController.self._isZhuangJia) {
							self._paterLayer.isJingYongBtn(true, 5);
						}
						brc.biBieController.self.schedule(brc.biBieController.self.setYouXiShiJian, 1, cc.REPEAT_FOREVER);
					})
			);
		self._paterLayer._BR_heguan.runAction(heguanAction1);
	},
	//游戏开始逻辑处理
	youXiKaiShiLuoJiChuLi : function(){
		var self = this;
		self._youXiZhuangTai = 3;
		brc.Object._gameInfor.cbGameStatus = 100;
		brc.biBieController.self._isDaoJisShi = false;
		self._paterLayer._youXiShiJianMiao.setVisible(false);
		self._paterLayer._youXiShiJian.setVisible(false);
		brc.biBieController.self.unschedule(brc.biBieController.self.setYouXiShiJian);
	},
	//判断可以下注否
	isDianJiDongZuo : function(isXianShi) {
		var self = this;
		self.jinYongYaZhuQu(isXianShi);
		self._paterLayer.setButtonBrightAndTouchenable(isXianShi, isXianShi, isXianShi);
	},
	//纪录押注区域都谁压过注
	shuiYaZhuZaiYaZhuQu : function (number ,rect){
		var self = this;
		if(self._paterLayer._yaZhuBtn[number].shuiYaZhu.length == 0){
			self._paterLayer._yaZhuBtn[number].shuiYaZhu.push(rect);
		}else{
			for(var key in self._paterLayer._yaZhuBtn[number].shuiYaZhu){
				if(self._paterLayer._yaZhuBtn[number].shuiYaZhu[key].x == rect.x && self._paterLayer._yaZhuBtn[number].shuiYaZhu[key].y == rect.y){
					return;
				}
				if(key == (self._paterLayer._yaZhuBtn[number].shuiYaZhu.length - 1)){
					self._paterLayer._yaZhuBtn[number].shuiYaZhu.push(rect);
				}
			}
		}
	},
	//无座玩家押注逻辑
	wuZuoYaZhu : function(data){
		var self = this;
		for(var key in data.lJettonScore){
			if(data.lJettonScore[key]){
				self._paterLayer._zongYaZhuAry[key].setVisible(true);
				var number1 =Number( self._paterLayer._zongYaZhuAry[key].getString())+data.lJettonScore[key];
				self._paterLayer.setZongYaZhuShu(key,number1);
				var menoyNumber = [];
				if(data.lJettonScore[key] <= 10000){
					menoyNumber = [3,1];
				}
				if(data.lJettonScore[key] > 10000 && data.lJettonScore[key] <= 100000){
					menoyNumber = [3,2];
				}
				if(data.lJettonScore[key] > 100000 && data.lJettonScore[key] <= 1000000){
					menoyNumber = [5,2];
				}
				if(data.lJettonScore[key] > 1000000){
					menoyNumber = [3,3];
				}
				self.creatJinBi(key,cc.p(1096,594),menoyNumber);
				self.shuiYaZhuZaiYaZhuQu(key,cc.p(1096,594));
			}
		}
	},
	//押注成功的调用的方法
	yaZhuChengGong : function(data) {
		var self = this;
			var selfNumber = brc.shuZuChaZhao(1, brc.Object._yongHuXinXi, data.wChairID) || null;
			var teShuNumber = brc.shuZuChaZhao(1, brc.Object._teShuZuoWeiWanJia, data.wChairID) || null;
			var wuZuoWanJia = brc.shuZuChaZhao(1, brc.Object._wuZuoWeiWanJia, data.wChairID) || null;
			self._nowBet = data.lJettonScore;
			self._paterLayer._zongYaZhuAry[data.cbJettonArea].setVisible(true);
			if(selfNumber.dwUserID == USER_dwUserID){
				self._jingBiRect.x = 100;
				self._jingBiRect.y = 47;
				self._yaZhuCiShu++ ;
				self.gengGaiYuanBao(1, data.lJettonScore);
				self.creatJinBi(data.cbJettonArea,self._jingBiRect );
				var number =Number( self._paterLayer._selfYaZhuAry[data.cbJettonArea].getString())+data.lJettonScore;
				self._paterLayer._selfYaZhuAry[data.cbJettonArea].setString(number);
				self._paterLayer._selfYaZhuDi[data.cbJettonArea].setVisible(true);
				self._paterLayer._selfYaZhuAry[data.cbJettonArea].setVisible(true);
				if(self._isShangZuo){
					var number1 =Number( self._paterLayer._zongYaZhuAry[data.cbJettonArea].getString())+data.lJettonScore;
					self._paterLayer.setZongYaZhuShu(data.cbJettonArea,number1);
				}
			}else if(teShuNumber){
				for ( var key in self._paterLayer._zuoWeiArray) {
					if(self._paterLayer._zuoWeiArray[key]._wSpChairID == teShuNumber.wSpChairID){
						self._jingBiRect.x = self._paterLayer._zuoWeiArray[key].x;
						self._jingBiRect.y = self._paterLayer._zuoWeiArray[key].y;
						self._paterLayer._zuoWeiArray[key]._dangJuYaZhu = self._paterLayer._zuoWeiArray[key]._dangJuYaZhu + data.lJettonScore;
					}
				}
				self._paterLayer._yaZhuBtn[data.cbJettonArea].yaZhuShu = self._paterLayer._yaZhuBtn[data.cbJettonArea].yaZhuShu + data.cbJettonArea;
				var number1 =Number( self._paterLayer._zongYaZhuAry[data.cbJettonArea].getString())+data.lJettonScore;
				self._paterLayer.setZongYaZhuShu(data.cbJettonArea,number1);
				self.creatJinBi(data.cbJettonArea,self._jingBiRect);
			}else if(wuZuoWanJia){
				self._jingBiRect.x = 1096;
				self._jingBiRect.y = 594;
			}
			self.shuiYaZhuZaiYaZhuQu(data.cbJettonArea,cc.p(self._jingBiRect.x,self._jingBiRect.y));
	},
	//下注失败
	xiaZhuShiBai : function(data){
		var self = this;
		var selfNumber = brc.shuZuChaZhao(1, brc.Object._yongHuXinXi, data.wPlaceUser) || null;
		if(selfNumber.dwUserID != USER_dwUserID){
			var number =Number( self._paterLayer._zongYaZhuAry[data.lJettonArea].getString())-data.lPlaceScore;
			self._paterLayer.setZongYaZhuShu(data.lJettonArea,number);
        }else{
        	shortTips.create({cueStr : "下注失败！",percentPosition : cc.p(0.5,0.5)});
        }		
	},
	//创建飞上数字
	createFeiShangShuZi : function(number,rect){
		var self = this;
		var data = Producer.formatShortNumber_piao(number)
		var jingE = cc.LabelBMFont("+"+data,"res/br_res/ziTiZiYuan/zuoWeiPiao.fnt");
		jingE.setScale(0.2)
		jingE.x = rect.x;
		jingE.y = rect.y;
		self._paterLayer._rootNode.addChild(jingE,200);
		jingE.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.3,0.7),cc.moveBy(1,cc.p(0,55))),cc.delayTime(0.5),cc.callFunc(function(){
			cc.fadeOut(0.3);
		})));
		self.scheduleOnce(function(){
			self._paterLayer._rootNode.removeChild(jingE);
		},1.8);
	},
	//更改元宝的信息
	gengGaiYuanBao : function(type ,fengShu,zhuangFeng,zuoWeiAry,dianShu) {
		var self = this;
		if(type == 1){
			USER_lUserScore = USER_lUserScore - fengShu;
		}else if(type == 2){
			brc.Object._userInfor.lUserScore = brc.Object._userInfor.lUserScore + fengShu;
			if(brc.Object._userInfor.lUserScore > USER_lUserScore){
                self._isShengLi = true;
				self._shengLiNumber = brc.Object._userInfor.lUserScore - USER_lUserScore;
			}
			USER_lUserScore =  brc.Object._userInfor.lUserScore;
			brc.Object._zhuangInfor.lScore = brc.Object._zhuangInfor.lScore + zhuangFeng ;
			if(!self._paterLayer._isXiTong){
				var str1 = "";
				str1 = Producer.BR_formatShortNumber(brc.Object._zhuangInfor.lScore,true);
				self._paterLayer._zhuangjiaxiazhu.setString(str1);
			}
			self.scheduleOnce(function(){//上座玩家赢分座位上显示的效果
				for ( var key in zuoWeiAry) {
					if(key < 6){
						for ( var key1 in self._paterLayer._zuoWeiArray) {
							if(key == self._paterLayer._zuoWeiArray[key1]._wSpChairID){
								if(zuoWeiAry[key] != 0 || self._paterLayer._zuoWeiArray[key1]._dangJuYaZhu != 0){
									if(self._paterLayer._zuoWeiArray[key1]._data){
										var number = self._paterLayer._zuoWeiArray[key1]._data.lScore+zuoWeiAry[key];
										self._paterLayer._zuoWeiArray[key1]._fengShu.setString(Producer.BR_formatShortNumber(number));
										if(self._paterLayer._zuoWeiArray[key1]._data.dwUserID == USER_dwUserID){
											if(self._shengLiNumber > 0){
												self.createFeiShangShuZi(self._shengLiNumber,self._paterLayer._zuoWeiArray[key1].getPosition());
											}
										}else{
											var number2 = self._paterLayer._zuoWeiArray[key1]._dangJuYaZhu + zuoWeiAry[key];
											if(number2 > 0){
												self.createFeiShangShuZi(number2,self._paterLayer._zuoWeiArray[key1].getPosition());
											}
										}
									}
								}
							}
						}
					}
				}
			},4.0);

			var zongDianShu = dianShu[0]+dianShu[1];
			var data;
			if(dianShu[0] ==  dianShu[1]){
				data = dianShu[0] + 2;
			}else{
				if(zongDianShu < 7){
					data =  brc.BetArea.ID_SMALL_AREA;
				}else if(zongDianShu == 7){
					data =  brc.BetArea.ID_DRAW_AREA;
				}else if(zongDianShu > 7){
					data =  brc.BetArea.ID_BIG_AREA;
				}
			}
			self._jieSuanYingQuYu = data;
			var array = self.puanDuanYaZhongZhu(self._paterLayer._zongYaZhuAry);
			if(array.length > 0){
				self._wuRenYing = false;
			}else{
				self._wuRenYing = true;
			}
		}
		var number = USER_lUserScore;
		var str = Producer.changeNumberToString(number);
		self._userInformation._yuanbao.setString(str);
	},
	//判断那个区域赢并返回赢区域的信息
	puanDuanYaZhongZhu : function (array) {
		var self = this;
		var spriteAry = [];
		if(self._jieSuanYingQuYu > 2){
			if(self._jieSuanYingQuYu <= 5){
				if(self._paterLayer._zongYaZhuAry[2].getString() != ""){
					spriteAry.push(array[2]);
				}
			}else{
				if(self._paterLayer._zongYaZhuAry[0].getString() != ""){
					spriteAry.push(array[0]);
				}
			}
		}
		if(self._paterLayer._zongYaZhuAry[self._jieSuanYingQuYu].getString() != ""){
			spriteAry.push(array[self._jieSuanYingQuYu]);
		}
		return spriteAry;
	},
	//押注大小的点击事件
	yaZhuBtnClick : function(self) {
		var string ;
		if(!self._yaZhuJiaoHu){
			if(self._yaZhuCiShu < brc.Object._xiaZhuCiShu){
				if(self._youXiZhuangTai == 3){
					if(self._paterLayer._dangQianXiaFeng){
						if(USER_lUserScore >= self._paterLayer._dangQianXiaFeng){
							var type;
							type = brc.btnTag - 505;
							//判断下注区域金币是否已经达到上限
							if(!brc.biBieController.self._isZhuangJia){
								self._yaZhuJiaoHu = true;
								self.scheduleOnce(function(){
									self._yaZhuJiaoHu = false;
								},0.1)
								gameSever.sendMessage(brc.SUB_S_GAME  ,brc.SUB_C_PLACE_JETTON	,{cbJettonArea : type,lJettonScore : self._paterLayer._dangQianXiaFeng},BRCBIBEI);//用户下注200，1
							}
						}else{
							var number = USER_lUserScore + USER_lUserInsure;
							if(number>2000){
								isAuto = false;
								var xinxi = {Describe : USER_lUserInsure,errorCode : 8,isBack : false};//弹出充值框
								var tishi = TiShiKuangZiDingYi.create(xinxi);
								cc.director.getRunningScene().addChild(tishi,1000);
							}else{
								string = "好汉，您的当前余额不足，无法押注！";
								shortTips.create({cueStr :string,percentPosition : cc.p(0.5,0.5)});
							}
						}
					}
				}
			}else{
				string = "本局最多可押"+brc.Object._xiaZhuCiShu+"次哦~";
				shortTips.create({cueStr :string,percentPosition : cc.p(0.5,0.5)});
			}
		}

	},
	//禁止押注区域
	jinYongYaZhuQu : function(Bool ) {
		var self = this;
		for(var key in self._paterLayer._yaZhuBtn){
			self._paterLayer._yaZhuBtn[key].setBright(Bool);
			self._paterLayer._yaZhuBtn[key].setTouchEnabled(Bool);
			self._paterLayer._yaZhuBtn[key].setVisible(Bool);
		}
	},
	//创建金币
	creatJinBi : function(naZhu,Rect,data) {
		var self = this;
		var type ;
		var number ;
		if(data && data.length > 0){
			number = data[0];
			type = data[1];
		}else{
			if(self._nowBet){
				if(self._nowBet >= 100 && self._nowBet < 1000){
					type = 1;
					number = self._nowBet/100;

				}else if(self._nowBet >= 1000&& self._nowBet < 100000){
					type = 2;
					number = self._nowBet/1000;
					number = number/3;
				}else if(self._nowBet >= 100000){
					type = 3;
					number = self._nowBet/100000;
				}
			}
		}
		cc.audioEngine.playEffect(Effect_res.BR_jingBi);
		for(var i =0 ; i < number ; i++){
			var jinBi = brc.jingBiNode.create();
			jinBi.x = Rect.x;
			jinBi.y = Rect.y;
			jinBi._jingBiYaNa = naZhu;
			self._paterLayer._rootNode.addChild(jinBi, 10);
			jinBi.setSpriteFrameImage(type);
			var sprite;
			sprite = self._paterLayer._yaZhuBtn[naZhu];
			if(naZhu <= 2){
				jinBi.spriteRunAction(3,sprite.x, sprite.y+20,cc.delayTime(0.05*(i+1)));
			}else{
				jinBi.spriteRunAction(4,sprite.x, sprite.y,cc.delayTime(0.05*(i+1)));
			}
			self._paterLayer._yaZhuBtn[naZhu].quYuJingBi.push(jinBi);
			self._jingBiZu.push(jinBi);
		}
	},
	faFuQinKongShuZu : function(){
		var self = this;
		brc.cleanArray.push(self._jingBiZu);
	},
	//清理界面上的数组
	cleanJieMianShu : function(type){
		var self = this;
		if(type == 1){
			self._paterLayer.setZongYaZhuShu("","",[0,0,0,0,0,0,0,0,0]);
			for ( var key in self._paterLayer._selfYaZhuAry) {
				self._paterLayer._selfYaZhuAry[key].setString("");
				self._paterLayer._selfYaZhuDi[key].setVisible(false);
			}
		}else{
			for ( var key in self._paterLayer._selfYaZhuAry) {
				self._paterLayer._selfYaZhuAry[key].setVisible(false);
				self._paterLayer._selfYaZhuDi[key].setVisible(false);
			}
			for ( var key in self._paterLayer._zongYaZhuAry) {
				self._paterLayer._zongYaZhuAry[key].setVisible(false);
			}
		}

	},
	//游戏清空界面
	chongZhiJieMian : function() {
		var self =this;
		for(var key in self._jingBiZu){
			cc.pool.putInPool(self._jingBiZu[key]);
		}
		self._jingBiZu.splice(0,self._jingBiZu.length);
		self._jingBiZhuang.splice(0,self._jingBiZhuang.length);
		for ( var key in self._paterLayer._yaZhuBtn) {
			self._paterLayer._yaZhuBtn[key].quYuJingBi.splice(0,self._paterLayer._yaZhuBtn[key].quYuJingBi.length);
			self._paterLayer._yaZhuBtn[key].shuiYaZhu.splice(0,self._paterLayer._yaZhuBtn[key].shuiYaZhu.length);
		}
		for ( var key in self._paterLayer._zuoWeiArray) {
			self._paterLayer._zuoWeiArray[key]._dangJuYaZhu = 0;
		}
		self.jinYongYaZhuQu(false);
		self._isHeGuanShuoHua = false;
		self._wuRenYing = false;
		self._isShengLi = false;
		self._yaZhuCiShu = 0;
		self._shengLiNumber = 0;
		self._yaZhuJiaoHu = false;
		self._kaiShiNode.setVisible(false);
		brc.biBieController.self._paterLayer.setShaiZi("", false);
		self.cleanJieMianShu(1);
		for (var key in self._paterLayer._teXiaoNode){
			self._paterLayer._rootNode.removeChild(self._paterLayer._teXiaoNode[key]);
		}
		self._jieSuanYingQuYu = 0;
		self._paterLayer._teXiaoNode.splice(0,self._paterLayer._teXiaoNode.length);
	},
	//无座玩家的信息刷新
	updateWuZuoPlayer : function() {
		var self =this;
		if(self._paterLayer._wuzuo && self._paterLayer._wuzuo._isWuoZuoOpen){
			self._paterLayer._wuzuo.createWuZuoPlayer();
		}
		//如果是自己取消座位，则不可发表情
		self._paterLayer.checkIsSelfOut();
	},
	onEnterTransitionDidFinish : function(){
		this._super();
	},
	//趋势
	updateQuShi : function(){
		if(brc.qushi._isQuShiOpen){
			brc.qushi.addQushi();
		}
	},
	
	//背景音乐，第一次结束后，隔2分钟，再次播放一次
	repeatPlayeMusic : function() {
		var self = this;
		cc.audioEngine.playMusic(self._musicPath, false);
	},
})

