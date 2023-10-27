/*
 * @Author: dushuai
 * @Date: 2023-10-25 18:20:47
 * @LastEditors: dushuai
 * @LastEditTime: 2023-10-27 15:18:33
 * @description: jsx模板组件
 */
import { Popups } from '@/enums/app' // 弹窗refName枚举
import { usePopupsStore } from '@/stores/popups' // 所有的弹窗 ---> 用来挂载当前弹窗
import { usePopups } from '@/hooks/usePopups' // 打开关闭弹窗的方法 ---> 用来调用操作弹窗的方法
import { useToast } from '@/hooks/useToast'
import { Popup, Button } from 'vant';
import type { PropType } from 'vue';
import styles from './popBaseJsx.module.less'

/**
 * props参数类型
 */
type ComponentProps = {
  message: App.msg
}

export default defineComponent({
  name: 'PopBaseJsx',
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
  },
  props: {
    message: {
      required: true,
      type: Object as PropType<App.msg>
    }
  },
  emits: ['close'],
  setup(props: ComponentProps, { emit, slots }) {
    const show = ref<boolean>(false) // 必须
    const { openPopups, popShow, closePop, closeOtherPop } = usePopups()
    const { $msg } = useToast()

    /** 关闭弹窗 */
    const close = () => {
      closePop(Popups.popBaseJsx)
      emit('close', '关闭了弹窗')
    }

    console.log(slots);


    /**
     * 示例
     */
    const count = ref<number>(0)
    function addCount() {
      count.value++
    }
    function clearCount() {
      if (count.value == 0) return
      count.value = 0
      $msg('clear success')
    }

    onMounted(() => {
      /**
       * 当弹窗挂载完成后 把该弹窗放进popups pinia内统一管理
       * @param {ref<boolean>} show show为必须参数 且为响应式数据
      */
      usePopupsStore().SET_POPUPS(Popups.popBaseJsx, { show }) // 必须
    })

    return () => (
      <van-popup v-model={[show.value, 'show']} duration={0.2} close-on-click-overlay={false}>
        <van-button type="primary" onClick={closeOtherPop}>关闭所有弹窗</van-button>

        <div class={styles.container}>{props.message.code == 200 ? <Component /> : props.message.msg}</div>

        <div class={styles.main}></div>

        <div class={styles.count}>
          <div>{count.value}</div>
          <van-button type="success" onClick={addCount}>++</van-button>
          <van-button type="danger" onClick={clearCount}>clear</van-button>
        </div>

        {slots.default ? slots.default() : <div class={styles['title-default']}>我是默认插槽占位</div>}

        {slots.title ? slots.title({ title: 'TITLE' }) : <TitleComponent title='T-I-T-L-E' />}

        <div class={styles.close} onClick={close}>xxxxxx</div>
      </van-popup>
    )
  }
})

function Component() {
  return (
    <div>我是函数</div>
  )
}

type TitleProps = {
  title?: string
}

function TitleComponent(props: TitleProps) {
  return <div class={styles['title-component']}>我是{props.title}插槽占位</div>
}

TitleComponent.props = {
  title: {
    type: String,
    default: 'title'
  }
}
