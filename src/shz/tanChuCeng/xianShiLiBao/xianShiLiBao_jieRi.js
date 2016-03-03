var jieRi = jieRi || {};
jieRi.huoQuJiRiShuJu_url = "http://m1-api.baiyishuihu.com/index.php/Api/ActiveGiftBag/giftBagDetail.php?";//获取节日礼包的数据
jieRi.cellBtn_url = "http://m1-api.baiyishuihu.com/index.php/Api/ActiveGiftBag/getGiftBag.php?";//领取礼包
jieRi.Node = cc.Node.extend({
	daoJiShiJian_diTu_kaishi : null,//倒计时显示底图
	daoJiShiJian_diTu_jieshu : null,
	jr_tableView : null,//tableView（节日礼包）
	jr_tableView_shuiPing : null,//（vip礼包）
	atid : null,//礼包对应值
	jieRiHuoDong_data : null,//收集网站回传数据活动数据
	jieRiHuoDong_type : null,//判断是否在礼包上线时
	jieRiJiShiKaiShiArray : [],//收集计时的计时开始node
	jieRiJiShiJieShuArray : [],//收集计时结束的计时node
	jieRiEndTime : null,//收集网站回传时间总数
	vip_shangBiaoTu : null,
	self : null,
	ctor : function() {
		this._super();
		this.init();
	},
	init : function() {
		var self = this;
		self.daoJiShiJian_diTu_kaishi = cc.Sprite.createWithSpriteFrameName("JR_juKaiShi.png");
		self.daoJiShiJian_diTu_kaishi.x = 102.38;
		self.daoJiShiJian_diTu_kaishi.y = 149.17;
		self.addChild(self.daoJiShiJian_diTu_kaishi, 0, 10);
		self.daoJiShiJian_diTu_kaishi.setVisible(false);
		self.daoJiShiJian_diTu_jieshu = cc.Sprite.createWithSpriteFrameName("JR_juJeShu.png");
		self.daoJiShiJian_diTu_jieshu.x = 102.38;
		self.daoJiShiJian_diTu_jieshu.y = 149.17;
		self.addChild(self.daoJiShiJian_diTu_jieshu, 0, 11);
		self.daoJiShiJian_diTu_jieshu.setVisible(false);
		self.vip_shangBiaoTu = cc.Sprite.createWithSpriteFrameName("VIP_text.png");
		self.vip_shangBiaoTu.x = 102.38;
		self.vip_shangBiaoTu.y = 149.17;
		self.addChild(self.vip_shangBiaoTu, 0, 12);
		var label = cc.LabelBMFont("1000" + "万", "res/shz/TanChuCeng/tanChuCengRes/qd_2.fnt");
		label.x = 440;
		label.y = 20;
		self.vip_shangBiaoTu.addChild(label,0,2);
		self.vip_shangBiaoTu.setVisible(false);
		
	},
	//创建不同礼包的tableView
	createBuTongZhuangTai : function(type) {
		var self = this;
		jieRi.self = this;
		if(type == 5 ){
			if(self.jr_tableView_shuiPing){
				return;
			}else{
				var jianTou = cc.Sprite.createWithSpriteFrameName("VIP_jiantou.png");//箭头
				jianTou.x = 400;
				jianTou.y = -10;
				self.addChild(jianTou, 2, 26);
				var jianTou2 = cc.Sprite.createWithSpriteFrameName("VIP_jiantou.png");
				jianTou2.x = -200;
				jianTou2.y = -10;
				jianTou2.setRotation(180);
				self.addChild(jianTou2, 2, 27);
				self.jr_tableView_shuiPing = new cc.TableView(this,cc.size(620, 280));
				self.jr_tableView_shuiPing.x =-215;
				self.jr_tableView_shuiPing.y =-170;
				self.jr_tableView_shuiPing.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
				self.jr_tableView_shuiPing.setDelegate(this);
				self.jr_tableView_shuiPing.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
				self.addChild(self.jr_tableView_shuiPing,0,21);
				var wenBenTiShi = cc.Sprite.createWithSpriteFrameName("VIP_text2.png");
				wenBenTiShi.x = 40;
				wenBenTiShi.y = -190;
				self.addChild(wenBenTiShi, 0, 22);
				/*显示下一vip等级过的多少钱*/
				var wenBenShu1  = cc.LabelBMFont("2000", "res/shz/TanChuCeng/tanChuCengRes/qd_2.fnt");
				wenBenShu1.x = -80;
				wenBenShu1.y = -190;
				self.addChild(wenBenShu1,0,23);
				var wenBenShu2  = cc.LabelBMFont("2000" + "万", "res/shz/TanChuCeng/tanChuCengRes/qd_2.fnt");
				wenBenShu2.x = 160;
				wenBenShu2.y = -190;
				self.addChild(wenBenShu2,0,24);
				var chongZhi = new ccui.Button("xianshi_1.png","xianshi_2.png","xianshi_3.png",ccui.Widget.PLIST_TEXTURE);
				chongZhi.x = 350;
				chongZhi.y = -190;
				self.addChild(chongZhi, 0, 25);
				chongZhi.addClickEventListener(function() {
					ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
				});
				var shengJi_text =  cc.Sprite.createWithSpriteFrameName("VIP_btnTile.png");
				shengJi_text.x = chongZhi.width/2;
				shengJi_text.y = chongZhi.height/2;
				chongZhi.addChild(shengJi_text, 0, 2);
				
			}
		}else{
			if(self.jr_tableView){
				return;
			}else{
				self.jr_tableView = new cc.TableView(this,cc.size(620, 300));
				self.jr_tableView.x =-215;
				self.jr_tableView.y =-203;
				self.jr_tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
				self.jr_tableView.setDelegate(this);
				self.jr_tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
				self.addChild(self.jr_tableView,0,22);
				self.createShiJianLable(self.daoJiShiJian_diTu_kaishi,self.jieRiJiShiKaiShiArray);
				self.createShiJianLable(self.daoJiShiJian_diTu_jieshu,self.jieRiJiShiJieShuArray);
			}
			
		}
		
	},
	//创建时间显示node
	createShiJianLable : function(preatNode , array) {
			for (var i = 0; i < 4; i++) {
				var label = cc.LabelTTF("00", "Arial", 20);
				label.setColor(cc.color(0, 0, 0, 255));
				label.setPosition(280+85*i, 20);
				preatNode.addChild(label,1,i);
				array.push(label);
				if(i == 3){
					label.setVisible(false);
				}
			}
	},
	//计时器函数
	daojishi_jieRi : function() {
		var self = this;
		var time_xianshihttpPostData = self.jieRiEndTime;
		if(self.jieRiHuoDong_type == 1){
			cc.log("@@@@@@@!"+self.jieRiEndTime);
			xianShiLiBao.chuLiShiJian(self.jieRiJiShiKaiShiArray, time_xianshihttpPostData);
		}else if(self.jieRiHuoDong_type == 2){
			cc.log("@@@@@@@!"+self.jieRiEndTime);
			xianShiLiBao.chuLiShiJian(self.jieRiJiShiJieShuArray, time_xianshihttpPostData);
		}
		
		self.jieRiEndTime--;
	},
	cell_btn : function() {
		cc.audioEngine.playEffect(Effect_res.anNiuDianJi, false);
		if(this.tag<40){
			jieRi.self.creatHttp(10, this.tag-10,this);
		}else{
			ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene());
		}
	},
	//转换数组大于一万的数
	numberZhuanWan : function(number ,ziTiString) {
		var label;
		if(number<10000){
			label = cc.LabelBMFont(number,ziTiString );
		}else{
			var numbers = number/10000;
			label = cc.LabelBMFont(numbers+"万", ziTiString);
		}
		return label; 
	},   
	//拉动taiview调用的函数
	scrollViewDidScroll:function (view) {
		
		if(jieRi.self.atid == 5){
			var offset = view.getContentOffset();
			cc.log("%%%%%%%%%%%"+offset.y,offset.x);

			if(jieRi.self.jieRiHuoDong_data){
				if(jieRi.self.jieRiHuoDong_data.detail && jieRi.self.jieRiHuoDong_data.detail.length>0){
					if(offset.x > -140*jieRi.self.jieRiHuoDong_data.detail.length){
						jieRi.self.getChildByTag(26).setVisible(true);
					}else if(offset.x <= -140*jieRi.self.jieRiHuoDong_data.detail.length ){
						jieRi.self.getChildByTag(26).setVisible(false);
					}
				}
			}
			
			if(offset.x < 0){
				jieRi.self.getChildByTag(27).setVisible(true);
			}else if(offset.x >= 0 ){
				jieRi.self.getChildByTag(27).setVisible(false);
			}
		}
	},
	scrollViewDidZoom:function (view) {
		
	},
	tableCellTouched:function (table ,cell) {
		if(jieRi.self.atid == 5){
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi, false);
			if(jieRi.self.jieRiHuoDong_data.detail[cell.getIdx()].obtain_status == 1){
				jieRi.self.creatHttp(10, cell.getIdx() ,cell);
			}
			
		}
		
	},
	tableCellSizeForIndex:function (table, idx) {
		if(jieRi.self.atid == 5){
			return cc.size(209, 280);
		}
		return cc.size(612, 100);
	},
	//创建cell
	tableCellAtIndex:function (table, idx) {
		var strValue = idx.toFixed(0);
		var cell = table.dequeueCell();
		var sprite;
		var liBaoTu ;
		var lingJiangShu;
		var qiDaiTuBia;
		var shengYuBiLiShu;
		var chongZhi_btn;
		var lingQu_btn;
		var shengyu;
		var yiLingQu;
		var cell_bg;
		var shouMing_feng;
		var dianJILingQu;
		var shouQing ;
		if (!cell) {
			cell = new cc.TableViewCell();
			if(jieRi.self.atid == 5){
				cell.isAction = false;
				sprite = ccs.load("res/shz/TanChuCeng/vipLiBaoCellNode.json").node;
				sprite.x = 104;
				sprite.y = 140;
				sprite.tag = 123;
				cell.addChild(sprite);
				yiLingQu = sprite.getChildByName("lingQu");
				yiLingQu.setVisible(false);
				shouMing_feng = new ccui.RichText();
				shouMing_feng.ignoreContentAdaptWithSize(false);
				shouMing_feng.y = 100;
				shouMing_feng.width = 180;
				shouMing_feng.height = 30;
				var re1 = new ccui.RichElementText(0, cc.color.BLACK, 255, "  VIP等级达到", "Arial", 20);
				var re2 = new ccui.RichElementText(1, cc.color.BLACK, 255, 1, "Arial", 20);
				var re3 = new ccui.RichElementText(2, cc.color.BLACK, 255, "级  即可获得", "Arial", 20);
				var label = cc.LabelBMFont("200", "res/shz/TanChuCeng/tanChuCengRes/vip_xianShuZhi.fnt");
				var re4 = new ccui.RichElementCustomNode(3, cc.color.WHITE, 255, label);
				var re5 = new ccui.RichElementText(4, cc.color.BLACK, 255, "两", "Arial", 20);
				shouMing_feng.pushBackElement(re1);
				shouMing_feng.pushBackElement(re2);
				shouMing_feng.pushBackElement(re3);
				shouMing_feng.pushBackElement(re4);
				shouMing_feng.pushBackElement(re5);
				sprite.addChild(shouMing_feng,2,15);
				dianJILingQu = cc.Sprite.createWithSpriteFrameName("VIP_dianjilingqu.png");
				dianJILingQu.x = 0;
				dianJILingQu.y = 0;
				sprite.addChild(dianJILingQu,2,30);
			}else{
				sprite = ccs.load("res/shz/TanChuCeng/jieRiLiBaoCell.json").node;
				sprite.x = 612/2;
				sprite.y = 100/2;
				sprite.tag = 123;
				cell.addChild(sprite);
				shouQing = cc.Sprite.createWithSpriteFrameName("xianshi_sq.png");
				shouQing.x = 233;
				shouQing.y = 2;
				sprite.addChild(shouQing,0,29);
				shouQing.setVisible(false);
			}
			  
		}
		sprite = cell.getChildByTag(123);
			if(jieRi.self.jieRiHuoDong_data){
				cell.setVisible(true);
				if(jieRi.self.atid == 5){//vip礼包cell表现形式
					yiLingQu = sprite.getChildByName("lingQu");
					cell_bg = sprite.getChildByName("cell_bg");
					liBaoTu = sprite.getChildByName("vip_tuBiao");
					shouMing_feng = sprite.getChildByTag(15);
					dianJILingQu = sprite.getChildByTag(30);
					dianJILingQu.setVisible(true);
					dianJILingQu.setOpacity(1000);
					shouMing_feng.removeElement(1);
					shouMing_feng.removeElement(2);
					var re2 = new ccui.RichElementText(1, cc.color.BLACK, 255, jieRi.self.jieRiHuoDong_data.detail[idx].level, "Arial", 20);
					var label ;
					if(jieRi.self.jieRiHuoDong_data.detail.length > 0){
						switch (jieRi.self.jieRiHuoDong_data.detail[idx].obtain_status) {
						case 0:
							yiLingQu.setVisible(true);
							dianJILingQu.setVisible(false);
							cell_bg.setSpriteFrame("VIP_cellBg(2).png");
							liBaoTu.setSpriteFrame("VIP_vip-"+jieRi.self.jieRiHuoDong_data.detail[idx].level+" (2).png");
							label = jieRi.self.numberZhuanWan(jieRi.self.jieRiHuoDong_data.detail[idx].icons,  "res/shz/TanChuCeng/tanChuCengRes/vip_xianShuZhi2.fnt")
							break;
						case 1:
							yiLingQu.setVisible(false);
							var action2 = cc.fadeOut(1.0);
							var action2Back = action2.reverse();
							var action =cc.sequence(action2, action2Back).repeatForever();
							dianJILingQu.runAction(action);
							cell_bg.setSpriteFrame("VIP_cellBg.png");
							liBaoTu.setSpriteFrame("VIP_vip-"+jieRi.self.jieRiHuoDong_data.detail[idx].level+".png");
							label = jieRi.self.numberZhuanWan(jieRi.self.jieRiHuoDong_data.detail[idx].icons,  "res/shz/TanChuCeng/tanChuCengRes/vip_xianShuZhi.fnt")
							break;
						case 2:
							yiLingQu.setVisible(false);
							dianJILingQu.setVisible(false);
							cell_bg.setSpriteFrame("VIP_cellBg.png");
							liBaoTu.setSpriteFrame("VIP_vip-"+jieRi.self.jieRiHuoDong_data.detail[idx].level+".png");
							label = jieRi.self.numberZhuanWan(jieRi.self.jieRiHuoDong_data.detail[idx].icons,  "res/shz/TanChuCeng/tanChuCengRes/vip_xianShuZhi.fnt")
							break;
						default:
							break;
						}
					}
					var re4 = new ccui.RichElementCustomNode(3, cc.color.WHITE, 255, label);
					shouMing_feng.insertElement(re2 , 1);
					shouMing_feng.insertElement(re4 , 3);
				}else{//节日礼包cell表现形式
					liBaoTu = sprite.getChildByName("liBaoBiaoTu");
					lingJiangShu = sprite.getChildByName("lingJIangShu");
					qiDaiTuBia = sprite.getChildByName("qiDaiTuBiao");
					shengYuBiLiShu = sprite.getChildByName("shengYuBiLiShu");
					chongZhi_btn = sprite.getChildByName("chongZhi_btn");
					lingQu_btn = sprite.getChildByName("lingQu_btn");
					var btn_tile = lingQu_btn.getChildByName("tile");
					shengyu = sprite.getChildByName("text_shengyu");
					shouQing = sprite.getChildByTag(29);
					
					switch (jieRi.self.jieRiHuoDong_type) {
					case 1:
						qiDaiTuBia.setVisible(false);
						lingJiangShu.setVisible(false);
						qiDaiTuBia.setVisible(true);
						shengYuBiLiShu.setVisible(false);
						chongZhi_btn.setVisible(false);
						lingQu_btn.setVisible(false);
						shengyu.setVisible(false);
						liBaoTu.setSpriteFrame("JR_vip"+idx+".png");
						break;
					case 2:
						qiDaiTuBia.setVisible(true);
						lingJiangShu.setVisible(true);
						qiDaiTuBia.setVisible(false);
						shengYuBiLiShu.setVisible(true);
						chongZhi_btn.setVisible(true);
						lingQu_btn.setVisible(true);
						btn_tile.setVisible(true);
						shengyu.setVisible(true);
						liBaoTu.setSpriteFrame("JR_vip"+jieRi.self.jieRiHuoDong_data.detail[idx].level+".png");
						if(jieRi.self.jieRiHuoDong_data.detail.length > 0){
							lingJiangShu.setString(jieRi.self.jieRiHuoDong_data.detail[idx].icons+"两");
							shengYuBiLiShu.setString(jieRi.self.jieRiHuoDong_data.detail[idx].rest);
							switch (jieRi.self.jieRiHuoDong_data.detail[idx].obtain_status) {
							case 0:
								chongZhi_btn.setVisible(false);
								lingQu_btn.setBright(false);
								lingQu_btn.setTouchEnabled(false);
								btn_tile.setVisible(false);
								break;
							case 1:
								chongZhi_btn.setVisible(false);
								lingQu_btn.setBright(true);
								lingQu_btn.setTouchEnabled(true);
								lingQu_btn.tag = 10+idx;
								lingQu_btn.addClickEventListener(jieRi.self.cell_btn);
								break;
							case 2:
								chongZhi_btn.setVisible(true);
								chongZhi_btn.tag = 40+idx;
								chongZhi_btn.addClickEventListener(jieRi.self.cell_btn);
								lingQu_btn.setVisible(false);
								break;
							default:
								break;
							}
						}
						if(jieRi.self.jieRiHuoDong_data.detail[idx].rest == 0){
							shouQing.setVisible(true);
							chongZhi_btn.setVisible(false);
							lingQu_btn.setVisible(false);
						}
						break;
					case 3:

						break;

					default:
						break;
					}
				}
				
			}else{
				cell.setVisible(false);
			}
		
		
		
		return cell;

	},
	//加载cell的个数
	numberOfCellsInTableView:function (table) {
		var length = 9;
		
		if(jieRi.self.jieRiHuoDong_data){
			if(jieRi.self.jieRiHuoDong_data.detail && jieRi.self.jieRiHuoDong_data.detail.length>0){
				length = jieRi.self.jieRiHuoDong_data.detail.length;
			}
		}else{
			length = 9;
		}
		return length;
	},
	//回去网站数据函数
	creatHttp : function(type,idx , element) {
		var self = this;
		if(type != 5){
			self.unschedule(jieRi.self.daojishi_jieRi);
		}
		
		var testHttp = cc.loader.getXMLHttpRequest();
		var data ;
		var sign =hex_md5( USER_zhangHao +hex_md5(USER_szPassword));
		
		if(type == 10){
			data = "userid=" + USER_dwUserID + "&atdid="+jieRi.self.jieRiHuoDong_data.detail[idx].atdid+"&level="+jieRi.self.jieRiHuoDong_data.detail[idx].level;
			testHttp.open("POST", jieRi.cellBtn_url);
		}else{
			data = "userid=" + USER_dwUserID + "&atid="+self.atid;
			testHttp.open("GET", jieRi.huoQuJiRiShuJu_url+data);
		}
		
		streamXHREvents(testHttp);
		testHttp.onreadystatechange = function() {
			if (waitQuan.xianShi) {
				waitQuan.unuse("GameHallScene71");
			} ;
			if(testHttp.readyState == 4 && testHttp.status == 200){
				var jieshouData = testHttp.responseText;
				var obj = 	eval("("+jieshouData+")");
				cc.log("***********8"+jieshouData);
					if(obj.msg == "success" && obj.code ==0){//回传数据成功
						switch (type) {
						case 5://vip礼包接受数据及表现形式
							jieRi.self.jieRiHuoDong_data = [];
							jieRi.self.jieRiHuoDong_data = obj.result;
							switch (obj.result.status) {
							case 0:
								self.daoJiShiJian_diTu_kaishi.setVisible(false);
								self.daoJiShiJian_diTu_jieshu.setVisible(false);
								self.vip_shangBiaoTu.setVisible(true);
								var wenBenShu  = self.getChildByTag(22);
								var wenBenShu1  = self.getChildByTag(23);
								var wenBenShu2  = self.getChildByTag(24);
							
								if(obj.result.next_level == 9){
									wenBenShu.setVisible(false);
									wenBenShu1.setVisible(false);
									wenBenShu2.setVisible(false);
								}else{
									wenBenShu1.setString(obj.result.recharge_money);
									if(obj.result.next_level_icons<10000){
										wenBenShu2.setString(obj.result.next_level_icons);
									}else{
										wenBenShu2.setString(obj.result.next_level_icons/10000+"万");
									}
								}
								
								self.jr_tableView_shuiPing.reloadData();
								break;
							case 1:

								break;
							case 2:

								break;
							case 3:

								break;

							default:
								break;
							}
							break;
						case 4:
						case 6:
							jieRi.self.jieRiHuoDong_data = [];
							jieRi.self.jieRiHuoDong_data = obj.result;
							switch (obj.result.status) {
							case 1:
								self.daoJiShiJian_diTu_kaishi.setVisible(true);
								self.daoJiShiJian_diTu_jieshu.setVisible(false);
								self.vip_shangBiaoTu.setVisible(false);
								self.jieRiHuoDong_type = 1;
								self.jr_tableView.reloadData();
								break;
							case 2:
								self.daoJiShiJian_diTu_kaishi.setVisible(false);
								self.daoJiShiJian_diTu_jieshu.setVisible(true);
								self.vip_shangBiaoTu.setVisible(false);
								self.jieRiHuoDong_type = 2;
								self.jr_tableView.reloadData();
								break;
							case 3:

								break;

							default:
								break;
							}
							self.jieRiEndTime =  obj.result.seconds;
							self.schedule(self.daojishi_jieRi,1, cc.REPEAT_FOREVER);
							break;
						case 10:
							if(self.atid == 5){
								var sprite = element.getChildByTag(123);
								var yiLingQu = sprite.getChildByName("lingQu");
								var cell_bg = sprite.getChildByName("cell_bg");
								var liBaoTu = sprite.getChildByName("vip_tuBiao");
								var shouMing_feng = sprite.getChildByTag(15);
								var dianJILingQu = sprite.getChildByTag(30);
								yiLingQu.setVisible(true);
								dianJILingQu.setVisible(false);
								cell_bg.setSpriteFrame("VIP_cellBg(2).png");
								liBaoTu.setSpriteFrame("VIP_vip-"+idx+" (2).png");
								var label = jieRi.self.numberZhuanWan(jieRi.self.jieRiHuoDong_data.detail[idx].icons,  "res/shz/TanChuCeng/tanChuCengRes/vip_xianShuZhi2.fnt")
								shouMing_feng.removeElement(3);
								var re4 = new ccui.RichElementCustomNode(3, cc.color.WHITE, 255, label);
								shouMing_feng.insertElement(re4 ,3);
								jieRi.self.jieRiHuoDong_data.detail[element.getIdx()].obtain_status = 0;
							}else{
								if(element){
									element.setBright(false);
									element.setTouchEnabled(false);
									var btn_tile = element.getChildByName("tile");
									btn_tile.setVisible(false);
									var sprite = element.getParent() ;
									var shengYuBiLiShu = sprite.getChildByName("shengYuBiLiShu");
									jieRi.self.jieRiHuoDong_data.detail[idx].obtain_status = 0;
									jieRi.self.jieRiHuoDong_data.detail[idx].rest = jieRi.self.jieRiHuoDong_data.detail[idx].rest - 1;
									shengYuBiLiShu.setString(jieRi.self.jieRiHuoDong_data.detail[idx].rest);
								}
							}
						
							var XinXi = {Describe : obj.result.msg,errorCode : 0,isBack : false};
							var tishi = TiShiKuang.create(XinXi);
							cc.director.getRunningScene().addChild(tishi,1000);
							

							break;

						default:
							break;
						}
						
					
					}else{
						var XinXi = {Describe : obj.result.msg,errorCode : 0,isBack : false};
						var tishi = TiShiKuang.create(XinXi);
						cc.director.getRunningScene().addChild(tishi,1000);
					}
				}
				

		};
		cc.log("************"+data)
		if(type == 10){
			testHttp.send(data);
		}else{
			testHttp.send("");
		}
		
		if (!waitQuan.xianShi) {
			cc.director.getRunningScene().addChild(waitQuan,1000);
			waitQuan.reuse();
		}
	},
	onExit : function() {
		this._super();
		this.jieRiHuoDong_data = null;
	}
}); 

