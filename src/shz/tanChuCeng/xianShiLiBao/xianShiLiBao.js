var xianshichongzhi_url = "http://m1-api.baiyishuihu.com/index.php/Api/Gameactivityapi/limitrechargelist.php?";
var xianshi_dianji_url = "http://m1-api.baiyishuihu.com/index.php/Api/Gameactivityapi/limitrechargeact.php?";
var meishixianliang_url = "http://m1-api.baiyishuihu.com/index.php/Api/Gameactivityapi/everydayrushactive.php?";//获取每日限量的列表
var xianliang_dianji_url = "http://m1-api.baiyishuihu.com/index.php/Api/Gameactivityapi/rushshopact.php?";//每日限量充值
var shouji_HQYZM_url = "http://m1-api.baiyishuihu.com/index.php/Api/Bind/getCode.php?";//获取验证码
var shouji_BDCZ_url = "http://m1-api.baiyishuihu.com/index.php/Api/Bind/bindMobile.php?";//绑定手机号
var shouji_JCBD_url = "http://m1-api.baiyishuihu.com/index.php/Api/Bind/unbindMobile.php?";//解除绑定
var shouji_CXIS_BD_url = "http://m1-api.baiyishuihu.com/index.php/Api/Bind/checkBind.php?";//查询绑定
var huoQu_jieRiBtnZu = "http://m1-api.baiyishuihu.com/index.php/Api/ActiveGiftBag/listGiftBag.php?"//获取活动的列表
var huoQuHongDian = "http://m1-api.baiyishuihu.com/index.php/Api/RedTips/rewardsTips.php?";//活动中获取红点
var xianShiLiBao = {
		scrollBtnZu_array : [],
		jieRiZuData : [],
		meiRiChongZhiNode:null,//每日充值活动
		zhongQiuJieLiBaoNode : null,//中秋节礼包
		vipLiBaoNode : null,//vip礼包
		JF_huoDongNode : null,//剿匪活动
		xianShiChongZhiNode : null,//限时充值
		xianLiangNode : null,//每日限量充值
		duiHuanMaNoe : null,//兑换码node
		bangDingSongJinNode : null,//绑定手机node
		yibangdingNode : null,//已绑定手机显示node
		mrcz_btn:null,//每日充值
		xianShi_btn : null,//限时btn
		xianLiang_btn : null,//每日限量btn
		duiHuan_btn : null,//兑换码btn
		bangDing_btn : null,//绑定送金btn
		jsonLayer : null,//加载json文件
		xianshiData : null,//限时数据
		meirixianliangData : null,//每日限量数据
		XS_tableView : null,//tableView
		XS_xsORmr : null, //当前显示哪个界面
		Array_label_xscz : [],//显示充值时间node数组
		Array_label_mrxl : [],//每日限量时间node数组
		Array_label_xcxl : [],//限量时间node数组
		YZM_daojishi : null,
		XS_endtime : null,
		MR_endtime : null,
		XC_endtime : null,
		YZM_endtime  : null,
		scrollView_btn_zu : null,//左边得按钮数组
		duihuanma_btn : null,//兑换码界面得确定按钮
		duihuanma_fileText : null,//兑换界面输入框
		duihuanma_tishi : null,//兑换提示文本
		meirixianliangPrice : null,//每日限量得价格
		isMeiRiXiaoLiang : false,
		xianshigoumaiPrice : null,//限时购买得价格
		isXianShiGouMai : false,//
		xianshilibaoRowNum:null,//
		isError : false,
		xianliang_benglong : null,
		xianliang_xiaci : null,

		bd_shoujihao : null,
		bd_yanzhengma : null,
		bd_yanzhengma_btn : null,
		bd_lijibangding_btn : null,
		bd_tishiyu : null,
		bd_yibangshojihao : null,
		bd_jiechubangding : null,
		bd_huoquwenben : null,
		bd_huoqutime : null,
		_parent : null,
		zhuangtaitiao : null,
		bangDing_key : null,
		liangWan : null,
		isXianShiLiBao : false,
		duiHuanMa : null,
        isTanChu_JFTS : false,
        JF_hongDian : false,
		createXianShiLiBaoLayer :function(self){
			var size = cc.winSize;
			this._parent = self;
			xianShiLiBao.isXianShiLiBao = true;
			xianShiLiBao.jsonLayer =  ccs.load("res/shz/TanChuCeng/xianShiLiBaoText.json").node;
			xianShiLiBao.jsonLayer.x = size.width/2;
			xianShiLiBao.jsonLayer.y = size.height/2;
			var zhezhao = TestPushBox.create(xianShiLiBao.jsonLayer);
			self.addChild(zhezhao,100);
			xianShiLiBao.bangDing_key = 'bangDingChengGong';
			cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/xianShiLiBao_JR.plist");
			cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/VIP_LingQu_Tu.plist");
			//关闭按钮
			var queren = ccui.helper.seekWidgetByName(xianShiLiBao.jsonLayer, "XS_xiahao_btn");
			queren.addClickEventListener(function() {
				GameHalll.creatHttp(2);
				xianShiLiBao.isXianShiLiBao = false;
				xianShiLiBao.isTanChu_JFTS = false;
//				if(xianShiLiBao.meirixianliangData && USER_HaveLiBao ){
//					xianShiLiBao.isXianShiLiBao = false;
//					var keGouShu = 0;
//					for (var i = 0; i < xianShiLiBao.meirixianliangData.data.length; i++) {
//						if(xianShiLiBao.meirixianliangData.data[i].shopstatus == 3){
//							keGouShu++;
//						}else{
//							break;
//						}
//					}
//					if(keGouShu == 3){
//						USER_HaveLiBao = false;
//						GameHalll._limitedPackageBtn.getChildByTag(20).setVisible(false);
//					}
//				}else{
//					
//				}
				
				xianShiLiBao.Array_label_xscz = [];
				xianShiLiBao.Array_label_mrxl = [];
				xianShiLiBao.Array_label_xcxl = [];
				xianShiLiBao.scrollBtnZu_array = [];
				GameHalll.unschedule(xianShiLiBao.daojishi);
				GameHalll.unschedule(xianShiLiBao.scrollView_btn_zu_setOff);
				GameHalll.unschedule(xianShiLiBao.bangDingDaoJiShi);
				if(xianShiLiBao.YZM_endtime > 0){
					xianShiLiBao.YZM_endtime = 0;
					xianShiLiBao.bd_yanzhengma_btn.setBright(true);
					xianShiLiBao.bd_yanzhengma_btn.setTouchEnabled(true);
					xianShiLiBao.YZM_daojishi.setString("");
					xianShiLiBao.bd_shoujihao.setEnabled(true);
					xianShiLiBao.bd_huoquwenben.setSpriteFrame("xianshi_an_hqyzm.png");
				}
				cc.pool.putInPool(zhezhao);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/xianshilibao","res/shz/TanChuCeng/tanChuCengRes/xianShiLiBao_JR","res/shz/TanChuCeng/tanChuCengRes/VIP_LingQu_Tu"];
				removeResources(numberAry);
			});
			//每日充值活动
			xianShiLiBaoMrcz.createMeiRiChongZhiLayer(xianShiLiBao.jsonLayer);
			xianShiLiBao.meiRiChongZhiNode = xianShiLiBao.jsonLayer.getChildByTag(500);
			xianShiLiBao.meiRiChongZhiNode.setVisible(false);
			
			//按钮事件
			xianShiLiBao.xianShiChongZhiNode = xianShiLiBao.jsonLayer.getChildByName("XS_xianshichongzhi_node");
			xianShiLiBao.xianLiangNode = xianShiLiBao.jsonLayer.getChildByName("XS_meirixianliang_node");
			xianShiLiBao.duiHuanMaNoe = xianShiLiBao.jsonLayer.getChildByName("XS_duihuanma_node");
			
			xianShiLiBao.yibangdingNode = xianShiLiBao.jsonLayer.getChildByName("xs_yibangding_node");
			xianShiLiBao.yibangdingNode.setVisible(false);
			xianShiLiBao.bd_yibangshojihao = xianShiLiBao.yibangdingNode.getChildByName("xs_yibangshoujihao");
			xianShiLiBao.bd_yibangshojihao.y = xianShiLiBao.bd_yibangshojihao.y + 8;
			xianShiLiBao.zhuangtaitiao = xianShiLiBao.jsonLayer.getChildByName("XS_kuangshangtao_bg");
			xianShiLiBao.yibangdingNode.getChildByName("xianshi_shurukuang_14").setVisible(false);
			xianShiLiBao.bangDingSongJinNode = xianShiLiBao.jsonLayer.getChildByName("XS_bangdingsongjing_node");
			xianShiLiBao.bangDingSongJinNode.setVisible(false);
		
				xianShiLiBao.zhongQiuJieLiBaoNode = new jieRi.Node();
				xianShiLiBao.zhongQiuJieLiBaoNode.x = xianShiLiBao.meiRiChongZhiNode.x;
				xianShiLiBao.zhongQiuJieLiBaoNode.y = xianShiLiBao.meiRiChongZhiNode.y;
				xianShiLiBao.zhongQiuJieLiBaoNode.setVisible(false);
				xianShiLiBao.jsonLayer.addChild(xianShiLiBao.zhongQiuJieLiBaoNode,10,33);
//			
				xianShiLiBao.vipLiBaoNode = new jieRi.Node();
				xianShiLiBao.vipLiBaoNode.x = xianShiLiBao.meiRiChongZhiNode.x;
				xianShiLiBao.vipLiBaoNode.y = xianShiLiBao.meiRiChongZhiNode.y;
				xianShiLiBao.vipLiBaoNode.setVisible(false);
				xianShiLiBao.jsonLayer.addChild(xianShiLiBao.vipLiBaoNode,10,34);
				
				xianShiLiBao.JF_huoDongNode = ccs.load("res/shz/huoDong/JF_huoDongNode.json").node;
				xianShiLiBao.JF_huoDongNode.x = xianShiLiBao.meiRiChongZhiNode.x+100;
				xianShiLiBao.JF_huoDongNode.y = xianShiLiBao.meiRiChongZhiNode.y-40;
				xianShiLiBao.JF_huoDongNode.setVisible(false);
				xianShiLiBao.jsonLayer.addChild(xianShiLiBao.JF_huoDongNode , 10 , 35);
				
				var canJiaHuoDong_btn = xianShiLiBao.JF_huoDongNode.getChildByName("JF_canYuBtn");
				canJiaHuoDong_btn.tag = 110;
				canJiaHuoDong_btn.addClickEventListener(this.scrollView_btn);
			
			
			var bangding = xianShiLiBao.bangDingSongJinNode;

			xianShiLiBao.bd_tishiyu = bangding.getChildByName("xs_bd_tishiyu");

			xianShiLiBao.bd_shoujihao = bangding.getChildByName("XS_shoujihao");
			var pos = xianShiLiBao.bd_shoujihao.getPosition();
			xianShiLiBao.bd_shoujihao = new cc.EditBox(cc.size(270.00,46),new cc.Scale9Sprite("xianshi_shurukuang.png"));
			bangding.addChild(xianShiLiBao.bd_shoujihao);
			xianShiLiBao.bd_shoujihao.setPosition(pos.x	, pos.y);
			xianShiLiBao.bd_shoujihao.setDelegate(this);
			xianShiLiBao.bd_shoujihao.setFont("Arial",20);
			xianShiLiBao.bd_shoujihao.setFontColor(cc.color(0, 0, 0, 255));
			xianShiLiBao.bd_shoujihao.setPlaceHolder("请输入手机号");
			xianShiLiBao.bd_shoujihao.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);//修改为不使用密文
			xianShiLiBao.bd_shoujihao.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);


			xianShiLiBao.bd_yanzhengma = bangding.getChildByName("XS_yanzhengma");
			var pos1 = xianShiLiBao.bd_yanzhengma.getPosition(); 
			xianShiLiBao.bd_yanzhengma = new cc.EditBox(cc.size(270.00,46),new cc.Scale9Sprite("xianshi_shurukuang.png"));
			bangding.addChild(xianShiLiBao.bd_yanzhengma);
			xianShiLiBao.bd_yanzhengma.setPosition(pos1.x, pos1.y);
			xianShiLiBao.bd_yanzhengma.setDelegate(this);
			xianShiLiBao.bd_yanzhengma.setFont("Arial",20);
			xianShiLiBao.bd_yanzhengma.setFontColor(cc.color(0, 0, 0, 255));
			xianShiLiBao.bd_yanzhengma.setPlaceHolder("请输入验证码");
			xianShiLiBao.bd_yanzhengma.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);//修改为不使用密文
			xianShiLiBao.bd_yanzhengma.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);

			xianShiLiBao.bd_yanzhengma_btn = bangding.getChildByName("XS_hqyzm_btn");
			xianShiLiBao.bd_yanzhengma_btn.tag = 131;//获取验证码
			xianShiLiBao.bd_yanzhengma_btn.addClickEventListener(this.scrollView_btn);
			xianShiLiBao.bd_huoquwenben = xianShiLiBao.bd_yanzhengma_btn.getChildByName("Sprite_18");
			xianShiLiBao.bd_huoqutime = xianShiLiBao.bd_yanzhengma_btn.getChildByName("time_cxhq");
			xianShiLiBao.YZM_daojishi = new cc.LabelBMFont("60","res/shz/TanChuCeng/tanChuCengRes/time01.fnt");
			xianShiLiBao.YZM_daojishi.setPosition(-1, -3);
			xianShiLiBao.YZM_daojishi.setVisible(false);
			xianShiLiBao.bd_huoqutime.addChild(xianShiLiBao.YZM_daojishi,10,10);
			xianShiLiBao.bd_lijibangding_btn = bangding.getChildByName("XS_ljbd_btn");
			xianShiLiBao.bd_lijibangding_btn.tag = 132;//立即绑定
			xianShiLiBao.bd_lijibangding_btn.addClickEventListener(this.scrollView_btn);


			//限时活动左边scrollView选项
			xianShiLiBao.scrollView_btn_zu = xianShiLiBao.jsonLayer.getChildByName("XS_ScrollView");
			xianShiLiBao.scrollView_btn_zu.setVisible(false);
			xianShiLiBao.xianShi_btn = xianShiLiBao.scrollView_btn_zu.getChildByName("XS_chongzhi_btn");
			xianShiLiBao.xianShi_btn.tag = 101;
			xianShiLiBao.xianShi_btn.addClickEventListener(this.scrollView_btn);
			xianShiLiBao.xianLiang_btn = xianShiLiBao.scrollView_btn_zu.getChildByName("XS_xianliang_btn");
			xianShiLiBao.xianLiang_btn.tag = 102;
			xianShiLiBao.xianLiang_btn.addClickEventListener(this.scrollView_btn);
			var hongDian1 = cc.Sprite.createWithSpriteFrameName("hongdian.png");
			hongDian1.x = 195;
			hongDian1.y = 52;
			xianShiLiBao.xianLiang_btn.addChild(hongDian1,0,6);
			hongDian1.setVisible(false);
			xianShiLiBao.duiHuan_btn = xianShiLiBao.scrollView_btn_zu.getChildByName("XS_duihuanma_btn");
			xianShiLiBao.duiHuan_btn.tag = 103;
			xianShiLiBao.duiHuan_btn.addClickEventListener(this.scrollView_btn);
			xianShiLiBao.bangDing_btn = xianShiLiBao.scrollView_btn_zu.getChildByName("XS_songlijing_btn");
			xianShiLiBao.bangDing_btn.tag = 104;
			cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/mrcz_plist.plist");
			cc.spriteFrameCache.addSpriteFrames("res/shz/huoDong/JF_tu.plist");
			xianShiLiBao.mrcz_btn =  new ccui.Button("mrcz_btn_mrcz01.png","mrcz_btn_mrcz02.png","mrcz_btn_mrcz03.png",ccui.Widget.PLIST_TEXTURE);
			xianShiLiBao.mrcz_btn.addClickEventListener(this.scrollView_btn);
			xianShiLiBao.scrollView_btn_zu.addChild(xianShiLiBao.mrcz_btn,0,105);
			var type = 0;
			if(xianShiLiBao.JF_hongDian){
				type = 1;
			}else{
				type = 0;
			}
			var huoDongNode_btn = this.chuangJianBtn_jeRi("JF_btnTile.png",109 ,type);
			
			var hongDian = cc.Sprite.createWithSpriteFrameName("hongdian.png");
			hongDian.x = 195;
			hongDian.y = 52;
			xianShiLiBao.mrcz_btn.addChild(hongDian,0,6);
			hongDian.setVisible(false);
			xianShiLiBao.scrollBtnZu_array = [xianShiLiBao.duiHuan_btn ,huoDongNode_btn,xianShiLiBao.bangDing_btn ,xianShiLiBao.mrcz_btn,xianShiLiBao.xianLiang_btn];
			xianShiLiBao.zaiscrollViewAddBtn(xianShiLiBao.scrollBtnZu_array.length, xianShiLiBao.scrollBtnZu_array);
			xianShiLiBao.bangDing_btn.setVisible(true);
			xianShiLiBao.bangDing_btn.addClickEventListener(this.scrollView_btn);
			xianShiLiBao.duihuanma_btn = xianShiLiBao.duiHuanMaNoe.getChildByName("XS_queding_btn");
			xianShiLiBao.duihuanma_btn.tag = 120;
			xianShiLiBao.duihuanma_btn.addClickEventListener(this.scrollView_btn);
			xianShiLiBao.bd_jiechubangding = xianShiLiBao.yibangdingNode.getChildByName("xs_jcbd_btn");
			xianShiLiBao.bd_jiechubangding.tag = 133;//解除绑定
			xianShiLiBao.bd_jiechubangding.addClickEventListener(this.scrollView_btn);
			xianShiLiBao.bd_jiechubangding.setVisible(false);
			var xiangQing = xianShiLiBao.duiHuanMaNoe.getChildByName("XS_xiangqing_btn");//详情按钮
			xiangQing.tag = 134;
			xiangQing.addClickEventListener(this.scrollView_btn);
			
			var duihuanma_shuRuNode = xianShiLiBao.duiHuanMaNoe.getChildByName("XS_shurukuang_bg");
			duihuanma_shuRuNode.setVisible(false);
			
			xianShiLiBao.duihuanma_fileText = new cc.EditBox(cc.size(346, 57),new cc.Scale9Sprite("xianshi_shu_duihuanma.png"));
			xianShiLiBao.duihuanma_fileText.setFontColor(cc.color.BLACK);
			xianShiLiBao.duihuanma_fileText.setFont("Arial",20);
			
			xianShiLiBao.duihuanma_fileText.setPosition(duihuanma_shuRuNode.x, duihuanma_shuRuNode.y);
			xianShiLiBao.duihuanma_fileText.setDelegate(this);
			xianShiLiBao.duihuanma_fileText.setMaxLength(20);
			xianShiLiBao.duihuanma_fileText.setPlaceHolder("  请输入兑换码");
			xianShiLiBao.duihuanma_fileText.setPlaceholderFontSize(20);
			xianShiLiBao.duihuanma_fileText.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);//修改为不使用密文
			xianShiLiBao.duihuanma_fileText.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
			xianShiLiBao.duiHuanMaNoe.addChild(xianShiLiBao.duihuanma_fileText,2);
			
			cc.log("duihuanmaX:"+xianShiLiBao.duihuanma_fileText.x + "duihuanmaY:"+xianShiLiBao.duihuanma_fileText.y);
			
			//去掉粘帖功能
