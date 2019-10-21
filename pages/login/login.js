// pages/login/bindPhone/index.js

import {
  REQUEST_SEND_CODE,
  REQUEST_BIND_USER
} from '../../api/index'
const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
const app = getApp()

Page({
  data: {
    submitLoading: false,
    phone: ''
  },

  // 提交表单
  formSubmit: function (e) {
    const params = e.detail.value
    // 判断用户名输入
    if (params.phone === '') {
      wx.showToast({
        icon: 'none',
        title: '请输入手机号',
      })
      return
    }
    if (!(/^1[3456789]\d{9}$/.test(params.phone))) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
      })
      return false;
    }
    // 判断密码输入
    if (params.verCode === '') {
      wx.showToast({
        icon: 'none',
        title: '请输入验证码',
      })
      return
    }
    this.setData({
      submitLoading: true
    })

    const data = {
      ...params,
      code: app.globalData.code
    }

    REQUEST_BIND_USER(data).then(res => {
      this.setData({
        submitLoading: false
      })
      console.log(1)
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }).catch(() => {
      this.setData({
        submitLoading: false
      })
    })
  },

  handleGetCode: function () {
    const {
      phone
    } = this.data
    if (phone === '') {
      wx.showToast({
        icon: 'none',
        title: '请输入手机号',
      })
      return
    }
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
      })
      return 
    }
    const data = {
      phone
    }
    REQUEST_SEND_CODE(data).then(res => {
      this.setData({
        submitLoading: false
      })
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }).catch(() => {
      this.setData({
        submitLoading: false
      })
    })

  },

  phoneChange: function (e) {
    this.setData({
      phone: e.detail.value
    })
  }
})