/* 
  封装 wx.request 
  url: 请求地址
  method: 请求方法
  data: 请求参数
  title: 加载文字信息
*/
import { API_BASE_URL } from '../config/config'

const app = getApp()

const request = function (params) {
  let  { url, method, data, title } = params
  title ? null : title = '加载中...'
  wx.showLoading({
    title,
  })


  return new Promise((resolve, reject) => {
    const requestTask = wx.request({
      url: `${API_BASE_URL}${url}`,
      header: app.globalData.header, // 设置请求头, 相关数据在登录时获取
      method,
      data,
      success: function (res) {
        wx.hideLoading()
        if (res.data.code !== 1) {   // 请求成功, 但返回错误信息
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
          })
          reject(res.data)
        } else {                     // 请求成功, 返回正确响应内容
          resolve(res.data)
        }
      },
      fail: function () {            // 请求失败
        wx.hideLoading()
        wx.showToast({
          title: '请求失败啦!',
          icon: 'none'
        })
      }
    })

    requestTask.onHeadersReceived((res) => {
      if (res.header && res.header['token']) {
        app.globalData.header = { 'ec-token': 'ec-kn;' + res.header['token']}
      }
    })
  })
}


export default request
