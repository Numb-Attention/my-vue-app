import  axios  from "~/axios";
// 引入自己创建的axios的实例

export function login(username,password){
    return axios.post("/admin/login",{
        username,
        password,
    })
}
//登录接口
export function getinfo(){
    return axios.post("/admin/getinfo")
}
//退出登录
export function logout(){
    return axios.post("/admin/logout")
}
//修改密码
export function updatapassword(data){
    return axios.post("/admin/updatepassword",data)
}

export function getManagerList(page,query = {}){
    let q = []
    for (const key in query) {
        if(query[key]){
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r = q.join("&")
    r = r ? ("?"+r) : ""
    //拼接为 limit=10&keyword=ceshi
    return axios.get(`admin/manager/${page}${r}`)
}


export function updateManagerStatus(id,status){
    return axios.post(`/admin/manager/${id}/update_status`,{status})
}


export function createManager(data){
    return axios.post(`/admin/manager`,data)
}

export function updateManager(id,data){
    return axios.post(`/admin/manager/${id}`,{data})
}

export function deleteManager(id){
    return axios.post(`/admin/manager/${id}/delete`)
}