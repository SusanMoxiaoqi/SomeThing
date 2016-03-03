//
//  PurchaseTypeCell.m
//  PurchaseSdkTest
//
//  Created by darklinden on 3/30/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "PurchaseTypeCell.h"

@interface PurchaseTypeCell ()
@property (retain, nonatomic) IBOutlet UILabel *labelTitle;


@end

@implementation PurchaseTypeCell

+ (instancetype)cell
{
    PurchaseTypeCell *cell = nil;
    NSArray *array = [[NSBundle mainBundle] loadNibNamed:@"PurchaseTypeCell" owner:nil options:nil];
    for (UIView *v in array) {
        if ([v isKindOfClass:[PurchaseTypeCell class]]) {
            cell = (PurchaseTypeCell *)v;
            break;
        }
    }
    
    return cell;
}

- (void)awakeFromNib {
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
    if (selected) {
        _labelTitle.textColor = PURCHASECELL_COLOR_FONT_SEL;
    }
    else {
        _labelTitle.textColor = PURCHASECELL_COLOR_FONT;
    }
}

- (void)dealloc {
    [_labelTitle release], _labelTitle = nil;
    [super dealloc];
}

- (void)setTitle:(NSString *)title
{
    _labelTitle.text = title;
}

- (NSString *)title
{
    return _labelTitle.text;
}

@end
