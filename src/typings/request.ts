/*
 * @Author: dushuai
 * @Date: 2023-03-23 18:32:14
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-31 17:36:52
 * @description: 接口request
 */

/** 登录接口入参 */
export interface LoginParams {
  sResponseXml: string
}

/** 羊毛党告知接口入参 */
export interface MerchantOpenParams {
  token: string,
  errCode: number,
  errMsg: string,
  data?: string
}