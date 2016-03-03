//
//  ThirdPartPayMgr.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 2/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "ThirdPartPayMgr.h"
#import "PurchaseStartCtrl.h"
#import "PurchaseGameCard.h"
#import "PurchaseWeb.h"
#import "PurchaseMobileCard.h"
#import "CustomAlert.h"
#import "UIViewToast.h"

#define kThirdPartPayMgrCallback @"kThirdPartPayMgrCallback"

@implementation ThirdPartPayMgr

static __strong ThirdPartPayMgr* staticMgr = nil;
+ (instancetype)getInstance
{
    if (!staticMgr) {
        staticMgr = [[[self class] alloc] init];
    }
    return staticMgr;
}

+ (BOOL)freeInstance
{
    BOOL success = NO;
    if (staticMgr) {
        [staticMgr release], staticMgr = nil;
    }
    
    [PurchaseStartCtrl freeInstance];
    [PurchaseGameCard freeInstance];
    [PurchaseMobileCard freeInstance];
    [PurchaseWeb freeInstance];
    return success;
}

- (void)dealloc
{
    [_alipay release], _alipay = nil;
    [_wechat release], _wechat = nil;
    [_unionpay release], _unionpay = nil;
    [_mo9 release], _mo9 = nil;
   
    [_paramInfo release], _paramInfo = nil;
    [_paramPay release], _paramPay = nil;
    
    [super dealloc];
}

+ (void)setPayEndCallback:(ThirdPartPayMgrCallback)callback
{
    ThirdPartPayMgr *mgr = [ThirdPartPayMgr getInstance];
    
    [mgr setPayEndCallback:callback];
}

- (void)setPayEndCallback:(ThirdPartPayMgrCallback)callback
{
    if (!_callbacks) {
        self.callbacks = [NSMutableDictionary dictionary];
    }
    
    if (callback) {
        _callbacks[kThirdPartPayMgrCallback] = [callback copy];
    }
    else {
        [_callbacks removeObjectForKey:kThirdPartPayMgrCallback];
    }
}

- (void)callPayEndCallback:(EPurchaseErrorCode)errCode msg:(NSString *)msg
{
    if (_callbacks) {
        ThirdPartPayMgrCallback callback = _callbacks[kThirdPartPayMgrCallback];
        if (callback) {
            callback(errCode, msg);
        }
    }
}

+ (void)payWithProduct:(NSString *)productName
                 price:(NSString *)price
                userid:(NSString *)userid
              payTypes:(NSArray *)payTypes
      otherOrderParams:(NSString *)otherOrderParams
{
    PurchaseStartCtrl *start = [PurchaseStartCtrl getInstance];
    UINavigationController *nav = [[[UINavigationController alloc] initWithRootViewController:start] autorelease];
    nav.navigationBarHidden = true;
    nav.delegate = start;
    
    start.paramInfo = [NSMutableDictionary dictionaryWithDictionary:@{kPARAM_PAYTYPES   : payTypes,
                                                                      kPARAM_PRODUCTNAME: productName,
                                                                      kPARAM_PRICE      : price,
                                                                      kPARAM_USERID     : userid,
                                                                      kPARAM_VIEWCTRL   : nav,
                                                                      kPARAM_ORDER_PARAM: otherOrderParams}];
    [[ThirdPartPayMgr getRoot] presentViewController:nav animated:true completion:^{
        
    }];
}

- (void)payWithParam:(NSDictionary *)param type:(EActType)type
{
    self.paramInfo = param;
    self.type = type;
    
    [self requestOrder];
}

- (void)setType:(EActType)type
{
    _type = type;
    
    switch (_type) {
        case eActAlipay:
            _paytype = ePayTypeAlipay;
            break;
        case eActWeixin:
            _paytype = ePayTypeWechat;
            break;
        case eActUnion:
            _paytype = ePayTypeUnionpay;
            break;
            // = 4,
        case eActMo9:
            _paytype = ePayTypeMo9;
            break;
        case eActMobile:
        case eActGamecard:
            _paytype = ePayTypeCard;
            break;
        case eActYibao:
            _paytype = ePayTypeYibao;
            break;
        default:
            _paytype = ePayTypeUnknown;
            break;
    }
}

