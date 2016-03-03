var res ={
		dengLu_png : "res/shz/login/dengLu.png",
		dengLuJing_png : "res/shz/login/DLjing.png",
		dengLuShan_png : "res/shz/login/DLshan.png",
		dengLuZhe_png : "res/shz/login/DLzhe.png",
		dengLuGuang_png : "res/shz/login/DLguang.png",
		dengLuYun_png : "res/shz/login/DLyun.png",
		gameHallScene_png : "res/shz/GameHall/GameHallScene.png",
		helpBG1_png : "res/shz/GameHall/bangZhu/helpBG1.png",
		helpBG2_png : "res/shz/GameHall/bangZhu/helpBG2.png",
		chongZhi_png:"res/shz/TanChuCeng/tanChuCengRes/chongZhi.png",
		chongzhiVIP_png : "res/shz/TanChuCeng/tanChuCengRes/chongzhiVIP.png",
		GongYong_png:"res/shz/TanChuCeng/tanChuCengRes/GongYong.png",
		jc_sz_ts_xt_png : "res/shz/TanChuCeng/tanChuCengRes/jc_sz_ts_xt.png",
		juxialuntime_png:"res/shz/TanChuCeng/tanChuCengRes/juxialuntime.png",
		meirifenxiang_png : "res/shz/TanChuCeng/tanChuCengRes/meirifenxiang.png",
		meiriqiandao_new_png:"res/shz/TanChuCeng/tanChuCengRes/meiriqiandao_new.png",
		touXiangVip_png:"res/shz/TanChuCeng/tanChuCengRes/touXiangVip.png",
		xianshilibao_png:"res/shz/TanChuCeng/tanChuCengRes/xianshilibao.png",
		//yinhang_png:"res/shz/TanChuCeng/tanChuCengRes/yinhang.png",

};

var g_resources = [];
for (var i in res) {
	g_resources.push(res[i]);
};
//登陆，加载界面
var denglu_res = {
		dengLu_png : "res/shz/login/dengLu.png",
		dengLuJing_png : "res/shz/login/DLjing.png",
		dengLuShan_png : "res/shz/login/DLshan.png",
		dengLuZhe_png : "res/shz/login/DLzhe.png",
		dengLuGuang_png : "res/shz/login/DLguang.png",
		dengLuYun_png : "res/shz/login/DLyun.png",
};
var denglu_resources = [];
for (var i in denglu_res) {
	denglu_resources.push(denglu_res[i]);
};

//大厅，弹框
var dating_res = {
		tishiyu_png:"res/shz/load/tishiyu.png",//进入游戏的提示语再大厅里加载
		gameHallScene_png : "res/shz/GameHall/GameHallScene.png",
		helpBG1_png : "res/shz/GameHall/bangZhu/helpBG1.png",
		helpBG2_png : "res/shz/GameHall/bangZhu/helpBG2.png",
		chongZhi_png:"res/shz/TanChuCeng/tanChuCengRes/chongZhi.png",
		chongzhiVIP_png : "res/shz/TanChuCeng/tanChuCengRes/chongzhiVIP.png",
		GongYong_png:"res/shz/TanChuCeng/tanChuCengRes/GongYong.png",
		jc_sz_ts_xt_png : "res/shz/TanChuCeng/tanChuCengRes/jc_sz_ts_xt.png",
		juxialuntime_png:"res/shz/TanChuCeng/tanChuCengRes/juxialuntime.png",
		meirifenxiang_png : "res/shz/TanChuCeng/tanChuCengRes/meirifenxiang.png",
		meiriqiandao_new_png:"res/shz/TanChuCeng/tanChuCengRes/meiriqiandao_new.png",
		touXiangVip_png:"res/shz/TanChuCeng/tanChuCengRes/touXiangVip.png",
		xianshilibao_png:"res/shz/TanChuCeng/tanChuCengRes/xianshilibao.png",
		yinhang_png:"res/shz/TanChuCeng/tanChuCengRes/yinhang.png",
};
var dating_resources = [];
for (var i in dating_res) {
	dating_resources.push(dating_res[i]);
};
//进入游戏需要加载的资源

