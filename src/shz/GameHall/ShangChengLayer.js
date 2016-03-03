var ShangChengLayer = cc.Layer.extend({  
	self : null,
	ctor:function(){
		this._super();
		
		self = this;
		var sp = new cc.Sprite("res/shz/webView/webViewBg.png");
		sp.setPosition(568, 320);
		self.addChild(sp,1);
		var back_sp = new ccui.Button(); 
		back_sp.setTouchEnabled(true);
		back_sp.loadTextures("res/shz/webView/webViewBack.png", "res/shz/webView/webViewBack.png");
		back_sp.x =back_sp.getContentSize().width/2;
		back_sp.y =640-back_sp.getContentSize().height/2;
		back_sp.addClickEventListener(function() {
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			self.removeFromParent(true);
		})
		self.addChild(back_sp,2);
		
		return true;
	},
	onEnter:function(){
		this._super();
		zuZhiBack = true;
		cc.audioEngine.playMusic(Music_res.daTing, true);
		
		var listener1 = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				return true;
			},
			onTouchMoved: function (touch, event) {
			},
			onTouchEnded: function (touch, event) {
			}
		});		
		cc.eventManager.addListener(listener1, this);
	},
	onExit:function(){
		this._super();
		zuZhiBack = false;
	}
});

shangCheng = {
		creatChongZhiLayer : function(parent) {
			cc.log("USER_zhangHao,USER_szPassword",USER_zhangHao,USER_szPassword);
			var sign = hex_md5( USER_zhangHao + hex_md5(USER_szPassword));
			var webUrl = "http://m1-web.baiyishuihu.com/index.php/Web/Shopstore/getshopdata.php?userid="+USER_dwUserID+"&sign="+sign;
			cc.log(webUrl);
			if (sys.os == sys.OS_IOS) {
				cc.log("是ios平台");
				var ret = jsb.reflection.callStaticMethod("shangCheng", 
						"CreatShangChengWebViewWithURL:",
						webUrl
				); 
			}else if(sys.os == sys.OS_ANDROID){
				var shangchenglayer = new ShangChengLayer();
				parent.addChild(shangchenglayer, 999999, 10);
				var webViewId = jsb.reflection.callStaticMethod("org/cocos2dx/lib/Cocos2dxWebViewHelper", "createWebView", "()I");
				cc.log("wedViewId+++++++++++++",webViewId);
				if(webViewId < 0) return ;
				jsb.reflection.callStaticMethod("org/cocos2dx/lib/Cocos2dxWebViewHelper", "setScalesPageToFit", "(IZ)V", webViewId, true);
				jsb.reflection.callStaticMethod("org/cocos2dx/lib/Cocos2dxWebViewHelper", "loadUrl", "(ILjava/lang/String;)V", webViewId, webUrl);

			};
		}
};
