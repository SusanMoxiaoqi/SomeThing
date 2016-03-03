//var laBaTiao = null;
//var isDianXiaoLaBa = true;
//var laBaTiaoLayer = cc.Layer.extend({
//		clipper : null,
//		wzText : "",
//		self : null,
//		ctor : function() {
//			this._super();
//			cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/jc_sz_ts_xt.plist");
//			if(isDianXiaoLaBa){
//				var gonggaoLan  =  cc.Sprite.createWithSpriteFrameName("laba_bg.png");
//				gonggaoLan.x = cc.winSize.width/2;
//				gonggaoLan.y = cc.winSize.height+gonggaoLan.getContentSize().height/2 ;
//				this.addChild(gonggaoLan,1,10);
//				laBaTiao =this;
//				var laBaBtn = new ccui.Button();
//				laBaBtn.setTouchEnabled(true);
//				laBaBtn.loadTextures("laba_1.png", "", "laba_2.png", ccui.Widget.PLIST_TEXTURE);
//				laBaBtn.x =30;
//				laBaBtn.y =20;
//				laBaBtn.addClickEventListener(function() {
//					laBaBtn.setBright(false);
//					laBaBtn.setTouchEnabled(false);
//					if(laBaTiao.getChildByTag(10)){
//						laBaTiao.removeChildByTag(10);
//					}
//					this.clipper = 1;
//					laBaTiao.unschedule(laBaTiao.updata);
//					laBaTiao = null;
//					isDianXiaoLaBa = false;
//				})
//				gonggaoLan.addChild(laBaBtn,10,10);
//				laBaTiao.schedule(laBaTiao.updata,1);
//			}
//			return true;
//
//		},
//		updata : function(){
//			if(this.wzText == "" && laBaStringArray.length>0 ){
//				var gonggaoLan = laBaTiao.getChildByTag(10);
//				gonggaoLan.runAction(cc.Sequence(cc.MoveTo(1,cc.p(cc.winSize.width/2,cc.winSize.height-gonggaoLan.getContentSize().height/2 ))));
//				if(laBaStringArray[0]){
//					this.laBaTiaoLayer(laBaStringArray[0]);
//				}
//				laBaStringArray.splice(0,1);
//			}
//		},
//		laBaTiaoLayer : function( stringText ){
//			if(this.wzText == ""){
//				var gonggaoLan = laBaTiao.getChildByTag(10);
//				//创建裁剪节点
//				if(!this.clipper){
//					this.clipper = new cc.ClippingNode();
//					this.clipper.width = gonggaoLan.width-65;
//					this.clipper.height = gonggaoLan.height+30;
//					this.clipper.x = gonggaoLan.width/2+25;
//					this.clipper.y = gonggaoLan.height/2-5;
//					this.clipper.anchorX = 0.5;
//					this.clipper.anchorY =0.5;
//					gonggaoLan.addChild(this.clipper,2,100);
//					//绘制节点
//					var stencil = new cc.DrawNode();
//					var rectangle = [cc.p(0, 0),cc.p(this.clipper.width, 0),
//					                 cc.p(this.clipper.width, this.clipper.height),
//					                 cc.p(0, this.clipper.height)];
//					var white = cc.color(255, 255, 255, 255);
//					stencil.drawPoly(rectangle, white, 1, white);
//					this.clipper.stencil = stencil;
//				}
//				//创建文字Lable
//				var size = this.clipper.getContentSize();
//				if(this.wzText){
//					this.wzText.setString(stringText);
//				}else{
//					this.wzText =  cc.LabelTTF(stringText, "Arial",20);
//					this.wzText.x = size.width;
//					this.wzText.y = 30;
//					this.wzText.anchorX = 0;
//					this.wzText.anchorY =0;
//					this.clipper.addChild(this.wzText,1);
//				}
//				//文字滚动
//				var action1 = cc.Sequence(
//						cc.MoveTo(10,cc.p(-this.wzText.width, 30)),
//						cc.callFunc(function (nodeExecutingAction, value) {
//							laBaTiao.wzText.setString("");
//							laBaTiao.wzText = "";
//							laBaTiao.wzText.x = size.width;
//							laBaTiao.wzText.y = 30;
//							gonggaoLan.runAction(cc.Sequence(cc.MoveTo(1,cc.p(cc.winSize.width/2,cc.winSize.height+gonggaoLan.getContentSize().height/2 ))));
//						}, this)
//				);
//				this.wzText.runAction(action1);
//
//
//			}
//		}
//
//});

