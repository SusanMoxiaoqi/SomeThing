var sheZhi = {
		creatSheZhiLayer : function(self) {
//			var MusicVolue = slocal.getItem(musicKEY) || 1;
//			var EffectVolue = slocal.getItem(effectKEY) || 1;
			var size = cc.winSize;
			var rootSet = ccs.load("res/shz/TanChuCeng/setting.json").node;
			rootSet.x = size.width/2;
			rootSet.y = size.height/2;
			var zhezhao = TestPushBox.create(rootSet);
			self.addChild(zhezhao,100);
			var queren = ccui.helper.seekWidgetByName(rootSet, "Button_2");
			queren.addClickEventListener(function() {
				cc.log("queren");
				cc.pool.putInPool(zhezhao);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/jc_sz_ts_xt"];
				removeResources( numberAry);
			});
			var yinyueBtn = rootSet.getChildByName("yinyueSwitch");
		
			yinyueBtn.addClickEventListener(function() {
				if (MusicVolue == 1) {
					MusicVolue = 0;
					slocal.setItem(musicKEY,MusicVolue);
					this.loadTextures("SZ_off.png", "SZ_off.png", "SZ_off.png", ccui.Widget.PLIST_TEXTURE);	
					cc.audioEngine.setMusicVolume(MusicVolue);
				} else {
					MusicVolue = 1;
					slocal.setItem(musicKEY,MusicVolue);
					cc.audioEngine.setMusicVolume(MusicVolue);
					this.loadTextures("SZ_on.png", "SZ_on.png", "SZ_on.png", ccui.Widget.PLIST_TEXTURE);	
				}

			});
			var yinxiaoBtn = rootSet.getChildByName("yinxiaoSwitch");
			yinxiaoBtn.addClickEventListener(function() {
				if (EffectVolue == 1) {
					EffectVolue = 0;
					cc.audioEngine.setEffectsVolume(EffectVolue);
					slocal.setItem(effectKEY,EffectVolue);
					this.loadTextures("SZ_off.png", "SZ_off.png", "SZ_off.png", ccui.Widget.PLIST_TEXTURE);	
				} else {
					EffectVolue = 1;
					slocal.setItem(effectKEY,EffectVolue);
					cc.audioEngine.setEffectsVolume(EffectVolue);
					this.loadTextures("SZ_on.png", "SZ_on.png", "SZ_on.png", ccui.Widget.PLIST_TEXTURE);
				}

			});
			
			if (MusicVolue == 0) {
				yinyueBtn.loadTextures("SZ_off.png", "SZ_off.png", "SZ_off.png", ccui.Widget.PLIST_TEXTURE);	
			}else{
				yinyueBtn.loadTextures("SZ_on.png", "SZ_on.png", "SZ_on.png", ccui.Widget.PLIST_TEXTURE);	
			} ;
			if (EffectVolue == 0) {
				yinxiaoBtn.loadTextures("SZ_off.png", "SZ_off.png", "SZ_off.png", ccui.Widget.PLIST_TEXTURE);
			}else{
				yinxiaoBtn.loadTextures("SZ_on.png", "SZ_on.png", "SZ_on.png", ccui.Widget.PLIST_TEXTURE);	
			}
			var cellPhone = rootSet.getChildByName("cellPhone");
			cellPhone.addClickEventListener(function() {
				if (sys.os == sys.OS_IOS) {
					cc.log("是ios平台");
					isWifiNetwork = jsb.reflection.callStaticMethod("shangCheng", "keFuDianHua:","4000371814");
				}else if(sys.os == sys.OS_ANDROID){
					jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "callTelPhone", "()V");
				};
			});
		},

};