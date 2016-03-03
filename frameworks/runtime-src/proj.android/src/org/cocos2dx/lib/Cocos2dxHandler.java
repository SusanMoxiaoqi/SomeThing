/****************************************************************************
Copyright (c) 2010-2011 cocos2d-x.org

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

package org.cocos2dx.lib;

import java.lang.ref.WeakReference;

import org.cocos2dx.javascript.DownloadService;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.app.Service;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.ServiceConnection;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import com.by.shz.util.Download;

public class Cocos2dxHandler extends Handler {
	public static  SensorManager magr;
    // ===========================================================
    // Constants
    // ===========================================================
    public final static int HANDLER_SHOW_DIALOG = 1;
    public final static int HANDLER_SHOW_EDITBOX_DIALOG = 2;
    public final static int HANDLER_SHODOWNLOAD = 3;
    public final static int HANDLER_COPY = 4;
    public final static int HANDLER_YAOYAOYES = 99;
    public final static int HANDLER_YAOYAONO = 100;
	protected static final String TAG = "Cocos2dxHandler";
    // ===========================================================
    // Fields
    // ===========================================================
    private WeakReference<Cocos2dxActivity> mActivity;
    
    // ===========================================================
    // Constructors
    // ===========================================================
    public Cocos2dxHandler(Cocos2dxActivity activity) {
        this.mActivity = new WeakReference<Cocos2dxActivity>(activity);
    }

    // ===========================================================
    // Getter & Setter
    // ===========================================================

    // ===========================================================
    // Methods for/from SuperClass/Interfaces
    // ===========================================================
    
    // ===========================================================
    // Methods
    // ===========================================================
    Handler mainHandler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			Cocos2dxActivity.pd.setProgress(msg.arg1);
		};
	};
	
    ServiceConnection sc = new ServiceConnection() {

		@Override
		public void onServiceDisconnected(ComponentName name) {
			Toast.makeText(Cocos2dxActivity.getContext().getApplicationContext(), "服务断开，请检查网络！",
					Toast.LENGTH_SHORT).show();
		}

		@Override
		public void onServiceConnected(ComponentName name, IBinder service) {
			Cocos2dxActivity.mybinder = (DownloadService.MyBinder) service;
			// 启动一个线程 监听进度
			new Thread() {
				@Override
				public void run() {
					while (true) {
						int progress = Cocos2dxActivity.mybinder.getProgressInfo();
						Message msg = new Message();
						msg.arg1 = progress;
						mainHandler.sendMessage(msg);
						
						if (progress == 100) {
							break;
						}
						try {
							//减少while循环的压力
							Thread.sleep(1000);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
				};
			}.start();
		}
	};
    public void handleMessage(Message msg) {
        switch (msg.what) {
        case Cocos2dxHandler.HANDLER_SHOW_DIALOG:
            showDialog(msg);
            break;
        case Cocos2dxHandler.HANDLER_SHOW_EDITBOX_DIALOG:
            showEditBoxDialog(msg);
            break;
        case Cocos2dxHandler.HANDLER_SHODOWNLOAD:
        {
        	String urlPath = msg.getData().getString("dowurl");//接受msg传递过来的参数 
        	String apkName = urlPath.substring((urlPath.lastIndexOf("/")+1));
        	Cocos2dxActivity.bindIntent = new Intent(Cocos2dxActivity.getContext() ,DownloadService.class);
    		Download	d = new Download("1", urlPath, "百易科技", apkName);
    		Cocos2dxActivity.bindIntent.putExtra("download", d);
    		Cocos2dxActivity.getContext().bindService(Cocos2dxActivity.bindIntent, sc, Service.BIND_AUTO_CREATE);
    		
    		Cocos2dxActivity.pd = new ProgressDialog(Cocos2dxActivity.getContext());
    		Cocos2dxActivity.pd.setTitle("下载进度");
    		Cocos2dxActivity.pd.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
    		Cocos2dxActivity.pd.setMax(100);
    		Cocos2dxActivity.pd.setCancelable(false);
    		Cocos2dxActivity.pd.setCanceledOnTouchOutside(false);
    		Cocos2dxActivity.pd.setButton("后台下载", new DialogInterface.OnClickListener() {

    			@Override
    			public void onClick(DialogInterface dialog, int which) {
    				Cocos2dxActivity.pd.dismiss();
    				Cocos2dxActivity.getContext().startService(Cocos2dxActivity.bindIntent);
    				Cocos2dxActivity.getContext().unbindService(sc);
    				//endGame();
    				Intent intent = new Intent(Intent.ACTION_MAIN);  
    		        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);  
    		        intent.addCategory(Intent.CATEGORY_HOME);  
    		        Cocos2dxActivity.getContext().startActivity(intent); 
    			}
    		});
    		Cocos2dxActivity.pd.show();
    		
        }
        	break;
        	
        case Cocos2dxHandler.HANDLER_COPY:
        {
        	ClipboardManager cmb = (ClipboardManager) Cocos2dxActivity.getContext().getSystemService(Cocos2dxActivity.getContext().CLIPBOARD_SERVICE); 
        	String copycontent= msg.getData().getString("copytextcontent");
        	cmb.setPrimaryClip(ClipData.newPlainText("sinaweibo", copycontent));
        }
        break;
        case HANDLER_YAOYAOYES:
			magr = (SensorManager) Cocos2dxActivity.getContext().getSystemService(
					Context.SENSOR_SERVICE);
			magr.registerListener(sensorListener, magr.getDefaultSensor(Sensor.TYPE_ACCELEROMETER),SensorManager.SENSOR_DELAY_GAME);	
        	break;
        case HANDLER_YAOYAONO:
        	magr.unregisterListener(sensorListener);
        	break;
        }
    }
    
    private void showDialog(Message msg) {
        Cocos2dxActivity theActivity = this.mActivity.get();
        DialogMessage dialogMessage = (DialogMessage)msg.obj;
        new AlertDialog.Builder(theActivity)
        .setTitle(dialogMessage.titile)
        .setMessage(dialogMessage.message)
        .setPositiveButton("Ok", 
                new DialogInterface.OnClickListener() {
                    
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        // TODO Auto-generated method stub
                        
                    }
                }).create().show();
    }
    
    private void showEditBoxDialog(Message msg) {
        EditBoxMessage editBoxMessage = (EditBoxMessage)msg.obj;
        new Cocos2dxEditBoxDialog(this.mActivity.get(),
                editBoxMessage.title,
                editBoxMessage.content,
                editBoxMessage.inputMode,
                editBoxMessage.inputFlag,
                editBoxMessage.returnType,
                editBoxMessage.maxLength).show();
    }
    
    // ===========================================================
    // Inner and Anonymous Classes
    // ===========================================================
    
    public static class DialogMessage {
        public String titile;
        public String message;
        
        public DialogMessage(String title, String message) {
            this.titile = title;
            this.message = message;
        }
    }
    SensorEventListener sensorListener = new SensorEventListener() {
		
		@Override
		public void onSensorChanged(SensorEvent arg0) {
			// TODO Auto-generated method stub
			 int sensorType = arg0.sensor.getType();    
	         //values[0]:X轴，values[1]：Y轴，values[2]：Z轴    
	         float[] values = arg0.values;    
	           
	         float x = values[0];  
	         float y = values[1];  
	         float z = values[2];  
	         if(sensorType == Sensor.TYPE_ACCELEROMETER){  
	             int value = 15;//摇一摇阀值,不同手机能达到的最大值不同,如某品牌手机只能达到20  
	             if(x >= value || x <= -value || y >= value || y <= -value || z >= value || z <= -value){  
	                  //播放动画，更新界面，并进行对应的业务操作         
	            	 Log.i(TAG, "shouJiYaoYao23");
	            	 if((Cocos2dxActivity.IS_YAOYAO != null) && Cocos2dxActivity.IS_YAOYAO.equals("YES")){
	            		 Cocos2dxJavascriptJavaBridge.evalString("brc.yaoYiYao()");
	            	 }
	            	 if((Cocos2dxActivity.IS_BurstAwardYAOYAO!=null)&&Cocos2dxActivity.IS_BurstAwardYAOYAO.equals("YES")){
	            		 Cocos2dxJavascriptJavaBridge.evalString("brc.burstAwardYaoYiYao()");
	            	 }
	            	 Log.i(TAG, "555555555555555555shouJiYaoYao");
	             }  
	         }
		}
		
		@Override
		public void onAccuracyChanged(Sensor sensor, int accuracy) {
			// TODO Auto-generated method stub
			
		}
	};
    public static class EditBoxMessage {
        public String title;
        public String content;
        public int inputMode;
        public int inputFlag;
        public int returnType;
        public int maxLength;
        
        public EditBoxMessage(String title, String content, int inputMode, int inputFlag, int returnType, int maxLength){
            this.content = content;
            this.title = title;
            this.inputMode = inputMode;
            this.inputFlag = inputFlag;
            this.returnType = returnType;
            this.maxLength = maxLength;
        }
    }
}
