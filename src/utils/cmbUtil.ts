/*
 * @Author: dushuai
 * @Date: 2023-03-24 10:57:28
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-19 09:38:02
 * @description: 二次封装常用招行api
 */

import md5 from 'js-md5'
import cmblapi from 'cmblapi'
import { formatDate, randomString } from './index'

/**
 * 招行登录
 * @param {Function} success 登录成功回调
 * @param {Function} fail 登录失败回调
 */
export const cmbAppLogin = (success: Function, fail: Function) => {
  const corpNo: string = import.meta.env.VITE_APP_CORPNO, // 商户号
    timestamp: string = formatDate(new Date(), 'yyyyMMddHHmmss'), // 时间
    nonceStr: string = randomString(), // 随机字符串
    sign: string = md5(`${corpNo}${timestamp}${nonceStr}${import.meta.env.VITE_APP_KEY}`) // 签名
  cmblapi.merchantLogin({
    corpNo,
    reAuth: false, // 是否需要重新授权，如果用户已同意设置该参数无效
    authInfo: {
      timestamp,
      nonceStr,
      sign
    },
    success: (res: Cmb.CmbLoginData) => {
      success && success(res)
    },
    fail: (err: any) => {
      fail && fail(err)
    }
  })
}

/**
 * 招行页面跳转
 * @param {string} url 跳转链接
 */
export const cmbAppPushWindow = (url: string) => {
  if (import.meta.env.VITE_NODE_ENV === 'development') return console.log('跳转链接', url)
  if (
    url.indexOf('cmbls/functionjump') > -1 ||
    url.indexOf('cmbls/FunctionJump') > -1 ||
    url.indexOf('CMBLS/functionJump') > -1 ||
    url.indexOf('CMBLS/FunctionJump') > -1
  ) {
    console.log('普通跳转')
    window.location.href = url
  } else {
    cmblapi.applet({
      api: 'pushWindow',
      params: {
        url,
        windowControl: 'keepAll',
        windowStyle: 'normal' // normal展示跳转后页面的标题 applet本活动标题
      },
      success: function () { },
      fail: function (res: Cmb.CmbFailResponse) {
        console.log(res)
        if (res.errCode === 100) {
          cmblapi.pushWindow({
            url,
            success: function () { },
            fail: function (res: any) {
              window.location.href = url
            }
          })
        }
      }
    })
  }
}

/**
 * 招行页面跳转 --> 可能比pushwindow兼容性更好
 * @param {string} url 跳转链接 
 */
export const cmbAppJumpLink = (url: string) => {
  if (import.meta.env.VITE_NODE_ENV === 'development') return console.log('跳转链接', url)
  if (
    url.indexOf('cmbls/functionjump') > -1 ||
    url.indexOf('cmbls/FunctionJump') > -1 ||
    url.indexOf('CMBLS/functionJump') > -1 ||
    url.indexOf('CMBLS/FunctionJump') > -1
  ) {
    console.log('普通跳转')
    location.href = url
  } else {
    cmblapi.applet({
      api: 'goCMBFunc',
      params: {
        funcUrl: url,
        requestType: 'GET',
        windowControl: 'keepAll',
        paramString: ''
      },
      success: function () { },
      fail: function () {
        window.location.href = url
      }
    })
  }
}

