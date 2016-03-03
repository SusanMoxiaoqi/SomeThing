var JF_paiHang = {
		_tableView : null,
		dataTable : [],
		_rootPaihang : null,
		_self : null,
		creatJFpaiHangLayer : function(self) {
			var size = cc.winSize;
			zuZhiBack = false;
			var rootPaihang = ccs.load("res/shz/huoDong/JF_pangHangBang.json").node;
			rootPaihang.x = size.width/2;
			rootPaihang.y = size.height/2;
			var zhezhao = TestPushBox.create(rootPaihang);
			self.addChild(zhezhao,100);
			JF_paiHang._rootPaihang = rootPaihang;
			JF_paiHang._self = this;
			var queren = ccui.helper.seekWidgetByName(rootPaihang, "JF_guanBi_btn");
			var shuaXing = ccui.helper.seekWidgetByName(rootPaihang, "JF_shuaXin_btn");
			shuaXing.addClickEventListener(function() {
				loginServer.sendMessage(103,8);
			});
			queren.addClickEventListener(function() {
				cc.pool.putInPool(zhezhao);
			});
			//创建tableView
			this.creatPaiMingTableView(rootPaihang);

		},
		creatPaiMingTableView : function(rootPaihang) {
			var winSize = cc.winSize;
			var tableView = new cc.TableView(this, cc.size(500, 320));
			if(JF_paiHang._tableView ){
				JF_paiHang._tableView =null;
				JF_paiHang._tableView = tableView;
			}else{
				JF_paiHang._tableView = tableView;
			}
			
			tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
			tableView.ignoreAnchorPointForPosition(false);
			tableView.anchorX = 0.5;
			tableView.anchorY = 0.5;
			tableView.x = 0;
			tableView.y = -60+52;
			tableView.setDelegate(rootPaihang);
			tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
			rootPaihang.addChild(tableView,1);
			tableView.reloadData();
			var  sprite = ccs.load("res/shz/huoDong/JF_paiHangBangCell.json").node;
			sprite.x = 0;
			sprite.y = -185;
			sprite.tag = 23;
			rootPaihang.addChild(sprite,2);
			this.cellShuJuQingChu(JF_paiHang._rootPaihang);
			var cell_bg = sprite.getChildByName("JF_cellBg");
			cell_bg.setSpriteFrame("JFTCC_paihangbang-bg-wo.png");
			sprite.setVisible(false);
		},
		cellShuJuQingChu : function(rootPaihang) {
			var sprite  = rootPaihang.getChildByTag(23);
			sprite.getChildByName("JF_pingMing").setString("");
			sprite.getChildByName("JF_niCheng").setString("");
			sprite.getChildByName("JF_deFeng").setString("");
		},
		//本人数据填充
		gerRenTiaoShuJu : function(rootPaihang) {
			if(JF_paiHang.dataTable.length>0){
				var sprite  = rootPaihang.getChildByTag(23);
				sprite.setVisible(true);
				var JF_paiMing = sprite.getChildByName("JF_pingMing");
				var JF_niCheng = sprite.getChildByName("JF_niCheng");
				var JF_score = sprite.getChildByName("JF_deFeng");
				for ( var key in JF_paiHang.dataTable) {
					if(JF_paiHang.dataTable[key].UserID == USER_dwUserID){
						var number = parseInt(key);
						JF_paiMing.setString(number +1);
						JF_niCheng.setString(JF_paiHang.dataTable[key].NickName);
						JF_score.setString(JF_paiHang.dataTable[key].Score);
						return;
					}else{
						JF_paiMing.setString("未上榜");
						JF_niCheng.setString(USER_szNickName);
						JF_score.setString(huoDong_JF.self.zongDeFeng);
					}
				}
			}
	    },
	    //数据的填充
		shuJuTianChong : function(number,sprite) {
			var paiMingImage = sprite.getChildByTag(122);
			var paiming = sprite.getChildByName("paiming");
			var nicehng = sprite.getChildByName("nicehng");
			var shuying = sprite.getChildByName("shuying");
			var bianHuan = sprite.getChildByName("bianhua");
			var bianhuazhi = bianHuan.getChildByName("Text_4");
			var chengHao_text = sprite.getChildByTag(14);
		},
		tableCellAtIndex:function (table, idx) {
			var strValue = idx.toFixed(0);
			var cell = table.dequeueCell();
			var sprite;
			var JF_cellBg;
			var JF_paiMing;
			var JF_niCheng;
			var JF_score;
			if (!cell) {
				cell = new cc.TableViewCell();
				sprite = ccs.load("res/shz/huoDong/JF_paiHangBangCell.json").node;
				sprite.x = 250;
				sprite.y = 16;
				sprite.tag = 111;
				cell.addChild(sprite,2);
			}
			sprite = cell.getChildByTag(111);
			JF_cellBg = sprite.getChildByName("JF_cellBg");
			JF_paiMing = sprite.getChildByName("JF_pingMing");
			JF_niCheng = sprite.getChildByName("JF_niCheng");
			JF_score = sprite.getChildByName("JF_deFeng");
			JF_cellBg.setVisible(false);
			if(idx%2 == 0){
				JF_cellBg.setVisible(true);
			}
			
			if(JF_paiHang.dataTable.length>0){
				cc.log("$$$$$$$"+JF_paiHang.dataTable[idx].NickName);
				cc.log("$$$$$$$1"+JF_paiHang.dataTable[idx].Score);
				JF_paiMing.setString(idx+1);
				JF_niCheng.setString(JF_paiHang.dataTable[idx].NickName);
				JF_score.setString(JF_paiHang.dataTable[idx].Score);
			}else{
				cell.setVisible(false);
			}
			return cell;
		},
		tableCellSizeForIndex:function (table, idx) {
			return cc.size(500, 32);
		},
		numberOfCellsInTableView:function (table) {
			var length =0;
			if(JF_paiHang.dataTable.length>0){
				length = JF_paiHang.dataTable.length;
			}
			cc.log("########"+length);
			return length;
		},

};

