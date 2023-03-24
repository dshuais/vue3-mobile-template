/*
 * @Author: dushuai
 * @Date: 2023-03-23 18:32:14
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-24 10:56:25
 * @description: 接口request
 */

/** 登录接口入参 */
export interface LoginReq {
  sResponseXml: string
}

/** 羊毛党告知接口入参 */
export interface MerchantOpenReq {
  token: string,
  errCode: number,
  errMsg: string,
  data?: string
}