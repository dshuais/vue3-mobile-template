/*
 * @Author: dushuai
 * @Date: 2023-10-25 18:20:47
 * @LastEditors: dushuai
 * @LastEditTime: 2023-10-26 10:49:01
 * @description: jsx模板组件
 */
import { Popups } from '@/enums/app' // 弹窗refName枚举
import { usePopupsStore } from '@/stores/popups' // 所有的弹窗 ---> 用来挂载当前弹窗
import { usePopups } from '@/hooks/usePopups' // 打开关闭弹窗的方法 ---> 用来调用操作弹窗的方法
import { Popup, Button } from 'vant';

export default defineComponent({
  name: 'PopBaseJsx',
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
  },
  setup() {
    const show = ref<boolean>(false) // 必须
    const { openPopups, popShow, closePop, closeOtherPop } = usePopups()

    /** 关闭弹窗 */
    const close = () => {
      closePop(Popups.popBaseJsx)
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

        <div class="pop-container">内容</div>

        <div class="pop-main"></div>

        <div class="close" onClick={close}>xxxxxx</div>
      </van-popup>
    )
  }
})
