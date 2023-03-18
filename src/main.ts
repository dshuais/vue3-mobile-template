/*
 * @Author: dushuai
 * @Date: 2023-03-13 15:45:54
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-18 17:33:51
 * @description: main
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VConsole from 'vconsole'
import App from './App.vue'
import router from './router'
import './common/less/reset.less'

const isVConsole = import.meta.env.VITE_APP_VCONSOLE_ABLED === 'true'

if (isVConsole) {
  new VConsole()
}

createApp(App)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(router)
  .mount('#app')

