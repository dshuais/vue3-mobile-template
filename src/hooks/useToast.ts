/*
 * @Author: dushuai
 * @Date: 2023-03-24 14:06:16
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-07 12:01:45
 * @description: 封装vant Toast轻提示hooks
 */
import { showToast, showLoadingToast, setToastDefaultOptions, showSuccessToast, showFailToast } from 'vant/es/toast'
import type { LoadingType } from 'vant/es/loading/Loading'
import 'vant/es/toast/style'
import type { ToastWrapperInstance } from 'vant/es/toast/types'

setToastDefaultOptions({
  forbidClick: true
})

export const useToast = () => {
  /**
   * 轻提示
   * @param {string} msg 提示文案
   * @returns Toast实例
   */
  const $msg = (msg: string): ToastWrapperInstance => {
    return showToast(msg)
  }

  /**
   * 加载提示
   * @param {string} message 提示文案，默认【加载中...】
   * @param {number} duration 展示时长
   * @param {LoadingType} loadingType 图标类型
   * @returns Toast实例（可通过【Toast实例】.close()关闭某个提示）
   */
  const $loading = (message: string = '加载中...', duration: number = 0, loadingType: LoadingType = 'circular'): ToastWrapperInstance => {
    return showLoadingToast({
      message,
      duration,
      loadingType
    })
  }

  /**
   * 成功提示
   * @param {string} msg 提示文案，默认【成功】
   * @returns Toast实例
   */
  const $msgSuccess = (msg: string = '成功'): ToastWrapperInstance => {
    return showSuccessToast(msg)
  }

  /**
   * 失败提示
   * @param {string} msg 提示文案，默认【失败】
   * @returns Toast实例
   */
  const $msgFail = (msg: string = '失败'): ToastWrapperInstance => {
    return showFailToast(msg)
  }

  return { $msg, $loading, $msgSuccess, $msgFail }
}
