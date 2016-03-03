//游戏定义
/**
//游戏图标
enum GameIcon {
	GI_FUTOU = 0,     // 斧头
	GI_YINGQIANG,     // 银枪
	GI_DADAO,         // 大刀
	GI_LU,            // 鲁智深
	GI_LIN,           // 林冲
	GI_SONG,          // 宋江
	GI_TITIANXINGDAO, // 替天行道
	GI_ZHONGYITANG,   // 忠义堂
	GI_SHUIHUZHUAN,   // 水浒传

	GI_COUNT
};

//比倍类型
enum DoubleType {
	DT_HALF,
	DT_DOUBLE,
	DT_NORMAL
};

//买大小
enum BuyType {
	BUY_SMALL = 0,
	BUY_TIE,
	BUY_BIG
};
 */
/**
 * 游戏命令
 * */
var MDM_GF_GAME		=			200;									//游戏命令

/**游戏内 服务端命令*/

var SUB_S_SCENE1_START            	                          =100;             // 滚动结果
var SUB_S_SCENE2_RESULT                                    	  =101;             // 骰子结果
var SUB_S_SCENE3_RESULT                                   	  =102;             // 玛丽结果
var SUB_S_STOCK_RESULT                                        =103;             // 库存操作结果f
var SUB_S_PRO_INQUIRY_RESULT                			  =104;             // 概率查询结果
var SUB_S_PERSON_RESULT               					 	  =106;             // 比倍记录
var SUB_S_ADD_CREDIT_SCORE_SUCCESS			  =107;				// 上分成功
var SUB_S_ADD_CREDIT_SCORE_FAILS  	   			  =108;				// 上分失败
var SUB_S_SCORE					  	    							 	  =109;				// 下分
var SUB_S_USERBET				 	   							 	  =110				// 用户下注
var SUB_S_SCENE												 		  =111				// 游戏场景
var SUB_S_OVERALL_REWARD							 	  =112				// 全盘奖励

var SUB_S_TAKE_GOLD_SUCCESS							  =113				// 救济金成功
var SUB_S_TAKE_GOLD_FAILURE								  =114				// 救济金失败
var SUB_S_TAKE_ONLINE_REWARD							  =115				// 在线奖励
var SUB_S_RESULT_ONLINE_REWARD_CONFIG		  =116				// 在线奖励配置结果
var SUB_S_RESULT_ONLINE_REWARD_TIME			  =117				// 奖励剩余时间
var SUB_S_RESET_ONLINE_REWARD						  =118				// 重置在线奖励

//客户端命令

var SUB_C_ADD_CREDIT_SCORE                           =     1;              // 上分
var SUB_C_REDUCE_CREDIT_SCORE                    =     2;               // 下分
var SUB_C_SCENE1_START                                     =     3;               //
var SUB_C_SCENE2_BUY_TYPE                              =     4;               // 买大小
var SUB_C_SCORE                                                    =     5;               // 得分
var SUB_C_SCENE3_START                                      =    6;               //
var SUB_C_GLOBAL_MESSAGE                               =    7;
var SUB_C_STOCK_OPERATE                                   =    8;
var SUB_C_PRO_INQUIRY                                         =    9;              // 概率查询
var SUB_C_SAVE_PRO                                              =    10;              // 保存概率
var SUB_C_PERSON_CONTROL                               =    11;              // 个人控制
var SUC_C_STAND_UP				                                =	12;				// 起立
var SUB_C_GET_TAKE_GOLD				                    =	13				// 领取救济金
var SUB_C_GET_ONLINE_REWARD			                =	14				// 领取在线奖励
var SUB_C_QUERY_ONLINE_REWARD_TIME		    =  15				// 查询剩余时间
var SUB_C_QUERY_ONLINE_REWARD_CONFIG	    =  16				// 查询在线奖励配置

