/**
 * errCode 
 * 8 : 表示启动后加载界面进入大厅失败
 * 100 : 大厅进入游戏房间
 * */
var dengDaiLayer = cc.LayerColor.extend({
	quan : null,
	_quedingBtn : null,
	xianShi : false,
	errCode : 0,
	TiShi : null,
	ctor:function () { 
		this._super(cc.color(0,0,0,100));
		var _this = this;
		this.quan = new cc.Sprite("res/shz/000_4.png");
		var sizequan = this.quan.getContentSize();
		this.quan.x = cc.winSize.width/2;
		this.quan.y = cc.winSize.height/2;
		this.addChild(this.quan);
		this.quan.runAction(cc.rotateBy(0.15, 90, 90).repeatForever());
		var tishi = new cc.LabelTTF("");
		this.TiShi = tishi;
		tishi.x = cc.winSize.width/2;
		tishi.y = cc.winSize.height/2-45;
		this.addChild(tishi);
		return true;
	},
	jishiqi : function() {
		if (this.errCode == 1) {
			this.errCode = 0;
			cc.director.runScene(new loginScene());
			SocketManager.closeServer(false, false);		
		}
		this.unschedule(this.jishiqi);
		cc.pool.putInPool(this);
	},
	unuse : function(tishi) {
		this.errCode = 0;
		this.xianShi = false;
		this.TiShi.setString("");
		this.quan.stopAllActions();
		this.unschedule(this.jishiqi);
		this.removeFromParent(false);
	},
	reuse : function(time,code,str) {
		var _time = time || 8;
		if(code){
			this.errCode = code;
		};
		if (str) {
			this.TiShi.setString(str);
		}
		this.xianShi = true;
		this.quan.runAction(cc.rotateBy(0.15, 90, 90).repeatForever());
		this.scheduleOnce(this.jishiqi, _time);
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
				cc.log("tishi onTouchesEnded.. ");
			}
		});		

		cc.eventManager.addListener(listener1, this);
	}

});

dengDaiLayer.create = function(){
	if (cc.pool.hasObject(dengDaiLayer)) {
		cc.log("%%%%%%%%%%%%%%%cc.pool");
		return cc.pool.getFromPool(dengDaiLayer);			
	}else{
		cc.log("%%%%%%%%%%%%%%%new");
		return new dengDaiLayer();
	};
};
var waitQuan = dengDaiLayer.create();
waitQuan.unuse();
waitQuan.retain();
