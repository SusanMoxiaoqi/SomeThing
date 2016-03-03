//
//  netWork.m
//  ShuiHuZhuanPhone
//
//  Created by 百易科技 on 15/5/30.
//
//

#import "netWork.h"
#import "KeychainItemWrapper.h"
#import "OpenUDIDMac.h"
@implementation netWork
+(int)getCurrentNetworkStatus{
    Reachability *r = [Reachability reachabilityWithHostName:@"www.apple.com"];
    NSUInteger netStatus = [r currentReachabilityStatus];
    NSLog(@"*******************%lu",(unsigned long)netStatus);
    return (int)netStatus;
}
+(NSString *)AccessToUniqueIdentification{
    NSString *openUDID = [KeychainItemWrapper getSecureValueForKey:@"com.by.jiejishuihuzhuan"];
    if (!openUDID.length) {
       openUDID = [OpenUDIDMac value];
        BOOL succsess =[KeychainItemWrapper storeSecureValue:openUDID forKey:@"com.by.jiejishuihuzhuan"];
        NSLog(@"存入钥匙串%d", succsess);
    };
     NSLog(@"存入钥匙串%@", openUDID);
    return openUDID;
}
@end
