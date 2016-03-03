//
//  netWork.m
//  ShuiHuZhuanPhone
//
//  Created by 百易科技 on 15/5/30.
//
//

#import "netWork.h"
@implementation netWork
+(int)getCurrentNetworkStatus{
    Reachability *r = [Reachability reachabilityWithHostName:@"www.baidu.com"];
    NSUInteger netStatus = [r currentReachabilityStatus];
    NSLog(@"*******************%lu",(unsigned long)netStatus);
    return (int)netStatus;
}
@end