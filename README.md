# nuxt_01

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

### `路由守卫`
#### 前置
    依赖中间件middleware,插件
    全局守卫：nuxt.config指向middleware,
            layouts定义中间件
    组件独享守卫：middleware
    插件全局后置守卫

#### 后置
    使用vue的beforeRouteLeave购自
    插件全局后置

### `自定义loading`
    loading:{//设置默认loading条
        color:'#399',
        height:'3px'
    }
    loading:'~/components/loading.vue'//自定义loading组件

### `vuex`
    1.模块方式：store目录下的每个'.js'文件会被转换成状态树（当然，'index'是根模块）
    2.Classic（不建议使用）：store/index.js返回创建vuex.store实例的方法
    不管那种方式，state必须是一个函数

### `状态持久化&&token校验`
    安装：cookie-universal-nuxt包管理cookie
    思想：登录时，同步vuex && cookie ,强制刷新后，nuxtServerInit钩子取出cookie,同步vuex,axios拦截器读取vuex


    this.$nuxt.refresh()可以帮助你re-fetch任何fetch()或asyncData()钩子