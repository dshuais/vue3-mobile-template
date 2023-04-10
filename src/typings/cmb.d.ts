/*
 * @Author: dushuai
 * @Date: 2023-03-24 10:57:28
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-10 16:31:33
 * @description: 招行接口response/request类型定义
 */

/**
 * 招行接口response/request类型
 */
declare namespace Cmb {
  /**
 * cmb返参
 */
  /** 招行接口fail返参数 */
  interface CmbFailResponse {
    errCode: number,
    errMsg: string
  }

  /** cmb登录接口回调res */
  interface CmbLoginData {
    resultType: string,
    cryptType: string,
    body: string
  }

  /** cmb羊毛党接口回调res */
  interface CmbMerchantData extends CmbFailResponse {
    data?: string
  }


  /**
   * cmb入参
   */
  /** cmb 回调参数 */
  interface CmbCallBack {
    success?: Function,
    fail?: Function
  }
  /** cmb添加页面监听 cmbAppOnpageShow 参数 */
  interface CmbOnpageShow extends CmbCallBack {
    eventName: string,
    constant?: boolean,
    on?: Function,
  }

  /** cmb添加日历提醒 cmbAppCalendarReminder 参数 */
  interface CmbCalendarReminder extends CmbCallBack {
    remindName?: string,
    remindType?: string,
    remindTime?: string,
  }

  /** cmb分享 cmbAppShareInfoWithUI 参数 */
  interface CmbShareInfo extends CmbCallBack {
    type?: string,
    channelList?: string[],
    shareContent?: {
      title?: string,
      text?: string,
      url?: string,
      thumbUrl?: string
    }
  }

  /** cmb保存图片到相册 cmbAppSaveImageToAlbum 参数 */
  interface CmbSaveImage extends CmbCallBack {
    picData: string
  }

  /** cmb选择图片或拍照 cmbAppChooseImage 参数 */
  interface CmbChooseImage extends CmbCallBack {
    action?: string,
    params?: {
      maxCount: number,
      originMaxSize: number,
      needThumbnails: boolean,
      thumbnailsMaxSize: number
    }
  }

}
