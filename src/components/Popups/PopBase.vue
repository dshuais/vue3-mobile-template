<!--
 * @Author: dushuai
 * @Date: 2023-03-16 15:04:41
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-29 19:09:04
 * @description: Pop 组件
-->
<script setup lang="ts">
import { usePopups } from '@/hooks/usePopups';
import { usePopupsStore } from '@/stores/popups';

const { closePop } = usePopups()

const props = defineProps<{ title?: string }>()
const emit = defineEmits<{
  (e: 'click', val: number): void
}>()
const { popups } = storeToRefs(usePopupsStore())

const show = ref<boolean>(false)
//   show.value = true
// }
// const closePop = () => {
//   show.value = false
// }

const handleEmit = () => {
  emit('click', 7788)
}

onMounted(() => {
  popups.value['refPopBase'] = { show }

  console.log('refPopups', popups.value)
  console.log('props', props);
  console.log('attrs', useAttrs())
})

defineExpose({
  // popShow,
  // closePop,
})
</script>
<template>
  <van-popup v-model:show="show" :duration="0.2" :close-on-click-overlay="false">
    <div class="pop-container">内容{{ show }}</div>

    <div class="pop-main" @click="handleEmit"></div>

    <div class="close" @click="closePop('refPopBase')">xxxxxx</div>
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
