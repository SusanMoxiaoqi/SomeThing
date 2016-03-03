//
//  LabelAttr.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 1/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "LabelAttr.h"
#import <CoreText/CoreText.h>

@implementation LabelAttr

- (void)dealloc {
    [_text release], _text = nil;
    [super dealloc];
}

// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
    
    if (_text.length) {
        CGContextRef context = UIGraphicsGetCurrentContext();
        
        // Flip the coordinate system
        CGContextSetTextMatrix(context, CGAffineTransformIdentity);
        CGContextTranslateCTM(context, 0, self.bounds.size.height);
        CGContextScaleCTM(context, 1.0, -1.0);
        
        // Create a path to render text in
        CGMutablePathRef path = CGPathCreateMutable();
        CGPathAddRect(path, NULL, self.bounds );
        
        // create the framesetter and render text
        CTFramesetterRef framesetter = CTFramesetterCreateWithAttributedString((CFAttributedStringRef)_text);
        CTFrameRef frame = CTFramesetterCreateFrame(framesetter,
                                                    CFRangeMake(0, [_text length]),
                                                    path,
                                                    NULL);
        
        CTFrameDraw(frame, context);
        
        // Clean up
        CFRelease(frame);
        CFRelease(path);
        CFRelease(framesetter);
    }
}

- (void)setText:(NSAttributedString *)text
{
    [_text release];
    _text = [text copy];
    [self setNeedsDisplay];
}

+ (NSAttributedString *)textFromString:(NSString *)str type:(AttrType)type
{
    NSMutableAttributedString *attr = [[[NSMutableAttributedString alloc] initWithString:str] autorelease];
    NSRange rall = NSMakeRange(0, str.length);
    UIFont *fon = [UIFont systemFontOfSize:1.f];
    NSString *fontName = fon.fontName;
    
    switch (type) {
        case AttrTypeLeftListTitle:
        {
            CGAffineTransform trans = CGAffineTransformIdentity;
            CTFontRef f = CTFontCreateWithName((CFStringRef)fontName, 11.f, &trans);
            [attr addAttribute:(NSString *)kCTFontAttributeName value:(id)f range:rall];
            
            NSRange ra = [str rangeOfString:PAY_AMOUNT];
            if (ra.location != NSNotFound) {
                NSRange ramount = NSMakeRange(ra.location + ra.length, str.length - (ra.location + ra.length));
                [attr addAttribute:(NSString *)kCTForegroundColorAttributeName value:(id)[UIColor redColor].CGColor range:ramount];
            }
        }
            break;
            case AttrTypeGamecardTitle:
        {
            CGAffineTransform trans = CGAffineTransformIdentity;
            CTFontRef f = CTFontCreateWithName((CFStringRef)fontName, 15.f, &trans);
            [attr addAttribute:(NSString *)kCTFontAttributeName value:(id)f range:rall];
            
            NSRange ra = [str rangeOfString:CURRENT_PAY];
            if (ra.location != NSNotFound) {
                NSRange ramount = NSMakeRange(ra.location + ra.length, str.length - (ra.location + ra.length));
                [attr addAttribute:(NSString *)kCTForegroundColorAttributeName value:(id)[UIColor redColor].CGColor range:ramount];
            }
        }
        default:
            break;
    }
    
    return attr;
}

@end
