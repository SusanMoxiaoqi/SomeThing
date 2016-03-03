DUIJIU = null;
DUIJIUJILU_KEY = "DUIJIUJILU_KEY";//存入本地对酒信息的键值
var DuiJiuLayer = cc.Layer.extend({
	anniu_jinzhi : false,//点击带有弹出框的
	stop_touch : [false,false,false],
	isAction : [false,false,false],
	renwu : [],
	duijiu_info : null,
	_tanchu_str : [],
	_jilu_str : [],
	btnTag : 0,
	GuiZe_str : "1、玩家可使用银两与三位好汉拼酒，拼酒可选择1次、10 次。\n\n" +
	"2、若将好汉灌醉，即可得到奖励，若好汉没喝醉，则再接再厉。\n\n" +
	"3、玩家最高可一次性获得2000万银两、1000万奖券，奖励无上限。\n\n" +
	"4、实物礼品最终会换算成奖券奖励给玩家，玩家可到礼品商城中兑\n\n换相应礼品 。",
	big_counts : [[10000,4000],[50000,20000],[100000,50000]],//判断各个人物对饮一次获奖是否为大额的判断标准，前一个为金币，后一个为奖券
	divide_counts : [
	                 [0,5000,30000,1000000],
	                 [0,10000,80000,10000000],
	                 [0,50000,200000,10000000],
                 ],//判断每次获奖金币是小堆，中堆，大堆的标准。奖券不区分
	npc_name : ["鲁智深","林冲","宋江"],
	item_pic : [
	            {itemName : "没有中奖",picName : "dj_meizhongjiang.png"},
	            {itemName : "小堆金币",picName : "dj_yuanbao-1.png"},
	            {itemName : "中堆金币",picName : "dj_yuanbao-2.png"},
	            {itemName : "大堆金币",picName : "dj_yuanbao-3.png"},
                {itemName : "奖券",picName : "dj_jiangquan.png"},
	            {itemName : "40CM海豚",picName : "dj_Dolphin40CM.png"},
	            {itemName : "60CM海豚",picName : "dj_Dolphin60CM.png"},
	            {itemName : "10元话费",picName : "dj_huafei-10.png"},
	            {itemName : "30元话费",picName : "dj_huafei-30.png"},
	            {itemName : "50元话费",picName : "dj_huafei-50.png"},
	            {itemName : "100元话费",picName : "dj_huafei-100.png"},
	            {itemName : "抱枕",picName : "dj_Pillow.png"},
	            ],
	ctor:function (canshuBody) {
		this._super();
		cc.spriteFrameCache.addSpriteFrames("res/shz/DuiJiuScene/DuiJiuAni.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/touXiangVip.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/GongYong.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/DuiJiuScene/dj_jilu.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/DuiJiuScene/dj_huojiang.plist");
		DUIJIU = this;
		this._tanchu_str = [];
		this.initscene();
		/**个人信息*/
		this.creatUserInfo();
		this.getGuiZeFromWeb();
		this.peiZhiCanShu(canshuBody);
		this.schedule(function() {
			this.xianShiResultStr();
			}, 0.3, cc.REPEAT_FOREVER);
		return true;
	},

	initscene : function() {
		var _this = this;
		var Widjet = ccs.load("res/shz/DuiJiuScene/DuiJiuScene.json");
		var rootNode = Widjet.node;
		this.addChild(rootNode);
		var duijiu_pos = cc.loader.getRes("res/shz/DuiJiuScene/DuiJiuPos.json");
		
		var fenxiang = rootNode.getChildByName("dj_btnfenxiang");
		fenxiang.addTouchEventListener(this.buttonClick,this);
		
		var jiahao = rootNode.getChildByName("dj_btnjiahao");
		jiahao.addTouchEventListener(this.buttonClick,this);
		
		var duihuan = rootNode.getChildByName("dj_btnduihuan");
		duihuan.addTouchEventListener(this.buttonClick,this);
		
		var jiangpin = rootNode.getChildByName("dj_btnjiangpin");
		jiangpin.addTouchEventListener(this.buttonClick,this);
		
		var guize = rootNode.getChildByName("dj_btnguize");
		guize.addTouchEventListener(this.buttonClick,this);
		
		var fanhui = rootNode.getChildByName("dj_btnfanhui");
		fanhui.addTouchEventListener(this.buttonClick,this	);
		
		for (var int_renwu = 0; int_renwu <3; int_renwu++) {
			var renwu_node = new DuiJiuRenWu(int_renwu);
			this.renwu[int_renwu] = renwu_node;
			renwu_node.x = duijiu_pos.pos.pos_renwu[int_renwu].x;
			renwu_node.y = duijiu_pos.pos.pos_renwu[int_renwu].y;
			this.addChild(renwu_node);
			var luzhishen_rect1 =  renwu_node.getBoundingBox();
			var luzhishen_rect2 = renwu_node.dj_pinJiuRenWu.getBoundingBox();
			renwu_node.node_rect = cc.rect(luzhishen_rect1.x+luzhishen_rect2.x, luzhishen_rect1.y+luzhishen_rect2.y, luzhishen_rect1.width+luzhishen_rect2.width, luzhishen_rect1.height+luzhishen_rect2.height);
			switch (int_renwu) {
			case 0:
				renwu_node.dj_pinJiuRenWu.setSpriteFrame("dj_luzhishen.png");
				break;
			case 1:
				renwu_node.dj_pinJiuRenWu.setSpriteFrame("dj_linchong.png");
				break;
			case 2:
				renwu_node.dj_pinJiuRenWu.setSpriteFrame("dj_songjiang.png");
				break;
			default:
				break;
			}
		};
	},
	/**对酒任务的翻转动作*/
	fanZhuanRenwu : function(renwu) {
	//	this.stop_touch = true
		for (var int_renwu = 0; int_renwu < this.renwu.length; int_renwu++) {
			if (int_renwu == renwu) continue;
			var array_ele = this.renwu[int_renwu];
			if (DUIJIU.stop_touch[int_renwu] && !DUIJIU.isAction[int_renwu]) {
				array_ele.fanZhuanAnc(array_ele);
			};
		};
		cc.audioEngine.playEffect(Effect_res.dj_fanzhuan);
		var _this = this;
		cc.log(renwu+"开始翻转！！！",this.renwu,this.renwu[renwu].dianjishijian);
		DUIJIU.anniu_jinzhi = true;
		DUIJIU.isAction[renwu].isAction = true;
		var zhengmian = _this.renwu[renwu].renwu_node;
		var fanmian = _this.renwu[renwu].fan_node;
		var posX = _this.renwu[renwu].getPositionX();			
		var asin = Math.asin((posX - 568)/652);
		var asin1 = 180*asin/Math.PI;
		cc.log("UUUUUUUUU",asin,180*asin/Math.PI);
		var orbitFront=new cc.OrbitCamera(0.25,1,0,0,-90+asin1,0,0);
		var orbitBack=new cc.OrbitCamera(0.25,1,0,90+asin1,-90-asin1,0,0);
		fanmian.setVisible(false);
		var targetac=new cc.TargetedAction(fanmian,new cc.Sequence(new cc.Show(),orbitBack));
		var fa=new cc.Sequence(new cc.Show(),orbitFront,new cc.Hide(),targetac,cc.callFunc(_this.afterFanzhuan, _this,renwu));
		zhengmian.runAction(fa);
		
	},
	afterFanzhuan : function(node,renwu) {
		DUIJIU.anniu_jinzhi= false;
		DUIJIU.isAction[renwu] = false;
	},
	/**得到用户对酒信息，配置参数*/
	peiZhiCanShu : function(canshuBody) {
//		canshuBody = {
//		wFreeTimes : [0,0,0], 
//		wTotalFreeTimes : [0,0,0], 
//		dwFreeNeedTime : [0,0,0], 
//		lDrinkOnceScore : [10000,50000,100000], 
//		lDrinkTenScore : [90000,450000,900000], 
//		lBigScore : [30000,30000,30000], 
//		lBigLottery : [30000,30000,30000]
//	}
		if (canshuBody.lBigScore) {
			for (var int10 = 0; int10 < 3; int10++) {
				this.big_counts[int10][0] = canshuBody.lBigScore[int10];
			}
		};
		if (canshuBody.lBigLottery) {
			for (var int10 = 0; int10 < 3; int10++) {
				this.big_counts[int10][1] = canshuBody.lBigScore[int10];
			}
		};
		this.duijiu_info = canshuBody;
		for (var int_renwu = 0; int_renwu < this.renwu.length; int_renwu++) {
			var array_ele = this.renwu[int_renwu];
			//正面的免费次数
			var freeTime = canshuBody.wFreeTimes[int_renwu];
			var totalFreeTime = canshuBody.wTotalFreeTimes[int_renwu];
			if (totalFreeTime>0) {
				var free_str = "免费次数("+freeTime+"/"+totalFreeTime+")";
				array_ele.dj_mianFeiCiShu.setString(free_str);		
			}else{
				array_ele.dj_mianFeiCiShu.setVisible(false);
				array_ele.dj_biaoqian.setVisible(false);
			};
			//正面的对饮一次多少钱
			var onceScore = canshuBody.lDrinkOnceScore[int_renwu];
			var once_str = Producer.changToHanZi(onceScore, "");
			array_ele.dj_yinLiangCiShu.setString(once_str+"两一次");
			//反面对饮一次
			var str1 = canshuBody.lDrinkOnceScore[int_renwu].toString();
			var str2 = canshuBody.lDrinkTenScore[int_renwu].toString();
			array_ele.dj_yiciyinliang.setString(Producer.changeNumberToString(str1));
			array_ele.dj_shiciyinliang.setString(Producer.changeNumberToString(str2));
			var needTime = canshuBody.dwFreeNeedTime[int_renwu];
		};
		this.updeteFreeTime();
		this.schedule(this.updeteFreeTime, 1.0, cc.REPEAT_FOREVER, 1.0);
	},
	/**免费倒计时*/
	updeteFreeTime : function() {
		for (var int_renwu = 0; int_renwu < this.renwu.length; int_renwu++) {
			var array_ele = this.renwu[int_renwu];
			var freeTime = this.duijiu_info.wFreeTimes[int_renwu];
			var totalFreeTime = this.duijiu_info.wTotalFreeTimes[int_renwu];
			var needTime = this.duijiu_info.dwFreeNeedTime[int_renwu];
			if(totalFreeTime <=0){
				array_ele.dj_daojishi.setVisible(false);
				continue;
			};
			if (needTime>0) {
				array_ele.dj_daojishi.setString(Producer.changToShiJian(needTime));
				this.duijiu_info.dwFreeNeedTime[int_renwu]-=1;
			}else if(freeTime > 0){
				array_ele.dj_mianfei = true;
				array_ele.dj_daojishi.setString("本次免费");
			}else{
				array_ele.dj_daojishi.setString("免费已用完");
			};
		};
	},
	/**得到对酒结果,有三步操作。
	 * 1、当times为1时，需要刷新免费次数和倒计时的显示。
	 * 2、展示对酒得奖结果。
	 * 3、刷新银两和奖券。*/
	duiJiuResult : function(data,times) {
		if (times == 1) {
			var freeTime = DUIJIU.duijiu_info.wFreeTimes[data.wNpcID];
			var int_renwu = data.wNpcID;
			var array_ele = this.renwu[data.wNpcID];
			switch (int_renwu) {
			case 0:
				if (array_ele.dj_mianfei) {
					array_ele.dj_mianfei = false;
					DUIJIU.duijiu_info.wFreeTimes[int_renwu] = freeTime > 0 ? (freeTime - 1) : 0;
					DUIJIU.duijiu_info.dwFreeNeedTime[int_renwu] = 600;
					var freeTime = DUIJIU.duijiu_info.wFreeTimes[int_renwu];
					var totalFreeTime = DUIJIU.duijiu_info.wTotalFreeTimes[int_renwu];
					var free_str = "免费次数("+freeTime+"/"+totalFreeTime+")";
					array_ele.dj_mianFeiCiShu.setString(free_str);		
				};
				break;
			case 1:
				if (array_ele.dj_mianfei) {
					array_ele.dj_mianfei = false;
					DUIJIU.duijiu_info.wFreeTimes[int_renwu] = freeTime > 0 ? (freeTime - 1) : 0;
					DUIJIU.duijiu_info.dwFreeNeedTime[int_renwu] = 72*3600;
					var freeTime = DUIJIU.duijiu_info.wFreeTimes[int_renwu];
					var totalFreeTime = DUIJIU.duijiu_info.wTotalFreeTimes[int_renwu];
					var free_str = "免费次数("+freeTime+"/"+totalFreeTime+")";
					array_ele.dj_mianFeiCiShu.setString(free_str);		
				};
				break;
			default:
				break;
			};
		};
		this.updeteFreeTime();
		var ren_str =  this.npc_name[data.wNpcID];
		for (var int_drink = 0; int_drink < data.DrinkResult.length; int_drink++) {
		var DrinkResult = data.DrinkResult[int_drink];
		var miaoshu_str = "";
		if (DrinkResult.lCounts == 0) {
			miaoshu_str = miaoshu_str + "很遗憾，您没有把"+ren_str+"灌醉。\n";
		}else {
			switch (DrinkResult.wRewardID) {
			case 0:
				miaoshu_str = miaoshu_str + ren_str+"喝醉了。您获得了"+DrinkResult.lCounts.toString()+"两"+"\n";
				break;
			case 1:
				miaoshu_str = miaoshu_str + ren_str+"喝醉了。您获得了"+DrinkResult.lCounts.toString()+"奖券"+"\n";
				break;
			default:
				miaoshu_str = miaoshu_str + ren_str+"喝醉了。您获得了"+DrinkResult.szItemName+"\n";
			break;
			};
		};
		//放到记录的数组里，记录只存放最近50条记录
		if (this._jilu_str.length >= 50) {
			this._jilu_str.shift();
			this._jilu_str.push(miaoshu_str);
		}else {
			this._jilu_str.push(miaoshu_str);
        };
		};
		if (times == 1) {
			var DrinkResult = data.DrinkResult[0];
			var reward = (DrinkResult.wRewardID == 0)?0:1;
			if (DrinkResult.lCounts < this.big_counts[data.wNpcID][reward]) {
				USER_lUserScore += data.lGetScore;
				YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
				USER_lLottery += data.lGetLottery;
				JiangQuanSp.setString(Producer.changeNumberToString(USER_lLottery));
				//把结果放到需要展示的数组里。场景会检测这个数组里面的元素，
				this._tanchu_str.push(this._jilu_str[this._jilu_str.length-1]);
			}else{this.onceDonghua(data)}
		} else if (times == 10) {
			this.tenTimesDonghua(data)
		};
	},
	/**
	 * 根据获得的奖品的类型和金额，确定奖品的名称和贴图
	 * 
	 */
	getPrizeNameAndPrizePic : function(DrinkResult,NpcID) {	
		var obj = new Object();
		obj.prizeName = "";
		obj.prizePic = "";
		switch (DrinkResult.wRewardID) {//判断获取获奖名字，和获奖图片。
		case 0://当获奖为金币时，图片要区分小堆，中堆，大堆。
			obj.prizeName = DrinkResult.lCounts.toString()+"两";
			if (DrinkResult.lCounts == 0) {
				obj.prizeName = "";
			};
			for (var int = 0; int < 4; int++) {
				if (DrinkResult.lCounts <= this.divide_counts[NpcID][int]) {
					obj.prizePic = this.item_pic[int].picName;	
					break;
				}; 
			};	   
			break;
		case 1:
			obj.prizeName = DrinkResult.lCounts.toString()+"奖券";
			obj.prizePic = this.item_pic[4].picName;
			break;
		default:
			obj.prizeName = DrinkResult.szItemName;
		for (var int2 = 5; int2 < this.item_pic.length; int2++) {
			if (obj.prizeName == this.item_pic[int2].itemName) {
				obj.prizePic = this.item_pic[int2].picName;
				break;
			}
		}
		break;
		};
		
		return obj;
	},
	/**
	 * 对酒结果动画上的标题，恭喜获得的动作
	 */
	gxhd_action : function(rootTenReward,dj_titleTen,dj_gxhd) {
		for (var int = 0; int < 7; int++) {//恭喜获得后的7个光束
			var guangMang = dj_titleTen.getChildByName("dj_guangxiao04_"+(int+1));
			var duration = 1-guangMang.getScaleX();
			guangMang.runAction(cc.scaleTo(duration, 1.0, 1.0));
			guangMang.scheduleOnce(function() {
				var scaleRepeat = cc.sequence(cc.scaleTo(0.8, 0.2, 1.2),cc.scaleTo(0.8, 1.2, 1.2)).repeatForever();
				this.runAction(scaleRepeat);
			}, duration);
		};
		for (var int2 = 0; int2 < 3; int2++) {
			var star = dj_titleTen.getChildByName("dj_tittleXing_"+(int2+14));
			var disY = Math.pow(-1, int2)*5
			var moveBy = cc.moveBy(0.4, 0, disY).easing(cc.easeOut(1.0));
			star.runAction(cc.sequence(moveBy,moveBy.reverse()).repeatForever());			
		};

		var baiDianArrL = new Array();
		for (var int3 = 0; int3 < 3; int3++) {
			var baiDian = dj_gxhd.getChildByName("dj_baidian_"+(int3+8));
			baiDian.setOpacity(0);
			baiDianArrL.push(baiDian);
		};
		var baiDianArrR = new Array();
		for (var int4 = 0; int4 < 3; int4++) {
			var baiDian = dj_gxhd.getChildByName("dj_baidian_"+(int4+11));
			baiDian.setOpacity(0);
			baiDianArrR.push(baiDian);
		};
		rootTenReward.schedule(function() {
			var baidianL = baiDianArrL.shift();
			baiDianArrL.push(baidianL);
			baidianL.setOpacity(255);
			var action1 = cc.fadeIn(0.2).easing(cc.easeOut(4.0));
			var action2 = cc.fadeOut(0.2).easing(cc.easeIn(4.0));
			var secAct = cc.sequence(action1,cc.delayTime(0.3),action2);
			baidianL.runAction(secAct);

			var baidianR = baiDianArrR.shift();
			baiDianArrR.push(baidianR);
			baidianR.setOpacity(255);
			var action1 = cc.fadeIn(0.2).easing(cc.easeOut(4.0));
			var action2 = cc.fadeOut(0.2).easing(cc.easeIn(4.0));
			var secAct = cc.sequence(action1,cc.delayTime(0.3),action2);
			baidianR.runAction(secAct);
		}, 0.3, cc.REPEAT_FOREVER)

	},
	/**
	 * 对饮十次，获奖动画
	 */
	tenTimesDonghua : function(data) {
		var NpcID = data.wNpcID;
		var self = this;
		
		var rootTenReward = ccs.load("res/shz/DuiJiuScene/tenTimes_reward.json").node;
		rootTenReward.x = cc.winSize.width/2;
		rootTenReward.y = cc.winSize.height/2;
		var zhezhao = duijiuResult.create(rootTenReward);
		self.addChild(zhezhao,200);
		zhezhao.data = data;
		var dj_titleTen = rootTenReward.getChildByName("dj_titleTen");
		var dj_gxhd = dj_titleTen.getChildByName("dj_gxhd");
		var btn_qdlq = rootTenReward.getChildByName("btn_qdlq");
		var dj_guangxiao03_17 = dj_titleTen.getChildByName("dj_guangxiao03_17");
		dj_guangxiao03_17.setOpacity(180);
		this.gxhd_action(rootTenReward,dj_titleTen,dj_gxhd);
		var sprizePicArr  = new Array();
		var shousuoArr = new Array();
		for (var int = 0; int < 10; int++) {
			var DrinkResult = data.DrinkResult[int];
			var namePic = this.getPrizeNameAndPrizePic(DrinkResult,NpcID);		
			var prizeName = namePic.prizeName;
			var prizePic = namePic.prizePic;
			var sprizeSpr = rootTenReward.getChildByName("Sprite_"+(int+1));
			sprizePicArr.push(sprizeSpr);
			shousuoArr.push(sprizeSpr);
			sprizeSpr.setVisible(false);	
			sprizeSpr.setSpriteFrame(prizePic);
			sprizeText = new cc.LabelTTF(prizeName,"Arial",23,cc.size(0, 0),cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
			sprizeText.anchorX = 0.5;
			sprizeText.anchorY = 1.0;
			sprizeText.setNormalizedPosition(0.5,0);
			sprizeText.setFontFillColor(cc.color(255, 231, 65, 255));
			sprizeSpr.addChild(sprizeText,1,1);
			var reward = (DrinkResult.wRewardID == 0)?0:1;
			if (DrinkResult.lCounts >= this.big_counts[NpcID][reward]) {//判断是否为大额数值
				var smallHalo = new cc.Sprite("#dj_guang-1.png");
				smallHalo.setNormalizedPosition(0.5, 0.5);
				smallHalo.runAction(cc.rotateBy(2.0, 90, 90).repeatForever());
				sprizeSpr.addChild(smallHalo,-1,2);
			};
		};
		zhezhao.sprizePicArr = sprizePicArr;
		zhezhao.shousuoArr = shousuoArr;
		//每隔0.3秒单个显示中奖奖品
		zhezhao.schedule(function() {
			if (sprizePicArr.length>0) {		
				cc.audioEngine.playEffect(Effect_res.dj_chujiangli);
				var sprize_pic =  sprizePicArr.shift();
				sprize_pic.setVisible(true);
			}else{
				cc.audioEngine.playEffect(Effect_res.dj_gongxihuode_over);
			};
		}, 0.3, 10);
		
		//确定领取按钮触发函数
		btn_qdlq.addClickEventListener(function() {
			self.qdlq_tenteward(zhezhao)
		});
	},
	/**
	 * 对饮十次确定按钮触发的函数
	 * */
	qdlq_tenteward : function(zhezhao) {
		cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
		zhezhao.isShouSuo = true;	
		var data = zhezhao.data;
		var sprize_pic = zhezhao.sprizePicArr.shift();
		while (sprize_pic) {//把所有的奖品显示出来，并保证了sprizePicArr清空
			sprize_pic.setVisible(true);
			var sprize_pic =  zhezhao.sprizePicArr.shift();
		};
		for (var int2 = 0; int2 < zhezhao.shousuoArr.length; int2++) {//所有奖品聚集在一起
			var array_element = zhezhao.shousuoArr[int2];
			array_element.runAction(cc.moveTo(0.3, 0, 150));
		};

		zhezhao.scheduleOnce(function() {//把中奖层去掉
			cc.pool.putInPool(zhezhao);
		}, 0.3);

		//传入参数列表执行金币飞入动作
		var duijiu_pos = cc.loader.getRes("res/shz/DuiJiuScene/DuiJiuPos.json");
		var repeatTime = 20;
		var listArr = new Array();
		if (data.lGetScore>0) {
			var jinbiTen = {
					focusPoint : 	cc.p(cc.winSize.width/2, cc.winSize.height/2+100),
					aimPoint : cc.p(duijiu_pos.pos.pos_yuanbao.x, duijiu_pos.pos.pos_yuanbao.y),
					dispersedRange : cc.p(800, 200),
					pictureName : "#dj_yuanbao.png",
					prizeType : 0,
					addNum : Math.round(data.lGetScore/repeatTime)
			};
			listArr.push(jinbiTen)
		};	
		if (data.lGetLottery>0) {
			var jiangquanTen = {
					focusPoint : 	cc.p(cc.winSize.width/2, cc.winSize.height/2+100),
					aimPoint : cc.p(duijiu_pos.pos.pos_jiangquan.x, duijiu_pos.pos.pos_jiangquan.y),
					dispersedRange : cc.p(600, 150),
					pictureName : "#dj_quan.png",
					prizeType : 1,
					addNum : Math.round(data.lGetLottery/repeatTime)
			};
			listArr.push(jiangquanTen)
		};
		DUIJIU.schedule(DUIJIU.prizeMovetoInformation(listArr), 0.01,repeatTime-1);//奖券或金币移动到个人信息
	},
	/**获奖后得到的奖券或金币，移动到个人信息时的动作
	 * @param Parameterlist 数组包含至多两个元素。元素结构为数据对象，包含以下参数
	 * focusPoint : 产生精灵的中心点
	 * aimPoint : 精灵要到达的目的点
	 * dispersedRange : 精灵围绕中心点的分散范围
	 * pictureName : 产生精灵的贴图名字
	 * prizeType : 获奖类型,0表示金币，1表示奖券
	 * addNum : 金币或奖券的增加量
	 * */
	prizeMovetoInformation : function(Parameterlist) {
		return function() {
		var size = cc.winSize;
		for ( var eleKey in Parameterlist) {
			cc.audioEngine.playEffect(Effect_res.dj_yuanbao_fly);
			var Parameter = Parameterlist[eleKey];
			var aNode = new cc.Node();
			var posX  = Parameter.focusPoint.x;
			var posY = Parameter.focusPoint.y;
			aNode.x = posX;
			aNode.y = posY;
			this.addChild(aNode, 5);
			for (var int2 = 0; int2 < 2; int2++) {
				var jinbiSpr = new cc.Sprite(Parameter.pictureName);
				jinbiSpr.x = Math.random()*100;
				jinbiSpr.y = Math.random()*50;
				aNode.addChild(jinbiSpr, 1);
				var duration = Math.random()*0.2;
				var rotaAtc = cc.rotateBy(duration, 360).repeatForever();
				jinbiSpr.runAction(rotaAtc);
				var scal = Math.random()+1;
				jinbiSpr.setScale(scal, scal);
				jinbiSpr.runAction(cc.scaleTo(1.2, 0.5, 0.5))
			};	
			var disX =  (Math.random()-0.5)*Parameter.dispersedRange.x;
			var disY =  (Math.random())*Parameter.dispersedRange.y;	
			var array = [
			             cc.p(posX, posY),	
			             cc.p(posX+disX*0.5-50,posY+disY*0.5),
			             cc.p(posX+disX, posY+disY),
			             ];
			var array1 = [
			              cc.p(posX+disX, posY+disY),
			              cc.p((posX+disX+Parameter.aimPoint.x-100)*0.5,(posY+disY+Parameter.aimPoint.y)*0.5),
			              cc.p(Parameter.aimPoint.x, Parameter.aimPoint.y),
			              ];
			aNode.prizeType = Parameter.prizeType;
			aNode.addNum = Parameter.addNum;
			var action1 = cc.sequence(
					cc.cardinalSplineTo(0.4, array, 0).easing(cc.easeOut(4.0)),
					cc.cardinalSplineTo(0.8, array1, 0).easing(cc.easeIn(1.0)),
					cc.callFunc(function() {
						if (this.prizeType == 0) {
							USER_lUserScore += this.addNum;
							YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
						};
						if (this.prizeType == 1) {
							USER_lLottery += this.addNum;
							JiangQuanSp.setString(Producer.changeNumberToString(USER_lLottery));
                         };
						this.removeFromParent(false);
					}, aNode)
					);
			aNode.runAction(action1);
		};
		};
	},
	/**
	 * 对饮一次，中奖为大额的时候所播放的动画
	 */
	onceDonghua : function(data) {
		var DrinkResult = data.DrinkResult[0];
		var NpcID = data.wNpcID;
		var namePic = this.getPrizeNameAndPrizePic(DrinkResult,NpcID);
		var prizeName = namePic.prizeName;
		var prizePic = namePic.prizePic;
		var self = this;
		cc.audioEngine.playEffect(Effect_res.dj_kaijiangOnce);
		var rootOnceReward = ccs.load("res/shz/DuiJiuScene/once_reward.json").node;
		rootOnceReward.x = cc.winSize.width/2;
		rootOnceReward.y = cc.winSize.height/2;
		var zhezhao = TestPushBox.create(rootOnceReward);
		self.addChild(zhezhao,200);
		
		var dj_titleTen = rootOnceReward.getChildByName("dj_titleTen");
		var dj_gxhd = dj_titleTen.getChildByName("dj_gxhd");
		var btn_qdlq = rootOnceReward.getChildByName("btn_qdlq");
		var dj_guangxiao03_17 = dj_titleTen.getChildByName("dj_guangxiao03_17");
		dj_guangxiao03_17.setOpacity(180);
		this.gxhd_action(rootOnceReward,dj_titleTen,dj_gxhd);
		var dj_xuanzhuanguang = rootOnceReward.getChildByName("dj_xuanzhuanguang");dj_xuanzhuanguang.setScale(0.1);
		var dj_baiguang = rootOnceReward.getChildByName("dj_baiguang");dj_baiguang.setScale(0.1);
		var dj_beijingguang = rootOnceReward.getChildByName("dj_beijingguang");dj_beijingguang.setOpacity(180);//dj_beijingguang.setScale(0.1);
		var dj_guangquan = rootOnceReward.getChildByName("dj_guangquan");
		var dj_guangquan_0 = rootOnceReward.getChildByName("dj_guangquan_0");dj_guangquan_0.setVisible(false);
		var dj_xing = rootOnceReward.getChildByName("dj_xing");dj_xing.setScale(0.1);
		var dj_xing_0 = rootOnceReward.getChildByName("dj_xing_0");dj_xing_0.setScale(0.1);
		var dj_xing_1 = rootOnceReward.getChildByName("dj_xing_1");dj_xing_1.setScale(0.1);
		var dj_dianguang = rootOnceReward.getChildByName("dj_dianguang");dj_dianguang.setScale(0.1);
		var dj_dianguang_0 = rootOnceReward.getChildByName("dj_dianguang_0");dj_dianguang_0.setScale(0.1);
		var dj_dianguang_1 = rootOnceReward.getChildByName("dj_dianguang_1");dj_dianguang_1.setScale(0.1);
		var prize_pic = rootOnceReward.getChildByName("prize_pic");prize_pic.setScale(0.1);
		prize_pic.setSpriteFrame(prizePic);
		var prize_name = prize_pic.getChildByName("prize_name");
		prize_name.setString(prizeName);
		
		dj_baiguang.runAction(cc.scaleTo(0.2, 1.0, 1.0));
		dj_beijingguang.runAction(cc.scaleTo(0.2, 4.0, 4.0));//
		
		var starAction = cc.sequence(cc.spawn(cc.scaleTo(0.3, 0.8, 0.8),cc.moveBy(0.3, -200, 100),cc.spawn(cc.fadeOut(1.2),cc.moveBy(1.2, -100, 50))));
		dj_xing.runAction(starAction);
		var starAction0 = cc.sequence(cc.spawn(cc.scaleTo(0.3, 1.0, 1.0),cc.moveBy(0.3, 220, 20),cc.spawn(cc.fadeOut(1.2),cc.moveBy(1.2, 110, 10))));
		dj_xing_0.runAction(starAction0);
		var starAction1 = cc.sequence(cc.spawn(cc.scaleTo(0.3, 1.2, 1.2),cc.moveBy(0.3, 70, -180),cc.spawn(cc.fadeOut(1.2),cc.moveBy(1.2, 35, -90))));
		dj_xing_1.runAction(starAction1);
		
		var dianrAction = cc.sequence(cc.spawn(cc.scaleTo(0.3, 1.0, 1.0),cc.moveBy(0.2, 0, 100),cc.spawn(cc.fadeOut(3.0),cc.moveBy(3.0, 0, 150))));
		dj_dianguang.runAction(dianrAction);
		var dianrAction0 = cc.sequence(cc.spawn(cc.scaleTo(0.3, 1.0, 1.0),cc.moveBy(1.2, -150, -100),cc.spawn(cc.fadeOut(1.2),cc.moveBy(1.2, -75, -50))));
		dj_dianguang_0.runAction(dianrAction0);
		var dianrAction1 = cc.sequence(cc.spawn(cc.scaleTo(0.3, 1.2, 1.2),cc.moveBy(0.3, 120, -120),cc.spawn(cc.fadeOut(1.2),cc.moveBy(1.2, 60, -60))));
		dj_dianguang_1.runAction(dianrAction1);
		prize_pic.runAction(cc.sequence(cc.scaleTo(0.5, 1.5, 1.5).easing(cc.easeOut(4.0)),cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(2.0)),cc.scaleTo(0.1, 1.3, 1.3)));
		dj_guangquan.runAction(
				cc.spawn(
				cc.scaleTo(2.0, 2.5, 2.5).easing(cc.easeOut(1.0)),
				cc.fadeTo(2.0, 0).easing(cc.easeIn(2.0))
				));
		dj_xuanzhuanguang.runAction(cc.rotateBy(4.0, 90, 90).repeatForever());
		dj_xuanzhuanguang.runAction(cc.scaleTo(0.2, 1.0, 1.0).easing(cc.easeIn(2.0)));
		rootOnceReward.scheduleOnce(function() {
			dj_guangquan_0.setVisible(true);
			dj_guangquan_0.runAction(cc.spawn(
					cc.scaleTo(2.0, 2.5, 2.5),
					cc.fadeTo(2.0, 0).easing(cc.easeIn(2.0))
			));	
		}, 0.5);
		
		rootOnceReward.scheduleOnce(function() {
			cc.pool.putInPool(zhezhao);
			var duijiu_pos = cc.loader.getRes("res/shz/DuiJiuScene/DuiJiuPos.json");
			var repeatTime = 20;
			var onceList = {
					focusPoint : 	cc.p(cc.winSize.width/2, cc.winSize.height/2),
					aimPoint : cc.p(data.lGetScore>0?duijiu_pos.pos.pos_yuanbao.x : duijiu_pos.pos.pos_jiangquan.x, data.lGetScore>0?duijiu_pos.pos.pos_yuanbao.y : duijiu_pos.pos.pos_jiangquan.y),
					dispersedRange : cc.p(400, 100),
					pictureName : data.lGetScore>0?"#dj_yuanbao.png" : "#dj_quan.png",
					prizeType : data.lGetScore>0?0 : 1,
					addNum : Math.round(data.lGetScore>0?data.lGetScore/repeatTime:data.lGetLottery/repeatTime)
			};
			self.schedule(self.prizeMovetoInformation([onceList]), 0.01,repeatTime-1);//奖券或金币移动到个人信息
		}, 3.0);
	},
	/**对酒结果的显示*/
	xianShiResultStr : function() {
		var miaoshu_str = this._tanchu_str.pop();if (!miaoshu_str) return;
		var miaoshu = new cc.LabelTTF(miaoshu_str,"Arial",26);
		//miaoshu.color = cc.color.BLACK;
		miaoshu.enableStroke(cc.color.WHITE, 2);
		miaoshu.setFontFillColor(cc.color(62, 0, 0, 255));
		miaoshu.x = cc.winSize.width/2;
		miaoshu.y = cc.winSize.height/2;
		cc.director.getRunningScene().addChild(miaoshu,100);
		miaoshu.setScale(0.1, 0.1);	
		miaoshu.runAction(
				cc.sequence(
						cc.spawn(
								cc.scaleTo(0.5,1.0,1.0),
								cc.moveBy(0.5, 0, 100)
						),
						cc.spawn(
								cc.moveTo(2.0, cc.winSize.width/2, cc.winSize.height),
								cc.fadeOut(2.0)
						),		
						cc.callFunc(function() {
							this.removeFromParent(false);
						}, miaoshu)
				)
				);
	},
	buttonClick : function(send,type) {
		switch (type) {
		case ccui.Widget.TOUCH_BEGAN:
			if (DUIJIU.btnTag == 0) {
				DUIJIU.btnTag = send.getTag();
			}
		case ccui.Widget.TOUCH_MOVED:
			break;
		case ccui.Widget.TOUCH_ENDED:
			var touchEndTag	= send.getTag();
			if (touchEndTag == DUIJIU.btnTag) {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				switch (send.getTag()) {
				case 29://返回
					cc.director.runScene(new GameHallScene());
					break;
				case 10://加号充值
					ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
					break;
				case 11://兑换按钮
					shangCheng.creatChongZhiLayer(cc.director.getRunningScene());
					break;
				case 30 : 
					FenXiang.creatFenXiangLayer(cc.director.getRunningScene());
					break;
				case 31://奖品
					DUIJIU.creatJiangpin();
					break;
				case 32://规则
					DUIJIU.creatGuize();
					break;
				case 33://充值
					ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
					break;
				case 34://银行
					yinHang.creatYinHangLayer(cc.director.getRunningScene());				
					break;
				case 35://商城
					shangCheng.creatChongZhiLayer(cc.director.getRunningScene());
					break;
				case 36://记录
					DUIJIU.creatDuijiuJilu(cc.director.getRunningScene());
					break;
				default:
					break;
				}
			}
			DUIJIU.btnTag = 0;
			break;
		default:
			break;
		}


	},
	/***/
	shoufenTexiao : function(parentNode) {
		parentNode.runAction(cc.sequence(
				cc.delayTime(0.25),
				cc.callFunc(function() {
					var shanShuo = new cc.ParticleSystem("res/shz/MainGameScene/FJ.plist");
					shanShuo.x = 20,
					shanShuo.y = 5;
					parentNode.addChild(shanShuo);
				}, parentNode),
				cc.scaleTo(0.1, 2.0, 2.0),
				cc.scaleTo(0.5, 1.0, 1.0)	
		));


		var texiao = new cc.ParticleSystem("res/shz/MainGameScene/jinbitexiao.plist");
		parentNode.addChild(texiao);
		texiao.x = -40,
		texiao.y = 15;
		texiao.runAction(cc.sequence(
				cc.moveBy(0.5, 200, 0),
				cc.callFunc(function() {
					texiao.removeFromParent(true);
				}, this)
		));
	},
	/**触摸开始
	 * 判断三个人物的当前动作，若有任何人物当前正在执行动作，结束触摸
	 * 若没有人物执行动作，但是点中的人物显示为反面的话，结束触摸
	 * 若触摸正常，被点中人物的dianjishijian属性加一*/
	_onTouchBegan : function(touch,event) {
		var target = event.getCurrentTarget();
		cc.log("TTTTTTTTTTTTTTTTisAction",target.isAction);
		cc.log("TTTTTTTTTTTTTTTTstop_touch",target.stop_touch);
		for (var i5 = 0; i5 <target.isAction.length; i5++) {
			if (target.isAction[i5]) return false;
		}
		var locationInNode = touch.getLocation();
		
		for (var int_rect = 0; int_rect < target.renwu.length; int_rect++) {
			var array_element = target.renwu[int_rect].node_rect;
			if (cc.rectContainsPoint(array_element, locationInNode)) {
					cc.log("点中了人物！！！");
					if(target.stop_touch[int_rect]){
					return false;
					}
					target.renwu[int_rect].dianjishijian++
					return true;
			}
		}
		return false;		
	},
	/**触摸移动*/
	_onTouchMoved : function(touch,event) {
		
	},
	/**触摸结束
	 * 判定触摸人物，被选中人物dianjishijian属性加一
	 * 若dianjishijian值为二，表明玩家选择了该人物执行翻转动作
	 * 把所有人物的dianjishijian属性重置为0*/
	_onTouchEnded : function(touch,event) {
		var target = event.getCurrentTarget();
		var duijiu_pos = cc.loader.getRes("res/shz/DuiJiuScene/DuiJiuPos.json");
		var locationInNode = touch.getLocation();
		for (var int_rect = 0; int_rect < target.renwu.length; int_rect++) {
			var array_element = target.renwu[int_rect].node_rect;
			if (cc.rectContainsPoint(array_element, locationInNode)) {
				cc.log("选中了人物！！！");
				target.renwu[int_rect].dianjishijian++
				if (target.renwu[int_rect].dianjishijian == 2) {	
					target.stop_touch[int_rect]= true;
					target.fanZhuanRenwu(int_rect);
				};
			}
			target.renwu[int_rect].dianjishijian = 0;
		}
	},

	/**奖品*/
	creatJiangpin : function() {
		var jiangpin = new cc.Sprite("res/shz/DuiJiuScene/dj_jiangpin.png");
		jiangpin.x = cc.winSize.width/2;
		jiangpin.y = cc.winSize.height/2;
		var zhezhao = TestPushBox.create(jiangpin);
		cc.director.getRunningScene().addChild(zhezhao,100);
		
		var btn_que = new ccui.Button;
		btn_que.loadTextures("anniu1.png", "anniu2.png", "anniu3.png", ccui.Widget.PLIST_TEXTURE);
		btn_que.x = 471;
		btn_que.y = 54;
		jiangpin.addChild(btn_que);
		btn_que.addClickEventListener(function(){
			cc.pool.putInPool(zhezhao);
			if(cc.textureCache.getTextureForKey("res/shz/DuiJiuScene/dj_jiangpin.png")){
				cc.textureCache.removeTextureForKey("res/shz/DuiJiuScene/dj_jiangpin.png");
			};
			})
		
		var sp_que = new cc.Sprite("#queding.png");
		sp_que.x = 104;
		sp_que.y = 29;
		btn_que.addChild(sp_que);
		
		var btn_guan = new ccui.Button;
		btn_guan.loadTextures("guanbi1.png", "guanbi2.png", "guanbi3.png", ccui.Widget.PLIST_TEXTURE);
		btn_guan.x = 918;
		btn_guan.y = 514;
		jiangpin.addChild(btn_guan);
		btn_guan.addClickEventListener(function(){
			cc.pool.putInPool(zhezhao);
			if(cc.textureCache.getTextureForKey("res/shz/DuiJiuScene/dj_jiangpin.png")){
				cc.textureCache.removeTextureForKey("res/shz/DuiJiuScene/dj_jiangpin.png");
			};
			});		
	},
	/**规则*/
	creatGuize : function() {
		var guize = new cc.Sprite("res/shz/DuiJiuScene/dj_guize.png");
		guize.x = cc.winSize.width/2;
		guize.y = cc.winSize.height/2;
		var zhezhao = TestPushBox.create(guize);
		cc.director.getRunningScene().addChild(zhezhao,100);
		var miaoshu = new cc.LabelTTF(DUIJIU.GuiZe_str,"Arial",24, cc.size(0, 0),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_TOP);
		miaoshu.setFontFillColor(cc.color(54, 16, 0, 255));
		miaoshu.x = 486;
		miaoshu.y = 281;
		guize.addChild(miaoshu);

		var btn_que = new ccui.Button;
		btn_que.loadTextures("anniu1.png", "anniu2.png", "anniu3.png", ccui.Widget.PLIST_TEXTURE);
		btn_que.x = 471;
		btn_que.y = 54;
		guize.addChild(btn_que);
		btn_que.addClickEventListener(function(){
			cc.pool.putInPool(zhezhao);
			if(cc.textureCache.getTextureForKey("res/shz/DuiJiuScene/dj_guize.png")){
				cc.textureCache.removeTextureForKey("res/shz/DuiJiuScene/dj_guize.png");
			}
			});

		var sp_que = new cc.Sprite("#queding.png");
		sp_que.x = 104;
		sp_que.y = 29;
		btn_que.addChild(sp_que);

		var btn_guan = new ccui.Button;
		btn_guan.loadTextures("guanbi1.png", "guanbi2.png", "guanbi3.png", ccui.Widget.PLIST_TEXTURE);
		btn_guan.x = 918;
		btn_guan.y = 514;
		guize.addChild(btn_guan);
		btn_guan.addClickEventListener(function(){
			cc.pool.putInPool(zhezhao);
			if(cc.textureCache.getTextureForKey("res/shz/DuiJiuScene/dj_guize.png")){
				cc.textureCache.removeTextureForKey("res/shz/DuiJiuScene/dj_guize.png");
			}
			});		
	},
	/**个人信息*/
	creatUserInfo : function() {
		var _this = this;
		var duijiu_pos = cc.loader.getRes("res/shz/DuiJiuScene/DuiJiuPos.json");
		var touxiang = new cc.Sprite("#"+touXiangFrame[USER_wFaceID]);
		touxiang.x = duijiu_pos.pos.pos_touxiang.x;
		touxiang.y = duijiu_pos.pos.pos_touxiang.y;
		this.addChild(touxiang);

		var nicknameBiao = new cc.Sprite("#nickname.png");
		nicknameBiao.x = duijiu_pos.pos.pos_nicehngbiaoshi.x;
		nicknameBiao.y = duijiu_pos.pos.pos_nicehngbiaoshi.y;
		this.addChild(nicknameBiao);

		var vip = new cc.Sprite("#"+VIPS[USER_wMemOrder]);
		vip.x = duijiu_pos.pos.pos_vip.x;
		vip.y = duijiu_pos.pos.pos_vip.y;
		this.addChild(vip);
		//ECCA14
		var idBiao = new cc.LabelTTF("ID:","Arial",24, cc.size(0, 0),cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		idBiao.setFontFillColor(cc.color(236, 202, 20, 255));
		idBiao.x = duijiu_pos.pos.pos_IDbiaoshi.x;
		idBiao.y = duijiu_pos.pos.pos_IDbiaoshi.y;
		this.addChild(idBiao);

		var nicheng = new cc.LabelTTF(USER_szNickName.toString(),"Arial",24, cc.size(0, 0),cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		nicheng.x = duijiu_pos.pos.pos_niceng.x;
		nicheng.y = duijiu_pos.pos.pos_niceng.y;
		this.addChild(nicheng);	

		var gameID = new cc.LabelTTF(USER_dwGameID.toString(),"Arial",24, cc.size(0, 0),cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		gameID.x = duijiu_pos.pos.pos_ID.x;
		gameID.y = duijiu_pos.pos.pos_ID.y;
		this.addChild(gameID);

		var str = Producer.changeNumberToString(USER_lUserScore);
		var yuanbao = new cc.LabelBMFont(str,"res/shz/TanChuCeng/tanChuCengRes/number_shz.fnt");
		yuanbao.x =  duijiu_pos.pos.pos_yuanbao.x;
		yuanbao.y =  duijiu_pos.pos.pos_yuanbao.y;
		this.addChild(yuanbao);

		var str = Producer.changeNumberToString(USER_lLottery);
		jiangquan = new cc.LabelBMFont(str,"res/shz/TanChuCeng/tanChuCengRes/number_shz.fnt");
		jiangquan.x =  duijiu_pos.pos.pos_jiangquan.x;
		jiangquan.y =  duijiu_pos.pos.pos_jiangquan.y;
		this.addChild(jiangquan);
		
		var chongzhi = new ccui.Button;
		chongzhi.tag = 33;
		chongzhi.loadTextures("btn_chongzhi_1.png", "btn_chongzhi_2.png", "btn_chongzhi_3.png", ccui.Widget.PLIST_TEXTURE);
		chongzhi.x = duijiu_pos.pos.pos_chongzhi.x;
		chongzhi.y = duijiu_pos.pos.pos_chongzhi.y;
		chongzhi.addTouchEventListener(this.buttonClick,this);
		this.addChild(chongzhi);
		
		var yinhang = new ccui.Button;
		yinhang.tag = 34;
		yinhang.loadTextures("btn_yinhang_1.png", "btn_yinhang_2.png", "btn_yinhang_3.png", ccui.Widget.PLIST_TEXTURE);
		yinhang.x = duijiu_pos.pos.pos_yinhang.x;
		yinhang.y = duijiu_pos.pos.pos_yinhang.y;
		yinhang.addTouchEventListener(this.buttonClick,this);
		this.addChild(yinhang);
		
		
		var shangcheng = new ccui.Button;
		shangcheng.tag = 35;
		shangcheng.loadTextures("btn_shangcheng_1.png", "btn_shangcheng_2.png", "btn_shangcheng_3.png", ccui.Widget.PLIST_TEXTURE);
		shangcheng.x = duijiu_pos.pos.pos_lipin.x;
		shangcheng.y = duijiu_pos.pos.pos_lipin.y;
		shangcheng.addTouchEventListener(this.buttonClick,this)
		this.addChild(shangcheng);
		
		var jilu = new ccui.Button;
		jilu.tag = 36;
		jilu.loadTextures("dj_jilu-1.png", "dj_jilu-2.png", "dj_jilu-3.png", ccui.Widget.PLIST_TEXTURE);
		jilu.x = duijiu_pos.pos.pos_jilu.x;
		jilu.y = duijiu_pos.pos.pos_jilu.y;
		jilu.addTouchEventListener(this.buttonClick,this);
		this.addChild(jilu);
		
		
		TouXiangSp = touxiang;
		YuanBaoSp = yuanbao;
		NiChengSp = nicheng;
		GameIDSp = gameID;
		JiangQuanSp = jiangquan;
		VipSp = vip;
	},
	/**进入场景*/
	onEnter : function() {
		this._super();
		cc.audioEngine.playMusic(Music_res.duijiu_bgm, true);
		var TouchListener = cc.EventListener.create({  
			swallowTouches: true,  
			event: cc.EventListener.TOUCH_ONE_BY_ONE,  
			onTouchBegan:this._onTouchBegan,  
			onTouchMoved:this._onTouchMoved,  
			onTouchEnded:this._onTouchEnded  
		});  
		cc.eventManager.addListener(TouchListener, this);
		
		var jilu = slocal.getItem(DUIJIUJILU_KEY);
		jilu = jilu || "[]"
		this._jilu_str= JSON.parse(jilu);
	},
	onExit : function() {
		this._super();
		cc.audioEngine.stopMusic(false);
		var numberAry =["res/shz/DuiJiuScene/DuiJiuAni","res/shz/DuiJiuScene/DuiJiuRes"];
		removeResources(numberAry);
		this.anniu_jinzhi = false;//点击带有弹出框的
		for (var int = 0; int < this.stop_touch.length; int++) {
			this.stop_touch[int] = false;
		};
		for (var int = 0; int < this.isAction.length; int++) {
			this.isAction[int] = false;
		};
		this.renwu = [];
		this.duijiu_info = null;
		
		
		var tan_str = this._tanchu_str.pop();
		while (tan_str) {
			tan_str = mainScene_this._spritesActions.pop();
		};
		this._tanchu_str = [];
		this.unschedule(this.xianShiResultStr);
		var jilu_str = JSON.stringify(this._jilu_str);
		slocal.setItem(DUIJIUJILU_KEY,jilu_str);
		DUIJIU = null;
	},
	
	/**显示对酒纪录，纪录保存50条最近的信息*/
	creatDuijiuJilu : function() {
		//背景
		var jilu_bg = new cc.Sprite("#dj_jilu-bg.png");
		jilu_bg.x = cc.winSize.width/2;
		jilu_bg.y = cc.winSize.height/2;
		var zhezhao = TestPushBox.create(jilu_bg);
		//确定按钮
		var btn_que = new ccui.Button;
		btn_que.loadTextures("anniu1.png", "anniu2.png", "anniu3.png", ccui.Widget.PLIST_TEXTURE);
		btn_que.x = 228.5;
		btn_que.y = 50;
		jilu_bg.addChild(btn_que);
		btn_que.addClickEventListener(function(){
			cc.pool.putInPool(zhezhao);
		});
		var sp_que = new cc.Sprite("#queding.png");
		sp_que.x = 104;
		sp_que.y = 29;
		btn_que.addChild(sp_que);
		//记录tableView
		cc.director.getRunningScene().addChild(zhezhao,1000);
		var tableView = new cc.TableView(this, cc.size(390, 415));
		this._tableView = tableView;
		tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		tableView.ignoreAnchorPointForPosition(false);
		tableView.anchorX = 0;
		tableView.anchorY = 0;
		tableView.x = 35;
		tableView.y = 97;
		tableView.setDelegate(jilu_bg);
		tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
		jilu_bg.addChild(tableView);
	},
	reloadData:function () {cc.log("重新加载tableView")},
	tableCellAtIndex:function (table, idx) {
		var strValue = idx.toFixed(0);
		var cell = table.dequeueCell();
		if (!cell) {
			cell = new cc.TableViewCell();
			var miaoshu = new cc.LabelTTF("","Arial",20, cc.size(0, 0),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_TOP);
			this._miaoshu = miaoshu;
			miaoshu.setFontFillColor(cc.color(54, 16, 0, 255));
			miaoshu.anchorX = 0;
			miaoshu.anchorY = 1;
			miaoshu.x = 10;
			miaoshu.y = 40;
			cell.addChild(miaoshu,1,123);
		}; 
		var miao = cell.getChildByTag(123);
		var length = (this._jilu_str.length-1)-idx;
		miao.setString((length+1).toString()+"、"+this._jilu_str[length].toString());
		if (idx== 0) {
			miao.setFontFillColor(cc.color(255, 0, 0, 255));
		}else {
			miao.setFontFillColor(cc.color(54, 16, 0, 255));
};
		return cell;
	},
	tableCellSizeForIndex:function (table, idx) {
		return cc.size(390, 40);
	},
	numberOfCellsInTableView:function (table) {
		return this._jilu_str.length;
	},
/**从网站获取规则信息*/
	getGuiZeFromWeb : function() {
		cc.log("KKKKKKKKKKKKKKKgetGuiZeFromWeb");
		var self = this; 
		var testHttp = cc.loader.getXMLHttpRequest();
//		* 线上请求地址: http://m-api.baiyishuihu.com/index.php/Api/GameRule/festvalRule
//		* 本地请求地址: http://172.16.10.53:8090/index.php/Api/GameRule/festvalRule
		testHttp.open("GET", "http://m1-api.baiyishuihu.com/index.php/Api/GameRule/festvalRule");
		testHttp.timeout = 10000;//设置请求超时时间
		testHttp.onreadystatechange = function() {
			cc.log("testHttp.readyState,testHttp.status",testHttp.readyState,testHttp.status);
			if (testHttp.readyState ==4 || testHttp.status == 200 ) {
				var jieshouData = testHttp.responseText;
				var guize = 	JSON.parse(jieshouData); 
				if (guize.msg == "success") {
					self.GuiZe_str = guize.result.msg;
				}		
			}
		};
		testHttp.send("");
	},
});

var DuiJiuScene = cc.Scene.extend({
	canshubody : null,
	ctor : function(canshubody) {
		this._super();
		this.canshubody = canshubody;
		return true;
	},
	onEnter:function () {
		this._super();
		var layer = new DuiJiuLayer(this.canshubody);
		this.addChild(layer);
	}
});




var duijiuResult = cc.LayerColor.extend({
	money : null,
	isShouSuo : false,
	ctor:function (aNode) { 
		this._super(cc.color(0,0,0,150));
		zuZhiBack = true;
		this.addChild(aNode,0,1);
		return true;
	},
	unuse : function() {
		zuZhiBack = false;
		this.isShouSuo = false;
		var spr = this.sprizePicArr.pop();
		while (spr) {
			spr = this.sprizePicArr.pop();
		};
		var spr1 = this.shousuoArr.pop();
		while (spr1) {
			spr1 = this.shousuoArr.pop();
		}
		if(this.getChildByTag(1)){
			this.removeChildByTag(1);
		}
		this.removeFromParent(false);
		cc.log("unuse");

//		this.retain();
	},
	reuse : function(aNode) {
		cc.log("resue");
		zuZhiBack = true;
		this.setVisible(true);
		this.addChild(aNode,0,1);
		this.setVisible(true);
	},
	onEnter:function(){
		var self = this;
		this._super();
		var listener1 = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				return true;
			},
			onTouchMoved: function (touch, event) {
			},
			onTouchEnded: function (touch, event) {
				cc.audioEngine.playEffect(Effect_res.dj_gongxihuode_over);
				var len = self.sprizePicArr.length;
				if (len == 0){
					if(!self.isShouSuo){
					DUIJIU.qdlq_tenteward(self);
					};
					return;
				}else{	
					self.unscheduleAllCallbacks();	
				for (var int = 0; int < len; int++) {
					var sprize_pic =  self.sprizePicArr.shift();
					sprize_pic.setVisible(true);
				};
				};
			}
		});		

		cc.eventManager.addListener(listener1, this);
	},
	onExit : function(){
		this._super();
		zuZhiBack = false;
	}

});

