//
//  PurchaseTypeList.m
//  PurchaseSdkTest
//
//  Created by darklinden on 3/30/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "PurchaseTypeList.h"
#import "PurchaseTypeCell.h"

@interface PurchaseTypeList () <UITableViewDataSource, UITableViewDelegate>

@end

@implementation PurchaseTypeList

+ (instancetype)list:(NSArray *)types
{
    PurchaseTypeList* list = [[PurchaseTypeList alloc] initWithFrame:CGRectZero style:UITableViewStylePlain];
    list.delegate = list;
    list.dataSource = list;
    
    list.layer.masksToBounds = true;
    
    list.backgroundColor = [UIColor clearColor];
    list.separatorColor = [UIColor clearColor];
    
    UIView *v = [[[UIView alloc] init] autorelease];
    v.backgroundColor = [UIColor clearColor];
    list.backgroundView = v;
    
    list.arrayTypes = types;
    
    return list;
}

- (void)dealloc
{
    [_arrayTypes release], _arrayTypes = nil;
    [super dealloc];
}

- (void)didMoveToSuperview
{
    [super didMoveToSuperview];
//    self.frame = self.superview.bounds;
//    
#if DEBUG
    if (!_arrayTypes.count) {
        self.arrayTypes = @[@"1", @"2", @"3", @"4", @"5"];
    }
#endif
}

- (void)addTarget:(id)target selector:(SEL)selector
{
    self.target = target;
    self.selector = selector;
}

- (NSInteger)numberOfRowsInSection:(NSInteger)section
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return _arrayTypes.count;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return 42.f;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    PurchaseTypeCell* cell = [tableView dequeueReusableCellWithIdentifier:PurchaseTypeCellDequeueId];

    if (!cell) {
        cell = [PurchaseTypeCell cell];
        cell.backgroundColor = [UIColor clearColor];
    }
    
    if (indexPath.row < _arrayTypes.count) {
        cell.title = CARDTYPE_NAME[[_arrayTypes[indexPath.row] integerValue]];
    }
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (indexPath.row < _arrayTypes.count) {
        NSNumber *type = _arrayTypes[indexPath.row];
        if (_target) {
            if ([_target respondsToSelector:_selector]) {
                [_target performSelector:_selector withObject:type];
            }
        }
    }
}

- (void)selectCell:(NSIndexPath *)index
{
//    PurchaseTypeCell *cell = (PurchaseTypeCell *)[self cellForRowAtIndexPath:index];
    [self selectRowAtIndexPath:index animated:true scrollPosition:UITableViewScrollPositionTop];
}

@end
