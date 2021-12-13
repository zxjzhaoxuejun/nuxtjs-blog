import Vue from 'vue'
import Wangeditor from 'wangeditor'

Vue.prototype.$wangeditor = (content) => {
  return new Wangeditor(content)
}
