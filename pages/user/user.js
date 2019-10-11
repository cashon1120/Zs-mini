// miniprogram/pages/user/user.js
import { PHONE_NUMBER } from '../../config/config'

Page({
  data: {
  },

  calling:function(){
    wx.makePhoneCall({
      phoneNumber: PHONE_NUMBER
    })
  }

})