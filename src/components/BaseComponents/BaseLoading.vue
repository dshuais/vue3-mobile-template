<!--
 * @Author: dushuai
 * @Date: 2023-03-15 12:09:17
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-15 14:40:52
 * @description: BaseLoading图片预加载
-->
<script setup lang="ts">
const count = ref<number>(0)

const handleAdd = () => {
  count.value++
}

defineExpose({
  count,
  handleAdd,
})
</script>

<template>
  <div @click="handleAdd">{{ count }}</div>
</template>