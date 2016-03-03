package com.by.purchase.paytypes;

import org.json.JSONObject;

import android.app.FragmentManager;
import android.app.FragmentTransaction;

import com.by.purchase.R;
import com.by.purchase.fragments.FragmentWebView;
import com.by.purchase.manager.BYPMgr;
import com.by.purchase.manager.Constants;

public class YibaoMgr extends BaseMgr {

	public static YibaoMgr getInstance() {
		return (YibaoMgr) getInstance(YibaoMgr.class.getName());
	}

	@Override
	public void purchase() {
		BYPMgr.PURCHASE_TYPE = Constants.PurchaseType.Yibao;
		super.purchase();
	}

	public void parseOrder(JSONObject jobj) {
		super.parseOrder(jobj);
		try {

			String orderId = jobj.getString("orderid");

			JSONObject dataObj = jobj.getJSONObject("data");

			String urllink = dataObj.getString("urllink");

			if (orderId.length() > 0 && urllink.length() > 0) {
				this.startPay(orderId, urllink);
			} else {
				this.getOrderFailed();
			}

		} catch (Exception e) {

			e.printStackTrace();
			this.getOrderFailed();

		}

	}

	public void startPay(String orderId, String notifyurl) {
		FragmentManager fm = BYPMgr.FragmentMgr;
		FragmentTransaction tx = fm.beginTransaction();
		FragmentWebView fMo9 = new FragmentWebView();
		fMo9.loadURL(notifyurl);
		tx.replace(R.id.id_content, fMo9, "MO9");
		tx.addToBackStack(null);
		tx.commit();
	}

}
