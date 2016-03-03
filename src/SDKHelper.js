/**
 * Created by baiyi on 15/12/10.
 */
/**
 * 这个文件是为了在接入第三方SDK的时候,提供js端的接口.
 * */

SDKHelper = {
    prefix : "",
    thirdSdkLogin : true,
    thirdSdkPay : true,
    initThirdSDK : function(){
        if(typeof(CONFIG) != "undefined"){
            this.prefix = CONFIG.prefix?CONFIG.prefix : "";
            this.thirdSdkLogin = CONFIG.thirdSdkLogin?CONFIG.thirdSdkLogin : false;
            this.thirdSdkPay = CONFIG.thirdSdkPay?CONFIG.thirdSdkPay : false;
        };
    },
    thirdLogin : function(ThirdAccount){
        USER_zhangHao = SDKHelper.prefix+ThirdAccount;
        cc.log("***********************USER_zhangHao1 = ",USER_zhangHao);
        USER_szPassword = "111111"//用户的密码初始为“1111111”
        MachineID = sheBeiUid;
        if (USER_zhangHao == SDKHelper.prefix) {
            var xinxi = {Describe : "无法链接网络，请检查网络后重新登陆。",errorCode : 2006,isBack : false};//无法登录大厅,自定义
            cc.director.runScene(new loginScene(xinxi));
            return;
        }
        if (loginServer) {
            SocketManager.closeServer(false, true);
        }
        LOGINCMD = 100; LOGINSUB = 2;
        IsDengLu = true;
        loginServer = Producer.creatLoginSever();
        if (!waitQuan.xianShi) {
            cc.director.getRunningScene().addChild(waitQuan,1000);
            waitQuan.reuse(15,1);
        }
    },
    /**
     *支付时需要注意的是,官网支付是获取百易订单是在支付sdk中.
     * 第三方时百易订单在js代码中.
     * */
    thirdPay : function(price,describe,name,other,activitytype,rowid){
        var testHttp_chongzhi = cc.loader.getXMLHttpRequest();
        testHttp_chongzhi.open("POST", "http://m1-pay.baiyishuihu.com/index.php/Pay/GetOrder/applypayorder.php?");
        testHttp_chongzhi.timeout = 10000;//设置请求超时时间
        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {//得到各个阶段下的状态
            testHttp_chongzhi["on" + eventname] = function () {
                if(eventname == "timeout" || eventname == "error"){
                    if (waitQuan.xianShi) waitQuan.unuse();
                    var xinxi_chongzhi = {Describe : "获取订单失败，请稍后再试",errorCode : 0,isBack : false};
                    var tishi_chongzhi =TiShiKuang.create(xinxi_chongzhi);
                    cc.director.getRunningScene().addChild(tishi_chongzhi,1000);
                }
            }
        });
        testHttp_chongzhi.onreadystatechange = function() {
            if (testHttp_chongzhi.readyState ==4 || testHttp_chongzhi.status == 200 ) {
                if (waitQuan.xianShi) waitQuan.unuse();
                var jieshouData = testHttp_chongzhi.responseText;
                //保存读取到的东西
                cc.log("%%%%%%%%%%%%%\n",jieshouData);
                var obj_chongzhi = 	JSON.parse(jieshouData);
                if (obj_chongzhi.status == "success") {
                    if (sys.os == sys.OS_IOS) {
                        jsb.reflection.callStaticMethod("SDKHelper", "thirdPay:BillNo:BillTitle:RoleId:ZoneId:",price,obj_chongzhi.orderid,name,describe,other);
                    }else if(sys.os == sys.OS_ANDROID){
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/SDKHelper", "thirdPay", "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",price,obj_chongzhi.orderid,name,describe,other);
                    };
                } else {
                    var xinxi_chongzhi = {Describe : "获取订单失败，请稍后再试或联系客服",errorCode : 0,isBack : false};
                    var tishi_chongzhi =TiShiKuang.create(xinxi_chongzhi);
                    cc.director.getRunningScene().addChild(tishi_chongzhi,1000);
                }
            }

        };
//							userid=1000004&paymoney=ChongZhi.price.toString()&channelid=1005364&activitytype=0&rowid=0
        var data_chongzhi = "userid="+USER_dwUserID+"&paymoney="+price.toString()+"&channelid="+QUDAOHAO+"&activitytype="+activitytype+"&rowid="+rowid;
        cc.log("%%%%%%%%%%%%%%\n",data_chongzhi);
        testHttp_chongzhi.send(data_chongzhi);
        if (!waitQuan.xianShi) {
            waitQuan.reuse(10);
            cc.director.getRunningScene().addChild(waitQuan,1000);
        };
    },
    backToLoginScene : function(){
        if (GameHalll) {
            if (loginServer) {
                SocketManager.closeServer(false, false);
            }
            IsDengLu = false;
            GameHalll._isBack = true
            cc.director.runScene(new loginScene());
        }else if (MAINLAYER) {
            topNode.fanhuifun("loginScene");
        }else{
            cc.director.runScene(new loginScene());
        };
    }
}

SDKHelper.initThirdSDK();