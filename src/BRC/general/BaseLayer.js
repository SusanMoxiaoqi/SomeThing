
var brc	= brc ||{};
brc.BaseLayer=cc.Layer.extend({
	_bgFrame:null,
	_showbgAcion:false,
	_alphaNumber : 80,
	ctor:function(isDianJia){
		this._super();
		//渲染一个背景层，默认为黑色的半透明的
		//背景
		var bgFrame = cc.LayerColor(cc.color(0,0,0,this._alphaNumber));
		this.addChild(bgFrame,0);
		this._bgFrame=bgFrame;
		this.setAnchorPoint(cc.p(0.5,0.5));
		//设置当前层里面所有节点的描点也和该层相同
		this.ignoreAnchorPointForPosition(false);
		this.setContentSize(cc.winSize);
		this.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
		//开启底层不可点击触摸（层以下的UI都不可被点击）
		//点击时间
		//开启打开窗体是带的特效
		if(this._showbgAcion==true)
		{
			var obj=this;
			obj.setScale(0.8);
			if(obj!=null){
				var sl=cc.EaseIn.create(cc.ScaleTo.create(0.15,1.1),2);
				var sl2=cc.ScaleTo.create(0.15,1);
				var seq=cc.Sequence(sl,sl2);
				obj.runAction(seq);
			}
		}
		if(!isDianJia){
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
				onTouchBegan: function(){
					cc.log("#########%%%%%%");
					return true;
				}
			}, this);
		}
	},

	onEnter:function(){
		this._super();

	},
	onExit:function(){
		this._super();
	}
});