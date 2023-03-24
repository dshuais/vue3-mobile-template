/*
 * @Author: dushuai
 * @Date: 2023-03-19 22:08:30
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-24 10:58:59
 * @Description: 接口response data类型文件
 */

/** response */
export interface ResponseRes<T = any> {
  code: number,
  data: T,
  msg: string
}


/** 登录接口data */
export interface LoginData {
  token: string,
  param?: string,
  sign?: string,
  userType?: number
}
/** 登录接口param 羊毛党参数 */
export interface LoginDataParam {
  trxCode: string,
  expandUserID: string,
  uniqueUserID: string,
  timeStamp: string
}


/** 预加载图片接口data */
export interface NetworkImgData {
  imgList: string[]
}
