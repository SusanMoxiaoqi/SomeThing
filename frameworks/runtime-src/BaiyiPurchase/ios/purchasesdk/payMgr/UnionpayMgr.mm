//
//  UnionpayMgr.m
//  test
//
//  Created by darklinden on 3/7/15.
//
//

#import "UnionpayMgr.h"
#import "UPPayPlugin.h"

@interface UnionpayMgr () <UPPayPluginDelegate>

@end

@implementation UnionpayMgr

- (void)pay:(NSDictionary *)param completion:(ThirdPartPayCallback)completion
{
    [super pay:param completion:completion];
    
    NSString *tn = [param objectForKey:kPARAM_UNIONPAYTN];
    UIViewController *ctrl = [param objectForKey:kPARAM_VIEWCTRL];
    
    [UPPayPlugin startPay:tn
                     mode:kUnionpay_Mode_Deploy
           viewController:ctrl
                 delegate:self];
}

- (void)UPPayPluginResult:(NSString *)result
{
    if ([result.lowercaseString rangeOfString:@"success"].location != NSNotFound) {
        [self payEnd:self.paramPay[kPARAM_ORDERID]
             errCode:eSuccess
                 msg:@""];
    }
    else if ([result.lowercaseString rangeOfString:@"fail"].location != NSNotFound) {
        [self payEnd:self.paramPay[kPARAM_ORDERID]
             errCode:eFailed
                 msg:@""];
    }
    else if ([result.lowercaseString rangeOfString:@"cancel"].location != NSNotFound) {
        [self payEnd:self.paramPay[kPARAM_ORDERID]
             errCode:eUserCanceled
                 msg:@""];
    }
}

@end
