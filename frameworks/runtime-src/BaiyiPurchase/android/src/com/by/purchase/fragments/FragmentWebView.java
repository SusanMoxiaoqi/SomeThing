package com.by.purchase.fragments;

import android.annotation.SuppressLint;
import android.app.Fragment;
import android.os.Bundle;
import android.os.Handler;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

import com.by.purchase.R;
import com.by.purchase.manager.BYPMgr;
import com.by.purchase.manager.Constants;
import com.by.purchase.paytypes.Mo9Mgr;

@SuppressLint("SetJavaScriptEnabled")
public class FragmentWebView extends Fragment {
	private static WebView _webView;
	private String _url;
	 private static Handler mHandler = new Handler();
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		View view = inflater.inflate(R.layout.by_pay_mo9, container, false); 
		
		Button tile_left_btn = (Button) BYPMgr.getPayView().findViewById(
				R.id.id_title_left_btn);
		tile_left_btn.setVisibility(View.VISIBLE);
		
		_webView = (WebView)view.findViewById(R.id.clientWebView);
		return view;
	}
	
	public void loadURL(String url) {
		_url = url;
	}
	
	@Override
	public void onDestroyView() {
		super.onDestroyView();
		BYPMgr.PURCHASE_TYPE = Constants.PurchaseType.Unknown;
	}
	
	@Override
    public void onStart() {
        super.onStart();

     // This makes sure that the container activity has implemented
        // the callback interface. If not, it throws an exception
        try {
        	_webView.loadUrl(_url);       
    		_webView.getSettings().setJavaScriptEnabled(true);
            _webView.getSettings().setBuiltInZoomControls(true); 
            _webView.getSettings().setBuiltInZoomControls(true);
            _webView.getSettings().setUseWideViewPort(true); 
            
            _webView.addJavascriptInterface(new Object() {       
                @SuppressWarnings("unused")
    			public void clickOnAndroid() {       
                    mHandler.post(new Runnable() {       
                        public void run() {       
                            _webView.loadUrl("javascript:wave()");       
                        }       
                    });       
                }       
            }, "demo");   
            
            _webView.setWebChromeClient(new WebChromeClient() {
    			@Override
    			public void onProgressChanged(WebView view, int newProgress) {
    				// TODO Auto-generated method stub
    				System.out.println(newProgress);
    				super.onProgressChanged(view, newProgress);
    			}
    		});
            
            _webView.setWebViewClient(new WebViewClient(){
            	@Override
            	public boolean shouldOverrideUrlLoading(WebView view, String url) {
            		// TODO Auto-generated method stub
            		view.loadUrl(url);
            		return true;
            	}
            });
        }
        catch (Exception e) {
        	e.printStackTrace();
        	Mo9Mgr.getInstance().payEnd(Constants.PayStatus.Failed, "");
        }
    }
}


