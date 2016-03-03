//
//  PurchaseViewCtrl.h
//  PurchaseSdkTest
//
//  Created by darklinden on 3/30/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "OrientationViewCtrl.h"
#import "LabelAttr.h"
#import "definition.h"

@interface PurchaseViewCtrl : OrientationViewCtrl
@property (retain, nonatomic) NSMutableDictionary *paramInfo;
@property (retain, nonatomic) IBOutlet UIView *topBanner;
@property (retain, nonatomic) IBOutlet UIView *leftContainer;
@property (retain, nonatomic) IBOutlet LabelAttr *leftTitle;

@property (retain, nonatomic) IBOutlet UIView *rightContainer;
@property (retain, nonatomic) IBOutlet UIImageView *topBannerBg;
@property (retain, nonatomic) IBOutlet UIImageView *leftListBg;
@property (retain, nonatomic) IBOutlet UIImageView *leftListIcon;
@property (retain, nonatomic) IBOutlet UILabel *labelTitle;

@property (retain, nonatomic) IBOutlet UIButton *btnBack;
@property (retain, nonatomic) IBOutlet UIButton *btnClose;

@property (retain, nonatomic) IBOutlet UIWebView *webView;

+ (instancetype)getInstance;
+ (BOOL)freeInstance;

- (IBAction)telCall:(id)sender;
- (void)back;
- (void)close;


@end
