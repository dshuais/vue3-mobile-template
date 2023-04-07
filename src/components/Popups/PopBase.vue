<!--
 * @Author: dushuai
 * @Date: 2023-03-16 15:04:41
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-07 11:59:01
 * @description: Pop 组件示例
-->
<script setup lang="ts">
import { Popups } from '@/enums/app' // 弹窗refName枚举
import { usePopupsStore } from '@/stores/popups' // 所有的弹窗 ---> 用来挂载当前弹窗
import { usePopups } from '@/hooks/usePopups' // 打开关闭弹窗的方法 ---> 用来调用操作弹窗的方法

/**
 * 新改变弹窗状态的方法 --- 推荐使用
 * 在usePopups()上有打开、关闭、关闭全部和当前打开弹窗列表等数据 可供使用
 * 弹窗状态show 定义在当前组件 在组件挂在完成后放进pinia popups内
 */
const show = ref<boolean>(false) // 必须
const { openPopups, popShow, closePop, closeOtherPop } = usePopups()
/** 关闭弹窗 */
const close = (): void => {
  closePop(Popups.popBase)
}

// 更改弹窗状态的方法 --- 弃用
// const popShow = () => {
//   show.value = true
// }
// const closePop = () => {
//   show.value = false
// }

onMounted(() => {
  /**
   * 当弹窗挂载完成后 把该弹窗放进popups pinia内统一管理
   * @param {ref<boolean>} show show为必须参数 且为响应式数据
  */
  // popups.value[Popups.popBase] = { show }
  usePopupsStore().SET_POPUPS(Popups.popBase, { show }) // 必须
})

/**
 * 如果想要在父组件内通过v2($refs)方式获取子组件方法或状态时 要访问的数据需在此暴露出去
 * 且parent:
 *    const refPopBase = ref<ComponentInstance['PopBase']>()
 *    <PopBase ref="refPopBase" />
 *    refPopBase.value[暴露的方法或状态]
 */
defineExpose({
  // popShow,
  // closePop,
})
</script>
<template>
  <van-popup v-model:show="show" :duration="0.2" :close-on-click-overlay="false">
    <van-button type="primary" @click="closeOtherPop">关闭所有弹窗</van-button>

    <div class="pop-container">内容</div>

    <div class="pop-main"></div>

    <div class="close" @click="close">xxxxxx</div>
  </van-popup>
</template>
<style lang="less" scoped>
.pop-container {
  .wh(100, 100);
  .bg('index/phase1.png');
}

.pop-main {
  .wh(750, 551);
  .bg('index/old-bg-map.png');
}

.close {
  .wh(200, 50);
  background: yellow;
  .bg('index/icon-prize.png');
}
</style>
