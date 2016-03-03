//
//  UMShare.cpp
//
//  Created by HanShaokun on 27/6/15.
//
//

#include "UMShare.h"

#if CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID

#include <jni.h>
#include "platform/android/jni/JniHelper.h"
#include <android/log.h>

#endif

USING_NS_CC;

static UMShare* _st = nullptr;
UMShare* UMShare::getInstance()
{
    if (!_st) {
        _st = new (std::nothrow) UMShare();
        if (!_st->init()) {
            delete _st;
            _st = nullptr;
        }
    }
    
    return _st;
}

bool UMShare::init()
{
    return true;
}

void UMShare::setShareCallback(std::function<void(SHARE_TYPE, int)> callback)
{
    UMShare::getInstance()->_callback = callback;
}

void UMShare::share(SHARE_TYPE t,
           const std::string& title,
           const std::string& text,
           const std::string& url,
           const std::string& image)
{
    
#if CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID
    JniMethodInfo minfo;
    
    if (JniHelper::getStaticMethodInfo(minfo,
                                       "org/cocos2dx/javascript/JUMShare",
                                       "share",
                                       "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V"))
    {
        jobject jtype = minfo.env->NewStringUTF(cocos2d::StringUtils::toString(t).c_str());
        jobject jtitle = minfo.env->NewStringUTF(title.c_str());
        jobject jtext = minfo.env->NewStringUTF(text.c_str());
        jobject jurl = minfo.env->NewStringUTF(url.c_str());
        jobject jimg = minfo.env->NewStringUTF(image.c_str());
        minfo.env->CallStaticVoidMethod(minfo.classID, minfo.methodID, jtype, jtitle, jtext, jurl, jimg);
        minfo.env->DeleteLocalRef(jtype);
        minfo.env->DeleteLocalRef(jtitle);
        minfo.env->DeleteLocalRef(jtext);
        minfo.env->DeleteLocalRef(jurl);
        minfo.env->DeleteLocalRef(jimg);
    }
#endif

    
}

void UMShare::call(const std::string& platform, const std::string& errCode)
{
    cocos2d::log("%s %s", platform.c_str(), errCode.c_str());
    
    if (_callback) {
        _callback((SHARE_TYPE)atoi(platform.c_str()), atoi(errCode.c_str()));
    }
}

extern "C" {
    
#if CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID
    
    JNIEXPORT void JNICALL
    Java_org_cocos2dx_javascript_JUMShare_shareCallback(JNIEnv *env,
                                                jobject obj,
                                                jstring jplatform,
                                                jstring jerrCode)
    {
        const char *pl = env->GetStringUTFChars(jplatform, 0);
        char platform[16];
        strcpy(platform, pl);
        env->ReleaseStringUTFChars(jplatform, pl);
        
        const char *ec = env->GetStringUTFChars(jerrCode, 0);
        char errCode[16];
        strcpy(errCode, ec);
        env->ReleaseStringUTFChars(jerrCode, ec);
        
        UMShare::getInstance()->call(platform, errCode);
    }
#endif
}
