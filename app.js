//app.js
App({
  onLaunch: function () {
    this.getSystemInfo();
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

editTabbar: function() {
  let tabbar = this.globalData.tabBar;
  let currentPages = getCurrentPages();
  let _this = currentPages[currentPages.length - 1];
  let pagePath = _this.route;
  (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
  for (let i in tabbar.list) {
    tabbar.list[i].selected = false;
    (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
  }
  _this.setData({
    tabbar: tabbar
  });
},

globalData: {
  systemInfo: null,//客户端设备信息
  userInfo: null,
  tabBar: {
    "backgroundColor": "#ffffff",
    "color": "#CCCCCC",
    "selectedColor":"#023C6A",
    "list": [
      {
        "pagePath": "/pages/home/index",
        "iconPath": "icon/icon_home.png",
        "selectedIconPath": "icon/icon_home_HL.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/invite/index",
        "iconPath": "icon/icon_release.png",
        "isSpecial": true,
        "text": "邀请"
      },
      {
        "pagePath": "/pages/my/index",
        "iconPath": "icon/icon_mine.png",
        "selectedIconPath": "icon/icon_mine_HL.png",
        "text": "我的"
      }
    ]
   }
},

  //自己对wx.hideTabBar的一个封装
hidetabbar() {
  wx.hideTabBar({
    fail: function() {
      setTimeout(function() { // 做了个延时重试一次，作为保底。
        wx.hideTabBar()
      }, 500)
    }
  });
},
getSystemInfo: function() {
  let t = this;
  wx.getSystemInfo({
    success: function(res) {
      t.globalData.systemInfo = res;
    }
  });
},
})