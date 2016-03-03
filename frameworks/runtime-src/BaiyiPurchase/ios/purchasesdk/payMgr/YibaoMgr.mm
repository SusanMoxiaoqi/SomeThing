//
//  UnionpayMgr.m
//  test
//
//  Created by darklinden on 3/7/15.
//
//

#import "YibaoMgr.h"
#import "definition.h"
#import "PurchaseWeb.h"

@interface YibaoMgr ()

@end

@implementation YibaoMgr

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
    NSString *surl = self.paramPay[kPARAM_WEB_URL];//[self.paramPay[kPARAM_WEB_URL] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSURL *url = [NSURL URLWithString:surl];
    return url;
}

@end
