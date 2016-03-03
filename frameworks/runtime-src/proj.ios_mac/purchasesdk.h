//
//  purchasesdk.h
//  purchasesdk
//
//  Created by HanShaokun on 6/5/15.
//  Copyright (c) 2015 by. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

typedef enum : int32_t {
    EPaymentStatusFailed = -1,
    EPaymentStatusSuccess = 0,
    EPaymentStatusWechatNotInstall = 1,
    EPaymentStatusUserCanceled = 2,
    // for other situations
    
    EPaymentStatusUnknown = 0xffff
} EPaymentStatusCode;

typedef void (^PurchasesdkHandler)(const EPaymentStatusCode status, const NSString* msg);

@interface purchasesdk : NSObject
@property (nonatomic, retain) NSMutableDictionary *callbacks;

+ (instancetype)getInstance;

+ (void)setPaymentCallback:(PurchasesdkHandler)callback;

+ (void)pay:(NSString *)objName                         //购买产品的标题
      price:(NSString *)price                           //购买产品的价格
     userid:(NSString *)userid                          //用户id
   payTypes:(NSArray *)payTypes                         //支付类型列表 支付宝＝1,微信=2,银联=3,Mo9=4,手机卡=5,游戏点卡=6,易宝=7 例如 @[@(1),@(2),@(3)]
otherOrderParams:(NSString *)otherOrderParams;          //其他获取订单参数 例如 "activityType=1&rowid=2"

+ (void)pay:(NSString *)objName                         //购买产品的标题
      price:(NSString *)price                           //购买产品的价格
     userid:(NSString *)userid                          //用户id
payTypeString:(NSString *)payTypeString                 //支付类型列表 支付宝＝1,微信=2,银联=3,Mo9=4,手机卡=5,游戏点卡=6,易宝=7 例如 "1,2,3" 中间不要有空格
otherOrderParams:(NSString *)otherOrderParams;          //其他获取订单参数 例如 "activityType=1&rowid=2"

+ (void)handleUrlCallback:(NSURL *)url;

+ (NSUInteger)application:(UIApplication *)application
supportedInterfaceOrientationsForWindow:(UIWindow *)window;

+ (void)setDefaultHostPrefix:(NSString*)prefix;
+ (NSString *)getDefaultHostPrefix;

- (void)privateSetPaymentCallback:(PurchasesdkHandler) callback;

- (void)privatePay:(NSString*)objName                   //购买产品的标题
             price:(NSString*)price                     //购买产品的价格
            userid:(NSString*)userid                    //用户id
          payTypes:(NSArray *)payTypes                  //支付类型列表
otherOrderParams:(NSString *)otherOrderParams;          //其他获取订单参数 例如 "activityType=1&rowid=2"

- (void)privateCallPaymentCallback:(const EPaymentStatusCode)status msg:(const NSString*)msg;

@end
