var YINHANGURL = "http://m1-api.baiyishuihu.com/Insurerecord/getinsurerecord?";
var yinHang = {
		_JINE : [10000,100000,500000,1000000,USER_lUserScore],
		_Qzhanghuyinliang : null,
		_Qyinhangyinliang : null,
		_Q1w : null,
		_Q10w : null,
		_Q50w : null,
		_Q100W : null,
		_Qall : null,
		_Qcunqu : null,
		_Qquchu : null,
		_Qmima : null,
		_Qquxiao : null,
		
		_Czhanghuyinliang : null,
		_Cyinhangyinliang : null,
		_C1w : null,
		_C10w : null,
		_C50w : null,
		_C100W : null,
		_Call : null,
		_Ccunqu : null,
		_Ccunru : null,
		_Cquxuiao : null,
		_parent : null,
		_zhezhao : null,
		
		_jine : null,//操作的金额数
		_tableView : null,
		isShow : false,
		_receiveData : {data : []},//: {data : [{collectdate : "",tradetype : "",swapscore :"",sourceuserid : "",sourcebank : "",operationend : "",ROW_NUMBER : ""}]},
		
		_isFirst : true,
		_pageShowCount : 20,//每次向网站请求银行记录数据的条数
		_pages : 0,//根据每页显示的银行记录条数和总得记录数，得出的页数。
		_pageIndex : 1,//当前访问的是第几页。
		creatYinHangLayer : function(self) {
			var size = cc.winSize;
			yinHang.isShow = true;
			yinHang._parent = self;
			var rootBank = ccs.load("res/shz/TanChuCeng/GameHall_back.json").node;
			rootBank.x = size.width/2;
			rootBank.y = size.height/2;
			var zhezhao = TestPushBox.create(rootBank);
			self.addChild(zhezhao,100);
			yinHang._zhezhao = zhezhao;
			var rooBankBg = rootBank.getChildByName("CheckinBankBg_1");
			var chahao =rooBankBg.getChildByName("Button_chahao");
			chahao.addClickEventListener(function() {
				yinHang._receiveData =   {data : []};
				yinHang._pages = 0;
				yinHang._pageIndex = 1;
				yinHang._isFirst = true;
				yinHang.isShow = false;
				cc.pool.putInPool(zhezhao);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/yinhang"];
				removeResources(numberAry);
			});
			var rootQukuan = ccs.load("res/shz/TanChuCeng/qukuan.json").node;
			yinHang.quKuanJiemian(rootQukuan);
			var rootCunkuan = ccs.load("res/shz/TanChuCeng/cunkuan.json").node;
			yinHang.cunKuanJiemian(rootCunkuan);
			rootBank.addChild(rootQukuan);
			rootBank.addChild(rootCunkuan);
			rootCunkuan.setVisible(false);
			var rootJilu = this.creatYinhangJilu(rootBank);
			var qukaun = rooBankBg.getChildByName("Button_qukuan");	
			var cunkuan = rooBankBg.getChildByName("Button_cunkuan");
			var yinhangjilu = rooBankBg.getChildByName("Button_yinhangjilu");
			qukaun.setBright(false);
			qukaun.setTouchEnabled(false);
			qukaun.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				cc.log("取款")
                yinHang._receiveData =   {data : []};
                yinHang._pages = 0;
                yinHang._pageIndex = 1;
                yinHang._isFirst = true;
				qukaun.setBright(false);
				qukaun.setTouchEnabled(false);
				cunkuan.setBright(true);
				cunkuan.setTouchEnabled(true);
				yinhangjilu.setBright(true);
				yinhangjilu.setTouchEnabled(true);
				rootCunkuan.setVisible(false);
				rootQukuan.setVisible(true);
				rootJilu.setVisible(false);
			});
			cunkuan.addClickEventListener(function() {
				cc.log("存款");
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
                yinHang._receiveData =   {data : []};
                yinHang._pages = 0;
                yinHang._pageIndex = 1;
                yinHang._isFirst = true;
				cunkuan.setBright(false);
				cunkuan.setTouchEnabled(false);
				qukaun.setBright(true);
				qukaun.setTouchEnabled(true);
				yinhangjilu.setBright(true);
				yinhangjilu.setTouchEnabled(true);
				rootQukuan.setVisible(false);
				rootCunkuan.setVisible(true);
				rootJilu.setVisible(false);
			});
			yinhangjilu.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				cc.log("银行记录");
				yinHang.creatHttp();
				cunkuan.setBright(true);
				cunkuan.setTouchEnabled(true);
				qukaun.setBright(true);
				qukaun.setTouchEnabled(true);
				yinhangjilu.setBright(false);
				yinhangjilu.setTouchEnabled(false);
				rootQukuan.setVisible(false);
				rootCunkuan.setVisible(false);
				rootJilu.setVisible(true);
			});
			yinHang.chaxunYInHang();
		},
		creatYinhangJilu : function(rootBank) {
			var winSize = cc.winSize;
			var jiluBg = new cc.Sprite("#yh_xiao_bj.png");
			cc.log(jiluBg);
			jiluBg.x = 0;
			jiluBg.y = -40;
			rootBank.addChild(jiluBg);
			jiluBg.setVisible(false);
			
			var tableView = new myTableView(this,cc.size(860, 280));
			//var tableView = new cc.TableView(this, cc.size(900, 280));			
			this._tableView = tableView;
			tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
			tableView.ignoreAnchorPointForPosition(false);
			tableView.anchorX = 0.5;
			tableView.anchorY = 0.5;
			tableView.x = 425;
			tableView.y = 140;
			tableView.setDelegate(rootBank);
			tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
			jiluBg.addChild(tableView,20);
			return jiluBg;
		},
		reloadData:function () {cc.log("重新加载tableView")},
		tableCellAtIndex:function (table, idx) {
			var strValue = idx.toFixed(0);
			var cell = table.dequeueCell();
			var sprite;
			if (!cell) {
				cell = new cc.TableViewCell();
				sprite = ccs.load("res/shz/TanChuCeng/tableViewCell.json").node;
				sprite.x = 450;
				sprite.y = 20;		
				sprite.tag = 123
				cell.addChild(sprite);
			} 
				sprite = cell.getChildByTag(123);
				//时间
				var shijian = sprite.getChildByName("shijianText");
				var strSJ = yinHang._receiveData.data[idx].collectdate;
				if (strSJ) {
					shijian.setString(strSJ.toString());
				}
				
				//类型
				var leixing = sprite.getChildByName("Text_2");
				var strLX = yinHang._receiveData.data[idx].tradetype;
				if (strLX) {
					leixing.setString(strLX.toString());
				}	
				//金额
				var jine = sprite.getChildByName("Text_4");
				var strJE = yinHang._receiveData.data[idx].swapscore;
				if (strJE) {
//					var fuHao = strJE.substring(0,1);
//					strJE =strJE.substring(1);
//					strJE = Producer.formatShortNumber(strJE);
//					strJE = fuHao + strJE;
					jine.setString(strJE.toString());
				}
				
				//操作前
				var caozuoqian = sprite.getChildByName("Text_5");
				var strCZQ = yinHang._receiveData.data[idx].sourcebank;
				if (strCZQ) {
				//	strCZQ =	Producer.formatShortNumber(strCZQ);
					caozuoqian.setString(strCZQ.toString());
				}

				//操作后
				var caozuohou = sprite.getChildByName("Text_6");
				var strCZH = yinHang._receiveData.data[idx].operationend;
				if (strCZH) {
				//	strCZH =	Producer.formatShortNumber(strCZH);
					caozuohou.setString(strCZH.toString());
				}

				if (idx == yinHang._receiveData.data.length-7) {
					if (cell.getPositionY()<250 && yinHang._pageIndex<yinHang._pages) {
						yinHang._tableView._lastContainer = yinHang._tableView.getContentSize();
						yinHang._pageIndex++;
						yinHang.creatHttp();
					}
					cc.log("cell.getPositionY()",USER_dwUserID,cell.getPositionY(),yinHang._receiveData.data.length);
				}
			return cell;
		},
		tableCellSizeForIndex:function (table, idx) {
			return cc.size(900, 40);
		},
		numberOfCellsInTableView:function (table) {
			if (yinHang._receiveData && yinHang._receiveData.data.length>0) {
				return yinHang._receiveData.data.length;

			} else {
				return 0;
			}	
		},
		creatHttp : function() {
			var _this = this;
			var testHttp = cc.loader.getXMLHttpRequest();
			streamXHREvents(testHttp);
			var data = "userid="+USER_dwUserID+"&pageindex="+yinHang._pageIndex+"&pageshowcount="+yinHang._pageShowCount;
			if(shuiHuZhuanUrl){
				testHttp.open("POST", shuiHuZhuanUrl.YINHANGURL);
			}else{
				testHttp.open("POST", YINHANGURL);
			}
			testHttp.onreadystatechange = function() {
				if (waitQuan.xianShi) {
					waitQuan.unuse("YinHang231");
				} ;
				if(testHttp.readyState == 4 && testHttp.status == 200){
					var jieshouData = testHttp.responseText;
					var obj = 	eval("("+jieshouData+")");  
					if(obj.data){
						yinHang._receiveData.data = yinHang._receiveData.data.concat(obj.data);//每次访问网站后都把数组和原来的拼在一起
						yinHang._pages = obj.pages;
						yinHang._tableView.reloadData();
							yinHang._tableView.setOffset();
					}
				}else{

				}
			};
			testHttp.send(data);
			cc.log("()()()()"+data);
			if (!waitQuan.xianShi) {
				cc.director.getRunningScene().addChild(waitQuan,1000);
				waitQuan.reuse();
			}
		},
		chaxunYInHang : function() {
			if (!waitQuan) {
				waitQuan = dengDaiLayer.create();
				cc.director.getRunningScene().addChild(waitQuan,1001);
			}	
			loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_QUERY_INSURE_INFO,{dwUserID : USER_dwUserID,szUserkey : ""});

		},
		quKuanJiemian : function(qukaun) {
			yinHang._Qzhanghuyinliang = qukaun.getChildByName("zhanghuyinliang");
			yinHang._Qzhanghuyinliang.setString("0");
			yinHang._Qyinhangyinliang = qukaun.getChildByName("yinhangyinliang");
			yinHang._Qyinhangyinliang.setString("0");
			yinHang._Q1w = qukaun.getChildByName("Button_1w");
			yinHang._Q1w.addClickEventListener(yinHang.QbuttonNunCall(yinHang._Q1w));
			yinHang._Q10w = qukaun.getChildByName("Button_10w");
			yinHang._Q10w.addClickEventListener(yinHang.QbuttonNunCall(yinHang._Q10w));
			yinHang._Q50w = qukaun.getChildByName("Button_50w");
			yinHang._Q50w.addClickEventListener(yinHang.QbuttonNunCall(yinHang._Q50w));
			yinHang._Q100w = qukaun.getChildByName("Button_100w");
			yinHang._Q100w.addClickEventListener(yinHang.QbuttonNunCall(yinHang._Q100w));
			yinHang._Qallw = qukaun.getChildByName("Button_all");
			yinHang._Qallw.addClickEventListener(yinHang.QbuttonNunCall(yinHang._Qallw));
			//取款金额
			var qukuang_sp= qukaun.getChildByName("input_3");
			qukuang_sp.setVisible(false);
			yinHang._Qcunqu = new cc.EditBox(cc.size(305.00,47.00),new cc.Scale9Sprite("yh_shurukuang.png"));
			yinHang._Qcunqu.setFontColor(cc.color.BLACK);
			yinHang._Qcunqu.setFont("Arial",20);
			yinHang._Qcunqu.setPosition(qukuang_sp.x, qukuang_sp.y);
			yinHang._Qcunqu.setDelegate(this);
			yinHang._Qcunqu.setMaxLength(20);
			yinHang._Qcunqu.setPlaceHolder("  请输入存取金额");
			yinHang._Qcunqu.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);//修改为不使用密文
			yinHang._Qcunqu.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
			qukaun.addChild(yinHang._Qcunqu);
			//密码
			var qukuanmima_sp = qukaun.getChildByName("input_4");
			qukuanmima_sp.setVisible(false);
			yinHang._Qmima = new cc.EditBox(cc.size(305.00,47.00),new cc.Scale9Sprite("yh_shurukuang.png"));
			yinHang._Qmima.setFontColor(cc.color.BLACK);
			yinHang._Qmima.setPosition(qukuanmima_sp.x, qukuanmima_sp.y);
			yinHang._Qmima.setFont("Arial",20);
			yinHang._Qmima.setDelegate(this);
			yinHang._Qmima.setMaxLength(20);
			yinHang._Qmima.setPlaceHolder("  请输入密码");
			yinHang._Qmima.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);//修改为不使用密文
			yinHang._Qmima.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
			qukaun.addChild(yinHang._Qmima);
			
			yinHang._Qmima.setString(USER_szPassword);
			yinHang._Qquxiao = qukaun.getChildByName("Button_quxiao");
			yinHang._Qquxiao.addClickEventListener(function() {
				yinHang._receiveData =   {data : []};
				yinHang._pages = 0;
				yinHang._pageIndex = 1;
				yinHang._isFirst = true;
				yinHang.isShow = false;
				cc.pool.putInPool(yinHang._zhezhao);
			});
			yinHang._Qquchu = qukaun.getChildByName("Button_quchu");
			yinHang._Qquchu.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.shouFen);
				var Lmima = yinHang._Qmima.getString();
			    yinHang._jine = yinHang._Qcunqu.getString();
				if (Lmima==USER_szPassword) {
					if (!waitQuan.xianShi) {
						cc.director.getRunningScene().addChild(waitQuan,1000);
						waitQuan.reuse();
					}
					var hash = md5(USER_szPassword);
					loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_USER_TAKE_SCORE,{dwUserID : USER_dwUserID,lTakeScore : yinHang._jine,szPassword : hash,szMachineID : "",szUserkey : ""});
				}else {
					var data = {Describe : "银行密码错误\n请重新输入！",errorCode : 1026,isBack : false};
					var tishi = TiShiKuang.create(data);
					cc.director.getRunningScene().addChild(tishi,1000);
               }
			});
		},
		QbuttonNunCall : function(sender) {
			return function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				cc.log("sender",sender);
				cc.log("sender.getTag()",USER_lUserInsure);
				yinHang._JINE[4] = USER_lUserInsure;
				var tag = sender.getTag();
				switch (tag) {
				case 46:
					if(USER_lUserInsure<10000 ){

						yinHang._Qcunqu.setString(USER_lUserInsure);
					}else{
						yinHang._Qcunqu.setString(yinHang._JINE[tag-46].toString());
					}
					break;
				case 47:
					if(USER_lUserInsure<100000 ){
						yinHang._Qcunqu.setString(USER_lUserInsure);
					}else{
						yinHang._Qcunqu.setString(yinHang._JINE[tag-46].toString());
					}
					break;
                case 48:{
					if(USER_lUserInsure<500000 ){
						yinHang._Qcunqu.setString(USER_lUserInsure);
					}else{
						yinHang._Qcunqu.setString(yinHang._JINE[tag-46].toString());
                    }
                    }
					break;
				case 49:
					if(USER_lUserInsure<1000000 ){

						yinHang._Qcunqu.setString(USER_lUserInsure);
					}else{
						yinHang._Qcunqu.setString(yinHang._JINE[tag-46].toString());
					}
					break;
				case 50:
					yinHang._Qcunqu.setString(yinHang._JINE[tag-46].toString());
					break;


				default:
					break;
				}
//					yinHang._Qcunqu.setString(yinHang._JINE[tag-46].toString());
				
				
			};
		},
		cunKuanJiemian : function(qukaun) {
			yinHang._Czhanghuyinliang = qukaun.getChildByName("cun_zhanghuyinliang");
			yinHang._Cyinhangyinliang = qukaun.getChildByName("cun_yinhangyinliang");
			yinHang._C1w = qukaun.getChildByName("Button_cun_1w");
			yinHang._C1w.addClickEventListener(yinHang.CbuttonNunCall(yinHang._C1w));
			yinHang._C10w = qukaun.getChildByName("Button_cun_10w");
			yinHang._C10w.addClickEventListener(yinHang.CbuttonNunCall(yinHang._C10w));
			yinHang._C50w = qukaun.getChildByName("Button_cun_50w");
			yinHang._C50w.addClickEventListener(yinHang.CbuttonNunCall(yinHang._C50w));
			yinHang._C100w = qukaun.getChildByName("Button_cun_100w");
			yinHang._C100w.addClickEventListener(yinHang.CbuttonNunCall(yinHang._C100w));
			yinHang._Callw = qukaun.getChildByName("Button_cun_all");
			yinHang._Callw.addClickEventListener(yinHang.CbuttonNunCall(yinHang._Callw));
			
			var cunqu_sp = qukaun.getChildByName("input_5");
			cunqu_sp.setVisible(false);
			yinHang._Ccunqu = new cc.EditBox(cc.size(305.00,47.00),new cc.Scale9Sprite("yh_shurukuang.png"));
			yinHang._Ccunqu.setFont("Arial",20);
			yinHang._Ccunqu.setFontColor(cc.color.BLACK);
			yinHang._Ccunqu.setPosition(cunqu_sp.x, cunqu_sp.y);
			yinHang._Ccunqu.setDelegate(this);
			
			yinHang._Ccunqu.setMaxLength(20);
			yinHang._Ccunqu.setPlaceHolder("  请输入存取金额");
			yinHang._Ccunqu.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
			qukaun.addChild(yinHang._Ccunqu);
			
			yinHang._Cquxiao = qukaun.getChildByName("Button_cun_quxiao");
			yinHang._Cquxiao.addClickEventListener(function() {
				yinHang._receiveData =   {data : []};
				yinHang._pages = 0;
				yinHang._pageIndex = 1;
				yinHang._isFirst = true;
				yinHang.isShow = false;
				cc.pool.putInPool(yinHang._zhezhao);
			});
			yinHang._Ccunru = qukaun.getChildByName("Button_cun_cunru");
			yinHang._Ccunru.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.shouFen);
				if (!waitQuan.xianShi) {
					cc.director.getRunningScene().addChild(waitQuan,1000);
					waitQuan.reuse();
				}
				var Lmima = yinHang._Qmima.getString();
			    yinHang._jine = yinHang._Ccunqu.getString();
			    loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_USER_SAVE_SCORE,{dwUserID : USER_dwUserID,lSaveScore : yinHang._jine,szMachineID : "",szUserkey : ""});
			});
		},
		CbuttonNunCall : function(sender) {
			return function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				cc.log("sender",sender);
				cc.log("sender.getTag()",sender.getTag(),USER_lUserScore);
				yinHang._JINE[4] = USER_lUserScore;
				var tag = sender.getTag();
				switch (tag) {
				case 116:
					if(USER_lUserScore<10000 ){
					
						yinHang._Ccunqu.setString(USER_lUserScore);
					}else{
						yinHang._Ccunqu.setString(yinHang._JINE[tag-116].toString());
					}
					break;
				case 117:
					if(USER_lUserScore<100000 ){

						yinHang._Ccunqu.setString(USER_lUserScore);
					}else{
						yinHang._Ccunqu.setString(yinHang._JINE[tag-116].toString());
					}
					break;
				case 118:
					if(USER_lUserScore<500000 ){

						yinHang._Ccunqu.setString(USER_lUserScore);
					}else{
						yinHang._Ccunqu.setString(yinHang._JINE[tag-116].toString());
					}
					break;
				case 119:
					if(USER_lUserScore<1000000 ){

						yinHang._Ccunqu.setString(USER_lUserScore);
					}else{
						yinHang._Ccunqu.setString(yinHang._JINE[tag-116].toString());
					}
					break;
				case 120:
					yinHang._Ccunqu.setString(yinHang._JINE[tag-116].toString());
					break;
					

				default:
					break;
				}

			};
		},
		shuaXin : function(){
			yinHang._Qzhanghuyinliang.setString(Producer.changeNumberToString(USER_lUserScore));
			yinHang._Qyinhangyinliang.setString(Producer.changeNumberToString(USER_lUserInsure));
			yinHang._Czhanghuyinliang.setString(Producer.changeNumberToString(USER_lUserScore));
			yinHang._Cyinhangyinliang.setString(Producer.changeNumberToString(USER_lUserInsure));
		},

};