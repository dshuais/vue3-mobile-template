import md5 from 'js-md5'
import cmblapi from 'cmblapi'
import { formatDate, randomString } from './index'
import type { CmbLoginData } from '@/typings/response'

/**
 * 招行登录
 * @param {Function} successCB 登录成功回调
 * @param {Function} failCB 登录失败回调
 */
export const cmbAppLogin = (successCB:Function, failCB: Function) => {
  const corpNo:string = import.meta.env.VITE_APP_CORPNO, // 商户号
    timeStamp:string = formatDate(new Date(), 'yyyyMMddHHmmss'), // 时间
    nonceStr:string = randomString(), // 随机字符串
    sign:string = md5(`${corpNo}${timeStamp}${nonceStr}${import.meta.env.VITE_APP_KEY}`) // 签名
  cmblapi.merchantLogin({
    corpNo,
    reAuth: false, // 是否需要重新授权，如果用户已同意设置该参数无效
    authInfo: {
      timeStamp,
      nonceStr,
      sign
    },
    success: (res:CmbLoginData) => {
      successCB && successCB(res)
    },
    fail: (err: any) => {
      failCB && failCB(err)
    }
  })
}



/** 关闭页面 */
export const cmbPopWindow = () => {
  if (import.meta.env.VITE_NODE_ENV === 'development') return console.log('关闭页面')
  cmblapi.applet({
    api: 'popWindow',
    success: function () {
      console.log('关闭页面')
    },
    fail: function (err: any) {
      alert(err)
    }
  })
}
