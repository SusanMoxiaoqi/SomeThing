/**
 * Created by baiyi on 15/12/28.
 */
//var drawNode = new cc.DrawNode();
//drawNode.drawSegment( cc.p(0,20), cc.p(0,-20), 5, cc.color(56, 56, 56, 235) );
//drawNode.setPosition(870,230);
//tableView.addChild(drawNode,10)

var myTableView  = cc.TableView.extend({
	_drawNode : null,
	_lineWidth : 5,
	_lastContainer : null,
	ctor : function(dataSource,viewSize){
		this._super(dataSource,viewSize);
        return true;
    },
    update : function(dt) {
    	var getDirection = this.getDirection();
    	switch (getDirection) {
    	case 	cc.SCROLLVIEW_DIRECTION_HORIZONTAL:
    		this.addScrollbarHeng();
			break;
    	case 	cc.SCROLLVIEW_DIRECTION_VERTICAL:
    		this.addScrollbarShu();
    		break;
    	case 	cc.SCROLLVIEW_DIRECTION_BOTH:
    		this.addScrollbarShu();
    		this.addScrollbarHeng();
    		break;
		default:
			break;
		}
	},
   addScrollbarHeng : function() {
	   var contentSize = this.getViewSize();
	   var containerSize = this.getContentSize();
	   if (containerSize.height == 0) {
		   return;
	   }
	   if (contentSize.width >= containerSize.width) {
		   this._drawNodeShu.clear();
		   this._drawNodeShu.drawSegment( cc.p(this._lineWidth,this._lineWidth), cc.p(contentSize.width-this._lineWidth,this._lineWidth), this._lineWidth, cc.color(56, 56, 56, 235) );
		   return;
	   };
	   var Offset = this.getContentOffset();
	   var nodek = 0;
	   var nodeP = null;
	   var tableK = contentSize.width;
	   var containerK = containerSize.width;
	   var offsetK = Offset.x;
	   var maxOffsetK = tableK - containerK;
	   nodek = (tableK/containerK)*tableK + 2*this._lineWidth;
	   nodeP = (tableK - nodek)*(offsetK/maxOffsetK)+nodek/2;
	   this._drawNodeHeng.clear();
	   if (Offset.x <= tableK - containerK) {
		   return;
	   };
	   this._drawNodeHeng.drawSegment( cc.p(nodeP+(nodek/2-this._lineWidth),this._lineWidth), cc.p(nodeP-(nodek/2-this._lineWidth),this._lineWidth), this._lineWidth, cc.color(56, 56, 56, 235) );
},
addScrollbarShu : function() {
	var contentSize = this.getViewSize();
	var containerSize = this.getContentSize();
	if (containerSize.height == 0) {
		return;
	};
	if (contentSize.height >= containerSize.height) {
		this._drawNodeShu.clear();
		this._drawNodeShu.drawSegment( cc.p(contentSize.width-2*this._lineWidth,contentSize.height-this._lineWidth), cc.p(contentSize.width-2*this._lineWidth,this._lineWidth), this._lineWidth, cc.color(56, 56, 56, 235) );
		return;
	};
	var Offset = this.getContentOffset();
	var nodek = 0;
	var nodeP = null;
	// 	var ss = this.getDirection();
	var tableK = contentSize.height;
	var containerK = containerSize.height;
	var offsetK = Offset.y;
	var maxOffsetK = tableK - containerK;
	nodek = (tableK/containerK)*tableK + 2*this._lineWidth;
	nodeP = (tableK - nodek)*(offsetK/maxOffsetK)+nodek/2;
	this._drawNodeShu.clear();
	if (Offset.y <= tableK - containerK) {
		return;
	};
	this._drawNodeShu.drawSegment( cc.p(contentSize.width-2*this._lineWidth,nodeP+(nodek/2-this._lineWidth)), cc.p(contentSize.width-2*this._lineWidth,nodeP-(nodek/2-this._lineWidth)), this._lineWidth, cc.color(56, 56, 56, 235) );
},
   setOffset : function() {
	   if (this._lastContainer == null) {
		return;
	};
	var offSetH = 0;
	   var nowConta = this.getContentSize();
	   var viewSize = this.getViewSize();
	   var offSetY =nowConta.height - this._lastContainer.height;
	   if (offSetY > viewSize.height) {
		   offSetH = offSetY-viewSize.height
	}else{
		offSetH = 0;
	}
	   this.setContentOffset(cc.p(0, -offSetH), false);
},
    onEnter : function(){
        this._super();
        if (typeof(eval("this.addChildToLayer")) == "undefined") {
        	return true;
        }
        var getDirection = this.getDirection();
        switch (getDirection) {
        case 	cc.SCROLLVIEW_DIRECTION_HORIZONTAL:
        	var drawNode = new cc.DrawNode();
        	this._drawNodeHeng = drawNode;
        	/**
        	 * make sure all children go to the Layer
        	 这个函数是专门为银行记录加的，为了添加滚动条。
        	 */
        	this.addChildToLayer(drawNode, 10, 100);
        	break;
        case 	cc.SCROLLVIEW_DIRECTION_VERTICAL:
        	var drawNode = new cc.DrawNode();
        	this._drawNodeShu = drawNode;
        	this._drawNodeShu.drawSegment( cc.p(0,10), cc.p(0,10), 5, cc.color(56, 56, 56, 235) );
        	this.addChildToLayer(drawNode, 10, 100);
        	break;
        case 	cc.SCROLLVIEW_DIRECTION_BOTH:
        	var drawNode = new cc.DrawNode();
        	this._drawNodeHeng = drawNode;
        	this.addChildToLayer(drawNode, 10, 100);
        	var drawNode1 = new cc.DrawNode();
        	this._drawNodeShu = drawNode1;
        	this.addChildToLayer(drawNode1, 10, 100);
        	break;
        default:
        	break;
        }
        this.scheduleUpdate();
        cc.log("MMMMMMMMMMMMMMMMMMM",this.getContentOffset().x,this.getContentOffset().y);
        var TouchListener = cc.EventListener.create({
            swallowTouches: true,
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
        });
    }
})
