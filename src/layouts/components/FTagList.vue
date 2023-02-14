<template>
    <div class="f-tag-list" :style="{ left:$store.state.asideWidth}">
        <el-tabs v-model="activeTab" type="card" class="flex-1"  
         @tab-change="changeTab" @tab-remove="removeTab" style="min-width:100px;">
            <el-tab-pane :closable="item.path !='/'" v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path">
            </el-tab-pane>
        </el-tabs>
        <span class="tag-btn">
            <el-dropdown>
            <span class="el-dropdown-link">
                <el-icon >
                    <arrow-down />
                </el-icon>
            </span >
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        </span>
    </div>
    <div style="height:44px">
    </div>
</template>

<script  setup>
    import { ref } from 'vue'
    import { useRoute,useRouter,onBeforeRouteUpdate } from 'vue-router';
    import { useCookies } from '@vueuse/integrations/useCookies'
    const cookie = useCookies()
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref(route.path)

    const tabList = ref([
        {
            title: '后台首页',
            path:"/"
        },
    ])

    //切换tab跳转到对应界面
    const changeTab = (t)=>{
        activeTab.value = t
        router.push(t)
    }

    // const removeTab = (targetName) => {
        
    // }
    //添加标签导航的方法
    function addTab (tab){
        let noTab = tabList.value.findIndex(t=>t.path == tab.path) == -1
        if(noTab){
            tabList.value.push(tab)
        }
        cookie.set("tabList",tabList.value)
    }
    //删除标签导航栏
    const removeTab =(t)=>{
        let tabs = tabList.value
        let a = activeTab.value
        if(a == t){
            tabs.forEach((tab,index)=>{
                if(tab.path == t){
                    const nexTab = tabs[index+1] || tabs[index-1]
                    // 删除完若果没有下一个就上下一个
                    if(nexTab){
                        a = nexTab.path
                    }
                }
            })
        }
        activeTab.value = a
        tabList.value = tabList.value.filter(tab=>tab.path !=t)
        //tangList中只要不是当前删除的tab就保存下来
        cookie.set("tabList",tabList.value)
    }
    //初始化标签导航栏
    function initTabList(){
        let tabs = cookie.get("tabList")
        if(tabs){
            tabList.value = tabs
        }
    }
    initTabList()
    onBeforeRouteUpdate((to,from)=>{
        activeTab.value = to.path
        addTab({
            title:to.meta.title,
            path:to.path
        })
    })
</script>

<style>
    .f-tag-list{
        @apply fixed bg-gray-100 flex items-center px-2; 
        top:64px;
        right:0;
        height:44px;
        z-index:100;
    }
    .tag-btn{
        @apply bg-white rounded ml-auto flex items-center justify-center px-2;
        height: 32px;
    }
    .el-tabs__header{
        border: 0!important;
        @apply mb-0;
    }
    .el-tabs__nav{
        border:0!important
    }
    .el-tabs__item{
        border:0!important;
        height: 32px;
        line-height: 32px;
        @apply bg-white mx-1 rounded;
    }
    .el-tabs__nav-next, .el-tabs__nav-prev{
        line-height: 40px;
        height: 30px;
    }
    .is-disabled{
        cursor: not-allowed;
        @apply text-gray-300
    }
</style>