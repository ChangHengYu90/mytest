
// pages/kopu/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    tcpjcon: 2,
    tcpjcon2: 2,
    pjcontent: "",
    guanzhu:'关注'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let item = wx.getStorageSync('dtxq')
    let userid = wx.getStorageSync('userid')
    console.log(item)
    that.setData({
      xmid: options.id,
      
    })
    wx.request({
      url: that.data.href + 'api/Dynaminc/DynamincDetail',
      method: 'get',
      data: {
        id: options.id
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data.data)
        let shuju = res.data.data
        shuju.Img = shuju.Img.substring(0, shuju.Img.length - 1)
        shuju.Img = shuju.Img.split('&')
        shuju.DateTime = timestampToTime(shuju.DateTime.substring(6, 16))
        console.log(shuju.DateTime)
        that.setData({
          item: shuju,
          userid: userid
        })
       
      },
      fail: function () {

      }

    })
    if (userid){
      wx.request({
        url: that.data.href + 'api/Dynaminc/SelectAttention',
        method: 'post',
        data: {
          userId: userid,
          dynamincId: options.id
        },    //参数为键值对字符串

        success: function (res) {
          console.log(res)
          
          if (res.data.data==0){
             that.setData({
               guanzhu:'关注'
             }) 
          }
          if (res.data.data == 1) {
            that.setData({
              guanzhu: '已关注'
            })
          }

        },
        fail: function () {

        }

      })
    }
    that.dongtaixq()
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
  hqpjcon: function (e) {
    var that = this
    let content = e.detail.value
    that.setData({
      pjcontent: content
    })
  },
  hqpjcon2: function (e) {
    var that = this
    let content = e.detail.value
    that.setData({
      pjcontent2: content
    })
  },
  // 
  dongtaixq: function () {
    var that = this
    wx.request({
      url: that.data.href + 'api/Dynaminc/ReplyList',
      method: 'POST',
      data: {
        dynamicId: that.data.xmid,
        number: 10,
        page: 1,

      },    //参数为键值对字符串

      success: function (res) {

        console.log(res.data.data)
        let shuju = res.data.data
        if (shuju.CommentA.length>0){
        for (let i = 0; i < shuju.CommentA.length; i++) {
          console.log(shuju.CommentA[i].ReplyHeadrImg)
          shuju.CommentA[i].ReplyHeadrImg = shuju.CommentA[i].ReplyHeadrImg.substring(3, shuju.CommentA[i].ReplyHeadrImg.length)
          that.setData({
            pllist: shuju
          })
          wx.request({
            url: that.data.href + 'api/Dynaminc/DynamincCommentList',
            method: 'POST',
            data: {
              commentId: shuju.CommentA[i].Id,//shuju.CommentA[i].DynamicId
              number: 10,
              page: 1,

            },    //参数为键值对字符串

            success: function (res) {
              console.log(res.data.data)
              let hf = res.data.data
              shuju.CommentA[i].hf = res.data.data
              that.setData({
                pllist: shuju
              })
              console.log(shuju)
            }

          })

        }
        }else{
          that.setData({
            pllist: shuju
          })
        }

      }

    })
  },
  gofabupl: function () {
    var that = this
    let user = wx.getStorageSync('userxq')
    if (user == '' || user == undefined || user == null) {
      wx.showToast({
        title: '请先登录',
        mask: true,
        duration: 1500,
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/index',
        })
      }, 1500)
    }else{
      that.setData({
        tcpjcon: 1
      })
    }
  },
  gbplcon() {
    var that = this
    that.setData({
      tcpjcon: 2
    })
  },
  gbplcon2() {
    var that = this
    that.setData({
      tcpjcon2: 2
    })
  },
  gofabuplcon() {
    var that = this
    let user = wx.getStorageSync('userxq')
    that.setData({
      tcpjcon: 2,
    })
    wx.request({
      url: that.data.href + 'api/Dynaminc/DynamincReplyAdd',
      method: 'POST',
      data: {
        userId: user.id,//shuju.CommentA[i].DynamicId
        userName: user.nickName,
        dynamicId: wx.getStorageSync('dtxq').Id,
        detail: that.data.pjcontent

      },    //参数为键值对字符串

      success: function (res) {
        console.log(res)

        if (res.data.code == 200) {
          wx.showToast({
            title: '评价成功',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          that.setData({
            pjcontent: '',
          })
          that.dongtaixq()
        }
      },
      fail: function () {

      }

    })
  },
  gofabuplcon2() {
    var that = this
    let data = that.data.huifudnr
    let user = wx.getStorageSync('userxq')
    that.setData({
      tcpjcon2: 2,
    })
    data.userId = user.id
    data.userName = user.nickName
    data.detail = that.data.pjcontent2
    console.log(data)
    wx.request({
      url: that.data.href + 'api/Dynaminc/DynamincCommentAdd',
      method: 'POST',
      data: data,
    

      success: function (res) {
        console.log(res)

        if (res.data.code == 200) {
          wx.showToast({
            title: '评价成功',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          that.setData({
            pjcontent: '',
          })
          that.dongtaixq()
        }
      },
      fail: function () {

      }

    })
  },
  godainzan() {
    var that = this
    
    wx.request({
      url: that.data.href + 'api/Dynaminc/PraiseAdd',
      method: 'get',
      data: {
        dynamincId: that.data.item.Id,

      },    //参数为键值对字符串

      success: function (res2) {
        console.log(res2.data.code)
        if (res2.data.code == 200) {
          let shuju = that.data.item
          console.log(shuju)
          shuju.like = parseInt(shuju.like) +1
          that.setData({
            item: shuju
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
  },
  goguanzhu: function () {
    var that = this
    let userid = wx.getStorageSync('userid')
    console.log(userid)
    if (userid == '' || userid == undefined || userid == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        mask: true,
        duration: 1500,
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/index',
        })
      }, 1500)
    }else{
      if (that.data.guanzhu=='关注'){
        wx.request({
          url: that.data.href + 'api/Dynaminc/AttentionKOPUInfo',
          method: 'post',
          data: {
            userId: userid,
            DynamicId: that.data.item.Id

          },    //参数为键值对字符串

          success: function (res2) {
            console.log(res2)
            console.log(res2.data.code)
            wx.showToast({
              title: res2.data.message,
              icon: 'none',
              duration: 1500,
              mask: true,
            })
            if (res2.data.code == 200) {
              that.setData({
                guanzhu:'已关注'
              })
              
            }
          }

        })
      }else{
        wx.request({
          url: that.data.href + 'api/Dynaminc/CancelAttentionKOPU',
          method: 'post',
          data: {
            userId: userid,
            DynamicId: that.data.item.Id

          },    //参数为键值对字符串

          success: function (res2) {
            console.log(res2)
            console.log(res2.data.code)
            wx.showToast({
              title: res2.data.message,
              icon: 'none',
              duration: 1500,
              mask: true,
            })
            if (res2.data.code == 200) {
              that.setData({
                guanzhu: '关注'
              })

            }
          }

        })
      }
      
    }
    
  },
  gohuifu: function (e) {
    var that = this
    console.log(e)
    let user = wx.getStorageSync('userxq')
    if (user == '' || user == undefined || user==null){
        wx.showToast({
          title: '请先登录',
          mask:true,
          duration:1500,
          icon:'none'
        })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/index',
        })
      }, 1500)
        return
    }
    let dynId = e.currentTarget.dataset.dynamicid
    let commentId = e.currentTarget.dataset.id
    let userCommentId = e.currentTarget.dataset.userid
    let userComment = e.currentTarget.dataset.username

    let data = {
      dynId: dynId,
      userComment: userComment,
      commentId: commentId,
      userCommentId: userCommentId,
      userId: user.id,
      userName: user.nickName
    }
    that.setData({
      tcpjcon2: 1,
      huifudnr: data
    })
  },
  gohuifuhf: function (e) {
    var that = this
    let user = wx.getStorageSync('userxq')
    if (user == '' || user == undefined || user == null) {
      wx.showToast({
        title: '请先登录',
        mask: true,
        duration: 1500,
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/index',
        })
      }, 1500)
      return
    }
    console.log(e)
    let dynId = e.currentTarget.dataset.dynid
    let replyId = e.currentTarget.dataset.replyid
    let commentId = e.currentTarget.dataset.commentid
    let userCommentId = e.currentTarget.dataset.usercommentid
    let userComment = e.currentTarget.dataset.usercomment
    let replyName = e.currentTarget.dataset.replyname
    console.log(dynId)
    console.log(replyId)
    console.log(commentId)
    console.log(userCommentId)
    console.log(userComment)
    console.log(replyName)
    let data = {
      dynId: dynId,
      replyId: replyId,
      commentId: commentId,
      userCommentId: userCommentId
    }
    if (userComment != '' && userComment != undefined && userComment != null) {
      data.userComment = userComment
    }
    if (replyName != '' && replyName != undefined && replyName != null) {
      data.replyName = replyName
    }
    that.setData({
      tcpjcon2: 1,
      huifudnr: data
    })
  },
  lookpic:function(e){
    let imglist = e.currentTarget.dataset.imglist
    let img = e.currentTarget.dataset.img
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
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