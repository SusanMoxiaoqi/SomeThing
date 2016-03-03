//
//  definetion.h
//  PurchaseSdkTest
//
//  Created by HanShaokun on 2/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#ifndef PurchaseSdkTest_definetion_h
#define PurchaseSdkTest_definetion_h

#define _INSTANCE_IMPL_(__class__) \
static __strong __class__* static##__class__ = nil; \
+ (instancetype)getInstance \
{ \
if (!static##__class__) { \
if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.f) { \
static##__class__ = [[[self class] alloc] initWithNibName:@"PurchaseViewCtrl-7" bundle:[NSBundle mainBundle]]; \
} \
else { \
static##__class__ = [[[self class] alloc] initWithNibName:@"PurchaseViewCtrl" bundle:[NSBundle mainBundle]]; \
} \
} \
return static##__class__; \
} \
+ (BOOL)freeInstance \
{ \
BOOL success = NO; \
if (static##__class__) { \
[static##__class__ release], static##__class__ = nil; \
success = true; \
} \
return success; \
}

#define SILENCE_DEPRECATION(expr)                                   \
do {                                                                \
_Pragma("clang diagnostic push")                                    \
_Pragma("clang diagnostic ignored \"-Wdeprecated-declarations\"")   \
expr;                                                               \
_Pragma("clang diagnostic pop")                                     \
} while(0)

#define SILENCE_UNUSED(expr)                                   \
do {                                                                \
_Pragma("clang diagnostic push")                                    \
_Pragma("clang diagnostic ignored \"-Wunused-variable\"")   \
expr;                                                               \
_Pragma("clang diagnostic pop")                                     \
} while(0)

#define SILENCE_UNDECLARED(expr)                                   \
do {                                                                \
_Pragma("clang diagnostic push")                                    \
_Pragma("clang diagnostic ignored \"-Wundeclared-selector\"")   \
expr;                                                               \
_Pragma("clang diagnostic pop")                                     \
} while(0)

#define BREAK_IF(cond)           if(cond) break

#define ActNone     @"ActNone"
#define ActAlipay   @"btn_alipay"
#define ActWeixin   @"btn_weixin"
#define ActUnion    @"btn_union"
#define ActMo9      @"btn_mo9"
#define ActMobile   @"btn_mobile"
#define ActGamecard @"btn_gamecard"
#define ActYibao    @"btn_yibao"

#define ACT_TYPES @[ActNone, ActAlipay, ActWeixin, ActUnion, ActMo9, ActMobile, ActGamecard, ActYibao]

typedef enum : int32_t {
    eActNone = 0,
    eActAlipay = 1,
    eActWeixin = 2,
    eActUnion = 3,
    eActMo9 = 4,
    eActMobile = 5,
    eActGamecard = 6,
    eActYibao = 7
} EActType;

typedef enum : int32_t {
    ePayTypeUnknown = 0,
    ePayTypeAlipay = 6,
    ePayTypeCard = 2,
    ePayTypeMo9 = 3,
    ePayTypeUnionpay = 4,
    ePayTypeWechat = 5,
    ePayTypeYibao = 7
} EPayType;

typedef enum : int32_t {
    eFailed = -1,
    eSuccess = 0,
    eWechatNotInstall = 1,
    eUserCanceled = 2,
    // for other situations
    
    eUnknown = 0xffff
} EPurchaseErrorCode;

//27 91 198
#define PURCHASECELL_COLOR_FONT [UIColor colorWithRed:27.f / 255.f \
green:91.f / 255.f \
blue:198.f / 255.f \
alpha:1.f]
#define PURCHASECELL_COLOR_FONT_SEL [UIColor whiteColor]

#define PurchaseTypeCellDequeueId @"PurchaseTypeCell"

#define PURCHASE_GET_LAST_TYPE()  \
eActAlipay
//(EActType)[[[NSUserDefaults standardUserDefaults] objectForKey:@"PURCHASE_LAST_TYPE"] integerValue]

#define PURCHASE_SET_LAST_TYPE(__type__) \
//[[NSUserDefaults standardUserDefaults] setObject:[NSNumber numberWithInteger:(NSInteger)__type__] forKey:@"PURCHASE_LAST_TYPE"];

