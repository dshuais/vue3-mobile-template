/*
 * @Author: dushuai
 * @Date: 2023-03-19 22:08:30
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-23 18:32:22
 * @Description: 接口response data类型文件
 */

/** response */
export interface ResponseRes<T = any> {
  code: number,
  data: T,
  msg: string
}

/** cmb登录接口回调res */
export interface CmbLoginData {
  resultType: string,
  cryptType: string,
  body: string
}
/** 登录接口data */
export interface LoginData {
  token: string,
  param?: string,
  sign?: string,
  userType?: number
}
/** 登录接口 羊毛党参数param */
export interface LoginDataParam {
  trxCode: string,
  expandUserID: string,
  uniqueUserID: string,
  timeStamp: string
}
/** cmb羊毛党接口回调res */
export interface MerchantOpenData {
  errCode?: number,
  errMsg?: string,
  data?: string
}

/** 预加载图片接口data */
export interface NetworkImgData {
  imgList: string[]
}
