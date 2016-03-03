//
//  UnionpayMgr.m
//  test
//
//  Created by darklinden on 3/7/15.
//
//

#import "CardMgr.h"
#import "AESTool.h"
#import "ThirdPartPayMgr.h"

@interface CardMgr ()

@end

@implementation CardMgr

- (void)pay:(NSDictionary *)param completion:(ThirdPartPayCallback)completion
{
    [super pay:param completion:completion];
    
    NSString *orderId = self.paramPay[kPARAM_ORDERID];
    NSString *userid = self.paramPay[kPARAM_USERID];
    NSString *cardno = self.paramPay[kPARAM_CARDNUM];
    NSString *cardpass = self.paramPay[kPARAM_CARDPASS];
    NSInteger channel = [self.paramPay[kPARAM_CHANNEL] integerValue];
    NSString *price = self.paramPay[kPARAM_PRICE];
    
    NSString* surl = [NSString stringWithFormat:OPENURL_CARD, [ThirdPartPayMgr getDefaultHostPrefix]];
    NSMutableURLRequest *req = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:surl]
                                                       cachePolicy:NSURLRequestReloadIgnoringCacheData
                                                   timeoutInterval:DEFAULT_HTTP_REQUEST_TIME_OUT];
    
    [req addValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"Content-Type"];
    
    [req setHTTPMethod:@"POST"];
    
    //@"data:useid=%@&orderid=%@&detailid=%d&paymoney=%@&paycardno=%@&paycardpwd=%@"
    NSString *senddata = [NSString stringWithFormat:STRDATA_CARD, userid, orderId, (long)channel, price, cardno, cardpass];
    NSString *key = [orderId stringByAppendingString:userid];
    
    key = [AESTool getMd5_16Bit_String:key];
    
    NSString *encrypt = [AESTool encryptData:senddata withKey:key];
    
    NSString *formated = [NSString stringWithFormat:STRDATA_CARD_DATA, orderId, encrypt];
    
    [req setHTTPBody:[formated dataUsingEncoding:NSUTF8StringEncoding]];
    
    NSError *error = nil;
    NSURLResponse *response = nil;
    NSData *data = [NSURLConnection sendSynchronousRequest:req
                                         returningResponse:&response
                                                     error:&error];
    
    NSString *result = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    
    NSLog(@"\nfunction: %s\nline: %d\nresponse json: \n%@", __FUNCTION__, __LINE__, result);
    
    //去除头尾空格回车
    result = [result stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
    
    //去除bom头
    NSRange r = [result rangeOfString:@"{"];
    if (r.location != NSNotFound) {
        result = [result substringFromIndex:r.location];
    }
    
    NSData *jsondata = [result dataUsingEncoding:NSUTF8StringEncoding];
    
    NSError *err = nil;
    id jsonObj = [NSJSONSerialization JSONObjectWithData:jsondata options:NSJSONReadingAllowFragments error:&err];
    
    if (!jsonObj || err) {
        NSLog(@"\nfunction: %s\nline: %d\nerror: %@\n", __FUNCTION__, __LINE__, err.description);
        [self payEnd:@"" errCode:eFailed msg:LOCALSTR_PAYMENT_FAILED];
        return;
    }
    
    bool success = false;
    
    do {
        NSString *status = jsonObj[@"status"];
        
        BREAK_IF(!status);
        
        BREAK_IF(![status isEqualToString:@"success"]);
        
        NSString *msg = jsonObj[@"msg"];
        
        if (msg.length) {
            [self payEnd:orderId errCode:eSuccess msg:msg];
        }
        else {
            [self payEnd:orderId errCode:eSuccess msg:LOCALSTR_PAYMENT_SUCCESS];
        }
        
        success = true;
        
    } while (false);
    
    if (!success) {
        [self payEnd:orderId errCode:eFailed msg:LOCALSTR_PAYMENT_FAILED];
    }
    
}


@end
