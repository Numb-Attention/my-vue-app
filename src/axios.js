import axios from 'axios'
import { toast } from '~/composables/util'
import store from "./store"
import { 
    getToken
 } from '~/composables/auth'
const service =  axios.create({
    baseURL:'/api'

})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    //往header头自动添加token
    const token = getToken()
    if(token){
        config.headers['token'] = token
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data.data;
  }, function (error) {
    const msg = error.response.data.msg || "请求失败"
    console.log(error.response.data.msg)
    if(msg == "非法token，请先登录！"){
      // 这是后端返回的字符串,注意是中文逗号和叹号
      store.dispatch("logout").finally(()=>location.reload())
    }
    toast(msg,'error')
    //在拦截器中添加通知，放置在各个接口中重复添加
    return Promise.reject(error);
  });
export default service