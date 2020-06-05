// pages/myInfo/index.js
import{ request } from '../../common/interface'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
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
    let userInfoStr = wx.getStorageSync('userInfo');
    let userInfo = JSON.parse(userInfoStr);
    this.setData({
      userInfo: userInfo
    })

    this.getBDList();
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

    //获取我的保单列表
    getBDList: function(){
      // /policy/myPolicyList
  
      let url = '/policy/myPolicyList';
  
      request(url, {}).then(res => {

        this.setData({
          list: res.data.data
        })
        console.log(res);
      })
    }
})