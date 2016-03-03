var AddLinesLayer = cc.Layer.extend({
	nodeArray : [],
	rootNode : null,
	ctor:function (size,LeftLightX,RightLightX) {
		this._super();	
		var widjet = ccs.load("res/shz/MainGameScene/AddLines.json");
		this.rootNode = widjet.node;
		this.addChild(this.rootNode, 0);
		for (var i = 0; i < 9; i++) {
			var node = {};
			var LlightStr = "Llight" + (i+1);
			var RlightStr = "Rlight" + (i+1);
			var LineStr = "line" + (i+1);
			node.Llight = this.rootNode.getChildByName(LlightStr);
			node.Llight.setVisible(false);
			node.Rlight = this.rootNode.getChildByName(RlightStr);
			node.Rlight.setVisible(false);
			node.Line = this.rootNode.getChildByName(LineStr);
			node.Line.setVisible(false);
			this.nodeArray[i] = node;
		}		
		return true;
	},
// 通过传输的参数判断第几条线是显示的（中奖时使用）
	judgementWhichOneLineDisplay : function(whichLine,istwinkle,time)
	{
		if (!istwinkle) {
			this.runAction(cc.Sequence(
					cc.callFunc(function() {
						this.nodeArray[whichLine].Llight.setVisible(true);
						this.nodeArray[whichLine].Rlight.setVisible(true);
						this.nodeArray[whichLine].Line.setVisible(true);
					}, this),
					cc.delayTime(time),
					cc.callFunc(function() {
						this.nodeArray[whichLine].Llight.setVisible(false);
						this.nodeArray[whichLine].Rlight.setVisible(false);
						this.nodeArray[whichLine].Line.setVisible(false);
					}, this)
					));

		}
		if(istwinkle){
			this.nodeArray[whichLine].Llight.runAction(cc.repeatForever(cc.blink(10.0, 10.0)));
			this.nodeArray[whichLine].Rlight.runAction(cc.repeatForever(cc.blink(10.0, 10.0)));
			this.nodeArray[whichLine].Line.runAction(cc.repeatForever(cc.blink(10.0, 10.0)));
		}
	},
	
//	通过传入的数值判断显示的线和灯的数量(判断压线数量时使用)
	setDisplayLinesAndLight:function(NumberOfLines){
		//cc.log("NumberOfLines = ",NumberOfLines,this.LineArray.length);
		var childArray =this.rootNode.getChildren();
		for ( var i in childArray) {
			childArray[i].setVisible(false);
			childArray[i].stopAllActions();
		}
		if(NumberOfLines == 0){
			return;
		}
		for (var num = 0; num < NumberOfLines; num++) {
			this.nodeArray[num].Llight.setVisible(true);
			this.nodeArray[num].Rlight.setVisible(true);
			this.nodeArray[num].Line.setVisible(true);
		}
	}

});