//200 5 游戏得分
BinUtils.addCommand( MDM_GF_GAME, SUB_C_SCORE, {},GAMENAME);//200,5
//登录游戏时的场景状态
CMD_S_GameStatus = [
                    { name : 'game_version',                             type : C_Byte },
                    { name : 'exchange_ratio_userscore',         type: C_Int },//用户金币
                    { name : 'exchange_ratio_credit',                type: C_Int },//游戏币
                    { name : 'exchange_count',                         type: C_Int },//每次兑换游戏币个数
                    { name : 'dwBetNum',type:                         C_DWord },//可以下注的次数
                    { name : 'dwBetValue',                                 type: C_LongLong },//可以下注的值
                    { name : 'bHaveLottery',                              type: C_Bool }//是否奖券场
                    ];
BinUtils.addCommand(MDM_GF_GAME,SUB_S_SCENE,CMD_S_GameStatus,GAMENAME);//200,111
//每次收分后返回的数据 200 109
CMD_S_SCORE = [
               { name : 'exchange_credit_score_',                                 type: C_LongLong },//每次进入房间的上分数
               { name : 'credit_score_',                                 type: C_LongLong },//进入房间当前的分数
               { name : 'lLottery',                                 type: C_LongLong }//当前奖券总数
               ];
BinUtils.addCommand(MDM_GF_GAME,SUB_S_SCORE,CMD_S_SCORE,GAMENAME);//200,109
//主场景开始，发送总押分 200  3
CMD_C_Scene1Start =  [
                      { name : 'bet_score',type: C_LongLong}
                      ];
BinUtils.addCommand(MDM_GF_GAME,SUB_C_SCENE1_START,CMD_C_Scene1Start,GAMENAME);//200,3
//收到滚动结果 200  100
CMD_S_Scene1Start = [
                     { name : 'result_icons',type: C_Array|C_Byte, array:[3,5]}
                     ];
BinUtils.addCommand(MDM_GF_GAME,SUB_S_SCENE1_START,CMD_S_Scene1Start,GAMENAME);//200,100

//发送比倍的大小，比倍分数，加倍情况  200  4
CMD_C_Scene2BuyType = [
                       { name : 'double_type',type:C_Int},
                       { name : 'buy_type',type:C_Int},
                       { name : 'bet_score',type:C_LongLong}
                       ];
BinUtils.addCommand(MDM_GF_GAME,SUB_C_SCENE2_BUY_TYPE,CMD_C_Scene2BuyType,GAMENAME);//200,4
//得到的骰子结果 200 101
CMD_S_Scene2Result = [
                      {name:'dice_points',type:C_Word}
                      ];
BinUtils.addCommand(MDM_GF_GAME,SUB_S_SCENE2_RESULT,CMD_S_Scene2Result,GAMENAME);//200,101
//开始小玛丽场景 200 6
CMD_C_Scene3Start = [
                     {name : 'bonus_game_times',type : C_Int},
                     {name : 'bet_score',type : C_LongLong}
                     ];
BinUtils.addCommand(MDM_GF_GAME,SUB_C_SCENE3_START,CMD_C_Scene3Start,GAMENAME);//200,6
//小玛丽结果 200 102
CMD_S_Scene3Result = [
                      {name : 'rolling_result_icons',type : C_Array|C_Int,array:[4]},
                      {name : 'rotate_result',type : C_Int}
                      ];
BinUtils.addCommand(MDM_GF_GAME,SUB_S_SCENE3_RESULT,CMD_S_Scene3Result,GAMENAME);//200,102
//全盘抽奖200 112
CMD_S_OverallReward = [
                       {name : 'icon',type : C_Int},
                       {name : 'index',type : C_Word},
                       ];
BinUtils.addCommand(MDM_GF_GAME,SUB_S_OVERALL_REWARD,CMD_S_OverallReward,GAMENAME);//200,112



//领取救济金 200-13
CMD_C_GetTakeGold = [
                     {name : "dwUserID" , type:C_DWord},
                     {name : "szMachineID",type: C_String, length:128 },
                     {name : "szUserkey" , type: C_String, length:66}
                     ];
BinUtils.addCommand( MDM_GF_GAME, SUB_C_GET_TAKE_GOLD, CMD_C_GetTakeGold,GAMENAME);//200,13

////领取救济金成功 200-113
CMD_IN_TakeGoldSuccess = [
                          {name : "dwUserID" , type:C_DWord},
                          {name : "lTakeGold",type: C_LongLong },
                          {name : "dwTakeCount",type: C_DWord },
                          {name : "dwTotalCount",type: C_DWord }
                          ];
