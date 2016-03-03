//
//  ThirdPartPayMgr.h
//  PurchaseSdkTest
//
//  Created by HanShaokun on 2/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "definition.h"
#import "AlipayMgr.h"
#import "WechatMgr.h"
#import "UnionpayMgr.h"
#import "Mo9Mgr.h"
#import "YibaoMgr.h"
#import "CardMgr.h"
#import "PurchaseStartCtrl.h"

typedef void(^ThirdPartPayMgrCallback)(int32_t status, NSString *msg);

@interface ThirdPartPayMgr : NSObject
@property (nonatomic, retain) AlipayMgr     *alipay;
@property (nonatomic, retain) WechatMgr     *wechat;
@property (nonatomic, retain) UnionpayMgr   *unionpay;
@property (nonatomic, retain) Mo9Mgr        *mo9;
@property (nonatomic, retain) YibaoMgr      *yibao;
@property (nonatomic, retain) CardMgr       *card;

@property (nonatomic, retain) NSDictionary  *paramInfo;
@property (nonatomic, retain) NSMutableDictionary *paramPay;
@property (nonatomic, assign) EActType      type;
@property (nonatomic, assign) EPayType      paytype;

@property (nonatomic, retain) NSMutableDictionary *callbacks;


+ (instancetype)getInstance;
+ (BOOL)freeInstance;

+ (UIViewController*)getRoot;

+ (void)setPayEndCallback:(ThirdPartPayMgrCallback)callback;
- (void)setPayEndCallback:(ThirdPartPayMgrCallback)callback;
- (void)callPayEndCallback:(EPurchaseErrorCode)errCode msg:(NSString *)msg;

+ (void)payWithProduct:(NSString *)productName
                 price:(NSString *)price
                userid:(NSString *)userid
              payTypes:(NSArray *)payTypes
      otherOrderParams:(NSString *)otherOrderParams;        //支付类型列表

+ (void)setDefaultHostPrefix:(NSString*)prefix;
+ (NSString *)getDefaultHostPrefix;

- (void)payWithParam:(NSDictionary *)param
                type:(EActType)type;

- (void)payEnd:(NSString *)orderId
       errCode:(EPurchaseErrorCode)errCode
           msg:(NSString *)msg;

- (void)handleUrlCallback:(NSURL *)url;

@end
