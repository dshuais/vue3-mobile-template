/*
 * @Author: dushuai
 * @Date: 2023-03-15 14:44:06
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-19 23:08:49
 * @description: api
 */
import { post, postJSON, get } from '@/axios/index'
import type { NetworkImgList } from '@/typings/response'

/** 可能用到的预加载网络图片接口 */
export const getNetworkImg = () => post<NetworkImgList>('api/xxx')