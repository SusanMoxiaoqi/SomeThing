package com.baiyikeji.jiejishuihuzhuan.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.bean.SocializeConfig;
import com.umeng.socialize.sso.UMSsoHandler;
import com.umeng.socialize.weixin.controller.UMWXHandler;

public class WXEntryActivity extends Activity implements IWXAPIEventHandler {
	// IWXAPI 是第三方app和微信通信的openapi接口
	private IWXAPI api;
	protected UMWXHandler a = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// 通过WXAPIFactory工厂，获取IWXAPI的实例
		api = WXUtil.getWxApi();
		a();
		api.handleIntent(getIntent(), this);
	}

	protected void a() {
		SocializeConfig localSocializeConfig = SocializeConfig.getSocializeConfig();
		SHARE_MEDIA localSHARE_MEDIA = SocializeConfig.getSelectedPlatfrom();
		int i = 10086;
		if (localSHARE_MEDIA == SHARE_MEDIA.WEIXIN_CIRCLE) {
			i = 10085;
		}
		UMSsoHandler localUMSsoHandler = localSocializeConfig.getSsoHandler(i);
		if ((localUMSsoHandler instanceof UMWXHandler))
			this.a = ((UMWXHandler) localUMSsoHandler);
	}

	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		setIntent(intent);
		api.handleIntent(intent, this);
	
	}

	// 微信发送请求到第三方应用时，会回调到该方法
	@Override
	public void onReq(BaseReq req) {
		Toast.makeText(this, "openid = " + req.openId, Toast.LENGTH_SHORT).show();
		if (this.a != null) {
			this.a.getWXEventHandler().onReq(req);
		}
		finish();
	}

	// 第三方应用发送到微信的请求处理后的响应结果，会回调到该方法
	@Override
	public void onResp(BaseResp resp) {

		if (this.a != null) {
			this.a.getWXEventHandler().onResp(resp);
		}
		finish();

	}
}