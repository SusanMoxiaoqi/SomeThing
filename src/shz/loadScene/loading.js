
var loadindLayer = cc.LayerColor.extend({//继承LayerColor，初始化的时候可以直接改背景颜色  
	a:0,//记录当前加载了多少个文件  
	_jindu : null,
	_jinduParticle : null,
	_data : null,
	_time : 0,
	ctor : function(Data) {  
		this._super(); 
		cc.log("++++++++++++++++++++++++++++loadindLayer ctor");
		this.initScene(Data);
		this._data = Data;
		
		
	
	},  
	initScene : function() {
		var rootNode = ccs.load("res/shz/load/MainScene.json").node;
		this.addChild(rootNode);
		this._jindu = rootNode.getChildByName("jindutiao2_3");
		this._jinduParticle = rootNode.getChildByName("Particle_1");
//		this.scheduleUpdate();
		
		//this.jiaZaiZiyuan();//加载资源
		
		var tishiXia = rootNode.getChildByName("tishiyu");
		var pos = tishiXia.getPosition();
		tishiXia = new cc.Sprite("#tishiyuxia_6.png");
		tishiXia.setPosition(pos.x, pos.y-5);
		rootNode.addChild(tishiXia);
		
		var num = Math.ceil(Math.random()*21);
		var str1 = num.toString();
		if (num<10) {
			str1 = "0"+num.toString();
		};
		var tiShiYu = new cc.Sprite("res/shz/load/TiShiYu/tips__"+str1+".png");
		tiShiYu.x = cc.winSize.width/2;
		tiShiYu.y = 60;
		this.addChild(tiShiYu, 1, 2);
		
	},
//	update : function() {
//		this.a = this.a+0.01;
//		this._jindu.setScaleX(this.a);
//		this._jinduParticle.x = 246+this._jindu.getBoundingBox().width;
//		if (this.a >= 1) {
//			this.unscheduleUpdate();
//				cc.director.runScene(new MainGameScene());  
//		}
//	},
	//加载资源
	jiaZaiZiyuan : function(){
		this._zongJinDu = this._data.array.length;
		this._jinduZhi = 0;
		for (var i = 0; i < this._data.array.length; i++) {
			cc.log("cc.textureCache.addImage",this._data.array[i]);
			cc.textureCache.addImage(this._data.array[i], this.jiazaiCallBack, this);
		}
	},
	//加载资源回调
	jiazaiCallBack : function() {
		this._jinduZhi++;
		var scal = this._jinduZhi/this._zongJinDu;
		this._jindu.setScaleX(scal);
		this._jinduParticle.x = 246+this._jindu.getBoundingBox().width;
		if (this._jinduZhi ==this._zongJinDu ) {	
			this.scheduleOnce(function() {
				if(this._data.type == 0){
					cc.director.runScene(new MainGameScene());  
				}else if(this._data.type == 1){//进入百人场对应房间
					this.enterMainScene();
				}
			
			}, 0.1)
		//	return;
		};
	},
	
	enterMainScene : function() {	
		wServerID = this._data.wServerID;
		if (wServerID == 0) {
			var XinXi = {Describe : "房间正在维护中，请选择其他房间进入！",errorCode : 1000,isBack : false};
			var tishi = TiShiKuang.create(XinXi);
			cc.director.getRunningScene().addChild(tishi,1000);
			return;
		}
		var type = 0;
		//得到网络环境
		if (sys.os == sys.OS_IOS) {
			type = jsb.reflection.callStaticMethod("netWork", "getCurrentNetworkStatus");
		}else if(sys.os == sys.OS_ANDROID){
			type = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getNetworkIsWifi", "()I");
		};
		//没有网络，
		if(type==0){
			var xinxi = {Describe : "无法链接网络，请检查移动网络\n是否链接！",errorCode : 2020,isBack : false};//		
			var tishi = TiShiKuang.create(xinxi);
			cc.director.getRunningScene().addChild(tishi,1000);
			return;
		}
		SocketManager.setGameUrl(GAMEURL);
		gameSever=SocketManager.getGameServer(BRCBIBEI);
		brc.loading = this;
		this.schedule(this.runTime,1, cc.REPEAT_FOREVER);	
		if (!waitQuan.xianShi) {
			cc.director.getRunningScene().addChild(waitQuan,1000);
			waitQuan.reuse(30,100);
		}
	},
	
    runTime : function() {
		var self = this;

		if(self._time == 10){
			self._time = 0;
			this.unschedule(self.runTime);
			cc.spriteFrameCache.removeSpriteFrames();
			cc.textureCache.removeAllTextures();
			cc.director.runScene(new GameHallScene());
			return;
			cc.log("++++++++++++++++++++++++++++runTime");
		}
		self._time++;
	},
	onEnter:function(){
		this._super();
		cc.spriteFrameCache.removeSpriteFrames();
		cc.textureCache.removeAllTextures();
		this.scheduleOnce(this.jiaZaiZiyuan, 0.5);
		cc.log("++++++++++++++++++++++++++++loadindLayer onEnter");
	},
	onExit:function(){
		this._super();
		var numberAry =["res/shz/load/jiaZai"];
		removeResources(1, numberAry);
//		cc.spriteFrameCache.removeSpriteFramesFromFile("res/shz/load/jiaZai.plist");
//		cc.textureCache.removeTextureForKey("res/shz/load/jiaZai.png");
		cc.log("++++++++++++++++++++++++++++loadindLayer onExit");
	}
});  

var loadindScene = cc.Scene.extend({
	_data : null,
	ctor : function(Data) {
		this._super();
		this._data = Data;
	},
	onEnter:function () {
		this._super();
		var layer = new loadindLayer(this._data);
		this.addChild(layer);
	},
	onExit:function(){
		this._super();
		cc.log("++++++++++++++++++++++++++++loadindScene onExit");
	}
});