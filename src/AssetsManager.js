var __failCount = 0;//失败后尝试的次数
var slocal = cc.sys.localStorage;
var sheBeiUid = slocal.getItem("JIQIMA");//把用户的机器码存到本地
var MachineID = "";

/**ID：1000058   账号：gwshz_apk   名称：官网安卓  
ID：1000059   账号：gwshz_qiye  名称：官网企业  
ID：1000060   账号：bdshz_apk   名称：百度竞价安卓  
ID：1000061   账号：bdshz_qiye  名称：百度竞价企业
ID：1000063   账号：gwfxshz_apk    名称：FX安卓 
ID：1000064   账号：gwfxshz_qiye  名称：FX企业
ID：1000375    mtshz_apk    中文：媒体安卓
ID：1000376    mtshz_qiye   中文：媒体企业
ID：1000975    appstore    中文：苹果商店
ID: 1001201    yyhshz_apk   中文：应用汇
ID: 1002636      bd02shz_apk 中文： 百度竞价02安卓
ID: 1002637      bd02shz_qiye 中文：百度竞价02企业
ID：1003689     bdgw01shz_apk       百度竞价003安卓 
ID：1003690     bdgw01shz_qiye      百度竞价003苹果
ID：1003124     csshz_apk                无支付渠道测试包 
ID：1003126     csshz_qiye               无支付渠道测试苹果包
渠道ID： 1005305  渠道名：dwshz_apk 	shz_bydw_android
渠道ID：1005709   渠道名：nfxshz_apk   shz_bynfx_android
渠道ID：1008832   渠道名: dangleshz_apk   当乐
渠道ID：1004118   渠道号：xyshz_qiye    渠道名称：XY助手企业 
渠道ID：1005364   渠道名：i4shz_qiye     渠道：爱思助手 
渠道ID： 1009362  渠道名：ytwl_apk    shz_byytwl_android
渠道ID： 1013858  渠道名：dlshzcps_qiye  账户：当乐cps越狱包 
渠道ID： 1056962  账号：PC6CPSshz_apk   账户：PC6cps安卓包 
*/
/**
 * 自1.0.2.0版本以后(不包含1.0.2.0)，添加水浒传配置文件
 * */
var CONFIG = cc.loader.getRes("res/shz_Config.json");
var QUDAOHAO = CONFIG.channelNumber;

QUDAOBIAOSHI = {
		gwshz_apk : "1000058",
		gwshz_qiye : "1000059",
		bdshz_apk : "1000060",
		bdshz_qiye : "1000061",
		gwfxshz_apk : "1000063",
		gwfxshz_qiye : "1000064",
		mtshz_apk:"1000375",
		mtshz_qiye:"1000376",
		appstore:"1000975",
		yyhshz_apk :"1001201",
		bd02shz_qiye:"1002637",
		bd02shz_apk:"1002636",
		bdgw01shz_apk : "1003689",
		bdgw01shz_qiye : "1003690",
		csshz_apk : "1003124",
		csshz_qiye : "1003126",
		dwshz_apk:"1005305",
		nfxshz_apk:"1005709",
		dangleshz_apk : "1008832",
		xyshz_qiye : "1004118",
		i4shz_qiye : "1005364",
		ytwl_apk:"1009362",
		dlshzcps_qiye:"1013858",
		PC6CPSshz_apk : "1056962"
};

