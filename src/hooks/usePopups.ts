/*
 * @Author: dushuai
 * @Date: 2023-03-29 16:31:38
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-30 16:57:43
 * @description: 打开关闭弹窗的hooks
 */
import type { Popups } from "@/enums/app"
import { usePopupsStore } from "@/stores/popups"

/** 当前打开的弹窗列表 */
const hasPops = ref<string[]>([])

export const usePopups = () => {
  const { popups } = storeToRefs(usePopupsStore())

  /**
   * 项目内所有弹窗打开的方法
   * @param {Popups} name 要打开的弹窗
   * @param {boolean} other 是否关闭其他弹窗 可选，默认false不关闭
   */
  const popShow = async (name: Popups, other: boolean = false): Promise<void> => {
    if (popups.value && popups.value[name]) {
      const pop = popups.value[name], index = hasPops.value.indexOf(name)
      if (pop?.show) return console.warn('该弹窗已处于打开状态:>> ', name)
      if (other) await closeOtherPop()
      pop && (pop.show = true)
      if (index == -1) hasPops.value.push(name)
    } else {
      console.warn('此页面没有该弹窗:>> ', name)
    }
  }

  /**
   * 项目内所有弹窗关闭的方法
   * @param {Popups} name 要关闭的弹窗
   */
  const closePop = (name: Popups): void => {
    if (popups.value && popups.value[name]) {
      const pop = popups.value[name], index = hasPops.value.indexOf(name)
      if (!pop?.show) return console.warn('该弹窗已处于关闭状态:>> ', name)
      if (index != -1) hasPops.value.splice(index, 1)
      pop && (pop.show = false)
    } else {
      console.warn('此页面没有该弹窗:>> ', name)
    }
  }

  /**
   * 项目内关闭所有弹窗的方法
   */
  const closeOtherPop = (): Promise<boolean> => {
    return new Promise(resolve => {
      hasPops.value.forEach(pop => closePop(pop as Popups))
      resolve(true)
    })
  }

  return { hasPops, popShow, closePop, closeOtherPop }
}
