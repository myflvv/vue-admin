import axios from '../utils/axios'

// ==================登录=====start==============================
/**
 * 登录
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function login(params) {
    return axios.post('/login', params);
}

// ==================登录=====end==============================

// =====================首页======start=========================
/**
 * 待办事项
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function outstandingIssues(params) {
    return axios.post('/admin/home/outstandingIssues', params);
}

/**
 * 收入分析
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function revenueAnalysis(params) {
    return axios.post('/admin/home/revenueAnalysis', params);
}

/**
 * 总览
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function overview(params) {
    return axios.post('/admin/home/overview', params);
}

// =====================首页======end=========================

export function verify(){
    return axios.post('/kong/admin/verify');
}

export function listcate(){
    return axios.post('/admin/bg_admin/menu/listcate','ident=pay');
}


export function saveCollection(params){
    if(params.id==0){
        return axios.post('/api/v1/collection/create',params);
    }else{
        return axios.post('/api/v1/collection/edit/'+params.id,params);
    }
   
}

export function  listCollection(){
    return axios.get('/api/v1/collection/list');
}