#define kORDERURL_PREFIX    @"kORDERURL_PREFIX"
#define ORDERURL            @"%@/index.php/PaySdk/Getsafeorder/getpayorder.php"
#define ORDERDATA           @"userid=%@&paymoney=%@&channelid=%d&detailid=%ld"
#define OPENURL_CARD        @"%@/index.php/PaySdk/Yeepaycard/applypayorder.php"
#define STRDATA_CARD        @"userid=%@&orderid=%@&detailid=%ld&paymoney=%@&paycardno=%@&paycardpwd=%@"
#define STRDATA_CARD_DATA   @"orderid=%@&data=%@"

#define URL_CALLBACK_PREFIX_ALIPAY [[[NSBundle mainBundle] bundleIdentifier] stringByAppendingString:@"://safepay"]
#define URL_CALLBACK_PREFIX_WECHAT [@"wx568c4214ee9f26f4" stringByAppendingString:@"://pay"]

#define kUnionpay_Mode_Development          @"01"
#define kUnionpay_Mode_Deploy               @"00"

#define kPay_callback                       @"kPay_callback"

#define kPARAM_PAYTYPES     @"kPARAM_PAYTYPES"
#define kPARAM_USERID       @"kPARAM_USERID"
#define kPARAM_PRICE        @"kPARAM_PRICE"
#define kPARAM_ACCOUNT      @"kPARAM_ACCOUNT"
#define kPARAM_GAMEID       @"kPARAM_GAMEID"

//alipay & unionpay
#define kPARAM_ORDERID      @"kPARAM_ORDERID"
#define kPARAM_ORDER_PARAM  @"kPARAM_ORDER_PARAM"
#define kPARAM_NOTIURL      @"kPARAM_NOTIURL"
#define kPARAM_VIEWCTRL     @"kPARAM_VIEWCTRL"
#define kPARAM_PRODUCTNAME  @"kPARAM_PRODUCTNAME"
#define kPARAM_PRODUCTDES   @"kPARAM_PRODUCTDES"
#define kPARAM_UNIONPAYTN   @"kPARAM_UNIONPAYTN"

//wechat
#define kPARAM_PARENTID     @"kPARAM_PARENTID"
#define kPARAM_PREPAYID     @"kPARAM_PREPAYID"
#define kPARAM_NONCESTR     @"kPARAM_NONCESTR"
#define kPARAM_TIMESTAMP    @"kPARAM_TIMESTAMP"
#define kPARAM_PACKAGE      @"kPARAM_PACKAGE"
#define kPARAM_PARTNERID    @"kPARAM_PARTNERID" //partnerid
#define kPARAM_SIGN         @"kPARAM_SIGN"

//mo9
#define kPARAM_WEB_URL      @"kPARAM_WEB_URL"

//card
#define kPARAM_CARDNUM      @"kPARAM_CARDNUM"
#define kPARAM_CARDPASS     @"kPARAM_CARDPASS"
#define kPARAM_CHANNEL      @"kPARAM_CHANNEL"

#define DEFAULT_BTN_LAYOUT @[@(eActAlipay), @(eActWeixin), @(eActUnion), @(eActMo9), @(eActMobile), @(eActGamecard)]

#define DEFAULT_STR_PRODUCTNAME @"银两"

#define DEFAULT_HTTP_REQUEST_TIME_OUT 10.0

typedef void (^ThirdPartPayCallback)(NSString *orderId, int32_t errorCode, NSString* msg);


typedef enum : int32_t {
    eUNKNOWN = 0,
    eJUNNET = 1,        //骏网一卡通
    eSNDACARD = 2,      //盛大卡
    eSZX = 3,           //神州行
    eZHENGTU = 4,       //征途卡
    eQQCARD = 5,        //Q 币卡
    eUNICOM = 6,        //联通卡
    eJIUYOU = 7,		//久游卡
    eYPCARD = 8,        //易宝 e 卡通
    eNETEASE = 9,       //网易卡
    eWANMEI = 10,       //完美卡
    eSOHU = 11,	        //搜狐卡
    eTELECOM = 12,      //电信卡
    eZONGYOU = 13,      //纵游一卡通
    eTIANXIA = 14,      //天下一卡通
    eTIANHONG = 15,		//天宏一卡通
    eBESTPAY = 16		//翼支付
} CARDTYPE;

