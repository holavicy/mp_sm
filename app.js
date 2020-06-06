//app.js

import {request} from './common/interface.js'
App({
  onLaunch: function () {
 
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  onShow: function(){

  },

  globalData: {
    userInfo: null,
    isIphoneX: wx.getSystemInfoSync().model.indexOf("iPhone X")>=0?true:false
  },

  //保存图片
  saveImage: function(filePath){
    //先授权
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              wx.saveImageToPhotosAlbum({
                filePath: filePath,
                success: (res) => {
                  wx.showToast({
                    title: '保存图片成功',
                  })
                },
                fail: (e) => {
                  console.log(e);
                }
              })
            }
          })
        } else {
          wx.saveImageToPhotosAlbum({
            filePath: filePath,
            success: (res) => {
              wx.showToast({
                title: '保存图片成功',
              })
            },
            fail: (e) => {
              console.log(e);
            }
          })
        }
      }
    })
  }
})