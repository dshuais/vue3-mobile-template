<!--
 * @Author: dushuai
 * @Date: 2023-03-24 18:21:07
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-29 17:11:30
 * @description: 游戏页
-->
<script setup lang='ts'>
import { usePopups } from '@/hooks/usePopups';

const { popShow } = usePopups()

const handleShowPop = () => {
  // refPopBase.value?.popShow()
  // refPopups.value['refPopBase'].popShow()
  // console.log('refff', refPopups.value['refPopBase'])
  popShow('refPopBase')
}

onMounted(() => {
  console.log('route', useRoute().query)
})
</script>
<template>
  game router
  <van-button type="primary" @click="handleShowPop">打开弹窗</van-button>

  <PopBase />
</template>
<style lang='less' scoped></style>
