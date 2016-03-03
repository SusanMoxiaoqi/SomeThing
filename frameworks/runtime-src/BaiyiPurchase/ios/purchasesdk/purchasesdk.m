//
//  purchasesdk.m
//  purchasesdk
//
//  Created by HanShaokun on 6/5/15.
//  Copyright (c) 2015 by. All rights reserved.
//

#import "purchasesdk.h"
#import "ThirdPartPayMgr.h"

#define kpurchasesdkcallback @"kpurchasesdkcallback"

@implementation purchasesdk

+ (instancetype)getInstance
{
    static __strong purchasesdk *instance = nil;
    
    if (!instance) {
        instance = [[purchasesdk alloc] init];
    }
    
    return instance;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.callbacks = [NSMutableDictionary dictionary];
    }
    
    return self;
}

+ (void)setPaymentCallback:(PurchasesdkHandler)callback
{
    [[self getInstance] privateSetPaymentCallback:callback];
}

+ (void)pay:(NSString*)objName         //购买产品的标题
      price:(NSString*)price           //购买产品的价格
     userid:(NSString*)userid          //用户id
   payTypes:(NSArray *)payTypes        //支付类型列表
otherOrderParams:(NSString *)otherOrderParams
{
    [[self getInstance] privatePay:objName
                             price:price
                            userid:userid
                          payTypes:payTypes
                  otherOrderParams:otherOrderParams];
}

+ (void)pay:(NSString *)objName         //购买产品的标题
      price:(NSString *)price           //购买产品的价格
     userid:(NSString *)userid          //用户id
   payTypeString:(NSString *)payTypeString //支付类型列表 支付宝＝1,微信=2,银联=3,Mo9=4,手机卡=5,游戏点卡=6,易宝=7 例如 "1,2,3"
otherOrderParams:(NSString *)otherOrderParams //其他获取订单参数 例如 "activityType=1&rowid=2&channelName="
{
    [purchasesdk setDefaultHostPrefix:[NSString stringWithUTF8String:"http://m1-pay.baiyishuihu.com"]];
    NSArray *array = [payTypeString componentsSeparatedByString:@","];
    NSMutableArray *types = [NSMutableArray array];
    for (int i = 0; i < array.count; i++) {
        [types addObject:@([array[i] integerValue])];
    }
    
    [[self getInstance] privatePay:objName
                             price:price
                            userid:userid
                          payTypes:types
                  otherOrderParams:otherOrderParams];
}

- (void)privateSetPaymentCallback:(PurchasesdkHandler)callback
{
    if (callback) {
        _callbacks[kpurchasesdkcallback] = callback;
    }
    else {
        if (_callbacks[kpurchasesdkcallback]) {
            [_callbacks removeObjectForKey:kpurchasesdkcallback];
        }
    }
}

- (void)privatePay:(NSString*)objName         //购买产品的标题
             price:(NSString*)price           //购买产品的价格
            userid:(NSString*)userid          //用户id
          payTypes:(NSArray *)payTypes        //支付类型列表
otherOrderParams:(NSString *)otherOrderParams //其他获取订单参数 例如 "activityType=1&rowid=2"
{
    [ThirdPartPayMgr setPayEndCallback:^(int32_t status, NSString *msg) {
        [self privateCallPaymentCallback:(const EPaymentStatusCode)status msg:msg];
    }];
    
    [ThirdPartPayMgr payWithProduct:objName
                              price:price
                             userid:userid
                           payTypes:payTypes
                   otherOrderParams:otherOrderParams];
//    Director::getInstance()->stopAnimation();
}

- (void)privateCallPaymentCallback:(const EPaymentStatusCode)status msg:(const NSString*)msg
{
//    Director::getInstance()->startAnimation();
    
    PurchasesdkHandler callback = _callbacks[kpurchasesdkcallback];
    
    if (callback) {
        callback(status, msg);
    }
}

+ (void)handleUrlCallback:(NSURL *)url
{
    [[ThirdPartPayMgr getInstance] handleUrlCallback:url];
}

+ (NSUInteger)application:(UIApplication *)application
supportedInterfaceOrientationsForWindow:(UIWindow *)window
{
    if (![window isEqual:[[[UIApplication sharedApplication] delegate] window]]) {
        return UIInterfaceOrientationMaskPortrait
        | UIInterfaceOrientationMaskLandscapeLeft
        | UIInterfaceOrientationMaskLandscapeRight;
    }
    
    if (window.rootViewController.presentedViewController
        || window.rootViewController.presentingViewController) {
        return UIInterfaceOrientationMaskPortrait
        | UIInterfaceOrientationMaskLandscapeLeft
        | UIInterfaceOrientationMaskLandscapeRight;
    }
    else {
        return UIInterfaceOrientationMaskLandscapeLeft
        | UIInterfaceOrientationMaskLandscapeRight;
    }
}

+ (void)setDefaultHostPrefix:(NSString *)prefix
{
    [ThirdPartPayMgr setDefaultHostPrefix:prefix];
}

+ (NSString *)getDefaultHostPrefix
{
    return [ThirdPartPayMgr getDefaultHostPrefix];
}

@end
