/*
 * @Author: dushuai
 * @Date: 2023-03-29 16:31:38
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-07 11:51:16
 * @description: 打开关闭弹窗的hooks
 */
import type { Popups } from "@/enums/app"
import { PopupVal, usePopupsStore } from "@/stores/popups"


/** 当前打开的弹窗列表 */
const openPopups = ref<Map<Popups, Function>>(new Map())

export const usePopups = () => {
  // 当前已挂载的弹框列表
  const { popups } = storeToRefs(usePopupsStore())

  /**
   * 项目内所有弹窗打开的方法
   * @param {Popups} name 要打开的弹窗
   * @param {boolean} other 是否关闭其他弹窗 可选，默认false不关闭
   */
  const popShow = async (name: Popups, other: boolean = false): Promise<void> => {
    if (popups.value.has(name)) {
      const pop: PopupVal = popups.value.get(name) as PopupVal
      if (pop?.show) return console.warn('该弹窗已处于打开状态:>> ', name)

      if (other) await closeOtherPop()

      pop && (pop.show = true)
      if (!openPopups.value.has(name)) {
        openPopups.value.set(name, close(name))
      }
    } else {
      console.warn('此页面没有该弹窗:>> ', name)
    }
  }

  /**
   * 项目内所有弹窗关闭的方法
   * @param {Popups} name 要关闭的弹窗
   */
  const closePop = (name: Popups): void => {
    if (openPopups.value.has(name)) {
      const c: Function = openPopups.value.get(name) as Function
      c()
      openPopups.value.delete(name)
    } else {
      console.warn('该弹窗已处于关闭状态:>> ', name)
    }
  }

  /**
   * 关闭弹窗
   * @param {Popups} name 要关闭的弹窗
   * @returns {Functison} 返回一个关闭弹窗方法
   */
  const close = (name: Popups): Function => {
    return () => {
      if (popups.value.has(name)) {
        const pop: PopupVal = popups.value.get(name) as PopupVal
        if (!pop?.show) return console.warn('该弹窗已处于关闭状态:>> ', name)
        pop && (pop.show = false)
      } else {
        console.warn('此页面没有该弹窗:>> ', name)
      }
    }
  }

  /**
   * 项目内关闭所有弹窗的方法
   */
  const closeOtherPop = (): Promise<boolean> => {
    return new Promise(resolve => {
      openPopups.value.forEach(c => c())
      openPopups.value.clear()
      resetPops()
      resolve(true)
    })
  }

  /**
   * 重置openPopups 弹框列表
   */
  const resetPops = (): void => {
    openPopups.value = new Map()
  }

  return { openPopups, popShow, closePop, closeOtherPop }
}
