/*
 * @Author: dushuai
 * @Date: 2023-03-29 16:31:38
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-29 19:09:42
 * @description: 打开关闭弹窗的hooks
 */
import { usePopupsStore } from "@/stores/popups"


const hasPops = ref<string[]>([])

export const usePopups = () => {
  const { popups } = storeToRefs(usePopupsStore())

  const popShow = (name: string) => {
    if (popups.value && popups.value[name]) {
      const pop = popups.value[name], index = hasPops.value.indexOf(name)
      if (pop.show) return console.warn('该弹窗已处于打开状态:>> ', name)
      if (index == -1) hasPops.value.push(name)
      // pop.popShow()
      pop.show = true
    } else {
      console.warn('此页面没有该弹窗:>> ', name)
    }
  }

  const closePop = (name: string) => {
    if (popups.value && popups.value[name]) {
      const pop = popups.value[name], index = hasPops.value.indexOf(name)
      if (!pop.show) return console.warn('该弹窗已处于关闭状态:>> ', name)
      if (index != -1) hasPops.value.splice(index, 1)
      // pop.closePop()
      pop.show = false
    } else {
      console.warn('此页面没有该弹窗:>> ', name)
    }
  }

  return { hasPops, popShow, closePop }

}