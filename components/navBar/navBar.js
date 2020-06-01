// pages/navBar/navBar.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
      },
    /**
     * 组件的属性列表
     */
    properties: {
      height: {
        type: String,
        value:'100'
      }, //整个导航栏的高度
      bg: {
        type: String,
        value: ''
      }, //整个导航栏的背景
      back: {
        type: Boolean,
        value: true
      }, //是否显示左上角的返回按钮
      background: {
        type: String,
        value: 'rgba(255, 255, 255, 1)'
      }, //标题的背景色
      color: {
        type: String,
        value: 'rgba(0, 0, 0, 1)'
      }, //标题的颜色
      fontSize: {
        type: Number,
        value: 16
      },//标题的字号
      titleText: {
        type: String,
        value: '导航栏'
      } //标题
    },
    attached: function(){
      var that = this;
      that.setNavSize();
      that.setStyle();
    },
    data: {

    },
    methods: {
      // 通过获取系统信息计算导航栏高度
      setNavSize: function() {
        var that = this
            , sysinfo = wx.getSystemInfoSync()
            , statusHeight = sysinfo.statusBarHeight
            , isiOS = sysinfo.system.indexOf('iOS') > -1
            , navHeight;
        if (!isiOS) {
            navHeight = 48;
        } else {
            navHeight = 44;
        }
        that.setData({
            status: statusHeight,
            navHeight: navHeight
        })
      },
      setStyle: function() {
        var that  = this
            , containerStyle
            , textStyle;
        containerStyle = [
            'background:' + that.data.background
            ].join(';');
        textStyle = [
            'color:' + that.data.color,
            'font-size:' + that.data.fontSize + 'rpx'
        ].join(';');
        that.setData({
          containerStyle: containerStyle,
          textStyle: textStyle
        })
      },

      // 返回事件
      navBack: function(){
        wx.navigateBack({
            delta: 1
        })
      }
    }
})