//			cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/JJJ_CZ.plist");
//			var nianTie =new ccui.Button("1_1.png","2_2.png","3_3.png",ccui.Widget.PLIST_TEXTURE);
//			nianTie.x =  xianShiLiBao.duihuanma_fileText.x+250;
//			nianTie.y =  xianShiLiBao.duihuanma_fileText.y;
//			
//			nianTie.addClickEventListener(function() {
//				if(xianShiLiBao.duiHuanMa){
//					xianShiLiBao.duihuanma_fileText.setString(xianShiLiBao.duiHuanMa);
//				}
//			});
//			nianTie.tag = 99;
//			xianShiLiBao.duiHuanMaNoe.addChild(nianTie,10);
//			nianTie.setVisible(true);
//			var niantie_img = cc.Sprite.createWithSpriteFrameName("zhantie.png");
//			niantie_img.x = nianTie.x ;
//			niantie_img.y = nianTie.y;
//			xianShiLiBao.duiHuanMaNoe.addChild(niantie_img,11);
//			niantie_img.setVisible(false);
			xianShiLiBao.duihuanma_tishi = xianShiLiBao.duiHuanMaNoe.getChildByName("Text_1");

			xianShiLiBao.xianliang_benglong = xianShiLiBao.xianLiangNode.getChildByName("XS_tiaoshangbiaoti");
			xianShiLiBao.xianliang_benglong.setVisible(true);

			xianShiLiBao.xianliang_xiaci = xianShiLiBao.xianLiangNode.getChildByName("XS_tiaoshangbiaoti_XCHD");
			xianShiLiBao.xianliang_xiaci.setVisible(false);

			xianShiLiBao.xianShiChongZhiNode.setVisible(true);
			xianShiLiBao.xianLiangNode.setVisible(false);
			xianShiLiBao.duiHuanMaNoe.setVisible(false);
			xianShiLiBao.bangDingSongJinNode.setVisible(false);
