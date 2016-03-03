//
//  jsb_ls_auto.h
//  OCJS
//
//  Created by 百易科技 on 15/6/22.
//
//

#ifndef OCJS_jsb_ls_auto_h
#define OCJS_jsb_ls_auto_h
#include "jsapi.h"
#include "jsfriendapi.h"
#include "ScriptingCore.h"

void  js_register_ls_Animationkoo(JSContext* cx, JS::HandleObject global);
void  js_cocos2d_Animationkoo_finalize(JSFreeOp *fop, JSObject *obj);
bool  js_cocos2dx_Animationkoo_create(JSContext *cx, uint32_t argc, jsval *vp);
static bool  js_is_native_obj(JSContext *cx, uint32_t argc, jsval *vp);
bool  js_cocos2dx_AnimationkooWeiXinShare_getDescription(JSContext *cx, uint32_t argc, jsval *vp);
bool  js_cocos2dx_AnimationkooQQZoneShare_getDescription(JSContext *cx, uint32_t argc, jsval *vp);
bool  js_cocos2dx_AnimationkooSinaWeiboShare_getDescription(JSContext *cx, uint32_t argc, jsval *vp);

bool  js_cocos2dx_AnimationkooCountUserLevel_getDescription(JSContext *cx, uint32_t argc, jsval *vp);
bool  js_cocos2dx_AnimationkooCountEnterRoom_getDescription(JSContext *cx, uint32_t argc, jsval *vp);
bool  js_cocos2dx_AnimationkooCountPay_getDescription(JSContext *cx, uint32_t argc, jsval *vp);
bool  js_cocos2dx_AnimationkooCountCustomEvent_getDescription(JSContext *cx, uint32_t argc, jsval *vp);




bool  js_cocos2dx_Animationkoo_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void  register_all_ls(JSContext* cx, JS::HandleObject obj);

#endif
