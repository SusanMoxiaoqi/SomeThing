var brc = brc || {};
brc.SUB_S_GAME                  = 200;
brc.SUB_S_GAME_FREE				= 97;								//游戏空闲
brc.SUB_S_WAIT_SHAKE	        = 98;                               //等待摇色子
brc.SUB_S_SHAKE_DICE            = 99;                               //摇色子动画
brc.SUB_S_GAME_START			= 100;								//游戏开始
brc.SUB_S_PLACE_JETTON			= 101;								//用户下注
brc.SUB_S_GAME_END				= 102;								//游戏结束
brc.SUB_S_APPLY_BANKER			= 103;								//申请庄家
brc.SUB_S_CHANGE_BANKER			= 104;								//切换庄家
brc.SUB_S_CHANGE_USER_SCORE		= 105;								//更新积分
brc.SUB_S_SEND_RECORD			= 106;								//游戏记录
brc.SUB_S_PLACE_JETTON_FAIL		= 107;								//下注失败
brc.SUB_S_CANCEL_BANKER			= 108;								//取消申请
brc.SUB_S_AMDIN_COMMAND			= 109;								//管理员命令
brc.SUB_S_SEND_ACCOUNT			= 110;								//发送账号
brc.SUB_S_ADMIN_QUERY			= 111;								//查询账号
brc.SUB_S_TIME_CANCEL_BANKER	= 112;								//延迟取消申请
brc.SUB_S_ZUOWEI_SHENGQING      = 120									//申请座位
brc.SUB_S_ZUOWEI_QUXIAO        	= 121									//取消座位
brc.SUB_S_JCXINXI        	    = 125									//奖池信息
brc.SUB_S_SCREEN_FREE_NEW		= 113									// 游戏场景空闲
brc.SUB_S_SCREEN_PLACE_JETTON_NEW		= 114							// 游戏场景下注
brc.SUB_S_SCREEN_END_NEW		= 115									// 游戏场景结束
brc.SUB_S_SCENE_WAIT_SHAKE		= 116                                   //等待摇色子场景
brc.SUB_S_SCENE_SHAKE_DICE		= 117                                   //摇色子场景
brc.SUB_S_PLACE_JETTON_COLLECT  = 1010                                  //无座玩家下注
brc.SUB_S_GAME_CONFIG           = 135                                   //服务器配置文件
brc.SUB_GR_REQUEST_FAILURE      = 103                                   //登陆失败
//客户端命令结构

