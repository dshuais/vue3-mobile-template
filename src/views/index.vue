<!--
 * @Author: dushuai
 * @Date: 2023-03-14 11:32:51
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-11 11:59:20
 * @description: Index
-->
<script setup lang="ts">
import { useLoginEffect } from "@/hooks/useLogin";
import { useAppStore } from "@/stores/app";
import { useAppActions } from "@/stores/appActions";
import Home from "./components/Home.vue";

const { token } = storeToRefs(useAppStore()),
  { SET_LOGIN_STATE } = useAppActions(),
  { login } = useLoginEffect() // 登录hooks

const showPage = ref<boolean>(false); // 页面的展示状态
const refLoading = ref<ComponentInstance['BaseLoading']>()
const isPreProduction = computed<boolean>(() => import.meta.env.VITE_APP_PRE_PRODUCTION === 'true') // 预生产
const isDevEnv = computed<boolean>(() => import.meta.env.VITE_NODE_ENV === 'development') // 本地
// const isMpbankEnv = computed<boolean>(() => navigator.userAgent.toLowerCase().match(/MPBank/i)?.[0] === 'mpbank') // 招行
const isMpbankEnv = computed<boolean>(() => /mpbank/.test(navigator.userAgent.toLowerCase())) // 招行

// 初始化
const hanleInit = () => {
  return new Promise<string>((resolve, reject) => {
    showPage.value = true
    resolve('初始化完成')
  })
}
// 微信落地页初始化
const handleWechatInit = () => {
  return new Promise<string>(resolve => {
    resolve('Wechat 初始化完成')
  })
}

// 图片加载和初始化完成后再执行去掉Loading
const createPromiseAll = () => {
  const loadImgPromise = refLoading.value?.handleLoadImg()
  const loadInit = hanleInit()
  Promise.all([loadImgPromise, loadInit])
    .then(result => {
      setTimeout(() => {
        console.log('Init', result)
        SET_LOGIN_STATE({ key: 'isLoading', val: true })
      }, 300)
    })
    .catch(err => {
      console.log('Init Err:>> ', err)
      if (isDevEnv) return
      window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL
    })
}
// 图片加载和初始化完成后再执行去掉Loading
const createWechatPromiseAll = () => {
  const loadImgPromise = refLoading.value?.handleLoadImg()
  const loadInit = handleWechatInit()
  Promise.all([loadImgPromise, loadInit])
    .then(result => {
      setTimeout(() => {
        console.log('Wechat Init', result)
        SET_LOGIN_STATE({ key: 'isLoading', val: true })
      }, 300)
    })
    .catch(err => {
      console.log('Wechat Init Err:>> ', err)
      if (isDevEnv) return
      window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL
    })
}

// 监听token 判断去登录/拉取初始化
watchEffect(() => {
  if (token.value) {
    nextTick(() => {
      createPromiseAll()
    })
  } else {
    if (isMpbankEnv || isDevEnv) {
      setTimeout(() => {
        token.value = 'test-token=123456'
      }, 1000)
      // login() // 招行登录
    } else {
      nextTick(() => {
        createWechatPromiseAll()
      })
    }
  }
})
</script>
<template>
  <BaseLoading ref="refLoading" />
  <transition name="faderouter" mode="out-in">
    <div class="container" v-if="showPage">
      <!-- 预生产跑马灯 -->
      <BaseNoticeBar v-if="isPreProduction" />

      <Home />
    </div>
  </transition>
</template>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
}
</style>