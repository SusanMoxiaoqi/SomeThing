//
//  BtnContent.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 31/3/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "RightContent.h"

@implementation OAct

+ (instancetype)obj
{
    return [[[OAct alloc] init] autorelease];
}

- (void)dealloc
{
    [_name release], _name = nil;
    [super dealloc];
}

@end

@interface RightContent ()

@end

@implementation RightContent

+ (instancetype)viewWithNib:(NSString *)nib
{
    NSArray* arr = [[NSBundle mainBundle] loadNibNamed:nib owner:nib options:nil];
    
    RightContent *ret = nil;
    for (UIView * v in arr) {
        if ([v isKindOfClass:[self class]]) {
            ret = (RightContent *)v;
            break;
        }
    }
    
    ret.actions = [NSMutableDictionary dictionary];
    return (id)ret;
}

- (void)layoutSubviews
{
    if (!CGRectEqualToRect(self.frame, self.superview.bounds)) {
        self.frame = self.superview.bounds;
    }
    
    [super layoutSubviews];
}

- (void)addTarget:(id)target selector:(SEL)sel actionType:(EActType)actType
{
    NSString *act = ACT_TYPES[actType];
    
    OAct *o = [OAct obj];
    o.target = target;
    o.selector = sel;
    o.name = act;
    o.type = actType;
    
    _actions[act] = o;
}

- (void)addTarget:(id)target selector:(SEL)sel action:(NSString *)act
{
    EActType actType = (EActType)[ACT_TYPES indexOfObject:act];
    
    OAct *o = [OAct obj];
    o.target = target;
    o.selector = sel;
    o.name = act;
    o.type = actType;
    
    _actions[act] = o;
}

- (BOOL)callWithType:(EActType)actType
{
    BOOL success = false;
    
    NSString *act = ACT_TYPES[actType];
    if (!act.length) {
        return success;
    }

    OAct *o = self.actions[act];
    if (o.target) {
        if ([o.target respondsToSelector:o.selector]) {
            [o.target performSelector:o.selector withObject:o];
            success = true;
        }
    }
    
    return success;
}

- (BOOL)callWithAction:(NSString *)act
{
    BOOL success = false;
    
    if (!act.length) {
        return success;
    }
    
    OAct *o = self.actions[act];
    if (o.target) {
        if ([o.target respondsToSelector:o.selector]) {
            [o.target performSelector:o.selector withObject:o];
            success = true;
        }
    }
    
    return success;
}

@end
