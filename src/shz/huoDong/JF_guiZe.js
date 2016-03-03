var JF_guiZe = {
		
		createGuiZeLayer : function(self) {

			zuZhiBack = false;
			var rootNode = ccs.load("res/shz/huoDong/JF_guiZe.json").node;
			rootNode.x = cc.winSize.width/2;
			rootNode.y = cc.winSize.height/2;
			var zhezhao = TestPushBox.create(rootNode);
			self.addChild(zhezhao,95);

			var chaHao = rootNode.getChildByName("JF_chaHao");
			chaHao.addClickEventListener(function() {
				cc.pool.putInPool(zhezhao);
			});

			var queDing = rootNode.getChildByName("JF_queDing");
			queDing.addClickEventListener(function() {
				cc.pool.putInPool(zhezhao);
			});

		},

}