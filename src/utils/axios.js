import axios from 'axios'
import { ElMessageBox } from 'element-plus'
// import router from '../router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Authorization'] = localStorage.getItem('token') || ''
// axios.defaults.headers['apikey'] = 'ZlEqSzeQo1xEo0W3Rqh7t3x8d77UwR3O'
axios.defaults.headers['apikey']='592255fd1ca345118376d7bef6e19202'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 600, showSpinner: false })

axios.interceptors.request.use(function (config) {
    // 启动进度条
    NProgress.start()
    return config
})

axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        ElMessageBox.alert("服务器异常，请稍后再试！")
        return Promise.reject(res)
    }
   
    // if (res.status != 200 || res.data.code!=200) {
    //     if (res.data.msg) ElMessageBox.alert(res.data.msg)
    //     // if (res.data.code == 301) {
    //     //     ElMessageBox.alert(res.data.msg)
    //         // router.push({path: '/login'})
    //     // }
    //     return Promise.reject(res.data)
    // }

    // 关闭进度条
    NProgress.done()

    return res.data
})

export default axios