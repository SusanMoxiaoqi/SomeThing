//
//  jsb_ls_auto.cpp
//  OCJS
//
//  Created by 百易科技 on 15/6/22.
//
//


#include "cocos2d.h"
#include "Animationkoo.h"
#include "jsapi.h"
#include "jsb_ls_auto.h"

#include "cocos2d_specifics.hpp"
USING_NS_CC;

// 定义 js 端的类型
JSClass  *jsb_LsLeafsoar_class;
JSObject *jsb_LsLeafsoar_prototype;

// 实现 ls 命名空间下的类绑定
void register_all_ls(JSContext* cx, JS::HandleObject obj) {
    //JS::RootedObject ns(cx);
    
      JS::RootedObject ccObj(cx);
    get_or_create_js_obj(cx, obj, "ls", &ccObj);
    
    // 实现绑定 Leafsoar 类，它的定义后文给出
    //js_register_ls_Animationkoo(cx, ns);
    js_register_ls_Animationkoo(cx,ccObj);
}

void js_cocos2d_Animationkoo_finalize(JSFreeOp *fop, JSObject *obj) {
    CCLOGINFO("jsbindings: finalizing JS object %p (Node)", obj);
}

bool js_cocos2dx_Animationkoo_create(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {
        ls::AnimationKoo* ret = ls::AnimationKoo::create();
        jsval jsret = JSVAL_NULL;
        do {
            if (ret) {
                
                js_proxy_t *jsProxy = js_get_or_create_proxy<ls::AnimationKoo>(cx, (ls::AnimationKoo*)ret);
                
                
                jsret = OBJECT_TO_JSVAL(jsProxy->obj);
            } else {
                jsret = JSVAL_NULL;
            }
        } while (0);
        args.rval().set(jsret);
        return true;
    }
    JS_ReportError(cx, "js_cocos2dx_Animationkoo_create : wrong number of arguments");
    return false;
}

static bool js_is_native_obj(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    args.rval().setBoolean(true);
    return true;
}

