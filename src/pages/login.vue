<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="16" class="left ">
            <div>
                <div>欢迎光临</div>
                <div class="">这是我的vue3项目</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="8" class="right ">
            <h2 class="title">欢迎回来</h2>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username" >
                    <el-input v-model="form.username"  placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" >
                    <el-input type="password" show-password v-model="form.password"  placeholder="请输入密码">
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>    
                <el-form-item>
                    <el-button round color="rgb(24, 24, 230)" type="primary" @click="onSubmit" class="w-[250px]" :loading="loading" >登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!-- 基础24分栏 左边16 右边18 min-height:100vh保持占满整个屏幕
            font-bold即字体加粗 my=>margin Y 及上下外边距 loading为true则按钮在加载状态

        -->
    </el-row>
</template>


<script  setup>
import { ref,reactive,onMounted,onBeforeUnmount } from 'vue'
import {  getinfo} from '~/api/manager'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { toast } from '~/composables/util'
import { 
    setToken
 } from '~/composables/auth'

const router = useRouter()//拿到路由实例
const store = useStore()//拿到store实例
const form = reactive({
    username:'',
    password:''
})
const rules = {
    username:[{
        required:true,//必填用户名
        message:'用户名不为空',
        trigger:'blur'      
    },],
    password:[{
        required:true,//必填密码
        message:'密码不为空',
        trigger:'blur'      
    },]
}
//建立登陆规则
const formRef = ref(null)
const loading = ref(false)
const onSubmit = () => {
    formRef.value.validate((valid)=>{
        if(!valid){
            return false
        }
        loading.value = true
        store.dispatch("login",form).then(res=>{
            toast("登陆成功")
            router.push("/")
        }).finally(()=>{
            loading.value = false
        })
    })
}
//监听回车事件
function onKeyUp(e){
    //如果为回车键则等价为登录
    if(e.key == "Enter") onSubmit()
}

//添加键盘监听
onMounted(()=>{
    document.addEventListener("keyup",onKeyUp)
})
//移除键盘监听
onBeforeUnmount(()=>{
    document.removeEventListener("keyup",onKeyUp)
})
</script>
<style scoped>
    .login-container{
        @apply min-h-screen;
    }

    .login-container .left,.login-container .right{
        @apply bg-indigo-500 flex items-center justify-center;
    }
    /* 左右相同的部分 */
    .login-container .right{
        @apply bg-indigo-50   flex-col;
    }
    .left>div>div:first-child{
        @apply font-bold text-5xl text-light-300 mb-4;
    } 
    /* 第一个孩子 */
    .left>div>div:nth-child(2){
        @apply text-gray-200 text-sm;
    }
    /* 第二个孩子 */
    .right .title{
        @apply font-bold text-3xl text-gray-800;
    }
    .right>div{
        @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
    }
    .right .line{
        @apply h-[1px] w-16 bg-gray-200;
    }
</style>