brc.SUB_C_PLACE_JETTON		   	=   1									//用户下注
brc.SUB_C_APPLY_BANKER		   	=   2									//申请庄家
brc.SUB_C_CANCEL_BANKER		   	=	3									//取消申请
brc.SUB_C_AMDIN_COMMAND		   	=	4									//管理员命令
brc.SUB_C_GET_ACCOUNT		   	=	5									//获取昵称
brc.SUB_C_QUERY_ACCOUNT		   	=	6									//获取昵称
brc.SUB_C_APPLY_SPCHAIR        	=   7                                   //申请座位
brc.SUB_S_GAME_ZHU_USERTYPE    	=   3                                   //用户状态
brc.SUB_S_GAME_LABA  		   	=   200                                 //喇叭
brc.SUB_S_GAME_ZHU_LABA 	   	=   100 								//喇叭主命令
brc.SUB_S_GAME_JIANGCHI        	=   11;									//奖池
brc.MDM_GR_USER                 =   3;									//房间内用户信息(主命令)
brc.SUB_GR_USER_ENTER           =   100; 								//房间内用户信息
brc.SUB_GR_USER_SCORE           =   101; 								//用户分数
brc.SUB_GR_USER_STATUS        	=   102                                 //用户状态
brc.SUB_S_GAME_ZHU_TIMESTART    =   9                                   //距离游戏开始时间
brc.SUB_S_GAME_TIMESTART        =   1                                   //距离游戏开始时间
brc.SUB_C_QUSHI                 =   106;                                //游戏趋势
brc.SUB_C_BIAOQING              =   8;                                  //发送表情
brc.SUB_C_BIAOQINGGET           =   122;                                //服务器收到了客户端发送表情请求后，返回对应表情命令
brc.SUB_C_HONGBAO               =   9;                                  //本人发送红包
brc.SUB_C_DIANJIHONGBAO         =   10;                                 //点击红包
brc.SUB_C_HONGBAOHUOQU          =   124;                                //点击红包获取结果
brc.SUB_C_FUWUQUNFA             =   123;                                //服务器收到玩家发红包群发红包
brc.SUB_C_BAOJIANGBEGIN         =   126;                                //爆奖活动开始
brc.SUB_C_BAOJIANGCLICK         =   128;                                //点击爆奖宝箱获取的信息
brc.SUB_C_BAOJIANGEND           =   127;                                //爆奖活动结束
brc.SUB_C_BAOJIANGCLICKTOSYSTEM =   12;                                 //点击爆奖宝箱向服务器发送命令
brc.SUB_C_JIANGCHILISTSEND      =   14;                                 //发送奖池奖励请求
brc.SUB_C_JIANGCHILISTRECIVE    =   130;                                //奖池奖励服务器返回
brc.SUB_S_JIANGCHIJIANGLIMAIN   =   5;                                  //奖池奖励机构体中的结构题命令
brc.SUB_S_JIANGCHIJIANGLISUB    =   6;                                  //奖池奖励机构体中的结构题命令
brc.SUB_C_SHAKE_DICE			=   20;                                 //用户摇骰子	
//用户状态
//#define US_NULL						0x00								//没有状态
//#define US_FREE						0x01								//站立状态
//#define US_SIT						0x02								//坐下状态
//#define US_READY					0x03								//同意状态
//#define US_LOOKON					0x04								//旁观状态
//#define US_PLAYING					0x05								//游戏状态
//#define US_OFFLINE					0x06								//断线状态

//手机登录
brc.CMD_GR_LogonMobile = [
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
BinUtils.addCommand(1,2,brc.CMD_GR_LogonMobile,BRCBIBEI);//1,2

//下注失败
brc.CMD_S_PlaceJettonFail = [
                             { name : 'wPlaceUser',type: C_Word},//下注玩家
                             { name : 'lJettonArea',type: C_Byte },//下注区域
                             { name : 'lPlaceScore',type: C_LongLong},		//当前下注
                             ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_PLACE_JETTON_FAIL	,brc.CMD_S_PlaceJettonFail,BRCBIBEI);//200，107

//更新积分
brc.CMD_S_ChangeUserScore = [
                             { name : 'wChairID',type: C_Word},//椅子号码
                             { name : 'lScore',type: C_Double },//玩家积分
                             //庄家信息
                             { name : 'wCurrentBankerChairID',type: C_Word},		//当前庄家
                             { name : 'cbBankerTime',type: C_Byte}, //庄家局数
                             { name : 'lCurrentBankerScore',type: C_Double}, //庄家分数
                             ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_CHANGE_USER_SCORE,brc.CMD_S_ChangeUserScore,BRCBIBEI);//200，105

//申请庄家
brc.CMD_S_ApplyBanker = [
                         { name : 'wApplyUser',type: C_Word},//申请玩家
                         ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_APPLY_BANKER,brc.CMD_S_ApplyBanker,BRCBIBEI);//200，103

//取消申请
brc.CMD_S_CancelBanker = [
                          { name : 'wCancelUser',type: C_Word},//取消玩家
                          ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_CANCEL_BANKER,brc.CMD_S_CancelBanker,BRCBIBEI);//200，108

//申请座位 200-120
brc.CMD_S_ApplySpChair = [
                          { name : 'wApplyUser',type: C_Word},//申请者椅子ID
                          { name : 'wSpChairID',type: C_Word},//特殊座位ID
                          ]
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_ZUOWEI_SHENGQING,brc.CMD_S_ApplySpChair,BRCBIBEI);//200，120

