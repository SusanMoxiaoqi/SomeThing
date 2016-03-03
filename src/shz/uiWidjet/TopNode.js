
var topNode = {
		_rootNode : null,
		_fanhuiButton : null,
		_jiangquanButton : null,
		_chongzhiButton : null,
		_shezhiButton : null,
		_jietuButton : null,
		_parent : null,
		_xuanxiangBg : null,
		_xuanXiangBtn : null,
		_bangZhuBtn : null,
		_isVisible : false,
		ctor : function() {
			
		},
		 creatSceneTopNode : function(fileName,parent) {
			 topNode._isVisible = false;
			 this._rootNode = ccs.load(fileName).node;
			 this._jiangquanButton = ccui.helper.seekWidgetByName(this._rootNode, "First_jiangquanBtn");//Text_jiangquan
			 var jiangQuan  = this._jiangquanButton.getChildByName("Text_jiangquan");
			 jiangQuan.setVisible(false);
			this._chongzhiButton = ccui.helper.seekWidgetByName(this._rootNode, "First_chongzhiBtn");
			this._chongzhiButton.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
			});
			this._xuanxiangBg = this._rootNode.getChildByName("xuanxiang_bg_3");
			var xuanXBg = this._xuanxiangBg;
			xuanXBg.setVisible(false);
			topNode._fanhuiButton = ccui.helper.seekWidgetByName(xuanXBg, "First_backBtn");
			//返回按钮
			topNode._fanhuiButton.addClickEventListener(topNode.fanhuifun);
			topNode._shezhiButton = ccui.helper.seekWidgetByName(xuanXBg, "First_shezhiBtn");
			topNode._shezhiButton.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				sheZhi.creatSheZhiLayer(parent);
			});
			topNode._bangZhuBtn = ccui.helper.seekWidgetByName(xuanXBg, "First_bangzhuBtn");
			topNode._bangZhuBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				bangZhu.creatBangZhuLayer(parent);
			});
			topNode._jietuButton = ccui.helper.seekWidgetByName(xuanXBg, "First_jietuBtn");
			topNode._jietuButton.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				FenXiang.creatFenXiangLayer(parent);
			});
			this._xuanXiangBtn = ccui.helper.seekWidgetByName(this._rootNode, "First_xuangxiangBtn");
			this._xuanXiangBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				if (!topNode._isVisible) {
					this.loadTextures("btn_xuanxiang2_1.png", "btn_xuanxiang2_2.png", "btn_xuanxiang2_3.png", ccui.Widget.PLIST_TEXTURE);
					xuanXBg.setVisible(true);
					topNode._isVisible = true;
				}else{
					this.loadTextures("btn_xuanxiang_1.png", "btn_xuanxiang_2.png", "btn_xuanxiang_3.png", ccui.Widget.PLIST_TEXTURE);
					xuanXBg.setVisible(false);
					topNode._isVisible = false;
				}
				
			});
//			this._jietuButton = ccui.helper.seekWidgetByName(this._rootNode, "First_jietuBtn");
			this._parent = parent;
			return this._rootNode;
		},
		setButtonBrightAndTouchEnable : function(bright,enable) {
//			this._jiangquanButton.setBright(bright);
//			this._jiangquanButton.setTouchEnabled(enable);
//			this._chongzhiButton.setBright(bright);
//			this._chongzhiButton.setTouchEnabled(enable);
//			this._xuanXiangBtn.setBright(bright);
//			this._xuanXiangBtn.setTouchEnabled(enable);
		},
		fanhuifun : function(dataCode) {
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			MAINLAYER.release();
			MAINLAYER = null;
			mainScene_this._isFanHui = true;
			cc.pool.removeObject(MySprite);
			mainScene_this.elementArray = [];
			var o = mainScene_this._spritesActions.pop();
			while (o) {
				o.release();
				o = mainScene_this._spritesActions.pop();
			}
			mainScene_this._spritesActions = [];

			mainScene_this.unscheduleAllCallbacks();
			mainScene_this._Mixlayer.setPause();
			mainScene_this._isPause = true;


			//释放资源
			for ( var ip = 0; ip < youxi_resourcesplist.length;ip++) {
				cc.spriteFrameCache.removeSpriteFramesFromFile(youxi_resourcesplist[ip]);
			};
			for (var i = 0; i < youxi_resources.length; i++) {
				cc.textureCache.removeTextureForKey(youxi_resources[i]);
			};

			isAuto = false;
			bounceNumber = 0;
			winScore = 0;
			choujiiangWinScore = 0;
			SocketManager.closeServer(true, false);
			if (dataCode == "loginScene") {
				cc.director.runScene(new loginScene());
			}else{
				cc.director.runScene(new GameHallScene());
			};
		}
		
};

	
