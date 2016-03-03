//
//  GamecardContent.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 1/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "GamecardContent.h"
#import "definition.h"
#import "LabelAttr.h"
#import "V_loading.h"
#import "ThirdPartPayMgr.h"
#import "CustomAlert.h"

@implementation OPrice

+ (instancetype)obj
{
    return [[[OPrice alloc] init] autorelease];
}

- (void)dealloc
{
    [_priceTitle release], _priceTitle = nil;
    [super dealloc];
}

@end

@interface PriceBtn : UIView
@property (nonatomic, retain) UIButton *btn;
@property (nonatomic, retain) UILabel *lb;
@property (nonatomic, retain) UIImageView *img;

@property (nonatomic, retain) OPrice *price;
@property (nonatomic, assign) BOOL selected;

@property (nonatomic, assign) id target;
@property (nonatomic, assign) SEL selector;

- (void)addTarget:(id)target action:(SEL)selector;

@end

@implementation PriceBtn

+ (instancetype)btnWithSize:(CGSize)size price:(OPrice *)price
{
    PriceBtn *btn = [[[PriceBtn alloc] initWithFrame:CGRectMake(0, 0, size.width, size.height) price:price] autorelease];
    return btn;
}
                     
- (instancetype)initWithFrame:(CGRect)frame price:(OPrice *)price
{
    self = [super initWithFrame:frame];
    if (self) {
        
        self.backgroundColor = [UIColor clearColor];
        self.price = price;
        self.userInteractionEnabled = true;
        
        self.img = [[[UIImageView alloc] initWithFrame:self.bounds] autorelease];
        _img.userInteractionEnabled = true;
        _img.contentMode = UIViewContentModeScaleToFill;
        _img.image = [[UIImage imageNamed:@"btn_amount"] resizableImageWithCapInsets:UIEdgeInsetsMake(8.0, 8.0, 8.0, 8.0)];
        [self addSubview:_img];
        
        self.lb = [[[UILabel alloc] initWithFrame:self.bounds] autorelease];
        [_lb setText:_price.priceTitle];
        [_lb setBackgroundColor:[UIColor clearColor]];
        [_lb setTextColor:[UIColor blackColor]];
        [_lb setFont:[UIFont systemFontOfSize:12]];
        [self addSubview:_lb];
        
        self.btn = [UIButton buttonWithType:UIButtonTypeCustom];
        _btn.frame = self.bounds;
        
//        UIImage *img_btn = [[UIImage imageNamed:@"btn_amount"] stretchableImageWithLeftCapWidth:5 topCapHeight:5];
//        UIImage *img_btn_sel = [[UIImage imageNamed:@"btn_amount_sel"] stretchableImageWithLeftCapWidth:5 topCapHeight:5];
//        
//        [_btn setImage:img_btn forState:UIControlStateNormal];
//        [_btn setImage:img_btn_sel forState:UIControlStateSelected];
//        [_btn setImage:img_btn_sel forState:UIControlStateHighlighted];
        
        [_btn addTarget:self action:@selector(btnClicked:) forControlEvents:UIControlEventTouchUpInside];
        [self addSubview:_btn];
        
        if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 6.0) {
            [_lb setTextAlignment:NSTextAlignmentCenter];
        }
        else {
            SILENCE_DEPRECATION([_lb setTextAlignment:(NSInteger)UITextAlignmentCenter];);
        }
    }

    return self;
}

- (void)addTarget:(id)target action:(SEL)selector
{
    self.target = target;
    self.selector = selector;
}

- (void)btnClicked:(id)sender
{
    self.selected = true;
    if (_target) {
        if ([_target respondsToSelector:_selector]) {
            [_target performSelector:_selector withObject:self];
        }
    }
}

- (void)dealloc
{
    [_btn release], _btn = nil;
    [_lb release], _lb = nil;
    [_price release], _price = nil;
    
    _target = nil;
    _selector = nil;
    [super dealloc];
}

