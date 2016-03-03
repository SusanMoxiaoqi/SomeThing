var brc = brc || {};
brc.zuoWeiNode = cc.Node.extend({
	_zuoWei_btn : null,
	_isYouRen : false,
	_wSpChairID : 0,
	_touXiangSprite : null,
	_fengShu : null,
	_dangJuYaZhu : 0,
	_data : null,//当前上坐的信息
	_diKuang : null,
	_guangXiao : null,
	_isSelf : false,
	_ZW_diKuang : null,
	_ZW_guangXiao : null,
	_isFirstShan : false,
	_zuoWeiVip : null,
	_VIP : 0,
	_tiShiTiao : null,
	_tiShiIsShow : false,
	ctor : function(Data) {
		this._super();
		brc.zuoWeiNode.self = this;
		this.init();
	},
	//初始化
	init : function() {
		var self = this;
		self._ZW_diKuang = cc.Sprite.createWithSpriteFrameName("BR_zuoXiaDi.png");
		self.addChild(self._ZW_diKuang, 0, 10);
		var action1 = cc.fadeOut(1);
		var action1Back = action1.reverse();
		self._zuoWei_btn  = ccui.Button("BR_wanJiaDi.png","BR_wanJiaDi.png","",ccui.Widget.PLIST_TEXTURE) ;
		self._zuoWei_btn.x = 0;
		self._zuoWei_btn.y = 0;
		self.addChild(self._zuoWei_btn, 0, 1);
		brc.btnDianJI(self._zuoWei_btn ,self.touXiangBtn,self);
		self._touXiangSprite = cc.Sprite.createWithSpriteFrameName(touXiangFrame[0]);
		self._touXiangSprite.setScale(0.55);
		self._touXiangSprite.anchorX = 0.5;
		self._touXiangSprite.anchorY = 0.5;
		self._touXiangSprite.x = 36;
		self._touXiangSprite.y = 55;
		self._zuoWei_btn.addChild(self._touXiangSprite,1,10);
		self._fengShu = cc.LabelTTF("25000","Arial",18);
		self._fengShu.x = 35;
		self._fengShu.y = 13;
		self._zuoWei_btn.addChild(self._fengShu,1,11);
		self._touXiangSprite.setVisible(false);
		self._fengShu.setVisible(false);
		self._zuoWeiVip = cc.Sprite.createWithSpriteFrameName("BR_V1.png");
		self._zuoWeiVip.x = 20;
		self._zuoWeiVip.y = 70;
		self._zuoWei_btn.addChild(self._zuoWeiVip,2);
		self._zuoWeiVip.setVisible(false);
		self._guangXiao = cc.Sprite.createWithSpriteFrameName("BR_zuoxia_3.png");
		self._guangXiao.setVisible(false);
		self.addChild(self._guangXiao,10);

	},
	createXiaoXiTiao : function(){
		var self = this;
		self._tiShiTiao = cc.Sprite.createWithSpriteFrameName("BR_zuoWeiTiShiTiao.png");
		if(self._wSpChairID > 2){
			self._tiShiTiao.x = self.x - 190;
			self._tiShiTiao.y = self.y + 30;
		}else{
			self._tiShiTiao.x = self.x + 190;
			self._tiShiTiao.y = self.y + 30;
			self._tiShiTiao.flippedX = 180;
		}
		brc.biBieController.self._paterLayer.addChild(self._tiShiTiao , 100);
		self._tiShiYu = cc.LabelTTF("","Arial",16);
		self._tiShiYu.x = self._tiShiTiao.width/2;
		self._tiShiYu.y = self._tiShiTiao.height/2;
		self._tiShiTiao.addChild(self._tiShiYu,1,11);
		self._tiShiYu.setColor(cc.color.BLACK);
		self._tiShiTiao.setVisible(false);
	},
	showTiShiTiao : function(string){
		var self = this;
		self._tiShiIsShow = true;
		self._tiShiTiao.setVisible(true);
		self._tiShiYu.setString(string);
		self.scheduleOnce(function(){
			var self = this;
			self._tiShiIsShow = false;
			self._tiShiTiao.setVisible(false);
		},2);
	},
	setSelfAction : function(hide) {
		var self = this;
		//self._diKuang.setVisible(hide);
		self._guangXiao.setVisible(hide);
		if(hide){
			var action = cc.repeatForever(Producer.ProduceFrameAnimation("BR_zuoxia_", 3, 11, 0.2));
			self._guangXiao.runAction(action);
		}else{
			self._guangXiao.stopAllActions();
		}

	},
	//点击头像btn触发事件
	touXiangBtn : function(self) {
		var string = "";
		if(!self._tiShiIsShow){
			if(!self._isYouRen){
				if(brc.biBieController.self._isZhuangJia){
					string = "好汉，若想上座，请先下庄。";
					self.showTiShiTiao(string);
					//shortTips.create({cueStr :string,percentPosition : cc.p(0.5,0.75)});
				}else{
					if(!brc.biBieController.self._isShangZuo){
						if( USER_wMemOrder >=1){
							if(USER_lUserScore >= brc.Object._userInfor.lApplySpChairCondition){
								if(brc.biBieController.self._shangZuoShiJian == 30 || brc.biBieController.self._shangZuoShiJian == 0){
									var number =  brc.shuZuChaZhao(2, brc.Object._yongHuXinXi, USER_dwUserID);
									gameSever.sendMessage(brc.SUB_S_GAME,brc.SUB_C_APPLY_SPCHAIR,{wApplyUser:number.wChairID , wSpChairID : self._wSpChairID},BRCBIBEI);//申请座位200，7
								}else{
									string = "换座时间为30秒哦~";
									self.showTiShiTiao(string);
								}
							}else{
								var limtCount = 0;
								if(brc.Object._userInfor.lApplySpChairCondition>=10000){
									limtCount = Math.floor(brc.Object._userInfor.lApplySpChairCondition/10000);
									string = "好汉，最低需要"+limtCount+"万才能上座哦~";
								}else{
									string = "好汉，最低需要"+brc.Object._userInfor.lApplySpChairCondition+"才能上座哦~";
								}
								self.showTiShiTiao(string);
							}
						}else{
							string = "好汉，这是VIP座位哦~";
							self.showTiShiTiao(string);
						}

					}else{
						if(brc.biBieController.self._shangZuoShiJian == brc.Object._shangZuoShiJian){
							gameSever.sendMessage(200,18,{wSpChairID :brc.biBieController.self._selfSpChairID },BRCBIBEI);
							var number =  brc.shuZuChaZhao(2, brc.Object._yongHuXinXi, USER_dwUserID);
							gameSever.sendMessage(brc.SUB_S_GAME,brc.SUB_C_APPLY_SPCHAIR,{wApplyUser:number.wChairID , wSpChairID :self._wSpChairID},BRCBIBEI);//申请座位200，7
						}else{
							string = "换座时间为"+brc.Object._shangZuoShiJian+"秒哦~";
							self.showTiShiTiao(string);
						}
					}
				}
			}else{
				if(self._isSelf){//点击自己的头像，弹出表情框
					if(!brc.biBieController.self._paterLayer._biaoqingBool){
						brc.biBieController.self._paterLayer.addBiaoQingKuang(self._wSpChairID);
					}
				}else{//点击别人头像弹出别人资料界面
					var rect ;
					var type;
					switch (self._wSpChairID){
						case 0:case 1:case 2:
						rect = cc.p(self.x + 170,self.y);
						type = 0;
						break;
						case 3:case 4:case 5:
						rect = cc.p(self.x - 170,self.y);
						type = 1;
						break;
						default :
							break;
					}
					brc.biBieController.self._paterLayer.addGeRenZiLiao(type ,rect,self._data);
				}
			}
		}
	},
	//更改座位的btn状态
	setBtnType : function() {
		var self = this;
		if(self._isYouRen){
			if(self._isSelf){
				self._zuoWei_btn.loadTextures("BR_ziJiKuang.png","BR_ziJiKuang.png","",ccui.Widget.PLIST_TEXTURE) ;
			}else{
				self._zuoWei_btn.loadTextures("BR_zuoXiaDi.png","BR_zuoXiaDi.png","",ccui.Widget.PLIST_TEXTURE) ;
			}
		}else{
			self._zuoWei_btn.loadTextures("BR_zuoXiaDa.png","BR_zuoXiaXiao.png","",ccui.Widget.PLIST_TEXTURE);
		}
	},
	creatYanWuXiaoGuo : function(){
		var self = this;
		var sprite = cc.Sprite.createWithSpriteFrameName("BR_SZ_yan00.png");
		sprite.runAction(cc.sequence(Producer.ProduceFrameAnimation("BR_SZ_yan", 6, 0, 0.1),cc.callFunc(function(){
			sprite.runAction(cc.fadeOut(0.2));
			self.removeChild(sprite);

		})));
		self.addChild(sprite,100);
	},
	//上座成功或这下座成功调用
	setTuPian : function(_isShangZuo , data) {
		var self = this;
		if(_isShangZuo){
			if(!self._isYouRen){
				self.creatYanWuXiaoGuo();
			}
			self._data = data;
			self._touXiangSprite.setVisible(true);
			self._fengShu.setVisible(true);
			self._touXiangSprite.setSpriteFrame(touXiangFrame[self._data.wFaceID]);
			self._fengShu.setString(Producer.BR_formatShortNumber(self._data.lScore));
			//当前上坐的信息
			self._zuoWeiVip.setVisible(true);

			if(data.cbMemberOrder){
				self._VIP = data.cbMemberOrder;
				self._zuoWeiVip.setSpriteFrame("BR_V"+self._VIP%10+".png")
			}
			if(self._data.dwUserID == USER_dwUserID){//点击自己的头像，弹出表情框
				by.utils.SocketManager.log(data);
				cc.log("^^^^^^^^^^^^");
				by.utils.SocketManager.log(self._data);
				self._isSelf = true;
			}
		}else{
			self._touXiangSprite.setVisible(false);
			self._fengShu.setVisible(false);
			self._zuoWeiVip.setVisible(false);
			self._data = null;
			self._VIP = 0;
			if(self._isSelf){
				self._isSelf = false;
				//self.setSelfAction(false);
			}
		}
	},
	onExit : function() {
		this._super();
	}
}); 