duijiuResult.create = function(aNode){
	if (cc.pool.hasObject(duijiuResult)) {
		return cc.pool.getFromPool(duijiuResult,aNode);	
	}else{
		return new duijiuResult(aNode);
	};
};




/**
这个是以前展现对酒信息的方式，已经不用了。
//var Data = {Describe : "网络连接错误，请检查网络后，重新链接",errorCode : 0,isBack : true};
var DuiJiuResult = cc.LayerColor.extend({
	_miaoshu : null,
	_quedingBtn : null,
	_isBack : false,
	_errorCode : 0,
	_hangshu : 1,
	_shuju : null,
	_scrollView : null,
	ctor:function (Data) { 
		var _this = this;
		this._super(cc.color(0,0,0,50));
		this._shuju = Data;
		zuZhiBack = true;
		var aNode = ccs.load("res/shz/TanChuCeng/tiShi.json").node;
		aNode.x = cc.winSize.width/2;
		aNode.y = cc.winSize.height/2;
		this.addChild(aNode,0,1);
		var  miao = aNode.getChildByName("Describe_Text");
		miao.setVisible(false);
		
		var scrollView = new ccui.ScrollView();
		this._scrollView = scrollView;
		scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
		scrollView.setTouchEnabled(true);
		scrollView.setContentSize(cc.size(600, 160));
		scrollView.setInnerContainerSize(cc.size(600, 520));
		scrollView.anchorX = 0.5;
		scrollView.anchorY = 1.0;
		scrollView.x = 0;
		scrollView.y = 80;
		aNode.addChild(scrollView,100);
		var miaoshu = new cc.LabelTTF("","Arial",24, cc.size(0, 0),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_TOP);
		this._miaoshu = miaoshu;
		miaoshu.setFontFillColor(cc.color(0, 0, 0, 255));
		miaoshu.anchorX = 0;
		miaoshu.anchorY = 1;
		miaoshu.x = 80;
		miaoshu.y = 520;
		scrollView.addChild(miaoshu,100);
		this.schedule(this.fuzhiMiaoshu, 0.5, 9);
		
		this._quedingBtn = aNode.getChildByName("Button_queding");
		this._quedingBtn.addClickEventListener(function() {
//			cc.log("MMMMMMMMMM");
//			cc.pool.putInPool(_this);
			zuZhiBack = false;
			_this._miaoshu.setString("");
			_this.removeFromParent(true);
		});
		return true;
	},

	unuse : function() {
		zuZhiBack = false;
		this.removeFromParent(true);
		this._miaoshu.setString("");
		this.retain();
	},
	reuse : function(Data) {
		zuZhiBack = true;
		this.schedule(this.fuzhiMiaoshu, 0.5, 9);
	},
	fuzhiMiaoshu : function() {
		var data = this._shuju;
		var miaoshu_str = "";
		var ren_str =  "";
		switch (data.wNpcID) {
		case 0:
			ren_str = "鲁智深";
			break;
		case 1:
			ren_str = "林冲";
			break;
		case 2:
			ren_str = "宋江";
			break;
		default:
			break;
		};
		for (var i3 = 0; i3 < this._hangshu; i3++) {
			var dijici = "第"+(i3+1)+"次： ";
			if (i3 == 9) {dijici = "第"+(i3+1)+"次：";}
			if (data.DrinkResult[i3].lCounts == 0) {
				miaoshu_str = miaoshu_str + dijici+"很遗憾，您没有把"+ren_str+"灌醉。\n\n";
			}else {
				switch (data.DrinkResult[i3].wRewardID) {
				case 0:
					miaoshu_str = miaoshu_str + dijici+ren_str+"喝醉了。您获得了"+data.DrinkResult[i3].lCounts.toString()+data.DrinkResult[i3].szItemName+"\n\n";
					break;
				case 1:
					miaoshu_str = miaoshu_str + dijici+ren_str+"喝醉了。您获得了"+data.DrinkResult[i3].lCounts.toString()+data.DrinkResult[i3].szItemName+"\n\n";
					break;
				default:
					miaoshu_str = miaoshu_str + dijici+ren_str+"喝醉了。您获得了"+data.DrinkResult[i3].szItemName+"\n\n";
				break;
				};
			};
		};
		if (this._hangshu>3) {
			var V_num = 14*(this._hangshu-3);
			cc.log("YYYYYYYYYYYYYY",V_num);
			this._scrollView.scrollToPercentVertical(V_num, 0.2, true);
		}
		this._miaoshu.setString(miaoshu_str);
		this._hangshu++;
	},
	onEnter:function(){

		this._super();
		var listener1 = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				return true;
			},
			onTouchMoved: function (touch, event) {
			},
			onTouchEnded: function (touch, event) {
				cc.log("DuiJiuResult onTouchesEnded.. ");
			}
		});		

		cc.eventManager.addListener(listener1, this);
	},
	

});

DuiJiuResult.create = function(Data){
	return new DuiJiuResult(Data);
	if (cc.pool.hasObject(DuiJiuResult)) {
		return cc.pool.getFromPool(DuiJiuResult,Data);	
	}else{
		return new DuiJiuResult(Data);
	};
};
*/

