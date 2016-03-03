//
//  AnimationKoo.h
//  OCJS
//
//  Created by 百易科技 on 15/6/22.
//
//

#ifndef __AnimationKoo_H__
#define __AnimationKoo_H__
#include "cocos2d.h"
USING_NS_CC;
namespace ls{
    class AnimationKoo{
    public:
        virtual void weiXinShare(std::string shareUrl,std::string shareTxt,std::string shareImage);//微信分享
        virtual void qqZoneShare(std::string shareUrl,std::string shareTxt,std::string shareImage);//qq空间分享
        virtual void sinaWeiboShare(std::string shareUrl,std::string shareTxt,std::string shareImage);//新浪微博分享
        virtual void countUserLevel(int level);//等级统计
        virtual void countEnterRoom(const char *level);//房间统计
        virtual void countPay(double cash, int source, double coin);//充值统计
        virtual void countCustomEvent(const char * eventId, const char * arg0,const char * arg1);//自定义事件
        static AnimationKoo * create();
    };
}

static void umShareCallback(int platform, int stCode, const std::string& errorMsg);
static void authCallback(int platform, int stCode, const std::string& errorMsg);
#endif // __AnimationKoo_H__
