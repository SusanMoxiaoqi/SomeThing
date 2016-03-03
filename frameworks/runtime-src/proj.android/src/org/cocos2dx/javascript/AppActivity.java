/****************************************************************************
Copyright (c) 2008-2010 Ricardo Quesada
Copyright (c) 2010-2012 cocos2d-x.org
Copyright (c) 2011      Zynga Inc.
Copyright (c) 2013-2014 Chukong Technologies Inc.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 ****************************************************************************/
package org.cocos2dx.javascript;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.util.Random;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.cocos2dx.lib.Cocos2dxHandler;

import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.net.Uri;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.WindowManager;

import com.baiyikeji.jiejishuihuzhuan.wxapi.WXUtil;
import com.by.purchase.manager.BYPMgr;
import com.by.shz.util.NetworkUtil;
import com.testin.agent.TestinAgent;
import com.umeng.mobclickcpp.MobClickCppHelper;

public class AppActivity extends Cocos2dxActivity {

	static String PRODUCT_NAME = null;
	static String PRODUCT_PRICE = null;
	static String PRODUCT_USERID = null;
	static String PRUDUCT_INFO = null;
	static String PRODUCTTYPE = null; 
	public static final int SDK_PAY_FLAG = 0;
	private static AppActivity appact;
	static String hostIPAdress = "0.0.0.0";
	public static AppActivity appActivity = null;
	static String mAccessToken = null;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON,
				WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
		MobClickCppHelper.init(this);
		appact = this;
		// this为Cocos2dxActivity类型, 参数2为描述符,可随意修改.
		// CCUMSocialController.initSocialSDK(this, "com.umeng.social.share");
		if (nativeIsLandScape()) {
			setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
		} else {
			setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
		}
		if (nativeIsDebug()) {
			getWindow().setFlags(
					WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON,
					WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
		}
		
		
		hostIPAdress = getHostIpAddress();
		appActivity = this;
		// BYPayViewManager.DoInit(this);
		BYPMgr.DoInit(this);
		JUMShare.sdkInit(this);
		 
		TestinAgent.init(appActivity,"d638f89e95f173806b5f3f2ee4660bed","gwshz_apk");
		TestinAgent.setTestinUncaughtExceptionHandler( new MyUncaughtExceptionHandler());
		TestinAgent.setLocalDebug(true);
		WXUtil.initWxApi(appActivity, WXUtil.wxkey);
		SHZ_CONFIG.packsgeName = this.getPackageName();
	}


	public static void  setSDKBkds(String userId) {
		TestinAgent.setUserInfo(userId);
	}

	
	static {
		MobClickCppHelper.loadLibrary();
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		// 授权回调
		JUMShare.onActivityResult(requestCode, resultCode, data);
		super.onActivityResult(requestCode, resultCode, data);
	}
	@Override
	protected void onDestroy() {
		super.onDestroy();
	}

	// 整个包的下载地址
	public static void openUrlDownload(String url) {

		Message msg = new Message();
		msg.what = Cocos2dxHandler.HANDLER_SHODOWNLOAD;
		Bundle bundle = new Bundle();
		bundle.putString("dowurl", url);
		msg.setData(bundle);
		Cocos2dxHandler handler = Cocos2dxActivity.getmHandler();
		handler.sendMessage(msg);

	}

	private Handler mHandler = new Handler() {
		public void handleMessage(Message msg) {
			switch (msg.what) {
			case SDK_PAY_FLAG: {
				showNow();

				break;
			}
			default:
				break;
			}
		};
	};

	public void showNow() {
//		int productType = 0;
//		if(PRODUCTTYPE != null){
//			productType = Integer.parseInt(PRODUCTTYPE);
//		}
		BYPMgr.setURLPrefix("http://m1-pay.baiyishuihu.com");
		BYPMgr.pay(PRODUCT_USERID, PRODUCT_NAME, PRODUCT_PRICE,
				PRODUCTTYPE, PRUDUCT_INFO,
				new BYPMgr.BYPCallBack() {

					@Override
					public void onPayEnd(int status, String msg) {
						// TODO Auto-generated method stub

					}

				});
		// BYPayViewManager.setPayUserId( PRODUCT_USERID );
		// BYPayViewManager.setProductInfo( PRODUCT_NAME, PRODUCT_PRICE );
		// BYPayViewManager.getInstance().getPayView( 1 ,1);
	}

	public void Pay() {
		Runnable payRunnable = new Runnable() {
			@Override
			public void run() {
				Message msg = new Message();
				msg.what = SDK_PAY_FLAG;
				msg.obj = "hh";
				mHandler.sendMessage(msg);
			}
		};

		// 必须异步调用
		Thread payThread = new Thread(payRunnable);
		payThread.start();
	}

