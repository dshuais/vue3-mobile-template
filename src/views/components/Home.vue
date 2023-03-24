<!--
 * @Author: dushuai
 * @Date: 2023-03-21 16:03:27
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-24 18:24:36
 * @description: 首页 --> 页面组件
-->
<script setup lang='ts'>
import router from '@/router';

const handleJump = () => {
  router.push('/game')
}
</script>
<template>
  Home
  <van-button type="primary" @click="handleJump">主要按钮</van-button>
</template>

<style lang='less' scoped></style>