var baiRen_res = {
		BR_heGuanDaKai : "res/br_res/BR_heGuanDaKai.png",
		BR_heGuanKaiXin : "res/br_res/BR_heGuanKaiXing.png",
		BR_heGuanShengQi : "res/br_res/BR_heGuanShengQi.png",
		BR_heGuanYao : "res/br_res/BR_heGuanYao.png",
		BR_heGuanDengDai : "res/br_res/BR_heGuanDengDai.png",
		BR_scenTu : "res/br_res/BR_xingZiYuan.png",
		BR_touXiangVip_png:"res/shz/TanChuCeng/tanChuCengRes/touXiangVip.png",
		//BR_teXiao:"res/br_res/BR_teXiao.png",
		BR_Y_jingBiFeiRuTeXiao : "res/br_res/BR_jingBiFeiRuTeXiao.png",
	    BR_Y_jieSuanGuang : "res/br_res/baiRenTanChuRes/BR_JSGuang.png",
		BR_Y_jieSuanGuang1 : "res/br_res/baiRenTanChuRes/BR_JSGuang1.png",
	    BR_Y_xingXingDongHua : "res/br_res/BR_ziJiXing.png",
		BR_Y_xingXingDongHua1 : "res/br_res/BR_touXiangXing.png"
}

var baiRen_resources = [];
for (var i in baiRen_res) {
	baiRen_resources.push(baiRen_res[i]);
};

var baiRen_plist = {
		BR_heGuanDaKai : "res/br_res/BR_heGuanDaKai.plist",
		BR_heGuanKaiXin : "res/br_res/BR_heGuanKaiXing.plist",
		BR_heGuanShengQi : "res/br_res/BR_heGuanShengQi.plist",
		BR_heGuanYao : "res/br_res/BR_heGuanYao.plist",
		BR_heGuanDengDai : "res/br_res/BR_heGuanDengDai.plist",
		BR_scenTu : "res/br_res/BR_xingZiYuan.plist",
		BR_touXiangVip_png:"res/shz/TanChuCeng/tanChuCengRes/touXiangVip.plist",
		//BR_teXiao:"res/br_res/BR_teXiao.plist",
		BR_Y_jingBiFeiRuTeXiao : "res/br_res/BR_jingBiFeiRuTeXiao.plist",
		BR_Y_jieSuanGuang : "res/br_res/baiRenTanChuRes/BR_JSGuang.plist",
		BR_Y_jieSuanGuang1 : "res/br_res/baiRenTanChuRes/BR_JSGuang1.plist",
		BR_Y_xingXingDongHua : "res/br_res/BR_ziJiXing.plist",
		BR_Y_xingXingDongHua1 : "res/br_res/BR_touXiangXing.plist"
}
var baiRen_resourcesplist = [];
for (var i in baiRen_plist) {
	baiRen_resourcesplist.push(baiRen_plist[i]);
};