//取消座位 200-121
brc.CMD_S_CancelSpChair = [
                           { name : 'wSpChairID',type: C_Word},//特殊座位ID
                           ]
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_ZUOWEI_QUXIAO,brc.CMD_S_CancelSpChair,BRCBIBEI);//200，121

//切换庄家
brc.CMD_S_ChangeBanker = [
                          { name : 'wBankerUser',type: C_Word},//当庄玩家
                          { name : 'lBankerScore',type: C_LongLong},//庄家金币
                          ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_CHANGE_BANKER,brc.CMD_S_ChangeBanker,BRCBIBEI);//200，104


//空闲状态
brc.CMD_S_StatusFree = [
                        { name : 'cbTimeLeave',type: C_Byte},//剩余时间
                        { name : 'lUserMaxScore',type: C_LongLong},//玩家金币
                        { name : 'wBankerUser',type: C_Word},//当前庄家
                        { name : 'cbBankerTime',type: C_Word},//庄家局数
                        { name : 'lBankerWinScore',type: C_LongLong},//庄家成绩
                        { name : 'lBankerScore',type: C_LongLong},//庄家分数
                        { name : 'bEnableSysBanker',type: C_Bool},//系统做庄
                        //控制信息
                        { name : 'lApplyBankerCondition',type: C_LongLong},//申请条件
                        { name : 'lAreaLimitScore',type: C_LongLong},//区域限制
                        { name : 'lApplySpChairCondition',type: C_LongLong},//申请座位条件
                        { name : 'wSpChairUserArray',type: C_Array|C_Word ,array : [8]},//特殊座位玩家列表
                        // 下注限制
                        { name : 'dwBetScoreCount',type: C_DWord},	//下注金额数目
                        { name : 'lBetScore',type: C_Array|C_LongLong ,array :[5]},//下注金额
                        //房间信息
                        { name : 'szGameRoomName',type: C_String ,length : 64 },//房间名称
                        ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_SCREEN_FREE_NEW,brc.CMD_S_StatusFree,BRCBIBEI);//200，113
//等待摇色子场景
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_SCENE_WAIT_SHAKE,brc.CMD_S_StatusFree,BRCBIBEI);//200，116
//摇色子场景
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_SCENE_SHAKE_DICE,brc.CMD_S_StatusFree,BRCBIBEI);//200，117
//游戏状态
brc.CMD_S_StatusPlay = [
                        //全局下注
                        { name : 'lAllBetScore',type:  C_Array|C_LongLong ,array : [9]},
                        { name : 'lUserBetScore',type:  C_Array|C_LongLong ,array : [9]},//玩家下注-掉线重连上来后用到
                        //玩家积分
                         { name : 'lUserMaxScore',type: C_LongLong},//最大下注
                        //{ name : 'lAllBigScore',type: C_LongLong},//买大总注
                        //{ name : 'lAllSmallScore',type: C_LongLong},//买小总注
                        //{ name : 'lAllDrawScore',type: C_LongLong},//买和总注
                        ////玩家下注-掉线重连上来后用到
                        //{ name : 'lUserBigScore',type: C_LongLong},//买大总注
                        //{ name : 'lUserSmallScore',type: C_LongLong},//买小总注
                        //{ name : 'lUserDrawScore',type: C_LongLong},//买和总注
                        ////玩家积分
                        //{ name : 'lUserMaxScore',type: C_LongLong},//最大下注
                        // 下注限制
                        { name : 'dwBetScoreCount',type: C_DWord},	//下注金额数目
                        { name : 'lBetScore',type: C_Array|C_LongLong ,array :[5]},//下注金额
                        //控制信息
                        { name : 'lApplyBankerCondition',type: C_LongLong},//申请条件
                        { name : 'lAreaLimitScore',type: C_LongLong},//区域限制
                        { name : 'lApplySpChairCondition',type: C_LongLong},//申请座位条件
                        { name : 'wSpChairUserArray',type: C_Array|C_Word ,array : [8]},//特殊座位玩家列表
                        //筛子信息
                        { name : 'cbDicePoint',type:C_Array|C_Byte ,array : [2] },//筛子点数
                        //庄家信息
                        { name : 'wBankerUser',type: C_Word },//当前庄家
                        { name : 'cbBankerTime',type: C_Word },//庄家局数
                        { name : 'lBankerWinScore',type: C_LongLong },//庄家赢分
                        { name : 'lBankerScore',type: C_LongLong },//庄家分数
                        { name : 'bEnableSysBanker',type: C_Bool },//系统做庄
                        ////结束信息
                        { name : 'lEndBankerScore',type: C_LongLong },//庄家成绩
                        { name : 'lEndUserScore',type: C_LongLong },//玩家成绩
                        { name : 'lEndUserReturnScore',type: C_LongLong },//返回积分
                        { name : 'lEndRevenue',type: C_LongLong},//游戏税收
                        ////全局信息
                        { name : 'cbTimeLeave',type: C_Byte },//剩余时间
                        { name : 'cbGameStatus',type: C_Byte },//游戏状态
                        ////房间信息
                        { name : 'szGameRoomName',type: C_String ,length : 64 },//房间名称
                        { name : 'wRoomTypeID',type: C_Word },//房间标识
                        ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_SCREEN_PLACE_JETTON_NEW,brc.CMD_S_StatusPlay,BRCBIBEI);//200，114
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_SCREEN_END_NEW,brc.CMD_S_StatusPlay,BRCBIBEI);//200，115
//游戏空闲
brc.CMD_S_GameFree = [
                      { name : 'cbTimeLeave',type: C_Byte},//剩余时间
                      ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_GAME_FREE,brc.CMD_S_GameFree,BRCBIBEI);//200，97
