

var qianDao = {
		_isFront : false,
		_jiangliJine : 0,
		qianDaoJiangLi : [//横排是vip，竖排为天数
		                      [1000,2000,3000,4000,5000,6000,7000,8000,9000],
		                      [2000,4000,6000,8000,10000,12000,14000,16000,18000],
		                      [3000,6000,9000,12000,15000,18000,21000,24000,27000],
		                      [4000,8000,12000,16000,20000,24000,28000,32000,36000],
		                      [5000,10000,15000,20000,25000,30000,35000,40000,45000],
		                      [6000,12000,18000,24000,30000,36000,42000,48000,54000],
		                      [7000,14000,21000,28000,35000,42000,49000,56000,63000],
		                      ],
		                  vipFrame : ["VIP0_.png","mrqd_vip1.png","mrqd_vip2.png","mrqd_vip3.png","mrqd_vip4.png","mrqd_vvip5.png","mrqd_vip6.png","mrqd_vip7.png","mrqd_vip8.png"],
		                  buttonTexture03 : ["mrqd_gold1_03.png","mrqd_gold2_03.png","mrqd_gold3_03.png","mrqd_gold4_03.png","mrqd_gold5_03.png","mrqd_gold6_03.png","mrqd_gold7_03.png"],
		                  buttonTexture01 : ["mrqd_gold1_01.png","mrqd_gold2_01.png","mrqd_gold3_01.png","mrqd_gold4_01.png","mrqd_gold5_01.png","mrqd_gold6_01.png","mrqd_gold7_01.png"],
		 everyProgressBg : [],
		 everyDay : [],
		 everyVip : [],
		 everyReceive : [],
		 VIPS : [],
		 everyButton : [],
		 parent : null,
		 _rootNode : null,
		 _dwDays : 0,//签到天数
		 _qiandaoBtn : null,
		 _Particle : null,
		 zhezhao : null,
		kaishiQianDao : function(self) {
			closeTanChu();
			this.parent = self;
			if (!waitQuan.xianShi) {
				cc.director.getRunningScene().addChild(waitQuan,1000);
				waitQuan.reuse();
			}
			var mydate = new Date();
		    var dateStr = mydate.toLocaleString();
		    loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_REQUITE_SIGNIN,{dwUserID : USER_dwUserID,dwDays : 0, localTime : dateStr,szNowTime:"",szUserkey : ""});
		},
		shuaXinQianDao : function(rootQiandao) {
			var kelingqu = rootQiandao.getChildByTag(45);
			var numKe = qianDao.qianDaoJiangLi[qianDao._dwDays][USER_wMemOrder];
			qianDao._jiangliJine = numKe;
			kelingqu.setString(numKe.toString());
			qianDao.everyProgressBg = [];
			qianDao.everyDay = [];
			qianDao.everyVip = [];
			qianDao.everyReceive = [];
			qianDao.VIPS = [];
			qianDao.everyButton = [];
			
			for (var i = 29; i < 38; i++) {
				var evVip = rootQiandao.getChildByTag(i);
				qianDao.everyVip.push(evVip);
				var num = qianDao.qianDaoJiangLi[qianDao._dwDays][(i-29)];
				evVip.setString(Producer.formatShortNumber(num));
			};
			for (var i = 0; i < 7; i++) {//每天可领取奖励的按钮
				var button = rootQiandao.getChildByTag(i+100);
				qianDao.everyButton.push(button);
				button.addClickEventListener(function() {
					var n = this.getTag()-100;
					for (var j = 0; j < qianDao.everyVip.length; j++) {
						var array_element = qianDao.everyVip[j];
						var num = qianDao.qianDaoJiangLi[n][(j)];
						array_element.setString(Producer.formatShortNumber(num));
					}
				});
				var lable = button.getChildByTag(i+64);
				var num = qianDao.qianDaoJiangLi[i][USER_wMemOrder];
				lable.setString(Producer.formatShortNumber(num));
				if (qianDao._dwDays == i) {
					var posX = button.getPositionX();
					qianDao._Particle.x = posX;
				};
				if (qianDao._dwDays>i) {
					button.loadTextures(qianDao.buttonTexture03[i], qianDao.buttonTexture03[i], qianDao.buttonTexture03[i], ccui.Widget.PLIST_TEXTURE);
					lable.setVisible(false);			
			}

			}
			for (var i = 56; i < 62; i++) {
				var proBg = rootQiandao.getChildByTag(i);
				if ((i-56)<qianDao._dwDays) {
					proBg.setVisible(true);
				};
				qianDao.everyProgressBg.push(proBg);
			};

			for (var i = 20; i < 29; i++) {
				var VIP = rootQiandao.getChildByTag(i);
				qianDao.VIPS.push(VIP);
				if ((i-20) == (USER_wMemOrder)) {
					VIP.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(qianDao.vipFrame[USER_wMemOrder]));
				}
			};

		},
		creatQianDaoLayer : function(ssss) {
			qianDao._isFront = true;
			qianDao._dwDays = 0;
			var size = cc.winSize;
			var rootQiandao = ccs.load("res/shz/TanChuCeng/qianDao.json").node;
			qianDao._rootNode = rootQiandao;
			rootQiandao.x = size.width/2;
			rootQiandao.y = size.height/2;
			qianDao.zhezhao = TestPushBox.create(rootQiandao);
			ssss.addChild(qianDao.zhezhao,100);
			
			var chahao = rootQiandao.getChildByName("Button_2");
			chahao.addClickEventListener(function() {
				cc.pool.putInPool(qianDao.zhezhao);
				var numberAry =["res/shz/TanChuCeng/tanChuCengRes/meiriqiandao_new"];
				removeResources(numberAry);
				qianDao._isFront  = false;
			});
			qianDao._Particle = rootQiandao.getChildByName("Particle_1");
			qianDao._Particle.setVisible(false);
			var liaojieVip = rootQiandao.getChildByName("qd_vipBtn_5");
			liaojieVip.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				ChongZhiNew.creatChongZhiLayer(cc.director.getRunningScene(),1);
			});
			var qiandaoBtn = rootQiandao.getChildByTag(10);
			qianDao._qiandaoBtn = qiandaoBtn;
			qiandaoBtn.addClickEventListener(function() {
				if (!waitQuan.xianShi) {
					cc.director.getRunningScene().addChild(waitQuan,1000);
					waitQuan.reuse();
				}
				
				var mydate = new Date();
				var dateStr = mydate.toLocaleString();
				loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_SIGNIN_INDIVIDUAL,{dwUserID : USER_dwUserID,dwDays : qianDao._dwDays, localTime : dateStr,szNowTime:"",szUserkey : ""});
			});	
			qianDao.kaishiQianDao(ssss);
		}
};
