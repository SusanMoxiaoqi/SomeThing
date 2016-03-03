//
//  V_loading.m
//  iSafeBox4iPhone
//
//  Created by William.zhou on 18/05/2012.
//  Copyright (c) 2012 comcsoft.com. All rights reserved.
//

#import "V_loading.h"
#import <QuartzCore/QuartzCore.h>

#pragma mark - V_loading private property

@interface V_loading ()

@property (strong, nonatomic) UIView        *pV_content;
@property (unsafe_unretained) LoadingBlock  block_loading;

- (void)doRunBlock;

@end

#pragma mark - O_loading_mgr private property

@interface O_loading_mgr : NSObject
@property (nonatomic, retain) NSMutableArray *loadings;

+ (O_loading_mgr *)shared_mgr;

- (void)removeLoadingView:(UIView *)aView;

- (void)showLoadingView:(UIView *)aView;

- (void)removeAllLoading;

- (void)loadingInView:(UIView *)aView
         loadingBlock:(LoadingBlock)workingBlock;

@end

#pragma mark - O_loading_mgr private property

@implementation O_loading_mgr

+ (O_loading_mgr *)shared_mgr
{
    __strong static O_loading_mgr *pO_loading_mgr = nil;
    if (!pO_loading_mgr) {
        pO_loading_mgr = [[O_loading_mgr alloc] init];
        pO_loading_mgr.loadings = [NSMutableArray array];
    }
    return pO_loading_mgr;
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

- (void)showLoadingWithDictionary:(NSDictionary *)dict
{
    UIView *aView = [dict objectForKey:@"aView"];
    [self showLoadingInView:aView];
}

- (void)showLoadingWithDictionaryAndBlock:(NSDictionary *)dict
{
    UIView *aView = [dict objectForKey:@"aView"];
    void(^workingBlock)() = [dict objectForKey:@"workingBlock"];
    V_loading *pV_loading = [self showLoadingInView:aView];
    pV_loading.block_loading = workingBlock;
    [pV_loading performSelector:@selector(doRunBlock)
                     withObject:nil
                     afterDelay:0.1f];
}

- (V_loading *)showLoadingInView:(UIView *)aView {
    
    [self removeLoadingView:aView];
    
    UIView *parentView = aView;
    if (!parentView) parentView = [[[[[UIApplication sharedApplication] delegate] window] rootViewController] view];
    
    V_loading *pV_loading = [[V_loading alloc] init];
    pV_loading.backgroundColor = [UIColor colorWithWhite:0.f alpha:0.3f];
    
    UIActivityIndicatorView *pV_indicator = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
    [pV_indicator startAnimating];
    
    [pV_loading addSubview:pV_indicator];
    pV_loading.pV_content = pV_indicator;
    
    [parentView addSubview:pV_loading];
    
    [_loadings addObject:pV_loading];
    [[UIApplication sharedApplication] setIdleTimerDisabled:YES];
    
    return pV_loading;
}

- (void)removeAllLoading_main
{
    for (V_loading *pV_loading in _loadings) {
        if (pV_loading.superview) {
            [pV_loading removeFromSuperview];
        }
    }
    
    [[UIApplication sharedApplication] setIdleTimerDisabled:NO];
}

- (void)removeLoadingView:(UIView *)aView
{
    NSUInteger cnt = 0;
    for (V_loading *pV_loading in _loadings) {
        if ([pV_loading.superview isEqual:aView]) {
            [pV_loading removeFromSuperview];
        }
        else {
            cnt++;
        }
    }
    
    if (cnt == 0) {
        [[UIApplication sharedApplication] setIdleTimerDisabled:NO];
    }
}

#pragma mark - pass function call

- (void)showLoadingView:(UIView *)aView
{
    if ([NSThread isMainThread]) {
        [self showLoadingInView:aView];
    }
    else {
        NSMutableDictionary *dict = [NSMutableDictionary dictionary];
        if (aView) {
            [dict setObject:aView forKey:@"aView"];
        }
        
        if ([NSThread isMainThread]) {
            [self showLoadingWithDictionary:dict];
        }
        else {
            [self performSelectorOnMainThread:@selector(showLoadingWithDictionary:)
                                  withObject:dict
                               waitUntilDone:NO];
        }
    }
}

- (void)removeAllLoading
{
    if ([NSThread isMainThread]) {
        [self removeAllLoading_main];
    }
    else {
        [self performSelectorOnMainThread:@selector(removeAllLoading_main)
                              withObject:nil
                           waitUntilDone:YES];
    }
}

- (void)loadingInView:(UIView *)aView
         loadingBlock:(LoadingBlock)workingBlock
{
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    if (aView) {
        [dict setObject:aView forKey:@"aView"];
    }
    
    if (workingBlock) {
        void (^handlerCopy)(NSURLResponse*, NSData*, NSError*) = [workingBlock copy];
        [dict setObject:handlerCopy forKey:@"workingBlock"];
    }
    
    if ([NSThread isMainThread]) {
        [self showLoadingWithDictionaryAndBlock:dict];
    }
    else {
        [self performSelectorOnMainThread:@selector(showLoadingWithDictionaryAndBlock:)
                              withObject:dict
                           waitUntilDone:YES];
    }
}

@end

@implementation V_loading {
    LoadingBlock _block_loading;
}

- (void)layoutSubviews
{
    if (!CGRectEqualToRect(self.frame, self.superview.bounds)) {
        self.frame = self.superview.bounds;
        self.pV_content.center = self.center;
    }
    
    [super layoutSubviews];
}

- (void)setBlock_loading:(LoadingBlock)block_loading
{
    _block_loading = block_loading;
}

- (LoadingBlock)block_loading
{
    return _block_loading;
}

- (void)doRunBlock
{
    if (_block_loading) {
        _block_loading();
    }
    
    [self performSelector:@selector(loadingDidEnd)
               withObject:nil
               afterDelay:0.1f];
}

- (void)loadingDidEnd
{
    _block_loading = nil;
    [[self class] removeLoadingInView:self.superview];
}

+ (void)showLoadingView:(UIView *)aView
{
    O_loading_mgr *mgr = [O_loading_mgr shared_mgr];
    [mgr showLoadingView:aView];
}

+ (void)removeLoadingInView:(UIView *)aView
{
    O_loading_mgr *mgr = [O_loading_mgr shared_mgr];
    [mgr removeLoadingView:aView];
}

+ (void)removeAllLoading
{
    O_loading_mgr *mgr = [O_loading_mgr shared_mgr];
    [mgr removeAllLoading];
}

+ (void)loadingInView:(UIView *)aView
         loadingBlock:(LoadingBlock)workingBlock
{
    O_loading_mgr *mgr = [O_loading_mgr shared_mgr];
    [mgr loadingInView:aView
          loadingBlock:workingBlock];
}

@end


