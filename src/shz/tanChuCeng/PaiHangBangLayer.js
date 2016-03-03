//排行榜界面
var paihangbanglayer = {
		_self :null,
		_rootPaihang : null,
		//接收数据
		_receiveData : [],
		//是否展开列表
		_addCellBoolFirst : false,
		//记录点击的cell
		_currentCellIndex : -1,
		//添加的cell高度
		_addCellHeigh : 0,
		_paimingxingwei : [],
		_addCellBntArray : [],
		//是否是cell的button点击
		_clickCellBool : false,
		//点击第几个cellbutton
		_cellButtonIndex : -1,
		_heightCell : 65-1,
		_cellButtonArray : [],
		//刚进入界面时，默认选中第一个
		_firstInViewBool : false,
		//记录被点击了按钮的cell索引，为了显示当前按钮为选中状态，
		//为了解决cell来回点击时，仍能记住最后一次点击button
		_selectCellButtonIndex : -1,
		//排行榜信息服务器tableview
		_paihangMsgTableView : null,
		//排行榜信息服务器的返回
		_paihangMsgData : [],
		//滚动提示
		_clippingNode : null,
		//介绍信息文本
		_jieshaoText : null,
		_stencil : null,
		_textMsgGundong : null,
		//我的得分
		_myvalue : 0,
		//标示是哪个榜单
		_signRankList : [],
		//是否已赞
		_zanBool : [false,false,false],
		//点赞成功提示
		_zanNode : null,
		//点赞按钮是否点击
		_zanBtnBool : true,
		//判断是点击的按钮类型  tableview 的button，点赞按钮，领取按钮
		_buttonTypeBool : [false,false,false],
		//接收到得排行榜id
		_recevieRankid : -1,
		//存储已经接收的排行榜信息
		_savePiahangMsgDataArray : [],
		//当前榜单已经点赞的个数
		_bangdanZanCount : 0,
		//自己的排名
		_selfPaimingci : -1,
		//排行榜是否打开
		isPaihangbangOpen : false,
		//当天奖池的钱数
		nowJiangchiCount : 0,
		//周奖励池的钱数
		weekJiangchiCount : 0,
		//排行榜领取奖励个数
		_paihangLiangquCount : 0,
		//是否领取过排行榜奖励
		_hadLingqu : 0,
		_zhezhao : null,
		_self : null,
		_hoongdianArray : [],
		_vipImg : null,
		//点击排行榜按钮时，记录一下该排行榜的信息
		_saveRankListArray : [],
		_firstShowIndex : -1,
		_systemTipsArray : [],//滚动信息数组
		_isMovingTipsBool : false,//记录滚动信息是否正在运行
		creatPaiHangLayer : function(self,showIndex) {
			paihangbanglayer._firstShowIndex = showIndex;
			paihangbanglayer.isPaihangbangOpen = true;
			var size = cc.winSize;
			var rootPaihang = ccs.load("res/shz/TanChuCeng/Paihangbanglayer.json").node;
			rootPaihang.x = size.width/2;
			rootPaihang.y = size.height/2;
			var zhezhao = TestPushBox.create(rootPaihang);
			self.addChild(zhezhao,1000);
//			paihangbanglayer._self = self;
			paihangbanglayer._zhezhao = zhezhao;
			this._rootPaihang = rootPaihang;
			cc.spriteFrameCache.addSpriteFrames("res/shz/TanChuCeng/tanChuCengRes/Paihangbanglayer.plist");
			
			//vip
			var vip = paihangbanglayer._rootPaihang.getChildByName("selfVipImg");
			vip.setVisible(false);
			paihangbanglayer._vipImg = cc.Sprite.createWithSpriteFrameName("vip0.png");
			paihangbanglayer._vipImg.x = vip.x;
			paihangbanglayer._vipImg.y = vip.y;
			paihangbanglayer._vipImg.setVisible(false);
			paihangbanglayer._rootPaihang.addChild(paihangbanglayer._vipImg,1,133);
			//关闭按钮点击
			var queren = ccui.helper.seekWidgetByName(rootPaihang, "chahaoBtn");
			queren.addClickEventListener(function() {
				paihangbanglayer.isPaihangbangOpen = false;
				paihangbanglayer._addCellBoolFirst = true;
				paihangbanglayer._clickCellBool = false;
				paihangbanglayer._currentCellIndex = 0;
				paihangbanglayer._cellButtonIndex = 0
				paihangbanglayer._receiveData = [];
				paihangbanglayer._firstInViewBool = true;
				paihangbanglayer._selectCellButtonIndex = 0;
				paihangbanglayer._hoongdianArray = [[false,false],[false,false,false,false],[false,false],[false,false]];
				paihangbanglayer._saveRankListArray = [[null,null],[null,null,null,null],[null,null],[null,null]];
				paihangbanglayer._paihangMsgData = [];
				paihangbanglayer._systemTipsArray = [];
				paihangbanglayer._isMovingTipsBool = false;
				paihangbanglayer._textMsgGundong.unschedule(this.updataMsg);
				cc.log("queren");
				cc.pool.putInPool(paihangbanglayer._zhezhao);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/Paihangbanglayer"];
				removeResources(numberAry);
				//发送排行榜是否有可领取的奖励请求
				loginServer.sendMessage(104,4,{dwUserID : USER_dwUserID});
			});
			
			//记录榜单信息
			//0今日得分榜1今日奖券榜2今日战绩榜3昨日战绩榜4本周战绩榜5上周战绩榜6今日消费榜7昨日消费榜8人气榜
			//paihangbanglayer._signRankList = [[2,4,3,5],[0,1],[6,7],[8,9]];
			paihangbanglayer._saveRankListArray = [[null,null],[null,null,null,null],[null,null],[null,null]];
			
			//查询周奖励，当收到服务器消息时刷新
			if (!waitQuan.xianShi) {
			cc.director.getRunningScene().addChild(waitQuan,1000);
			waitQuan.reuse(100);
			};
			loginServer.sendMessage(102,413,{wKindID : 203});
			loginServer.sendMessage(102,601,{wKindID : 203});
			//成功提示
			paihangbanglayer._zanNode = new cc.Node();
			paihangbanglayer._rootPaihang.addChild(paihangbanglayer._zanNode,30);
			var zanSprite = cc.Sprite.createWithSpriteFrameName("paihang_rect.png");
			var msg_text = new cc.LabelTTF("点赞成功，获得200两奖励","Arial",20);
			msg_text.setFontFillColor(cc.color(255, 255, 255, 255));
			msg_text.x = -2;
			paihangbanglayer._zanNode.addChild(zanSprite,1);
			paihangbanglayer._zanNode.addChild(msg_text,2);
			paihangbanglayer._zanNode.setVisible(false);
			
			_self = this;
			//排行榜按钮tableview
			this.createTableView(rootPaihang);

			//更新tableview数据
			paihangbanglayer._addCellBoolFirst = true;
			paihangbanglayer._clickCellBool = false;
			////0今日得分榜1今日奖券榜2今日战绩榜3昨日战绩榜4本周战绩榜5上周战绩榜6今日消费榜7昨日消费榜8人气榜
			switch (showIndex) {
			case 1:
				paihangbanglayer._currentCellIndex = 0;
				paihangbanglayer._cellButtonIndex = 0;
				//默认向服务器发送战绩榜今日消费排行请求
				loginServer.sendMessage(104,1,{dwUserID : USER_dwUserID,wRankListID:6});
				break;
			case 2:
				paihangbanglayer._currentCellIndex = 1;
				paihangbanglayer._cellButtonIndex = 0;
				//默认向服务器发送战绩榜今日排行请求
				loginServer.sendMessage(104,1,{dwUserID : USER_dwUserID,wRankListID:2});
				break;
			case 3:
				paihangbanglayer._currentCellIndex = 1;
				paihangbanglayer._cellButtonIndex = 1;
				//默认向服务器发送战绩榜本周排行请求
				loginServer.sendMessage(104,1,{dwUserID : USER_dwUserID,wRankListID:4});
				break;

			default:
				break;
			}
			
			paihangbanglayer._receiveData = [];
			paihangbanglayer._firstInViewBool = true;
			paihangbanglayer._selectCellButtonIndex = 0;
			paihangbanglayer._hoongdianArray = [[false,false],[false,false,false,false],[false,false],[false,false]];
			
			//发送是否有可领取的奖励请求
			loginServer.sendMessage(104,4,{dwUserID : USER_dwUserID});
			//排行榜按钮的信息
			//index：索引；name：名字；buttonshow：榜的按钮两种状态；cellbutton：每个榜的子列表的按钮两种状态; send_value:发送服务器请求时的参数
			paihangbanglayer._receiveData = [{"index":2,"name":"土豪榜","buttonShow":{"close":"paihang_tuhaobang1.png","open":"paihang_tuhaobang2.png"},"cellButtn":[{"unclick":"paihang_jinrixiaofei1.png","click":"paihang_jinrixiaofei2.png","send_value":6,"isHongdian":false},{"unclick":"paihang_zuorixiaofei1.png","click":"paihang_zuorixiaofei2.png","send_value":7,"isHongdian":true}]},
			                                 {"index":0,"name":"战绩榜","buttonShow":{"close":"paihang_zhanjibang1.png","open":"paihang_zhanjibang2.png"},"cellButtn":[{"unclick":"paihang_jinripaiming1.png","click":"paihang_jinripaiming2.png","send_value":2,"isHongdian":false},{"unclick":"paihang_benzhou.png","click":"paihang_benzhou2.png","send_value":4,"isHongdian":false},{"unclick":"paihang_zuoripaiming1.png","click":"paihang_zuoripaiming2.png","send_value":3,"isHongdian":true},{"unclick":"paihang_shangzhou1.png","click":"paihang_shangzhou2.png","send_value":5,"isHongdian":true}]},
			                                 {"index":1,"name":"收益榜","buttonShow":{"close":"paihang_shouyibang1.png","open":"paihang_shouyibang2.png"},"cellButtn":[{"unclick":"paihang_jinridefen1.png","click":"paihang_jinridefen2.png","send_value":0,"isHongdian":false},{"unclick":"paihang_jinriqiangquan1.png","click":"paihang_jinrijiangquan2.png","send_value":1,"isHongdian":false}]},
			                                 {"index":3,"name":"人气榜","buttonShow":{"close":"paihang_renqibang1.png","open":"paihang_renqibang2.png"},"cellButtn":[{"unclick":"paihang_jinrirenqi1.png","click":"paihang_jinrirenqi2.png","send_value":8,"isHongdian":false},{"unclick":"paihang_zuorirenqi1.png","click":"paihang_zuorirenqi2.png","send_value":9,"isHongdian":true}]}];
			paihangbanglayer._tableView.reloadData();
			//排名星位
			paihangbanglayer._paimingxingwei = ["天魁星","天罡星","天机星","天闲星","天勇星","天雄星","天猛星","天威星","天英星","天贵星","天富星","天满星","天孤星","天伤星","天立星","天捷星","天暗星","天佑星","天空星","天速星","天异星","天杀星","天微星","天究星","天退星","天寿星","天剑星","天平星","天罪星","天损星", "天败星","天牢星","天慧星","天暴星","天哭星","天巧星","地魁星","地煞星","地勇星","地杰星", "地雄星","地威星","地英星","地奇星","地猛星","地文星","地正星","地辟星","地阖星","地强星","地暗星","地轴星","地会星","地佐星","地佑星","地灵星","地兽星","地微星","地慧星","地暴星","地默星","地猖星","地狂星","地飞星","地走星","地巧星","地明星","地进星","地退星","地满星","地遂星","地周星","地隐星","地异星","地理星","地俊星","地乐星","地捷星","地速星","地镇星","地稽星","地魔星","地妖星","地幽星","地伏星","地僻星","地空星","地孤星","地全星","地短星","地角星","地囚星","地藏星","地平星","地损星","地奴星","地察星","地恶星","地丑星","地数星","地阴星","地刑星","地壮星","地劣星","地健星","地耗星","地贼星","地狗星"];

			//排行榜信息tableview
			this.createMessageTableView(rootPaihang);

//----------滚动信息----------//
			//绘制节点
			paihangbanglayer._stencil = new cc.DrawNode();
			var rectangle = [cc.p(0, 0),cc.p(710, 0),cc.p(710, 50),cc.p(0, 50)];
			var white = cc.color(255, 255, 0, 0);
			paihangbanglayer._stencil.drawPoly(rectangle, white, 1, white);
			//文本
			paihangbanglayer._textMsgGundong = new cc.LabelTTF("","Arial Black",25);
			paihangbanglayer._textMsgGundong.x = 500;
			paihangbanglayer._textMsgGundong.y = 17;
			paihangbanglayer._textMsgGundong.setFontFillColor(cc.color(255, 0, 0, 0));
			//裁剪节点
			paihangbanglayer._clippingNode = new cc.ClippingNode();
			paihangbanglayer._clippingNode.setPosition(-355,212);
			paihangbanglayer._clippingNode.setContentSize(paihangbanglayer._stencil.getContentSize());
			paihangbanglayer._clippingNode.stencil = paihangbanglayer._stencil;
			paihangbanglayer._clippingNode.addChild(paihangbanglayer._textMsgGundong);
			paihangbanglayer._rootPaihang.addChild(paihangbanglayer._clippingNode,10);
			paihangbanglayer._textMsgGundong.schedule(this.updataMsg,1,cc.REPEAT_FOREVER);

			//排行榜规则介绍
			var msgString = "规则介绍:\n1.每个榜单可点赞5次。\n2.每次点赞可获200两奖励。";
			paihangbanglayer._jieshaoText = new ccui.Text();
			paihangbanglayer._rootPaihang.addChild(paihangbanglayer._jieshaoText);
			paihangbanglayer._jieshaoText.ignoreContentAdaptWithSize(false);
			paihangbanglayer._jieshaoText.setFontSize(18);
			paihangbanglayer._jieshaoText.setColor(cc.color.BLACK);
			paihangbanglayer._jieshaoText.setSize(cc.size(198, 135));
			paihangbanglayer._jieshaoText.setFontName("Arial");
			paihangbanglayer._jieshaoText.x = 405;
			paihangbanglayer._jieshaoText.y = 122;
			paihangbanglayer._jieshaoText.setString(msgString);
			
			//标示是哪个榜单
			//0今日得分榜1今日奖券榜2今日战绩榜3昨日战绩榜4本周战绩榜5上周战绩榜6今日消费榜7昨日消费榜8人气榜
			paihangbanglayer._signRankList = [[6,7],[2,4,3,5],[0,1],[8,9]];
			var beizhu = paihangbanglayer._rootPaihang.getChildByName("Text_17");
			beizhu.setString("");
		},

		//创建排行榜按钮talbeview
		createTableView : function(rootPaihang){
			var winSize = cc.winSize;
			var tableView = new cc.TableView(this, cc.size(135, 471));
			paihangbanglayer._tableView = tableView;
			tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
			tableView.ignoreAnchorPointForPosition(false);
			tableView.anchorX = 0.5;
			tableView.anchorY = 0.5;
			tableView.x = -439;
			tableView.y = 6 - 30;
			tableView.tag = 1;
			tableView.setDelegate(_self);
			tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
			rootPaihang.addChild(tableView,2);
			tableView.reloadData();
		},

		//创建排行榜信息tableview
		createMessageTableView : function(rootPaihang){
			var winSize = cc.winSize;
			var tableView = new cc.TableView(this, cc.size(665, 350));
			tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
			tableView.ignoreAnchorPointForPosition(false);
			tableView.anchorX = 0.5;
			tableView.anchorY = 0.5;
			tableView.x = -29;
			tableView.y = -5;
			tableView.tag = 2;
			tableView.setDelegate(_self);
			tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
			rootPaihang.addChild(tableView,3);
			paihangbanglayer._paihangMsgTableView = tableView;
			tableView.reloadData();
		},

		//cell点击处理
		tableCellTouched:function (table, cell) {
			//排行榜信息tablview没有点击
			if(table.tag == 2){
				return;
			}
			cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
			//一下为排行榜按钮的点击处理
			cc.log("cell touched at index: " + cell.getIdx());
			var index = cell.getIdx();
			if(paihangbanglayer._clickCellBool){
				//当tableview滑动时，cell中的按钮向下不可点击
				paihangbanglayer._clickCellBool = false;
				return;
			}
			//记录点击的是第几个cell
			if(paihangbanglayer._currentCellIndex == cell.getIdx()){//如果点击的是同一个，并且已经打开该列表，则关闭该列表
				if(paihangbanglayer._addCellBoolFirst){
					paihangbanglayer._addCellBoolFirst = false;
				}else{
					paihangbanglayer._addCellBoolFirst = true
				}
			}else{
				paihangbanglayer._addCellBoolFirst = true
			}
			//默认选中当前cell的第一个button
			paihangbanglayer._cellButtonIndex = 0;
			paihangbanglayer._currentCellIndex = index;
			paihangbanglayer._tableView.reloadData();
			
			paihangbanglayer.checkIsRankListExist(paihangbanglayer._currentCellIndex, paihangbanglayer._cellButtonIndex);
			
			//tableview按钮被点击
			paihangbanglayer.setSelectBtnType(0);
			paihangbanglayer._zanNode.setVisible(false);
		},
		
		//生成排行榜列表每一项的内容 
		//table.tag:1排行榜按钮、2排行榜信息
		tableCellAtIndex:function (table, idx) {
			if(table.tag == 1){//排行榜按钮tableview
				return paihangbanglayer.tableCellAtIndexOfButton(table, idx);
			}else{//排行榜信息tableview
				return paihangbanglayer.tableCellAtIndexOfMessage(table, idx);
			}
		},

		//排行榜按钮tableview
		tableCellAtIndexOfButton : function(table, idx){
			var strValue = idx.toFixed(0);
			var cell = table.dequeueCell();
			var paiminImage;
			var hoongdian1;
			if (!cell) {
				cell = new cc.TableViewCell();
			}
			paiminImage = cell.getChildByTag(111);
			if(!paiminImage){
				paiminImage = cc.Sprite.createWithSpriteFrameName(paihangbanglayer._receiveData[0].buttonShow.close);
				paiminImage.x = 135/2;
				paiminImage.y = paihangbanglayer._heightCell/2;
				cell.addChild(paiminImage,1,111);
			}
			hoongdian1 = cell.getChildByTag(26);
			if(!hoongdian1){
				hoongdian1 = cc.Sprite.createWithSpriteFrameName("phb_hongdian.png");
				hoongdian1.x = paiminImage.x + 57;
				hoongdian1.y = paiminImage.y + 20;
				cell.addChild(hoongdian1,25,26);
			}
			hoongdian1.setVisible(false);
			
			for(var q = 0;q < paihangbanglayer._hoongdianArray[idx].length; q++){
				if(paihangbanglayer._hoongdianArray[idx][q]){
					hoongdian1.setVisible(true);
				}
			}
						
			//tableview中cell的初始状态
			paiminImage.setSpriteFrame(paihangbanglayer._receiveData[idx].buttonShow.close);
			
			//重置cell的位置
			paiminImage = cell.getChildByTag(111);
			paiminImage.y = 0 + paihangbanglayer._heightCell/2;
			hoongdian1 = cell.getChildByTag(26);
			hoongdian1.y = paiminImage.y + 20;
			//移除添加的部分
			for(var m = 0;m< 4;m++){
				if(cell.getChildByTag(m+1)){
					cell.removeChildByTag(m+1, false)
				}
			}
			//当tableview中的cell点击时，添加button分类
			if(paihangbanglayer._addCellBoolFirst){
				if(paihangbanglayer._currentCellIndex == idx){
					//点击后，重置tableview的cell图片
					paiminImage = cell.getChildByTag(111);
					paiminImage.y = paihangbanglayer._receiveData[idx].cellButtn.length*paihangbanglayer._heightCell + paihangbanglayer._heightCell/2;
					paiminImage.setSpriteFrame(paihangbanglayer._receiveData[idx].buttonShow.open);
					hoongdian1 = cell.getChildByTag(26);
					hoongdian1.y = paiminImage.y + 20;
					//cell中的第一个按钮
					var first_button = new ccui.Button;
					first_button.loadTextures(paihangbanglayer._receiveData[idx].cellButtn[0].unclick, paihangbanglayer._receiveData[idx].cellButtn[0].click, paihangbanglayer._receiveData[idx].cellButtn[0].click, ccui.Widget.PLIST_TEXTURE);
					first_button.x = 135/2;
					first_button.y = (paihangbanglayer._receiveData[idx].cellButtn.length - 1 - 0)*paihangbanglayer._heightCell + paihangbanglayer._heightCell/2;
					first_button.setSwallowTouches(false);
					//默认选中第一个
					if(paihangbanglayer._firstInViewBool || paihangbanglayer._cellButtonIndex == 0){
						first_button.setBright(false);
					}
					//当前为选中的button
					if(paihangbanglayer._selectCellButtonIndex == idx && paihangbanglayer._cellButtonIndex == 0){
						first_button.setBright(false);
					}
					cell.addChild(first_button, 3,0+1);
					if(paihangbanglayer._receiveData[idx].cellButtn[0].isHongdian && paihangbanglayer._hoongdianArray[idx][0]){
						var hongDian = cc.Sprite.createWithSpriteFrameName("phb_hongdian.png");
						hongDian.x = 123;
						hongDian.y = 53;
						first_button.addChild(hongDian,20);
					}

					//cell中的第二个按钮
					var second_button = new ccui.Button;
					second_button.loadTextures(paihangbanglayer._receiveData[idx].cellButtn[1].unclick, paihangbanglayer._receiveData[idx].cellButtn[1].click, paihangbanglayer._receiveData[idx].cellButtn[1].click, ccui.Widget.PLIST_TEXTURE);
					second_button.x = 135/2;
					second_button.y = (paihangbanglayer._receiveData[idx].cellButtn.length - 1 - 1)*paihangbanglayer._heightCell + paihangbanglayer._heightCell/2;
					second_button.setSwallowTouches(false);
					//当前为选中的button
					if(paihangbanglayer._selectCellButtonIndex == idx && paihangbanglayer._cellButtonIndex == 1){
						second_button.setBright(false);
					}
					if(paihangbanglayer._cellButtonIndex == 1 && paihangbanglayer._firstShowIndex == 3){
						second_button.setBright(false);
						first_button.setBright(true);
					}
					cell.addChild(second_button, 3,1+1);
					if(paihangbanglayer._receiveData[idx].cellButtn[1].isHongdian && paihangbanglayer._hoongdianArray[idx][1]){
						var hongDian = cc.Sprite.createWithSpriteFrameName("phb_hongdian.png");
						hongDian.x = 123;
						hongDian.y = 53;
						second_button.addChild(hongDian,20);
					}
					paihangbanglayer._cellButtonArray = [first_button,second_button];

					//战绩榜为4个，其他榜为2个
					if(paihangbanglayer._currentCellIndex == 1){
						//cell中的第三个按钮
						var third_button = new ccui.Button;
						third_button.loadTextures(paihangbanglayer._receiveData[idx].cellButtn[2].unclick, paihangbanglayer._receiveData[idx].cellButtn[2].click, paihangbanglayer._receiveData[idx].cellButtn[2].click, ccui.Widget.PLIST_TEXTURE);
						third_button.x = 135/2;
						third_button.y = (paihangbanglayer._receiveData[idx].cellButtn.length - 1 - 2)*paihangbanglayer._heightCell + paihangbanglayer._heightCell/2;
						third_button.setSwallowTouches(false);
						//当前为选中的button
						if(paihangbanglayer._selectCellButtonIndex == idx && paihangbanglayer._cellButtonIndex == 2){
							third_button.setBright(false);
						}
						cell.addChild(third_button, 3,2+1);
						if(paihangbanglayer._receiveData[idx].cellButtn[2].isHongdian && paihangbanglayer._hoongdianArray[idx][2]){
							var hongDian = cc.Sprite.createWithSpriteFrameName("phb_hongdian.png");
							hongDian.x = 123;
							hongDian.y = 53;
							third_button.addChild(hongDian,20);
						}

						//cell中的第四个按钮
						var fourth_button = new ccui.Button;
						fourth_button.loadTextures(paihangbanglayer._receiveData[idx].cellButtn[3].unclick, paihangbanglayer._receiveData[idx].cellButtn[3].click, paihangbanglayer._receiveData[idx].cellButtn[3].click, ccui.Widget.PLIST_TEXTURE);
						fourth_button.x = 135/2;
						fourth_button.y = (paihangbanglayer._receiveData[idx].cellButtn.length - 1 - 3)*paihangbanglayer._heightCell + paihangbanglayer._heightCell/2;
						fourth_button.setSwallowTouches(false);
						//当前为选中的button
						if(paihangbanglayer._selectCellButtonIndex == idx && paihangbanglayer._cellButtonIndex == 3){
							fourth_button.setBright(false);
						}
						cell.addChild(fourth_button, 3,3+1);
						if(paihangbanglayer._receiveData[idx].cellButtn[3].isHongdian && paihangbanglayer._hoongdianArray[idx][3]){
							var hongDian = cc.Sprite.createWithSpriteFrameName("phb_hongdian.png");
							hongDian.x = 123;
							hongDian.y = 53;
							fourth_button.addChild(hongDian,20);
						}
						paihangbanglayer._cellButtonArray = [first_button,second_button,third_button,fourth_button];
					}

					//cell按钮点击，包括点击后的变色
					first_button.addClickEventListener(function() {
						//重置按钮为不选中
						for(var q = 0;q < paihangbanglayer._cellButtonArray.length;q++){
							paihangbanglayer._cellButtonArray[q].setBright(true);
						}
						//判断tableview中的cell中的button是否点击
						paihangbanglayer._clickCellBool = true;
						//点击的button高亮
						first_button.setBright(false);
						//记录点击的button
						paihangbanglayer._cellButtonIndex = 0;
						//记录第几个cell的button被点击了
						paihangbanglayer._selectCellButtonIndex = idx
						
						//tableview按钮被点击
						paihangbanglayer.setSelectBtnType(0);
						
						paihangbanglayer.checkIsRankListExist(idx,0);
						
					});
					second_button.addClickEventListener(function() {
						//重置按钮为不选中
						for(var q = 0;q < paihangbanglayer._cellButtonArray.length;q++){
							paihangbanglayer._cellButtonArray[q].setBright(true);
						}
						//判断tableview中的cell中的button是否点击
						paihangbanglayer._clickCellBool = true;
						//点击的button高亮
						second_button.setBright(false);
						//记录点击的button
						paihangbanglayer._cellButtonIndex = 1;
						//记录第几个cell的button被点击了
						paihangbanglayer._selectCellButtonIndex = idx
						
						//tableview按钮被点击
						paihangbanglayer.setSelectBtnType(0);
						
						paihangbanglayer.checkIsRankListExist(idx,1);
					});

					if(paihangbanglayer._currentCellIndex == 1){
						third_button.addClickEventListener(function() {
							//重置按钮为不选中
							for(var q = 0;q < paihangbanglayer._cellButtonArray.length;q++){
								paihangbanglayer._cellButtonArray[q].setBright(true);
							}
							//判断tableview中的cell中的button是否点击
							paihangbanglayer._clickCellBool = true;
							//点击的button高亮
							third_button.setBright(false);
							//记录点击的button
							paihangbanglayer._cellButtonIndex = 2;
							//记录第几个cell的button被点击了
							paihangbanglayer._selectCellButtonIndex = idx
							
							//tableview按钮被点击
							paihangbanglayer.setSelectBtnType(0);
							
							paihangbanglayer.checkIsRankListExist(idx,2);
							
						});

						fourth_button.addClickEventListener(function() {
							//重置按钮为不选中
							for(var q = 0;q < paihangbanglayer._cellButtonArray.length;q++){
								paihangbanglayer._cellButtonArray[q].setBright(true);
							}
							//判断tableview中的cell中的button是否点击
							paihangbanglayer._clickCellBool = true;
							//点击的button高亮
							fourth_button.setBright(false);
							//记录点击的button
							paihangbanglayer._cellButtonIndex = 3;
							//记录第几个cell的button被点击了
							paihangbanglayer._selectCellButtonIndex = idx

							//tableview按钮被点击
							paihangbanglayer.setSelectBtnType(0);
							
							paihangbanglayer.checkIsRankListExist(idx,3);
						});
					}
				}
			}
			paihangbanglayer._firstInViewBool = false;
			return cell;
		},

		//排行榜信息tableview
		tableCellAtIndexOfMessage : function(table, idx){
			var strValue = idx.toFixed(0);
			var cell = table.dequeueCell();
			var cellNode;
			var paiminImage;
			var vipImg;
			if (!cell) {
				cell = new cc.TableViewCell();

				cellNode = ccs.load("res/shz/TanChuCeng/Paihangbangcell.json").node;
				cellNode.x = 325;
				cellNode.y = 35;
				cell.addChild(cellNode, 1, 1);
				//前3名的排行特殊图标
				var paiming1 = cellNode.getChildByName("paiming");
				paiminImage = cc.Sprite.createWithSpriteFrameName("paihang_rank_1.png");
				paiminImage.x = paiming1.x;
				paiminImage.y = paiming1.y;
				cellNode.addChild(paiminImage,1,122);
				var vip = cellNode.getChildByName("playerVipImg");
				vipImg = cc.Sprite.createWithSpriteFrameName("vip0.png");
				vipImg.x = vip.x;
				vipImg.y = vip.y;
				cellNode.addChild(vipImg,1,125);
			}
			//排行信息数据填充
			if(paihangbanglayer._paihangMsgData.length>0){
				paihangbanglayer.paihangxinxiTianchong(cell,paihangbanglayer._paihangMsgData[idx],idx);
			}
			
			return cell;
		},

		//tableview的cell高度
		tableCellSizeForIndex:function (table, idx) {
			var size;
			if(table.tag == 1){//排行榜按钮
				if(paihangbanglayer._addCellBoolFirst){
					//重置cell的高度
					if(idx == paihangbanglayer._currentCellIndex){
						size = cc.size(135,paihangbanglayer._heightCell+ paihangbanglayer._receiveData[idx].cellButtn.length*paihangbanglayer._heightCell);
					}else{
						size = cc.size(135,paihangbanglayer._heightCell);
					}
				}else{
					size = cc.size(135,paihangbanglayer._heightCell);
				}
			}else{//排行榜信息
				size = cc.size(651,70);
			}
			return size;
		},

		//tabelview的长度
		numberOfCellsInTableView:function (table) {
			var length = 0;
			if(table.tag == 1){//排行榜按钮
				if(paihangbanglayer._receiveData.length>0){
					length = paihangbanglayer._receiveData.length;
				}
			}else{
				if(paihangbanglayer._paihangMsgData && paihangbanglayer._paihangMsgData.length>0){
					length = paihangbanglayer._paihangMsgData.length;
				}
			}
			return length;
		},

		//排行信息数据填充
		paihangxinxiTianchong : function(cell,data,idx){
			var cellNode = cell.getChildByTag(1);
			//前3名有特殊排名图标
			var paiminImage = cellNode.getChildByTag(122);
			//vip
			var vipImage = cellNode.getChildByTag(125);
			var cellBg = cellNode.getChildByName("paihang_henggang_4");
			
			//排名文本
			var paimingText = cellBg.getChildByName("phb_mingci");
			//排名称号
			var phb_xingwei = cellBg.getChildByName("phb_xingwei");
			//昵称
			var phb_nickname = cellBg.getChildByName("phb_nickname");
			//计数
			var phb_count = cellBg.getChildByName("phb_count");
			//点击按钮
			var phb_zhanbtn = cellBg.getChildByName("phb_zhanbtn");
			//已赞图片
			var hadZan = cellNode.getChildByName("paihangbang_yizhan");
			//操作文本
			var paihang_actiontype = paihangbanglayer._rootPaihang.getChildByName("paihang_actiontype");
			//获奖文本
			var paihang_actiontext = cellNode.getChildByName("paihang_actiontext");
			var paihangline = cellNode.getChildByName("paihang_line");
			paihangline.setVisible(false);
			hadZan.setVisible(false);
			phb_zhanbtn.setVisible(false);
			paihang_actiontext.setVisible(false);
			paiminImage.setVisible(false);
			vipImage.setVisible(false);
			if(idx < 3){//前3名有特殊排名图标
				paiminImage.setVisible(true);
				var frameStr = "paihang_rank_"+ (idx+1) +".png";
				paiminImage.setSpriteFrame(frameStr);
				paimingText.setVisible(false);
			}else{
				paiminImage.setVisible(false);
				paimingText.setVisible(true);
				paimingText.setString(idx + 1);
			}
			
			//除了战绩显示星位，其他为显示vip等级
			if(paihangbanglayer._recevieRankid == 2 || paihangbanglayer._recevieRankid == 3 || 
					paihangbanglayer._recevieRankid == 4 || paihangbanglayer._recevieRankid == 5){
				phb_xingwei.setString(paihangbanglayer._paimingxingwei[idx]);
				if (idx>35) {
					phb_xingwei.setColor(cc.color(0, 175, 0, 255));
				}else{
					phb_xingwei.setColor(cc.color(170, 0, 240, 255));
				}
				phb_xingwei.setVisible(true);
				vipImage.setVisible(false);
			}else{
				
				phb_xingwei.setVisible(false);
				vipImage.setVisible(true);
				if(data.vip){
					var vipstr = "vip"+ data.vip +".png";
					vipImage.setSpriteFrame(vipstr);
				}else{
					var vipstr = "vip0.png";
					vipImage.setSpriteFrame(vipstr);
				}
			}
			
			if(data.nickname == ""){
				phb_nickname.setString("无名氏");
			}else{
				phb_nickname.setString(data.nickname);
			}
			
			if(data.winlost){
				phb_count.setString(data.winlost);
			}else if(data.getscore){
				phb_count.setString(data.getscore);
			}else if(data.value){
				phb_count.setString(data.value);
			}			
			
			//判断是否有点赞按钮显示
			////0今日得分榜1今日奖券榜2今日战绩榜3昨日战绩榜4本周战绩榜5上周战绩榜6今日消费榜7昨日消费榜8人气榜
			var ranklistid = paihangbanglayer._recevieRankid;
			//今日榜单或本周榜单才有点赞
			if(ranklistid == 0 || ranklistid == 1 || ranklistid == 2 || ranklistid == 4 || ranklistid == 6 || ranklistid == 8){
				if(paihangbanglayer._zanBool[idx]){//已赞
					phb_zhanbtn.setVisible(false);
					hadZan.setVisible(true);
				}else{//未赞
					phb_zhanbtn.setVisible(true);
					hadZan.setVisible(false);
				}
				
				//点赞按钮点击发送服务器请求
				phb_zhanbtn.addClickEventListener(function() {
					cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
					if(paihangbanglayer._zanBool[idx]){
						return;
					}
					//记录点击的button
					var dianzhanButtonIndex = paihangbanglayer._cellButtonIndex;
					//记录第几个cell的button被点击了
					var cellIndex = paihangbanglayer._currentCellIndex;
					var rankListID = paihangbanglayer._signRankList[cellIndex][dianzhanButtonIndex];
					if (!waitQuan.xianShi) {
						cc.director.getRunningScene().addChild(waitQuan,1000);
						waitQuan.reuse();
					}
					//点赞按钮被点击
					paihangbanglayer.setSelectBtnType(1);
					//向服务器发送请求
					loginServer.sendMessage(104,3,{dwUserID : USER_dwUserID,wRankListID:rankListID,dwPraisedUserID:data.userid});
				});
				paihang_actiontype.setString("操作");
				
				//如果当前榜单的已经点赞总数为5.则点赞按钮隐藏
				if(paihangbanglayer._bangdanZanCount>=5){
					if(hadZan.isVisible()){
						paihangline.setVisible(false);
					}else{
						paihangline.setVisible(true);
						phb_zhanbtn.setVisible(false);
					}
				}else{
					paihangline.setVisible(false);
					phb_zhanbtn.setVisible(true);
				}
			}else{//除了今日榜单，其他都无点赞按钮
				phb_zhanbtn.setVisible(false);
			}
			
			//无点赞时显示，玩家获奖统计，
			if(data.reward){
				paihang_actiontype.setString("奖励");
				paihang_actiontext.setVisible(true);
				paihang_actiontext.setString(data.reward);
			}
		},

		//接收返回的排行榜信息
		receiveData : function(data){
			//服务器返回接收的结构
			//resultList : {"myvalue":"634","ranklist":[{"nickname":"","userid":"584135","winlost":"23422"},{"nickname":"","userid":"584193","winlost":"634"}],"ranklistid":4}
			if(!data.resultList){
				return;
			}
			var resultData = eval("("+data.resultList+")");
			//判断是否该排行榜已经有数据
			//记录点击的button
			var dianzhanButtonIndex = paihangbanglayer._cellButtonIndex;
			//记录第几个cell的button被点击了
			var cellIndex = paihangbanglayer._currentCellIndex;
			//存储没有数据的榜单
			paihangbanglayer._saveRankListArray[cellIndex][dianzhanButtonIndex] = resultData;
			
			paihangbanglayer._recevieRankid = resultData.ranklistid;
			if(resultData.ranklist){
				paihangbanglayer._paihangMsgData = resultData.ranklist;
				paihangbanglayer._zanBool = [];
				paihangbanglayer._bangdanZanCount = 0;
				for(var p = 0;p<paihangbanglayer._paihangMsgData.length;p++){
					paihangbanglayer._zanBool[p] = false;
				}
				paihangbanglayer._paihangMsgTableView.reloadData();
				cc.log("=================="+resultData.ranklist);
			}else{//此时排行榜没有信息
				paihangbanglayer._paihangMsgData = [];
				paihangbanglayer._paihangMsgTableView.reloadData();
			}

			//刷新排行榜的自己信息和附属信息
			paihangbanglayer.updateSelfPaihangAndFushu(resultData);
			
		},

		//排行榜操作是否成功服务器返回
		showSuccessOrFailure : function(bool,data){
			if(bool){//发送成功时，刷新列表
				//点赞成功返回
				if(paihangbanglayer._buttonTypeBool[1]){
					var rankListID = paihangbanglayer._signRankList[paihangbanglayer._currentCellIndex][paihangbanglayer._cellButtonIndex];
					//向服务器发送请求
					loginServer.sendMessage(104,1,{dwUserID : USER_dwUserID,wRankListID:rankListID});
					
					var rankListData = paihangbanglayer._saveRankListArray[paihangbanglayer._currentCellIndex][paihangbanglayer._cellButtonIndex];
					
					
					paihangbanglayer._zanNode.setVisible(true);
					var action = cc.sequence(cc.fadeOut(3),cc.callFunc(function() {
						paihangbanglayer._zanNode.setVisible(false);
					}))
					paihangbanglayer._zanNode.runAction(action);
					//把银两加到身上
					USER_lUserScore += 200;
					YuanBaoSp.setString(Producer.changeNumberToString(USER_lUserScore));
					paihangbanglayer._saveRankListArray[3][0] = null;
				}
				
				//领取排行榜奖励成功
				if(paihangbanglayer._buttonTypeBool[2]){
					//领取成功粒子特效
					var particle = new cc.ParticleSystem("res/shz/TanChuCeng/tanChuCengRes/GoldFly.plist");
					particle.x = 1136/2;
					particle.y = 640/2;
					cc.director.getRunningScene().addChild(particle,2000);
					cc.audioEngine.playEffect(Effect_res.paihang_lingqu);
					
					var string = "恭喜您获得了"+ paihangbanglayer._paihangLiangquCount +"两。";
					var xinXi =  {Describe : string,errorCode : 5000,isBack : false};
					var tishi = TiShiKuang.create(xinXi);
					cc.director.getRunningScene().addChild(tishi,1001);
					//向服务器发送请求
					loginServer.sendMessage(104,1,{dwUserID : USER_dwUserID,wRankListID:paihangbanglayer._recevieRankid});
					//发送排行榜是否有可领取的奖励请求
					loginServer.sendMessage(104,4,{dwUserID : USER_dwUserID});
				}
			}else{//返回失败
				cc.log("AAADFASDFASDGASDGADSG"+data.szStringDescrible);
				//榜单获取返回失败
				if(paihangbanglayer._buttonTypeBool[0]){
					paihangbanglayer._recevieRankid = paihangbanglayer._signRankList[paihangbanglayer._currentCellIndex][paihangbanglayer._cellButtonIndex];
					//刷新排行榜信息tableview
					paihangbanglayer._paihangMsgData = [];
					paihangbanglayer._paihangMsgTableView.reloadData();
					paihangbanglayer.setPaihangFushu(null);
					paihangbanglayer.setFaileSelfMsg();
				}
				//点赞失败返回信息
				if(paihangbanglayer._buttonTypeBool[1] || paihangbanglayer._buttonTypeBool[2]){
					var xinXi =  {Describe : data.szStringDescrible,errorCode : 5000,isBack : false};
					var tishi = TiShiKuang.create(xinXi);
					cc.director.getRunningScene().addChild(tishi,1001);
				}
			}
		},
		
		//滚动提示
		createClippingNode : function(textStirng){
			if(paihangbanglayer._textMsgGundong){
				paihangbanglayer._systemTipsArray.push(textStirng);
			}
		},
		
		//刷新判断是否有滚动信息
		updataMsg : function() {
			if(!paihangbanglayer._isMovingTipsBool && paihangbanglayer._systemTipsArray.length > 0){
				paihangbanglayer._isMovingTipsBool = true;
				paihangbanglayer._textMsgGundong.x = 1150;
				paihangbanglayer._textMsgGundong.setString(paihangbanglayer._systemTipsArray[0]);
				var action1 = cc.MoveTo(12,cc.p(-paihangbanglayer._textMsgGundong.getContentSize().width, 17));
				var action2 = cc.Sequence(
						action1,
						cc.callFunc(function (nodeExecutingAction, value) {
							paihangbanglayer._systemTipsArray.splice(0, 1);
							paihangbanglayer._isMovingTipsBool = false;
						}, this));
				paihangbanglayer._textMsgGundong.runAction(action2);
			}
		},
		
		//标记是哪类按钮被点击 tableview 的button，点赞按钮，领取按钮,为了区分哪个按钮点击后返回成功信息
		setSelectBtnType : function(type) {
			for(var i =0;i < 3; i++){
				paihangbanglayer._buttonTypeBool[i] = false;
			}
			paihangbanglayer._buttonTypeBool[type] = true;
		},
		
		//排行榜返回失败时刷新个人信息
		setFaileSelfMsg : function(){
			var cellBg = paihangbanglayer._rootPaihang.getChildByName("paihang_henggang_4");
			var paimingText = cellBg.getChildByName("phb_mingci");
			paimingText.setVisible(true);
			paimingText.setString("未上榜");
			var phb_xingwei = cellBg.getChildByName("phb_xingwei");
			phb_xingwei.setString("---");
			//vip
			var vipstr = "vip"+ USER_wMemOrder +".png";
			paihangbanglayer._vipImg.setSpriteFrame(vipstr);
			
			//除了战绩显示星位，其他为显示vip等级
			if(paihangbanglayer._recevieRankid == 2 || paihangbanglayer._recevieRankid == 3 || 
					paihangbanglayer._recevieRankid == 4 || paihangbanglayer._recevieRankid == 5){
				paihangbanglayer._vipImg.setVisible(false);
				phb_xingwei.setVisible(true);
			}else{
				paihangbanglayer._vipImg.setVisible(true);
				phb_xingwei.setVisible(false);
			}
			
			if(paihangbanglayer._recevieRankid == 2 || paihangbanglayer._recevieRankid == 3 || 
					paihangbanglayer._recevieRankid == 4 || paihangbanglayer._recevieRankid == 5){
				paihangbanglayer._vipImg.setVisible(false);
				phb_xingwei.setVisible(true);
			}else{
				paihangbanglayer._vipImg.setVisible(true);
				phb_xingwei.setVisible(false);
			}
			var phb_count = cellBg.getChildByName("phb_count");
			phb_count.setString("0");
			var paihangbang_dianzhan = cellBg.getChildByName("paihangbang_dianzhan");
			paihangbang_dianzhan.setString("---");
			var paiming1 = paihangbanglayer._rootPaihang.getChildByTag(14);
			if(paiming1){
				paiming1.setVisible(false);
			}
			this.updateMsgShow();
		},
		
		//自己的信息刷新
		setSelfMassage : function(resultData){
			paihangbanglayer._selfPaimingci = -1;
			paihangbanglayer._paihangLiangquCount = 0;
			paihangbanglayer._hadLingqu = 0;
			//自己得分
			if(resultData.myvalue){
				paihangbanglayer._myvalue = resultData.myvalue;
			}else{
				paihangbanglayer._myvalue = 0;
			}

			var cellBg = paihangbanglayer._rootPaihang.getChildByName("paihang_henggang_4");
			//自己的得分
			var phb_count = cellBg.getChildByName("phb_count");
			phb_count.setString(paihangbanglayer._myvalue);

				if(resultData.ranklist){
				var selfPaiming = -1;
				paihangbanglayer._paihangMsgData = resultData.ranklist;
				for(var p = 0;p<paihangbanglayer._paihangMsgData.length;p++){
					if(paihangbanglayer._paihangMsgData[p].userid == USER_dwUserID){
						selfPaiming = p+1;
						paihangbanglayer._paihangLiangquCount = paihangbanglayer._paihangMsgData[p].reward;
						paihangbanglayer._hadLingqu = paihangbanglayer._paihangMsgData[p].isclaim;
					};
				};
				//后来加的，当玩家的排名在100名之内的话，显示玩家的排名
				if (resultData.myrank != undefined && resultData.myrank <= 100) {
					selfPaiming = resultData.myrank;
				};
				
				paihangbanglayer._selfPaimingci = selfPaiming;
				var paiminImage;
				//根据排名判断是否有图书图标，前3名有
				var paimingText = cellBg.getChildByName("phb_mingci");
				var phb_xingwei = cellBg.getChildByName("phb_xingwei");
				phb_xingwei.setString("---");
				phb_xingwei.setColor(cc.color(255, 0, 0, 0));
				if(selfPaiming!=-1){
					if(selfPaiming<=3){
						var paiming1 = paihangbanglayer._rootPaihang.getChildByName("paiming");
						paiminImage = paihangbanglayer._rootPaihang.getChildByTag(14);
						if(!paiminImage){
							paiminImage = cc.Sprite.createWithSpriteFrameName("paihang_rank_1.png");
							paiminImage.x = paiming1.x;
							paiminImage.y = paiming1.y;
							paihangbanglayer._rootPaihang.addChild(paiminImage,20,14);
							paimingText.setVisible(false);
						}
						paimingText.setVisible(false);
						paiminImage.setVisible(true);
						var frameStr = "paihang_rank_"+ selfPaiming +".png";
						paiminImage.setSpriteFrame(frameStr);
					}else{
						paiminImage = paihangbanglayer._rootPaihang.getChildByTag(14);
						if(paiminImage){
							paiminImage.setVisible(false);
						}
						paimingText.setVisible(true);
						paimingText.setString(selfPaiming);
					}
					
					//除了战绩显示星位，其他为显示vip等级
					if(paihangbanglayer._recevieRankid == 2 || paihangbanglayer._recevieRankid == 3 || 
							paihangbanglayer._recevieRankid == 4 || paihangbanglayer._recevieRankid == 5){
						phb_xingwei.setString(paihangbanglayer._paimingxingwei[selfPaiming - 1]);
						if (selfPaiming - 1>35) {
							phb_xingwei.setColor(cc.color(0, 175, 0, 255));
						}else{
							phb_xingwei.setColor(cc.color(170, 0, 240, 255));
						}
						phb_xingwei.setVisible(true);
						paihangbanglayer._vipImg.setVisible(false);
					}else{
						phb_xingwei.setVisible(false);
						paihangbanglayer._vipImg.setVisible(true);
						var vipstr = "vip"+ USER_wMemOrder +".png";
						paihangbanglayer._vipImg.setSpriteFrame(vipstr);
					}	
					
				}else{
					paiminImage = paihangbanglayer._rootPaihang.getChildByTag(14);
					if(paiminImage){
						paiminImage.setVisible(false);
					}
					paimingText.setVisible(true);
					paimingText.setString("未上榜");
				}
			}else{
				var paimingText = cellBg.getChildByName("phb_mingci");
				paimingText.setVisible(true);
				paimingText.setString("未上榜");
				var phb_xingwei = cellBg.getChildByName("phb_xingwei");
				phb_xingwei.setString("---");
				if(paihangbanglayer._rootPaihang.getChildByTag(14)){
					paihangbanglayer._rootPaihang.getChildByTag(14).setVisible(false);
				}
			}
			
			//除了战绩显示星位，其他为显示vip等级
			if(paihangbanglayer._recevieRankid == 2 || paihangbanglayer._recevieRankid == 3 || 
					paihangbanglayer._recevieRankid == 4 || paihangbanglayer._recevieRankid == 5){
				var phb_xingwei = cellBg.getChildByName("phb_xingwei");
				phb_xingwei.setVisible(true);
				paihangbanglayer._vipImg.setVisible(false);
			}else{
				var phb_xingwei = cellBg.getChildByName("phb_xingwei");
				phb_xingwei.setVisible(false);
				paihangbanglayer._vipImg.setVisible(true);
				var dianzhanButtonIndex = paihangbanglayer._cellButtonIndex;
				//记录第几个cell的button被点击了
				var cellIndex = paihangbanglayer._currentCellIndex;	
				var vipstr = "vip"+ USER_wMemOrder +".png";
				paihangbanglayer._vipImg.setSpriteFrame(vipstr);
			}

			//总得点赞个数
			var zhanTotal = resultData.praisecount;
			var selfBg = paihangbanglayer._rootPaihang.getChildByName("paihang_henggang_4");
			var leaveCount = selfBg.getChildByName("paihangbang_dianzhan");
			var nickname = selfBg.getChildByName("phb_nickname");
			nickname.setString(USER_szNickName);
			
			//点赞
			if(resultData.praiselist && resultData.praiseli!=""){
				var praiseString = resultData.praiselist.substring(1,resultData.praiselist.length - 2);
				var praiselist = praiseString.split(",");
				leaveCount.setString("还可点赞"+ (zhanTotal - praiselist.length) +"次");
				paihangbanglayer._bangdanZanCount = praiselist.length;
				//判断是否被赞
				//已经被点赞过得id
				var praiseArray = [];

				for(var k = 0; k< praiselist.length;k++){
					praiseArray[k] = praiselist[k].substring(10,praiselist[k].length - 1);
				}
				for(var i = 0; i< praiseArray.length;i++){
					for(var j = 0;j < paihangbanglayer._paihangMsgData.length;j++){

						if(praiseArray[i] == paihangbanglayer._paihangMsgData[j].userid){
							paihangbanglayer._zanBool[j] = true;
						}
					}
				}
				paihangbanglayer._paihangMsgTableView.reloadData();
			}else{
				paihangbanglayer._bangdanZanCount = 0;
				leaveCount.setString("还可点赞"+ zhanTotal +"次");
			}
			
			//昨日、上周无点赞
			if(resultData.ranklistid == 3 ||resultData.ranklistid == 5 ||resultData.ranklistid == 7 ||resultData.ranklistid == 9){
				leaveCount.setString("   ----");
			}
			
			//根据不同的榜单，显示的列表不同
			var typeText = paihangbanglayer._rootPaihang.getChildByName("Text_2");
			var countText = paihangbanglayer._rootPaihang.getChildByName("Text_4");
			
			//0今日得分榜1今日奖券榜2今日战绩榜3昨日战绩榜4本周战绩榜5上周战绩榜6今日消费榜7昨日消费榜8人气榜
			if(paihangbanglayer._recevieRankid == 8 || paihangbanglayer._recevieRankid == 9){
				countText.setString("获赞次数");
			}
			
			if(paihangbanglayer._recevieRankid == 0){
				countText.setString("今日得分");
			}
			
			if(paihangbanglayer._recevieRankid == 1){
				countText.setString("今日奖券");
			}
			
			if(paihangbanglayer._recevieRankid == 6){
				countText.setString("今日消费");
			}
			
			if(paihangbanglayer._recevieRankid == 7){
				countText.setString("昨日消费");
			}
			
			if(paihangbanglayer._recevieRankid == 2 || paihangbanglayer._recevieRankid == 3 || 
					paihangbanglayer._recevieRankid == 4 || paihangbanglayer._recevieRankid == 5){
				typeText.setString("星位");
			}else{
				typeText.setString("VIP等级");
			}
			//操作文本
			var paihang_actiontype = paihangbanglayer._rootPaihang.getChildByName("paihang_actiontype");
			paihang_actiontype.setString("操作");
			if(paihangbanglayer._recevieRankid == 3 ||paihangbanglayer._recevieRankid == 5 ||
					paihangbanglayer._recevieRankid == 7 ||paihangbanglayer._recevieRankid == 9){
				paihang_actiontype.setString("奖励");
			}
		},
		
		//刷新排行榜自己信息和附属信息
		updateSelfPaihangAndFushu : function(resultData){
			//自己的信息
			paihangbanglayer.setSelfMassage(resultData);
			//排行榜附属功能
			paihangbanglayer.setPaihangFushu(resultData);
		},
		
		//排行榜附属功能
		setPaihangFushu : function(resultData){
			//根据不同的榜单，附属功能显示不同
			//0今日得分榜1今日奖券榜2今日战绩榜3昨日战绩榜4本周战绩榜5上周战绩榜6今日消费榜7昨日消费榜8今日人气榜9昨日人气榜
			//附属功能标题
			var fushuLayer = null;
			if(paihangbanglayer._rootPaihang.getChildByTag(222)){
				paihangbanglayer._rootPaihang.removeChildByTag(222);
			}
			//介绍文本
			var fushuTitle = paihangbanglayer._rootPaihang.getChildByName("paihang_fushutext");
			fushuTitle.setString("");
			
			//刷新的排行榜id
			var updateRankId;
			if(!resultData){
				updateRankId = paihangbanglayer._signRankList[paihangbanglayer._currentCellIndex][paihangbanglayer._cellButtonIndex];
			}else{
				updateRankId = resultData.ranklistid;
			}
			
			switch (updateRankId) {
			case 0://0今日得分榜
				fushuLayer = paihangbanglayer.setJinridefenFushu();
				break;
			case 1://1今日奖券榜
				fushuLayer = paihangbanglayer.setJinrijiangquanFushu();
				break;
			case 2://2今日战绩榜
				if(paihangbanglayer._paihangMsgData == [] || !resultData){
					return;
				}
				fushuLayer = paihangbanglayer.setJinrizhanjiFushu();
				break;
			case 3://3昨日战绩榜
				fushuLayer = paihangbanglayer.setZuorizhanjiFushu(0);
				break;
			case 4://4本周战绩榜
				if(paihangbanglayer._paihangMsgData == [] || !resultData){
					return;
				}
				fushuLayer = paihangbanglayer.setBenzhouzhanjiFushu();
				break;
			case 5://5上周战绩榜
				if(paihangbanglayer._paihangMsgData == [] || !resultData){
					return;
				}
				fushuLayer = paihangbanglayer.setZuorizhanjiFushu(1);
				break;
			case 6://6今日消费榜
				paihangbanglayer.setJinrixiaofeiFushu();
				break;
			case 7://7昨日消费榜
				if(paihangbanglayer._paihangMsgData == [] || !resultData){
					return;
				}
				fushuLayer = paihangbanglayer.setZuorixiaofeiFushu(0);
				break;
			case 8://8今日人气榜
				fushuLayer = paihangbanglayer.setJinrirenqiFushu();
				break;
			case 9://9昨日人气榜
				if(paihangbanglayer._paihangMsgData == [] || !resultData){
					return;
				}
				fushuLayer = paihangbanglayer.setZuorixiaofeiFushu(2);
				break;
			default:
				break;
			}
			
			if(resultData && resultData.ranklistid!= 6){
				if(fushuLayer){
					fushuLayer.x = 400;
					fushuLayer.y = -45;
					paihangbanglayer._rootPaihang.addChild(fushuLayer,30,222);
				}else{
					if(paihangbanglayer._rootPaihang.getChildByTag(222)){
						paihangbanglayer._rootPaihang.removeChildByTag(222);
					}
				}
			}
		},
		
		//今日战绩附属功能
		setJinrizhanjiFushu : function(){
//			每日奖励：每日0点奖池的40%分发给当日前36名玩家；
//			昨日排名奖励分成：
//			第一名：每日奖励的40%
//			第二名：每日奖励的15%
//			第三名：每日奖励的5%
//			第4-10名：每日奖励的2%
//			第11-36名：每日奖励的1%

			var fushuTitle = paihangbanglayer._rootPaihang.getChildByName("paihang_fushutext");
			fushuTitle.setString("今日排名奖励");
			var jinrizhanjifushu = ccs.load("res/shz/TanChuCeng/PaihangJinrifushumsg.json").node;
			var jieshao = jinrizhanjifushu.getChildByName("jrzj_msg");
			var jiangliCount;
			if(!jiangliCount){
				jiangliCount = new cc.LabelBMFont("","res/shz/TanChuCeng/tanChuCengRes/jiangchijianglifnt.fnt");
				jiangliCount.x = 0;
				jiangliCount.y = -120;
				jinrizhanjifushu.addChild(jiangliCount,10);
			}
			if((paihangbanglayer._selfPaimingci == -1 || paihangbanglayer._selfPaimingci >=37) || 
					(paihangbanglayer._selfPaimingci <= 12 && paihangbanglayer._selfPaimingci >=36)){//此时未进入前36名
				jieshao.setString("再升一个排名即可获得");
				jiangliCount.setString(Math.floor(paihangbanglayer.nowJiangchiCount*0.4*0.01));
			}else if(paihangbanglayer._selfPaimingci <= 11 && paihangbanglayer._selfPaimingci >=5){
				jieshao.setString("再升一个排名即可获得");
				jiangliCount.setString(Math.floor(paihangbanglayer.nowJiangchiCount*0.4*0.02));
			}else if(paihangbanglayer._selfPaimingci == 4){
				jieshao.setString("再升一个排名即可获得");
				jiangliCount.setString(Math.floor(paihangbanglayer.nowJiangchiCount*0.4*0.05));
			}else if(paihangbanglayer._selfPaimingci == 3){
				jieshao.setString("再升一个排名即可获得");
				jiangliCount.setString(Math.floor(paihangbanglayer.nowJiangchiCount*0.4*0.15));
			}else if(paihangbanglayer._selfPaimingci == 2){
				jieshao.setString("再升一个排名即可获得");
				jiangliCount.setString(Math.floor(paihangbanglayer.nowJiangchiCount*0.4*0.4));
			}else if(paihangbanglayer._selfPaimingci == 1){
				jieshao.setString("第一名可获取");
				jiangliCount.setString(Math.floor(paihangbanglayer.nowJiangchiCount*0.4*0.4));
			}
			
			//去得分按钮
//			跳转方式如下：
//			a.检测玩家身上持有的游戏币（不包括银行），（≤10000）游戏币时，跳转到房间1【路见不平】。
//			b.检测玩家身上持有的游戏币（不包括银行），（10000＜持有游戏币≤100000）游戏币时，跳转到房间2【逼上梁山】。
//			c.检测玩家身上持有的游戏币（不包括银行），（100000＜持有游戏币≤1000000）游戏币时，跳转到房间3【替天行道】。
//			d.检测玩家身上持有的游戏币（不包括银行），（＞1000000）游戏币时，跳转到房间4【朝廷诏安】。
			var qudefenBtn = jinrizhanjifushu.getChildByName("jrzj_qudefen");
			qudefenBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				paihangbanglayer.setCloseClick();
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/Paihangbanglayer"];
				removeResources(numberAry);
				if(MAINLAYER){//如果已经在游戏里了，那么关闭排行榜界面
					
				}else{
					if(USER_lUserScore <=10000){
						this.setTag(35);
						GameHalll.enterMainScene(this)
					}else if(USER_lUserScore > 10000 && USER_lUserScore <= 100000){
						this.setTag(36);
						GameHalll.enterMainScene(this)
					}else if(USER_lUserScore > 100000 && USER_lUserScore <= 1000000){
						this.setTag(37);
						GameHalll.enterMainScene(this)
					}else if(USER_lUserScore > 1000000){
						this.setTag(38);
						GameHalll.enterMainScene(this)
					}
					cc.audioEngine.stopMusic(false);
				}
			});
			return jinrizhanjifushu;
		},
		
		//本周战绩附属信息
		setBenzhouzhanjiFushu : function(){
//			奖池最新分成：
//			每周奖励：每日0点奖池的40%存入每周积累奖池；
//			每周排名奖励分成：
//			第一名：每周奖励的22%
//			第二名：每周奖励的10%
//			第三名：每周奖励的5%
//			第4-10名：每周奖励的2%
//			第11-108名：每周奖励的0.5%
			
			var fushuTitle = paihangbanglayer._rootPaihang.getChildByName("paihang_fushutext");
			fushuTitle.setString("本周排名奖励");
			var jinrizhanjifushu = ccs.load("res/shz/TanChuCeng/PaihangJinrifushumsg.json").node;
			var jieshao = jinrizhanjifushu.getChildByName("jrzj_msg");
			var jiangliCount;
			if(!jiangliCount){
				jiangliCount = new cc.LabelBMFont("","res/shz/TanChuCeng/tanChuCengRes/jiangchijianglifnt.fnt");
				jiangliCount.x = 0;
				jiangliCount.y = -120;
				jinrizhanjifushu.addChild(jiangliCount,10);
			}
			
			if((paihangbanglayer._selfPaimingci == -1 || paihangbanglayer._selfPaimingci >=109) || 
					(paihangbanglayer._selfPaimingci <= 10 && paihangbanglayer._selfPaimingci >=108)){//此时未进入前36名
				jieshao.setString("再升一个排名即可获得");
				jiangliCount.setString(Math.floor(paihangbanglayer.weekJiangchiCount*0.4*0.005));
			}else if(paihangbanglayer._selfPaimingci <= 11 && paihangbanglayer._selfPaimingci >=5){
				jieshao.setString("再升一个排名即可获得");
				jiangliCount.setString(Math.floor(paihangbanglayer.weekJiangchiCount*0.4*0.02));
			}else if(paihangbanglayer._selfPaimingci == 4){
				jieshao.setString("再升一个排名即可获得");
				jiangliCount.setString(Math.floor(paihangbanglayer.weekJiangchiCount*0.4*0.05));
			}else if(paihangbanglayer._selfPaimingci == 3){
				jieshao.setString("再升一个排名即可获得");
				jiangliCount.setString(Math.floor(paihangbanglayer.weekJiangchiCount*0.4*0.1));
			}else if(paihangbanglayer._selfPaimingci == 2){
				jieshao.setString("再升一个排名即可获得");
				jiangliCount.setString(Math.floor(paihangbanglayer.weekJiangchiCount*0.4*0.22));
			}else if(paihangbanglayer._selfPaimingci == 1){
				jieshao.setString("第一名可获取");
				jiangliCount.setString(Math.floor(paihangbanglayer.weekJiangchiCount*0.4*0.22));
			}
			
			//去得分按钮
//			跳转方式如下：
//			a.检测玩家身上持有的游戏币（不包括银行），（≤10000）游戏币时，跳转到房间1【路见不平】。
//			b.检测玩家身上持有的游戏币（不包括银行），（10000＜持有游戏币≤100000）游戏币时，跳转到房间2【逼上梁山】。
//			c.检测玩家身上持有的游戏币（不包括银行），（100000＜持有游戏币≤1000000）游戏币时，跳转到房间3【替天行道】。
//			d.检测玩家身上持有的游戏币（不包括银行），（＞1000000）游戏币时，跳转到房间4【朝廷诏安】。
			var qudefenBtn = jinrizhanjifushu.getChildByName("jrzj_qudefen");
			qudefenBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				paihangbanglayer.setCloseClick();
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/Paihangbanglayer"];
				removeResources(numberAry);
				if(MAINLAYER){//如果已经在游戏里了，那么关闭排行榜界面
					
				}else{
					if(USER_lUserScore <=10000){
						this.setTag(35);
						GameHalll.enterMainScene(this)
					}else if(USER_lUserScore > 10000 && USER_lUserScore <= 100000){
						this.setTag(36);
						GameHalll.enterMainScene(this)
					}else if(USER_lUserScore > 100000 && USER_lUserScore <= 1000000){
						this.setTag(37);
						GameHalll.enterMainScene(this)
					}else if(USER_lUserScore > 1000000){
						this.setTag(38);
						GameHalll.enterMainScene(this)
					}
					cc.audioEngine.stopMusic(false);
				}
				
			});
			return jinrizhanjifushu;
		},
		
		//昨日战绩和上周战绩
		setZuorizhanjiFushu : function(index){
			var fushuTitle = paihangbanglayer._rootPaihang.getChildByName("paihang_fushutext");
			if(index == 0){
				fushuTitle.setString("昨日排名奖励");
			}else{
				fushuTitle.setString("上周排名奖励");
			}
			var jinrizhanjifushu = ccs.load("res/shz/TanChuCeng/PaihangZuorizhanjifuru.json").node;
			var jiangliCount;
			jiangliCount = new cc.LabelBMFont(paihangbanglayer._paihangLiangquCount,"res/shz/TanChuCeng/tanChuCengRes/jiangchijianglifnt.fnt");
			jiangliCount.x = 0;
			jiangliCount.y = -120;
			jinrizhanjifushu.addChild(jiangliCount,10);
			
			//可领取为0，或已经领取过
			var paihang_lingquunable;
			paihang_lingquunable = jinrizhanjifushu.getChildByName("paihang_lingquunable");
			if(paihangbanglayer._paihangLiangquCount == 0){
				paihang_lingquunable.setVisible(true);
			}else{
				paihang_lingquunable.setVisible(false);
			}
			
			var paihang_yiliangquimg;
			paihang_yiliangquimg = jinrizhanjifushu.getChildByName("paihang_yiliangquimg");
			if(paihangbanglayer._hadLingqu == 1){
				paihang_yiliangquimg.setVisible(true);
			}else{
				paihang_yiliangquimg.setVisible(false);
			}
			
			//领取按钮
			var qudefenBtn = jinrizhanjifushu.getChildByName("paihang_lingqubtn");
			qudefenBtn.addClickEventListener(function() {
				
				////可领取为0，或已经领取过时，领取按钮不可点击
				if(paihangbanglayer._paihangLiangquCount == 0 || paihangbanglayer._hadLingqu == 1){
					return;
				}
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				//reward
				paihangbanglayer.setSelectBtnType(2);
				if (!waitQuan.xianShi) {
					cc.director.getRunningScene().addChild(waitQuan,1000);
					waitQuan.reuse();
				}
				//向服务器发送请求
				loginServer.sendMessage(104,2,{dwUserID : USER_dwUserID,wRankListID:paihangbanglayer._recevieRankid});
				
			});
			return jinrizhanjifushu;
		},
		
		//今日得分
		setJinridefenFushu : function() {
			var fushuTitle = paihangbanglayer._rootPaihang.getChildByName("paihang_fushutext");
			fushuTitle.setString("");
			var jinrizhanjifushu = ccs.load("res/shz/TanChuCeng/PaihangJinridefenFushu.json").node;
			//领取按钮
			var qudefenBtn = jinrizhanjifushu.getChildByName("jrde_qudefen");
			qudefenBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				paihangbanglayer.setCloseClick();
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/Paihangbanglayer"];
				removeResources(numberAry);
				if(MAINLAYER){//如果已经在游戏里了，那么关闭排行榜界面
					
				}else{
					if(USER_lUserScore <=10000){
						this.setTag(35);
						GameHalll.enterMainScene(this)
					}else if(USER_lUserScore > 10000 && USER_lUserScore <= 100000){
						this.setTag(36);
						GameHalll.enterMainScene(this)
					}else if(USER_lUserScore > 100000 && USER_lUserScore <= 1000000){
						this.setTag(37);
						GameHalll.enterMainScene(this)
					}else if(USER_lUserScore > 1000000){
						this.setTag(38);
						GameHalll.enterMainScene(this)
					}
					cc.audioEngine.stopMusic(false);
				}
				
			});
			return jinrizhanjifushu;
		},
		
		//今日奖券
		setJinrijiangquanFushu : function(){
			var fushuTitle = paihangbanglayer._rootPaihang.getChildByName("paihang_fushutext");
			fushuTitle.setString("");
			var jinrizhanjifushu = ccs.load("res/shz/TanChuCeng/PaihangJinrijiangquanFushu.json").node;
			//兑换按钮
			var qudefenBtn = jinrizhanjifushu.getChildByName("jrjq_quduihuan");
			qudefenBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				shangCheng.creatChongZhiLayer(cc.director.getRunningScene());
				paihangbanglayer.setCloseClick();
			});
			return jinrizhanjifushu;
		},
		
		//关闭按钮点击有
		setCloseClick : function(){
			paihangbanglayer.isPaihangbangOpen = false;
			paihangbanglayer._addCellBoolFirst = true;
			paihangbanglayer._clickCellBool = false;
			paihangbanglayer._currentCellIndex = 0;
			paihangbanglayer._cellButtonIndex = 0
			paihangbanglayer._receiveData = [];
			paihangbanglayer._firstInViewBool = true;
			paihangbanglayer._selectCellButtonIndex = 0;
			paihangbanglayer._hoongdianArray = [[false,false],[false,false,false,false],[false,false],[false,false]];
			paihangbanglayer._saveRankListArray = [[null,null],[null,null,null,null],[null,null],[null,null]];
			paihangbanglayer._paihangMsgData = [];
			paihangbanglayer._systemTipsArray = [];
			paihangbanglayer._isMovingTipsBool = false;
			paihangbanglayer._textMsgGundong.unschedule(this.updataMsg);
			//发送排行榜是否有可领取的奖励请求
			loginServer.sendMessage(104,4,{dwUserID : USER_dwUserID});
			cc.pool.putInPool(paihangbanglayer._zhezhao);
		},
		
		//今日消费
		setJinrixiaofeiFushu : function(){
			paihangchongzhi.createPaihangchongzhi(paihangbanglayer._rootPaihang);
			paihangchongzhi.creatHttp();
			var fushuTitle = paihangbanglayer._rootPaihang.getChildByName("paihang_fushutext");
			fushuTitle.setString("每日充值奖励");
		},
		
		//昨日消费和昨日人气榜
		setZuorixiaofeiFushu : function(num){
			var fushuTitle = paihangbanglayer._rootPaihang.getChildByName("paihang_fushutext");
			if(num == 0){
				fushuTitle.setString("昨日充值奖励");
			}else{
				fushuTitle.setString("昨日人气榜奖励");
			}
			
			var jinrizhanjifushu = ccs.load("res/shz/TanChuCeng/PaihangZuorixiaofeiFushu.json").node;

			//自己排行
			var myRank = jinrizhanjifushu.getChildByName("zrxf_num1");
			var zrxf_num2_0 = jinrizhanjifushu.getChildByName("zrxf_num2_0");
			myRank.setVisible(false);
			zrxf_num2_0.setVisible(false);
			
			//自己的排名
			if(paihangbanglayer._selfPaimingci != -1){
				myRank.setString(paihangbanglayer._selfPaimingci);
			}else{
				myRank.setString(0);
			}
			//自己的排名
			var myRankCopy;
			if(!myRankCopy){
				myRankCopy = new cc.LabelBMFont("","res/shz/TanChuCeng/tanChuCengRes/number_1.fnt");
				myRankCopy.x = myRank.x;
				if(cc.sys.os == cc.sys.OS_ANDROID){
					myRankCopy.y = myRank.y - 3;
				}else if(cc.sys.os == cc.sys.OS_IOS){
					myRankCopy.y = myRank.y;
				}
				
				myRankCopy.setScaleX(0.6);
				myRankCopy.setScaleY(0.6);
				jinrizhanjifushu.addChild(myRankCopy,10);
			}
			
			//如果没有排名则显示0
			if(paihangbanglayer._selfPaimingci != -1){
				myRankCopy.setString(paihangbanglayer._selfPaimingci);
			}else{
				myRankCopy.setString(0);
			}
			
			//玩家可获得奖励数
			var zrxf_num2_0Coyp;
			if(!zrxf_num2_0Coyp){
				zrxf_num2_0Coyp = new cc.LabelBMFont("","res/shz/TanChuCeng/tanChuCengRes/number_1.fnt");
				zrxf_num2_0Coyp.x = zrxf_num2_0.x;
				zrxf_num2_0Coyp.y = zrxf_num2_0.y;
				zrxf_num2_0Coyp.setScaleX(0.70);
				zrxf_num2_0Coyp.setScaleY(0.70);
				jinrizhanjifushu.addChild(zrxf_num2_0Coyp,10);
			}
			
			//可领取数
			zrxf_num2_0Coyp.setString(paihangbanglayer._paihangLiangquCount);
			
			//可领取为0，或已经领取过
			var paihang_lingquunable;
			paihang_lingquunable = jinrizhanjifushu.getChildByName("paihang_lingqujiangliunable");
			if(paihangbanglayer._paihangLiangquCount == 0){
				paihang_lingquunable.setVisible(true);
			}else{
				paihang_lingquunable.setVisible(false);
			}

			var paihang_yiliangquimg;
			paihang_yiliangquimg = jinrizhanjifushu.getChildByName("paihang_yiliangqu");
			if(paihangbanglayer._hadLingqu == 1){
				paihang_yiliangquimg.setVisible(true);
			}else{
				paihang_yiliangquimg.setVisible(false);
			}

			//领取按钮
			var qudefenBtn = jinrizhanjifushu.getChildByName("paihang_liangqujiangli");
			qudefenBtn.addClickEventListener(function() {
				
				////可领取为0，或已经领取过时，领取按钮不可点击
				if(paihangbanglayer._paihangLiangquCount == 0 || paihangbanglayer._hadLingqu == 1){
					return;
				}
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				//reward
				paihangbanglayer.setSelectBtnType(2);
				if (!waitQuan.xianShi) {
					cc.director.getRunningScene().addChild(waitQuan,1000);
					waitQuan.reuse();
				}
				//向服务器发送请求
				loginServer.sendMessage(104,2,{dwUserID : USER_dwUserID,wRankListID:paihangbanglayer._recevieRankid});

			});
			return jinrizhanjifushu;
		},
		
		//今日人气
		setJinrirenqiFushu : function(){
			var fushuTitle = paihangbanglayer._rootPaihang.getChildByName("paihang_fushutext");
			fushuTitle.setString("今日人气榜介绍");
			var mainNode = new cc.Node();
			//排行榜规则介绍
			var msgString;
			if(cc.sys.os == cc.sys.OS_ANDROID){
				msgString = "*每位玩家都可以为上榜玩家“点赞”，提高他们的人气，并获得奖励。\n*今日人气榜为今日“被点赞”次数总和（所有排行榜总和）。\n*今日人气榜奖励：第1名：30万银两，第2名：10万银两，第3名：5万银两，第4-10名：2万银两，第11-20名：1万银两。";
			}else if(cc.sys.os == cc.sys.OS_IOS){
				msgString = "*每位玩家都可以为上榜玩家“点赞”，提高他们的人气，并获得奖励。\n\n*今日人气榜为今日“被点赞”次数总和（所有排行榜总和）。\n\n*今日人气榜奖励：第1名：30万银两，第2名：10万银两，第3名：5万银两，第4-10名：2万银两，第11-20名：1万银两。";
			}
			var chengHao_text = new ccui.Text();
			chengHao_text.ignoreContentAdaptWithSize(false);
			chengHao_text.setFontSize(18);
			chengHao_text.setColor(cc.color.BLACK);
			chengHao_text.setSize(cc.size(198, 400));
			chengHao_text.setFontName("Arial");
			chengHao_text.x = 0;
			chengHao_text.y = -115;
			chengHao_text.setString(msgString);
			mainNode.addChild(chengHao_text,20,14);
			return mainNode;
		},
		
		//判断是否有红点
		checkIsHongdian : function(data) {
			//默认为红点不显示
			paihangbanglayer._hoongdianArray = [[false,false],[false,false,false,false],[false,false],[false,false]];
			if(data){
				var resultData = eval("("+data.rewardList+")");
				if(resultData){
					for(var i = 0;i < resultData.rewardlist.length;i++){
						if(resultData.rewardlist[i].ranklistid == 3){
							paihangbanglayer._hoongdianArray[1][2] = true;
						}

						if(resultData.rewardlist[i].ranklistid == 5){
							paihangbanglayer._hoongdianArray[1][3] = true;
						}

						if(resultData.rewardlist[i].ranklistid == 7){
							paihangbanglayer._hoongdianArray[0][1] = true;
						}

						if(resultData.rewardlist[i].ranklistid == 9){
							paihangbanglayer._hoongdianArray[3][1] = true;
						}
					}
				}
			}	
			
			paihangbanglayer._tableView.reloadData();
		},
		
		//判断当前选中的榜单是否有数据，如果没有请求服务器，如果有直接刷新榜单
		checkIsRankListExist : function(currentCellIndex,cellButtonIndex) {
			this.updateMsgShow();
			//判断选中的榜单是否有数据
			if(!paihangbanglayer._saveRankListArray[currentCellIndex][cellButtonIndex]){
				paihangbanglayer._paihangMsgData = [];
				paihangbanglayer._paihangMsgTableView.reloadData();
				if(paihangbanglayer._receiveData[currentCellIndex]){
					//向服务器发送请求
					if (!waitQuan.xianShi) {
						cc.director.getRunningScene().addChild(waitQuan,1000);
						waitQuan.reuse();
					}
					loginServer.sendMessage(104,1,{dwUserID : USER_dwUserID,wRankListID:paihangbanglayer._receiveData[currentCellIndex].cellButtn[cellButtonIndex].send_value});
				}
			}else{
				//存储没有数据的榜单
				resultData = paihangbanglayer._saveRankListArray[currentCellIndex][cellButtonIndex];
				paihangbanglayer._recevieRankid = resultData.ranklistid;
				if(resultData.ranklist){
					paihangbanglayer._paihangMsgData = resultData.ranklist;
					paihangbanglayer._zanBool = [];
					paihangbanglayer._bangdanZanCount = 0;
					for(var p = 0;p<paihangbanglayer._paihangMsgData.length;p++){
						paihangbanglayer._zanBool[p] = false;
					}
					paihangbanglayer._paihangMsgTableView.reloadData();
				}else{//此时排行榜没有信息
					paihangbanglayer._paihangMsgData = [];
					paihangbanglayer._paihangMsgTableView.reloadData();
				}

				//刷新排行榜的自己信息和附属信息
				paihangbanglayer.updateSelfPaihangAndFushu(resultData);
			}
			
		},
		//刷新文本
		updateMsgShow : function() {
			paihangbanglayer._recevieRankid = paihangbanglayer._signRankList[paihangbanglayer._currentCellIndex][paihangbanglayer._cellButtonIndex];
			//根据不同的榜单，显示的列表不同
			var typeText = paihangbanglayer._rootPaihang.getChildByName("Text_2");
			var countText = paihangbanglayer._rootPaihang.getChildByName("Text_4");

			//0今日得分榜1今日奖券榜2今日战绩榜3昨日战绩榜4本周战绩榜5上周战绩榜6今日消费榜7昨日消费榜8人气榜
			countText.setString("输赢统计");
			if(paihangbanglayer._recevieRankid == 8 || paihangbanglayer._recevieRankid == 9){
				countText.setString("获赞次数");
			}
			if(paihangbanglayer._recevieRankid == 0){
				countText.setString("今日得分");
			}

			if(paihangbanglayer._recevieRankid == 1){
				countText.setString("今日奖券");
			}

			if(paihangbanglayer._recevieRankid == 6){
				countText.setString("今日消费");
			}

			if(paihangbanglayer._recevieRankid == 7){
				countText.setString("昨日消费");
			}

			if(paihangbanglayer._recevieRankid == 2 || paihangbanglayer._recevieRankid == 3 || 
					paihangbanglayer._recevieRankid == 4 || paihangbanglayer._recevieRankid == 5){
				typeText.setString("星位");
			}else{
				typeText.setString("VIP等级");
			}
			//操作文本
			var paihang_actiontype = paihangbanglayer._rootPaihang.getChildByName("paihang_actiontype");
			paihang_actiontype.setString("操作");
			if(paihangbanglayer._recevieRankid == 3 ||paihangbanglayer._recevieRankid == 5 ||
					paihangbanglayer._recevieRankid == 7 ||paihangbanglayer._recevieRankid == 9){
				paihang_actiontype.setString("奖励");
			}
			//备注信息
			var beizhu = paihangbanglayer._rootPaihang.getChildByName("Text_17");
			if(paihangbanglayer._recevieRankid == 4){
				beizhu.setString("注:本周排名为实时奖池奖励，最终奖励以周日0点之前周累计奖池奖励为准。");
			}else if(paihangbanglayer._recevieRankid == 2){
				beizhu.setString("注:今日排名为实时奖池奖励，最终奖励以每日0点奖池奖励为准。");
			}else if(paihangbanglayer._recevieRankid == 9){
				beizhu.setString("注:昨日人气榜前20名可领取相应奖励，若未领取，不再补偿。");
			}else if(paihangbanglayer._recevieRankid == 7){
				beizhu.setString("注:每日充值前10名可在次日领取昨日消费排名奖励，若未领取，奖励返回次日奖池。");
			}else{
				beizhu.setString("");
			}
			
			var Text_17 = paihangbanglayer._rootPaihang.getChildByName("Text_17");
			Text_17.y = -282;
		}

};