#define CARD_RATIO @[ \
/* 未知 */        @"", \
/* 骏网一卡通 */   @"1元=8000游戏币",  \
/* 盛大卡 */       @"1元=8000游戏币",  \
/* 神州行 */       @"1元=9500游戏币",  \
/* 征途卡 */       @"1元=8000游戏币",  \
/* Q 币卡 */       @"1元=8000游戏币",  \
/* 联通卡 */       @"1元=9500游戏币",  \
/* 久游卡 */       @"1元=8000游戏币",  \
/* 易宝 e 卡通 */  @"1元=8000游戏币",  \
/* 网易卡 */       @"1元=8000游戏币",  \
/* 完美卡 */       @"1元=8000游戏币",  \
/* 搜狐卡 */       @"1元=8000游戏币",  \
/* 电信卡 */       @"1元=9500游戏币",  \
/* 纵游一卡通 */     @"1元=8000游戏币",  \
/* 天下一卡通 */     @"1元=8000游戏币",  \
/* 天宏一卡通 */     @"1元=8000游戏币",  \
/* 翼支付 */       @"1元=9500游戏币"]

#define STR_CARD_RATIO @"由于资费调整，当前支付方式比例为%@，点击确认即为同意此计费标准！"

#define CARDTYPE_NAME @[ \
@"", \
@"骏网一卡通", \
@"盛大卡", \
/*@"神州行"*/ @"移动卡", \
@"征途卡", \
@"Q 币卡", \
@"联通卡", \
@"久游卡", \
@"易宝 e 卡通", \
@"网易卡", \
@"完美卡", \
@"搜狐卡", \
@"电信卡", \
@"纵游一卡通", \
@"天下一卡通", \
@"天宏一卡通", \
@"翼支付"]

#define MOBILECARD_LIANTONG_PRICE   @[@(20),  @(30),  @(50),  @(100), @(300), @(500)]
#define MOBILECARD_YIDONG_PRICE     @[@(10),  @(20),  @(30),  @(50),  @(100), @(200), @(300), @(500), @(1000)]
#define MOBILECARD_DIANXIN_PRICE    @[@(10),  @(20),  @(30),  @(50),  @(100), @(200), @(300), @(500)]

#define GAMECARD_JUNNET_PRICE       @[@(5),   @(10),  @(20),  @(30),  @(50),  @(100)]
#define GAMECARD_SNDACARD_PRICE     @[@(5),   @(10),  @(15),  @(25),  @(30),  @(35),  @(45),  @(50),  @(100), @(350), @(1000)]
#define GAMECARD_TIANHONG_PRICE     @[@(5),   @(10),  @(15),  @(20),  @(30),  @(50),  @(100), @(500), @(1000)]
#define GAMECARD_ZHENGTU_PRICE      @[@(5),   @(10),  @(15),  @(18),  @(20),  @(25),  @(30),  @(50),  @(60),  @(68),  @(100), @(120), @(180), @(208), @(250), @(300), @(468), @(500)]
#define GAMECARD_WANMEI_PRICE       @[@(15),  @(30),  @(50),  @(100)]
#define GAMECARD_JIUYOU_PRICE       @[@(5),   @(10),  @(30),  @(50)]
#define GAMECARD_TIANXIA_PRICE      @[@(5),   @(10),  @(20),  @(30),  @(50),  @(100), @(300), @(500), @(1000)]
#define GAMECARD_ZONGYOU_PRICE      @[@(5),   @(10),  @(15),  @(30),  @(50),  @(100)]
#define GAMECARD_SOHU_PRICE         @[@(5),   @(10),  @(15),  @(30),  @(40),  @(100)]

