
gongGao = {
		
		creatGonggaoLayer : function(self) {
		cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/GongYong.plist");
		var	webViewId = -1;
		var size = cc.winSize;
		var rootSet = new cc.Sprite("#gonggaoBg.png");
		rootSet.x = size.width/2;
		rootSet.y = size.height/2;
		var zhezhao = TestPushBox.create(rootSet);
		self.addChild(zhezhao,1001);
		
		var tuichu = new ccui.Button;
		tuichu.loadTextures("btn_gonggao_up.png", "btn_gonggao_down.png", "btn_gonggao_down.png", ccui.Widget.PLIST_TEXTURE);
		tuichu.setNormalizedPosition(0.95, 0.96);
		rootSet.addChild(tuichu);
		tuichu.addClickEventListener(function() {
			cc.log("tuichu");
			cc.pool.putInPool(zhezhao);
			
			if (sys.os == sys.OS_IOS) {
				var ret = jsb.reflection.callStaticMethod("shangCheng", 
						"removeGongGaoWebView"
				); 
			}else if(sys.os == sys.OS_ANDROID){
				jsb.reflection.callStaticMethod("org/cocos2dx/lib/Cocos2dxWebViewHelper", "removeWebView", "(I)V", webViewId);
			};
		});
		
		
		var sign = hex_md5( USER_zhangHao + hex_md5(USER_szPassword));
		var webUrl = "http://m1-web.baiyishuihu.com/notice/shz_notice.html";
		cc.log(webUrl);
		if (sys.os == sys.OS_IOS) {
			cc.log("是ios平台");
			var ret = jsb.reflection.callStaticMethod("shangCheng", 
					"CreatGongGaoWebviewWithURL:",
					webUrl
			); 
		}else if(sys.os == sys.OS_ANDROID){
			var left = (236.500/1136.00)*cc.view.getFrameSize().width;
			var top = (141.500/640.00)*cc.view.getFrameSize().height;
			var width = (668.00/1136.00)*cc.view.getFrameSize().width;
			var height = (390.00/640.00)*cc.view.getFrameSize().height;
			webViewId = jsb.reflection.callStaticMethod("org/cocos2dx/lib/Cocos2dxWebViewHelper", "createWebView", "()I");
			if(webViewId < 0) return ;
			jsb.reflection.callStaticMethod("org/cocos2dx/lib/Cocos2dxWebViewHelper", "setWebViewRect", "(IIIII)V", webViewId,parseInt(left),parseInt(top),parseInt(width),parseInt(height));
			jsb.reflection.callStaticMethod("org/cocos2dx/lib/Cocos2dxWebViewHelper", "loadUrl", "(ILjava/lang/String;)V", webViewId, webUrl);

		};
		
		
		
		}
		
}