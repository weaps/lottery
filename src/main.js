import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css';
import GS from 'gemini-scrollbar'
import './assets/index.scss'
Vue.prototype.$geminiScrollbar = GS
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
