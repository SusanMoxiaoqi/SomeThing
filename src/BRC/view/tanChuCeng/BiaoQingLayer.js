//表情界面
var brc = brc || {};
brc.biaoqiang = cc.Node.extend({
	_rootNode : null,
	_wSpChairID : null,
	_biaoQingBtn : [],
	_biaoqingUse : [],
	_biaoqingUnUse : [],
	_xiaZuo_btn : null,
	_baiQingBeiJing : null,
	ctor : function() {
		this._super();
		brc.biaoqiang.self = this;
		this.init();
	},
	init : function() {
		var self = this;
		cc.spriteFrameCache.addSpriteFrames("res/br_res/baiRenTanChuRes/BiaoQing.plist");
		var rootNode = new ccs.load("res/br_res/BiaoQing.json").node;
		this._rootNode = rootNode;
		self.addChild(rootNode,10);
		self._baiQingBeiJing = self._rootNode.getChildByName("BR_mainBg_2");
		self._xiaZuo_btn = self._rootNode.getChildByName("BR_xiaZuoBtn");
		brc.btnDianJI(self._xiaZuo_btn,function(){
			gameSever.sendMessage(200,18,{wSpChairID :self._wSpChairID},BRCBIBEI);
			self.setVisible(false);
		},self);
		//表情可用时的初始状态
		var biaoqingArray = ["BR_FenNu_0.png","BR_Han_0.png","BR_DeYi_0.png","BR_Kun_0.png","BR_QingTianPili_0.png"
		                     ,"BR_JingE_0.png","BR_BaoCou_0.png","BR_aonao_0.png","BR_KeLian_0.png","BR_Daku_0.png"
		                     ,"BR_MaiMeng_0.png","BR_BaiFo_0.png","BR_DaZhaoHu_0.png","BR_DaXiao_0.png"];
		//表情不可用时的初始状态
		var biaoqingUnArray = ["biaoqingUn_0.png","biaoqingUn_1.png","biaoqingUn_2.png","biaoqingUn_3.png","biaoqingUn_4.png"
		                       ,"biaoqingUn_5.png","biaoqingUn_6.png","biaoqingUn_7.png","biaoqingUn_8.png","biaoqingUn_9.png"
		                       ,"biaoqingUn_10.png","biaoqingUn_11.png","biaoqingUn_12.png","biaoqingUn_13.png"];
		self._biaoqingUse = biaoqingArray;
		self._biaoqingUnUse = biaoqingUnArray;
		self._biaoQingBtn = [];
		var offSetY = [0,0,0,0,0,0,0,4,7,3,0,2,4,6];
		for(var i =0 ;i < 14; i++){
			var biaoqing = new ccui.Button;
			biaoqing.loadTextures(biaoqingArray[i], biaoqingArray[i],biaoqingArray[i],ccui.Widget.PLIST_TEXTURE);
			biaoqing.setScaleX(0.8);
			biaoqing.setScaleY(0.8);
			biaoqing.x = -143 + (i%5)*70;
			biaoqing.y = 75 - Math.floor(i/5)*70 - offSetY[i];
			rootNode.addChild(biaoqing,1,i);
			//表情按钮点击
			biaoqing.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				//当表情动画未播完，或2分钟内连续点击2个表情，则操作频繁
				if(!brc.biBieController.self._paterLayer._isSendBiaoQing || brc.biBieController.self._paterLayer._biaoqingCount >= 1){
					brc.biBieController.self._paterLayer.setBiaoQingPinFan();
					return;
				}
				//发送表情请求
				gameSever.sendMessage(brc.SUB_S_GAME,brc.SUB_C_BIAOQING,{wSpChairID : self._wSpChairID,dwExpressionID:this.tag},BRCBIBEI); //发送表情200，8
				self.setVisible(false);
				brc.biBieController.self._paterLayer._biaoqingBool = false;
				brc.biBieController.self._paterLayer._biaoqingCount ++;
			});
			self._biaoQingBtn.push(biaoqing);
		}
		brc.cleanArray.push(self._biaoQingBtn);
	},
	
	//区分表情是否可发送
	checkSendBiaoQing : function(bool) {
		var self = this;
		for(var i = 0;i < self._biaoQingBtn.length;i++){
			if(bool){//可用状态
				self._biaoQingBtn[i].loadTextures(self._biaoqingUse[i], self._biaoqingUse[i],self._biaoqingUse[i],ccui.Widget.PLIST_TEXTURE);
			}else{//灰色不可用状态
				self._biaoQingBtn[i].loadTextures(self._biaoqingUnUse[i], self._biaoqingUnUse[i],self._biaoqingUnUse[i],ccui.Widget.PLIST_TEXTURE);
			}
		}
	},
	reuse : function() {
		brc.biaoqiang.self = this;
	},
	unuse : function() {
		var self = this;
		self.removeFromParent(false);
	},
}); 

brc.biaoqiang.create = function(){
	if (cc.pool.hasObject(brc.biaoqiang)) {
		return cc.pool.getFromPool(brc.biaoqiang);	
	}else{
		return new brc.biaoqiang();
	};
};