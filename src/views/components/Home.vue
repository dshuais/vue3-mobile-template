<!--
 * @Author: dushuai
 * @Date: 2023-03-21 16:03:27
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-29 19:09:57
 * @description: 首页 --> 页面组件
-->
<script setup lang='ts'>
import { Pages } from '@/enum/app';
import { usePopups } from '@/hooks/usePopups';
import { useAppStore } from '@/stores/app';
import { redirect, to } from '@/utils/router';

const { popShow, hasPops } = usePopups()
const handleJump = () => {
  // router.push('/game')
  to(Pages.游戏, { index: 1 })
}

const refPopBase = ref<ComponentInstance['PopBase']>()
const handleShowPop = () => {
  // refPopBase.value?.popShow()
  // refPopups.value['refPopBase'].popShow()
  popShow('refPopBase')
}

const handleClick = (val: number) => {
  console.log('val', val)
}

onBeforeMount(() => {
  console.log('主页面将要挂载')
})

onMounted(() => {
  console.log('主页面加载')
})
</script>
<template>
  Home
  <van-button type="primary" @click="handleJump">去游戏页</van-button>

  <van-button type="primary" @click="handleShowPop">打开弹窗</van-button>

  <PopBase ref="refPopBase" title="标题" :data="{ a: 1 }" @click="handleClick" />

  <div>{{ hasPops }}</div>
</template>
<style lang='less' scoped></style>
