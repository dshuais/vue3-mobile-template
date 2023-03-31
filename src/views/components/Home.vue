<!--
 * @Author: dushuai
 * @Date: 2023-03-21 16:03:27
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-31 17:17:53
 * @description: 首页 --> 页面组件
-->
<script setup lang='ts'>
import { GetCaptcha } from '@/api/api';
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

const handleCaptcha = () => {
  GetCaptcha()
    .then(res => {
      console.log('res', res)
      if (res.code === 200) {
        // console.log('res.data', res.data.captchaImg)
      } else {
        console.log('res', res)
      }
    })
    .catch(err => {
      console.log('err', err)
    })
}

onMounted(() => {
})
</script>
<template>
  Home
  <van-button type="primary" @click="handleJump">去游戏页</van-button>

  <van-button type="primary" @click="handleShowPop">打开弹窗</van-button>

  <van-button type="primary" @click="closeOtherPop">关闭所有弹窗</van-button>

  <van-button type="primary" @click="handleCaptcha">请求接口</van-button>


  <PopBase ref="refPopBase" />

  <div>当前打开的弹窗：{{ hasPops }}</div>
</template>
<style lang='less' scoped></style>
