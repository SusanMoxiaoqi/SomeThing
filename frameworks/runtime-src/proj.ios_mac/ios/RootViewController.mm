/****************************************************************************
 Copyright (c) 2010-2011 cocos2d-x.org
 Copyright (c) 2010      Ricardo Quesada
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#import "RootViewController.h"
#import "cocos2d.h"
#import "cocos2d_specifics.hpp"
#import "platform/ios/CCEAGLView-ios.h"
#include "ConfigParser.h"
NSMutableString * _isRunYaoYao;
NSMutableString * _isBurstAwardYaoYao;
@implementation RootViewController

/*
 // The designated initializer.  Override if you create the controller programmatically and want to perform customization that is not appropriate for viewDidLoad.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    if ((self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil])) {
        // Custom initialization
    }
    return self;
}
*/

/*
// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView {
}
*/

/*
// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
}
 
*/
// Override to allow orientations other than the default portrait orientation.
// This method is deprecated on ios6


- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    
    if (ConfigParser::getInstance()->isLanscape()) {
        return UIInterfaceOrientationIsLandscape( interfaceOrientation );
    }else{
        return UIInterfaceOrientationIsPortrait( interfaceOrientation );
    }
    
}

// For ios6, use supportedInterfaceOrientations & shouldAutorotate instead
- (NSUInteger) supportedInterfaceOrientations{
#ifdef __IPHONE_6_0
    if (ConfigParser::getInstance()->isLanscape()) {
        return UIInterfaceOrientationMaskLandscape;
    }else{
        return UIInterfaceOrientationMaskPortraitUpsideDown;
    }
#endif
}

- (BOOL) shouldAutorotate {
    if (ConfigParser::getInstance()->isLanscape()) {
        return YES;
    }else{
        return NO;
    }
}

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation {
    [super didRotateFromInterfaceOrientation:fromInterfaceOrientation];

    cocos2d::GLView *glview = cocos2d::Director::getInstance()->getOpenGLView();

    if (glview)
    {
        cocos2d::CCEGLView *eaglview = (cocos2d::CCEGLView*) glview->getEAGLView();

        if (eaglview)
        {
            CGSize s = CGSizeMake([eaglview getWidth], [eaglview getHeight]);
            cocos2d::Application::getInstance()->applicationScreenSizeChanged((int) s.width, (int) s.height);
        }
    }
}
-(void)viewDidLoad{
    [super viewDidLoad];
}
//fix not hide status on ios7
- (BOOL)prefersStatusBarHidden
{
    return YES;
}

- (void)didReceiveMemoryWarning {
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

- (void)viewDidUnload {
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}
- (BOOL)canBecomeFirstResponder{
    return  YES;
}


-(void)viewDidAppear:(BOOL)animated{
    [self canBecomeFirstResponder];
}

+ (void)setRunYaoYao :(NSString *) isRun{
    NSLog(@"$$$$$$$$$$$$setRunYaoYao%@",isRun);
    if(!_isRunYaoYao){
        _isRunYaoYao = [[NSMutableString alloc]init];
    }
    [_isRunYaoYao setString:isRun];
    NSLog(@"$$$$$$$$$$$$setRunYaoYao%@",_isRunYaoYao);
}
+ (void)setBurstAwardYaoYao :(NSString *) isRun{
    if(!_isBurstAwardYaoYao){
        _isBurstAwardYaoYao = [[NSMutableString alloc]init];
    }
    [_isBurstAwardYaoYao setString:isRun];
}
-(void)motionBegan:(UIEventSubtype)motion withEvent:(UIEvent *)event{

    if([_isRunYaoYao isEqualToString:@"YES"]){
        
//        
//        auto str = StringUtils::format("share_callback(%d)", platform);
//        jsval ret;
//        ScriptingCore::getInstance()->evalString(str.c_str(), &ret);
        
         NSLog(@"$$$$$$$$$$$$手机摇一摇!!!!!!!%@",_isRunYaoYao);
        auto str = StringUtils::format("brc.yaoYiYao()");
        jsval ret;
        ScriptingCore::getInstance()->evalString(str.c_str(), &ret);
        [_isRunYaoYao setString:@"NO"];
      
    }
    if([_isBurstAwardYaoYao isEqualToString:@"YES"]){
        auto str1 = StringUtils::format("brc.burstAwardYaoYiYao()");
        jsval ret1;
        ScriptingCore::getInstance()->evalString(str1.c_str(), &ret1);
//        
    }

}

- (void)dealloc {
    [super dealloc];
}


@end
