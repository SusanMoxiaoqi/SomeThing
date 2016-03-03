//
//  AnimationKoo.cpp
//  OCJS
//
//  Created by 百易科技 on 15/6/22.
//
//


#include "cocos2d.h"
#include "cocos2d_specifics.hpp"
#include "AnimationKoo.h"
// 引入相关的头文件
//#include "Cocos2dx/Common/CCUMSocialSDK.h"
#include "Cocos2dx/Common/CCUMSocialSDK.h"
#include "MobClickCpp.h"
#include "UMShare.h"
// 使用友盟命令空间
USING_NS_UM_SOCIAL;
USING_NS_CC;

ls::AnimationKoo * ls::AnimationKoo::create()
{
    AnimationKoo * ret = new AnimationKoo();
    return ret;
}


#pragma 微信分享
void ls::AnimationKoo::weiXinShare(std::string shareUrl,std::string shareTxt,std::string shareImage){
    CCLOG("binding test...%s,%s,%s",shareUrl.c_str(),shareTxt.c_str(),shareImage.c_str());
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    UMShare::setShareCallback([=] (UMShare::SHARE_TYPE t, int ec) {
        umShareCallback(WEIXIN_CIRCLE, ec, "");
    });
    
    UMShare::share(UMShare::SHARE_TYPE::WECHAT_CIRCLE, shareTxt, "街机水浒传", shareUrl, shareImage);
    
    log("调用jsb友盟微信平台分享");
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CCUMSocialSDK *sdk = CCUMSocialSDK::create("5552f0afe0f55ab57f000643");
    sdk->setWeiXinAppInfo("wx568c4214ee9f26f4",
                          "b13b00c6ffd703e1cc6b0f4648076d21");
    sdk->setTargetUrl(shareUrl.c_str());
    vector<int>* platforms = new vector<int>();
    //platforms->push_back(WEIXIN);
    platforms->push_back(WEIXIN_CIRCLE) ;
    sdk->setPlatforms(platforms) ;
    sdk->directShare(WEIXIN_CIRCLE, shareTxt.c_str(),shareImage.c_str(), share_selector(umShareCallback));
#endif
    
}


#pragma qq空间分享
void ls::AnimationKoo::qqZoneShare(std::string shareUrl,std::string shareTxt,std::string shareImage){
    CCLOG("1234567890-qwertyuiop");
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    UMShare::setShareCallback([=] (UMShare::SHARE_TYPE t, int ec) {
        umShareCallback(QZONE, ec, "");
    });
    
    UMShare::share(UMShare::SHARE_TYPE::QZONE, "街机水浒传", shareTxt, shareUrl, shareImage);
    
    log("调用jsb友盟微信平台分享");
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CCUMSocialSDK *sdk = CCUMSocialSDK::create("5552f0afe0f55ab57f000643");
    sdk->setQQAppIdAndAppKey("1104644836",
                          "1w5pCmxap7tUNjYy");
    sdk->setTargetUrl(shareUrl.c_str());
    vector<int>* platforms = new vector<int>();
    //platforms->push_back(QQ);
    platforms->push_back(QZONE) ;
    sdk->setPlatforms(platforms) ;
    sdk->directShare(QZONE, shareTxt.c_str(),shareImage.c_str(), share_selector(umShareCallback));
#endif
}

#pragma 新浪微博分享
void ls::AnimationKoo::sinaWeiboShare(std::string shareUrl,std::string shareTxt,std::string shareImage){
    CCLOG("1234567890-qwertyuiop");
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
     CCLOG("新浪微博分享调用jsb友盟微信平台分享AD*****************1");
    UMShare::setShareCallback([=] (UMShare::SHARE_TYPE t, int ec) {
        umShareCallback(SINA, ec, "");
    });
    
    UMShare::share(UMShare::SHARE_TYPE::SINA, shareTxt, shareTxt, shareUrl, shareImage);
    
    CCLOG("新浪微博分享调用jsb友盟微信平台分享AD*****************2");
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CCUMSocialSDK *sdk = CCUMSocialSDK::create("5552f0afe0f55ab57f000643");
    vector<int>* platforms = new vector<int>();
    platforms->push_back(SINA) ;
    sdk->setPlatforms(platforms) ;
    //sdk->setSsoAuthorization(SINA, shareUrl.c_str());
    sdk->directShare(SINA, shareTxt.c_str(),shareImage.c_str(), share_selector(umShareCallback));
#endif
}

#pragma 分享回调函数
void umShareCallback(int platform,int stCode,const std::string& errorMsg)
{
    if ( stCode == 100 )
    {
        log("#### UM Share 开始分享 %d %d %s", platform, stCode, errorMsg.c_str());
    }
    else if ( stCode == 200 )
    {
        Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]()
        {
          auto str = StringUtils::format("share_callback(%d)", platform);
          jsval ret;
         ScriptingCore::getInstance()->evalString(str.c_str(), &ret);
           log("#### UM Share 分享成功 %d %d %s", platform, stCode, errorMsg.c_str());
          });
    }
    else
    {
        log("#### HelloWorld 分享出错");
    };
    
}

#pragma 分享授权回调函数
void authCallback(int platform, int stCode, const std::string& errorMsg){
    
}


#pragma 等级统计接口
void ls::AnimationKoo::countUserLevel(int level){
    CCLOG("%s,%d",__FUNCTION__,level);
    umeng::MobClickCpp::setUserLevel(level);
}

#pragma 房间统计

void ls::AnimationKoo::countEnterRoom(const char *level){
     CCLOG("%s,%s",__FUNCTION__,level);
    umeng::MobClickCpp::startLevel(level);
}

#pragma 充值统计
/**
 cash	真实币数量	>=1的整数,最多只保存小数点后2位
 source	支付渠道	1 ~ 99的整数, 其中1..8 是预定义含义,其余数值需要在网站设置。
 coin	虚拟币数量	大于0的整数, 最多只保存小数点后2位,一般情况下coin = amount * price
 */

void ls::AnimationKoo::countPay(double cash, int source, double coin){
     CCLOG("%s,%f,%d,%f",__FUNCTION__,cash,source,coin);
    umeng::MobClickCpp::pay(cash, source, coin);
}

#pragma 自定义事件统计

void ls::AnimationKoo::countCustomEvent(const char *eventId, const char *arg0, const char *arg1){
    CCLOG("%s,%s,%s,%s",__FUNCTION__,eventId,arg0,arg1);
    if (arg1[0]=='\0') {
         umeng::MobClickCpp::event(eventId, arg0);
    }else{
        umeng::eventDict dict;
        dict["type"] = arg0;
        dict["quantity"] = arg1;
        umeng::MobClickCpp::event(arg1, &dict);
    }
   
}