//等待摇色子
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_WAIT_SHAKE,brc.CMD_S_GameFree,BRCBIBEI);//200，98
//摇色子动画
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_SHAKE_DICE,{},BRCBIBEI);//200，99
//用户摇骰子
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_SHAKE_DICE,{},BRCBIBEI);//200，20

//WORD							wBankerUser;						//庄家位置
//LONGLONG						lBankerScore;						//庄家金币
//LONGLONG						lUserMaxScore;						//我的金币
//BYTE							cbTimeLeave;						//剩余时间
//int								nChipRobotCount;					//人数上限 (下注机器人)
//bool							bAndroid;

//游戏开始
brc.CMD_S_GameStart = [
                       { name : 'wBankerUser',type: C_Word},//庄家位置
                       { name : 'lBankerScore',type: C_LongLong},//庄家金币
                       { name : 'lUserMaxScore',type: C_LongLong},//我的金币
                       { name : 'cbTimeLeave',type: C_Byte},//剩余时间
                       { name : 'nChipRobotCount',type: C_Int},//人数上限 
                       { name : 'bAndroid',type: C_Bool}
                       ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_GAME_START,brc.CMD_S_GameStart,BRCBIBEI);//200，100

//用户下注
brc.CMD_S_PlaceJetton = [
                         { name : 'wChairID',type: C_Word},//用户位置
                         { name : 'cbJettonArea',type: C_Byte},//筹码区域
                         { name : 'lJettonScore',type: C_LongLong},//加注数目
                         { name : 'cbAndroidUser',type: C_Byte},//机器标识
                         ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_PLACE_JETTON,brc.CMD_S_PlaceJetton,BRCBIBEI);//200，101

//用户无座下注
brc.CMD_S_PlaceJettonCollect = [
    { name : 'lJettonScore' ,type: C_Array|C_LongLong ,array : [9]},//下注数目
];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_PLACE_JETTON_COLLECT,brc.CMD_S_PlaceJettonCollect,BRCBIBEI);//200，1010

brc.UserScoreInfo = [
                     { name : 'wChairID',type: C_Word},
                     { name : 'lScore',type: C_LongLong},
                     ]
BinUtils.addCommand(800,800,brc.UserScoreInfo,BRCBIBEI);//800,800

