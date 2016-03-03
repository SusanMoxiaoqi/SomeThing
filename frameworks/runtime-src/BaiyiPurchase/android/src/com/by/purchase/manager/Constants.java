package com.by.purchase.manager;

public class Constants {

    /*****************************************************************
     * 微信 key
     *****************************************************************/
	public static final String WX_APP_ID = "wx568c4214ee9f26f4";
    
    /*****************************************************************
     * 微信 商户号
     *****************************************************************/
	public static final String WX_PARTNER_ID = "1245507402";

    /*****************************************************************
     * 支付宝 商户号
     *****************************************************************/
	//public static final String ALIPAY_PARTNER = "2088211578476032";
	public static final String ALIPAY_PARTNER = "2088701975689143";
    
    /*****************************************************************
     * 支付宝 商户收款账号
     *****************************************************************/
	//public static final String ALIPAY_SELLER = "game78988@126.com";
	public static final String ALIPAY_SELLER = "decoy1986@126.com";
    
    /*****************************************************************
     * 支付宝 商户私钥，pkcs8格式
     *****************************************************************/
//	public static final String ALIPAY_RSA_PRIVATE = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAPDo4uWwz6AdCYx6M6JRBL8+IhZlZEIdr6g2tGj88G6OFav0KXYigfkCVg6YaDilt9nEGzw36EXyUXffuRVSfJvuf3vs9HJvSCE4EAFlABIrCF6M0TAbu4048FB/eO2hshPdb9PukoXJj4vyr0F1Yitv+S4D3eX2b37AXjqccnn7AgMBAAECgYA2gbq0lWikpW0/p3Z/Ry13x6sWviINA4J24Mm452HO4b7thPTMkcoueOTXsIwEJRqP3tr6qPuYt9bO9IN/24XtoYub9udDcd1pLUEGg+kzoYcfQLZ+oQQWFnUmEl2sn6gFu4nEdSjTBlGSawu/k3kpqHErdaPxV+h1Fazuh+gs4QJBAPmOO9J+Dm1/JSwEwJ8UXO4s3k+18GupTAH1lbOXd8jDQ5U0JjJMnxxuJX9WsUUo5LsYzyVF/iQ3kZoK9djsfr0CQQD3IX8Kl6LmWqVDdb7J7lcQVhD8/W1GXWfppaPySBlJNf0thB8CjXFKpIeWh0VF9uQzjM+7UJXrmdWQXUdN8GMXAkAFKN6txHNx6h4Poe2FnHsrZXwXM9DLuQ1cQQKeWvRcD0V3cUOU6KalhNV7o4Q4xNat0558y8ysXQXCpJVerc0VAkEA1EEQvChA4Vg5WRdoJkduv7ksHh4MHMNc3HBHv2/tR9P2/4DaoXaaN2HYkpDcDptepGfsgxVTrmcR5kw3UdmFQQJBAIc+Hel6KjqQswYIIgE6K+LPNYT1jLuMiLVwLy5hjD63GjqUm6vN5Z+B1fWsJlhiRUs+/2powGg17pXsP01W+v8=";
	public static final String ALIPAY_RSA_PRIVATE = "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAK/KNdCraoi4BceZFMf9q41UGyM8/HZCDy6qrxX12U8T4Qwz7JZkXtnNN4chnjyyM8TjL0I99Wm5A+LGbwFsyYAQsX2RlGLlOhA9M2jzGZHk4OX2BA1GmSWpcLjcT9Jxtx7C/hulcraoIPRNsyULS+n//gZIGh5guN9LPn9A4iV9AgMBAAECgYA+1pbEH/J2KuoN/n+6OciQPadxwkQw9c49jVAHFpn2tZF17j29SOXLD5uw12icI8tzrw5erI1EnJlyACMALGYepKotRHFc/G88ZUZ1PLQ5pWvyYg9dW3QunxgL5dh1HQrpNbaNG/EjCu1nEqTbnUuzbgIjl4OWq6mTBp+g9bVDlQJBANd5MsTgnBNJQ08jOQnXmWXJEI9ZIDXrZhyw0xqgxYk+oox9RgJS1M/TRSu6e5vbEXBgSENBxUS3Ahpe07rq6BcCQQDQ2ktGDo7iVF0Gr0PXXT33giOZPkH/A4z2jctxtkYkJVLd+1AFQFkhJxO4bDqbNpJ/JGKXgH/YSVg44F+53oeLAkAPO4EsS9icwGwitxG8MWKlwG4MRDezuB1y38k8s6rjRetF1UFSvrpOqtfT/I3qebUk5ZmWL5sbfXiHlraPGzYnAkBgOnQ8TzDeb2h9T/u+GyQWCkxEqz7VNNmaMDLwrb8boGbSCJ0SDlgCwnJ/or5ODZLqKeWTUI2XJhQUAK2agkGJAkAbSanfjNliSUf6yA/kzRw7IAQUqhnA/YMKBCOQIdJRbWge1q/Vo9qe43eAAVwgeztsYI3u/uBaK9Z2hgEtgIeA";
	
