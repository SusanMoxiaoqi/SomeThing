
var GAMENAME = 'SHUIHUZHUAN';
var BRCBIBEI = "SHZ_BAIREN";
//和服务器交互的所有东西 都写在这里

var C_Byte = 1; //byte
var C_Bool = 2; //bool
var C_Short = 4; // 
var C_Word = 8; //word
var C_DWord = 16; // dword
var C_Int = 32; // int
var C_Long = 64; //long
var C_Float = 128; //float
var C_Double = 256; 
var C_LongLong = 512; //score
var C_String = 1024; //tchar
var C_Struct = 2048; //struct
var C_Array = 4096; // array

//玩家ID
var g_pUsr_Id = null;

//登陆的账号和密码
var m_pSigned_User_Name = null;
var m_pSigned_User_PassWodd = null;
//注册的账号和密码
var m_pPlay_Name = null;
var m_pPlay_PassWord = null;
var gameSever = null;
var loginServer = null;
//ws://122.10.93.155:6515   外网



//只要不是c_Array|c_String类型的，都不需要写后面的length
//如果是c_struct,填入一个set(主命令，子命令)

var CMD_SHZ_HEARTBEAT = 0;//心跳主命令
var SUB_SHZ_HEARTBEAT = 1;//心跳子命令
/**
 * 登录命令
 * ************************************************/
//登录命令
var MDM_MB_LOGON	= 100;									//广场登录

//登录模式
var SUB_MB_LOGON_GAMEID		=		1;								//I D 登录
var SUB_MB_LOGON_ACCOUNTS		=	2;								//帐号登录
var SUB_MB_REGISTER_ACCOUNTS	=	3;								//注册帐号
var SUB_MB_FAST_REGISTER_ACCOUNTS	=4;								//快速登录
var SUB_MB_RELOGON	=	5;								//重新登录

//登录结果
var SUB_MB_LOGON_SUCCESS	=100;									//登录成功
var SUB_MB_LOGON_FAILURE		=101;									//登录失败
var SUB_MB_LOGON_DELAY		=	102;									//登陆延迟

//升级提示
var SUB_MB_UPDATE_NOTIFY		=200;								//升级提示

//账号登陆
CMD_MB_LogonAccounts = [
                        { name : 'wModuleID',type: C_Word },                        //游戏类型
                        { name : 'dwPlazaVersion',type: C_DWord },                  //大厅版本
                        { name : 'cbDeviceType',type: C_Byte },						//设备类型
                        { name : 'szPassword',type: C_String, length:66 },			//登陆密码
                        { name : 'szAccounts',type: C_String, length:128 },			//登陆账号
                        { name : 'szMachineID',type: C_String, length:128 },         //机器码
                        { name : 'szMobilePhone',type: C_String, length:24 },       //手机型号
                        ];

BinUtils.addCommand( MDM_MB_LOGON,SUB_MB_LOGON_ACCOUNTS,CMD_MB_LogonAccounts);//100,2

//注册账号
CMD_MB_RegisterAccounts = [
                           { name : 'wModuleID',type: C_Word },                         //游戏类型
                           { name : 'dwPlazaVersion',type: C_DWord },                   //大厅版本
                           { name : 'cbDeviceType',type: C_Byte },                      //设备类型
                           { name : 'szLogonPass',type: C_String, length:66 },			//登陆密码
                           { name : 'szInsurePass',type: C_String, length:66 },			//银行密码
                           { name : 'wFaceID',type: C_Word },							//头像标识
                           { name : 'cbGender',type: C_Byte },							//性别
                           { name : 'szAccounts',type: C_String, length:128},			//名称（注册的时候填写的登陆名称）
                           { name : 'szNickName',type: C_String, length:64 },			//昵称（游戏里面的昵称）
                           { name : 'szMachineID',type: C_String, length:128 },
                           { name : 'szMobilePhone',type: C_String, length:24 },
                           ];

BinUtils.addCommand( MDM_MB_LOGON,SUB_MB_REGISTER_ACCOUNTS,CMD_MB_RegisterAccounts);//100,3


////登陆成功
CMD_MB_LogonSuccess = [
                       { name : 'wFaceID',type: C_Word },               //头像ID
                       { name : 'cbGender',type: C_Byte },              //性别（0代表女，1代表男）
                       { name : 'dwUserID',type: C_DWord },             //用户ID，登录游戏使用
                       { name : 'dwGameID',type: C_DWord },             //游戏ID，需要向玩家展示
                       { name : 'dwExperience',type: C_DWord },			//经验值总数
                       { name : 'dwLoveLiness',type: C_DWord },			//用户魅力
                       { name : 'lUserScore',type: C_LongLong },		//用户金币
                       {name : "lLottery",type : C_LongLong},           //用户奖券
                       {name : 'wMemOrder',   type : C_Word},                     //vip等级
                       {name : 'cbHaveReward', type : C_Byte},   //奖励标识
                       {name : 'cbHaveMail', type : C_Byte},  //邮件标识
                       {name : 'szNickName',type: C_String, length:64 },//昵称
                       ];
BinUtils.addCommand( MDM_MB_LOGON,SUB_MB_LOGON_SUCCESS,CMD_MB_LogonSuccess);//100,100

