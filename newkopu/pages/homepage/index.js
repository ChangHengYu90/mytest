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
    city: '',
    isshow:1,
    page:1,
    dierji: '',
    diyiji: '',
    dqlsr: ['周***', '顾***', '冯***', '王***', '刘***', '李***'],
    tklxisshow:1,
    newfbid:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.gethotxm()
    that.gethotxm2()
    that.getbanner()
    
    var that = this
    var myDate = new Date()
    let dqdate = myDate.toLocaleDateString()
    that.setData({
      dqdate: dqdate
    })

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
          city: '未获取'
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
    let id = wx.getStorageSync('userid')
    let user= wx.getStorageSync('userxq')
    if(id==''||id==undefined||id==null){

    }else{
      user.headImage = user.headImage.substring(3,user.headImage.length)
       that.setData({
         isshow:2,
         user: user
       })
    }
    if (that.data.city == '' || that.data.city =='未获取'){
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
              that.getcity()

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
    }else{
     
    }
    
    wx.request({
      url: that.data.href + 'api/User/ZSSuccessList',
      method: 'POST',
      data: {
        page:1,
        number:10,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          tjcglist: res.data.data
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
    //   var that = this
    //   let yeshu = parseInt(that.data.page)+1
    //   that.setData({
    //     page:yeshu
    //   })
    // that.gethotxm()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getcity(){
    console.log(11111111)
    var that = this
    wx.request({
      url: that.data.href + 'api/House/DistrictList',
      method: 'POST',
      data: {

      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        that.setData({
          shengshi: res.data.data.Province,
        })
        let shuju = res.data.data.Province
        let city= that.data.city
        let isycs = 0
        for(let i = 0;i<shuju.length;i++){
          for (let j = 0; j < shuju[i].CityLise.length; j++) {
            console.log(shuju[i].CityLise[j].CityName)
            if (city == shuju[i].CityLise[j].CityName){
                isycs++
                console.log(j)
              console.log(i)
              that.setData({
                dierji:j,
                diyiji: i
              })
              }
            if (i == shuju.length - 1 && j == shuju[i].CityLise.length-1){
              if (isycs==0){
                   that.setData({
                     dierji: '',
                     diyiji: ''
                   })
                 }
              }
          }
        }
      
      }

    })
  },
  // 招商项目
  gozsxm(){
    var that = this
    wx.navigateTo({
      // url: '../syzsxm/index?yiji=' + that.data.diyiji + "&erji=" + that.data.dierji + "&cityname=" + that.data.city,
      url: '../syzsxm/index?yiji=' + that.data.diyiji + "&erji=" + that.data.dierji + "&cityname=未获取" 
    })
  },
  gozfzs(){
    var that = this
    wx.navigateTo({
      // url: '../syzfzs/index?yiji=' + that.data.diyiji + "&erji=" + that.data.dierji + "&cityname=" + that.data.city,
      url: '../syzfzs/index?yiji=' + that.data.diyiji + "&erji=" + that.data.dierji + "&cityname=未获取"
    })
  },
  yqyy:function(){
   wx.showToast({
     title: '暂未开通，敬请期待',
     mask:true,
     icon:'none',
     duration:1500,
   })
  },
  goqyxz(){
    var that = this
    wx.navigateTo({
      // url: '../qyxz/index?yiji=' + that.data.diyiji + "&erji=" + that.data.dierji + "&cityname=" + that.data.city,
      url: '../qyxz/index?yiji=' + that.data.diyiji + "&erji=" + that.data.dierji + "&cityname=未获取",
    })
  },
  goqyzc() {
    var that = this
    wx.navigateTo({
      // url: '../syqyzc/index?yiji=' + that.data.diyiji + "&erji=" + that.data.dierji + "&cityname=" + that.data.city,
      url:'../zcsqzq/index'
    })
  },
  gozsfw() {
    wx.navigateTo({
      url: '../zsfw/index',
    })
  },
  gozcyz(){
    wx.navigateTo({
      url: '../zcyz/index?city=' + this.data.city,
    })
  },
  // 去登录
  gologin(){
    // wx.navigateTo({
    //   url: '../login/index',
    // })
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
        let shuju = res.result.split('=')
        if (shuju[0]=='yqm'){
          wx.navigateTo({
            url: '../login/index?yqm=' + shuju[1],
          })
        }else{
          wx.showToast({
            title: '请扫描正确的二维码',
            mask: true,
            duration: 1500,
            icon: 'none'
          })
        }

      }
    })
  },
  // 去登录
  gologin2() {
    wx.navigateTo({
      url: '../xiugaixx/index',
    })
  },
  
  // qu服务
  gofuwu:function(){
    wx.navigateTo({
      url: '../projectsblist/index',
    })
  },
  // 项目
  goxiangmu:function(){
    wx.navigateTo({
      url: '../hotpro/index',
    })
  },
  gozaiti:function(){
    wx.navigateTo({
      url: '../zaiti/index',
    })
  },
  goquyu: function () {
    wx.navigateTo({
      url: '../quyu/index',
    })
  },
  // 轮播
  getbanner() {
    var that = this
    wx.request({
      url: that.data.href + 'api/House/Banner',
      method: 'POST',
      data: {},    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          banner: res.data.data
        })
      }

    })

  },
 
  golookxq: function (e) {
    var that = this
    let id = e.currentTarget.id
    let con = e.currentTarget.dataset.content
    let pic = e.currentTarget.dataset.image
    let index = e.currentTarget.dataset.index
    let content = that.data.tjlist
    wx.setStorageSync('quyu', content[index])
    wx.navigateTo({
      url: '../wangye/index?id=' + id + "&content=" + encodeURIComponent(con) + "&image=" + encodeURIComponent(pic),
    })
  },

  // 热门项目
  gethotxm(){
    var that = this
      wx.request({
        url: that.data.href + 'api/House/HotArea',
        method: 'POST',
        data: {

          // type: 1,
          page: that.data.page,
          number: 10,
        },    //参数为键值对字符串
        success: function (res) {
          console.log(res.data)
          let shuju = res.data.data
          for (let i = 0; i < shuju.length; i++) {
            if (shuju[i].imgurl.length > 0) {
              let a = shuju[i].imgurl.substring(0, shuju[i].imgurl.length - 1)
              shuju[i].imgurl = a.split('&')

            }
            shuju[i].fabutime = timestampToTime(shuju[i].fabutime.substring(6, 16))
            console.log(shuju[i].fabutime)
          }

          if (that.data.page > 1) {
            that.setData({
              tjlist: that.data.tjlist.concat(shuju)
            })
          } else {
            that.setData({
              tjlist: shuju
            })
          }
        }

      })
  },
   // 热门项目
  gethotxm2() {
    var that = this
    wx.request({
      url: that.data.href + 'api/House/GetClass',
      method: 'POST',
      data: {},    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
         
        })
      }

    })

  },
  goproxq(e){
    var that = this
  let id = e.currentTarget.id
  let index = e.currentTarget.dataset.index
  console.log(id)
    let shuju = that.data.hotpro
    wx.setStorageSync('hotpro', shuju[index])
  wx.navigateTo({
    url: '../xiangmxq/index?id='+id,
  })
  },
  gokopu: function () {
    wx.reLaunch({
      url: '../kopuhao/index',
    })
  },
  gozsq: function () {
    let user = wx.getStorageSync('userxq')
    if (user == '' || user == undefined || user == null) {
      wx.showToast({
        title: '请先登录',
        mask: true,
        duration: 1500,
        icon: 'none'
      })
      setTimeout(function(){
        wx.navigateTo({
          url: '../login/index',
        })
      },1500)
    }else{
      wx.reLaunch({
        url: '../zsqgz/index',
      })
    }
    
  },
  
  gomy: function () {
    let id = wx.getStorageSync('userid')
    if(id==''||id==undefined||id==null){
       wx.showToast({
         title: '请先登录',
         icon:'none',
         mask:true,
         duration:1500
       })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/index',
        })
      }, 1500)
    }else{
      wx.reLaunch({
        url: '../my/index',
      })
    }
    
  },
  golookxqlb: function (e) {
    let title = e.currentTarget.dataset.name
    let content = e.currentTarget.dataset.content
    let img = e.currentTarget.dataset.img
    wx.navigateTo({
      url: '../bannerxq/index?title=' + encodeURIComponent(title) + "&image=" + encodeURIComponent(img) + "&content=" + encodeURIComponent(content),
    })
  },
  gofabu: function (e) {
    var that = this
    let dizhi = e.currentTarget.dataset.dizhi
    console.log(222)
    wx.navigateTo({
      url: dizhi,
    })
    that.setData({
      tanisshow: 1
    })
  },

  tabshow: function () {
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
        // tanisshow: 2,
        tklxisshow:2
      })
    }
    
  },
  closetab: function () {
    var that = this
    that.setData({
      tanisshow: 1,
      tklxisshow: 1

    })
  },
  golookmore:function(){
    wx.navigateTo({
      url: '../syzsxm/index',
    })
  },
  choosecity:function(){
    var that = this
    wx.navigateTo({
      url: '../choosecs/index?city='+that.data.city,
    })
  },
  gohzfb:function(){
    var that = this
    // yuan来的合作发布
    // wx.navigateTo({
    //   url: '../hzjgfb/index'
    // })
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
    } else {
      wx.navigateTo({
        // url: '../demandfb/index'
        // url: '../hzjgfb/index'
        url:'../rule/index'
      })
    }
    
  },
  gozijinsq:function(){
    var that = this
    wx.navigateTo({
      url: '../zjsqzq/index'
    })
  },
  // 推荐点赞
  tjdainz: function (e) {
    let id = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    console.log(id)
    wx.request({
      url: that.data.href + 'api/zhaoshang/PraiseAdd',
      method: 'get',
      data: {
        id: id
      },    //参数为键值对字符串
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
         
            let tjlist = that.data.tjlist
            tjlist[index].like = res.data.data
            that.setData({
              tjlist: tjlist
            })
          
        }
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          mask: true,
          duration: 1500
        })

      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          mask: true,
          duration: 1500
        })
      }

    })
  },
  gozstk(){
    var that = this
    that.setData({
      tanisshow:1,
      tklxisshow:2
    })
  },
  goxmtk:function (e){

    var that = this
    that.setData({
      newfbid: e.currentTarget.id
    })
  },
  goxmtkfb:function(){
    var that =this
    wx.navigateTo({
      url: '../tklx/index?otherO=' + that.data.newfbid,
    })
   
    that.setData({
      tklxisshow: 1,
    })
  },
  
  gotkgz(){
    wx.navigateTo({
      url: '../guizhesm/index',
    })
  },
  goewm() {
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
    } else {
    wx.navigateTo({
      url: '../shareewm/index',
    })
    }
  },
  gonewzstk(){
    wx.navigateTo({
      url: '../rule/index',
    })
  },
  goqypd(){
    wx.navigateTo({
      url: '../qiyepd/index',
    })
  },
  goqyzs(){
    wx.navigateTo({
      url: '../qyzs/index',
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