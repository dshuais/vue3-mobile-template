/**
 * ts类型文件
*/

/**登陆状态*/
export interface LoginStatus {
  isLoading: boolean, // 判断是否第一次进入
  isCancelLogin: boolean, // 是否取消了登录
  isRealName: boolean, // 是否实名
  isFreeNet: boolean, // 是否是非一网通用户
}
/**修改登录状态入参*/
export interface SetLoginStatus {
  key: string,
  val: boolean
}