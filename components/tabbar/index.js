// components/tabbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectedIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: wx.getSystemInfoSync().model.indexOf("iPhone X"),
    tabBarList:[
      {
        "pagePath": "/pages/home/index",
        "iconPath": "icons/icon_home.png",
        "selectedIconPath": "icons/icon_home_HL.png",
        "text": "首页",
        "selected":true
      },
      {
        "pagePath": "/pages/invite/index",
        "iconPath": "icons/special.png",
        "selectedIconPath": "icons/special.png",
        "isSpecial": true,
      },
      {
        "pagePath": "/pages/my/index",
        "iconPath": "icons/icon_mine.png",
        "selectedIconPath": "icons/icon_mine_HL.png",
        "text": "我的"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goUrl: function(e){
      console.log(e.currentTarget.dataset);

      let userInfoStr = wx.getStorageSync('userInfo') || '';
      let userInfo = userInfoStr? JSON.parse(userInfoStr) :{};
      if(userInfo.isRegister != 1){
        wx.redirectTo({
          url: '/pages/register/index',
        })
      } else {
        wx.reLaunch({
          url: e.currentTarget.dataset.url,
        })
      }
    }

  }
})
