<!--
 * @Author: dushuai
 * @Date: 2023-03-17 09:30:38
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-23 10:28:48
 * @description: 框架说明
-->
# 项目名称

## 项目资料

1. 代码地址：
2. 需求文档：
3. 需求规格说明：
4. 蓝湖设计图：

## 命令

#### 安装
```
pnpm install
```

#### 运行
```
pnpm run dev
```

#### 打包
打包命令请查看[这里](#运行以及打包)

#### 环境参数
全部参数变量请查看[这里](#环境配置参数)

## 提示

1. 推荐使用`pnpm install`安装依赖，因`vite-plugin-imagemin`等有些包在国内不太好安装
2. `.env.development`、`.env.sit`、` .env.uat`、`.env.production` 需要修改为项目对应环境的配置
3. `auto-imports.d.ts`、`components.d.ts` 为按需加载（vue、vue-router、pinia、components下组件）自动生成文件，请勿修改且在代码内不要重复导入
4. `node_modules` 、`mobile` 等非源码文件勿提交到SVN/git，可添加到SVN/git的ignore/.gitignore列表中
5. 对弹框进行统一管理，弹框组件请根据`/src/components/Popups/popBase.vue`、`/src/hooks/usePopups.ts`内提示使用
6. 项目内已引入`vite-plugin-imagemin`图片压缩工具，默认在`uat`、`production`环境下开启。注：开启后打包时间会比较长（126张图片将近两分钟），可在配置项`VITE_APP_TINY`关闭，自行在`https://tinypng.com`压缩

## 目录结构

```
┌─mobile/dist                     打包文件目录
|─public
|─src
│  └─api          	              业务请求接口
│  └─assets            	          存放应用引用的本地静态资源（如图片、序列帧等）的目录
│     └─img            	          静态图片文件目录
│     └─style                     样式文件目录
│  └─axios            	          封装axios请求
|     └─requestCancel.ts          重复请求取消方法
|     └─requestCode.ts            统一处理请求状态码方法
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
|     └─global.d.ts               全局window上数据类型
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

## 环境配置参数

```
#当前环境
VITE_NODE_ENV = "production"

#判断打包逻辑
VITE_APP_ENV = "production"

#判断预生产（设置预生产顶部跑马灯）
VITE_APP_PRE_PRODUCTION = "false"

#生产环境不需要log
VITE_APP_LOG = "true"

#资源路径
VITE_APP_RESOURCE_URL = "xxx"

#请求接口路径
VITE_APP_BASE_URL = "xxx"

#是否开启Vconsole（生产环境关闭）
VITE_APP_VCONSOLE_ABLED = "false"

#是否开启图片压缩（生产环境打开）
VITE_APP_TINY = "true"

#活动短链
VITE_APP_CHAIN = "xxx"

#活动秘钥
VITE_APP_KEY = "xxx"

#活动商户号
VITE_APP_CORPNO = "xxx"

#分享链接
VITE_APP_SHARE_URL = "xxx"

#降级页
VITE_APP_ERROR_PAGE_URL = "xxx"

#App卡券
VITE_APP_CARD_URL = "xxx"

#H5标题
VITE_APP_TITLE = "项目名称"
```

## 运行以及打包

```
pnpm run dev    本地启动项目

pnpm run sit    测试环境打包

pnpm run uat    预生产环境打包

pnpm run prod   生成环境打包

pnpm run getImg 自动加载assets/img/下静态图片（图片懒加载使用），环境打包命令会自动执行,无需重复执行
```
