<template>
    <div class="f-menu" :style="{width:$store.state.asideWidth}">
        <el-menu
        :default-active="defaultActive"
        class="border-0"
        @select="handleSelect"
        :collapse="isCollapse"
        :collapse-transition="false"
        
        unique-opened
      >
        <template v-for="(item,index) in asideMenus" :key="index" >
            <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                <template #title>
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>  
                    <el-menu-item  v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>   
            </el-sub-menu> 
             <!--  一级菜单 -->
            <el-menu-item v-else  :index="item.frontpath">
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
            </el-menu-item>
        </template>
      </el-menu>
    </div>
</template>
<script setup>
    import { computed,ref } from "vue";
    import { useRouter ,useRoute,onBeforeRouteUpdate} from "vue-router"
    import { useStore } from "vuex";
        //菜单刷新默认选中当前路径
        const route = useRoute()
        const defaultActive = ref(route.path)
        //监听路由变化
        onBeforeRouteUpdate((to,from)=>{
            defaultActive.value = to.path
        })
        //  是否折叠
        const store = useStore()
        const  isCollapse = computed(()=>!(store.state.asideWidth == '250px'))

        const router = useRouter()
        const asideMenus = computed (()=>store.state.menus)//拿到仓库中的对应用户菜单列表
        const handleSelect =(e)=>{
            // console.log(e)
            router.push(e)
        }


</script>
<style>
    .f-menu{
        transition: all 0.2s;
        top:64px;
        bottom: 0px;
        left: 0px;
        overflow-y: auto;
        overflow-x: hidden;
        @apply shadow-md fixed bg-light-50;
    }
    /* 隐藏滚动条 */
    .f-menu::-webkit-scrollbar{
        width: 0px;
    }
</style>