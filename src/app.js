/**
 * @file entry
 * @author huangyingwen(hyw.huangyingwen@gmail.com)
 */

import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import {
  Vuetify,
  VBtn,
  VApp,
  VList,
  VIcon,
  VProgressCircular,
  VDivider,
  VBottomNav,
  VGrid,
  VAvatar,
  VToolbar,
  VCard,
  VBadge,
  VForm,
  VTextField
} from 'vuetify'
import { createRouter } from './router'
import store from './store'
import App from './App.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import InfiniteScroll from '@/components/infinite-scroll'
import VueSimplemde from 'vue-simplemde'

Vue.use(VueSimplemde)

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VList,
    VIcon,
    VProgressCircular,
    VDivider,
    VBottomNav,
    VGrid,
    VAvatar,
    VToolbar,
    VCard,
    VBadge,
    VForm,
    VTextField
  }
})

Vue.component('icon', Icon)

Vue.use(InfiniteScroll)

Vue.filter('formatDate', str => {
  var date = new Date(str)
  var time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if (time / 1000 < 60) {
    return '刚刚'
  } else if (time / 60000 < 60) {
    return parseInt(time / 60000) + '分钟前'
  } else if (time / 3600000 < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if (time / 86400000 < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if (time / 2592000000 < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
export function createApp() {
  let router = createRouter()
  let app = new Vue({
    router,
    store,
    ...App
  })

  sync(store, router)
  return { app, router, store }
}
