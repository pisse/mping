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
        'MProductList_Search':1,
        'MSearch_Search':1,
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
        'MSeckill_SubmitAndAccount':5
		};

    /**
     * @namespace 该命名空间下包含事件
     * @memberOf ping
     */
    MPing.events = {};
    MPing.events.map=  Events;

}(window));
