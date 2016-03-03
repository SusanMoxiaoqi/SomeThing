var liBaoData = "http://m1-api.baiyishuihu.com/index.php/Api/ExchangeCode/initializeData?";
var liBao_linqu = "http://m1-api.baiyishuihu.com/index.php/Api/ExchangeCode/getExchangeCode?";
var liBaoLingQu = {
		liBao_Data : null,
		_tableView : null,
		createLiBaoLayer : function(self){
			
			var rootLiBaoLinQu = ccs.load("res/shz/TanChuCeng/liBaoLingQu.json").node;
			rootLiBaoLinQu.x = cc.winSize.width/2;
			rootLiBaoLinQu.y = cc.winSize.height/2;
			var zhezhao = TestPushBox.create(rootLiBaoLinQu);
			
			self.addChild(zhezhao,1000);
			var fanhui = rootLiBaoLinQu.getChildByName("back_btn");
			fanhui.addClickEventListener(function() {
				liBao_Data = [];
				cc.pool.putInPool(zhezhao);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/liBaoLingQu"];
				removeResources(numberAry);
			}		
			);
			this.creatHttp(1);
			var winSize = cc.winSize;
			var tableView = new cc.TableView(this, cc.size(1136, 320));
			this._tableView = tableView;
			tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
			tableView.ignoreAnchorPointForPosition(false);
			tableView.anchorX = 0.5;
			tableView.anchorY = 0.5;
			tableView.x = 0;
			tableView.y = -160;
			tableView.setDelegate(rootLiBaoLinQu);
			rootLiBaoLinQu.addChild(tableView,100);
			tableView.reloadData();
			
			
			
		},
		creatHttp : function(type,idx) {
           cc.log("************"+idx);
			var testHttp = cc.loader.getXMLHttpRequest();
			var data ;
			if(type == 1){
				data = "user_uid="+USER_dwUserID;
				if(!shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.liBaoData);
				}else{
					testHttp.open("POST", liBaoData);
				}

			}else if(type == 2){
				data = "user_uid="+USER_dwUserID+"&exc_type="+liBaoLingQu.liBao_Data[idx].type;
				if(!shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.liBao_linqu);
				}else{
					testHttp.open("POST", liBao_linqu);
				}

			}

			streamXHREvents(testHttp);

			testHttp.onreadystatechange = function() {
				if (waitQuan.xianShi) {
					waitQuan.unuse();
				} ;

				if(testHttp.readyState == 4 && testHttp.status == 200){
					var jieshouData = testHttp.responseText;
					var obj = 	eval("("+jieshouData+")");
					cc.log("DATA::$$$$"+jieshouData);
					if(type == 1){
						if(obj.code == 0){
							liBaoLingQu.liBao_Data = obj.result;
							liBaoLingQu._tableView.reloadData();
						}else{
						}
					}else if(type == 2){
						if(obj.code == 0){
							
							var xinXi =  {Describe : obj.result.msg,errorCode : 4,isBack : true};
							var tishi = TiShiKuangZiDingYi.create(xinXi);
							cc.director.getRunningScene().addChild(tishi,1000);
							liBaoLingQu.creatHttp(1);

						}else{
							var xinXi =  {Describe : "",errorCode : 5,isBack : false};
							var tishi = TiShiKuangZiDingYi.create(xinXi);
							cc.director.getRunningScene().addChild(tishi,1000);
						}
					}
				}

			};
			testHttp.send(data);
			cc.log("DATA::"+data);
			if (!waitQuan.xianShi) {
				cc.director.getRunningScene().addChild(waitQuan,1000);
				waitQuan.reuse();
			}


		},
		tableCellTouched:function (table, cell) {
			cc.log("cell touched at index: " + cell.getIdx());
		},
	
		tableCellSizeForIndex:function (table, idx) {
			return cc.size(1136, 140);
		},

		tableCellAtIndex:function (table, idx) {
			var strValue = idx.toFixed(0);
			var cell = table.dequeueCell();
			var label;
			var sprite;
			var jingdutiao_bg ;
			var lingQu_btn ;
			var lingQu_btnCaXun;
			var lingQu_name;
			var lingQuBtn;
			var liBaoName;
			var total_text;
			var libao_count;
			
			if (!cell) {
				cell = new cc.TableViewCell();
				sprite = ccs.load("res/shz/TanChuCeng/liBaoCell.json").node;
				sprite.x = 568;
				sprite.y = 70;
				sprite.tag = 11;
				cell.addChild(sprite,2);
			} 
			if(liBaoLingQu.liBao_Data){
				
				sprite = cell.getChildByTag(11);
				 jingdutiao_bg = sprite.getChildByName("jingDuTiao_bg");
				 lingQu_btn = sprite.getChildByName("liBao_btn");
				 lingQu_name = sprite.getChildByName("liBao_text");
				 lingQuBtn = sprite.getChildByName("liBao_btn");
				 liBaoName = sprite.getChildByName("liBao_text");
				 lingQu_btnCaXun = sprite.getChildByName("liBao_btn_caXun");
				 libao_count = sprite.getChildByName("liBao_text_btn2");
				 total_text = sprite.getChildByTag(20);
				 if(sprite.getChildByTag(20)){
					 sprite.removeChildByTag(20);
				 }
				var number ;
				var number2;
				if(liBaoLingQu.liBao_Data[idx].total<=100){
					number = Math.round(liBaoLingQu.liBao_Data[idx].total);
					number2 = Math.round(liBaoLingQu.liBao_Data[idx].unused);
				}else if(liBaoLingQu.liBao_Data[idx].total<=1000){
					number = Math.round(liBaoLingQu.liBao_Data[idx].total/10);
					number2 = Math.round(liBaoLingQu.liBao_Data[idx].unused/10);
				}else if(liBaoLingQu.liBao_Data[idx].total<=10000){
					number = Math.round(liBaoLingQu.liBao_Data[idx].total/100);
					number2 = Math.round(liBaoLingQu.liBao_Data[idx].unused/100);
				}else if(liBaoLingQu.liBao_Data[idx].total<=100000){
					number = Math.round(liBaoLingQu.liBao_Data[idx].total/1000);
					number2 = Math.round(liBaoLingQu.liBao_Data[idx].unused/1000);
			    }else {
			    	number = Math.round(liBaoLingQu.liBao_Data[idx].total/10000);
			    	number2 = Math.round(liBaoLingQu.liBao_Data[idx].unused/10000);
			    }
				libao_count.setString(liBaoLingQu.liBao_Data[idx].content);
				var re1 = new ccui.RichElementText(1, cc.color.RED, 255, liBaoLingQu.liBao_Data[idx].unused, "Arial", 25);
				var re2 = new ccui.RichElementText(1, cc.color.WHITE, 255,"/"+liBaoLingQu.liBao_Data[idx].total, "Arial", 25);
				jingdutiao_bg = sprite.getChildByName("jingDuTiao_bg");
				total_text = new ccui.RichText();
				total_text.ignoreContentAdaptWithSize(true);
				total_text.x = jingdutiao_bg.x;
				total_text.y = jingdutiao_bg.y;
				total_text.tag = 20;
				total_text.pushBackElement(re1);
				total_text.pushBackElement(re2);
				sprite.addChild(total_text,11);
				
				liBaoLingQu.createJingDuTiao(number2/number,sprite);
				liBaoName.setString(liBaoLingQu.liBao_Data[idx].name);
				if(liBaoLingQu.liBao_Data[idx].assigned){
					lingQuBtn.setVisible(false);
					lingQu_btnCaXun.setVisible(true);
					lingQu_btnCaXun.addClickEventListener(function() {
						var xinXi =  {Describe :liBaoLingQu.liBao_Data[idx].code ,errorCode : 4,isBack : false};
						var tishi = TiShiKuangZiDingYi.create(xinXi);
						cc.director.getRunningScene().addChild(tishi,1000);
					});
				}else{
					lingQuBtn.setVisible(true);
					lingQu_btnCaXun.setVisible(false);
					lingQuBtn.tag = 101+idx;
					lingQuBtn.addClickEventListener(function() {
					liBaoLingQu.creatHttp(2,idx);
					});
				}
			}
			return cell;
		},

		numberOfCellsInTableView:function (table) {
			if(liBaoLingQu.liBao_Data){
				return liBaoLingQu.liBao_Data.length;
			}else{
				return 2;
			}
		},
		createJingDuTiao : function(num,view) {
			cc.log("**************2"+num);
			if(num){
				var jingdutiao_bg = view.getChildByName("jingDuTiao_bg");
				var popOnline =new ccui.ImageView("jindutiao.png",ccui.Widget.PLIST_TEXTURE);
				popOnline.setScale9Enabled(true);
				popOnline.anchorX = 0;
				popOnline.anchorY = 0.5;
				popOnline.setContentSize(cc.size(-531*num, 40));
				popOnline.setFlippedX(true);
				popOnline.ignoreContentAdaptWithSize(false);
				popOnline.x = -295;
				popOnline.y = jingdutiao_bg.y;
				view.addChild(popOnline,1);
			}
			
		}
}