//
//  OtherContentRecommend.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 1/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "OtherContentRecommend.h"

@interface OtherContentRecommend ()
@property (nonatomic, retain) NSArray *arrLayout;
@end

@implementation OtherContentRecommend

+ (instancetype)viewWithNib:(NSString *)nib
{
    NSString *nibname = nib;
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        nibname = [nib stringByAppendingString:@"_pad"];
    }
    
    return [super viewWithNib:nibname];
}

- (void)didMoveToSuperview
{
    [super didMoveToSuperview];
    
    self.layer.masksToBounds = true;
}

- (void)setFrame:(CGRect)frame
{
    [super setFrame:frame];
    
    NSLog(@"%f", self.frame.size.height);
    
    if (!_arrLayout) {
        self.arrLayout = DEFAULT_BTN_LAYOUT;
    }
    
    [self setPayTypes:_arrLayout];
}

- (void)setPayTypes:(NSArray *)payTypes
{
    if (payTypes.count) {
        [_arrLayout release];
        _arrLayout = [payTypes retain];
    }
    
    if (!_btnRecommend) {
        return;
    }
    
    NSDictionary* dict_btns = @{@(eActNone)         :   _btnRecommend,
                                @(eActAlipay)       :   _btnAlipay,
                                @(eActWeixin)       :   _btnWeixin,
                                @(eActUnion)        :   _btnUnion,
                                @(eActMo9)          :   _btnMo9,
                                @(eActMobile)       :   _btnMobile,
                                @(eActGamecard)     :   _btnGamecard,
                                @(eActYibao)        :   _btnYibao};
    
    CGFloat rec_l = self.frame.size.height / 25 * 2;
    CGFloat rec_b = self.frame.size.height / 25 * 5;
    CGFloat other_l = self.frame.size.height / 25 * 8;
    CGFloat other_top = self.frame.size.height / 25 * 11;
    CGFloat bottom = self.frame.size.height / 25 * 16;
    
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        rec_l = self.frame.size.height / 25 * 1;
        rec_b = self.frame.size.height / 25 * 3;
        other_l = self.frame.size.height / 25 * 5;
        other_top = self.frame.size.height / 25 * 7;
        bottom = self.frame.size.height / 25 * 9;
    }
    
    CGPoint p = _recommendLabel.center;
    p.y = rec_l;
    _recommendLabel.center = p;
    
    p = _btnRecommend.center;
    p.x = self.frame.size.width / 11 * 2;
    p.y = rec_b;
    _btnRecommend.center = p;
    
    p = _otherLabel.center;
    p.y = other_l;
    _otherLabel.center = p;
    
    if (_arrLayout.count > 0) {
        UIButton* btn = dict_btns[_arrLayout[0]];
        
        p = btn.center;
        p.x = self.frame.size.width / 11 * 2;
        p.y = other_top;
        btn.center = p;
    }
    
    if (_arrLayout.count > 1) {
        UIButton* btn = dict_btns[_arrLayout[1]];
        
        p = btn.center;
        p.x = self.frame.size.width / 2;
        p.y = other_top;
        btn.center = p;
    }
    
    if (_arrLayout.count > 2) {
        UIButton* btn = dict_btns[_arrLayout[2]];
        
        p = btn.center;
        p.x = self.frame.size.width / 11 * 9;
        p.y = other_top;
        btn.center = p;
    }
    
    if (_arrLayout.count > 3) {
        UIButton* btn = dict_btns[_arrLayout[3]];
        
        p = btn.center;
        p.x = self.frame.size.width / 11 * 2;
        p.y = bottom;
        btn.center = p;
    }
    
    if (_arrLayout.count > 4) {
        UIButton* btn = dict_btns[_arrLayout[4]];
        
        p = btn.center;
        p.x = self.frame.size.width / 2;
        p.y = bottom;
        btn.center = p;
    }
    
    if (_arrLayout.count > 5) {
        UIButton* btn = dict_btns[_arrLayout[5]];
        
        p = btn.center;
        p.x = self.frame.size.width / 11 * 9;
        p.y = bottom;
        btn.center = p;
    }
    
    for (int i = 1; i < dict_btns.allValues.count; i++) {
        UIButton* btn = dict_btns[@(i)];
        if ([_arrLayout indexOfObject:@(i)] != NSNotFound) {
            [btn setHidden:false];
        }
        else {
            [btn setHidden:true];
        }
    }
}

- (void)setRecommendType:(EActType)recommendType
{
    _recommendType = recommendType;
    
    NSString *img_name = ACT_TYPES[_recommendType];
    
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        img_name = [img_name stringByAppendingString:@"_pad"];
    }
    
    [_btnRecommend setImage:[UIImage imageNamed:[img_name stringByAppendingPathExtension:@"png"]]
                   forState:UIControlStateNormal];
    [_btnRecommend setImage:[UIImage imageNamed:[[img_name stringByAppendingString:@"_sel"] stringByAppendingPathExtension:@"png"]]
                   forState:UIControlStateHighlighted];
    [_btnRecommend setImage:[UIImage imageNamed:[[img_name stringByAppendingString:@"_sel"] stringByAppendingPathExtension:@"png"]]
                   forState:UIControlStateSelected];
    
//#warning hardcode size
    CGRect r = _btnRecommend.frame;
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        r.size.width = 213;
        r.size.height = 44;
    }
    else {
        r.size.width = 105;
        r.size.height = 37;
    }
    _btnRecommend.frame = r;
}

- (IBAction)btnRecommendClicked:(id)sender {
    [self callWithType:_recommendType];
}

- (IBAction)btnAlipayClicked:(id)sender {
    [self callWithType:eActAlipay];
}

- (IBAction)btnWeixinClicked:(id)sender {
    [self callWithType:eActWeixin];
}

- (IBAction)btnUnionClicked:(id)sender {
    [self callWithType:eActUnion];
}

- (IBAction)btnMo9Clicked:(id)sender {
    [self callWithType:eActMo9];
}

- (IBAction)btnMobileClicked:(id)sender {
    [self callWithType:eActMobile];
}

- (IBAction)btnGamecradClicked:(id)sender {
    [self callWithType:eActGamecard];
}

- (IBAction)btnYibaoClicked:(id)sender {
    [self callWithType:eActYibao];
}

- (void)dealloc {
    [_recommendLabel release], _recommendLabel = nil;
    [_otherLabel release], _otherLabel = nil;
    [_btnRecommend release], _btnRecommend = nil;
    [_btnAlipay release], _btnAlipay = nil;
    [_btnWeixin release], _btnWeixin = nil;
    [_btnUnion release], _btnUnion = nil;
    [_btnMo9 release], _btnMo9 = nil;
    [_btnMobile release], _btnMobile = nil;
    [_btnGamecard release], _btnGamecard = nil;
    [_btnYibao release], _btnYibao = nil;
    
    [_arrLayout release], _arrLayout = nil;
    [super dealloc];
}
@end
