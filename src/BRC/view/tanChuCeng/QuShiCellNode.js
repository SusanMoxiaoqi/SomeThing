var brc = brc || {};
//趋势的单元
brc.qushicell = cc.Node.extend({
	_qushiCell : null,
	_quShiDi_btn : null,
	_shaiZiNod : null,
	_duiZiDi : null,
	_shaiZiAry : [],
	ctor:function (ary) {
		this._super();
		this.init(ary);
		return true;
	},

	onEnter : function() {
		this._super();
	},

	init : function(ary) {
		var self = this;
		self._qushiCell = new ccs.load("res/br_res/QushiCell.json").node;
		self.addChild(self._qushiCell, 10,1);
		self._quShiDi_btn = self._qushiCell.getChildByName("BR_cell_bg");
		self._duiZiDi = self._qushiCell.getChildByName("QS_duiZiTu");
		self._shaiZiAry = ary;
	},

	//刷新趋势信息
	setCellMsg : function() {
		var number = self._shaiZiAry[0] + self._shaiZiAry[1];

		if(self._shaiZiAry[0] == self._shaiZiAry[1]){
			self._duiZiDi.setVisible(true);
			if(number > 7){
				self._duiZiDi.setSpriteFrame("BR_QS_hongDuiZi.png");
			}else{
				self._duiZiDi.setSpriteFrame("BR_QS_lanDuiZi.png");
			}
		}else{
			self._duiZiDi.setVisible(false);
			if(number > 7){
				self._duiZiDi.setSpriteFrame("BR_QS_da.png");
			}else if(number == 7){
				self._duiZiDi.setSpriteFrame("BR_QS_he.png");
			}else if(number < 7){
				self._duiZiDi.setSpriteFrame("BR_QS_xiao.png");
			}
		}
	},
});