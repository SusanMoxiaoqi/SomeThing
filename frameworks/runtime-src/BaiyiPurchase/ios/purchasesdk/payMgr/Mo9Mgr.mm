//
//  UnionpayMgr.m
//  test
//
//  Created by darklinden on 3/7/15.
//
//

#import "Mo9Mgr.h"
#import "definition.h"
#import "PurchaseWeb.h"

@interface Mo9Mgr ()

@end

@implementation Mo9Mgr

- (void)pay:(NSDictionary *)param completion:(ThirdPartPayCallback)completion
{
    [super pay:param completion:completion];
    
    PurchaseWeb *p = [PurchaseWeb getInstance];
    p.url = self.webUrl;
    
    UIViewController *ctrl = self.paramPay[kPARAM_VIEWCTRL];
    if (ctrl && [ctrl isKindOfClass:[UINavigationController class]]) {
        [(UINavigationController *)ctrl pushViewController:[PurchaseWeb getInstance] animated:true];
    }
}

- (NSURL *)webUrl
{
    NSString *surl = [self.paramPay[kPARAM_WEB_URL] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSURL *url = [NSURL URLWithString:surl];
    return url;
}

@end
