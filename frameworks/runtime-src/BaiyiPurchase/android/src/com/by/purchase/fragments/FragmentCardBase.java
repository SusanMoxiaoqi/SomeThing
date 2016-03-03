package com.by.purchase.fragments;

import java.util.ArrayList;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.ToggleButton;

import com.by.purchase.R;
import com.by.purchase.fragments.gamecard.FragmentCardJiuyou;
import com.by.purchase.fragments.gamecard.FragmentCardJunwang;
import com.by.purchase.fragments.gamecard.FragmentCardShengda;
import com.by.purchase.fragments.gamecard.FragmentCardSouhu;
import com.by.purchase.fragments.gamecard.FragmentCardTianhong;
import com.by.purchase.fragments.gamecard.FragmentCardTianxia;
import com.by.purchase.fragments.gamecard.FragmentCardWanmei;
import com.by.purchase.fragments.gamecard.FragmentCardZhengtu;
import com.by.purchase.fragments.gamecard.FragmentCardZongyou;
import com.by.purchase.fragments.mobilecard.FragmentCardDianxin;
import com.by.purchase.fragments.mobilecard.FragmentCardLiantong;
import com.by.purchase.fragments.mobilecard.FragmentCardYidong;
import com.by.purchase.manager.BYPMgr;
import com.by.purchase.paytypes.CardMgr;
import com.by.purchase.utils.ParseIntFromStr;

public class FragmentCardBase extends Fragment implements OnClickListener {

	public View _currentView;
	private ScrollView _scrollView;
	public Button _payButton;
	public EditText _editFieldCardNum;
	public EditText _editFieldCardPwd;
	public TextView _textViewCardPrice;
	public ArrayList<ToggleButton> _listSwitchBtns;
	public ArrayList<ToggleButton> _listPriceBtns;
	public int _fragmentBtnId;

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {

		_currentView = getCurrentView(inflater, container, savedInstanceState);

		assert _currentView != null;

		Button tile_left_btn = (Button) BYPMgr.getPayView().findViewById(
				R.id.id_title_left_btn);
		tile_left_btn.setVisibility(View.VISIBLE);

		_scrollView = (ScrollView) _currentView.findViewById(R.id.scrollView1);
		_scrollView.setSmoothScrollingEnabled(true);

		_payButton = (Button) _currentView.findViewById(R.id.button_pay);
		_payButton.setOnClickListener(this);
		_editFieldCardNum = (EditText) _currentView
				.findViewById(R.id.editText1);
		_editFieldCardPwd = (EditText) _currentView
				.findViewById(R.id.editText2);
		_textViewCardPrice = (TextView) _currentView
				.findViewById(R.id.text_card_price);

		prepareSwitchBtns();
		preparePriceBtns();

		return _currentView;
	}

