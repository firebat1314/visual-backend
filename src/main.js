import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import http from '@/common/request/http'
import api from '@/common/request/api'
import utils from '@/common/utils'

import '@/common/style/element-variables.scss'
import ElementUI from 'element-ui'
Vue.use(ElementUI);

// 混入全局方法
import mixin from '@/common/mixin';
Vue.mixin(mixin)

Vue.prototype.$http = http;
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.EventBus = app;