- (void)setSelected:(BOOL)selected
{
    _selected = selected;
    if (_selected) {
        _img.image = [[UIImage imageNamed:@"btn_amount_sel"] resizableImageWithCapInsets:UIEdgeInsetsMake(8.0, 8.0, 8.0, 8.0)];
    }
    else {
        _img.image = [[UIImage imageNamed:@"btn_amount"] resizableImageWithCapInsets:UIEdgeInsetsMake(10.0, 10.0, 10.0, 10.0)];
    }
//    UIImage *img_btn = [[UIImage imageNamed:@"btn_amount"] stretchableImageWithLeftCapWidth:5 topCapHeight:5];
//    UIImage *img_btn_sel = [[UIImage imageNamed:@"btn_amount_sel"] stretchableImageWithLeftCapWidth:5 topCapHeight:5];
}

@end

@interface GamecardContent () <UIScrollViewDelegate, UITextFieldDelegate>
@property (nonatomic, retain) NSMutableArray        *array_price_btns;
@property (retain, nonatomic) IBOutlet UIScrollView *contentScroll;

@property (retain, nonatomic) IBOutlet LabelAttr    *topLabel;
@property (retain, nonatomic) IBOutlet UITextField  *cardNumField;
@property (retain, nonatomic) IBOutlet UITextField  *cardSecField;
@property (retain, nonatomic) IBOutlet UIButton     *btnBuy;

@property (retain, nonatomic) IBOutlet UIView       *bottomLabel;
@property (retain, nonatomic) IBOutlet UIView       *bottomLabel_pad;

@property (retain, nonatomic) IBOutlet UIView *viewCardNum;
@property (retain, nonatomic) IBOutlet UIView *viewCardPass;
@property (retain, nonatomic) IBOutlet UIImageView *imgCardNum;
@property (retain, nonatomic) IBOutlet UIImageView *imgCardPass;
@property (retain, nonatomic) IBOutlet UILabel *zifeiLabel;

@property (assign, nonatomic) uint64_t selected_num;

@end

@implementation GamecardContent

+ (instancetype)viewWithNib:(NSString *)nib
{
    NSString *nibname = nib;
//    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
//        nibname = [nib stringByAppendingString:@"_pad"];
//    }
    
    return [super viewWithNib:nibname];
}

- (void)didMoveToSuperview
{
    UIImage *img_field = [[UIImage imageNamed:@"textfield_bg"] //stretchableImageWithLeftCapWidth:5 topCapHeight:5];
                          resizableImageWithCapInsets:UIEdgeInsetsMake(8.0, 8.0, 8.0, 8.0)];
    
    [_imgCardNum setImage:img_field];
    [_imgCardPass setImage:img_field];
    
    UIImage *img_btn = [[UIImage imageNamed:@"btn_pay"] resizableImageWithCapInsets:UIEdgeInsetsMake(8.0, 8.0, 8.0, 8.0)];
    UIImage *img_btn_sel = [[UIImage imageNamed:@"btn_pay_sel"] resizableImageWithCapInsets:UIEdgeInsetsMake(8.0, 8.0, 8.0, 8.0)];
    
    [_btnBuy setBackgroundImage:img_btn forState:UIControlStateNormal];
    [_btnBuy setBackgroundImage:img_btn_sel forState:UIControlStateSelected];
    [_btnBuy setBackgroundImage:img_btn_sel forState:UIControlStateHighlighted];
    
    [super didMoveToSuperview];
    
    self.layer.masksToBounds = true;
}

