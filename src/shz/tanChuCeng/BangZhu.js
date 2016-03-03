var bangZhu = {
		_parent : null,
		dotArr : [],
		dot_select : null,
		lastIndex : 0,
		pageView : null,
		isTouch : false,
		creatBangZhuLayer : function(self) {
	
			var size = cc.winSize;
			cc.spriteFrameCache.addSpriteFrames("res/shz/GameHall/bangZhu/helpBG1.plist");
			cc.spriteFrameCache.addSpriteFrames("res/shz/GameHall/bangZhu/helpBG2.plist");
			bangZhu._parent = self;
			bangZhu.pageView = new ccui.PageView();
			bangZhu.pageView.setCustomScrollThreshold(0.01 * size.width);
			bangZhu.pageView.setTouchEnabled(true);
			bangZhu.pageView.setContentSize(size);
			bangZhu.pageView.setFocused(true);
			bangZhu.pageView.x = 0;
			bangZhu.pageView.y = 0;
			bangZhu.initPageView(bangZhu.pageView);
//			var zhezhao = TestPushBox.create(bangZhu.pageView);
			self.addChild(bangZhu.pageView,100);
			//分页视图下的小按钮
			for (var i = 0; i < 6; i++) {
				var dot = cc.Sprite.createWithSpriteFrameName("dian_weixuanzhong.png");
				dot.attr({
					x : cc.winSize.width/2-52+35*i,
					y : 20
				});
				this.dotArr[i] = cc.winSize.width/2-52+35*i;
				bangZhu.pageView.addChild(dot);
			}

			this.dot_select = cc.Sprite.createWithSpriteFrameName("dian_xuanzhong.png");
			this.dot_select.x = this.dotArr[0];
			this.dot_select.y = 20;
			bangZhu.pageView.addChild(this.dot_select,1);
			
			var left_button = new ccui.Button;
			left_button.loadTextures("help_left.png", "help_left.png", "help_left.png", ccui.Widget.PLIST_TEXTURE);
			left_button.x = 25;
			left_button.y = cc.winSize.height/2;
            left_button.addClickEventListener(function() {
            	
            	cc.audioEngine.playEffect(Effect_res.bangzhu_fanye);
            	if(!bangZhu.isTouch){
            		bangZhu.isTouch = true;
            	}
            	bangZhu.lastIndex = bangZhu.pageView.getCurPageIndex();
            	if(bangZhu.lastIndex == 0){
            		bangZhu.pageView.scrollToPage(5);
            		bangZhu.lastIndex = bangZhu.pageView.getCurPageIndex();
            		bangZhu.dot_select.setPositionX(bangZhu.dotArr[bangZhu.pageView.getCurPageIndex()]);
            	}else{
            		bangZhu.pageView.scrollToPage(bangZhu.lastIndex-1);
            		bangZhu.lastIndex = bangZhu.pageView.getCurPageIndex();
            		bangZhu.dot_select.setPositionX(bangZhu.dotArr[bangZhu.pageView.getCurPageIndex()]);
            	}
            	
			});
            bangZhu.pageView.addChild(left_button, 2, 15);
			
            var right_button = new ccui.Button;
            right_button.loadTextures("help_right.png", "help_right.png", "help_right.png", ccui.Widget.PLIST_TEXTURE);
            right_button.x = cc.winSize.width - 25;
            right_button.y = cc.winSize.height/2;
            right_button.addClickEventListener(function() {
            	cc.audioEngine.playEffect(Effect_res.bangzhu_fanye);
            	if(!bangZhu.isTouch){
            		bangZhu.isTouch = true;
            	}
            	bangZhu.lastIndex = bangZhu.pageView.getCurPageIndex();
            	if(bangZhu.lastIndex == 5){
            		bangZhu.pageView.scrollToPage(0);
            		bangZhu.lastIndex = bangZhu.pageView.getCurPageIndex();
            		bangZhu.dot_select.setPositionX(bangZhu.dotArr[bangZhu.pageView.getCurPageIndex()]);
            	}else{
            		bangZhu.pageView.scrollToPage(bangZhu.lastIndex+1);
            		bangZhu.lastIndex = bangZhu.pageView.getCurPageIndex();
            		bangZhu.dot_select.setPositionX(bangZhu.dotArr[bangZhu.pageView.getCurPageIndex()]);
            	}
            	
            });
            bangZhu.pageView.addChild(right_button, 2, 16);
			
			//差号返回按钮
			var xBack_button = new ccui.Button;
			xBack_button.loadTextures("btn_helpclose_1.png", "btn_helpclose_3.png", "btn_helpclose_3.png", ccui.Widget.PLIST_TEXTURE);
			xBack_button.addClickEventListener(function() {
				cc.log("success");
				bangZhu.lala = 1 ;
				if(bangZhu.isTouch){
					bangZhu.isTouch = false;
				}
				self.removeChild(bangZhu.pageView);
//				cc.pool.putInPool(zhezhao);
				var numberAry =["res/shz/GameHall/bangZhu/helpBG1","res/shz/GameHall/bangZhu/helpBG2"];
				removeResources(numberAry);
//				cc.spriteFrameCache.removeSpriteFramesFromFile("res/shz/GameHall/bangZhu/helpBG1.plist");
//				cc.spriteFrameCache.removeSpriteFramesFromFile("res/shz/GameHall/bangZhu/helpBG2.plist");
//				cc.textureCache.removeTextureForKey("res/shz/GameHall/bangZhu/helpBG1.png");
//				cc.textureCache.removeTextureForKey("res/shz/GameHall/bangZhu/helpBG2.png");
			});
			xBack_button.attr({
				x : cc.winSize.width-50,
				y : cc.winSize.height-50
			});
			bangZhu.pageView.addChild(xBack_button, 10);
		},
		initPageView : function(pageView) {
			for (var i = 0; i < 6; ++i) {
				var layout = new ccui.Layout();
				layout.setContentSize(cc.winSize);
				var layoutRect = layout.getContentSize();

				var imageView = new ccui.ImageView();
				imageView.setTouchEnabled(true);
				//imageView.setScale9Enabled(true);
				var str = "helpbg_" + (i+1) +".png";
				imageView.loadTexture(str,ccui.Widget.PLIST_TEXTURE);
				imageView.setContentSize(cc.winSize);
				imageView.x = layoutRect.width / 2;
				imageView.y = layoutRect.height / 2;
				layout.addChild(imageView);
				
				pageView.addPage(layout);
				
			}
			pageView.getCurPageIndex()
			pageView.addEventListener(this.pageViewEvent, this);
		},
		lala:1 ,
		pageViewEvent: function (sender, type) {
			if(bangZhu.isTouch){
				cc.log("@@@@@@@");
				bangZhu.isTouch = false;
				return;
			}
			if(sender.getCurPageIndex() == 0 && bangZhu.lala== 0){
				bangZhu.pageView.scrollToPage(5);
				this.dot_select.setPositionX(this.dotArr[sender.getCurPageIndex()]);
				bangZhu.lala = 1 ;
				return;
			}else if(sender.getCurPageIndex() == 5 && bangZhu.lala== 0){
				bangZhu.pageView.scrollToPage(0);
				this.dot_select.setPositionX(this.dotArr[sender.getCurPageIndex()]);
				bangZhu.lala = 1 ;
				return;
			}
			switch (type) {
			case ccui.PageView.EVENT_TURNING:
				var pageView = sender;
				if (this.lastIndex != sender.getCurPageIndex()) {
					cc.audioEngine.playEffect(Effect_res.bangzhu_fanye);
				};
				this.lastIndex = sender.getCurPageIndex();
				this.dot_select.setPositionX(this.dotArr[sender.getCurPageIndex()]);
				if(this.lastIndex == 0){
					bangZhu.lala= 0;
					return;
				}else if(this.lastIndex == 5){
					bangZhu.lala= 0;
					return;
				}
				bangZhu.lala= 1;
				
				break;
			default:
				break;
			}
		}
};