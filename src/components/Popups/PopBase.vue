<!--
 * @Author: dushuai
 * @Date: 2023-03-16 15:04:41
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-28 18:14:50
 * @description: Pop 组件
-->
<script setup lang="ts">
const props = defineProps<{ title: string }>()
const emit = defineEmits<{
  (e: 'click', val: number): void
}>()

const show = ref<boolean>(false)

// 弹窗状态改变
const popShow = () => {
  show.value = true
}
const closePop = () => {
  show.value = false
}

const handleEmit = () => {
  emit('click', 7788)
}

onMounted(() => {
  console.log('props', props);
  console.log('attrs', useAttrs())
})

defineExpose({
  popShow,
  closePop,
})
</script>
<template>
  <van-popup v-model:show="show" :duration="0.2" :close-on-click-overlay="false">
    <div class="pop-container">内容{{ show }}</div>

    <div class="pop-main" @click="handleEmit"></div>

    <div class="close" @click="closePop">xxxxxx</div>
  </van-popup>
</template>
<style lang="less" scoped>
.pop-container {
  .wh(100, 100);
  .bg('index/phase1.png');
}

.pop-main {
  .wh(750, 551);
  .bg('index/old-bg-map.png');
}

.close {
  .wh(200, 50);
  background: yellow;
  .bg('index/icon-prize.png');
}
</style>
