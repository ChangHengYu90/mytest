var app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
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
    var that = this
    wx.request({
      url: that.data.href + 'api/House/DistrictList',
      method: 'POST',
      data: {

      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        that.setData({
          city: options.city,
          shengshi: res.data.data.Province,
          jieguo: [res.data.data.Province[0].ProvinceName, res.data.data.Province[0].CityLise[0].CityName]
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
    var that = this
    var demo = new QQMapWX({
      key: 'YVSBZ-D5WW6-JPLS3-EO65N-6ODAK-INFTJ' // 必填
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // 经纬度
        var latitude = res.latitude
        var longitude = res.longitude
        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res.result.address_component.city);
            that.setData({
              city: res.result.address_component.city
            })

          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });


      },
      fail: function () {
        that.setData({
          city: '未获取'
        })
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
    var that = this
    let yeshu = parseInt(that.data.page) + 1
    that.setData({
      page: yeshu
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //点击事件，点击弹出选择页
  dianji: function (e) {
    var that = this
    let shuju = that.data.shengshi
    let id = e.currentTarget.id
    let shi = shuju[id].CityLise
    let newshi = []
    for (let i = 0; i < shi.length;i++){
      newshi.push(shi[i].CityName)
    }
    console.log(222)
    var that = this
    //这里写了一个动画，让其高度变为满屏
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation

    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        animation.height(res.windowHeight + 'px').step()
        that.setData({
          animationData: animation.export(),
          shi: newshi,
          city: newshi[0],
          diyiji:id,
        })
      }
    })
  },
  //取消按钮
  quxiao: function () {
    //这里也是动画，然其高度变为0
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.height(0 + 'rpx').step()
    this.setData({
      animationData: animation.export()
    });
    //取消不传值，这里就把jieguo 的值赋值为{}
    this.setData({
      jieguo: {}
    });
    console.log(this.data.jieguo);
  },
  //确认按钮
  queren: function () {
    //一样是动画，级联选择页消失，效果和取消一样
    var that = this
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(0 + 'rpx').step()
    console.log(that.data.jieguo2)
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 1]  //当前界面
    var prevPage = pages[pages.length - 2]  //上一个页面
    prevPage.setData({
      city: that.data.city,
      dierji: that.data.dierji,
      diyiji: that.data.diyiji
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  //滚动选择的时候触发事件
  bindChange: function (e) {
    //这里是获取picker-view内的picker-view-column 当前选择的是第几项
    var that = this
    let shi = that.data.shi
    console.log(e.detail.value[0])
    console.log(shi)
    const val = e.detail.value
    console.log(shi[val[0]])
    that.setData({
      city: shi[val[0]],
      dierji: e.detail.value[0]
    })
  },
cxsq:function(){
  wx.getSetting({
    success: function (res) {
      console.log('getSetting...', res)
      if (res.authSetting["scope.userLocation"] == true) {
        console.log("用户已开启定位授权");
      } else {
        wx.showModal({
          title: '位置信息授权',
          content: '位置授权暂未开启',
          confirmText: '开启授权',
          confirmColor: '#345391',
          cancelText: '仍然拒绝',
          cancelColor: '#999999',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                fail: function () {
                  console.log('openSetting.failed')
                }
              })
            }
            if (res.cancel) {
             
            }
          }
        })
      }
    }
  })
}
})