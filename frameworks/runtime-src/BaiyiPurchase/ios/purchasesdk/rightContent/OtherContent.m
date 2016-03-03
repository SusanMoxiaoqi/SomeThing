//
//  OtherContent.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 1/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "OtherContent.h"

@interface OtherContent ()
@property (nonatomic, retain) NSArray *arrLayout;
@end

@implementation OtherContent

+ (instancetype)viewWithNib:(NSString *)nib
{
    NSString *nibname = nib;
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        nibname = [nib stringByAppendingString:@"_pad"];
    }
    
    return [super viewWithNib:nibname];
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
    
    if (!_btnAlipay) {
        return;
    }
    
    NSDictionary* dict_btns = @{@(eActNone)         :   [UIButton buttonWithType:UIButtonTypeCustom],
                                @(eActAlipay)       :   _btnAlipay,
                                @(eActWeixin)       :   _btnWeixin,
                                @(eActUnion)        :   _btnUnion,
                                @(eActMo9)          :   _btnMo9,
                                @(eActMobile)       :   _btnMobile,
                                @(eActGamecard)     :   _btnGamecard,
                                @(eActYibao)        :   _btnYibao};
    
    CGFloat top_l = self.frame.size.height / 25 * 2;
    CGFloat top = self.frame.size.height / 25 * 7;
    CGFloat bottom = self.frame.size.height / 25 * 14;
    
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        top_l = self.frame.size.height / 25 * 1;
        top = self.frame.size.height / 25 * 3;
        bottom = self.frame.size.height / 25 * 5;
    }
    
    CGPoint p = _topLabel.center;
    p.y = top_l;
    _topLabel.center = p;
    
    if (_arrLayout.count > 0) {
        UIButton* btn = dict_btns[_arrLayout[0]];
        
        p = btn.center;
        p.x = self.frame.size.width / 11 * 2;
        p.y = top;
        btn.center = p;
    }
    
    if (_arrLayout.count > 1) {
        UIButton* btn = dict_btns[_arrLayout[1]];
        
        p = btn.center;
        p.x = self.frame.size.width / 2;
        p.y = top;
        btn.center = p;
    }
    
    if (_arrLayout.count > 2) {
        UIButton* btn = dict_btns[_arrLayout[2]];
        
        p = btn.center;
        p.x = self.frame.size.width / 11 * 9;
        p.y = top;
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
    
    for (int i = 0; i < dict_btns.allValues.count; i++) {
        UIButton* btn = dict_btns[@(i)];
        if ([_arrLayout indexOfObject:@(i)] != NSNotFound) {
            [btn setHidden:false];
        }
        else {
            [btn setHidden:true];
        }
    }
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
    [_topLabel release], _topLabel = nil;
    
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
