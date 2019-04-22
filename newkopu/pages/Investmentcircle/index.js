// pages/collectionlist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    tabid: 1,
    page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getguanzhu()
    
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
    return {
      title: "转发给好友",
    
      path: "/pages/index/index"
    }
  },
  choosetab: function (e) {
    var that = this
    let id = e.currentTarget.id
    if (that.data.tabid == id) {
      return
    } else {
      that.setData({
        tabid: id,
        page:1,
      })
    }
    if(id==1){
      that.getguanzhu()
    }
    if(id==2){
      that.gettuijian()
    }
    if(id==3){
      that.getgkk()

    }if(id==4){
      that.getwend()
    }
  },
  // 关注
  getguanzhu() {
    var that = this
    wx.request({
      url: that.data.href + 'api/Dynaminc/AttentionList',
      method: 'POST',
      data: {
        userId:wx.getStorageSync('userid'),
        number:10,
        page:that.data.page,
      },    //参数为键值对字符串
      // header: {
      //   //设置参数内容类型为x-www-form-urlencoded
      //   'content-type': 'application/x-www-form-urlencoded',
      // },
      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        for (let i = 0; i < shuju.length;i++){
          if (shuju[i].Img.length>0){
            shuju[i].Img = shuju[i].Img.split(",")
            }
        }
        that.setData({
          shuju: shuju
        })
      }
    })
  },
  // 推荐
  gettuijian() {
    var that = this
    wx.request({
      url: that.data.href + 'api/Dynaminc/DynamincPushList',
      method: 'POST',
      data: {
        push: 1,
        state:1,
        number: 10,
        page: that.data.page,
      },    //参数为键值对字符串
      // header: {
      //   //设置参数内容类型为x-www-form-urlencoded
      //   'content-type': 'application/x-www-form-urlencoded',
      // },
      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        for (let i = 0; i < shuju.length; i++) {
          if (shuju[i].Img.length > 0) {
            shuju[i].Img = shuju[i].Img.split(",")
          }
        }
        that.setData({
          shuju: shuju
        })
      }
    })
  },
  //公开课
  getgkk() {
    var that = this
    wx.request({
      url: that.data.href + 'api/Open/OpenClassList',
      method: 'POST',
      data: {
        number: 10,
        page: that.data.page,
      },    //参数为键值对字符串
      // header: {
      //   //设置参数内容类型为x-www-form-urlencoded
      //   'content-type': 'application/x-www-form-urlencoded',
      // },
      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        for (let i = 0; i < shuju.length; i++) {
          if (shuju[i].Img.length > 0) {
            shuju[i].Img = shuju[i].Img.split(",")
          }
        }
        that.setData({
          shuju: shuju
        })
      }
    })
  },
  //问答
  getwend() {
    var that = this
    wx.request({
      url: that.data.href + 'api/Dynaminc/DynamincList',
      method: 'POST',
      data: {
        state:2,
        number: 10,
        page: that.data.page,
      },    //参数为键值对字符串
      // header: {
      //   //设置参数内容类型为x-www-form-urlencoded
      //   'content-type': 'application/x-www-form-urlencoded',
      // },
      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
      
        for (let i = 0; i < shuju.length; i++) {
          if (shuju[i].Img.length > 0) {
            shuju[i].Img = shuju[i].Img.substring(0, shuju[i].Img.length - 1)
            shuju[i].Img = shuju[i].Img.split("&")
          }
          shuju[i].HeadImage = shuju[i].HeadImage.substring(3, shuju[i].Img.length)
        }
        that.setData({
          shuju: shuju
        })
      }
    })
  },
  // 去回到
  quwendao:function(e){
    var that = this
    let id = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    let shuju = that.data.shuju
    wx.navigateTo({
      url: '../kopuwd/index?id=' + id + "&title=" + shuju[index].Detail + '&hdnum=' + shuju[index].ReplyCount + '&jf=' + shuju[index].Integral,
    })
  }
})