var youxi_res = {
		result0_png : "res/shz/MainGameScene/result/result0.png",
		result1_png : "res/shz/MainGameScene/result/result1.png",
		result2_png : "res/shz/MainGameScene/result/result2.png",
		result3_png : "res/shz/MainGameScene/result/result3.png",
		result4_png : "res/shz/MainGameScene/result/result4.png",
		result5_png : "res/shz/MainGameScene/result/result5.png",
		result6_png : "res/shz/MainGameScene/result/result6.png",
		result7_png : "res/shz/MainGameScene/result/result7.png",
		result8_png : "res/shz/MainGameScene/result/result8.png",
		result9_png : "res/shz/MainGameScene/result/result9.png",
		
		
		secondGoldflash_png : "res/shz/DiceGame/Second_GoldFlash.png",
		secondzujian_png : "res/shz/DiceGame/Second_zujian.png",
		second_HeGuan : "res/shz/DiceGame/HeGuan.png",
		
		mainSceneButtonLightsBorder_png : "res/shz/MainGameScene/ButtonLightsBorders.png",
		mainSceneShuihuzhuan_png : "res/shz/MainGameScene/SHZ_result.png",
		mainSceneResultAndLines_png : "res/shz/MainGameScene/SHZ_line.png",
		mainSceneLingjiang_png : "res/shz/TanChuCeng/tanChuCengRes/zaiXianFaGuang.png",
};
var youxi_resources = [];
for (var i in youxi_res) {
	youxi_resources.push(youxi_res[i]);
};
var youxi_resplist = {
		result0_png : "res/shz/MainGameScene/result/result0.plist",
		result1_png : "res/shz/MainGameScene/result/result1.plist",
		result2_png : "res/shz/MainGameScene/result/result2.plist",
		result3_png : "res/shz/MainGameScene/result/result3.plist",
		result4_png : "res/shz/MainGameScene/result/result4.plist",
		result5_png : "res/shz/MainGameScene/result/result5.plist",
		result6_png : "res/shz/MainGameScene/result/result6.plist",
		result7_png : "res/shz/MainGameScene/result/result7.plist",
		result8_png : "res/shz/MainGameScene/result/result8.plist",
		result9_png : "res/shz/MainGameScene/result/result9.plist",

		secondGoldflash_png : "res/shz/DiceGame/Second_GoldFlash.plist",
		secondzujian_png : "res/shz/DiceGame/Second_zujian.plist",
		second_HeGuan : "res/shz/DiceGame/HeGuan.plist",

		mainSceneButtonLightsBorder_png : "res/shz/MainGameScene/ButtonLightsBorders.plist",
		mainSceneShuihuzhuan_png : "res/shz/MainGameScene/SHZ_result.plist",
		mainSceneResultAndLines_png : "res/shz/MainGameScene/SHZ_line.plist",
		mainSceneLingjiang_plist : "res/shz/TanChuCeng/tanChuCengRes/zaiXianFaGuang.plist",
};
var youxi_resourcesplist = [];
for (var i in youxi_resplist) {
	youxi_resourcesplist.push(youxi_resplist[i]);
};

