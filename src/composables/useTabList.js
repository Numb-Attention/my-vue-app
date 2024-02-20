import { ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies'

export function useTabList(){
    const cookie = useCookies()
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref(route.path)
    //获取当前的路由
    const tabList = ref([
        {
            title: '后台首页',
            path: "/"
        },
    ])

    //切换tab跳转到对应界面
    const changeTab = (t) => {
        activeTab.value = t//当前激活标签页为t
        router.push(t)//点击跳转
    }
    const handleClose = (e) => {
        if (e == 'clearAll') {
            activeTab.value = '/'
            tabList.value = [{
                title: '后台首页',
                path: "/"
            }]
        }
        else if (e == 'clearOther') {
            tabList.value = tabList.value.filter((tab) => {
                return tab.path == '/' || tab.path == activeTab.value
            })
            console.log(tabList.value)
        }
        cookie.set('tabList', tabList.value)
    }
    // const removeTab = (targetName) => {

    // }
    //添加标签导航的方法
    function addTab(tab) {
        let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
        //等于-1就是没有找到
        if (noTab) {
            tabList.value.push(tab)
        }
        cookie.set("tabList", tabList.value)
    }
    //删除标签导航栏
    const removeTab = (t) => {
        let tabs = tabList.value
        let a = activeTab.value
        //关闭的标签导航是否是当前打开的
        if (a == t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    const nexTab = tabs[index + 1] || tabs[index - 1]
                    // 删除完若果没有下一个就上下一个
                    if (nexTab) {
                        a = nexTab.path
                    }
                }
            })
        }
        activeTab.value = a
        tabList.value = tabList.value.filter(tab => tab.path != t)
        //tangList中只要不是当前删除的tab就保存下来
        cookie.set("tabList", tabList.value)
    }
    //初始化标签导航栏
    function initTabList() {
        let tabs = cookie.get("tabList")
        if (tabs) {
            tabList.value = tabs
        }
    }
    initTabList()
    onBeforeRouteUpdate((to, from) => {
        //找到前往的路由和title
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })
    return{
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose,
    }
}