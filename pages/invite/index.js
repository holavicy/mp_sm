// pages/invite/index.js
import{login, request} from '../../common/interface'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasHidden: true,
    left:0,
    currIndex:0,
    isIphoneX: app.globalData.isIphoneX,
    list:[],
    listMock:[
      {
      miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
      posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
      posterUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590253732499&di=637083a9debac748cc250ab486acf67a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D8d2e43377aec54e741ec1a1689389bfd%2Fd2258013632762d05b126ab6a1ec08fa503dc6d1.jpg"
    },
    {
      miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
      posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
      posterUrl: "http://119.45.33.38:8080/images/dd/2.png"
    },
    {
      miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
      posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
      posterUrl: "http://119.45.33.38:8080/images/dd/3.png"
    },
      {
        miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
        posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
        posterUrl: "http://119.45.33.38:8080/images/dd/4.png"
      },
      {
        miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
        posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
        posterUrl: "http://119.45.33.38:8080/images/dd/5.png"
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
    wx.getSystemInfo({
      success (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let myInfoStr = wx.getStorageSync('userInfo');
    let userInfo = JSON.parse(myInfoStr);
    console.log(userInfo.referralCode)
    return {
      title: '盛米咨询',
      path: '/pages/home/index?rc='+userInfo.referralCode
    }
  },

  getList: function(){
    wx.showLoading();
    let url = '/poster/posterList';
    request(url, {}).then(res => {
      wx.hideLoading();

      // res.data.data = this.data.listMock;
      if(res && res.data && res.data.code == 200){
        this.setData({
          list: res.data.data
        })
      }
    }) 
  },

  //滑动事件
  touchstart: function(event){
    let startX = event.changedTouches[0].pageX;
    this.setData({
      startX: startX
    })
  },

  touchend: function(event){
    let endX = event.changedTouches[0].pageX;
    let startX = this.data.startX;
    let currIndex = this.data.currIndex;

    let list = this.data.list;
    let left = 0;

    if (endX - startX > 50 && currIndex>=1){
      currIndex--;
      this.setData({
        currIndex: currIndex
      })
    }

    if (endX - startX < -50 && currIndex < list.length-1) {
      currIndex++;
      this.setData({
        currIndex: currIndex
      })
    }

    if (currIndex>0){
      left =0- (666 * currIndex)
    }

    this.setData({
      left: left
    })
  },

  saveImg: function (e) {
    let index = e.currentTarget.dataset.index;
    let currData = this.data.list[index];
    // console.log(currData);
  //   var currData =  {
  //     "miniUrl":"http://119.45.33.38:8080/images/dd/9.jpg",
  //     "posterUrl":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590253732499&di=637083a9debac748cc250ab486acf67a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D8d2e43377aec54e741ec1a1689389bfd%2Fd2258013632762d05b126ab6a1ec08fa503dc6d1.jpg",
  //     "posterId":"c333f865-d33a-4531-bd2c-6e9d35d20449"
  // }
  wx.showLoading({
    title: '海报生成中',
  })

    var context = wx.createCanvasContext('canvas');

    var postPath = this.getImgTempPath( currData.posterUrl );
    var miniPath = this.getImgTempPath( currData.miniUrl );

    Promise.all([postPath,miniPath]).then( (res) => {
      context.setFillStyle('#ffffff');
      context.fillRect(0, 880, 630, 160)
      

      context.drawImage(res[0], 0, 0, 630, 880);
      context.drawImage(res[1], 470, 910, 100, 100);
   
      context.setFillStyle('#023C6A');
      context.setFontSize(24);
      context.fillText('微信扫描二维码查看详情', 60, 972, 264);
      context.draw(true, setTimeout(()=>{
        wx.canvasToTempFilePath({
          x:0,
          y:0,
          width:630,
          height:1040,
          destWidth: 630,
          destHeight:1040,
          canvasId: 'canvas',
          success: (res) => {
            app.saveImage(res.tempFilePath)
          }
        })
      },100));
 
    })
  },

  getImgTempPath: function(url){
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: url,
        success: (res) => {
          resolve(res.path)
        },
        fail: (e) => {
          console.log(e);

          wx.showToast({
            title: '图片路径无效',
            icon: 'none'
          })
        }
        
      })
    })
  }
})