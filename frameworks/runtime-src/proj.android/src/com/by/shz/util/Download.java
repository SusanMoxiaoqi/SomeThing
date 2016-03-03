package com.by.shz.util;


import android.os.Parcel;
import android.os.Parcelable;


public class Download implements Parcelable {


	private String id;
	private String urlPath;
	private String dirName;
	private String newName;
	private int resultCode;
	private int progress;
	
	public Download(Parcel source) {
		id = source.readString();
		urlPath = source.readString();
		dirName = source.readString();
		newName = source.readString();
		resultCode = source.readInt();
		progress = source.readInt();
	}

	public Download(String id, String urlPath, String dirName, String newName) {
		this.id = id;
		this.urlPath = urlPath;
		this.dirName = dirName;
		this.newName = newName;
	}
	
	@Override
	public int describeContents() {
		return 0;
	}

	@Override
	public void writeToParcel(Parcel dest, int flags) {
		dest.writeString(id);
		dest.writeString(urlPath);
		dest.writeString(dirName);
		dest.writeString(newName);
		dest.writeInt(resultCode);
		dest.writeInt(progress);
	}
	
	public static final Parcelable.Creator<Download> CREATOR = new Creator<Download>() {
		
		@Override
		public Download[] newArray(int size) {
			return new Download[size];
		}
		
		@Override
		public Download createFromParcel(Parcel source) {
			return new Download(source);
		}
	};

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUrlPath() {
		return urlPath;
	}

	public void setUrlPath(String urlPath) {
		this.urlPath = urlPath;
	}

	public String getDirName() {
		return dirName;
	}

	public void setDirName(String dirName) {
		this.dirName = dirName;
	}

	public String getNewName() {
		return newName;
	}

	public void setNewName(String newName) {
		this.newName = newName;
	}

	public int getResultCode() {
		return resultCode;
	}

	public void setResultCode(int resultCode) {
		this.resultCode = resultCode;
	}

	public int getProgress() {
		return progress;
	}

	public void setProgress(int progress) {
		this.progress = progress;
	}
	
	


}
