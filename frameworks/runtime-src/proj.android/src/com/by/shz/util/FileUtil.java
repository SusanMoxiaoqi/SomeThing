package com.by.shz.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import android.app.ProgressDialog;
import android.os.Environment;

public class FileUtil {

	String rootPath = "";// SD卡根路径
	String separator = "";// 分隔符 /

	public FileUtil() {
		if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
			this.rootPath = Environment.getExternalStorageDirectory().toString();
		} else {
			this.rootPath = Environment.getDownloadCacheDirectory().toString();
		}
		separator = File.separator;
	}

	public boolean isExists(String dirName, String newName) {
		File dirFile = new File(rootPath + separator + dirName);
		if (!dirFile.exists()) {
			dirFile.mkdir();
		}
		String filePath = rootPath + separator + dirName + separator + newName;
		File file = new File(filePath);
		return file.exists();
	}
	
	public File createFile(String dirName, String newName) {
		File dirFile = new File(rootPath + separator + dirName);
		if (!dirFile.exists()) {
			dirFile.mkdir();
		}
		String filePath = rootPath + separator + dirName + separator + newName;
		File file = new File(filePath);
		if(file.exists()){
			file.delete();
			System.out.println("Exists======File Delete=======");
		}
		return file;
	}

	public int writeToSDCard(InputStream in, String dirName, String newName,ProgressDialog pd) {
		int result = 0;
		String filePath = rootPath + separator + dirName + separator + newName;
		System.out.println("保存路径：" + filePath);
		/*
		 * 下载图片，需要通过Bitmap对象，且对图片进行压缩， try { OutputStream out = new
		 * FileOutputStream(filePath); Bitmap bm =
		 * BitmapFactory.decodeStream(in);
		 * bm.compress(Bitmap.CompressFormat.JPEG, 20, out); if (in != null)
		 * in.close(); if (out != null) out.close(); } catch (IOException e1) {
		 * e1.printStackTrace(); }
		 */
		OutputStream out = null;
		try {
			out = new FileOutputStream(filePath);
			byte[] b = new byte[1024];
			int length ;
			int total=0;
			while ((length = in.read(b))>0) {//定义变量缓存读取的字节数
				out.write(b, 0, length);
				total=total+length;
				pd.setProgress(total);
			}
			result = 0;
		} catch (Exception e) {
			e.printStackTrace();
			result = 1;
			try {
				if (in != null)
					in.close();
				if (out != null)
					out.close();
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		}finally{
			try {
				if (in != null)
					in.close();
				if (out != null)
					out.close();
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		}
		return result;
	}

}
