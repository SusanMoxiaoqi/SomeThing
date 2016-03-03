package org.cocos2dx.javascript;

import android.app.Activity;
import android.content.Intent;
import android.widget.Toast;

import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.bean.SocializeEntity;
import com.umeng.socialize.controller.UMServiceFactory;
import com.umeng.socialize.controller.UMSocialService;
import com.umeng.socialize.controller.listener.SocializeListeners.SnsPostListener;
import com.umeng.socialize.media.QQShareContent;
import com.umeng.socialize.media.QZoneShareContent;
import com.umeng.socialize.media.SinaShareContent;
import com.umeng.socialize.media.UMImage;
import com.umeng.socialize.sso.QZoneSsoHandler;
import com.umeng.socialize.sso.SinaSsoHandler;
import com.umeng.socialize.sso.UMQQSsoHandler;
import com.umeng.socialize.sso.UMSsoHandler;
import com.umeng.socialize.weixin.controller.UMWXHandler;
import com.umeng.socialize.weixin.media.CircleShareContent;
import com.umeng.socialize.weixin.media.WeiXinShareContent;

public class JUMShare {

	private static Activity _act = null;
	private static UMSocialService _mController = null;

	public static void sdkInit(Activity act) {
		_act = act;
		_mController = UMServiceFactory.getUMSocialService("com.umeng.share");

		// 支持微信朋友圈
		{
			String appId = "wx568c4214ee9f26f4";
			String appSecret = "b13b00c6ffd703e1cc6b0f4648076d21";
//			//当乐
//			String appId = "wx7c3bd3253a8e3430";
//			String appSecret = "22f6d51a93b759c4ceb133e646d1f196";
			//应用汇
//			String appId = "wxacbeb96d7d7f7d32";
//			String appSecret = "d3a06d728f1cd0cbf82236f44f52a8c9";
			//安玩
//			String appId = "wxf85a9efbeeb4af31";
//			String appSecret = "82cbd9d6b71aeb675aa286dfac54baaa";
			// 添加微信平台
			UMWXHandler wxHandler = new UMWXHandler(_act, appId, appSecret);
			wxHandler.addToSocialSDK();

			// 支持微信朋友圈
			UMWXHandler wxCircleHandler = new UMWXHandler(_act, appId,
					appSecret);
			wxCircleHandler.setToCircle(true);
			wxCircleHandler.addToSocialSDK();
		}

		// QQ
		{
			String appId = "1104644836";
			String appKey = "1w5pCmxap7tUNjYy";
			//应用汇
//			String appId = "1104681037";
//			String appKey = "PSxhybqi5BroYaRM";
			// 添加QQ支持, 并且设置QQ分享内容的target url
			UMQQSsoHandler qqSsoHandler = new UMQQSsoHandler(_act, appId,
					appKey);
			qqSsoHandler.setTargetUrl("http://www.umeng.com/social");
			qqSsoHandler.addToSocialSDK();

			// 添加QZone平台
			QZoneSsoHandler qZoneSsoHandler = new QZoneSsoHandler(_act, appId,
					appKey);
			qZoneSsoHandler.addToSocialSDK();
		}

		_mController.getConfig().setSsoHandler(new SinaSsoHandler());
	}
	
	public static void onActivityResult(int requestCode, int resultCode, Intent data) {
		UMSsoHandler ssoHandler = _mController.getConfig().getSsoHandler(requestCode);
        if (ssoHandler != null) {
            ssoHandler.authorizeCallBack(requestCode, resultCode, data);
        }
	}

	public native static void shareCallback(String pl, String ec);

	public static void share(final String ps, final String title,
			final String text, final String url, final String image) {
		int p = Integer.parseInt(ps);
		SHARE_MEDIA platform = SHARE_MEDIA.QQ;
		if (1 == p) {
			platform = SHARE_MEDIA.WEIXIN;
		} else if (2 == p) {
			platform = SHARE_MEDIA.WEIXIN_CIRCLE;
		} else if (3 == p) {
			platform = SHARE_MEDIA.QQ;
		} else if (4 == p) {
			platform = SHARE_MEDIA.QZONE;
		} else if (5 == p) {
			platform = SHARE_MEDIA.SINA;
		}

		directShare(platform, title, text, url, image);
	}

	public static void directShare(final SHARE_MEDIA platform,
			final String title, final String text, final String url,
			final String image) {
		_act.runOnUiThread(new Runnable() {
			@Override
			public void run() {

				setShareContent(platform, title, text, url, image);

				// _mController.postShare(mContext, mPlatform,
				_mController.postShare(_act, platform, new SnsPostListener() {

					@Override
					public void onStart() {
//						Toast.makeText(_act, "开始分享.", Toast.LENGTH_SHORT)
//								.show();
					}

					@Override
					public void onComplete(SHARE_MEDIA platform, int eCode,
							SocializeEntity entity) {
						int p = 0;
						if (SHARE_MEDIA.WEIXIN == platform) {
							p = 1;
						} else if (SHARE_MEDIA.WEIXIN_CIRCLE == platform) {
							p = 2;
						} else if (SHARE_MEDIA.QQ == platform) {
							p = 3;
						} else if (SHARE_MEDIA.QZONE == platform) {
							p = 4;
						} else if (SHARE_MEDIA.SINA == platform) {
							p = 5;
						}
						shareCallback("" + p, "" + eCode);

						if (eCode == 200) {
//							Toast.makeText(_act, "分享成功.", Toast.LENGTH_SHORT)
//									.show();
						} else {
							String eMsg = "";
							if (eCode == -101) {
								eMsg = "没有授权";
							}
//							Toast.makeText(_act, "分享失败[" + eCode + "] " + eMsg,
//									Toast.LENGTH_SHORT).show();
						}
					}
				});
			}
		});
	}

	public static void setShareContent(SHARE_MEDIA platform, String title,
			String text, String url, String image) {
		UMImage imageObj = new UMImage(_act, image);

		// 设置QQ空间分享内容
		QZoneShareContent qzone = new QZoneShareContent();
		qzone.setShareContent(text);
		qzone.setTargetUrl(url);
		qzone.setTitle(title);
		qzone.setShareMedia(imageObj);
		// qzone.setShareMedia(uMusic);
		_mController.setShareMedia(qzone);

		// qq 分享
		QQShareContent qqShareContent = new QQShareContent();
		qqShareContent.setShareContent(text);
		qqShareContent.setTitle(title);
		qqShareContent.setShareMedia(imageObj);
		qqShareContent.setTargetUrl(url);
		_mController.setShareMedia(qqShareContent);

		// wechat
		WeiXinShareContent weixinContent = new WeiXinShareContent();
		//weixinContent.setShareContent("");
		weixinContent.setTitle(title);
		weixinContent.setTargetUrl(url);
		weixinContent.setShareMedia(imageObj);
		_mController.setShareMedia(weixinContent);

		// 设置朋友圈分享的内容
		CircleShareContent circleMedia = new CircleShareContent();
		circleMedia.setShareContent(text);
		circleMedia.setTitle(title);
		circleMedia.setShareMedia(imageObj);
		// circleMedia.setShareMedia(uMusic);
		// circleMedia.setShareMedia(video);
		circleMedia.setTargetUrl(url);
		_mController.setShareMedia(circleMedia);

		// sina
		SinaShareContent sinaContent = new SinaShareContent();
		sinaContent.setShareContent(text);
		sinaContent.setShareImage(imageObj);
		sinaContent.setTitle(title);
		sinaContent.setTargetUrl(url);
		_mController.setShareMedia(sinaContent);
	}
}
