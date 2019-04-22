var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    paymentid: 1,
    page: 1,
    zhanghao: [],
    startX: 0, //开始坐标
    startY: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.typeid ==1){
        that.setData({
          typeid:1
        })
    }
    
  
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
    that.getzhlist()
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
      paymentid: id,
      page:1
    })
    that.getzhlist()
  },
  //手指触摸动作开始 记录起点X坐标

  touchstart: function (e) {

    //开始触摸时 重置所有删除

    this.data.zhanghao.forEach(function (v, i) {

      if (v.isTouchMove)//只操作为true的

        v.isTouchMove = false;

    })

    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      zhanghao: this.data.zhanghao

    })

  },

  //滑动事件处理

  touchmove: function (e) {

    var that = this,

      index = e.currentTarget.dataset.index,//当前索引

      startX = that.data.startX,//开始X坐标

      startY = that.data.startY,//开始Y坐标

      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标

      //获取滑动角度

      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    that.data.zhanghao.forEach(function (v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else //左滑

          v.isTouchMove = true

      }

    })

    //更新数据

    that.setData({

      zhanghao: that.data.zhanghao

    })

  },

  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */

  angle: function (start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },

  //删除事件

  del: function (e) {
    var that = this
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    // this.data.zhanghao.splice(e.currentTarget.dataset.index, 1)
    wx.showModal({　　　　//这个不用多说，做过小程序都看得懂
      title: '提示',
      content: '确认删除该帐号吗？',
      success: function (res) {
        if (res.confirm) {

          wx.showLoading({
            title: '删除中...',
          })
          wx.request({
            url: that.data.href + 'api/Account/PersonalDel',
            method: 'get',
            data: {
              id: id,

            },    //参数为键值对字符串
            header: {
              //设置参数内容类型为x-www-form-urlencoded
              'Content-Type': 'application/json'
            },
            success: function (res2) {
              console.log(id)
              wx.hideLoading()
              console.log(res2.data)
              if (res2.data.code == 200) {
                let shuju = that.data.zhanghao
                shuju.splice(index, 1)
                that.setData({
                  zhanghao: shuju
                })

              }
              wx.showToast({
                title: res2.data.message,
                icon: 'none',
                mask: true,
                duration: 1500
              })

            }, fail: function () {
              wx.hideLoading()
            }

          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    this.setData({

      zhanghao: this.data.zhanghao

    })

  },
  getzhlist(){
    var that = this
    wx.request({
      url: that.data.href + 'api/Account/PersonalInfoList',
      method: 'get',
      data: {
        userId: wx.getStorageSync('userid'),
        page: that.data.page,
        number: 10,
        type: that.data.paymentid
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        if (res.data.code == 200) {
          let shuju = res.data.data
          for (let i = 0; i < shuju.length; i++) {

            console.log(shuju[i].addtime.substring(6, 19))
            shuju[i].addtime = timestampToTime(shuju[i].addtime.substring(6, 16))
            console.log(shuju[i].addtime)
            shuju[i].isTouchMove = false
          }
          if (that.data.page == 1) {
            that.setData({
              zhanghao: shuju
            })
          } else if (that.data.page > 1) {
            that.setData({
              zhanghao: that.data.zhanghao.concat(shuju)
            })
          }

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
  },
  goaddzh(){
    var that =this
    let id = that.data.paymentid
    wx.navigateTo({
      url: '../addzh/index?typeid=' + id
    })
  },
  gofanhui:function(e){
    console.log(222)
    var that = this
    if (that.data.typeid!=1){
       
    }else{
      let zh = e.currentTarget.dataset.zh
      let khh = e.currentTarget.dataset.khh
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 1]  //当前界面
      var prevPage = pages[pages.length - 2]  //上一个页面
      if (that.data.paymentid==1){
        prevPage.setData({
          paymentid: that.data.paymentid,
          zfb: zh
        })
      }
      if (that.data.paymentid == 2) {
        prevPage.setData({
          paymentid: that.data.paymentid,
          weixin: zh
        })
      }
      if (that.data.paymentid == 3) {
        prevPage.setData({
          paymentid: that.data.paymentid,
          yhk: zh,
          khh: khh
        })
      }
      
      wx.navigateBack({
        delta: 1,
      })
    }
  }

})
function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  // return Y + M + D + h + m + s;
  return Y + M + D;
}