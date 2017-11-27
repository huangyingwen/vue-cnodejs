/**
 * @file store index
 * @author huangyingwen(hyw.huangyingwen@gmail.com)
 */

import Vue from 'vue'
import Vuex from 'vuex'
import appShell from './modules/app-shell'
import topics from './modules/topics'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appShell,
    topics
  }
})
