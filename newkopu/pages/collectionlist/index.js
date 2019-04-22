// pages/collectionlist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
   tabid:1,
   page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getgzlist()
    // this.getgzlist2()
    // this.getgzlist3()
    // this.getgzlist4()
    this.getnewgz()
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
    var that = this
    let yeshu = parseInt(that.data.page) +1
    that.setData({
      page: yeshu
    })
    that.getnewgz()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  choosetab:function(e){
    var that = this
    let id = e.currentTarget.id
    if(that.data.tabid==id){
      return
    }else{
   
      that.setData({
        tabid:id
      })
    }
  },
  
  getgzlist(){
    var that = this
    wx.request({
      url: that.data.href + 'api/User/AttentionProject',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userid'),
        page: that.data.page,
        number: 10,
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        // for (let i = 0; i < shuju.length; i++) {
        //   shuju[i].HeadImage = shuju[i].HeadImage.substring(3, shuju[i].HeadImage.length)
        //   let a = shuju[i].Img.substring(0, shuju[i].Img.length - 1)
        //   shuju[i].Img = a.split('&')
        // }
        that.setData({
          list: shuju
        })
      }

    })
  },
  getgzlist2() {
    var that = this
    wx.request({
      url: that.data.href + 'api/User/zcyzAttentoinList',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userid'),
        page: that.data.page,
        number: 10,
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        // for (let i = 0; i < shuju.length; i++) {
        //   shuju[i].HeadImage = shuju[i].HeadImage.substring(3, shuju[i].HeadImage.length)
        //   let a = shuju[i].Img.substring(0, shuju[i].Img.length - 1)
        //   shuju[i].Img = a.split('&')
        // }
        that.setData({
          list2: shuju
        })
      }

    })
  },
  getgzlist3() {
    var that = this
    wx.request({
      url: that.data.href + 'api/User/XmsbAttentionList',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userid'),
        page: that.data.page,
        number: 10,
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        // for (let i = 0; i < shuju.length; i++) {
        //   shuju[i].HeadImage = shuju[i].HeadImage.substring(3, shuju[i].HeadImage.length)
        //   let a = shuju[i].Img.substring(0, shuju[i].Img.length - 1)
        //   shuju[i].Img = a.split('&')
        // }
        that.setData({
          list3: shuju
        })
      }

    })
  }
  ,
  getgzlist4() {
    var that = this
    wx.request({
      url: that.data.href + 'api/Open/AttentionList',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userid'),
        page: that.data.page,
        number: 10,
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        // for (let i = 0; i < shuju.length; i++) {
        //   shuju[i].HeadImage = shuju[i].HeadImage.substring(3, shuju[i].HeadImage.length)
        //   let a = shuju[i].Img.substring(0, shuju[i].Img.length - 1)
        //   shuju[i].Img = a.split('&')
        // }
        that.setData({
          list4: shuju
        })
      }

    })
  },
  getnewgz() {
    var that = this
    wx.request({
      url: that.data.href + 'api/Dynaminc/AttentionList',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userid'),
        page: that.data.page,
        number: 10,
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].Manager[0].headImage = shuju[i].Manager[0].headImage.substring(3, shuju[i].Manager[0].headImage.length)
         
        }
        if(that.data.page<2){
          that.setData({
            list: shuju
          })
        }else{
          that.setData({
            list: that.data.list.concat(shuju)
          })
        }
        
      }

    })
  },
  golookxq:function(e){
   let id = e.currentTarget.id
   wx.navigateTo({
     url: '../dongtaijl/index?id='+id,
   })
  },
  goquxiao:function(e){
    var that = this
    let id = e.currentTarget.dataset.id
    let pid = e.currentTarget.dataset.pid
    console.log(id)
    console.log(pid)
    wx.request({
      url: that.data.href + 'api/Dynaminc/DelAttention',
      method: 'POST',
      data: {
        userId: id,
        pid: pid,
      },    //参数为键值对字符串
     
      success: function (res) {
        console.log(res.data)
        if (res.data.code==200){
           that.setData({
             page:1
           })
          that.getnewgz()
        }
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1500,
          mask: true
        })
      
      }

    })

  }
})