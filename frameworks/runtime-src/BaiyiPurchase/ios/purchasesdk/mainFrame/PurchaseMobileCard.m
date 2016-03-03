//
//  PurchaseMobileCard.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 31/3/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "PurchaseMobileCard.h"
#import "GamecardContent.h"
#import "ThirdPartPayMgr.h"
#import "UIScrollView+ScrollerAdditions.h"
#import "UIViewToast.h"

@interface PurchaseMobileCard ()

@end

@implementation PurchaseMobileCard

_INSTANCE_IMPL_(PurchaseMobileCard);

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.

    self.gameCardList = [PurchaseTypeList list:MOBILECARD_LIST];
    [_gameCardList addTarget:self selector:@selector(leftListDidChanged:)];
    
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0) {
        [self.leftContainer addSubview:self.gameCardList];
        self.gameCardList.translatesAutoresizingMaskIntoConstraints = false;
        
        NSDictionary *dict = NSDictionaryOfVariableBindings(_gameCardList);
        [_gameCardList.superview addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|-12-[_gameCardList]-0-|" options:0 metrics:nil views:dict]];
        NSString *fm = [NSString stringWithFormat:@"V:|-0-[_gameCardList]-%d-|", (int)(self.leftListIcon.frame.size.height + 40)];
        [_gameCardList.superview addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:fm options:0 metrics:nil views:dict]];
    }
    else {
        CGRect f = self.leftListBg.frame;
        f.size.height = self.leftListIcon.frame.origin.y - 20;
        [_gameCardList setFrame:f];
        
        [self.leftContainer addSubview:_gameCardList];
    }
    
    self.leftTitle.hidden = true;
    
    self.gameCardContent = [GamecardContent viewWithNib:@"GamecardContent"];
    _gameCardContent.actType = eActMobile;
    _gameCardContent.type = eUNICOM;
    [self.rightContainer addSubview:_gameCardContent];
    
    [self.gameCardList selectCell:[NSIndexPath indexPathForRow:0 inSection:0]];
    [self leftListDidChanged:MOBILECARD_LIST[0]];
}

- (void)keyboardWillShow:(NSNotification *)noti
{
    [self.gameCardContent keyboardWillShow:noti];
}

- (void)keyboardWillHide:(NSNotification *)noti
{
    [self.gameCardContent keyboardWillHide:noti];
}

- (void)leftListDidChanged:(NSNumber *)type
{
    NSLog(@"%@", type);
    
    self.gameCardContent.paramInfo = self.paramInfo;
    self.gameCardContent.type = (CARDTYPE)type.integerValue;
    
    [self.gameCardContent reloadContent];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    
    [self.gameCardList setVerticalScrollerTintColor:[UIColor colorWithRed:234.0 / 255.0
                                                                    green:181.0 / 255.0
                                                                     blue:101.0 / 255.0
                                                                    alpha:1.0]];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWillShow:) name:UIKeyboardWillShowNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWillHide:) name:UIKeyboardWillHideNotification object:nil];
}

- (void)viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:animated];
    
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)back
{
    if (self.navigationController.viewControllers.count > 1) {
        [self.navigationController popViewControllerAnimated:true];
    }
}

- (void)close
{
    [self dismissViewControllerAnimated:true completion:^{
        [UIViewToast makeToast:LOCALSTR_PAYMENT_USERCANCEL duration:3.0 position:CSToastPositionBottom];
        [[ThirdPartPayMgr getInstance] callPayEndCallback:eUserCanceled msg:@""];
        [ThirdPartPayMgr freeInstance];
    }];
}

- (void)dealloc
{
    [_gameCardList release], _gameCardList = nil;
    [_gameCardContent release], _gameCardContent = nil;
    [super dealloc];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
