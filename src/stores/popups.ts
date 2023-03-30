/*
 * @Author: dushuai
 * @Date: 2023-03-29 18:26:28
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-30 16:58:31
 * @description: 弹窗store
 */

import type { Popups } from "@/enums/app"

/** 
 * 定义popups弹窗数据的列表
 * key为Popups enum的键
 * val为{} 可放入要使用的数据或方法
 */
type PopupList = {
  [key in Popups]?: { show: Ref }
}

/** popups列表 不存回话 */
export const usePopupsStore = defineStore('popups', () => {
  /** 当前页面已挂载的弹窗数据 */
  const popups = ref<PopupList>({})

  return { popups }
})