var Effect_res_exist  = null;
if (sys.os == sys.OS_ANDROID) {
	Effect_res_exist = {	// android
			shouFen : "res/shz/Sound/lingqujiangli.ogg",
			anNiuDianJi : "res/shz/Sound/anniu_dianji.ogg",
			anNiuGuanBi : "res/shz/Sound/anniu_guanbi.ogg",
			xuanZeFangJian : "res/shz/Sound/xuanzefangjian.ogg",
			jiangQuan : "res/shz/Sound/laohuji_jiangquan.ogg",
			jinDao : "res/shz/Sound/laohuji_jindao.ogg",
			linChong : "res/shz/Sound/laohuji_linchong.ogg",
			luZhiShen : "res/shz/Sound/laohuji_luzhishen.ogg",
			shuiHuZhuan : "res/shz/Sound/laohuji_shuihuzhuan.ogg",
			songjiang : "res/shz/Sound/laohuji_songjiang.ogg",
			tieFu : "res/shz/Sound/laohuji_tiefu.ogg",
			tiTianXingDao : "res/shz/Sound/laohuji_titianxingdao.ogg",
			yinQiang : "res/shz/Sound/laohuji_yinqiang.ogg",
			zhongYiTang : "res/shz/Sound/laohuji_zhongyitang.ogg",
			zhuanDong : "res/shz/Sound/laohuji_zhuandong.ogg",
			dingShan : "res/shz/Sound/ding.ogg",//老虎机中奖发光时的声音
			laohuji_feilong : "res/shz/Sound/laohuji_feilong.ogg",
			xiaomali_zhuandong2 : "res/shz/Sound/xiaomali_zhuandong02.ogg",
			xiaomali_zhuandong1 : "res/shz/Sound/xiaomali_zhuandong01.ogg",
			xiaomali_tingliu : "res/shz/Sound/xiaomali_tingliutubiao.ogg",
			xiaomali_jiesuan : "res/shz/Sound/xiaomali_jiefen.ogg",
			choujiang_xuanze : "res/shz/Sound/pai_xuanze.ogg",
			choujiang_fankai : "res/shz/Sound/pai_fankai.ogg",
			bangzhu_fanye : "res/shz/Sound/bangzhu_fanye.ogg",

			biBei2Dian : "res/shz/Sound/bibei_2dian.ogg",
			biBei3Dian : "res/shz/Sound/bibei_3dian.ogg",
			biBei4Dian : "res/shz/Sound/bibei_4dian.ogg",
			biBei5Dian : "res/shz/Sound/bibei_5dian.ogg",
			biBei6Dian : "res/shz/Sound/bibei_6dian.ogg",
			biBei7Dian : "res/shz/Sound/bibei_7dian.ogg",
			biBei8Dian : "res/shz/Sound/bibei_8dian.ogg",
			biBei9Dian : "res/shz/Sound/bibei_9dian.ogg",
			biBei10Dian : "res/shz/Sound/bibei_10dian.ogg",
			biBei11Dian : "res/shz/Sound/bibei_11dian.ogg",
			biBei12Dian : "res/shz/Sound/bibei_12dian.ogg",
			biBeiYing : "res/shz/Sound/bibei_win.ogg",
			biBeiShu : "res/shz/Sound/bibei_lost.ogg",
			biBeiYao : "res/shz/Sound/bibei_yaoshaizi.ogg",
			biBeiYaZhu : "res/shz/Sound/bibei_yazhu.ogg",
			biBeiCui1 : "res/shz/Sound/bibei_cuicu01.ogg",
			biBeiCui2 : "res/shz/Sound/bibei_cuicu02.ogg",
			biBeiCui3 : "res/shz/Sound/bibei_cuicu03.ogg",
			biBeiCui4 : "res/shz/Sound/bibei_cuicu04.ogg",
			biBeiCui5 : "res/shz/Sound/bibei_cuicu05.ogg",
			shouFen1 : "res/shz/Sound/yiduijinbi.ogg",
			zaiXianLingJiang : "res/shz/Sound/openstore.ogg",
			duijiu_cheers : "res/shz/Sound/duijiu_Cheers.ogg",
			dj_kaijiangOnce : "res/shz/Sound/dj_kaijiangOnce.ogg",
			dj_chujiangli : "res/shz/Sound/dj_chujiangli.ogg",
			dj_gongxihuode_over : "res/shz/Sound/dj_gongxihuode_over.ogg",
			dj_yuanbao_fly : "res/shz/Sound/dj_yuanbao_fly.ogg",
			dj_fanzhuan : "res/shz/Sound/dj_fanzhuan.ogg",
			paihang_lingqu : "res/shz/Sound/paihang_lingqu.ogg",
			JF_comeon : "res/shz/Sound/JF_comeon.ogg",
			JF_game : "res/shz/Sound/JF_game.ogg",
			JF_sheJian : "res/shz/Sound/JF_sheJian.ogg",
			JF_baoZha : "res/shz/Sound/JF_baoZha.ogg",
			JF_jiZhong : "res/shz/Sound/JF_jiZhong.ogg",
			BR_win:"res/shz/Sound/BR_win.ogg",
			BR_lose:"res/shz/Sound/BR_lose.ogg",
			BR_jingBi : "res/shz/Sound/BR_jingBi_fly.ogg",
			BR_jingBi2 : "res/shz/Sound/BR_wanJiaXiaZhu.ogg",
			BA_chuxian : "res/shz/Sound/BA_ChuanXian.ogg",
			BA_click : "res/shz/Sound/BA_Click.ogg",
			BR_kaiShi : "res/shz/Sound/BR_kaiShi.ogg"
	};
}else if (sys.os == sys.OS_IOS) {
	Effect_res_exist = {	//ios
			shouFen : "res/shz/Sound/lingqujiangli.m4a",
			anNiuDianJi : "res/shz/Sound/anniu_dianji.m4a",
			anNiuGuanBi : "res/shz/Sound/anniu_guanbi.m4a",
			xuanZeFangJian : "res/shz/Sound/xuanzefangjian.m4a",
			jiangQuan : "res/shz/Sound/laohuji_jiangquan.m4a",
			jinDao : "res/shz/Sound/laohuji_jindao.m4a",
			linChong : "res/shz/Sound/laohuji_linchong.m4a",
			luZhiShen : "res/shz/Sound/laohuji_luzhishen.m4a",
			shuiHuZhuan : "res/shz/Sound/laohuji_shuihuzhuan.m4a",
			songjiang : "res/shz/Sound/laohuji_songjiang.m4a",
			tieFu : "res/shz/Sound/laohuji_tiefu.m4a",
			tiTianXingDao : "res/shz/Sound/laohuji_titianxingdao.m4a",
			yinQiang : "res/shz/Sound/laohuji_yinqiang.m4a",
			zhongYiTang : "res/shz/Sound/laohuji_zhongyitang.m4a",
			zhuanDong : "res/shz/Sound/laohuji_zhuandong.m4a",
			dingShan : "res/shz/Sound/ding.m4a",//老虎机中奖发光时的声音
			laohuji_feilong : "res/shz/Sound/laohuji_feilong.m4a",
			xiaomali_zhuandong2 : "res/shz/Sound/xiaomali_zhuandong02.m4a",
			xiaomali_zhuandong1 : "res/shz/Sound/xiaomali_zhuandong01.m4a",
			xiaomali_tingliu : "res/shz/Sound/xiaomali_tingliutubiao.m4a",
			xiaomali_jiesuan : "res/shz/Sound/xiaomali_jiefen.m4a",
			choujiang_xuanze : "res/shz/Sound/pai_xuanze.m4a",
			choujiang_fankai : "res/shz/Sound/pai_fankai.m4a",
			bangzhu_fanye : "res/shz/Sound/bangzhu_fanye.m4a",

			biBei2Dian : "res/shz/Sound/bibei_2dian.m4a",
			biBei3Dian : "res/shz/Sound/bibei_3dian.m4a",
			biBei4Dian : "res/shz/Sound/bibei_4dian.m4a",
			biBei5Dian : "res/shz/Sound/bibei_5dian.m4a",
			biBei6Dian : "res/shz/Sound/bibei_6dian.m4a",
			biBei7Dian : "res/shz/Sound/bibei_7dian.m4a",
			biBei8Dian : "res/shz/Sound/bibei_8dian.m4a",
			biBei9Dian : "res/shz/Sound/bibei_9dian.m4a",
			biBei10Dian : "res/shz/Sound/bibei_10dian.m4a",
			biBei11Dian : "res/shz/Sound/bibei_11dian.m4a",
			biBei12Dian : "res/shz/Sound/bibei_12dian.m4a",
			biBeiYing : "res/shz/Sound/bibei_win.m4a",
			biBeiShu : "res/shz/Sound/bibei_lost.m4a",
			biBeiYao : "res/shz/Sound/bibei_yaoshaizi.m4a",
			biBeiYaZhu : "res/shz/Sound/bibei_yazhu.m4a",
			biBeiCui1 : "res/shz/Sound/bibei_cuicu01.m4a",
			biBeiCui2 : "res/shz/Sound/bibei_cuicu02.m4a",
			biBeiCui3 : "res/shz/Sound/bibei_cuicu03.m4a",
			biBeiCui4 : "res/shz/Sound/bibei_cuicu04.m4a",
			biBeiCui5 : "res/shz/Sound/bibei_cuicu05.m4a",
			shouFen1 : "res/shz/Sound/yiduijinbi.m4a",
			zaiXianLingJiang : "res/shz/Sound/openstore.m4a",
			duijiu_cheers : "res/shz/Sound/duijiu_Cheers.m4a",
			dj_kaijiangOnce : "res/shz/Sound/dj_kaijiangOnce.m4a",
			dj_chujiangli : "res/shz/Sound/dj_chujiangli.m4a",
			dj_gongxihuode_over : "res/shz/Sound/dj_gongxihuode_over.m4a",
			dj_yuanbao_fly : "res/shz/Sound/dj_yuanbao_fly.m4a",
			dj_fanzhuan : "res/shz/Sound/dj_fanzhuan.m4a",
			paihang_lingqu : "res/shz/Sound/paihang_lingqu.m4a",
			JF_comeon : "res/shz/Sound/JF_comeon.m4a",
			JF_game : "res/shz/Sound/JF_game.m4a",
			JF_sheJian : "res/shz/Sound/JF_sheJian.m4a",
			JF_baoZha : "res/shz/Sound/JF_baoZha.m4a",
			JF_jiZhong : "res/shz/Sound/JF_jiZhong.m4a",
			BR_win:"res/shz/Sound/BR_win.m4a",
			BR_lose:"res/shz/Sound/BR_lose.m4a",
			BR_jingBi : "res/shz/Sound/BR_jingBi_fly.m4a",
			BR_jingBi2 : "res/shz/Sound/BR_wanJiaXiaZhu.m4a",
			BA_chuxian : "res/shz/Sound/BA_ChuanXian.m4a",
			BA_click : "res/shz/Sound/BA_Click.m4a",
			BR_kaiShi : "res/shz/Sound/BR_kaiShi.m4a"
	};
}