- (void)textFieldDidBeginEditing:(UITextField *)textField
{
    if ([textField isEqual:_cardNumField]) {
        self.contentScroll.contentOffset = CGPointMake(0, _viewCardNum.frame.origin.x);
    }
    
    if ([textField isEqual:_cardSecField]) {
        self.contentScroll.contentOffset = CGPointMake(0, _viewCardPass.frame.origin.x);
    }
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField
{
    if ([textField isEqual:_cardNumField]) {
        [_cardSecField becomeFirstResponder];
    }
    
    [textField resignFirstResponder];
    return false;
}

- (void)keyboardWillShow:(NSNotification *)noti
{
    NSValue *value = noti.userInfo[UIKeyboardFrameEndUserInfoKey];
    CGRect r = value.CGRectValue;
    
    CGRect b = [[UIScreen mainScreen] bounds];
    
    CGFloat h = 0;
    
    if (r.size.width == b.size.width || r.size.width == b.size.height) {
        h = r.size.height;
    }
    
    if (r.size.height == b.size.width || r.size.height == b.size.height) {
        h = r.size.width;
    }
    
    NSLog(@"%@", NSStringFromCGRect(self.frame));
    NSLog(@"%@", NSStringFromCGRect(r));
    
    self.contentScroll.frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height - h);
}

- (void)keyboardWillHide:(NSNotification *)noti
{
    self.contentScroll.frame = self.bounds;
}

- (void)reloadContent
{
    if (eUNKNOWN == _type) {
        return;
    }
    
    _topLabel.text = [LabelAttr textFromString:[NSString stringWithFormat:@"%@%@元", CURRENT_PAY, _paramInfo[kPARAM_PRICE]]
                                          type:AttrTypeGamecardTitle];
    
    _zifeiLabel.text = [NSString stringWithFormat:STR_CARD_RATIO, CARD_RATIO[_type]];
    
    NSArray *arr = CARD_NUM_LIMIT[_type];
    if ([arr count]) {
        
        NSMutableString *numPlaceholder = [NSMutableString stringWithString:@"卡号为"];
        NSMutableString *strLen = [NSMutableString stringWithFormat:@"%d位", (int32_t)[arr[0] integerValue]];
        
        if ( arr.count > 1) {
            for (int i = 1; i < arr.count; i++) {
                [strLen appendFormat:@"或%d位", (int32_t)[arr[i] integerValue]];
            }
        }
        [numPlaceholder appendString:strLen];
        
        _cardNumField.placeholder = [NSString stringWithString:numPlaceholder];
    }
    
    arr = CARD_PASS_LIMIT[_type];
    if ([arr count]) {
        
        NSMutableString *numPlaceholder = [NSMutableString stringWithString:@"密码为"];
        NSMutableString *strLen = [NSMutableString stringWithFormat:@"%d位", (int32_t)[arr[0] integerValue]];
        
        if ( arr.count > 1) {
            for (int i = 1; i < arr.count; i++) {
                [strLen appendFormat:@"或%d位", (int32_t)[arr[i] integerValue]];
            }
        }
        [numPlaceholder appendString:strLen];
        
        _cardSecField.placeholder = [NSString stringWithString:numPlaceholder];
    }

    _contentScroll.frame = self.bounds;
    
    NSLog(@"%f", self.frame.size.height);
    
    CGFloat top = self.frame.size.height / 25 * 4;
    CGFloat card_num = 0;
    
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        top = self.frame.size.height / 25 * 1;
    }
    
    CGPoint p = _topLabel.center;
    p.y = top;
    _topLabel.center = p;
    
    top += 20;
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        top += 20;
    }
    
    card_num = [self setupPrices:top];
    
    CGRect r = _viewCardNum.frame;
    r.origin.y = card_num + 40;
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        r.origin.y = card_num + 60;
    }
    r.origin.x = 20;
    r.size.width = self.frame.size.width - 40;
    r.size.height = 40;
    _viewCardNum.frame = r;
    
    r = _viewCardPass.frame;
    r.origin.y = _viewCardNum.center.y + (_cardNumField.frame.size.height * 0.7);
    r.origin.x = 20;
    r.size.width = self.frame.size.width - 40;
    r.size.height = 40;
    _viewCardPass.frame = r;
    
    p = _btnBuy.center;
    p.y = _viewCardPass.center.y + (_viewCardPass.frame.size.height * 2);
    r.origin.y = _viewCardPass.center.y + (_viewCardPass.frame.size.height * 0.7);
    r.origin.x = 20;
    r.size.width = self.frame.size.width - 40;
    r.size.height = 44;
    _btnBuy.frame = r;
    
    top = r.origin.y + r.size.height + 40;
    
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        
        _bottomLabel_pad.hidden = false;
        _bottomLabel.hidden = true;
        
        if (top + 80 > self.frame.size.height) {
            p = _bottomLabel_pad.center;
            p.y = top;
            p.x = self.frame.size.width / 2;
            _bottomLabel_pad.center = p;
        }
        else {
            p = _bottomLabel_pad.center;
            p.y = self.frame.size.height - 30;
            p.x = self.frame.size.width / 2;
            _bottomLabel_pad.center = p;
        }
    }
    else {
        _bottomLabel_pad.hidden = true;
        _bottomLabel.hidden = false;
        
        if (top + 120 > self.frame.size.height) {
            r = _bottomLabel.frame;
            r.origin.y = top;
            r.origin.x = 20;
            r.size.width = self.frame.size.width - 40;
            r.size.height = 60;
            _bottomLabel.frame = r;
        }
        else {
            r = _bottomLabel.frame;
            r.origin.y = self.frame.size.height - 120;
            r.origin.x = 20;
            r.size.width = self.frame.size.width - 40;
            r.size.height = 60;
            _bottomLabel.frame = r;
        }
    }
    
    
    _contentScroll.contentSize = CGSizeMake(_contentScroll.frame.size.width, top + 120) ;
}

