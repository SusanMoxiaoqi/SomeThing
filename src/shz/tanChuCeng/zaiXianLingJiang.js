var zaiXianLingJiang = {
		lingJiangCiShu : 0,
		keLingJiangZongShu : 0,
		tableView : null,
		fengMiao_ary : [],
		isZaiXianLayerShow : false,
		_type : 0,
		_time : 0,
		_array : [],
		createZaiXianLayer : function(type,self) {
			var rootZaiXianLingJiang = ccs.load("res/shz/TanChuCeng/zaiXianLingJiang.json").node;
			rootZaiXianLingJiang.x = cc.winSize.width/2;
			rootZaiXianLingJiang.y = cc.winSize.height/2;
			var zhezhao = TestPushBox.create(rootZaiXianLingJiang);
			self.addChild(zhezhao,1000);
			var fanhui = rootZaiXianLingJiang.getChildByName("back_Btn");
			zaiXianLingJiang.isZaiXianLayerShow = true;
			this._type = type;
			if(type == 1){
				zaiXianLingJiang._time = mainScene_this.zaiXianLingQu_time;
				zaiXianLingJiang._array = mainScene_this.zaiXianLingQu_time_ary;
			}else if(type == 2){
				zaiXianLingJiang._time = brc.biBieController.self._paterLayer.zaiXianLingQu_time;
				zaiXianLingJiang._array = brc.biBieController.self._paterLayer.zaiXianLingQu_time_ary;
			}
			fanhui.addClickEventListener(function() {
				cc.pool.putInPool(zhezhao);
				zaiXianLingJiang.isZaiXianLayerShow = false;
				zaiXianLingJiang.fengMiao_ary = null;
				zaiXianLingJiang.fengMiao_ary = [];
				zaiXianLingJiang.tableView = null;
				var numberAry = ["res/shz/TanChuCeng/tanChuCengRes/zaiXianLingJia"];
				removeResources(numberAry);
			}		
			);
			var lingJiang_btn = rootZaiXianLingJiang.getChildByName("lingQu_btn");
			lingJiang_btn.addClickEventListener(function() {
				if(zaiXianLingJiang._time == 0){
					cc.audioEngine.playEffect(Effect_res.zaiXianLingJiang);
					gameSever.sendMessage(MDM_GF_GAME,SUB_C_GET_ONLINE_REWARD,{},GAMENAME);

				}else {
					cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
					
				}
			});
			if(zaiXianLingJiang.fengMiao_ary.length == 0){
				xianShiLiBao.daojishiLimited(rootZaiXianLingJiang, zaiXianLingJiang.fengMiao_ary, "juXiaCiLingJiang");			

			}
			
			var tablePoint = rootZaiXianLingJiang.getChildByName("Node_1");
		
			zaiXianLingJiang.tableView = new cc.TableView(this, cc.size(798, 182));
			zaiXianLingJiang.tableView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
			zaiXianLingJiang.tableView.ignoreAnchorPointForPosition(false);
			zaiXianLingJiang.tableView.x =0;
			zaiXianLingJiang.tableView.y =0;
			zaiXianLingJiang.tableView.setDelegate(tablePoint);
			tablePoint.addChild(zaiXianLingJiang.tableView,100);
			zaiXianLingJiang.tableView.reloadData();
			
			
		},
		tableCellTouched:function (table, cell) {
			cc.log("cell touched at index: " + cell.getIdx());
		},

		tableCellSizeForIndex:function (table, idx) {
			return cc.size(114, 182);
		},

		tableCellAtIndex:function (table, idx) {
			var strValue = idx.toFixed(0);
			var cell = table.dequeueCell();
			var sprite;
			var tu_bg;
		    var yiLingJiang;
		    var yuanBao;
		    var duiHuao;
		    var shiJian;
		    var huoJiangJingE;
			if (!cell) {
				cell = new cc.TableViewCell();
				sprite = ccs.load("res/shz/TanChuCeng/zaiXIanLingJiangCell.json").node;
				sprite.x = 57;
				sprite.y = 91;
				sprite.tag = 11;
				cell.addChild(sprite,2);
				tu_bg = sprite.getChildByName("cell_bg");
				shiJian =new cc.LabelTTF("","Arial",25);
				shiJian.setColor(cc.color.BLACK)
				shiJian.x = 0;
				shiJian.y =  70;
				sprite.addChild(shiJian,2,40);
				
				huoJiangJingE = cc.LabelBMFont("","res/shz/TanChuCeng/tanChuCengRes/qd_2.fnt");
				huoJiangJingE.x = 0;
				huoJiangJingE.y = -70;
				sprite.addChild(huoJiangJingE,2,41);
				
				
			} 
			sprite = cell.getChildByTag(11);
			tu_bg = sprite.getChildByName("cell_bg");
			yiLingJiang = sprite.getChildByName("yiLingQu");
			yuanBao = sprite.getChildByName("Sprite_3");
			duiHuao = sprite.getChildByName("Sprite_4");
			shiJian = sprite.getChildByTag(40);
			huoJiangJingE = sprite.getChildByTag(41);
			if(zaiXianLingJiang._array){
				var number = (idx+1);
				yuanBao.setSpriteFrame("zxlj_"+number+".png");
				if(zaiXianLingJiang.lingJiangCiShu > idx){
					tu_bg.setBright(true);
					yiLingJiang.setVisible(true);
					duiHuao.setVisible(true);
				}else {
					tu_bg.setBright(false);
					yiLingJiang.setVisible(false);
					duiHuao.setVisible(false);
				}
				var fengZhong ="" ;
				if(zaiXianLingJiang._array[idx][1]>=60){
					var shiJianShu = 0 ;
					for (var i = 0; i <= idx; i++) {
						if(idx > 0){
							shiJianShu +=Math.floor(zaiXianLingJiang._array[i][1]/60); 

						}else{
							shiJianShu = Math.floor(zaiXianLingJiang._array[idx][1]/60);
						}
						
					}
					fengZhong = shiJianShu;
				}
				shiJian.setString(fengZhong + "分钟");
				huoJiangJingE.setString(zaiXianLingJiang._array[idx][2]);
			}
			
			
			return cell;
		},

		numberOfCellsInTableView:function (table) {
			if(zaiXianLingJiang.keLingJiangZongShu ){
				return zaiXianLingJiang.keLingJiangZongShu ;
			}else{
				return 7;
			}
			
			
		},
}