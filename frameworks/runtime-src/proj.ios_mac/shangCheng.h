//
//  shangCheng.h
//  OCJS
//
//  Created by 百易科技 on 15/5/5.
//
//


#import <Foundation/Foundation.h>
#import "cocos2d.h"
#import "platform/ios/CCEAGLView-ios.h"
@class AppController;
@interface  shangCheng : NSObject<UIWebViewDelegate>{

}
@property(nonatomic,retain)CCEAGLView * MyEaglView;
@property(nonatomic,retain)UIWebView * MyWebView;
@property(nonatomic,retain)UIWebView * noticeWebView;
@property(nonatomic,retain)UIImageView * imageView;
@property(nonatomic,retain)AppController * rootController;
@property(nonatomic,retain)UIActivityIndicatorView * MyActivity;
+(shangCheng *)deDaoEaglView : (CCEAGLView *)egvl;
+(BOOL)CreatShangChengWebViewWithURL : (NSString *)SHOPURL;//创建商城的webView
+(BOOL)CreatGongGaoWebviewWithURL : (NSString*)NOTICEURL;//创建公告的webView
+(BOOL)removeGongGaoWebView;
+(NSString *)screenShot : (NSString *)fileName andUserID : (NSString *)UserId;//截屏
+(void)keFuDianHua : (NSString *)PhoneNumber;
+(void)notifyServerThroughWeb : (NSString *)typeId;

+(BOOL)weiXinFenXiangJieTu : (NSString *) jietupath andImageName : (NSString *)fileName;
+(BOOL)qqFenXiangJieTu : (NSString *) jietupath andImageName : (NSString *)fileName;
+(BOOL)weiboFenXiangJieTu : (NSString *) jietupath andImageName : (NSString *)fileName;
+(BOOL)iosFuZhiJianTieBan : (NSString *)copyString;

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType;
- (void)webViewDidStartLoad:(UIWebView *)webView;
- (void)webViewDidFinishLoad:(UIWebView *)webView;
- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error;
@end

