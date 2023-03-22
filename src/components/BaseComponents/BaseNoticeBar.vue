<!--
 * @Author: dushuai
 * @Date: 2023-03-22 14:30:41
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-22 14:32:58
 * @description: 预生产使用
-->
<script setup lang="ts">
</script>
<template>
  <div class="noticeBar_container">
    <van-notice-bar left-icon="volume-o" text="测试中 所有奖品都不将发放！" class="notice_bar" />
  </div>
</template>
<style lang="less" scoped>
.noticeBar_container {
  z-index: 10;
  position: sticky;
  top: 0px;
}
</style>