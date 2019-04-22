
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethotxm()
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
  // 热门项目
  gethotxm() {
    var that = this
    wx.request({
      url: that.data.href + 'api/House/Project', 
      method: 'POST',
      data: {
        
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          hotlist: res.data.data
        })
      }

    })
  },
  golookxq:function(e){
    var that = this
    let id = e.currentTarget.id
    var index = e.currentTarget.dataset.index
    that.data.hotlist[index].Time = that.data.hotlist[index].Time.substring(0,10)
    wx.setStorageSync('syxm', that.data.hotlist[index])
    wx.navigateTo({
      url: '../xiangmxq/index?id='+id,
    })
  }
})