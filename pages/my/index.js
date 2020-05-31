// pages/my/index.js
import{login} from '../../common/interface'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      name:'陈明姣',
      imageUrl:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKzwARGeicV29Am0lCUzOWedKa8XCt916ib1edLibictupiaAxdfw8N0TOUEJjvDz0G88fRo4PfXtcjfdg/132',
      jfNum:5000
    }
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
      } 
    })
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

  }
})