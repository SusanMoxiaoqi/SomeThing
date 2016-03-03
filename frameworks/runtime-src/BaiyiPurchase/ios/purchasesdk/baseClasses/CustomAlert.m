//
//  CustomAlert.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 2/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "CustomAlert.h"

#define kAlertCallback @"kAlertCallback"

@interface CustomAlert ()
@property (nonatomic, retain) NSString *title;
@property (nonatomic, retain) NSString *message;
@property (nonatomic, assign) CustomAlertType type;
@property (nonatomic, retain) NSMutableDictionary *callbacks;

@property (retain, nonatomic) IBOutlet UIView *alertContainer;

@property (retain, nonatomic) IBOutlet UIView *iconContainer;
@property (retain, nonatomic) IBOutlet UIImageView *iconInfo;
@property (retain, nonatomic) IBOutlet UIImageView *iconQuestion;
@property (retain, nonatomic) IBOutlet UIImageView *iconError;

@property (retain, nonatomic) IBOutlet UILabel *msgLabel;

@property (retain, nonatomic) IBOutlet UIButton *btnOK;
@property (retain, nonatomic) IBOutlet UIButton *btnCancel;

@end

@implementation CustomAlert

static __strong CustomAlert *staticAlert = nil;
+ (BOOL)alertTitle:(NSString *)title
           message:(NSString *)message
              type:(CustomAlertType)type
            inView:(UIView *)view
        completion:(CustomAlertCallback)completion
{
    if (staticAlert) {
#if DEBUG
        [[NSException exceptionWithName:@"\n******************************CustomAlert Duplicated Alert Exception******************************\n" reason:nil userInfo:nil] raise];
#endif
        return false;
    }
    
    NSArray *array = [[NSBundle mainBundle] loadNibNamed:@"CustomAlert" owner:nil options:nil];
    for (UIView *v in array) {
        if ([v isKindOfClass:[CustomAlert class]]) {
            staticAlert = [(CustomAlert *)v retain];
            break;
        }
    }
    
    UIView *pv = view;
    if (!pv) {
        pv = [[self getRoot] view];
    }
    
    [pv addSubview:staticAlert];
    
    staticAlert.title = title;
    staticAlert.message = message;
    staticAlert.type = type;
    staticAlert.callbacks = [NSMutableDictionary dictionary];
    
    if (completion) {
        void (^completionBlock)(NSString* msg) = [completion copy];
        [staticAlert.callbacks setObject:completionBlock forKey:kAlertCallback];
    }
    
    return true;
}

+ (void)removeAlert
{
    if (staticAlert) {
        if (staticAlert.superview) {
            [staticAlert removeFromSuperview];
        }
        
        [staticAlert release], staticAlert = nil;
    }
}

+ (UIViewController*)getRoot
{
    UIViewController* ctrol = nil;
    if ([[UIDevice currentDevice].systemVersion floatValue] < 6.0)
    {
        // warning: addSubView doesn't work on iOS6
        NSArray* array = [[UIApplication sharedApplication]windows];
        UIWindow* win = [array objectAtIndex:0];
        
        UIView* ui = [[win subviews] objectAtIndex:0];
        ctrol = (UIViewController*)[ui nextResponder];
    }
    else
    {
        // use this method on ios6
        ctrol = [UIApplication sharedApplication].keyWindow.rootViewController;
    }
    return ctrol;
}

- (void)didMoveToSuperview
{
    [super didMoveToSuperview];
    
    if (self.superview) {
        [self animateShowAlert];
    }
}

- (void)layoutSubviews
{
    if (!CGRectEqualToRect(self.frame, self.superview.bounds)) {
        self.frame = self.superview.bounds;
    }
    
    [super layoutSubviews];
}

- (void)setType:(CustomAlertType)type
{
    _type = type;
    switch (_type) {
        case eAlertInfo:
        {
            _iconInfo.hidden = false;
            _iconError.hidden = true;
            _iconQuestion.hidden = true;
            
            _btnCancel.hidden = true;
            CGPoint p = _btnOK.center;
            p.x = _alertContainer.frame.size.width / 2;
            _btnOK.center = p;
        }
            break;
        case eAlertQuestion:
        {
            _iconInfo.hidden = true;
            _iconError.hidden = true;
            _iconQuestion.hidden = false;
        }
            break;
        case eAlertError:
        {
            _iconInfo.hidden = true;
            _iconError.hidden = false;
            _iconQuestion.hidden = true;
            
            _btnCancel.hidden = true;
            CGPoint p = _btnOK.center;
            p.x = _alertContainer.frame.size.width / 2;
            _btnOK.center = p;
        }
            break;
        default:
            break;
    }
}

- (void)setFrame:(CGRect)frame
{
    [super setFrame:frame];
    
    if (_message.length) {
        
        _message = [_message stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
        _message = [@"   " stringByAppendingString:_message];
        
        CGSize textSize = [_message sizeWithFont:_msgLabel.font constrainedToSize:CGSizeMake(300, 100) lineBreakMode:NSLineBreakByWordWrapping];
        _msgLabel.text = _message;
        
        CGRect r = _msgLabel.frame;
        r.size.width = textSize.width + 10;
        r.size.height = textSize.height + 10;
        r.origin.x = (_alertContainer.frame.size.width - r.size.width) / 2;
        r.origin.y =(_alertContainer.frame.size.height - r.size.height) / 2;
        _msgLabel.frame = r;
        
        CGFloat cw = _iconContainer.frame.size.width;
        cw += 10;
        cw += r.size.width;
        
        r = _iconContainer.frame;
        r.origin.x = _msgLabel.frame.origin.x - 5;
        r.origin.y = _msgLabel.frame.origin.y;
        _iconContainer.frame = r;
        
        r = _msgLabel.frame;
        r.origin.x = (_alertContainer.frame.size.width - cw) / 2 + _iconContainer.frame.size.width + 10;
        _msgLabel.frame = r;
    }
}

- (IBAction)btnOKClicked:(id)sender {
    CustomAlertCallback completionBlock = [self.callbacks objectForKey:kAlertCallback];
    if (completionBlock) {
        completionBlock(true);
    }
    
    [self animateRemoveAlert];
}

- (IBAction)btnCancelClicked:(id)sender {
    CustomAlertCallback completionBlock = [self.callbacks objectForKey:kAlertCallback];
    if (completionBlock) {
        completionBlock(false);
    }
    
    [self animateRemoveAlert];
}

- (void)animateShowAlert
{
    _alertContainer.alpha = 0;
    [UIView animateWithDuration:ANIMATE_TIME_DURATION
                     animations:^{
                         _alertContainer.alpha = 1;
                     } completion:^(BOOL finished) {
                         
                     }];
}

- (void)animateRemoveAlert
{
    [UIView animateWithDuration:ANIMATE_TIME_DURATION
                     animations:^{
                         _alertContainer.alpha = 0;
                     } completion:^(BOOL finished) {
                         [[self class] removeAlert];
                     }];
}

- (void)dealloc {
    [_iconInfo release];
    [_iconQuestion release];
    [_iconError release];
    [_iconContainer release];
    [_msgLabel release];
    [_alertContainer release];
    [_btnOK release];
    [_btnCancel release];
    [super dealloc];
}
@end
