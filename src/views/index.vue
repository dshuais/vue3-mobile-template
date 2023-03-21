<!--
 * @Author: dushuai
 * @Date: 2023-03-14 11:32:51
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-20 22:35:42
 * @description: Index
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useAppActions } from "@/stores/appActions";
const appStore = useAppStore(),
  appActions = useAppActions(),
  { token, loginStatus } = storeToRefs(appStore);

const showPage = ref<boolean>(false); // 页面的展示状态
const refLoading = ref();

// 初始化
const hanleInit = () => {
  return new Promise((resolve, reject) => {
    showPage.value = true
    resolve('初始化完成')
  })
}

// 图片加载和初始化完成后再执行去掉Loading
const createPromiseAll = () => {
  const loadImgPromise = refLoading.value.handleLoadImg()
  const loadInit = hanleInit()
  Promise.all([loadImgPromise, loadInit])
  .then(result => {
    setTimeout(() => {
      appActions.SET_LOGIN_STATE({ key: 'isLoading', val: true })
    }, 500);
  })
}


watch(token, val => {
  if (!val) {
    nextTick(() => {
      createPromiseAll()
    })
  } else { }
}, { immediate: true })



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