package com.by.purchase.paytypes;

import org.json.JSONObject;

import android.content.Intent;

import com.by.purchase.manager.BYPMgr;
import com.by.purchase.manager.Constants;
import com.unionpay.UPPayAssistEx;
import com.unionpay.uppay.PayActivity;

public class UnionpayMgr extends BaseMgr {

	public static UnionpayMgr getInstance() {
		return (UnionpayMgr) getInstance(UnionpayMgr.class.getName());
	}

	@Override
	public void purchase() {
		BYPMgr.PURCHASE_TYPE = Constants.PurchaseType.Unionpay;
		super.purchase();
	}

	public void parseOrder(JSONObject jobj) {
		super.parseOrder(jobj);
		try {
			
			String orderId = jobj.getString("orderid");
			
			JSONObject dataObj = jobj.getJSONObject("data");
			
			String tn = dataObj.getString("tn");
			
			if (orderId.length() > 0 && tn.length() > 0) {
				this.startPay(tn);
			} else {
				this.getOrderFailed();
			}

		} catch (Exception e) {

			e.printStackTrace();
			this.getOrderFailed();

		}

	}

	public void startPay(String tn) {
		UPPayAssistEx.startPayByJAR(BYPMgr.activity,
				PayActivity.class, null, null, tn, Constants.UNIONPAY_MODE);
	}
	
	/*************************************************
	 * 处理银联手机支付控件返回的支付结果
	 ************************************************/
	public void passCallback(int requestCode, int resultCode, Intent data) {
		
		if (data == null) {
			return;
		}
		
		/*
		 * 支付控件返回字符串:success、fail、cancel 分别代表支付成功，支付失败，支付取消
		 */
		String str = data.getExtras().getString("pay_result");
		if (str.equalsIgnoreCase("success")) {
			this.payEnd(Constants.PayStatus.Success, "");
		} else if (str.equalsIgnoreCase("fail")) {
			this.payEnd(Constants.PayStatus.Failed, "");
		} else if (str.equalsIgnoreCase("cancel")) {
			this.payEnd(Constants.PayStatus.UserCanceled, "");
		}
	}
	
}
