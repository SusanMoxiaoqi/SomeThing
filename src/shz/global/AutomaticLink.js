AutomaticLink = {
		//开启自动重连
		AutomaticLinkSuccess : false,
		target : null,
		jishi : 0,
		errorCode : 0,
		startUpAutomaticLink  :  function(socket,time,errorCode) {
			AutomaticLink.AutomaticLinkSuccess = false;
			AutomaticLink.jishi = 0;
			AutomaticLink.errorCode = errorCode;
			var target = cc.director.getRunningScene();
			AutomaticLink.target = target;
			if (AutomaticLink.errorCode == 2010) {
				SocketManager.closeServer(true, false);
			}else if (AutomaticLink.errorCode == 2011) {
				SocketManager.closeServer(true, false);
            };
			if (!waitQuan.xianShi) {
				target.addChild(waitQuan,1000);
				waitQuan.reuse(16, null,"正在重连. . .");
			};
			target.schedule(AutomaticLink.tryLink, 0.5, cc.REPEAT_FOREVER, 0.1);
		},

		tryLink : function() {
			AutomaticLink.jishi ++;
			if (AutomaticLink.jishi == 30) {
				AutomaticLink.target.unschedule(AutomaticLink.tryLink);
				var xinxi = {Describe : "您已断开网络，请链接网络后重新登录。",errorCode : AutomaticLink.errorCode,isBack : true};//老虎机断线
				var tishi = TiShiKuangZiDingYi.create(xinxi);
				cc.director.getRunningScene().addChild(tishi,1000);
				if(AutomaticLink.errorCode == 2011){
					brc.biBieController.self._duanXianTiShi = tishi;
				}
				return;
			}else if (AutomaticLink.AutomaticLinkSuccess == true) {
				AutomaticLink.target.unschedule(AutomaticLink.tryLink);
				return;
			}
			switch (AutomaticLink.errorCode) {
				case 2010:
					AutomaticLink.startUpLink();
					break;
				case 2011:
					brc.chingLian();
					break;

			default:
				break;
			}
		},
		startUpLink : function() {
			var type = 0;
			//得到网络环境
			if (sys.os == sys.OS_IOS) {
				type = jsb.reflection.callStaticMethod("netWork", "getCurrentNetworkStatus");
			}else if(sys.os == sys.OS_ANDROID){
				type = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getNetworkIsWifi", "()I");
			};
			if (type == 0) {
				if (!waitQuan.xianShi) {
					waitQuan.reuse(1.0);
					cc.director.getRunningScene().addChild(waitQuan,1000);
				}
				return;
			}else{
				if (!waitQuan.xianShi) {
					waitQuan.reuse(30.0);
					cc.director.getRunningScene().addChild(waitQuan,1000);
				}
				IsGameLogin = 2;
				SocketManager.getGameServer(GAMENAME);
			}
		}

}