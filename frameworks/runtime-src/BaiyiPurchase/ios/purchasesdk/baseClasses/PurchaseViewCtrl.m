//
//  PurchaseViewCtrl.m
//  PurchaseSdkTest
//
//  Created by darklinden on 3/30/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "PurchaseViewCtrl.h"

@interface PurchaseViewCtrl ()

@end

@implementation PurchaseViewCtrl

_INSTANCE_IMPL_(PurchaseViewCtrl);

#pragma mark - life circle
- (instancetype)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
    }
    
    return self;
}

- (void)dealloc
{
    [_paramInfo release], _paramInfo = nil;
    [_topBanner release], _topBanner = nil;
    [_leftContainer release], _leftContainer = nil;
    [_rightContainer release], _rightContainer = nil;
    [_topBannerBg release], _topBannerBg = nil;
    [_leftListBg release], _leftListBg = nil;
    [_leftListIcon release], _leftListIcon = nil;
    [_labelTitle release], _labelTitle = nil;
    [_btnBack release], _btnBack = nil;
    [_btnClose release], _btnClose = nil;
    [_webView release], _webView = nil;
    
    [super dealloc];
}

- (void)viewDidUnload
{
    self.topBanner = nil;
    self.leftContainer = nil;
    self.leftTitle = nil;
    
    self.rightContainer = nil;
    self.topBannerBg = nil;
    self.leftListBg = nil;
    self.leftListIcon = nil;
    self.labelTitle = nil;
    
    self.btnBack = nil;
    self.btnClose = nil;
    
    self.webView = nil;
    [super viewDidUnload];
}

- (void)didReceiveMemoryWarning
{
    self.topBanner = nil;
    self.leftContainer = nil;
    self.leftTitle = nil;
    
    self.rightContainer = nil;
    self.topBannerBg = nil;
    self.leftListBg = nil;
    self.leftListIcon = nil;
    self.labelTitle = nil;
    
    self.btnBack = nil;
    self.btnClose = nil;
    
    self.webView = nil;
    
    [super didReceiveMemoryWarning];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
    _topBannerBg.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"nav_bar.png"]];
    _leftListBg.image = [[UIImage imageNamed:@"list_bg.png"] resizableImageWithCapInsets:UIEdgeInsetsMake(20.0, 20.0, 20.0, 20.0)];
    _labelTitle.text = @"游戏支付";
    
#if DEBUG
    _leftTitle.text = [LabelAttr textFromString:@"商品名称：1234,0000鱼币\n\n应付金额：1000元" type:AttrTypeLeftListTitle];
#endif
    
}

#pragma mark - action
- (void)back
{
    ;//virtual
}

- (void)close
{
    ;//virtual
}

- (IBAction)backBtnClicked:(id)sender {
    [self back];
}

- (IBAction)closeBtnClicked:(id)sender {
    [self close];
}

- (IBAction)telCall:(id)sender {
    NSString *surl = @"telprompt://4000371814";
    NSURL *url = [NSURL URLWithString:surl];
    if ([[UIApplication sharedApplication] canOpenURL:url]) {
        [[UIApplication sharedApplication] openURL:url];
    }
}

@end
