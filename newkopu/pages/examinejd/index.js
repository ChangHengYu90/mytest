
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this
    wx.request({
      url: that.data.href + 'api/Account/ShangjinXMList',
      method: 'get',
      data: {
        userId: wx.getStorageSync('userid'),
        page: 1,
        number:1,

      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data[0]
        let other = shuju.other
        let qufentype = shuju.qufentype
        wx.request({
          url: that.data.href + 'api/Account/TuikeDetail',
          method: 'get',
          data: {
            other: other,
            qufentype: qufentype,

          },    //参数为键值对字符串

          success: function (res2) {
            console.log(res2)
            that.setData({
              jindu: res2.data.data,
              qufentype: qufentype
            })
           

          }

        })
      }

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

  }
})