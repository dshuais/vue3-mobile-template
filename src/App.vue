<!--
 * @Author: dushuai
 * @Date: 2023-03-13 15:45:54
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-19 10:13:27
 * @description: App
-->
<script setup lang="ts">
import { usePopups } from './hooks/usePopups';
import { usePopupsStore } from './stores/popups';

// 配置项目标题和meta
useHead({
  title: import.meta.env.VITE_APP_TITLE,
  // meta: [
  //   { name: 'callback', content: 'cmbShareCallback' },
  //   { name: 'shareType', content: 'v2' },
  //   { name: 'sceneNo', content: import.meta.env.VITE_APP_SHARE_ID }
  // ]
})

// 监听路由变换时清除弹窗遗留数据
const router = useRouter(),
  { closeOtherPop, openPopups } = usePopups(),
  path = ref<string>() // 记录上一次路由值，因为在打开弹窗时watchEffect会执行

watchEffect(() => {
  const cur: string = router?.currentRoute.value?.path
  if (cur && cur !== path.value && cur !== '/') {
    path.value = cur
    console.log('App当前页面', cur)
    if (openPopups.value.size > 0) closeOtherPop()
    usePopupsStore().CLEAR_POPUPS()
  }
})
</script>
<template>
  <RouterView />
</template>
