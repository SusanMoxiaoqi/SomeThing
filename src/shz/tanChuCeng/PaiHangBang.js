
var PAIHANGURL_JIRI = "http://m1-api.baiyishuihu.com/prizepool/prizetoday?";
var PAIHANGURL_ZUOTIAN = "http://m1-api.baiyishuihu.com/prizepool/prizeyesterday?";
var PAIHANGURL_BENZHOU = "http://m1-api.baiyishuihu.com/prizepool/prizeweek?";
var PAIHANGURL_SHANGZHOU = "http://m1-api.baiyishuihu.com/prizepool/prizelastweek?";
var PAIHANGURL_LINGQU = "http://m1-api.baiyishuihu.com/prizepool/acceptprize?";
//var PAIHANGURL_LINGQU = "http://172.16.10.53:8090/index.php/Api/Prizepool/acceptprize?";
//userid=123&kindid=203&rewardstyle=1
paiHang = {
		_jinRiBtn : null,
		_zuoRiBtn : null,
		_benZhouBtn : null,
		_shangZhouBtn : null,
		_shuaXinBtn : null,
		_jieShaoBtn : null,
		_lingqQuBtn : null,
		_tableView : null,
		_receiveData : [],
		_dangQianPaiHangBtnType : 1,
		_tianOrZhou : 0,
		_selfTimes : 0,
		_userprize : false,
		_benRen : null,
		_rootPaihang : null,
		creatPaiHangLayer : function(self) {
			var size = cc.winSize;
			var rootPaihang = ccs.load("res/shz/TanChuCeng/paiHang.json").node;
			rootPaihang.x = size.width/2;
			rootPaihang.y = size.height/2;
			var zhezhao = TestPushBox.create(rootPaihang);
			self.addChild(zhezhao,100);
			this._rootPaihang = rootPaihang;
			var queren = ccui.helper.seekWidgetByName(rootPaihang, "chahaoBtn");
			queren.addClickEventListener(function() {
				paiHang._tianOrZhou = 0;
				cc.log("queren");
				cc.pool.putInPool(zhezhao);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/jc_sz_ts_xt","res/shz/TanChuCeng/tanChuCengRes/juyitang"];
				removeResources(numberAry);
			});
			//创建tableView
			
			this.creatPaiMingTableView(rootPaihang);
			this._jinRiBtn = rootPaihang.getChildByName("jinriBtn");
			
			//默认显示今日排行榜
			this._jinRiBtn.setBright(false);
			this._jinRiBtn.setTouchEnabled(false);
			this._benZhouBtn = rootPaihang.getChildByName("benzhouBtn");
			this._zuoRiBtn = rootPaihang.getChildByName("zuoriBtn");
			this._shangZhouBtn = rootPaihang.getChildByName("shangzhouBtn");
			this._shuaXinBtn = rootPaihang.getChildByName("shuaxin");
			this._lingqQuBtn = rootPaihang.getChildByName("jiangli");
			this._lingqQuBtn.setVisible(false);
			this._jieShaoBtn = rootPaihang.getChildByName("jieshao");
			//创建连接
			this._jieShaoBtn.addClickEventListener(function() {
				cc.log("忠义堂介绍");
				cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/jc_sz_ts_xt.plist");
				var layer_jieshao = cc.Layer();
				var zhezhao_new = TestPushBox.create(layer_jieshao);
				self.addChild(zhezhao_new,100);

				var jieshao_bg = new cc.Sprite("#jieshaoshuoming.png");
				jieshao_bg.setNormalizedPosition(0.5, 0.5);
				layer_jieshao.addChild(jieshao_bg, 1000,1000);
				var btn_queding = ccui.Button();
				btn_queding.setTouchEnabled(true);
				btn_queding.setNormalizedPosition(0.5, 0.1);
				btn_queding.loadTextures("anniu1.png","anniu2.png","anniu3.png",ccui.Widget.PLIST_TEXTURE);
				var queSp = new cc.Sprite("#queding.png");
				queSp.setNormalizedPosition(0.5, 0.5);
				btn_queding.addChild(queSp);

				btn_queding.addTouchEventListener(function(sender, type){
					cc.log("queren");
					cc.pool.putInPool(zhezhao_new);
					zuZhiBack = true;
				}, this);
				jieshao_bg.addChild(btn_queding);

			});
			
			this._shuaXinBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				paiHang.creatHttp(paiHang._dangQianPaiHangBtnType);
			});
			this._lingqQuBtn.addClickEventListener(function(){
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				paiHang.creatHttp(5);
				});
			this._jinRiBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				paiHang.creatHttp(1);
				paiHang._jinRiBtn.setBright(false);
				paiHang._jinRiBtn.setTouchEnabled(false);
				paiHang._benZhouBtn.setBright(true);
				paiHang._benZhouBtn.setTouchEnabled(true);
				paiHang._zuoRiBtn.setBright(true);
				paiHang._zuoRiBtn.setTouchEnabled(true);
				paiHang._shangZhouBtn.setBright(true);
				paiHang._shangZhouBtn.setTouchEnabled(true);
			});
			this._benZhouBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				paiHang.creatHttp(2);
				paiHang._jinRiBtn.setBright(true);
				paiHang._jinRiBtn.setTouchEnabled(true);
				paiHang._benZhouBtn.setBright(false);
				paiHang._benZhouBtn.setTouchEnabled(false);
				paiHang._zuoRiBtn.setBright(true);
				paiHang._zuoRiBtn.setTouchEnabled(true);
				paiHang._shangZhouBtn.setBright(true);
				paiHang._shangZhouBtn.setTouchEnabled(true);
			});
			this._zuoRiBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				paiHang._tianOrZhou = 1;
				paiHang.creatHttp(3);
				paiHang._jinRiBtn.setBright(true);
				paiHang._jinRiBtn.setTouchEnabled(true);
				paiHang._benZhouBtn.setBright(true);
				paiHang._benZhouBtn.setTouchEnabled(true);
				paiHang._zuoRiBtn.setBright(false);
				paiHang._zuoRiBtn.setTouchEnabled(false);
				paiHang._shangZhouBtn.setBright(true);
				paiHang._shangZhouBtn.setTouchEnabled(true);
			});
			this._shangZhouBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				paiHang._tianOrZhou = 2;
				paiHang.creatHttp(4);
				paiHang._jinRiBtn.setBright(true);
				paiHang._jinRiBtn.setTouchEnabled(true);
				paiHang._benZhouBtn.setBright(true);
				paiHang._benZhouBtn.setTouchEnabled(true);
				paiHang._zuoRiBtn.setBright(true);
				paiHang._zuoRiBtn.setTouchEnabled(true);
				paiHang._shangZhouBtn.setBright(false);
				paiHang._shangZhouBtn.setTouchEnabled(false);
			});
			switch (paiHang._tianOrZhou) {
			case 0:
				paiHang.creatHttp(1);
				break;
			case 1:
				paiHang.creatHttp(3);
				break;
			case 2:
				paiHang.creatHttp(4);
				break;
			default:
				break;
			}
		},
		creatHttp : function(number) {
			var testHttp = cc.loader.getXMLHttpRequest();
			streamXHREvents(testHttp);
			var data = "userid="+USER_dwUserID+"&kindid=203";
		
			switch (number) {
			case 1:
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.PAIHANGURL_JIRI);
				}else{
					testHttp.open("POST", PAIHANGURL_JIRI);
				}
				
				paiHang._dangQianPaiHangBtnType = 1;//今日排行
				
				paiHang._lingqQuBtn.setVisible(false);
				break;
			case 2:
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.PAIHANGURL_BENZHOU);
				}else{
					testHttp.open("POST", PAIHANGURL_BENZHOU);
				}
				paiHang._dangQianPaiHangBtnType = 2;//本周排行
				paiHang._lingqQuBtn.setVisible(false);
				break;
			case 3:
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.PAIHANGURL_ZUOTIAN);
				}else{
					testHttp.open("POST", PAIHANGURL_ZUOTIAN);
				}
				paiHang._dangQianPaiHangBtnType = 3;//昨日排行
				paiHang._lingqQuBtn.setVisible(true);
				break;
			case 4:
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.PAIHANGURL_SHANGZHOU);
				}else{
					testHttp.open("POST", PAIHANGURL_SHANGZHOU);
				}
				paiHang._dangQianPaiHangBtnType = 4;//上周排行
				paiHang._lingqQuBtn.setVisible(true);
				break;
			case 5://领取奖励
				var xinxi;
				if(!paiHang._userprize && paiHang._tianOrZhou==1){
					xinxi = {Describe : "您未进入【昨日排行】前10名！\n无法领取奖励！",errorCode : 1012,isBack : false};
					var tishi = TiShiKuang.create(xinxi);
					cc.director.getRunningScene().addChild(tishi,1000);
					return;
				}
				if(!paiHang._userprize && paiHang._tianOrZhou==2){
					xinxi = {Describe : "您未进入【上周排行】前100名！\n无法领取奖励！",errorCode : 1013,isBack : false};
					var tishi = TiShiKuang.create(xinxi);
					cc.director.getRunningScene().addChild(tishi,1000);
					return;
				}
				
				data = "kindid=203&userid="+USER_dwUserID+"&rewardstyle="+paiHang._tianOrZhou;
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.PAIHANGURL_LINGQU);
				}else{
					testHttp.open("POST", PAIHANGURL_LINGQU);
				}
				
				break;
			default:
				break;
			}
			

			testHttp.onreadystatechange = function() {
				if (waitQuan.xianShi) {
					waitQuan.unuse("PaiHangBang200");
				} ;
				if(testHttp.readyState == 4 && testHttp.status == 200){
					var jieshouData = testHttp.responseText;
					var obj = 	eval("("+jieshouData+")");
					cc.log("***********&1"+jieshouData);
					if(obj.status == 1){
						paiHang._receiveData = [];
						paiHang._receiveData = obj.data;
						if((number == 3 || number == 4) ){
							for (var i = 0; i < paiHang._receiveData.length; i++) {
								if(paiHang._receiveData[i].userid == USER_dwUserID ){
									paiHang._selfTimes = paiHang._receiveData[i].times;
									if(paiHang._selfTimes == "0" && paiHang._tianOrZhou==1){
										paiHang._userprize = false;
										paiHang._lingqQuBtn.setBright(true);
										paiHang._lingqQuBtn.setTouchEnabled(true);
									} else if(paiHang._selfTimes == "0" && paiHang._tianOrZhou==2){
										paiHang._userprize = false;
										paiHang._lingqQuBtn.setBright(true);
										paiHang._lingqQuBtn.setTouchEnabled(true);
									}else if(paiHang._receiveData[i].isreceive == "1"){
										paiHang._userprize = false;
										paiHang._lingqQuBtn.setBright(false);
										paiHang._lingqQuBtn.setTouchEnabled(false);
									}else if(paiHang._receiveData[i].isreceive == "0"){
										paiHang._userprize = true;
										paiHang._lingqQuBtn.setBright(true);
										paiHang._lingqQuBtn.setTouchEnabled(true);
									}
									
									paiHang._tableView.reloadData();
									paiHang.gerRenTiaoShuJu();
									return;
								}
							}

						}
						if(number == 5){
							var xinxi = {Describe : "恭喜您，领取成功！\n您获得了 "+obj.data+" 银两！请到【银行】查看！",errorCode : 1014,isBack : false};
							var tishi = TiShiKuang.create(xinxi);
							cc.director.getRunningScene().addChild(tishi,1000);
							paiHang._lingqQuBtn.setBright(false);
							paiHang._lingqQuBtn.setTouchEnabled(false);
							if(obj.type == 0){
								USER_HaveReward = 0;
								GameHalll._listBtn.getChildByTag(20).setVisible(false);
							}else{

							}
							return ;
						}
						paiHang._tableView.reloadData();
						paiHang.gerRenTiaoShuJu();
						//cc.log(obj.data.toSource());
					}else if(obj.status != 1){//如果接收数据异常
						if(number!=5){
//							var xinxi = {Describe : "刷新数据失败，"+obj.msg+",请稍后再试。",type:0,errorCode : 0,isBack : false};
//							var tishi =TiShiKuang.create(xinxi);
//							cc.director.getRunningScene().addChild(tishi,1000);
							paiHang._receiveData = [];
							paiHang._tableView.reloadData();
							paiHang.gerRenTiaoShuJu();
							paiHang._lingqQuBtn.setBright(true);
							paiHang._lingqQuBtn.setTouchEnabled(true);
						}
						if(number==5){
//							var xinxi = {Describe : "领取失败！"+obj.msg+",请稍后再试。",errorCode : "",isBack : false};
//							var tishi = TiShiKuang.create(xinxi);
//							cc.director.getRunningScene().addChild(tishi,1000);
						}

						cc.log("没有数据！！");
					}else{
						cc.log("数据有错！！");
					}
				}else{
					
				}
				
			};
			testHttp.send(data);
			cc.log("@！！！！！！！！！！"+data);
			if (!waitQuan.xianShi) {
				cc.director.getRunningScene().addChild(waitQuan,1000);
				waitQuan.reuse();
			}
		},
		creatPaiMingTableView : function(rootPaihang) {
			var winSize = cc.winSize;
			var tableView = new cc.TableView(this, cc.size(849, 213));
			this._tableView = tableView;
			tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
			tableView.ignoreAnchorPointForPosition(false);
			tableView.anchorX = 0.5;
			tableView.anchorY = 0.5;
			tableView.x = 0;
			tableView.y = -60+24;
			tableView.setDelegate(rootPaihang);
			tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
			rootPaihang.addChild(tableView,20);
			tableView.reloadData();
			this._benRen = cc.Sprite.createWithSpriteFrameName("gerentiao.png");//本人数据展示调
			this._benRen.x = tableView.x;
			this._benRen.y = -34-104-28;
			rootPaihang.addChild(this._benRen,20);
			var  sprite = ccs.load("res/shz/TanChuCeng/paiHangCell.json").node;
			sprite.x = 424;
			sprite.y = 25;
			sprite.tag = 23;
			this._benRen.addChild(sprite,2);
			var cell_bg = sprite.getChildByName("cell_bg");
			sprite.setVisible(false);
			cell_bg.setVisible(false);
			
		},
		//本人数据填充
		gerRenTiaoShuJu : function() {
			var sprite  = this._benRen.getChildByTag(23);
			sprite.setVisible(true);
			var paiming1 = sprite.getChildByName("paiming");
			var paiminImage;
			if(!sprite.getChildByTag(122)){
				paiminImage = cc.Sprite.createWithSpriteFrameName("jyt_1.png");
				paiminImage.x = paiming1.x;
				paiminImage.y = paiming1.y;
				sprite.addChild(paiminImage,1,122);	
			}else{
				paiminImage = sprite.getChildByTag(122);
			}
			chengHao_text = new cc.LabelTTF("","Arial",25);
			chengHao_text.setFontFillColor(cc.color(161, 42, 161, 255));
			chengHao_text.x = -203;
			chengHao_text.y = 0.93;
			sprite.addChild(chengHao_text,20,14);
			if(sprite.getChildByName("chenghao")){
				sprite.removeChildByName("chenghao");
			}
			
			var  number ;
			for ( var key in paiHang._receiveData) {
				
				cc.log("{}{}{}{}{}{}{}{}:"+paiHang._receiveData[key].userid );
				if(paiHang._receiveData[key].userid == USER_dwUserID){
					number = paiHang._receiveData[key];
				}
			}
			this.shuJuTianChong(number, sprite);
	
			
		},
		shuJuTianChong : function(number,sprite) {
			var paiMingImage = sprite.getChildByTag(122);
			var paiming = sprite.getChildByName("paiming");
			var nicehng = sprite.getChildByName("nicehng");
			var shuying = sprite.getChildByName("shuying");
			var bianHuan = sprite.getChildByName("bianhua");
			var bianhuazhi = bianHuan.getChildByName("Text_4");
			var chengHao_text = sprite.getChildByTag(14);
			if(number.times<=3){
				if(number.times == 0){
					paiming.setVisible(true);
					paiMingImage.setVisible(false);
					paiming.setString("-");

				}else{
					var frameStr = "jyt_"+number.times+".png";
					paiming.setVisible(false);
					paiMingImage.setVisible(true);
					paiMingImage.setSpriteFrame(frameStr);
				}
			}else{
				paiming.setVisible(true);
				if(number.times == 0){
					paiming.setString("-");
				}else{
					paiming.setString(number.times);
				}

				paiMingImage.setVisible(false);
			}
			if( number.nickname){
				nicehng.setString(number.nickname);
			}else{
				nicehng.setString("");
			}
			if(number.star_mask){
				chengHao_text.setString(number.star_mask);
				if (number.times>36) {
					chengHao_text.setFontFillColor(cc.color(0, 175, 0, 255));
				}else{
					chengHao_text.setFontFillColor(cc.color(170, 0, 240, 255));
				}
			}else{
				chengHao_text.setString("未上榜");
				chengHao_text.setFontFillColor(cc.color.RED);
			}
			shuying.setString(number.userallwinlosescore);
			bianHuan.setVisible(true);
			bianhuazhi.setString(number.times_change);
			switch (number.times_style) {
			case "0":
				bianHuan.setVisible(false);
				break;
			case "1":
				bianHuan.setSpriteFrame("jyt_pmss.png");
				break;
			case "2":
				bianHuan.setSpriteFrame("jyt_pmxj.png");
				break;
			case "3":
				bianHuan.setSpriteFrame("jyt_wupaiming.png");
				bianhuazhi.setString("");
				break;

			default:
				break;
			}
		},
		tableCellAtIndex:function (table, idx) {
			var strValue = idx.toFixed(0);
			var cell = table.dequeueCell();
			var sprite;
			var paiminImage;
			var chengHao_text;
			if (!cell) {
				cell = new cc.TableViewCell();
				sprite = ccs.load("res/shz/TanChuCeng/paiHangCell.json").node;
				sprite.x = 424;
				sprite.y = 25;
				sprite.tag = 123;
				cell.addChild(sprite,2);
				var paiming1 = sprite.getChildByName("paiming");
				paiminImage = cc.Sprite.createWithSpriteFrameName("jyt_1.png");
				paiminImage.x = paiming1.x;
				paiminImage.y = paiming1.y;
				sprite.addChild(paiminImage,1,122);	
				chengHao_text = new cc.LabelTTF("","Arial",25);
				chengHao_text.setFontFillColor(cc.color(161, 42, 161, 255));
				chengHao_text.x = -203;
				chengHao_text.y = 0.93;
				sprite.addChild(chengHao_text,20,14);
				if(sprite.getChildByName("chenghao")){
					sprite.removeChildByName("chenghao");
				}
				
				
				
			} 
			if(paiHang._receiveData.length>0){
				sprite = cell.getChildByTag(123);
			
				var cell_bg = sprite.getChildByName("cell_bg");
				cell_bg.setVisible(false);
				if(paiHang._receiveData[idx].times >0){
					if(paiHang._receiveData[idx].times%2 == 0){
						cell_bg.setVisible(true);
					}
				}
				if(paiHang._receiveData[idx].times == 0){
					if(idx>0){
						if(paiHang._receiveData.length%2 == 0){
							cell_bg.setVisible(true);
						}
					}
					
				}
				paiHang.shuJuTianChong(paiHang._receiveData[idx], sprite);
			}
			
			return cell;
		},
		tableCellSizeForIndex:function (table, idx) {
			return cc.size(840, 52);
		},
		numberOfCellsInTableView:function (table) {
			var length =0; 
			if(paiHang._receiveData.length>0){
			
				length = paiHang._receiveData.length;
			}
			return length;
		},
		
};

