<!--
 * @Author: dushuai
 * @Date: 2023-03-13 15:45:54
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-24 18:12:27
 * @description: App
-->
<script setup lang="ts">
// 配置项目标题和meta 利于seo
useHead({
  title: import.meta.env.VITE_APP_TITLE,
  // meta: [
  //   { name: 'callback', content: 'cmbShareCallback' },
  //   { name: 'shareType', content: 'v2' },
  //   { name: 'sceneNo', content: import.meta.env.VITE_APP_SHARE_ID }
  // ]
})
</script>
<template>
  <RouterView />
</template>
