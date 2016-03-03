//
//  PurchaseTypeList.h
//  PurchaseSdkTest
//
//  Created by darklinden on 3/30/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface PurchaseTypeList : UITableView
@property (nonatomic, assign) id target;
@property (nonatomic, assign) SEL selector;

@property (retain, nonatomic) NSArray *arrayTypes;

+ (instancetype)list:(NSArray *)types;

- (void)addTarget:(id)target selector:(SEL)selector;

- (void)selectCell:(NSIndexPath*)index;

@end
