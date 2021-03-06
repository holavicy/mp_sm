import { request } from "../../common/interface";

// pages/officialAccounts/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    officialAccount:'',
    imgUrl: ''
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
    this.getInfo();
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
    // let filePath = '/images/accounts.jpg';
    // app.saveImage(filePath);

    wx.getImageInfo({
      src: this.data.imgUrl,
      success: (res) => {
        app.saveImage(res.path);
      }
    })
  },

  getInfo: function(){
    let url = '/common/offiaccountInfo';

    request(url, {}).then((res) => {
      console.log(res);

      this.setData({
        officialAccount: res.data.data.account,
        imgUrl: res.data.data.codeUrl
      })
    })
  }
})