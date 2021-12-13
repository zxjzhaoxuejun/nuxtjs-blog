import Vue from 'vue'
// 服务端钩子内部不可以使用，this不会执行vue实列

// 全局过滤器
import * as filters from './filters'
// eslint-disable-next-line import/namespace
Object.keys(filters).forEach(item => Vue.filter(item, filters[item]))
// 全局方法
const show = () => console.log('全局方法')
Vue.prototype.$show = show

// 全局指令

// 混入methods
Vue.mixin({
  methods: {
    $seo (title, content, payload = []) {
      return {
        title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content
          }
        ].concat(payload)
      }
    }
  }
})
