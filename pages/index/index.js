import {
  REQUEST_FETCH_CAR,
  REQUEST_POWER_SWITCH
} from '../../api/index'
const app = getApp()

Page({
  data: {
    loading: false,
    carList: []
  },
  onLoad: function () {
    this.getCarList()
  },

  getCarList: function(){
    const data = {
      pageNum: 1,
      pageSize: 100
    }
    REQUEST_FETCH_CAR(data).then(res => {
      this.setData({
        carList: res.data.list
      })
    })
  },

  switchChange: function (e){
    this.setData({
      loading: true
    })
    const id = e.target.dataset.id
    const data = {
      id,
      powerState: e.detail.value ? 1 : 2
    }
    REQUEST_POWER_SWITCH(data).then(res => {
      this.operationRecord(id)
    }).catch(() => {
      this.setData({
        loading: false
      })
    })
  },

  operationRecord: function(id){
    const data = {
      id
    }
    REQUEST_OPERATION_RECORD(data).then(res => {
      this.setData({
        loading: false
      })
    }).catch(() => {
      this.setData({
        loading: true
      })
    })
  },

  bindShowDetail: function(e){
    const { id } = e.target.dataset
    const { carList } = this.data
    carList.forEach(item => {
      if(item.id === parseInt(id)){
        app.globalData.detailInfo = {
          id: item.id,
          plate: item.plate,
          voltage: item.voltage
        }
      }
    })
    wx.navigateTo({
      url: '../logs/logs?id=' + id
    }) 
  }
})