- (void)setFrame:(CGRect)frame
{
    [super setFrame:frame];
    
    [self reloadContent];
}

- (void)btnPriceClicked:(id)sender {
    if ([sender isKindOfClass:[PriceBtn class]]) {
        PriceBtn *p = (PriceBtn *)sender;
        
        for (PriceBtn *b in _array_price_btns) {
            if (b.price.num != p.price.num) {
                b.selected = NO;
            }
            else {
                b.selected = true;
                _selected_num = b.price.num;
                _topLabel.text = [LabelAttr textFromString:[NSString stringWithFormat:@"%@%llu元", CURRENT_PAY, b.price.num]
                                                      type:AttrTypeGamecardTitle];
            }
        }
    }
}

- (IBAction)btnBuyClicked:(id)sender {
    
    UIView *v;
    UIViewController *c = self.paramInfo[kPARAM_VIEWCTRL];
    v = c.view;
    if (c.navigationController) {
        v = c.navigationController.view;
    }
    
    //添加长度检测
//    NSString *msg = @"";

    bool numCheck = false;
    bool pwdCheck = false;
    
    NSArray *arr = CARD_NUM_LIMIT[_type];
    for (int i = 0; i < arr.count; i++) {
        if (_cardNumField.text.length == (int32_t)[arr[i] integerValue]) {
            numCheck = true;
        }
    }
    
//    if (!numCheck) {
//        msg = [msg stringByAppendingString:_cardNumField.placeholder];
//    }
    
    arr = CARD_PASS_LIMIT[_type];
    for (int i = 0; i < arr.count; i++) {
        if (_cardSecField.text.length == (int32_t)[arr[i] integerValue]) {
            pwdCheck = true;
        }
    }
    
//    if (!pwdCheck) {
//        msg = [msg stringByAppendingString:_cardSecField.placeholder];
//    }
    
    if (!numCheck || !pwdCheck) {
        [CustomAlert alertTitle:nil
                        message:LOCALSTR_PAYMENT_CARD_NOT_ALLOW
                           type:eAlertError
                         inView:v
                     completion:^(BOOL yes) {
                         
                     }];
        
        return;
    }
    
    NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:_paramInfo];