//快速登录
CMD_MB_FastRegisterAccounts = [
                               { name : 'wModuleID',type: C_Word },//模块标识
                               { name : 'dwPlazaVersion',type: C_DWord },//广场版本
                               { name : 'szMachineID',type: C_String,length:128 },//机器标识
                               { name : 'cbDeviceType',type: C_Byte },//设备类型
                               { name : 'szLogonPass',type: C_String,length:66 },//登录密码
                               { name : 'szInsurePass',type: C_String,length:66 },//银行密码
                               { name : 'wFaceID',type: C_Word },//头像标识
                               { name : 'cbGender',type: C_Byte },//用户性别
                               { name : 'cbRegType',type: C_Word },//注册类型
                               { name : 'szAccounts',type: C_String,length:128 },//注册帐号
                               { name : 'szNickName',type: C_String,length:64 },//用户昵称
                               { name : 'szSpreader',type: C_String,length:32 },//推荐账号
                               { name : 'szPassPortID',type: C_String,length:36 },//证件号码
                               { name : 'szCompellation',type: C_String,length:32 },//真实名字
                               { name : 'cbValidateFlags',type: C_Word },//校验标识
                               { name : 'wLocalTime',type: C_Word },//本地时间
                               { name : 'szMobilePhone',type: C_String,length:24 },//电话号码
                               { name : 'szThirdPartyID',type: C_String,length:256 },//三方帐号
                               ];

BinUtils.addCommand( MDM_MB_LOGON,SUB_MB_FAST_REGISTER_ACCOUNTS,CMD_MB_FastRegisterAccounts );//100,4
//重新登录命令100-5
CMD_MB_Relogon = [
                  {name : "dwUserID" , type : C_DWord}
                  ];
BinUtils.addCommand( MDM_MB_LOGON, SUB_MB_RELOGON, CMD_MB_Relogon);//100,5
//登录大厅失败
CMD_MB_LogonHallFailure = [
                           { name : 'lResultCode',type: C_Long },			//错误代码
                           { name : 'szDescribeString',type: C_String, length:256 },	//描述消息
                           ];
BinUtils.addCommand( MDM_MB_LOGON,SUB_MB_LOGON_FAILURE,CMD_MB_LogonHallFailure);//100,101
//登录延迟
CMD_MB_LogonDelay = [
                     { name : 'dwDelayTime',type: C_Word },   //延迟间隔     
                     ];
BinUtils.addCommand( MDM_MB_LOGON,SUB_MB_LOGON_DELAY,CMD_MB_LogonDelay);//100,102

//升级提示
CMD_MB_UpdateNotify = [
                       { name : 'cbMustUpdate',type: C_Byte },			//强制升级
                       { name : 'cbAdviceUpdate',type: C_Byte },		//建议升级
                       { name : 'dwCurrentVersion',type: C_DWord },		//当前版本
                       ];
BinUtils.addCommand( MDM_MB_LOGON,SUB_MB_UPDATE_NOTIFY,CMD_MB_UpdateNotify);//大厅登录延迟
/**拼酒活动*****
 * 
 * 
 * ********************/
var  MDM_MB_ACTIVITIES_SERVICE	=103;									//活动服务
//剿匪活动
var SUB_MB_START_BANDIT_ACTIVITY		=1;							//开启
var SUB_MB_STOP_BANDIT_ACTIVITY			=2;							//停止
var SUB_MB_QUERY_BANDIT_TIME			=3;						//查询活动时间
var SUB_MB_RESULT_BANDIT_TIME			=4;							//活动时间结果
var SUB_MB_REQUEST_BANDIT_SCENE			=5;							//请求活动场景
var SUB_MB_RESULT_BANDIT_SCENE			=6;							//活动场景结果
var SUB_MB_WRITE_BANDIT_INFO			=7;							//写活动积分
var SUB_MB_QUERY_BANDIT_RANKLIST		=8;							//查询活动排行榜
var SUB_MB_RESULT_BANDIT_RANKLIST		=9;							//活动排行榜

//对酒活动
var  SUB_MB_QUERY_USER_DRINK_INFO		=101;							//获取用户拼酒信息
var  SUB_MB_RESULT_USER_DRINK_INFO		=102;							//拼酒信息结果
var  SUB_MB_REQUEST_DRINK				=103;							//请求拼酒
var  SUB_MB_RESULT_DRINK_ONCE			=104;							//拼酒一次结果
var  SUB_MB_RESULT_DRINK_TEN_TIMES		=105;							//拼酒十次结果
var  SUB_MB_ACTIVITY_FAILURE				=900;							//活动操作失败
//获取用户拼酒信息
DrinkResultItem = [
                   {name : "wRewardID" , type : C_Word},// 奖励类型ID
                   {name : "lCounts" , type : C_LongLong},// 奖励数目
                   {name : "szItemName" , type : C_String,length : 32},// 奖励标识
                   ];
