// pages/officialAccounts/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    officialAccount:'dwh223233'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //复制公众号
  copyAccounts: function(){
    let accounts = this.data.officialAccount;
    wx.setClipboardData({
      data: accounts,
      success: (res) => {
        wx.getClipboardData({
          success: (res) => {
            console.log(res.data)
          }
        })
      }
    })
  },

  //保存图片
  saveImg: function(){
    //先授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success () {
              wx.saveImageToPhotosAlbum({
                filePath: '/sm_mp/images/accounts.jpg',
              })
            }
          })
        } else {
          wx.saveImageToPhotosAlbum({
            filePath: '../../images/accounts.jpg',
          })
        }
      }
    })
  },

   //保存海报
   saveToPhone: function (){
    //获取相册授权
    let imgSrc = this.data.saveImgSrc;
   
    wx.showLoading({
      title: '保存中...',
      mask:true
    })
    //图片保存到本地
    wx.saveImageToPhotosAlbum({
      filePath: imgSrc,
      success: function (data) {
        console.log(data)
        wx.hideLoading()
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (err) {
        console.log(err);

        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
          console.log("当初用户拒绝，再次发起授权")
          wx.showModal({
            title: '提示',
            content: '需要您授权保存相册',
            showCancel: false,
            success: modalSuccess => {
              wx.openSetting({
                success(settingdata) {
                  console.log("settingdata", settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    wx.showModal({
                      title: '提示',
                      content: '获取权限成功,再次点击保存图片即可保存',
                      showCancel: false,
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '获取权限失败，将无法保存到相册哦~',
                      showCancel: false,
                    })
                  }
                },
                fail(failData) {
                  console.log("failData", failData)
                },
                complete(finishData) {
                  console.log("finishData", finishData)
                }
              })
            }
          })
        }
      },
      complete(res) {
        console.log(res);
        wx.hideLoading()
      }
    })
    
  },
})