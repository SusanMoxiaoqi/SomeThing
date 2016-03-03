//
//  V_loading.h
//  iSafeBox4iPhone
//
//  Created by William.zhou on 18/05/2012.
//  Copyright (c) 2012 comcsoft.com. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

typedef void(^LoadingBlock)(void);

@interface V_loading : UIView

+ (void)showLoadingView:(UIView *)aView;

+ (void)removeLoadingInView:(UIView *)aView;

+ (void)removeAllLoading;

+ (void)loadingInView:(UIView *)aView
         loadingBlock:(LoadingBlock)workingBlock;

@end
