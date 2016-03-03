package com.by.purchase.fragments;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.by.purchase.R;
import com.by.purchase.fragments.gamecard.FragmentCardTianhong;
import com.by.purchase.fragments.mobilecard.FragmentCardLiantong;
import com.by.purchase.manager.BYPMgr;
import com.by.purchase.manager.Constants;
import com.by.purchase.paytypes.AlipayMgr;
import com.by.purchase.paytypes.UnionpayMgr;
import com.by.purchase.paytypes.WechatMgr;
import com.by.purchase.paytypes.Mo9Mgr;
import com.by.purchase.paytypes.YibaoMgr;

/**
 * 
 * @author baiyi
 * 
 *         第一个选择支付的界面
 * 
 */

public class FragmentList extends Fragment implements OnClickListener {
	
	private TextView _productInfo_name_tv;
	private TextView _productInfo_price_tv;
	
	private Button _btn_recommend;
	
	private Button[] _btns;
//	private Button _btn_2;
//	private Button _btn_3;
//	private Button _btn_4;
//	private Button _btn_5;
//	private Button _btn_6;
//	private Button _btn_7;
//	private Button _btn_8;
//	private Button _btn_9;
	
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {

		View view = inflater.inflate(R.layout.by_pay_content, container, false);

		Button tile_left_btn = (Button) BYPMgr.getPayView().findViewById(
				R.id.id_title_left_btn);
		tile_left_btn.setVisibility(View.INVISIBLE);

		_productInfo_name_tv = (TextView) view
				.findViewById(R.id.productInfo_name_text);
		_productInfo_price_tv = (TextView) view
				.findViewById(R.id.productInfo_price_test);

		_productInfo_name_tv.setText(BYPMgr.PURCHASE_PRODUCT_NAME);
		_productInfo_price_tv.setText(String.format("%d 元",
				BYPMgr.PURCHASE_PRODUCT_PRICE));
		
		_btn_recommend = (Button) view.findViewById(R.id.button_alipay_recommend);
		_btn_recommend.setOnClickListener(this);
		
		//按钮列表
		_btns = new Button[9];
		_btns[0] = (Button) view.findViewById(R.id.button_alipay);
		_btns[1] = (Button) view.findViewById(R.id.button_wechat);
		_btns[2] = (Button) view.findViewById(R.id.button_unionpay);
		_btns[3] = (Button) view.findViewById(R.id.button_mo9);
		_btns[4] = (Button) view.findViewById(R.id.button_mobilecard);
		_btns[5] = (Button) view.findViewById(R.id.button_gamecard);
		_btns[6] = (Button) view.findViewById(R.id.button_yidong);
		_btns[7] = (Button) view.findViewById(R.id.button_liantong);
		_btns[8] = (Button) view.findViewById(R.id.button_dianxin);
		
		for (int i = 0; i < _btns.length; i++) {
			int type = BYPMgr.PURCHASE_VIEW_TYPE[i];
			Button btn = _btns[i];
			btn.setOnClickListener(this);
			
			switch (type) {
			case Constants.VIEWTYPE.Unknown:
			{
				btn.setVisibility(View.INVISIBLE);
			}
			break;
			case Constants.VIEWTYPE.Alipay:
			{
				btn.setBackgroundResource(R.drawable.zhifubaobtnstyle);
			}
			break;
			case Constants.VIEWTYPE.Wechat:
			{
				btn.setBackgroundResource(R.drawable.weixinzhifu_btn_style);
			}
			break;
			case Constants.VIEWTYPE.Unionpay:
			{
				btn.setBackgroundResource(R.drawable.yinlian_btn_style);
			}
			break;
			case Constants.VIEWTYPE.Mo9:
			{
				btn.setBackgroundResource(R.drawable.mo9_btn_style);
			}
			break;
			case Constants.VIEWTYPE.MobileCard:
			{
				btn.setBackgroundResource(R.drawable.shoujichongzhi_btn_style);
			}
			break;
			case Constants.VIEWTYPE.GameCard:
			{
				btn.setBackgroundResource(R.drawable.youxichongzhi_btn_style);
			}
			break;
			case Constants.VIEWTYPE.Yibao:
			{
				btn.setBackgroundResource(R.drawable.yibaobtnstyle);
			}
			break;
			case Constants.VIEWTYPE.YiDong:
			{
				btn.setBackgroundResource(R.drawable.yidong_btn_style);
			}
			break;
			case Constants.VIEWTYPE.Liantong:
			{
				btn.setBackgroundResource(R.drawable.liantong_btn_style);
			}
			break;
			case Constants.VIEWTYPE.Dianxin:
			{
				btn.setBackgroundResource(R.drawable.dianxin_btn_style);
			}
			break;
			}
		}
		
		return view;
	}
	
	@Override
	public void onClick(View v) {

		FragmentManager fm = getFragmentManager();
		FragmentTransaction tx = fm.beginTransaction();
		int id = v.getId();
		
		if (id == _btn_recommend.getId()) {
			AlipayMgr.getInstance().purchase();
			return;
		}
		
		for (int i = 0; i < _btns.length; i++) {
			if (_btns[i].getId() == id) {
				int type = BYPMgr.PURCHASE_VIEW_TYPE[i];
				
				switch (type) {
				case Constants.VIEWTYPE.Unknown:
				{
					
				}
				break;
				case Constants.VIEWTYPE.Alipay:
				{
					AlipayMgr.getInstance().purchase();
				}
				break;
				case Constants.VIEWTYPE.Wechat:
				{
					WechatMgr.getInstance().purchase();
				}
				break;
				case Constants.VIEWTYPE.Unionpay:
				{
					UnionpayMgr.getInstance().purchase();
				}
				break;
				case Constants.VIEWTYPE.Mo9:
				{
					Mo9Mgr.getInstance().purchase();
				}
				break;
				case Constants.VIEWTYPE.MobileCard:
				{
					FragmentCardLiantong fThree = new FragmentCardLiantong();
					tx.replace(R.id.id_content, fThree, "THREE");
					tx.addToBackStack(null);
					tx.commit();
				}
				break;
				case Constants.VIEWTYPE.GameCard:
				{
					FragmentCardTianhong fTwo = new FragmentCardTianhong();
					tx.replace(R.id.id_content, fTwo, "TWO");
					tx.addToBackStack(null);
					tx.commit();
				}
				break;
				case Constants.VIEWTYPE.Yibao:
				{
					YibaoMgr.getInstance().purchase();
				}
				break;
				case Constants.VIEWTYPE.YiDong:
				{
					
				}
				break;
				case Constants.VIEWTYPE.Liantong:
				{
					
				}
				break;
				case Constants.VIEWTYPE.Dianxin:
				{
					
				}
				break;
				}
				
				break;
			}
		}
	}
	
}
