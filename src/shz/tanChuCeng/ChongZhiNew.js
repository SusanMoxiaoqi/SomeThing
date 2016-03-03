/**
 * Created by baiyi on 15/12/17.
 */

var ChongZhiNew = {
    _btn_zidongshouzhang : null,
    _PayData : [//jiaobiao 0 : 没有脚标,1 : 热销,2 : 超值,picture : 作为显示元宝大小的依据(0 ~ 9,数字越大达标元宝越大)
        {jine : 100,  jinbi : 1250000, fanli : 25,jiaobiao : 1,picture : 5},
        {jine : 5,    jinbi : 50000,   fanli : 0, jiaobiao : 0,picture : 0},
        {jine : 10,   jinbi : 10000,   fanli : 0, jiaobiao : 0,picture : 1},
        {jine : 20,   jinbi : 220000,  fanli : 10,jiaobiao : 0,picture : 2},
        {jine : 30,   jinbi : 340000,  fanli : 15,jiaobiao : 0,picture : 3},
        {jine : 50,   jinbi : 600000,  fanli : 20,jiaobiao : 0,picture : 4},
        {jine : 300,  jinbi : 3900000, fanli : 30,jiaobiao : 2,picture : 6},
        {jine : 500,  jinbi : 6750000, fanli : 35,jiaobiao : 2,picture : 7},
        {jine : 1000, jinbi : 13800000,fanli : 38,jiaobiao : 2,picture : 8}
    ],
    _picArray : ["yb_1.png","yb_2.png","yb_3.png","yb_4.png","yb_5.png","yb_6.png","yb_7.png","yb_8.png","yb_9.png"],
    _payRectArr : [],//充值节点在scrollview的区域数组
    _vipRectArr : [],//vip节点在scrollview的区域数组
    _beginPos : null,
    _gamepay : null,
    _VipTeQuan : null,
    _btn_gamePay : null,
    _btn_vipTequan : null,
    _isPayVisible : true,
    _oncePay : null,
    _jindu : null,
    _vipNow : null,
    _vipNext : null,
    _isFront : false,
    _firstPay : false,
    _payScrollView : null,
    _vipScrollView : null,
    /**
     * 创建充值层,
     * parent : 充值层的父节点,一般传入当前场景.
     * type : 判断显示的界面,0 : 游戏充值,1 : VIP特权.默认为游戏充值.
     * */
    creatChongZhiLayer : function(parent,type){
        var size = cc.winSize;
        this._isFront = true;
        var rootChongZhi = ccs.load("res/shz/TanChuCeng/ChongZhiLayer.json").node;
        var rootNode = new cc.Node();
        rootNode.addChild(rootChongZhi, 0, 1);
        var zhezhao = TestPushBox.create(rootNode);
        cc.director.getRunningScene().addChild(zhezhao,100,110);
        var fanhui = rootChongZhi.getChildByName("cz_btn_fanhui");
        fanhui.addClickEventListener(function(){
        	ChongZhiNew._isFront = false;
            cc.pool.putInPool(zhezhao);
            var numberAry =["res/shz/TanChuCeng/tanChuCengRes/chongZhi"
                            ,"res/shz/TanChuCeng/tanChuCengRes/chongzhiVIP"];
            removeResources(numberAry);
        });
        this.addGamePay(rootChongZhi);
        this.addVipTeQuan(rootChongZhi);

        var btn_gamePay = rootChongZhi.getChildByName("cz_btn_chongzhi");
        this._btn_gamePay = btn_gamePay;
        var btn_vipTequan  = rootChongZhi.getChildByName("cz_btn_vipTeQuan");
        this._btn_vipTequan = btn_vipTequan;
        btn_gamePay.addClickEventListener(function() {//游戏充值
        	ChongZhiNew.setIsVisbilePayNode(true, false);
        });

        btn_vipTequan.addClickEventListener(function() {//vip特权
        	ChongZhiNew.setIsVisbilePayNode(false, true);
        });
        
        switch (type) {
        case 0:
        	this.setIsVisbilePayNode(true, false);
        	this.creatFirstPayLayer(rootNode,rootChongZhi,zhezhao);
        	break;
        case 1:
        	this.setIsVisbilePayNode(false, true);
        	break;
        default:
        	this.setIsVisbilePayNode(true, false);
        this.creatFirstPayLayer(rootNode,rootChongZhi,zhezhao);
        break;
        };
        var touchNode = new cc.Node();
		rootChongZhi.addChild(touchNode, 20, 20);
		rootChongZhi.scheduleOnce(function() {
        	var TouchListener = cc.EventListener.create({  
        		swallowTouches: false,  
        		event: cc.EventListener.TOUCH_ONE_BY_ONE,  
        		onTouchBegan:ChongZhiNew._onTouchBegan,  
        		onTouchMoved:ChongZhiNew._onTouchMoved,  
        		onTouchEnded:ChongZhiNew._onTouchEnded  
        	});  
        	cc.eventManager.addListener(TouchListener, touchNode);
		}, 0.2);
    },
    
    setIsVisbilePayNode : function(isVisiblePay,isVisibleVip) {
    	this._isPayVisible = isVisiblePay;
    	this._gamepay.setVisible(isVisiblePay);
    	this._btn_gamePay.setTouchEnabled(!isVisiblePay);
    	this._btn_gamePay.setBright(!isVisiblePay);

    	this._VipTeQuan.setVisible(isVisibleVip);
    	this._btn_vipTequan.setTouchEnabled(!isVisibleVip);
    	this._btn_vipTequan.setBright(!isVisibleVip);
    },
    /**
     * 创建首冲提示界面
     * */
    creatFirstPayLayer : function(parent,chongzhiNode,zhezhao) {
		if (this._firstPay == false) {
			return;
		}else{
			chongzhiNode.setVisible(false);
			var size = cc.winSize;
			cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/shouChong.plist");
			cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/GongYong.plist");
			var shouchongSpr = new cc.Sprite("#shouChongbg.png");
			shouchongSpr.setPosition(size.width/2,size.height/2);
			parent.addChild(shouchongSpr,1,2);
			
			var shouChong_btn =new ccui.Button("btn_ljcz01.png","btn_ljcz02.png","btn_ljcz03.png",ccui.Widget.PLIST_TEXTURE);
			shouChong_btn.x = shouchongSpr.width/2;
			shouChong_btn.y = shouchongSpr.height/2-130;
			shouChong_btn.addClickEventListener(function() {
				chongzhiNode.setVisible(true);
				shouchongSpr.removeFromParent(true);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/meirifenxiang"];
				removeResources(numberAry);
			});
			shouchongSpr.addChild(shouChong_btn, 10, 10);
			
			var chaHao = new ccui.Button("guanbi1.png","guanbi2.png","guanbi3.png",ccui.Widget.PLIST_TEXTURE);
			chaHao.x = shouchongSpr.width-70;
			chaHao.y = shouchongSpr.height-30;
			chaHao.addClickEventListener(function() {
				cc.pool.putInPool(zhezhao);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/meirifenxiang"
				                ,"res/shz/TanChuCeng/tanChuCengRes/chongZhi"
				                ,"res/shz/TanChuCeng/tanChuCengRes/chongzhiVIP"];
				removeResources(numberAry);
			});
			shouchongSpr.addChild(chaHao, 10,11);
		};
	},

    /**
     * 处理从服务器得到的充值数据的配置
     * */
    getPayData : function(payData) {
    	payData.RechargeItem.forEach(function(eleData,index) {
    		if (ChongZhiNew._PayData[index] == undefined) {
    			var pay_ele =  {jine : 0,    jinbi : 0,   fanli : 0, jiaobiao : 0,picture : 0};
    			ChongZhiNew._PayData.push(pay_ele);
			};
			ChongZhiNew._PayData[index].jine = eleData.dwMoney;
			ChongZhiNew._PayData[index].jinbi = eleData.dwScore;
    			ChongZhiNew._PayData[index].fanli = eleData.dwReturn;
    			ChongZhiNew._PayData[index].jiaobiao = eleData.wType;
    			ChongZhiNew._PayData[index].picture = eleData.wPicID;
		});
    	var arr_length = ChongZhiNew._PayData.length;
    	for (var int = 0; int < arr_length; int++) {
    		var ele_data = ChongZhiNew._PayData[int];
    		if (ele_data.jine == 0) {
    			ChongZhiNew._PayData.splice(int, arr_length-int);
    			break;
			};
		};
	},
	/**触摸事件*/
    _onTouchBegan : function(touch,event) {
    	var target = event.getCurrentTarget();
    	var TAG = target.getTag();
    	ChongZhiNew._beginPos = touch.getLocation();
    	return true;
	},
	_onTouchMoved : function(touch,event) {

	},
	_onTouchEnded : function(touch,event) {
		var target = event.getCurrentTarget();
		var TAG = target.getTag();
		var posLoc = touch.getLocation();
		if (cc.pDistance(ChongZhiNew._beginPos, posLoc)>10) {
			return;
		};
		if (ChongZhiNew._isPayVisible) {//触摸在充值的scrollview上。
			var pos1 = 	ChongZhiNew._payScrollView.convertTouchToNodeSpace(touch);//触摸点在当前节点的位置
			var pos2 =  ChongZhiNew._payScrollView.getInnerContainer().getPosition();//scrollview的偏移量
			var pos = cc.pSub(pos1, pos2);//触摸点在节点布局上的位置
			for (var int = 0; int < ChongZhiNew._payRectArr.length; int++) {
				eleRect = ChongZhiNew._payRectArr[int];
				if (cc.rectContainsPoint(eleRect, pos)) {
					ChongZhiNew.callPay(ChongZhiNew._PayData[int].jine);
					break;
				};
			};
		} else{//触摸在vip特权的scrollview上
			var pos1 = 	ChongZhiNew._vipScrollView.convertTouchToNodeSpace(touch);//触摸点在当前节点的位置
			var pos2 =  ChongZhiNew._vipScrollView.getInnerContainer().getPosition();//scrollview的偏移量
			var pos = cc.pSub(pos1, pos2);//触摸点在节点布局上的位置
			for (var int = 0; int < ChongZhiNew._vipRectArr.length; int++) {
				eleRect = ChongZhiNew._vipRectArr[int];
				if (cc.rectContainsPoint(eleRect, pos)) {
					ChongZhiNew.setIsVisbilePayNode(true, false);
					break;
				};
			};
		}		
	},
	/**
	 * 创建游戏充值时的界面
	 * */
    addGamePay : function(parent){
        var size = cc.winSize;
        var gamePay = ccs.load("res/shz/TanChuCeng/GamePay.json").node;
        this._gamepay = gamePay;
        gamePay.x = cc.winSize.width/2;
        gamePay.y = cc.winSize.height/2;
        parent.addChild(gamePay,1,1);

		var yinLiang1 = gamePay.getChildByName("cz_fnt_yinliang");
		var yinLiang_pos = yinLiang1.getPosition();
		var yinLiang = cc.LabelBMFont(Producer.changeNumberToString(USER_lUserScore), "res/shz/TanChuCeng/tanChuCengRes/chongzhi_number.fnt");
		yinLiang.setPosition(yinLiang_pos);
		gamePay.addChild(yinLiang,1,4);
		
		var jiangquan1 =  gamePay.getChildByName("cz_fnt_jiangquan");
		var jiangquan_pos = jiangquan1.getPosition();
		var jiangquan = cc.LabelBMFont(Producer.changeNumberToString(USER_lLottery), "res/shz/TanChuCeng/tanChuCengRes/chongzhi_number.fnt");
		jiangquan.setPosition(jiangquan_pos);
		gamePay.addChild(jiangquan,1,5);
		
		this.addGamePayScrollview(gamePay);
    },
    /**
     * 创建充值界面的scrollview
     * */
    addGamePayScrollview : function(parent) {
    	var size = cc.winSize;
    	var scrollView = new ccui.ScrollView();
    	this._payScrollView = scrollView;
    	scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
    	scrollView.setTouchEnabled(true);
    	scrollView.setBounceEnabled(true);
    	scrollView.setContentSize(cc.size(size.width, 352));
    	var scrollViewSize = scrollView.getContentSize();
    	var bianJu = 30;
    	scrollView.x = -(size.width/2);
    	scrollView.y = -160;
    	parent.addChild(scrollView,0,10);

    	var payNodeNumber = this._PayData.length;
    	var payNodeWidth;
    	for (var int = 0; int < payNodeNumber; int++) {
    		var payData_ele = this._PayData[int];
    		var payNode = ccs.load("res/shz/TanChuCeng/GamePayNode.json").node;
    		var beijing = payNode.getChildByName("paynode_beijing");
    		scrollView.addChild(payNode, 1, 1);
    		payNodeWidth =  beijing.getContentSize().width;
    		payNodeHeight = beijing.getContentSize().height;
    		var payNodePosX = (bianJu+payNodeWidth/2) * (1+2*int);
    		var payNodePosY = scrollViewSize.height/2;
    		payNode.x =  payNodePosX;
    		payNode.y = payNodePosY;
    		var rect = cc.rect(payNodePosX-payNodeWidth/2, payNodePosY-payNodeHeight/2, payNodeWidth, payNodeHeight);
    		this._payRectArr[int] = rect;
    		var jiaobiao = payNode.getChildByName("paynode_jiaobiao");
    		switch (payData_ele.jiaobiao) {
    		case 0:
    			jiaobiao.setVisible(false);
    			break;
    		case 1:
    			jiaobiao.setVisible(true);
    			jiaobiao.setSpriteFrame("biaoqian_rexiao.png");
    			break;
    		case 2:
    			jiaobiao.setVisible(true);
    			jiaobiao.setSpriteFrame("biaoqian_chaozhi.png");
    			break;
    		default:
    			break;
    		};

    		var jine1 = payNode.getChildByName("paynode_jine");
    		var jine_pos = jine1.getPosition();
    		var jine =new cc.LabelBMFont("￥"+payData_ele.jine.toString(), "res/shz/TanChuCeng/tanChuCengRes/number_1.fnt");
    		jine.setPosition(jine_pos);
    		payNode.addChild(jine,1,1);

    		var fanli1 = payNode.getChildByName("paynode_fanli");
    		if(payData_ele.fanli == 0){
    			var song =  payNode.getChildByName("song_3");
    			song.setVisible(false);
    		}else{
    			var fanli_pos = fanli1.getPosition();
    			var fanli = cc.LabelBMFont(payData_ele.fanli.toString()+"%","res/shz/TanChuCeng/tanChuCengRes/send_number.fnt");
    			fanli.setPosition(fanli_pos);
    			payNode.addChild(fanli,1,2);
    		}

    		var jinbi1 = payNode.getChildByName("paynode_yinliang");
    		var jinbi_pos = jinbi1.getPosition();
    		var jinbi = cc.LabelBMFont(	Producer.changeNumberToString(payData_ele.jinbi), "res/shz/TanChuCeng/tanChuCengRes/number_2.fnt");
    		jinbi.setPosition(jinbi_pos);
    		payNode.addChild(jinbi,1,3);

    		var yuanbao = payNode.getChildByName("paynode_yuanbao");
    		yuanbao.setSpriteFrame(this._picArray[payData_ele.picture]);
    	};
    	cc.log("<<<<<<<<<<<<<<<<<<",(bianJu+payNodeWidth/2)*2*payNodeNumber);
    	scrollView.setInnerContainerSize(cc.size((bianJu+payNodeWidth/2)*2*payNodeNumber, scrollViewSize.height));
	},
    /**
     * 创建vip特权界面
     * */
    addVipTeQuan : function(parent){
        var VipTeQuan = ccs.load("res/shz/TanChuCeng/VipTeQuan.json").node;
        this._VipTeQuan = VipTeQuan;
        VipTeQuan.x = cc.winSize.width/2;
        VipTeQuan.y = cc.winSize.height/2;
        parent.addChild(VipTeQuan,1,2);
        this.addVipTeQuanScrollview(VipTeQuan);
        
        var zaichongzhi1 = VipTeQuan.getChildByName("cz_fnt_zaichongzhi");
        var oncePay_pos = zaichongzhi1.getPosition();
        var oncePay = cc.LabelBMFont("10", "res/shz/TanChuCeng/tanChuCengRes/chongzhi_number.fnt");
        oncePay.setPosition(oncePay_pos);
        VipTeQuan.addChild(oncePay);
        this._oncePay = oncePay;
        this._jindu = VipTeQuan.getChildByName("cz_jindu");
        this._vipNow = VipTeQuan.getChildByName("cz_sp_vipNow");
        this._vipNext = VipTeQuan.getChildByName("cz_sp_vipNext");
        this.nengliangtiaoSet();
        this.sprite_vip_Set();
    },
    /**
     * 创建vip特权界面的scrollview
     * */
    addVipTeQuanScrollview : function(parent) {
    	var size = cc.winSize;
    	var scrollView_vip = new ccui.ScrollView();
    	this._vipScrollView = scrollView_vip;
    	scrollView_vip.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
    	scrollView_vip.setTouchEnabled(true);
    	scrollView_vip.setBounceEnabled(true);
    	scrollView_vip.setContentSize(cc.size(size.width, 400));
    	var scrollViewSize_vip = scrollView_vip.getContentSize();
    	var bianJu = 30;
    	scrollView_vip.x = -(size.width/2);
    	scrollView_vip.y = -280;
    	parent.addChild(scrollView_vip,0,11);

    	var vipNodeNumber = shengJiVip.length-1;//因为shengJiVip数组中第一个元素是vip0；
    	for (var int = 0; int < vipNodeNumber; int++) {
    		var sprStr = "#" + "chongzhi_vip"+(int + 1)+".png"
    		var vipNode = new cc.Sprite(sprStr);
    		scrollView_vip.addChild(vipNode, 1, 1);
    		vipNodeWidth =  vipNode.getContentSize().width;
    		vipNodeHeight = vipNode.getContentSize().height;
    		var vipNodePosX = (bianJu+vipNodeWidth/2) * (1+2*int);
    		var vipNodePosY = scrollViewSize_vip.height - vipNodeHeight/2;
    		vipNode.x =  vipNodePosX;
    		vipNode.y = vipNodePosY;
    		var rect = cc.rect(vipNodePosX-vipNodeWidth/2, vipNodePosY-vipNodeHeight/2, vipNodeWidth, vipNodeHeight);
    		this._vipRectArr[int] = rect;

    		var leiji_str = "累计充值" + shengJiVip[int+1] +"元";
    		var leiji_label = cc.LabelBMFont(leiji_str, "res/shz/TanChuCeng/tanChuCengRes/chongzhi_number.fnt");
    		scrollView_vip.addChild(leiji_label, 1, 2);
    		leiji_label.x = vipNodePosX;
    		leiji_label.y = leiji_label.getContentSize().height/2;
    	};
    	scrollView_vip.setInnerContainerSize(cc.size((bianJu+vipNodeWidth/2)*2*vipNodeNumber, scrollViewSize_vip.height));
	},
	/**
	 * 判断再充值多少元，即可享有
	 * */
	nengliangtiaoSet:function(){
		if (this._isFront == false) return;
		var num = 0;  
		var chaNum = 0;
		this._jindu.setVisible(true);
		if (0<USER_wMemOrder && USER_wMemOrder<8) {
			var num1 = USER_dwExperience -  shengJiVip[USER_wMemOrder] ;//数组shengJiVip下标为0时对应vip1
			if(num1 == 0){
				this._jindu.setVisible(false);
			}
			var num2 = shengJiVip[USER_wMemOrder+1] - shengJiVip[USER_wMemOrder];
			chaNum = shengJiVip[USER_wMemOrder+1] - USER_dwExperience;
			num = num1/num2;
		}else if (USER_wMemOrder == 0) {
			if(USER_dwExperience == 0){
				this._jindu.setVisible(false);
			}
			num =  USER_dwExperience/shengJiVip[1];
			chaNum = shengJiVip[1] - USER_dwExperience;
		}else if (USER_wMemOrder == 8) {
			chaNum = 0;
			num = 1;
		}
		this._jindu.setContentSize(cc.size(406*num, 30));

		var tishi_str = "再充值 " + chaNum + " 元, 即可享有";
		this._oncePay.setString(tishi_str);
	},
	sprite_vip_Set:function(){
		if (this._isFront == false) return;
		var vipNum = ["chongzhi_vip-1.png","chongzhi_vip-1.png","chongzhi_vip-2.png","chongzhi_vip-3.png","chongzhi_vip-4.png","chongzhi_vip-5.png","chongzhi_vip-6.png","chongzhi_vip-7.png","chongzhi_vip-8.png","chongzhi_vip-8.png"];
		if(this._vipNow){
			this._vipNow.setSpriteFrame(vipNum[USER_wMemOrder]);
			if (USER_wMemOrder == 0) {
				this._vipNow.setVisible(false);
			}
		}
		if(this._vipNext){
			this._vipNext.setSpriteFrame(vipNum[USER_wMemOrder+1]);
			if (USER_wMemOrder == 8) {
				this._vipNext.setVisible(false);
			}
		}
	},
    //调起支付
    callPay : function(price) {
    	if (SDKHelper.thirdSdkPay){
    		SDKHelper.thirdPay(price,"金币","普通充值","0","0","0");
    	}else {
    		if(cc.sys.os == cc.sys.OS_ANDROID){
    			if (!slocal.getItem("ORIGINAL_VERSION")) {
    				jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView",
    						"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "普通充值", price.toString(), USER_dwUserID.toString() ,"activitytype=0&rowid=0&channelname=SHZ","0" );
    			}else {
    				if (QUDAOHAO == QUDAOBIAOSHI.yyhshz_apk) {
    					jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView",
    							"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "普通充值", price.toString(), USER_dwUserID.toString() ,"activitytype=0&rowid=0&channelname=SHZ","1,3,4,5,6" );
    				}else {
    					jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showPayView",
    							"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "普通充值", price.toString(), USER_dwUserID.toString() ,"activitytype=0&rowid=0&channelname=SHZ","1,2,3,4,5,6" );
    				}
    			}
    		}
    		if(cc.sys.os == cc.sys.OS_IOS){
    			jsb.reflection.callStaticMethod( "purchasesdk", "pay:price:userid:payTypeString:otherOrderParams:","普通充值", price, USER_dwUserID.toString(),"1,2,3,4,6,5","activitytype=0&rowid=0&channelname=SHZ" );//  activitytype:meir:1,xianshi:2,putong:0, rowid:putong:0,  channelname:SHZ
    		}
    	}

    }

}