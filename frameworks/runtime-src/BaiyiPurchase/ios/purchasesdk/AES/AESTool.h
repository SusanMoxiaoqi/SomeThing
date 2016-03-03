//
//  AESTool.h
//  WhyAes
//
//  Created by why on 6/19/14.
//  Copyright (c) 2014 why. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AESTool : NSObject


+(NSString *)encryptData:(NSString*)data withKey:(NSString*)key;
+(NSString *)decryptData:(NSString*)data withKey:(NSString*)key;
+ (NSString *)getMd5_32Bit_String:(NSString *)srcString;
+ (NSString *)getMd5_16Bit_String:(NSString *)srcString;

@end
