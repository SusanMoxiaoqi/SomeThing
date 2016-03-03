//
//  AlipayMgr.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 2/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "WechatMgr.h"
#import "WXApi.h"

@interface WechatMgr () <WXApiDelegate>

@end

@implementation WechatMgr

- (instancetype)init
{
    self = [super init];
    if (self) {
        [WXApi registerApp:@"wx568c4214ee9f26f4"];
    }
    return self;
}

- (void)handleUrlCallback:(NSURL *)url
{
    [WXApi handleOpenURL:url delegate:self];
}

- (void)onResp:(BaseResp*)resp
{
    switch (resp.errCode) {
        case WXSuccess:
        {
            [self payEnd:self.paramPay[kPARAM_ORDERID]
                 errCode:eSuccess
                     msg:LOCALSTR_PAYMENT_SUCCESS];
        }
            break;
        case WXErrCodeUserCancel:
        {
            [self payEnd:self.paramPay[kPARAM_ORDERID]
                 errCode:eUserCanceled
                     msg:LOCALSTR_PAYMENT_USERCANCEL];
        }
            break;
        default:
        {
            [self payEnd:self.paramPay[kPARAM_ORDERID]
                 errCode:eFailed
                     msg:LOCALSTR_PAYMENT_FAILED];
        }
            break;
    }
}

- (void)pay:(NSDictionary *)param completion:(ThirdPartPayCallback)completion
{
    [super pay:param completion:completion];
    
    BOOL isinstallweixin = [WXApi isWXAppInstalled] && [WXApi isWXAppSupportApi];
    if (isinstallweixin)
    {
        NSString * prepayids = self.paramPay[kPARAM_PREPAYID];
        NSString * packages = self.paramPay[kPARAM_PACKAGE];
        NSString * noncestrs = self.paramPay[kPARAM_NONCESTR];
        NSString * timestamps = self.paramPay[kPARAM_TIMESTAMP];
        NSString * partnerid = self.paramPay[kPARAM_PARTNERID];
        NSString * signs = self.paramPay[kPARAM_SIGN];
        
        //调起微信支付
        PayReq* req             = [[[PayReq alloc] init] autorelease];
        //req.openID              = [dict objectForKey:@"appid"];
        req.partnerId           = partnerid;
        req.prepayId            = prepayids;
        req.nonceStr            = noncestrs;
        req.timeStamp           = [timestamps intValue];
        req.package             = packages;
        req.sign                = signs;
        
        if ([WXApi sendReq:req]) {
            NSLog(@"WXApi sendReq");
        }
    }
    else {
        [self payEnd:self.paramPay[kPARAM_ORDERID]
             errCode:eWechatNotInstall
                 msg:LOCALSTR_PAYMENT_WECHAT_NOT_INSTALL];
    }
}

@end
