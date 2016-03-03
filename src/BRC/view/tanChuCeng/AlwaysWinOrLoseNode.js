var brc = brc || {};
//玩家连胜连败提示
brc.winorlosenode = cc.Node.extend({
	_winCount : null,
	_loseCount : null,
	ctor:function () { 
		this._super();
		
		var mainBg = cc.Sprite.create("res/br_res/baiRenTanChuRes/BRC_winandlose.png");
		this.addChild(mainBg);
		var winCount = new cc.LabelAtlas("0","res/br_res/baiRenTanChuRes/BRC_AlwayWin.png",13,16,"0");
		winCount.x = 55;
		winCount.y = 50;
		this._winCount = winCount;
		if(brc.Object._userInfor.WinLostStreak){
			winCount.setString(brc.Object._userInfor.WinLostStreak.dwWinStreak);
		}
		
		mainBg.addChild(winCount);
		var loseCount = new cc.LabelAtlas("0","res/br_res/baiRenTanChuRes/BRC_AlwayLose.png",13,16,"0");
		loseCount.x = 55;
		loseCount.y = 21;
		this._loseCount = loseCount;
		if(brc.Object._userInfor.WinLostStreak){
			loseCount.setString(brc.Object._userInfor.WinLostStreak.dwLostStreak);
		}
		
		mainBg.addChild(loseCount,1);
		return true;
	},
	
	//刷新数据
	updateCount : function() {
		if(this._winCount){
			if(brc.Object._userInfor.WinLostStreak){
				this._winCount.setString(brc.Object._userInfor.WinLostStreak.dwWinStreak);
			}
		}
		if(this._loseCount){
			if(brc.Object._userInfor.WinLostStreak){
				this._loseCount.setString(brc.Object._userInfor.WinLostStreak.dwLostStreak);
			}
		}
	},

	unuse : function() {
		this.removeFromParent(false);
	},
});