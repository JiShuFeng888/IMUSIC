import axios from 'axios'
import Vue from 'vue'
axios.defaults.baseURL = 'http://10.117.20.147:3000';
axios.defaults.timeout = 5000;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//封装自己的get,post请求
// 封装自己的get/post方法
export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data
      })
        .then(function (response) {
          resolve(response.data)
        })  
        .catch(function (error) {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  all: function (list) {
    return new Promise(function (resolve, reject) {
      axios.all(list)
        .then(axios.spread(function (...result) {
          // 两个请求现在都执行完成
          resolve(result)
        }))
        .catch(function (err) {
          reject(err)
        })
    })
  }
}
