// pages/signIn/index.js
import{ request } from '../../common/interface'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calList: [],
    hasSignedToday:true,
    rule: ''
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
    this.getCal();
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

  getCal: function(){
    let url = '/sign/myCalendar';
    request(url, {}).then((res) => {
      console.log(res);

      if(res && res.data && res.data.code == 200){
        let data = res.data.data;
        let singDaysList = (data.signedDays+"").split('');
  
        this.setData({
          calList: data.calendarList,
          rule: data.rule,
          hasSignedToday: !!data.hasSignedToday,
          jfNum: data.integralNum,
          signedDays: data.signedDays,
          singDaysList: singDaysList
        })
      }
    })
  },

  //签到
  sign: function(){
    let hasSignedToday = this.data.hasSignedToday;

    if(hasSignedToday) {
      return
    }

    let url = '/sign/doSign';
    request(url, {}).then((res) => {
      console.log(res);

      if(res && res.data && res.data.code == 0){
        wx.showToast({
          title: '签到成功',
        });

        this.getCal();
      }
    })
  }
})