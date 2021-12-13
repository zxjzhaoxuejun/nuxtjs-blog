<template>
  <div class="error-mode">
    <h2 v-if="error.statusCode" class="error-msg">
      {{ error.message }}
    </h2>
    <h2 v-else class="error-msg">
      应用发送异常
    </h2>
    <button @click="$router.replace('/index')">
      跳转到首页
    </button>
  </div>
</template>

<script>
// 接收错误信息 error:{statusCode,message}
export default {
  name: 'ErrorPage',
  props: ['error'],
  data () { return {} }
}
</script>

<style scoped lang="scss">
.error-mode{
    text-align: center;
    padding: 20px 0;

    .error-msg{
      padding: 15px 0;
    }
}
</style>
