/*
 * @Author: dushuai
 * @Date: 2023-03-14 17:53:45
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-16 18:52:35
 * @description: axios
 */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import qs from 'qs'
import { useAppStore } from '@/stores/app'
import { useAppActions } from '@/stores/appActions'

const { REMOVE_TOKEN } = useAppActions(),
  { token } = storeToRefs(useAppStore()),
  whiteList:string[] = ['/qiniu/upload/uptoken'], // 不需要处理异常白名单
  noTokenUrl:string[] = ['app/main/getToken'], // 不需要token的接口列表
  to404Url:number[] = [] // 报错需要跳转降级页的状态码 -500

// 统一处理报错
const ErrorCodeHandle = (response:AxiosResponse<any, any>) => {
  const code:number = response.data.code,
  url = response.config.url as string

  if(code === 200) { // 正常
    
  } else if(code === 401 && noTokenUrl.includes(url)) { // 401未登录
    console.log('登陆失败err:>> ', url)
    REMOVE_TOKEN()
  } else if(to404Url.includes(code)) { // 跳降级页
    window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL
  } else {
    console.log('请求失败err:>> ', response.data);
  }

}

// axios基础配置
const service = axios.create({
  timeout: 20000,
  baseURL: import.meta.env.VITE_APP_BASE_URL
})

// 请求拦截
service.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  if (token) {
    config.headers['token'] = token
  }
  return config
},
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截
service.interceptors.response.use((response: AxiosResponse<any, any>) => {
  const url = response.config.url as string

  if(whiteList.some(e => e.match(url))) {
    console.log('接口通过白名单:>> ', url)
  } else {
    ErrorCodeHandle(response)
  }

  return response
},
  err => {
    return Promise.reject(err)
  }
)


/**
 * 基础的请求
*/
// POST表单格式
export function post(url: string, params?: object) {
  return new Promise((resolve, reject) => {
    service
      .post(url, qs.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      .then((response: AxiosResponse<any, any>) => {
        resolve(response)
      },
        err => {
          reject(err)
        }
      )
      .catch(err => {
        reject(err)
      })
  })
}

// POST JSON格式
export function postJSON(url: string, params?: object) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then((response: AxiosResponse<any, any>) => {
        resolve(response.data)
      },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

// GET请求
export function get(url: string, params?: object) {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params })
      .then((response: AxiosResponse<any, any>) => {
        resolve(response.data)
      },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

