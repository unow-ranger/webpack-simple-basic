import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  //表示用<app></app>替换index.html里面的<div id="app"></div>
  el: '#app',
  // 将路由器对象引入全局this，即this.$router
  router,
  // 实例使用App组件
  components: { App },
  // 使用app组件作为模版
  template: '<App/>'
})
