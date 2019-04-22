var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    iszk:2,
    iszk2: 2,
    iszk3: 2

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
    var that = this
    let id = wx.getStorageSync('userid')
    wx.request({
      url: that.data.href +"api/Account/UserInfo?id=" + id,
      success: function (res2) {
        console.log(res2)
        wx.setStorageSync('userxq', res2.data.data)
    
      }
    })
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
  iszhankai:function(){
    var that = this
    let typeid= that.data.iszk
    if (typeid==1){
         that.setData({
           iszk:2
         })
    }
    if (typeid == 2) {
      that.setData({
        iszk: 1
      })
    }
  },
  iszhankai2: function () {
    var that = this
    let typeid = that.data.iszk2
    if (typeid == 1) {
      that.setData({
        iszk2: 2
      })
    }
    if (typeid == 2) {
      that.setData({
        iszk2: 1
      })
    }
  },
  iszhankai3: function () {
    var that = this
    let typeid = that.data.iszk3
    if (typeid == 1) {
      that.setData({
        iszk3: 2
      })
    }
    if (typeid == 2) {
      that.setData({
        iszk3: 1
      })
    }
  },
  godtjl:function(){
    wx.navigateTo({
      url: '../dongtaijl/index',
    })
  },
  golljl:function(){
    wx.navigateTo({
      url: '../collectionlist/index',
    })
  },
  gosetting:function(){
    wx.navigateTo({
      url: '../setting/index',
    })
  },
  gofyfb:function(){
    wx.navigateTo({
      url: '../qyxzfb/index',
    })
  },
  gofygl: function () {
    wx.navigateTo({
      url: '../qyxzgl/index',
    })
  },
  noshow:function(){
    wx.showToast({
      title: '暂未开通，敬请期待',
      icon:'none',
      duration:1000,
      mask:true,
    })
  },
  gotuikejl:function(){
    wx.navigateTo({
      url: '../zztj/index',
    })
  },
  goztfb:function(){
    wx.navigateTo({
      url: '../zsxmztfb/index',
    })
  }
})