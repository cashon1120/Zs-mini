import request from '../utils/request'

// 微信登录
export const REQUEST_WECHAT_LOGIN = data => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

// 发送验证码
export const REQUEST_SEND_CODE = data => {
  return request({
    url: '/sendBindWeChatSMSCode',
    method: 'POST',
    data
  })
}

// 绑定微信
export const REQUEST_BIND_USER = data => {
  return request({
    url: '/bindWeChat',
    method: 'POST',
    data
  })
}

// 查询车辆
export const REQUEST_FETCH_CAR = data => {
  return request({
    url: '/vehicle/vehicleList',
    method: 'POST',
    data
  })
}

// 查询车辆
export const REQUEST_POWER_SWITCH = data => {
  return request({
    url: '/vehicle/powerSwitch',
    method: 'POST',
    data
  })
}

// 操作记录
export const REQUEST_OPERATION_RECORD = data => {
  console.log('========'+ data)
  return request({
    url: '/vehicle/operationRecord',
    method: 'POST',
    data
  })
}

// 车辆操作记录列表
export const REQUEST_OPERATION_RECORD_LIST = data => {
  return request({
    url: '/vehicle/operationRecordList',
    method: 'POST',
    data
  })
}