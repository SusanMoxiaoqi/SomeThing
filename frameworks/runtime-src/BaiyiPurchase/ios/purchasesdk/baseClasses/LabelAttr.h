//
//  LabelAttr.h
//  PurchaseSdkTest
//
//  Created by HanShaokun on 1/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import <UIKit/UIKit.h>

#define PRODUCT_NAME    @"商品名称："
#define PAY_AMOUNT      @"应付金额："
#define CURRENT_PAY     @"本次支付金额："

typedef enum : NSInteger {
    AttrTypeLeftListTitle,
    AttrTypeGamecardTitle
} AttrType;

@interface LabelAttr : UIView

@property (nonatomic, retain) NSAttributedString *text;

+ (NSAttributedString *)textFromString:(NSString*)str type:(AttrType)type;

@end
