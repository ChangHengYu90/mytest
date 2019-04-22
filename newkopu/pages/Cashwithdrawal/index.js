var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    paymentid: 1,
    zfb:'',
    txje: '',
    weixin: '',
    yhk: '',
    khh: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      price: options.price
    })

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
  onShareAppMessage: function () {

  },
  choosepay(e) {
    var that = this
    let id = e.currentTarget.id
    that.setData({
      paymentid: id
    })
  },
  hqzfb:function(e){
    var that = this
    let zfb = e.detail.value
    that.setData({
      zfb: zfb
    })
  },
  txje: function (e) {
    var that = this
    let txje = e.detail.value
    that.setData({
      txje: txje
    })
  },
  hqweix: function (e) {
    var that = this
    let weixin = e.detail.value
    that.setData({
      weixin: weixin
    })
  },
  hqyhk: function (e) {
    var that = this
    let yhk = e.detail.value
    that.setData({
      yhk: yhk
    })
  },
  hqkhh: function (e) {
    var that = this
    let khh = e.detail.value
    that.setData({
      khh: khh
    })
  },
  submit(){
    var that = this
    let price = that.data.price
    let zfb = that.data.zfb.replace(/(^\s*)|(\s*$)/g, "");
    let txje = that.data.txje.replace(/(^\s*)|(\s*$)/g, "");
    let weixin = that.data.weixin.replace(/(^\s*)|(\s*$)/g, "");
    let yhk = that.data.yhk.replace(/(^\s*)|(\s*$)/g, "");
    let khh = that.data.khh.replace(/(^\s*)|(\s*$)/g, "");
    let paymentid = that.data.paymentid
    let data ={
      userid: wx.getStorageSync('userid'),
      money: txje
    }
    if (paymentid==1){
      if (zfb == '' || zfb == undefined || zfb==null){
        wx.showToast({
          title: '请填写支付宝账号',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        return
      }
      if (txje == '' || txje == undefined || txje == null) {
        wx.showToast({
          title: '请提现金额',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        return
      }
      if (txje-price>0) {
        wx.showToast({
          title: '余额不足，请重新输入',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        return
      }
      data.type = 1
      data.name = zfb
      that.tixin(data)
      

    } else if (paymentid == 2){
      if (weixin == '' || weixin == undefined || weixin == null) {
        wx.showToast({
          title: '请填写微信账号',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        return
      }
      if (txje == '' || txje == undefined || txje == null) {
        wx.showToast({
          title: '请提现金额',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        return
      }
      if (txje - price > 0) {
        wx.showToast({
          title: '余额不足，请重新输入',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        return
      }
      data.type = 2
      data.name = weixin
      that.tixin(data)
    } else if (paymentid == 3){
      if (yhk == '' || yhk == undefined || yhk == null) {
        wx.showToast({
          title: '请填写银行卡号',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        return
      }
      if (khh == '' || khh == undefined || khh == null) {
        wx.showToast({
          title: '请填写开户行',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        return
      }
      if (txje == '' || txje == undefined || txje == null) {
        wx.showToast({
          title: '请提现金额',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        return
      }
      if (txje - price > 0) {
        wx.showToast({
          title: '余额不足，请重新输入',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        return
      }
      data.type = 3
      data.name = yhk
      data.kaihuhang = khh
      that.tixin(data)

    }
  },
  tixin(data){
    var that = this
    wx.request({
      url: that.data.href + 'api/Account/Personalwithdraw',
      method: 'post',
      data:data,    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        if (res.data.code==200){

          wx.showToast({
            title: '申请成功',
            icon: 'none',
            mask: true,
            duration: 1500
          })
          setTimeout(function(){
            that.getiscz(data)
              // wx.navigateBack({
              //   detail:1
              // })
          },1500)

        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            mask: true,
            duration: 1500
          })
        }
      }

    })

  },
  getiscz(data){
    var that = this
    console.log(data)
    wx.request({
      url: that.data.href + 'api/Account/PersonalAcctionDetail',
      method: 'post',
      data: {
        userid: data.userid,
        name: data.name,
        type: data.type
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        if(res.data.code==200){
            if(res.data.data==0){
              wx.showModal({　　　　//这个不用多说，做过小程序都看得懂
                title: '提示',
                content: '添加到常用帐号？',
                success: function (res) {
                  if (res.confirm) {
                    wx.request({
                      url: that.data.href + 'api/Account/PersonalAdd',
                      method: 'get',
                      data: data,    //参数为键值对字符串

                      success: function (res) {
                        console.log(res.data)
                        if (res.data.code == 200) {
                          wx.showToast({
                            title: res.data.message,
                            icon: 'none',
                            mask: true,
                            duration: 1500
                          })
                          setTimeout(function () {
                            wx.navigateBack({
                              detail: 1
                            })
                          }, 1500)

                        } else {
                          wx.showToast({
                            title: res.data.message,
                            icon: 'none',
                            mask: true,
                            duration: 1500
                          })
                          setTimeout(function () {
                            wx.navigateBack({
                              detail: 1
                            })
                          }, 1500)
                        }
                      }

                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    setTimeout(function () {
                      wx.navigateBack({
                        detail: 1
                      })
                    }, 1500)
                  }
                }
              })
            }
        }
        
      }

    })
  },
  goczcy(){
    wx.navigateTo({
      url: '../account/index?typeid=1',
    })
  }
})