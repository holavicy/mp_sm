// pages/home/index.js
import{login, request} from '../../common/interface'

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:'', //搜索输入的内容
    page: 0,
    pageSize: 5,
    totalNum: 0,
    goodsList:[],
    goodsListMock:[{
        "id":1,
        "name":'出国留学，保险必备',
        "time":'2019年12月31日',
        "imageUrl":"http://119.45.33.38:8080/images/dd/4.png"
      },
      {
        "id":1,
        "name":'出国留学，保险必备',
        "time":'2019年12月31日',
        "imageUrl":"http://119.45.33.38:8080/images/dd/4.png"
      },
      {
        "id":1,
        "name":'出国留学，保险必备',
        "time":'2019年12月31日',
        "imageUrl":"http://119.45.33.38:8080/images/dd/4.png"
      },
      {
        "id":1,
        "name":'出国留学，保险必备',
        "time":'2019年12月31日',
        "imageUrl":"http://119.45.33.38:8080/images/dd/4.png"
      },
      {
        "id":1,
        "name":'出国留学，保险必备',
        "time":'2019年12月31日',
        "imageUrl":"http://119.45.33.38:8080/images/dd/4.png"
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //进入首页先判断连接上是否有邀请码，若有说明是通过他人分享的连接进入，则存储
    let oriCode = options.rc || '';
    wx.setStorageSync('oriCode', oriCode)
    login();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getGoodsList();
    this.setData({
      page: 0,
      goodsList: [],
      isX: app.globalData.isIphoneX
    })
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
    console.log(page,maxPage-1)
    if (page<maxPage-1){
      page++;
      this.setData({
        page:page
      });
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //查询商品列表
  getGoodsList: function(){
    wx.showLoading();
    let page = this.data.page;
    let pageSize = this.data.pageSize;

    let url = '/article/list?count='+pageSize+'&start='+page

    request(url, {}, 'POST').then(res => {
      wx.hideLoading()
      console.log(res);

      if(res && res.data && res.data.code == 200){
        let goodsList = this.data.goodsList;
        goodsList = goodsList.concat(res.data.data.items);
        this.setData({
          goodsList:goodsList,
          totalNum:res.data.data.totalCount
        })
      }
    }) 
  },

  bindblurStr: function(e){
    console.log(e);

    let value = e.detail.value;
    this.setData({
      str: value,
      page:0,
      goodsList:[]
    })
    this.getGoodsList();
  },

  toProduct: function(e){
    let goodsList = this.data.goodsList;
    let index = e.currentTarget.dataset.index;


    let url = goodsList[index].content.articles[0].url;
    console.log(url);

    url = encodeURIComponent(url);
    wx.navigateTo({
      url: '/pages/webView/index?url='+url,
    })
  }
})