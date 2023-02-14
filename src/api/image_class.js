import axios from '~/axios'

export  function getImageClassList(page){
    return axios.get("/admin/image_class/" + page)
} 
//拿到图库列表
export  function createImageClass(data){
    return axios.post("/admin/image_class",data)
} 
export  function updateImageClass(id,data){
    return axios.post("/admin/image_class/"+ id,data)
} 
export  function deleteImageClass(id){
    return axios.post(`admin/image_class/${id}/delete`)
} 