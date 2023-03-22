<!--
 * @Author: dushuai
 * @Date: 2023-03-14 11:32:51
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-22 16:59:09
 * @description: Index
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useAppActions } from "@/stores/appActions";
const appStore = useAppStore(),
  appActions = useAppActions(),
  { token, loginStatus } = storeToRefs(appStore)

const showPage = ref<boolean>(false); // 页面的展示状态
const refLoading = ref<ComponentInstance['BaseLoading']>()

// 初始化
const hanleInit = () => {
  return new Promise((resolve, reject) => {
    showPage.value = true
    resolve('初始化完成')
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
        appActions.SET_LOGIN_STATE({ key: 'isLoading', val: true })
      }, 300)
    })
}

// 监听token 判断去登录/拉取初始化
watchEffect(() => {
  if (token.value) {
    nextTick(() => {
      createPromiseAll()
    })
  } else {
    setTimeout(() => {
      token.value = 'test-token=123456'
      // appActions.SET_TOKEN('test-token=123456')
    }, 1000);
  }
})

onMounted(() => {

})

</script>
<template>
  <BaseLoading ref="refLoading" />

  <transition name="faderouter" mode="out-in">
    <div class="container" v-if="showPage">123</div>
  </transition>
</template>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
}
</style>