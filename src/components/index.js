import zhNav from './zhNav/zhNav.vue'
import zhTransition from './zhTransition/zhTransition.vue'
export default {
  install: function (vue) {
    vue.component('zhNav', zhNav)
    vue.component('zhTransition', zhTransition)
  }
}
