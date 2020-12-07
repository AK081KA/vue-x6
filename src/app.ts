import Vue from 'vue'
import App from './App.vue'
import AntdUI from 'ant-design-vue'

Vue.config.productionTip = false
Vue.use(AntdUI)
new Vue({
  render: (h) => h(App),
}).$mount('#app')
