var huoDong_JF = huoDong_JF || {};
var qianPaiBa = 0;
var houPaiBa = 0;
var baoXiangjiShu = 0;
huoDong_JF.layer = cc.Layer.extend({
	qianPaiBa : [],//前排靶子组
    houPaiBa : [],//后排靶子组
    chuangJian_miao : 0,
    baZiMoveSpeed : 10,//靶子移动速度
    JF_jianAry : [],//收集箭的数组
    nu_faSheAnimation : null,//弓弩发射动画
    isSheJian : false,//判断是否在发射状态
    DianJIPoint : null,//手点击屏幕获得的坐标
    gongNuPianYiJiaoDu : null,//弓弩偏移的角度
    isJiXuChuangJian : true,//是否继续创建靶子
    isTeXiao : false,//特效是否在显示中
    faSheTeXiaoAnimation : null,//弓弩发射时的特效动画
    qianPaiBaiZiGeShu : 0,//前排总共显示多少靶子
    houPaiBaZiGeShu : 0,//后排总共显示多少靶子
    qianPaiBaZiZongShu : 0,//前排出现靶子总数
    houPaiBaZiZongShu : 0,//后排出现靶子总数
    qianPaiBaZiShuXing : null,//前排靶子属性（血量，分数）
    houPaiBaZiShuXing : null,//后排靶子属性
    canXueBaZiQianPaiXueLiang : [],//收集前排残血值
    canXueBaZiHouPaiXueLiang : [],//收集后排残血值
    JF_nengLiangTiao : null,//显示能量条
    JF_nengLiangZhi_text : null,//显示剩余能量数据
    nengLiangZongShu : 0,//玩家初始能量总数
    dangQianNengLiang : 0,//玩家当前剩余能量总数
    xiaoHaoNengLiang : 50,//每一箭消耗的能量数
    xuYaoDaoJiShi : 60,//倒计时时间
    zongDeFeng: 0,//纪录玩家得分
    yingLiangDuiHuanLv : 0,//积分兑换为金币比例
    jinRuYouXiJiShi : 0,//计时游戏
    btnTag : null,//界面按钮接收得tag值
    qianPaiBaZiFaSheng : null,//前排靶子得发声
    houPaiBaZiFaSheng : null,//后排靶子得发声
    baoXianZuoAry : [],//左边宝箱数组
    baoXianYouAry : [],//右边宝箱得数组
    zuoAryDle : [],//左边宝箱被点击中得数据
    youAryDle : [],//右边宝箱被点中得数组
    baoXiangJiShuTag : 0 ,//宝箱得计数tag值
    houPaiSuiLiBaZi : 0,
    qianPaiSuiLiBaZi : 0,
    isYongWan : false ,
    
	ctor : function(data) {
		this._super();
		huoDong_JF.self = this;
		cc.log("--------------------this.ctor");
		huoDong_JF.isShow = true;
		huoDong_JF.isShiJianDao = false;
		this.setJFData(data);
		
	},
	onEnter : function(data) {
		this._super();
		cc.log("--------------------this.onEnter",data);
	
		cc.audioEngine.playMusic(Music_res.JF_bgm, true);
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyReleased: function(keyCode, event){
				var keyCode = keyCode.toString();
				if (keyCode == 6 && !zuZhiBack) {		
					var xinxi = {Describe : "好汉游戏还没结束，是否退出！" ,errorCode : 20,isBack : true};
					var tishi =TiShiKuangZiDingYi.create(xinxi);
					cc.director.getRunningScene().addChild(tishi,1000);
				};
			}
		}, this);
	},
	setJFData : function(data) {
		cc.log("--------------------this.setJFData",data);
//		huoDong_JF.self.init();
		huoDong_JF.self.xuYaoDaoJiShi = data.dwTime || huoDong_JF.self.xuYaoDaoJiShi;
		huoDong_JF.self.nengLiangZongShu = data.dwEnergy || huoDong_JF.self.nengLiangZongShu;
		huoDong_JF.self.dangQianNengLiang = huoDong_JF.self.nengLiangZongShu || huoDong_JF.self.dangQianNengLiang;
		huoDong_JF.self.yingLiangDuiHuanLv = data.wExchangeRatio || huoDong_JF.self.yingLiangDuiHuanLv;
		slocal.setItem("JF_NLDHL",huoDong_JF.self.yingLiangDuiHuanLv);
		huoDong_JF.self.qianPaiBaZiShuXing = data.FrontNpc[0];
		huoDong_JF.self.houPaiBaZiShuXing = data.BackNpc[0];
		huoDong_JF.self.qianPaiBaiZiGeShu = huoDong_JF.self.qianPaiBaZiShuXing.dwCounts || huoDong_JF.self.qianPaiBaiZiGeShu;
		if(qianPaiBa == 0){
			qianPaiBa = huoDong_JF.self.qianPaiBaiZiGeShu;
		}else{
			huoDong_JF.self.qianPaiBaiZiGeShu = qianPaiBa ;
		}
		huoDong_JF.self.houPaiBaZiGeShu = huoDong_JF.self.houPaiBaZiShuXing.dwCounts || huoDong_JF.self.houPaiBaZiGeShu;
		if(houPaiBa == 0){
			houPaiBa = huoDong_JF.self.houPaiBaZiGeShu;
		}else{
			huoDong_JF.self.houPaiBaZiGeShu = houPaiBa;
		}
		slocal.setItem("JF_ZDF",data.lScore);
		this.init();
		huoDong_JF.youXiDeFeng.setString(data.lScore);
		huoDong_JF.self.zongDeFeng = data.lScore;
	},
	//创建宝箱方法
	chuangJianBaoXiang : function(array ,number,BaoXiangType) {
		var self = this;
		for ( var key in array) {
			if(array[key].node_idx == number ){
				var node =array[key];
				var xiangZi = new baoXiang.Node(BaoXiangType);
				xiangZi.x = node.x+cc.winSize.width/2;
				xiangZi.y = node.y+cc.winSize.height/2;
				huoDong_JF.rootNode.addChild(xiangZi,10);
				if(node.x > 0 ){
					
						if(self.youAryDle.length > 0){
							xiangZi.spriteRunAction(self.youAryDle[self.youAryDle.length-1], 135);
							xiangZi.tag = 200+huoDong_JF.self.baoXiangJiShuTag;
//							self.baoXianYouAry.splice(self.youAryDle.length-1, 0, xiangZi);
							self.youAryDle.pop();
						}else{
							if(self.baoXianYouAry.length>5){
								xiangZi.spriteRunAction(680+(self.baoXianYouAry.length-6)*80+50, 135);
							}else{
								xiangZi.spriteRunAction(680+self.baoXianYouAry.length*80, 135);
							}
							xiangZi.tag = 200 + huoDong_JF.self.baoXiangJiShuTag;
//							self.baoXianYouAry.push(xiangZi);
						}
						self.baoXianYouAry.push(xiangZi);
				}else{

						if(self.zuoAryDle.length > 0){
							xiangZi.spriteRunAction(self.zuoAryDle[0], 135);
							xiangZi.tag = 250+huoDong_JF.self.baoXiangJiShuTag;
//							self.baoXianZuoAry.splice(0, 0, xiangZi);
							self.zuoAryDle.shift();
						}else{
							if(self.baoXianZuoAry.length>5){
								xiangZi.spriteRunAction(460-(self.baoXianZuoAry.length-6)*80-50, 135);
							}else{
								xiangZi.spriteRunAction(460-self.baoXianZuoAry.length*80, 135);
							}
							xiangZi.tag = 250+huoDong_JF.self.baoXiangJiShuTag;
//							self.baoXianZuoAry.push(xiangZi);
					}
						self.baoXianZuoAry.push(xiangZi);
				}
				huoDong_JF.self.baoXiangJiShuTag++;
			}
		}
	},
	chuXianBaoXiang : function(type,number ,BaoXiangType) {
		var self = this;
	    
		if(type == 1){
			self.chuangJianBaoXiang(self.houPaiBa, number ,BaoXiangType)
		}else if(type == 2){
			self.chuangJianBaoXiang( self.qianPaiBa, number ,BaoXiangType)
		}
	},
    init : function() {
    	cc.log("--------------------this.init");
    	var self = this;
    	huoDong_JF.rootNode = new ccs.load("res/shz/huoDong/huoDongYouXi.json").node; 
    	huoDong_JF.rootNode.anchorX = 0.5;
    	huoDong_JF.rootNode.anchorY = 0.5;
    	huoDong_JF.rootNode.x = cc.winSize.width/2;
    	huoDong_JF.rootNode.y = cc.winSize.height/2;
    	self.addChild(huoDong_JF.rootNode,0,1);
    	huoDong_JF.gongNu = huoDong_JF.rootNode.getChildByName("gongNu");//弓弩
    	huoDong_JF.gongNu.setLocalZOrder(100);
    	huoDong_JF.fengShuDi = huoDong_JF.rootNode.getChildByName("shuZhiXianSHi");//弓弩显示数的底图
    	huoDong_JF.fengShuDi.setLocalZOrder(103);
    	huoDong_JF.xiaoHaoNL = huoDong_JF.rootNode.getChildByName("nengliangShu");//弓弩上的数
    	 huoDong_JF.xiaoHaoNL.setString(self.xiaoHaoNengLiang); //为弓弩上的数赋值
    	huoDong_JF.xiaoHaoNL.setLocalZOrder(104);
    	huoDong_JF.youXiDeFeng = huoDong_JF.rootNode.getChildByName("User_ID_0");//显示得分数
    	huoDong_JF.youXiDeFeng.setString(self.zongDeFeng);
    	var rect = huoDong_JF.gongNu.getBoundingBox();
    	huoDong_JF.gaiZi = huoDong_JF.rootNode.getChildByName("gaiZi");//弓弩上的盖子
    	huoDong_JF.gaiZi.setLocalZOrder(102);
    	huoDong_JF.teXiao =  huoDong_JF.gongNu.getChildByName("faJianTeXiao");//发射箭时得动画
    	huoDong_JF.teXiao.setVisible(false);
    	this.schedule(self.chuangJianBaZi,1.99, cc.REPEAT_FOREVER);
    	//弹出层按钮
    	var back_gameLogin = huoDong_JF.rootNode.getChildByName("fanHui_JF");//返回
    	back_gameLogin.tag = 10;
    	back_gameLogin.addTouchEventListener(this.buttonClick,this);
    	var fengXiang = huoDong_JF.rootNode.getChildByName("fengXiang_JF");//分享
    	fengXiang.tag = 11;
    	fengXiang.addTouchEventListener(this.buttonClick,this);
    	var guiZe = huoDong_JF.rootNode.getChildByName("guiZe_JF");//规则
    	guiZe.tag = 12;
    	guiZe.addTouchEventListener(this.buttonClick,this);
    	var paiHangBang = huoDong_JF.rootNode.getChildByName("paiHangBang_JF");//排行榜
    	paiHangBang.tag = 13;
    	paiHangBang.addTouchEventListener(this.buttonClick,this);
    	
    	huoDong_JF.yiJianShiQuBtn = huoDong_JF.rootNode.getChildByName("yiJianShiQu_btn");//一键拾取动画
    	huoDong_JF.yiJianShiQuBtn.tag = 14;
    	huoDong_JF.yiJianShiQuBtn.setLocalZOrder(200);
    	huoDong_JF.yiJianShiQuBtn.addTouchEventListener(this.buttonClick,this);
    	
    	huoDong_JF.yiJianTeXiao = cc.Sprite.createWithSpriteFrameName("JF_yiJianTeXiao1.png");
    	huoDong_JF.yiJianTeXiao.x = huoDong_JF.yiJianShiQuBtn.x ;
    	huoDong_JF.yiJianTeXiao.y = huoDong_JF.yiJianShiQuBtn.y+10 ;
    	huoDong_JF.rootNode.addChild(huoDong_JF.yiJianTeXiao , 201,25);
    	huoDong_JF.yiJianTeXiao.setVisible(false);
    	var nengliangShu_tile = huoDong_JF.rootNode.getChildByName("nengliangShu");
    	if(huoDong_JF.self.nengLiangZongShu){
    		huoDong_JF.gongNu.getChildByName("jian").setVisible(false);
    	}
    	var btn_jian = huoDong_JF.rootNode.getChildByName("btn_jian");//减号按钮
    	btn_jian.addClickEventListener(function() {
    		if(self.xiaoHaoNengLiang>50){
    			if(self.xiaoHaoNengLiang<=100){
    				self.xiaoHaoNengLiang -=  self.xiaoHaoNengLiang/2;
    			}else{
    				self.xiaoHaoNengLiang -=  100;
    			}
    		
    		}else{
    			self.xiaoHaoNengLiang =  200;
    		}
    		nengliangShu_tile.setString(self.xiaoHaoNengLiang);
		});
    	var btn_jia = huoDong_JF.rootNode.getChildByName("btn_jia");//加号按钮
    	btn_jia.addClickEventListener(function() {
    		if(self.xiaoHaoNengLiang<200){
    			if(self.xiaoHaoNengLiang<=50){
    				self.xiaoHaoNengLiang +=  self.xiaoHaoNengLiang;
    			}else{
    				self.xiaoHaoNengLiang +=  100;
    			}
    			
    		}else{
    			self.xiaoHaoNengLiang =  50;
    		}
    		nengliangShu_tile.setString(self.xiaoHaoNengLiang);
    	});
    	var number =  qianPaiBa + houPaiBa;
    	huoDong_JF.jiShuNodeTile = huoDong_JF.rootNode.getChildByName("JF_jiShuNode").getChildByName("JF_tile");
    	cc.log("AAAAAAAAAAAA"+number);
    	huoDong_JF.xianShiShengYuBa = new cc.LabelAtlas(""+number,"res/shz/huoDong/JF_shiZi.png",49,62,"0");
    	huoDong_JF.xianShiShengYuBa.x = huoDong_JF.jiShuNodeTile.x + 45;
    	huoDong_JF.xianShiShengYuBa.y = huoDong_JF.jiShuNodeTile.y - 20;
    	huoDong_JF.rootNode.getChildByName("JF_jiShuNode").addChild(huoDong_JF.xianShiShengYuBa,0,11);
    	self.chuangJianDaoJiShiZu();
    	self.addUserInform();
    	cc.eventManager.addListener({
    		event: cc.EventListener.TOUCH_ONE_BY_ONE,
    		swallowTouches:true,
    		onTouchBegan: this.onTouchBegan,
    		onTouchMoved: this.onTouchMoved,
    		onTouchEnded: this.onTouchEnded
    	}, this);
    },
    runYiJianTeXiao : function(stater  ) {
		var self = this;
		if(stater){
			huoDong_JF.yiJianTeXiao.stopAllActions();
			var animate = Producer.ProduceFrameAnimation("JF_yiJianTeXiao", 10, 10, 0.1);
			var action = cc.sequence(cc.callFunc(function (nodeExecutingAction, value) {
				huoDong_JF.yiJianTeXiao.setVisible(true);
			}, this),
			animate ,cc.callFunc(function (nodeExecutingAction, value) {
				huoDong_JF.yiJianTeXiao.setVisible(false);
			}, this),
			cc.delayTime(3));
			huoDong_JF.yiJianTeXiao.runAction(action.repeatForever());
		}else{
			huoDong_JF.yiJianTeXiao.stopAllActions();
			huoDong_JF.yiJianTeXiao.setVisible(false);
		}
		
	},
    //界面按钮调用方法
    buttonClick : function(send,type) {
    	switch (type) {
    	case ccui.Widget.TOUCH_BEGAN:
    		if (!huoDong_JF.self.btnTag) {
    			huoDong_JF.self.btnTag = send.getTag();
    		}
    	case ccui.Widget.TOUCH_MOVED:
    		break;
    	case ccui.Widget.TOUCH_ENDED:
    		var touchEndTag	= send.getTag();
    		if (touchEndTag == huoDong_JF.self.btnTag) {
    			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
    			switch (send.getTag()) {
    			case 10://返回
    				var xinxi1 = {Describe : "好汉游戏还没结束，是否退出！" ,errorCode : 20,isBack : true};
    				var tishi1 =TiShiKuangZiDingYi.create(xinxi1);
    				cc.director.getRunningScene().addChild(tishi1,1000);
    				break;
    			case 11://分享
    				FenXiang.creatFenXiangLayer(huoDong_JF.self);
    				break;
    			case 12://规则
    				JF_guiZe.createGuiZeLayer(huoDong_JF.self);
    				break;
    			case 13://排行榜
    				JF_paiHang.creatJFpaiHangLayer(huoDong_JF.self);
    				loginServer.sendMessage(103,8);
    				break;
    			case 14://一键拾取
    				for (var i = 0; i < huoDong_JF.self.baoXianYouAry.length; i++) {
    					huoDong_JF.self.baoXianYouAry[i].baoXiangDianJi(false);
    				}
    				for (var i = 0; i < huoDong_JF.self.baoXianZuoAry.length; i++) {
    					huoDong_JF.self.baoXianZuoAry[i].baoXiangDianJi(false);
    				}
    				huoDong_JF.self.baoXianZuoAry.splice(0,huoDong_JF.self.baoXianZuoAry.length );
    				huoDong_JF.self.baoXianYouAry.splice(0,huoDong_JF.self.baoXianYouAry.length );
    				huoDong_JF.self.zuoAryDle.splice(0,huoDong_JF.self.zuoAryDle.length );
    				huoDong_JF.self.youAryDle.splice(0,huoDong_JF.self.youAryDle.length );
    				break;
    			default:
    				break;
    			}


    		}
    		huoDong_JF.self.btnTag = 0;
    		break;
    	default:
    		break;
    	}


    },
    //创建倒计时的时间即动画
    chuangJianDaoJiShiZu : function() {
    	var self = this;
    	var time_jishi = cc.LabelTTF("00"+":"+"00","Arial","15");
    	time_jishi.setColor(cc.color.WHITE);
    	time_jishi.x = cc.winSize.width/2;
    	time_jishi.y = cc.winSize.height-20;
    	huoDong_JF.rootNode.addChild(time_jishi,10,199);
    	this.schedule(self.daoJiShi,1, cc.REPEAT_FOREVER);
    	var to2 = cc.progressFromTo(self.xuYaoDaoJiShi,90, 12);
    	var banYuanHu = huoDong_JF.rootNode.getChildByName("shiJian_daojishi").getChildByName("daoJiShi_LvTiao");
    	banYuanHu.setVisible(false);
    	var sprite = new cc.Sprite("#daojishi-tiao.png");
    	var right = new cc.ProgressTimer(sprite);
    	right.type = cc.ProgressTimer.TYPE_RADIAL;
    	right.setReverseDirection(true);
    	huoDong_JF.rootNode.addChild(right,10,198);
    	right.x = cc.winSize.width/2;
    	right.y = cc.winSize.height-banYuanHu.height/2;
    	right.runAction(to2);
	},
	//添加用户信息
    addUserInform : function() {
    	cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/touXiangVip.plist");
    	var userTouXiang_btn = new ccui.Button("touxiang_touxiangBtn1.png","touxiang_touxiangBtn2.png","",ccui.Widget.PLIST_TEXTURE);
    	userTouXiang_btn.x = 60;
    	userTouXiang_btn.y = 55;
    	huoDong_JF.rootNode.addChild(userTouXiang_btn,0,30);
    	userTouXiang_btn.addClickEventListener(function() {
    		touXiang.creatTouXiangLayer(cc.director.getRunningScene());
		});
    	var vip_tuBiao = new ccui.Button("touxiang_xiaobanshou.png","touxiang_xiaobanshou.png","touxiang_xiaobanshou.png",ccui.Widget.PLIST_TEXTURE);
    	vip_tuBiao.x = 360;
    	vip_tuBiao.y = 25;
    	huoDong_JF.rootNode.addChild(vip_tuBiao,0,31);
    	vip_tuBiao.loadTextures(VIPS[USER_wMemOrder], VIPS[USER_wMemOrder], VIPS[USER_wMemOrder], ccui.Widget.PLIST_TEXTURE);
    	var userTouXiangTu = cc.Sprite.createWithSpriteFrameName("touxiang_nan01.png");
    	userTouXiangTu.x = 54;
    	userTouXiangTu.y = 53.5;
    	userTouXiang_btn.addChild(userTouXiangTu);
    	userTouXiangTu.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(touXiangFrame[USER_wFaceID]));
    	var xiaoBanShuou =cc.Sprite.createWithSpriteFrameName("touxiang_xiaobanshou.png");
    	xiaoBanShuou.x = 84;
    	xiaoBanShuou.y = 12.5;
    	userTouXiangTu.addChild(xiaoBanShuou, 0, 1);
    	
    	var niCheng = huoDong_JF.rootNode.getChildByName("niCheng");
    	niCheng.setString(USER_szNickName.toString());
    	var user_id = huoDong_JF.rootNode.getChildByName("User_ID");
    	user_id.setString(USER_dwGameID.toString());
    	var JF_nengLiangTiao_node = huoDong_JF.rootNode.getChildByName("nengLiangTiao_JF");
        this.createNengLiangTiao(1);
    	
    	TouXiangSp =userTouXiangTu;
    	NiChengSp = niCheng;
    	GameIDSp = user_id;
    	VipSp = vip_tuBiao;
    	
	},
	//创建能量条
	createNengLiangTiao : function(num) {
		var self =this;
		var point = huoDong_JF.rootNode.getChildByName("nengLiangTiao_JF").getPosition();
		if(!self.JF_nengLiangTiao){
			self.JF_nengLiangTiao =new ccui.ImageView("nengLiangTiao_nei_JF.png",ccui.Widget.PLIST_TEXTURE);
			self.JF_nengLiangTiao.setScale9Enabled(true);
			self.JF_nengLiangTiao.anchorX = 1;
			self.JF_nengLiangTiao.anchorY = 0.5;
			self.JF_nengLiangZhi_text = new cc.LabelTTF(huoDong_JF.self.nengLiangZongShu.toString(), "Arial", 20);
			self.JF_nengLiangZhi_text.x = point.x;
			self.JF_nengLiangZhi_text.y = point.y;
			
			if(188*num>=4){
				self.JF_nengLiangTiao.setContentSize(cc.size(188*num, 26));
			}else{
				self.JF_nengLiangTiao.setContentSize(cc.size(5, 26));
			}
			
			self.JF_nengLiangTiao.setFlippedX(true);
			self.JF_nengLiangTiao.ignoreContentAdaptWithSize(false);
			self.JF_nengLiangTiao.x = point.x-95;
			self.JF_nengLiangTiao.y = point.y-1;
			huoDong_JF.rootNode.addChild(self.JF_nengLiangTiao,1);
			huoDong_JF.rootNode.addChild(self.JF_nengLiangZhi_text,1,99);
		}else{
			if(188*num>=4){
				self.JF_nengLiangTiao.setContentSize(cc.size(188*num,26));
			}else{
				self.JF_nengLiangTiao.setContentSize(cc.size(4,26));
			}
		}
		
	},
    createJian : function() {//创建弓箭
		var self = this;
		var JF_jian = jian.create();
		var tag;
		JF_jian.x = huoDong_JF.gongNu.x+5;
		JF_jian.y = huoDong_JF.gongNu.y;
		JF_jian.setRotation(self.gongNuPianYiJiaoDu);
		if(self.JF_jianAry.length>0){
			tag = 50+self.JF_jianAry.length;
		}else{
			tag= 50;
		}
		huoDong_JF.rootNode.addChild(JF_jian,0,tag);
		JF_jian.setLocalZOrder(101);
		self.JF_jianAry.push(JF_jian);
		JF_jian.jianSheJi(self.DianJIPoint , self.gongNuPianYiJiaoDu);
	},
    chuangJianBaZi:function() {//创建靶子
    	var self = this;
    	if(huoDong_JF.self.isJiXuChuangJian){
    		huoDong_JF.self.chuangJian_miao++;
    		if(huoDong_JF.self.chuangJian_miao%3 == 0){
    			var Data = {type : "1"}
    			var baiZi_node = new baZi.Node(Data);
    			var rect = baiZi_node.sprite_bg.getBoundingBox();
    			baiZi_node.x = -cc.winSize.width/2-rect.width/2;
    			baiZi_node.y = 120;
    			baiZi_node.node_idx = huoDong_JF.self.chuangJian_miao;
    			if(self.qianPaiBaZiShuXing){
    				baiZi_node.zongXueLiang = self.houPaiBaZiShuXing.dwBlood;
    				baiZi_node.fengShu = self.houPaiBaZiShuXing.lRewardScore;
    				baiZi_node.setXueLiang();

    			}
    			baiZi_node.setLocalZOrder(101);
    			huoDong_JF.rootNode.addChild(baiZi_node,0,huoDong_JF.self.chuangJian_miao);
    			huoDong_JF.self.houPaiBa.push(baiZi_node);
    			huoDong_JF.self.moveNode(1 , huoDong_JF.self.chuangJian_miao/3);
    		}
    		if(huoDong_JF.self.chuangJian_miao == 6){
    			huoDong_JF.self.isJiXuChuangJian = false;
    			this.unschedule(this.chuangJianBaZi);
    		}
    		if(huoDong_JF.self.qianPaiBa.length<5){
    			var Data = {type : "2"}
    			var baiZi_node = new baZi.Node(Data);
    			var rect = baiZi_node.sprite_bg.getBoundingBox();
    			baiZi_node.x = cc.winSize.width/2+rect.width/2;
    			baiZi_node.y = 0;
    			baiZi_node.node_idx = huoDong_JF.self.chuangJian_miao;
    			if(self.qianPaiBaZiShuXing){
    				baiZi_node.zongXueLiang = self.qianPaiBaZiShuXing.dwBlood;
    				baiZi_node.fengShu = self.qianPaiBaZiShuXing.lRewardScore;
    				baiZi_node.setXueLiang();
    			}
    			
    			huoDong_JF.rootNode.addChild(baiZi_node,0 ,10+huoDong_JF.self.chuangJian_miao );
    			baiZi_node.setLocalZOrder(101);
    			huoDong_JF.self.qianPaiBa.push(baiZi_node);
    			huoDong_JF.self.moveNode(2 , huoDong_JF.self.qianPaiBa.length);
    		}
    	}
    	
    },
    //把秒转换为分钟
    daoJiShi : function() {
    	var self =this;
    	var jsShiView = huoDong_JF.rootNode.getChildByTag(199);//计时文字
    	var  time_fen;
    	var time_miao;
    	if(self.xuYaoDaoJiShi > 0){
    		self.xuYaoDaoJiShi--;
    		for (var i = 2; i > 0; i--) {
    			if(i >1){
    				time_miao =self.xuYaoDaoJiShi%60;
    				if(time_miao<10){
    					time_miao = "0"+time_miao;
    				}
    			}else if( i == 1){
    				time_fen =Math.floor(self.xuYaoDaoJiShi/60);
    				if(time_fen<10){
    					time_fen = "0"+time_fen;
    				}
    			}
    		}
    		if(self.xuYaoDaoJiShi > 120){
    			jsShiView.setString(2 + ":"+"00");
    		}else{
    			jsShiView.setString(time_fen + ":"+time_miao);
    		}
    	}
    	
    	if(self.xuYaoDaoJiShi%2){
    		if(!self.detectTheNetwork()){
    			self.unschedule(self.daoJiShi);
    		}
    	}
    	if(self.xuYaoDaoJiShi == 0){
    		var beiLv = slocal.getItem("JF_NLDHL");
    		var defeng = slocal.getItem("JF_ZDF");
    		if(defeng > 0 || huoDong_JF.isShow){
    			var xinxi1 = {Describe : "恭喜你在进山剿匪中获得"+defeng*beiLv+"金币！请稍后到银行查看。",errorCode :188,isBack : false};
    			var tishi1 =TiShiKuang.create(xinxi1);
    			cc.director.getRunningScene().addChild(tishi1,1000);
    		}
    		huoDong_JF.isShiJianDao = true;
    		self.unschedule(self.daoJiShi);
    	}
	},
	detectTheNetwork : function() {
		var type = 0;
		if (sys.os == sys.OS_IOS) {
			type = jsb.reflection.callStaticMethod("netWork", "getCurrentNetworkStatus");
		}else if(sys.os == sys.OS_ANDROID){
			type = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getNetworkIsWifi", "()I");
		};
		if(type == 0){
			var Xinxi = {Describe :  "您的网络异常，请检查移动网络是否已连接",errorCode : 100,isBack : false};
			var tishi =TiShiKuang.create(Xinxi);
			cc.director.getRunningScene().addChild(tishi,1000);
		}
		return type ;
	},
    moveNode : function(type,idx) {//靶子移动
    	var self = this;
    	var baZi= null;
    	if(type == 1){
    		baZi = self.houPaiBa[idx-1];
    	}else if(type == 2){
    		baZi = self.qianPaiBa[idx-1];
    	}
    	var rect1 = baZi.getBoundingBox();
    	var rect = baZi.sprite_bg.getBoundingBox();
    	var actionMove = null;
    	if(baZi.baZiType == 1){
    		actionMove = cc.Sequence(
    				cc.callFunc(function (nodeExecutingAction, value) {
    					self.houPaiBaZiZongShu++;
    					if((huoDong_JF.self.houPaiBaZiZongShu)%11 == 0){
    						cc.audioEngine.playEffect(Effect_res.JF_game);
    						baZi.tiShiYu.setVisible(true);
    						cc.log("后排发声");
    						var action1 = cc.fadeOut(4.0);
    						var action1Back = action1.reverse();
    						var delay = cc.delayTime(1);
    						self.houPaiBaZiFaSheng = cc.sequence(action1,delay,cc.callFunc(function (nodeExecutingAction, value) {
    							baZi.tiShiYu.setVisible(false);
    						}, this),action1Back);

    						
    						baZi.tiShiYu.runAction(self.houPaiBaZiFaSheng);
    					}
    				}, this),
    				cc.moveTo(self.baZiMoveSpeed, cc.p(cc.winSize.width/2 + rect.width , rect1.y)),
    				cc.callFunc(function (nodeExecutingAction, value) {
    					baZi.shouJiCanXeBaZi();
    					var number = self.houPaiBaZiGeShu - self.houPaiSuiLiBaZi;
    					if(number >= self.houPaiBa.length-1){
    						baZi.x = -cc.winSize.width/2-rect.width/2;
    						baZi.chongZhiBaZi(idx-1);
    					}else{
                            self.xiaoHuiBaZi(baZi, idx);
    						return;
    					}
    					
    				}, this)
    		);
    	}else if(baZi.baZiType == 2){
    		actionMove = cc.Sequence(
    				cc.callFunc(function (nodeExecutingAction, value) {
    					self.qianPaiBaZiZongShu++;
    					if((huoDong_JF.self.qianPaiBaZiZongShu)%8 == 0){
    						cc.audioEngine.playEffect(Effect_res.JF_comeon);
    						cc.log("前排发声");
    						baZi.tiShiYu.setVisible(true);
    						var action1 = cc.fadeOut(3.0);
    						var action1Back = action1.reverse();
    						var delay = cc.delayTime(1);
    						self.qianPaiBaZiFaSheng =cc.sequence(action1,delay,cc.callFunc(function (nodeExecutingAction, value) {
    								baZi.tiShiYu.setVisible(false);
    						}, this),action1Back);
    						baZi.tiShiYu.runAction(self.qianPaiBaZiFaSheng);
    					}
    		 }, this),
    		 cc.moveTo(self.baZiMoveSpeed, cc.p(-cc.winSize.width/2 -rect.width  , rect1.y)),
    				cc.callFunc(function (nodeExecutingAction, value) {
    					baZi.shouJiCanXeBaZi();
    					var number = self.qianPaiBaiZiGeShu - self.qianPaiSuiLiBaZi;
    					if(number >= self.qianPaiBa.length){
    						baZi.x = cc.winSize.width/2+rect.width/2;
    						baZi.chongZhiBaZi(idx-1);
    					}else{
    						self.xiaoHuiBaZi(baZi, idx);
    						return;
    					}

    				}, this)
    		);
    	}
    	baZi.runAction(actionMove.repeatForever());
    },
    //销毁靶子
    xiaoHuiBaZi : function(baZiDuiXiang , idx) {
    	var self = this;
    	baZiDuiXiang.stopAllActions();
    	
    	if(baZiDuiXiang.baZiType == 1){
    		self.houPaiBa.splice(idx-1,1);
    	}else if(baZiDuiXiang.baZiType ==2 ){
        	self.qianPaiBa.splice(idx-1,1);
        }    	
    	
    	self.removeChild(baZiDuiXiang);
	},
    //触摸开始
    onTouchBegan:function(touch, event) {
    	return true;
    },
    //触摸滑动
    onTouchMoved:function(touch, event) {
    	if (touch.length <= 0)
    		return true;
    	huoDong_JF.self.chuFaDianJiShiJian(touch);
    	
    	return true;
    },
    //触摸结束
    onTouchEnded:function(touch, event) {
    	if (touch.length <= 0)
    		return true;
    	huoDong_JF.self.chuFaDianJiShiJian(touch);
    	return true;
    },
    //触发点击屏幕事件
    chuFaDianJiShiJian : function(touch) {
    	var self = this;
    	var pointDian = huoDong_JF.self.DianJIPoint = touch.getLocation();
    	var nu = huoDong_JF.gongNu;
    	var point = nu.convertToWorldSpaceAR(nu.getPosition());
    	if(pointDian.x >= 573-nu.width/2 && pointDian.x <= 573 +nu.width/2 && pointDian.y >= 77-nu.height/2 && pointDian.y <= 77 +nu.height/2   ){
    		return true;
    	}else{
    		self.setGongJianRotate(cc.p(568, 91),touch.getLocation());
    	}
    	
    	if(!self.isYongWan){
    		if(huoDong_JF.self.dangQianNengLiang < 50){
    		
    			var xinxi1 = {Describe : "您的能量已经消耗完毕，请等待下次活动！！" ,errorCode : 10,isBack : false};
    			var tishi =TiShiKuang.create(xinxi1);
    			cc.director.getRunningScene().addChild(tishi,1001);
    			self.isYongWan = true;
    		}
    	}
    	
	},
    //更具手点击的位置算出弓弩需要的偏移角度
    setGongJianRotate : function(point1 , point2) {
    	var self = this;
		var poorx = point1.x - point2.x;
		var poory = point1.y - point2.y;
		var angle = 0;
		if(poorx< 0 && poory<0){
			var hudu = Math.atan(Math.abs(poorx)/Math.abs(poory));
			angle = 270 + hudu/Math.PI * 180;
		}else if(poorx< 0 && poory>0){
			var hudu = Math.atan(Math.abs(poorx)/Math.abs(poory));
			angle = 90 - hudu/Math.PI * 180;
		}else if(poorx> 0 && poory>0){
			var hudu = Math.atan(Math.abs(poorx)/Math.abs(poory));
			angle = 90 + hudu/Math.PI * 180;
		}else if(poorx> 0 && poory<0){
			var hudu = Math.atan(Math.abs(poorx)/Math.abs(poory));
			angle = 180+  (90-( hudu /Math.PI * 180));
		}else if(poorx == 0 && poory == 0){
			angle = 0;

		}else if(poorx > 0 && poory == 0){
			angle = 180;
		}else if(poorx < 0 && poory == 0){
			angle = 0;

		}else if(poorx == 0 && poory > 0){
			angle = 90;

		}else if(poorx == 0 && poory < 0){
			angle =270;
		}
		self.gongNuPianYiJiaoDu = angle+90;

		huoDong_JF.gongNu.setRotation(angle+90);
		huoDong_JF.gaiZi.setRotation(angle+90);
		if(huoDong_JF.self.dangQianNengLiang >= 50){
			self.createGongNuAnimation();
		}
		
	},
	//加减按钮用来检测能量数
	jianCeNengLiang : function() {
		if(huoDong_JF.self.dangQianNengLiang>=huoDong_JF.self.xiaoHaoNengLiang){
		      return;
		}else if(huoDong_JF.self.dangQianNengLiang > 200){
			huoDong_JF.self.xiaoHaoNengLiang = 200;
		}else if(huoDong_JF.self.dangQianNengLiang > 100){
			huoDong_JF.self.xiaoHaoNengLiang = 100;
		}else{
			huoDong_JF.self.xiaoHaoNengLiang = 50;
		}
	},
	//创建弓弩发射动画
	createGongNuAnimation : function() {
		var self = this;
		if(!self.isSheJian){
			var nengliangShu_tile = huoDong_JF.rootNode.getChildByName("nengliangShu");
			self.isSheJian = true;
			huoDong_JF.gongNu.getChildByName("jian").setVisible(false);
			self.jianCeNengLiang();
			huoDong_JF.self.dangQianNengLiang -= huoDong_JF.self.xiaoHaoNengLiang;
			nengliangShu_tile.setString(huoDong_JF.self.xiaoHaoNengLiang);
			if(huoDong_JF.self.dangQianNengLiang>0){
				huoDong_JF.self.createNengLiangTiao(huoDong_JF.self.dangQianNengLiang/huoDong_JF.self.nengLiangZongShu);
				self.JF_nengLiangZhi_text.setString(huoDong_JF.self.dangQianNengLiang);
			}else{
				huoDong_JF.self.JF_nengLiangTiao.setVisible(false);
				loginServer.sendMessage(103,7,{dwUserID : USER_dwUserID , 
					dwEnergy : huoDong_JF.self.dangQianNengLiang ,
					lScore : huoDong_JF.self.zongDeFeng});
			}
			if(!self.nu_faSheAnimation ){
				var animate = Producer.ProduceFrameAnimation("nu_fashe_", 3, 1, 0.05);
				self.nu_faSheAnimation = cc.Sequence(
						cc.callFunc(function (nodeExecutingAction, value) {
							self.nu_faSheAnimation.retain();
							huoDong_JF.self.createJian();
						}, this),
						animate,
						cc.callFunc(function (nodeExecutingAction, value) {
							huoDong_JF.gongNu.getChildByName("jian").setVisible(true);
							if(huoDong_JF.self.dangQianNengLiang == 0){
								huoDong_JF.gongNu.setSpriteFrame("nu_fashe_03.png");
								huoDong_JF.gongNu.getChildByName("jian").setVisible(false);
								self.JF_nengLiangZhi_text.setString(huoDong_JF.self.dangQianNengLiang);
							}
							self.isSheJian = false;
						}, this)
						);
				huoDong_JF.gongNu.runAction(self.nu_faSheAnimation);

			}else if(self.nu_faSheAnimation ){
				huoDong_JF.self.unschedule();
				huoDong_JF.gongNu.runAction(self.nu_faSheAnimation);
			}
		}
	},
	//退出界面清楚得数据
	onExit : function() {
		this._super();
		var self = this;
		cc.audioEngine.stopMusic(false);
		if (huoDong_JF) {
			cc.spriteFrameCache.removeSpriteFrames();
			cc.textureCache.removeAllTextures();
		}
		if(self.isJiXuChuangJian){
			self.unschedule(self.chuangJianBaZi);
		}
		huoDong_JF.self.qianPaiBa.splice(0,huoDong_JF.self.qianPaiBa.length );
		huoDong_JF.self.houPaiBa.splice(0,huoDong_JF.self.houPaiBa.length );
		huoDong_JF.self.JF_jianAry.splice(0,huoDong_JF.self.JF_jianAry.length );
		huoDong_JF.self.canXueBaZiHouPaiXueLiang.splice(0,huoDong_JF.self.canXueBaZiHouPaiXueLiang.length );
		huoDong_JF.self.canXueBaZiQianPaiXueLiang.splice(0,huoDong_JF.self.canXueBaZiQianPaiXueLiang.length );
		huoDong_JF.self.chuangJian_miao = 0;
		huoDong_JF.self.faSheTeXiaoAnimation = null;
		huoDong_JF.self.nu_faSheAnimation = null;
		huoDong_JF.self.isJiXuChuangJian = true;
		huoDong_JF.self.isSheJian = false;
		huoDong_JF.isShow = false;
		huoDong_JF.self.baoXianZuoAry.splice(0,huoDong_JF.self.baoXianZuoAry.length );
		huoDong_JF.self.baoXianYouAry.splice(0,huoDong_JF.self.baoXianYouAry.length );
		huoDong_JF.self.zuoAryDle.splice(0,huoDong_JF.self.zuoAryDle.length );
		huoDong_JF.self.youAryDle.splice(0,huoDong_JF.self.youAryDle.length );
		JF_paiHang.dataTable.splice(0, JF_paiHang.dataTable.length);
		huoDong_JF.self.baoXiangJiShuTag = 0;
		var numberAry =["res/shz/huoDong/huoDongXiaoYouXi"];
		removeResources(numberAry);
		var numberAry =["res/shz/huoDong/baZiTeXiao"];
		removeResources(numberAry);
	}
});

huoDong_JF.scene = cc.Scene.extend({
	_data : null,
	ctor : function(data) {
		this._super();
		this._data = data;
		cc.log("--------------------Scene.this.ctor",data);
	},
	onEnter : function(data) {
		this._super();
		cc.log("--------------------Scene.this.onEnter",data);
		var layer = new huoDong_JF.layer(this._data);
		this.addChild(layer);
	}
});