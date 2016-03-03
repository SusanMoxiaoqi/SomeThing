package com.by.purchase.paytypes;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.alipay.sdk.app.PayTask;
import com.by.purchase.manager.BYPMgr;
import com.by.purchase.manager.Constants;
import com.by.purchase.utils.PayResult;
import com.by.purchase.utils.SignUtils;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

//支付宝
public class AlipayMgr extends BaseMgr {

	private Handler mHandler = new Handler() {

		public void handleMessage(Message msg) {

			PayResult payResult = new PayResult((String) msg.obj);

			// 支付宝返回此次支付结果及加签，建议对支付宝签名信息拿签约时支付宝提供的公钥做验签
			// String resultInfo = payResult.getResult();
			String resultStatus = payResult.getResultStatus();

			// 判断resultStatus 为“9000”则代表支付成功，具体状态码代表含义可参考接口文档
			if (TextUtils.equals(resultStatus, "9000")) {
				getInstance().payEnd(Constants.PayStatus.Success, "");

			} else if (TextUtils.equals(resultStatus, "6001")) {
				getInstance().payEnd(Constants.PayStatus.UserCanceled, "");
			} else {
				// 判断resultStatus 为非“9000”则代表可能支付失败
				// “8000”代表支付结果因为支付渠道原因或者系统原因还在等待支付结果确认，最终交易是否成功以服务端异步通知为准（小概率状态）
				if (TextUtils.equals(resultStatus, "8000")) {
					getInstance()
							.payEnd(Constants.PayStatus.Unknown, "支付结果确认中");
				} else {
					// 其他值就可以判断为支付失败，包括用户主动取消支付，或者系统返回的错误
					getInstance().payEnd(Constants.PayStatus.Failed, "");
				}
			}
		};
	};

	public static AlipayMgr getInstance() {
		return (AlipayMgr) getInstance(AlipayMgr.class.getName());
	}

	@Override
	public void purchase() {
		BYPMgr.PURCHASE_TYPE = Constants.PurchaseType.Alipay;
		super.purchase();
	}

	@Override
	public void parseOrder(JSONObject jobj) {
		super.parseOrder(jobj);
		try {

			String orderId = jobj.getString("orderid");

			JSONObject data = jobj.getJSONObject("data");

			String notifyurl = data.getString("notifyurl");

			if (orderId.length() > 0 && notifyurl.length() > 0) {
				this.startPay(orderId, notifyurl);
			} else {
				this.getOrderFailed();
			}

		} catch (Exception e) {

			e.printStackTrace();
			this.getOrderFailed();

		}
	}

	/**
	 * call alipay sdk pay. 调用SDK支付
	 * 
	 */
	public void startPay(String orderId, String notifyurl) {

		String orderInfo = this.getOrderInfo(orderId, notifyurl,
				BYPMgr.PURCHASE_PRODUCT_NAME, BYPMgr.PURCHASE_PRODUCT_PRICE);

		// 对订单做RSA 签名
		String sign = sign(orderInfo);
		try {
			// 仅需对sign 做URL编码
			sign = URLEncoder.encode(sign, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		// 完整的符合支付宝参数规范的订单信息
		final String payInfo = orderInfo + "&sign=\"" + sign + "\"&"
				+ getSignType();

		Runnable payRunnable = new Runnable() {

			@Override
			public void run() {
				// 构造PayTask 对象
				PayTask alipay = new PayTask(BYPMgr.activity);
				// 调用支付接口，获取支付结果
				String result = alipay.pay(payInfo);

				Message msg = new Message();
				msg.obj = result;
				mHandler.sendMessage(msg);
			}
		};

		// 必须异步调用
		Thread payThread = new Thread(payRunnable);
		payThread.start();

	}

	/**
	 * get the sdk version. 获取SDK版本号
	 * 
	 */
	public void getSDKVersion() {
		PayTask payTask = new PayTask(BYPMgr.activity);
		String version = payTask.getVersion();
		Toast.makeText(BYPMgr.activity, version, Toast.LENGTH_SHORT).show();
	}

	/**
	 * create the order info. 创建订单信息
	 * 
	 */
	public String getOrderInfo(String orderId, String notifyurl,
			String productName, int price) {
		// 签约合作者身份ID
		String orderInfo = "partner=" + "\"" + Constants.ALIPAY_PARTNER + "\"";

		// 签约卖家支付宝账号
		orderInfo += "&seller_id=" + "\"" + Constants.ALIPAY_SELLER + "\"";

		// 商户网站唯一订单号
		orderInfo += "&out_trade_no=" + "\"" + orderId + "\"";

		// 商品名称
		orderInfo += "&subject=" + "\"" + productName + "\"";

		// 商品详情
		orderInfo += "&body=" + "\"" + productName + "\"";

		// 商品金额
		orderInfo += "&total_fee=" + "\"" + price + "\"";

		// 服务器异步通知页面路径
		orderInfo += "&notify_url=" + "\"" + notifyurl + "\"";

		// 服务接口名称， 固定值
		orderInfo += "&service=\"mobile.securitypay.pay\"";

		// 支付类型， 固定值
		orderInfo += "&payment_type=\"1\"";

		// 参数编码， 固定值
		orderInfo += "&_input_charset=\"utf-8\"";

		// 设置未付款交易的超时时间
		// 默认30分钟，一旦超时，该笔交易就会自动被关闭。
		// 取值范围：1m～15d。
		// m-分钟，h-小时，d-天，1c-当天（无论交易何时创建，都在0点关闭）。
		// 该参数数值不接受小数点，如1.5h，可转换为90m。
		orderInfo += "&it_b_pay=\"30m\"";

		// extern_token为经过快登授权获取到的alipay_open_id,带上此参数用户将使用授权的账户进行支付
		// orderInfo += "&extern_token=" + "\"" + extern_token + "\"";

		// 支付宝处理完请求后，当前页面跳转到商户指定页面的路径，可空
		orderInfo += "&return_url=\"m.alipay.com\"";

		// 调用银行卡支付，需配置此参数，参与签名， 固定值 （需要签约《无线银行卡快捷支付》才能使用）
		// orderInfo += "&paymethod=\"expressGateway\"";

		System.out.println("orderInfo" + orderInfo);

		return orderInfo;
	}

	/**
	 * sign the order info. 对订单信息进行签名
	 * 
	 * @param content
	 *            待签名订单信息
	 */
	public String sign(String content) {
		return SignUtils.sign(content, Constants.ALIPAY_RSA_PRIVATE);
	}

	/**
	 * get the sign type we use. 获取签名方式
	 * 
	 */
	public String getSignType() {
		return "sign_type=\"RSA\"";
	}

	public void doRequestOrder() {

	}

}
