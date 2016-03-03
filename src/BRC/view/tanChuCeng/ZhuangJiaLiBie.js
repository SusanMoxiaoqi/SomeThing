/**
 * Created by mac on 15/12/18.
 */
//输赢界面
var brc = brc || {};
brc.zhuangLieBiao = brc.BaseLayer.extend({
    _rootNode : null,
    _shangZhuangBtn : null,
    _zhuangTableView : null,
    _shangZhuangXianZhi : null,
    _messageCell : null,
    ctor:function(){
        this._super();
        this.init();
    },
    init : function () {
        var self = this;
        self._rootNode = new ccs.load("res/br_res/BR_zhuangLieBiao.json").node;
        self._rootNode.anchorX = 0.5;
        self._rootNode.anchorY = 0.5;
        self._rootNode.x = cc.winSize.width/2;
        self._rootNode.y = cc.winSize.height/2;
        self.addChild(self._rootNode,0,1);
        self._shangZhuangBtn =  self._rootNode.getChildByName("BR_shangZhuang");
        brc.btnDianJI(self._shangZhuangBtn,self.shangZhuangBtnClick, self);
        var tableView = new cc.TableView(this, cc.size(624, 220));
        self._zhuangTableView = tableView;
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.ignoreAnchorPointForPosition(false);
        tableView.anchorX = 0.5;
        tableView.anchorY = 0.5;
        tableView.x = 0;
        tableView.y = 50;
        tableView.setDelegate(self);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        self._zhuangTableView.reloadData();
        self._rootNode.addChild(tableView,0);
        self._shangZhuangXianZhi = self._rootNode.getChildByName("BR_shuNode");

        var str = Producer.BR_formatShortNumber( brc.Object._zhuangInfor.lApplyBankerCondition);
        var xianZhi = new cc.LabelBMFont(str,"res/br_res/ziTiZiYuan/BR_zijiyazhu.fnt");
        xianZhi.x = self._shangZhuangXianZhi.x + 20;
        xianZhi.y = self._shangZhuangXianZhi.y;
        self._rootNode.addChild(xianZhi);
        self._messageCell = self._rootNode.getChildByName("BR_selfMessage");
        self._messageCell.setVisible(false);
        self._cell = ccs.load("res/br_res/zhuang_Cell.json").node;
        self._cell.x  = self._messageCell.width/2;
        self._cell.y  = self._messageCell.height/2+10;
        self._messageCell.addChild(self._cell)
        var chaHaoBtn = self._rootNode.getChildByName("BR_chaHao");
        chaHaoBtn.setLocalZOrder(10);
        brc.btnDianJI(chaHaoBtn,function(){
            cc.pool.putInPool(self);
        },self);
        self.jianCeZhuangSelf();
    },
    jianCeZhuangSelf : function(){
        var self = this;
        var number1 = 1;
        var number;
        for(var key in brc.Object._zhuangJiaXinXi){
            if( brc.Object._zhuangJiaXinXi[key].dwUserID == USER_dwUserID){
                number1 = parseInt(key)+1;
                number = brc.Object._zhuangJiaXinXi[key];
            }
        }
        if(number){
            self._messageCell.setVisible(true);
            var paiMing = self._cell.getChildByName("BR_Z_paiDuiShu");
            var niCheng = self._cell.getChildByName("BR_Z_niCheng");
            var fenShu = self._cell.getChildByName("BR_Z_qianShu");
            var bt = self._cell.getChildByName("BR_Z_cellBg");
            bt.setVisible(false);
            paiMing.setString("等待"+number1);
            niCheng.setString(number.szNickName);
            fenShu.setString(number.lScore);
        }else{
            self._messageCell.setVisible(false);
        }
    },
    //弹出上庄列表的申请上庄
    shangZhuangBtnClick : function(self) {
        cc.log("------------");
        //申请庄家
        //var btn = self.getChildByName("BR_shangZhuang");
        if(!self._isQuXiao){
            if(USER_lUserScore >= brc.Object._zhuangInfor.lApplyBankerCondition){
                if(! brc.biBieController.self._jiShiShangZhuang){
                    brc.biBieController.self._jiShiShangZhuang = true;
                    brc.biBieController.self.scheduleOnce(function(){
                        brc.biBieController.self._jiShiShangZhuang = false;
                    },brc.Object._shangZhuangShiJian);
                    gameSever.sendMessage(brc.SUB_S_GAME,brc.SUB_C_APPLY_BANKER,{wApplyUser:brc.Object._yongHuXinXi[0].wChairID},BRCBIBEI);//申请庄家200，2
//				self.setShangZhuangBtn("JF_SZQX_btn1.png","JF_SZQX_btn.png",btn);
                    self._isQuXiao = true;
                }else{
                    string = "好汉，上庄时间需间隔"+brc.Object._shangZhuangShiJian+"秒~";
                    shortTips.create({cueStr :string,percentPosition : cc.p(0.5,0.5)});
                }

            }else{
                var string;
                if(brc.Object._zhuangInfor.lApplyBankerCondition>=10000){
                    limtCount = Math.floor(brc.Object._zhuangInfor.lApplyBankerCondition/10000);
                    string = "好汉，最低需要"+limtCount+"万才能上庄哦~";
                }else{
                    string = "好汉，最低需要"+brc.Object._zhuangInfor.lApplyBankerCondition+"才能上庄哦~";
                }
                shortTips.create({cueStr :string,percentPosition : cc.p(0.5,0.5)});
            }
        }else{
            if(!brc.biBieController.self._isZhuangJia){
                gameSever.sendMessage(brc.SUB_S_GAME,brc.SUB_C_CANCEL_BANKER,BRCBIBEI);//取消申请200，3
//				self.setShangZhuangBtn("JF_SZ_btn.png","JF_SZ_btn1.png",btn);
                self._isQuXiao = false;
            }else{
                if(brc.Object._gameInfor.cbGameStatus == 0){
                    gameSever.sendMessage(brc.SUB_S_GAME,brc.SUB_C_CANCEL_BANKER,BRCBIBEI);//取消申请200，3
//					self.setShangZhuangBtn("JF_SZ_btn.png","JF_SZ_btn1.png",btn);
                    self._isQuXiao = false;
                }else{
                    shortTips.create({cueStr : "当前无法下庄，请等待！",percentPosition : cc.p(0.5,0.5)});
                }
            }

        }

    },
    //创建上庄列表node
    createShangZhuangNode : function() {
        var self = this;
        self._SZ_node = self._rootNode.getChildByName("BR_SZ_node");
        self._rootNode.removeChildByName("BR_SZ_node");
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event){
                var pointDian =  touch.getLocation();
                if(!clipper2._isHide){
                    if(pointDian.x >= 574.50-172 && pointDian.x <= 574.50+172 && pointDian.y >= 372.21-171 && pointDian.y <= 372.21+171){
                        cc.log("##########",pointDian.x,pointDian.y);
                    }else{
                        clipper2.runClipper(self);
                    }

                    return true;
                }else{
                    if(!clipper2._actionKaiShi){
                        return  false;
                    }else{
                        return true;
                    }
                }
            }
        }, self._SZ_node);
    },
    //tableView的代理方法
    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var sprite;
        var paiMing;
        var niCheng;
        var fenShu;
        if (!cell) {
            cell = new cc.TableViewCell();
            sprite = ccs.load("res/br_res/zhuang_Cell.json").node;
            sprite.x = 312;
            sprite.y = 27;
            sprite.tag = 10;
            cell.addChild(sprite,2);
        }
        sprite = cell.getChildByTag(10);
        paiMing = sprite.getChildByName("BR_Z_paiDuiShu");
        niCheng = sprite.getChildByName("BR_Z_niCheng");
        fenShu = sprite.getChildByName("BR_Z_qianShu");
        if(brc.Object._zhuangJiaXinXi.length > 0){
            var number = brc.Object._zhuangJiaXinXi[idx];
            paiMing.setString("等待"+(idx+1));
            niCheng.setString(number.szNickName);
            fenShu.setString(number.lScore);
        }
        return cell;
    },
    tableCellSizeForIndex:function (table, idx) {
        return cc.size(623, 55);
    },
    numberOfCellsInTableView:function (table) {
        var length =0;
        if(brc.Object._zhuangJiaXinXi.length > 0){
            length = brc.Object._zhuangJiaXinXi.length ;
        }
        return length;
    },
    unuse : function() {
        var self = this;
        self.removeFromParent(false);
    },
    reuse : function() {
        var self = this;
        self._zhuangTableView.reloadData();
        self.jianCeZhuangSelf();
    }
});

brc.zhuangLieBiao.create = function(){
    if (cc.pool.hasObject(brc.zhuangLieBiao)) {
        return cc.pool.getFromPool(brc.zhuangLieBiao);
    }else{
        return new brc.zhuangLieBiao();
    };
};