	public static void showPayView(String pTitle, String pPrice,
			String pUser_id, String pIntroduce,String productType) {
		PRODUCT_NAME = pTitle;
		PRODUCT_PRICE = pPrice;
		PRODUCT_USERID = pUser_id;
		PRUDUCT_INFO = pIntroduce;
		PRODUCTTYPE = productType;
		appact.Pay();
	}

//	@SuppressWarnings("deprecation")
	public static void copyClipboard(String copyString){
				Message msg = new Message();
				msg.what = Cocos2dxHandler.HANDLER_COPY;
				Bundle bundle = new Bundle();
				bundle.putString("copytextcontent", copyString);
				msg.setData(bundle);
				Cocos2dxHandler handler = Cocos2dxActivity.getmHandler();
				handler.sendMessage(msg);
	}
	
	public String getUUIDfromSqlite(){
		DatabaseHelper database = new DatabaseHelper(this);//这段代码放到Activity类中才用this  
		SQLiteDatabase db = null;  
		db = database.getReadableDatabase();  
		Log.e("SHZ_UDID", "3,"+db.getPath()+","+db.getVersion());
		String uuid = "";
		Cursor c = db.query("shuihuzhuan",null,null,null,null,null,null);//查询并获得游标  
		if(c.moveToFirst()){//判断游标是否为空  
		    for(int i=0;i<c.getCount();i++){  
		        c.move(i);//移动到指定记录  
		        String key = c.getString(c.getColumnIndex("key"));  
		        if (key.equalsIgnoreCase("SHZ_UDID")) {
		        	uuid = c.getString(c.getColumnIndex("value"));
		        	break;
				};
		    };  
		};
		Log.e("SHZ_UDID", "getUUIDfromSqlite"+uuid);
		Log.e("SHZ_UDID", "4,"+db.getPath()+","+db.getVersion());
		return uuid;
	}
	public static String getuuid() throws FileNotFoundException {
		String uid = "";
		uid = appActivity.getUUIDfromSqlite();
		if (!uid.equalsIgnoreCase("")) {
			return uid;
		}
		WifiManager wifi = (WifiManager) appActivity
				.getSystemService(Context.WIFI_SERVICE);
		WifiInfo info = wifi.getConnectionInfo();
		String wifiMac = info.getMacAddress();
		TelephonyManager tm = (TelephonyManager) appActivity
				.getSystemService(Context.TELEPHONY_SERVICE);
		String imei = tm.getDeviceId();
		wifiMac = wifiMac == null ? "" : wifiMac;
		imei = imei == null ? "" : imei;
		uid = wifiMac + imei;
		if (uid.trim().equals("")) {
			Random r = new Random();
			uid = System.currentTimeMillis() + r.nextInt() + "";
			if (uid.length() > 32) {
				uid = uid.substring(0, 32);
			}
		};
		appActivity.creatMySQLite(uid);
		return uid;
	}
	public void creatMySQLite(String uid){
		DatabaseHelper database = new DatabaseHelper(this);//这段代码放到Activity类中才用this  
		SQLiteDatabase db = null;  
		db = database.getReadableDatabase(); 
		Log.e("SHZ_UDID", "1,"+db.getPath()+","+db.getVersion());
		ContentValues cv = new ContentValues();//实例化一个ContentValues用来装载待插入的数据cv.put("username","Jack Johnson");//添加用户名  
		cv.put("key","SHZ_UDID"); 
		cv.put("value",uid);
		db.insert("shuihuzhuan",null,cv);//执行插入操作  
		Log.e("SHZ_UDID", "1,"+db.getPath()+","+db.getVersion());
	}
	@Override
	public Cocos2dxGLSurfaceView onCreateView() {
		Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
		// TestCpp should create stencil buffer
		glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);

		return glSurfaceView;
	}

	// 得到当前的网络环境
	public static int getNetworkIsWifi() {
		return NetworkUtil.getNetWorkType(appActivity);
	}

	// 拨打电话
	public static void callTelPhone() {
		Intent intent = new Intent(Intent.ACTION_CALL,
				Uri.parse("tel:4000371814"));
		appActivity.startActivity(intent);
	}

	public String getHostIpAddress() {
		WifiManager wifiMgr = (WifiManager) getSystemService(WIFI_SERVICE);
		WifiInfo wifiInfo = wifiMgr.getConnectionInfo();
		int ip = wifiInfo.getIpAddress();
		return ((ip & 0xFF) + "." + ((ip >>>= 8) & 0xFF) + "."
				+ ((ip >>>= 8) & 0xFF) + "." + ((ip >>>= 8) & 0xFF));
	}
	//游戏退出
	public static void exit() {
		System.exit(0);
	}
	public static String getLocalIpAddress() {
		return hostIPAdress;
	}

	private static native boolean nativeIsLandScape();

	private static native boolean nativeIsDebug();

}
