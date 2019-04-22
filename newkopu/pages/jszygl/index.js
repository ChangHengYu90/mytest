var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    typeid: 1,
    page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.typeid == '' || options.typeid == undefined || options.typeid == null){

    }else{
      console.log(options.typeid)
      that.setData({
        typeid: options.typeid
      })
    }
    this.getzstk()

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
      wx.removeStorageSync('zztk')
      var that = this
    let typeid = that.data.typeid
    if (typeid==1){
      that.getzstk()
      wx.setNavigationBarTitle({
        title: '技术转移项目',
      })
    }else{
      that.getzstk2()
      wx.setNavigationBarTitle({
        title: '企业选址项目',
      })
    }
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
      page:yeshu
    })
    if (that.data.typeid==1){
      that.getzstk()
    }else{
      that.getzstk2()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 切换标题
  choosebt: function (e) {
    var that = this
    let id = e.currentTarget.id
    if (id == that.data.typeid){
       return
    }
    that.setData({
      typeid: id
    })
    if (id == 1) {
      that.getzstk()
      wx.setNavigationBarTitle({
        title: '招商推客',
      })
    } else {
      that.getzstk2()
      wx.setNavigationBarTitle({
        title: '招租推客',
      })
    }
  },
  getzstk(){
    var that = this
    wx.request({
      url: that.data.href + 'api/User/TTransferManagementList',
      method: 'get',
      data: {
        puid:wx.getStorageSync('userid'),
        page: that.data.page,
        number:10,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        // 'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
      
        console.log(res.data)
        
        
        if (res.data.code = 200) {
          var shuju = res.data.data
          for (let i = 0; i < shuju.length;i++) {
            if (shuju[i].image != '' && shuju[i].image!=null){
              shuju[i].image = shuju[i].image.substring(0, shuju[i].image.length - 1)
              shuju[i].image = shuju[i].image.split('&')
              
            } 
            console.log(shuju[i].addtime.substring(6, 19))
            shuju[i].addtime = timestampToTime(shuju[i].addtime.substring(6, 16))
            console.log(shuju[i].addtime)   
          }
          if(that.data.page==1){
            that.setData({  
              zstk: shuju
            })
          } else if (that.data.page>1){
            that.setData({
              zstk: that.data.zstk.concat(shuju)
            })
          }
           
         
        }
      },
      fail: function (res){
      console.log(res)
      }

    })
  },
  getzstk2() {
    var that = this
    wx.request({
      url: that.data.href + 'api/User/ZZTwitterList',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userid'),
        page: that.data.page,
        number: 10,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(that.data.href + 'api/User/ZSTwitterList')
        console.log(res.data)


        if (res.data.code = 200) {
          var shuju = res.data.data
          for (let i = 0; i < shuju.length; i++) {
            shuju[i].addTime = timestampToTime(shuju[i].addTime.substring(6, 16))
          
          }
          if (that.data.page == 1) {
            that.setData({
              zztk: shuju
            })
          } else if (that.data.page > 1) {
            that.setData({
              zztk: that.data.zztk.concat(shuju)
            })
          }

        }
      },
      fail: function (res) {
        console.log(res)
      }

    })
  },
  fabu:function(){
    var that = this
    let id = that.data.typeid
    if(id==2){
      wx.navigateTo({
        url: '../zztjfb/index',
      })
    }else{
      wx.navigateTo({
        url: '../zstkfb/index',
      })
    }
  },
  lookzzxq:function(e){
    var that = this
    let id = e.currentTarget.id
    let zztk = that.data.zztk
    wx.setStorageSync('zztk', zztk[id])
    wx.navigateTo({
      url: '../zztjtype/index',
    })

  },
  lookzsxq: function (e) {
    var that = this
    let id = e.currentTarget.dataset.index
    let zztk = that.data.zstk
    wx.setStorageSync('zztk', zztk[id])
    wx.navigateTo({
      url: '../zstjzt/index',
    })

  },
  delzs:function(e){
      var that = this
    let id = e.currentTarget.id
      wx.showModal({　　　　//这个不用多说，做过小程序都看得懂
        title: '提示',
        content: '确认删除该记录吗？',
        success: function (res) {
          if (res.confirm) {
            
            wx.showLoading({
              title: '删除中...',
            })
            wx.request({
              url: that.data.href + 'api/User/ZSTwitterDel',
              method: 'get',
              data: {
                projectId: id,

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
                  that.setData({
                    page:1
                  })
                  that.getzstk()
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
    },
  delzz:function(e){
    var that = this
    wx.showModal({　　　　//这个不用多说，做过小程序都看得懂
      title: '提示',
      content: '确认删除该记录吗？',
      success: function (res) {
        if (res.confirm) {
          let id = e.currentTarget.dataset.id
          wx.showLoading({
            title: '删除中...',
          })
          wx.request({
            url: that.data.href + 'api/User/ZZTwitterDel',
            method: 'get',
            data: {
              zzId: id,

            },    //参数为键值对字符串

            success: function (res2) {
              wx.hideLoading()
              console.log(res2.data)
              if (res2.data.code == 200) {
                that.setData({
                  page: 1
                })
                that.getzstk2()
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
  return Y + M + D + h + m + s;
}