// pages/dongtaijl/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    page: 1,
    typeid: 1,
    znum:0,
    zguanzhu:0,
    zfs:0,
    guanzhu:'关注'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this
     let userid = wx.getStorageSync('userid')
    wx.request({
      url: that.data.href + "api/Account/UserInfo?id=" + options.id,
      success: function (res2) {
        console.log(res2)
        let usexx = res2.data.data
        usexx.headImage = usexx.headImage.substring(3, usexx.headImage.length)
        that.setData({
          user: usexx,
          myid: userid,
          userid: options.id
        })
        that.getdtjl()
       
      }
    })
    wx.request({
      url: that.data.href + 'api/User/DynCount',
      method: 'POST',
      data: {
        userId: options.id,


      },    //参数为键值对字符串

      success: function (res) {
        console.log(res)
        if(res.data.code==200){
           that.setData({
             znum:res.data.data
           })
        }
      }

    })
    wx.request({
      url: that.data.href + 'api/User/AttentionCount',
      method: 'POST',
      data: {
        userId: options.id,


      },    //参数为键值对字符串

      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            zguanzhu: res.data.data
          })
        }
      }

    })
    wx.request({
      url: that.data.href + 'api/User/FansCount',
      method: 'POST',
      data: {
        userId: options.id,
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            zfs: res.data.data
          })
        }
      }

    })
    if (userid){
      wx.request({
        url: that.data.href + 'api/Dynaminc/SelectAttentionUser',
        method: 'POST',
        data: {
          userId: userid,
          pid: options.id,
        },    //参数为键值对字符串

        success: function (res) {
          console.log(res)
          if (res.data.data == 1) {
            that.setData({
              guanzhu: '已关注'
            })
          }
        }

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
  choosetype: function (e) {
    var that = this
    let id = e.currentTarget.id
    if (id == that.data.typeid) {
      return
    }
    if (id == 1) {
      that.setData({
        typeid: 1
      })
    }
    if (id == 2) {
      that.setData({
        typeid: 2
      })
    }
    that.getdtjl()
  },

  getdtjl() {
    var that = this
    wx.request({
      url: that.data.href + 'api/Dynaminc/UserDynamincList',
      method: 'POST',
      data: {
        userId: that.data.userid,
        page: that.data.page,
        number: 10,
        state: that.data.typeid
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].HeadImage = shuju[i].HeadImage.substring(3, shuju[i].HeadImage.length)
          if (shuju[i].Img.length>2){
            let a = shuju[i].Img.substring(0, shuju[i].Img.length - 1)
            shuju[i].Img = a.split('&')
          }
          
        }
        that.setData({
          list: shuju
        })
      }

    })
  },
  godongtaixq: function (e) {
    var that = this
    let index = e.currentTarget.id
    let shuju = that.data.list
    wx.setStorageSync('dtxq', shuju[index])
    wx.navigateTo({
      url: '../dongtaixq/index',
    })

  },
  godainzan(e) {
    var that = this
    let index = e.currentTarget.id
    let shuju = that.data.list
    wx.request({
      url: that.data.href + 'api/Dynaminc/PraiseAdd',
      method: 'get',
      data: {
        dynamincId: shuju[index].Id,

      },    //参数为键值对字符串

      success: function (res2) {
        console.log(res2.data.code)
        shuju[index].like = parseInt(shuju[index].like)+1
        if (res2.data.code == 200) {
         
          wx.showToast({
            title: res2.data.message,
            icon: 'none',
            duration: 1500,
            mask: true,
          })
          that.setData({
            list:shuju
          })
        }
      }

    })
  },
  longTa: function (e) {
    var that = this
    wx.showModal({　　　　//这个不用多说，做过小程序都看得懂
      title: '提示',
      content: '确认删除该记录吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: that.data.href + 'api/Dynaminc/DynamincDel',
            method: 'get',
            data: {
              dynamincId: e.currentTarget.id,

            },    //参数为键值对字符串

            success: function (res2) {
              console.log(res2.data.code)
              let list = that.data.list
              let index = e.currentTarget.dataset.index
              if (res2.data.code == 200) {
                list.splice(index, 1);
                that.setData({
                  list: list
                })
                wx.showToast({
                  title: res2.data.message,
                  icon: 'none',
                  duration: 1500,
                  mask: true,
                })
              }
            }

          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  goguanzhu:function(e){
    var that = this
    if (that.data.myid == '' || that.data.myid == undefined || that.data.myid==null){
       wx.showToast({
         title: '请先登录',
         icon:'none',
         mask:true,
         duration:1500,
       })
       return
    }
    if (that.data.guanzhu=='关注'){
      wx.request({
        url: that.data.href + 'api/Dynaminc/DynamincAttention',
        method: 'post',
        data: {
          userId: that.data.myid,
          pid: that.data.userid

        },    //参数为键值对字符串

        success: function (res2) {
          console.log(res2.data)
          console.log(res2.data.code)
          if (res2.data.code == 200) {
            that.setData({
              guanzhu: '已关注'
            })
          }
          wx.showToast({
            title: res2.data.message,
            icon: 'none',
            mask: true,
            duration: 1500,
          })

        }

      })
    }else{
      wx.request({
        url: that.data.href + 'api/Dynaminc/DelAttention',
        method: 'post',
        data: {
          userId: that.data.myid,
          pid: that.data.userid

        },    //参数为键值对字符串

        success: function (res2) {
          console.log(res2.data)
          console.log(res2.data.code)
          if (res2.data.code == 200) {
            that.setData({
              guanzhu: '关注'
            })
          }
          wx.showToast({
            title: res2.data.message,
            icon: 'none',
            mask: true,
            duration: 1500,
          })

        }

      })
    }
    
  },
  godongtaixq: function (e) {
    var that = this
    let index = e.currentTarget.id
    let shuju = that.data.list
    wx.setStorageSync('dtxq', shuju[index])
    wx.navigateTo({
      url: '../dongtaixq/index',
    })

  },
  looktp: function (e) {
    let imglist = e.currentTarget.dataset.imglist
    let img = e.currentTarget.dataset.img
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  }
})