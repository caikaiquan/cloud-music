import axios from 'axios'
import { baseUrl } from '@/util/env.js'
import { toCookieToken } from '@/util/common.js'
import { Toast, Dialog } from 'vant';

// 创建axios实例
const request = axios.create({
  baseURL: baseUrl,
  timeout: 30000
})

/** 
 * 添加加载中动画
 * **/
let loadingInstance = null

let second = 0
// request拦截器
request.interceptors.request.use(
  config => {
    second++
    Toast.loading({
      duration: 0,
      message: '请求中...',
      forbidClick: true,
    });
    // 设置cookie
    // config.headers.token = '__remember_me=true; NMTID=00OX3QNjonm-g2DzUb9kErX3z0C_IoAAAF4ORuLPQ; __csrf=7d8f7325913a3f261d21dd05b48f4814; MUSIC_U=5a3b41428457c72354360379d44b74907ef05d0f1fe3d84fbda5391fd9f4ec8d5cb0fcee37c101bd'
    let userInfo = sessionStorage.getItem('userInfo')
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      config.headers.token = userInfo.token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
request.interceptors.response.use(
  response => {
    second--
    if (!second || second <= 0) {
      Toast.clear();
    }
    const res = response.data;
    // 更新token
    if(response.headers.token){
      let userInfo = sessionStorage.getItem('userInfo')
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
          userInfo.token = response.headers.token
        }
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
    if(res.code === '9999'){
      Dialog.alert({
        message: res.msg || '接口异常',
        theme: 'round-button',
      })
      return Promise.reject()
    } else if(res.code === '5555'){
      Dialog.alert({
        message: res.msg || '接口异常',
        theme: 'round-button',
      })
      .then(
        () => {
          location.hash = "#/login"
        }
      )
      return Promise.reject()
    }

    if (response.config.url === "/user/login") {
      if (res.code === '0000') {
        let userInfo = sessionStorage.getItem('userInfo')
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
          userInfo.token = res.token
        } else {
          const { islogin, logindate, token, username, id, base64 } = res
          userInfo = { islogin, logindate, token, username , id, base64  }
        }
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      } else {
        sessionStorage.removeItem('userInfo')
      }
    } else if (response.config.url === "/user/sign") {
      if(res.code === '0000'){
        const { islogin, username, token } = res
        const userInfo = { islogin, username, token }
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      }
    }
    return res
  },
  err => {
    if (loadingInstance) {
      loadingInstance.close()
    }
    console.log(err)
  }
)



export default request


