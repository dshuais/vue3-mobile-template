<!--
 * @Author: dushuai
 * @Date: 2023-03-15 12:09:17
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-30 15:34:16
 * @description: BaseLoading图片预加载
-->
<script setup lang="ts">
import { GetNetworkImg } from "@/api/api";
import imgList from "@/assets/ts/imgList";
import { useAppStore } from "@/stores/app";

const { loginStatus } = storeToRefs(useAppStore()); // 登录状态
const loading = ref<HTMLElement>();
const progress = ref<number>(0); // 加载进度
const imgListLength = ref<number>(0); // 图片数组长度

const progressInt = computed<number>( // 进度条
  () => (progress.value * 100) / imgListLength.value || 0
);

// 加载图片
const handleLoadImg = (): Promise<string> => {
  return new Promise<string>((resovle) => {
    if (Object.keys(imgList).length === 0 || loginStatus.value.isLoading) return resovle("图片加载完成");

    // 取出需要预加载的图片
    let imgUrlArr: string[] = [];
    for (let key in imgList) {
      imgUrlArr = [...imgUrlArr, ...imgList[key]];
    }
    imgListLength.value = imgUrlArr.length; // 赋值图片长度

    let loadedCount: number = 0;
    const imgLoaded = () => {
      loadedCount++;
      // 图片加载完成执行 计算进度条
      progress.value = loadedCount;
      // 加载完成
      if (loadedCount >= imgUrlArr.length) resovle("图片加载完成");
    };

    const Preload = () => {
      imgUrlArr.forEach((imgUrl) => {
        const oImg = new Image();
        oImg.addEventListener("load", imgLoaded);
        oImg.addEventListener("error", imgLoaded);
        // console.log('图', imgUrl, new URL(`../../assets/img/${imgUrl}`, import.meta.url).href)
        // 无序加载，并发下载图片 注意要使用相对路径
        oImg.src = new URL(`../../assets/img/${imgUrl}`, import.meta.url).href
        // oImg.src = require(`@/assets/img/${imgUrlArr[loadedCount]}`) // 有序加载，一张一张加载
      });
    };
    // 执行预加载
    Preload();
  });
};

// 加载本地和网络图片
const handleLoadNetworkImg = (): Promise<string> => {
  return new Promise<string>((resolve) => {
    if (loginStatus.value.isLoading) return resolve('图片加载完成')
    GetNetworkImg()
      .then(res => {
        if (res.code == 200) {
          let imgUrlArr: string[] = []; // 定义预加载图片
          if (res.data.imgList && res.data.imgList.length) {
            const list = res.data.imgList;
            list.filter(img => img);
            imgUrlArr = [...imgUrlArr, ...list];
          }
          // 图片为空直接返回结束回调
          if (Object.keys(imgList).length === 0 && imgUrlArr.length === 0) {
            resolve("图片加载完成");
            return;
          }
          // 取出需要预加载的图片
          for (let key in imgList) {
            imgUrlArr = [...imgUrlArr, ...imgList[key]];
          }
          // 赋值图片长度
          imgListLength.value = imgUrlArr.length;

          let loadedCount = 0;
          const imgLoaded = () => {
            loadedCount++;
            // 图片加载完成执行 计算进度条
            progress.value = loadedCount;
            // 加载完成
            if (loadedCount >= imgUrlArr.length) {
              resolve("图片加载完成");
            }
          };

          const Preload = () => {
            imgUrlArr.forEach((imgUrl) => {
              const oImg = new Image();
              oImg.addEventListener("load", imgLoaded);
              oImg.addEventListener("error", imgLoaded);

              if (imgUrl.includes("http")) {
                oImg.src = imgUrl; // 下载网路图片
              } else {
                oImg.src = require(`@/assets/img/${imgUrl}`); // 无序加载，并发下载图片
              }
              // oImg.src = require(`@/assets/img/${imgUrlArr[loadedCount]}`) // 有序加载，一张一张加载
            });
          };
          // 执行预加载
          Preload();
        } else {
          window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL;
          console.log("预加载图片异常==>", res);
        }
      })
      .catch((err: any) => {
        window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL;
        console.log("预加载图片异常==>", err);
      });
  });
};

// 禁止触摸
const noTouch = (dom: HTMLElement) => {
  if (!dom) return
  dom.addEventListener("touchmove", (event) => event.preventDefault(), false);
};

onMounted(() => {
  noTouch(loading.value as HTMLElement);
});

defineExpose({
  handleLoadImg
});
</script>

<template>
  <div class="loading" v-if="!loginStatus.isLoading" ref="loading">
    <!-- <p class="text">{{ `正在加载中${progressInt}%...` }}</p> -->
    <p class="text">{{ `正在加载中...` }}</p>
    <div class="progress">
      <div class="inner" :style="{ width: `${progressInt}%` }" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.loading {
  z-index: 9999;
  color: #a9836e;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #feead5;
  overflow-y: hidden;

  .text {
    top: 500px;
    width: 100%;
    line-height: 60px;
    text-align: center;
    font-size: 25px;
  }

  .progress {
    position: relative;
    width: 500px;
    height: 20px;
    border-radius: 50px;
    overflow: hidden;

    .inner {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 50px;
      transition: width 0.3s linear;
    }
  }
}
</style>