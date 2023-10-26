<!--
 * @Author: dushuai
 * @Date: 2023-03-21 16:03:27
 * @LastEditors: dushuai
 * @LastEditTime: 2023-10-26 09:57:34
 * @description: 首页 --> 页面组件
-->

<script setup lang='ts'>
import { GetCaptcha } from '@/api/api';
import { Pages, Popups } from '@/enums/app';
import { usePopups } from '@/hooks/usePopups';
import { useToast } from '@/hooks/useToast';
import { useAppStore } from '@/stores/app';
import { $copy } from '@/utils';
import { redirect, to } from '@/utils/router';
import PopBaseJsx from '@/components/Popups/PopBaseJsx'

const { popShow, closeOtherPop, openPopups } = usePopups()
const handleJump = () => {
  to(Pages.Game)
}

const refPopBase = ref<ComponentInstance['PopBase']>()
const refPopBaseJsx = ref<ComponentInstance['PopBaseJsx']>()
const handleShowPop = (pop: string) => {
  // refPopBase.value?.popShow()
  popShow(Popups[pop])
}

const captchaImg = ref<string>('')
const handleCaptcha = () => {
  GetCaptcha()
    .then(res => {
      console.log('res', res)
      if (res.code === 200) {
        // console.log('res.data', res.data.captchaImg)
        captchaImg.value = res.data.captchaImg
      } else {
        console.log('res', res)
      }
    })
    .catch(err => {
      console.log('err', err)
    })
}

const { $msg } = useToast()
const handleCopy = () => {
  $copy(captchaImg.value)
    .then(res => {
      $msg('复制成功')
    })
    .catch(err => {
      $msg('复制失败')
    })
}

onMounted(() => {

})
</script>
<template>
  Home
  <van-button type="primary" @click="handleJump">去游戏页</van-button>

  <van-button type="primary" @click="handleShowPop('popBase')">打开弹窗</van-button>

  <van-button type="primary" @click="handleShowPop('popBaseJsx')">打开jsx弹窗</van-button>

  <van-button type="primary" @click="closeOtherPop">关闭所有弹窗</van-button>

  <van-button type="primary" @click="handleCaptcha">请求接口</van-button>

  <van-button type="primary" @click="handleCopy">复制</van-button>


  <PopBase ref="refPopBase" />
  <PopBaseJsx ref="refPopBaseJsx" />

  <div v-for="(item, ind) in openPopups" :key="ind">当前打开的弹窗：map {{ item[0] }}</div>

  <div style="background-color: rgba(255, 0, 0, .1);">
    <div class="ripple-circle"></div>
    <div class="hand"></div>
  </div>
</template>
<style lang='less' scoped>
.hand {
  .wh(99, 127);
  .bg('index/hand.png');
  .atl(245, 63);
  animation: hand 1.5s linear infinite;
}

@keyframes hand {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>
