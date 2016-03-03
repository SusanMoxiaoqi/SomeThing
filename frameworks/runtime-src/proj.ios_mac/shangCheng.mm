//
//  shangCheng.m
//  OCJS
//
//  Created by 百易科技 on 15/5/5.
//
//

#import "shangCheng.h"
#import "UMSocial.h"
#import "netWork.h"
@implementation shangCheng

static __strong shangCheng * AshangCheng = nil;
static __strong NSString  * USER_dwUserID = nil;
+(shangCheng *)deDaoEaglView : (CCEAGLView *)egvl
{
    if (!AshangCheng) {
        AshangCheng = [shangCheng new];
        AshangCheng.MyEaglView = egvl;
        UIActivityIndicatorView * activity = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
        activity.color = [UIColor redColor];
        AshangCheng.MyActivity = activity;

        return AshangCheng;
          }else{
        return AshangCheng;
          };
}
+(BOOL)CreatGongGaoWebviewWithURL : (NSString*)NOTICEURL{
    shangCheng * shang = [shangCheng deDaoEaglView:nil];
    shang.imageView = nil;
    CCEAGLView * egvl = shang.MyEaglView;
    CGFloat x = (236.500/1136.00)*(egvl.bounds.size.width);
    CGFloat y = (141.500/640.00)*(egvl.bounds.size.height);
    CGFloat width = (668.00/1136.00)*(egvl.bounds.size.width);
    CGFloat height = (390.00/640.00)*(egvl.bounds.size.height);
    UIWebView * webView = [[UIWebView alloc] initWithFrame:CGRectMake(x, y, width, height)];
    NSLog(@"egvl.bounds = %f,%f,%f,%f",egvl.bounds.origin.x,egvl.bounds.origin.y,egvl.bounds.size.width,egvl.bounds.size.height);
    shang.noticeWebView = webView;
    webView.delegate = AshangCheng;
    NSURLRequest *request =[NSURLRequest requestWithURL:[NSURL URLWithString:NOTICEURL]];
    [egvl addSubview: webView];
    [webView loadRequest:request];
    
    CGRect rx =webView.bounds;
    shang.MyActivity.center = CGPointMake(rx.size.width/2, rx.size.height/2);
    [webView addSubview:shang.MyActivity];
    [webView release];
    return true;
}
+(BOOL)removeGongGaoWebView{
    shangCheng * shang = [shangCheng deDaoEaglView:nil];
    [shang.noticeWebView removeFromSuperview];
    return true;
}
+(BOOL)CreatShangChengWebViewWithURL : (NSString *)SHOPURL{
    NSLog(@"ios%@",SHOPURL);
    shangCheng * shang = [shangCheng deDaoEaglView:nil];
    CCEAGLView * egvl = shang.MyEaglView;
    
    
    UIWebView * webView = [[UIWebView alloc] initWithFrame:egvl.bounds];
    shang.MyWebView = webView;
    webView.delegate = AshangCheng;
    NSURLRequest *request =[NSURLRequest requestWithURL:[NSURL URLWithString:SHOPURL]];
    [egvl addSubview: webView];
    [webView loadRequest:request];
    
    
    UIImage * image = [UIImage imageNamed:@"res/shz/webView/webViewBg_ios.png"];
    UIImageView * imageView = [[UIImageView alloc]initWithImage:image];
    [imageView setUserInteractionEnabled:NO];
    [imageView setFrame:egvl.bounds];
    
   // [imageView.layer setZPosition:2];
    [webView addSubview:imageView];
    shang.imageView = imageView;
    NSLog(@"%f,%f,%f,%f",egvl.bounds.origin.x,egvl.bounds.origin.y,egvl.bounds.size.width,egvl.bounds.size.height);
    UIButton *btn1=[[UIButton alloc] init]; // 创建一个控件
    btn1.frame=CGRectMake(0, 0, 40, 37.5); // 设置控件的位置，大小
    [btn1 setBackgroundImage:[UIImage imageNamed:@"res/shz/webView/webViewBack_ios.png"] forState:UIControlStateNormal];
    [btn1.layer setZPosition:3];
    [btn1 addTarget:self action:@selector(webViewBack:) forControlEvents:UIControlEventTouchUpInside]; // 添加监听
    [imageView addSubview:btn1]; // 添加入父控件
//
   
    
    CGRect rx =[UIScreen mainScreen].bounds;
    shang.MyActivity.center = CGPointMake(rx.size.width/2, rx.size.height/2);
    [webView addSubview:shang.MyActivity];
    [webView release];
    return YES;
}
+(void)webViewBack:(UIButton *)sender{
    NSLog(@"1234567890-");
    shangCheng * shang = [shangCheng deDaoEaglView:nil];
    [shang.MyWebView removeFromSuperview];
}
+(BOOL)weiXinFenXiangJieTu : (NSString *) jietupath andImageName : (NSString *)fileName{
    NSLog(@"diaoyong%@,%@",jietupath,fileName);
    shangCheng * shang = [shangCheng deDaoEaglView:nil];
    [shang.rootController weiXinSendLinkContent : jietupath andName : fileName];
    return YES;
}
+(BOOL)qqFenXiangJieTu : (NSString *) jietupath andImageName : (NSString *)fileName{
    NSLog(@"diaoyong%@,%@",jietupath,fileName);
    shangCheng * shang = [shangCheng deDaoEaglView:nil];
    [shang.rootController qqSendLinkContent : jietupath andName : fileName];
    return YES;
}
+(BOOL)weiboFenXiangJieTu : (NSString *) jietupath andImageName : (NSString *)fileName{
    NSLog(@"diaoyong%@,%@",jietupath,fileName);
    shangCheng * shang = [shangCheng deDaoEaglView:nil];
    [shang.rootController weiboSendLinkContent : jietupath andName : fileName];
    return YES;
}

