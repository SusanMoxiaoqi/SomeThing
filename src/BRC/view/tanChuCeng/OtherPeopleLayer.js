//他人资料界面
var brc = brc || {};
brc.otherpeople = brc.BaseLayer.extend({
	_rootNode : null,
	_coinCountImage : null,
	ctor : function(data) {
		this._super(data);
		this.init(data);
	},
	init : function(data) {
		var self = this;
		if(!data){
			return;
		}
		cc.spriteFrameCache.addSpriteFrames("res/br_res/baiRenTanChuRes/OtherPeople.plist");
		var rootNode = new ccs.load("res/br_res/OtherPeopleNode.json").node;
		this._rootNode = rootNode;
		rootNode.x = cc.winSize.width/2;
		rootNode.y = cc.winSize.height/2;
		self.addChild(rootNode,10);
		//叉叉按钮
		var quit = ccui.helper.seekWidgetByName(rootNode, "other_quitbtn");
		quit.addClickEventListener(function() {
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			self.removeFromParent(false);
		});
		
		var headImage = rootNode.getChildByName("Sprite_11");//头像
		headImage.setSpriteFrame(touXiangFrame[data.wFaceID]);
		var nickName = rootNode.getChildByName("otherpeople_name");//昵称
		nickName.setString(data.szNickName);
		var id = rootNode.getChildByName("otherpeople_id");//id
		id.setString(data.dwUserID);
		var vip = rootNode.getChildByName("otherpeople_vip");//vip等级
		var vipstr = "vip"+ data.cbMemberOrder +".png";
		vip.setSpriteFrame(vipstr);
		var coinCount = rootNode.getChildByName("otherpeople_coin");//拥有财富
		if(!self._coinCountImage){//
			var jiangliCount = new cc.LabelBMFont("","res/shz/TanChuCeng/tanChuCengRes/number_shz.fnt");
			jiangliCount.x = coinCount.x;
			jiangliCount.y = coinCount.y;
			rootNode.addChild(jiangliCount,10);
			self._coinCountImage = jiangliCount;
		}
		self._coinCountImage.setString(Producer.changeNumberToString(data.lScore));
		var win = rootNode.getChildByName("otherpeople_win");//胜利场数
		win.setString("胜"+data.dwWinCount);
		var lose = rootNode.getChildByName("otherpeople_lose");//失败场数
		lose.setString("负"+data.dwLostCount);
	},
	unuse : function() {
		var numberAry =["res/br_res/baiRenTanChuRes/OtherPeople"];
		removeResources(numberAry);
		this.removeFromParent(false);
	},

	reuse : function(data) {
		var self = this;
		self.init(data);
	},
}); 

brc.otherpeople.create = function(data){
	if (cc.pool.hasObject(brc.otherpeople)) {
		return cc.pool.getFromPool(brc.otherpeople,data);	
	}else{
		return new brc.otherpeople(data);
	};
};