BinUtils.addCommand( MDM_GF_GAME, SUB_S_TAKE_GOLD_SUCCESS, CMD_IN_TakeGoldSuccess,GAMENAME);//200,113
//enum TakeGoldResultCode
//{
//TakeGold_Success,			//成功
//TakeGold_ErrorConfig,		//配置出错
//TakeGold_Expire,			//过期
//TakeGold_FullCounts,		//次数满
//TakeGold_ErrorScore,		//金钱错误
//};
//救济金失败 200-114
CMD_IN_TakeGoldFailure = [
                          {name : "dwUserID" , type:C_DWord},
                          {name : "lResultCode" , type:C_Long},
                          {name : "szDescribeString" , type: C_String, length:256}
                          ];
BinUtils.addCommand( MDM_GF_GAME, SUB_S_TAKE_GOLD_FAILURE, CMD_IN_TakeGoldFailure,GAMENAME);//200,114



CMD_S_AddCreditScoreResult = [
                              { name : 'exchange_credit_score_',                                 type: C_LongLong },//每次进入房间的上分数
                              { name : 'credit_score_',                                 type: C_LongLong },//进入房间当前的分数
                              { name : 'bSuccess',                                 type: C_Byte },//进入房间当前的分数
                              ];
BinUtils.addCommand( MDM_GF_GAME,SUB_S_ADD_CREDIT_SCORE_SUCCESS, CMD_S_AddCreditScoreResult,GAMENAME);//200,107

//查询在线奖励配置200-16 

BinUtils.addCommand( MDM_GF_GAME,SUB_C_QUERY_ONLINE_REWARD_CONFIG, {},GAMENAME);//200,16

//在线奖励配置结果200-116
CMD_GR_ResultOnlineRewardConfig = [
                                   {name : "bEnable" , type:C_Bool},//有无在线奖励
                                   {name : "dwTotalCount" , type:C_DWord},//可领取的次数	
                                   {name : "dwGetCount" , type:C_DWord},	//已领取次数
                                   {name : "dwNeedTime" , type:C_DWord},//下次领取需要时间
                                   { name : 'dwRewardInfo',type: C_Array|C_DWord, array:[10,3]}	//类型、时间、数量
                                   ]; 
BinUtils.addCommand( MDM_GF_GAME,SUB_S_RESULT_ONLINE_REWARD_CONFIG, CMD_GR_ResultOnlineRewardConfig,GAMENAME);//200,116

//查询奖励剩余时间200-15

BinUtils.addCommand( MDM_GF_GAME,SUB_C_QUERY_ONLINE_REWARD_TIME, {},GAMENAME);//200,15

//奖励剩余时间 200-117
CMD_GR_ResultRewardTime = [
                           {name : "dwLeftTime" , type:C_DWord},
                           ]; 
BinUtils.addCommand( MDM_GF_GAME,SUB_S_RESULT_ONLINE_REWARD_TIME, CMD_GR_ResultRewardTime,GAMENAME);//200,117

//请求在线奖励 200-14

BinUtils.addCommand( MDM_GF_GAME,SUB_C_GET_ONLINE_REWARD, {},GAMENAME);//200,14

//在线奖励结果 200-115
CMD_GR_ResultOnlineReward = [
                             {name : "lResultCode" ,type :C_Long },
                             {name : "dwHaveTakeCounts" ,type :C_DWord },
                             {name : "lRewardScore" , type : C_LongLong},
                             {name : "szDescribeString" , type: C_String, length:256}
                             ];
BinUtils.addCommand( MDM_GF_GAME,SUB_S_TAKE_ONLINE_REWARD, CMD_GR_ResultOnlineReward,GAMENAME);//200,115

//凌晨服务器发过来的命令
BinUtils.addCommand( MDM_GF_GAME,SUB_S_RESET_ONLINE_REWARD, {},GAMENAME);//200,118


/**
 * 游戏内银行操作
 * */
var MDM_GR_INSURE				                            =5	;								//用户信息

