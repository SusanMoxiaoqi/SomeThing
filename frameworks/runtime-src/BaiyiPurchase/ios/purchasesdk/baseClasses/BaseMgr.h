//
//  BaseMgr.h
//  PurchaseSdkTest
//
//  Created by HanShaokun on 2/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "definition.h"

@interface BaseMgr : NSObject
@property (nonatomic, retain) NSDictionary          *paramPay;
@property (nonatomic, retain) NSMutableDictionary   *callbacks;

+ (instancetype)obj;

- (NSURL *)webUrl;

- (void)pay:(NSDictionary *)param
 completion:(ThirdPartPayCallback)completion;

- (void)payEnd:(NSString*)orderId
       errCode:(int32_t)errCode
           msg:(NSString *)msg;

- (void)handleUrlCallback:(NSURL *)url;

@end