- (void)requestOrder
{
    NSString *userid = [_paramInfo objectForKey:kPARAM_USERID];
    NSString *price = [_paramInfo objectForKey:kPARAM_PRICE];
    NSInteger cardchannel = [_paramInfo[kPARAM_CHANNEL] integerValue];
    
    NSString *otherParam = _paramInfo[kPARAM_ORDER_PARAM];
    
    SILENCE_UNUSED(NSString *account = [_paramInfo objectForKey:kPARAM_ACCOUNT];
                   NSString *gameid = [_paramInfo objectForKey:kPARAM_GAMEID];);
    
    //request
    NSString* surl = [NSString stringWithFormat:ORDERURL, [ThirdPartPayMgr getDefaultHostPrefix]];
    NSMutableURLRequest *req = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:surl]
                                                       cachePolicy:NSURLRequestReloadIgnoringCacheData
                                                   timeoutInterval:DEFAULT_HTTP_REQUEST_TIME_OUT];
    
    [req addValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"Content-Type"];
    
    [req setHTTPMethod:@"POST"];
    
    //@"userid=%@&paymoney=%@&channelid=%d&detailid=%d"
    NSString *dstr = [NSString stringWithFormat:ORDERDATA, userid, price, _paytype, (long)cardchannel];
    
    if (otherParam.length > 0) {
        dstr = [[dstr stringByAppendingString:@"&"] stringByAppendingString:otherParam];
    }
    
    [req setHTTPBody:[dstr dataUsingEncoding:NSUTF8StringEncoding]];
    
    NSError *error = nil;
    NSURLResponse *response = nil;
    NSData *data = [NSURLConnection sendSynchronousRequest:req
                                         returningResponse:&response
                                                     error:&error];
    
    NSString *result = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    NSLog(@"\nfunction: %s\nline: %d\nresponse json: \n%@", __FUNCTION__, __LINE__, result);

    //去除头尾空格回车
    result = [result stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
    
    //去除bom头
    NSRange r = [result rangeOfString:@"{"];
    if (r.location != NSNotFound) {
        result = [result substringFromIndex:r.location];
    }
    
    NSData *jsondata = [result dataUsingEncoding:NSUTF8StringEncoding];
    
    NSError *err = nil;
    id jsonObj = [NSJSONSerialization JSONObjectWithData:jsondata options:NSJSONReadingAllowFragments error:&err];
    
    if (!jsonObj || err) {
        NSLog(@"\nfunction: %s\nline: %d\nerror: %@\n", __FUNCTION__, __LINE__, err.description);
        [self payEnd:@"" errCode:eFailed msg:LOCALSTR_GET_ORDER_FAILED];
        return;
    }
    
    switch (_type) {
            
        case eActAlipay:
        {
            bool success = false;
            do {
                
                NSString *status = jsonObj[@"status"];
                
                BREAK_IF(!status);
                
                BREAK_IF(![status isEqualToString:@"success"]);
                
                NSString *orderid = jsonObj[@"orderid"];
                
                BREAK_IF(!orderid || !orderid.length);
                
                //"data":{"notifyurl":"http:\/\/sdk.6513.com\/index.php\/PaySdk\/Alipay\/notifycallback.php"}}
                id dictdata = jsonObj[@"data"];
                BREAK_IF(!dictdata);
                BREAK_IF(![dictdata isKindOfClass:[NSDictionary class]]);
                
                NSString *notifyurl = dictdata[@"notifyurl"];
                BREAK_IF(!notifyurl.length);
                
                self.paramPay = [_paramInfo mutableCopy];
                [self.paramPay addEntriesFromDictionary:@{kPARAM_PRODUCTNAME   : DEFAULT_STR_PRODUCTNAME,
                                                          kPARAM_PRODUCTDES    : [NSString stringWithFormat:@"%@ %@", _paramInfo[kPARAM_PRICE], DEFAULT_STR_PRODUCTNAME],
                                                          kPARAM_PRICE         : _paramInfo[kPARAM_PRICE],
                                                          kPARAM_ORDERID       : orderid,
                                                          kPARAM_NOTIURL       : notifyurl}];
                
                [self payAction];
                
                success = true;
                
            } while (false);
            
            if (!success) {
                [self payEnd:@"" errCode:eFailed msg:LOCALSTR_GET_ORDER_FAILED];
            }
        }
            break;
        case eActWeixin:
        {
            //{"status":"success","orderid":"weixin2015042515262528959","data":{"retcode":0,"retmsg":"ok","appid":"wx1d5fc2059a2c9811","noncestr":"68af3564fb6024e891d093f8c3b8bc42","package":"Sign=WXPay","prepayid":"1201000000150425d562bd5ba9bf35a5","timestamp":1429946785,"sign":"159e4d418811a9182e11e1fc8703723e19f222dd"}}
            bool success = false;
            
            do {
                
                NSString *status = jsonObj[@"status"];
                
                BREAK_IF(!status);
                BREAK_IF(![status isEqualToString:@"success"]);
                
                NSString *orderid = jsonObj[@"orderid"];
                BREAK_IF(!orderid.length);
                
                id dictdata = jsonObj[@"data"];
                BREAK_IF(!dictdata);
                BREAK_IF(![dictdata isKindOfClass:[NSDictionary class]]);
                
                NSString *prepayid = dictdata[@"prepayid"];
                BREAK_IF(!prepayid.length);
                
                NSString *noncestr = dictdata[@"noncestr"];
                BREAK_IF(!noncestr.length);
                
                NSString *timestamp = [NSString stringWithFormat:@"%@", dictdata[@"timestamp"]];
                BREAK_IF(!timestamp.length);
                
                NSString *package = dictdata[@"package"];
                BREAK_IF(!package.length);
                
                NSString *partnerid = dictdata[@"partnerid"];
                BREAK_IF(!partnerid.length);
                
                NSString *sign = dictdata[@"sign"];
                BREAK_IF(!sign.length);
                
                self.paramPay = [_paramInfo mutableCopy];
                [self.paramPay addEntriesFromDictionary:@{kPARAM_PRODUCTNAME   : DEFAULT_STR_PRODUCTNAME,
                                                          kPARAM_PRODUCTDES    : [NSString stringWithFormat:@"%@ %@", _paramInfo[kPARAM_PRICE], DEFAULT_STR_PRODUCTNAME],
                                                          kPARAM_PRICE         : _paramInfo[kPARAM_PRICE],
                                                          kPARAM_ORDERID       : orderid,
                                                          kPARAM_PREPAYID      : prepayid,
                                                          kPARAM_NONCESTR      : noncestr,
                                                          kPARAM_TIMESTAMP     : timestamp,
                                                          kPARAM_PACKAGE       : package,
                                                          kPARAM_PARTNERID     : partnerid,
                                                          kPARAM_SIGN          : sign}];
                
                [self payAction];
                
                success = true;
                
            } while (false);
            
            if (!success) {
                [self payEnd:@"" errCode:eFailed msg:LOCALSTR_GET_ORDER_FAILED];
            }
        }
            break;
        case eActUnion:
        {
            //﻿{"status":"success","orderid":"union2015042516003588450","data":{"tn":"201504251600358180428"}}
            bool success = false;
            
            do {
                
                NSString *status = jsonObj[@"status"];
                
                BREAK_IF(!status);
                BREAK_IF(![status isEqualToString:@"success"]);
                
                NSString *orderid = jsonObj[@"orderid"];
                BREAK_IF(!orderid.length);
                
                id dictdata = jsonObj[@"data"];
                BREAK_IF(!dictdata);
                BREAK_IF(![dictdata isKindOfClass:[NSDictionary class]]);
                
                NSString *tn = dictdata[@"tn"];
                BREAK_IF(!tn.length);
                                
                self.paramPay = [_paramInfo mutableCopy];
                [self.paramPay addEntriesFromDictionary:@{kPARAM_PRODUCTNAME   : DEFAULT_STR_PRODUCTNAME,
                                                          kPARAM_PRODUCTDES    : [NSString stringWithFormat:@"%@ %@", _paramInfo[kPARAM_PRICE], DEFAULT_STR_PRODUCTNAME],
                                                          kPARAM_UNIONPAYTN    : tn,
                                                          kPARAM_PRICE         : _paramInfo[kPARAM_PRICE],
                                                          kPARAM_ORDERID       : orderid,
                                                          kPARAM_VIEWCTRL      : _paramInfo[kPARAM_VIEWCTRL]}];
                
                [self payAction];
                
                success = true;
                
            } while (false);
            
            if (!success) {
                [self payEnd:@"" errCode:eFailed msg:LOCALSTR_GET_ORDER_FAILED];
            }
        }
            break;
        case eActMo9:
        {
            //{"status":"success","orderid":"mo92015042511043862921"}
            bool success = false;
            do {
                
                NSString *status = jsonObj[@"status"];
                BREAK_IF(!status);
                BREAK_IF(![status isEqualToString:@"success"]);
                
                NSString *orderid = jsonObj[@"orderid"];
                BREAK_IF(!orderid || !orderid.length);
                
                id dictdata = jsonObj[@"data"];
                BREAK_IF(!dictdata);
                BREAK_IF(![dictdata isKindOfClass:[NSDictionary class]]);
                
                NSString *urllink = dictdata[@"urllink"];
                BREAK_IF(!urllink.length);
                
                self.paramPay = [_paramInfo mutableCopy];
                [self.paramPay addEntriesFromDictionary:@{kPARAM_PRODUCTNAME   : DEFAULT_STR_PRODUCTNAME,
                                                          kPARAM_WEB_URL       : urllink,
                                                          kPARAM_PRODUCTDES    : [NSString stringWithFormat:@"%@ %@", _paramInfo[kPARAM_PRICE], DEFAULT_STR_PRODUCTNAME],
                                                          kPARAM_PRICE         : _paramInfo[kPARAM_PRICE],
                                                          kPARAM_ORDERID       : orderid,
                                                          kPARAM_VIEWCTRL      : _paramInfo[kPARAM_VIEWCTRL]}];
                
                [self payAction];
                
                success = true;
                
            } while (false);
            
            if (!success) {
                [self payEnd:@"" errCode:eFailed msg:LOCALSTR_GET_ORDER_FAILED];
            }
        }
            break;
        case eActYibao:
        {
            //{"status":"success","orderid":"mo92015042511043862921"}
            bool success = false;
            do {
                
                NSString *status = jsonObj[@"status"];
                BREAK_IF(!status);
                BREAK_IF(![status isEqualToString:@"success"]);
                
                NSString *orderid = jsonObj[@"orderid"];
                BREAK_IF(!orderid || !orderid.length);
                
                id dictdata = jsonObj[@"data"];
                BREAK_IF(!dictdata);
                BREAK_IF(![dictdata isKindOfClass:[NSDictionary class]]);
                
                NSString *urllink = dictdata[@"urllink"];
                BREAK_IF(!urllink.length);
                
                self.paramPay = [_paramInfo mutableCopy];
                [self.paramPay addEntriesFromDictionary:@{kPARAM_PRODUCTNAME   : DEFAULT_STR_PRODUCTNAME,
                                                          kPARAM_WEB_URL       : urllink,
                                                          kPARAM_PRODUCTDES    : [NSString stringWithFormat:@"%@ %@", _paramInfo[kPARAM_PRICE], DEFAULT_STR_PRODUCTNAME],
                                                          kPARAM_PRICE         : _paramInfo[kPARAM_PRICE],
                                                          kPARAM_ORDERID       : orderid,
                                                          kPARAM_VIEWCTRL      : _paramInfo[kPARAM_VIEWCTRL]}];
                
                [self payAction];
                
                success = true;
                
            } while (false);
            
            if (!success) {
                [self payEnd:@"" errCode:eFailed msg:LOCALSTR_GET_ORDER_FAILED];
            }
        }
            break;
        case eActMobile:
        case eActGamecard:
        {
            //{"status":"success","orderid":"yeecard2015042511041828036"}
            bool success = false;
            do {
                
                NSString *status = jsonObj[@"status"];
                
                BREAK_IF(!status);
                
                BREAK_IF(![status isEqualToString:@"success"]);
                
                NSString *orderid = jsonObj[@"orderid"];
                
                BREAK_IF(!orderid || !orderid.length);
                
                self.paramPay = [_paramInfo mutableCopy];
                [self.paramPay addEntriesFromDictionary:@{kPARAM_PRODUCTNAME   : DEFAULT_STR_PRODUCTNAME,
                                                          kPARAM_PRODUCTDES    : [NSString stringWithFormat:@"%@ %@", _paramInfo[kPARAM_PRICE], DEFAULT_STR_PRODUCTNAME],
                                                          kPARAM_PRICE         : _paramInfo[kPARAM_PRICE],
                                                          kPARAM_ORDERID       : orderid,
                                                          kPARAM_VIEWCTRL      : _paramInfo[kPARAM_VIEWCTRL]}];
                
                [self payAction];
                
                success = true;
                
            } while (false);
            
            if (!success) {
                [self payEnd:@"" errCode:eFailed msg:LOCALSTR_GET_ORDER_FAILED];
            }
        }
            break;
        default:
            break;
    }
}

