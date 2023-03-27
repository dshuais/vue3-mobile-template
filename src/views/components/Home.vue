<!--
 * @Author: dushuai
 * @Date: 2023-03-21 16:03:27
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-27 16:31:08
 * @description: 首页 --> 页面组件
-->
<script setup lang='ts'>
import { Pages } from '@/enum/app';
import { redirect, to } from '@/utils/router';

const handleJump = () => {
  // router.push('/game')
  to(Pages.游戏, { index: 1 })
}

onMounted(() => {
})
</script>
<template>
  Home
  <van-button type="primary" @click="handleJump">去游戏页</van-button>
</template>

<style lang='less' scoped></style>