BinUtils.addCommand( 103, 1000, DrinkResultItem);
//查询用户拼酒信息
CMD_MB_QueryUserDrinkInfo = [
                             {name : "dwUserID" , type : C_DWord}
                             ]
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE, SUB_MB_QUERY_USER_DRINK_INFO, CMD_MB_QueryUserDrinkInfo);//103,101
//拼酒信息结果
CMD_MB_ResultUserDrinkInfo = [
                              {name : "wFreeTimes" , type : C_Array | C_Word,array : [3]},  //免费剩余次数
                              {name : "wTotalFreeTimes" , type : C_Array | C_Word ,array : [3]},//总免费次数
                              {name : "dwFreeNeedTime" , type : C_Array | C_DWord ,array : [3]},  //免费需要时间
                              {name : "lDrinkOnceScore" , type : C_Array | C_LongLong ,array : [3]}, //拼酒一次需要金钱
                              {name : "lDrinkTenScore" , type : C_Array | C_LongLong ,array : [3]},//拼酒十次需要金钱
                              {name : "lBigScore" , type : C_Array | C_LongLong ,array : [3]},//大额金币
                              {name : "lBigLottery" , type : C_Array | C_LongLong ,array : [3]},//大额奖券
                              ]
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE, SUB_MB_RESULT_USER_DRINK_INFO, CMD_MB_ResultUserDrinkInfo);//103,102
//请求拼酒
CMD_MB_RequestDrink = [
                       {name : "dwUserID" , type : C_DWord},
                       {name : "wNpcID" , type : C_Word},	//NPC标识 0 : 鲁智深，1 : 林冲，2 :宋江
                       {name : "wDrinkTimes" , type : C_Word}
                       ]
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE, SUB_MB_REQUEST_DRINK, CMD_MB_RequestDrink);
//拼酒一次结果
CMD_MB_ResultDrinkOnce = [
                          {name : "wNpcID" , type : C_Word},
                          {name : "lGetScore" , type : C_LongLong},
                          {name : "lGetLottery" , type : C_LongLong},
                          {name : "DrinkResult" , type : C_Array | C_Struct,set : [103,1000],array : [1]}
                          ]
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE, SUB_MB_RESULT_DRINK_ONCE, CMD_MB_ResultDrinkOnce);//103,104
//拼酒十次结果
CMD_MB_ResultDrinkTenTimes =  [
                               {name : "wNpcID" , type : C_Word},
                               {name : "lGetScore" , type : C_LongLong},
                               {name : "lGetLottery" , type : C_LongLong},
                               {name : "DrinkResult" , type : C_Array | C_Struct,set : [103,1000],array : [10]}
                               ]
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE, SUB_MB_RESULT_DRINK_TEN_TIMES, CMD_MB_ResultDrinkTenTimes);//103,105
//活动失败
CMD_MB_ActivityFailure = [
                          {name : "lResultCode" , type : C_Long},// 错误码
                          {name : "szDescribeString" , type : C_String, length : 64}
                          ]
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE, SUB_MB_ACTIVITY_FAILURE, CMD_MB_ActivityFailure);//103,900


/** 活动剿匪命令*/
//剿匪活动开启103 1
CMD_MB_StartBanditActivity = [
{name : "wActivityID" , type : C_Word} //活动ID
];
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE, SUB_MB_START_BANDIT_ACTIVITY, CMD_MB_StartBanditActivity);//103,1

//剿匪活动停止103 2
CMD_MB_StopBanditActivity = [
{name : "wActivityID" , type : C_Word} //活动ID
];
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE, SUB_MB_STOP_BANDIT_ACTIVITY, CMD_MB_StopBanditActivity);//103,2
//查询剿匪活动时间 103 3
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE,SUB_MB_QUERY_BANDIT_TIME, {});//103,3

//剿匪活动时间结果 103 4
CMD_MB_BanditActivityTime = [
{name : "lResultCode" ,type : C_Long }, //状态值
{name : "bStarted" ,type : C_Bool },//活动是否开始
{name : "wActivityID" ,type : C_Word }, //活动id
{name : "wBeginCount" ,type : C_Word }, //活动一天开始的次数
{name : "dwBeginTime" ,type : C_Array|C_DWord ,array:[10]} //开始的时间点
];
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE,SUB_MB_RESULT_BANDIT_TIME,CMD_MB_BanditActivityTime);//103,4

//请求时间剿匪活动场景103 5 
CMD_MB_RequestBanditScene = [
{name : "dwUserID" ,type :C_DWord } 
];
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE,SUB_MB_REQUEST_BANDIT_SCENE,CMD_MB_RequestBanditScene);//103,5

tagBanditNpc = [
{name : "dwIndex" ,type : C_DWord},
{name : "dwCounts" ,type :C_DWord },//此种npc个数
{name : "dwBlood" ,type : C_DWord}, //靶子的血量
{name : "lRewardScore" ,type : C_LongLong}  //靶子的分数
];
BinUtils.addCommand( 1000,11,tagBanditNpc);

//剿匪活动场景结果 103 6 
CMD_MB_ResultBanditScene = [
{name : "dwTime" ,type :C_DWord },  //时长
{name : "dwEnergy" , type : C_DWord},  //能量
{name : "lScore" , type : C_LongLong},  //积分
{name : "wExchangeRatio" , type : C_Word},  //积分银两兑换率
{name : "wFrontNpcItems" , type : C_Word},  //前排NPC种类
{name : "wBackNpcItems" , type : C_Word},  //后排NPC种类
{name : "FrontNpc" , type : C_Array| C_Struct,set:[1000,11] ,array:[5]},//前排NPC的属性
{name : "BackNpc" , type : C_Array| C_Struct,set:[1000,11], array:[5]},//后排NPC的属性
];
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE,SUB_MB_RESULT_BANDIT_SCENE,CMD_MB_ResultBanditScene);//103,6

//写剿匪活动积分 103 7
CMD_MB_WriteBanditInfo = [
{name : "dwUserID" ,type :C_DWord },
{name : "dwEnergy" ,type :C_DWord },//剩余能量
{name : "lScore" ,type :C_LongLong }//当前总积分
];
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE,SUB_MB_WRITE_BANDIT_INFO,CMD_MB_WriteBanditInfo);//103,7
//查询剿匪活动排行榜 
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE,SUB_MB_QUERY_BANDIT_RANKLIST,{});//103,8
////剿匪活动排行榜
CMD_MB_ResultBanditRanklist = [
{name : "szRanklist" , type: C_String, length:2048 },
];
BinUtils.addCommand( MDM_MB_ACTIVITIES_SERVICE,SUB_MB_RESULT_BANDIT_RANKLIST,CMD_MB_ResultBanditRanklist);//103,9
/**###########################################*/
/**
 * 列表命令
 * 
 * ************************************************/
