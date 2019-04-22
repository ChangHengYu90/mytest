// pages/dongtaijlfb/index.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    piclist: [],
    city: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 实例化API核心类
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
          city: '未获取获取'
        })
      }
    })
    that.setData({
      typeid: options.id
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
  choosepic() {
    var that = this
    let piclist = that.data.piclist
    let num = 9 - piclist.length
    if (num == 0) {
      wx.showToast({
        title: '最多上传9张图片',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return
    }
    wx.chooseImage({
      count: 9 - piclist.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res.tempFilePaths)

        if (piclist.length == 0) {
          that.setData({
            piclist: res.tempFilePaths
          })
        } else {
          that.setData({
            piclist: piclist.concat(res.tempFilePaths)
          })
        }
        // let shuju = res2.tempFilePaths
        // for (let i = 0; i < shuju.length; i++) {
        //   wx.getImageInfo({
        //     src: shuju[i],
        //     success: function (res) {
        //       var ctx = wx.createCanvasContext('photo_canvas');
        //       var ratio = 2;
        //       var canvasWidth = res.width
        //       var canvasHeight = res.height;
        //       // 保证宽高均在200以内
        //       while (canvasWidth > 200 || canvasHeight > 200) {
        //         //比例取整
        //         canvasWidth = Math.trunc(res.width / ratio)
        //         canvasHeight = Math.trunc(res.height / ratio)
        //         ratio++;
        //       }
        //       that.setData({
        //         canvasWidth: canvasWidth,
        //         canvasHeight: canvasHeight
        //       })//设置canvas尺寸
        //       ctx.drawImage(shuju[i], 0, 0, canvasWidth, canvasHeight)
        //       ctx.draw()
        //       //下载canvas图片
        //       setTimeout(function () {
        //         wx.canvasToTempFilePath({
        //           canvasId: 'photo_canvas',
        //           success: function (res) {
        //             console.log(res.tempFilePath)
        //             // if (piclist.length == 0) {
        //             //   that.setData({
        //             //     piclist: res.tempFilePath
        //             //   })
        //             // } else {
        //             //   that.setData({
        //             //     piclist: piclist.concat(res.tempFilePath)
        //             //   })
        //             // }
        //           },
        //           fail: function (error) {
        //             console.log(error)
        //           }
        //         })
        //       }, 100)
        //     },
        //     fail: function (error) {
        //       console.log(error)
        //     }
        //   })
        // }


      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  delpic: function (e) {
    var that = this
    let index = e.currentTarget.index
    let piclist = that.data.piclist
    piclist.splice(index, 1)
    that.setData({
      piclist: piclist
    })

  },
  submit: function () {
    var that = this
    let piclist = that.data.piclist
    for (let i = 0; i < piclist.length; i++) {
      wx.uploadFile({
        url: that.data.href + 'api/User/ImgAdd', //仅为示例，非真实的接口地址
        filePath: piclist[i],
        name: 'img',
        formData: {
          state: 1,
         
        },
        success(res2) {
          console.log(res2)
          const data = res2.data
          //do something
        }
      })
    }
  }

})