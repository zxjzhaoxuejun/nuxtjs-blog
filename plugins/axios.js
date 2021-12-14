import { Message } from 'element-ui'
import ApiModules from '~/api'
export default function ({ $axios, redirect, route, store, app: { $cookies } }, inject) {
// 基本配置
  $axios.defaults.timeout = 10000
  // 请求拦截
  $axios.onRequest((config) => {
    console.log('请求拦截')
    // axios拦截器读取vuex
    const token = store.getters.token
    if (token) {
      $axios.setToken(token, 'Bearer')
    }
    return config
  })
  // 响应拦截
  $axios.onResponse((res) => {
    console.log('请求响应')
    if (res.data.code !== 200 && res.code !== 200) {
      if ((res.data.code === 50001 || res.code === 50001) && route.fullPath !== '/login') {
        $cookies.remove('userInfo')
        store.commit('user/SAVE_USER_INFO', {})
        Message.error(res.data.msg || res.msg)
        redirect('/login?path=' + route.fullPath)
      } else {
        Message.error(res.data.msg)
        return res
      }
      // console.log(res)
    } else {
      return res
    }
  })
  // 错误处理

  $axios.onError((error) => {
    console.log(error)
    return error
  })
  $axios.onResponseError((error) => {
    console.log(error)
  })
  inject('api', ApiModules($axios))
}