var  MDM_MB_SERVER_LIST		=	101;									//列表信息

//列表信息
var  SUB_MB_LIST_KIND		=	100;									//种类列表
var  SUB_MB_LIST_SERVER	=		101;									//房间列表
var  SUB_MB_LIST_FINISH		=	200;									//列表完成


//游戏房间，房间列表
tagGameServer =[
                { name : 'wKindID',type: C_Word },//名称索引
                { name : 'wNodeID',type: C_Word },//节点索引
                { name : 'wSortID',type: C_Word },//排序索引
                { name : 'wTypeID',type: C_Word },//房间类型
                { name : 'wServerID',type: C_Word },//房间索引
                { name : 'wServerPort',type: C_Word },//房间端口
                { name : 'wServerType',type: C_Word },//游戏类型
                { name : 'cbIsVisible',type: C_Byte },//游戏类型
                { name : 'dwOnLineCount',type: C_DWord },	//在线人数
                { name : 'dwUnAndroidCount',type: C_DWord },//真人在线
                { name : 'dwFullCount',type: C_DWord },//满员人数
                { name : 'lCellScore',type: C_LongLong },//游戏底注
                { name : 'lMinEnterScore',type: C_LongLong },//最低积分
                { name : 'lMaxEnterScore',type: C_LongLong },//最高积分
                { name : 'szServerAddr',type: C_String, length:64 },//房间名称
                { name : 'szServerName',type: C_String, length:64 },//房间名称
                ];
BinUtils.addCommand( MDM_MB_SERVER_LIST,SUB_MB_LIST_SERVER,tagGameServer);//101,101



/**
 * 
 * 用户服务
 * */
//用户服务
var  MDM_MB_USER_SERVICE		=	102									//用户服务

//账号服务
var  SUB_MB_MODIFY_MACHINE		=  100									//修改机器
var  SUB_MB_MODIFY_LOGON_PASS	=101									//修改密码
var  SUB_MB_MODIFY_INSURE_PASS	=102									//修改密码
var  SUB_MB_MODIFY_UNDER_WRITE	=103									//修改签名
var  SUB_MB_APPLY_PROTECT        =104                                 //申请密保

//修改头像
var  SUB_MB_USER_FACE_INFO		=200									//头像信息
var  SUB_MB_SYSTEM_FACE_INFO		=201									//系统头像
var  SUB_MB_CUSTOM_FACE_INFO		=202									//自定头像

//个人资料
var  SUB_MB_USER_INDIVIDUAL		=301									//个人资料
var 	SUB_MB_QUERY_INDIVIDUAL		=302									//查询信息
var  SUB_MB_MODIFY_INDIVIDUAL	=303									//修改资料
var  SUB_MB_SIGNIN_INDIVIDUAL	=304									//签到资料
var  SUB_MB_USER_MEMBER			=305									//会员资料
var  SUB_MB_GET_MEMNER			=306									//得到会员
var  SUB_MB_QUERY_MOBILE_USER_INFO	=307									//查询信息
var  SUB_MB_MOBILE_USER_INFO			=308									//用户信息

//银行服务
var  SUB_MB_USER_SAVE_SCORE		=400									//存款操作
var  SUB_MB_USER_TAKE_SCORE		=401									//取款操作
var  SUB_MB_USER_TRANSFER_SCORE	=402									//转账操作
var  SUB_MB_USER_INSURE_INFO		=403									//银行资料
var  SUB_MB_QUERY_INSURE_INFO	=404									//查询银行
var  SUB_MB_USER_INSURE_SUCCESS	=405									//银行成功
var  SUB_MB_USER_INSURE_FAILURE	=406									//银行失败
var  SUB_MB_QUERY_USER_INFO_REQUEST	=407								//查询用户
var  SUB_MB_QUERY_USER_INFO_RESULT	=408								//用户信息
var  SUB_MB_CHANGE_MONEY			=409									//兑换操作
var  SUB_MB_RECHARE_SUCCESS		=410									//充值成功

var  SUB_MB_REQUEST_EXCHANGE_CDKEY	=411								//兑换CDKEY
var  SUB_MB_RESULT_EXCHANGE_CDKEY	=412								//兑换结果
var  SUB_MB_QUERY_WEEK_REWARD	=413									//查询周奖励
var  SUB_MB_RESULT_WEEK_REWARD	=414									//查询结果
var  SUB_MB_QUERY_HISTORY_SCORE	=415									//请求历史分数
var  SUB_MB_RESULT_SHARE_GAME	=416									//分享结果
var  SUB_MB_RESULT_HISTORY_SCORE= 417									//历史分数结果
var  SUB_MB_REQUEST_SHARE_GAME	=418									//请求分享游戏
//低保信息
var  SUB_MB_QUERE_TAKE_GOLD   =   500                                 //查询低保信息
var  SUB_MB_TAKE_GOLD_SET        =501                                 //低保信息
var  SUB_MB_GET_TAKE_GOLD        =502                                 //获得低保
var  SUB_MB_TAKE_GOLD_SUCCESS	=503									//低保成功
var  SUB_MB_TAKE_GOLD_FAILURE	=504									//低保失败

//查询签到
var  SUB_MB_GET_SIGNIN			=505									//签到结果
var  SUB_MB_REQUITE_SIGNIN		=506									//查询签到
var  SUB_MB_REQUEST_TRUMPET		=600									//请求喇叭
var  SUB_MB_GET_REWARD_POOL		=601									//查询奖池
var  SUB_MB_REWARD_POOL_INFO		=602									//奖池信息
var  SUB_MB_PROPERTY_TRUMPET		=603									//喇叭道具

