
/**
 *   这个对象被废弃了，请使用ChongZhiNew
 * */
var ChongZhi = {
		_vipNode : null,
		_chongzhiNode : null,	
		renminbiArray : null,
		price:null,
		chongZhiIsFront : false, 
		chongZhiZhezhao : null,
		chongZhiZhezhao_shouchong : null,
		chongZhiPrice:false,
		shouChong_kuang : null,
		shouChong_btn : null,
		
		creatChongZhiLayer : function(self) {
			throw "This object is not available, please use ChongZhiNew instead";
			ChongZhi.chongZhiIsFront = true;
			//根节点
			var size = cc.winSize;
			var rootChongZhi = ccs.load("res/shz/TanChuCeng/chongzhiqq.json").node;
			ChongZhi.chongZhiZhezhao = TestPushBox.create(rootChongZhi);

			ChongZhi.chongZhiZhezhao.setVisible(false);
			self.addChild(ChongZhi.chongZhiZhezhao,100,110);
			var size = cc.winSize;
			if(slocal.getItem(isShouChong_key) == "yes" && qianDao._isFront  == false){
				cc.log("^^^^^^^^^^^^",slocal.getItem(isShouChong_key));
				cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/shouChong.plist");
				cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/GongYong.plist");
				var node = cc.Node();
				ChongZhi.shouChong_kuang = cc.Sprite.createWithSpriteFrameName("shouChongbg.png");
				ChongZhi.shouChong_kuang.x = size.width/2;
				ChongZhi.shouChong_kuang.y = size.height/2;
				node.addChild(ChongZhi.shouChong_kuang,10,100);
				//事件
				ChongZhi.shouChong_btn =new ccui.Button("btn_ljcz01.png","btn_ljcz02.png","btn_ljcz03.png",ccui.Widget.PLIST_TEXTURE);
				ChongZhi.shouChong_btn.x = ChongZhi.shouChong_kuang.width/2;
				ChongZhi.shouChong_btn.y = ChongZhi.shouChong_kuang.height/2-130;
				ChongZhi.shouChong_btn.addClickEventListener(function() {
			    cc.pool.putInPool(ChongZhi.chongZhiZhezhao_shouchong)
					ChongZhi.chongZhiZhezhao.setVisible(true);
			    ChongZhi.removeChongZhiResources();
				});
				ChongZhi.shouChong_kuang.addChild(ChongZhi.shouChong_btn, 10, 10);
				ChongZhi.chongZhiZhezhao_shouchong = TestPushBox.create(node);
				self.addChild(ChongZhi.chongZhiZhezhao_shouchong,110,111);

				var chaHao = new ccui.Button("guanbi1.png","guanbi2.png","guanbi3.png",ccui.Widget.PLIST_TEXTURE);
				chaHao.x = ChongZhi.shouChong_kuang.width-70;
				chaHao.y = ChongZhi.shouChong_kuang.height-30;
				chaHao.addClickEventListener(function() {
					cc.pool.putInPool(ChongZhi.chongZhiZhezhao_shouchong);
					cc.pool.putInPool(ChongZhi.chongZhiZhezhao)
					ChongZhi.removeChongZhiResources();
				});
				ChongZhi.shouChong_kuang.addChild(chaHao, 10);

			}else{
				ChongZhi.chongZhiZhezhao.setVisible(true);
			}
			var OnOff = true;
			var chongzhiSpriteListener = new cc.EventListener.create({
				event:cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: false,
				onTouchBegan:function(touch,event){
					OnOff = true;
					return true;
				},
				onTouchMoved: function(touch, event){
					if ( Math.abs (touch.getDelta().x) > 1) {
						OnOff = false;
					}
				},
				onTouchEnded:function(touch, event){
					//获取点击的对象
					var target = event.getCurrentTarget();
					var locationInNode = target.convertToNodeSpace(touch.getLocation());
					var s = target.getContentSize();
					var rect = cc.rect(0, 0, s.width, s.height);
					//鼠标点击在目标对象内
					if ( OnOff && cc.rectContainsPoint(rect, locationInNode)) {
						cc.log("你点击了： ", ChongZhi.renminbiArray[target.getTag()-10]);
						ChongZhi.price = ChongZhi.renminbiArray[target.getTag()-10];
						if (target.getName().charAt(0) == "v") {//VIP判断
							vipNode.y = 1320;
							chongzhiNode.y = 320;
						}
						if (target.getName().charAt(0) == "r") {//充值判断
							if (SDKHelper.thirdSdkPay){
								SDKHelper.thirdPay(ChongZhi.price,"金币","普通充值","0","0","0");
							}else {
								if(cc.sys.os == cc.sys.OS_ANDROID){
									if (!slocal.getItem("ORIGINAL_VERSION")) {
										jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView",
												"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "普通充值", ChongZhi.price, USER_dwUserID.toString() ,"activitytype=0&rowid=0&channelname=SHZ","0" );
									}else {
										if (QUDAOHAO == QUDAOBIAOSHI.yyhshz_apk) {
											jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView",
													"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "普通充值", ChongZhi.price, USER_dwUserID.toString() ,"activitytype=0&rowid=0&channelname=SHZ","1,3,4,5,6" );
										}else {
											jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView",
													"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "普通充值", ChongZhi.price, USER_dwUserID.toString() ,"activitytype=0&rowid=0&channelname=SHZ","1,2,3,4,5,6" );
										}
									}
								}
								if(cc.sys.os == cc.sys.OS_IOS){
									cc.log("----------------------fucking log!");
									jsb.reflection.callStaticMethod( "purchasesdk", "pay:price:userid:payTypeString:otherOrderParams:","普通充值", ChongZhi.price, USER_dwUserID.toString(),"1,2,3,4,6,5","activitytype=0&rowid=0&channelname=SHZ" );//  activitytype:meir:1,xianshi:2,putong:0, rowid:putong:0,  channelname:SHZ
								}
							}

						}
					}
					return true;
				}
			});

			/**
			 * 
			 * 充值
			 * 
			 * **/

			//获取充值节点
			var chongzhiNode = rootChongZhi.getChildByName("recharge_background");
			ChongZhi._chongzhiNode = chongzhiNode;

			//退出
			var tuichu_chongzhiNode = chongzhiNode.getChildByName("rechang_back_but");
			tuichu_chongzhiNode.addClickEventListener(function() {
				cc.log("tuichu_chongzhiNode");
				
				ChongZhi.chongZhiIsFront = false;
				cc.pool.putInPool(ChongZhi.chongZhiZhezhao);
				ChongZhi.removeChongZhiResources();
			});
			//自动收账
			var zidongshouzhang_chongzhiNode = chongzhiNode.getChildByName("zidongshouzhang_but");
			zidongshouzhang_chongzhiNode.addClickEventListener(function() {
				cc.log("zidongshouzhang");
			});
			//银两label
			var yinliangNode_chongzhiNode = chongzhiNode.getChildByName("yinliang_label");
			var yinliangLabel_chongzhiNode = cc.LabelBMFont(Producer.changeNumberToString(USER_lUserScore), "res/shz/TanChuCeng/tanChuCengRes/chongzhi_number.fnt");
			yinliangNode_chongzhiNode.addChild(yinliangLabel_chongzhiNode);
			//奖卷label
			var jiangjuanNode_chongzhiNode = chongzhiNode.getChildByName("jiangjuan_label");
			var jiangjuanLabel_chongzhiNode = cc.LabelBMFont(Producer.changeNumberToString(USER_lLottery), "res/shz/TanChuCeng/tanChuCengRes/chongzhi_number.fnt");
			jiangjuanNode_chongzhiNode.addChild(jiangjuanLabel_chongzhiNode);
			//游戏充值but
			var chongzhi_but_chongzhiNode =  chongzhiNode.getChildByName("youxichongzhi_but");
			chongzhi_but_chongzhiNode.addClickEventListener(function(){
				cc.log("你点击了游戏充值按钮");
			});

			//游戏VIP充值but
			var chongzhi_VIP_but_chongzhiNode =  chongzhiNode.getChildByName("viptequan_but");
			chongzhi_VIP_but_chongzhiNode.setBright(false);
			chongzhi_VIP_but_chongzhiNode.addClickEventListener(function(){
				cc.log("你点击了游戏vip充值按钮");
				vipNode.y = 320;
				chongzhiNode.y = 1320;


			});
			//充值单个精灵
			var scrollView_chongzhiNode = chongzhiNode.getChildByName("recharge_ScrollView");
			var arraychongzhiSprite = [ "recharge_388","recharge_6", "recharge_12", "recharge_30", "recharge_60", "recharge_128","recharge_618","recharge_500","recharge_1000"];//, "recharge_698", "recharge_898", "recharge_1298"
			this.renminbiArray = ["100","5","10","20","30","50","300","500","1000"];
			var fengshuArray = ["125,0000","5,0000","10,0000","22,0000","34,0000","60,0000","390,0000","675,0000","1380,0000"];
			var bili = ["25%","","","10%","15%","20%","30%","35%","38%"];
			//ios app store 充值
//			var arraychongzhiSprite = ["recharge_128", "recharge_6", "recharge_12", "recharge_30", "recharge_60", "recharge_388","recharge_618","recharge_500","recharge_1000"];
//			this.renminbiArray = ["128","6","12","30","60","388","618"];
//			var fengshuArray = ["159,0000","6,0000","13,0000","34,0000","69,0000","510,0000","840,0000"];
//			var bili = ["25%","","10%","15%","20%","30%","35%"];




			for (var i = 0; i < arraychongzhiSprite.length; i++) {

				var chongzhiSpriteStr = scrollView_chongzhiNode.getChildByName(arraychongzhiSprite[i]);
				chongzhiSpriteStr.setTag(i+10);
				var shangbiao1 =  chongzhiSpriteStr.getChildByName("shangbiao_1");
				var shangbiao2 =  chongzhiSpriteStr.getChildByName("shangbiao_2");

				if(arraychongzhiSprite[i] == "recharge_128"){
					shangbiao1.setVisible(false);
					shangbiao2.setVisible(true);

				}else{
					shangbiao1.setVisible(false);
					shangbiao2.setVisible(false);
				}

				if(arraychongzhiSprite.length>7){
					var anniu1 = scrollView_chongzhiNode.getChildByName(arraychongzhiSprite[0]);
					var anniu2 = scrollView_chongzhiNode.getChildByName(arraychongzhiSprite[5]);
					var posit = cc.p(anniu1.x, anniu2.y);
					anniu1.x = anniu2.x;
					anniu1.y = anniu2.y;
					anniu2.x = posit.x;
					anniu2.y = posit.y;
					if(arraychongzhiSprite[i] == "recharge_388"){
					shangbiao1.setVisible(false);
					shangbiao2.setVisible(true);
					}else if(i>5){
					shangbiao1.setVisible(true);
					shangbiao2.setVisible(false);
					}else{
					shangbiao1.setVisible(false);
					shangbiao2.setVisible(false);

					}
				}
				
//				if(i >6){
//					cc.log("hahahaahahahah");
//					chongzhiSpriteStr.setVisible(false);
//					scrollView_chongzhiNode.setInnerContainerSize(cc.size(2220,640))
//				}

				var bili_bg = chongzhiSpriteStr.getChildByName("zensong_bili");
				var biliFnt = cc.LabelBMFont(bili[i],"res/shz/TanChuCeng/tanChuCengRes/send_number.fnt");
				biliFnt.x = bili_bg.width/2+20;
				biliFnt.y = bili_bg.height/2;
				bili_bg.addChild(biliFnt,1,10);
				if(bili[i] ==""){
					biliFnt.setVisible(false);
					bili_bg.setVisible(false);
				}
				var renminbi = chongzhiSpriteStr.getChildByName("ziti_renmingbi");
				var renminbi_lab = cc.LabelBMFont("￥"+this.renminbiArray[i], "res/shz/TanChuCeng/tanChuCengRes/number_1.fnt");
				renminbi_lab.x = renminbi.x;
				renminbi_lab.y =renminbi.y;
				chongzhiSpriteStr.addChild(renminbi_lab,1);

				var fengshu = chongzhiSpriteStr.getChildByName("ziti_fengshu");
				var fengshu_lab = cc.LabelBMFont(fengshuArray[i], "res/shz/TanChuCeng/tanChuCengRes/number_2.fnt");
				fengshu_lab.x = fengshu.x;
				fengshu_lab.y =fengshu.y;
				chongzhiSpriteStr.addChild(fengshu_lab,1);
				cc.eventManager.addListener(chongzhiSpriteListener.clone(), chongzhiSpriteStr);

			}

			/**
			 * 
			 * 
			 * vip
			 * 
			 * **/

			var vipNode =  rootChongZhi.getChildByName("vip_background");
			ChongZhi._vipNode = vipNode;
			//退出
			var tuichu_vipNode = vipNode.getChildByName("rechang_back_but_vip");
			tuichu_vipNode.addClickEventListener(function() {
				cc.log("tuichu_chongzhiNode_vip");
				cc.pool.putInPool(ChongZhi.chongZhiZhezhao);
				ChongZhi.removeChongZhiResources();
			});

			//游戏充值but
			var chongzhi_but_vipNode =  vipNode.getChildByName("youxichongzhi_but_vip");
			chongzhi_but_vipNode.setBright(false);
			chongzhi_but_vipNode.addClickEventListener(function(){
				cc.log("你点击了游戏充值按钮vip");
				vipNode.y = 1320;
				chongzhiNode.y = 320;
			});
			//游戏VIP充值but
			var chongzhi_VIP_but_vipNode =  vipNode.getChildByName("viptequan_but_vip");

			chongzhi_VIP_but_vipNode.addClickEventListener(function(){
				cc.log("你点击了游戏vip充值按钮vip");
			});
			//充值单个精灵
			var arraychongzhiSprite_vip = ["vip1_sprite", "vip2_sprite", "vip3_sprite", "vip4_sprite", "vip5_sprite", 
			                               "vip6_sprite","vip7_sprite", "vip8_sprite"];
			var vip_node_label = ["累计充值10元", "累计充值60元", "累计充值150元", "累计充值500元", "累计充值1500元", "累计充值4000元", "累计充值8000元", "累计充值13000元"];
			var scrollView_vipNode = vipNode.getChildByName("vip_ScrollView");
			for (var i = 0; i < arraychongzhiSprite_vip.length; i++) {
				var chongzhiSpriteStr = scrollView_vipNode.getChildByName(arraychongzhiSprite_vip[i]);
				var vip1_node = chongzhiSpriteStr.getChildren();//lebel显示
				var label = cc.LabelBMFont(vip_node_label[i], "res/shz/TanChuCeng/tanChuCengRes/chongzhi_number.fnt");
				vip1_node[0].addChild(label);
				cc.eventManager.addListener(chongzhiSpriteListener.clone(), chongzhiSpriteStr);
			}
			//提示
			var tishi_vip = vipNode.getChildByName("tishi_vip");
			var zaichongzhiNum = 50;
			var tishi_str = "再充值 " + zaichongzhiNum + " 元, 即可享有";
			var tishi_vip_label = cc.LabelBMFont(tishi_str, "res/shz/TanChuCeng/tanChuCengRes/chongzhi_number.fnt");
			tishi_vip.addChild(tishi_vip_label);

			//能量条
			var nengliangtiao = vipNode.getChildByName("nengliangtiao");
			nengliangtiao.setVisible(false);
			var popOnline =new ccui.ImageView("res/shz/chongZhiJinduTiao.png");
			popOnline.setScale9Enabled(true);
			popOnline.setContentSize(cc.size(0, 0));
			popOnline.setFlippedX(true);
			popOnline.ignoreContentAdaptWithSize(false);
			popOnline.x =nengliangtiao.x+1 ;
			popOnline.y =nengliangtiao.y ;
			popOnline.anchorX = 0.5;
			popOnline.anchorY = 0.5;
			vipNode.addChild(popOnline,2);
			popOnline.setVisible(false);
			ChongZhi.nengliangtiaoSet(popOnline, tishi_vip_label);

			//更新VIP等级
			var sprite_vip_now = vipNode.getChildByName("Sprite_vip_now");
			var sprite_vip_next = vipNode.getChildByName("Sprite_vip_next");
			var vip_zhi = USER_wMemOrder;
			cc.log("vip_zhi", vip_zhi);
			ChongZhi.sprite_vip_Set(sprite_vip_now, sprite_vip_next, vipNode);

		},
		removeChongZhiResources : function() {
			var numberAry =["res/shz/TanChuCeng/tanChuCengRes/meirifenxiang"
			                ,"res/shz/TanChuCeng/tanChuCengRes/chongZhi"
			                ,"res/shz/TanChuCeng/tanChuCengRes/chongzhiVIP"];
			removeResources(numberAry);
		},
		nengliangtiaoSet:function(spr, tishi_vip_label){
			var num = 0;  
			var chaNum = 0;
			spr.setVisible(true);
			if (0<USER_wMemOrder && USER_wMemOrder<8) {
				var num1 = USER_dwExperience -  shengJiVip[USER_wMemOrder] ;//数组shengJiVip下标为0时对应vip1
				if(num1 == 0){
					spr.setVisible(false);
				}
				var num2 = shengJiVip[USER_wMemOrder+1] - shengJiVip[USER_wMemOrder];
				chaNum = shengJiVip[USER_wMemOrder+1] - USER_dwExperience;
				num = num1/num2;
			}else if (USER_wMemOrder == 0) {
				if(USER_dwExperience == 0){
					spr.setVisible(false);
				}
				num =  USER_dwExperience/shengJiVip[1];
				chaNum = shengJiVip[1] - USER_dwExperience;
			}else if (USER_wMemOrder == 8) {
				chaNum = 0;
				num = 1;
			}
			cc.log("num===============",num);
			spr.setContentSize(cc.size(406*num, 30));
			spr.x = spr.x+406*num/2;
			//spr.setScaleX(num);

			var tishi_str = "再充值 " + chaNum + " 元, 即可享有";
			tishi_vip_label.setString(tishi_str);
		},

		sprite_vip_Set:function(sp1, sp2, parent){
			var rectArray = [cc.rect(591, 1211, 27, 63), cc.rect(520, 1256, 69, 27), cc.rect(520, 1227, 69, 27),
			                 cc.rect(591, 1140, 27, 69), cc.rect(520, 1198, 69, 27), cc.rect(520, 1169, 69, 27), cc.rect(520, 1140, 69, 27)];
			var pos1 = sp1.getPosition();
			var pos2 = sp2.getPosition();
			var vipNum = ["chongzhi_vip-1.png","chongzhi_vip-1.png","chongzhi_vip-2.png","chongzhi_vip-3.png","chongzhi_vip-4.png","chongzhi_vip-5.png","chongzhi_vip-6.png","chongzhi_vip-7.png","chongzhi_vip-8.png","chongzhi_vip-8.png"];
			sp1 = new cc.Sprite("#"+vipNum[USER_wMemOrder]);
			sp1.setPosition(pos1.x, pos1.y);
			parent.addChild(sp1);
			sp2 = new cc.Sprite("#"+vipNum[USER_wMemOrder+1]);
			sp2.setPosition(pos2.x, pos2.y);
			parent.addChild(sp2);
			if (USER_wMemOrder == 0) {
				sp1.setVisible(false);
			}else if (USER_wMemOrder == 8) {
				sp2.setVisible(false);
			}
		}

};
