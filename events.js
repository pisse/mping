/**
 * @fileoverview 这个文件是所有事件id与事件等级对应表
 */

;(function(window){

    var Events = {
        'MHome_FocusPic':1,
        'Mhome_Classification':1,
        'Mhome_Cart':1,
        'MRecharge_Recharge':1,
        'MHome_Lottery':1,
        'MHome_MyJD':1,
        'MHome_HandSeckill':1,
        'MHome_ActivitiesInFloors':1,
        'MHome_ThemeHall':1,
        'MHome_Searchthi':2,
        'MHome_Search':1,
        'MHome_SearchDropDownAssociationalWords':1,
        'MHome_SearchDropDownHistoryWords':1,
        'MHome_AirTicket':1,
        'MHome_Icons':1,
        'MHomeGuessYouLike_Login':1,
        'MHomeGuessYouLike_Products':1,
        'MHomeGuessYouLike_Similarities':1,
        'MHomeSimilarities_Products':1,
        'MHome_FloatEntrance':1,
        'MHome_BacktoTop':1,
        'MVirtual_ProductDetail_Expose':1,
        'MProductList_Search':2,
        'MSearch_Search':2,
        'MSearch_SearchButton':2,
        'MSearch_Searchthi':2,
        'MSearch_SearchDropDownAssociationalWords':2,
        'MSearch_HistoryRecords':2,
        'MSearch_HotWords':2,
        'MSearch_Productid':3,
        'MCommonHead_NavigateButton':1,
        'MCommonHead_home':1,
        'MCommonHead_CategorySearch':1,
        'MCommonHead_Cart':1,
        'MCommonHead_MYJD':1,
        'MCommonHTail_Account':1,
        'MCommonHTail_ToTop':1,
        'MCommonHTail_ClientApp':1,
        'MDownLoadFloat_OpenNow':1,
        'MGroupBuy_ChannelIcons':2,
        'MJingDouHome_Activity':2,
        'MJingDouHome_JindouExCoupon':2,
        'MJingDouHome_JingdouBuyLottery':2,
        'MJingDouHome_Jump':2,
        'MJingDouHome_Cut':2,
        'MJingDouHome_ProductPic':2,
        'MJingDouShare_GetMyJingdou':2,
        'MJingDouJigsaw_Jigsaw_Expose':2,
        'MMyJDOrders_Categories':2,
        'MMyJDFollowed_Commodities':2,
        'MMyJDFollowed_Shops':2,
        'MMyJDFollowed_Commodity':2,
        'MMyJDFollowed_Shop':2,
        'MMyJDBrowsedHistory_Commodites':2,
        'MMyJDService_Categories':2,
        'MMyJDAccountManage_Categories':2,
        'MMyJD_Ordersnotpay':2,
        'MMyJD_Ordersnotreceiving':2,
        'MMyJD_MyMessages':2,
        'MMyJD_FuntionMenus':2,
        'MMyJD_GuessYouLike':2,
        'MHandSecKill_Commodity':2,
        'MHandSecKill_Tag':2,
        'MHandSecKill_GotoAPPA':2,
        'Jshop_FocusPic':4,
        'Jshop_ProductID':4,
        'Jshop_CategoryTab':4,
        'Jshop_ProductID_Category':4,
        'Jshop_Navigation':4,
        'Jshop_CountDown':4,
        'Jshop_Lottery':4,
        'Jshop_GroupBuy':4,
        'Jshop_ShopRec':4,
        'Jshop_PromoRec':4,
        'Jshop_PromoTurns':4,
        'Jshop_PreSale':4,
        'Jshop_Html_Content':4,
        'Jshop_ImgWord':4,
        'Jshop_PullDown':4,
        'Jshop_PullDown_ProductID':4,
        'Jshop_AddtoCart':4,
        'MActivity_Productid':4,
        'MActivity_Share':4,
        'MActivity_DownloadApp':4,
        'Mactivity_ReturnHome':4,
        'MActivity_Button001':4,
        'MActivity_Button002':4,
        'MActivity_Button003':4,
        'MActivity_Button004':4,
        'MActivity_Button005':4,
        'MActivity_Button006':4,
        'MActivity_Button007':4,
        'ScantoGift_Upload':4,
        'ScantoGift_UploadSuccess':4,
        'ScantoGift_UploadFail':4,
        '3DStreet_Building':4,
        '3DStreet_BoardURL':4,
        '3DStreet_JDButton':4,
        '3DStreet_CategoryURL':4,
        '3DStreet_Game':4,
        '3DStreet_Share':4,
        'BrandStreet_BrandSaleTab':4,
        'BrandStreet_BrandShowTab':4,
        'BrandStreet_BrandNewTab':4,
        'BrandStreetSale_Activityid':4,
        'BrandStreetSale_BrandPic':4,
        'BrandStreetSale_SortbySale':4,
        'BrandStreetSale_SortbyAmount':4,
        'BrandStreetSale_Productid':4,
        'BrandStreetShow_FocusPic':4,
        'BrandStreetShow_Category':4,
        'BrandStreetShow_Activityid':4,
        'Shopping1111A_Bargain':4,
        'Shopping1111A_BrandToday':4,
        'Shopping1111A_Floor':4,
        'Shopping1111B_ToUrl':4,
        'Accessory_CategoryFilter':4,
        'Accessory_Category':4,
        'Accessory_BrandFilter':4,
        'Accessory_Brand':4,
        'Accessory_Filter':4,
        'Accessory_Productid':4,
        'Accessory_ProductMore':4,
        'AccessoryDetail_SortbyAmount':4,
        'AccessoryDetail_SortbyEvaluate':4,
        'AccessoryDetail_SortbyPrice':4,
        'AccessoryDetail_SortbyNew':4,
        'MProductShow_ProductSku':4,
        'MPresell_GetPermission':4,
        'MPresell_Rule':4,
        'MPresell_Reserve':4,
        'MPresell_AddtoCart':4,
        'MPresell_Productid':4,
        'MPresell_Confirm':4,
        'MPresell_Cancel':4,
        'MCutiPhone_StrollMall':4,
        'MCutiPhone_DetailRule':4,
        'MCutiPhone_HelpCutPrice':4,
        'MCutiPhone_HelpShare':4,
        'MCutiPhone_JoinTogether':4,
        'MCutiPhone_InformTa':4,
        'MCutiPhone_StrollButtom':4,
        'MCutiPhone_SharetoAll':4,
        'MTCL_CustomizeTCL':4,
        'MTCL_MyCustomization':4,
        'MTCL_ChoosePanel':4,
        'MTCL_ChooseRemoter':4,
        'MTCL_ChooseLabel':4,
        'MTCL_PersonalLabel':4,
        'MTCL_ThisIsIt':4,
        'MTCL_OrderDetail':4,
        'MMCD_APlanReduce5':4,
        'MMCD_APlanPayOnline':4,
        'MMCD_BPlanReduce5':4,
        'MMCD_BPlanPayOnline':4,
        'MMCDDownLoad_DownloadNow':4,
        'MMCD_AddToCart':4,
        'MMCD_GoRegister':4,
        'MTSWCJingCoupon_GetVouchers':4,
        'MTSWCFirstLinkVote_Submit':4,
        'MTSWCFirstLinkVoteResult_Next':4,
        'MTSWCFirstLinkPersonalCouppon_GetVouchers':4,
        'MTSWCFirstLinkPersonalCouppon_NextLink':4,
        'MTSWCFirstLinkPersonalCouppon_Invite':4,
        'MTSWCSecondLinkVote_Submit':4,
        'MTSWCStarVoteWin_Next':4,
        'MTSWCScore_GetVouchers':4,
        'MTSWCScore_MoreFunInvestment':4,
        'MobileWare_TreasureBoxEntrance':4,
        'MMobileWareLocate_Search':4,
        'MMobileWareLocate_Searchthi':4,
        'MMobileWareLocate_Locating':4,
        'MMobileWareLocate_HistoryAddr':4,
        'MMobileWareLocate_AssociateAddr':4,
        'MMobileWareCommonHead_GoToCart':4,
        'MMobileWareCommonHead_ChangeAddr':4,
        'MMobileWareProductList_BackToTop':4,
        'MMobileWareProductList_Product':4,
        'MMobileWareProductDetail_ProductMsg':4,
        'MMobileWareProductDetail_ProductIntroduction':4,
        'MMobileWareProductDetail_ProductSpecification':4,
        'MMobileWareProductDetail_ProductPackage':4,
        'MMobileWareProductDetail_AddToCart':4,
        'MMobileWareProductDetail_DeliveryAddr':4,
        'MMobileWareCart_DeleteProduct':4,
        'MMobileWareCart_NumIncrease':4,
        'MMobileWareCart_NumDecrease':4,
        'MMobileWareCart_SelectAll':4,
        'MMobileWareCart_CheckOut':4,
        'MMobileWareCheckout_ChangeAddr':4,
        'MMobileWareCheckout_MapCoordinate':4,
        'MMobileWareCheckout_OrderSubmit':4,
        'MMobileWareCheckout_PaperInvoice':4,
        'MYuepao_FireCrackersForFree':4,
        'MYuepao_Share':4,
        'MYuepao_SetoffAndGetPrize':4,
        'MYuepao_AskforGift':4,
        'MYuepao_GotoNewYearShop':4,
        'MYuepao_NewYearRaffle':4,
        'MYuepao_Regulation':4,
        'MYuepao_OnceAgain':4,
        'MYuepao_IGive':4,
        'MYuepao_IWantPlay':4,
        'MYuepao_UpdateNow':4,
        'MYuepao_HelpFriend':4,
        'MYuepao_TellOthers':4,
        'Shopcart_Productid':5,
        'Shopcart_Stroll':5,
        'Shopcart_Label':5,
        'Shopcart_Getresent':5,
        'Shopcart_Warranty':5,
        'Shopcart_Pay':5,
        'Shopcart_AddtoCart':5,
        'Shopcart_Present':5,
        'MProductdetail_Photo':5,
        'MProductdetail_Productinfo':5,
        'MProductdetail_Saleinfo':5,
        'MProductdetail_Shopid':5,
        'MProductdetail_GuessYouLike':5,
        'MProductdetail_Addtocart':5,
        'MProductdetail_Easybuy':5,
        'MProductdetail_GotoCart':5,
        'MProductdetail_AddtoFollowed':5,
        'MNeworder_Submit':5,
        'MNeworder_Function':5,
        'MNeworder_Address':5,
        'MNeworder_PayType':5,
        'MNeworder_ProdictList':5,
        'MPayFinish_OrderList':5,
        'MPayFinish_SecKill':5,
        'MPayFinish_GetJDBean':5,
        'MPayFinish_AllOrders':5,
        'MPayFinish_HandSecKill':5,
        'MHome_OrderSubmit':5,
        'MPayFinish_HomeMain':5,
        'MLOCOffLineProductDetail_BuyNow':2,
        'MLOCShopList_Call':3,
        'MLOCCheckOut_Submit':4,
        'LOCOffLineProductDetail_BuyNow':2,
        'LOCOnLineProductDetail_BuyNow':2,
        'MLOCOnLineProductDetail_BuyNow':2,
        'MLOCShopList_CallMap':3,
        'MFlashbuy_NewArrival':2,
        'MFlashbuy_LastSale':2,
        'MFlashbuy_ActivityForecast':2,
        'Mflashbuy_FocusPic':2,
        'MFlashbuy_NewArrivalFloor':2,
        'MFlashbuy_LastSaleFloor':2,
        'MFlashbuy_ActivityForecastFloor':2,
        'MFlashbuy_ProductPic':3,
        'MPresell_FocusPic':2,
        'MPresell_More':2,
        'MPresell_NewArrivalFloor':2,
        'MPresell_GetFreshFloor':2,
        'MPresell_SmartLifeFloor':2,
        'MPresell_BranchVenues':2,
        'MPresell_ProductList':3,
        'MTopic_FocusPic':3,
        'MTopic_SecKill':3,
        'MTopic_Floors':3,
        'MTopic_Products':3,
        'MTopic_Menus':3,
        'MTopic_Classify':3,
        'MTopic_recommend':3,
        'MTopic_brand':3,
        'Jshop_AD_button':4,
        'Jshop_AD_TopCarousel ':4,
        'Jshop_AD_Tab':4,
        'Jshop_AD_Picture':4,
        'Jshop_AD_Rolled':4,
        'Jshop_AD_Close':4,
        'Jshop_Hot_Tab':4,
        'Jshop_Hot_ProductID':4,
        'Jshop_Commended_ProductID ':4,
        'Jshop_Commended_GotoShop':4,
        'Jshop_Commended_Pic':4,
        'Jshop_Commended_Url':4,
        'MShopCheckIn_Pic':2,
        'MShopCheckIn_CheckInGetGift':2,
        'MShopCheckIn_RecommendShopid':2,
        'MShopCheckIn_MoreShops':2,
        'ShopHome_CheckInGetGift':3,
        'ShopCheckIn_Productid':4,
        'MJingDouHome_CouponCenter':1,
        'MWidget_Sign':1,
        'Widget_Operate':1,
        'Widget_Commodity':1,
        'Widget_More':1,
        'MJingDouHome_Checkin':2,
        'MSeckill_OrderSubmit':5,
        'MMyJD_MyPurse':2,
        'MMyJD_MyFollows':2,
        'MMyJD_BrowserHistory':2,
        'MMyJD_ServiceManager':2,
        'MMyJD_AccountManager':2,
        'MMyJD_MyAppointment':2,
        'MMyJD_ApplicationRecommend':2,
        'MMyJD_JCode':2,
        'MNeworder_Coupons':5,
        'MNeworder_Jdcard':5,
        'MNeworder_JdBean':5,
        'MNeworder_Invoice':5,
        'MNeworder_RestAccount':5,
        'MNeworder_GuessYouLike':5,
        'MNeworder_UnavaliableCoupons':5,
        'MMyJD_AllOrders':2,
        'MSaleBDCoupon_BannerPic':3,
        'MSaleBDCouponResult_BannerPic':3,
        'MShopcart_Productid':5,
        'MShopcart_EditAmount':5,
        'MShopcart_Amount':5,
        'MShopcart_Stroll':5,
        'MShopcart_CheckProd':5,
        'MShopcart_CheckAll':5,
        'MShopcart_Label':5,
        'MShopcart_Getresent':5,
        'MShopcart_Warranty':5,
        'MShopcart_Delete':5,
        'MShopcart_Pay':5,
        'MShopcart_AddtoCart':5,
        'MShopcart_Present':5,
        'MShopcartDeleteProduct_Sure':5,
        'MShopcartDeleteProduct_Cancel':5,
        'MShopcart_Login':5,
        'MShopcart_ShopEntrance':5,
        'MShopcart_GuessYouLikeFold':5,
        'MShopcart_GuessYouLike':5,
        'MShopcart_SimilaritiesEntrance':5,
        'MShopcart_SimilaritiesProductList':5,
        'MCategory_1st':2,
        'MCategory_3rd':2,
        'MCategory_Banner':2,
        'MCategory_Recommend':2,
        'MList_AdProducts':3,
        'MListFilter_Brand':3,
        'MListFilter_Back':3,
        'MListFilter_Address':3,
        'MShopLIst_JDShop':3,
        'MShopLIst_POPShop':3,
        'MShopcart_LoginEmptyCart':5,
        'MShopcart_LoginFullCart':5,
        'MJDMembersHome_SecKillProducts':3,
        'MJDMembersSecKill_Products':4,
        'MJDMembersHome_MemberProducts':3,
        'MJDMembersHome_MemberProductsToCart':3,
        'MJDMembersHome_AllMemberProducts':3,
        'MJDMembersSpecialSale_Categories':4,
        'MJDMembersSpecialSale_Products':4,
        'MJDMembers_FocusPic':3,
        'MJDMembers_Shopid':3,
        'MJDMembers_GetCoupon':3,
        'MVacationHonme_banner':3,
        'MVacationHonme_Destinations':3,
        'MVacationHonme_More':3,
        'MVacationHonme_HotDestinations':3,
        'MVacationHonme_SetOutCity':3,
        'MVacationHonme_SearchBox':3,
        'MVacationHonme_RecommendedProducts':3,
        'MVacationSearch_HotWord':4,
        'MVacationSearchResult_SearchBox':4,
        'MVacationSearchResult_Synthesize':4,
        'MVacationSearchResult_SalesVolume':4,
        'MVacationSearchResult_Price':4,
        'MVacationSearchResult_Fliter':4,
        'MVacationSearchResult_Lines':4,
        'MVacationProductDetail_Calendar':5,
        'MVacationProductDetail_ProductPoint':5,
        'MVacationProductDetail_Schedule':5,
        'MVacationProductDetail_Comment':5,
        'MVacationProductDetail_Costs':5,
        'MVacationProductDetail_ReserveNotice':5,
        'MVacationProductDetail_VisaInfo':5,
        'MVacationProductDetail_ContactService':5,
        'MVacationProductDetail_Call':5,
        'MVacationProductDetail_ReserveNow':5,
        'MJingDouHome_ShopCheckin':2,
        'MJingDouHome_GetJBean':2,
        'MJingDouHome_Topic':2,
        'MProductdetail_Specification':5,
        'MProductdetail_ProductdetailEntrance':5,
        'MProductdetail_Address':5,
        'MProductdetail_FirstAddress':5,
        'MProductdetail_SecondAddress':5,
        'MProductdetail_ThirdAddress':5,
        'MProductdetail_AskServiceEntrance':5,
        'MProductdetail_ProductCommentEntrance':5,
        'MProductdetail_ProductShowEntrance':5,
        'MProductdetail_ServiceInfo':5,
        'MProductdetail_Advert':5,
        'MProductdetail_ConsultEntrance':5,
        'MSearch_ClearHistory':1,
        'MProductdetail_Insurances':5,
        'MSearch_ChangeKeyWords':1,
        'MHome_SearchButton':2,
        'MProductdetail_SalesPromotion':5,
        'MProductdetail_Back':5,
        'MProductdetail_PreferentialPackage':5,
        'MProductdetail_PackageAddToCart':5,
        'MProductdetail_InsurancesSelect':5,
        'MProductdetail_FourthAddress':5,
        'MTicketsProductdetail_Tab':5,
        'MTicketsSearchResult_Fliter':4,
        'MTicketsProductdetail_TicketBomb':5,
        'MTicketsProductdetail_MoreTickets':5,
        'MTicketsSearchResult_SightSpot':4,
        'MTicketsHome_Theme':3,
        'MTicketsProductdetail_ReserveNow':5,
        'MTicketsSearchResult_SearchBox':4,
        'MTicketsHome_SightSpot':3,
        'MTicketsHome_SearchBox':3,
        'MTicketsSearchResult_SalesVolume':4,
        'MTicketsSearchResult_Price':4,
        'MTicketsSearchResult_Synthesize':4,
        'MTicketsProductdetail_ReserveNotice':5,
        'MTicketsProductdetail_SightDescription':5,
        'MTicketsProductdetail_Comments':5,
        'MTicketsHome_Banner':3,
        'MTicketsHome_Location':3,
        'MTicketsThemes_Theme':4,
        'MTicketsSearch_Hotword':4,
        'MTicketsProductdetail_Map':5,
        'MTicketsHome_More':3,
        'MFlashbuy_CategoryBeautyFloor':2,
        'MTwelve_Play':4,
        'MProductdetail_ad':3,
        'MProductdetail_Comment':5,
        'MProductdetail_CommentPhoto':5,
        'MProductdetail_CouponSlide':5,
        'MProductdetail_Coupon':5,
        'MProductdetail_IdentifyingCodeInput':5,
        'MProductdetail_IdentifyingCodeImage':5,
        'MProductdetail_IdentifyingCodeCancel':5,
        'MProductdetail_IdentifyingCodeConfirm':5,
        'MProductdetail_IdentifyingCodeClose':5,
        'MProductdetail_ChooseSpecifications':5,
        'MProductdetail_ChooseInsurance':5,
        'MProductdetail_EnterShop':5,
        'MProductdetail_BackToTop':5,
        'MProductdetail_SubscribeImmediately':5,
        'MProductdetail_PurchaseImmediately':5,
        'MProductdetail_OrderImmediately':5,
        'MProductdetail_ShoppingCodeBuy':5,
        'MProductdetail_DetailProductIntroduction':5,
        'MProductdetail_DetailParameter':5,
        'MProductdetail_DetailCustomerService':5,
        'MProductdetail_DetailBackToTop':5,
        'MProductdetail_CommentAllTab':5,
        'MProductdetail_CommentFavorableTab':5,
        'MProductdetail_CommentMediumTab':5,
        'MProductdetail_CommentPoorTab':5,
        'MProductdetail_CommentPictureTab':5,
        'MProductdetail_CommentLikebutton':5,
        'MProductdetail_CommentReply':5,
        'MProductdetail_CommentAll':5,
        'MProductdetail_ReplyCommentInput':5,
        'MProductdetail_ReplyCommentSend':5,
        'MProductdetail_ReplyCommentReply':5,
        'MBMobileWareProductDetail_ProductMsg':4,
        'MBMobileWareProductDetail_ProductIntroduction':4,
        'MBMobileWareProductDetail_ProductSpecification':4,
        'MBMobileWareProductDetail_ProductPackage':4,
        'MBMobileWareProductDetail_AddToCart':4,
        'MBMobileWareProductDetail_DeliveryAddr':4,
        'MBProductdetail_Photo':5,
        'MBProductdetail_Productinfo':5,
        'MBProductdetail_Saleinfo':5,
        'MBProductdetail_Shopid':5,
        'MBProductdetail_GuessYouLike':5,
        'MBProductdetail_Addtocart':5,
        'MBProductdetail_Easybuy':5,
        'MBProductdetail_GotoCart':5,
        'MBProductdetail_AddtoFollowed':5,
        'MBProductdetail_Advert':5,
        'MBProductdetail_SalesPromotion':5,
        'MBProductdetail_PreferentialPackage':5,
        'MBProductdetail_Specification':5,
        'MBProductdetail_Address':5,
        'MBProductdetail_ServiceInfo':5,
        'MBProductdetail_Insurances':5,
        'MBProductdetail_InsurancesSelect':5,
        'MBProductdetail_ProductdetailEntrance':5,
        'MBProductdetail_ProductCommentEntrance':5,
        'MBProductdetail_ProductShowEntrance':5,
        'MBProductdetail_ConsultEntrance':5,
        'MBProductdetail_AskServiceEntrance':5,
        'MRecharge_PhoneBillTab':4,
        'MRecharge_PhoneTrafficTab':4,
        'MRecharge_Product':4,
        'MRecharge_ViewRechargeRecords':4,
        'MRecharge_ImmediateRecharge':4,
        'MRecharge_Coupons':4,
        'MRecharge_JDBeans':4,
        'MRecharge_ConfirmThePayment':4,
        'MRecharge_TrafficOrder':4,
        'MRecharge_TelephoneBill':4,
        'MRecharge_OrderBuyAgain':4,
        'MRecharge_OrderGoToPay':4,
        'MRecharge_Order':4,
        'MRecharge_OrderDetailBuyAgain':4,
        'MRecharge_OrderDetailGoToPay':4,
        'MlaoliuNei_OpenRedBag':4,
        'MlaoliuNei_Share':4,
        'MlaoliuNei_InfoFriendRedBag':4,
        'MlaoliuNei_ToActivity':4,
        'MlaoliuNei_CloseRedBag':4,
        'MlaoliuNei_Order':4,
        'MlaoliuNei_TelNum':4,
        'MlaoliuNei_Participate ':4,
        'MlaoliuNei_CancelOrder':4,
        'MlaoliuWai_OpenRedBag':4,
        'MlaoliuWai_MyRedBag':4,
        'MlaoliuWai_DoubleEleven':4,
        'MlaoliuWai_Rule':4,
        'MlaoliuWai_ToJDUseRedBagNow':4,
        'MlaoliuWai_CloseRule':4,
        'MlaoliuWai_ToJDHangOut':4,
        'MlaoliuWai_ToJDSendRedBag':4,
        'MlaoliuWai_ToJDUseRedBag':4,
        'MlaoliuWai_ToActivity':4,
        'MlaoliuWai_Order':4,
        'MlaoliuWai_TelNum':4,
        'MlaoliuWai_Participate':4,
        'MlaoliuWai_CancelOrder':4,
        'MlaoliuNei_Rule':4,
        'MlaoliuNei_CloseRule':4,
        'MlaoliuNei_CloseTelNum':4,
        'MlaoliuWai_ModifyTelNum':4,
        'MlaoliuWai_ConfirmModifyTelNum':4,
        'MlaoliuWai_CloseTelNum':4,
        'MPreheat_Strategy':4,
        'MPreheat_TheHeadlines':4,
        'MPreheat_Coupons':4,
        'MPreheat_ActivityCoupon':4,
        'MPreheat_RemindMe':4,
        'MPreheat_PreferentialFloor':4,
        'MPreheat_PreferentialFloorAdvertisement':4,
        'MPreheat_Brand':4,
        'MPreheat_RankingList':4,
        'MPreheat_RankingListProduct':4,
        'MPreheat_DiscoverStrategy':4,
        'MPreheat_DiscoverTopAdvertisement':4,
        'MPreheat_DiscoverFunctionEntry':4,
        'MDoubleElevenNavigation_AllTheMeeting':4,
        'MDoubleElevenNavigation_FirstClassDirectory':4,
        'MDoubleElevenNavigation_SecondClassDirectory':4,
        'MDoubleElevenNavigation_EntranceHall':4,
        'MDoubleElevenNavigation_ActiveEntry':4,
        'MDoubleElevenNavigation_RecentEntranceHall':4,
        'MPreheat_NavigationBottomTab':4,
        'MGroupPurchase_TopClassification':4,
        'MGroupPurchase_Search':4,
        'MGroupPurchase_FocusPic':4,
        'MGroupPurchase_TimeSlotProduct':4,
        'MGroupPurchase_TimeSlot':4,
        'MGroupPurchase_1Plus2AdPosition':4,
        'MGroupPurchase_BottomNavigation':4,
        'MGroupPurchase_TodayProduct':4,
        'MGroupPurchase_BrandProduct':4,
        'MGroupPurchase_BrandSearch':4,
        'MGroupPurchase_LifeLocation':4,
        'MGroupPurchase_LifeSearch':4,
        'MGroupPurchase_LifeFocusPic':4,
        'MGroupPurchase_LifeClassificationIcon':4,
        'MGroupPurchase_Life1Plus2AdPosition':4,
        'MGroupPurchase_LifeYouLikeProduct':4,
        'MProductCoupon_GetSpecialcoupon':2,
        'MProductCoupon_Get':2,
        'MList_Comprehensive':1,
        'MShake_CancelShake':4,
        'MShake_ActivityRule':4,
        'MShake_MainHall':4,
        'MShake_ToMyShoppingCart':4,
        'MShake_ShakingAgain':4,
        'MShake_AddToCart':4,
        'MShake_ImmediatelySeckill':4,
        'MShake_GotIt':4,
        'MShake_ReceiveGift':4,
        'MShake_ReserveGift':4,
        'MShake_Share':4,
        'MShake_ShareDestination':4,
        'MShake_GoToApp':4,
        'MShake_ActivityTL':4,
        'MShake_ActivityTR':4,
        'MShake_ActivityBL':4,
        'MShake_ActivityBR':4,
        'MShake_Slide':4,
        'MCrazyGroupPurchase_MyGroupPurchase':4,
        'MCrazyGroupPurchase_TodayProduct':4,
        'MCrazyGroupPurchase_PreviewForTheNext':4,
        'MCrazyGroupPurchase_TodayProductProduct':4,
        'MCrazyGroupPurchase_PreviewForTheNextProduct':4,
        'MCrazyGroupPurchase_TodayProductParticipate1':4,
        'MCrazyGroupPurchase_TodayProductParticipate2':4,
        'MCrazyGroupPurchase_TodayProductParticipate3':4,
        'MCrazyGroupPurchase_TodayProductParticipate4':4,
        'MCrazyGroupPurchase_PreviewForTheNextParticipate1':4,
        'MCrazyGroupPurchase_PreviewForTheNextParticipate2':4,
        'MCrazyGroupPurchase_SecondScreen':4,
        'MCrazyGroupPurchase_MyProduct':4,
        'MCrazyGroupPurchase_MyProductParticipate1':4,
        'MCrazyGroupPurchase_MyProductParticipate2':4,
        'MCrazyGroupPurchase_MyProductParticipate3':4,
        'MCrazyGroupPurchase_MyProductParticipate4':4,
        'MCrazyGroupPurchase_SingleIntroduction':4,
        'MCrazyGroupPurchase_SingleParticipate1':4,
        'MCrazyGroupPurchase_SingleParticipate2':4,
        'MCrazyGroupPurchase_SingleParticipate3':4,
        'MCrazyGroupPurchase_SingleParticipate4':4,
        'MCrazyGroupPurchase_SingleParticipate5':4,
        'MCrazyGroupPurchase_SingleCrazyGroupPurchase':4,
        'MCrazyGroupPurchase_SingleAdvertisement':4,
        'MPreheat_DiscoverFunctionEntry':4,
        'MPreheat_ActivityForecast':4,
        'MPreheat_DiscoverMainBanner':4,
        'MPreheat_DiscoverMulty':4,
        'MPreheat_DiscoverQuick':4,
        'MPreheat_DiscoverGood':4,
        'MPreheat_DiscoverSave':4,
        'Mpreheat_SecondScreenRemind':4,
        'Mpreheat_ThirdScreenRemind':4,
        'Mpreheat_FourthScreenPreferentialFloor':4,
        'Mpreheat_FifthScreenPreferentialFloor':4,
        'Mpreheat_SixthScreenRankingList':4,
        'MPreheat_SencondQuickLeft':4,
        'MPreheat_ThirdSaveLeft':4
    };

    /**
     * @namespace 该命名空间下包含事件
     * @memberOf ping
     */
    MPing.events = {};
    MPing.events.map=  Events;

}(window));
