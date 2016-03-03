package com.by.shz.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.cocos2dx.javascript.DownloadService;
import org.cocos2dx.lib.Cocos2dxActivity;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Message;
import android.support.v4.app.NotificationCompat;

import com.baiyikeji.jiejishuihuzhuan.R;


public class FileDownLoadUtil {
	
	private Context context;
	private NotificationManager nm = null;
	final int SUCCESS = 0;
	final int FAIL = 1;
	final int EXIST = 2;//存在该文件
	public final static int ERROR = 3;//不存在该文件
	int tem = 0;
	private String isShowNotification ="false";
	
	public FileDownLoadUtil(Context context) {
		this.context = context;
		nm = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
	}


	// 利用字节流下载文件（通用）,并且写在SD卡里面
	public Download downLoad(Download d) {
		tem = 0;
		NotificationCompat.Builder builder = null;
		FileUtil fileutil = new FileUtil();
		InputStream in = null;
		HttpURLConnection urlConnection = null;
		OutputStream out = null;
		try {
			URL url = new URL(d.getUrlPath());
			urlConnection = (HttpURLConnection) url.openConnection();
			int contentLength = urlConnection.getContentLength();//下载对象的字节数
			in = urlConnection.getInputStream();
			if (in == null) {
				d.setResultCode(ERROR);
				return d;
			}
			File file = fileutil.createFile(d.getDirName(), d.getNewName());
			out = new FileOutputStream(file);
			byte[] buffer = new byte[1024];
			int length;
			int total = 0;
			while ((length = in.read(buffer)) > 0) {// 定义变量缓存读取的字节数
				out.write(buffer, 0, length);
				total = total + length;
				/*
				 * 进度最大值看成100单位 已下载/总大小，求出float比列，乘以100，转换成int
				 * 定义一个临时变量，当前进度增长1个单位的时候 发一次通知
				 */
				float rate = (float) total / (float) contentLength;
				int progress = Math.round((rate * 100));
				if (progress - tem == 1) {
					System.out.println("isShowNotification===>"+getIsShowNotification());
					if("true".equals(getIsShowNotification())){
						//启动service模式，直接通知栏显示通知
						builder  = new NotificationCompat.Builder(context);
						builder.setContentTitle("百易水浒传("+(total/(1024*1024))+"M/"+(contentLength/(1024*1024))+"M)");
						builder.setContentText(d.getNewName() + " 正在下载中....");
						builder.setLargeIcon(BitmapFactory.decodeResource(context.getResources(),R.drawable.icon));
						builder.setWhen(System.currentTimeMillis());
						builder.setOngoing(true);// 不被状态栏的清除按钮X清楚
						builder.setAutoCancel(true);// 下载完毕后，点击自动从状态栏清楚
						builder.setSmallIcon(android.R.drawable.ic_dialog_email);
						builder.setProgress(100, progress, false);
						nm.notify(Integer.parseInt(d.getId()), builder.build());	
					}
					Message msg = new Message();
					msg.arg1 = progress;
					((DownloadService)context).handler.sendMessage(msg);
				}
				tem = progress;
			}
			if("true".equals(getIsShowNotification())){
				builder.setContentText("下载完毕!");
				builder.setOngoing(false);
				
				Intent intent2 = new Intent(Intent.ACTION_VIEW);
				String filepath = fileutil.rootPath+ File.separator + d.getDirName() + File.separator + d.getNewName();
				intent2.setDataAndType(Uri.fromFile(new File(filepath)),"application/vnd.android.package-archive");
				PendingIntent pi = PendingIntent.getActivity(context,Integer.parseInt(d.getId()), intent2, PendingIntent.FLAG_CANCEL_CURRENT);
				builder.setContentIntent(pi);
				nm.notify(Integer.parseInt(d.getId()), builder.build());
				
			}
			//下载完毕
			((DownloadService)context).onDestroy();
			Cocos2dxActivity.pd.dismiss();
			Intent installIntent = new Intent(Intent.ACTION_VIEW);
			String filepath = fileutil.rootPath+ File.separator + d.getDirName() + File.separator + d.getNewName();
			installIntent.setDataAndType(Uri.fromFile(new File(filepath)), "application/vnd.android.package-archive");
			installIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
			Cocos2dxActivity.getContext().startActivity(installIntent);
		} catch (Exception e) {
			d.setResultCode(ERROR);
			e.printStackTrace();
			if (in != null) {
				try {
					in.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
			if(out!=null){
				try {
					out.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
			urlConnection.disconnect();
		}finally{
			if (in != null) {
				try {
					in.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
			if(out!=null){
				try {
					out.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		}
		return d;
	}

	public static InputStream getInputStream(String urlPath) {
		InputStream in = null;
		HttpURLConnection urlConnection = null;
		try {
			URL url = new URL(urlPath);
			urlConnection = (HttpURLConnection) url.openConnection();
			System.out.println("源文件字节大小：" + urlConnection.getContentLength());
			in = urlConnection.getInputStream();
		} catch (Exception e) {
			e.printStackTrace();
			if (in != null) {
				try {
					in.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
			urlConnection.disconnect();
		}
		return in;
	}


	public String getIsShowNotification() {
		return isShowNotification;
	}

	public void setIsShowNotification(String isShowNotification) {
		System.out.println("isShowNotification参数："+isShowNotification);
		this.isShowNotification = isShowNotification;
	}
	
	

}
