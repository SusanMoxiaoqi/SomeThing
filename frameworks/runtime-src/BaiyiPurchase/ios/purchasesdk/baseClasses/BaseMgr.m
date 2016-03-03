//
//  BaseMgr.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 2/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "BaseMgr.h"

@implementation BaseMgr

+ (instancetype)obj
{
    BaseMgr *mgr = [[[[self class] alloc] init] autorelease];
    mgr.callbacks = [NSMutableDictionary dictionary];
    return mgr;
}

- (void)dealloc
{
    [_paramPay release], _paramPay = nil;
    [_callbacks release], _callbacks = nil;
    [super dealloc];
}

- (void)pay:(NSDictionary *)param completion:(ThirdPartPayCallback)completion
{
    ; //virtual
    
    self.paramPay = param;
    
    if (completion) {
        void (^completionBlock)(NSString* msg) = [completion copy];
        [self.callbacks setObject:completionBlock forKey:kPay_callback];
    }
}

- (void)payEnd:(NSString *)orderId errCode:(int32_t)errCode msg:(NSString *)msg
{
    ThirdPartPayCallback completionBlock = [self.callbacks objectForKey:kPay_callback];
    if (completionBlock) {
        completionBlock(orderId,
                        errCode,
                        msg);
    }
    [self.callbacks removeAllObjects];
}

- (void)handleUrlCallback:(NSURL *)url
{
    ; //virtual
}

- (NSURL *)webUrl
{
    ; //virtual
    return nil;
}

@end
