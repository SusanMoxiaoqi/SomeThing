//
//  BtnContent.h
//  PurchaseSdkTest
//
//  Created by HanShaokun on 31/3/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "definition.h"

@interface OAct : NSObject
@property (nonatomic, assign) id target;
@property (nonatomic, assign) SEL selector;
@property (nonatomic, retain) NSString* name;
@property (nonatomic, assign) EActType type;

+ (instancetype)obj;

@end

@interface RightContent : UIView
@property (nonatomic, retain) NSMutableDictionary *actions;

+ (instancetype)viewWithNib:(NSString *)nib;
- (void)addTarget:(id)target selector:(SEL)sel actionType:(EActType)actType;
- (void)addTarget:(id)target selector:(SEL)sel action:(NSString *)act;

- (BOOL)callWithType:(EActType)actType;
- (BOOL)callWithAction:(NSString*)act;

@end
