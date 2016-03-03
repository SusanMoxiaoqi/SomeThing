//
//  UMShare.h
//
//  Created by HanShaokun on 27/6/15.
//
//

#ifndef __BYFISHGAME__UMShare__
#define __BYFISHGAME__UMShare__

#include "cocos2d.h"

class UMShare {
    
public:
    
    typedef enum : int {
        WECHAT = 1,
        WECHAT_CIRCLE = 2,
        QQ = 3,
        QZONE = 4,
        SINA = 5
    } SHARE_TYPE;
    
    static void setShareCallback(std::function<void(SHARE_TYPE, int)> callback);
    
    static void share(SHARE_TYPE,
                      const std::string& title,
                      const std::string& text,
                      const std::string& url,
                      const std::string& image);
    
//private:
    
    static UMShare* getInstance();
    
    bool init();
    
    std::function<void(SHARE_TYPE, int)> _callback;
    
    void call(const std::string& platform, const std::string& errCode);
};


#endif /* defined(__BYFISHGAME__UMShare__) */
