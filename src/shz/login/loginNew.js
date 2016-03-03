
var loginScene_this = null;
var loginLayer = cc.Layer.extend({

	_renwu : null,
	_chuan : null,
	_gonggaoBtn : null,
	_bangzhuBtn : null,
	_shezhiBtn : null,
	_dengluPosition:null,
	btnTag : 0,
	_succ : false,
	_sever: null,
	ctor:function (xinxi) {
		this._super();
		this._sever = 2;
		loginScene_this = this;
		//首先读取本地的账号密码信息
		var size = cc.winSize;
		this.initScene();
		this.jiaTeXiao();
		this.scheduleUpdate();
		if (xinxi) {
			var tishi = TiShiKuang.create(xinxi);
			cc.director.getRunningScene().addChild(tishi,1000);
		};
		
		return true;
	},
	
	initScene : function() {
		var self = this;
		//加载背景界面
		var beiJing = ccs.load("res/shz/login/MainScene.json").node;
		this.addChild(beiJing);
		//公告
		this._gonggaoBtn = beiJing.getChildByName("DLgonggaoBtn");
		this._gonggaoBtn.tag = 10;
		this._gonggaoBtn.addTouchEventListener(self.login_btn,this);
		//帮助
		this._bangzhuBtn = beiJing.getChildByName("DLbangzhuBtn");
		this._bangzhuBtn.tag = 11;
		this._bangzhuBtn.addTouchEventListener(self.login_btn,this);
		//设置
		this._shezhiBtn = beiJing.getChildByName("DLshezhiBtn");
		this._shezhiBtn.tag = 12;
		this._shezhiBtn.addTouchEventListener(self.login_btn,this);
		//开始背景动画
		this.donghua(beiJing);
		//创建“水浒传”logo
		var logo = new cc.Sprite("#DLlogo.png");
		logo.x = 568;
		logo.y = 480;
		self.addChild(logo);
		//加载版本号，虽然1.0.2.0版本以后才会存在配置文件（CONFIG是配置文件的js对象），
		//但是若是从低版本升级过来的话cc.sys.localStorage.getItem("VERSION") 存在。所以此处没有问题
		var hotvision = cc.sys.localStorage.getItem("VERSION") || CONFIG.VERSION_latterPart;
		var pgvision = CONFIG.VERSION_frontPart || cc.sys.localStorage.getItem("PG_VERSION");
		var SHZ_VERSION = cc.loader.getRes("res/shz_version.json");
		if (typeof(SHZ_VERSION) != "undefined" && SHZ_VERSION && SHZ_VERSION != null) {
			pgvision = SHZ_VERSION.VERSION_frontPart;
		};
		var _version = new cc.LabelTTF("", "Arial", 22);
		_version.x = cc.winSize.width-130;
		_version.y = 30;
		_version.setString("版本号:"+pgvision+"."+hotvision);
		self.addChild(_version);
		//创建登录按钮
		var dengLuBtn = new ccui.Button();
		dengLuBtn.x = 568;
		dengLuBtn.y = 210;
		dengLuBtn.tag = 13;
		self.addChild(dengLuBtn);
		dengLuBtn.loadTextures("kaishiyouxi_1.png", "kaishiyouxi_2.png", "kaishiyouxi_3.png", ccui.Widget.PLIST_TEXTURE);
		dengLuBtn.setScale(1.3, 1.3)
		dengLuBtn.addTouchEventListener(this.login_btn, this);
	},
	login_btn : function(send,type) {
		
		switch (type) {
		case ccui.Widget.TOUCH_BEGAN:
			if(!loginScene_this.btnTag){
				loginScene_this.btnTag = send.getTag();
			}
			
			break;
		case ccui.Widget.TOUCH_MOVED:

			break;
		case ccui.Widget.TOUCH_ENDED:
          var loginTag = send.getTag();
          if(loginTag == loginScene_this.btnTag){
        	  cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
        	switch (send.getTag()) {
        	case 10://公告
				gongGao.creatGonggaoLayer(cc.director.getRunningScene());
				break;
			case 11://帮助
				bangZhu.creatBangZhuLayer(cc.director.getRunningScene());
				break;
			case 12://设置
				sheZhi.creatSheZhiLayer(cc.director.getRunningScene());
				break;
			case 13://登陆
				loginScene_this.login();
				break;

			default:
				break;
			}
          }
          loginScene_this.btnTag = 0;
			break;

		default:
			break;
		}
	},
	login : function() {
		var type = 0;
		//得到网络环境
		if (sys.os == sys.OS_IOS) {
			type = jsb.reflection.callStaticMethod("netWork", "getCurrentNetworkStatus");
		}else if(sys.os == sys.OS_ANDROID){
			type = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getNetworkIsWifi", "()I");
		};
		//没有网络，
		if (type == 0) {
			IsDengLu = false;
			var xinxi = {Describe : "无法链接网络，请检查移动网络\n是否链接！",errorCode : 2006,isBack : false};//		
			cc.director.runScene(new loginScene(xinxi));
			return;
		};
		if (!waitQuan.xianShi) {
			this.addChild(waitQuan,1000);
			waitQuan.reuse(30);
		};
		loginScene_this._succ = false;
		loginScene_this.scheduleUpdate();
		loginScene_this.schedule(loginScene_this.updatesucc, 0.1, cc.REPEAT_FOREVER);
		loginScene_this.getServerListFromWeb();


	},
	updatesucc : function() {
		cc.log("MMMMMMMMMM");
		if (this._succ) {
			if (waitQuan.xianShi) {
				waitQuan.unuse();
			};
			this._succ = false;
			this.unschedule(loginScene_this.updatesucc);
			if(SDKHelper.thirdSdkLogin){
				if( sys.os == sys.OS_ANDROID ){
					jsb.reflection.callStaticMethod( "org/cocos2dx/javascript/SDKHelper", "thirdLogin", "()V");
				}else if( sys.os == sys.OS_IOS ){
					jsb.reflection.callStaticMethod( "SDKHelper", "thirdLogin");
				};
			}else {
				IsDengLu = true;
				loginServer = Producer.creatLoginSever();
				if (!waitQuan.xianShi) {
					cc.director.getRunningScene().addChild(waitQuan,1000);
					waitQuan.reuse(30,1);//第二个参数说明是从加载界面跳转到登陆界面
				}
			}
		}
	},
	//从网站获取服务器列表
	getServerListFromWeb : function() {
		var self = this; 
		//从网络获取服务器地址

		var mydate = new Date();
		var dateTime = mydate.getTime();
		var testHttp = cc.loader.getXMLHttpRequest();
//		(内网包地址)测试：http://7xkpew.com1.z0.glb.clouddn.com/serverinfo.txt

//		线上：http://7xizav.com1.z0.glb.clouddn.com/serverinfo.txt


		testHttp.open("GET", "http://7xizav.com1.z0.glb.clouddn.com/serverinfo.txt?"+dateTime);
		testHttp.timeout = 10000;//设置请求超时时间
		['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {//得到各个阶段下的状态
			testHttp["on" + eventname] = function () {
				cc.log("on  eventname",eventname);
				if (eventname == "error" || eventname == "timeout") {
					serVerIp = beiYongSer;
					LOGINURL = "ws://" + serVerIp + ":6515/login";
					GAMEURL = "ws://" + serVerIp + ":6515/game";
					self._succ = true;
				};
			}
		});
		testHttp.onreadystatechange = function() {
			cc.log("testHttp.readyState,testHttp.status",testHttp.readyState,testHttp.status);
			if (testHttp.readyState ==4 || testHttp.status == 200 ) {
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

	jiaTeXiao : function() {
		var size = cc.winSize;

		var xiayuqian = new cc.ParticleSystem("res/shz/login/xiayuqian.plist");//下雨前特效
		this.addChild(xiayuqian);
		xiayuqian.x = size.width/2,
		xiayuqian.y = size.height;

		var xiayuhou = new cc.ParticleSystem("res/shz/login/xiayuhou.plist");
		this.addChild(xiayuhou);
		xiayuhou.x = size.width/2,
		xiayuhou.y = size.height;

		var shuimian = new cc.ParticleSystem("res/shz/login/shuimian.plist");
		this.addChild(shuimian);
		shuimian.x = size.width/2,
		shuimian.y = 100;
	},
	
	donghua : function(widjet) {
		this._renwu = widjet.getChildByName("DLrenwu_6");
		this._chuan = widjet.getChildByName("DLchuan2_7");
		var guang = widjet.getChildByName("DLguang_1");
		var shan = widjet.getChildByName("DLshan_2");
		var zhujing = widjet.getChildByName("DLjing_3");
		var yuncai  = widjet.getChildByName("DLyun_4");
		var cao = widjet.getChildByName("DLcao_9");
		var duration = 8;
		guang.runAction(
				cc.sequence(
						cc.moveBy(duration, -200, 0),
						cc.moveBy(duration*2, 400, 0),
						cc.moveBy(duration, -200, 0)
				).repeatForever()
		);
		shan.runAction(
				cc.sequence(
						cc.moveBy(duration, -150, 0),
						cc.moveBy(duration*2, 300, 0),
						cc.moveBy(duration, -150, 0)
				).repeatForever()
		);
		zhujing.runAction(
				cc.sequence(
						cc.moveBy(duration, -150, 0),
						cc.moveBy(duration*2, 300, 0),
						cc.moveBy(duration, -150, 0)
				).repeatForever()
		);
		cao.runAction(
				cc.sequence(
						cc.moveBy(duration, -150, 0),
						cc.moveBy(duration*2, 300, 0),
						cc.moveBy(duration, -150, 0)
				).repeatForever()
		);
		yuncai.runAction(
				cc.sequence(
						cc.moveBy(duration, -200, 0),
						cc.moveBy(duration*2, 400, 0),
						cc.moveBy(duration, -200, 0)
				).repeatForever()
		);
	},
	update:function(dt) {
		var currentDate = new Date();
		this._renwu.y = 0 + (Math.cos(currentDate.getTime() * 0.002)) * 5;
		this._chuan.y = 0 + (Math.sin(currentDate.getTime() * 0.002)) * 10;
	},

	onEnter : function() {
		this._super();
		cc.log("进入");
		cc.audioEngine.playMusic(Music_res.dengLu, true);
		var that = this;
		cc.eventManager.addListener({

			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  function(keyCode, event){
				var label = event.getCurrentTarget();
				//label.setString("Key " + (cc.sys.isNative ? that.getNativeKeyName(keyCode) : String.fromCharCode(keyCode) ) + "(" + keyCode.toString()  + ") was pressed!");
			},
			onKeyReleased: function(keyCode, event){
				
//				var label = event.getCurrentTarget();
//				label.setString("Key " + (cc.sys.isNative ? that.getNativeKeyName(keyCode) : String.fromCharCode(keyCode) ) + "(" + keyCode.toString()  + ") was released!");
				var keyCode = keyCode.toString();
				cc.log("RRRRRRRRRRRRRRRR",keyCode);
				if (keyCode == 6 && !zuZhiBack) {
					var xinxi = {Describe : "您确定要退出游戏吗？",errorCode : 2002,isBack : false};//老虎机钱不足
					var tishi = TiShiKuangZiDingYi.create(xinxi);
					cc.director.getRunningScene().addChild(tishi,1002);
				}
			}
		}, that);

	},
	onExit : function() {
		this._super();
		cc.audioEngine.stopMusic(false);
		cc.eventManager.removeListeners(this, true);

	},
	
	getNativeKeyName:function(keyCode) {
		var allCode = Object.getOwnPropertyNames(cc.KEY);
		var keyName = "";
		cc.log("sdfghjkl;sdfghjdfghjkxdcfvgbhnjm");
		for(var x in allCode){
			if(cc.KEY[allCode[x]] == keyCode){
				keyName = allCode[x];
				break;
			}
		}
		return keyName;
	}
});

var loginScene = cc.Scene.extend({
	_xinxi : null,
	ctor:function(xinxi){
		this._super();
		this._xinxi = xinxi;
	},
	onEnter:function () {
		this._super();
		var layer = new loginLayer(this._xinxi);
		this.addChild(layer);
	}
});
