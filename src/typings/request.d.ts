/*
 * @Author: dushuai
 * @Date: 2023-03-23 18:32:14
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-10 16:31:46
 * @description: 接口request
 */

/**
 * 接口request数据类型
 */
declare namespace Req {
  /** 登录接口入参 */
  interface LoginParams {
    sResponseXml: string
  }

  /** 羊毛党告知接口入参 */
  interface MerchantOpenParams {
    token: string,
    errCode: number,
    errMsg: string,
    data?: string
  }

}
