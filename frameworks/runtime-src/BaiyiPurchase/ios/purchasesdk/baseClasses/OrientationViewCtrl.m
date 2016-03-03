//
//  OrientationViewCtrl.m
//  PurchaseSdkTest
//
//  Created by darklinden on 3/30/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "OrientationViewCtrl.h"

@interface OrientationViewCtrl ()

@end

@implementation OrientationViewCtrl

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0) {
        self.automaticallyAdjustsScrollViewInsets = NO;
    }
    
    [self adjustFrameForLanscape];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    
    [[UIApplication sharedApplication] setStatusBarHidden:false];
    
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.f) {
        [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent];
    }
    else {
        [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDefault];
    }
}

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    
    [[UIApplication sharedApplication] setStatusBarHidden:true];
}

#pragma mark - orientation
- (void)adjustFrameForLanscape
{
    CGRect r = [[UIScreen mainScreen] bounds];
    
    if (r.size.width < r.size.height) {
        CGFloat tmp = r.size.height;
        r.size.height = r.size.width;
        r.size.width = tmp;
    }
    
    self.view.frame = r;
}

- (BOOL)shouldAutorotate
{
    return true;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation
{
    if (UIInterfaceOrientationIsLandscape(toInterfaceOrientation)) {
        return true;
    }
    else {
        return false;
    }
}

- (NSUInteger)supportedInterfaceOrientations
{
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 6.f) {
        return UIInterfaceOrientationMaskLandscape;
    }
    else {
        return 0;
    }
}

//- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation
//{
//    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 6.f) {
//        return UIInterfaceOrientationLandscapeRight;
//    }
//    else {
//        return 0;
//    }
//}

- (NSUInteger)navigationControllerSupportedInterfaceOrientations:(UINavigationController *)navigationController
{
    if ([navigationController isEqual:self.navigationController]) {
        if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 6.f) {
            return UIInterfaceOrientationMaskLandscape;
        }
    }
    
    return 0;
}

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation
{
    //    [self adjustFrameForLanscape];
}

- (UIStatusBarStyle)preferredStatusBarStyle
{
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.f) {
        return UIStatusBarStyleLightContent;
    }
    else {
        return UIStatusBarStyleDefault;
    }
}

- (BOOL)prefersStatusBarHidden
{
    return false;
}

@end
