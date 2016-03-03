//
//  RSADataSigner.h
//  SafepayService
//
//  Created by wenbi on 11-4-11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface RSADataSigner : NSObject

+ (NSString *)signString:(NSString *)string withKey:(NSString *)privateKey;

@end
