import {
  REQUEST_OPERATION_RECORD_LIST
} from '../../api/index'
const app = getApp()

Page({
  data: {
    recordList: [],
    detailInfo: {}
  },
  onLoad: function (options) {
    const {id} = options
    const data = {
      vehicleId: id,
      pageNum: 1,
      pageSize: 100
    }
    this.setData({
      detailInfo: app.globalData.detailInfo
    })
    REQUEST_OPERATION_RECORD_LIST(data).then(res => {
      this.setData({
        recordList: res.data.list
      })
    })
  }
})
