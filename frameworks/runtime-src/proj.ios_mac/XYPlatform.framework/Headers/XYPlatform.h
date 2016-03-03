//
//  XYPlatform.h
//  XYPlatform
//
//  Created by Eason on 21/04/2014.
//  Copyright (c) 2014 www.xyzs.com. All rights reserved.
//  XY SDK v1.4.0 iPhoneOS

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "XYPlatformDefines.h"


#pragma mark XYPlatform 基本信息

@interface XYPlatform : NSObject

/**
 *   @brief 获取XYPlatform实例
 */
+ (XYPlatform*)defaultPlatform;

/**
 *   @brief 获取SDK版本号
 */
+ (NSString*)sdkVersion;

@end


#pragma mark XYPaltform 初始化配置

@interface XYPlatform (XYConfiguration)

/**
 *	@brief  平台初始化方法
 *
 *  @param  appId 游戏在接入联运分配的appId
 *
 *	@param	appkey 游戏在接入联运时分配的appkey, 用于标记一个游戏
 *
 *  @param  isAccept 检查游戏版本更新升级，若检查更新失败（网络错误或因后台报错）是否继续游戏，建议传YES(即：继续游戏，可能跳过强制更新），可根据版本需要传
 *
 *	@param  bPassGameServices 单机版游戏发货模式，传YES表示需要走游戏服务端和SDK服务端交互并订单验证通过。传NO表示不经过服务端验证，直接在前端发货模式
 *
 *  @param  delegate 订单充值回调对象，该对象用于SDK支付发货或者补单发货协议对象，SDK不对该对象做内存管理，游戏须保证该对象生命周期，建议单例对象
                    必须遵循XYPayDelegate协议，协议详细请参考XYPlatformDefines.h中XYPayDelegate协议定义说明
 *
 */
- (void) initializeWithAppId:(NSString *) appId
                      appKey:(NSString *) appKey
isContinueWhenCheckUpdateFailed:(BOOL)isAccept
      isShipPassGameServices:(BOOL) bPassGameServices
           andReShipDelegate:(id<XYPayDelegate>)delegate;


/**
 *  @brief  platform 初始化之后，获取 appid
 */
@property (nonatomic, strong, readonly) NSString *XY_APP_ID;

/**
 * @brief platform 初始化之后，获取 appkey
 */
@property (nonatomic, strong, readonly) NSString *XY_APP_KEY;

/**
 * @brief 初始化方向
 */
@property (nonatomic, assign, readonly) UIInterfaceOrientation XYInterfaceOrientation;

/**
 * @brief 是否 debug 模式
 */
@property (nonatomic, assign, readonly) BOOL isDebugModel;

/**
 *  @brief 设定初始时游戏的方向
 *      1、其中设置的方向需要在 app plist文件Supported interface orientations 中支持，否则会Assert
 *      2、UIInterfaceOrientation, 设置 UIInterfaceOrientationLandscapeLeft 或者 UIInterfaceOrientationLandscapeRight，平台页面仅支持横屏幕。
 *      3、设置 UIInterfaceOrientationPortrait ，平台仅支持Portrait方向
 *      4、若不设置，平台页面会根据设备方向以及plist中配置适配方向做自适应，
 *      5、可不设置
 */
- (void)XYSetScreenOrientation:(UIInterfaceOrientation)orientation;

/**
 *  @brief 设置调试模式
 *
 *  @param debug YES 为测试环境, NO为 正式环境
 */
- (void)XYSetDebugModel:(BOOL)debug;


/**
 * @brief 打印log到控制台
 */
- (void)XYSetShowSDKLog:(BOOL)isShow;


@end


#pragma mark-- 用户部分，登录、注册、登出、token、uid 等

@interface XYPlatform (XYUserCenter)

/**
 *  @brief 获取本次登录的token, 登录或注册之后返回, 有效期为7天
 */
- (NSString*) XYToken;

/**
 *  @brief 获取登录的openuid, 用于标记一个用户
 */
