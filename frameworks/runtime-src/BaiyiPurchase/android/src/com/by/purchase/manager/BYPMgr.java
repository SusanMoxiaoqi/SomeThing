package com.by.purchase.manager;

import android.app.Activity;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;

import com.by.purchase.R;
import com.by.purchase.fragments.FragmentList;
import com.by.purchase.paytypes.UnionpayMgr;
import com.by.purchase.paytypes.WechatMgr;
import com.by.purchase.utils.Alert;
import com.tencent.mm.sdk.modelbase.BaseResp;

public class BYPMgr {

	public interface BYPCallBack {
		public void onPayEnd(final int status, final String msg);
	}

	// 用户id
	public static int PURCHASE_USER_ID; // _payUserUid;
	// 商品名称
	public static String PURCHASE_PRODUCT_NAME; // _productInfoName;
	// 商品价格
	public static int PURCHASE_PRODUCT_PRICE; // _productInfoPrice;
	// 支付界面类型
	public static int[] PURCHASE_VIEW_TYPE = Constants.VIEWTYPE_DEFAULT;

	// 支付方式
	public static int PURCHASE_TYPE = Constants.PurchaseType.Unknown;

	// 卡支付渠道
	public static int PURCHASE_CARD_CHANNEL; // _payInfoType;
	// 卡支付方式价格
	public static int PURCHASE_CARD_PRICE; // _payInfoPrice;

	// 卡号
	public static String PURCHASE_CARD_NUM; // _payBankNum;
	// 卡密
	public static String PURCHASE_CARD_PWD; // _payBankPwd;
	// 订单自定义参数
	public static String PURCHASE_ORDER_PARAM;

	// 视图控制器
	public static FragmentManager FragmentMgr;

	// 回调
	public static BYPCallBack PURCHASE_CALLBACK;

	public static String SDK_URL_PREFIX = "http://sdk.6513.com";
	public static String PURCHASE_ORDER_URL = SDK_URL_PREFIX
			+ "/index.php/PaySdk/Getsafeorder/getpayorder.php";
	public static String PURCHASE_CARD_URL = SDK_URL_PREFIX
			+ "/index.php/PaySdk/Yeepaycard/applypayorder.php";

	// 第一个界面的内容选项
	static FragmentList _fragmentPurchaseList;

	public static Activity activity;

	public static boolean isShow = false;

	private static View _payView = null;

	public static void setURLPrefix(String prefix) {
		if (prefix.length() > 0) {
			SDK_URL_PREFIX = prefix;
			PURCHASE_ORDER_URL = SDK_URL_PREFIX
					+ "/index.php/PaySdk/Getsafeorder/getpayorder.php";
			PURCHASE_CARD_URL = SDK_URL_PREFIX
					+ "/index.php/PaySdk/Yeepaycard/applypayorder.php";
		}
	}

	public static void DoInit(Activity context) {
		activity = context;
		BYPMgr.activity = context;
		WechatMgr.DoInit(context);
	}

	/*
	 * Helper method to get the hold of Cocos2dx Changable View, You can add
	 * others views using this view
	 */
	private static FrameLayout _rootView = null;

	private static FrameLayout GetRootView() {
		if (_rootView == null) {
			_rootView = (FrameLayout) activity.getWindow().getDecorView()
					.findViewById(android.R.id.content);
		}
		return _rootView;
	}

	public static void pay(String userId, String productName,
			String productPrice, String viewTypes, String otherOrderParams,
			BYPCallBack callback) {

		if (BYPMgr.isShow) {
			// callback.onPayEnd(BYPayStatus.UserCanceled, "");
			return;
		}

		BYPMgr.PURCHASE_USER_ID = Integer.parseInt(userId);
		BYPMgr.PURCHASE_PRODUCT_NAME = productName;
		BYPMgr.PURCHASE_PRODUCT_PRICE = Integer.parseInt(productPrice);
		
		String[] str = viewTypes.split(",");
		int[] types = new int[10];
	    for (int i = 0 ; i < str.length ; i++ ) {
	    	types[i] = Integer.parseInt(str[i]);
	    } 
		
		BYPMgr.PURCHASE_VIEW_TYPE = types;
		BYPMgr.PURCHASE_ORDER_PARAM = otherOrderParams;
		BYPMgr.PURCHASE_CALLBACK = callback;
		BYPMgr.isShow = true;

		_payView = LayoutInflater.from(activity).inflate(R.layout.by_pay_main,
				null);
		GetRootView().addView(_payView);

		// 视图控制器
		BYPMgr.FragmentMgr = activity.getFragmentManager();
		
		// 载入第一个视图
		FragmentTransaction transaction = FragmentMgr.beginTransaction();
		if (_fragmentPurchaseList != null) {
			transaction.hide(_fragmentPurchaseList);
		}
		transaction.replace(R.id.id_content, new FragmentList(), "ONE");
		transaction.commit();
		
		// 绑定视图事件
		bindCanClickViewWithMethod();
		
		return;
	}

	// 关闭支付界面

	public static View getPayView() {
		return _payView;
	}

	public static void closePayView() {
		GetRootView().removeView(_payView);
		_payView = null;
		_rootView = null;
		FragmentMgr = null;
		BYPMgr.isShow = false;
	}

	// 绑定视图事件

	private static void bindCanClickViewWithMethod() {

		Button tile_left_btn = (Button) _payView
				.findViewById(R.id.id_title_left_btn);
		Button tile_right_btn = (Button) _payView
				.findViewById(R.id.id_title_right_btn);

		tile_left_btn.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View arg0) {
					FragmentTransaction tx = FragmentMgr.beginTransaction();
					FragmentList fNNN = new FragmentList();
					tx.replace(R.id.id_content, fNNN);
					tx.addToBackStack(null);
					tx.commit();
			}
		});
		
		tile_right_btn.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View arg0) {
				if (BYPMgr.PURCHASE_TYPE == Constants.PurchaseType.Mo9
						|| BYPMgr.PURCHASE_TYPE == Constants.PurchaseType.Mo9) {
					String message = Constants.LOCALSTR_PAYMENT_UNKNOWN;
					Alert.makeToast(message);
				}
				BYPMgr.PURCHASE_CALLBACK.onPayEnd(Constants.PayStatus.Unknown, "");
				BYPMgr.closePayView();
			}
		});
		
	}

	public static void passUnionpayCallback(int requestCode, int resultCode,
			Intent data) {
		UnionpayMgr.getInstance().passCallback(requestCode, resultCode, data);
	}

	public static boolean passWechatCallback(BaseResp resp) {
		return WechatMgr.getInstance().passCallback(resp);
	}
}
