var jiangChiLayer = null;
var jiangChiNode = cc.Node.extend({
	nodeArr : [],
	_parent : null,
	ctor : function() {
		this._super();
		var self = this;
		jiangChiLayer = this;
		cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/jc_sz_ts_xt.plist");
		var sp = new cc.Sprite("#jc_jiangchijine.png");
		
		this.addChild(sp);
		
		for ( i = 0;i<10;i++) {
			var bNode = new aJiangChiNode();
			bNode.x = sp.getContentSize().width/2+30*i+17;
			bNode.y = 0;
			this.addChild(bNode);
			this.nodeArr[i] = bNode;
		}


		var wenHaoBtn = new ccui.Button();
		wenHaoBtn.setTouchEnabled(true);
		wenHaoBtn.loadTextures("btn_jiangchi_1.png", "btn_jiangchi_2.png", "btn_jiangchi_3.png", ccui.Widget.PLIST_TEXTURE);
		wenHaoBtn.x =sp.getContentSize().width/2+30*10+17;
		wenHaoBtn.y =0;
		wenHaoBtn.addClickEventListener(function() {
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			jiangChiXinXi.createJiangChiXinXiLayer(self._parent);
		})
		
		this.addChild(wenHaoBtn,10,10);

	},
	setJiangChiParent : function(parent) {
		this._parent = parent;
	},
	initZhi : function(num) {
		var str = numStr.toString();
		var len = str.length;
		for (var i = len; i < 10; i++) {
			str = "0".concat(str);
		};
		for ( var i in this.nodeArr) {
			this.nodeArr[i].initZhi(str[i]);
		};
	},
	sheZhiStr : function(numStr) {
		var str = numStr.toString();
		var len = str.length;
		for (var i = len; i < 10; i++) {
			str = "0".concat(str);
		};
		for ( var i in this.nodeArr) {
			this.nodeArr[i].sheZhiZhi(str[i]);
		};
	},

});
var aJiangChiNode = cc.Node.extend({
	_itemY : 0,//显示出来的数字的上一个的y坐标
	_itemCY : 0,//最下面的数字的y坐标
	_itemZY : 0,//显示出来的y坐标
	_item : null,//显示出来的lable
	_itemYS : [],
	_itemList : [],
	_itemZhi : null,
	_stopZhi : null,
	a : 0,
	_items :[{name : "0",shuZhi : 0},{name : "1",shuZhi : 1},{name : "2",shuZhi : 2},{name : "3",shuZhi : 3},{name : "4",shuZhi : 4},{name : "5",shuZhi : 5},{name : "6",shuZhi : 6},{name : "7",shuZhi : 7},{name : "8",shuZhi : 8},{name : "9",shuZhi : 9}],
	ctor : function() {
		this._super();
		this._itemList = [];
		var backGround = cc.Sprite.createWithSpriteFrameName("jc_shuziBg.png");
		this.addChild(backGround,0,10);

		var la = new ccui.Layout;
		la.setClippingEnabled(true);
		la.setContentSize(cc.size(30, 40));  
		la.x = -10;
		la.y = -16.5;
		this.addChild(la);

		for (var i = 0; i <this._items.length; i++) {
			//cc.log("this._items.length",this._itemList.length);
			var array_element = this._items[i].name;
			var text = new cc.LabelBMFont(array_element,"res/shz/TanChuCeng/tanChuCengRes/jiangchi_number.fnt");
			text.setPosition(cc.p(13, -i* text.height + text.height/2));  
			this._itemYS[i] = -i* text.height + text.height/2;
			la.addChild(text);
			this._itemList[i] = text;
			if (i == 0) {
				this._itemCY =  -9* text.height + text.height/2;
				this._itemY =(3*text.height)/2;
				this._itemZY = text.height/2;
				this._item = text;
			}
		};
		//this.scheduleUpdate();
	},
	setSpriteBg : function(nide) {
		var self = this;
		self.getChildByTag(10).setVisible(nide);
	},
	sheZhiZhi : function(can) {
		this._stopZhi = can;
		this.scheduleUpdate();
	},
	update : function() {
		for (var i = 0; i < this._itemList.length; i++) {
			var array_element = this._itemList[i];

			if (array_element.y>=this._itemZY && array_element.y>= this._itemY ) {
				if (array_element.getString() == this._stopZhi) {
					//cc.log("this._stopZhi",this._stopZhi, this._itemList.length);	
					this.unscheduleUpdate();
					this._item = array_element;
					for (var j = 0; j <  this._itemList.length; j++) {
						this._itemList[j].y = this._itemYS[j];
					}
					array_element.runAction(cc.sequence(
							cc.moveBy(0.1, 0, 6),
							cc.moveBy(0.1, 0, -6)
					));
					break;
				}
			}
			if (array_element.y>= this._itemY) {
				array_element.y =this._itemCY;
				this._itemList.shift();
				this._itemList.push(array_element);
			};
			array_element.y+=6;
		}
	},
	creatAnode  : function() {

	},
});
//JiangChi = new jiangChiNode();//使用全局变量，因为在游戏场景也要用到它
//JiangChi.retain();
//JiangChi.setAnchorPoint(0.5, 0.5);
//JiangChi.x = 400;
//JiangChi.y = 535;