//操作结果
var  SUB_MB_OPERATE_SUCCESS		=900									//操作成功
var  SUB_MB_OPERATE_FAILURE		=901									//操作失败
var  SUB_MB_PROPERTY_SUCCESS		=902									//道具成功
var  SUB_MB_PROPERTY_FAILURE		=903									//道具失败

var  SUB_MB_QUERY_RECHARGE_CONFIG = 419;								//查询充值配置
var SUB_MB_RESULT_RECHARGE_CONFIG = 420;								//充值配置结果

//查询充值配置
CMD_MB_QueryRechargeConfig = [
                              { name : 'dwChannelID',                type : C_DWord },
                              ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_QUERY_RECHARGE_CONFIG,CMD_MB_QueryRechargeConfig);//102,419
//充值配置
tagRechargeItem = [
                   { name : 'wType',                     type : C_Word },
                   { name : 'dwMoney',                type : C_DWord },
                   { name : 'dwReturn',                type : C_DWord },
                   { name : 'dwScore',                  type : C_DWord },
                   { name : 'wPicID',                		type : C_Word },
                   ];
BinUtils.addCommand(102,4200,tagRechargeItem);//102,4200

var MAX_ITEM_COUNTS  = 10;
CMD_MB_ResultRechargeConfig = [
                               { name : 'RechargeItem',                     type : C_Array | C_Struct, set : [102,4200],array : [5],mode : "dataLength"}
                               ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_RESULT_RECHARGE_CONFIG,CMD_MB_ResultRechargeConfig);//102,4200

/**修改头像操作*/
//修改头像 客户端
CMD_GP_SystemFaceInfo = [
                         { name : 'wFaceID',                type : C_Word },
                         { name : 'dwUserID',                type : C_DWord },
                         { name : 'szPassword',type: C_String, length:66 },			//登陆密码
                         { name : 'szMachineID',type: C_String, length:128 },         //机器码
                         { name : 'szUserkey',type: C_String, length:66 },  
                         ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_SYSTEM_FACE_INFO,CMD_GP_SystemFaceInfo);//102,201
//头像信息
CMD_GP_UserFaceInfo = [
                       { name : 'wFaceID',                type : C_Word },
                       { name : 'dwCustomID',                type : C_DWord },
                       ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_USER_FACE_INFO,CMD_GP_UserFaceInfo);//102,200
//操作失败
CMD_GP_OperateFailure = [
                         { name : 'lResultCode',                type : C_Long },
                         { name : 'szDescribeString',type: C_String, length:256 },			
                         ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_OPERATE_FAILURE,CMD_GP_OperateFailure);//102,901
/**银行操作*/
//存款操作
CMD_GP_UserSaveScore = [
                        { name : 'dwUserID',type: C_DWord },//用户 I D
                        { name : 'lSaveScore',type: C_LongLong },//存入金币
                        { name : 'szMachineID',type: C_String, length:128 },         //机器码
                        { name : 'szUserkey',type: C_String, length:66 },  
                        ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_USER_SAVE_SCORE,CMD_GP_UserSaveScore);//102,400
//取款操作
CMD_GP_UserTakeScore = [
                        { name : 'dwUserID',type: C_DWord },//用户 I D
                        { name : 'lTakeScore',type: C_LongLong },//取出金币
                        { name : 'szPassword',type: C_String, length:66 },			//银行密码
                        { name : 'szMachineID',type: C_String, length:128 },         //机器码
                        { name : 'szUserkey',type: C_String, length:66 },  
                        ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_USER_TAKE_SCORE,CMD_GP_UserTakeScore);//102,401
//兑换金币  cbExchangeType：该类型是0表示兑换金币，为1表示兑换奖券
CMD_GP_ChangeMoney = [
                      { name : 'dwUserID',type: C_DWord },//用户 I D
                      { name : 'lMoneyPre',type: C_LongLong },//兑换数量
                      { name : 'cbExchangeType',type: C_DWord },//兑换类型
                      { name : 'szPassword',type: C_String, length:66 },			//银行密码
                      { name : 'szMachineID',type: C_String, length:128 },         //机器码
                      { name : 'szUserkey',type: C_String, length:66 },  
                      ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_CHANGE_MONEY,CMD_GP_ChangeMoney);//102,409
////银行成功
CMD_GP_UserInsureSuccess = [
                            { name : 'dwUserID',type: C_DWord },//用户 I D
                            { name : 'lUserScore',type: C_LongLong },//兑换钱包
                            { name : 'lUserInsure',type: C_LongLong },//用户钱包
                            { name : 'lMoneyPre',type: C_LongLong },//金币数量
                            { name : 'lMoneyPre',type: C_LongLong },//奖券数量
                            { name : 'szDescribeString',type: C_String, length:256 },//描述信息			
                            ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_USER_INSURE_SUCCESS,CMD_GP_UserInsureSuccess);//102,405
////银行失败
CMD_GP_UserInsureFailure = [
                            { name : 'lResultCode',type: C_Long },//错误代码
                            { name : 'szDescribeString',type: C_String, length:256 },//描述信息	
                            ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_USER_INSURE_FAILURE,CMD_GP_UserInsureFailure);//102,406
//查询银行
CMD_GP_QueryInsureInfo = [
                          { name : 'dwUserID',type: C_DWord },//用户 I D
                          { name : 'szUserkey',type: C_String, length:66 },  //用户key
                          ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_QUERY_INSURE_INFO,CMD_GP_QueryInsureInfo);//102,404
