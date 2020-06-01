// pages/register/index.js
import{request} from '../../common/interface'
import{test} from '../../utils/regular'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    email:'',
    sex:0,
    birthday:'',
    idCard:'',
    tel:'',
    type:1,
    remCode:'',
    avatarUrl: '',
    nickName: ''
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
    //判断是否通过推荐进入
    let oriCode = wx.getStorageSync('oriCode');
    if(oriCode){
      this.setData({
        type: 3,
        remCode: oriCode
      })
    }
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

  //输入姓名
  setName: function(e){
    let name = e.detail.value;
    name = name.trim();
    this.setData({
      name: name
    })
  },

  //输入邮箱
  setEmail: function(e){
    let email = e.detail.value;
    email = email.trim();
    this.setData({
      email: email
    })
  },

    //输入身份证号
    setIdCard: function(e){
      let idCard = e.detail.value;
      idCard = idCard.trim();
      this.setData({
        idCard: idCard
      })
    },

    //输入手机号
    setTel: function(e){
      let tel = e.detail.value;
      tel = tel.trim();
      this.setData({
        tel: tel
      })
    },

     //输入推荐码
     setRemCode: function(e){
      let remCode = e.detail.value;
      remCode = remCode.trim();
      this.setData({
        remCode: remCode
      })
    },

  //选择性别
  setSex: function(e){
    let sex = e.target.dataset.sex;
    sex = Number(sex);
    this.setData({
      sex:sex
    })
  },

  //选择生日
  bindDateChange: function(e){
    let birthday = e.detail.value;
    this.setData({
      birthday: birthday
    })
  },

  //选择获取方式
  setType: function(e){
    let type = e.target.dataset.type;
    type = Number(type);
    this.setData({
      type:type
    })
  },

  //注册
  submitInfo: function(e){

    if(e.detail.userInfo){
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName
      })
    }

    if(this.data.avatarUrl == ''){
      return
    }
    let name = this.data.name;
    let email = this.data.email;
    let birthday = this.data.birthday;
    let type = this.data.type;
    let remCode = this.data.remCode;
    let idCard = this.data.idCard;
    let tel = this.data.tel;
    let avatar = this.data.avatarUrl;
    let nickName = this.data.nickName;
    let sex = this.data.sex;

    //校验数据
    if(name == ''){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return
    }

    if(email == ''){
      wx.showToast({
        title: '请输入邮箱',
        icon: 'none'
      })
      return
    }

    if(!test(email, 'email')){
      wx.showToast({
        title: '邮箱格式错误',
        icon: 'none'
      })
      return
    }

    if(birthday == ''){
      wx.showToast({
        title: '请选择生日',
        icon: 'none'
      })
      return
    }

    if(idCard && !test(idCard, 'idCard')){
      wx.showToast({
        title: '身份证号格式错误',
        icon: 'none'
      })
      return
    }

    if(tel && !test(tel, 'tel')){
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return
    }

    if(type == 3 && remCode == ''){
      wx.showToast({
        title: '请输入专属推荐码',
        icon: 'none'
      })
      return
    }

    let data = {
      avatar: avatar,
      birthday: birthday,
      email: email,
      idCard: idCard,
      name: name,
      nickName: nickName,
      recommenderReferralCode: remCode,
      sex: sex,
      tel: tel
    }

    let url = '/user/register';
    let paramData = data;
    let method = 'POST';
    request(url, paramData, method).then((res) => {
      console.log(res);

      if(res.data.code == 200){
        wx.showToast({
          title: '注册成功',
        })

        setTimeout(function(){
          wx.redirectTo({
            url: '/pages/home/index',
          })
        },1000)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
    
  }
})