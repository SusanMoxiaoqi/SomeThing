package org.cocos2dx.javascript;

import java.io.File;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DatabaseHelper extends SQLiteOpenHelper {  
	   
    private static final String DB_NAME = SDBHelper.DB_DIR + File.separator + "shz.db";; //数据库名称  
    private static final int version = 1; //数据库版本  
    public DatabaseHelper(Context context) {  
        super(context, DB_NAME, null, version);  
        // TODO Auto-generated constructor stub  
    }  
   
    @Override  
    public void onCreate(SQLiteDatabase db) {  
        String sql = "create table shuihuzhuan(key varchar(20) not null , value varchar(60) not null );";            
        db.execSQL(sql);  
    }  
   
    @Override  
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {  
   
    }  
}  