/**
 * 实现把节点贴图变为灰度图，并且把灰度图转换回来。
 * 不过有个问题就是他们的坐标会变动。
 * 
GraySprite = {
		ccPositionTextureColor_noMVP_vert : "attribute vec4 a_position; \n"
			+ "attribute vec2 a_texCoord; \n"
			+ "attribute vec4 a_color;  \n"
			+ "varying lowp vec4 v_fragmentColor; \n"
			+ "varying mediump vec2 v_texCoord; \n"
			+ "void main() \n"
			+ "{ \n"
			//+ "    gl_Position = CC_MVPMatrix * a_position;  \n"
			+ "    gl_Position = CC_PMatrix * a_position;  \n"
			+ "    v_fragmentColor = a_color; \n"
			+ "    v_texCoord = a_texCoord; \n"
			+ "}",
		pszFragSource :
				"#ifdef GL_ES \n \
				precision mediump float; \n \
				#endif \n \
				uniform sampler2D u_texture; \n \
				varying vec2 v_texCoord; \n \
				varying vec4 v_fragmentColor; \n \
				void main(void) \n \
				{ \n \
				// Convert to greyscale using NTSC weightings \n \
				vec4 col = texture2D(u_texture, v_texCoord); \n \
				float grey = dot(col.rgb, vec3(0.299, 0.587, 0.114)); \n \
				gl_FragColor = vec4(grey, grey, grey, col.a); \n \
				}",

		setGray : function(sp)
{
	do
	{
		var pProgram = new cc.GLProgram();
		pProgram.initWithString(GraySprite.ccPositionTextureColor_noMVP_vert, GraySprite.pszFragSource);
		sp.setShaderProgram(pProgram);
//		// CHECK_GL_ERROR_DEBUG();
//
		pProgram.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
		pProgram.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
		pProgram.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
//		//CHECK_GL_ERROR_DEBUG();
//
		pProgram.link();
//		//CHECK_GL_ERROR_DEBUG();
//
		pProgram.updateUniforms();
//		//CHECK_GL_ERROR_DEBUG();
	} while (0);
},
removeGray : function(sp)
{
	do
	{
		var pProgram = cc.shaderCache.getProgram("ShaderPositionTextureColor");
		sp.setShaderProgram(pProgram);
		pProgram.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
		pProgram.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
		pProgram.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);

		pProgram.link();

		pProgram.updateUniforms();
	} while (0);
}
}
*/
