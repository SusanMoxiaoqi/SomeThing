//
//  GamecardContent.h
//  PurchaseSdkTest
//
//  Created by HanShaokun on 1/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "RightContent.h"

@interface OPrice : NSObject
@property (nonatomic, retain) NSString  *priceTitle;
@property (nonatomic, assign) uint64_t  num;

+ (instancetype)obj;

@end

@interface GamecardContent : RightContent
@property (nonatomic, assign) EActType actType;
@property (nonatomic, assign) CARDTYPE type;
@property (nonatomic, retain) NSDictionary *paramInfo;
@property (nonatomic, retain) NSArray *array_prices;

- (void)reloadContent;

- (void)keyboardWillShow:(NSNotification *)noti;
- (void)keyboardWillHide:(NSNotification *)noti;

@end
