/*
 * @Author: dushuai
 * @Date: 2023-03-29 18:26:28
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-07 11:45:58
 * @description: 弹窗store
 */

import type { Popups } from "@/enums/app"

/** 
 * 定义popups弹窗数据的列表
 * key为Popups enum的键
 * val为PopupVal{} 可放入要使用的数据或方法
 */
export interface PopupVal {
  show: any,
}

/** popups列表 不存回话 */
export const usePopupsStore = defineStore('popups', () => {
  /** 当前页面已挂载的弹窗数据 */
  const popups = ref<Map<Popups, PopupVal>>(new Map())

  /**
   * 设置已挂载的弹窗数据
   * @param {Popups} key 存储的弹窗key
   * @param {PopupVal} val 存储的弹窗数据val
   */
  const SET_POPUPS = (key: Popups, val: PopupVal): void => {
    if (popups.value.has(key)) {
      console.warn('弹窗已挂载，将清除历史状态:>> ', key)
      REMOVE_POPUPS(key)
    }
    popups.value.set(key, val)
  }

  /**
   * 移除已挂载的弹窗
   * @param {Popups} key 要移除的弹窗
   */
  const REMOVE_POPUPS = (key: Popups): void => {
    if (popups.value.has(key)) {
      popups.value.delete(key)
    } else {
      console.warn('弹窗未挂载:>> ', key)
    }
  }

  /**
   * 清空挂载的弹窗数据
   */
  const CLEAR_POPUPS = (): void => {
    popups.value.clear()
    popups.value = new Map()
  }

  return { popups, SET_POPUPS, REMOVE_POPUPS, CLEAR_POPUPS }
})
