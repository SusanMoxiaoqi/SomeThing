//
//  UIScrollView+ScrollerAdditions.h
//
//  Created by Stefan Ceriu on 14/06/2013.
//  Copyright (c) 2013 Stefan Ceriu. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIScrollView (ScrollerAdditions)

@property (nonatomic, readonly) UIImageView *verticalScroller;
@property (nonatomic, readonly) UIImageView *horizontalScroller;

- (void)setAlwaysShowScrollIndicators:(BOOL)alwaysVisible;

- (void)setVerticalScrollerTintColor:(UIColor*)color;
- (void)setHorizontalScrollerTintColor:(UIColor*)color;

@end
