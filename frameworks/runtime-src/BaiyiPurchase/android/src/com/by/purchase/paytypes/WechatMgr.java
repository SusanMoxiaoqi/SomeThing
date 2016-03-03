package com.by.purchase.paytypes;

import org.json.JSONObject;

import android.app.Activity;
import android.content.Intent;
import android.widget.Toast;

import com.by.purchase.manager.BYPMgr;
import com.by.purchase.manager.Constants;
import com.tencent.mm.sdk.constants.ConstantsAPI;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.modelpay.PayReq;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

public class WechatMgr extends BaseMgr {

	public static IWXAPI api;

	public static void DoInit(Activity context) {
		api = WXAPIFactory.createWXAPI(context, Constants.WX_APP_ID, true);
		api.registerApp(Constants.WX_APP_ID);
	}

	public static WechatMgr getInstance() {
		return (WechatMgr) getInstance(WechatMgr.class.getName());
	}

	@Override
	public void purchase() {
		if (api.isWXAppInstalled()) {
			BYPMgr.PURCHASE_TYPE = Constants.PurchaseType.Wechat;
			super.purchase();
		} else {
			getInstance().payEnd(Constants.PayStatus.WechatNotInstall, "");
		}
	}

	@Override
	public void parseOrder(JSONObject jobj) {
		super.parseOrder(jobj);
		try {

			JSONObject dataObj = jobj.getJSONObject("data");

			String appid = dataObj.getString("appid");
			String noncestr = dataObj.getString("noncestr");
			String packageValue = dataObj.getString("package");
			String prepayid = dataObj.getString("prepayid");
			String timestamp = dataObj.getString("timestamp");
			String sign = dataObj.getString("sign");

			if (appid.length() > 0 && noncestr.length() > 0
					&& packageValue.length() > 0 && prepayid.length() > 0
					&& timestamp.length() > 0 && sign.length() > 0) {
				this.startPay(appid, noncestr, packageValue, prepayid,
						timestamp, sign);
			} else {
				this.getOrderFailed();
			}

		} catch (Exception e) {

			e.printStackTrace();
			this.getOrderFailed();

		}
	}

	public void startPay(String appid, String noncestr, String packageValue,
			String prepayid, String timestamp, String sign) {

		PayReq req = new PayReq();
		req.appId = appid; // Constans.WX_APP_ID;
		req.partnerId = Constants.WX_PARTNER_ID;
		req.prepayId = prepayid;
		req.nonceStr = noncestr;
		req.timeStamp = String.valueOf(timestamp);
		req.packageValue = packageValue; // "Sign=" packageValue;

		// req.packageValue ="Sign=" + packageValue;
		req.sign = sign;

		// 在支付之前，如果应用没有注册到微信，应该先调用IWXMsg.registerApp将应用注册到微信
		api.sendReq(req);
	}

	/*************************************************
	 * 处理手机支付控件返回的支付结果
	 ************************************************/
	public boolean passCallback(BaseResp resp) {

		if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
			
			int resourceType = resp.errCode;
			switch (resourceType) {
			case -2:{
				getInstance().payEnd(Constants.PayStatus.UserCanceled, "");
			}
				break;
			case 0:{
				getInstance().payEnd(Constants.PayStatus.Success, "");
			}
				break;
			default:
			{
				getInstance().payEnd(Constants.PayStatus.Failed, "");
			}
				break;
			}
			
			return true;
		}
		else {
			return false;
		}
	}
}
