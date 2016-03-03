//
//  PurchaseStartCtrl.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 31/3/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "PurchaseStartCtrl.h"
#import "PurchaseGameCard.h"
#import "OtherContent.h"
#import "OtherContentRecommend.h"
#import "ThirdPartPayMgr.h"
#import "PurchaseWeb.h"
#import "V_loading.h"
#import "PurchaseMobileCard.h"

@interface PurchaseStartCtrl ()

@end

@implementation PurchaseStartCtrl

_INSTANCE_IMPL_(PurchaseStartCtrl);

- (void)dealloc
{
    [super dealloc];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.btnClose.hidden = true;
    
    [self setOtherContent];
    
    NSString *text = [NSString stringWithFormat:LOCALSTR_TITLE, self.paramInfo[kPARAM_PRODUCTNAME], self.paramInfo[kPARAM_PRICE]];
    self.leftTitle.text = [LabelAttr textFromString:text type:AttrTypeLeftListTitle];
}

- (void)setOtherContent
{
    for (UIView *v in self.rightContainer.subviews) {
        [v removeFromSuperview];
    }
    
    EActType type = PURCHASE_GET_LAST_TYPE();
    
    if (type != eActNone) {
        OtherContentRecommend *c = [OtherContentRecommend viewWithNib:@"OtherContentRecommend"];
        [c addTarget:self selector:@selector(actAlipay:) action:ActAlipay];
        [c addTarget:self selector:@selector(actWeixin:) action:ActWeixin];
        [c addTarget:self selector:@selector(actUnion:) action:ActUnion];
        [c addTarget:self selector:@selector(actMo9:) action:ActMo9];
        [c addTarget:self selector:@selector(actMobile:) action:ActMobile];
        [c addTarget:self selector:@selector(actGamecard:) action:ActGamecard];
        [c addTarget:self selector:@selector(actYibao:) action:ActYibao];
        [self.rightContainer addSubview:c];
        
        c.recommendType = type;
        [c setPayTypes:self.paramInfo[kPARAM_PAYTYPES]];
    }
    else {
        OtherContent *c = [OtherContent viewWithNib:@"OtherContent"];
        [c addTarget:self selector:@selector(actAlipay:) action:ActAlipay];
        [c addTarget:self selector:@selector(actWeixin:) action:ActWeixin];
        [c addTarget:self selector:@selector(actUnion:) action:ActUnion];
        [c addTarget:self selector:@selector(actMo9:) action:ActMo9];
        [c addTarget:self selector:@selector(actMobile:) action:ActMobile];
        [c addTarget:self selector:@selector(actGamecard:) action:ActGamecard];
        [c addTarget:self selector:@selector(actYibao:) action:ActYibao];
        [self.rightContainer addSubview:c];
        
        [c setPayTypes:self.paramInfo[kPARAM_PAYTYPES]];
    }
}

- (void)back
{
    UIViewController* root = [ThirdPartPayMgr getRoot];
    
    if (root.presentedViewController || root.presentingViewController) {
        [root dismissViewControllerAnimated:true completion:^{
            [[ThirdPartPayMgr getInstance] callPayEndCallback:eUserCanceled msg:@""];
            [ThirdPartPayMgr freeInstance];
        }];
    }
}

- (void)close
{
    ;//virtual
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


#pragma action
- (void)actAlipay:(OAct *)o
{
    NSLog(@"%s", __FUNCTION__);
    PURCHASE_SET_LAST_TYPE(o.type);
    
    [V_loading loadingInView:self.view loadingBlock:^{
        [[ThirdPartPayMgr getInstance] payWithParam:self.paramInfo type:o.type];
        [self setOtherContent];
    }];
}

- (void)actWeixin:(OAct *)o
{
    NSLog(@"%s", __FUNCTION__);
    PURCHASE_SET_LAST_TYPE(o.type);
    [V_loading loadingInView:self.view loadingBlock:^{
        [[ThirdPartPayMgr getInstance] payWithParam:self.paramInfo type:o.type];
        [self setOtherContent];
    }];
}

- (void)actUnion:(OAct *)o
{
    NSLog(@"%s", __FUNCTION__);
    PURCHASE_SET_LAST_TYPE(o.type);
    
    [V_loading loadingInView:self.view loadingBlock:^{
        [[ThirdPartPayMgr getInstance] payWithParam:self.paramInfo type:o.type];
        [self setOtherContent];
    }];
}

- (void)actMo9:(OAct *)o
{
    NSLog(@"%s", __FUNCTION__);
    PURCHASE_SET_LAST_TYPE(o.type);
    
    [V_loading loadingInView:self.view loadingBlock:^{
        [[ThirdPartPayMgr getInstance] payWithParam:self.paramInfo type:o.type];
        [self setOtherContent];
    }];
    
//    PurchaseWeb *p = [PurchaseWeb getInstance];
//    [[ThirdPartPayMgr getInstance] payWithParam:self.paramInfo type:o.type];
//    p.url = [ThirdPartPayMgr getInstance].mo9.webUrl;
//    
//    if (self.navigationController) {
//        [self.navigationController pushViewController:[PurchaseWeb getInstance] animated:true];
//    }
}

- (void)actMobile:(OAct *)o
{
    NSLog(@"%s", __FUNCTION__);
    PURCHASE_SET_LAST_TYPE(o.type);
    
    PurchaseMobileCard *p = [PurchaseMobileCard getInstance];
    p.paramInfo = self.paramInfo;
    
    if (self.navigationController) {
        [self.navigationController pushViewController:p animated:true];
        [self setOtherContent];
    }
}

- (void)actGamecard:(OAct *)o
{
    NSLog(@"%s", __FUNCTION__);
    PURCHASE_SET_LAST_TYPE(o.type);
    
    PurchaseGameCard *p = [PurchaseGameCard getInstance];
    p.paramInfo = self.paramInfo;
    
    if (self.navigationController) {
        [self.navigationController pushViewController:p animated:true];
        [self setOtherContent];
    }
}

- (void)actYibao:(OAct *)o
{
    NSLog(@"%s", __FUNCTION__);
    PURCHASE_SET_LAST_TYPE(o.type);
    
    [V_loading loadingInView:self.view loadingBlock:^{
        [[ThirdPartPayMgr getInstance] payWithParam:self.paramInfo type:o.type];
        [self setOtherContent];
    }];
}

@end
