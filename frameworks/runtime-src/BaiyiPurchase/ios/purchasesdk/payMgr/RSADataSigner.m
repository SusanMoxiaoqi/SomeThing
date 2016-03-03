//
//  RSADataSigner.m
//  SafepayService
//
//  Created by wenbi on 11-4-11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import "RSADataSigner.h"
#include <openssl/evp.h>
#import <openssl/rsa.h>
#include <openssl/pem.h>
#include <openssl/md5.h>
#include <openssl/bio.h>
#include <openssl/sha.h>

@implementation RSADataSigner

+ (NSString *)formatPrivateKey:(NSString *)privateKey
{
    const char *pstr = [privateKey UTF8String];
    NSUInteger len = [privateKey length];
    NSMutableString *result = [NSMutableString string];
    [result appendString:@"-----BEGIN PRIVATE KEY-----\n"];
    NSUInteger index = 0;
	NSUInteger count = 0;
    while (index < len) {
        char ch = pstr[index];
		if (ch == '\r' || ch == '\n') {
			++index;
			continue;
		}
        [result appendFormat:@"%c", ch];
        if (++count == 79)
        {
            [result appendString:@"\n"];
			count = 0;
        }
        index++;
    }
    
    [result appendString:@"\n-----END PRIVATE KEY-----"];
    return result;
}

+ (NSString*)base64StringFromData:(NSData*)signature
{
    NSUInteger signatureLength = [signature length];
    unsigned char *outputBuffer = (unsigned char *)malloc(2 * 4 * (signatureLength / 3 + 1));
    int outputLength = EVP_EncodeBlock(outputBuffer, [signature bytes], (int)signatureLength);
    outputBuffer[outputLength] = '\0';
    NSString *base64String = [NSString stringWithCString:(char *)outputBuffer encoding:NSASCIIStringEncoding];
    free(outputBuffer);
    return base64String;
}

int rsa_sign_with_private_key_pem(char *message, int message_length
                                  , unsigned char *signature, unsigned int *signature_length
                                  , char *private_key_file_path)
{
    unsigned char sha1[20];
    SHA1((unsigned char *)message, message_length, sha1);
    int success = 0;
    BIO *bio_private = NULL;
    RSA *rsa_private = NULL;
    bio_private = BIO_new(BIO_s_file());
    BIO_read_filename(bio_private, private_key_file_path);
    rsa_private = PEM_read_bio_RSAPrivateKey(bio_private, NULL, NULL, "");
    if (rsa_private != nil) {
        if (1 == RSA_check_key(rsa_private))
        {
            int rsa_sign_valid = RSA_sign(NID_sha1
                                          , sha1, 20
                                          , signature, signature_length
                                          , rsa_private);
            if (1 == rsa_sign_valid)
            {
                success = 1;
            }
        }
        BIO_free_all(bio_private);
    }
    else {
        NSLog(@"rsa_private read error : private key is NULL");
    }
    
    return success;
}

//该签名方法仅供参考,外部商户可用自己方法替换
+ (NSString *)signString:(NSString *)string withKey:(NSString *)privateKey {
	
	//在Document文件夹下创建私钥文件
	NSString *signedString = nil;
	NSString *documentPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, true) objectAtIndex:0];
	NSString *path = [documentPath stringByAppendingPathComponent:@"AlixPay-RSAPrivateKey"];
	
	//
	// 把密钥写入文件
	//
	NSString *formatKey = [self formatPrivateKey:privateKey];
	[formatKey writeToFile:path atomically:true encoding:NSUTF8StringEncoding error:nil];
	
	const char *message = [string cStringUsingEncoding:NSUTF8StringEncoding];
    NSUInteger messageLength = strlen(message);
    unsigned char *sig = (unsigned char *)malloc(256);
	unsigned int sig_len;
    int ret = rsa_sign_with_private_key_pem((char *)message, (int)messageLength, sig, &sig_len, (char *)[path UTF8String]);
    
	//签名成功,需要给签名字符串base64编码和UrlEncode,该两个方法也可以根据情况替换为自己函数
    if (ret == 1) {
        NSString *base64String = [self base64StringFromData:[NSData dataWithBytes:sig length:sig_len]];
        
        signedString = (NSString*)CFURLCreateStringByAddingPercentEscapes(kCFAllocatorDefault,
                                                                          (CFStringRef)base64String,
                                                                          NULL,
                                                                          (CFStringRef)@"!*'();:@&=+$,/?%#[]",
                                                                          kCFStringEncodingUTF8);
    }
	
	free(sig);
    return signedString;
}

@end
