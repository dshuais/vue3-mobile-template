<!--
 * @Author: dushuai
 * @Date: 2023-03-21 16:03:27
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-30 17:14:37
 * @description: 首页 --> 页面组件
-->
<script setup lang='ts'>
import { Pages, Popups } from '@/enums/app';
import { usePopups } from '@/hooks/usePopups';
import { useAppStore } from '@/stores/app';
import { redirect, to } from '@/utils/router';

const { popShow, hasPops, closeOtherPop } = usePopups()
const handleJump = () => {
  to(Pages.Game)
}

const refPopBase = ref<ComponentInstance['PopBase']>()
const handleShowPop = () => {
  // refPopBase.value?.popShow()
  popShow(Popups.popBase)
}

onMounted(() => {
})
</script>
<template>
  Home
  <van-button type="primary" @click="handleJump">去游戏页</van-button>

  <van-button type="primary" @click="handleShowPop">打开弹窗</van-button>

  <van-button type="primary" @click="closeOtherPop">关闭所有弹窗</van-button>

  <PopBase ref="refPopBase" />

  <div>当前打开的弹窗：{{ hasPops }}</div>
</template>
<style lang='less' scoped></style>
