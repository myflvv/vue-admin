import {createRouter, createWebHashHistory} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from "@/layout/Layout"
// import store from '../store'
// import { verify } from '../api/serviceApi'
// import { ElMessageBox } from 'element-plus'
const routes = [
    // {
    //     path: '/login',
    //     name: '登录',
    //     meta: {title: "登录", requireAuth: false},
    //     component: () => import('@/views/Login.vue')
    // },
    {
        path: '/main',
        component: Layout,
        icon: "el-icon-s-home",
        meta: {title: "工作台", requireAuth: true},
        redirect: '/home',
        children: [
            {
                path: "/home",
                name: "工作台",
                icon: "el-icon-s-home",
                meta: {title: "工作台", requireAuth: true},
                component: () => import('@/views/Home.vue')
            }
        ]
    },
    {
        path: "/config",
        name: "配置管理",
        component: Layout,
        icon: "el-icon-s-shop",
        meta: {title: "配置管理", requireAuth: true},
        children: [
            {
                path: "/master",
                name: "主体&产品",
                icon: "el-icon-s-data",
                meta: {title: "主体&产品", requireAuth: true},
                component: () => import("@/views/Master.vue")
            },
            {
                path: "/relation",
                name: "主体关联",
                icon: "el-icon-document-add",
                meta: {title: "主体关联", requireAuth: true},
                component: () => import("@/views/Relation.vue")
            }
        ]
    },
    {
        path: '/401',
        name: '401',
        meta: {title: "401", requireAuth: false},
        component: () => import('@/views/401.vue')
    },
    {
        path: '/404',
        name: '404',
        meta: {title: "404", requireAuth: false},
        component: () => import('@/views/404.vue')
    },
    {
        path: '/500',
        name: '500',
        meta: {title: "500", requireAuth: false},
        component: () => import('@/views/500.vue')
    },
    {
        path: '/index',
        name: 'index',
        meta: {title: "index", requireAuth: true},
        component: () => import('@/views/Main.vue')
    },
]

// createRouter 创建路由实例
const router = createRouter({
    /**
     * hash模式：createWebHashHistory，
     * history模式：createWebHistory
     */
    history: createWebHashHistory(),
    routes
})
// const _import=require('../views/Home.vue')
// var getRouter 
// global.antRouter=''
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 600, showSpinner: false })

// 设置title
router.beforeEach((to) => {
// router.beforeEach((to, from, next) => {
    // console.log(localStorage.getItem('token'))
    // if(to.path=='/index'){
    //     if(to.query.jwt){
    //         store.commit('setToken',to.query.jwt)
    //         next()
    //     }
    // }
//    if(to.meta.requireAuth){
        // verify().then(res=>{
        //     if(res.code==200){
        //     if(to.path=='/index'){
        //         router.push({path:'/home'})
        //     }else{
        //         next()
        //     }
        //     }else{
        //         ElMessageBox.alert(res.msg)
        //     return false;
        //     }
        // }).catch((e) => {
        // ElMessageBox.alert(e)
        //     return false;
        // });
        // localStorage.removeItem('router');
        // if (!getRouter) {
        //     if (!getObjArr('router')) {
        //         listcate().then(res=>{
        //             getRouter = res.data //假装模拟后台请求得到的路由数据
        //             saveObjArr('router', getRouter) //存储路由到localStorage
              
        //             getRouter = filterAsyncRouter(getRouter) //过滤路由
        //             router.addRoutes(getRouter) //动态添加路由
        //             global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
        //             next({ ...to, replace: true })
        //             // console.log(res)
        //             // res.data.forEach((item)=>{
        //             //     item.children.forEach((it)=>{
        //             //         console.log(it.level)
        //             //         it.meta= {title: it.name, requireAuth: true}
        //             //         it.component= _import
        //             //     })
        //             //     // router.options.routes.push(item)
        //             //     router.addRoute(router.options.routes)
        //             // })
        //         })
        //     }else{
        //         getRouter = getObjArr('router') //拿到路由
        //         console.log(getRouter)
        //         // routerGo(to, next,routes)
        //         getRouter = filterAsyncRouter(getRouter) //过滤路由
        //         router.addRoutes(getRouter) //动态添加路由
        //         global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
        //         next({ ...to, replace: true })
        //     }
        // }
        

        // console.log(router.options.routes)
//    }
    
    // 启动进度条
    NProgress.start()

    // 设置头部
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = "默存"
    }
})

// function routerGo(to, next,router) {
//     getRouter = filterAsyncRouter(getRouter) //过滤路由
//     router.addRoutes(getRouter) //动态添加路由
//     global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
//     next({ ...to, replace: true })
//   }
  
//   function saveObjArr(name, data) { //localStorage 存储数组对象的方法
//     localStorage.setItem(name, JSON.stringify(data))
//   }
  
//   function getObjArr(name) { //localStorage 获取数组对象的方法
//     let n=localStorage.getItem(name)
//     // console.log(n)
//     if(n){
//        return JSON.parse(n)
//     }else{
//         return false
//     }
//   }
  
//   function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
//     const accessedRouters = asyncRouterMap.filter(route => {
//       if (route.component) {
//         if (route.component === 'Layout') { //Layout组件特殊处理
//           route.component = Layout
//         } else {
//           route.component = _import(route.component)
//         }
//       }
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children)
//       }
//       return true
//     })
  
//     return accessedRouters
//   }
router.afterEach(() => {
    // 关闭进度条
    NProgress.done()
})


// 抛出路由实例, 在 main.js 中引用
export default router