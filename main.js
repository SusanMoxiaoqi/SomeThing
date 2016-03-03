
cc.game.onStart = function(){
	cc.view.adjustViewPort(true);
	cc.view.setDesignResolutionSize(1136, 640, cc.ResolutionPolicy.EXACT_FIT);
	cc.view.resizeWithBrowserSize(true);
	/**每次的打的最新包，把他的版本号存储在本地，这个版本号是安装时的版本号，以后就不会再改变。*/
	var CONFIGq = cc.loader.getRes("res/shz_Config.json");
	if (!cc.sys.localStorage.getItem("ORIGINAL_VERSION")) {	cc.sys.localStorage.setItem("ORIGINAL_VERSION",CONFIGq.ORIGINAL_VERSION);}
	var scene = new LogoLoadingScene();
	cc.director.runScene(scene);
};

cc.game.run();