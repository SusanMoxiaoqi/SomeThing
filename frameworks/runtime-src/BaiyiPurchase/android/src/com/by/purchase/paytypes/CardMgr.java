package com.by.purchase.paytypes;

import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;

import com.by.purchase.manager.BYPMgr;
import com.by.purchase.manager.Constants;
import com.by.purchase.utils.DESEncryptionUtils;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

@SuppressLint("DefaultLocale")
public class CardMgr extends BaseMgr {

	public static CardMgr getInstance() {
		return (CardMgr)getInstance(CardMgr.class.getName());
	}

	@Override
	public void parseOrder(JSONObject jobj) {
		super.parseOrder(jobj);
		try {

			String orderId = jobj.getString("orderid");

			if (orderId.length() > 0) {
				this.startPay(orderId);
			} else {
				this.getOrderFailed();
			}

		} catch (Exception e) {

			e.printStackTrace();
			this.getOrderFailed();

		}
	}
	
	@Override
	public void purchase() {
		BYPMgr.PURCHASE_TYPE = Constants.PurchaseType.Card;
		super.purchase();
	}

	/**
	 * @param payType
	 * @param price
	 * @param cardNum
	 * @param cardPasswd
	 */
	public void startPay(String orderid) {
		String data = String
				.format("userid=%d&orderid=%s&detailid=%d&paymoney=%d&paycardno=%s&paycardpwd=%s",
						BYPMgr.PURCHASE_USER_ID, 
						orderid, 
						BYPMgr.PURCHASE_CARD_CHANNEL,
						BYPMgr.PURCHASE_CARD_PRICE,
						BYPMgr.PURCHASE_CARD_NUM,
						BYPMgr.PURCHASE_CARD_PWD);
		String key = String.format("%s%d", orderid, BYPMgr.PURCHASE_USER_ID);
		key = com.by.purchase.utils.MD5.getMessageDigest(key.getBytes());
		System.out.println(key);
		key = key.substring(8, 24);
		System.out.println(key);

		String encrypt = DESEncryptionUtils.encrypt(data, key);
		RequestParams params = new RequestParams();
		params.put("orderid", orderid);
		params.put("data", encrypt);

		AsyncHttpClient client = new AsyncHttpClient();
		// client.addHeader("Content-Type",
		// "application/x-www-form-urlencoded");
		client.post(BYPMgr.PURCHASE_CARD_URL, params,
				new AsyncHttpResponseHandler() {

					@Override
					public void onSuccess(int arg0, Header[] arg1, byte[] arg2) {
						
						String receive = new String(arg2);
						System.out.println(receive);

						try {
							JSONObject allStr = new JSONObject(receive);
							
							String status = allStr.getString("status");
							if (status.contains("fail")) {
								String msg = allStr.getString("msg");
								getInstance().payEnd(Constants.PayStatus.Failed, msg);
							} else if (status.contains("success")) {
								String msg = allStr.getString("msg");
								getInstance().payEnd(Constants.PayStatus.Success, msg);
							} else {
								String msg = allStr.getString("msg");
								getInstance().payEnd(Constants.PayStatus.Unknown, msg);
							}

						} catch (JSONException e) {
							e.printStackTrace();
							getInstance().payEnd(Constants.PayStatus.Failed, "");
						}
					}

					@Override
					public void onFailure(int arg0, Header[] arg1, byte[] arg2,
							Throwable arg3) {
						getInstance().payEnd(Constants.PayStatus.Failed, "");
					}
				});
	}
}
