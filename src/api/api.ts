/*
 * @Author: dushuai
 * @Date: 2023-03-15 14:44:06
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-10 16:27:45
 * @description: api
 */
import { post, postJSON, get } from '@/axios/index'

/** 登录 */
export const Login = (params: Req.LoginParams) => post<Res.LoginData>('app/login', params)

/** 羊毛党告知 */
export const GetMerchantOpenToken = (params: Req.MerchantOpenParams) => post('app/getNewToken', params)

/** 可能用到的预加载网络图片 */
export const GetNetworkImg = () => post<Res.NetworkImgData>('app/xxx')

/** 测试接口 */
export const GetCaptcha = () => get<{ captchaImg: string }>('api/captcha')
