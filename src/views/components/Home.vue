<!--
 * @Author: dushuai
 * @Date: 2023-03-21 16:03:27
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-28 17:05:56
 * @description: 首页 --> 页面组件
-->
<script setup lang='ts'>
import { Pages } from '@/enum/app';
import { redirect, to } from '@/utils/router';

const handleJump = () => {
  // router.push('/game')
  to(Pages.游戏, { index: 1 })
}

const refPopBase = ref<ComponentInstance['PopBase']>()
const handleShowPop = () => {
  refPopBase.value?.popShow()
}

const handleClick = (val: number) => {
  console.log('val', val)
}

onMounted(() => {

})
</script>
<template>
  Home
  <van-button type="primary" @click="handleJump">去游戏页</van-button>

  <van-button type="primary" @click="handleShowPop">打开弹窗</van-button>

  <PopBase ref="refPopBase" title="标题" @click="handleClick" />
</template>
<style lang='less' scoped></style>