//银行命令
var SUB_GR_QUERY_INSURE_INFO	                    =1	;								//查询银行
var SUB_GR_SAVE_SCORE_REQUEST	                =2	;								//存款操作
var SUB_GR_TAKE_SCORE_REQUEST	                =3	;								//取款操作
var SUB_GR_TRANSFER_SCORE_REQUEST	    =4;								//赠送操作
var SUB_GR_QUERY_USER_INFO_REQUEST	    =5;								//查询用户
var SUB_GR_CHANGE_MONEY_REQUEST          =6	;							    //兑换操作

var SUB_GR_USER_INSURE_INFO		                =100;							    //银行资料
var SUB_GR_USER_INSURE_SUCCESS	            =101	;								//银行成功
var SUB_GR_USER_INSURE_FAILURE	                =102	;								//银行失败
var SUB_GR_USER_TRANSFER_USER_INFO	    =103;								//用户资料
var SUB_GR_GIFT				                                    =104	;							    //指导费操作
//取款请求 5-3
CMD_GR_C_TakeScoreRequest = [
                             {name : "cbActivityGame" , type:C_Byte},
                             {name : "lTakeScore" , type: C_LongLong},
                             {name : "szInsurePass" , type: C_String , length:66},
                             ];
BinUtils.addCommand( MDM_GR_INSURE, SUB_GR_TAKE_SCORE_REQUEST, CMD_GR_C_TakeScoreRequest,GAMENAME);//5,3
////银行成功 5-101
CMD_GR_S_UserInsureSuccess = [
                              {name : "cbActivityGame" , type:C_Byte},
                              {name : "lVariationScore" , type: C_LongLong},
                              {name : "lUserInsure" , type: C_LongLong},
                              {name : "lMoneyPre" , type: C_LongLong},
                              {name : "szDescribeString" , type: C_String, length:256}
                              ];
BinUtils.addCommand( MDM_GR_INSURE, SUB_GR_USER_INSURE_SUCCESS, CMD_GR_S_UserInsureSuccess,GAMENAME);//5,101
////银行失败 5-102
CMD_GR_S_UserInsureFailure = [
                              {name : "cbActivityGame" , type:C_Byte},
                              {name : "lErrorCode" , type: C_Long},
                              {name : "szDescribeString" , type: C_String, length:256}
                              ];
BinUtils.addCommand( MDM_GR_INSURE,SUB_GR_USER_INSURE_FAILURE, CMD_GR_S_UserInsureFailure,GAMENAME);//5,102


/**
 * 
 * 游戏登陆命令
 * */
//登录命令

var MDM_GR_LOGON				                                 =1;									//登录信息

//登录模式
var SUB_GR_LOGON_USERID			                         =1;									//I D 登录
var SUB_GR_LOGON_MOBILE			                         =2;									//手机登录
var SUB_GR_LOGON_ACCOUNTS		                     =3;									//帐户登录
var SUB_GR_LOGON_ANDRIOD		                         =4;									//加载机器人
var SUB_GR_LOGON_RECONNECT		                     =5;									//重新连接
var SUB_GR_LOGON_DELAY			                             =6;									//登录延迟

//登录结果
var SUB_GR_LOGON_SUCCESS		                        =100	;								//登录成功
var SUB_GR_LOGON_FAILURE		                            =101	;								//登录失败
var SUB_GR_LOGON_FINISH			                        =102	;								//登录完成
var SUB_GR_LOGON_RECONNECT_SUCCESS	    =103;							    //重连结果

//升级提示
var SUB_GR_UPDATE_NOTIFY		                            =200	;								//升级提示


//游戏中小玛丽支持短暂的重连
CMD_GR_LogonReconnect = [
                         { name : 'wGameID',type: C_Word},//游戏标识
                         { name : 'dwUserID',type: C_DWord },             //用户ID，登录游戏使用
                         { name : 'szPassword',type: C_String, length:66 },			//登陆密码
                         ];
BinUtils.addCommand( MDM_GR_LOGON,SUB_GR_LOGON_RECONNECT, CMD_GR_LogonReconnect,GAMENAME);//1,5
//重连成功
tagSceneStatus = [
                  { name : 'lUserScore',type: C_LongLong },		//用户身上的分
                  {name : "lSceneWinScore",type : C_LongLong},  //本局获得分数
                  {name : "lWinLottery",type : C_LongLong},           //本局获得奖券
                  {name : "wMarryTimes",type : C_Word} //剩余玛丽次数
                  ];
