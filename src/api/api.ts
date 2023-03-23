/*
 * @Author: dushuai
 * @Date: 2023-03-15 14:44:06
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-23 18:35:49
 * @description: api
 */
import { post, postJSON, get } from '@/axios/index'
import type { LoginReq, MerchantOpenReq } from '@/typings/request'
import type { LoginData, NetworkImgData } from '@/typings/response'

/** 登录 */
export const Login = (params: LoginReq) => post<LoginData>('app/login', params)

/** 羊毛党告知 */
export const GetMerchantOpenToken = (params: MerchantOpenReq) => post('app/getNewToken', params)

/** 可能用到的预加载网络图片 */
export const GetNetworkImg = () => post<NetworkImgData>('app/xxx')