- (AlipayMgr *)alipay
{
    if (!_alipay) {
        _alipay = [[AlipayMgr obj] retain];
    }
    return _alipay;
}

- (WechatMgr *)wechat
{
    if (!_wechat) {
        _wechat = [[WechatMgr obj] retain];
    }
    return _wechat;
}

- (UnionpayMgr *)unionpay
{
    if (!_unionpay) {
        _unionpay = [[UnionpayMgr obj] retain];
    }
    return _unionpay;
}

- (Mo9Mgr *)mo9
{
    if (!_mo9) {
        _mo9 = [[Mo9Mgr obj] retain];
    }
    return _mo9;
}

- (YibaoMgr *)yibao
{
    if (!_yibao) {
        _yibao = [[YibaoMgr obj] retain];
    }
    return _yibao;
}

- (CardMgr *)card
{
    if (!_card) {
        _card = [[CardMgr obj] retain];
    }
    return _card;
}

- (void)payAction
{
    switch (_type) {
        case eActAlipay:
        {
            [self.alipay pay:_paramPay completion:^(NSString *orderId, int32_t errorCode, NSString *msg) {
                [self payEnd:orderId errCode:errorCode msg:msg];
            }];
        }
            break;
        case eActWeixin:
        {
            [self.wechat pay:_paramPay completion:^(NSString *orderId, int32_t errorCode, NSString *msg) {
                [self payEnd:orderId errCode:errorCode msg:msg];
            }];
        }
            break;
        case eActUnion:
        {
            [self.unionpay pay:_paramPay completion:^(NSString *orderId, int32_t errorCode, NSString *msg) {
                [self payEnd:orderId errCode:errorCode msg:msg];
            }];
        }
            break;
        case eActMo9:
        {
            [self.mo9 pay:_paramPay completion:^(NSString *orderId, int32_t errorCode, NSString *msg) {
            }];
        }
            break;
        case eActYibao:
        {
            [self.yibao pay:_paramPay completion:^(NSString *orderId, int32_t errorCode, NSString *msg) {
            }];
        }
            break;
        case eActGamecard:
        case eActMobile:
        {
            [self.card pay:_paramPay completion:^(NSString *orderId, int32_t errorCode, NSString *msg) {
                [self payEnd:orderId errCode:errorCode msg:msg];
            }];
        }
            break;
        default:
            break;
    }
}

