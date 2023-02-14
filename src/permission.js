import {router,addRoutes} from '~/router'
import { getToken } from '~/composables/auth'
import { toast,showFullLoading,hideFullLoading } from '~/composables/util'
import store from './store'


//全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to,from,next)=>{
    //显示loading
    showFullLoading()

    //to表实即将到达的页面 from 表示从哪个页面来

    const token = getToken()
    if(!token && to.path!="/login" ){
        //进行提示
        toast("请先登录","error")
        //如果没有登陆且下一个页面不是登陆页面
        //进行强制跳转
        return next({ path:"/login"})
    }


    //防止重复登陆
    if(token && to.path =="/login"){
        toast("请勿重复登录","error")
        return next({path:from.path ? from.path :'/'})
        //返回原来页面
    }

    //如果用户登陆了,则自动获取用户信息，并存储在vuex当中
    let hasNewRoutes = false
    if(token && !hasGetInfo){
        let { menus } = await store.dispatch("getinfo")
        hasGetInfo = true
        // console.log()
        //动态添加路由
        hasNewRoutes = addRoutes(menus)
    }
    //设置页面动态标题
    let title = ( to.meta.title ? to.meta.title : "") + "-"
    document.title = title
    hasNewRoutes ? next(to.fullPath) : next()
})


//全局后置守卫
router.afterEach((to, from) => hideFullLoading())