/** 关闭页面 */
export const cmbAppPopWindow = () => {
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

/**
 * 监听返回小程序页面刷新
 * @param {CmbOnpageShow} obj 页面监听的事件、有效期、成功、失败、触发等回调对象
 */
export const cmbAppOnpageShow = (obj: Cmb.CmbOnpageShow) => {
  if (import.meta.env.VITE_NODE_ENV === 'development') return console.log('开启页面监听')
  let {
    eventName = 'onPageShow', // onLoginSuccess 用户登录成功 onPageShow 当前页面曝光显示  onPageHide	当前页面隐藏(注意：如果是关闭浏览器窗不会收到该事件，可以用 HTML onunload事件属性)或压入后台 onLogoutSuccess 用户登出成功
    constant = false, // 监听是否一直有效 true: 持续有效 false: 一次有效
    success = function (res: any) {
      //接口调用成功的回调函数
      console.log('接口调用成功', res)
    },
    on = function (res: any) {
      //事件触发的回调函数
      console.log('事件触发', res)
    },
    fail = function (res: any) {
      //接口调用失败的回调函数
      console.log('口调用失败', res)
    }
  } = obj
  cmblapi.addAppEventListener({
    eventName,
    constant, //是否一直有效
    success,
    on,
    fail
  })
}

/**
 * 添加日历提醒
 * @param {CmbCalendarReminder} remindObj 日历提醒名称、提醒次数、提醒时间、回调等对象
 */
export const cmbAppCalendarReminder = (remindObj: Cmb.CmbCalendarReminder = {}) => {
  cmblapi.calendarReminder(
    Object.assign(
      {
        remindName: '日历', // 日历提醒事项的名称
        remindType: 'single', // single :单次提醒； month:每月提醒一次；year :每年提醒一次
        remindTime: new Date().getTime() + 60000, // 日历提醒的时间，格式为“yyyyMMddHHmmss”
        success: (res: any) => console.log('添加日历成功', res),
        fail: (err: Cmb.CmbFailResponse) => console.log(err.errCode, err.errMsg)
      },
      remindObj
    )
  )
}

/**
 * 新版分享（带ui页面）
 * @param {CmbShareInfo} obj 分享类型、渠道、参数、回调等
 */
export const cmbAppShareInfoWithUI = (obj: Cmb.CmbShareInfo) => {
  if (import.meta.env.VITE_NODE_ENV === 'development') return console.log('调用招行分享接口', obj)
  let {
    type = 'url', // url: 网页分享 image: 纯图片分享 text: 纯文本分享
    channelList = ['weixinsession', 'weixintimeline', 'weibo', 'qqsession'],
    shareContent = {
      title: 'url信息分享',
      text: 'url信息分享',
      url: `${import.meta.env.VITE_APP_SHARE_URL}`,
      thumbUrl: 'https://img01.mall.cmbchina.com/images/CM/P600/S1H-50T-2NU.jpg'
    },
    success = function (res: any) {
      console.log('分享成功', res)
    },
    fail = function (res: Cmb.CmbFailResponse) {
      console.log('分享失败', res)
    }
  } = obj
  cmblapi.shareInfoWithUI({
    type,
    channelList,
    shareContent,
    success,
    fail
  })
}

/**
 * 保存图片到相册
 * @param {CmbSaveImage} obj 保存的图片(base64)、回调等
 */
export const cmbAppSaveImageToAlbum = (obj: Cmb.CmbSaveImage) => {
  if (import.meta.env.VITE_NODE_ENV === 'development') return console.log('调用招行保存图片接口')
  let {
    picData = '', // 需要保存的图片内容字符串（base64编码）
    success = function (res: any) {
      console.log('保存成功 res', res)
    },
    fail = function (err: Cmb.CmbFailResponse) {
      console.log('保存失败 res', err)
    }
  } = obj
  cmblapi.saveImageToAlbum({
    picData,
    success,
    fail
  })
}

/**
 * 选择图片，相册/拍照
 * @param {CmbChooseImage} obj 
 *    params
*     action=album/default
*       maxCount:
*         选择图片的最大数量,区间在1-9.最大图片数为9
*       originMaxSize:
*         原图的目标尺寸大小，默认300k
*         若originMaxSize超过原图大小,将返回原图大小
*         若originMaxSize小于原图大小的10%，将返回原图大小的10%
*       needThumbnails:
*         是否需要缩略图
*       thumbnailsMaxSize:
*         缩略图的目标尺寸大小,默认30k
*         若thumbnailsMaxSize超过原图大小,将返回原图大小
*         若thumbnailsMaxSize小于原图大小的10%，将返回原图大小的10%
* @Remd more https://open.cloud.cmbchina.com/#/apistoredetail?tabname=apistore&catid=5&catname=%E7%B3%BB%E7%BB%9F%E5%9F%BA%E7%A1%80%E7%B1%BB&pkid=c244ef4e-5792-48c4-bdcc-e5bdcde944a4
 */
export const cmbAppChooseImage = (obj: Cmb.CmbChooseImage) => {
  if (import.meta.env.VITE_NODE_ENV === 'development') return console.log('调用招行拍照接口')
  let {
    action = 'default', // default相册/相机 album相册 camera相机 portrait人脸相机 imageClip相册或者相机并裁剪
    params = {
      maxCount: 1,
      originMaxSize: 100,
      needThumbnails: true,
      thumbnailsMaxSize: 10
    },
    success = function (res: any) {
      console.log('chooseImage成功 res', res)
    },
    fail = function (res: Cmb.CmbFailResponse) {
      console.log('chooseImage失败 res', res)
    }
  } = obj
  cmblapi.chooseImage({
    action,
    params,
    success,
    fail
  })
}