//银行资料
CMD_GP_UserInsureInfo = [
                         { name : 'wRevenueTake',type: C_Word },//税收比例
                         { name : 'wRevenueTransfer',type: C_Word },//税收比例
                         { name : 'wServerID',type: C_Word },//房间标示
                         { name : 'lUserScore',type: C_LongLong },//用户金币
                         { name : 'lUserInsure',type: C_LongLong },//银行金币
                         { name : 'lTransferPrerequisite',type: C_LongLong },//转帐条件
                         { name : 'lMoneyPre',type: C_LongLong },//金币数量
                         { name : 'lLottery',type: C_LongLong },//奖券信息
                         ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_USER_INSURE_INFO,CMD_GP_UserInsureInfo);//102,403
/**每日签到*/
////签到资料
CMD_GP_SignIn = [
                 { name : 'dwUserID',type: C_DWord },//用户 I D
                 { name : 'dwDays',type: C_DWord },//签到天数
                 { name : 'localTime',type:C_String, length:32 },//签到时间
                 { name : 'szNowTime',type:C_String,length:32},//当前时间
                 { name : 'szUserkey',type: C_String, length:66 }, //用户key
                 ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_SIGNIN_INDIVIDUAL,CMD_GP_SignIn);//102,304
//签到查询
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_REQUITE_SIGNIN,CMD_GP_SignIn);//102,506
//签到结果
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_GET_SIGNIN,CMD_GP_SignIn);//102,505
//分享结果 102-416
CMD_MB_Result_ShareGame = [
                           {name : "lShareScore",type : C_Long},
                           {name : 'szDescribeString',type : C_String,length : 256}
                           ];
BinUtils.addCommand( MDM_MB_USER_SERVICE, SUB_MB_RESULT_SHARE_GAME, CMD_MB_Result_ShareGame);//102,416
//请求分享游戏
CMD_CS_S_ShareGame = [
                      {name : "dwUserID",type : C_DWord },
                      {name : 'wKindID',type : C_Word},
                      {name : 'wShareType',type : C_Word},
                      ];
BinUtils.addCommand( MDM_MB_USER_SERVICE, SUB_MB_REQUEST_SHARE_GAME, CMD_CS_S_ShareGame);//102,418
//操作成功
CMD_GP_OperateSuccess = [
                         { name : 'lResultCode',                type : C_Long },
                         { name : 'szDescribeString',type: C_String, length:256 },			
                         ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_OPERATE_SUCCESS,CMD_GP_OperateSuccess);//102,900
//修改资料
CMD_GP_ModifyIndividual = [
                           {name : 'cbGender' ,type : C_Byte},//用户性别
                           {name : 'dwUserID' ,type : C_DWord},//用户ID
                           { name : 'szPassword',type: C_String, length:66 },		
                           { name : 'szUserkey',type: C_String, length:66 },  //用户key
                           { name : 'szNickName',type: C_String, length:64 },			//昵称（游戏里面的昵称）
                           ];
BinUtils.addCommand( MDM_MB_USER_SERVICE, SUB_MB_MODIFY_INDIVIDUAL, CMD_GP_ModifyIndividual);//102,303

//大厅接收喇叭消息
CMD_MB_Send_Trumpet = [
                       {name : 'dwSendUserID' ,type : C_DWord},//用户ID
                       {name : 'szSendNickName' , type : C_String ,length : 64},//用户昵称
                       {name : 'szTrumpetContent' , type : C_String,length : 256}//喇叭内容
                       ];
BinUtils.addCommand( MDM_MB_USER_SERVICE, SUB_MB_PROPERTY_TRUMPET, CMD_MB_Send_Trumpet);//102,603
//请求用户当前信息
CMD_MB_QueryMobileUserInfo = [
                              { name : 'dwUserID',type: C_DWord }, 
                              { name : 'szUserkey',type: C_String, length:66 },  
                              ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_QUERY_MOBILE_USER_INFO,CMD_MB_QueryMobileUserInfo);//102,307
//返回用户当前的信息
CMD_MB_MobileUserInfo = [
                         { name : 'dwUserID',type: C_DWord }, 
                         { name : 'lUserScore',type: C_LongLong },	
                         { name : "lLottery",type : C_LongLong},
                         { name : 'wMemOrder',   type : C_Word},
                         { name : 'dwExperience',type : C_DWord },
                         { name : 'szNickName',type: C_String, length:64 },  
                         ];
BinUtils.addCommand(MDM_MB_USER_SERVICE,SUB_MB_MOBILE_USER_INFO,CMD_MB_MobileUserInfo);//102,308

//查询周奖励
CMD_MB_Query_WeekReward = [
                           { name : 'wKindID',type : C_Word }
                           ];
BinUtils.addCommand(MDM_MB_USER_SERVICE, SUB_MB_QUERY_WEEK_REWARD,CMD_MB_Query_WeekReward);//102,413
//返回结果
CMD_MB_Result_WeekReward = [
                            {name : 'lRewardScore' , type:C_LongLong},
                            {name : 'szDescribeString' , type:C_String , length:256}
                            ];
BinUtils.addCommand( MDM_MB_USER_SERVICE, SUB_MB_RESULT_WEEK_REWARD, CMD_MB_Result_WeekReward);//102,414

//请求兑换
CMD_MB_Request_ExchangeCDKEY = [
                                {name : "dwUserID" , type :C_DWord },
                                {name : "wKindID" , type :C_Word },
                                {name : "szCardKey" , type :C_String ,length:64 }
                                ];
