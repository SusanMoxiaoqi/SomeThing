package com.by.purchase.paytypes;

import java.util.HashMap;

import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.ProgressDialog;
import android.util.Log;

import com.by.purchase.manager.BYPMgr;
import com.by.purchase.manager.Constants;
import com.by.purchase.utils.Alert;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

public class BaseMgr {

	public ProgressDialog _proDialog;

	BaseMgr() {
	};

	private static HashMap<String, BaseMgr> _instanceMap;

	public static BaseMgr getInstance(String name) {
		BaseMgr obj = null;
		try {
			Class<?> cls = Class.forName(name);
			if (_instanceMap == null) {
				_instanceMap = new HashMap<String, BaseMgr>();
			}

			Object tmpobj = _instanceMap.get(name);
			if (null != tmpobj) {
				obj = (BaseMgr) tmpobj;
			} else {
				obj = (BaseMgr) cls.getConstructor().newInstance();
				_instanceMap.put(name, obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return obj;
	}

	public void purchase() {
		_proDialog = android.app.ProgressDialog.show(BYPMgr.activity, "", "请稍候...");
		this.getOrder();
	}

	public void getOrder() {

		AsyncHttpClient client = new AsyncHttpClient();
		RequestParams params = new RequestParams();
		params.put("userid", BYPMgr.PURCHASE_USER_ID);
		params.put("channelid", BYPMgr.PURCHASE_TYPE);

		if (BYPMgr.PURCHASE_TYPE == Constants.PurchaseType.Card) {
			params.put("paymoney", BYPMgr.PURCHASE_CARD_PRICE);
		} else {
			params.put("paymoney", BYPMgr.PURCHASE_PRODUCT_PRICE);
		}
		params.put("detailid", BYPMgr.PURCHASE_CARD_CHANNEL);

		if (BYPMgr.PURCHASE_ORDER_PARAM.length() > 0) {
			String[] pl = BYPMgr.PURCHASE_ORDER_PARAM.split("&");
			for (int i = 0; i < pl.length; i++) {
				String p = pl[i];
				String[] p2 = p.split("=");
				if (p2.length == 2) {
					params.put(p2[0], p2[1]);
				}
			}
		}

		client.post(BYPMgr.PURCHASE_ORDER_URL, params,
				new AsyncHttpResponseHandler() {

					@Override
					public void onSuccess(int arg0, Header[] arg1, byte[] arg2) {
						String receive = new String(arg2);

						Log.i("getOrder", receive);

						try {
							JSONObject jobj = new JSONObject(receive);
							parseOrder(jobj);

						} catch (JSONException e) {
							e.printStackTrace();
							getOrderFailed();
						}
					}

					@Override
					public void onFailure(int arg0, Header[] arg1, byte[] arg2,
							Throwable arg3) {
						getOrderFailed();
					}
				});
	}

	public void getOrderFailed() {
		if (_proDialog != null) {
			_proDialog.dismiss();
			_proDialog = null;
		}
	}

	public void parseOrder(JSONObject jobj) {
		if (_proDialog != null) {
			_proDialog.dismiss();
			_proDialog = null;
		}
	}

	public void payEnd(int status, String msg) {

		String message = msg;
		int alertType = Alert.AlertTypeError;

		switch (status) {
		case Constants.PayStatus.Failed: {
			if (message.length() == 0) {
				message = Constants.LOCALSTR_PAYMENT_FAILED;
			}
			alertType = Alert.AlertTypeError;

			Alert.show("提示", message, alertType, new Alert.CallBack() {
				@Override
				public void call() {

				}
			});
		}
			break;
		case Constants.PayStatus.UserCanceled: {
			if (message.length() == 0) {
				message = Constants.LOCALSTR_PAYMENT_USERCANCEL;
			}
			alertType = Alert.AlertTypeOk;

			Alert.makeToast(message);
		}
			break;
		case Constants.PayStatus.Success: {
			if (message.length() == 0) {
				message = Constants.LOCALSTR_PAYMENT_SUCCESS;
			}
			alertType = Alert.AlertTypeOk;
			Alert.makeToast(message);
			BYPMgr.PURCHASE_CALLBACK.onPayEnd(status, message);
			BYPMgr.closePayView();
		}
			break;
		case Constants.PayStatus.Unknown: {
			if (message.length() == 0) {
				message = Constants.LOCALSTR_PAYMENT_UNKNOWN;
			}
			BYPMgr.PURCHASE_CALLBACK.onPayEnd(status, message);
			Alert.makeToast(message);
			BYPMgr.closePayView();
		}
			break;
		case Constants.PayStatus.WechatNotInstall: {
			if (message.length() == 0) {
				message = Constants.LOCALSTR_PAYMENT_WECHAT_NOT_INSTALL;
			}

			Alert.show("提示", message, alertType, new Alert.CallBack() {
				@Override
				public void call() {

				}
			});
		}
			break;
		default:
			break;
		}

	}

}
