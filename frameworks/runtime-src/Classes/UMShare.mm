//
//  UMShare.cpp
//
//  Created by HanShaokun on 27/6/15.
//
//

#include "UMShare.h"

#if CC_TARGET_PLATFORM == CC_PLATFORM_IOS

namespace cocos2d {
    
    static UMShare* _st = nullptr;
    UMShare* UMShare::getInstance()
    {
        if (!_st) {
            _st = new (std::nothrow) UMShare();
            if (!_st->init()) {
                CC_SAFE_RELEASE_NULL(_st);
            }
        }
        
        return _st;
    }
    
    bool UMShare::init()
    {
        return true;
    }
    
    
}

#endif