//
//  PurchaseTypeCell.h
//  PurchaseSdkTest
//
//  Created by darklinden on 3/30/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "definition.h"

@interface PurchaseTypeCell : UITableViewCell
@property (nonatomic, assign) NSString *title;

+ (instancetype)cell;
@end
