/**
 * Created by baiyi on 15/11/20.
 */



var shortTips = cc.Node.extend({
    _cueStr : "",
    _fontName : "Arial",
    _fontSize : 24,
    _delayTime : 1.5,
    _percentPosition : cc.p(0.5,0.25),
    _cueLabel : null,
    _diKuang : null,
    ctor:function (Data) {
        this._super();
        var dikuang = new cc.DrawNode();
        this.addChild(dikuang,0,1);
        this._diKuang = dikuang;
       
        var cueLabel = new cc.LabelTTF(this._cueStr,"Arial",this._fontSize);
        this._cueLabel = cueLabel;
        cueLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        //cueLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(cueLabel,1,2);
        this.initWithDate(Data);
        return true;
    },
    initWithDate : function(Data){
        this._percentPosition = Data.percentPosition || this._percentPosition;
        this._cueStr = Data.cueStr || "说点什么呢?";
        this._fontName = Data.fontName || "Arial";
        this._fontSize = Data.fontSize || 24;
        this._delayTime = Data.delayTime || 1.0;
        this.setPosition(this._percentPosition.x*(cc.winSize.width),this._percentPosition.y*(cc.winSize.height));
        this._cueLabel.setString(this._cueStr);
        var disTance=  this._cueLabel.getBoundingBox().width/2;

        this._diKuang.drawSegment( cc.p(-disTance,0), cc.p(disTance,0), this._cueLabel.getBoundingBox().height, cc.color(56, 56, 56, 235) );
        this.runAction(cc.sequence(
            cc.delayTime(this._delayTime),
            cc.fadeOut(0.5),
            cc.callFunc(function(){
                cc.pool.putInPool(this);
            },this)
        ));
    },
    unuse : function(Data) {
    	this._diKuang.clear();
        this.removeFromParent(false);
        this.retain();
    },
    reuse : function(Data) {
        this.initWithDate(Data);
    },
    onEnter:function() {

        this._super();
    }

});

/**
 * var data = {
 * cueStr: string, 需要显示的提示内容
 * fontName: string, 提示文本的字体样式
 * fontSize: number, 提示文本的字体大小
 * percentPosition: ({x, y}|cc.Point)提示框在当前场景的位置的比例
 * delayTime : number,提示框停留的时间
 * }
 * example :
 * var Data = {cueStr : "获取信息失败",fontName : "Arial",_fontSize : 24,percentPosition : cc.p(0.5,0.25),delayTime : 1.0};
 * shortTips.create(Data);
 */
shortTips.create = function(Data){
    if (cc.pool.hasObject(shortTips)){
    var shorttips = cc.pool.getFromPool(shortTips,Data);
    cc.director.getRunningScene().addChild(shorttips,2000,2000);
    cc.log("KKKKKKKKKKKKKKKKKKK",shorttips.getPositionX(),shorttips.getPositionY(),shorttips.getAnchorPoint().x);
    return shorttips;
    }else{
    var shorttips = new shortTips(Data);
    cc.director.getRunningScene().addChild(shorttips,2000,2000);
    return shorttips;
    };
};