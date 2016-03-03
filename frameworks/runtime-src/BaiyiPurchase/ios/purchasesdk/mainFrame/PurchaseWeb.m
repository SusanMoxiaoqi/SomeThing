//
//  PurchaseWeb.m
//  PurchaseSdkTest
//
//  Created by HanShaokun on 2/4/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "PurchaseWeb.h"
#import "ThirdPartPayMgr.h"
#import "V_loading.h"

@interface PurchaseWeb () <UIWebViewDelegate>
@property (nonatomic, assign) BOOL lastFaile;
@end

@implementation PurchaseWeb

_INSTANCE_IMPL_(PurchaseWeb);

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.webView.hidden = NO;
    [self.webView setDelegate:self];
    [self.webView loadRequest:[NSURLRequest requestWithURL:_url cachePolicy:NSURLRequestReloadIgnoringCacheData timeoutInterval:DEFAULT_HTTP_REQUEST_TIME_OUT]];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    
    if ([self.webView.request.URL isEqual:self.url]) {
        if (_lastFaile) {
            [self.webView reload];
        }
    }
    else {
        [self.webView loadRequest:[NSURLRequest requestWithURL:_url cachePolicy:NSURLRequestReloadIgnoringCacheData timeoutInterval:DEFAULT_HTTP_REQUEST_TIME_OUT]];
    }
    
}

- (void)back
{
    if (self.navigationController.viewControllers.count > 1) {
        [self.navigationController popViewControllerAnimated:true];
    }
}

- (void)close
{
    [[ThirdPartPayMgr getInstance] payEnd:self.paramInfo[kPARAM_ORDERID]
                                  errCode:eUnknown
                                      msg:nil];
}

- (void)dealloc
{
    [_url release], _url = nil;
    [super dealloc];
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSLog(@"%@ %ld", webView.request.URL, (long)navigationType);
    [V_loading showLoadingView:webView];
    return true;
}

- (void)webViewDidStartLoad:(UIWebView *)webView
{
    
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    [V_loading removeLoadingInView:webView];
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    _lastFaile = true;
    [V_loading removeLoadingInView:webView];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
