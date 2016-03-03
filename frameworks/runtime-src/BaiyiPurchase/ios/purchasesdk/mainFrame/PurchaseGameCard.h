//
//  PurchaseGameCard.h
//  PurchaseSdkTest
//
//  Created by HanShaokun on 31/3/15.
//  Copyright (c) 2015 darklinden. All rights reserved.
//

#import "PurchaseViewCtrl.h"
#import "PurchaseTypeList.h"
#import "GamecardContent.h"

@interface PurchaseGameCard : PurchaseViewCtrl
@property (retain, nonatomic) PurchaseTypeList* gameCardList;
@property (retain, nonatomic) GamecardContent*  gameCardContent;

@end
