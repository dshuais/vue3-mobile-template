/*
 * @Author: dushuai
 * @Date: 2023-03-19 22:08:30
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-10 16:27:05
 * @Description: 接口response data类型文件
 */

/**
 * 接口response data类型
 */
declare namespace Res {
  /** response */
  interface ResponseRes<T = any> {
    code: number,
    data: T,
    msg: string
  }

  /** 登录接口data */
  interface LoginData {
    token: string,
    param?: string,
    sign?: string,
    userType?: number
  }
  /** 登录接口data >> param 羊毛党参数 */
  interface LoginDataParam {
    trxCode: string,
    expandUserID: string,
    uniqueUserID: string,
    timeStamp: string
  }

  /** 预加载图片接口data */
  interface NetworkImgData {
    imgList: string[]
  }

}