brc.tagWinLostStreak = [
                        { name : 'dwWinStreak',type: C_DWord},//连胜
                        { name : 'dwLostStreak',type: C_DWord},//连败

                        ]
BinUtils.addCommand(700,700,brc.tagWinLostStreak,BRCBIBEI);//700,700

//游戏结束
brc.CMD_S_GameEnd = [
                     //下局信息
                     { name : 'cbTimeLeave',type: C_Byte},//剩余时间
                     //筛子信息
                     { name : 'cbDicePoint',type: C_Array|C_Byte ,array : [2]},//筛子点数
                     //庄家信息
                     { name : 'lBankerScore',type: C_LongLong},//庄家信息
                     { name : 'lBankerTotallScore',type: C_LongLong},//庄家成绩
//                     { name : 'nBankerTime',type: C_Int},//做庄次数
                     { name : 'FirstThreeUserScore',type: C_Array|C_Struct ,set : [800,800,BRCBIBEI],array : [3]},//前三名成绩
                     { name : 'SpChairUserScore',type: C_Array|C_LongLong ,array : [8]},//座位玩家游戏币
                     { name : 'WinLostStreak',type: C_Struct ,set : [700,700,BRCBIBEI]},//连胜连败
                     //玩家成绩
                     { name : 'lUserScore',type: C_LongLong},//玩家成绩
                     { name : 'lUserReturnScore',type: C_LongLong},//返回积分
                     { name : 'lStreakScore',type: C_LongLong},//连胜连败奖励
                     //全局信息
                     { name : 'lRevenue',type: C_LongLong},//游戏税收
                     { name : 'cbWinner',type: C_Byte},//赢家
                     ];
BinUtils.addCommand(SUB_GR_UPDATE_NOTIFY,brc.SUB_S_GAME_END,brc.CMD_S_GameEnd,BRCBIBEI);//200，102

//接收喇叭消息
brc.CMD_CM_SystemMessage_BR = [
                               {name : 'wType',type : C_Word},
                               {name : 'wLength',type : C_Word},
                               {name : 'szString',type : C_String, length : 2048}
                               ];
BinUtils.addCommand(brc.SUB_S_GAME_ZHU_LABA, brc.SUB_S_GAME_LABA, brc.CMD_CM_SystemMessage_BR,BRCBIBEI);//100,200

//奖池信息
brc.CMD_S_GetRewardPool = [
                           {name : 'lScore',type : C_LongLong},
                           ];
BinUtils.addCommand( brc.SUB_S_GAME,brc.SUB_S_JCXINXI, brc.CMD_S_GetRewardPool,BRCBIBEI);//200,125

//客户端命令结构
BinUtils.addCommand( brc.SUB_S_GAME, 11, {},BRCBIBEI);//200,11
//申请座位
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_APPLY_SPCHAIR,brc.CMD_S_ApplySpChair,BRCBIBEI);//200，7

//申请庄家
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_APPLY_BANKER,brc.CMD_S_ApplyBanker,BRCBIBEI);//200，2


BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_CANCEL_BANKER,{},BRCBIBEI);//200，3


//用户下注
brc.CMD_C_PlaceJetton = [
                         { name : 'cbJettonArea',type: C_Byte},//筹码区域
                         { name : 'lJettonScore',type: C_LongLong},//加注数目
                         ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_PLACE_JETTON,brc.CMD_C_PlaceJetton,BRCBIBEI);//200，1