BinUtils.addCommand( MDM_GR_LOGON,SUB_GR_LOGON_RECONNECT_SUCCESS, tagSceneStatus,GAMENAME);//1,103

//登陆游戏失败
CMD_MB_LogonGameFailure = [
                           { name : 'lResultCode',type: C_Long },			//错误代码
                           { name : 'szDescribeString',type: C_String, length:256 },	//描述消息
                           ];
BinUtils.addCommand( MDM_GR_LOGON,SUB_GR_LOGON_FAILURE,CMD_MB_LogonGameFailure,GAMENAME);//1,101

//手机登录
CMD_GR_LogonMobile = [
                      //版本信息
                      { name : 'wGameID',type: C_Word},//游戏标识
                      { name : 'dwProcessVersion',type: C_DWord },//进程版本
                      //桌子区域
                      { name : 'cbDeviceType',type: C_Byte},		//设备类型
                      { name : 'wBehaviorFlags',type: C_Word}, //行为标识
                      { name : 'wPageTableCount',type: C_Word}, //分页桌数
                      //登录信息
                      { name : 'dwUserID',type: C_DWord},		//用户 I D
                      { name : 'szPassword',type: C_String,length:66 }, //登录密码
                      { name : 'szMachineID',type: C_String,length:128 } //机器序列
                      ];
BinUtils.addCommand(MDM_GR_LOGON,SUB_GR_LOGON_MOBILE,CMD_GR_LogonMobile,GAMENAME);//1,2
BinUtils.addCommand( MDM_GR_LOGON,SUB_GR_LOGON_DELAY,CMD_MB_LogonDelay,GAMENAME);//游戏登录延迟和大厅登录延迟使用同一结构体1,6

/**
 * 框架命令
 * *****************************/
//框架命令

var MDM_GF_FRAME				=100									//框架命令


//框架命令

//用户命令
var SUB_GF_GAME_OPTION			=1									//游戏配置
var SUB_GF_USER_READY			=2									//用户准备
var SUB_GF_LOOKON_CONFIG		=3									//旁观配置
var SUB_GF_USER_LEAVE			=4									//用户离开

//聊天命令
var SUB_GF_USER_CHAT			=10									//用户聊天
var SUB_GF_USER_EXPRESSION		=11									//用户表情

//游戏信息
var SUB_GF_GAME_STATUS			=100									//游戏状态
var SUB_GF_GAME_SCENE			=101									//游戏场景
var SUB_GF_LOOKON_STATUS		=102									//旁观状态
//系统消息
var SUB_GF_SYSTEM_MESSAGE		=200									//系统消息
var SUB_GF_ACTION_MESSAGE		=201									//动作消息

//游戏状态 100--100
CMD_GF_GameStatus =[
                    { name : 'cbGameStatus',type: C_Byte },//游戏状态
                    { name : 'cbAllowLookon',type: C_Byte },//旁观标志
                    ];
BinUtils.addCommand(MDM_GF_FRAME,SUB_GF_GAME_STATUS,CMD_GF_GameStatus,GAMENAME);//100,100
//接收喇叭消息
CMD_CM_SystemMessage = [
                        {name : 'wType',type : C_Word},
                        {name : 'wLength',type : C_Word},
                        {name : 'szString',type : C_String, length : 2048}
                        ];
BinUtils.addCommand( MDM_GF_FRAME, SUB_GF_SYSTEM_MESSAGE, CMD_CM_SystemMessage,GAMENAME);//100,200

/**
 * 用户命令
 * */
var MDM_GR_USER					        =3;									//用户信息

