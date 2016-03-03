
var touXiang = {
		_nichengText : null,
		_nanBtn : null,
		_nvBtn : null,
		_touDi : null,
		_xuanZhong : null,
		_buttonArr : [],
		_faceId : USER_wFaceID,
		_isFront : false,
		nowString : null,
		editBoxEditingDidBegin: function (editBox) {
	
		},

		editBoxEditingDidEnd: function (editBox) {
		
		},

		editBoxTextChanged: function (editBox, text) {
		
		},

		editBoxReturn: function (editBox) {
		
		},
		creatTouXiangLayer : function(self) {
			var size = cc.winSize;
			touXiang._isFront = true;
			var rootTouxiang = ccs.load("res/shz/TanChuCeng/touXiangShezhi.json").node;
			touXiang._faceId = USER_wFaceID;
			rootTouxiang.x = size.width/2;
			rootTouxiang.y = size.height/2;
			var zhezhao = TestPushBox.create(rootTouxiang);
			cc.director.getRunningScene().addChild(zhezhao,100);
			var nichengText = rootTouxiang.getChildByName("touxiang_nichengText");
			var pos = nichengText.getPosition();
			nichengText.setVisible(false);
			touXiang.nowString = USER_szNickName;
			nichengText = new cc.EditBox(cc.size(300.00,45.00),new cc.Scale9Sprite("touxiang_input.png"))
			
			nichengText.setPosition(pos.x	-10, pos.y);
			nichengText.setDelegate(this);
//			nichengText.setMaxLength(12);
			nichengText.setFont("Arial",20);
			nichengText.setFontColor(cc.color(0, 0, 0, 255));
			nichengText.setPlaceHolder("  输入新的昵称");
			nichengText.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);//修改为不使用密文
			nichengText.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
			nichengText.setString(USER_szNickName);
			rootTouxiang.addChild(nichengText);
			//nichengText.release();
			touXiang._nichengText = nichengText;
			cc.log("USER_wFaceID : ",USER_wFaceID);
			var xuanchangNan = ["touxiang_nan01.png","touxiang_nan02.png","touxiang_nan03.png","touxiang_nan04.png"];
			var xuanchangNv = ["touxiang_nv01.png","touxiang_nv02.png","touxiang_nv03.png","touxiang_nv04.png"];
			touXiang._nanBtn = ccui.helper.seekWidgetByName(rootTouxiang, "touxiang_nanBtn");
			touXiang._nanBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				touXiang.gaibianScrollView(this.tag,xuanchangNan);
				this.loadTextures("btn_sex01.png", "btn_sex01.png", "btn_sex01.png",ccui.Widget.PLIST_TEXTURE);
				touXiang._nvBtn.loadTextures("btn_sex02.png", "btn_sex02.png", "btn_sex02.png",ccui.Widget.PLIST_TEXTURE);
				touXiang._touDi.setVisible(false);
				touXiang._xuanZhong.setVisible(false);
			});
			touXiang._nvBtn = ccui.helper.seekWidgetByName(rootTouxiang, "touxiang_nvBtn");
			touXiang._nvBtn.addClickEventListener(function() {
				cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
				touXiang.gaibianScrollView(this.tag,xuanchangNv);
				this.loadTextures("btn_sex01.png", "btn_sex01.png", "btn_sex01.png",ccui.Widget.PLIST_TEXTURE);
				touXiang._nanBtn.loadTextures("btn_sex02.png", "btn_sex02.png", "btn_sex02.png",ccui.Widget.PLIST_TEXTURE);
				touXiang._touDi.setVisible(false);
				touXiang._xuanZhong.setVisible(false);
			});
			var queding = ccui.helper.seekWidgetByName(rootTouxiang, "touxiang_quedingBtn");
			queding.addClickEventListener(function() {
				cc.log("nich,nicheng",USER_szNickName.length,USER_dwUserID,USER_szPassword);
				var hash = md5( USER_szPassword );
				if (USER_wFaceID != touXiang._faceId) {
					loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_SYSTEM_FACE_INFO,{wFaceID : touXiang._faceId,dwUserID : USER_dwUserID,szPassword : hash, szMachineID : "",szUserkey : ""}); 
				};
				var nicheng	= touXiang._nichengText.getString();
				var niLen = nicheng.length;
				cc.log("nich,nicheng",USER_szNickName.length,nicheng.length,USER_dwUserID,USER_szPassword);
				if (USER_szNickName!=nicheng) {
					
					if (2<=niLen && niLen<=8) {
						
						for (var i = 0; i < nicheng.length; i++) {
							var unicode = nicheng.charCodeAt(i);
							cc.log("字符的unicode编码）））））））",unicode,nicheng.charAt(i));
							if ( (47<unicode && unicode <58) ||  (64<unicode && unicode <91) ||  (96<unicode && unicode <123) ||  (12287<unicode && unicode <40957)) {
								cc.log("字符的unicode编码",unicode,nicheng.charAt(i));
							}else{
								var xinxi = {Describe : "昵称修改失败！\n请勿使用特殊字符！",type:0,errorCode : 1015,isBack : false};
								var tishi =TiShiKuang.create(xinxi);
								cc.director.getRunningScene().addChild(tishi,1000);
								touXiang._nichengText.setString(USER_szNickName.toString());
								return;
							}
						}
						loginServer.sendMessage(MDM_MB_USER_SERVICE,SUB_MB_MODIFY_INDIVIDUAL,{cbGender : USER_cbGender,dwUserID : USER_dwUserID,szPassword : hash, szUserkey : "",szNickName : touXiang._nichengText.getString()}); 
					}else{
						var xinxi = {Describe : "昵称修改失败！\n请输入2~8个汉字、字母或数字！",type:0,errorCode : 1016,isBack : false};
						var tishi =TiShiKuang.create(xinxi);
						cc.director.getRunningScene().addChild(tishi,1000);
						touXiang._nichengText.setString(USER_szNickName.toString());
						return;
					};				
				}
				touXiang._isFront = false;
				cc.pool.putInPool(zhezhao);
			});
			var touDi = new cc.Sprite("#touxiang_touxiangBtn1.png");
			touXiang._touDi = touDi;
			touDi.x = 0;
			touDi.y = 0,
			rootTouxiang.addChild(touDi);
			touDi.setVisible(false);
			var scrollView = new ccui.ScrollView();
			scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
			scrollView.setTouchEnabled(true);
			scrollView.setContentSize(cc.size(479, 130));
			scrollView.anchorX = 0.5;
			scrollView.anchorY = 0.5;
			//scrollView.ignoreContentAdaptWithSize(true);
			scrollView.setPosition(0, -55)
			scrollView.setBounceEnabled(true);
			rootTouxiang.addChild(scrollView,10);
			var touDi = new cc.Sprite("#touxiang_touxiangBtn1.png");
			touXiang._touDi = touDi;
			touDi.x = 0;
			touDi.y = 0,
			scrollView.addChild(touDi);
			touDi.setVisible(false);
			var xuanZhong = new cc.Sprite("#btn_txxz.png");
			touXiang._xuanZhong = xuanZhong;
			xuanZhong.x = 0;
			xuanZhong.y = 0,
			scrollView.addChild(xuanZhong,20);
			xuanZhong.setVisible(false);
			for (var i = 0; i < xuanchangNan.length; i++) {
				var game_button = new ccui.Button();
				game_button.setTouchEnabled(true);
				game_button.loadTextures(xuanchangNan[i], xuanchangNan[i], "",ccui.Widget.PLIST_TEXTURE);
				game_button.attr({
					x : 53+(124*i),
					y : 65
				});
				game_button.faceXia = i;
				touXiang._buttonArr[i] = game_button;
				game_button.addClickEventListener(function () {
					cc.audioEngine.playEffect(Effect_res.anNiuDianJi);
					cc.log("game1_button.getContentSize().width = %d,,,,%d,,,,%d",game_button.getPositionX(),game_button.getContentSize().height)
					touXiang.TouxiangButtonCallBack(this.tag,this.getPosition());
				})
				scrollView.addChild(game_button,10,i);
			}
			if(USER_wFaceID>3){
				touXiang.gaibianScrollView(73,xuanchangNv);
				touXiang._nvBtn.loadTextures("btn_sex01.png", "btn_sex01.png", "btn_sex01.png",ccui.Widget.PLIST_TEXTURE);
				touXiang._nanBtn.loadTextures("btn_sex02.png", "btn_sex02.png", "btn_sex02.png",ccui.Widget.PLIST_TEXTURE);
				touXiang.TouxiangButtonCallBack(USER_wFaceID,cc.p(53+(124*(USER_wFaceID-4)), 65));
			}else{
				touXiang.gaibianScrollView(72,xuanchangNan);
				touXiang._nanBtn.loadTextures("btn_sex01.png", "btn_sex01.png", "btn_sex01.png",ccui.Widget.PLIST_TEXTURE);
				touXiang._nvBtn.loadTextures("btn_sex02.png", "btn_sex02.png", "btn_sex02.png",ccui.Widget.PLIST_TEXTURE);
				touXiang._faceId = USER_wFaceID;
				touXiang.TouxiangButtonCallBack(USER_wFaceID,cc.p(53+(124*USER_wFaceID), 65));
				
			}
			scrollView.setInnerContainerSize(cc.size(479, 130));
			
		},
	
		TouxiangButtonCallBack : function(tag,post) {
			touXiang._faceId = tag;
			touXiang._touDi.setVisible(true);
			touXiang._xuanZhong.setVisible(true);
			var pos = post;
			touXiang._touDi.setPosition(pos.x, pos.y);
			touXiang._xuanZhong.setPosition(pos.x-29,pos.y-32);
		},
		gaibianScrollView : function(tag,xuanchang) {
			if (tag == 72) {
				for (var i = 0; i < touXiang._buttonArr.length; i++) {
					var array_element = touXiang._buttonArr[i];
					array_element.loadTextures(xuanchang[i], xuanchang[i], "",ccui.Widget.PLIST_TEXTURE);
					array_element.setTag(i);
				};
			};
			if (tag == 73) {
				for (var i = 0; i < touXiang._buttonArr.length; i++) {
					var array_element = touXiang._buttonArr[i];
					array_element.loadTextures(xuanchang[i], xuanchang[i], "",ccui.Widget.PLIST_TEXTURE);
					array_element.setTag(4+i);
				};
			};
		}
};