#define CARD_PRICES @[ \
/* 未知 */        @[], \
/* 骏网一卡通 */   GAMECARD_JUNNET_PRICE, \
/* 盛大卡 */      GAMECARD_SNDACARD_PRICE, \
/* 神州行 */      MOBILECARD_YIDONG_PRICE, \
/* 征途卡 */      GAMECARD_ZHENGTU_PRICE, \
/* Q 币卡 */      @[], \
/* 联通卡 */      MOBILECARD_LIANTONG_PRICE, \
/* 久游卡 */      GAMECARD_JIUYOU_PRICE, \
/* 易宝 e 卡通 */  @[], \
/* 网易卡 */       @[], \
/* 完美卡 */      GAMECARD_WANMEI_PRICE, \
/* 搜狐卡 */      GAMECARD_SOHU_PRICE, \
/* 电信卡 */       MOBILECARD_DIANXIN_PRICE, \
/* 纵游一卡通 */    GAMECARD_ZONGYOU_PRICE, \
/* 天下一卡通 */    GAMECARD_TIANXIA_PRICE, \
/* 天宏一卡通 */    GAMECARD_TIANHONG_PRICE, \
/* 翼支付 */        @[]]


#define MOBILECARD_LIST @[ \
@(eUNICOM), \
@(eSZX), \
@(eTELECOM)]

#define GAMECARD_LIST @[ \
@(eJUNNET), \
@(eSNDACARD), \
@(eZHENGTU), \
@(eJIUYOU), \
@(eWANMEI), \
@(eSOHU), \
@(eZONGYOU), \
@(eTIANXIA), \
@(eTIANHONG)]

#define CARD_NUM_LIMIT @[ \
/* 未知 */        @[@(0)], \
/* 骏网一卡通 */   @[@(16)], \
/* 盛大卡 */      @[@(15), @(16)], \
/* 神州行 */      @[@(17)], \
/* 征途卡 */      @[@(16)], \
/* Q 币卡 */      @[], \
/* 联通卡 */      @[@(15)], \
/* 久游卡 */      @[@(13)], \
/* 易宝 e 卡通 */  @[], \
/* 网易卡 */       @[], \
/* 完美卡 */      @[@(10)], \
/* 搜狐卡 */      @[@(20)], \
/* 电信卡 */       @[@(19)], \
/* 纵游一卡通 */    @[@(15)], \
/* 天下一卡通 */    @[@(15)], \
/* 天宏一卡通 */    @[@(10), @(12)], \
/* 翼支付 */        @[]]

#define CARD_PASS_LIMIT @[ \
/* 未知 */        @[], \
/* 骏网一卡通 */   @[@(16)], \
/* 盛大卡 */      @[@(8), @(9)], \
/* 神州行 */      @[@(18)], \
/* 征途卡 */      @[@(8)], \
/* Q 币卡 */      @[], \
/* 联通卡 */      @[@(19)], \
/* 久游卡 */      @[@(10)], \
/* 易宝 e 卡通 */  @[], \
/* 网易卡 */       @[], \
/* 完美卡 */      @[@(15)], \
/* 搜狐卡 */      @[@(12)], \
/* 电信卡 */       @[@(18)], \
/* 纵游一卡通 */    @[@(15)], \
/* 天下一卡通 */    @[@(8)], \
/* 天宏一卡通 */    @[@(8), @(10)], \
/* 翼支付 */        @[]]

#define LOCALSTR_TITLE              @"商品名称：%@\n\n应付金额：%@元"
#define LOCALSTR_GET_ORDER_FAILED   @"获取订单失败，请稍后重试。"
#define LOCALSTR_PAYMENT_FAILED     @"支付出错。"
#define LOCALSTR_PAYMENT_SUCCESS    @"支付成功。若游戏币未及时到账，请稍候重新登入银行查看。"
#define LOCALSTR_PAYMENT_USERCANCEL @"用户取消支付。"
#define LOCALSTR_PAYMENT_UNKNOWN    @"支付操作已结束。若您支付成功而游戏币未及时到账，请稍候重新登入银行查看。"
#define LOCALSTR_PAYMENT_WECHAT_NOT_INSTALL @"请先安装微信。"
#define LOCALSTR_PAYMENT_CARD_NOT_ALLOW @"卡号或卡密长度不正确。"

#endif
