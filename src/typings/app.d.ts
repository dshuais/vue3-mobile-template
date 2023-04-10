/*
 * @Author: dushuai
 * @Date: 2023-03-20 09:33:25
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-10 16:32:03
 * @description: ts类型文件
 */

/**
 * App内数据类型
 */
declare namespace App {
  /**登陆状态*/
  interface LoginStatus {
    isLoading: boolean, // 判断是否第一次进入
    isCancelLogin: boolean, // 是否取消了登录
    isRealName: boolean, // 是否实名
    isFreeNet: boolean, // 是否是非一网通用户
  }

  /**修改登录状态入参*/
  interface SetLoginStatus {
    key: string,
    val: boolean
  }

}
