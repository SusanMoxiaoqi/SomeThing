var DuiJiuRenWu = cc.Node.extend({
	renwu_node : null,
	fan_node : null,
	dj_pinJiuRenWu : null,
	dj_mianFeiCiShu : null,
	dj_yinLiangCiShu : null,
	dj_biaoqian : null,
	node_rect : null,
	dianjishijian : 0,
	dj_yiciyinliang : null,
	dj_shiciyinliang : null,
	dj_daojishi : null,
	dj_NPC : 0,
	dj_mianfei : false,//是否使用免费次数
	ctor : function(int_renwu) {
		this._super();
		var _this = this;
		this.dj_NPC = int_renwu;
		/**正面*/
		var renwu_node = ccs.load("res/shz/DuiJiuScene/DuiJiuZheng.json").node;
		this.renwu_node = renwu_node;
		renwu_node.x = 0
		renwu_node.y = 0
		this.addChild(renwu_node);

		this.dj_pinJiuRenWu = renwu_node.getChildByName("dj_pinJiuRenWu");
		this.dj_mianFeiCiShu = this.dj_pinJiuRenWu.getChildByName("dj_mianFeiCiShu");
		this.dj_yinLiangCiShu = this.dj_pinJiuRenWu.getChildByName("dj_yinLiangCiShu");
		this.dj_biaoqian = this.dj_pinJiuRenWu.getChildByName("dj_biaoqian");
		/**反面*/
		var fan_node = ccs.load("res/shz/DuiJiuScene/DuiJiuFan.json").node;
		this.fan_node = fan_node;
		fan_node.x = 0;
		fan_node.y = 0;
		this.addChild(fan_node);
		fan_node.setVisible(false);
		
		var bj_fannode = fan_node.getChildByName("dj_fanpai");
		var chahao = bj_fannode.getChildByName("dj_btnChaHao");
		chahao.addClickEventListener(function() {
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi, false);
			if (DUIJIU.anniu_jinzhi == true) return;
			DUIJIU.anniu_jinzhi = true;
			_this.fanZhuanAnc(_this);
		});
		
		
		var dj_btnduiyinyici = bj_fannode.getChildByName("dj_btnduiyinyici");
		dj_btnduiyinyici.Times = 1;
		dj_btnduiyinyici.dj_NPC =  int_renwu;
		dj_btnduiyinyici.addClickEventListener(function() {
			_this.aniDuijiu(this,_this);
		});
		var dj_btnduiyinshici = bj_fannode.getChildByName("dj_btnduiyinshici");
		dj_btnduiyinshici.Times = 10;
		dj_btnduiyinshici.dj_NPC =  int_renwu;
		dj_btnduiyinshici.addClickEventListener(function() {
			_this.aniDuijiu(this,_this);
		});
		
		this.dj_yiciyinliang = bj_fannode.getChildByName("dj_yiciyinliang");
		this.dj_shiciyinliang = bj_fannode.getChildByName("dj_shiciyinliang");
		this.dj_daojishi = bj_fannode.getChildByName("dj_daojishi");
		return true;
	},
	aniDuijiu : function(sender,father) {
		if (DUIJIU.anniu_jinzhi == true) return;	
		var times = sender.Times;
		var dj_NPC = sender.dj_NPC;
		if (times == 1) {
			if (USER_lUserScore < DUIJIU.duijiu_info.lDrinkOnceScore[dj_NPC] && !father.dj_mianfei) {
				var xinxi = {Describe : USER_lUserInsure,errorCode : 202,isBack : false};//弹出充值框
				var tishi = TiShiKuangZiDingYi.create(xinxi);
				cc.director.getRunningScene().addChild(tishi,1000);
				return;
			}
		} else {
			if (USER_lUserScore < DUIJIU.duijiu_info.lDrinkTenScore[dj_NPC]) {
				var xinxi = {Describe : USER_lUserInsure,errorCode : 202,isBack : false};//弹出充值框
				var tishi = TiShiKuangZiDingYi.create(xinxi);
				cc.director.getRunningScene().addChild(tishi,1000);
				return;
			}
		};
		cc.log("你点击了对饮"+times+"次",dj_NPC,father.dj_mianfei);
		var donghua = Producer.ProduceFrameAnimation("dj_wan", 7, 1, 0.15);
		var dj_wan = new cc.Sprite("#dj_wan01.png");
		dj_wan.setNormalizedPosition(0.5, 0.7);
		sender.addChild(dj_wan,2);
		cc.audioEngine.playEffect(Effect_res.duijiu_cheers, false);
		dj_wan.runAction(cc.sequence(
						donghua,
						cc.callFunc(function() {
			           this.removeFromParent(true);
		         }, dj_wan)));
		if (!waitQuan.xianShi) {
			cc.director.getRunningScene().addChild(waitQuan,1000);
			waitQuan.reuse(15, null,"正在获取用户拼酒结果. . .");
		};
		loginServer.sendMessage(MDM_MB_ACTIVITIES_SERVICE, SUB_MB_REQUEST_DRINK,{dwUserID : USER_dwUserID,wNpcID : dj_NPC,wDrinkTimes : times});
		
		switch (dj_NPC) {
		case 0:
			if (times == 1) {
				if (!father.dj_mianfei) {
					USER_lUserScore -= DUIJIU.duijiu_info.lDrinkOnceScore[dj_NPC];
					YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
				};
			}else{
				USER_lUserScore -= DUIJIU.duijiu_info.lDrinkTenScore[dj_NPC];
				YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
			}	
			break;
		case 1:
			if (times == 1) {
				if (!father.dj_mianfei) {
					USER_lUserScore -= DUIJIU.duijiu_info.lDrinkOnceScore[dj_NPC];
					YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
				};
			}else{
				USER_lUserScore -= DUIJIU.duijiu_info.lDrinkTenScore[dj_NPC];
				YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
			}	
			break;
		case 2:
			if (times == 1) {
					USER_lUserScore -= DUIJIU.duijiu_info.lDrinkOnceScore[dj_NPC];
					YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
			}else{
				USER_lUserScore -= DUIJIU.duijiu_info.lDrinkTenScore[dj_NPC];
				YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
			}	
			break;
		default:
			break;
		}
	},
	fanZhuanAnc : function(_this) {
		DUIJIU.isAction[_this.dj_NPC] = true;
		var zhengmian = _this.fan_node;
		var fanmian = _this.renwu_node;
		var posX = _this.getPositionX();			
		var asin = Math.asin((posX - 568)/652);
		var asin1 = 180*asin/Math.PI;
		var orbitFront=new cc.OrbitCamera(0.25,1,0,0,-90+asin1,0,0);
		var orbitBack=new cc.OrbitCamera(0.25,1,0,90+asin1,-90-asin1,0,0);
		fanmian.setVisible(false);
		var targetac=new cc.TargetedAction(fanmian,new cc.Sequence(new cc.Show(),orbitBack));
		var fa=new cc.Sequence(new cc.Show(),orbitFront,new cc.Hide(),targetac,cc.callFunc(_this.afterFanzhuan,_this,_this.dj_NPC));
		zhengmian.runAction(fa);
	},
	afterFanzhuan : function(sender,npc) {
		DUIJIU.anniu_jinzhi = false;
		DUIJIU.stop_touch[npc] = false;
		DUIJIU.isAction[npc] = false;
	},
})