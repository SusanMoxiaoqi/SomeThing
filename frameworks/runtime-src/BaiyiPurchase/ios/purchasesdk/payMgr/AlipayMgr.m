//
//  AlipayMgr.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 2/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "AlipayMgr.h"
#import <UIKit/UIKit.h>
#import "AlipaySDK.h"
#import "RSADataSigner.h"

@implementation AlipayMgr

- (void)handleUrlCallback:(NSURL *)url
{
    [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
        [self payEnd:resultDic];
    }];
}

- (void)payEnd:(NSDictionary *)resultDic
{
    NSLog(@"reslut = %@", resultDic);
    
    EPurchaseErrorCode success = eSuccess;
    NSString *msg = @"";
    
    if (resultDic[@"resultStatus"]) {
        NSInteger rs = [resultDic[@"resultStatus"] integerValue];
        if (rs != 9000) {
            success = eFailed;
        }
    }
    else {
        success = eFailed;
    }
    
    id result = resultDic[@"result"];
    if ([result isKindOfClass:[NSString class]]) {
        if (success == eSuccess) {
            NSString *rs = (NSString *)result;
            
            NSRange r = [rs rangeOfString:@"&success=\"true\""];
            if (NSNotFound == r.location) {
                success = eFailed;
            }
        }
    }

    [self payEnd:self.paramPay[kPARAM_ORDERID]
         errCode:success
             msg:msg];
}

- (void)pay:(NSDictionary *)param completion:(ThirdPartPayCallback)completion
{
    [super pay:param completion:completion];
    
    NSString *partner = @"2088701975689143";
    NSString *seller = @"decoy1986@126.com";
    NSString *privateKey = @"MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAK/KNdCraoi4BceZFMf9q41UGyM8/HZCDy6qrxX12U8T4Qwz7JZkXtnNN4chnjyyM8TjL0I99Wm5A+LGbwFsyYAQsX2RlGLlOhA9M2jzGZHk4OX2BA1GmSWpcLjcT9Jxtx7C/hulcraoIPRNsyULS+n//gZIGh5guN9LPn9A4iV9AgMBAAECgYA+1pbEH/J2KuoN/n+6OciQPadxwkQw9c49jVAHFpn2tZF17j29SOXLD5uw12icI8tzrw5erI1EnJlyACMALGYepKotRHFc/G88ZUZ1PLQ5pWvyYg9dW3QunxgL5dh1HQrpNbaNG/EjCu1nEqTbnUuzbgIjl4OWq6mTBp+g9bVDlQJBANd5MsTgnBNJQ08jOQnXmWXJEI9ZIDXrZhyw0xqgxYk+oox9RgJS1M/TRSu6e5vbEXBgSENBxUS3Ahpe07rq6BcCQQDQ2ktGDo7iVF0Gr0PXXT33giOZPkH/A4z2jctxtkYkJVLd+1AFQFkhJxO4bDqbNpJ/JGKXgH/YSVg44F+53oeLAkAPO4EsS9icwGwitxG8MWKlwG4MRDezuB1y38k8s6rjRetF1UFSvrpOqtfT/I3qebUk5ZmWL5sbfXiHlraPGzYnAkBgOnQ8TzDeb2h9T/u+GyQWCkxEqz7VNNmaMDLwrb8boGbSCJ0SDlgCwnJ/or5ODZLqKeWTUI2XJhQUAK2agkGJAkAbSanfjNliSUf6yA/kzRw7IAQUqhnA/YMKBCOQIdJRbWge1q/Vo9qe43eAAVwgeztsYI3u/uBaK9Z2hgEtgIeA";
    
    NSString * productName = [param objectForKey:kPARAM_PRODUCTNAME];
    NSString * productDescription = [param objectForKey:kPARAM_PRODUCTDES];
    NSString * amount = [param objectForKey:kPARAM_PRICE];
    NSString *porderNO = [param objectForKey:kPARAM_ORDERID];
    NSString *notifyURL = [param objectForKey:kPARAM_NOTIURL];
    /*
     *生成订单信息及签名
     */
    //将商品信息赋予AlixPayOrder的成员变量
    NSString *service = @"mobile.securitypay.pay";
    NSString *paymentType = @"1";
    NSString *inputCharset = @"utf-8";
    NSString *itBPay = @"30m";
    NSString *showUrl = @"m.alipay.com";
    
    //应用注册scheme,在AlixPayDemo-Info.plist定义URL types
    NSString *appScheme = [[NSBundle mainBundle] bundleIdentifier];
    
    NSMutableString *orderSpec = [NSMutableString string];
    if (partner) {
        [orderSpec appendFormat:@"partner=\"%@\"", partner];
    }
    
    if (seller) {
        [orderSpec appendFormat:@"&seller_id=\"%@\"", seller];
    }
    if (porderNO) {
        [orderSpec appendFormat:@"&out_trade_no=\"%@\"", porderNO];
    }
    if (productName) {
        [orderSpec appendFormat:@"&subject=\"%@\"", productName];
    }
    
    if (productDescription) {
        [orderSpec appendFormat:@"&body=\"%@\"", productDescription];
    }
    
    if (amount) {
        [orderSpec appendFormat:@"&total_fee=\"%@\"", amount];
    }
    
    if (notifyURL) {
        [orderSpec appendFormat:@"&notify_url=\"%@\"", notifyURL];
    }
    
    if (service) {
        [orderSpec appendFormat:@"&service=\"%@\"",service];//mobile.securitypay.pay
    }
    
    if (paymentType) {
        [orderSpec appendFormat:@"&payment_type=\"%@\"",paymentType];//1
    }
    
    if (inputCharset) {
        [orderSpec appendFormat:@"&_input_charset=\"%@\"",inputCharset];//utf-8
    }
    if (itBPay) {
        [orderSpec appendFormat:@"&it_b_pay=\"%@\"",itBPay];//30m
    }
    
    if (showUrl) {
        [orderSpec appendFormat:@"&show_url=\"%@\"",showUrl];//m.alipay.com
    }
    
    //将商品信息拼接成字符串
//    NSLog(@"orderSpec: \n%@", orderSpec);
    
    //获取私钥并将商户信息签名,外部商户可以根据情况存放私钥和签名,只需要遵循RSA签名规范,并将签名字符串base64编码和UrlEncode
    NSString *signedString = [RSADataSigner signString:orderSpec withKey:privateKey];
    
//    NSLog(@"signedString: \n%@", signedString);
    
    //将签名成功字符串格式化为订单字符串,请严格按照该格式
    NSString *orderString = nil;
    if (signedString != nil) {
        orderString = [NSString stringWithFormat:@"%@&sign=\"%@\"&sign_type=\"%@\"",
                       orderSpec, signedString, @"RSA"];
        
        [[UIApplication sharedApplication] setStatusBarHidden:true];
        [[AlipaySDK defaultService] payOrder:orderString fromScheme:appScheme callback:^(NSDictionary *resultDic) {
            [[UIApplication sharedApplication] setStatusBarHidden:false];
            [self payEnd:resultDic];
        }];
    }
}

@end
