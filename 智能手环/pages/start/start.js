

Page({
  jie: function () {
    wx.navigateTo({
      url: '../words/words'
    })
  },
  jie1: function () {
    wx.navigateTo({
      url: '../map1/map1'
    })
  },
  data: {
    opacity: 0.4,
    disabled: true,
    threshold: 0,
    rule: 'up',
  },
  send: function () {
    var that = this
    //调用百度天气PI
    const requestTask = wx.request({
      url: 'https://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=LSVpCciVlI5iDNWs0KEVhb9If3qCZINg', //百度天气API
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        // 利用正则字符串从百度天气API的返回数据中截出今天的温度数据
        var str = res.data.results[0].weather_data[0].date;
        var tmp1 = str.match(/实时.+/);
        var tmp2 = tmp1[0].substring(3, tmp1[0].length - 2);
        var tmp = +tmp2;
          },
     fail: function (res) {
        console.log("fail!!!")
      },
      complete: function (res) {
      console.log("end")
      }
    })
  },
  getDataFromOneNet: function () {
    //从oneNET请求我们的Wi-Fi气象站的数据
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/9939133/datapoints?datastream_id=Light,Temperature,Humidity&limit=15',
      header: {
        'content-type': 'application/json',
        'api-key': 'VeFI0HZ44Qn5dZO14AuLbWSlSlI='
      },
      success: function (res) {
        var app = getApp()
        app.globalData.temperature = res.data.data.datastreams[0]
        app.globalData.light = res.data.data.datastreams[1]
        app.globalData.humidity = res.data.data.datastreams[2]
        console.log(app.globalData.light)
        wx.navigateTo({
          url: '../wifi_station/route/index',
        })
      },
      fail: function (res) {
        console.log("fail!!!")
      },
      complete: function (res) {
        console.log("end")
      }
    })
  },
  onLoad: function (options) {
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
  },
 
 data: { longitude: 116.4965075, latitude: 40.006103, speed: 0, accuracy: 0 },
    bindViewTap: function() {}, onLoad: function () {
    var that = this
    wx.showLoading({
      title: "定位中",
      mask: true
    })
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          longitude: longitude,
          latitude: latitude,
          speed: speed,
          accuracy: accuracy
        })
      },
      fail: function () {
        wx.showToast({
          title: "定位失败",
          icon: "none"
        })
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
    

})