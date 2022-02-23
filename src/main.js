import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MyPlugin from './assets/js/plugin.js'
import mycomponent from './components'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MyPlugin)
Vue.use(mycomponent)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