BinUtils.addCommand( MDM_MB_USER_SERVICE, SUB_MB_REQUEST_EXCHANGE_CDKEY, CMD_MB_Request_ExchangeCDKEY);//102,411
//兑换结果
CMD_MB_Result_ExchangeCDKEY = [
                               {name : "lExchangeScore" , type :C_LongLong },
                               {name : "szDescribeString" , type :C_String ,length:256 }
                               ];
BinUtils.addCommand( MDM_MB_USER_SERVICE, SUB_MB_RESULT_EXCHANGE_CDKEY, CMD_MB_Result_ExchangeCDKEY);//102,412
//查询奖池 102  601
CMD_MB_GetRewardPool = [
                        {name : 'wKindID',type : C_Word}
                        ];
BinUtils.addCommand( MDM_MB_USER_SERVICE, SUB_MB_GET_REWARD_POOL, CMD_MB_GetRewardPool);//102,601
//奖池信息 102 602
CMD_MB_RewardPoolInfo = [
                         {name : 'lRewardPoolScore', type : C_LongLong},
                         {name : 'wKindID',type : C_Word},     
                         ];
BinUtils.addCommand( MDM_MB_USER_SERVICE, SUB_MB_REWARD_POOL_INFO, CMD_MB_RewardPoolInfo);//102,602
/**####################################*/


/**
 * 
 * 列表命令
 * */
//列表命令

var MDM_GP_SERVER_LIST		=	2									//列表信息

//获取命令
var SUB_GP_GET_LIST			=	1									//获取列表
var SUB_GP_GET_SERVER		=	2									//获取房间
var SUB_GP_GET_ONLINE		=	3									//获取在线
var SUB_GP_GET_COLLECTION	=	4									//获取收藏

//列表信息
var SUB_GP_LIST_TYPE		=	100									//类型列表
var SUB_GP_LIST_KIND		=	101									//种类列表
var SUB_GP_LIST_NODE		=	102									//节点列表
var SUB_GP_LIST_PAGE		=	103									//定制列表
var SUB_GP_LIST_SERVER		=	104									//房间列表
var SUB_GP_VIDEO_OPTION		=	105									//视频配置

//完成信息
var SUB_GP_LIST_FINISH		=	200									//发送完成
var SUB_GP_SERVER_FINISH	=	201									//房间完成

//在线信息
var SUB_GR_KINE_ONLINE		=	300									//类型在线
var SUB_GR_SERVER_ONLINE	=	301									//房间在线

//3.2.13 类型在线
tagOnLineInfoKind = [
                     {name : 'wKindID', type: C_Word },//类型数目
                     {name : 'dwOnLineCount', type: C_Word }//房间标识 
                     ];
BinUtils.addCommand( 1000, 10, tagOnLineInfoKind);
CMD_GP_KindOnline = [
                     {name : 'wKindCount', type: C_Word },//类型数目
                     {name : 'OnLineInfoKind', type: C_Array |C_Struct,set:[1000,10],array : [1]}//在线信息,在水浒传游戏中只有一种游戏类型。
                     ];
BinUtils.addCommand( MDM_GP_SERVER_LIST, SUB_GR_KINE_ONLINE, CMD_GP_KindOnline);//2,300

//3.2.14 房间在线
tagOnLineInfoServer = [
                     {name : 'wServerID', type: C_Word },//类型数目
                     {name : 'dwOnLineCount', type: C_DWord }//房间标识 
                     ];
BinUtils.addCommand( 1000, 9, tagOnLineInfoServer);

/**
 * 因为房间数目不确定所以这个命令是动态添加的，在大厅登录完成的时候添加此命令
 * */
addCommandCMD_GP_ServerOnline = function(serverNumber){
CMD_GP_ServerOnline = [
                     {name : 'wKindCount', type: C_Word },//类型数目
                     {name : 'OnLineInfoServer', type: C_Array | C_Struct,set:[1000,9],array : [serverNumber]}//在线信息
                     ];
BinUtils.addCommand( MDM_GP_SERVER_LIST, SUB_GR_SERVER_ONLINE, CMD_GP_ServerOnline);//2,301
//获取在线信息
CMD_GP_GetOnline = [
                    {name : 'dwUserID', type: C_DWord},//用户ID
                    {name : 'wServerCount', type: C_Word},//房间数目
                    {name : 'szUserKey', type: C_String, length:66 },//用户Key
                    {name : 'wOnLineServerID', type: C_Array|C_Word, array:[serverNumber]}//房间标识 
                    ];
BinUtils.addCommand( MDM_GP_SERVER_LIST, SUB_GP_GET_ONLINE, CMD_GP_GetOnline);//2,3
}


CMD_S_AddCreditScoreResult = [
                              { name : 'exchange_credit_score_',                                 type: C_LongLong },//每次进入房间的上分数
                              { name : 'credit_score_',                                 type: C_LongLong },//进入房间当前的分数
                              { name : 'bSuccess',                                 type: C_Byte },//进入房间当前的分数
                              ];
BinUtils.addCommand( 200,107, CMD_S_AddCreditScoreResult,GAMENAME);
////请求在线奖励
//struct CMD_GR_RequestOnlineReward
//{
//	DWORD							dwUserID;							//用户ID
//};
//
////在线奖励领取
//struct CMD_GR_ResultOnlineReward
//{
//	DWORD							dwUserID;
//	WORD							wResult;							//0成功 1领取次数满 2不到领取时间
//	DWORD							dwCount;							//已经成功领取的次数
//	SCORE							lRewardScore;						//领取的奖励数
//	TCHAR							szDescribeString[128];				//描述消息
//};

//查询在线奖励配置200-16 