//房间内用户信息
brc.tagMobileUserInfoHead_BR = [

                                { name :"dwGameID",type:C_DWord },							//游戏 I D
                                { name :"dwUserID",type:C_DWord },							//用户 I D

                                //头像信息
                                { name :"wFaceID",type:C_Word },					//头像索引
                                { name :"dwCustomID",type:C_DWord },					//自定标识

                                //用户属性
                                { name :"cbGender",type:C_Byte },					//用户性别
                                { name :"cbMemberOrder",type:C_Byte },					//会员等级

                                //用户状态
                                { name :"wTableID",type:C_Word },					//桌子索引
                                { name :"wChairID",type:C_Word },					//椅子索引
                                { name :"cbUserStatus",type:C_Byte },					//用户状态

                                //积分信息
                                { name :"lScore",type:C_LongLong },				//用户分数

                                //游戏信息
                                { name :"dwWinCount",type:C_DWord },				//胜利盘数
                                { name :"dwLostCount",type:C_DWord },				//失败盘数
                                { name :"dwDrawCount",type:C_DWord },				//和局盘数
                                { name :"dwFleeCount",type:C_DWord },				//逃跑盘数
                                { name :"dwExperience",type:C_DWord },				//用户经验
                                { name : "szNickName",type: C_String,length:64 }	//用户昵称
                                ];
BinUtils.addCommand( 5000,5555,brc.tagMobileUserInfoHead_BR,BRCBIBEI);//3，100

brc.tagMobileUserInfoHead_BR_Array = [
    {name : "tagMobileUserInfoHead_BR", type : C_Array| C_Struct ,set : [5000,5555,BRCBIBEI], array : [5],mode :"dataLength"}
];
BinUtils.addCommand( brc.MDM_GR_USER, brc.SUB_GR_USER_ENTER,brc.tagMobileUserInfoHead_BR_Array,BRCBIBEI);//3，100


brc.tagUserScore = [
    { name : 'lScore',type: C_LongLong},//用户分数
    //输赢信息
    { name : 'dwWinCount',type: C_DWord},//胜利盘数
    { name : 'dwLostCount',type: C_DWord},//失败盘数
    { name : 'dwDrawCount',type: C_DWord},//和局盘数
    { name : 'dwFleeCount',type: C_DWord},//逃跑盘数
    //全局信息
    { name : 'dwExperience',type: C_DWord},	//用户经验
];
BinUtils.addCommand(6000,6000,brc.tagUserScore,BRCBIBEI);//6000,6000
brc.CMD_GR_UserScore = [
    { name : 'dwUserID',type: C_DWord},//用户标识
    { name : 'UserScore',type: C_Struct ,set:[6000,6000,BRCBIBEI]},//用户成绩
];

BinUtils.addCommand(brc.MDM_GR_USER,brc.SUB_GR_USER_SCORE,brc.CMD_GR_UserScore,BRCBIBEI);//3，101

brc.UserStatus =[
                 { name :"wTableID",type:C_Word },			//桌子索引
                 { name :"wChairID",type:C_Word },		//椅子位置
                 { name :"cbUserStatus",type:C_Byte }		//用户状态
                 ];
BinUtils.addCommand( 1000,1000,brc.UserStatus,BRCBIBEI );

////用户状态
brc.CMD_GR_UserStatus = [
                         { name : 'dwUserID',type: C_DWord },//用户 I D
                         { name : 'UserStatus',type: C_Struct ,set:[1000,1000,BRCBIBEI]},//用户状态
                         ];
BinUtils.addCommand( brc.MDM_GR_USER, brc.SUB_GR_USER_STATUS,brc.CMD_GR_UserStatus,BRCBIBEI);//3，102

//游戏输赢走势 200-106
//记录信息
brc.tagServerGameRecord4Mobile = [
                                  { name : "cbWinner",type: C_Array|C_Byte ,array : [30]},//赢家
                                  ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_QUSHI,brc.tagServerGameRecord4Mobile,BRCBIBEI);//200-106

//发送表情 200-8
brc.CMD_S_SendExpression = [
                            { name : "wSpChairID",type: C_Word},//特殊座位ID
                            { name : "dwExpressionID",type: C_Word},//表情ID
                            ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_BIAOQING,brc.CMD_S_SendExpression,BRCBIBEI);//200-8
//服务器收到了客户端发送表情请求后，返回对应表情命令
brc.CMD_S_GetExpression = [
                           { name : "wSpChairID",type: C_Word},//特殊座位ID
                           { name : "dwExpressionID",type: C_Word},//表情ID
                           ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_BIAOQINGGET,brc.CMD_S_GetExpression,BRCBIBEI);//200-122
