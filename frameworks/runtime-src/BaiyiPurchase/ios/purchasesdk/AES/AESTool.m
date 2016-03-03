//
//  AESTool.m
//  WhyAes
//
//  Created by why on 6/19/14.
//  Copyright (c) 2014 why. All rights reserved.
//

#import "AesTool.h"
#import "FBEncryptorAES.h"
#import "GTMBase64.h"
#import <CommonCrypto/CommonDigest.h>

@implementation AESTool


+(NSString*)encryptData:(NSString *)data withKey:(NSString *)key
{
    NSData *data_aes = [FBEncryptorAES encryptData:[data dataUsingEncoding:NSUTF8StringEncoding]
                                               key:[key dataUsingEncoding:NSASCIIStringEncoding]];
    
    return [NSString stringWithFormat:@"%@",[GTMBase64 stringByEncodingData:data_aes]];
    
}




+(NSString*)decryptData:(NSString *)data withKey:(NSString *)key
{
    NSData *data_dec = [FBEncryptorAES decryptData:[GTMBase64 decodeString:data]
                                               key:[key dataUsingEncoding:NSASCIIStringEncoding]];
    
    return [[NSString alloc]initWithData:data_dec encoding:NSUTF8StringEncoding];
    
}

//32位MD5加密方式

+ (NSString *)getMd5_32Bit_String:(NSString *)srcString {
    
    const char *cStr = [srcString UTF8String];
    
    unsigned char digest[CC_MD5_DIGEST_LENGTH];
    
    CC_MD5( cStr, (CC_LONG)strlen(cStr), digest );
    
    NSMutableString *result = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
    
    for(int i = 0; i < CC_MD5_DIGEST_LENGTH; i++)
        
        [result appendFormat:@"%02x", digest[i]];
    
    
    return result;
    
}

+ (NSString *)getMd5_16Bit_String:(NSString *)srcString {
    
    //提取32位MD5散列的中间16位
    
    NSString *md5_32Bit_String = [self getMd5_32Bit_String:srcString];
    
    NSString *result = [[md5_32Bit_String substringToIndex:24] substringFromIndex:8];//即9～25位
    
    return result;
    
}

@end
