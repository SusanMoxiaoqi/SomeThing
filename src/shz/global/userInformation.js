
/**这个文件主要记录玩家的个人信息*/
var USER_wFaceID = 0;
var USER_cbGender = '';
var USER_dwUserID = 0;
var USER_dwGameID = 0;
var USER_dwExperience = 0;//经验值总数
var USER_dwLoveLiness = 0;
var USER_lUserScore = 0;
var USER_szNickName = "";
var USER_szPassword = "";
var USER_lLottery = 0;//用户奖券
var USER_lUserInsure = 0;//银行银两
var USER_wMemOrder = 0;//VIP等级
var USER_zhangHao = "";//账号
var USER_HaveReward = "";//排行榜奖励标示
var USER_HaveMail = "";//是否有邮件消息
var USER_HaveQiandao = false ;// 是否有签到
var USER_HaveLiBao = false ;//是否有礼包
var USER_ZhouJiangLi = 0;

UserInformation = cc.Node.extend({
	_touxiangBtn : null,
	_touxiang : null,
	_nickname : null,
	_niCheng : null,
	_yuanbao : null,
	_Dating_yuanbao : null,
	_jiahaoBtn : null,
	_datingID : null,
	_gameID : null,
	_Dating_jiangquan : null,
	_jiangquan : null,
	_duihuanBtn : null,
	_userVIP : null,
	_changjing :0,
	_shanShuo : null,
	_changjing : -1,//区分不同的场景
	_self : null,
	ctor : function(changjing) {
		this._super();
		this._changjing = changjing;
		this._self = this;
		var rootNode = ccs.load("res/shz/TanChuCeng/touXiangVip.json").node;
		this.addChild(rootNode);
		this._touxiangBtn = rootNode.getChildByName("touxiangBtn");
		this._touxiangBtn.tag = 80;
		this._touxiangBtn.addTouchEventListener(this.buttonClick,this);

		this._touxiang = this._touxiangBtn.getChildByName("touxiang");
		this._touxiang.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(touXiangFrame[USER_wFaceID]));
		this._nickname = rootNode.getChildByName("nickname_3");
		this._niCheng = rootNode.getChildByName("niCheng");
		this._niCheng.setString(USER_szNickName.toString());
		this._yuanbao = rootNode.getChildByName("yuanbao");
		cc.log("WWWWWWWWWWWWWWWWWWWWW显示分数",USER_lUserScore);
		this._yuanbao.setString(Producer.changeNumberToString(USER_lUserScore));
		this._Dating_yuanbao = rootNode.getChildByName("DaTing_yuanbao");
		this._jiahaoBtn = rootNode.getChildByName("jiahaoBtn");
		this._jiahaoBtn.tag = 81;
		this._jiahaoBtn.addTouchEventListener(this.buttonClick,this);

		this._datingID = rootNode.getChildByName("datingID");
		this._gameID = rootNode.getChildByName("gameID");
		this._gameID.setString(USER_dwGameID.toString());
		this._Dating_jiangquan = rootNode.getChildByName("DaTing_jiangquan");
		this._jiangquan = rootNode.getChildByName("jiangquan");
		this._jiangquan.setString(Producer.changeNumberToString(USER_lLottery));
		this._duihuanBtn = rootNode.getChildByName("duihuanBtn");
		this._duihuanBtn.tag = 82;
		this._duihuanBtn.addTouchEventListener(this.buttonClick,this);

		this._userVIP = rootNode.getChildByName("userVIP");
		this._userVIP.tag = 83;
		this._userVIP.loadTextures(VIPS[USER_wMemOrder], VIPS[USER_wMemOrder], VIPS[USER_wMemOrder], ccui.Widget.PLIST_TEXTURE);
		this._userVIP.addTouchEventListener(this.buttonClick,this);


		this._jiahaoBtn.setLocalZOrder(1);
		this._duihuanBtn.setLocalZOrder(1);
		
		this.quFenChangJing(changjing);
		
		TouXiangSp = this._touxiang;
		YuanBaoSp = this._yuanbao;
		NiChengSp = this._niCheng;
		GameIDSp = this._gameID;
		JiangQuanSp = this._jiangquan;
		VipSp = this._userVIP;
		
		return true;
	},
	buttonClick : function(send,type) {
		switch (type) {
		case ccui.Widget.TOUCH_BEGAN:
			isTanChuCeng =false;


		case ccui.Widget.TOUCH_MOVED:

			break;
		case ccui.Widget.TOUCH_ENDED:

			if(!isTanChuCeng){
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				isTanChuCeng =true;
				switch (send.getTag()) {
				
				case 80://头像
					if(this._self._changjing!=4){
						touXiang.creatTouXiangLayer(cc.director.getRunningScene());
					}else{//百人场弹出连胜与连败界面
						brc.biBieController.self._paterLayer.updateSelfMsg();
					}
					
					break;
				case 81://加号
					ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
					break;
				case 82://兑换
					shangCheng.creatChongZhiLayer(cc.director.getRunningScene());
					break;
				case 83://userVIP
					ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
//					ChongZhi._vipNode.y = 320;
//					ChongZhi._chongzhiNode.y = 1320;
					break;
				default:
					break;
				}
				break;
			}

			break;
		default:
			break;
		}


	},
	//传入的changjing参数代表不同的场景，0 ： 大厅、1 ：老虎机界面、2 ： 比倍界面、3 ：对酒界面、4 ：百人场界面
	quFenChangJing : function(changjing) {
		this._changjing = changjing;
		switch (changjing) {
		case 0:
			this._yuanbao.setVisible(false);
			var posY = this._yuanbao.getPosition();
			var str = Producer.changeNumberToString(USER_lUserScore);
			this._yuanbao = new cc.LabelBMFont(str,"res/shz/TanChuCeng/tanChuCengRes/number_shz.fnt");
			this._yuanbao.setBoundingWidth(160);
			this._yuanbao.setAlignment(cc.TEXT_ALIGNMENT_LEFT);
			
			this._yuanbao.setPosition(posY.x-18, posY.y+3);
			this.addChild(this._yuanbao);
			
			this._jiangquan.setVisible(false);
			var posJ = this._jiangquan.getPosition();
			var str = Producer.changeNumberToString(USER_lLottery);
			this._jiangquan = new cc.LabelBMFont(str,"res/shz/TanChuCeng/tanChuCengRes/number_shz.fnt");
			this._jiangquan.setPosition(posJ.x-20, posJ.y+3);
			this.addChild(this._jiangquan);
			this._touxiang.getChildByName("touxiang_xiaobanshou_2").setVisible(true);
			break;
		case 1:
			this._datingID.setVisible(false);
			this._Dating_yuanbao.setVisible(false);
			this._Dating_jiangquan.setVisible(false);
			//this._jiangquan.setVisible(false);
			this._jiangquan.setPosition(190,597);
			this._jiangquan.setColor(cc.color(255, 255, 255, 255));
			this._nickname.setVisible(false);
			this._niCheng.setVisible(false);
			this._duihuanBtn.setVisible(false);
			this._touxiangBtn.setScale(0.85);
			this._touxiangBtn.setPosition(73,49.5);
			this._gameID.setPosition(262.5,70.5);
			this._gameID.setColor(cc.color(255, 255, 255, 255))
			this._yuanbao.setVisible(false);
			var str = Producer.changeNumberToString(USER_lUserScore);
			this._yuanbao = new cc.LabelBMFont(str,"res/shz/TanChuCeng/tanChuCengRes/number_shz.fnt");
			this._yuanbao.setPosition(278, 30.5)
			this.addChild(this._yuanbao);
		
	
			
			this._jiahaoBtn.setPosition(390.5,29.5);
			this._userVIP.setPosition(360,70.5);
			this._touxiang.getChildByName("touxiang_xiaobanshou_2").setVisible(true);
			break;
		case 2:
			this._datingID.setVisible(false);
			this._Dating_yuanbao.setVisible(false);
			this._Dating_jiangquan.setVisible(false);
			this._jiangquan.setVisible(false);
			this._nickname.setVisible(false);
			this._niCheng.setVisible(false);
			this._duihuanBtn.setVisible(false);
			this._jiahaoBtn.setVisible(false);
			this._touxiangBtn.setScale(0.85);
			this._touxiangBtn.setPosition(103,49.5);
			this._gameID.setPosition(302.5,72);
			this._gameID.setColor(cc.color(255, 255, 255, 255))
			this._yuanbao.setVisible(false);
			var str = Producer.changeNumberToString(USER_lUserScore);
			this._yuanbao = new cc.LabelBMFont(str,"res/shz/MainGameScene/MoneyNumber.fnt");
			this._yuanbao.setPosition(325, 30.5)
			this.addChild(this._yuanbao);		
			this._userVIP.setPosition(400,72);
			this._touxiang.getChildByName("touxiang_xiaobanshou_2").setVisible(true);
			break;
		case 3:
			this._datingID.setVisible(false);
			this._Dating_yuanbao.setVisible(false);
			this._Dating_jiangquan.setVisible(false);
			this._jiangquan.setVisible(false);
			this._nickname.setVisible(false);
			this._niCheng.setVisible(false);
			this._duihuanBtn.setVisible(false);
			this._jiahaoBtn.setVisible(false);
			this._touxiangBtn.setScale(0.85);
			this._touxiangBtn.setPosition(80,49.5);
			this._gameID.setPosition(200,72);
			this._gameID.setColor(cc.color(255, 255, 255, 255))
			this._yuanbao.setVisible(false);
			var str = Producer.changeNumberToString(USER_lUserScore);
			this._yuanbao = new cc.LabelBMFont(str,"res/shz/MainGameScene/MoneyNumber.fnt");
			this._yuanbao.setPosition(200, 30.5);
			this.addChild(this._yuanbao);		
			this._userVIP.setPosition(300,72);
			this._touxiang.getChildByName("touxiang_xiaobanshou_2").setVisible(true);
			break;
		case 4:
			this._datingID.setVisible(false);
			this._Dating_yuanbao.setVisible(false);
			this._Dating_jiangquan.setVisible(false);
			this._jiangquan.setVisible(false);
			this._nickname.setVisible(false);
			this._duihuanBtn.setVisible(false);
			this._jiahaoBtn.setVisible(false);
			this._touxiangBtn.setVisible(false);
			this._touxiangBtn.setPosition(80,49.5);
			this._gameID.setVisible(false);
			this._niCheng.setVisible(true);
			this._niCheng.setPosition(198,62);
			this._niCheng.setColor(cc.color(255, 255, 255, 255));
			this._yuanbao.setVisible(false);
			var str = Producer.changeNumberToString(USER_lUserScore);
			var jiaHao = ccui.Button("BR_jia2.png","BR_jia2.png","",ccui.Widget.PLIST_TEXTURE);
			jiaHao.setPosition(353, 44);
			this.addChild(jiaHao,10,81);
			jiaHao.addTouchEventListener(this.buttonClick,this);
			this._yuanbao = new cc.LabelBMFont(str,"res/shz/TanChuCeng/tanChuCengRes/number_shz.fnt");
			this._yuanbao.setPosition(211, 26);
			this.addChild(this._yuanbao);		
			this._userVIP.setPosition(290,62);
			this._touxiang.getChildByName("touxiang_xiaobanshou_2").setVisible(false);//隐藏小扳手的代码
			break;
		default:
			break;
		}
	},
	//老虎机界面收分会有一个特效
	shoufenTexiao : function() {
		if (this._changjing != 1) {
			return;
		}
		
		YuanBaoSp.runAction(cc.sequence(
				cc.delayTime(0.25),
				cc.callFunc(function() {
					var shanShuo = new cc.ParticleSystem("res/shz/MainGameScene/FJ.plist");
					shanShuo.x = 20,
					shanShuo.y = 5;
					YuanBaoSp.addChild(shanShuo);
				}, YuanBaoSp),
				cc.scaleBy(0.1, 2.0, 2.0),
				cc.scaleBy(0.5, 0.5, 0.5)	
		));
		
		
		var texiao = new cc.ParticleSystem("res/shz/MainGameScene/jinbitexiao.plist");
		YuanBaoSp.addChild(texiao);
		texiao.x = -70,
		texiao.y = 15;
		texiao.runAction(cc.sequence(
				cc.moveBy(0.5, 200, 0),
				cc.callFunc(function() {
					texiao.removeFromParent(true);
				}, this)
		));
	}
}); 

//传入的changjing参数代表不同的场景，0 ： 大厅、1 ：老虎机界面、2 ： 比倍界面
UserInformation.create = function(changjing){
	return new UserInformation(changjing);
};









