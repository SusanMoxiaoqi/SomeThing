
var brc = brc || {};
brc.cleanArray = [];
brc.laBaArray = [];
brc.cleanArray.push(brc.laBaArray);
brc.jiShuYouWuXingHao = 0;
brc.btnTag = 0;
brc.isLianTongFuWu = false;
brc.isChongLian = false;
brc.btnDianJI = function(button ,call ,self) {
	button.addTouchEventListener(function(send,type) {
		switch (type) {
		case ccui.Widget.TOUCH_BEGAN:
			if (!brc.btnTag) {
				brc.btnTag = send.getTag();
			}
		case ccui.Widget.TOUCH_MOVED:
			break;
		case ccui.Widget.TOUCH_ENDED:
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			var touchEndTag	= send.getTag();
			if (touchEndTag == brc.btnTag) {
				switch (send.getTag()) {
				case brc.btnTag:
					call(self);
					break;
				default:
					break;
				}
			}
			brc.btnTag = 0;
			break;
		default:
			break;
		}},this);
}
brc.yaoYiYao = function(){
	cc.log("#################----------brc.yaoYiYao");
	brc.biBieController.self._paterLayer._yaoYaoBtn.setBright(false);
	gameSever.sendMessage(brc.SUB_S_GAME,brc.SUB_C_SHAKE_DICE,BRCBIBEI);//用户摇骰子
	if(cc.sys.os == cc.sys.OS_ANDROID){
		jsb.reflection.callStaticMethod( "org/cocos2dx/javascript/AppActivity", "shangZhuangYaoYao","(Ljava/lang/String;)V", "NO");
	}
}
brc.shuZuChaZhao = function(type , array ,number){
	switch (type) {
	case 1:
		for ( var key in array) {//找wChairID相同的数据
			if(array[key] && number != null){
				if(array[key].wChairID == number){
					return array[key];
				}
			}else{
				cc.log("数据处理异常",type,array[key],number)
			}
		}
		break;
	case 2:
		for ( var key in array) {//找dwUserID相同的数据
			if(array[key] && number != null){
				if(array[key].dwUserID == number){
					return array[key];
				}
			}else{
				cc.log("数据处理异常",type,array[key],number)
			}
		}
		break;
	case 3:
		for ( var key in array) {//删除wChairID相同的数据
			if(array[key] && number != null){
				if(array[key].wChairID == number){
					array.splice(key,1);
				}
			}else{
				cc.log("数据处理异常",type,array[key],number)
			}
		}
		break;
	case 4:
		for ( var key in array) {//删除dwUserID相同的数据
			if(array[key] && number != null){
				if(array[key].dwUserID == number){
					array.splice(key,1);
				}
			}else{
				cc.log("数据处理异常",type,array[key],number)
			}
		}
		break;
	case 5://数组剔除数组（wChairID）
		for ( var key in array) {
			for ( var keyTow in number != null) {
				if(number[keyTow] && array[key]){
					if(number[keyTow].wChairID  == array[key].wChairID ){
						array.splice(key, 1);
					}
				}else{
					cc.log("数据处理异常",type,number[keyTow],array[key])
				}
			}
		}
		break;
	case 6://数组剔除数组（dwUserID）
		for ( var key in array) {
			for ( var keyTow in number != null) {
				if(number[keyTow]  && array[key]){
					if(number[keyTow].dwUserID  == array[key].dwUserID ){
						array.splice(key, 1);
					}
				}else{
					cc.log("数据处理异常",type,number[keyTow],array[key])
				}
			}
		}
		break;

	default:
		break;
	}
	return false;
	
}
brc.duanXianChongLian = function(){
	var self = brc.biBieController.self;
	AutomaticLink.startUpAutomaticLink(gameSever,10,2011);
	self.unschedule(self.jiShiDuanXian);
	brc.isChongLian = true;
}
brc.chingLian = function(){
	var type = 0;
	//得到网络环境
	if (sys.os == sys.OS_IOS) {
		type = jsb.reflection.callStaticMethod("netWork", "getCurrentNetworkStatus");
	}else if(sys.os == sys.OS_ANDROID){
		type = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getNetworkIsWifi", "()I");
	};
	if (type == 0) {
		if (!waitQuan.xianShi) {
			waitQuan.reuse(1.0);
			cc.director.getRunningScene().addChild(waitQuan,1000);
		}
		return;
	}else{
		if (!waitQuan.xianShi) {
			waitQuan.reuse(30.0);
			cc.director.getRunningScene().addChild(waitQuan,1000);
		}
		var self = brc.biBieController.self;
		self.chongZhiJieMian();
		for ( var key in self._paterLayer._zuoWeiArray) {
			self._paterLayer._biaoqingBool = false;
			self._isShangZuo = false;
			self._paterLayer._zuoWeiArray[key]._isYouRen = false;
			self._paterLayer._zuoWeiArray[key].setTuPian(false);
			self._paterLayer._zuoWeiArray[key].setBtnType();
		}
		if(brc.biBieController.self._isZhuangJia){
			brc.biBieController.self._isZhuangJia = false;
			self._paterLayer.setShangZhuangBtn("BR_yaoShangZhuang2.png","BR_yaoShangZhuang.png",self._paterLayer._shangZhuang_btn);
		}
		brc.Object.youZiTuiChuQingKongShuJu();
		cc.pool.drainAllPools();
		SocketManager.getGameServer(BRCBIBEI);
	}
}
brc.tuiChuScene = function(type){
	var self = brc.biBieController.self;
	self.chongZhiJieMian();
	for ( var key in brc.cleanArray) {
		brc.cleanArray[key].splice(0, brc.cleanArray[key].length);
	}
	brc.cleanArray.splice(0, brc.cleanArray.length);
	cc.pool.drainAllPools();
	SocketManager.closeServer(true, false);
	brc.biBieController.self = null;
	if(type){
		if (self) {
			cc.spriteFrameCache.removeSpriteFrames();
			cc.textureCache.removeAllTextures();
		}
	}
}
brc.arrayClean = function(array){
	for (var i = 0; i < array.length; i++) {
		var array_element = array[i];
		if(array_element){
			array_element.splice(0, array_element.length);
		}
		
	}
}
brc.BetArea = {
	ID_BIG_AREA : 0,			//大
	ID_DRAW_AREA : 1,				//和
	ID_SMALL_AREA: 2,				//小
	ID_1_PAIR_AREA: 3,		//1对
	ID_2_PAIR_AREA: 4,			//2对
	ID_3_PAIR_AREA: 5,
	ID_4_PAIR_AREA: 6,
	ID_5_PAIR_AREA: 7,
	ID_6_PAIR_AREA: 8,			//6对
	BET_AREA_COUNTS : 9,
};
brc.burstAwardYaoYiYao = function(){//爆奖的摇一摇
	cc.log("###$#$#$#$#$#$#$#brc.burstAwardYaoYiYao");
	brc.biBieController.self._paterLayer._baoJiangLayer.setGoldBoxShak();
}