- (NSString*)XYOpenUID;


- (NSString *) XYLoginUserAccount;


@end


#pragma mark 充值、 支付
@interface XYPlatform (XYPay)

/**
 * @brief 充值发货，是否通过游戏服务端完成发货，若从从服务端完成发货需要在 dev.xyzs.com中配置发货地址, 默认为YES
 *
 */
- (int) XYPayPassGameServices:(BOOL) bPassGameServices;


/**
 *  @brief 充值, 该接口首先获取支付渠道，然后支付并进入web支付页面
 *
 *  @param amount 充值金额
 *
 *  @param serverId 伺服器id
 *
 *  @param extra  开发商透传数据
 *
 *  @param delegate XYPayDelegate 代理回调
 *
 *  @result 错误码, 默认为0
 */

- (int) XYPayWithAmount:(NSString *) amount
            appServerId:(NSString *) serverId
               appExtra:(NSString *) extra
               delegate:(id<XYPayDelegate>) delegate;


/**
 *  @brief 充值, XYPayDelegate 回调 必须设置, 同上方法传入delegate对象， 主要用于发货失败补单代理回调
 */

- (int) XYSetPayDelegate:(id<XYPayDelegate>)delegate;


/**
 *  @brief 检测订单状态
 *
 *  @param orderId 订单号
 *
 *  @param delegate @protocol XYCheckPayOrderDelegate
 *
 *  @result 返回结果 默认为0
 */
- (int) XYCheckPayOrderInfo:(NSString *) orderId
                   delegate:(id<XYCheckPayOrderDelegate>) delegate;


/**
 *  @brief 获取最新订单号, 用于处理用户从支付中途退出
 *
 *  @result 返回生成的订单号
 */
- (NSString*) XYGetLastPayOrder;

@end


#pragma mark-- 支付宝快捷支付, 此部分开发者可先不做相应处理
/**
 * @brief 支付宝SSO快捷支付，支付过程调用支付宝快捷支付客户端
 *        该版本SDK仅支持支付宝Web支付，此部分开发者可先不做相应处理
 */
@interface XYPlatform(AliPay)

/**
 * @brief 支付宝支付，SSO回调到游戏， 该字段必传，游戏方需要在plist文件中定义 URL Scheme, 传入appScheme
 */

@property (nonatomic, copy) NSString *appScheme;


/**
 * @brief 支付宝支付，SSO回调方法，需要在以下Application Delegate回调方法中调用
 *- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
 *- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
 *
 */
- (void) XYHandleOpenURL:(NSURL *)url;

@end


#pragma mark-- 各种中心

@interface XYPlatform(Center)

/**
 * @brief 进入个人中心
 *
 * @param uFlag 预留标识 传0
 *
 */

- (void) XYEnterUserCenter:(int) uFlag;


/**
 * @brief 进入论坛BBS
 *
 * @param bFlag 预留标识 传0
 *
 */

- (void) XYEnterAppBBS:(int) bFlag;


@end


#pragma mark-- 悬浮工具条

@interface XYPlatform(ToolBar)

/**
 * @brief 显示悬浮工具条
 *
 * @param place 工具条初始化位置 
 *
 * @param isUseOldPlace 使用之前的位置，该值传 YES则忽略 参数place 指定位置， 建议传 YES
 *
 */

- (void)XYShowToolBar:(XYToolBarPlace)place isUseOldPlace:(BOOL)isUseOldPlace;


/**
 * @brief 隐藏悬浮工具条
 */

- (void)XYHideToolBar;

@end



#pragma mark-- 扩展方法

@interface XYPlatform(Extension)

/**
 * @brief 需要在 UIApplicationDelegate 方法 - (NSUInteger) application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window 中调用该方法
 *  该方法用于银联支付界面适配，
 *  Landscape方向游戏必须调用该方法，
 *  Portrait方向游戏可不调用
 */

- (NSUInteger) application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window;


@end


