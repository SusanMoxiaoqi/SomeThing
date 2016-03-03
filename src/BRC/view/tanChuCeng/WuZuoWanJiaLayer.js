//无座玩家
var brc = brc || {};
brc.wuzuowanjia = brc.BaseLayer.extend({
	_rootNode : null,
	_wuzuoText : null,//无座玩家个数
	_container : null,
	_scrollView : null,
	_wuzuoCellArray : [],
	_isWuoZuoOpen : false,
	_wuzuoTextFnt : null,
	ctor:function(){
		this._super();
		this.init();
	},
	init : function () {
		this._isWuoZuoOpen = true;
		cc.spriteFrameCache.addSpriteFrames("res/br_res/baiRenTanChuRes/WuZuoWanJia.plist");
		var rootNode = new ccs.load("res/br_res/WuZuoWanJia.json").node;
		rootNode.x = cc.winSize.width/2;
		rootNode.y = cc.winSize.height/2;
		this._rootNode = rootNode;
		this.addChild(rootNode,0,1);
		
		//无座玩家的人数
		var wuzuoText = rootNode.getChildByName("wuzuo_peopleCount");
		wuzuoText.setVisible(false);
		
		//玩家金额
		var wuzuoTextFnt = cc.LabelBMFont("0", "res/shz/TanChuCeng/tanChuCengRes/number_xshd.fnt");
		wuzuoTextFnt.x = wuzuoText.x;
		wuzuoTextFnt.y = wuzuoText.y;
		rootNode.addChild(wuzuoTextFnt,10);
		this._wuzuoTextFnt = wuzuoTextFnt;
		
		//玩家信息node
		var container = new cc.Node();
		this._container = container;
		
		//无座玩家信息
		this.createWuZuoPlayer();
		var self = this;
		
		//关闭按钮点击
		var quit = ccui.helper.seekWidgetByName(rootNode, "wuzuowanjia_quit");
		quit.addClickEventListener(function() {
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			self._isWuoZuoOpen = false;
			for(var i = 0;i < self._wuzuoCellArray.length;i++){
				cc.pool.putInPool(self._wuzuoCellArray[i]);
				self._wuzuoCellArray[i].removeFromParent(false);
			}
			self._wuzuoCellArray.splice(0, self._wuzuoCellArray.length);
			var numberAry =["res/br_res/baiRenTanChuRes/WuZuoWanJia"];
			removeResources(numberAry);
			self.removeChildByTag(1);
			self.removeFromParent(false);
		});
	},
	
	//创建无座玩家
	createWuZuoPlayer : function() {
		var self = this;
		cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/touXiangVip.plist");
		var wuzuodataArray = brc.Object._wuZuoWeiWanJia;
		if(!wuzuodataArray){
			return;
		}
		for(var i = 0;i < self._wuzuoCellArray.length;i++){
			cc.pool.putInPool(self._wuzuoCellArray[i]);
			self._wuzuoCellArray[i].removeFromParent(false);
		}
		self._wuzuoCellArray.splice(0, self._wuzuoCellArray.length);
		//无座玩家人数
		self._wuzuoTextFnt.setString(wuzuodataArray.length);
		
		//无座玩家行数
		var lineCount = Math.floor(wuzuodataArray.length/3);
		for(var i = 0;i < wuzuodataArray.length;i++){
			//无座玩家单元
			var cell = brc.wuzuowanjiacell.create();
			cell.x = 98 + 212*(i%3);
			if(lineCount <= 3){
				cell.y = 75*lineCount - 32 - 75*Math.floor(i/3) + (4-lineCount)*75;
			}else{
				cell.y = 75*lineCount - 32 - 75*Math.floor(i/3);
			}
			cell.setCellMsg(wuzuodataArray[i]);
			self._container.addChild(cell,10);
			self._wuzuoCellArray.push(cell);
		}
		brc.cleanArray.push(self._wuzuoCellArray);
		//玩家信息scrollView
		if(!self._scrollView){
			self._scrollView = new ccui.ScrollView();
			self._scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
			self._scrollView.setTouchEnabled(true);
			self._scrollView.setBounceEnabled(true);
			self._scrollView.setContentSize(cc.size(620, 304));
			self._scrollView.anchorX = 0.5;
			self._scrollView.anchorY = 0.5;
			self._scrollView.x = 0;
			self._scrollView.y = -56;
			self._rootNode.addChild(self._scrollView,9);
			self._scrollView.addChild(self._container,10);
		}
		self._scrollView.setInnerContainerSize(cc.size(620, 75*lineCount));
	},
});
