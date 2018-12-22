var myCharts = require("../../../utils/wxcharts.js")//引入一个绘图的插件
var lineChart_hum = null
var app = getApp()
Page({
  data: {
  },
  onPullDownRefresh: function () {
  console.log('onPullDownRefresh', new Date())
  },
  //把拿到的数据转换成绘图插件需要的输入格式
  convert: function () {
    var categories = [];
    var humidity = [];
    var length = app.globalData.light.datapoints.length
   for (var i = 0; i < length; i++) {
    categories.push(app.globalData.humidity.datapoints[i].at.slice(10, 20));

      humidity.push(app.globalData.humidity.datapoints[i].value);
    }
    return {
     categories: categories,
     humidity: humidity,
    }
  },
 onLoad: function () {
    var wheatherData = this.convert();
    //得到屏幕宽度
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var wheatherData = this.convert();
    
    lineChart_hum = new myCharts({
      canvasId: 'humidity',
      type: 'line',
      categories: wheatherData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'humidity',
        data: wheatherData.humidity,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '步数',
        min: 0,
        max:5000
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });  
  },  
})
