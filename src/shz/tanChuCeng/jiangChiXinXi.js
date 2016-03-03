var jiangChiXinXi = {
		_ZhouJiangLi :null,
		createJiangChiXinXiLayer : function(self) {
		

			var rootNode = ccs.load("res/shz/TanChuCeng/jiangChi.json").node;
			rootNode.x = cc.winSize.width/2;
			rootNode.y = cc.winSize.height/2;
			var zhezhao = TestPushBox.create(rootNode);
			self.addChild(zhezhao,95);

			var chaHao = rootNode.getChildByName("WH_chahao");
			chaHao.addClickEventListener(function() {
				cc.pool.putInPool(zhezhao);
			});
//			var zhoujiangli = rootNode.getChildByName("WH_zhoujiangli"); 
//			zhoujiangli.setVisible(false);
			var zhoujiangli_number = new cc.LabelTTF(USER_ZhouJiangLi.toString(),"Arial",30);
			this._ZhouJiangLi = zhoujiangli_number;
			zhoujiangli_number.setFontFillColor(cc.color.BLACK);
			zhoujiangli_number.x = 90;
			zhoujiangli_number.y = 140;
			rootNode.addChild(zhoujiangli_number,2);
			//查询周奖励，当收到服务器消息时刷新
			loginServer.sendMessage(MDM_MB_USER_SERVICE, SUB_MB_QUERY_WEEK_REWARD,{wKindID : 203});
			
			var meiRiJiangLi = rootNode.getChildByName("WN_cxmr");

			meiRiJiangLi.addClickEventListener(function() {
				cc.pool.putInPool(zhezhao);
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
//				paiHang._tianOrZhou =1;
//				paiHang.creatPaiHangLayer(self);
//				paiHang._jinRiBtn.setBright(true);
//				paiHang._jinRiBtn.setTouchEnabled(true);
//				paiHang._benZhouBtn.setBright(true);
//				paiHang._benZhouBtn.setTouchEnabled(true);
//				paiHang._zuoRiBtn.setBright(false);
//				paiHang._zuoRiBtn.setTouchEnabled(false);
//				paiHang._shangZhouBtn.setBright(true);
//				paiHang._shangZhouBtn.setTouchEnabled(true);
				paihangbanglayer.creatPaiHangLayer(self,2);
				
			});

			var meiZhouJiangLi = rootNode.getChildByName("WH_cxmz");

			meiZhouJiangLi.addClickEventListener(function() {
				cc.pool.putInPool(zhezhao);
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
//				paiHang._tianOrZhou =2;
//				paiHang.creatPaiHangLayer(self);
//				paiHang._jinRiBtn.setBright(true);
//				paiHang._jinRiBtn.setTouchEnabled(true);
//				paiHang._benZhouBtn.setBright(true);
//				paiHang._benZhouBtn.setTouchEnabled(true);
//				paiHang._zuoRiBtn.setBright(true);
//				paiHang._zuoRiBtn.setTouchEnabled(true);
//				paiHang._shangZhouBtn.setBright(false);
//				paiHang._shangZhouBtn.setTouchEnabled(false);
				paihangbanglayer.creatPaiHangLayer(self,3);
				
			});
			
			var caXunGengDuo = rootNode.getChildByName("WN_cxgdxq");
			caXunGengDuo.addClickEventListener(function() {
				cc.pool.putInPool(zhezhao);
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				bangZhu.creatBangZhuLayer(self);
				bangZhu.pageView.scrollToPage(4);
				jiangChiXinXi.removeFrame();
				
			});

		},

}