//本人发送红包
brc.CMD_C_SendRedEnvelop = [
                            { name : "cbEnvelopType",type: C_Byte},//红包类型
                            { name : "lEnvelopTotalScore",type: C_LongLong},//红包总额
                            { name : "wEnvelopCounts",type: C_Word},//红包个数
                            ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_HONGBAO,brc.CMD_C_SendRedEnvelop,BRCBIBEI);//200,9

//点击红包 200-10
brc.CMD_C_GetRedEnvelop = [
                           { name : "dwEnvelopID",type: C_DWord},//红包ID
                           ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_DIANJIHONGBAO,brc.CMD_C_GetRedEnvelop,BRCBIBEI);//200,10

//点击红包获取结果 200-124
brc.CMD_S_GetSendRedEnvelop = [
                               { name : "cbEnvelopType",type: C_Byte},//红包类型
                               { name : "dwEnvelopID",type: C_DWord},//红包ID
                               { name : "lGetScore",type: C_LongLong},//获得金钱
                               ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_HONGBAOHUOQU ,brc.CMD_S_GetSendRedEnvelop,BRCBIBEI);//200-124

//服务器收到玩家发红包群发红包 200-123
brc.CMD_S_SendRedEnvelop = [
                            { name : "cbEnvelopType",type: C_Byte},//红包类型
                            { name : "dwEnvelopID",type: C_DWord},//红包ID
                            { name : "szNickName",type: C_String ,length : 64},//发红包者昵称
                            ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_FUWUQUNFA,brc.CMD_S_SendRedEnvelop,BRCBIBEI);//200-123

//爆奖开始 200-126
brc.CMD_S_RewardBlastStart = [
                              { name : "lGetScore",type: C_LongLong},//用户得奖
                              { name : "lTotalBlastScore",type: C_LongLong},//奖池数目
                              ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_BAOJIANGBEGIN,brc.CMD_S_RewardBlastStart,BRCBIBEI);//200-126

//点击宝箱后获取爆奖奖励状态 200-128
brc.CMD_S_GetBlastScore = [
                           { name : "lGetScore",type: C_LongLong},//用户得奖
                           { name : "lLeftScore",type: C_LongLong},//奖池数目
                           ];
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_BAOJIANGCLICK,brc.CMD_S_GetBlastScore,BRCBIBEI);//200-128

//爆奖结束 200-127
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_BAOJIANGEND,{},BRCBIBEI);//200-127

//获取爆奖奖励单次点击的数据 200-12
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_BAOJIANGCLICKTOSYSTEM,{},BRCBIBEI);//200-12

//奖池奖励发送请求
BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_C_JIANGCHILISTSEND,{},BRCBIBEI);//200-14

//奖池奖励服务器返回
brc.CMD_GR_JiangChiList = [
                           { name : 'wFaceID',type: C_Word },//用户face I D
                           { name : 'lScore',type: C_LongLong },//用户获得奖励
                           { name : 'szNickName',type: C_String ,length : 64}//用户nickname
                         ];
BinUtils.addCommand( 5, 6,brc.CMD_GR_JiangChiList,BRCBIBEI);//5-6
brc.CMD_S_GetRewardRecord = [
                             { name : 'tagUserRewardInfo',type: C_Array|C_Struct,set:[5,6,BRCBIBEI],array : [4]},//奖池奖励结构体
                             ];
BinUtils.addCommand( brc.SUB_S_GAME, brc.SUB_C_JIANGCHILISTRECIVE,brc.CMD_S_GetRewardRecord,BRCBIBEI);//200-130

//struct CMD_GR_RequestFailure
//{
//    LONG							lErrorCode;							//错误代码
//    TCHAR							szDescribeString[256];				//描述信息
//};
//请求失败
brc.CMD_GR_RequestFailure =[
    {name : "lErrorCode", type : C_Long },
    {name : "szDescribeString" ,type : C_String ,length : 512},

]
BinUtils.addCommand(brc.MDM_GR_USER , brc.SUB_GR_REQUEST_FAILURE,brc.CMD_GR_RequestFailure,BRCBIBEI);//3-103

