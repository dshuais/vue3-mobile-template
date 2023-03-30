<!--
 * @Author: dushuai
 * @Date: 2023-03-24 18:21:07
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-30 16:58:54
 * @description: 游戏页
-->
<script setup lang='ts'>
import { Pages } from '@/enums/app';
import { Popups } from '@/enums/app';
import { usePopups } from '@/hooks/usePopups';
import { to } from '@/utils/router'

const { popShow } = usePopups()

const handleShowPop = () => {
  popShow(Popups.popBase)
}

onMounted(() => {
})
</script>
<template>
  game router
  <van-button type="primary" @click="handleShowPop">打开弹窗</van-button>
  <van-button type="primary" @click="to(Pages.Home)">去首页</van-button>

  <PopBase />
</template>
<style lang='less' scoped></style>