- (void)handleUrlCallback:(NSURL *)url
{
    if ([url.absoluteString hasPrefix:URL_CALLBACK_PREFIX_ALIPAY]) {
        //支付宝
        [self.alipay handleUrlCallback:url];
    }
    else if ([url.absoluteString hasPrefix:URL_CALLBACK_PREFIX_WECHAT]) {
        [self.wechat handleUrlCallback:url];
    }
    
}

- (void)payEnd:(NSString *)orderId
       errCode:(EPurchaseErrorCode)errCode
           msg:(NSString *)msg
{
    CustomAlertType alertType = eAlertInfo;
    NSString *message = [msg copy];
    UIViewController *ctrl = self.paramInfo[kPARAM_VIEWCTRL];
    if (ctrl.navigationController) {
        ctrl = ctrl.navigationController;
    }
    
    switch (errCode) {
        case eFailed:
        {
            if (!message.length) {
                message = LOCALSTR_PAYMENT_FAILED;
            }
            alertType = eAlertError;
            
            [CustomAlert alertTitle:nil
                            message:message
                               type:alertType
                             inView:ctrl.view
                         completion:^(BOOL yes)
             {
                 //pass
             }];
        }
            break;
        case eUserCanceled:
        {
            if (!message.length) {
                message = LOCALSTR_PAYMENT_USERCANCEL;
            }
            alertType = eAlertInfo;
            [UIViewToast makeToast:message duration:3.0 position:CSToastPositionBottom];
        }
            break;
        case eSuccess:
        {
            if (!message.length) {
                message = LOCALSTR_PAYMENT_SUCCESS;
            }
            alertType = eAlertInfo;
            
            [ctrl dismissViewControllerAnimated:YES completion:^{
                [UIViewToast makeToast:message duration:3.0 position:CSToastPositionBottom];
                [[ThirdPartPayMgr getInstance] callPayEndCallback:errCode msg:message];
                [ThirdPartPayMgr freeInstance];
            }];
        }
            break;
        case eUnknown:
        {
            if (!message.length) {
                message = LOCALSTR_PAYMENT_UNKNOWN;
            }
            alertType = eAlertInfo;
            
            [ctrl dismissViewControllerAnimated:YES completion:^{
                [UIViewToast makeToast:message duration:3.0 position:CSToastPositionBottom];
                [[ThirdPartPayMgr getInstance] callPayEndCallback:errCode msg:message];
                [ThirdPartPayMgr freeInstance];
            }];
        }
            break;
        case eWechatNotInstall:
        {
            if (!message.length) {
                message = LOCALSTR_PAYMENT_WECHAT_NOT_INSTALL;
            }
            alertType = eAlertError;
            
            [CustomAlert alertTitle:nil
                            message:message
                               type:alertType
                             inView:ctrl.view
                         completion:^(BOOL yes)
             {
                 //pass
             }];
        }
            break;
        default:
            break;
    }    
}

+ (UIViewController*)getRoot
{
    UIViewController* ctrol = nil;
    if ([[UIDevice currentDevice].systemVersion floatValue] < 6.0)
    {
        // warning: addSubView doesn't work on iOS6
        NSArray* array = [[UIApplication sharedApplication]windows];
        UIWindow* win = [array objectAtIndex:0];
        
        UIView* ui = [[win subviews] objectAtIndex:0];
        ctrol = (UIViewController*)[ui nextResponder];
    }
    else
    {
        // use this method on ios6
        ctrol = [UIApplication sharedApplication].keyWindow.rootViewController;
    }
    return ctrol;
}

+ (void)setDefaultHostPrefix:(NSString *)prefix
{
    if (prefix.length) {
        [[NSUserDefaults standardUserDefaults] setObject:prefix forKey:kORDERURL_PREFIX];
    }
}

+ (NSString *)getDefaultHostPrefix
{
    return [[NSUserDefaults standardUserDefaults] objectForKey:kORDERURL_PREFIX];
}

@end