//    NSString *cardno = self.paramPay[kPARAM_CARDNUM];
//    NSString *cardpass = self.paramPay[kPARAM_CARDPASS];
//    NSString *channel = self.paramPay[kPARAM_CHANNEL];
    dict[kPARAM_PRICE] = @(_selected_num);
    dict[kPARAM_CARDNUM] = _cardNumField.text;
    dict[kPARAM_CARDPASS] = _cardSecField.text;
    dict[kPARAM_CHANNEL] = @(_type);
    
    [V_loading loadingInView:v loadingBlock:^{
        [[ThirdPartPayMgr getInstance] payWithParam:dict type:_actType];
    }];
}

- (CGFloat)setupPrices:(CGFloat)top
{
    NSArray *src = CARD_PRICES[_type];
    NSMutableArray *array = [NSMutableArray array];
    for (int i = 0; i < src.count; i++) {
        OPrice *o = [OPrice obj];
        o.num = [src[i] integerValue];
        o.priceTitle = [NSString stringWithFormat:@"%llu 元", o.num];
        [array addObject:o];
    }
    self.array_prices = array;
    
#if DEBUG
    if (!_array_prices.count) {
        NSMutableArray *array = [NSMutableArray array];
        for (int i = 0; i < 13; i++) {
            OPrice *o = [OPrice obj];
            o.num = i * 10;
            o.priceTitle = [NSString stringWithFormat:@"%llu 元", o.num];
            [array addObject:o];
        }
        self.array_prices = array;
    }
#endif
    
    for (UIView *v in _array_price_btns) {
        [v removeFromSuperview];
    }
    self.array_price_btns = [NSMutableArray array];
    
    int cnt = 3;
    
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        cnt = 5;
    }
    
    CGFloat left = 20,
    ftop = top,
    width = self.frame.size.width - 30,
    offset = 5, //(width - (w * 5)) / 6;
    w = (width - (offset * (cnt + 1))) / cnt,
    h = 22;
    
    for (int i = 0; i < _array_prices.count; i++) {
        
        OPrice *o = _array_prices[i];
        PriceBtn * btn = [PriceBtn btnWithSize:CGSizeMake(w, h) price:o];
        [btn addTarget:self action:@selector(btnPriceClicked:)];
        
        CGRect r = btn.frame;
        int c = i % cnt;
        int l = (i - c) / cnt;
        r.origin.x = left + (c * (w + offset));
        ftop = top + (l * (h + offset));
        r.origin.y = ftop;
        
        btn.frame = r;
        
        [_contentScroll addSubview:btn];
        [_array_price_btns addObject:btn];
    }
    
    //set default
    [(PriceBtn *)_array_price_btns[0] setSelected:true];
    
    _selected_num = [_array_price_btns[0] price].num;
    _topLabel.text = [LabelAttr textFromString:[NSString stringWithFormat:@"%@%llu元", CURRENT_PAY, [_array_price_btns[0] price].num]
                                          type:AttrTypeGamecardTitle];
    
    return ftop;
}

- (void)dealloc {
    [_paramInfo release], _paramInfo = nil;
    [_array_prices release], _array_prices = nil;
    [_contentScroll release], _contentScroll = nil;
    
    [_topLabel release], _topLabel = nil;
    [_cardNumField release], _cardNumField = nil;
    [_cardSecField release], _cardSecField = nil;
    [_btnBuy release], _btnBuy = nil;
    
    [_bottomLabel release], _bottomLabel = nil;
    [_bottomLabel_pad release], _bottomLabel_pad = nil;
    [_viewCardNum release], _viewCardNum = nil;
    [_viewCardPass release], _viewCardPass = nil;
    [_imgCardNum release], _imgCardNum = nil;
    [_imgCardPass release], _imgCardPass = nil;
    [_zifeiLabel release], _zifeiLabel = nil;
    [super dealloc];
}
@end
