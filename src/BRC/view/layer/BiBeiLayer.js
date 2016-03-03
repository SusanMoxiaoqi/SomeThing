var brc = brc || {};
brc.biBeiView = cc.Layer.extend({
	_rootNode : null,//加载jion的主界面
	_xuanZhuBtn_zu : [],//选注的按钮数组
	_jieMianShaiZi : [],//收集的界面骰子
	_zongYaZhuAry : [],//显示的押注数据
	_selfYaZhuAry : [],//自己押注的数据
	_selfYaZhuDi : [],//自己的押注底图
	_dangQianXiaFeng : null,//当前下分的分数
	_btnTagNumber : 100,//按钮的起始btn值
	_xuanFenBtn : null,//选择下分的按钮
	_shiJianTiShiYu : ["BR_dengDaiYaoShaiZi.png","BR_qingXiaZhu.png","BR_dengDai.png","BR_xiuXi.png"],//不同时间段显示信息
	_SZ_node : null, //上庄列表的节点
	_zuoWeiArray : [],//收集座位数组
	_zhuangTableView : null,//庄家列表tableView
	_shangZhuangBtn : null,//上庄按钮
	_isQuXiao : false,//是否取消上庄
	_biaoqingBool : false,//是否有表情
	_biaoqing : null,//表情框
	_chairIdSelf : -1,//自己的chairid
	_isSendBiaoQing : true,//判断是否可以发送表情
	_biaoqingCount : 0,//发送表情个数
	_zhuangjiaxiazhu : null,//庄家下注
	_shangZhuang_btn : null,//上庄Btn
	_yaZhuBtn : [],//可以押注的所有按钮
	_yiZiSprite : null,//庄家钱数“亿”字
	_shangZhuangTiaojian : null,//上庄限制
	_addShangZhuangBool : false,//是否添加上庄条件
	_winAndLoseNode : null,//连胜连败的node
	_wuzuo : null,//无座玩家界面
	_xuanZhuBtn_Image : ["10","100","1000","10000","100000","1000000","10000000"],//存储选注按钮图片
	_yaoYaoBtn : null,
	_isXiTong : true,
	_daXiaoHeTeXiao : [],
	_quShiZu : [],
	_clipper : null,
	_xuanZhuGuang : [],
	_wzText : "",
	_geRenZiLiao : null,
	_isGeRenShow : false,
	_teXiaoNode : [],
	_wuZuoShu : 0,
	ctor : function(){
		this._super();
		var self = this;
		self.init();
	},
	init : function () {
		var self = this;
		self._rootNode = new ccs.load("res/br_res/BR_BiBei.json").node; 
		self._rootNode.anchorX = 0.5;
		self._rootNode.anchorY = 0.5;
		self._rootNode.x = cc.winSize.width/2;
		self._rootNode.y = cc.winSize.height/2;
		self.addChild(self._rootNode,0,1);
		self._yaDaBtn = self._rootNode.getChildByName("BR_yadaBtn");//押大的按钮
		self._yaDaBtn.quYuZhi = brc.BetArea.ID_BIG_AREA;
		self._yaDaBtn.tag = 500 + 5;
		self._yaDaBtn.quYuJingBi = [];
		self._yaDaBtn.shuiYaZhu = [];
		self._yaDaBtn.yaZhuShu = 0;
		self._yaZhuBtn.push(self._yaDaBtn);
		self._yaHeBtn = self._rootNode.getChildByName("BR_yaHeBtn");//押和的按钮
		self._yaHeBtn.quYuZhi = brc.BetArea.ID_DRAW_AREA;
		self._yaHeBtn.tag = 500+ 6;
		self._yaHeBtn.quYuJingBi = [];
		self._yaHeBtn.shuiYaZhu = [];
		self._yaHeBtn.yaZhuShu = 0;
		self._yaZhuBtn.push(self._yaHeBtn);
		self._yaXiaoBtn = self._rootNode.getChildByName("BR_yaXiaoBtn");//押小的按钮
		self._yaXiaoBtn.quYuZhi = brc.BetArea.ID_SMALL_AREA;
		self._yaXiaoBtn.quYuJingBi = [];
		self._yaXiaoBtn.shuiYaZhu = [];
		self._yaXiaoBtn.yaZhuShu = 0;
		self._yaXiaoBtn.tag = 500 + 7;
		self._yaZhuBtn.push(self._yaXiaoBtn);
		for (var i = 0 ;i<6 ; i++){
			var number = i+1;
			var duiBtn = self._rootNode.getChildByName("BR_dui"+number+"_btn");
			duiBtn.quYuZhi = i+3;
			duiBtn.quYuJingBi = [];
			duiBtn.shuiYaZhu = [];
			duiBtn.yaZhuShu = 0;
			duiBtn.tag = 500 + 8+i;
			self._yaZhuBtn.push(duiBtn);
		}
        self._dieZi = self._rootNode.getChildByName("BR_dieZi");		//桌子上的碟子
        self._dieZi.setVisible(false);
        self._daXiaoHeTeXiao.push(self._rootNode.getChildByName("BR_xiaoShan"),self._rootNode.getChildByName("BR_heShan"),self._rootNode.getChildByName("BR_daShan"));
		for (var i = 0 ;i<6 ; i++){
			var number = i+1;
			var duiShan = self._rootNode.getChildByName("BR_dui"+number+"_shan");
			self._daXiaoHeTeXiao.push(duiShan);
		}
        for ( var key in  self._daXiaoHeTeXiao) {
        	self._daXiaoHeTeXiao[key].setVisible(false);
		}
        self._BR_heguan = self._rootNode.getChildByName("BR_heguan");//荷官
        self._youXiShiJian = self._rootNode.getChildByName("youXiShiJianTu");//界面游戏时间的显示文本
        self._youXiShiJian.setVisible(false);
        self._youXiShiJian.setLocalZOrder(10);
		self._youXiShiJianMiao = new cc.LabelBMFont("","res/br_res/ziTiZiYuan/BR_youXiShiJian.fnt");
		self._youXiShiJianMiao.x = self._youXiShiJian.x + 100;
		self._youXiShiJianMiao.y = self._youXiShiJian.y;
		self._rootNode.addChild(self._youXiShiJianMiao);
		var sheZhi11 = self._rootNode.getChildByName("BR_sheZhi");
		brc.btnDianJI(sheZhi11,function(){
			sheZhi.creatSheZhiLayer(self._rootNode);
		},self);
		self._wuZuoShu = self._rootNode.getChildByName("BR_wuZuoRenDi").getChildByName("wuZuoRenShu");
        var xiaoText =  self._rootNode.getChildByName("BR_yaZhuQian_L").getChildByName("yaFengXiao");//小压分
        self._rootNode.getChildByName("BR_yaZhuQian_L").setLocalZOrder(11);
        var heText = self._rootNode.getChildByName("BR_yaZhuQian_M").getChildByName("yaFengHe");//和压分
        self._rootNode.getChildByName("BR_yaZhuQian_M").setLocalZOrder(11);
        var daText = self._rootNode.getChildByName("BR_yaZhuQian_R").getChildByName("yaFengDa");//大压分
        self._rootNode.getChildByName("BR_yaZhuQian_R").setLocalZOrder(11);
        self._shangZhuang_btn = self._rootNode.getChildByName("BR_shangZhuang_Btn");//游戏界面山庄按钮
        self._shangZhuang_btn.tag = self._btnTagNumber + 8;
        brc.btnDianJI(self._shangZhuang_btn,self.shangZhuang ,self );
        //两组骰子
        self._jieMianShaiZi = [];
        var shaizi =  self._dieZi.getChildByName("BR_leftShazi");//碟子中骰子左
        shaizi.setVisible(false);
        shaizi.y = shaizi.y-5;
        var shaizi1 = self._dieZi.getChildByName("BR_RightShazi");//碟子中骰子右
        shaizi1.setVisible(false);
        shaizi1.y = shaizi1.y-5;
        var array = [self._dieZi.getChildByName("BR_leftShazi"),self._dieZi.getChildByName("BR_RightShazi")];
        var array2 = [self._rootNode.getChildByName("BR_qianshai1"),self._rootNode.getChildByName("BR_qianshai2")];
		for(var key in array2){
			array2[key].setVisible(false);
		}
        self._jieMianShaiZi.push(array,array2);//获取界面上显示的骰子
        self._xuanZhuBtn_zu = [];
        //五个选择押注按钮
		for (var i = 0; i < 5; i++) {
			var btn = self._rootNode.getChildByName("BR_xuanZhong_"+i);
			btn.tag = self._btnTagNumber + 9+i;
			brc.btnDianJI(btn, function() {//选注按钮点击事件
				for ( var key in self._xuanZhuBtn_zu) {
					if(brc.btnTag == self._xuanZhuBtn_zu[key].tag){
						self._xuanZhuBtn_zu[key].loadTextures("BR_anNiu2.png","BR_anNiu2.png","",ccui.Widget.PLIST_TEXTURE)
						self._xuanFenBtn = self._xuanZhuBtn_zu[key];
						self._dangQianXiaFeng = brc.Object._xuanZhuBtnFeng[key];
						for(var key in self._xuanZhuGuang){
							self._xuanZhuGuang[key].setVisible(true);
							self._xuanZhuGuang[key].setPosition(cc.p(self._xuanFenBtn.getPosition()));
						}
					}else{
						self._xuanZhuBtn_zu[key].loadTextures("BR_anNiu1.png","BR_anNiu1.png","",ccui.Widget.PLIST_TEXTURE)
					}
				}

			})
			self._xuanZhuBtn_zu.push(btn);
		}
		var qushiBtn = self._rootNode.getChildByName("BR_qushi");
		brc.btnDianJI(qushiBtn,self.qushiBtnClick ,self );//趋势按钮事件
		var backBtn = self._rootNode.getChildByName("BR_back");
		brc.btnDianJI(backBtn,function(){
			var number = 0;
			for(var key in self._selfYaZhuAry){
				if(self._selfYaZhuAry[key].getString() == "") {
					number++;
				}
			}
			if(number == self._selfYaZhuAry.length){
				cc.director.runScene(new GameHallScene());
			}else{
				var xinxi = {Describe : "现在返回可能会对您造成损失，确定要返回大厅吗？",errorCode : 21,isBack : true};
				var tishi = TiShiKuangZiDingYi.create(xinxi);
				cc.director.getRunningScene().addChild(tishi,1000);
			}

		} ,self );//返回按钮事件
		//创建界面上的座位
		self._yaoYaoBtn = self._rootNode.getChildByName("BR_YaoYao");
		self._yaoYaoBtn.setVisible(false);
		//庄家按钮
		var zhuangjiaBtn = self._rootNode.getChildByName("zhuangTouXiang");
		brc.btnDianJI(zhuangjiaBtn,self.zhuangjiaBtnClick ,self );
		//无座玩家按钮
		var wuzuoBtn = self._rootNode.getChildByName("BR_paiDui");
		//brc.btnDianJI(wuzuoBtn,self.wuzuoBtnClick ,self );
		self.createFntWenJian();
		self.createXuanZhuGuang();
		self.setYaZhuBtnLoad();
		self.isJingYongBtn(false, 5);
		for(var i = 0;i<6;i++ ){
			self._quShiZu.push(self._rootNode.getChildByName("BR_quShiTu_"+i));
		}
		var gonggaoLan = self._rootNode.getChildByName("BR_laBaTiao");
		gonggaoLan.setVisible(false);
		self.schedule(self.laBaShuZuJianCe,1);
		self.fangQingKongShuZu();
	},
	fangQingKongShuZu : function(){
		var self = this;
		brc.cleanArray.push(self._zuoWeiArray);
		brc.cleanArray.push(self._zongYaZhuAry);
		brc.cleanArray.push(self._selfYaZhuDi);
		brc.cleanArray.push(self._selfYaZhuAry);
		brc.cleanArray.push(self._jieMianShaiZi);//放入待清空数组
		brc.cleanArray.push(self._daXiaoHeTeXiao);
		brc.cleanArray.push(self._yaZhuBtn);
		brc.cleanArray.push(self._quShiZu);
	},
	setQuShiShu : function(){
		var self = this;
		for(var key in self._quShiZu){
			var number = brc.Object._qushiData.length - (parseInt(key)+1);
			if(brc.Object._qushiData[number]){
				var number1 = brc.Object._qushiData[number][0] +  brc.Object._qushiData[number][1];
			}
			if(key == 0){
				self._quShiZu[self._quShiZu.length - key-1].setScale(0.1)
				self._quShiZu[self._quShiZu.length - key-1].runAction(cc.scaleTo(0.5,1).easing(cc.easeElasticOut(0.2)));
			}
			if(number1 < 7){
				self._quShiZu[self._quShiZu.length - key-1].setSpriteFrame("BR_xiaoXiao.png");
			}else if(number1 == 7){
				self._quShiZu[self._quShiZu.length - key-1].setSpriteFrame("BR_xiaoHe.png");
			}else if(number1 > 7){
				self._quShiZu[self._quShiZu.length - key-1].setSpriteFrame("BR_xiaoDa.png");
			}
		}
	},
	//喇叭数组检测
	laBaShuZuJianCe : function(){
		var self = this;
		if(self._wzText.toString() == "" && brc.laBaArray.length>0 ){
			var gonggaoLan = self._rootNode.getChildByName("BR_laBaTiao");
			gonggaoLan.setVisible(true);
			if(brc.laBaArray[0]){
				self.laBaTiaoLayer(brc.laBaArray[0]);
			}
			brc.laBaArray.splice(0,1);
		}
	},
	//喇叭条创建
	laBaTiaoLayer : function( stringText ){
		var self = this;
		if(self._wzText.toString() == ""){
			cc.log("--------------laBaTiaoLayer");
			var gonggaoLan = self._rootNode.getChildByName("BR_laBaTiao");
			//创建裁剪节点
			if(!self._clipper){
				self._clipper = new cc.ClippingNode();
				self._clipper.width = gonggaoLan.width-65;
				self._clipper.height = gonggaoLan.height+30;
				self._clipper.x = gonggaoLan.width/2+25;
				self._clipper.y = gonggaoLan.height/2-5;
				self._clipper.anchorX = 0.5;
				self._clipper.anchorY =0.5;
				gonggaoLan.addChild(self._clipper,2,100);
				//绘制节点
				var stencil = new cc.DrawNode();
				var rectangle = [cc.p(0, 0),cc.p(self._clipper.width, 0),
					cc.p(self._clipper.width, self._clipper.height),
					cc.p(0,self._clipper.height)];
				var white = cc.color(255, 255, 255, 255);
				stencil.drawPoly(rectangle, white, 1, white);
				self._clipper.stencil = stencil;
			}
			//创建文字Lable
			var size = self._clipper.getContentSize();
			if(self._wzText){
				self._wzText.setString(stringText);
			}else{
				self._wzText =  cc.LabelTTF(stringText, "Arial",20);
				self._wzText.x = size.width;
				self._wzText.y = 30;
				self._wzText.anchorX = 0;
				self._wzText.anchorY =0;
				self._clipper.addChild(self._wzText,1);
				self._wzText.setColor(cc.color(227,194,15,255));
			}
			//文字滚动
			var moveLength = self._wzText.getContentSize().width + self._clipper.width;
			//cc.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLupdate",moveLength,labaXiaoxi._wzText.getContentSize().width,labaXiaoxi._widthClip);
			var duration = moveLength/180;
			var action1 = cc.Sequence(
				cc.MoveTo(duration+2,cc.p(-self._wzText.width, 30)),
				cc.callFunc(function (nodeExecutingAction, value) {
					self._wzText.setString("");
					self._wzText = "";
					self._wzText.x = size.width;
					self._wzText.y = 30;
					gonggaoLan.setVisible(false);
				}, this)
			);
			self._wzText.runAction(action1);
		}
	},
	//趋势刷新
	//创建收集下注分文本
	createFntWenJian : function() {
		var self = this;
		self._zongYaZhuAry = [];
		self._selfYaZhuAry = [];
		var yazhuNode1 = self._rootNode.getChildByName("BR_yaZhuQian_L");
		var yazhuNode2 = self._rootNode.getChildByName("BR_yaZhuQian_M");
		var yazhuNode3 = self._rootNode.getChildByName("BR_yaZhuQian_R");
		var array = [yazhuNode3,yazhuNode2,yazhuNode1];
		for(var i = 0 ; i<6 ; i++ ){
			var yaZhuDuiNode = self._rootNode.getChildByName("BR_duiYiText_"+(i+1));
			array.push(yaZhuDuiNode);
		}
		for (var i = 0; i < self._yaZhuBtn.length; i++) {
			var xiaoTextCopy = new cc.LabelBMFont("","res/br_res/ziTiZiYuan/BR_zongFen.fnt");
			xiaoTextCopy.setBoundingWidth(140);
			if(i<=2){
				xiaoTextCopy.x = array[i].x;
				xiaoTextCopy.y = array[i].y - 60;
			}else{
				xiaoTextCopy.x = array[i].x;
				xiaoTextCopy.y = array[i].y;
			}
			self._rootNode.addChild(xiaoTextCopy,100);
			array[i].setVisible(false);
			self._zongYaZhuAry.push(xiaoTextCopy);

			//var xiaoTextSelf = new cc.LabelAtlas("","res/br_res/ziTiZiYuan/BR_zijiyazhu.png",17,24,"0");
			var xiaoTextSelf = new cc.LabelBMFont("","res/br_res/ziTiZiYuan/BR_zijiyazhu.fnt");
			xiaoTextSelf.setBoundingWidth(140);
			xiaoTextSelf.x = array[i].x;
			if(i<=2){
				xiaoTextSelf.y = array[i].y - 200;
				var sprite = cc.Sprite.createWithSpriteFrameName("BR_ziJiYaZhuDi.png");
			}else{
				xiaoTextSelf.y = array[i].y - 70;
				var sprite = cc.Sprite.createWithSpriteFrameName("BR_ziJiYaZhuDi2.png");
			}
			sprite.opacity = 500;
			sprite.setVisible(false);
			sprite.x = xiaoTextSelf.x;
			sprite.y = xiaoTextSelf.y;
			self._rootNode.addChild(sprite,99);
			self._rootNode.addChild(xiaoTextSelf,100);
			self._selfYaZhuDi.push(sprite);
			self._selfYaZhuAry.push(xiaoTextSelf);
		}
		//庄家下注
		var zhuangFen = self._rootNode.getChildByName("zhuangFen");
		self._zhuangjiaxiazhu = new cc.LabelBMFont("","res/br_res/ziTiZiYuan/BR_yongHuFeng2.fnt");
		self._zhuangjiaxiazhu.setBoundingWidth(120);
		self._zhuangjiaxiazhu.setAlignment(cc.TEXT_ALIGNMENT_LEFT);
		self._zhuangjiaxiazhu.x = zhuangFen.x;
		self._zhuangjiaxiazhu.y = zhuangFen.y;
		self._rootNode.addChild(self._zhuangjiaxiazhu,100);
		self._zhuangjiaxiazhu.setScale(0.8);
		
	},
	createYaZhuShu : function(type,number,child){
		var self = this;
		var text = new cc.LabelAtlas(number.toString(),"res/br_res/ziTiZiYuan/BR_anNiuShu.png",17,22,"0");
		text.anchorX = 0.5;
		text.anchorY = 0.5;
		text.x = child.width/2 ;
		text.y =  child.height/2;
		text.setName("tuJiText1");
		child.addChild(text);
		text.setVisible(false);
		var text1 = new cc.LabelAtlas(number.toString(),"res/br_res/ziTiZiYuan/BR_anNiuShu2.png",17,22,"0");
		text1.anchorX = 0.5;
		text1.anchorY = 0.5;
		text1.x = child.width/2;
		text1.y =  child.height/2;
		text1.setName("tuJiText2");
		child.addChild(text1);
		text1.setVisible(false);
		if(type == 1){
			text.setPositionX(text.x-text.getContentSize().width/2);
			text1.setPositionX(text1.x-text1.getContentSize().width/2)
			var sprite = cc.Sprite.createWithSpriteFrameName("BR_wan.png");
			sprite.x = text.x+text.getContentSize().width/2+10;
			sprite.y = text.y;
			child.addChild(sprite,0,13);
			sprite.setVisible(false);
			var sprite2 = cc.Sprite.createWithSpriteFrameName("BR_wan2.png");
			sprite2.x = text1.x+text1.getContentSize().width/2+10;
			sprite2.y = text1.y;
			child.addChild(sprite2,0,14);
			sprite2.setVisible(false);
		}
	},
	setAtlas : function(number,isJingYong,child){
		var self = this;
		var text = child.getChildByName("tuJiText1");
		var text1 =  child.getChildByName("tuJiText2");
		if(number >= 10000){
			number = number/10000;

		}
			text.setString(number.toString());
			text1.setString(number.toString());

		if(isJingYong){
			text.setVisible(true);
			text1.setVisible(false);
			if(child.getChildByTag(13)){
				child.getChildByTag(13).setVisible(true);
			}
			if(child.getChildByTag(14)){
				child.getChildByTag(14).setVisible(false);
			}
		}else{
			text.setVisible(false);
			text1.setVisible(true);
			if(child.getChildByTag(13)){
				child.getChildByTag(13).setVisible(false);
			}
			if(child.getChildByTag(14)){
				child.getChildByTag(14).setVisible(true);
			}
		}
	},
	//押注按钮初始化状态
	setYaZhuBtnLoad : function() {
		var self = this;
		for ( var key in self._xuanZhuBtn_zu) {
			var yaFeng = brc.Object._xuanZhuBtnFeng[key];
			brc.Object._xuanZhuBtnFeng.splice(key,1,yaFeng);
			if(brc.Object._xuanZhuBtnFeng[key] >= 10000){
				var number = brc.Object._xuanZhuBtnFeng[key]/10000;
				self.createYaZhuShu(1,number,self._xuanZhuBtn_zu[key]);
				//self._xuanZhuBtn_zu[key].loadTextures("BR_"+number+"wan.png","BR_"+number+"wan.png","BR_"+number+"wan3.png",ccui.Widget.PLIST_TEXTURE)
			}else{
				if(USER_lUserScore >= 500){
					if(key == 1){
						self._xuanFenBtn = self._xuanZhuBtn_zu[key];
						self._dangQianXiaFeng = brc.Object._xuanZhuBtnFeng[key];
						self._xuanZhuBtn_zu[key].loadTextures("BR_anNiu2.png","BR_anNiu2.png","BR_anNiu3.png",ccui.Widget.PLIST_TEXTURE);
						self.createYaZhuShu(0,brc.Object._xuanZhuBtnFeng[key],self._xuanZhuBtn_zu[key]);
						for(var key in self._xuanZhuGuang){
							self._xuanZhuGuang[key].setVisible(true);
							self._xuanZhuGuang[key].setPosition(self._xuanFenBtn.getPosition());
						}
					}else{
						self._xuanZhuBtn_zu[key].loadTextures("BR_anNiu1.png","BR_anNiu1.png","BR_anNiu3.png",ccui.Widget.PLIST_TEXTURE);
						self.createYaZhuShu(0,brc.Object._xuanZhuBtnFeng[key],self._xuanZhuBtn_zu[key]);
					}
				}else{
					if(key == 0){
						self._xuanFenBtn = self._xuanZhuBtn_zu[key];
						self._dangQianXiaFeng = brc.Object._xuanZhuBtnFeng[key];
						self._xuanZhuBtn_zu[key].loadTextures("BR_anNiu2.png","BR_anNiu2.png","BR_anNiu3.png",ccui.Widget.PLIST_TEXTURE);
						self.createYaZhuShu(0,brc.Object._xuanZhuBtnFeng[key],self._xuanZhuBtn_zu[key]);
						for(var key in self._xuanZhuGuang){
							self._xuanZhuGuang[key].setVisible(true);
							self._xuanZhuGuang[key].setPosition(self._xuanFenBtn.getPosition());
						}
					}else{
						self._xuanZhuBtn_zu[key].loadTextures("BR_anNiu1.png","BR_anNiu1.png","BR_anNiu3.png",ccui.Widget.PLIST_TEXTURE);
						self.createYaZhuShu(0,brc.Object._xuanZhuBtnFeng[key],self._xuanZhuBtn_zu[key]);
					}
				}

			}
			if(USER_lUserScore < brc.Object._xuanZhuBtnFeng[key]){
				self._xuanZhuBtn_zu[key].setTouchEnabled(false);
				self._xuanZhuBtn_zu[key].setBright(false);
				//self.setAtlas(brc.Object._xuanZhuBtnFeng[key],false,self._xuanZhuBtn_zu[key]);
			}
		}
	},
	createXuanZhuGuang : function(){
		var self = this;
		var winSprite	= cc.Sprite.createWithSpriteFrameName("BR_mengban.png");
		var winSize		=   winSprite.getContentSize();
//			//光效
		var lightSprite	= cc.Sprite.createWithSpriteFrameName("BR_xuanzhuanguang.png");
		lightSprite.setPosition(cc.p(0, 0));
		var shanGuang = cc.Sprite.createWithSpriteFrameName("BR_waifaguang.png");

		//裁剪节点
		var clipNode	= cc.ClippingNode();
		clipNode.setPosition(cc.p(460,40));
		self._rootNode.addChild(clipNode,2);
		shanGuang.setPosition(clipNode.getPosition());
		self._rootNode.addChild(shanGuang);
		clipNode.alphaThreshold	= 0.05;
		clipNode.setContentSize(winSize);
		clipNode.stencil	=  winSprite;
		clipNode.addChild( winSprite);
		clipNode.addChild(lightSprite);
		clipNode.setScale(1);
		var moveAct	= cc.rotateBy(4,360);
		lightSprite.runAction(cc.repeatForever(moveAct));
		var action = cc.fadeOut(0.7);
		shanGuang.runAction(cc.sequence(action,action.reverse()).repeatForever());
		self._xuanZhuGuang = [clipNode,shanGuang];
		for(var key in self._xuanZhuGuang){
			self._xuanZhuGuang[key].setVisible(false);
		}
	},
	//座位创建收集
	createZuoWei : function() {
		var self = this;
		self._zuoWeiArray = [];
		for (var i = 0; i < 3; i++) {
			var zuoWeiLeftBtn = new brc.zuoWeiNode();
			zuoWeiLeftBtn._wSpChairID = i;
			zuoWeiLeftBtn._isYouRen = false;
			zuoWeiLeftBtn.setBtnType();
			zuoWeiLeftBtn.x = 58 - 10;
			zuoWeiLeftBtn.y = 440 - i*120;
			self._rootNode.addChild(zuoWeiLeftBtn, 0, 10);
			zuoWeiLeftBtn.createXiaoXiTiao();
			self._zuoWeiArray.push(zuoWeiLeftBtn);
			var zuoWeiRightBtn = new brc.zuoWeiNode();
			zuoWeiRightBtn._wSpChairID = 5-i;
			zuoWeiRightBtn._isYouRen = false;
			zuoWeiRightBtn.setBtnType();
			zuoWeiRightBtn.x = 1072 + 12;
			zuoWeiRightBtn.y = 440 - i*120;
			self._rootNode.addChild(zuoWeiRightBtn, 0, 10);
			self._zuoWeiArray.push(zuoWeiRightBtn);
			zuoWeiRightBtn.createXiaoXiTiao();
		}
	} ,
	//更改庄家信息
	setZhuangJiaXinXi : function(isXiTong) {
		var self = this;
		var touXiang = self._rootNode.getChildByName("zhuangTouXiang");
		var niCheng = self._rootNode.getChildByName("zhuang_NC");
		var btn = self._rootNode.getChildByName("shangZhuangBtn");
		self._isXiTong = isXiTong;
		if(isXiTong){
			touXiang.loadTextures(touXiangFrame[0],touXiangFrame[0],"",ccui.Widget.PLIST_TEXTURE) ;
			var str = Producer.BR_formatShortNumber(90000000);
			niCheng.setString("萌萌哒系统");
			self._zhuangjiaxiazhu.setString(str);
			brc.Object._zhuangInfor.dwUserID = 0;
			self._zhuangjiaxiazhu.x = 829;

		}else{
			touXiang.loadTextures(touXiangFrame[brc.Object._zhuangInfor.wFaceID%8],touXiangFrame[brc.Object._zhuangInfor.wFaceID%8],"",ccui.Widget.PLIST_TEXTURE) ;
			niCheng.setString(brc.Object._zhuangInfor.szNickName);
			var str = Producer.BR_formatShortNumber(brc.Object._zhuangInfor.lScore,true);
			self._zhuangjiaxiazhu.x = 829;
			self._zhuangjiaxiazhu.setString(str);
		}
		if(brc.biBieController.self._isZhuangJia){
			self.setShangZhuangBtn("BR_yaoShangZhuang2.png","BR_yaoShangZhuang.png",self._shangZhuang_btn);
			self.setShangZhuangBtn("BR_Z_woYaoShuangZhuang.png","BR_Z_woYaoShangZhuang2.png",self._shangZhuangBtn);
			self._isQuXiao = false;
			brc.biBieController.self._isShangZuo = false;
		}
		if(brc.Object._zhuangInfor.dwUserID == USER_dwUserID){
			self.isJingYongBtn(false, 5);
			self.setShangZhuangBtn("BR_xiaZhuang.png","BR_xiaZhuang2.png",self._shangZhuang_btn);
			brc.biBieController.self._isZhuangJia = true;
		}else{
			brc.biBieController.self._isZhuangJia = false;
		}
		
	},
	//押注庄家摇一摇显示
	setZhuangJiaYaoYao : function(isOnYaoYao) {
		var self = this;
		if(isOnYaoYao == "YES"){
			self._yaoYaoBtn.setVisible(true);
			if(cc.sys.os == cc.sys.OS_IOS){
				jsb.reflection.callStaticMethod( "RootViewController", "setRunYaoYao:", isOnYaoYao);//
			}else if(cc.sys.os == cc.sys.OS_ANDROID){
				jsb.reflection.callStaticMethod( "org/cocos2dx/javascript/AppActivity", "shangZhuangYaoYao","(Ljava/lang/String;)V", isOnYaoYao);
			}
			brc.btnDianJI(self._yaoYaoBtn,function(){
				gameSever.sendMessage(brc.SUB_S_GAME,brc.SUB_C_SHAKE_DICE,BRCBIBEI);//用户摇骰子
			},self);
		}else{
			self._yaoYaoBtn.setVisible(false);
			brc.biBieController.self._paterLayer._yaoYaoBtn.setBright(true);
			if(cc.sys.os == cc.sys.OS_IOS){
				jsb.reflection.callStaticMethod( "RootViewController", "setRunYaoYao:", isOnYaoYao);//
			}else if(cc.sys.os == cc.sys.OS_ANDROID){
				jsb.reflection.callStaticMethod( "org/cocos2dx/javascript/AppActivity", "shangZhuangYaoYao","(Ljava/lang/String;)V", isOnYaoYao);
			}
		}
    },
	//上庄按钮触发事件
	shangZhuang : function(self) {
		if(brc.biBieController.self._isZhuangJia){
				gameSever.sendMessage(brc.SUB_S_GAME,brc.SUB_C_CANCEL_BANKER,BRCBIBEI);//取消申请200，3
		}else{
			self._zhuangLieBiao = brc.zhuangLieBiao.create();
			self._zhuangTableView = self._zhuangLieBiao._zhuangTableView;
			self._rootNode.addChild(self._zhuangLieBiao ,1000);
			self._shangZhuangBtn = self._zhuangLieBiao._shangZhuangBtn;
		}
	},
	//更改骰子数
	setShaiZi : function(array , isShow) {
		var self = this;
		var number = array[0]+array[1];
		var shaiZiQian = self._jieMianShaiZi[1];
		var shaiZiDieZi = self._jieMianShaiZi[0];
		self._dieZi.setVisible(isShow);
		shaiZiQian[0].setLocalZOrder(100);
		shaiZiQian[1].setLocalZOrder(100);
		shaiZiQian[0].setVisible(isShow);
		shaiZiQian[1].setVisible(isShow);
		shaiZiQian[0].setScale(0.1);
		shaiZiQian[1].setScale(0.1);
		shaiZiDieZi[0].setVisible(isShow);
		shaiZiDieZi[1].setVisible(isShow);
//		self._shaiZiKuang.setVisible(isShow);
		if(isShow){
			var action = cc.ScaleTo.create(1,1).easing(cc.easeElasticOut(0.2));
			shaiZiQian[0].runAction(action);
			shaiZiQian[1].runAction(action.clone());
		}
		if(isShow){
			shaiZiQian[0].setSpriteFrame("BR_qianshai0"+(array[0]-1)+".png");
			shaiZiQian[1].setSpriteFrame("BR_qianshai0"+(array[1]-1)+".png");
			shaiZiDieZi[0].setSpriteFrame("BR_shangshai0"+(array[0]-1)+".png");
			shaiZiDieZi[1].setSpriteFrame("BR_shangshai0"+(array[1]-1)+".png");
			var action1 = cc.sequence(cc.blink(2, 10),cc.callFunc(function() {
				//this.setVisible(false);
			}, this));
			if(array[0] == array[1]){
				switch (number){
					case 2://对1
						self._daXiaoHeTeXiao[3].runAction(action1);
						break;
					case 4://对2
						self._daXiaoHeTeXiao[4].runAction(action1.clone());
						break;
					case 6://对3
						self._daXiaoHeTeXiao[5].runAction(action1.clone());
						break;
					case 8://对4
						self._daXiaoHeTeXiao[6].runAction(action1.clone());
						break;
					case 10://对5
						self._daXiaoHeTeXiao[7].runAction(action1.clone());
						break;
					case 12://对6
						self._daXiaoHeTeXiao[8].runAction(action1.clone());
						break;
					default:
						break;
				}
			}
			if(number < 7){
				shaiZiQian[0].setPositionX(243);
				shaiZiQian[1].setPositionX(343);
				self._daXiaoHeTeXiao[0].runAction(action1.clone());
			}else if(number == 7){
				shaiZiQian[0].setPositionX(515);
				shaiZiQian[1].setPositionX(615);
				self._daXiaoHeTeXiao[1].runAction(action1.clone());
			}else if(number >7){
				shaiZiQian[0].setPositionX(785);
				shaiZiQian[1].setPositionX(885);
				self._daXiaoHeTeXiao[2].runAction(action1.clone());
			}
		}
		
	},
	//更改显示的押注分数
	setZongYaZhuShu : function(idx,string,aryText) {
		var self = this;
		if(aryText && aryText.length>0){
			for ( var key in self._zongYaZhuAry) {
				if(aryText[key] == 0){
					self._zongYaZhuAry[key].setString("");
				}else{
					self._zongYaZhuAry[key].setString(aryText[key]);
					self.createJingBi(key);
				}
			}
		}else{
			self._zongYaZhuAry[idx].setString(string);
		}
	},
	createJingBi : function(key){
		var self = this;
		for(var i = 0; i < 10; i++){
			if(key<=2){
				var number = (Math.random()-0.5)*10;
				var number1 = (Math.random()-0.5)*10;
			}else{
				var number = (Math.random()-0.5)*6;
				var number1 = (Math.random()-0.5)*6;
			}
			var jinBi = new brc.jingBiNode.create();
			jinBi.x = self._yaZhuBtn[key].x+number*15;
			jinBi.y = self._yaZhuBtn[key].y+number1*13;
			jinBi._jingBiYaNa = key;
			self._rootNode.addChild(jinBi, 10);
			self._yaZhuBtn[key].quYuJingBi.push(jinBi);
			brc.biBieController.self._jingBiZu.push(jinBi);
		}
	},
	//仅用选注的btn
	isJingYongBtn : function(bool , idx) {
	  var self = this;
		 for (var i = 0; i < idx; i++) {
			 var btn = self._rootNode.getChildByName("BR_xuanZhong_"+i);
			 self.setAtlas(brc.Object._xuanZhuBtnFeng[i],bool,btn);
			 btn.setTouchEnabled(bool);
			 btn.setBright(bool);
			 for(var key in self._xuanZhuGuang){
				 self._xuanZhuGuang[key].setVisible(bool);
			 }
			 if(USER_lUserScore < brc.Object._xuanZhuBtnFeng[i]){
				 btn.setTouchEnabled(false);
				 btn.setBright(false);
				 self.setAtlas(brc.Object._xuanZhuBtnFeng[i],false,btn);
			 }
			 //if(USER_lUserScore < self._dangQianXiaFeng){
				// for(var key in self._xuanZhuGuang){
				//	 self._xuanZhuGuang[key].setVisible(false);
				// }
			 //}
		 }
		if(USER_lUserScore>=10){
			if(self._dangQianXiaFeng > USER_lUserScore){
				for(var key in self._xuanZhuGuang){
					self._xuanZhuGuang[key].setVisible(false);
				}
				//self._xuanFenBtn = null;
				//self._dangQianXiaFeng = 0;
			}
		}

	},
	// 选项按钮的点击事件
	xuanXiangBtnClick : function(self) {
		    var node = self._rootNode.getChildByName("xuanXiang_node");
			if(!self._isXuanCha){
				self._xuanXiangBtn.loadTextures("BR_btn_xuanxiang2_1.png","BR_btn_xuanxiang2_2.png","BR_btn_xuanxiang2_3.png",ccui.Widget.PLIST_TEXTURE);
				self._isXuanCha = true;
				node.setVisible(true);
			}else{
				self._xuanXiangBtn.loadTextures("BR_btn_xuanxiang_1.png","BR_btn_xuanxiang_2.png","BR_btn_xuanxiang_3.png",ccui.Widget.PLIST_TEXTURE);
				self._isXuanCha = false;
				node.setVisible(false);
			}
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
				onTouchBegan: function(touch, event){
					var pointDian =  touch.getLocation();
					if(self._isXuanCha){
						if(pointDian.x >= 1034.78-95 && pointDian.x <= 1034.78+95 && pointDian.y >= 443.47-95 && pointDian.y <= 443.47+95){
							cc.log("##########",pointDian.x,pointDian.y);
						}else{
							self._xuanXiangBtn.loadTextures("BR_btn_xuanxiang_1.png","BR_btn_xuanxiang_2.png","BR_btn_xuanxiang_3.png",ccui.Widget.PLIST_TEXTURE);
							self._isXuanCha = false;
							node.setVisible(false);
						}
						return true;
					}else{
						return false;
					}
				}
			}, node);
	},
	//不同游戏状态控制押注按钮是否显示
	setButtonBrightAndTouchenable : function(jianTou,_yaZhuBtn,dongHua) {
        var self = this;
        if (dongHua) {
			for ( var key in self._yaZhuBtn) {
				var number = parseInt(key);
				self._yaZhuBtn[number].setBright(_yaZhuBtn);
				self._yaZhuBtn[number].setTouchEnabled(_yaZhuBtn);
				self._yaZhuBtn[number].setVisible(_yaZhuBtn);
			}
			self.schedule(function() {
			}, 5.0)
		}

	},
	//是否在庄家列表
	isZaiZhuangJiaLieBiao : function(isShangZhuang,chairId) {
		var self = this;
		var number = brc.shuZuChaZhao(1,brc.Object._zhuangJiaXinXi ,chairId);
		if(number.dwUserID == USER_dwUserID){
			if(isShangZhuang){
				self.setShangZhuangBtn("BR_quXiao.png","BR_quXiao2.png",self._shangZhuangBtn);
				self._isQuXiao = false;
			}else{
				self.setShangZhuangBtn("BR_Z_woYaoShuangZhuang.png","BR_Z_woYaoShangZhuang2.png",self._shangZhuangBtn);
			}
		}
	},
	//修改上庄按钮的图
	setShangZhuangBtn : function(btnNam1 ,btnNam2, btn) {
		btn.loadTextures(btnNam1,btnNam2,"",ccui.Widget.PLIST_TEXTURE) ;
	},
	//选项btn点击事件
	caoZuoXuanXiangBtn : function(node) {
		var self = this;
		//获取趋势和红包
		self.xuanXiangNode = node;
	},
	//添加表情框
	addBiaoQingKuang : function(chairIdSelf,number) {
		var type = -1;
		var self = this;
		//庄家的chairid比较特殊
		if(chairIdSelf == 65535){
			type = 6;
		}else{
			type = chairIdSelf;
		}
		self._chairIdSelf = type;
		if(!self._biaoqingBool){
			var biaoqingXY = [{x:300,y:400},{x:300,y:350},{x:300,y:300},{x:830,y:300},{x:830,y:350},{x:830,y:400},{x:500,y:440}];
			if(!self._biaoqing){
				self._biaoqing = brc.biaoqiang.create();
				self._rootNode.addChild(self._biaoqing,200,112);
			}else{
				self._biaoqing.setVisible(true);
			}
			if(number){
				self._biaoqing._baiQingBeiJing.setSpriteFrame("BR_mainBg1.png");
				self._biaoqing._xiaZuo_btn.setVisible(false);
				self._biaoqing._baiQingBeiJing.y = 0;
			}else{
				self._biaoqing._baiQingBeiJing.setSpriteFrame("BR_mainBg.png");
				self._biaoqing._xiaZuo_btn.setVisible(true);
				self._biaoqing._baiQingBeiJing.y =  -30;
			}
			self._biaoqing._wSpChairID = chairIdSelf;
			self._biaoqing.x = biaoqingXY[type].x;
			self._biaoqing.y = biaoqingXY[type].y;
			self._biaoqingBool = true;

			
			//当表情动画未播完，或2分钟内，连续点击2个表情，则表情变灰
			if(!brc.biBieController.self._paterLayer._isSendBiaoQing || brc.biBieController.self._paterLayer._biaoqingCount >= 1){
				self._biaoqing.checkSendBiaoQing(false);
			}else{
				self._biaoqing.checkSendBiaoQing(true);
			}
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
				onTouchBegan: function(touch, event){
					if(self._biaoqingBool){
						var pointDian =  touch.getLocation();
						var bgBox = self._biaoqing.getBoundingBox();
						if(!cc.rectContainsPoint(bgBox, pointDian)){
							self._biaoqing.setVisible(false);
							//cc.pool.putInPool(self._biaoqing);
							self._biaoqingBool = false;
							return true;
						}
						return true;
					}else{
						return false;
					}
				}
			}, self._biaoqing);
		}
	},
	addGeRenZiLiao : function (type,rect ,data) {
		var self = this;
		var di ;
		if(!self._geRenZiLiao){
			self._geRenZiLiao =new ccs.load("res/br_res/geRenZiLiao.json").node;
			self.addChild(self._geRenZiLiao,1000);
			self._geRenZiLiao.setPosition(rect);

		}else{
			self._geRenZiLiao.setVisible(true);
			self._geRenZiLiao.setPosition(rect);
		}
		di = self._geRenZiLiao.getChildByName("BR_ziLiaoDi");
		if(type == 0){
			di.setSpriteFrame("BR_geRenZiLiao.png");
			di.setPosition(cc.p(-9,-4));
		}else{
			di.setSpriteFrame("BR_geRenZiLiaoDi2.png");
			di.setPosition(cc.p(0,-4));
		}
		self._isGeRenShow = true;
		var vip = self._geRenZiLiao.getChildByName("otherpeople_vip");//vip等级
		var vipstr = "vip"+ data.cbMemberOrder +".png";
		vip.setSpriteFrame(vipstr);
		var id = self._geRenZiLiao.getChildByName("BR_ID");
		var niCheng = self._geRenZiLiao.getChildByName("BR_niCheng");
		var fengShu = self._geRenZiLiao.getChildByName("BR_qianLiang");
		id.setString(data.dwUserID);
		niCheng.setString(data.szNickName);
		fengShu.setString(Producer.changeNumberToString(data.lScore));
		brc.Object._zhuangInfor.lScore = data.lScore;
		self.scheduleOnce(function(){
			if(self._geRenZiLiao && self._isGeRenShow ){
				self._isGeRenShow = false;
				self._geRenZiLiao.setVisible(false);
			}
		},10);
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function(touch, event){
			if(self._geRenZiLiao && self._isGeRenShow ){
				self._isGeRenShow = false;
				self._geRenZiLiao.setVisible(false);
				return true;
			}
				return false;
			}
		},self._geRenZiLiao);
	},
	//表情发送频繁
	setBiaoQingPinFan : function() {
		shortTips.create({cueStr : "您过于频繁操作,请稍后继续",percentPosition : cc.p(0.5,0.5)});
	},
	//表情显示
	setBiaoQingShow : function() {
		var self = this;
		var type = -1;
		if(brc.Object._biaoqingData.wSpChairID == 65535){
			type = 6;
		}else{
			type = brc.Object._biaoqingData.wSpChairID;
		}
		self.scheduleOnce(self.checkBiaoQingCount,brc.Object._biaoQingJianGe);
		var biaoqingCell = new brc.biaoqianganimation(brc.Object._biaoqingData.dwExpressionID);
		var locationArray = [{x:150,y:440},{x:150,y:340},{x:150,y:240},{x:985,y:240},{x:985,y:340},{x:985,y:440},{x:435,y:500}];
		biaoqingCell.x = locationArray[type].x;
		biaoqingCell.y = locationArray[type].y;
		self._rootNode.addChild(biaoqingCell,100,113);
		//判断是否为自己发送表情
		if(brc.Object._biaoqingData.wSpChairID == self._chairIdSelf ||
				(brc.Object._biaoqingData.wSpChairID == 65535 && self._chairIdSelf == 6)){
			self._isSendBiaoQing = false;
			self.scheduleOnce(self.cansendbiaoqing, 2.8);
		}
	},
	cansendbiaoqing : function() {//是否可发送表情
		var self = this;
		self._isSendBiaoQing = false;
		if(self._biaoqingBool && brc.biBieController.self._paterLayer._biaoqingCount < 1){
			self._biaoqing.checkSendBiaoQing(true);
		}
	},
	createFeiRuTeXiao : function(postion , diKuang){
		var self = this;
		if(postion.y != 594){
			if(postion.y == 47){
				var teXiao = ccs.load("res/br_res/BR_feiRuZiJi.json").node;
				teXiao.setPosition(cc.p(115,26));
				self._rootNode.addChild(teXiao,100);
				self._teXiaoNode.push(teXiao);
				var xingXin = cc.Sprite.createWithSpriteFrameName("BR_ziJiYingQi_00.png");
				xingXin.x = 150;
				xingXin.y = 0;
				teXiao.addChild(xingXin)
				xingXin.runAction(cc.sequence(Producer.ProduceFrameAnimation("BR_ziJiYingQi_", 9, 0, 0.1),cc.fadeOut(0.2)));
				var yuanBao = teXiao.getChildByName("BR_faGuangYuanBao");
				var yuanBaoGuan = teXiao.getChildByName("BR_yuanBaoGuangQuan");
				var hengGuang = teXiao.getChildByName("BR_ziJiHengGuang");
				var zhuanGuang = teXiao.getChildByName("BR_ziJiZhuanGuang");
				yuanBaoGuan.runAction(cc.sequence(cc.scaleTo(0.5,1.2),cc.spawn(cc.scaleTo(0.3,1.4),cc.fadeOut(0.3))));
				//cc.MoveBy
				hengGuang.runAction(cc.sequence(cc.MoveBy(0.3,cc.p(50,0)),cc.spawn(cc.MoveBy(0.2,cc.p(50,0)),cc.fadeOut(0.2))));
				zhuanGuang.runAction(cc.sequence(cc.spawn(cc.MoveBy(0.3,cc.p(-20,0)),cc.rotateBy(0.3,20)),cc.spawn(cc.rotateBy(0.2,20),cc.fadeOut(0.2)),cc.callFunc(function(){
					yuanBao.runAction(cc.fadeOut(0.5));
				})));
			}else{
				var teXiao = ccs.load("res/br_res/BR_feiRuTeXiao.json").node;
				teXiao.setPosition(postion);
				self._rootNode.addChild(teXiao,100);
				self._teXiaoNode.push(teXiao);
				var xingXin = cc.Sprite.createWithSpriteFrameName("BR_touXiang_00.png");
				if(postion.y == 597){
					xingXin.setScale(0.8);
				}else{
					xingXin.setScale(1);
				}
				teXiao.addChild(xingXin);
				xingXin.runAction(cc.sequence(Producer.ProduceFrameAnimation("BR_touXiang_",14, 0, 0.1),cc.fadeOut(0.2)))
				var array = [];
				array[0] = teXiao.getChildByName("BR_diKuang");
				array[1] = teXiao.getChildByName("BR_diKuang2");
				for (var key in array ){
					array[key].setScale(1);
					array[key].setSpriteFrame(diKuang);
				}
				array[0].runAction(cc.sequence(cc.scaleTo(0.3,1.2),cc.spawn(cc.spawn(cc.scaleTo(0.5,1.4),cc.fadeOut(0.5)),cc.callFunc(function() {
					array[1].runAction(cc.sequence(cc.scaleTo(0.3,1.2),cc.spawn(cc.scaleTo(0.5,1.4),cc.fadeOut(0.5))));
				}, self))));
				var hengGuang = teXiao.getChildByName("BR_hengGuang");
				hengGuang.setScale(1);
				var miGuang = teXiao.getChildByName("BR_miGuang");
				miGuang.setScale(1);
				hengGuang.runAction(cc.sequence(cc.scaleTo(0.5,1.2),cc.spawn(cc.scaleTo(0.5,1.4),cc.fadeOut(0.5))));
				miGuang.runAction(cc.sequence(cc.scaleTo(0.5,1.2),cc.spawn(cc.scaleTo(0.5,1.4),cc.fadeOut(0.5))));
			}
		}
	},
	qushiBtnClick : function(self) {//添加趋势界面
		br_qushi.creatQuShiLayer();
	},
	zhuangjiaBtnClick : function(self) {
		//判断自己是否为庄家
		var btn = self._rootNode.getChildByName("zhuangTouXiang");
		if(brc.Object._zhuangInfor.dwUserID == USER_dwUserID){
			brc.biBieController.self._paterLayer.addBiaoQingKuang(65535,true);
		}else{
			if(brc.Object._zhuangInfor && brc.Object._zhuangInfor.dwUserID != 0){//此时庄家不是自己，那么弹出玩家信息
				//brc.biBieController.self._paterLayer.addOtherPeople(brc.Object._zhuangInfor);
				var number = brc.shuZuChaZhao(2,brc.Object._yongHuXinXi,brc.Object._zhuangInfor.dwUserID);
				brc.biBieController.self._paterLayer.addGeRenZiLiao(1 ,cc.p(btn.x - 170,btn.y),number);
			}
		}
	},
	//重置表情的发送个数
	checkBiaoQingCount : function() {
		var self = this;
		self._biaoqingCount = 0;
		brc.biBieController.self._paterLayer._isSendBiaoQing = true;
	},
	//无座玩家界面
	wuzuoBtnClick : function(self) {
		var wuzuo = new brc.wuzuowanjia();
		self._wuzuo = wuzuo;
		self.addChild(wuzuo, 111);
	},
	//如果是自己取消座位，则不可发表情
	checkIsSelfOut : function() {
		var self = this;
		if(!brc.biBieController.self._isShangZuo){
			for(var i =0;i < self._zuoWeiArray.length;i++){
				self._zuoWeiArray[i]._isSelf = false;
			}
		}
	},
	updateShangZhuangLimit : function() {
		//上庄条件
		var self = this;
		if(self._addShangZhuangBool){
			return;
		}
		self._addShangZhuangBool = true;
		var shangZhuangTiaojian = new ccui.RichText();
		shangZhuangTiaojian.ignoreContentAdaptWithSize(false);
		shangZhuangTiaojian.x = 52;
		shangZhuangTiaojian.y = -150;
		shangZhuangTiaojian.width = 320;
		shangZhuangTiaojian.height = 30;
		self._shangZhuangTiaojian = shangZhuangTiaojian;
		var re1 = new ccui.RichElementText(0, cc.color.WHITE, 255, "注：上庄需要", "Arial", 20);
		var re2 = new ccui.RichElementText(1, cc.color.YELLOW, 255, brc.Object._zhuangInfor.lApplyBankerCondition, "Arial", 20);
		var re3 = new ccui.RichElementText(2, cc.color.WHITE, 255, "银两", "Arial", 20);
		shangZhuangTiaojian.pushBackElement(re1);
		shangZhuangTiaojian.pushBackElement(re2);
		shangZhuangTiaojian.pushBackElement(re3);
		self._SZ_node.addChild(shangZhuangTiaojian,2,15);
	},
	updateSelfMsg : function() {//刷新玩家连胜连败的信息
		if(!this._winAndLoseNode){
			var winAndLoseNode = new brc.winorlosenode();
			winAndLoseNode.x = 95;
			winAndLoseNode.y = 140;
			winAndLoseNode.setVisible(true);
			this._winAndLoseNode = winAndLoseNode;
			this._rootNode.addChild(winAndLoseNode,1000);
			
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
				onTouchBegan: function(touch, event){
					if(winAndLoseNode.isVisible()){
						this._isWinAndLoseNodeBool = false;
						winAndLoseNode.setVisible(false);
						return true;
					}else{
						return false;
					}
				}
			}, winAndLoseNode);
		}else{
			if(!this._winAndLoseNode.isVisible()){
				this._winAndLoseNode.updateCount();
				this._winAndLoseNode.setVisible(true);
			}
		}
	},
	
	onEnter : function() {
		this._super();
		var self = this;
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  function(keyCode, event){
				var label = event.getCurrentTarget();
				//label.setString("Key " + (cc.sys.isNative ? that.getNativeKeyName(keyCode) : String.fromCharCode(keyCode) ) + "(" + keyCode.toString()  + ") was pressed!");
			},
			onKeyReleased: function(keyCode, event){
				var keyCode = keyCode.toString();
				if (keyCode == 6  && !zuZhiBack) {
					cc.log("^^^^^^^^^^^^%%%%%",keyCode);
					cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
					var number = 0;
					for(var key in self._selfYaZhuAry){
						if(self._selfYaZhuAry[key].getString() == "") {
							number++;
						}
					}
					if(number == self._selfYaZhuAry.length){
						cc.director.runScene(new GameHallScene());
					}else{
						var xinxi = {Describe : "现在返回可能会对您造成损失，确定要返回大厅吗？",errorCode : 21,isBack : true};
						var tishi = TiShiKuangZiDingYi.create(xinxi);
						cc.director.getRunningScene().addChild(tishi,1000);
					}
				}
			}
		}, this);
	},
	onExit : function() {
		this._super();
	}
});