bool js_cocos2dx_AnimationkooWeiXinShare_getDescription(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ls::AnimationKoo* cobj = (ls::AnimationKoo *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_Node_getDescription : Invalid Native Object");
    if (argc == 3) {
        bool ok=true;
        std::string shareUrl,shareTxt,shareImage;
        ok &= jsval_to_std_string(cx, args.get(0), &shareUrl);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooWeiXinShare_getDescription : Error shareUrl");
        ok &= jsval_to_std_string(cx, args.get(1), &shareTxt);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooWeiXinShare_getDescription : Error shareTxt");
        ok &= jsval_to_std_string(cx, args.get(2), &shareImage);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooWeiXinShare_getDescription : Error shareImage");
        cobj->weiXinShare(shareUrl,shareTxt,shareImage);
        return true;
    }
    
    JS_ReportError(cx, "js_cocos2dx_AnimationkooWeiXinShare_getDescription : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}

bool  js_cocos2dx_AnimationkooQQZoneShare_getDescription(JSContext *cx, uint32_t argc, jsval *vp){
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ls::AnimationKoo* cobj = (ls::AnimationKoo *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_Node_getDescription : Invalid Native Object");
    if (argc == 3) {
        bool ok=true;
        std::string shareUrl,shareTxt,shareImage;
        ok &= jsval_to_std_string(cx, args.get(0), &shareUrl);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooQQZoneShare_getDescription : Error shareUrl");
        ok &= jsval_to_std_string(cx, args.get(1), &shareTxt);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooQQZoneShare_getDescription : Error shareTxt");
        ok &= jsval_to_std_string(cx, args.get(2), &shareImage);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooQQZoneShare_getDescription : Error shareImage");
        cobj->qqZoneShare(shareUrl,shareTxt,shareImage);
        return true;
    }
    
    JS_ReportError(cx, "js_cocos2dx_AnimationkooQQZoneShare_getDescription : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;

}

bool  js_cocos2dx_AnimationkooSinaWeiboShare_getDescription(JSContext *cx, uint32_t argc, jsval *vp){
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ls::AnimationKoo* cobj = (ls::AnimationKoo *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_Node_getDescription : Invalid Native Object");
    if (argc == 3) {
        bool ok=true;
        std::string shareUrl,shareTxt,shareImage;
        ok &= jsval_to_std_string(cx, args.get(0), &shareUrl);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooSinaWeiboShare_getDescription : Error shareUrl");
        ok &= jsval_to_std_string(cx, args.get(1), &shareTxt);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooSinaWeiboShare_getDescription : Error shareTxt");
        ok &= jsval_to_std_string(cx, args.get(2), &shareImage);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooSinaWeiboShare_getDescription : Error shareImage");
        cobj->sinaWeiboShare(shareUrl,shareTxt,shareImage);
        return true;
    }
    
    JS_ReportError(cx, "js_cocos2dx_AnimationkooSinaWeiboShare_getDescription : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
    
}

bool  js_cocos2dx_AnimationkooCountUserLevel_getDescription(JSContext *cx, uint32_t argc, jsval *vp){
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ls::AnimationKoo* cobj = (ls::AnimationKoo *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_Node_getDescription : Invalid Native Object");
    if (argc == 1) {
    bool ok=true;
    int level;
    ok &=jsval_to_int(cx, args.get(0), &level);
    JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooCountUserLevel_getDescription : Error level");
    cobj->countUserLevel(level);
    return true;
    };
    JS_ReportError(cx, "js_cocos2dx_AnimationkooCountUserLevel_getDescription : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
    
}

bool  js_cocos2dx_AnimationkooCountEnterRoom_getDescription(JSContext *cx, uint32_t argc, jsval *vp){
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ls::AnimationKoo* cobj = (ls::AnimationKoo *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_Node_getDescription : Invalid Native Object");
    if (argc == 1) {
        bool ok=true;
        std::string roomLevel;
        ok &= jsval_to_std_string(cx, args.get(0), &roomLevel);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooCountEnterRoom_getDescription : roomLevel");
        cobj->countEnterRoom(roomLevel.c_str());
        return true;
    }
    
    JS_ReportError(cx, "js_cocos2dx_AnimationkooCountPay_getDescription : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
    
}

bool  js_cocos2dx_AnimationkooCountPay_getDescription(JSContext *cx, uint32_t argc, jsval *vp){
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ls::AnimationKoo* cobj = (ls::AnimationKoo *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_Node_getDescription : Invalid Native Object");
    if (argc == 3) {
        bool ok=true;
        long cash;int source;long coin;
        ok &= jsval_to_long(cx, args.get(0), &cash);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooCountPay_getDescription : Error cash");
        ok &= jsval_to_int(cx, args.get(1),&source);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooCountPay_getDescription : Error source");
        ok &= jsval_to_long(cx, args.get(2), &coin);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooCountPay_getDescription : Error coin");
        cobj->countPay((double)cash, source, (double)coin);
        return true;
    }
    
    JS_ReportError(cx, "js_cocos2dx_AnimationkooCountPay_getDescription : wrong number of arguments");
    return false;
    
}

bool  js_cocos2dx_AnimationkooCountCustomEvent_getDescription(JSContext *cx, uint32_t argc, jsval *vp){
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ls::AnimationKoo* cobj = (ls::AnimationKoo *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_Node_getDescription : Invalid Native Object");
    if (argc == 3) {
        bool ok=true;
        std::string eventId,arg0,arg1;
        ok &= jsval_to_std_string(cx, args.get(0), &eventId);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooWeiXinShare_getDescription : Error eventId");
        ok &= jsval_to_std_string(cx, args.get(1), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooWeiXinShare_getDescription : Error arg0");
        ok &= jsval_to_std_string(cx, args.get(2), &arg1);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_AnimationkooWeiXinShare_getDescription : Error arg1");
        cobj->countCustomEvent(eventId.c_str(),arg0.c_str(),arg1.c_str());
        return true;
    }
    
    JS_ReportError(cx, "js_cocos2dx_Node_getDescription : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
    
}




bool js_cocos2dx_Animationkoo_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    ls::AnimationKoo* cobj = new (std::nothrow) ls::AnimationKoo();
    cocos2d::Ref *_ccobj = dynamic_cast<cocos2d::Ref*>(cobj);
    if (_ccobj) {
        _ccobj->autorelease();
    }
    TypeTest<ls::AnimationKoo> t;
    js_type_class_t *typeClass = nullptr;
    std::string typeName = t.s_name();
    auto typeMapIter = _js_global_type_map.find(typeName);
    CCASSERT(typeMapIter != _js_global_type_map.end(), "Can't find the class type!");
    typeClass = typeMapIter->second;
    CCASSERT(typeClass, "The value is null.");
    // JSObject *obj = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
    JS::RootedObject proto(cx, typeClass->proto.get());
    JS::RootedObject parent(cx, typeClass->parentProto.get());
    JS::RootedObject obj(cx, JS_NewObject(cx, typeClass->jsclass, proto, parent));
    args.rval().set(OBJECT_TO_JSVAL(obj));
    // link the native object with the javascript object
    js_proxy_t* p = jsb_new_proxy(cobj, obj);
    AddNamedObjectRoot(cx, &p->obj, "ls::AnimationKoo");
    if (JS_HasProperty(cx, obj, "_ctor", &ok) && ok)
        ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(obj), "_ctor", args);
    return true;
}

void js_register_ls_Animationkoo(JSContext* cx, JS::HandleObject global){
    jsb_LsLeafsoar_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_LsLeafsoar_class->name = "AnimationKoo";
    jsb_LsLeafsoar_class->addProperty = JS_PropertyStub;
    jsb_LsLeafsoar_class->delProperty = JS_DeletePropertyStub;
    jsb_LsLeafsoar_class->getProperty = JS_PropertyStub;
    jsb_LsLeafsoar_class->setProperty = JS_StrictPropertyStub;
    jsb_LsLeafsoar_class->enumerate = JS_EnumerateStub;
    jsb_LsLeafsoar_class->resolve = JS_ResolveStub;
    jsb_LsLeafsoar_class->convert = JS_ConvertStub;
    jsb_LsLeafsoar_class->finalize = js_cocos2d_Animationkoo_finalize;
    jsb_LsLeafsoar_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);
    
    static JSPropertySpec properties[] = {
        JS_PSG("__nativeObj", js_is_native_obj, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_PS_END
    };
    
    static JSFunctionSpec funcs[] = {
        JS_FN("weiXinShare", js_cocos2dx_AnimationkooWeiXinShare_getDescription, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("qqZoneShare", js_cocos2dx_AnimationkooQQZoneShare_getDescription, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("SinaWeiboShare", js_cocos2dx_AnimationkooSinaWeiboShare_getDescription, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("countUserLevel", js_cocos2dx_AnimationkooCountUserLevel_getDescription, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("countEnterRoom", js_cocos2dx_AnimationkooCountEnterRoom_getDescription, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("countPay", js_cocos2dx_AnimationkooCountPay_getDescription, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("countCustomEvent", js_cocos2dx_AnimationkooCountCustomEvent_getDescription, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    
    static JSFunctionSpec st_funcs[] = {
        JS_FN("create", js_cocos2dx_Animationkoo_create, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };
    
    jsb_LsLeafsoar_prototype = JS_InitClass(
                                            cx, global,
                                            JS::NullPtr(), // parent proto
                                            jsb_LsLeafsoar_class,
                                            js_cocos2dx_Animationkoo_constructor, 0, // constructor
                                            properties,
                                            funcs,
                                            NULL, // no static properties
                                            st_funcs);
    // make the class enumerable in the registered namespace
    //  bool found;
    //FIXME: Removed in Firefox v27
    //  JS_SetPropertyAttributes(cx, global, "Node", JSPROP_ENUMERATE | JSPROP_READONLY, &found);
    
    // add the proto and JSClass to the type->js info hash table
    TypeTest<ls::AnimationKoo> t;
    js_type_class_t *p;
    std::string typeName = t.s_name();
    if (_js_global_type_map.find(typeName) == _js_global_type_map.end())
    {
        p = (js_type_class_t *)malloc(sizeof(js_type_class_t));
        p->jsclass = jsb_LsLeafsoar_class;
        p->proto = jsb_LsLeafsoar_prototype;
        p->parentProto = NULL;
        _js_global_type_map.insert(std::make_pair(typeName, p));
    }
}