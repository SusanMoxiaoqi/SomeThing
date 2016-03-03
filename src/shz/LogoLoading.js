var LogoLoadingLayer = cc.Layer.extend({


	ctor:function () {
		this._super();
		var LOGO = new cc.Sprite("res/shz/SHZLOGO.png");
		LOGO.x = cc.winSize.width/2;
		LOGO.y = cc.winSize.height/2;
		this.addChild(LOGO);
		this.scheduleOnce(function() {
			LOGO.runAction(cc.sequence(
					cc.FadeTo(2.0,30),
					cc.callFunc(function() {
						var scene = new AssetsManagerLoaderScene();
						scene.run();
					}, this)
			));	
		}, 2.0);

		return true;
	}
});

var LogoLoadingScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new LogoLoadingLayer();
		this.addChild(layer);
	}
});

var musicKEY = "MusicVolue";
var effectKEY = "EffectVolue";
var slocal = cc.sys.localStorage;
var MusicVolue = slocal.getItem(musicKEY) || 1;
var EffectVolue = slocal.getItem(effectKEY) || 1;
cc.log("MusicVolue,EffectVolue",MusicVolue,EffectVolue);
cc.audioEngine.setMusicVolume(MusicVolue);
cc.audioEngine.setEffectsVolume(EffectVolue);