	public View getCurrentView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		return null;
	}

	private void prepareSwitchBtnById(final int btnId) {
		ToggleButton btn = (ToggleButton) _currentView.findViewById(btnId);
		if (btn != null) {
			btn.setOnClickListener(this);
			_listSwitchBtns.add(btn);
		}
	}

	public void prepareSwitchBtns() {
		if (_listSwitchBtns == null) {
			_listSwitchBtns = new ArrayList<ToggleButton>();
		}

		// junwang
		prepareSwitchBtnById(R.id.card_junwang);

		// shengda
		prepareSwitchBtnById(R.id.card_shengda);

		// zhengtu
		prepareSwitchBtnById(R.id.card_zhengtu);

		// jiuyou
		prepareSwitchBtnById(R.id.card_jiuyou);

		// wanmei
		prepareSwitchBtnById(R.id.card_wanmei);

		// souhu
		prepareSwitchBtnById(R.id.card_souhu);

		// zongyou
		prepareSwitchBtnById(R.id.card_zongyou);

		// tianxiatong
		prepareSwitchBtnById(R.id.card_tianxia);

		// tianhong
		prepareSwitchBtnById(R.id.card_tianhong);

		// liantong
		prepareSwitchBtnById(R.id.card_liantong);

		// yidong
		prepareSwitchBtnById(R.id.card_yidong);

		// dianxin
		prepareSwitchBtnById(R.id.card_dianxin);

		if (_listSwitchBtns.size() > 0) {
			resetSwitchBtns(_fragmentBtnId);
		}
	}

	private void preparePriceBtnById(final int btnId) {
		ToggleButton btn = (ToggleButton) _currentView.findViewById(btnId);
		if (btn != null) {
			btn.setOnClickListener(this);
			_listPriceBtns.add(btn);
		}
	}

	public void preparePriceBtns() {
		if (_listPriceBtns == null) {
			_listPriceBtns = new ArrayList<ToggleButton>();
		}

		// price_1
		preparePriceBtnById(R.id.price_1);
		// price_5
		preparePriceBtnById(R.id.price_5);
		// price_10
		preparePriceBtnById(R.id.price_10);
		// price_15
		preparePriceBtnById(R.id.price_15);
		// price_20
		preparePriceBtnById(R.id.price_20);
		// price_25
		preparePriceBtnById(R.id.price_25);
		// price_30
		preparePriceBtnById(R.id.price_30);
		// price_35
		preparePriceBtnById(R.id.price_35);
		// price_40
		preparePriceBtnById(R.id.price_40);
		// price_45
		preparePriceBtnById(R.id.price_45);
		// price_50
		preparePriceBtnById(R.id.price_50);
		// price_100
		preparePriceBtnById(R.id.price_100);
		// price_200
		preparePriceBtnById(R.id.price_200);
		// price_300
		preparePriceBtnById(R.id.price_300);
		// price_350
		preparePriceBtnById(R.id.price_350);
		// price_500
		preparePriceBtnById(R.id.price_500);
		// price_1000
		preparePriceBtnById(R.id.price_1000);

		if (_listPriceBtns.size() > 0) {
			resetPriceBtns(_listPriceBtns.get(0).getId());
		}
	}

	private void resetSwitchBtns(final int btnId) {
		ToggleButton selectedBtn = null;
		for (int i = 0; i < _listSwitchBtns.size(); i++) {
			ToggleButton btn = _listSwitchBtns.get(i);
			if (btn.getId() == btnId) {
				selectedBtn = btn;
				btn.setChecked(true);
			} else {
				btn.setChecked(false);
			}
		}

		if (selectedBtn != null) {
			scrollTo(selectedBtn);
		}
	}

	private void scrollTo(final ToggleButton selectedBtn) {
		_scrollView.post(new Runnable() {
			public void run() {
				_scrollView.requestChildFocus(selectedBtn, selectedBtn);
			}
		});
	}

	private void resetPriceBtns(final int btnId) {
		ToggleButton selectedBtn = null;
		for (int i = 0; i < _listPriceBtns.size(); i++) {
			ToggleButton btn = _listPriceBtns.get(i);
			if (btn.getId() == btnId) {
				selectedBtn = btn;
				btn.setChecked(true);
			} else {
				btn.setChecked(false);
			}
		}

		if (selectedBtn != null) {
			String value = String.format("%s", selectedBtn.getText());
			_textViewCardPrice.setText(value);
		}
	}

	public void payNow() {
		int channel = BYPMgr.PURCHASE_CARD_CHANNEL;
		String tprice = String.format("%s", _textViewCardPrice.getText());
		int price = ParseIntFromStr.parseIntFromStr(tprice);
		BYPMgr.PURCHASE_CARD_PRICE = price;
		BYPMgr.PURCHASE_CARD_NUM = _editFieldCardNum.getText().toString();
		BYPMgr.PURCHASE_CARD_PWD = _editFieldCardPwd.getText().toString();
		CardMgr.getInstance().purchase();
	}

	@Override
	public void onClick(View arg0) {

		int btnId = arg0.getId();

		if (R.id.button_pay == btnId) {
			payNow();
		} else if (checkSwitchBtnClick(btnId)) {
			Log.i(this.getClass().getName(), "Switch to " + btnId);
		} else {
			Log.i(this.getClass().getName(), "Change price " + btnId);
			resetPriceBtns(btnId);
		}
	}

	public boolean checkSwitchBtnClick(int btnId) {
		boolean retValue = false;

		FragmentManager fm = getFragmentManager();
		FragmentTransaction tx = fm.beginTransaction();

		if (R.id.card_junwang == btnId) {
			resetSwitchBtns(btnId);
			FragmentCardJunwang fJunWang = new FragmentCardJunwang();
			tx.replace(R.id.id_content, fJunWang, "PAY_JunWang");
			tx.addToBackStack(null);
			tx.commit();
			retValue = true;
		} else if (R.id.card_tianhong == btnId) {
			resetSwitchBtns(btnId);
			FragmentCardTianhong fTianHong = new FragmentCardTianhong();
			tx.replace(R.id.id_content, fTianHong, "PAY_TianHong");
			tx.addToBackStack(null);
			tx.commit();
			retValue = true;
		} else if (R.id.card_zhengtu == btnId) {
			resetSwitchBtns(btnId);
			FragmentCardZhengtu fZhengTu = new FragmentCardZhengtu();
			tx.replace(R.id.id_content, fZhengTu, "PAY_ZhengTu");
			tx.addToBackStack(null);
			tx.commit();
			retValue = true;
		} else if (R.id.card_souhu == btnId) {
			resetSwitchBtns(btnId);
			FragmentCardSouhu fSouHu = new FragmentCardSouhu();
			tx.replace(R.id.id_content, fSouHu, "PAY_SouHu");
			tx.addToBackStack(null);
			tx.commit();
			retValue = true;
		} else if (R.id.card_shengda == btnId) {
			resetSwitchBtns(btnId);
			FragmentCardShengda fShengDa = new FragmentCardShengda();
			tx.replace(R.id.id_content, fShengDa, "PAY_ShengDa");
			tx.addToBackStack(null);
			tx.commit();
			retValue = true;
		} else if (R.id.card_zongyou == btnId) {
			resetSwitchBtns(btnId);
			FragmentCardZongyou fZongYou = new FragmentCardZongyou();
			tx.replace(R.id.id_content, fZongYou, "PAY_ZongYou");
			tx.addToBackStack(null);
			tx.commit();
			retValue = true;
		} else if (R.id.card_jiuyou == btnId) {
			resetSwitchBtns(btnId);
			FragmentCardJiuyou fJiuYou = new FragmentCardJiuyou();
			tx.replace(R.id.id_content, fJiuYou, "PAY_JiuYou");
			tx.addToBackStack(null);
			tx.commit();
			retValue = true;
		} else if (R.id.card_tianxia == btnId) {
			resetSwitchBtns(btnId);
			FragmentCardTianxia fTianXia = new FragmentCardTianxia();
			tx.replace(R.id.id_content, fTianXia, "PAY_TianXia");
			tx.addToBackStack(null);
			tx.commit();
			retValue = true;
		} else if (R.id.card_wanmei == btnId) {
			resetSwitchBtns(btnId);
			FragmentCardWanmei fWanMei = new FragmentCardWanmei();
			tx.replace(R.id.id_content, fWanMei, "PAY_WanMei");
			tx.addToBackStack(null);
			tx.commit();
			retValue = true;
		} else if (R.id.card_liantong == btnId) {
			resetSwitchBtns(btnId);
			FragmentCardLiantong fliantong = new FragmentCardLiantong();
			tx.replace(R.id.id_content, fliantong, "PAY_LIANTONG");
			tx.addToBackStack(null);
			tx.commit();
			retValue = true;
		} else if (R.id.card_yidong == btnId) {
			resetSwitchBtns(btnId);
			FragmentCardYidong fYiDong = new FragmentCardYidong();
			tx.replace(R.id.id_content, fYiDong, "PAY_YiDong");
			tx.addToBackStack(null);
			tx.commit();
			retValue = true;
		} else if (R.id.card_dianxin == btnId) {
			resetSwitchBtns(btnId);
			FragmentCardDianxin fDianXin = new FragmentCardDianxin();
			tx.replace(R.id.id_content, fDianXin, "PAY_DianXin");
			tx.addToBackStack(null);
			tx.commit();
			retValue = true;
		}
		return retValue;
	}

}
