//排行榜中的每日充值模块
var shouji_MRCZ_DB_url = "http://m1-api.baiyishuihu.com/index.php/Api/RechargeFeedBack/displayInitializeData?";//查询每日充值可领取的奖励
var shouji_MRCZ_url = "http://m1-api.baiyishuihu.com/index.php/Api/RechargeFeedBack/obtainReward?";//请求奖励
var paihangchongzhi = {
		meiRiChongZhiNode:null,//每日充值活动
		mrcz_yuan_zong_label:null,//每日总共充值
		mrcz_yuan_three_label:null,
		mrcz_yuan_two_label:null,
		mrcz_liang_one_label:null,
		mrcz_liang_two_label:null,
		mrcz_liang_three_label:null,
		mrcz_sprite_one:null,
		mrcz_sprite_two:null,
		mrcz_sprite_three:null,
		mrcz_btn_one:null,
		mrcz_btn_two :null,
		mrcz_btn_three:null,
		mrcz_btn_sp_one:null,
		mrcz_btn_sp_two :null,
		mrcz_btn_sp_three:null,
		mrcz_status_one:null,
		mrcz_status_two:null,
		mrcz_status_three:null,
		createPaihangchongzhi:function(self){
			//初始化的时候隐藏每日充值
			paihangchongzhi.meiRiChongZhiNode =  ccs.load("res/shz/TanChuCeng/PaihangChongzhi.json").node;
			paihangchongzhi.meiRiChongZhiNode.x = 293;
			paihangchongzhi.meiRiChongZhiNode.y = -256;
			self.addChild(paihangchongzhi.meiRiChongZhiNode,30,222);
			cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/Paihangchongchi.plist");
			var meirichongzhi_ScrollView = paihangchongzhi.meiRiChongZhiNode.getChildByName("ScrollView_paihangchonghzi");
			//充值金额
			paihangchongzhi.mrcz_yuan_two_label = meirichongzhi_ScrollView.getChildByName("mrcz_ChongZhi_one");
			paihangchongzhi.mrcz_yuan_three_label = meirichongzhi_ScrollView.getChildByName("mrcz_ChongZhi_two");

			//充值获得的金币
			paihangchongzhi.mrcz_liang_one_label = meirichongzhi_ScrollView.getChildByName("mrcz_GetNum_1");
			paihangchongzhi.mrcz_liang_two_label = meirichongzhi_ScrollView.getChildByName("mrcz_GetNum_2");
			paihangchongzhi.mrcz_liang_three_label = meirichongzhi_ScrollView.getChildByName("mrcz_GetNum_3");

			paihangchongzhi.mrcz_lingqu_one =  meirichongzhi_ScrollView.getChildByName("paihang_liangquimg1");
			paihangchongzhi.mrcz_lingqu_two =  meirichongzhi_ScrollView.getChildByName("paihang_liangquimg2");
			paihangchongzhi.mrcz_lingqu_three =  meirichongzhi_ScrollView.getChildByName("paihang_liangquimg3");
			paihangchongzhi.mrcz_lingqu_one.setVisible(false);
			paihangchongzhi.mrcz_lingqu_two.setVisible(false);
			paihangchongzhi.mrcz_lingqu_three.setVisible(false);
			var action2 = cc.fadeOut(1.0);
			var action2Back = action2.reverse();
			var action =cc.sequence(action2, action2Back).repeatForever();
			
			var action22 = cc.fadeOut(1.0);
			var action22Back = action22.reverse();
			var action2 =cc.sequence(action22, action22Back).repeatForever();
			
			var action23 = cc.fadeOut(1.0);
			var action23Back = action23.reverse();
			var action3 =cc.sequence(action23, action23Back).repeatForever();
			paihangchongzhi.mrcz_lingqu_one.runAction(action);
			paihangchongzhi.mrcz_lingqu_two.runAction(action2);
			paihangchongzhi.mrcz_lingqu_three.runAction(action3);
			//按钮事件
			var mrcz_btn_chongzhi =  paihangchongzhi.meiRiChongZhiNode.getChildByName("paihang_lijichongzhi2");
			mrcz_btn_chongzhi.addClickEventListener(paihangchongzhi.mrczBtnClock);
			
			//已领取
			paihangchongzhi.mrcz_yilingqu_one =  meirichongzhi_ScrollView.getChildByName("paihang_yilingquimg1");
			paihangchongzhi.mrcz_yilingqu_two =  meirichongzhi_ScrollView.getChildByName("paihang_yilingquimg2");
			paihangchongzhi.mrcz_yilingqu_three =  meirichongzhi_ScrollView.getChildByName("paihang_yilingquimg3");
			
			//领取按钮
			paihangchongzhi.mrcz_btn_one = meirichongzhi_ScrollView.getChildByName("paihang_chongzhi1");
			paihangchongzhi.mrcz_btn_two = meirichongzhi_ScrollView.getChildByName("paihang_chongzhi13");
			paihangchongzhi.mrcz_btn_three = meirichongzhi_ScrollView.getChildByName("paihang_chongzhi12");
			paihangchongzhi.mrcz_btn_one.addClickEventListener(paihangchongzhi.mrczLingquBtnClock);
			paihangchongzhi.mrcz_btn_two.addClickEventListener(paihangchongzhi.mrczLingquBtnClock);
			paihangchongzhi.mrcz_btn_three.addClickEventListener(paihangchongzhi.mrczLingquBtnClock);
		},
		
		//每日充值立即充值按钮
		mrczBtnClock:function(){
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
		},
		
		//领取选项按钮
		mrczLingquBtnClock:function(){
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			switch (this.tag) {
			//点击
			case 67:
				cc.log("嘿嘿"+paihangchongzhi.mrcz_status_one);
				if(paihangchongzhi.mrcz_status_one == 1){
					cc.log("嘿嘿11111");
					paihangchongzhi.mrczCreatHttp(1);
				}
				break;	
			case 73:
				cc.log("呵呵"+paihangchongzhi.mrcz_status_two);
				if(paihangchongzhi.mrcz_status_two == 1){
					paihangchongzhi.mrczCreatHttp(2);
				}
				break;	
			case 70:
				cc.log("哈哈"+paihangchongzhi.mrcz_status_three);
				if(paihangchongzhi.mrcz_status_three == 1){
					paihangchongzhi.mrczCreatHttp(3);
				}
				break;

			default:break;
			}
		},

		mrczCreatHttp:function(type){
			var  data  = "userid="+USER_dwUserID+"&type="+type;
			var testHttp = cc.loader.getXMLHttpRequest();
			streamXHREvents(testHttp);
			testHttp.open("POST", shouji_MRCZ_url);

			testHttp.onreadystatechange = function() {
				if(testHttp.readyState == 4 && testHttp.status == 200){
					var jieshouData = testHttp.responseText;
					var obj = 	eval("("+jieshouData+")");
					cc.log("==========每日充值============="+jieshouData);
					if(type == 1 && obj.code == 0){
						paihangchongzhi.mrcz_btn_one.setTouchEnabled(false);
						paihangchongzhi.mrcz_btn_one.setBright(false);
						paihangchongzhi.mrcz_lingqu_one.setVisible(false);
						paihangchongzhi.mrcz_yilingqu_one.setVisible(true);
					}else if(type == 2 && obj.code == 0){
						paihangchongzhi.mrcz_btn_two.setTouchEnabled(false);
						paihangchongzhi.mrcz_btn_two.setBright(false);
						paihangchongzhi.mrcz_lingqu_two.setVisible(false);
						paihangchongzhi.mrcz_yilingqu_two.setVisible(true);
					}else if(type == 3 && obj.code == 0){
						paihangchongzhi.mrcz_btn_three.setTouchEnabled(false);
						paihangchongzhi.mrcz_btn_three.setBright(false);
						paihangchongzhi.mrcz_lingqu_three.setVisible(false);
						paihangchongzhi.mrcz_yilingqu_three.setVisible(true);
					}
					var xinXi =  {Describe :obj.result.msg,errorCode : 1017,isBack : false};
					var tishi = TiShiKuang.create(xinXi);
					cc.director.getRunningScene().addChild(tishi,1000);
				}	
			}
			testHttp.send(data);
		},

		creatHttp : function() {
			var testHttp = cc.loader.getXMLHttpRequest();
			streamXHREvents(testHttp);

			testHttp.open("POST", shouji_MRCZ_DB_url);
			var data  = "userid="+USER_dwUserID;

			testHttp.onreadystatechange = function() {
				if(testHttp.readyState == 4 && testHttp.status == 200){
					var jieshouData = testHttp.responseText;
					var obj = 	eval("("+jieshouData+")");
					cc.log("***********8"+jieshouData);
					var xinXi = null;

					if(obj.code == 0 && obj.msg == "success"){
						if(paihangchongzhi){
							paihangchongzhi.mrcz_liang_one_label.setString(obj.result.level_01.reward);
							paihangchongzhi.mrcz_liang_two_label.setString(obj.result.level_02.reward);
							paihangchongzhi.mrcz_liang_three_label.setString(obj.result.level_03.reward);

							paihangchongzhi.mrcz_yuan_two_label.setString(obj.result.level_02.recharge);
							paihangchongzhi.mrcz_yuan_three_label.setString(obj.result.level_03.recharge);

							paihangchongzhi.mrcz_status_one = obj.result.level_01.status;
							paihangchongzhi.mrcz_status_two = obj.result.level_02.status;
							paihangchongzhi.mrcz_status_three = obj.result.level_03.status;
							switch (paihangchongzhi.mrcz_status_one) {
								case 0:
									paihangchongzhi.mrcz_lingqu_one.setVisible(false);
									paihangchongzhi.mrcz_yilingqu_one.setVisible(false);
									break;
								case 1:
									paihangchongzhi.mrcz_lingqu_one.setVisible(true);
									paihangchongzhi.mrcz_yilingqu_one.setVisible(false);
									break;
								case 2:
									paihangchongzhi.mrcz_lingqu_one.setVisible(false);
									paihangchongzhi.mrcz_yilingqu_one.setVisible(true);
									break;
								default:break;
							}
							switch (paihangchongzhi.mrcz_status_two) {
								case 0:
									paihangchongzhi.mrcz_lingqu_two.setVisible(false);
									paihangchongzhi.mrcz_yilingqu_two.setVisible(false);
									break;
								case 1:
									paihangchongzhi.mrcz_lingqu_two.setVisible(true);
									paihangchongzhi.mrcz_yilingqu_two.setVisible(false);
									break;
								case 2:
									paihangchongzhi.mrcz_lingqu_two.setVisible(false);
									paihangchongzhi.mrcz_yilingqu_two.setVisible(true);
									break;
								default:break;
							}
							switch (paihangchongzhi.mrcz_status_three) {
								case 0:
									paihangchongzhi.mrcz_lingqu_three.setVisible(false);
									paihangchongzhi.mrcz_yilingqu_three.setVisible(false);
									break;
								case 1:
									paihangchongzhi.mrcz_lingqu_three.setVisible(true);
									paihangchongzhi.mrcz_yilingqu_three.setVisible(false);
									break;
								case 2:
									paihangchongzhi.mrcz_lingqu_three.setVisible(false);
									paihangchongzhi.mrcz_yilingqu_three.setVisible(true);
									break;
								default:break;
							}
						}
					}else{
						xinXi = {Describe : obj.result.msg,errorCode : 1017,isBack : false};
					}

					if (xinXi) {
						var tishi = TiShiKuang.create(xinXi);
						cc.director.getRunningScene().addChild(tishi,1000);
					}
				}
			}
			testHttp.send(data);
//			if (!waitQuan.xianShi) {
//				cc.director.getRunningScene().addChild(waitQuan,1000);
//				waitQuan.reuse(100);
//			}
		}
}