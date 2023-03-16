<!--
 * @Author: dushuai
 * @Date: 2023-03-14 11:32:51
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-16 15:28:55
 * @description: Index
-->
<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore(),
  { token } = storeToRefs(appStore),
  count = ref<number>(0),
  loading = ref(),
  c = computed<number>(() => loading.value?.count)

// pops refs
const popBase = ref()

const handleClick = () => {
  // appStore.SET_TOKEN(`${token.value}1`);
  token.value = '1token'
  count.value++
  // loading.value.handleAdd()
}

// 打开弹框
const handleJump = () => {
  popBase.value.popShow()
}

watchEffect(() => {
  console.log('watcheffect', count.value, c.value)
})

onMounted(() => {
  console.log('mounted', loading.value)
})
</script>
<template>
  <div class="container" @click="handleClick">index,{{ token }}</div>
  <div>{{ count }}</div>
  <hr />
  <BaseLoading ref="loading" />
  <hr />
  <van-button type="primary">主要按钮</van-button>
  <hr />
  <div class="div" @click="handleJump"></div>
  <hr />
  <PopBase ref="popBase" />
</template>

<style lang="less" scoped>
.container {
  color: red;
}
.div {
  .wh(100, 100);
  background: red;
}
</style>