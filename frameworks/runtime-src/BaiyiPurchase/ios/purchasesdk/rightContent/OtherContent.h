//
//  OtherContent.h
//  PurchaseSdkTest
//
//  Created by HanShaokun on 1/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "RightContent.h"

@interface OtherContent : RightContent

- (void)setPayTypes:(NSArray *)payTypes;

@property (retain, nonatomic) IBOutlet UILabel *topLabel;
@property (retain, nonatomic) IBOutlet UIButton *btnAlipay;
@property (retain, nonatomic) IBOutlet UIButton *btnWeixin;
@property (retain, nonatomic) IBOutlet UIButton *btnUnion;
@property (retain, nonatomic) IBOutlet UIButton *btnMo9;
@property (retain, nonatomic) IBOutlet UIButton *btnMobile;
@property (retain, nonatomic) IBOutlet UIButton *btnGamecard;
@property (retain, nonatomic) IBOutlet UIButton *btnYibao;



@end
