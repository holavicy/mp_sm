// pages/product/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:-1,
    goodsInfoMock: {
      title:'出国要留学，保险要先买',
      time:'2019/02/13',
      paragraphList:[{
        title:'五大理由告诉你为什么选择Summit？',
        content:'渠道取开发和我客户顾问号改为二维火概括为和跟客说课稿是的公司思考供货商刚开始刚开始概况啥的和公司说课稿华塑控股华塑控股哈萨克更合适的快感还是勾上概况啥的独孤皇后归属感看说个事逗号隔开都是高手结果还是开个会SDK国会大厦科技馆和山东矿机个华塑控股但是客户更深刻的刚好看到三个和尚',
        imageUrl:'http://119.45.33.38:8080/images/dd/4.png'
      },
      {
        title:'为你私人订制',
        content:'用更实惠的价格，体验更优质的保障。四大守护计划， 总有一款适合你。',
        imageUrl:''
      },]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let id = options && options.id;
    this.setData({
      id:id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let id = this.data.id;
    this.getGoodsInfoById(id);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 根据id获取商品详情
  getGoodsInfoById: function(id){
    wx.showLoading();
    let url = 'http://172.18.0.205:8082/demo/superadmin/listarea';
    let data = {
      id: id
    }
    wx.request({
      url: url,
      data: data,
      success: (res) => {
        wx.hideLoading();
        res.data = {
          goodsInfo: this.data.goodsInfoMock
        }

        let goodsInfo = res.data.goodsInfo;
        this.setData({
          goodsInfo: goodsInfo
        })
      },
      fail: (e) => {
        wx.hideLoading();
        console.log(e)
      }
    })
  }
})