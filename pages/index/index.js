//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
var shiftArray = ["夜", "休", "晚", "中", "早"];
var busArray=["武","荆"];
var laneArray = ["22", "17", "13", "18", "20"];
var laneXshiftArray=[];
var monthNum=0;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: [],
    showMonth:new Date().getMonth()+1,
    showYear:new Date().getFullYear(),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  plusshift: function () {
    var value = wx.getStorageSync('shiftArray');
    var shiftJson = JSON.parse(value);
    var value2 = wx.getStorageSync('busArray');
    var busJson = JSON.parse(value2);
    var value3 = wx.getStorageSync('laneArray');
    var laneJson = JSON.parse(value3);
    var firstShift = shiftJson.shift();
    shiftJson[shiftJson.length]=firstShift;
    wx.setStorage({
      key: "shiftArray",
      data: JSON.stringify(shiftJson)
    })
    var array = util.initData(shiftJson, busJson, laneJson,0);
    console.log(array);
    this.setData({
      array: array
    })
  },
  pluslane: function () {
    var value = wx.getStorageSync('shiftArray');
    var shiftJson = JSON.parse(value);
    var value2 = wx.getStorageSync('busArray');
    var busJson = JSON.parse(value2);
    var value3 = wx.getStorageSync('laneArray');
    var laneJson = JSON.parse(value3);
    var firstLane = laneJson.shift();
    laneJson[laneJson.length] = firstLane;
    wx.setStorage({
      key: "laneArray",
      data: JSON.stringify(laneJson)
    })
    this.setData({
      laneXshiftArray: laneJson
    })
    var array = util.initData(shiftJson, busJson, laneJson, 0);
    console.log(laneJson);
    this.setData({
      array: array
    })
  },
  plusbus: function () {
    var value = wx.getStorageSync('shiftArray');
    var shiftJson = JSON.parse(value);
    var value2 = wx.getStorageSync('busArray');
    var busJson = JSON.parse(value2);
    var value3 = wx.getStorageSync('laneArray');
    var laneJson = JSON.parse(value3);
    var firstBus = busJson.shift();
    busJson[busJson.length] = firstBus;
    wx.setStorage({
      key: "busArray",
      data: JSON.stringify(busJson)
    })
    var array = util.initData(shiftJson, busJson, laneJson,0);
    console.log(array);
    this.setData({
      array: array
    })
  },
  changeMonth: function (event) {
    var num = event.currentTarget.dataset.id;
    monthNum = monthNum + parseFloat(num);

    var date = new Date();
    date = new Date(date.setMonth(date.getMonth() + monthNum));



    var value = wx.getStorageSync('shiftArray');
    var shiftJson = JSON.parse(value);
    var value2 = wx.getStorageSync('busArray');
    var busJson = JSON.parse(value2);
    var array = util.initData(shiftJson, busJson, laneXshiftArray, monthNum);
    this.setData({
      array: array,
      showMonth:date.getMonth()+1,
      showYear:date.getFullYear()
    })
  },
  onLoad: function () {
    //获取用户设置
    try {
      var value = wx.getStorageSync('laneArray');
      if (value) {
        laneXshiftArray = JSON.parse(value);
        console.log(laneArray);
      } else {
        var begin = 0;
        for (var m = 0; m < laneArray.length; m++) {
          for (var n = 0; n < shiftArray.length; n++) {
            if (shiftArray[n] == '休') {
              laneXshiftArray[laneXshiftArray.length] = "X";
            } else {
              // console.log("being=" + begin + ",laneArray[begin++]=" + laneArray[begin]);
              laneXshiftArray[laneXshiftArray.length] = laneArray[begin % (laneArray.length)];
              begin++;
            }
          }
        }
        wx.setStorage({
          key: "laneArray",
          data: JSON.stringify(laneXshiftArray)
        })
      }
    } catch (e) {
      console.log(e);
    }
    
    // console.log(laneXshiftArray);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //获取用户设置
    try {
      var value = wx.getStorageSync('shiftArray');
      if (value) {
        shiftArray=JSON.parse(value);
        console.log(shiftArray);
      }else{
        wx.setStorage({
          key: "shiftArray",
          data: JSON.stringify(shiftArray)
        })
      }
    } catch (e) {
      console.log(e);
    }
    try {
      var value2 = wx.getStorageSync('busArray');
      if (value2) {
        busArray = JSON.parse(value2);
      }else{
        wx.setStorage({
          key: "busArray",
          data: JSON.stringify(busArray)
        })
      }
    } catch (e) {
      console.log(e);
    }
    this.setData({
      array: util.initData(shiftArray, busArray, laneXshiftArray,0),
    })
    //console.log(util.initData(shiftArray, busArray,0));
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
