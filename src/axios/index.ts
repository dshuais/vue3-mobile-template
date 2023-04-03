/*
 * @Author: dushuai
 * @Date: 2023-03-14 17:53:45
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-03 12:28:40
 * @description: axios
 */
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import qs from 'qs'
import md5 from 'js-md5'
import { useAppStore } from '@/stores/app'
import { useAppActions } from '@/stores/appActions'
import type { ResponseRes } from '@/typings/response'
import { cancelRequest } from './cancelRequest'


const whiteList: string[] = ['/qiniu/upload/uptoken'], // 不需要处理异常白名单
  noTokenUrl: string[] = ['app/main/getToken'], // 不需要token的接口列表
  to404Url: number[] = [] // 报错需要跳转降级页的状态码 -500

/**
 * 统一处理报错
 * @param {AxiosResponse} response 请求相应参数
 */
const ErrorCodeHandle = (response: AxiosResponse<any, any>): void => {
  const code: number = response.data.code,
    url = response.config.url as string

  if (code === 200) { // 正常

  } else if (code === 401 && noTokenUrl.includes(url)) { // 401未登录
    console.log('登陆失败err:>> ', url)
    useAppActions().REMOVE_TOKEN()
  } else if (to404Url.includes(code)) { // 跳降级页
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
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // 添加token
    const { token } = storeToRefs(useAppStore())
    if (token.value) {
      config.headers['token'] = token.value
    }

    cancelRequest.addPending(config) // 添加当前请求至请求列表

    // console.log('请求拦截 config:>> ', config)
    return config
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    cancelRequest.removePending(response.config) // 删除重复请求

    const url = response.config.url as string
    if (whiteList.some(e => e.match(url))) {
      console.log('接口通过白名单，不需要异常处理:>> ', url)
    } else {
      ErrorCodeHandle(response)
    }

    // console.log('响应拦截 response:>> ', response)
    return response
  },
  (err: AxiosError) => {
    /**
     * 将取消请求的错误捕获
     * 根据需要设置 因为需要对每个请求单独处理catch 所以隐藏取消请求的错误返回
     */
    if (err.code === 'ERR_CANCELED') {
      console.log('请求取消url:>> ', err.config?.url)
    } else {
      return Promise.reject(err)
    }
  }
)


/**
 * 基础的请求
*/
/** POST表单格式 */
export function post<T = any>(url: string, params?: object): Promise<ResponseRes<T>> {
  return new Promise<ResponseRes<T>>((resolve, reject) => {
    service
      .post(url, qs.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      .then(
        (response: AxiosResponse<ResponseRes<T>>) => {
          response && resolve(response.data)
        },
        (err: AxiosError) => {
          reject(err)
        }
      )
      .catch((err: AxiosError) => {
        reject(err)
      })
  })
}

/** POST JSON格式 */
export function postJSON<T = any>(url: string, params?: object): Promise<ResponseRes<T>> {
  return new Promise<ResponseRes<T>>((resolve, reject) => {
    service
      .post(url, params)
      .then(
        (response: AxiosResponse<ResponseRes<T>>) => {
          response && resolve(response.data)
        },
        (err: AxiosError) => {
          reject(err)
        }
      )
      .catch((error: AxiosError) => {
        reject(error)
      })
  })
}

/** GET请求 */
export function get<T = any>(url: string, params?: object): Promise<ResponseRes<T>> {
  return new Promise<ResponseRes<T>>((resolve, reject) => {
    service
      .get(url, { params })
      .then(
        (response: AxiosResponse<ResponseRes<T>>) => {
          response && resolve(response.data)
        },
        (err: AxiosError) => {
          reject(err)
        }
      )
      .catch((error: AxiosError) => {
        reject(error)
      })
  })
}