    /*****************************************************************
     * 支付宝公钥
     *****************************************************************/
	//public static final String ALIPAY_RSA_PUBLIC = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB";
	public static final String ALIPAY_RSA_PUBLIC = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB";

    /*****************************************************************
     * mMode参数解释： "00" - 启动银联正式环境 "01" - 连接银联测试环境
     *****************************************************************/
    public static final String UNIONPAY_MODE = "00";
    
    public class VIEWTYPE {
		public static final int Unknown 	= 0;
		public static final int Alipay 		= 1;
		public static final int Wechat 		= 2;
		public static final int Unionpay 	= 3;
		public static final int Mo9 		= 4;
		public static final int MobileCard	= 5;
		public static final int GameCard	= 6;
		public static final int Yibao 		= 7;
		public static final int YiDong 		= 8;
		public static final int Liantong	= 9;
		public static final int Dianxin		= 10;
	}

    public static final int[] VIEWTYPE_DEFAULT = {VIEWTYPE.Alipay, VIEWTYPE.Wechat, VIEWTYPE.Unionpay, VIEWTYPE.Mo9, VIEWTYPE.MobileCard, VIEWTYPE.GameCard, VIEWTYPE.Unknown, VIEWTYPE.Unknown, VIEWTYPE.Unknown};

	public class PurchaseType {
		public static final int Unknown 	= 0;
		public static final int Alipay 		= 6;//（原来的参数是1，水浒传改为6）
		public static final int Card 		= 2;
		public static final int Mo9 		= 3;
		public static final int Unionpay 	= 4;
		public static final int Wechat 		= 5;
		public static final int Yibao 		= 7;//(没有用到该充值方式)
	}

	public class CardChannel {
		public static final int UNKNOWN 	= 0;
		public static final int JUNWANG 	= 1;
		public static final int SHENGDA 	= 2;
		public static final int YIDONG 		= 3;
		public static final int ZHENGTU 	= 4;
		public static final int QQCARD 		= 5;
		public static final int LIANTONG 	= 6;
		public static final int JIUYOU 		= 7;
		public static final int YPCARD 		= 8;
		public static final int NETEASE 	= 9;
		public static final int WANMEI 		= 10;
		public static final int SOUHU 		= 11;
		public static final int DIANXIN 	= 12;
		public static final int ZONGYOU 	= 13;
		public static final int TIANXIA 	= 14;
		public static final int TIANHONG 	= 15;
		public static final int BESTPAY 	= 16;
	}

	public class PayStatus {
		public static final int Failed 				= -1;
		public static final int Success 			= 0;
		public static final int WechatNotInstall 	= 1;
		public static final int UserCanceled 		= 2;

		public static final int Unknown 			= 0xffff;
	}
    
    public static final String  LOCALSTR_GET_ORDER_FAILED  			= "获取订单失败，请稍后重试。";
    public static final String  LOCALSTR_PAYMENT_FAILED    			= "支付出错。";
    public static final String  LOCALSTR_PAYMENT_SUCCESS   			= "支付成功。若游戏币未及时到账，请稍候重新登入银行查看。";
    public static final String  LOCALSTR_PAYMENT_USERCANCEL 		= "用户取消支付。";
    public static final String  LOCALSTR_PAYMENT_UNKNOWN    		= "支付操作已结束。若您支付成功而游戏币未及时到账，请稍候重新登入银行查看。";
    public static final String  LOCALSTR_PAYMENT_WECHAT_NOT_INSTALL = "请先安装微信。";
    public static final String  LOCALSTR_PAYMENT_CARD_NOT_ALLOW 	= "卡号或卡密长度不正确。";
}