var Effect_res = Effect_res_exist;


var Music_res_exist = {
		jiaZai : "res/shz/Sound/BGM01.mp3",
		dengLu : "res/shz/Sound/BGM01.mp3",
		daTing : "res/shz/Sound/BGM02.mp3",
		xiaomali_bgm : "res/shz/Sound/xiaomali_BGM.mp3",
		quanpanYuanbao : "res/shz/Sound/quanpanjiang.mp3",
		duijiu_bgm : "res/shz/Sound/haohanduijiu_bgm.mp3",
		JF_bgm : "res/shz/Sound/JF_BGM02.mp3",
		BRC_bgm1 : "res/shz/Sound/BGM_bairen_1.mp3",
		BRC_bgm2 : "res/shz/Sound/BGM_bairen_2.mp3"
};

var Music_res =[];
for ( var i in Music_res_exist) {
	Music_res[i] = Music_res_exist[i];
}


/**把用户登陆过的账号信息记录下来*/
//var KEY = "USERIN";//存入本地信息的键值
//var aa = slocal.getItem(KEY);
//cc.log("aa",aa);
//USERINFSTR = aa || "{data : []}";
//var USERINF = eval("("+USERINFSTR+")");
//USERINFSTR = "{data : []}";
//var USERINF = eval("("+USERINFSTR+")");
//var ZM = {zhanghao : "testNO.1",mima : "123456",nicheng : "123"};
//USERINF.data.unshift(ZM);
//USERINFSTR = JSON.stringify(USERINF);
//slocal.setItem(KEY,USERINFSTR);
var USERNODE = null;
var RUNINGSCENE = null;
var totalScore = 1000;//总分数
//var totalBetScore = 0;//总押分
var winScore = 0;//第一游戏场景中每次中奖的分数
var choujiiangWinScore = 0;//抽奖时的中奖分数，
var winJiangQuan = 0;//第一游戏场景中每次中奖的奖券
var NumberOfLines = 9;//押线的条数
var BetScoreIndex = 1;//押分所在的数组下标
var bounceNumber = 0;//小玛丽的次数
var isAuto = false;//是否为自动游戏
var Pop_up_Announcements = true;//进入大厅是否弹出公告
var IsDengLu = false;//链接打开后，是否登录大厅。
var IsGameLogin = 0;//是否登录游戏。1表示从大厅登录游戏房间，2表示重新连接
var isJiangQuan = false;//在进入房间时判断是否为奖券场，默认为无奖券
var wServerID = 220;//登录游戏时所用的wGameID

