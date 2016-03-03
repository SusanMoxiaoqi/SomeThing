//var Data = {Describe : "网络连接错误，请检查网络后，重新链接",errorCode : 0};

TISHIYU = [
           {promptCode : 1000,Describe : "网络连接错误，请检查网络后，重新链接"},//大厅
];

getTiShiByPromptCode = function(promptCode) {
	for ( var i in TISHIYU) {
		if(TISHIYU[i].promptCode == promptCode)
			return TISHIYU[i];
	}
};
