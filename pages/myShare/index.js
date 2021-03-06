// pages/myShare/index.js
import{ request } from '../../common/interface'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page: 1,
    pageSize: 15,
    totalNum: -1,
    listMock: [{
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },
    {
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },
    {
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },
    {
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },
    {
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },
    {
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },
    {
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },
    {
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },
    {
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },
    {
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },
    {
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },{
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },{
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },{
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    },{
      "cutsomerName": "测试",
      "registerTime": "2020-06-05"
    }
  ]
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
    this.setData({
      page: 1,
      list: []
    })
    this.getList();
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
    //判断是否还要加载
    let pageSize = this.data.pageSize;
    let totalNum = this.data.totalNum;
    let page = this.data.page;
    let maxPage = Math.ceil(totalNum/pageSize); 
    console.log(page,maxPage)
    if (page<maxPage){
      page++;
      this.setData({
        page:page
      });
      this.getList();
    }
  },

  //获取推荐列表
  getList: function(){
    wx.showLoading();
    let url='/user/myRecommendList';

    let page = this.data.page;
    let pageSize = this.data.pageSize;

    let data = {
      pageNum: page,
      pageSize: pageSize
    }

    request(url, data).then((res) => {
      wx.hideLoading();
      // console.log(res);
      // res.data.data.rows = this.data.listMock;
      // res.data.data.total =22;
      if(res && res.data && res.data.code == 200){
        let list = this.data.list;
        list = list.concat(res.data.data.rows);
        this.setData({
          list:list,
          totalNum:res.data.data.total
        })
      }
 
    })
  }
})