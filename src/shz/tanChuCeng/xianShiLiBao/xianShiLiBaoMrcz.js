var shouji_MRCZ_DB_url = "http://m1-api.baiyishuihu.com/index.php/Api/RechargeFeedBack/displayInitializeData?";//查询每日充值可领取的奖励
var shouji_MRCZ_url = "http://m1-api.baiyishuihu.com/index.php/Api/RechargeFeedBack/obtainReward?";//请求奖励

var xianShiLiBaoMrcz = {
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
		
		createMeiRiChongZhiLayer:function(self){
			//初始化的时候隐藏每日充值
			xianShiLiBaoMrcz.meiRiChongZhiNode =  ccs.load("res/shz/TanChuCeng/xianShiLiBaoMrcz.json").node;
			self.addChild(xianShiLiBaoMrcz.meiRiChongZhiNode,1,500);
			
			var meirichongzhi_node = xianShiLiBaoMrcz.meiRiChongZhiNode.getChildByName("XS_meirichongzhi_node");
			//充值金额
			xianShiLiBaoMrcz.mrcz_yuan_two_label = meirichongzhi_node.getChildByName("mrcz_ChongZhi_one");
			xianShiLiBaoMrcz.mrcz_yuan_three_label = meirichongzhi_node.getChildByName("mrcz_ChongZhi_two");
			//每日总充值
			xianShiLiBaoMrcz.mrcz_yuan_zong_label = meirichongzhi_node.getChildByName("mrcz_ZhongChongZhi_text");
			//充值获得的金币
			var mrcz_liang1 = meirichongzhi_node.getChildByName("mrcz_GetNum_1");
			mrcz_liang1.setVisible(false);
			xianShiLiBaoMrcz.mrcz_liang_one_label = new cc.LabelBMFont("","res/shz/TanChuCeng/tanChuCengRes/number_1.fnt");
			xianShiLiBaoMrcz.mrcz_liang_one_label.x = mrcz_liang1.x;
			xianShiLiBaoMrcz.mrcz_liang_one_label.y = mrcz_liang1.y;
			xianShiLiBaoMrcz.mrcz_liang_one_label.setScale(0.65);
			xianShiLiBaoMrcz.meiRiChongZhiNode.addChild(xianShiLiBaoMrcz.mrcz_liang_one_label,3);
			
			var mrcz_liang2 = meirichongzhi_node.getChildByName("mrcz_GetNum_2");
			mrcz_liang2.setVisible(false);
			xianShiLiBaoMrcz.mrcz_liang_two_label = new cc.LabelBMFont("","res/shz/TanChuCeng/tanChuCengRes/number_1.fnt");
			xianShiLiBaoMrcz.mrcz_liang_two_label.x = mrcz_liang2.x;
			xianShiLiBaoMrcz.mrcz_liang_two_label.y = mrcz_liang2.y;
			xianShiLiBaoMrcz.mrcz_liang_two_label.setScale(0.65);
			xianShiLiBaoMrcz.meiRiChongZhiNode.addChild(xianShiLiBaoMrcz.mrcz_liang_two_label,3);
			
			var mrcz_liang3 = meirichongzhi_node.getChildByName("mrcz_GetNum_3");
			mrcz_liang3.setVisible(false);
			xianShiLiBaoMrcz.mrcz_liang_three_label = new cc.LabelBMFont("","res/shz/TanChuCeng/tanChuCengRes/number_1.fnt");
			xianShiLiBaoMrcz.mrcz_liang_three_label.x = mrcz_liang3.x;
			xianShiLiBaoMrcz.mrcz_liang_three_label.y = mrcz_liang3.y;
			xianShiLiBaoMrcz.mrcz_liang_three_label.setScale(0.65);
			xianShiLiBaoMrcz.meiRiChongZhiNode.addChild(xianShiLiBaoMrcz.mrcz_liang_three_label,3);

			xianShiLiBaoMrcz.mrcz_sprite_one =  meirichongzhi_node.getChildByName("mrcz_bg_237").getChildByName("mrcz_bx03_247");
			xianShiLiBaoMrcz.mrcz_sprite_two =  meirichongzhi_node.getChildByName("mrcz_bg_239").getChildByName("mrcz_bx03_248");
			xianShiLiBaoMrcz.mrcz_sprite_three =  meirichongzhi_node.getChildByName("mrcz_bg_241").getChildByName("mrcz_bx03_249");
			//按钮事件
			xianShiLiBaoMrcz.mrcz_btn_one =  meirichongzhi_node.getChildByName("mrcz_Button_83");
			xianShiLiBaoMrcz.mrcz_btn_sp_one =  meirichongzhi_node.getChildByName("mrcz_Button_83").getChildByName("mrcz_btn_ljcz_250");
			xianShiLiBaoMrcz.mrcz_btn_one.addClickEventListener(xianShiLiBaoMrcz.mrczBtnClock);

			xianShiLiBaoMrcz.mrcz_btn_two =  meirichongzhi_node.getChildByName("mrcz_Button_84");
			xianShiLiBaoMrcz.mrcz_btn_sp_two =  meirichongzhi_node.getChildByName("mrcz_Button_84").getChildByName("mrcz_btn_ljcz_251");
			xianShiLiBaoMrcz.mrcz_btn_two.addClickEventListener(xianShiLiBaoMrcz.mrczBtnClock);

			xianShiLiBaoMrcz.mrcz_btn_three =  meirichongzhi_node.getChildByName("mrcz_Button_85");
			xianShiLiBaoMrcz.mrcz_btn_sp_three =  meirichongzhi_node.getChildByName("mrcz_Button_85").getChildByName("mrcz_btn_ljcz_252");
			xianShiLiBaoMrcz.mrcz_btn_three.addClickEventListener(xianShiLiBaoMrcz.mrczBtnClock);
		},
		//每日充值选项按钮
		mrczBtnClock:function(){
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			switch (this.tag) {
			//点击
			case 1211:
				cc.log("嘿嘿");
				if(xianShiLiBaoMrcz.mrcz_status_one == 0){//支付
					ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
				}else if(xianShiLiBaoMrcz.mrcz_status_one == 1){
					xianShiLiBaoMrcz.mrczCreatHttp(1);
				}
				break;	
			case 1212:
				cc.log("呵呵");
				if(xianShiLiBaoMrcz.mrcz_status_two == 0){//支付
					ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
				}else if(xianShiLiBaoMrcz.mrcz_status_two == 1){
					xianShiLiBaoMrcz.mrczCreatHttp(2);
				}
				break;	
			case 1213:
				cc.log("哈哈");
				if(xianShiLiBaoMrcz.mrcz_status_three == 0){//支付
					ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
				}else if(xianShiLiBaoMrcz.mrcz_status_three == 1){
					xianShiLiBaoMrcz.mrczCreatHttp(3);
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
						xianShiLiBaoMrcz.mrcz_btn_one.setTouchEnabled(false);
						xianShiLiBaoMrcz.mrcz_btn_one.setBright(false);
						xianShiLiBaoMrcz.mrcz_btn_sp_one.setVisible(false);
					}else if(type == 2 && obj.code == 0){
						xianShiLiBaoMrcz.mrcz_btn_two.setTouchEnabled(false);
						xianShiLiBaoMrcz.mrcz_btn_two.setBright(false);
						xianShiLiBaoMrcz.mrcz_btn_sp_two.setVisible(false);
					}else if(type == 3 && obj.code == 0){
						xianShiLiBaoMrcz.mrcz_btn_three.setTouchEnabled(false);
						xianShiLiBaoMrcz.mrcz_btn_three.setBright(false);
						xianShiLiBaoMrcz.mrcz_btn_sp_three.setVisible(false);
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
				if (waitQuan.xianShi) {
					waitQuan.unuse();
				} ;
				if(testHttp.readyState == 4 && testHttp.status == 200){
					var jieshouData = testHttp.responseText;
					var obj = 	eval("("+jieshouData+")");
					cc.log("***********8"+jieshouData);
					var xinXi = null;

						if(obj.code == 0 && obj.msg == "success"){
							xianShiLiBaoMrcz.mrcz_liang_one_label.setString(obj.result.level_01.reward);
							xianShiLiBaoMrcz.mrcz_liang_two_label.setString(obj.result.level_02.reward);
							xianShiLiBaoMrcz.mrcz_liang_three_label.setString(obj.result.level_03.reward);
							
							xianShiLiBaoMrcz.mrcz_yuan_two_label.setString(obj.result.level_02.recharge);
							xianShiLiBaoMrcz.mrcz_yuan_three_label.setString(obj.result.level_03.recharge);

							xianShiLiBaoMrcz.mrcz_status_one = obj.result.level_01.status;
							xianShiLiBaoMrcz.mrcz_status_two = obj.result.level_02.status;
							xianShiLiBaoMrcz.mrcz_status_three = obj.result.level_03.status;

							xianShiLiBaoMrcz.mrcz_sprite_one.setSpriteFrame("mrcz_bx0"+xianShiLiBaoMrcz.mrcz_status_one+".png");
							xianShiLiBaoMrcz.mrcz_sprite_two.setSpriteFrame("mrcz_bx0"+xianShiLiBaoMrcz.mrcz_status_two+".png");
							xianShiLiBaoMrcz.mrcz_sprite_three.setSpriteFrame("mrcz_bx0"+xianShiLiBaoMrcz.mrcz_status_three+".png");


							switch (xianShiLiBaoMrcz.mrcz_status_one) {
							case 0:
								xianShiLiBaoMrcz.mrcz_btn_sp_one.setSpriteFrame("mrcz_btn_ljcz.png");
								xianShiLiBaoMrcz.mrcz_btn_one.loadTextures("xianshi_1_1.png","xianshi_2_2.png","mrcz_btn_ylq.png",ccui.Widget.PLIST_TEXTURE);
								break;
							case 1:
								xianShiLiBaoMrcz.mrcz_btn_sp_one.setSpriteFrame("mrcz_btn_lqjl.png");
								xianShiLiBaoMrcz.mrcz_btn_one.loadTextures("xianshi_1.png","xianshi_2.png","mrcz_btn_ylq.png",ccui.Widget.PLIST_TEXTURE);
								break;
							case 2:
								xianShiLiBaoMrcz.mrcz_btn_one.setTouchEnabled(false);
								xianShiLiBaoMrcz.mrcz_btn_one.setBright(false);
								xianShiLiBaoMrcz.mrcz_btn_sp_one.setVisible(false);
								break;
							default:break;
							}
							switch (xianShiLiBaoMrcz.mrcz_status_two) {
							case 0:
								xianShiLiBaoMrcz.mrcz_btn_sp_two.setSpriteFrame("mrcz_btn_ljcz.png");
								xianShiLiBaoMrcz.mrcz_btn_two.loadTextures("xianshi_1_1.png","xianshi_2_2.png","mrcz_btn_ylq.png",ccui.Widget.PLIST_TEXTURE);
								break;
							case 1:
								xianShiLiBaoMrcz.mrcz_btn_sp_two.setSpriteFrame("mrcz_btn_lqjl.png");
								xianShiLiBaoMrcz.mrcz_btn_two.loadTextures("xianshi_1.png","xianshi_2.png","mrcz_btn_ylq.png",ccui.Widget.PLIST_TEXTURE);
								break;
							case 2:
								xianShiLiBaoMrcz.mrcz_btn_two.setTouchEnabled(false);
								xianShiLiBaoMrcz.mrcz_btn_two.setBright(false);
								xianShiLiBaoMrcz.mrcz_btn_sp_two.setVisible(false);
								break;
							default:break;
							}
							switch (xianShiLiBaoMrcz.mrcz_status_three) {
							case 0:
								xianShiLiBaoMrcz.mrcz_btn_sp_three.setSpriteFrame("mrcz_btn_ljcz.png");
								xianShiLiBaoMrcz.mrcz_btn_three.loadTextures("xianshi_1_1.png","xianshi_2_2.png","mrcz_btn_ylq.png",ccui.Widget.PLIST_TEXTURE);
								break;
							case 1:
								xianShiLiBaoMrcz.mrcz_btn_sp_three.setSpriteFrame("mrcz_btn_lqjl.png");
								xianShiLiBaoMrcz.mrcz_btn_three.loadTextures("xianshi_1.png","xianshi_2.png","mrcz_btn_ylq.png",ccui.Widget.PLIST_TEXTURE);
								break;
							case 2:
								xianShiLiBaoMrcz.mrcz_btn_three.setTouchEnabled(false);
								xianShiLiBaoMrcz.mrcz_btn_three.setBright(false);
								xianShiLiBaoMrcz.mrcz_btn_sp_three.setVisible(false);
								break;
							default:break;
							}
							xianShiLiBaoMrcz.mrcz_yuan_zong_label.setString("今日充值: "+obj.result.recharge_total+"  元");//玩家总充值
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
			if (!waitQuan.xianShi) {
				cc.director.getRunningScene().addChild(waitQuan,1000);
				waitQuan.reuse(100);
			}
		}
}