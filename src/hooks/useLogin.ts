/*
 * @Author: dushuai
 * @Date: 2023-03-21 16:06:16
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-23 10:28:19
 * @description: 抽离app登录逻辑hooks
 */
import cmblapi from 'cmblapi'
import { GetMerchantOpenToken, Login } from "@/api/api"
import { cmbAppLogin, cmbAppPopWindow } from "@/utils/cmbUtil"
import { useAppActions } from '@/stores/appActions'

/**
 * 招行登录and登录接口拿token等
 */
export const useLoginEffect = () => {
  /** 招行登录 */
  const login = () => {
    return new Promise<string>((resolve, reject) => {
      if (import.meta.env.VITE_NODE_ENV === 'development') {
        return setTimeout(() => {
          useAppActions().SET_TOKEN('test-token=123456')
        }, 1000)
        let userInfo: Cmb.CmbLoginData = {
          resultType: "Y",
          cryptType: "2",
          body: "u9su4Mi92g8b2l1GjBEllZQBpjFxRbKYY4MNjgS7qyQBNWCWEZXEbMnMlogzkQ4tnon1a091EAlH06KDvlx0YsX8/1WpbZQv6viwR1uOY6xVv1arURvbcnLcpbCMhJGDotn/YHohSxMUDzX4loPwHNejAcYLIF0+9u7tKCrYqY1+Ln9wYt3YeyjpIcjFmQdZyF/Whwfn+cc5YBy987agQpEZ9vhu8z109I8ibyx+/yiIVpnOTPunMA+T2lz7fhhNWoBzSJJujyoq4xWbM/6ZUikulgzv+FBpS0K2wcJ6DBrD+XdWkAx8CszTl/KSc0CoGfW9I7BhNceKc4M/K2GkMS8h8T9h6s28WWpqz8RcSbf3/7+GSpn9m2nldvtOIC9mPC3Zn05mYSTh1e1k9gBZ/4jj5fTr3tr3uUxtBT4pv86dOArI5WnKrp0NOaBIXvcGwHk1F56g/1KY2rWKKBFUFYdG0onr8H+qQdc0jXlNxiovNZk8k2lTn0K4eqIIa/9hse8O4M4uaTaZfumcjDj2fRyqcT0rjprTWU2dpTYc6M/SftB+nO/KvFpo8tY7f3CLk45iZW4ORPiBkzHoTt8iTr4ua5e0w7AHGIOf8srvNtVw71vmzbDMchogDgyQkdz1bCSCxEqmpOq99YqCltiX1I9rYcjcSsLOteZhXM2i3Mk="
        }
        getUserInfo(userInfo)
      } else {
        cmbAppLogin(
          (userInfo: Cmb.CmbLoginData) => {
            getUserInfo(userInfo)
              .then((response: boolean) => {
                resolve('登陆成功')
              })
              .catch((err: boolean) => {
                reject('登陆失败')
              })
          },
          (err: any) => {
            console.log('cmb登录err:>> ', err);
            reject('登陆失败')
            cmbAppPopWindow() // 关闭app
          }
        )
      }
    })
  }

  /** 获取用户信息 */
  const getUserInfo = (userInfo: Cmb.CmbLoginData) => {
    return new Promise<boolean>((resolve, reject) => {
      Login({ sResponseXml: JSON.stringify(userInfo) })
        .then(res => {
          if (res.code === 200) {
            // userType: 0:正常用户 1:未实名用户 2:非一网通用户
            // param && sign: 羊毛党参数 如果不需要调羊毛党接口就没有
            const { token, param, sign, userType } = res.data
            if (userType === 0) {
              useAppActions().SET_TOKEN(token)

              // 如果有两个参数说明需调用羊毛党接口
              // if (param && sign) {
              //   const {
              //     trxCode,
              //     expandUserID,
              //     uniqueUserID,
              //     timeStamp
              //   } = JSON.parse(param) as Res.LoginDataParam
              //   console.log('羊毛党param: ', param)
              //   // 羊毛党接口
              //   cmblapi.merchantOpenAPI({
              //     version: '1.0', //默认版本
              //     gateWay: '0158020', //默认网关ID
              //     api: 'RtMiniProLogin', //默认api名称
              //     errPrompt: '2',
              //     params: {
              //       trxCode, // Rtd交易码,无特殊场景传空字符串!
              //       expandUserID,
              //       uniqueUserID,
              //       timeStamp
              //     },
              //     corpNo: import.meta.env.VITE_APP_CORPNO, //商户号
              //     sign,
              //     success: (res: CmbMerchantData) => {
              //       console.log('调用招行羊毛党接口成功', res)
              //       const { errCode, errMsg, data } = res
              //       // 告知后端此人是不是羊毛党
              //       GetMerchantOpenToken({ token, errCode, errMsg, data })
              //         .then(res => {
              //           console.log('告知羊毛党接口', res)
              //         })
              //         .catch(err => {
              //           console.log('告知羊毛党接口异常', err)
              //         })
              //     },
              //     fail: (error: CmbMerchantData) => {
              //       console.log('调用招行羊毛党接口失败', error)
              //       const { errCode, errMsg } = error
              //       // 失败默认是正常用户
              //       GetMerchantOpenToken({ token, errCode, errMsg })
              //         .then(res => {
              //           console.log('告知羊毛党接口', res)
              //         })
              //         .catch(err => {
              //           console.log('告知羊毛党接口异常', err)
              //         })
              //     }
              //   })
              // }
            } else if (userType === 1) {
              useAppActions().SET_LOGIN_STATE({ key: 'isRealName', val: true })
            } else if (userType === 1) {
              useAppActions().SET_LOGIN_STATE({ key: 'isFreeNet', val: true })
            }
            resolve(true)
          } else {
            reject(false)
            console.log('登录获取token code!=200:>> ', res)
            window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL
          }
        })
        .catch(err => {
          reject(false)
          console.log('登录获取token失败:>> ', err)
          window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL
        })
    })
  }

  return { login }
}
