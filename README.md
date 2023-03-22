<!--
 * @Author: dushuai
 * @Date: 2023-03-17 09:30:38
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-22 17:08:25
 * @description: 框架说明
-->
# 项目名称

## 项目资料

1. 代码地址：
2. 需求文档：
3. 需求规格说明：
4. 蓝湖设计图：

## 提示

1. `.env.development`、`.env.sit`、` .env.uat`、`.env.production` 需要修改为项目对应环境的配置
2. `auto-imports.d.ts`、`components.d.ts` 为按需加载（vue、vue-router、pinia、components下组件）自动生成文件，请勿修改且在代码内不要重复导入
3. `node_modules` 、`mobile` 等非源码文件勿提交到SVN/git，可添加到SVN/git的ignore/.gitignore列表中

## 目录结构

```
┌─mobile/dist                     打包文件目录
|─public
|─src
│  └─api          	              业务请求接口
│  └─assets            	          存放应用引用的本地静态资源（如图片、序列帧等）的目录
│     └─img            	          静态图片文件目录
│       └─resource                序列帧文件目录
│  └─common            	          公共文件
│     └─style            	        公共样式文件目录
|     └─ts                        公共函数的目录
│  └─components                   符合vue组件规范的组件目录
│     └─BaseComponents            基础组件目录
│     └─Popups                    弹窗组件目录
│  └─enum                         公共枚举文件目录
│  └─hooks                        抽离hooks的文件目录
│  └─router                       路由文件
│  └─stores                       状态管理仓库（pinia）文件目录
|     └─app.ts                    存放状态state的文件
|     └─appActions.ts             存放操作状态方法action的文件
│  └─typings                      ts类型定义文件目录
|     └─response.ts               请求的response.data.data的数据结构类型定义文件
│  └─utils                        常用的工具类函数文件目录
│  └─views                        路由对应vue文件目录
|     └─components                抽分页面组件文件目录
│  └─App.vue                      App根文件
│  └─auto-imports.d.ts            按需加载api自动生成文件（勿改）
│  └─components.d.ts              按需加载组件自动生成文件（勿改）
│  └─componentsInstance.d.ts      统一定义组件类型文件（勿改）
│  └─main.js                      入口文件
|─.env.xxx              	        环境变量配置
|─.eslintrc-auto-import           自定义按需加载api文件，配置项与auto-imports.d.ts相对
|─.eslintrc.cjs                   ESLint规则
│─env.d.ts
│─index.html
│─package-lock.json
│─package.json
├─README.md                       项目信息
├─tsconfig.json                   ts配置文件
├─tsconfig.app.json               ts配置文件，会覆盖tsconfig
├─tsconfig.node.json
├─tsconfig.vitest.json
├─vite.config.ts                  vite配置
└─vitest.config.ts
```