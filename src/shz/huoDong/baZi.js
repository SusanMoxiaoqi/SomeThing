var baZi = baZi || {};
baZi.Node = cc.Node.extend({
	xueTiao_1 : ["xueTiao_0.png","xueTiao5_1.png","xueTiao5_2.png","xueTiao5_3.png","xueTiao5_4.png","xueTiao5_5.png"],//前排靶子血条图片
	xueTiao_2 : ["xueTiao_0.png","xueTiao10_1.png","xueTiao10_2.png","xueTiao10_3.png","xueTiao10_4.png","xueTiao10_5.png","xueTiao10_6.png","xueTiao10_7.png","xueTiao10_8.png","xueTiao10_9.png","xueTiao10_10.png"],//后排靶子血条图
	rootNode : null,//界面node
	baZiType : 0,//靶子的类型
	zongXueLiang : 0,//靶子总血量
	residueXueLiang : 0, //剩余血量
	sprite_bg : null,//靶子精灵
	xueTiao : null,//血条精灵
	baZiDaoLe : null,//靶子倒了动画
	penZhuangQu : null,//靶子的碰撞区域
	fengShu : null,//当前的分数
	baZiJiFeng : null,//
	radius : 0,//碰撞的半径区
	time : 0 ,//定时器时间
	tiShiYu : null,//提示语
	node_idx : 0,//创建靶子识别符号
	lieWen : null,//靶子的裂纹效果
	jiFengShu : null,
	ctor : function(Data) {
		this._super();
		
		baZi.self = this;
		this.init(Data);
	},
	//初始化
	init : function(Data) {
		var self = this;
		self.rootNode = new ccs.load("res/shz/huoDong/baZi_Node.json").node; 
		self.rootNode.anchorX = 0.5;
		self.rootNode.anchorY = 0.5;
		self.rootNode.x = cc.winSize.width/2;
		self.rootNode.y = cc.winSize.height/2;
		this.addChild(self.rootNode,0,1);
		cc.spriteFrameCache.addSpriteFrames("res/shz/huoDong/JF_tu.plist");
		cc.spriteFrameCache.addSpriteFrames("res/shz/huoDong/baZiTeXiao.plist");
		self.sprite_bg = self.rootNode .getChildByName("baZi_tu");
		self.xueTiao = self.rootNode .getChildByName("xueCao_tu");
		
		if(Data.type == 1){
			this.baZiType = 1;
			self.tiShiYu = cc.Sprite.createWithSpriteFrameName("JF_shuoHua.png");
			self.tiShiYu.x = 80;
			self.tiShiYu.y = 100;
			self.xueTiao.y = self.xueTiao.y-10;
		}else if(Data.type == 2){
			this.baZiType = 2;
			self.tiShiYu = cc.Sprite.createWithSpriteFrameName("JF_laiA.png");
			self.tiShiYu.x = -80;
			self.tiShiYu.y = 100;
			self.xueTiao.y = self.xueTiao.y-20;
		}
		self.jiFengShu = cc.LabelBMFont("+1000","res/shz/xiaomali.fnt");
		self.jiFengShu.setScale(0.3)
		self.rootNode.addChild(self.jiFengShu ,5,100);
		self.jiFengShu.setVisible(false);
		self.rootNode.addChild(self.tiShiYu , 0 ,5);
		self.tiShiYu.setVisible(false);
		this.setBaZiDiTuAndXueTiao(1);
		this.scheduleUpdate();
	},
	//定时器每贞检测碰撞
	update : function(dt) {  
		this.time += dt;//dt为每一帧执行的时间，把它加起来等于运行了多长时间  
		var self = this;
		if(huoDong_JF.self.JF_jianAry.length>0){
			if(self.residueXueLiang <= 0 ){
			
				this.unscheduleUpdate();
			}else if(self.residueXueLiang > 0){
				for ( var key in huoDong_JF.self.JF_jianAry) {
					var point_jian = huoDong_JF.self.JF_jianAry[key].jianPengZhuangQu.convertToWorldSpace( huoDong_JF.self.JF_jianAry[key].jianPengZhuangQu.getPosition());
					var selfPoint = self.penZhuangQu.convertToWorldSpaceAR(self.penZhuangQu.getPosition());
					var distance = cc.pDistance(point_jian, cc.p(selfPoint.x + cc.winSize.width/2,	selfPoint.y + cc.winSize.height/2));  
					cc.p(point_jian.x, (point_jian.y+75*huoDong_JF.self.JF_jianAry[key].feiXingBiLiZhi))
					var radiusSum = self.radius +  huoDong_JF.self.JF_jianAry[key].radius;  
					if(distance < radiusSum){  
						var action = cc.RotateBy(0.05, 5, 5);
						var action1 = cc.RotateBy(0.05, -5, -5);
						this.sprite_bg.stopAllActions();
						this.sprite_bg.runAction(cc.sequence(action,action.reverse() ,action1, action1.reverse(),action,action.reverse() ,action1, action1.reverse()));
						huoDong_JF.self.JF_jianAry[key].jianRemove(key);
						self.setBaZiDiTuAndXueTiao(2, huoDong_JF.self.xiaoHaoNengLiang);
						this.sprite_bg.setRotation(0);
					}  
				} 
			}
		}
	},
	//更改血条数
	setXueLiang: function() {
		var self =this;
		self.residueXueLiang = self.zongXueLiang;
	},
	//更具不同状态更改人物底图和血条
	setBaZiDiTuAndXueTiao : function(state,damage) {//参数state：调用状态  damage: 伤害
		var self = this;
		if(state == 1){
			
			if(self.baZiType == 1){
					self.sprite_bg.setSpriteFrame("bazi-b-01.png");
					self.xueTiao.setSpriteFrame("xueTiao10_10.png");
					self.lieWen = cc.Sprite.createWithSpriteFrameName("JF_bigLieWen1.png");
					self.lieWen.x = self.sprite_bg.width/2+2;
					self.lieWen.y = self.sprite_bg.height/2-11;
			}else if(self.baZiType == 2){
					self.sprite_bg.setSpriteFrame("bazi-s-01.png");
					self.xueTiao.setSpriteFrame("xueTiao5_5.png");
					self.lieWen = cc.Sprite.createWithSpriteFrameName("JF_liewen_1.png");
					self.lieWen.x = self.sprite_bg.width/2+2;
					self.lieWen.y = self.sprite_bg.height/2-9;
					this.baZiType = 2;
			}
			self.lieWen.setVisible(false);
			self.sprite_bg.addChild(self.lieWen , 0 ,6);
			self.creatPengZhuangQu(self.sprite_bg.getContentSize().width/2);
		}else if(state == 2){
			
			if(self.residueXueLiang && damage){
				if(self.residueXueLiang > 0){
					self.residueXueLiang -= damage;
					if(self.residueXueLiang>0){
						cc.audioEngine.playEffect(Effect_res.JF_jiZhong);
					}
					
				}
				if(self.residueXueLiang <= 0){
					self.createBaiZiDale();
					self.xueTiao.setSpriteFrame(self.xueTiao_2[0]);
					return;
				}
			}else if(!self.residueXueLiang && damage){
				self.residueXueLiang = self.zongXueLiang - damage;
			}
			if(self.baZiType == 1){
				if(self.residueXueLiang/50<10){
					var number = Math.floor(self.residueXueLiang/50);
					self.xueTiao.setSpriteFrame(self.xueTiao_2[number]);
					if(number <= 9 && number>=5 ){
						self.lieWen.setVisible(true);
						self.lieWen.setSpriteFrame("JF_bigLieWen1.png");
					}else if(number<5){
						self.lieWen.setVisible(true);
						self.lieWen.setSpriteFrame("JF_bigLieWen2.png");
					}
					
				}else{
					self.xueTiao.setSpriteFrame("xueTiao10_10.png");
				}
			}else if(self.baZiType == 2){
				if(self.residueXueLiang/50<5){
					var number = Math.floor(self.residueXueLiang/50);
					self.xueTiao.setSpriteFrame(self.xueTiao_1[number]);
					if(number <= 4 && number>=3 ){
						self.lieWen.setVisible(true);
						self.lieWen.setSpriteFrame("JF_liewen_1.png");
					}else if(number<3){
						self.lieWen.setVisible(true);
						self.lieWen.setSpriteFrame("JF_liewen_2.png");
					}
				}else{
					self.xueTiao.setSpriteFrame("xueTiao5_5.png");
				}
			}
			
		}
	
	},
	//检测靶子空血后动画
	createBaiZiDale : function() {
		var self = this;
		self.sprite_bg.stopAllActions();
		self.jiFengShu.setString("+"+self.fengShu);
		self.jiFengShu.setVisible(true);
		var action4 = cc.Sequence(
				cc.scaleBy(0.2,3.5),
				cc.MoveTo(0.6,cc.p(self.jiFengShu.x, self.jiFengShu.y+100)),
				cc.callFunc(function (nodeExecutingAction, value) {
					self.jiFengShu.y -=100;
					self.jiFengShu.setScale(0.3);
				}, this));
		self.jiFengShu.runAction(action4);
		if(!self.baZiDaoLe){
			var animate;
			if(self.baZiType == 1){
				animate = Producer.ProduceFrameAnimation("JF_bigBaZiZa_", 8, 10, 0.1);
			}else if(self.baZiType == 2){
				animate = Producer.ProduceFrameAnimation("JF_BaZiZa_", 8, 10, 0.1);
			}
			self.baZiDaoLe = cc.Sequence(
					cc.callFunc(function (nodeExecutingAction, value) {
						self.lieWen.setVisible(false);
						cc.audioEngine.playEffect(Effect_res.JF_baoZha);
						if(self.baZiType == 1){
							if(self.fengShu){
								huoDong_JF.self.zongDeFeng += self.fengShu;
							}
							self.sprite_bg.y -= 220;
							huoDong_JF.youXiDeFeng.setString(huoDong_JF.self.zongDeFeng);
							loginServer.sendMessage(103,7,{dwUserID : USER_dwUserID , 
								dwEnergy : huoDong_JF.self.dangQianNengLiang ,
								lScore : huoDong_JF.self.zongDeFeng});
							huoDong_JF.self.houPaiSuiLiBaZi++;
							houPaiBa--;
						}else if(self.baZiType == 2){
							self.sprite_bg.y -= 228;
							if(self.fengShu){
								huoDong_JF.self.zongDeFeng += self.fengShu;
							}
							huoDong_JF.youXiDeFeng.setString(huoDong_JF.self.zongDeFeng);
							loginServer.sendMessage(103,7,{dwUserID : USER_dwUserID , 
								dwEnergy : huoDong_JF.self.dangQianNengLiang ,
								lScore : huoDong_JF.self.zongDeFeng});
							huoDong_JF.self.qianPaiSuiLiBaZi++;
							qianPaiBa--;
						}
						slocal.setItem("JF_ZDF",huoDong_JF.self.zongDeFeng);
//						var number1 =  huoDong_JF.self.qianPaiBaiZiGeShu + huoDong_JF.self.houPaiBaZiGeShu;
						var number = houPaiBa + qianPaiBa;
						huoDong_JF.xianShiShengYuBa.setString( number);
						//创建宝箱
						var number =Math.floor( Math.random()*100);
						cc.log("$$$$$$$$$$$$$$",number);
//						huoDong_JF.self.chuXianBaoXiang(self.baZiType , self.node_idx , 2);
						if(baoXiangjiShu <= 15){
							if(number <= 4){
								huoDong_JF.self.runYiJianTeXiao(true);
								var number1 = Math.floor( Math.random()*10);
								cc.log("$$$$$$$$$$$$$$22",number1);
								baoXiangjiShu++;
								cc.log("创建宝箱");
								if(number1 == 1 || number1 == 2){
									huoDong_JF.self.chuXianBaoXiang(self.baZiType , self.node_idx , 2);
								}else{
									huoDong_JF.self.chuXianBaoXiang(self.baZiType , self.node_idx , 1);
								}
							}
						}
						
                     
					}, this),
					animate,
					cc.callFunc(function (nodeExecutingAction, value) {
						self.baZiDaoLe.retain();
						self.rootNode.setVisible(false);
						
					}, this));
			self.sprite_bg.runAction(self.baZiDaoLe);
		}else{
			self.sprite_bg.runAction(self.baZiDaoLe);
		}
		
	},
	//收集靶子信息
	shouJiCanXeBaZi : function() {
		var self = this ;
		var baZiZhuangTai = null;
		if(self.baZiType == 1){
			if(self.residueXueLiang>0 && self.residueXueLiang<huoDong_JF.self.houPaiBaZiShuXing.dwBlood ){
				huoDong_JF.self.canXueBaZiQianPaiXueLiang.push(self.residueXueLiang);
			}
		}else if(self.baZiType == 2){
			if(self.residueXueLiang>0 && self.residueXueLiang<huoDong_JF.self.qianPaiBaZiShuXing.dwBlood ){
				huoDong_JF.self.canXueBaZiHouPaiXueLiang.push(self.residueXueLiang);
			}
		}
		
	},
	//耙子重新出现重置状态
	chongZhiBaZi : function(idx) {
		var self = this;
		self.rootNode.setVisible(true);
		self.tiShiYu.setVisible(false);
		self.setRotation(0);
		self.sprite_bg.y = -130.5;
		self.jiFengShu.setVisible(false);
		if(self.baZiType == 1){
			self.lieWen.setSpriteFrame("JF_bigLieWen1.png");
			self.lieWen.setVisible(false);
			if(huoDong_JF.self.canXueBaZiQianPaiXueLiang.length>0){
				self.houPaiBaZiFaSheng = null;
//				var number = 25-huoDong_JF.self.houPaiBaZiZongShu ;
				var idx = parseInt(Math.random()*(100-1+1)+1)-1; 
				if(!huoDong_JF.self.canXueBaZiQianPaiXueLiang[idx]){
					self.residueXueLiang = self.zongXueLiang;
					self.xueTiao.setSpriteFrame("xueTiao10_10.png");
				}else {
					var baZiZhuangTai = huoDong_JF.self.canXueBaZiQianPaiXueLiang[idx];
					self.residueXueLiang = baZiZhuangTai;
					cc.log("残血值：："+ self.residueXueLiang)
					self.xueTiao.setSpriteFrame(self.xueTiao_2[self.residueXueLiang/50]);
					var number = self.residueXueLiang/50;
					
					if(number >9 ){
						self.lieWen.setSpriteFrame("JF_bigLieWen1.png");
						self.lieWen.setVisible(false);
					}else  if(number <= 9 && number>=5 ){
						self.lieWen.setVisible(true);
						self.lieWen.setSpriteFrame("JF_bigLieWen1.png");
					}else if(number<5){
						self.lieWen.setVisible(true);
						self.lieWen.setSpriteFrame("JF_bigLieWen2.png");
					}
					huoDong_JF.self.canXueBaZiQianPaiXueLiang.splice(idx, 1);
				}
			}else{
				self.residueXueLiang = self.zongXueLiang;
				self.xueTiao.setSpriteFrame("xueTiao10_10.png");
			}
		}else if(self.baZiType == 2){
			self.qianPaiBaZiFaSheng = null;
			self.lieWen.setVisible(false);
			self.lieWen.setSpriteFrame("JF_liewen_1.png");
			if(huoDong_JF.self.canXueBaZiHouPaiXueLiang.length>0){
				var idx = parseInt(Math.random()*(100-1+1)+1)-1; 
				cc.log("随机数：："+ idx + "数组长度：：" + huoDong_JF.self.canXueBaZiHouPaiXueLiang.length);
				if(!huoDong_JF.self.canXueBaZiHouPaiXueLiang[idx]){
					self.residueXueLiang = self.zongXueLiang;
					self.xueTiao.setSpriteFrame("xueTiao5_5.png");
				}else {
					var baZiZhuangTai = huoDong_JF.self.canXueBaZiHouPaiXueLiang[idx];
					self.residueXueLiang = baZiZhuangTai;
					cc.log("残血值：："+ self.residueXueLiang);
					self.xueTiao.setSpriteFrame(self.xueTiao_1[self.residueXueLiang/50]);
					var number = self.residueXueLiang/50;
					if(number>4 ){
						self.lieWen.setVisible(false);
						self.lieWen.setSpriteFrame("JF_liewen_1.png");
						
					}else if(number <= 4 && number>=3 ){
						self.lieWen.setVisible(true);
						self.lieWen.setSpriteFrame("JF_liewen_1.png");
					}else if(number<3){
						self.lieWen.setVisible(true);
						self.lieWen.setSpriteFrame("JF_liewen_2.png");
					}
					huoDong_JF.self.canXueBaZiHouPaiXueLiang.splice(idx, 1);
				}
			}else{
			self.residueXueLiang = self.zongXueLiang;
			self.xueTiao.setSpriteFrame("xueTiao5_5.png");
			}
		}
		self.scheduleUpdate();
		
	},
	//创建碰撞区域
	creatPengZhuangQu : function(width) {
		var self = this;
		self.penZhuangQu = new cc.DrawNode();
		this.addChild(self.penZhuangQu, 10);
		var winSize = cc.winSize;
		if(self.baZiType == 1){
			self.penZhuangQu.drawDot(cc.p(winSize.width / 2, winSize.height / 2-10), width, cc.color(0, 0, 255, 128));
			self.radius = width;
		}else{
			self.penZhuangQu.drawDot(cc.p(winSize.width / 2, winSize.height / 2-10), width, cc.color(0, 0, 255, 128));
			self.radius = width;
		}
		self.penZhuangQu.setVisible(false);
	},
	onExit : function() {
		this._super();
		this.baZiDaoLe = null;
		this.unscheduleUpdate();
	}
}); 