var GAMEURL = "ws://agentphone.baiyishuihu.com:6515/game";
var LOGINURL = "ws://agentphone.baiyishuihu.com:6515/login";
var serverList = [];//从网站得到的服务器列表
var serVerIp = null;//当前正在连接的服务器
var beiYongSer =  "agentphone.baiyishuihu.com";
var isShowAppStoreBtn = 1;
var AssetsManagerLoaderScene = cc.Scene.extend({
	
	_jinduParticle : null,
	_jindu : null,
	_jinduZhi : 0,
	_tishiyu : null,
	_sourcedata : null,
	_zongJinDu : 0,
	_shiwen : [
	           ["shi1-1.png","shi1-2.png","shi1-3.png","shi1-4.png","yinzhang.png"],
	           ["shi2-1.png","shi2-2.png","shi2-3.png","shi2-4.png","yinzhang.png"],
	           ["shi3-1.png","shi3-2.png","shi3-3.png","shi3-4.png","yinzhang.png"],
	           ["shi4-1.png","shi4-2.png","shi4-3.png","shi4-4.png","yinzhang.png"],
	           ],
	_stencils : [],
	_stenXia : 0,
	_luoYe : null,
	_succ : false,//控制从网站得到服务器列表是否成功
	           
	_am:null,
	_percent:0,
	_percentByFile:0,
	_layer :null,
	_self:null,
	_updateData:0.0,//要更新资源的大小
	_tishiUpdate : true,
	_startUpdate:false,//是否要更新
	_getUpdateDataTime:0,
	_updateType:0,
	_pgupdateType:0,
	_isWifiNet :false,//判断当前网络是否是wifi
	_newVersion:"0.0",//从服务器获取的最新版本
	_downloadUrl:null,//更新包的地址
	_pgVersion:cc.sys.localStorage.getItem("PG_VERSION"),
	_pgdatasize:0,
	run:function(){
		if (!cc.sys.isNative) {
			this.loadGame();
			return;
		}
		_self = this;
//		//初始化更新界面
		_self.initScene();
		//检测网络连接
		_self.checkNetwork();
		_self.getJIqiMa();
	},
	//初始化检测更新界面
	initScene : function() {
		cc.spriteFrameCache.addSpriteFrames("res/shz/load/regengxin_tishiyu.plist","res/shz/load/regengxin_tishiyu.png");
		var rootNode = ccs.load("res/shz/load/MainScene.json").node;
		_self.addChild(rootNode);
		_self._jinduParticle = rootNode.getChildByName("Particle_1");
		_self._jindu = rootNode.getChildByName("jindutiao2_3");
		
		var tishi = rootNode.getChildByName("tishiyu");
		_self._tishiyu = cc.Sprite.createWithSpriteFrameName("tips2_1.png");
		_self._tishiyu.x = tishi.x;
		_self._tishiyu.y = tishi.y-10;
		rootNode.addChild(_self._tishiyu);
		//更新资源的大小
		_self._sourcedata = new cc.LabelTTF("", "Arial", 16);
		_self._sourcedata.x = tishi.x;
		_self._sourcedata.y = tishi.y - 48;
		rootNode.addChild(_self._sourcedata);

		_self.creatCaijianShiwen(rootNode);
		_self.schedule(_self.xianshiShiwen, 1.0, 4,0.1);
		_self.creatLuoyeTexiao();//创建落叶特效

		var hotvision = cc.sys.localStorage.getItem("VERSION") || CONFIG.VERSION_latterPart;
		var pgvision = CONFIG.VERSION_frontPart || cc.sys.localStorage.getItem("PG_VERSION");
		var SHZ_VERSION = cc.loader.getRes("res/shz_version.json");
		if (typeof(SHZ_VERSION) != "undefined" && SHZ_VERSION && SHZ_VERSION != null) {
			pgvision = SHZ_VERSION.VERSION_frontPart;
		};
		var version = new cc.LabelTTF("", "Arial", 22);
		version.x = cc.winSize.width-130;
		version.y = 30;
		version.setString("版本号:"+pgvision+"."+hotvision);
		rootNode.addChild(version);

		cc.director.runScene(_self);
	},
	//检查网络
	checkNetwork:function(){
		var type = 0;
		//得到网络环境
		if (sys.os == sys.OS_IOS) {
			type = jsb.reflection.callStaticMethod("netWork", "getCurrentNetworkStatus");
		}else if(sys.os == sys.OS_ANDROID){
			type = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getNetworkIsWifi", "()I");
		};
		//没有网络，
		if(type==0){
			_self.createTishiLayer("无法链接网络，请检查移动网络\n是否链接！",1);
		}else if(type == 4){
			_self._isWifiNet = true;
			//从服务器获取要更新资源的大小
			_self.getUpdateSourceData();
			//从网站获取服务器列表
			_self.getServerListFromWeb();
		}else{
			_self._isWifiNet == false;
			//从服务器获取要更新资源的大小
			_self.getUpdateSourceData();
			//从网站获取服务器列表
			_self.getServerListFromWeb();
		}
	},
	//从网站获取服务器更新资源的大小
	getUpdateSourceData : function() {
		//从网络获取服务器地址
		_self._jindu.setScaleX(0);//设置进度条的更新进度值为零
		var testHttp = cc.loader.getXMLHttpRequest();
		var updatePath_ori = CONFIG.updatePath;
		var updatePath = "http://phonegameupdate.oss-cn-hangzhou.aliyuncs.com/"+updatePath_ori+"/updateinfo.txt";
		testHttp.open("get", updatePath);
		testHttp.timeout = 7000;//设置请求超时时间
		['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {//得到各个阶段下的状态
			testHttp["on" + eventname] = function () {
				cc.log("on  eventname updateinfo",eventname);
				if (eventname == "error" || eventname == "timeout") {
					_self.loadGame();
				};
			}
		});

		testHttp.onreadystatechange = function() {
			cc.log("&&&&&&&&&&&&&&&&4",testHttp.readyState,testHttp.status);
			if (testHttp.readyState ==4 && testHttp.status == 200 ) {
				var jieshouData = testHttp.responseText;
				var data = eval("("+jieshouData+")");
				_self._updateType = parseInt(data.updateType);//更新类型
				_self._pgupdateType = parseInt(data.pgupdateType);//游戏包的更新控制
				_self._newVersion = data.version;//更新版本
				_self._pgdatasize = data.pgdatasize;//包资源的大小
				_self._downloadUrl = data.downloadUrl;//更新包地址
				_self.ininAssetsManager();//初始化更新
				if(data.packageUpdate != undefined && data.packageUpdate == 1 ){
					_self.createDownLoadTishiLayer("更新内容较多，建议重新下载游戏");
				}else{
					_self._am.checkUpdate();//检测版本更新
				}

			}else {
				_self.loadGame();
         }
		};
		testHttp.send("");
	},
	
	ininAssetsManager:function(){
		var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
		cc.log("更新资源的路径==========="+jsb.fileUtils.getWritablePath());
		_self._am = new jsb.AssetsManager("res/project.manifest", storagePath);
		_self._am.retain();
		//判断是否存在"res/project.manifest" 文件，如果不存在，就将无法更新资源文件，
		if (!_self._am.getLocalManifest().isLoaded())
		{
			cc.log("无法更新资源文件，跳过");
			_self.loadGame();
		}

		var listener = new jsb.EventListenerAssetsManager(_self._am, function(event) {
			switch (event.getEventCode()){
			case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:    // 0
				cc.log("没有发现当地清单上要更新的文件, 跳过资源更新");
				_self.loadGame();
				break;
			case jsb.EventAssetsManager.UPDATE_PROGRESSION:  // 5 
				cc.log("更新=============="+event.getPercent()+"=="+event.getPercentByFile()+"==");
				_self._percent = event.getPercent();
				_self._percentByFile = event.getPercentByFile();
				//信息
				if (event.getMessage()) {
					_self._tishiyu.setSpriteFrame("tips2_2.png");//版本更新中
				}
				//更新进度条
				if(_self._startUpdate){
					_self.updateProgress();
				}

				break;
			case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:   // 1
			case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:      // 2
				cc.log("无法下载清单上要更新的文件, 更新跳过."+event.getEventCode());
				_self.loadGame();
				break;
			case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:    // 4
				cc.log("已经更新完成,没有要更新的资源");
				_self.loadGame();
				break;
			case jsb.EventAssetsManager.UPDATE_FINISHED:       // 8
				cc.log("更新完成啦啦啦啦啦啦啦啦=============");
				cc.sys.localStorage.setItem("VERSION",_self._newVersion);
				_self._tishiyu.setSpriteFrame("tips2_4.png");//资源解压中不消耗流量
				_self._sourcedata.setString("游戏更新文件解压中，不消耗流量哦....");
				_self.loadGame();
				break;
			case jsb.EventAssetsManager.UPDATE_FAILED:    // 9
				cc.log("更新失败. " + event.getMessage());
				__failCount ++;
				if (__failCount < 5)
				{
					_self._am.downloadFailedAssets();
				}
				else
				{
					cc.log("达到最大重试次数，跳过更新");
					__failCount = 0;
					_self.createTishiLayer("版本更新失败，取消本次更新",2);
				}
				break;
			case jsb.EventAssetsManager.ERROR_UPDATING:   // 7
				cc.log("资源更新失败： " + event.getAssetId() + ", " + event.getMessage()+"==="+event.getCurle_code());
				break;
			case jsb.EventAssetsManager.ASSET_UPDATED://资产更新  6
				cc.log("=资源文件更新==========customId："+event.getAssetId());
				break;
			case jsb.EventAssetsManager.ERROR_DECOMPRESS://解压缩失败  10
				cc.log("解压缩失败！"+event.getMessage());
				_self.createTishiLayer("文件更新失败，取消本次更新",2);
				break;
			case jsb.EventAssetsManager.NEW_VERSION_FOUND://发现新版本  3
				cc.log("=发现新版本=========="+event.getMessage());
				_self._updateData = event.getMessage();
				if(_self._tishiUpdate){
					if(_self._isWifiNet){
//						_self.createUpdateTishiLayer("您当前在WIFI网络下，是否进行更新？");
						_self._am.update();
						_self._startUpdate = true;
					}else{
						_self.createUpdateTishiLayer("您处于【非Wifi】网络，更新将消耗流量，是否进行更新？");
					}
					_self._tishiUpdate = false;
				}
				break;
			default:
				break;
			}
		});
		cc.eventManager.addListener(listener, 1);
	},
	
	//从网站获取服务器列表
	getServerListFromWeb : function() {
		var self = this; 
		//从网络获取服务器地址

		var mydate = new Date();
		var dateTime = mydate.getTime();
		var testHttp = cc.loader.getXMLHttpRequest();
//		(内网包地址)测试：http://7xkpew.com1.z0.glb.clouddn.com/serverinfo.txt?
//
//			线上：http://7xizav.com1.z0.glb.clouddn.com/serverinfo.txt?
		
		testHttp.open("GET", "http://7xizav.com1.z0.glb.clouddn.com/serverinfo.txt?"+dateTime);
		testHttp.timeout = 10000;//设置请求超时时间
		['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {//得到各个阶段下的状态
			testHttp["on" + eventname] = function () {
				cc.log("on  eventname,serverinfo",eventname);
				if (eventname == "error" || eventname == "timeout") {
					serVerIp = beiYongSer;
					LOGINURL = "ws://" + serVerIp + ":6515/login";
					GAMEURL = "ws://" + serVerIp + ":6515/game";
					self._succ = true;
				};
			}
		});
		testHttp.onreadystatechange = function() {
			if (testHttp.readyState ==4 && testHttp.status == 200 ) {
				var jieshouData = testHttp.responseText;
				//保存读取到的东西
				serverList = 	eval("("+jieshouData+")"); 
				cc.log("=======serverList=========="+serverList.length);
				var num = Math.floor(Math.random()*(serverList.length));
				if( serverList[num].ipconfig ){
					serVerIp = serverList[num];
					LOGINURL = "ws://" + serVerIp.ipconfig + ":6515/login";
					GAMEURL = "ws://" + serVerIp.ipconfig + ":6515/game";
					self._succ = true;
				}else {
					serVerIp = beiYongSer;
					LOGINURL = "ws://" + serVerIp + ":6515/login";
					GAMEURL = "ws://" + serVerIp + ":6515/game";
					self._succ = true;
				}
			}else {
				serVerIp = beiYongSer;
				LOGINURL = "ws://" + serVerIp + ":6515/login";
				GAMEURL = "ws://" + serVerIp + ":6515/game";
				self._succ = true;
			};
		};
		testHttp.send("");
	},
