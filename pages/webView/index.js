// pages/webView/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    defaultUrl:'https://mp.weixin.qq.com/s?__biz=MzI3NjUyNTI4MA==&mid=2247483686&idx=1&sn=2dabc419aab80dab5dd63bfce5b95979&chksm=eb7578a9dc02f1bfd7d31d7f2d8c03e1f219a4a8f33518299281f1b46179dc8bd6588f917760&mpshare=1&scene=1&srcid=&sharer_sharetime=1591073400221&sharer_shareid=2233e877da97f722c50552a0c2ba3ce2&key=e25840c5732ee0d61c2e486b5f118bb682a88044394794adffdc6df83b6fb6111b473d280de61e1425bc2f07c523c8f226ed46cd5705ed648be3a797100697b3badfda6aee72ca5644ce12dad41ffa76&ascene=1&uin=MTgzMTA1OTMwNw%3D%3D&devicetype=Windows+10+x64&version=62090070&lang=zh_CN&exportkey=AXFNM4Z0APxTNH4nXA2mB90%3D&pass_ticket=49WjYN7014EeRnZKGAjcdr6IxmH%2BjDWvWwrWzKHvbajtFdFGU0%2Bs9P7wDCTY%2FAyP'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let url = options && options.url;
    let defaultUrl = this.data.defaultUrl;

    url = url?url:defaultUrl;
    url = decodeURIComponent(url);
    this.setData({
      url:url
    })
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

  }
})