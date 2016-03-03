var MixupCircleLayer = cc.Layer.extend({
	_McArr : new Array(),
	_name : "MixupCircleLayer",
	ctor:function () {
		this._super();
		for (var i = 0; i < 15; i++) {
		// 这里产生的精灵是继承自Node，在其上加了一个精灵，所以后面对其操作时，需要分清楚是对它本身操作，还是对其子节点操作
		var AddNum = Math.floor(Math.random()*800);
		var node1 = new MixupCircleLayout(AddNum);
		node1.x = 90 + Math.floor(i / 3) * 195;
		node1.y =  380 - (i % 3)*142;
		this._McArr[i] = node1;
		this.addChild(node1, 0);
		}
	},

	startRunAction : function() {
	
	},

	setPause:function(){
		for ( var i in this._McArr) {
			this._McArr[i].setPause();
		}

	},
	setResume:function(){
		for ( var i in this._McArr) {
			this._McArr[i].setResume();
		}
	},
	getname:function(){
		return this._name;
	},
	repleaceAnimation : function(){
	   for ( var i in this._McArr) {
		   
		   if( this._McArr[i]._mixup1.getNumberOfRunningActions()>0){
			   this._McArr[i]._mixup1.stopAllActions();
		   }
		   if(this._McArr[i]._mixup2.getNumberOfRunningActions()>0){
			 this._McArr[i]._mixup2.stopAllActions();
		    }
		   if( this._McArr[i]._isAction){
			   this._McArr[i]._isAction  = false; 
		   }
	      
	   }
	   },
	onEnter:function(){
		this._super();
		cc.log("main enter");
	},
	onExit:function(){
		this.isAction = 0;
		this._super();
	}
});