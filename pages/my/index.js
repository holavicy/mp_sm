// pages/my/index.js
import{ login, request } from '../../common/interface'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
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
    wx.hideHomeButton();
    login().then(() => {
      let userInfoStr = wx.getStorageSync('userInfo') || '';
      let userInfo = userInfoStr? JSON.parse(userInfoStr) :{};
      if(userInfo.isRegister === 0){
        wx.redirectTo({
          url: '/pages/register/index',
        })
      } else {
        this.getUserInfo();
        this.getJFNum();
      }
    });
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

  //从storage中获取用户信息
  getUserInfo: function(){
    let userInfo = wx.getStorageSync('userInfo') || '';
    userInfo = JSON.parse(userInfo);
    this.setData({
      userInfo: userInfo
    })
  },

  //获取我的积分总数
  getJFNum: function(){
    let url = '/integral/myIntegralCount';
    request(url, {}).then((res) => {


      if(res && res.data && res.data.code == 200){
        let userInfo = this.data.userInfo;
        userInfo.jfNum = res.data.data;
        this.setData({
          userInfo:userInfo
        })
      }

      
    })
  }
})