brc.SUB_C_QUERY_ONLINE_REWARD_CONFIG       =  16;//查询在线奖励配置200-16 
brc.SUB_S_RESULT_ONLINE_REWARD_CONFIG      =  132;//在线奖励配置结果200-132
brc.SUB_C_GET_ONLINE_REWARD       =  15;//请求在线奖励 200-15
brc.SUB_S_TAKE_ONLINE_REWARD      =  131;//在线奖励结果 200-131
brc.SUB_C_QUERY_ONLINE_REWARD_TIME       =  17;//查询奖励剩余时间200-17
brc.SUB_S_RESULT_ONLINE_REWARD_TIME      =  134;//奖励剩余时间 200-134
brc.SUB_GR_TAKE_SCORE_REQUEST            =  3;//取款请求 3
brc.MDM_GR_INSURE                        =  5;//取款请求 5
brc.SUB_GR_USER_INSURE_SUCCESS               =  101;//银行成功 5-101
brc.SUB_GR_USER_INSURE_FAILURE               =  102;//银行失败 5-102
//取款请求 5-3
brc.CMD_GR_C_TakeScoreRequest = [
                             {name : "cbActivityGame" , type:C_Byte},
                             {name : "lTakeScore" , type: C_LongLong},
                             {name : "szInsurePass" , type: C_String , length:66},
                             ];
BinUtils.addCommand( brc.MDM_GR_INSURE, brc.SUB_GR_TAKE_SCORE_REQUEST, brc.CMD_GR_C_TakeScoreRequest,BRCBIBEI);//5,3

////银行成功 5-101
brc.CMD_GR_S_UserInsureSuccess = [
                              {name : "cbActivityGame" , type:C_Byte},
                              {name : "lVariationScore" , type: C_LongLong},
                              {name : "lUserInsure" , type: C_LongLong},
                              {name : "lMoneyPre" , type: C_LongLong},
                              {name : "szDescribeString" , type: C_String, length:256}
                              ];
BinUtils.addCommand( brc.MDM_GR_INSURE, brc.SUB_GR_USER_INSURE_SUCCESS , brc.CMD_GR_S_UserInsureSuccess,BRCBIBEI);//5,101
////银行失败 5-102
brc.CMD_GR_S_UserInsureFailure = [
                              {name : "cbActivityGame" , type:C_Byte},
                              {name : "lErrorCode" , type: C_Long},
                              {name : "szDescribeString" , type: C_String, length:256}
                              ];
BinUtils.addCommand( brc.MDM_GR_INSURE,brc.SUB_GR_USER_INSURE_FAILURE, brc.CMD_GR_S_UserInsureFailure,BRCBIBEI);//5,102

brc.CMD_S_CancelSpChair = [
    {name : "wSpChairID" ,type :C_Word }
];

BinUtils.addCommand(brc.SUB_S_GAME,18,brc.CMD_S_CancelSpChair,BRCBIBEI);//200,18下座
BinUtils.addCommand(brc.SUB_S_GAME,121,brc.CMD_S_CancelSpChair,BRCBIBEI);//200,121

brc.CMD_MB_GameConfig=[
    {name:"GameConfig",type:C_String,length:20000}
];

BinUtils.addCommand(brc.SUB_S_GAME,brc.SUB_S_GAME_CONFIG,brc.CMD_MB_GameConfig,BRCBIBEI);//200,135
//BinUtils.addCommand(1111,1111,CMD_MB_GameConfig,BRCBIBEI);//1111,1111
brc.CMD_CM_SystemMessage = [
    { name : 'wType',type: C_Word },//消息类型
    { name : 'wLength',type: C_Word },//消息长度
    { name : 'szString',type: C_String,length : 1024}//消息长度
];
BinUtils.addCommand(1000,1,brc.CMD_CM_SystemMessage,BRCBIBEI);//1000,1

