import axios from 'axios'
import qs from 'qs';
import {getLimited, setLimited, getLimitedUrl, setLimitedUrl, getToken} from './auth';
import {Loading, Message} from 'element-ui'
/*import store from '../store'*/


var loadinginstace;
let baseURL = 'https://rtest.rwlai.com/rwlmall';
let URL = window.location.origin;
let URL1 = '';
if (window.location.pathname == '/') {
  URL1 = '/';
} else {
  URL1 = window.location.pathname;
}


let config = {
  loginUrl: `${URL}${URL1}#/login`, /*登陆地址*/
  loginApi: `${baseURL}/login`, /*登陆API*/
  logoutApi: `${baseURL}/logout`, /*退出API*/
  indexUrl: `${URL}${URL1}/#/home` /*首页*/
};

const service = axios.create({
  baseURL, // api的base_url
  timeout: 15000,                  // 请求超时时间*/
  withCredentials: true
});

// request拦截器

service.interceptors.request.use(config => {
  //console.log(config);

  if (config.headers['Content-Type'] === "application/x-www-form-urlencoded") {
    config.data = qs.stringify(config.data);

  }

  if (getToken()) {
    config.headers['x-auth-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }

  loadinginstace = Loading.service({fullscreen: true})

  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
  response => {
    loadinginstace.close();
    let request = response.request;
    // console.log(request.responseURL);
    // console.log(config.loginApi)
    if (request.responseURL === config.loginApi && request.status === 200) {
      /!*登陆成功*!/
      if (getLimited() === 'true') {
        setLimited('false');
        location.href = getLimitedUrl();
      }
      /*     else {
             setTimeout(() => {
               location.href = config.indexUrl;
             }, 100);
           }*/
    }
    else if (request.responseURL === config.logoutApi && request.status === 200) {
      /!*注销*!/
      location.href = config.loginUrl;

    }
    return response;
  },
  error => {
    let errcode = String(error);
    if (errcode.indexOf('401') > 0) {
      if (location.href === config.loginUrl) {    /*登陆页面401错误，提示用户名或者密码错误*/
        loadinginstace.close();
        Message.error({
          message: '账号或密码错误或超时'
        });
      }
      else {     /*访问受限资源，跳转至登陆页面*/
        Message.error({
          message: '超时'
        });
        loadinginstace.close();
        localStorage.clear();
        location.href = config.loginUrl;
        //setLimited('true');
        // setLimitedUrl(location.href);
      }
    }
    else if (errcode.indexOf('403') > 0) {      /*403权限不足，提示用户*/
      loadinginstace.close();
      Message.error({
        message: '对不起,权限不足'
      })
    } else {
      loadinginstace.close();
      Message.error({
        message: '加载失败'
      })
    }
    return Promise.reject(error)
  }
);
export default service