var isTanChuCeng = true;
var shuiHuZhuanUrl = null;//水浒传面向网站获取数据的url

var sheBeiLeiXing = sys.os;//登录大厅时。
if (sheBeiLeiXing == sys.OS_IOS) {
	sheBeiLeiXing = 1;
} else if(sheBeiLeiXing = sys.OS_ANDROID){
	sheBeiLeiXing = 2;
}else {
	sheBeiLeiXing = 3;
}
var zuZhiBack = false;//当界面上有弹出层时，把他设置为true,这时点击返回键就没有效果(只适用于安卓平台)。
var IS_HALL_CHECK = false;//每次执行登录操作后检查是否要弹出签到界面


var isLoginLink = false;//大厅通信是否链接
var isGameLink = false;//游戏通信是否连接
//下面几个变量，指向场景的对应的节点
var TouXiangSp = null;
var YuanBaoSp = null;
var NiChengSp = null;
var GameIDSp = null;
var JiangQuanSp = null;
var VipSp = null;
var mainScene_isOn = false; //大厅是否创建
var fangJianData_wServerID_array = new Array();
var FANGJIANDATA = [//记录游戏登陆成功后，返回的房间数据
		 {fangJianBtn : null,fangJianMingZi : "",wSortID : 0,wServerID : 0,dwOnLineCount: 0,isJiangQuan : false,yaFen : "押分10-100",renShu : "在线人数：0人",XrenShu:null},
		 {fangJianBtn : null,fangJianMingZi : "",wSortID : 0,wServerID : 0,dwOnLineCount: 0,isJiangQuan : false,yaFen : "押分100-1000",renShu : "在线人数：0人",XrenShu:null},
		 {fangJianBtn : null,fangJianMingZi : "",wSortID : 0,wServerID : 0,dwOnLineCount: 0,isJiangQuan : false,yaFen : "押分1000-1万",renShu : "在线人数：0人",XrenShu:null},
		 {fangJianBtn : null,fangJianMingZi : "",wSortID : 0,wServerID : 0,dwOnLineCount: 0,isJiangQuan : false,yaFen : "押分1万-10万",renShu : "在线人数：0人",XrenShu:null},
];
var fangJianData = new Array();
initFangJianInfor = function(){
	for ( var i in FANGJIANDATA) {
		fangJianData[i] = new Object();
		for ( var j in FANGJIANDATA[i]) {
			fangJianData[i][j] = FANGJIANDATA[i][j];
		}
	}
};

