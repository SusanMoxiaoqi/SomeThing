choujiang = null;
var chouJiangLayer = cc.LayerColor.extend({
	_pais : [],
	_paiRects : [],
	_xuanPaiIndex : 0,
	_beginPos : null,
	_isAllowTouch : true,
	_touchTuichu : false,
	_myLable : null,
	_caiFuFrame : ["cj_caifu1.png","cj_caifu2.png","cj_caifu2.png","cj_caifu2.png","cj_caifu3.png"],
	_Halo : null,
	_chouJiangBei : [],
	_cunzaiHalo : 0,
	_icon : 0,
	_index : 0,
	_beishu : 0,
		ctor:function (parame) { 
			cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/chouJiang.plist");
			this._super(cc.color(0,0,0,150));
			this.initLayer(parame);
			return true;
		},
		initLayer : function(parame) {		
			var self = this;
			choujiang = this;
		
			this._touchTuichu = false;
			this._cunzaiHalo = 0;
			this._icon = parame.icon;
			this._index = parame.index;
			this._beishu = parame.beishu;
			this._chouJiangBei = [];
			cc.log("this._icon,this._index,this._beishu",this._icon,this._index,this._beishu)
			for (var i = 0; i < chouJiangPeiZhi[this._icon].length; i++) {
				var array_element = chouJiangPeiZhi[this._icon][i];
				if (i == this._index) {
					continue;
				};
				this._chouJiangBei.push(array_element);
			}
			for (var i = 0; i < 3; i++) {
				var sp = new cc.Sprite("#cj_paiBeiMian.png");
				sp.x = cc.winSize.width/2-330+330*i;
				sp.y = cc.winSize.height/2;
				sp.setName("sprite"+i);
				this.addChild(sp);
				var rect = sp.getBoundingBox();
				this._paiRects[i] = rect;
				this._pais[i] = sp;
			};
			var TouchListener = cc.EventListener.create({  
				swallowTouches: true,  
				event: cc.EventListener.TOUCH_ONE_BY_ONE,  
				onTouchBegan:this._onTouchBegan,  
				onTouchMoved:this._onTouchMoved,  
				onTouchEnded:this._onTouchEnded  
			});  
			cc.eventManager.addListener(TouchListener, this)
			var myLabel = new cc.LabelTTF('请点击屏幕继续', 'Times New Roman', 32, cc.size(320,35), cc.TEXT_ALIGNMENT_CENTER);
			self._myLable = myLabel;
			myLabel.setColor(cc.color(100, 100, 100, 255));
			myLabel.x = cc.winSize.width/2;
			myLabel.y = 100;
			myLabel.setVisible(false);
			myLabel.runAction(cc.sequence(
					cc.fadeIn(1.0),
					cc.fadeOut(1.0)
					).repeatForever());
			this.addChild(myLabel);
			
		},
		touBeganIs : false,
		_onTouchBegan : function(touch,event) {
			if(choujiang.touBeganIs){
				return true;
			}
			
			var target = event.getCurrentTarget();
			var locationInNode = target.convertToNodeSpace(touch.getLocation());
			//鼠标点击在目标对象内
			if (target._touchTuichu) {
				return true;
			};
			if (target._cunzaiHalo >0) {
				return true;
			};
			for (var i = 0; i < target._paiRects.length; i++) {
				var array_element = target._paiRects[i];
				cc.log("x,y,width,height",array_element.x,array_element.y,array_element.width,array_element.height);
				if (cc.rectContainsPoint(array_element, locationInNode)) {
					var halo = new cc.Sprite("#halo.png");
					target._Halo = halo;
					target._xuanPaiIndex = i;
					halo.x = array_element.width/2;
					halo.y = array_element.height/2;
					target._pais[i].addChild(halo,0,100);
					target._cunzaiHalo ++;
					break;
				};
			}
			return true;
		},
		_onTouchMoved : function(touch,event) {
			
		},
		_onTouchEnded : function(touch,event) {
			if(choujiang.touBeganIs){
				return true;
			}
			var target = event.getCurrentTarget();
			if (target._touchTuichu) {
				var ybtx = new cc.ParticleSystem("res/shz/MainGameScene/YB.plist");
				ybtx.x = cc.winSize.width/2,
				ybtx.y = cc.winSize.height;
				mainScene_this.addChild(ybtx,111,111);
				mainScene_this._isybtx = true;
				target.removeFromParent(true);
				return true;
			};
		
			
			var locationInNode = target.convertToNodeSpace(touch.getLocation());
			var array_element = target._paiRects[target._xuanPaiIndex];
			var xuanPai = target._pais[target._xuanPaiIndex];
			if (!cc.rectContainsPoint(array_element, locationInNode)) {
				if (target._cunzaiHalo>0) {
					target._Halo.removeFromParent(true);
					target._cunzaiHalo = 0;
					return true;
				}
				return true;
			};	
			cc.log("target._cunzaiHalo",target._cunzaiHalo);
			if (target._cunzaiHalo > 1) {
				return true;
			}
			target._cunzaiHalo ++;
			choujiang.touBeganIs = true;
			xuanPai.runAction(cc.sequence(
					cc.scaleBy(0.5, 0.001, 1),
					cc.callFunc(function() {
						cc.audioEngine.playEffect(Effect_res.choujiang_fankai);
						this.setSpriteFrame("cj_paiZhnegMian.png");
						var guang = new cc.Sprite("#cj_liangguang.png");
						guang.x = array_element.width/2;
						guang.y = array_element.height/2+40;
						this.addChild(guang);
						guang.runAction(cc.rotateBy(2.0, 90, 90).repeatForever());
						var caifu = new cc.Sprite("#"+target._caiFuFrame[target._index]);
						caifu.x = array_element.width/2;
						caifu.y = array_element.height/2+40;
						this.addChild(caifu);
						
						var num = chouJiangPeiZhi[target._icon][target._index]*target._beishu;
						cc.log("%%%%%%%%",target._icon,target._index,target._beishu);
						var str = "+";
						if (num<10000) {
						str = str + num.toString() +"两";
						}else {
						num = num/10000;
						str = str + num.toString() + "万两"
						}
						var jine = new cc.LabelBMFont(str,"res/shz/MainGameScene/card_number.fnt");
						jine.x = array_element.width/2;
						jine.y = 50;
						this.addChild(jine);
					}, xuanPai),
					cc.scaleBy(0.5, 1000, 1),
					cc.callFunc(function() {
						for (var NI = 0; NI < this._pais.length; NI++) {
							if (NI == this._xuanPaiIndex) {
								continue;
							};
							var array_element = this._pais[NI];
							var array_elementRect = target._paiRects[NI];
							array_element.runAction(cc.sequence(
									cc.scaleBy(0.5, 0.001, 1),
									cc.callFunc(function() {
										this.setSpriteFrame("cj_paiZhnegMian.png");
										var length = target._chouJiangBei.length;
										cc.log("target._chouJiangBei.length",target._chouJiangBei,target._chouJiangBei.length);
										var index = Math.floor(Math.random()*length);
										var caifu = new cc.Sprite("#"+target._caiFuFrame[index]);
										caifu.x = array_elementRect.width/2;
										caifu.y = array_elementRect.height/2+40;
										this.addChild(caifu);	
										var num = target._chouJiangBei[index]*target._beishu;
										cc.log("num%%%%%%",num);
										var str = "+";
										if (num<10000) {
											str = str + num.toString() +"两";
										}else {
											num = num/10000;
											str = str + num.toString() + "万两"
										}
										var jine = new cc.LabelBMFont(str,"res/shz/MainGameScene/card_number.fnt");
										jine.x = array_element.width/2;
										jine.y = 50;
										this.addChild(jine);
									}, array_element), 
									cc.scaleBy(0.5, 1000, 1)
									));
						}
					}, target),
					cc.callFunc(function() {//所有动画执行完后，显示文本"请点击屏幕继续"，点击屏幕可以退出当前层，
						target._touchTuichu = true;
						target._myLable.setVisible(true);
						choujiang.touBeganIs = false;
					}, target)
					));
		},
		unuse : function() {
			cc.log("unuse");
			this.removeFromParent(false);
			cc.log("unuse%%%%%%%1 "+new Date());
			this.setLocalZOrder(-2);
			cc.log("unuse%%%%%%%2 "+new Date());
			this.setVisible(false);
			cc.log("unuse%%%%%%%3 "+new Date());
			cc.eventManager.removeListener(this);
			cc.log("unuse%%%%%%%4 "+new Date());
			this._chouJiangBei = null;
			cc.log("unuse%%%%%%%5 "+new Date());
			//cc.audioEngine.playEffect(Effect_res.quanpanYuanbao, true);
			cc.audioEngine.playEffect(Effect_res.zhuanDong, true);
			
			cc.log("unuse%%%%%%%6 "+new Date());
//			this.retain();
			cc.log("unuse%%%%%%%7 "+new Date());
		},
		reuse : function(parame) {
			cc.spriteFrameCache.addSpriteFrames("res/shz/MainGameScene/chouJiang.plist");
			this.setVisible(true);
			this.setLocalZOrder(101);
			this.initLayer(parame);
		},
		onEnter:function(){
			this._super();
			var self = this;
		},
		onExit : function() {
			this._super();	
			cc.audioEngine.playMusic(Music_res.quanpanYuanbao, true);
			var numberAry =["res/shz/MainGameScene/chouJiang"];
			removeResources(numberAry);
			this._chouJiangBei = null;
		}

	});

chouJiangLayer.create = function(parame){
	if (cc.pool.hasObject(chouJiangLayer)) {
			cc.log("已存在");
			return cc.pool.getFromPool(chouJiangLayer,parame);	
		}else{
			cc.log("重新创建");
			var jiangLayer = new chouJiangLayer(parame);
			mainScene_this.addChild(jiangLayer,101,112);
			return jiangLayer;
		};
	};
