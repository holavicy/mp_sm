const baseUrl = {
  test: 'https://test.aibal.top',
  online: ''
}

const env = 'test';

const HOST = baseUrl[env];

export {HOST}

function getLoginCode(){
  return new Promise( (resolve, reject) => {
    wx.login({
      success: (res) => {
        resolve(res.code)
      }
    })
  })
}

 //登录：先调用wx.login()获取code,再通过code从后端获取Authorization，获取成功后存入storage
 function login (){
  return new Promise((resolve, reject) => {
    getLoginCode().then((res) => {
      let url = '/app/login?code='+res;
      let paramdata = {};
      let method = 'POST'
  
      request(url, paramdata, method).then(res => {
        if(res && res.data && res.data.code == 200){
          wx.setStorageSync('Authorization', res.data.msg);
          getUserInfo().then((res) => {
            resolve(res)
          })
        }
      })
    })
  })
}

function request (relativeUrl,paramData,method) {
  let url = HOST + '/miniApi' + relativeUrl;
  var Authorization = wx.getStorageSync('Authorization') || '';
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: paramData,
      header: { "Authorization": Authorization },
      method: method ? method : 'GET',
      success:  (res) => {
        //如果接口code返回10011,说明authrization失效，重新走登录
        if(res && res.data && res.data.code == 10011){
          login().then(res => {
            request(relativeUrl, paramData, method);
          })
        } else {
          resolve.call(this, res);
        }
      },
      fail: function (error) {
        console.log(error);
      }
    });
  });
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    let url = '/user/info';
    request(url, {}).then((res) => {
      //将用户信息存储到storage
      if(res&&res.data&&res.data.code == 200){
        let userInfo = res.data.data;
        let userInfoStr = JSON.stringify(userInfo);
        wx.setStorageSync('userInfo', userInfoStr)
      }
      resolve(res);
    })
  })
}

export {request, login}