//			xianShiLiBao.xianShi_btn.setBright(false);
//			xianShiLiBao.xianShi_btn.setTouchEnabled(false);
			
			xianShiLiBao.XS_xsORmr = 1;//tableView要加载的项 （1，限时充值    2，每日限量    3，每日充值）
			xianShiLiBao.createTableView();
			xianShiLiBao.creatHttp(1);
			xianShiLiBao.creatHttp(9);
			xianShiLiBao.liangWan =	cc.LabelBMFont("20000","res/shz/TanChuCeng/tanChuCengRes/qd_2.fnt");
			xianShiLiBao.liangWan.x =0;
			xianShiLiBao.liangWan.y =0;
			xianShiLiBao.bangDingSongJinNode.getChildByName("XS_tiaozhongzi_node").addChild(xianShiLiBao.liangWan , 10);
			xianShiLiBao.bd_huoquwenben.setSpriteFrame("xianshi_an_hqyzm.png");
			
			var jianTou11 = cc.Sprite.createWithSpriteFrameName("VIP_jiantou.png");
			jianTou11.x = -340;
			jianTou11.y = 180;
			jianTou11.setRotation(-90);
			xianShiLiBao.jsonLayer.addChild(jianTou11, 100, 126);
			jianTou11.setVisible(false);
			
			var jianTou22 = cc.Sprite.createWithSpriteFrameName("VIP_jiantou.png");
			jianTou22.x = -340;
			jianTou22.y = -230;
			jianTou22.setRotation(90);
			xianShiLiBao.jsonLayer.addChild(jianTou22, 100, 127);
			jianTou22.setVisible(false);
			GameHalll.schedule(xianShiLiBao.scrollView_btn_zu_setOff, 0.1, cc.REPEAT_FOREVER);
			GameHalll.creatHttp(2);
			
		},
		scrollView_btn_zu_setOff : function() {
			var offset = xianShiLiBao.scrollView_btn_zu.getInnerContainer();
			if(offset.y > -36*xianShiLiBao.scrollBtnZu_array.length){
				xianShiLiBao.jsonLayer.getChildByTag(126).setVisible(true);
			}else if(offset.y <=  -36*xianShiLiBao.scrollBtnZu_array.length ){
				xianShiLiBao.jsonLayer.getChildByTag(126).setVisible(false);
			}
			if(offset.y < 0){
				xianShiLiBao.jsonLayer.getChildByTag(127).setVisible(true);
			}else if(offset.y >= 0 ){
				xianShiLiBao.jsonLayer.getChildByTag(127).setVisible(false);
			}
		},
		chuangJianBtn_jeRi : function(name , tag,hide) {
			var btn =  new ccui.Button("anniu1.png","anniu2.png","anniu1_.png",ccui.Widget.PLIST_TEXTURE);
			btn.addClickEventListener(this.scrollView_btn);
			var vip = cc.Sprite.createWithSpriteFrameName(name);
			vip.x = 104;
			vip.y = 29;
			btn.addChild(vip,0,5);
			var hongDian = cc.Sprite.createWithSpriteFrameName("hongdian.png");
			hongDian.x = 195;
			hongDian.y = 52;
			btn.addChild(hongDian,0,6);
			if(hide == 1){
				hongDian.setVisible(true);
			}else if(hide == 0){
				hongDian.setVisible(false);
			}
			xianShiLiBao.scrollView_btn_zu.addChild(btn,0,tag);
			xianShiLiBao.scrollBtnZu_array.splice(2, 0, btn);
			return btn;
		},
		
		addJieRiBtnZu : function(data) {
			var self = this;
             if(data.length>0){
            	 for ( var key in data) {
            		 switch (data[key].atid) {
            		 case 5:
            			 self.chuangJianBtn_jeRi("VIP_btnTile2.png", 106, data[key].obtain);
            			 break;
            		 case 4:
            			 self.chuangJianBtn_jeRi("JR_zhongQiuLiBao.png", 107, data[key].obtain);
            			 break;
            		 case 6:
            			 self.chuangJianBtn_jeRi("JR_guoQi.png", 108, data[key].obtain);
            			 break;
            		 default:
            			 break;
            		 }
				 }
             }
             self.zaiscrollViewAddBtn(xianShiLiBao.scrollBtnZu_array.length, xianShiLiBao.scrollBtnZu_array);
		},
		zaiscrollViewAddBtn : function(length ,array , hideNumber) {
			if(length>4){
				xianShiLiBao.scrollView_btn_zu.setInnerContainerSize(cc.size(220, 360+(length-4)*85));
			}
			for (var i = 0; i < length; i++) {
				array[i].x = 116;
				array[i].y = 44+87*i;
				if(i<hideNumber){
					array[i].setVisible(false);
				}
			}
		},
		daojishi_jishuqi : 0,
		bangDingDaoJiShi : function() {
			if(xianShiLiBao.YZM_endtime > 0){
				xianShiLiBao.YZM_daojishi.setString(xianShiLiBao.YZM_endtime);
				xianShiLiBao.YZM_endtime--;

			}else if( xianShiLiBao.YZM_endtime == 0){
				xianShiLiBao.bd_yanzhengma_btn.setBright(true);
				xianShiLiBao.bd_yanzhengma_btn.setTouchEnabled(true);
				xianShiLiBao.YZM_daojishi.setString("");
				xianShiLiBao.bd_huoquwenben.setSpriteFrame("xianshi_cxhq.png");
				GameHalll.unschedule(xianShiLiBao.bangDingDaoJiShi);
				xianShiLiBao.bd_shoujihao.setEnabled(true);
				xianShiLiBao.YZM_daojishi.setVisible(false);
			}
		},

		chuLiShiJian : function(ziJie_Ary,time) {
			
			var time_fangfa = time;
			for (var i = ziJie_Ary.length-1; i >0; i--) {
				if(ziJie_Ary.length>3){
					if(i >1){
						ziJie_Ary[i].setString(time_fangfa%60);
						time_fangfa = (time_fangfa - time_fangfa%60)/60;
					}else if( i == 1){
						ziJie_Ary[i].setString(time_fangfa%24);
						time_fangfa = (time_fangfa - time_fangfa%24)/24;
						ziJie_Ary[i-1].setString(time_fangfa);
					}
					
				}else if(ziJie_Ary.length <=3){
					if(i >1){
						ziJie_Ary[i].setString(time_fangfa%60);
						time_fangfa = (time_fangfa - time_fangfa%60)/60;
					}else if( i == 1){
						ziJie_Ary[i].setString(time_fangfa%60);
						ziJie_Ary[i-1].setString(Math.floor(time_fangfa/60));
					}
				}
					
			}
		},
		
		daojishi : function(){
			if(xianShiLiBao.XS_endtime>=0){
				if(xianShiLiBao.Array_label_xscz.length == 0){
					xianShiLiBao.daojishiLimited(xianShiLiBao.xianShiChongZhiNode, xianShiLiBao.Array_label_xscz , "XS_tiaoshangbiaoti");

				}
				var time_xianshihttpPostData = xianShiLiBao.XS_endtime;
				xianShiLiBao.chuLiShiJian(xianShiLiBao.Array_label_xscz, time_xianshihttpPostData);
				xianShiLiBao.XS_endtime--;
			}
			if(xianShiLiBao.MR_endtime >=0){
				if(xianShiLiBao.Array_label_mrxl.length == 0){
					xianShiLiBao.daojishiLimited(xianShiLiBao.xianLiangNode, xianShiLiBao.Array_label_mrxl , "XS_tiaoshangbiaoti");
				}
				var time_meirihttpPostData = xianShiLiBao.MR_endtime;
				xianShiLiBao.chuLiShiJian(xianShiLiBao.Array_label_mrxl,time_meirihttpPostData);
				xianShiLiBao.MR_endtime--;

			}
			if(xianShiLiBao.XC_endtime >=0){
				if(xianShiLiBao.Array_label_xcxl.length == 0){
					xianShiLiBao.daojishiLimited(xianShiLiBao.xianLiangNode, xianShiLiBao.Array_label_xcxl , "XS_tiaoshangbiaoti_XCHD");
				}
				var time_meirihttpPostData = xianShiLiBao.XC_endtime;
				xianShiLiBao.chuLiShiJian(xianShiLiBao.Array_label_xcxl, time_meirihttpPostData);
				xianShiLiBao.XC_endtime--;
			}

			if(xianShiLiBao.XS_xsORmr ==2 ){
				for ( var key in xianShiLiBao.Array_label_mrxl) {
					if(xianShiLiBao.MR_endtime >= 0){
						if(xianShiLiBao.Array_label_mrxl[key].getString() == 0 &&xianShiLiBao.MR_endtime ==0){
							xianShiLiBao.daojishi_jishuqi++;
						}
					}
				}
				for ( var key in xianShiLiBao.Array_label_xcxl) {
					if(xianShiLiBao.XC_endtime >= 0){
						if(xianShiLiBao.Array_label_xcxl[key].getString() == 0 &&xianShiLiBao.XC_endtime ==0){
							xianShiLiBao.daojishi_jishuqi++;
						}
					}
				}
				if(xianShiLiBao.daojishi_jishuqi==2){
					xianShiLiBao.creatHttp(3);
					xianShiLiBao.XS_tableView.setVisible(false);
					GameHalll.unschedule(xianShiLiBao.daojishi);
				}
			}
			if(xianShiLiBao.XS_xsORmr ==1 ){
				for ( var key in xianShiLiBao.Array_label_xscz) {
					if(xianShiLiBao.Array_label_xscz[key].getString() == 0 &&xianShiLiBao.XS_endtime ==0){
						xianShiLiBao.daojishi_jishuqi++;
					}
				}
				if(xianShiLiBao.daojishi_jishuqi==3){
					xianShiLiBao.creatHttp(1);
					xianShiLiBao.XS_tableView.setVisible(false);
					GameHalll.unschedule(xianShiLiBao.daojishi);
				}
			}
		},

		daojishiLimited:function(node,array,str){
		
				var Limited_daojishi =  node.getChildByName(str);
				var time = Limited_daojishi.getChildren();//四个节点：天，时，分，秒
				for (var i = 0; i < time.length; i++) {
					var label = cc.LabelTTF("60", "Arial", 20);
					label.setColor(cc.color(0, 0, 0, 255));
					label.setPosition(-1, -3);
					time[i].addChild(label,10);
					array.push(label);
				}
			
			
		},

		//隐藏  显示 相应的选项按钮（每日限量，限时礼包，绑定送金币，每日充值,vip礼包，中秋节礼包）
		scrollView_btn_caoZuo : function(type,tag) {
			if(type == 1 || type ==2){
				xianShiLiBao.MR_endtime = 0;
				xianShiLiBao.XC_endtime = 0;
				xianShiLiBao.XS_endtime = 0;
			}
			xianShiLiBao.XS_xsORmr = type;
			for ( var key in xianShiLiBao.scrollBtnZu_array) {
				if(xianShiLiBao.scrollBtnZu_array[key].tag ==tag){
					xianShiLiBao.scrollBtnZu_array[key].setBright(false);
					xianShiLiBao.scrollBtnZu_array[key].setTouchEnabled(false);
				}else{
					xianShiLiBao.scrollBtnZu_array[key].setBright(true);
					xianShiLiBao.scrollBtnZu_array[key].setTouchEnabled(true);
				}
				
			}
		},
		btnDuiYingDeNode : function(node_one,node_two,node_three,node_four,node_five,node_six,node_seven,node_eight,node_nine) {
			xianShiLiBao.xianShiChongZhiNode.setVisible(node_one);
			xianShiLiBao.xianLiangNode.setVisible(node_two);
			xianShiLiBao.duiHuanMaNoe.setVisible(node_three);
			xianShiLiBao.bangDingSongJinNode.setVisible(node_four);
			xianShiLiBao.yibangdingNode.setVisible(node_five);
			xianShiLiBao.meiRiChongZhiNode.setVisible(node_six);
			
			xianShiLiBao.zhongQiuJieLiBaoNode.setVisible(node_seven);
			xianShiLiBao.vipLiBaoNode.setVisible(node_eight);
			var XS_baiKuang = xianShiLiBao.jsonLayer.getChildByName("XS_baikuang");
			xianShiLiBao.XS_tableView.setVisible(false);
			if(node_nine){
				xianShiLiBao.JF_huoDongNode.setVisible(node_nine);
				xianShiLiBao.zhuangtaitiao.setVisible(false);
				XS_baiKuang.setVisible(false);
			}else{
				xianShiLiBao.JF_huoDongNode.setVisible(node_nine);
				xianShiLiBao.zhuangtaitiao.setVisible(true);
				XS_baiKuang.setVisible(true);
			}
		},
		taleCell_btn : function() {
			switch (xianShiLiBao.XS_xsORmr) {
			case 1://限时抢购
				xianShiLiBao.creatHttp(2, (this.tag-200));
				break;
			case 2 :// 每日限量
				xianShiLiBao.creatHttp(4, (this.tag-300),this);
				break;
			default:
				break;
			}

		},
		scrollView_btn : function() {

			if(xianShiLiBao.YZM_endtime == 0){
				xianShiLiBao.YZM_daojishi.setVisible(false);
			}
			switch (this.tag) {
			case 101://限时充值
				GameHalll.unschedule(xianShiLiBao.daojishi);
				xianShiLiBao.scrollView_btn_caoZuo(1,101);
				xianShiLiBao.btnDuiYingDeNode( true, false, false, false, false, false,false,false,false);
				xianShiLiBao.creatHttp(1);
				break;
			case 102://每日限量
				xianShiLiBao.scrollView_btn_caoZuo(2,102);
				xianShiLiBao.btnDuiYingDeNode( false, true, false, false, false, false,false,false,false);
				xianShiLiBao.creatHttp(3);
				break;
			case 103://兑换码
				GameHalll.unschedule(xianShiLiBao.daojishi);
				xianShiLiBao.scrollView_btn_caoZuo(3,103);
				xianShiLiBao.btnDuiYingDeNode( false, false, true, false, false, false,false,false,false);
				break;
			case 104://绑定送金按钮
				xianShiLiBao.scrollView_btn_caoZuo(4,104);
				xianShiLiBao.btnDuiYingDeNode(false, false, false, false, false, false,false,false,false);
				xianShiLiBao.creatHttp(5);
				break;
			case 105://每日充值领奖

				xianShiLiBao.scrollView_btn_caoZuo(4,105);
				xianShiLiBao.btnDuiYingDeNode(false, false, false, false, false, true,false,false,false);
				xianShiLiBaoMrcz.creatHttp();
				break;
				//200-202限时抢购
			case 106://vip领奖
				if(xianShiLiBao.vipLiBaoNode){
					xianShiLiBao.scrollView_btn_caoZuo(4,106);
					xianShiLiBao.btnDuiYingDeNode(false, false, false, false, false, false,false,true,false);
					xianShiLiBao.vipLiBaoNode.atid = 5;
					xianShiLiBao.vipLiBaoNode.createBuTongZhuangTai(xianShiLiBao.vipLiBaoNode.atid);
					xianShiLiBao.vipLiBaoNode.creatHttp(xianShiLiBao.vipLiBaoNode.atid);
				}
				break;
			case 107://中秋节礼包
				if(xianShiLiBao.zhongQiuJieLiBaoNode){
					xianShiLiBao.scrollView_btn_caoZuo(4,107);
					xianShiLiBao.btnDuiYingDeNode(false, false, false, false, false, false,true,false,false);
					xianShiLiBao.zhongQiuJieLiBaoNode.atid = 4;
					xianShiLiBao.zhongQiuJieLiBaoNode.createBuTongZhuangTai(xianShiLiBao.zhongQiuJieLiBaoNode.atid);
					xianShiLiBao.zhongQiuJieLiBaoNode.creatHttp(xianShiLiBao.zhongQiuJieLiBaoNode.atid);
				}
				break;
			case 108://国庆礼包
				if(xianShiLiBao.zhongQiuJieLiBaoNode){
					xianShiLiBao.scrollView_btn_caoZuo(4,108);
					xianShiLiBao.btnDuiYingDeNode(false, false, false, false, false, false,true,false,false);
					xianShiLiBao.zhongQiuJieLiBaoNode.atid = 6;
					xianShiLiBao.zhongQiuJieLiBaoNode.createBuTongZhuangTai(xianShiLiBao.zhongQiuJieLiBaoNode.atid);
					xianShiLiBao.zhongQiuJieLiBaoNode.creatHttp(xianShiLiBao.zhongQiuJieLiBaoNode.atid);
				}
				break;
			case 109:
				xianShiLiBao.scrollView_btn_caoZuo(4,109);
				xianShiLiBao.btnDuiYingDeNode(false, false, false, false, false, false,false,false,true);
				break;
			case 110:
				cc.log("#########1");
				if(!xianShiLiBao.isTanChu_JFTS && !huoDong_JF.isShiJianDao){
					cc.log("#########");
					GameHalll.unschedule(xianShiLiBao.bangDingDaoJiShi);
					xianShiLiBao.isTanChu_JFTS = true;
					loginServer.sendMessage(103,3);
				}
				break;
			case 120 :
				cc.log("********************");
				xianShiLiBao.duihuanma_tishi.setString("");
				if(xianShiLiBao.duihuanma_fileText.getString()){
					loginServer.sendMessage(MDM_MB_USER_SERVICE, SUB_MB_REQUEST_EXCHANGE_CDKEY,{dwUserID : USER_dwUserID,wKindID : 203 ,szCardKey : xianShiLiBao.duihuanma_fileText.getString()});
				}else{
					xianShiLiBao.duihuanma_tishi.setString("兑换码为空，请重新输入！");
				}
				break;
			case 131://获取验证码
				var shoujihao = xianShiLiBao.bd_shoujihao.getString();
				xianShiLiBao.bd_tishiyu.setString("");
				if(shoujihao == ""){
					xianShiLiBao.bd_tishiyu.setString("请输入手机号，谢谢！");
					return; 
				}
				if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(shoujihao)) || shoujihao.length != 11 ){ 
					xianShiLiBao.bd_tishiyu.setString("您输入的手机号不是完整的11位手机号或者正确的手机号前七位");
					return; 
				} 
				xianShiLiBao.creatHttp(6);
				break;
			case 132 ://立即绑定

				if (xianShiLiBao.bd_shoujihao.getString().length != 11) {
					xianShiLiBao.bd_tishiyu.setString("您输入的手机号不正确，请重新输入");
					return;
				}else if (xianShiLiBao.bd_yanzhengma.length <6) {
					xianShiLiBao.bd_tishiyu.setString("您输入的验证码不正确，请重新输入");
				}
				xianShiLiBao.creatHttp(7);
				break;
			case 133://解除绑定
				var xinXi =  {Describe :"解除绑定会使账号处于危险状态！\n（重复绑定无法再次获得奖励）",errorCode : 3,isBack : false};
				var tishi = TiShiKuangZiDingYi.create(xinXi);
				cc.director.getRunningScene().addChild(tishi,1000);
				break;
				case 134 :
