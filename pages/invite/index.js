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
    listLength:-1,
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
      },
      {
        miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
        posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
        posterUrl: "http://119.45.33.38:8080/images/dd/5.png"
      },
      {
        miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
        posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
        posterUrl: "http://119.45.33.38:8080/images/dd/5.png"
      },
      {
        miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
        posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
        posterUrl: "http://119.45.33.38:8080/images/dd/5.png"
      },
      {
        miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
        posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
        posterUrl: "http://119.45.33.38:8080/images/dd/5.png"
      },
      {
        miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
        posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
        posterUrl: "http://119.45.33.38:8080/images/dd/5.png"
      },
      {
        miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
        posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
        posterUrl: "http://119.45.33.38:8080/images/dd/5.png"
      },
      {
        miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
        posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
        posterUrl: "http://119.45.33.38:8080/images/dd/5.png"
      },
      {
        miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
        posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
        posterUrl: "http://119.45.33.38:8080/images/dd/5.png"
      },
      {
        miniUrl: "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJjwoVkYEZomhfLkJB7qGA1PlR1ia2Fr14BCdCXwdXM8PMbOHYicfMQr0fgIKKk82ALYIHwh4ziaJ6Vg/132",
        posterId: "c333f865-d33a-4531-bd2c-6e9d35d20449",
        posterUrl: "http://119.45.33.38:8080/images/dd/5.png"
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
    this.getList();
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
    var context = wx.createCanvasContext('canvas');
    this.setData({
      context: context
    })
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
      // res.data.data=[]
      // res.data.data = this.data.listMock;
      if(res && res.data && res.data.code == 200){
        this.setData({
          list: res.data.data,
          listLength:res.data.data.length
        })

        

        const query = wx.createSelectorQuery();

        let promiseList = [];

        this.data.list.forEach((item, index) => {
          let itemId="#item"+index;
          query.select(itemId).boundingClientRect();
          if(index<=1){
            let posterUrl = this.getImgTempPath(item.posterUrl);
            let miniUrl = this.getImgTempPath(item.miniUrl);
            promiseList.push(posterUrl);
            promiseList.push(miniUrl);
          }
        })

        query.exec(res => {
          this.setData({
            queryRes: res
          })
        })

        var tempUrlList = [];
        var tempUrlItem = [];
        Promise.all(promiseList).then((res) => {
          wx.hideLoading();
          res.forEach((item,index) => {
            tempUrlItem.push(item)
            if (index%2 !== 0){
              tempUrlList.push(tempUrlItem);
              tempUrlItem = [];
            }
          })
          this.setData({
            tempUrlList: tempUrlList
          })
        })
      }
    }) 
  },

  //滑动开始事件
  touchstart: function(event){
    // console.log(event)
    let startX = event.changedTouches[0].pageX;
    this.setData({
      startX: startX
    })
  },

  //滑动结束事件
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
      left = 0 - (this.data.queryRes[currIndex].left-this.data.queryRes[0].left);
    }

    this.setData({
      left: left
    })

    if(currIndex+1 < this.data.list.length && !this.data.tempUrlList[currIndex+1]){
      wx.showLoading({
        mask: true
      })
      let nextData = this.data.list[currIndex+1];
      let nextPosterUrl = this.getImgTempPath(nextData.posterUrl);
      let nextPiniUrl = this.getImgTempPath(nextData.miniUrl);
      let tempUrlList = this.data.tempUrlList;
       Promise.all([nextPosterUrl, nextPiniUrl]).then((res) => {
         
        tempUrlList[currIndex+1] = [res[0], res[1]]
        this.setData({
          tempUrlList: tempUrlList
        })
        wx.hideLoading();
    })
    }
 
  },

  //滑动事件
  touchmove: function(event){
    // console.log(event);

    let initLeft = 0;
    let currIndex = this.data.currIndex;

    if (currIndex>0){
      initLeft = 0 - (this.data.queryRes[currIndex].left-this.data.queryRes[0].left);
    }


    let x = event.touches[0].clientX;

    let startX = this.data.startX;

    let moveleft = initLeft+(x-startX);

    this.setData({
      left: moveleft
    })

  },

  saveImg: function (e) {
    let index = e.currentTarget.dataset.index;
    let tempUrlItem = this.data.tempUrlList[index];

    wx.showLoading({
      title: '海报生成中',
      mask: true
    })

    if(!tempUrlItem){
      wx.showToast({
        title: '图片路径无效'
      })
    } else {
      var context = this.data.context;
      context.drawImage(tempUrlItem[0], 0, 0, 630, 1040);
      context.drawImage(tempUrlItem[1], 470, 890, 100, 100);
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
          },
          fail: ()=>{
            wx.showToast({
              title: '海报生成失败，请稍后再试',
              icon: 'none'
            })
          }
        })
      },100));
    }


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