var getFangJianByServerID = function(serverID) {
	for ( var i in fangJianData) {
		if (fangJianData[i].wServerID == serverID) {
			return fangJianData[i];
		};
	};
};




var touXiangFrame = ["touxiang_nan01.png","touxiang_nan02.png","touxiang_nan03.png","touxiang_nan04.png","touxiang_nv01.png","touxiang_nv02.png","touxiang_nv03.png","touxiang_nv04.png"];

//GI_FUTOU = 0,     // 斧头
//GI_YINGQIANG,     // 银枪
//GI_DADAO,         // 大刀
//GI_LU,            // 鲁智深
//GI_LIN,           // 林冲
//GI_SONG,          // 宋江
//GI_TITIANXINGDAO, // 替天行道
//GI_ZHONGYITANG,   // 忠义堂
//奖券
//GI_SHUIHUZHUAN,   // 水浒传
var Element_up_youjiang =new Array("result_9.png","result_8.png","result_7.png","result_6.png","result_5.png","result_4.png","result_3.png","result_2.png","result_0.png","result_1.png");
var Element_down_youjiang = new Array("result_9_1.png","result_8_1.png","result_7_1.png","result_6_1.png","result_5_1.png","result_4_1.png","result_3_1.png","result_2_1.png","result_0_1.png","result_1_1.png");
//无奖券场时
var Element_up_wujiang =new Array("result_9.png","result_8.png","result_7.png","result_6.png","result_5.png","result_4.png","result_3.png","result_2.png","result_0.png","result_1.png");
var Element_down_wujiang = new Array("result_9_1.png","result_8_1.png","result_7_1.png","result_6_1.png","result_5_1.png","result_4_1.png","result_3_1.png","result_2_1.png","result_0_1.png","result_1_1.png");
 
var Element_up = Element_up_youjiang;
var Element_down = Element_down_youjiang;