BinUtils.addCommand( 200,16, {},GAMENAME);

//在线奖励配置结果200-116
CMD_GR_ResultOnlineRewardConfig = [
                                   {name : "bEnable" , type:C_Bool},//有无在线奖励
                                   {name : "dwTotalCount" , type:C_DWord},//可领取的次数	
                                   {name : "dwGetCount" , type:C_DWord},	//已领取次数
                                   {name : "dwNeedTime" , type:C_DWord},//下次领取需要时间
                                   { name : 'dwRewardInfo',type: C_Array|C_DWord, array:[10,3]}	//类型、时间、数量
                                   ]; 
BinUtils.addCommand( 200,116, CMD_GR_ResultOnlineRewardConfig,GAMENAME);

//查询奖励剩余时间200-15

BinUtils.addCommand( 200,15, {},GAMENAME);

//奖励剩余时间 200-117
CMD_GR_ResultRewardTime = [
                           {name : "dwLeftTime" , type:C_DWord},
                           ]; 
BinUtils.addCommand( 200,117, CMD_GR_ResultRewardTime,GAMENAME);

//请求在线奖励 200-14

BinUtils.addCommand( 200,14, {},GAMENAME);

//在线奖励结果 200-115
CMD_GR_ResultOnlineReward = [
                             {name : "lResultCode" ,type :C_Long },
                             {name : "dwHaveTakeCounts" ,type :C_DWord },
                             {name : "lRewardScore" , type : C_LongLong},
                             {name : "szDescribeString" , type: C_String, length:256}
                             ];
BinUtils.addCommand( 200,115, CMD_GR_ResultOnlineReward,GAMENAME);


BinUtils.addCommand( 200,118, {},GAMENAME);//凌晨服务器发过来的命令
//200 5 游戏的分
BinUtils.addCommand( 200, 5, {},GAMENAME);




//排行榜服务
var MDM_MB_RANKLIST_SERVICE			=	104;							//活动服务
var SUB_MB_QUERY_RANKLIST			=	1;								//查询排行榜
var SUB_MB_REQUEST_RANKLIST_REWARD	=	2								//领取排行榜奖励
var SUB_MB_RESULT_RANKLIST			=	100;							//排行榜信息
var SUB_MB_RANKLIST_FAILURE			=	900;							//排行榜操作失败
var SUB_MB_RANKLIST_SUCCESS		=	901								//排行榜操作成功

//查询排行榜
//0今日得分榜1今日奖券榜2今日战绩榜3昨日战绩榜4本周战绩榜5上周战绩榜6今日消费榜7昨日消费榜8人气榜
CMD_MB_QueryRankList = [
                        {name : "dwUserID",type : C_DWord},
                        {name : "wRankListID",type : C_Word}
                        ];
BinUtils.addCommand( 104,1, CMD_MB_QueryRankList);
//查询排行榜接收的信息
CMD_MB_PaiHangResultList=[
                          {name:"resultList",type:C_String,length:20000}
                          ];
BinUtils.addCommand(104,100,CMD_MB_PaiHangResultList);

//领取排行榜奖励
CMD_MB_PaiHangLingqu=[
						{name : "dwUserID",type : C_DWord},
						{name : "wRankListID",type : C_Word}
                      ];
BinUtils.addCommand(104,2,CMD_MB_PaiHangLingqu);

//点赞
CMD_MB_RequestRankListPraise =[
                               {name : "dwUserID",type : C_DWord},
                               {name : "wRankListID",type : C_Word},
                               {name : "dwPraisedUserID",type : C_DWord}
                               ];
BinUtils.addCommand(104,3,CMD_MB_RequestRankListPraise);

CMD_MB_RankListFailure = [
                          {name : "lResultCode",type : C_Long},
                          {name : "szStringDescrible",type : C_String,length:128}
                          ];
BinUtils.addCommand(104,900,CMD_MB_RankListFailure);
//排行榜操作成功
BinUtils.addCommand(104,901,{});
//滚动信息返回
CMD_MB_PaiHangResultMassage=[
                          {name:"resultMassage",type:C_String,length:20000}
                          ];
BinUtils.addCommand(104,101,CMD_MB_PaiHangResultMassage);
//发送是否有可领取的奖励请求
//查询排行榜未领取奖励 104-4
var CMD_MB_QueryRankListReward=[
                                {name:"dwUserID",type:C_DWord}
                                ];
BinUtils.addCommand(104,4,CMD_MB_QueryRankListReward);
//是否有可领取的奖励返回
var CMD_MB_QueryRankListRecieve=[
                                 {name:"rewardList",type:C_String,length:20000}
                                ];
BinUtils.addCommand(104,102,CMD_MB_QueryRankListRecieve);


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


//游戏中小玛丽支持短暂的重连
CMD_GR_LogonReconnect = [
                         { name : 'wGameID',type: C_Word},//游戏标识
                         { name : 'dwUserID',type: C_DWord },             //用户ID，登录游戏使用
                         { name : 'szPassword',type: C_String, length:66 },			//登陆密码
                         ];
BinUtils.addCommand( 1,5, CMD_GR_LogonReconnect,GAMENAME);
//重连成功
tagSceneStatus = [
                  { name : 'lUserScore',type: C_LongLong },		//用户身上的分
                  {name : "lSceneWinScore",type : C_LongLong},  //本局获得分数
                  {name : "lWinLottery",type : C_LongLong},           //本局获得奖券
                  {name : "wMarryTimes",type : C_Word} //剩余玛丽次数
                  ];
BinUtils.addCommand( 1,103, tagSceneStatus,GAMENAME);
//重连失败返回1-101
