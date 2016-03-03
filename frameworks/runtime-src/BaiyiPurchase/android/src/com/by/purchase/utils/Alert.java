package com.by.purchase.utils;

import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Toast;

import com.by.purchase.R;
import com.by.purchase.manager.BYPMgr;

public class Alert {
	
	public final static int AlertTypeError = 0;
	public final static int AlertTypeOk = 1;

	public interface CallBack {
		public void call();
	}
	
	public static void makeToast(final String msg) {
		BYPMgr.activity.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				Toast.makeText(BYPMgr.activity, msg, Toast.LENGTH_LONG).show();
			}
		});
		
	}

	public static void show(final String tile, final String message, int type,
			final CallBack callback) {

		final TipAlertDialog ad = new TipAlertDialog(BYPMgr.activity);
		ad.setMessage(message);
		
		int imgId = 0;
		if (AlertTypeError == type) {
			imgId = R.drawable.by_util_tip_error; 
		}
		else {
			imgId = R.drawable.by_util_tip_ok;
		}
		
		ad.setImageView(imgId);
		ad.setPositiveButton("确定", new OnClickListener() {
			@Override
			public void onClick(View v) {
				ad.dismiss();
				if (callback != null) {
					callback.call();
				}
			}
		});

//		ad.setNegativeButton("取消", new OnClickListener() {
//			@Override
//			public void onClick(View v) {
//				ad.dismiss();
//				Toast.makeText(BYPMgr.activity, "用户取消", Toast.LENGTH_LONG)
//						.show();
//			}
//		});
	}
}
