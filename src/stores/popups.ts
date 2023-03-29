/*
 * @Author: dushuai
 * @Date: 2023-03-29 18:26:28
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-29 18:40:44
 * @description: 弹窗store
 */

import type { Popups } from "@/enum/popups"

type PopupList = {
  [key in Popups]?: { show: boolean }
}

/** popups列表 不存回话 */
export const usePopupsStore = defineStore('popups', () => {
  const popups = reactive<PopupList>({})

  return { popups }
})
