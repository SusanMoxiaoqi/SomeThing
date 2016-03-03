br_qushi = {
		_beginPos : null,
		_rect_arr : [],
		_mainScrollView : null,
		_visible : true,
		_shuizi : null,
		_shaizi_arr : ["br_qushi_shaizi1.png","br_qushi_shaizi2.png","br_qushi_shaizi3.png","br_qushi_shaizi4.png","br_qushi_shaizi5.png","br_qushi_shaizi6.png"],
		_shaizi_bg : null,
		_qushiData : [],
		_getIndex : -1,
		_isShow : false,
		creatQuShiLayer : function() {
			
			var length1 =  brc.Object._qushiData.length;
			for (var int = length1-1; int >= 0; int--) {
				this._qushiData.push(brc.Object._qushiData[int]);
			};
			cc.log("??????????????????????????",this._qushiData.toSource());
			cc.spriteFrameCache.addSpriteFrames("res/br_res/baiRenTanChuRes/br_qushi.plist");
			var parent = cc.director.getRunningScene();
			var size = cc.winSize;
			var qushi_rootNode = new cc.Node();
			var zhezhao = TestPushBox.create(qushi_rootNode);
			parent.addChild(zhezhao,10);
			var qushi_bg = new cc.Sprite("#br_qushi_bg.png");
			qushi_bg.setPosition(size.width/2, size.height/2);
			qushi_rootNode.addChild(qushi_bg);
			
			
			var chaBtn = new ccui.Button();
			chaBtn.loadTextures("br_qushi_x1.png", "br_qushi_x1.png", "br_qushi_x1.png", ccui.Widget.PLIST_TEXTURE);
			chaBtn.setPosition(970, 430);
			qushi_bg.addChild(chaBtn,0,20);
			chaBtn.addClickEventListener(function() {
				br_qushi._isShow = false;
				cc.pool.putInPool(zhezhao);
				var oe = br_qushi._qushiData.pop();
				while (oe) {
					oe = br_qushi._qushiData.pop();
				};
				var oer = br_qushi._rect_arr.pop();
				while (oer) {
					oer = br_qushi._rect_arr.pop();
				};
				cc.spriteFrameCache.removeSpriteFrameByName("res/br_res/baiRenTanChuRes/br_qushi.plist");
				cc.textureCache.removeTextureForKey("res/br_res/baiRenTanChuRes/br_qushi.png")
			});
			
			this.creatMainInterface(qushi_bg);
			this.creatDuihua();
			var touchNode = new cc.Node();
			qushi_rootNode.addChild(touchNode, 1, 20);
			qushi_rootNode.scheduleOnce(function() {
				var TouchListener = cc.EventListener.create({  
					swallowTouches: false,  
					event: cc.EventListener.TOUCH_ONE_BY_ONE,  
					onTouchBegan:br_qushi._onTouchBegan,  
					onTouchMoved:br_qushi._onTouchMoved,  
					onTouchEnded:br_qushi._onTouchEnded  
				});  
				cc.eventManager.addListener(TouchListener, touchNode);
			}, 0.02);
			this._isShow = true;
		},
		/**触摸事件*/
		_onTouchBegan : function(touch,event) {
			br_qushi._getIndex = -1;
			var target = event.getCurrentTarget();
			
			var TAG = target.getTag();
			var pos1 = 	br_qushi._mainScrollView.convertTouchToNodeSpace(touch);//触摸点在当前节点的位置
			var pos2 =  br_qushi._mainScrollView.getInnerContainer().getPosition();//scrollview的偏移量
			var pos = cc.pSub(pos1, pos2);//触摸点在节点布局上的位置
			for (var int = 0; int < br_qushi._qushiData.length; int++) {
				eleRect = br_qushi._rect_arr[int].rect;
				if (cc.rectContainsPoint(eleRect, pos)) {
					br_qushi._getIndex = int;
					br_qushi._getKuang.setVisible(true);
					br_qushi._getKuang.setPosition(eleRect.x+eleRect.width/2,eleRect.y+eleRect.height/2);
					break;
				};
			};
			return true;
		},
		_onTouchMoved : function(touch,event) {
			if (br_qushi._getIndex == -1) {
				return;
			}
			var target = event.getCurrentTarget();
			var TAG = target.getTag();
		//	br_qushi._beginPos = touch.getLocation();
			
			var pos1 = 	br_qushi._mainScrollView.convertTouchToNodeSpace(touch);//触摸点在当前节点的位置
			var pos2 =  br_qushi._mainScrollView.getInnerContainer().getPosition();//scrollview的偏移量
			var pos = cc.pSub(pos1, pos2);//触摸点在节点布局上的位置
			var len = br_qushi._qushiData.length;
			for (var int = 0; int < len; int++) {
				eleRect = br_qushi._rect_arr[int].rect;
				if (cc.rectContainsPoint(eleRect, pos)) {
					br_qushi._getIndex = int;
					br_qushi._getKuang.setVisible(true);
					br_qushi._getKuang.setPosition(eleRect.x+eleRect.width/2,eleRect.y+eleRect.height/2);
					break;
				};
				if (int == len-1) {
					br_qushi._getKuang.setVisible(false);
				}
			};
		},
		_onTouchEnded : function(touch,event) {
			br_qushi._getKuang.setVisible(false);
			var target = event.getCurrentTarget();
			var TAG = target.getTag();
			var posLoc = touch.getLocation();

			var pos1 = 	br_qushi._mainScrollView.convertTouchToNodeSpace(touch);//触摸点在当前节点的位置
			var pos2 =  br_qushi._mainScrollView.getInnerContainer().getPosition();//scrollview的偏移量
				var pos = cc.pSub(pos1, pos2);//触摸点在节点布局上的位置
				for (var int = 0; int < br_qushi._qushiData.length; int++) {
					eleRect = br_qushi._rect_arr[int].rect;
					if (cc.rectContainsPoint(eleRect, pos)) {
						var dataEle =  br_qushi._qushiData[int];
						br_qushi._getKuang.setVisible(true);
						br_qushi._getKuang.setPosition(eleRect.x+eleRect.width/2,eleRect.y+eleRect.height/2);

						br_qushi._shaizi_bg.setVisible(true);
						br_qushi._shaizi_bg.x = eleRect.x+eleRect.width-30;
						br_qushi._shaizi_bg.y = eleRect.y+eleRect.height;
						br_qushi._shaizi_bg.stopAllActions();
						br_qushi._shaizi_bg.setScale(0.01, 0.01);
						br_qushi._shaizi_bg.runAction(cc.sequence(
								cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeOut(1.0)),
								cc.scaleTo(0.08, 1.0, 1.0).easing(cc.easeOut(1.0))
						));
						if (dataEle) {
							var left = dataEle[0];
							var right = dataEle[1];						
							var shaiziL = br_qushi._shaizi_bg.getChildByTag(1);
							shaiziL.setSpriteFrame(br_qushi._shaizi_arr[left-1])
							var shaiziR = br_qushi._shaizi_bg.getChildByTag(2);
							shaiziR.setSpriteFrame(br_qushi._shaizi_arr[right-1])
						};
						break;
					};
				};
		
		},
		creatDuihua : function() {
			var shaizi_bg = new cc.Sprite("#br_qushi_kuang.png");
			shaizi_bg.stopAllActions()
			shaizi_bg.setVisible(false);
			this._shaizi_bg = shaizi_bg;
			this._mainScrollView.addChild(shaizi_bg, 100, 10);
			shaizi_bg.setAnchorPoint(0, 0);
			var shaiziL = new cc.Sprite("#"+br_qushi._shaizi_arr[0]);
			shaiziL.setScale(0.5, 0.5);
			shaiziL.setPosition(30, 40);
			shaizi_bg.addChild(shaiziL,1,1);
			var shaiziR = new cc.Sprite("#"+br_qushi._shaizi_arr[0]);
			shaiziR.setScale(0.5, 0.5);
			shaiziR.setPosition(75, 40);
			shaizi_bg.addChild(shaiziR,0,2);
			
			var getkuang = new cc.Sprite("#br_qushi_get.png");
			getkuang.setVisible(false);
			this._getKuang = getkuang;
			this._mainScrollView.addChild(getkuang, 0, 9);
		},
		//创建主界面
		creatMainInterface : function(parent) {
			var size = cc.winSize;
			var scrollView = new ccui.ScrollView();
			this._mainScrollView = scrollView;
			scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
			scrollView.setTouchEnabled(false);
			scrollView.setBounceEnabled(true);
			scrollView.setContentSize(cc.size(1000, 445));
			var scrollViewSize = scrollView.getContentSize();
			var bianJu = 100;
			scrollView.x = 65;
			scrollView.y = 60;
			parent.addChild(scrollView,0,10);
			var qushiNodeNumber = br_qushi._qushiData.length;
			
			var num = 0;
			for (var int = 0; int < 3; int++) {
				cc.log("<<<<<<<<<<<<<<<<<<",qushiNodeNumber,Math.pow(-1, int));
				for (var int2 = 0; int2 < 10; int2++) {
					var geizi_bg = new cc.Sprite("#br_qushi_fangge1.png");
					var bg_size = geizi_bg.getContentSize();
					geizi_bg.setAnchorPoint(0, 1);
					var pow = Math.pow(-1, int);
					var geizi_bgX;
					if (pow == -1) {
						geizi_bgX =  90*int2;
					} else {
						geizi_bgX =  90*(9-int2);//90*int2;
					};
					var geizi_bgY =scrollViewSize.height -( bianJu + 110*int);
					geizi_bg.x = geizi_bgX;
					geizi_bg.y = geizi_bgY;
					scrollView.addChild(geizi_bg,num+1,num);
					
					var rect = cc.rect(geizi_bgX, geizi_bgY- bg_size.height, bg_size.width, bg_size.height);
					var ele = {node : geizi_bg,rect : rect};
					this._rect_arr.push(ele);
					
					var jindu = new cc.Sprite("#br_qushi_heng1.png");
					if (pow == -1) {
						jindu.setAnchorPoint(0, 0.5);
						jindu.setPosition(bg_size.width-2, 56);
						if (int2 == 9) {
							jindu.setRotation(90);
							jindu.setPosition(bg_size.width/2, 2);
						}
					} else if(pow == 1){
						jindu.setAnchorPoint(1, 0.5);
						jindu.setPosition(2, 56);
						if (int2 == 9) {
							jindu.setRotation(-90);
							jindu.setPosition(bg_size.width/2, 2);
						}
					}
					if (num == 29) {
						jindu.setVisible(false);
					}
					geizi_bg.addChild(jindu,1,1);		
	
					
					var dataEle =  br_qushi._qushiData[num];
					if (num ==0) {
						var xin = new cc.Sprite("#br_qushi_xin.png");
						xin.x = 10;
						xin.y = bg_size.height-5;
						geizi_bg.addChild(xin,1,2);
						xin.schedule(function() {
							xin.runAction(cc.sequence(
									cc.scaleTo(0.1, 1.6, 1.6).easing(cc.easeOut(1.0)),
									cc.scaleTo(0.05, 1.0, 1.0).easing(cc.easeOut(1.0)),
									cc.scaleTo(0.1, 1.2, 1.2).easing(cc.easeOut(1.0)),
									cc.scaleTo(0.05, 1.0, 1.0).easing(cc.easeOut(1.0))
									));
						}, 3.0, cc.REPEAT_FOREVER, 0.1);
					};
					if (dataEle) {
						var left = dataEle[0];
						var right = dataEle[1];
						var sum = left+right;
						if (num != br_qushi._qushiData.length-1) {
							jindu.setSpriteFrame("br_qushi_jindu.png");
						};
						
						if (sum < 7) {
							geizi_bg.setSpriteFrame("br_qushi_xiao.png");
							if (left == right) {
								var duizi = new cc.Sprite("#br_qushi_landui.png");
								duizi.anchorX = 0;
								duizi.anchorY = 0;
								geizi_bg.addChild(duizi,1,3);
							};
						} else if(sum == 7) {
							geizi_bg.setSpriteFrame("br_qushi_he.png");
						} else if (sum > 7) {
							geizi_bg.setSpriteFrame("br_qushi_da.png");
							if (left == right) {
								var duizi = new cc.Sprite("#br_qushi_hongdui.png");
								duizi.anchorX = 0;
								duizi.anchorY = 0;
								geizi_bg.addChild(duizi,1,3);
							};
						}
					};
					num = num + 1;
					
				}
			}
			scrollView.setInnerContainerSize(cc.size(1000, 445));
		},
		refreshQushi : function(eleData) {
			if (this._isShow == false) return;
			if (br_qushi._qushiData.length >= 30) {
				br_qushi._qushiData.pop();
			};
			br_qushi._qushiData.unshift(eleData);
			br_qushi._rect_arr.forEach(function (qushiNode,num) {//
				var geizi_bg = qushiNode.node;
				var jindu = geizi_bg.getChildByTag(1);
				if (geizi_bg.getChildByTag(3) != null) {
					geizi_bg.removeChildByTag(3);
				};
				var dataEle =  br_qushi._qushiData[num];
				if (dataEle) {
					var left = dataEle[0];
					var right = dataEle[1];
					var sum = left+right;
					if (num != br_qushi._qushiData.length-1) {
						jindu.setSpriteFrame("br_qushi_jindu.png");
					};

					if (sum < 7) {
						geizi_bg.setSpriteFrame("br_qushi_xiao.png");
						if (left == right) {
							var duizi = new cc.Sprite("#br_qushi_landui.png");
							duizi.getChildByTag(1)
							duizi.anchorX = 0;
							duizi.anchorY = 0;
							geizi_bg.addChild(duizi,1,3);
						};
					} else if(sum == 7) {
						geizi_bg.setSpriteFrame("br_qushi_he.png");
					} else if (sum > 7) {
						geizi_bg.setSpriteFrame("br_qushi_da.png");
						if (left == right) {
							var duizi = new cc.Sprite("#br_qushi_hongdui.png");
							duizi.anchorX = 0;
							duizi.anchorY = 0;
							geizi_bg.addChild(duizi,1,3);
						};
					}
				};
				if (num == 0) {
					geizi_bg.setScale(0.1, 0.1);
					geizi_bg.runAction(cc.sequence(
							cc.scaleTo(0.5, 1.3, 1.3).easing(cc.easeOut(1.0)),
							cc.scaleTo(0.1, 1.0, 1.0).easing(cc.easeOut(1.0))
							));
				}
			});
		}
}

