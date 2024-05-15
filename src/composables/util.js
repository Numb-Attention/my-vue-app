//封装消息提示函数
import { ElNotification,ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'


//消息成功提示
export function toast(message,type = "success",dangerouslyUseHTMLString = true){
    ElNotification({
        message,
        type,
        duration:2000,
        dangerouslyUseHTMLString,
    })
}

export function showModal(content = "提示内容", type ="warning",title = ""){
    return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type,
        }
      )
}
//显示全屏loading
export function showFullLoading(){
  nprogress.start()
}

//隐藏全屏loading
export function hideFullLoading(){
  nprogress.done()
}
//弹出输入框
export function showPrompt(tip,value=""){
  return  ElMessageBox.prompt(tip,'', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue:value,
  })
}

//将query对象转成url参数
export function queryParams(query){
  let q = []
    for (const key in query) {
        if(query[key]){
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r = q.join("&")
    r = r ? ("?"+r) : ""
    //拼接为 limit=10&keyword=ceshi
    return r
}