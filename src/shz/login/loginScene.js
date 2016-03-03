
var loginScene_this = null;
var loginLayer1 = cc.Layer.extend({
	_dengLuNode : null,
	_qiehuanNode : null,
	_qiehuanNode : null,
	_Qzhanghao : "",
	_QxialaBtn : null,
	_INDEX : 0,//选择帐号时的下标
	_XzhangHao : null,//选择帐号时的登录账号
	_XmiMa : null,//选择帐号时的登录密码
	_isTouch : false,//tableViewCell上的删除按钮是否可以被点击
	_btn_login : null,
	_btn_kuaikai : null,
	_zhanghao : "",
	_mima : "",
	_renwu : null,
	_chuan : null,
	_xiayuqian : null,//下雨前（特效）
	_xiayuhou : null,//下雨后（特效）
	_shuimian : null,//水面（特效）
	_zhanghaoMima : [],
	_zhangHaoTableView : null,
	_isXiaLa : false,
	_gonggaoBtn : null,
	_bangzhuBtn : null,
	_shezhiBtn : null,
	_dengluPosition:null,
	ctor:function () {
		this._super();
//		swallowTouches: true,
		loginScene_this = this;
		cc.log("初始化");
		cc.audioEngine.stopMusic(false);
//		sheBeiUid = "222222";
		//首先读取本地的账号密码信息
		var userDta = slocal.getItem(KEY);
		USERINFSTR = userDta || "{data : []}";
		cc.log("+++++++++++++++",USERINFSTR);
		USERINF = eval("("+USERINFSTR+")");
		this._zhanghaoMima = USERINF.data;
		if (this._zhanghaoMima.length>0) {
			this._XzhangHao = this._zhanghaoMima[0].zhanghao;
			this._XmiMa = this._zhanghaoMima[0].mima;
		}
	
		this.initScene();
		this.jiaTeXiao();
		this.scheduleUpdate();
		return true;
	},

	initScene : function() {
		var self = this;
		
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches:true,
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}, this);
		
		 var _version = new cc.LabelTTF("", "Arial", 22);
		 _version.x = cc.winSize.width-130;
		 _version.y = 30;
		 _version.setString("版本号:"+(cc.sys.localStorage.getItem("VERSION") || "1.0.0.1"));
		 self.addChild(_version,10);
		var widjet = ccs.load("res/shz/login/MainScene.json").node;
		this._gonggaoBtn = widjet.getChildByName("DLgonggaoBtn");
		this._gonggaoBtn.addClickEventListener(function() {
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			gongGao.creatGonggaoLayer(self);
		});
		this._bangzhuBtn = widjet.getChildByName("DLbangzhuBtn");
		this._bangzhuBtn.addClickEventListener(function() {
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			bangZhu.creatBangZhuLayer(self);
		});
		this._shezhiBtn = widjet.getChildByName("DLshezhiBtn");
		this._shezhiBtn.addClickEventListener(function() {
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			sheZhi.creatSheZhiLayer(self);
		});
		self.addChild(widjet);
		self.donghua(widjet);
		/**登录游戏界面*/
		self._dengLuNode = ccs.load("res/shz/login/dengLuButton.json").node;
		loginScene_this._dengluPosition = self._dengLuNode.getPosition();
		self.addChild(self._dengLuNode);
		this._btn_login = self._dengLuNode.getChildByName("Button_1");//登录
		this._btn_login.addClickEventListener(self.login);
		this._btn_kuaikai = self._dengLuNode.getChildByName("Button_2");//快速开始
		this._btn_kuaikai.addClickEventListener(function() {
			if (self._zhanghaoMima.length<=0) {
				var xinxi = {Describe : "没有可用的账号",errorCode : 10000,isBack : false};
				var tishi = TiShiKuang.create(xinxi);
				cc.director.getRunningScene().addChild(tishi,1000);
				return;
			}
			if (!waitQuan.xianShi) {
				self.addChild(waitQuan,1000);
				waitQuan.reuse();
			}
			USER_zhangHao = self._zhanghaoMima[0].zhanghao;
			USER_szPassword = self._zhanghaoMima[0].mima;
			var hash = md5( USER_szPassword);
			loginServer = Producer.creatLoginSever();
			cc.log("self._dengLuNode.getChildrenCount()333",self._dengLuNode.getChildrenCount());
		});
		cc.log("self._dengLuNode.getChildrenCount()1",self._dengLuNode.getChildrenCount());

		this._zhanghao = new cc.EditBox(cc.size(360.00,53.00),new cc.Scale9Sprite("DLinput.png"));
		this._zhanghao.setPosition(647, 355);
		this._zhanghao.setDelegate(this);
        this._zhanghao.setMaxLength(20);
        this._zhanghao.setFont("Arial",20);
		this._zhanghao.setPlaceHolder("点击输入账号");
		this._zhanghao.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);//修改为不使用密文
		this._zhanghao.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
		self._dengLuNode.addChild(this._zhanghao,1,10);

		this._mima = new cc.EditBox(cc.size(360.00, 53.00),new cc.Scale9Sprite("DLinput.png"));
		
		this._mima.setPosition(647,275);
		this._mima.setDelegate(this);
		this._mima.setMaxLength(20);
		this._mima.setPlaceHolder("点击输入密码");
		this._mima.setFont("Arial",20);
		this._mima.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);//修改为是使用密文
		this._mima.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
		self._dengLuNode.addChild(this._mima,1,11);
		
		cc.log("self._dengLuNode.getChildrenCount()2",self._dengLuNode.getChildrenCount());
		/**切换账号界面*/
		this._qiehuanNode = ccs.load("res/shz/login/qieHuanzhanghao.json").node;
		self.addChild(self._qiehuanNode);
		var kaishiyouxi = this._qiehuanNode.getChildByName("Btn_kaishi");//开始游戏
		kaishiyouxi.addClickEventListener(function() {
			//self._XzhangHao = self._Qzhanghao.getString();
			for (var i = 0; i < self._zhanghaoMima.length; i++) {
				if (self._XzhangHao == self._zhanghaoMima[i].zhanghao) {
					self._XmiMa = self._zhanghaoMima[i].mima;
					break;
				}
			}
			USER_szPassword = self._XmiMa;
			USER_zhangHao = self._XzhangHao;
			cc.log("shiyan " ,loginScene_this._XzhangHao,loginScene_this._XmiMa);
			if (!waitQuan.xianShi) {
				self.addChild(waitQuan,1000);
				waitQuan.reuse();
			}
			var hash = md5( USER_szPassword);
			loginServer = Producer.creatLoginSever();
		//	loginServer.sendMessage(100,2,{wModuleID : 203,dwPlazaVersion : 0,cbDeviceType : 0,szPassword : hash,szAccounts : USER_zhangHao,szMachineID : "",szMobilePhone : ""});
		});
		var qiehuan = this._qiehuanNode.getChildByName("Btn_qiehuan");//切换账号
		qiehuan.addClickEventListener(function() {
			self._qiehuanNode.setVisible(false);
			self._dengLuNode.setVisible(true);
		});
		var input = this._qiehuanNode.getChildByName("DLinput_4");
	    this.xiaLaTableview(input)
		this._Qzhanghao = input.getChildByName("Text_zhanghao");//切换帐号时的输入框
	    if (this._XzhangHao) {
	    	this._Qzhanghao.setString(this._XzhangHao);
	    	this._Qzhanghao.setTextColor(cc.color(255, 255, 255, 255));
	    	if (this._XzhangHao == sheBeiUid) {
	    		this._Qzhanghao.setString(this._zhanghaoMima[0].nicheng);
			}
		} else {
			var tt = new cc.LabelTTF();
			this._Qzhanghao.setString("没有可用的账号");
			this._Qzhanghao.setTextColor(cc.color(127.5, 127.5, 127.5, 255));
		}
	   
		this._QxialaBtn = input.getChildByName("Btn_xiala");
		this._QxialaBtn.addClickEventListener(function() {
			if (!self._isXiaLa) {
				self._isXiaLa = true;
				self._zhangHaoTableView.runAction(cc.sequence(
						cc.moveBy(0.15, 0, -100),
						cc.callFunc(function() {
							self._zhangHaoTableView.setTouchEnabled(true);
							self._isTouch = true;
						}, this)
						));
				this.setScaleY(-1);
			} else {
				self._isXiaLa = false;
				self._zhangHaoTableView.runAction(cc.sequence(
						cc.callFunc(function() {
							self._zhangHaoTableView.setTouchEnabled(false);
							self._isTouch = false;
						}, this),
						cc.moveBy(0.15, 0, 100)
				));
				this.setScaleY(1);
			}	
		});
		input.addClickEventListener(function() {
			if (!self._isXiaLa) {
				self._isXiaLa = true;
				self._zhangHaoTableView.runAction(cc.sequence(
						cc.moveBy(0.15, 0, -100),
						cc.callFunc(function() {
							self._zhangHaoTableView.setTouchEnabled(true);
							self._isTouch = true;
						}, this)
				));
				self._QxialaBtn.setScaleY(-1);
			} else {
				self._isXiaLa = false;
				self._zhangHaoTableView.runAction(cc.sequence(
						cc.callFunc(function() {
							self._zhangHaoTableView.setTouchEnabled(false);
							self._isTouch = false;
						}, this),
						cc.moveBy(0.15, 0, 100)
				));
				self._QxialaBtn.setScaleY(1);
			}	
		});
		if (IsDengLu) {
			this._qiehuanNode.setVisible(false);
			this._dengLuNode.setVisible(true);
		} else {
			this._dengLuNode.setVisible(false);
			this._qiehuanNode.setVisible(true);
		}

	},
	xiaLaTableview : function(parent) {
		var winSize = cc.winSize;
		var layout = new ccui.Layout();
		layout.setClippingEnabled(true);
		layout.setContentSize(cc.size(293, 100));
		layout.anchorX = 0.5;
		layout.anchorY = 1;
		layout.x = 162;
		layout.y = 0;
		parent.addChild(layout,-1);
		var tableView = new cc.TableView(this, cc.size(293, 100));
		this._zhangHaoTableView = tableView;
		tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		tableView.ignoreAnchorPointForPosition(false);
		tableView.anchorX = 0;
		tableView.anchorY = 0;
		tableView.x = 0;
		tableView.y = 100;
		tableView.setDelegate(loginScene_this);
		tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
		tableView.setTouchEnabled(false);
		layout.addChild(tableView);
		tableView.reloadData();
		
	},
	//触摸开始
	onTouchBegan:function(touch, event) {

		
		return true;
	},
	//触摸滑动
	onTouchMoved:function(touch, event) {
	},
	//触摸结束
	onTouchEnded:function(touch, event) {
		if (loginScene_this._isXiaLa) {
		loginScene_this._isXiaLa = false;
		loginScene_this._zhangHaoTableView.runAction(cc.sequence(
		cc.callFunc(function() {
		loginScene_this._zhangHaoTableView.setTouchEnabled(false);
		loginScene_this._isTouch = false;
		}, this),
		cc.moveBy(0.15, 0, 100)
		));
		loginScene_this._QxialaBtn.setScaleY(1);
		} else {

		}	
		return true;
	},
	tableCellSizeForIndex:function (table, idx) {
		return cc.size(293, 50);
	},
	tableCellTouched:function (table, cell) {
		var index = cell.getIdx();
		loginScene_this._INDEX = index;
		loginScene_this._XzhangHao = loginScene_this._zhanghaoMima[index].zhanghao;
		loginScene_this._XmiMa = loginScene_this._zhanghaoMima[index].mima;
		loginScene_this._Qzhanghao.setString(loginScene_this._XzhangHao);
		cc.log("cell touched at index: " + cell.getIdx(),loginScene_this._XzhangHao,loginScene_this._XmiMa);
		if (loginScene_this._XzhangHao == sheBeiUid) {
			loginScene_this._Qzhanghao.setString(loginScene_this._zhanghaoMima[index].nicheng);
		};
	},
	numberOfCellsInTableView:function (table) {
		return this._zhanghaoMima.length;
	},
	tableCellAtIndex:function (table, idx) {
		var strValue = idx.toFixed(0);
		var cell = table.dequeueCell();
		var label;
		if (!cell) {
			cell = new cc.TableViewCell();
			var sprite = ccs.load("res/shz/login/xialaCell.json").node;
			sprite.x = 146.5;
			sprite.y = 25;
			sprite.tag = 1;
			cell.addChild(sprite);

		}
			var anode = cell.getChildByTag(1);
			var anode1 = anode.getChildByName("DLxialaBg_1");
			var text = anode1.getChildByName("Text_1");
			text.setString(loginScene_this._zhanghaoMima[idx].zhanghao);
			var button = anode1.getChildByName("Button_1");
			if (loginScene_this._zhanghaoMima[idx].zhanghao == sheBeiUid) {
				button.setVisible(false);
				text.setString(loginScene_this._zhanghaoMima[idx].nicheng);
			}
			button.addClickEventListener(function() {//删除本地记录
				if (!loginScene_this._isTouch) {
					return;
				};
			var sp = this.getParent();
			var bg = sp.getParent();
			var acell = bg.getParent();
			var ind = acell.getIdx();

			cc.log(USERINF.data.toString());
			loginScene_this._zhanghaoMima.splice(ind, 1);
			//USERINF.data.splice(ind,1);//再删除一次就多删了
			cc.log(USERINF.data.toString());
			USERINFSTR = JSON.stringify(USERINF);
			slocal.setItem(KEY,USERINFSTR);
			
			if (loginScene_this._INDEX == ind) {
				loginScene_this._INDEX = 0;
				loginScene_this._XzhangHao = loginScene_this._zhanghaoMima[0].zhanghao || "没有可用的账号";
				loginScene_this._XmiMa = loginScene_this._zhanghaoMima[0].mima;
				loginScene_this._Qzhanghao.setString(loginScene_this._XzhangHao);
			}
			loginScene_this._zhangHaoTableView.reloadData();
			});
		return cell;
	},


	jiaTeXiao : function() {
		var size = cc.winSize;
			
		this._xiayuqian = new cc.ParticleSystem("res/shz/login/xiayuqian.plist");
		this.addChild(this._xiayuqian);
		this._xiayuqian.x = size.width/2,
		this._xiayuqian.y = size.height;
		
		this._xiayuhou = new cc.ParticleSystem("res/shz/login/xiayuhou.plist");
		this.addChild(this._xiayuhou);
		this._xiayuhou.x = size.width/2,
		this._xiayuhou.y = size.height;
		
		this._shuimian = new cc.ParticleSystem("res/shz/login/shuimian.plist");
		this.addChild(this._shuimian);
		this._shuimian.x = size.width/2,
		this._shuimian.y = 100;
	},
	login : function() {
		var self = loginScene_this;
		cc.log(this,this.getParent(),self,self.getParent());
		cc.log("12344556788",self._zhanghao.getString());
		if (self._zhanghao.getString() == "") {
			var xinxi = {Describe : "没有可用的账号",errorCode : 10000,isBack : false};
			var tishi = TiShiKuang.create(xinxi);
			cc.director.getRunningScene().addChild(tishi,1000);
			return;
		}
		USER_szPassword = self._mima.getString();
		USER_zhangHao = self._zhanghao.getString();
		if (!waitQuan.xianShi) {
			self.addChild(waitQuan,1000);
			waitQuan.reuse();
		}
		var hash = md5( USER_szPassword);
		loginServer = Producer.creatLoginSever();
		
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
	},
	onExit : function() {
		this._super();
		
	}
});

var loginScene1 = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new loginLayer1();
		this.addChild(layer);
	}
});