//用户状态
var SUB_GR_USER_ENTER			    =100;									//用户进入
var SUB_GR_USER_SCORE			    =101;									//用户分数
var SUB_GR_USER_STATUS			    =102;									//用户状态
var SUB_GR_REQUEST_FAILURE		=103;									//请求失败
//用户进入
tagMobileUserInfoHead = [
                         //用户属性
                         { name : 'dwGameID',type: C_DWord,length:4 },//游戏 I D
                         { name : 'dwUserID',type: C_DWord,length:4 },//用户 I D
                         //头像信息
                         { name : 'wFaceID',type: C_Word,length:4 },//头像索引
                         { name : 'dwCustomID',type: C_DWord,length:4 },//自定标识
                         //用户属性
                         { name : 'cbGender',type: C_Byte,length:4 },//用户性别
                         { name : 'cbMemberOrder',type: C_Byte,length:4 },//会员等级
                         //用户状态
                         { name : 'wTableID',type: C_Word,length:4 },//桌子索引
                         { name : 'wChairID',type: C_Word,length:4 },//椅子索引
                         { name : 'cbUserStatus',type: C_Byte,length:4 },//用户状态
                         //积分信息
                         { name : 'lScore',type: C_LongLong,length:4 },//用户分数
                         //游戏信息
                         { name : 'dwWinCount',type: C_DWord,length:4 },//胜利盘数
                         { name : 'dwLostCount',type: C_DWord,length:4 },//失败盘数
                         { name : 'dwDrawCount',type: C_DWord,length:4 },//和局盘数
                         { name : 'dwFleeCount',type: C_DWord,length:4 },//逃跑盘数
                         { name : 'dwExperience',type: C_DWord,length:4 }//用户经验
                         ];
BinUtils.addCommand(MDM_GR_USER,SUB_GR_USER_ENTER,tagMobileUserInfoHead,GAMENAME);//3,100

//用户状态 3 －－ 102
CMD_GR_UserStatus = [
                     { name : 'dwUserID',type: C_DWord },//用户 I D
                     { name : 'UserStatus',type: C_Byte },//用户状态
                     ];
BinUtils.addCommand(MDM_GR_USER,SUB_GR_USER_STATUS,CMD_GR_UserStatus,GAMENAME);//3,102

/**
 * 配置命令
 * */
var MDM_GR_CONFIG				=2									//配置信息

var SUB_GR_CONFIG_COLUMN		=100									//列表配置
var SUB_GR_CONFIG_SERVER		=101									//房间配置
var SUB_GR_CONFIG_PROPERTY		=102									//道具配置
var SUB_GR_CONFIG_FINISH		=103									//配置完成
var SUB_GR_CONFIG_USER_RIGHT	=104									//玩家权限

//房间配置  2 -- 101 
CMD_GR_ConfigServer = [
                       //房间属性
                       { name : 'wTableCount',type: C_Word,length:4 },//桌子数目    
                       { name : 'wChairCount',type: C_Word,length:4 },//椅子数目
                       //房间配置
                       { name : 'wServerType',type: C_Word,length:4 },//房间类型
                       { name : 'dwServerRule',type: C_DWord,length:4 },//房间规则
                       ];
BinUtils.addCommand(MDM_GR_CONFIG,SUB_GR_CONFIG_SERVER,CMD_GR_ConfigServer,GAMENAME);//2,101
/**# ## # # ## ############################*/

var MDM_CM_SYSTEM				=1000;								//系统命令

var SUB_CM_SYSTEM_MESSAGE		=1;									//系统消息
var SUB_CM_ACTION_MESSAGE		=2;									//动作消息
var SUB_CM_DOWN_LOAD_MODULE		=3;									//下载消息
//系统消息
CMD_CM_SystemMessage = [
                        { name : 'wType',type: C_Word },//消息类型    
                        { name : 'wLength',type: C_Word },//消息长度
                        { name : 'szString',type: C_String,length : 1024}//消息长度
                        ];
BinUtils.addCommand(MDM_CM_SYSTEM,SUB_CM_SYSTEM_MESSAGE,CMD_CM_SystemMessage,GAMENAME);//1000,1

//类型掩码
var SMT_CHAT		            =		0x0001;								//聊天消息
var SMT_EJECT		            =			0x0002	;							//弹出消息
var SMT_GLOBAL		        =			0x0004	;							//全局消息
var SMT_PROMPT		        =			0x0008	;							//提示消息
var SMT_TABLE_ROLL	    =		0x0010	;							//滚动消息

//控制掩码
var SMT_CLOSE_ROOM		=		0x0100	;							//关闭房间
var SMT_CLOSE_GAME		=	   0x0200	;							//关闭游戏
var  SMT_CLOSE_LINK		=		0x0400	;							//中断连接