+(void)keFuDianHua : (NSString *)PhoneNumber{
    shangCheng * shang = [shangCheng deDaoEaglView:nil];
    CCEAGLView * egvl = shang.MyEaglView;
    NSMutableString * str=[[NSMutableString alloc] initWithFormat:@"tel:%@",PhoneNumber];
    UIWebView * callWebview = [[UIWebView alloc] init];
    [callWebview loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:str]]];
    [egvl addSubview:callWebview];
    [callWebview release];
    [str release];
}
+(NSString *)screenShot : (NSString *)fileName andUserID : (NSString *)UserId{
    [USER_dwUserID release], USER_dwUserID = nil;
    USER_dwUserID = [UserId copy];
    shangCheng * shang = [shangCheng deDaoEaglView:nil];
    CCEAGLView * egvl = shang.MyEaglView;
    
    CGSize size = egvl.bounds.size;
    if(UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad){
        UIGraphicsBeginImageContextWithOptions(size, NO, 0.4);
    }else{
        UIGraphicsBeginImageContextWithOptions(size, NO, 0.9);
    }
    
    CGRect rec = CGRectMake(egvl.frame.origin.x, egvl.frame.origin.y, egvl.bounds.size.width, egvl.bounds.size.height);
    [egvl drawViewHierarchyInRect:rec afterScreenUpdates:YES];
    
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    NSData * data = UIImagePNGRepresentation(image);
    
    NSArray *path = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *filePath = [[path objectAtIndex:0] stringByAppendingPathComponent:fileName];
     NSLog(@"%@",filePath);
    BOOL result =[data writeToFile:filePath atomically:YES];
    return filePath;
}
+(void)notifyServerThroughWeb : (NSString *)typeId;//typeID：101qq，102微信，103微博
{
    NSLog(@"userid = %@",USER_dwUserID);
        NSData * datasource = [[NSString stringWithFormat:@"admincode=106&userid=%@&typeid=%@&kindid=203",USER_dwUserID,typeId] dataUsingEncoding:NSUTF8StringEncoding];
        NSURL * url = [NSURL URLWithString:[NSString stringWithFormat:@"http://m1-api.baiyishuihu.com/UserInsurerecord/setinsurerecord?"]];
   // NSURL * url = [NSURL URLWithString:[NSString stringWithFormat:@"http://172.16.10.76:8081"]];
        NSMutableURLRequest *reqest = [NSMutableURLRequest requestWithURL:url];
        [reqest setHTTPMethod:@"POST"];
        [reqest setHTTPBody:datasource];
        [reqest setValue:[NSString stringWithFormat:@"%lu",(unsigned long)datasource.length] forHTTPHeaderField:@"Content-Length"];
        NSOperationQueue * quene = [NSOperationQueue mainQueue];
        [NSURLConnection sendAsynchronousRequest:reqest queue:quene completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
            NSLog(@"MMmMMMMMMMMMMMMMMMMMWWWWWWWWWWWWWWWWWWW");
            
        }];
}
+(BOOL)iosFuZhiJianTieBan:(NSString * )copyString{
    UIPasteboard * board = [UIPasteboard generalPasteboard];
//    NSString * yy = copyString
    board.string = copyString;
    NSLog(@"#########%@",copyString);
     NSLog(@"1111111:%@",board.string);
    return true;
    
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSURL * URL = request.mainDocumentURL;
    shangCheng * shang = [shangCheng deDaoEaglView:nil];    
    if ([URL.absoluteString  isEqual: @"item:back"]) {
        [shang.MyWebView removeFromSuperview];
        return NO;
    };
    //[shang.imageView.layer setZPosition:0];
    [shang.MyActivity startAnimating];
    return YES;
}
- (void)webViewDidStartLoad:(UIWebView *)webView
{
}
- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    shangCheng * shang = [shangCheng deDaoEaglView:nil];
    [shang.MyActivity stopAnimating];
    if (shang.imageView) {
        [shang.imageView setHidden:YES];
    }
    
}
- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    NSLog(@"webView错误信息%@",error.localizedDescription);
}
@end
