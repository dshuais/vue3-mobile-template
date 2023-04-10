<!--
 * @Author: dushuai
 * @Date: 2023-03-17 09:30:38
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-10 16:41:03
 * @description: 框架说明
-->
# 项目名称

## 项目资料

1. 代码地址：
2. 需求文档：
3. 需求规格说明：
4. 蓝湖设计图：

## 提示

1. 推荐使用`pnpm install`安装依赖，因`vite-plugin-imagemin`等有些包在国内不太好安装
2. `.env.development`、`.env.sit`、` .env.uat`、`.env.production` 需要修改为项目对应环境的配置
3. `auto-imports.d.ts`、`components.d.ts` 为按需加载（vue、vue-router、pinia、components下组件）自动生成文件，请勿修改且在代码内不要重复导入
4. `node_modules` 、`mobile` 等非源码文件勿提交到SVN/git，可添加到SVN/git的ignore/.gitignore列表中
5. 对弹框进行统一管理，弹框组件请根据`/src/components/Popups/popBase.vue`、`/src/hooks/usePopups.ts`内提示使用

## 目录结构

```
┌─mobile/dist                     打包文件目录
|─public
|─src
│  └─api          	              业务请求接口
│  └─assets            	          存放应用引用的本地静态资源（如图片、序列帧等）的目录
│     └─img            	          静态图片文件目录
│     └─resource                  序列帧文件目录
│  └─axios            	          封装axios请求
|     └─requestCancel             重复请求取消方法文件
│  └─common            	          公共文件
│     └─style            	      公共样式文件目录
|     └─ts                        公共函数的目录
│  └─components                   符合vue组件规范的组件目录
│     └─BaseComponents            基础组件目录
│         └─BaseLoading.vue       静态资源预加载组件
│     └─Popups                    弹窗组件目录
│         └─popBase.vue           弹窗组件使用实例
│  └─enum                         枚举文件目录
│  └─hooks                        抽离hooks的文件目录
│     └─useLogin                  抽离登录方法
│     └─usePopups                 弹窗统一管理方法的hooks
│     └─useToast                  toast提示的hooks
│  └─router                       路由文件
│  └─stores                       状态管理仓库（pinia）文件目录
|     └─app.ts                    存放app内状态state的文件
|     └─appActions.ts             存放操作状态方法action的文件
|     └─popups.ts                 存放弹窗状态state的文件 按规则使用即可,可不更改
│  └─typings                      ts类型定义文件目录
|     └─app.d.ts                  app内数据类型
|     └─cmb.d.ts                  cmb request/response的数据结构类型定义文件
|     └─env.d.ts                  自定义npm上没有声明文件包的声明文件
|     └─request.d.ts              请求的request的数据结构类型定义文件
|     └─response.d.ts             请求的response.data.data的数据结构类型定义文件
│  └─utils                        常用的工具类函数文件目录
|     └─cmbUtil.ts                cmb常用api
|     └─is.ts                     is类型推断
|     └─index.ts                  工具方法
|     └─router.ts                 重写路由跳转
│  └─views                        路由对应vue文件目录
|     └─components                抽分页面组件文件目录
|     └─index.vue                 首页
│  └─App.vue                      App根文件
│  └─auto-imports.d.ts            按需加载api自动生成文件（勿改）
│  └─components.d.ts              按需加载组件自动生成文件（勿改）
│  └─componentsInstance.d.ts      统一定义组件类型文件（勿改）
│  └─main.js                      入口文件
|─.env.xxx              	      环境变量配置
|─.eslintrc-auto-import           自定义按需加载api文件，配置项与auto-imports.d.ts相对
|─.eslintrc.cjs                   ESLint规则
│─index.html
│─package.json
│─pnpm-lock.yaml
├─README.md                       项目信息
├─tsconfig.json                   ts配置文件
├─tsconfig.app.json               ts配置文件，会覆盖tsconfig
├─tsconfig.node.json
├─tsconfig.vitest.json
├─vite.config.ts                  vite配置
└─vitest.config.ts
```

## 环境打包等命令

npm run dev    本地启动项目

npm run sit    测试环境打包

npm run uat    预生产环境打包

npm run prod   生成环境打包

npm run getImg 自动加载assets/img/下静态图片（图片懒加载使用），环境打包命令会自动执行,无需重复执行
