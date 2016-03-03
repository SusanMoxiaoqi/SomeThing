//
//  CustomAlert.h
//  PurchaseSdkTest
//
//  Created by HanShaokun on 2/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import <UIKit/UIKit.h>

#define ANIMATE_TIME_DURATION 0.2

typedef enum : int32_t {
    eAlertInfo = 0,
    eAlertQuestion = 1,
    eAlertError = 2
} CustomAlertType;

typedef void (^CustomAlertCallback)(BOOL yes);

@interface CustomAlert : UIView

+ (BOOL)alertTitle:(NSString *)title //currently not support
           message:(NSString *)message
              type:(CustomAlertType)type
            inView:(UIView *)view
        completion:(CustomAlertCallback)completion;
+ (void)removeAlert;

@end
