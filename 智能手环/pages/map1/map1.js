var point = [];
var that2;

var util = require('../../utils/utils.js');
function drawline() {
  that2.setData({
    polyline: [{
      points: point,
      color: '#99FF00',
      width: 4,
      dottedLine: false
    }]
  });
}

//获取经纬度
function getlocation() {
  var lat, lng;
  wx.getLocation({
    type: 'gcj02',
    success: function (res) {
      lat = res.latitude;
      lng = res.longitude;
      point.push({ latitude: lat, longitude: lng });
      console.log(point);
    }
  });
}

Page({
  data: {
    polyline: [],
    setInter: '',
    num: 1
  },

  onLoad: function () {
    that2 = this;
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that2.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        });
      }
    });
  },

  start: function () {
    var time = util.formatTime(new Date());
    var that = this;
    //将计时器赋值给setInter
  
    
    this.setData({
      time: time,
     
    })
    this.timer = setInterval(repeat, 1000);
    function repeat() {
      console.log('re');
      getlocation();
      drawline();
     
    }
  },
  end: function () {
    console.log('end');
    clearInterval(this.timer);
    var time1 = util.formatTime(new Date());
    var that = this;


    this.setData({
      time1: time1,

    })
  
  }
});
