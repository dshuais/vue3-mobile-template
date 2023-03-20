/*
 * @Author: dushuai
 * @Date: 2023-03-19 22:08:30
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-20 20:52:03
 * @Description: 接口response data类型文件
 */

/** response */
export interface ResponseRes<T = any> {
  code: number,
  data: T,
  msg: string
}

/** 预加载图片接口data->结构 */
export interface NetworkImgList {
  imgList: string[]
}