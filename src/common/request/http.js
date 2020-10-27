// 在http.js中引入axios
import axios from 'axios'; // 引入axios
import { Loading, Message } from 'element-ui';
import QS from 'qs';

import config from '@/common/config'
import utils from '@/common/utils'
import store from '@/store/index'

axios.defaults.baseURL = config.apiUrl;

// 请求超时时间
axios.defaults.timeout = 30000;

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


class Request {

    // 主要请求部分
    request(options = {}) {
        options.url = options.url || '';
        options.params = options.params || {};
        options.headers = utils.deepMerge(this.config.headers, options.headers)
        options.method = options.method || 'GET';

        let showLoading = typeof options.showLoading == 'boolean' ? options.showLoading : this.config.showLoading;
        let loadingMask = typeof options.loadingMask == 'boolean' ? options.loadingMask : this.config.loadingMask;
        let loadingText = options.loadingText || this.config.loadingText;

        if (showLoading && !this.timer) {
            this.timer = setTimeout(() => {
                this.loadingInstance = Loading.service({
                    title: loadingText,
                    lock: loadingMask
                })
                this.timer = null;
            }, this.config.loadingTime);
        }

        return axios(options)
    }

    constructor() {
        this.loadingInstance = null;
        this.timer = null; // 定时器
        this.config = {
            // 默认的请求头
            headers: {
                // 'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
            },
            showLoading: true, // 是否显示请求中的loading
            loadingText: '请求中...',
            loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
            loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
            showErrorToast: true
        }

        // 请求拦截器
        axios.interceptors.request.use(
            config => {
                // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
                // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
                const token = store.state.token;
                token && (config.headers.Authorization = token);
                return config;
            },
            error => {
                return Promise.error(error);
            }
        )

        // 响应拦截器
        axios.interceptors.response.use(
            response => {
                // console.log(response)
                this.loadingInstance && this.loadingInstance.close();
                clearTimeout(this.timer);
                this.timer = null;

                if (response.status == 200) {
                    if (response.data.code !== 'A00006') {
                        if (this.config.showErrorToast) {
                            Message.error(response.data.errmsg);
                        }
                    }
                    return Promise.resolve(response.data);
                } else {
                    return Promise.reject(response);
                }

            },
            // 服务器状态码不是200的情况    
            error => {
                this.loadingInstance && this.loadingInstance.close();
                clearTimeout(this.timer);
                this.timer = null;

                /* if (error.response.status) {
                    switch (error.response.status) {
                        // 401: 未登录                
                        // 未登录则跳转登录页面，并携带当前页面的路径                
                        // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                        case 401:

                            break;
                        // 403 token过期                
                        // 登录过期对用户进行提示                
                        // 清除本地token和清空vuex中token对象                
                        // 跳转登录页面                
                        case 403:
                            Message({
                                message: '登录过期，请重新登录',
                                duration: 1000,
                            });
                            // 清除token                    
                            localStorage.removeItem('token');

                            break;
                        // 404请求不存在                
                        case 404:
                            Message({
                                message: '网络请求不存在',
                                duration: 1500,
                            });
                            break;
                        // 其他错误，直接抛出错误提示                
                        default:
                            Message({
                                message: error.response.data.message,
                                duration: 1500,
                            });
                    }
                    return Promise.reject(error.response);
                } */
            }
        )
        // get请求
        this.get = (url, params = {}, config = {}) => {
            return this.request({
                method: 'GET',
                url,
                params,
                ...config
            })
        }

        // post请求
        this.post = (url, data = {}, config = {}) => {
            return this.request({
                url,
                method: 'POST',
                data: QS.stringify(data),
                ...config
            })
        }
        // post请求
        this.put = (url, data = {}, config = {}) => {
            return this.request({
                url,
                method: 'PUT',
                data,
                ...config
            })
        }
    }
}
export default new Request
