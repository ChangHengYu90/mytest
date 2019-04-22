var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    name:'',
    khh:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this
    let tsc = '请输入支付宝帐号'
    let tsclx = 'text'
    if (options.typeid==2){
      tsc = '请输入微信帐号'
     }
    if (options.typeid == 3) {
      tsc = '请输入银行卡号'
      tsclx='number'
    }
     that.setData({
       typeid: options.typeid,
       tsc: tsc,
       tsclx: tsclx
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
  hqzh:function(e){
    var that = this
    let name = e.detail.value
    that.setData({
      name: name
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
    let typeid = that.data.typeid
    let name = that.data.name.replace(/(^\s*)|(\s*$)/g, "");
    let khh = that.data.khh.replace(/(^\s*)|(\s*$)/g, "");
    let data ={
      userid: wx.getStorageSync('userid'),
      name: name,
    }
    if (typeid==1){
      if (name == '' || name == undefined || name == null){
        wx.showToast({
          title: '请填写支付宝账号',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        return
      }
       data.type=1
      that.gotj(data)
      
    }
    if (typeid == 2) {
      if (name == '' || name == undefined || name == null) {
        wx.showToast({
          title: '请填写微信账号',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        return
      }
      data.type = 2
      that.gotj(data)

    }
    if (typeid == 3) {
      if (name == '' || name == undefined || name == null) {
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
      data.type = 3
      data.kaihuhang = khh
      that.gotj(data)

    }
    
  },
  gotj(data){
    var that = this
    console.log(data)
    wx.request({
      url: that.data.href + 'api/Account/PersonalAdd',
      method: 'post',
      data: data,    //参数为键值对字符串
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 200) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            mask: true,
            duration: 1500
          })
          setTimeout(function(){
            wx.navigateBack({
              detail:1
            })
          },1500)

        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            mask: true,
            duration: 1500
          })
        }
      }

    })
  }
})