<!--
 * @Author: dushuai
 * @Date: 2023-10-27 09:44:08
 * @LastEditors: dushuai
 * @LastEditTime: 2023-10-27 17:04:49
 * @description: pageJsx页面
-->
<script setup lang='tsx'>
import { Pages } from '@/enums/app'
import styles from './pageJsx.module.less'
import { to } from '@/utils/router'

type List = {
  id: number,
  title: string
}

const list = ref<List[]>([
  { id: 1, title: '第一' },
  { id: 2, title: '第二' },
  { id: 3, title: '第三' },
  { id: 4, title: '第四' },
  { id: 5, title: '第五' },
])

function handleJump(page: keyof typeof Pages) {
  to(Pages[page])
}

const List = () =>
  <div class={styles.list}>
    {list.value.map(item => (
      <div key={item.id} class={styles.item}>
        {item.title}
        <van-button type="primary" onClick={() => handleJump(item.id < 3 ? 'Home' : 'Game')}>
          {item.id < 3 ? '回首页' : '去游戏页'}
        </van-button>
      </div>
    ))}
  </div>

</script>
<template>
  <div>我是模板套jsx页面</div>
  <List />
</template>
<style lang='less' scoped></style>
