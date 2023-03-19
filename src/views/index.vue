<!--
 * @Author: dushuai
 * @Date: 2023-03-14 11:32:51
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-19 20:47:25
 * @description: Index
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useAppActions } from "@/stores/appActions";
const appStore = useAppStore(),
  appActions = useAppActions(),
  { token, loginStatus } = storeToRefs(appStore);

const showPage = ref<boolean>(false); // 页面的展示状态
const refLoading = ref<HTMLElement>();
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