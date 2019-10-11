//index.js
import {
  REQUEST_WECHAT_LOGIN
} from '../../api/index'
const app = getApp()
Page({
  data: {
    loading: false
  },

  // 登录获取相关凭证
  getAuthKey: function () {
    const self = this
    this.setData({
      loading: true
    })
    return new Promise(function (resolve) {
      // step 1: 登录微信拿到 code
      wx.login({
        success: res => {
          app.globalData.code = res.code
          // step 2: 获取用户信息, 后端接口需要拿到 encryptedData和iv
          wx.getUserInfo({
            success: function (userInfo) {
              const strUserInfo = JSON.stringify({
                encryptedData: userInfo.encryptedData,
                iv: userInfo.iv
              })
              const data = {
                code: res.code,
                strUserInfo
              }
              // step 3: 请求后端接口获取账户信息
              REQUEST_WECHAT_LOGIN(data).then(res => {
                self.setData({
                  loading: false
                })
                app.globalData.userInfo = res.data.weChatInfo
                if(res.data !== 1){
                  resolve(res.data)
                }else{
                  // 未绑定账户跳转至绑定界面
                  wx.navigateTo({
                    url: '/pages/login/login',
                  })
                }
              }).catch(res => {
                wx.showToast({
                  icon: 'none',
                  title: res.msg,
                })
                self.setData({
                  loading: false
                })
              })
            }
          })
        }
      })
    })
  },

  onLoad: function () {
    const self = this
    // 判断是否已经授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          self.getAuthKey().then(() => {
            wx.switchTab({
              url: '/pages/index/index',
            })
          })
        }
      }
    })
  },

  // 手动授权
  bindGetUserInfo: function (e) {
    const self = this
    if (e.detail.userInfo) {
      self.getAuthKey().then(() => {
        wx.switchTab({
          url: '/pages/index/index',
        })
      })
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权'
      })
    }
  }
})