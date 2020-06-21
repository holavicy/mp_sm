// pages/home/index.js
import{login, request} from '../../common/interface'

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isX: app.globalData.isIphoneX,
    str:'', //搜索输入的内容
    page: 1,
    pageSize: 5,
    totalNum: -1,
    goodsList:[],
    showCart: false,
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
    let oriCode = '';
    if(options.rc){
      oriCode = options.rc;
    } else {

      let scene = decodeURIComponent(options.scene);
      console.log(scene)
      console.log(JSON.stringify(scene))

      if(scene){
        oriCode = scene.split('=')[1]
      }
    }
    wx.setStorageSync('oriCode', oriCode)
    login();
    this.ifShowShopCart();
    this.getGoodsList();
 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  onPageScroll({scrollTop}){

    this.setData({
      scrollTop:scrollTop
    })
  },

  scrollToTop: function(){
    wx.pageScrollTo({
      duration: 200,
      scrollTop: 0
    })
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
    if (page<maxPage){
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
    let str = this.data.str;

    let url = '/article/homeList?pageSize='+pageSize+'&pageNum='+page+'&title='+str

    request(url, {}, 'POST').then(res => {
      wx.hideLoading()

      // res.data.data.items = [];
      // res.data.data.totalCount = 0;

      if(res && res.data && res.data.code == 200){
        let goodsList = this.data.goodsList;
        goodsList = goodsList.concat(res.data.data.rows);
        this.setData({
          goodsList:goodsList,
          totalNum:res.data.data.total
        })
      }
    }) 
  },

  ifShowShopCart: function(){
    let url = '/shopping/showCart'
    request(url, {}).then( res => {

      if(res.data.data.showCart != 0){
        this.setData({
          showCart:true,
          shopCartUrl: res.data.data.showUrl
        })
      }
    })
  },

  bindblurStr: function(e){

    let value = e.detail.value;
    this.setData({
      str: value,
      page:1,
      goodsList:[]
    })
    this.getGoodsList();
  },

  toProduct: function(e){
    let goodsList = this.data.goodsList;
    let index = e.currentTarget.dataset.index;

    let url = goodsList[index].articleUrl;

    url = encodeURIComponent(url);
    wx.navigateTo({
      url: '/pages/webView/index?url='+url,
    })
  },

  goto: function(){
    let url = this.data.shopCartUrl;

    url = encodeURIComponent(url);
    wx.navigateTo({
      url: '/pages/webView/index?url='+url,
    })
  }
})