//	//热更新
//	hotUpdate:function(){
//		_self._getUpdateDataTime++;
//		if(_self._getUpdateDataTime==15){
//			if(!_self._nowUpdate){//7.5秒内没有获取到要更新资源的大小就停止更新
//				_self.loadGame();
//				_self.unschedule(_self.hotUpdate);//停止定时器
//			}
//		}else{
//			if(!_self._nowUpdate){
//				return;
//			}else{
//				//如果有新的游戏包需要更新，则先询问是否更新游戏包，如果没有则检测是否有热更新内容
//				if(_self._pgVersion != cc.sys.localStorage.getItem("PG_VERSION")){
//					_self.unschedule(_self.hotUpdate);//停止定时器
//					_self.createDownLoadTishiLayer("更新内容较多，建议重新下载游戏");
//				}else{
//					_self.unschedule(_self.hotUpdate);//停止定时器
//					_self._am.checkUpdate();//检测版本更新
//				}
//			}
//		}
//	},
	
	//更新错误提示
	createTishiLayer:function(msg,type){
		cc.log("更新错误提示=============="+type);
		var aNode = ccs.load("res/shz/TanChuCeng/tiShi.json").node;
		aNode.x = cc.winSize.width/2;
		aNode.y = cc.winSize.height/2;
		_self.addChild(aNode,0,2);
		
		var miaoshu = aNode.getChildByName("Describe_Text");
		miaoshu.setString(msg);
		var quedingBtn = aNode.getChildByName("Button_queding");
		quedingBtn.addClickEventListener(function() {
			_self.getChildByTag(2).removeFromParent(true);
			if(type == 1){
				_self.checkNetwork();//从新检查网络
			}else if(type == 2){
				_self.loadGame();//进入游戏
			}
		});
	},
	//弹出框提示有新版本更新
	createUpdateTishiLayer:function(msg){
		var aNode = ccs.load("res/shz/TanChuCeng/tiShi_gengxin.json").node;
		aNode.x = cc.winSize.width/2;
		aNode.y = cc.winSize.height/2;
		_self.addChild(aNode,0,1);
		_self._miaoshu = aNode.getChildByName("Text_1");
		_self._miaoshu.setString(msg);
		var _update = aNode.getChildByName("Text_2");
		_update.setContentSize(400, 50);
		var _lijigengxinBtn = aNode.getChildByName("lijigengxinBtn");
		var _zanbugengxinBtn = aNode.getChildByName("zanbugengxinBtn");
		var _bixugengxinBtn = aNode.getChildByName("bixugengxinBtn");
		//非必须更新
		if(_self._updateType == 0){
			_update.setString("更新包："+parseFloat((_self._updateData/1024).toFixed(2))+"MB");
			_bixugengxinBtn.setVisible(false);
			_zanbugengxinBtn.setVisible(true);
			_zanbugengxinBtn.addClickEventListener(function() {
				var temppath = jsb.fileUtils.getWritablePath()+"project.manifest.temp";
				if(jsb.fileUtils.isFileExist(temppath)){
					jsb.fileUtils.removeFile(temppath);
				}
				_self.getChildByTag(1).removeFromParent(true);
				_self.loadGame();
			});
			_lijigengxinBtn.setVisible(true);
			_lijigengxinBtn.addClickEventListener(function() {
				_self.getChildByTag(1).removeFromParent(true);
				_self._am.update();
				_self._startUpdate = true;
			});
		}else if(_self._updateType == 1){//必须更新
			_update.setString("更新包："+parseFloat((_self._updateData/1024).toFixed(2))+"MB");
			_zanbugengxinBtn.setVisible(false);
			_lijigengxinBtn.setVisible(false);
			_bixugengxinBtn.setVisible(true);
			_bixugengxinBtn.addClickEventListener(function() {
				_self.getChildByTag(1).removeFromParent(true);
				_self._am.update();
				_self._startUpdate = true;
			});
		}
	},
	//下载整个游戏包
	createDownLoadTishiLayer:function(msg){
		var aNode = ccs.load("res/shz/TanChuCeng/tiShi_gengxin.json").node;
		aNode.x = cc.winSize.width/2;
		aNode.y = cc.winSize.height/2;
		_self.addChild(aNode,0,1);
		_self._miaoshu = aNode.getChildByName("Text_1");
		_self._miaoshu.setString(msg);
		var _update = aNode.getChildByName("Text_2");
		_update.setContentSize(400, 50);
		var _lijigengxinBtn = aNode.getChildByName("lijigengxinBtn");
		var _zanbugengxinBtn = aNode.getChildByName("zanbugengxinBtn");
		var _bixugengxinBtn = aNode.getChildByName("bixugengxinBtn");
		if(_self._pgupdateType == 0){//更新游戏包
			_update.setString("更新包："+parseFloat((_self._pgupdateType/1024).toFixed(2))+"MB");
			_bixugengxinBtn.setVisible(false);
			_zanbugengxinBtn.setVisible(true);
			_zanbugengxinBtn.addClickEventListener(function() {
				_self.getChildByTag(1).removeFromParent(true);
				_self._am.checkUpdate();//检测版本更新
			});
			_lijigengxinBtn.setVisible(true);
			_lijigengxinBtn.addClickEventListener(function() {
				_self.getChildByTag(1).removeFromParent(true);
				_self._startUpdate = true;
				if( sys.os == sys.OS_ANDROID ){
					jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openUrlDownload", "(Ljava/lang/String;)V",_self._downloadUrl);		
				}else if( sys.os == sys.OS_IOS ){
					cc.Application.getInstance().openURL(_self._downloadUrl);
				}
			});
		}else if(_self._pgupdateType == 1){//更新游戏包
			_update.setString("更新包："+parseFloat((_self._pgupdateData/1024).toFixed(2))+"MB");
			_zanbugengxinBtn.setVisible(false);
			_lijigengxinBtn.setVisible(false);
			_bixugengxinBtn.setVisible(true);
			_bixugengxinBtn.addClickEventListener(function() {
				_self.getChildByTag(1).removeFromParent(true);
				if( sys.os == sys.OS_ANDROID ){
					jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openUrlDownload", "(Ljava/lang/String;)V",_self._downloadUrl);		
				}else if( sys.os == sys.OS_IOS ){
					cc.Application.getInstance().openURL(_self._downloadUrl);
				}
				_self._startUpdate = true;
			});
		}
	},
	
	//加载诗文
	creatCaijianShiwen : function(rootNode) {
		var suiji = Math.floor(Math.random()*4);
		for (var i = 0; i < 5; i++) {
			var aNode = rootNode.getChildByTag(i+13);
			var pos = aNode.getPosition();

			var clipper = new cc.ClippingNode();
			clipper.width = 50;
			clipper.height = 370;
			clipper.anchorX = 0;
			clipper.anchorY =0;
			clipper.x = pos.x+2;
			clipper.y = pos.y;
			if (i == 4) {
				clipper.x = pos.x;
				clipper.y = pos.y;
			}
			rootNode.addChild(clipper);
			//绘制节点
			var stencil = new cc.DrawNode();
			var rectangle = [cc.p(0, 0),cc.p(clipper.width, 0),
			                 cc.p(clipper.width, clipper.height),
			                 cc.p(0, clipper.height)];
			var white = cc.color(255, 255, 255, 255);
			stencil.drawPoly(rectangle, white, 1, white);
			clipper.stencil = stencil;
			var shiju = new cc.Sprite("#"+this._shiwen[suiji][i]);
			cc.log("#"+this._shiwen[0][i]);
			shiju.anchorX = 0;
			shiju.anchorY = 0;
			shiju.x= -50;
			shiju.y = 0;
			if (i == 4) {
				shiju.x= -50;
				shiju.y = 200;
			}
			clipper.addChild(shiju);
			//stencil.runAction(cc.moveBy(1.0, 100, 100));
			this._stencils[i] = stencil;
		};
	},
	//创建落叶特效
	creatLuoyeTexiao : function() {
		_self.schedule(function() {
			_self._luoYe = new cc.ParticleSystem("res/shz/load/ly.plist");
			_self._luoYe.retain();
			_self._luoYe.x = cc.winSize.width,
			_self._luoYe.y = cc.winSize.height;
			_self.addChild(_self._luoYe);
		}, 3.0, cc.REPEAT_FOREVER,0.1);
	},
	//显示诗文
	xianshiShiwen : function() {
		cc.log("this._stenXia",_self._stenXia);
		var stenc = _self._stencils[_self._stenXia];
		stenc.runAction(cc.moveBy(1.0, -50,0));
		_self._stenXia++;
	},
	//加载资源
	loadGame:function(){
		cc.loader.loadJs(["src/files.js"], function(err){
			cc.loader.loadJs(jsFiles, function(err){
				_self.jiaZaiZiyuan();
			});
		});
	},
	//加载资源
	jiaZaiZiyuan : function(){
		_self._zongJinDu = g_resources.length;
		_self._jinduZhi = 0;
		_self._tishiyu.setSpriteFrame("tips2_7.png");//努力加载资源
		_self._sourcedata.setVisible(false);
		for (var i = 0; i < g_resources.length; i++) {
			cc.log("i",_self._zongJinDu,i);
			cc.textureCache.addImage(g_resources[i], _self.jiazaiCallBack, _self);
			
		}
	},
	//加载资源回调
	jiazaiCallBack : function() {
		_self._jinduZhi++;
		cc.log("_self._jinduZhi,_self._zongJinDu",_self._jinduZhi,_self._zongJinDu);
		var scal = _self._jinduZhi/_self._zongJinDu;
		_self._jindu.setScaleX(scal);
		_self._jinduParticle.x = 246+_self._jindu.getBoundingBox().width;
		if (_self._jinduZhi ==_self._zongJinDu ) {	
			if (!waitQuan.xianShi) 
				cc.director.getRunningScene().addChild(waitQuan,1000);
				waitQuan.reuse();
				_self.scheduleUpdate();
				return;
			
		};
	},
	//更新资源进度条
	updateProgress:function(){
		//更新进度条
		var scal = _self._percentByFile/100*_self._updateData;
		_self._jindu.setScaleX(_self._percentByFile/100);
		_self._jinduParticle.x = 246+_self._jindu.getBoundingBox().width;
		_self._sourcedata.setString(parseFloat(scal.toFixed(2))+"KB / "+_self._updateData+"KB");
	},
	
	
	//等待圈的显示
	update : function() {
		if (this._succ) {
			if (waitQuan.xianShi) {
				waitQuan.unuse();
			};
			this._succ = false;
			this.unscheduleUpdate();

			if(SDKHelper.thirdSdkLogin){
				if( sys.os == sys.OS_ANDROID ){
					jsb.reflection.callStaticMethod( "org/cocos2dx/javascript/SDKHelper", "thirdLogin", "()V");
				}else if( sys.os == sys.OS_IOS ){
					jsb.reflection.callStaticMethod( "SDKHelper", "thirdLogin");
				};
			}else {
				USER_szPassword = "111111"//用户的密码初始为“1111111”
				USER_zhangHao = sheBeiUid;/*没有第三方登陆的时候，USER_zhangHao与MachineID使用相同的值，都指向机器码。当接入第三方登陆后， USER_zhangHao根据第三方登陆提供的账号来生成。*/
				MachineID = sheBeiUid;
				IsDengLu = true;
				loginServer = Producer.creatLoginSever();
				if (!waitQuan.xianShi) {
					cc.director.getRunningScene().addChild(waitQuan,1000);
					waitQuan.reuse(30,1);//第二个参数说明是从加载界面跳转到登陆界面
				}
			}

		}
	},
	//得到机器码
	getJIqiMa : function() {
		if (!sheBeiUid) {
			if( sys.os == sys.OS_ANDROID ){
				sheBeiUid = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getuuid", "()Ljava/lang/String;");		
			}else if( sys.os == sys.OS_IOS ){
				sheBeiUid = jsb.reflection.callStaticMethod( "netWork", "AccessToUniqueIdentification" );
			};
			slocal.setItem("JIQIMA",sheBeiUid);
		};
	},
	
	onEnter : function() {
		this._super();	
		cc.audioEngine.playMusic("res/shz/Sound/BGM01.mp3", true);
	},
	
	onExit:function(){
		this._super();
		if(this._am){
			this._am.release();
		}
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/shz/load/regengxin_tishiyu.plist");
	}
});