labaXiaoxi = {
		newsArr : [],
		_wzText : null,
		_speed : 180,
		_isAction : false,
		_widthClip : 1,
		_wztextPos : null,
		_diKuang : null,
		_diKuangPos : null,//底框原始位置
		_disDi : 0,//底框移动的距离，相当于他的高度
	    _allowAddStr : true,
		creatLabaLayer : function(parent,zOrder,tag) {
			if(!this._allowAddStr){
				return;
			};
			this._isAction = false;
			var ele = this.newsArr.pop();
			while (ele) {
				ele = this.newsArr.pop();
			}
			cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/jc_sz_ts_xt.plist");
			var gonggaoLan  =  new cc.Sprite("#laba_bg.png");
			this._diKuang = gonggaoLan;
			this._diKuangPos = cc.p(cc.winSize.width/2,cc.winSize.height);
			this._disDi = gonggaoLan.getContentSize().height;
			gonggaoLan.anchorX = 0.5;
			gonggaoLan.anchorY = 0;
			gonggaoLan.x = cc.winSize.width/2;
			gonggaoLan.y = cc.winSize.height;//+gonggaoLan.getContentSize().height/2 ;
			parent.addChild(gonggaoLan,zOrder,153);
			var laBaBtn = new ccui.Button();
			laBaBtn.setTouchEnabled(true);
			laBaBtn.loadTextures("laba_1.png", "", "laba_2.png", ccui.Widget.PLIST_TEXTURE);
			laBaBtn.x =30;
			laBaBtn.y =20;
			gonggaoLan.addChild(laBaBtn);
			laBaBtn.addClickEventListener(function() {
				gonggaoLan.removeFromParent(true);
				labaXiaoxi._allowAddStr = false;
				var ele = labaXiaoxi.newsArr.pop();
				while (ele) {
					ele = labaXiaoxi.newsArr.pop();
				}
			});
			var lanSize = gonggaoLan.getContentSize();
			var clipnN = new ccui.Layout;
			clipnN.setClippingEnabled(true);
			clipnN.setContentSize(lanSize.width - 50, lanSize.height);
			this._widthClip = lanSize.width - 50;
			clipnN.anchorX = 0;
			clipnN.anchorY = 0;
			clipnN.x = 50;
			clipnN.y = 0;
			gonggaoLan.addChild(clipnN);
			var wzText = new  cc.LabelTTF("", "Arial",22);
			this._wzText = wzText;
			wzText.anchorX = 0;
			wzText.anchorY = 0.5;
			wzText.x = lanSize.width;
			wzText.y = lanSize.height/2;
			this._wztextPos = cc.p(lanSize.width, lanSize.height/2);
			clipnN.addChild(wzText);	
			gonggaoLan.schedule(this.update, 0.1, cc.REPEAT_FOREVER, 0.1);
		},
		update : function() {
			if (labaXiaoxi.newsArr.length == 0) {
				return;
			};
			if (labaXiaoxi._isAction) {
				return;
			}; 
			var size = cc.winSize;
			this.stopAllActions()
			this.runAction(
					cc.moveTo(0.5, labaXiaoxi._diKuangPos.x, labaXiaoxi._diKuangPos.y - labaXiaoxi._disDi)
					);
			var newsStr = labaXiaoxi.newsArr.shift();
			labaXiaoxi._wzText.setString(newsStr.toString());
			var moveLength = labaXiaoxi._wzText.getContentSize().width + labaXiaoxi._widthClip;
			cc.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLupdate",moveLength,labaXiaoxi._wzText.getContentSize().width,labaXiaoxi._widthClip);
			var duration = moveLength/labaXiaoxi._speed;
			labaXiaoxi._isAction = true;
			labaXiaoxi._wzText.runAction(
					cc.sequence(
							cc.moveBy(duration, -moveLength, 0),
							cc.callFunc(function() {
								labaXiaoxi._isAction = false;
								labaXiaoxi._wzText.setPosition(labaXiaoxi._wztextPos);
								labaXiaoxi._diKuang.stopAllActions()
								labaXiaoxi._diKuang.runAction(
										cc.moveTo(0.5, labaXiaoxi._diKuangPos)
								);
							}, this)
					));
		},
		addDataTonewsArr : function(dataStr) {
			if(!this._allowAddStr){
				return;
			};
			this.newsArr.push(dataStr);
		}
}