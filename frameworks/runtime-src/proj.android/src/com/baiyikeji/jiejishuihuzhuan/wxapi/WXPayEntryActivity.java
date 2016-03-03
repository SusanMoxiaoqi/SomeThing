
package com.baiyikeji.jiejishuihuzhuan.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.baiyikeji.jiejishuihuzhuan.R;
import com.tencent.mm.sdk.constants.ConstantsAPI;
import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;

public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler{
	
	private static final String TAG = "MicroMsg.SDKSample.WXPayEntryActivity";
	
    private IWXAPI api;

	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pay_result);
        api=WXUtil.getWxApi();
		api.handleIntent(getIntent(), this);
    }

	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		setIntent(intent);
        api.handleIntent(intent, this);
	}

	@Override
	public void onReq(BaseReq req) {
	}

	@Override
	public void onResp(BaseResp resp) {
		Log.d(TAG, "onPayFinish, errCode = " + resp.errCode);
		Log.d(TAG, "onPayFinish, errStr = " + resp.errStr);
		int resourceType = resp.errCode;
		String msg = "";
		switch (resourceType) {
		case -2:
			msg="取消支付";
			break;
		case 0:
			msg = "支付成功";
			break;
		default:
			break;
		}

		if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
			Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
           
            finish();
//			AlertDialog.Builder builder = new AlertDialog.Builder(this);
//	        builder.setTitle("支付结果通知");
//	        builder.setMessage(msg);
//	        builder.setInverseBackgroundForced(true);
//	        builder.setNegativeButton("确定", new DialogInterface.OnClickListener() {
//	            @Override
//	            public void onClick(DialogInterface dialog, int which) {
//	                dialog.dismiss();
//	                finish();
//	            }
//	        });
//	        builder.create().show();
		}
		
	}
}