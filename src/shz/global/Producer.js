
var Producer = {
		name : "Producer",	
		ProduceFrameAnimation : function(PublicName,number,start,delay) {
			var flag_Frames = new Array(); 
			if (!delay) {
				delay = 0.2;
			}
			if (start == 1) {
				for (var i = 0; i < number; i++) {
					if((i+1)<10){
						var str = PublicName +0+(i+1) + ".png";
					}else {
						var str = PublicName +(i+1) + ".png";
             }
					var frame = cc.spriteFrameCache.getSpriteFrame(str);
					flag_Frames[i] = frame;
				}
				var animation = new cc.Animation(flag_Frames,delay);
				animation.setRestoreOriginalFrame(true);
				var action = cc.animate(animation);
				return action;
			}else if (start == 0) {
				for (var i = 0; i < number; i++) {
					var str = "";
					if((i)<10){
						 str = PublicName +0+(i) + ".png";
						
					}else {
						 str = PublicName +(i) + ".png";
					}
					var frame = cc.spriteFrameCache.getSpriteFrame(str);
					flag_Frames[i] = frame;
				}
				var animation = new cc.Animation(flag_Frames,delay);
				animation.setRestoreOriginalFrame(true);
				var action = cc.animate(animation);
				return action;
			}else if (start == 10) {
				for (var i = 0; i < number; i++) {
					var str = "";
					if((i)<10){
						str = PublicName +(i+1) + ".png";
                      cc.log("--------"+str);
					}else {
						str = PublicName +(i) + ".png";
					}
					var frame = cc.spriteFrameCache.getSpriteFrame(str);
					flag_Frames[i] = frame;
				}
				var animation = new cc.Animation(flag_Frames,delay);
				animation.setRestoreOriginalFrame(true);
				var action = cc.animate(animation);
				return action;
			}else if (start == 6) {
				for (var i = 0; i < number; i++) {
					var str = "";
					if((i)<10){
						str = PublicName +i + ".png";
						cc.log("--------"+str);
					}else {
						str = PublicName +(i) + ".png";
					}
					var frame = cc.spriteFrameCache.getSpriteFrame(str);
					flag_Frames[i] = frame;
				}
				var animation = new cc.Animation(flag_Frames,delay);
				animation.setRestoreOriginalFrame(true);
				var action = cc.animate(animation);
				return action;
			}else if (start == 11) {
				for (var i = 0; i < number; i++) {
					var str = "";
					if((i)<10){
						str = PublicName +(number-i) + ".png";
						cc.log("--------"+str);
					}else {
						str = PublicName +(i) + ".png";
					}
					var frame = cc.spriteFrameCache.getSpriteFrame(str);
					flag_Frames[i] = frame;
				}
				var animation = new cc.Animation(flag_Frames,delay);
				animation.setRestoreOriginalFrame(true);
				var action = cc.animate(animation);
				return action;
			}else{
            	for (var i = start; i < number; i++) {
            		if((i+1)<10){
            			var str = PublicName +0+(i) + ".png";
            		}else {
            			var str = PublicName +(i) + ".png";
            		}

            		var frame = cc.spriteFrameCache.getSpriteFrame(str);
            		flag_Frames[i] = frame;
            	}
            	var animation = new cc.Animation(flag_Frames,delay);
            	animation.setRestoreOriginalFrame(true);
            	var action = cc.animate(animation);
            	return action;
           }

		},

		TransformationArrayFromServerToClient : function(Lresult_icons) {
			var LZresult_icons = [];
			var result_icons_x = 0;
			for (var i = 0; i < 5; i++) {
				for (var j = 0; j < 3; j++) {
					if (Lresult_icons[j][i]<0 || Lresult_icons[j][i]>9) {
						return [3,6,3,4,6,4,4,0,1,0,9,9,3,6,6];
					}
					LZresult_icons[result_icons_x] = Lresult_icons[j][i];
					result_icons_x++;
				};
			};
			return LZresult_icons;
		},	
		
		creatLoginSever : function() {
			SocketManager.setLoginUrl(LOGINURL);
			 loginServer = SocketManager.getLoginServer();
			return loginServer;
		},
		changeNumberToString : function(number) {//你给字符串加逗号
			var str = number.toString();
			var length = str.length;
			var geshu = length/4;
			var yushu = length%4;
			var array = str.split("");
			str = "";
			for (var i = 0; i < array.length; i++) {
				str=str+array[i];
				if ((i+1)==yushu||((i+1)-yushu)%4 == 0) {
					if (i+1 !==array.length) {
						str = str+",";
					}

				}
			}
			return str;
		},
		formatShortNumber : function(number) {//若字符串过长，省略后面的零，变成万或亿
			var str = number.toString();
			var length = str.length;
			var reStr = str;
		  if (str.valueOf()>10000) {
			var shuZi = str.valueOf()/10000;
			  shuZi = shuZi.toFixed(1);
			reStr = shuZi+"万";
		};
		if (str.valueOf()>100000000) {
			var shuZi = str.valueOf()/100000000;
			shuZi = shuZi.toFixed(1);
			reStr =  shuZi+"亿";
		}
		return reStr;
		},
		formatShortNumber_piao : function(number) {//若字符串过长，省略后面的零，变成万或亿
			var str = number.toString();
			var length = str.length;
			var reStr = str;
			if (str.valueOf()>10000) {
				var shuZi = str.valueOf()/10000;
				shuZi = shuZi.toFixed(1);
				reStr = shuZi+"W";
			};
			return reStr;
		},
		BR_formatShortNumber : function(number, type) {//若字符串过长，省略后面的零，变成万或亿
			var str = number.toString();
			var length = str.length;
			var reStr = str;
			if (str.valueOf()>10000) {
				var shuZi = Math.floor(str.valueOf()/10000);
				//shuZi = shuZi;
				if(type){
					shuZi = Producer.changeNumberToString(shuZi);
				}
				reStr = shuZi+"万";
			};
			if(!type){
				if (str.valueOf()>100000000) {
					var shuZi = Math.floor(str.valueOf()/100000000);
					//shuZi = shuZi.toFixed(0);
					reStr =  shuZi+"亿";
				}
			}

		return reStr;
	},
		getCurentTime : function() { 
			var now = new Date();

			var year = now.getFullYear();       //年
			var month = now.getMonth() + 1;     //月
			var day = now.getDate();            //日

			var clock = year + "-";

			if(month < 10)
				clock += "0";

			clock += month + "-";

			if(day < 10)
				clock += "0";

			clock += day;
			return(clock); 
		},
		changToShiJian : function(num) {
			var shi = Math.floor(num/3600);
			var fen = Math.floor((num%3600)/60);
			var miao = Math.floor(num%60);
			var shi_str = shi > 9 ? shi.toString()+":" : "0"+shi.toString()+":" ;
			var fen_str = fen > 9 ? fen.toString()+":" : "0"+fen.toString()+":";
			var miao_str = miao > 9 ? miao.toString() : "0"+miao.toString();
			return shi_str+fen_str+miao_str;
		},
		chuLiHanzi : function(number, num_str) {
			 num_str = Producer.changToHanZi(number, num_str);
		},
		changToHanZi : function(number, num_str) {
			cc.log("FFFFFFFFFFFFFFFFF",number,num_str);
//			var zhengshu = new RegExp("/^\+?[1-9][0-9]*$/");
//			if (!zhengshu.test(num_str)) {
//				cc.log("不是正整数");
//				return;
//			};
			if (number >= 100000) return "十万";
	        if (number >= 10000) {
				var num = Math.floor(number/10000);
				num_str =  Producer.changToHanZi(num, num_str) +"万";
				var yushu  = number%10000;
				num_str = Producer.changToHanZi(yushu, num_str)
				return num_str;
			}else if (number >= 1000) {
				var num = Math.floor(number/1000);
				num_str =  Producer.changToHanZi(num, num_str) +"千";
				var yushu  = number%1000;
				num_str =  Producer.changToHanZi(yushu, num_str)
				return num_str;
			}else if (number >= 100) {
				var num = Math.floor(number/100);
				num_str = Producer.changToHanZi(num, num_str) +"百";
				var yushu  = number%100;
				num_str = Producer.changToHanZi(yushu, num_str)
				return num_str;
			}else if (number >= 10) {
				var num = Math.floor(number/10);
				num_str = Producer.changToHanZi(num, num_str) +"十";
				var yushu  = number%10;
				num_str =  Producer.changToHanZi(yushu, num_str)
				return num_str;
			}else {
				switch (number) {
				case 0:
//					num_str = num_str + "零";
					break;
				case 1:
					num_str = num_str + "一";
					break;
				case 2:
					num_str = num_str + "二";
					break;
				case 3:
					num_str = num_str + "三";
					break;
				case 4:
					num_str = num_str + "四";
					break;
				case 5:
					num_str = num_str + "五";
					break;
				case 6:
					num_str = num_str + "六";
					break;
				case 7:
					num_str = num_str + "七";
					break;
				case 8:
					num_str = num_str + "八";
					break;
				case 9:
					num_str = num_str + "九";
					break;
				default:
					break;
				}
				return num_str;
			}
		},
		haveThisServerID : function(serverID,arr) {
			var ishave = false;
			for (var a = 0; a < arr.length; a++) {
				if (serverID == arr[a].wServerID) {
					ishave = true;
					return ishave;
				}
			}
			return ishave;
		}
			
		
}
//网络请求超时统一处理
function streamXHREvents ( xhr, label, textbox, method ) {
	// Simple events
	['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
		xhr["on" + eventname] = function () {
			if (eventname == "error" || eventname == "timeout") {
				if (waitQuan.xianShi) waitQuan.unuse();
				shortTips.create({cueStr : "获取信息失败，请稍后重新尝试"});
			};
		}
	});
}







