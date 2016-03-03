package org.cocos2dx.javascript;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;

import com.by.shz.util.Download;
import com.by.shz.util.FileDownLoadUtil;

public class DownloadService extends Service {
	private Download downloadInfo = null;
	private FileDownLoadUtil downloadUtil = null;
	private int progress = 0;
	private MyBinder mybinder = new MyBinder();
	private int err = -1;
	
	public class MyBinder extends Binder {
		public int getProgressInfo() {// 获取下载信息
			return getProgress();
		}
		public int getErrInfo(){//获取下载错误信息
			return getErr();
		}

	}

	@Override
	public void onCreate() {
		downloadUtil = new FileDownLoadUtil(DownloadService.this);
		super.onCreate();
	}

	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		System.out.println("解除绑定，startService，onStartCommand()方法  设置isShowNotification参数");
		downloadUtil.setIsShowNotification("true");
		return super.onStartCommand(intent, flags, startId);
	}

	@Override
	public IBinder onBind(Intent intent) {
		final Download download = (Download) intent.getParcelableExtra("download");
		System.out.println("绑定service下载~~~~~~~~~~~~~~~~~~~~~`");
		new Thread() {
			@Override
			public void run() {
				downloadInfo = downloadUtil.downLoad(download);
				setErr(downloadInfo.getResultCode());
			};
		}.start();
		return mybinder;
	}

	@Override
	public boolean onUnbind(Intent intent) {
		downloadUtil.setIsShowNotification("true");
		System.out.println("onUnbind~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		return super.onUnbind(intent);
	}
	

	@Override
	public void onDestroy() {
		super.onDestroy();
		System.out.println("service=============onDestroy()=================");
	}

	public Handler handler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			setProgress(msg.arg1);
			//setErr(downloadInfo.getResultCode());
		};
	};

	public int getProgress() {
		return progress;
	}

	public void setProgress(int progress) {
		this.progress = progress;
	}

	public int getErr() {
		return err;
	}

	public void setErr(int err) {
		this.err = err;
	}

	
}