//				if(liBaoLingQu){
//					liBaoLingQu.createLiBaoLayer(xianShiLiBao._parent);
//				}
				break;
			default:
				break;
			}
		},
		
		//在空白处创建限时抢购的抢购项
		createTableView : function() {
			var XS_baiKuang = xianShiLiBao.jsonLayer.getChildByName("XS_baikuang");
			xianShiLiBao.XS_tableView = new cc.TableView(this,cc.size(620, 300));
			xianShiLiBao.XS_tableView.x =20;
			xianShiLiBao.XS_tableView.y =25;
			xianShiLiBao.XS_tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
			xianShiLiBao.XS_tableView.setDelegate(this);
			xianShiLiBao.XS_tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
			XS_baiKuang.addChild(xianShiLiBao.XS_tableView,2);
			xianShiLiBao.XS_tableView.reloadData();
		},//滑动事件
		scrollViewDidScroll:function (view) {
		},
		scrollViewDidZoom:function (view) {
		},
		//cell点击事件
		tableCellTouched:function (table, cell) {
		},
		tableCellSizeForIndex:function (table, idx) {
			return cc.size(612, 100);
		},
		//创建cell
		tableCellAtIndex:function (table, idx) {
			var strValue = idx.toFixed(0);
			var cell = table.dequeueCell();
			var data = null;
			var sprite;
			var lingQu;
			var sprite_jijiang;
			var	sprite_label;
			var XS_goumai;
			var label1_num_xscz;
			var sprite_mianfei;
			var sprite_shouqing;
			var label_fenshu ;
			var label_fenshu_old;
			var label_fenshu_now;
			var spHongdao;
			var label_xian;
			var label_shenyu;
			var jinQingQiDai;
			var yuanbao;
			var yigou;
			if(xianShiLiBao.xianshiData && xianShiLiBao.XS_xsORmr == 1  && xianShiLiBao.xianshiData.data){
				data = xianShiLiBao.xianshiData.data[idx];
			}else if( xianShiLiBao.meirixianliangData && xianShiLiBao.XS_xsORmr == 2 && xianShiLiBao.meirixianliangData.data){
				data = xianShiLiBao.meirixianliangData.data[idx];
			}
			//cell复用
			if (!cell) {
				cell = new cc.TableViewCell();
				
				sprite = ccs.load("res/shz/TanChuCeng/XS_tableCell.json").node;
				sprite.x = 612/2;
				sprite.y = 100/2;
				sprite.tag = 123;
				cell.addChild(sprite);
				
				if(sprite.getChildByName("XS_lingqu_btn")){
					sprite.removeChildByName("XS_lingqu_btn");
				}
				XS_goumai = sprite.getChildByName("XS_goumai_btn");
				
				yuanbao = cc.Sprite.createWithSpriteFrameName("xianshi_yb_"+(idx+1)+".png");
				yuanbao.x = -249.00;
				yuanbao.y = 0;
				sprite.addChild(yuanbao,20,10);
				
				sprite_jijiang =  cc.Sprite.createWithSpriteFrameName("xianshi_jjjx.png");
				sprite_jijiang.x = 0;
				sprite_jijiang.y = 0;
				sprite.addChild(sprite_jijiang,20,16);
				
				sprite_label = cc.LabelBMFont("?" + "元", "res/shz/TanChuCeng/tanChuCengRes/number_xshd.fnt");
				sprite_label.x = -249;
				sprite_label.y = -15;
				sprite_label.setVisible(false);
				sprite.addChild(sprite_label,20,11);
				
				label1_num_xscz = new cc.LabelTTF("(仅一次)", "Arial", 25);
				label1_num_xscz.x = 71;
				label1_num_xscz.y = 0;
				label1_num_xscz.setColor(cc.color(255, 0, 0, 255));
				sprite.addChild(label1_num_xscz,20,22);
				
				sprite_mianfei = cc.Sprite.createWithSpriteFrameName("mianfei.png");
				sprite_mianfei.x = sprite_label.x;
				sprite_mianfei.y = sprite_label.y;
				sprite_mianfei.setVisible(false);
				sprite.addChild(sprite_mianfei,20,33);

				sprite_shouqing = cc.Sprite.createWithSpriteFrameName("xianshi_sq.png");
				sprite_shouqing.x = 221;
				sprite_shouqing.y = 0;
				sprite.addChild(sprite_shouqing,20,34);

				jinQingQiDai = cc.Sprite.createWithSpriteFrameName("XS_jqqd.png");
				jinQingQiDai.x = XS_goumai.x;
				jinQingQiDai.y = XS_goumai.y;
				sprite.addChild(jinQingQiDai,31, 35);

				yigou = cc.Sprite.createWithSpriteFrameName("yigou.png");
				yigou.x = XS_goumai.x;
				yigou.y = XS_goumai.y;
				sprite.addChild(yigou,31, 36);


				label_fenshu = new cc.LabelTTF("0","Arial",25);
				label_fenshu.setFontFillColor(cc.color.BLACK);
				label_fenshu.x = -69;
				label_fenshu.y = 0;
				sprite.addChild(label_fenshu,20,12);
				
				label_fenshu_old=new cc.LabelTTF("0","Arial",20);
				label_fenshu_old.setFontFillColor(cc.color.BLACK);
				label_fenshu_old.x = -69;
				label_fenshu_old.y = 15;
				sprite.addChild(label_fenshu_old,20,15);

				spHongdao = cc.Sprite('#xianshi_sc.png');
				spHongdao.x = -69;
				spHongdao.y = 15;
				sprite.addChild(spHongdao,20,13);

				label_fenshu_now=new cc.LabelTTF("0","Arial",25);
				label_fenshu_now.setFontFillColor(cc.color.BLACK);
				label_fenshu_now.x =-69;
				label_fenshu_now.y = -15;
				sprite.addChild(label_fenshu_now,20,14);
				
				label_shenyu = cc.LabelTTF("剩余","Arial",25);
				label_shenyu.setColor(cc.color(0, 0, 0, 255));
				label_shenyu.x = 71;
				label_shenyu.y = 15;
				sprite.addChild(label_shenyu,20,65);

				label_xian = cc.LabelTTF("(0"+"/"+"0)", "Arial", 25);
				label_xian.x = 71;
				label_xian.y = -15;
				label_xian.setColor(cc.color(255, 0, 0, 255));
				sprite.addChild(label_xian,20,66);
			}
			
			sprite = cell.getChildByTag(123);
			sprite_mianfei = sprite.getChildByTag(33);
			label1_num_xscz = sprite.getChildByTag(22);
			sprite_shouqing = sprite.getChildByTag(34);
			label_fenshu =  sprite.getChildByTag(12);
			label_fenshu_old = sprite.getChildByTag(15);
			label_fenshu_now = sprite.getChildByTag(14);
			spHongdao = sprite.getChildByTag(13);
			sprite_label = sprite.getChildByTag(11);
			label_xian = sprite.getChildByTag(66);
			label_shenyu = sprite.getChildByTag(65);
			jinQingQiDai = sprite.getChildByTag(35);
			yuanbao = sprite.getChildByTag(10);
			XS_goumai = sprite.getChildByName("XS_goumai_btn");
			sprite_jijiang = sprite.getChildByTag(16);
			yigou = sprite.getChildByTag(36);
			cell.setVisible(true);
			yigou.setVisible(false);
			jinQingQiDai.setVisible(false);
			sprite_shouqing.setVisible(false);
			
			if(data){
				sprite.setVisible(true);
				yuanbao.setVisible(true);
				sprite_jijiang.setVisible(false);
				
				if(xianShiLiBao.XS_xsORmr == 1){//限时充值
					XS_goumai.setTouchEnabled(true);
					label_shenyu.setVisible(false);
					label_xian.setVisible(false);
					label1_num_xscz.setVisible(true);
					XS_goumai.setVisible(true);
					sprite_label.setVisible(true);
					sprite_label.setString(data.shopvalue+"元");
					sprite_mianfei.setVisible(false);
					if(data.shopstatus == 0){
						yigou.setVisible(true);
						XS_goumai.setVisible(false);
					}else if(data.shopstatus == 1){
						XS_goumai.tag = 200+idx;
						XS_goumai.addClickEventListener(xianShiLiBao.taleCell_btn)
					}
					
					if( data &&data.shopvalue == 0  ){
						label_fenshu.setString(	Producer.changeNumberToString(data.shopsourcegivescore));
						label_fenshu_old.setVisible(false);
						spHongdao.setVisible(false);
						label_fenshu_now.setVisible(false);
						label_fenshu.setVisible(true);
					}else if(data &&data.shopvalue != 0  ){
						cc.log("***********4"+data.shopsourcegivescore);
						label_fenshu_old.setString(Producer.changeNumberToString(data.shopsourcegivescore));
						label_fenshu_now.setString(Producer.changeNumberToString(data.shoplastgivescore));
						label_fenshu_old.setVisible(true);
						spHongdao.setVisible(true);
						label_fenshu_now.setVisible(true);
						label_fenshu.setVisible(false);
					}
				}else if(xianShiLiBao.XS_xsORmr == 2){//每日限量
					sprite_label.setVisible(true);
					sprite_label.setString(data.shopvalue+"元");
					label1_num_xscz.setVisible(false);
					label_shenyu.setVisible(true);
					label_xian.setVisible(true);
					sprite_mianfei.setVisible(false);
					label_xian.setString("("+data.surpluschange+"/"+data.totalchange+")");

					if( data &&data.shopvalue == 0  ){
						label_fenshu.setString(Producer.changeNumberToString(data.sourcegetscore));
						label_fenshu_old.setVisible(false);
						spHongdao.setVisible(false);
						label_fenshu_now.setVisible(false);
						label_fenshu.setVisible(true);
					}else if(data &&data.shopvalue != 0  ){
						label_fenshu_old.setString(Producer.changeNumberToString(data.sourcegetscore));
						label_fenshu_now.setString(Producer.changeNumberToString(data.lastgetscore));
						label_fenshu_old.setVisible(true);
						spHongdao.setVisible(true);
						label_fenshu_now.setVisible(true);
						label_fenshu.setVisible(false);
					}
					if(idx == 0 ){
						sprite_label.setVisible(false);
						if(data.shopvalue == 0 ){
							sprite_mianfei.setVisible(true);
						}
					}else{
						sprite_label.setVisible(true);
					}
					
					if(data.shopstatus == 1){
						XS_goumai.setVisible(true);
						XS_goumai.tag = 300+idx;
						XS_goumai.addClickEventListener(xianShiLiBao.taleCell_btn);
					}else if(data.shopstatus == 2){
						yigou.setVisible(true);
						XS_goumai.setVisible(false);
					}else if(data.shopstatus == 3){
						XS_goumai.setVisible(false);
						sprite_shouqing.setVisible(true);
					}
					if(data.surpluschange == 0){
						XS_goumai.setVisible(false);
						sprite_shouqing.setVisible(true);
					}
				}
			}else{
				//每日限量
				if(xianShiLiBao.XS_xsORmr == 2){
					if(!xianShiLiBao.isError){
						sprite_label.setVisible(true);
						sprite_label.setString("?"+"元");
						sprite_jijiang.setVisible(true);
						label1_num_xscz.setVisible(false);
						label_fenshu.setVisible(false);
						label_fenshu_old.setVisible(false);
						label_fenshu_now.setVisible(false);
						spHongdao.setVisible(false);
						XS_goumai.setVisible(false);
						jinQingQiDai.setVisible(true);
						label_xian.setVisible(false);
						label_shenyu.setVisible(false);
						label_fenshu.setVisible(false);
						if(xianShiLiBao.XS_xsORmr == 2 && idx ==0){
							sprite_mianfei.setVisible(true);
							sprite_label.setVisible(false);
						}else{
							sprite_mianfei.setVisible(false);
						}
						if(xianShiLiBao.XS_xsORmr == 1 && idx ==0){
							sprite_label.setVisible(false);
						}
					}else{
						cell.setVisible(false);
					}
				}else if(xianShiLiBao.XS_xsORmr == 1){//限时充值
					cell.setVisible(false);
				}
			}
			return cell;
		},
		//加载cell的个数
		numberOfCellsInTableView:function (table) {
			var length;
			if(xianShiLiBao.xianshiData && xianShiLiBao.XS_xsORmr == 1){
				if( xianShiLiBao.xianshiData.data.length>0){
					length = xianShiLiBao.xianshiData.data.length;
				}
			}else{
				length = 3;
			}

			if(xianShiLiBao.meirixianliangData && xianShiLiBao.XS_xsORmr == 2){
				if( xianShiLiBao.meirixianliangData.data.length>0){
					length = xianShiLiBao.meirixianliangData.data.length;
				}
			}else{
				length = 3;

			}
			return length;
		},
		
		//网络访问
		creatHttp : function(type,cellIdx,sender) {
			var testHttp = cc.loader.getXMLHttpRequest();
			var data = null;
			streamXHREvents(testHttp);
			var sign =null;
			if (SDKHelper.thirdSdkPay){
				sign =hex_md5( hex_md5(USER_zhangHao) +hex_md5(USER_szPassword));
			}else{
				sign =hex_md5( USER_zhangHao +hex_md5(USER_szPassword));
			};
			switch (type) {
			case 1:
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.xianshichongzhi_url);
				}else{
					testHttp.open("POST", xianshichongzhi_url);
				}
				data = "userid=" + USER_dwUserID + "&platformname=SHZ&channelid=1";
				xianShiLiBao.XS_endtime = 0;
				break;
			case 2:
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.xianshi_dianji_url);
				}else{
					testHttp.open("POST", xianshi_dianji_url);
				}
				data = "userid=" + USER_dwUserID + "&sign=" + sign + "&channelid=1&shopid=" + xianShiLiBao.xianshiData.data[cellIdx].id+"&platformname=SHZ";
				break;
			case 3:
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.meishixianliang_url);
				}else{
					testHttp.open("POST", meishixianliang_url);
				}
				data = "userid=" + USER_dwUserID + "&channelid=1";
				xianShiLiBao.XS_endtime = 0;
				break;
			case 4:
				if(xianShiLiBao.MR_endtime){
					if(shuiHuZhuanUrl){
						testHttp.open("POST", shuiHuZhuanUrl.xianliang_dianji_url);
					}else{
						testHttp.open("POST", xianliang_dianji_url);
					}
					data = "userid=" + USER_dwUserID + "&sign=" + sign + "&channelid=1&shopid=" + xianShiLiBao.meirixianliangData.data[cellIdx].id + "&typeid=";
				} else {
					var xinXi =  {Describe :"本轮活动已结束，请等待下轮活动开始！\n",errorCode : 1017,isBack : false};
					var tishi = TiShiKuang.create(xinXi);
					cc.director.getRunningScene().addChild(tishi,1000);
				}
				break;
			case 5://查询绑定
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.shouji_CXIS_BD_url);
				}else{
					testHttp.open("POST", shouji_CXIS_BD_url);
				}
				data = "uid="+USER_dwUserID;
				break;
			case 6://获取验证码
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.shouji_HQYZM_url);
				}else{
					testHttp.open("POST", shouji_HQYZM_url);
				}
				data = "uid="+USER_dwUserID+"&phone="+xianShiLiBao.bd_shoujihao.getString();
				break;
			case 7://立即绑定
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.shouji_BDCZ_url);
				}else{
					testHttp.open("POST", shouji_BDCZ_url);
				}
				data = "uid="+USER_dwUserID+"&phone="+xianShiLiBao.bd_shoujihao.getString()+"&code="+xianShiLiBao.bd_yanzhengma.getString();
				break;
			case 8://解除绑定
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.shouji_JCBD_url);
				}else{
					testHttp.open("POST", shouji_JCBD_url);
				}
				data = "uid="+USER_dwUserID+"&phone="+xianShiLiBao.bd_yibangshojihao.getString();
				break;
			case 9://获取节日按钮组
				data = "userid=" + USER_dwUserID;
				testHttp.open("GET", huoQu_jieRiBtnZu+data);
				
				break;
			default:
				break;
			}
	
			testHttp.onreadystatechange = function() {
				if(type == 9){
					
				}else{
					if (waitQuan.xianShi) {
						waitQuan.unuse();
					};
				}
				
				if(testHttp.readyState == 4 && testHttp.status == 200){
					var jieshouData = testHttp.responseText;
					var obj = 	eval("("+jieshouData+")");
					cc.log("***********8"+jieshouData);
					var xinXi = null;

					switch (type) {
					case 1:
						if (waitQuan.xianShi) {
							waitQuan.unuse();
						};
						xianShiLiBao.meirixianliangData = null;
						xianShiLiBao.xianshiData = null;
						if(obj.status == "success"){
							xianShiLiBao.daojishi_jishuqi = 0;
							GameHalll.schedule(xianShiLiBao.daojishi, 1, cc.REPEAT_FOREVER);
							xianShiLiBao.xianshiData = obj; 
							xianShiLiBao.XS_endtime = obj.endtime;
							xianShiLiBao.XS_tableView.setVisible(true);
							xianShiLiBao.XS_tableView.reloadData();
						}else if(obj.status == "fail"){
							xianShiLiBao.isError = false;
							xinXi =  {Describe :"商品列表获取失败！请稍后再试！\n"+obj.msg,errorCode : 1017,isBack : false};
						}else if(obj.status == "error"){
							xianShiLiBao.isError = true;
							if(xianShiLiBao.XS_endtime){
								xianShiLiBao.daojishi_jishuqi = 0;
								GameHalll.schedule(xianShiLiBao.daojishi, 1, cc.REPEAT_FOREVER);
								xianShiLiBao.xianShi_btn.setVisible(true);
							}else{
								xianShiLiBao.xianShi_btn.setVisible(false);
								xianShiLiBao.xianLiang_btn.setBright(false);
								xianShiLiBao.xianLiang_btn.setTouchEnabled(false);
								xianShiLiBao.xianShi_btn.setBright(true);
								xianShiLiBao.xianShi_btn.setTouchEnabled(true);
								xianShiLiBao.duiHuan_btn.setBright(true);
								xianShiLiBao.duiHuan_btn.setTouchEnabled(true);
								xianShiLiBao.xianShiChongZhiNode.setVisible(false);
								xianShiLiBao.xianLiangNode.setVisible(true);
								xianShiLiBao.duiHuanMaNoe.setVisible(false);
								xianShiLiBao.XS_xsORmr = 2;
								xianShiLiBao.creatHttp(3);
								xianShiLiBao.XS_tableView.setVisible(false);
							}
						}
						xianShiLiBao.scrollView_btn_zu.setVisible(true);
						break;
					case 2://限时充值
						if(obj.status == "success"){
							if(cellIdx == 0){
								if (waitQuan.xianShi) {
									waitQuan.unuse();
								} ;
								xinXi = {Describe :"恭喜您！领取成功！",errorCode : 1018,isBack : false};
							}else{
								xianShiLiBao.xianshigoumaiPrice = xianShiLiBao.xianshiData.data[cellIdx].shopvalue;
								if(cc.sys.os == cc.sys.OS_ANDROID){
									/**官网、分享、百度、媒体（）*/
//									jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView", 
//									"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "限时充值",xianShiLiBao.xianshigoumaiPrice , USER_dwUserID.toString() ,"activitytype=2&rowid="+obj.rownum+"&channelname=SHZ","1,2,3,4" );
									/**应用汇(应用汇的包不支持微信支付)*/

									if (!slocal.getItem("ORIGINAL_VERSION")) {
										jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView", 
												"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "限时充值",xianShiLiBao.xianshigoumaiPrice.toString() , USER_dwUserID.toString() ,"activitytype=2&rowid="+obj.rownum+"&channelname=SHZ","1" );
									}else {
										if (QUDAOHAO == QUDAOBIAOSHI.yyhshz_apk) {
											jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView", 
													"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "限时充值",xianShiLiBao.xianshigoumaiPrice.toString() , USER_dwUserID.toString() ,"activitytype=2&rowid="+obj.rownum+"&channelname=SHZ","1,3,4" );
										}else {
											jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView", 
													"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "限时充值",xianShiLiBao.xianshigoumaiPrice.toString() , USER_dwUserID.toString() ,"activitytype=2&rowid="+obj.rownum+"&channelname=SHZ","1,2,3,4" );
										}
									}

								}else if(cc.sys.os == cc.sys.OS_IOS){
									xianShiLiBao.isXianShiGouMai = true;
									xianShiLiBao.xianshilibaoRowNum = "activitytype=2&rowid="+obj.rownum+"&paymoney="+xianShiLiBao.meirixianliangPrice+"&channelname=SHZ";
									jsb.reflection.callStaticMethod( "purchasesdk", "pay:price:userid:payTypeString:otherOrderParams:","限时充值", xianShiLiBao.xianshigoumaiPrice, USER_dwUserID.toString(),"1,2,3,4","activitytype=2&rowid="+obj.rownum+"&channelname=SHZ" );//  activitytype:meir:1,xianshi:2,putong:0, rowid:putong:0,  channelname:SHZ
								}
							}
						}else if(obj.status == "fail"){
							xinXi =  {Describe :"购买失败,"+obj.msg,errorCode : 1019,isBack : false};
						}else {
							xinXi = {Describe :"购买失败,"+obj.msg,errorCode : 1020,isBack : false};
						}

						break;
					case 3:
						if (waitQuan.xianShi) {
							waitQuan.unuse();
						} ;
						xianShiLiBao.meirixianliangData = null;
						xianShiLiBao.xianshiData = null;
						if(obj.status == "success"){
							xianShiLiBao.meirixianliangData = obj; 
							xianShiLiBao.MR_endtime = obj.endtime;
							xianShiLiBao.xianliang_xiaci.setVisible(false);
							xianShiLiBao.xianliang_benglong.setVisible(true);
						}else if(obj.status == "fail" && obj.endtime){
							xianShiLiBao.isError = false;
							xianShiLiBao.xianliang_xiaci.setVisible(true);
							xianShiLiBao.xianliang_benglong.setVisible(false);
							xianShiLiBao.XC_endtime = obj.endtime;
							xinXi =  {Describe :"敬请期待"+obj.msg,errorCode : 1021,isBack : false};
						}else {
							xianShiLiBao.isError = true;
							xinXi =  {Describe :"商品列表获取失败！请稍后再试！\n"+obj.msg,errorCode : 1022,isBack : false};
						}
						if(xianShiLiBao.MR_endtime || xianShiLiBao.XC_endtime){
							xianShiLiBao.daojishi_jishuqi = 0;
							GameHalll.schedule(xianShiLiBao.daojishi, 1, cc.REPEAT_FOREVER);
						}
						xianShiLiBao.XS_tableView.setVisible(true);
						xianShiLiBao.XS_tableView.reloadData();
						break;
					case 4://每日限量
						if(obj.status == "success"){
							if(cellIdx == 0){
								if (waitQuan.xianShi) {
									waitQuan.unuse();
								} ;
								xinXi = {Describe :"恭喜您！领取成功！",errorCode : 1023,isBack : false};
								sender.setBright(false);
								sender.setTouchEnabled(false);
								sender.getChildByName("XS_btn_tile").setVisible(false);
								xianShiLiBao.creatHttp(3);
							}else {
								xianShiLiBao.isMeiRiXiaoLiang = true;
								xianShiLiBao.meirixianliangPrice = xianShiLiBao.meirixianliangData.data[cellIdx].shopvalue;
								if (SDKHelper.thirdSdkPay) {//这个是判断是否接入了第三方sdk;
									SDKHelper.thirdPay(xianShiLiBao.meirixianliangPrice,"金币","每日限量","0","1",obj.rownum);
								} else {
									if (cc.sys.os == cc.sys.OS_ANDROID) {
										if (!slocal.getItem("ORIGINAL_VERSION")) {
											jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView",
													"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "每日限量", xianShiLiBao.meirixianliangPrice.toString(), USER_dwUserID.toString(), "activitytype=1&rowid=" + obj.rownum + "&channelname=SHZ", "1");
										} else {
											if (QUDAOHAO == QUDAOBIAOSHI.yyhshz_apk) {
												jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView",
														"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "每日限量", xianShiLiBao.meirixianliangPrice.toString(), USER_dwUserID.toString(), "activitytype=1&rowid=" + obj.rownum + "&channelname=SHZ", "1,3,4");
											} else {
												jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView",
														"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "每日限量", xianShiLiBao.meirixianliangPrice.toString(), USER_dwUserID.toString(), "activitytype=1&rowid=" + obj.rownum + "&channelname=SHZ", "1,2,3,4");
											}
										}
									} else if (cc.sys.os == cc.sys.OS_IOS) {
										xianShiLiBao.xianshilibaoRowNum = "activitytype=1&rowid=" + obj.rownum + "&paymoney=" + xianShiLiBao.meirixianliangPrice + "&channelname=SHZ";
										jsb.reflection.callStaticMethod("purchasesdk", "pay:price:userid:payTypeString:otherOrderParams:", "每日限量", xianShiLiBao.meirixianliangPrice, USER_dwUserID.toString(), "1,2,3,4", "activitytype=1&rowid=" + obj.rownum + "&channelname=SHZ");//  activitytype:meir:1,xianshi:2,putong:0, rowid:putong:0,  channelname:SHZ
									}
									;
								}
							}
						}else if(obj.status == "fail"){
							xinXi = {Describe :"购买失败,"+obj.msg,errorCode : 1024,isBack : false};
						}else {
							xinXi = {Describe :"购买失败,"+obj.msg,errorCode : 1025,isBack : false};
						}
						break;
					case 5://查询绑定
						if(obj.code == 0){
							xianShiLiBao.yibangdingNode.setVisible(true);
							xianShiLiBao.bangDingSongJinNode.setVisible(false);
							xianShiLiBao.zhuangtaitiao.setVisible(false);
							xianShiLiBao.bd_yibangshojihao.setString(obj.result.msg);
						}else{
							xianShiLiBao.yibangdingNode.setVisible(false);
							xianShiLiBao.bangDingSongJinNode.setVisible(true);
							if(obj.result.msg == 0){
								slocal.setItem(xianShiLiBao.bangDing_key,"yes");
								xianShiLiBao.zhuangtaitiao.setVisible(false);
								xianShiLiBao.bangDingSongJinNode.getChildByName("XS_tiaoshangbiaoti").setVisible(false);
								xianShiLiBao.liangWan.setVisible(false);
							}
						}
						break;
					case 6://获取验证码
						if(obj.code == 0){
							xianShiLiBao.YZM_endtime = 59;
							GameHalll.schedule(xianShiLiBao.bangDingDaoJiShi,1, cc.REPEAT_FOREVER);
							xianShiLiBao.bd_yanzhengma_btn.setBright(false);
							xianShiLiBao.bd_yanzhengma_btn.setTouchEnabled(false);
							xianShiLiBao.YZM_daojishi.setVisible(true);
							xianShiLiBao.bd_shoujihao.setEnabled(false);
							xianShiLiBao.bd_huoquwenben.setSpriteFrame("xianshi_cxhq1.png");
						}else if(obj.code == 1){
							xianShiLiBao.bd_tishiyu.setString(obj.result.msg);
						}
						break;
					case 7://立即绑定
						if(obj.code == 0){
							xianShiLiBao.yibangdingNode.setVisible(true);
							xianShiLiBao.bd_yibangshojihao.setString(xianShiLiBao.bd_shoujihao.getString());
							xianShiLiBao.bangDingSongJinNode.setVisible(false);
							xianShiLiBao.zhuangtaitiao.setVisible(false);
							xianShiLiBao.bd_shoujihao.setString("");
							xianShiLiBao.bd_yanzhengma.setString("");
							if(obj.result.msg == "yes"){
								xinXi =  {Describe :"首次手机绑定成功！\n恭喜您获得20000两，请到银行中查询。",errorCode : 1017,isBack : false};
							}else{
								xinXi = {Describe :"绑定成功！",errorCode : 1017,isBack : false};
							}
							if(xianShiLiBao.YZM_endtime > 0){
								xianShiLiBao.bd_yanzhengma_btn.setBright(true);
								xianShiLiBao.bd_yanzhengma_btn.setTouchEnabled(true);
								xianShiLiBao.YZM_daojishi.setString("");
								xianShiLiBao.bd_huoquwenben.setSpriteFrame("xianshi_an_hqyzm.png");
								GameHalll.unschedule(xianShiLiBao.bangDingDaoJiShi);
								xianShiLiBao.bd_shoujihao.setEnabled(true);
								xianShiLiBao.YZM_daojishi.setVisible(false);
							}
							if(!slocal.getItem(xianShiLiBao.bangDing_key)){
								slocal.setItem(xianShiLiBao.bangDing_key,"yes");
							}

						}else{
							xianShiLiBao.bd_tishiyu.setString(obj.result.msg);
						}
						break;
					case 8://解除绑定
						if(obj.code == 0){
							xianShiLiBao.bd_yanzhengma_btn.setBright(true);
							xianShiLiBao.bd_yanzhengma_btn.setTouchEnabled(true);
							xianShiLiBao.bd_huoquwenben.setSpriteFrame("xianshi_an_hqyzm.png");
							xianShiLiBao.yibangdingNode.setVisible(false);
							xianShiLiBao.bangDingSongJinNode.setVisible(true);
							xianShiLiBao.bd_tishiyu.setString("解除绑定成功，您可以重新绑定手机号。");
							if(slocal.getItem(xianShiLiBao.bangDing_key)=="yes"){
								xianShiLiBao.zhuangtaitiao.setVisible(false);
								xianShiLiBao.bangDingSongJinNode.getChildByName("XS_tiaoshangbiaoti").setVisible(false);
								xianShiLiBao.liangWan.setVisible(false);
							}
						}else{
							xianShiLiBao.bd_tishiyu.setString(obj.result.msg);
						}
						break;
					case 9://获取节日按钮组
						if(obj.msg == "success" && obj.code == 0){
							
							if(obj.result.length > 0){
								xianShiLiBao.jieRiZuData = [];
								xianShiLiBao.jieRiZuData = obj.result;
								xianShiLiBao.addJieRiBtnZu(obj.result);
							}
						}else if(obj.msg == "failure" && obj.code == 1){
							cc.log("^^^^^^^^^^^^^^",obj.result.msg);
							xianShiLiBao.zaiscrollViewAddBtn(xianShiLiBao.scrollBtnZu_array.length, xianShiLiBao.scrollBtnZu_array);
						}
						break;
					default:
						break;
					}

					if(type == 2 || type == 4 || type == 7 ){
						if (xinXi) {
							var tishi = TiShiKuang.create(xinXi);
							cc.director.getRunningScene().addChild(tishi,1000);
						}
					}
				}
			}
			cc.log("++++++"+data);
			if(type == 9){
				testHttp.send("");
			}else{
				testHttp.send(data);
			}
			
			if (!waitQuan.xianShi) {
				if(type < 5){
					xianShiLiBao.XS_tableView.setVisible(true);
					xianShiLiBao.XS_tableView.reloadData();
				}
				cc.director.getRunningScene().addChild(waitQuan,1000);
				waitQuan.reuse(100);
			}
		}
}