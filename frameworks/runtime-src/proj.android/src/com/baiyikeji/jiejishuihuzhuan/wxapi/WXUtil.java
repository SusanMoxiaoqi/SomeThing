package com.baiyikeji.jiejishuihuzhuan.wxapi;

import org.cocos2dx.javascript.AppActivity;

import android.app.Activity;
import android.widget.Toast;

import com.tencent.mm.sdk.modelpay.PayReq;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

public class WXUtil {
	private static IWXAPI api;
	public static String wxkey = "wx568c4214ee9f26f4";
	public static final String PARTNER_ID = "1245507402";
	public static IWXAPI getWxApi() {
		return api;
	}
	public static void initWxApi(Activity act, String key) {
		api = WXAPIFactory.createWXAPI(act, key);
		api.registerApp(key);
	}

	public static void startWxPay(String prepayid, String noncestr, String timestamp, String packagestr, String signstr) {

		if (api.isWXAppInstalled()) {
			if (api.isWXAppSupportAPI()) {
				PayReq req = new PayReq();
				// req.appId = "wxf8b4f85f3a794e77"; // 测试用appId
				req.appId = wxkey;
				req.partnerId = PARTNER_ID;
				req.prepayId = prepayid;
				req.nonceStr = noncestr;
				req.timeStamp = timestamp;
				req.packageValue = packagestr;
				req.sign = signstr;
				// req.extData = "app data"; // optional
				// 在支付之前，如果应用没有注册到微信，应该先调用IWXMsg.registerApp将应用注册到微信
				api.sendReq(req);
			} else {
				Toast.makeText(AppActivity.appActivity, "你的微信应用版本太低，请更新微信应用", Toast.LENGTH_SHORT).show();
			}
		} else {
			Toast.makeText(AppActivity.appActivity, "请安装微信应用app", Toast.LENGTH_SHORT).show();
		}
	}

}
