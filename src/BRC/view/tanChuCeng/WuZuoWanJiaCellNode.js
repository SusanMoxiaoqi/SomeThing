var brc = brc || {};
//无座玩家的单元
brc.wuzuowanjiacell = cc.Node.extend({
	_self : null,
	_playerCell : null,
	ctor:function (Data) { 
		this._super();
		_self = this;
		this.init();
		return true;
	},
	
	onEnter : function() {
		this._super();
	},
	
	init : function() {
		var playerCell = new ccs.load("res/br_res/WuZuoWanJiaCell.json").node;
		this.addChild(playerCell, 10,1);
		this._playerCell = playerCell;
		
		var faceImg = cc.Sprite.createWithSpriteFrameName(touXiangFrame[USER_wFaceID]);
		faceImg.x = -66;
		faceImg.y = -1;
		faceImg.setScaleX(0.46);
		faceImg.setScaleY(0.46);
		playerCell.addChild(faceImg,1,111);	
		
		var textJine = playerCell.getChildByName("Text_2");
		textJine.setVisible(false);

		var playerName = playerCell.getChildByName("playerName");
		
		_self.playerName = playerName;
		//玩家金额
		var playerJine = cc.LabelBMFont("20", "res/shz/TanChuCeng/tanChuCengRes/qd_1.fnt",130,cc.TEXT_ALIGNMENT_LEFT);
		playerJine.x = 28;
		playerJine.y = -17;
		playerCell.addChild(playerJine,10,121);
	},
	
	//刷新无座玩家信息信息
	setCellMsg : function(msgData) {
		var playerName = this._playerCell.getChildByName("playerName");
		playerName.setString(msgData.szNickName);
		var faceImg = this._playerCell.getChildByTag(111);
		cc.log("$$$$$$$$$$$$$$$",msgData.wFaceID);
		if(faceImg){
			faceImg.setSpriteFrame(touXiangFrame[msgData.wFaceID%8]);
		}
		var playerJine = this._playerCell.getChildByTag(121);
		if(msgData.lScore < 10000){
			playerJine.setString(msgData.lScore);
		}else{
			var lastCount = Math.floor(msgData.lScore/10000);
			playerJine.setString(lastCount+"万");
		}
		var countString = playerJine.getString();
		var countArray = countString.split("");
		playerJine.x = -31 + countArray.length/2*15;
	},
});

brc.wuzuowanjiacell.create = function(){
	if (cc.pool.hasObject(brc.wuzuowanjiacell)) {
		return cc.pool.getFromPool(brc.wuzuowanjiacell);
	}else{
		return new brc.wuzuowanjiacell();
	};
};