var spriteType = [{name:"result_0.png",type:0},{name:"result_1.png",type:1},{name:"result_2.png",type:2},{name:"result_3.png",type:3},{name:"result_4.png",type:4},{name:"result_5.png",type:5},{name:"result_6.png",type:6},{name:"result_7.png",type:7},{name:"result_8.png",type:8},{name:"result_9.png",type:9}];

function getSpriteTypeForName(name){
	var type=-1;
	for(var sp in spriteType){
		//cc.log(spriteType[sp].name+"==="+name);
		if(spriteType[sp].name==name){			
			type=spriteType[sp].type;
			break;
		}
	}
	return type;
}

function getSpriteNameForType(type){

	for(var sp in spriteType){
		if(sp.type==type){
			return sp.name;
		}
	}
	return "";
}

//不同房间可以压的分数
var whichScene = [];
var scene = [
             [10,20,30,40,50,60,70,80,90,100],
             [100,200,300,400,500,600,700,800,900,1000],
             [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000],
             [10000,20000,30000,40000,50000,60000,70000,80000,90000,100000],
             ];

//每条得分线上所对应的图片位置
var ScoreLine1 = [1,4,7,10,13];
var ScoreLine2 = [0,3,6,9,12];
var ScoreLine3 = [2,5,8,11,14];
var ScoreLine4 = [0,4,8,10,12];
var ScoreLine5 = [2,4,6,10,14];
var ScoreLine6 = [0,3,7,9,12];
var ScoreLine7 = [2,5,7,11,14];
var ScoreLine8 = [1,5,8,11,13];
var ScoreLine9 = [1,3,6,9,13];

var ScoreLines = [ScoreLine1,ScoreLine2,ScoreLine3,ScoreLine4,ScoreLine5,ScoreLine6,ScoreLine7,ScoreLine8,ScoreLine9];
//记录每次比倍的结果;比倍场景上面绳子上的记录板会用到
var bet_notes = [];

//连线中奖的倍数
var winMultipleList = [[1,3,6],[0,0,2000],[50,200,1000],[20,80,400],[15,40,200],[10,30,160],[7,20,100],[5,15,60],[3,10,40],[2,5,20]];
//全盘中奖的倍数
var winMultipleAllEqualList = [200*9,5000*9,2500*9,1000*9,500*9,400*9,250*9,150*9,100*9,50*9,0,50*9,15*9];
//全盘中奖后的抽奖奖励倍数
var chouJiangPeiZhi = [
                 [1,3,5,10,15],
                 [1,3,5,10,15],
                 [1,3,5,10,15],
                 [5,10,15,20,30],
                 [5,10,15,20,30],
                 [5,10,15,20,30],
                 [15,20,30,50,100],
                 [15,20,30,50,100],
                 [15,20,30,50,100],
                 [1,2,4,6,10],//这个是用不到的
                 [1,2,4,6,10],//全盘兵器
                 [1,2,4,6,10],//全盘人物
                 ];


var nameArr = new Array();// 声明一个数组来存放从服务器获取的随机数据（每个方格的图片名字,判断得分情况也用它）
function assignValueNameArr(){
	nameArr = [];
	for (var i = 0; i <15; i++) {
		var randNum=Math.floor(Math.random()*7);
		//var randNum = (randNum > 8.5 ? 0 : randNum);
		nameArr.push(Element_up[randNum]);
	}
};

function  closeTanChu() {
	if(isTanChuCeng){
		isTanChuCeng = false;
	}else{
		return;
	}
}
function openTanChu() {
	if(!isTanChuCeng){
		isTanChuCeng = true;
	}else{
		return;
	}
}
var removeResources = function(numberAry) {
	for (var i = 0; i < numberAry.length; i++) {
		cc.spriteFrameCache.removeSpriteFramesFromFile(numberAry[i]+".plist");
		if(cc.textureCache.getTextureForKey(numberAry[i]+".png")){
			cc.textureCache.removeTextureForKey(numberAry[i]+".png");
		}
	}
}


shengJiVip = [0,10,60,150,500,1500,4000,8000,13000];
VIPS  = ["vip0.png","vip1.png","vip2.png","vip3.png","vip4.png","vip5.png","vip6.png","vip7.png","vip8.png"];





