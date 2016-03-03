var xiTongURL = "http://m1-api.baiyishuihu.com/prizepool/messagelist?";
var deleUrl = "http://m1-api.baiyishuihu.com/prizepool/messagedelete?";
var cahKan = "http://m1-api.baiyishuihu.com/prizepool/messageread?"
	var xiTongXiaoXi = {
		_receiveData : [],
		_tableView : null,
		_scrollView : null,
		_scrollView_text : null,
		_xiaoXi_RecordTime :null,
		_xiaoxi_CH : null,
		_xiaoxi_YYZ : null,
		_msgid  : null,
		idx : null,
		creatXiTongXiaoXiLayer : function(self) {
			var rootSet = ccs.load("res/shz/TanChuCeng/xiTonXiaoXi.json").node;
			rootSet.x = cc.winSize.width/2;
			rootSet.y =  cc.winSize.height/2;
			var zhezhao = TestPushBox.create(rootSet);
			self.addChild(zhezhao,50);
			var queren =rootSet.getChildByName("xx_btn_guanbi");
			queren.addClickEventListener(function() {
				xiTongXiaoXi.isHaveNewMessage();
				xiTongXiaoXi._receiveData = [];
				cc.pool.putInPool(zhezhao);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/jc_sz_ts_xt"];
				removeResources(numberAry);
				
			});
			var chahao =rootSet.getChildByName("xx_btn_chahao");
			chahao.addClickEventListener(function() {
				cc.log("queren");
				xiTongXiaoXi.isHaveNewMessage();
				xiTongXiaoXi._receiveData = [];
				cc.pool.putInPool(zhezhao);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/jc_sz_ts_xt"];
				removeResources(numberAry);
			});
			
			var xiaoXi_Bg = rootSet.getChildByName("xx_xiaoxi_bg");

			this._tableView = cc.TableView(this,cc.size(260,360));
			
			this._tableView.x = xiaoXi_Bg.x-420;
			this._tableView.y = xiaoXi_Bg.y-190;
			this._tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
			this._tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
			this._tableView.setDelegate(this);
			
			rootSet.addChild(this._tableView,2);

			xiTongXiaoXi.creatHttp(1);

			this.xiaoxi_CH = rootSet.getChildByName("xx_text_biaoti");
			this.xiaoxi_CH.setString("");

			this.xiaoxi_YYZ = rootSet.getChildByName("xx_text_shumin");
			this.xiaoxi_YYZ.setString("");

			this._xiaoXi_RecordTime = rootSet.getChildByName("xx_text_shijian");
			this._xiaoXi_RecordTime.setString("");

			var scrollViewNoed= rootSet.getChildByName("Node_scrollView");
			this._scrollView = new ccui.ScrollView();
			this._scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
			this._scrollView.setTouchEnabled(true);
			this._scrollView.setContentSize(cc.size(500, 200));
			this._scrollView.x = 0;
			this._scrollView.y = 0;
			scrollViewNoed.addChild(this._scrollView , 10);
			
//			var sprite = cc.Sprite("res/shz/SHZLOGO.png");
//			sprite.x = this._scrollView.width/2;
//			sprite.y = this._scrollView.height/2;
//			this._scrollView.addChild(sprite);
			
			this._scrollView_text =new cc.LabelTTF("","Arial",20,cc.size(500));
			this._scrollView_text.setFontFillColor(cc.color.BLACK);
			this._scrollView_text.anchorX = 0;
			this._scrollView_text.anchorY = 1;
			this._scrollView_text.x = 0;
			this._scrollView_text.y = 200;
			this._scrollView.addChild(this._scrollView_text,1,10);
			var deleBtn = rootSet.getChildByName("xx_btn_shanchu");
			
			deleBtn.addClickEventListener(function() {
				if(xiTongXiaoXi._msgid){
					xiTongXiaoXi.creatHttp(3,xiTongXiaoXi.idx);
					for (var i = 0; i < xiTongXiaoXi._receiveData.length; i++) {
						if(xiTongXiaoXi._receiveData[i].ID == xiTongXiaoXi._msgid){
							xiTongXiaoXi._receiveData.splice(i,1);
							xiTongXiaoXi._tableView.reloadData();
//							xiTongXiaoXi.xiaoxi_YYZ.setString("");
//							xiTongXiaoXi.xiaoxi_CH.setString("");
//							xiTongXiaoXi._xiaoXi_RecordTime.setString("");
//							xiTongXiaoXi._scrollView_text.setString("");
							return;
						}
					}
				}
			});

			var deleAllBtn = rootSet.getChildByName("xx_btn_shanchuall");
			deleAllBtn.addClickEventListener(function() {
				xiTongXiaoXi.xiaoxi_YYZ.setString("");
				xiTongXiaoXi.xiaoxi_CH.setString("");
				xiTongXiaoXi._xiaoXi_RecordTime.setString("");
				xiTongXiaoXi._scrollView_text.setString("");
				xiTongXiaoXi.creatHttp(4);
				xiTongXiaoXi._receiveData = [];
				xiTongXiaoXi._tableView.reloadData();
			});
		},
		isHaveNewMessage : function() {
				if(xiTongXiaoXi._receiveData.length>0){
					cc.log("########1++"+xiTongXiaoXi._receiveData.length);
					for ( var key in xiTongXiaoXi._receiveData) {
						cc.log("))))))))11key",xiTongXiaoXi._receiveData[key].IsRead);
						if(xiTongXiaoXi._receiveData[key].IsRead == 0){
							cc.log("))))))))key",xiTongXiaoXi._receiveData[key].IsRead);
							GameHalll._messageBtn.getChildByTag(20).setVisible(true);
							USER_HaveMail =1;
							return ;
						}else{
							USER_HaveMail =0;
							GameHalll._messageBtn.getChildByTag(20).setVisible(false);
						}
					}
				}else{
					GameHalll._messageBtn.getChildByTag(20).setVisible(false);
				}
			
			
		},
		creatHttp : function(type,idx) {
		
			var testHttp = cc.loader.getXMLHttpRequest();
			streamXHREvents(testHttp);
			var data = "userid="+USER_dwUserID+"&kindid=203";
			switch (type) {
			case 1:
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.xiTongURL);
				}else{
					testHttp.open("POST", xiTongURL);
				}
				break;
			case 2:
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.cahKan);
				}else{
					testHttp.open("POST", cahKan);
				}
				data = "userid="+USER_dwUserID+"&kindid=203"+"&msgid="+xiTongXiaoXi._msgid+"&EmailStyle="+xiTongXiaoXi._receiveData[idx].EmailStyle;
				break;
			case 3:
				if(shuiHuZhuanUrl){
					testHttp.open("POST", shuiHuZhuanUrl.deleUrl);
				}else{
					testHttp.open("POST", deleUrl);
				}
				if(xiTongXiaoXi._receiveData){
					data = "userid="+USER_dwUserID+"&kindid=203"+"&msgid="+xiTongXiaoXi._msgid+"&EmailStyle="+xiTongXiaoXi._receiveData[idx].EmailStyle;
				}
				break;
			case 4:
				if(xiTongXiaoXi._receiveData){
					if(shuiHuZhuanUrl){
						testHttp.open("POST", shuiHuZhuanUrl.deleUrl);
					}else{
						testHttp.open("POST", deleUrl);
					}
				}
				break;

			default:
				break;
			}

			testHttp.onreadystatechange = function() {
				if (waitQuan.xianShi) {
					waitQuan.unuse("xiTongXiaoXi126");
				} ;
				if(testHttp.readyState == 4 && testHttp.status == 200){
					var jieshouData = testHttp.responseText;
					if(type == 1){
						cc.log("))))))))))"+jieshouData);
						var obj = 	eval("("+jieshouData+")");  
						if(obj.status == 1){
							if(obj.data){
								xiTongXiaoXi._receiveData = [];
								xiTongXiaoXi._receiveData = obj.data;
								xiTongXiaoXi._tableView.reloadData();
							}
						}
					}else if(type){
						cc.log("))))))))))"+jieshouData);
					}
				}else{

				}
				
			};
			testHttp.send(data);
			cc.log("DATA::"+data);
			if(type == 1){
				if (!waitQuan.xianShi) {
					cc.director.getRunningScene().addChild(waitQuan,1000);
					waitQuan.reuse();
				}
			}
		},
		//滑动事件
		scrollViewDidScroll:function (view) {
			for (var i = 0; i < xiTongXiaoXi._receiveData.length; i++) {
				var view;
				if(xiTongXiaoXi._tableView.cellAtIndex(i)){
					view=  xiTongXiaoXi._tableView.cellAtIndex(i).getChildByTag(101);
					view.setVisible(false);
					xiTongXiaoXi.idx = null;
				}
			}
		},
		scrollViewDidZoom:function (view) {

		},
		//cell点击事件
		tableCellTouched:function (table, cell) {
			var number = xiTongXiaoXi._receiveData[cell.getIdx()];
			xiTongXiaoXi.idx = cell.getIdx();
			for (var i = 0; i < xiTongXiaoXi._receiveData.length; i++) {
				var view;
				if(xiTongXiaoXi._tableView.cellAtIndex(i)){
					view=  xiTongXiaoXi._tableView.cellAtIndex(i).getChildByTag(101);
					view.setVisible(false);
					if(i == cell.getIdx()){
						view.setVisible(true);
					}
				}
			}
			var textBiaoTi = cell.getChildByTag(12);
			var xiaoXiType = cell.getChildByTag(13);
			xiTongXiaoXi._msgid = number.ID;
			xiTongXiaoXi.xiaoxi_YYZ.setString("水浒传游戏运营组");
			xiTongXiaoXi.xiaoxi_CH.setString("尊敬的用户：");
			xiTongXiaoXi._xiaoXi_RecordTime.setString(number.RecordTime);
			if(number.IsRead == 0){
				xiTongXiaoXi._receiveData[cell.getIdx()].IsRead = 1;
				xiTongXiaoXi.creatHttp(2,cell.getIdx());
			}
			xiTongXiaoXi._scrollView_text.setString(number.DescriptionInfo);
			textBiaoTi.setFontFillColor(cc.color(75,65,65,0));
			xiaoXiType.setFontFillColor(cc.color(75,65,65,0));
			textBiaoTi.setFontName("Arial");
			xiaoXiType.setFontName("Arial");
			var size = this._scrollView_text.getContentSize();
			this._scrollView.setInnerContainerSize(cc.size(size.width, size.height));
			if(size.height>200){
				this._scrollView_text.y = size.height;
			}else{
				this._scrollView_text.y =200;
			}
			var newImage = cell.getChildByTag(10);
			newImage.setVisible(false);
		},
		tableCellTouched2:function () {

		},
		tableCellSizeForIndex:function (table, idx) {
			return cc.size(260	, 58);
		},
		//创建cell
		tableCellAtIndex:function (table, idx) {
			var strValue = idx.toFixed(0);
			var cell = table.dequeueCell();
			var number =null;
			if(xiTongXiaoXi._receiveData.length>0){
				number = xiTongXiaoXi._receiveData[idx];
			}
			var isForNew;
			var textBiaoTi;
			var xiaoXiType;
			//cell复用
			if (!cell) {
				cell = new cc.TableViewCell();
				var layer = new cc.LayerColor(cc.color(246,223,169,0));

				layer.ignoreAnchor = false;
				layer.anchorX = 0.5;
				layer.anchorY = 0.5;
				layer.setContentSize(260, 58);
				layer.x = 260/ 2;
				layer.y = 58 / 2;
				layer.setVisible(false);
				
				cell.addChild(layer, 1, 101);
				isForNew = cc.Sprite.createWithSpriteFrameName("XTXX_new.png");
				isForNew.anchorX = 0;
				isForNew.anchorY = 1;
				isForNew.x = 0;
				isForNew.y =58;
				cell.addChild(isForNew, 2, 10);

				var xian = cc.Sprite.createWithSpriteFrameName("xian(1).png");
				xian.setScale(2, 1);
				xian.x = cell.width/2;
				xian.y = 2;
				cell.addChild(xian, 2, 11);

				textBiaoTi = new cc.LabelTTF("聚义堂奖励已发放", "Arial Black", 18,cc.size(140));
				textBiaoTi.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
				textBiaoTi.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
				textBiaoTi.setFontFillColor(cc.color.BLACK);
				textBiaoTi.anchorX = 0;
				textBiaoTi.anchorsY = 0;
				textBiaoTi.x = 100;
				textBiaoTi.y = 30;
				cell.addChild(textBiaoTi, 2, 12);

				xiaoXiType = new cc.LabelTTF("[消息]","Arial Black",20,cc.size(100));
				xiaoXiType.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
				xiaoXiType.setFontFillColor(cc.color.BLACK);
				xiaoXiType.anchorX = 0;
				xiaoXiType.anchorY = 0;
				xiaoXiType.width = 20;
				xiaoXiType.height = 30;
				xiaoXiType.x = 10;
				xiaoXiType.y = 20;
				cell.addChild(xiaoXiType, 2, 13);
			}
			cc.log("idx:"+idx);
		    if(number){
				isForNew = cell.getChildByTag(10);
				textBiaoTi =cell.getChildByTag(12);
				xiaoXiType = cell.getChildByTag(13)
				textBiaoTi.setFontFillColor(cc.color.BLACK);
				xiaoXiType.setFontFillColor(cc.color.BLACK);
				textBiaoTi.setFontName("Arial Black");
				xiaoXiType.setFontName("Arial Black");
				
				if(number.IsRead == 1){
					isForNew.setVisible(false);
					textBiaoTi.setFontFillColor(cc.color(75,65,65,0));
					xiaoXiType.setFontFillColor(cc.color(75,65,65,0));
					textBiaoTi.setFontName("Arial");
					xiaoXiType.setFontName("Arial");
				
				}else{
					isForNew.setVisible(true);
				}
				if(idx == 0){
					textBiaoTi.setFontFillColor(cc.color(75,65,65,0));
					xiaoXiType.setFontFillColor(cc.color(75,65,65,0));
					textBiaoTi.setFontName("Arial");
					xiaoXiType.setFontName("Arial");
					xiTongXiaoXi.xiaoxi_YYZ.setString("水浒传游戏运营组");
					xiTongXiaoXi.xiaoxi_CH.setString("尊敬的用户：");
					xiTongXiaoXi._xiaoXi_RecordTime.setString(number.RecordTime);
					cc.log("&&&"+number.description);
					xiTongXiaoXi._scrollView_text.setString(number.DescriptionInfo);
					if(number.IsRead == 0){
						xiTongXiaoXi._receiveData[idx].IsRead = 1;
						xiTongXiaoXi._msgid = number.ID;
						xiTongXiaoXi.creatHttp(2,idx);
					}
					isForNew.setVisible(false);
				}
				xiaoXiType = cell.getChildByTag(13)
				textBiaoTi.setString(number.title);
				xiaoXiType.setString("["+number.stylename+"]");
			
		    }
			return cell;

		},
		//加载cell的个数
		numberOfCellsInTableView:function (table) {
			
			return xiTongXiaoXi._receiveData.length;
		}

};