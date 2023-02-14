import { ref ,reactive } from 'vue'
import { logout,updatapassword } from "~/api/manager"
import {  showModal,toast } from '~/composables/util'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
//修改密码
export   function useRepassword(){
    const router = useRouter()
    const store = useStore()
    const formDrawerRef = ref(null)
    const form = reactive({
    oldpassword:'',
    password:'',
    repassword:'',
})
const rules = {
    oldpassword:[
        {
            required:true,
            message:'旧密码不能为空',
            trigger:'blur'      
        },
    ],
    password:[
        {
            required:true,
            message:'新密码不为空',
            trigger:'blur'      
        },
    ],
    repassword:[
        {
            required:true,
            message:'确认密码不为空',
            trigger:'blur'      
        },
    ],
}
//建立登陆规则
const formRef = ref(null)
const onSubmit = () => {
    formRef.value.validate((valid)=>{
        if(!valid){
            return false
        }
        formDrawerRef.value.showLoading()
        updatapassword(form).then(res=>{
            toast("修改密码成功,请重新登录")
            store.dispatch("logout")
            //跳转回登录页
            router.push("/login")
        }).finally(()=>{
        formDrawerRef.value.hideLoading()
        })
    })
}
const openRePasswordForm =()=> formDrawerRef.value.open()
//将open方法作为回调
    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordForm,
    }
}
  //退出登录逻辑
export  function useLogout(){
    const router = useRouter()
    const store = useStore()
    function handleLogout() {
        showModal("是否要退出登录？").then(res => {
            logout()
                .finally(() => {
                    store.dispatch("logout")
                    //跳转回登录页
                    router.push("/login")
                    //提示登陆成功
                    toast("退出登陆成功")
                })
        })
    }
    return{
        handleLogout,
    }
}