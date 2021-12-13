<template>
  <div id="app">
    <el-container>
      <el-header>
        <h2 class="head-title">
          天空之城
        </h2>
        <!-- 路由 -->
        <el-menu :default-active="activeIndex" class="nav-list" mode="horizontal" @select="handleSelect">
          <el-menu-item v-for="(item,index) in navList" :key="index" :index="index+''">
            {{ item.name }}
          </el-menu-item>
        </el-menu>
        <div class="member-mode">
          <div v-if="!token" class="login-mode">
            <el-button type="primary" @click="login">
              登录
            </el-button>
            <el-button @click="reg">
              注册
            </el-button>
          </div>
          <div v-else class="user-info">
            <el-dropdown @command="handlePassword">
              <span class="el-dropdown-link" style="cursor: pointer;">
                {{ userInfo.userEmail }} <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="user">
                  用户中心
                </el-dropdown-item>
                <el-dropdown-item command="password">
                  修改密码
                </el-dropdown-item>
                <el-dropdown-item command="loginOut">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container class="page-main">
        <el-aside>
          <SideBar />
        </el-aside>
        <el-container>
          <el-main>
            <!-- 展示区  ~~router-view -->
            <nuxt />
          </el-main>
        </el-container>
      </el-container>
      <el-footer class="footer-mode">
        <div class="footer-text">
          Copyright © 2021 天空之城（冷血无情）
        </div>
        <div class="footer-text">
          Powered by .NET 6 on Kubernetes
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SideBar from '../components/SideBar'
export default {
  components: {
    SideBar
  },
  middleware () {
    console.log('middleware layouts 全局守卫前置业务')
  },
  data () {
    return {
      activeIndex: '0',
      navList: [
        { path: '/index', name: 'Home' },
        { path: '/about', name: 'Contact' },
        { path: '/js-html', name: 'JavaScript' },
        { path: '/html-5', name: 'HTML5' },
        { path: '/css3-html', name: 'CSS3' },
        { path: '/front-end', name: 'Front-end Development' }
      ]
    }
  },
  computed: {
    ...mapGetters(['token', 'userInfo'])
  },
  watch: {
    $route: {
      immediate: true,
      handler (route) {
        let flag = false
        this.navList.map((item, index) => {
          if (item.path === '/') { this.$router.push({ name: 'home' }) }
          if (route.path === item.path) {
            this.activeIndex = index + ''
            flag = true
          }
          return item
        })
        if (!flag) {
          this.activeIndex = '-1'
        }
      }
    }
  },
  methods: {
    handleSelect (key) {
      this.$router.push(this.navList[key].path)
    },
    login () {
      this.$router.push({ name: 'login' })
    },
    reg () {
      this.$router.push({ name: 'reg' })
    },
    handlePassword (command) {
      console.log(command)
      if (command === 'password') {
        this.$router.push({ name: 'password' })
      } else if (command === 'loginOut') {
        this.$cookies.remove('userInfo')
        this.$store.commit('user/SAVE_USER_INFO', { token: '' })
      }
    }
  }
}
</script>

<style lang="scss">
*{
    margin: 0;
    padding: 0;
}
body{
    background: $bg;
    font-size: 14px;
}
.footer-mode{
    text-align: center;
    .footer-text{
        padding: 6px 0;
    }
}
.el-dropdown-menu{
    top: 40px !important;
}
.el-header{
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    color: $text-color;
    line-height: 60px;
    z-index: 1000;
    background: $bg;

    .head-title{
        width: 20%;
        color: $green;
        font-size: 30px;
        text-align: center;
    }
    .nav-list{
        flex: 1;
        background: transparent;

        .el-menu-item{
            &:hover{
                background:rgba(221, 241, 184, 0.41);
                color: $green;
            }
            &:focus{
                 background: transparent;
                 color: $green;
            }
        }

        .is-active{
            color: $green;
            border-color: $green;
            font-weight: bold;
        }
    }

    .member-mode{
        width: 15%;
        text-align: center;
    }
  }
.page-main{
    margin-top: 60px;

    .el-aside {
    width: 380px !important;
    color: $text-color;
  }

  .el-main {
    min-height: 878px;
    color: $text-color;
    padding: 15px;

    .app-container{
        padding: 0 20px;
    }
  }
}
</style>
