var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    array: ['办公', '厂房', '商铺', '土地'],
    yuanarray: [],
    arrayid: '',
    leixing: '类型',
    sheng: [],//获取到的所有的省
    shi: [],//选择的该省的所有市
    qu: [],//选择的该市的所有区县
    sheng_index: 0,//picker-view省项选择的value值
    shi_index: 0,//picker-view市项选择的value值
    qu_index: 0,//picker-view区县项选择的value值
    shengshi: null,//取到该数据的所有省市区数据
    jieguo: {},//最后取到的省市区名字
    animationData: {},
    jieguo2: [0, 0, 0],
    dizhi: '请选择',
    quyu: '区域',
    search: '',
    page: 1,
    povinceId: '',
    cityId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        that.jilian();
      }

    })
    // that.gethotxm()
    // that.getxmtype()
    that.getlist()
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
    that.gethotxm()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 热门项目
  // gethotxm() {
  //   var that = this
  //   let data = {
  //     page: that.data.page,
  //     number: 10,
  //   }
  //   if (that.data.search != '' && that.data.search != undefined && that.data.search != null) {
  //     data.ptitle = that.data.search
  //   }
  //   if (that.data.povinceId != '' && that.data.povinceId != undefined && that.data.povinceId != null) {
  //     data.sid = that.data.povinceId
  //     data.cid = that.data.cityId
  //   }
  //   if (that.data.leixing != '类型') {
  //     data.hangyeid = that.data.yuanarray[that.data.index].id
  //   }
  //   console.log(data)
  //   wx.request({
  //     url: that.data.href + 'api/User/UserXMSBList',
  //     method: 'POST',
  //     data: data,    //参数为键值对字符串

  //     success: function (res) {
  //       console.log(res.data)
  //       let shuju = res.data.data
  //       for (let i = 0; i < shuju.length; i++) {
  //         let img = shuju[i].pimage.split('&')
  //         shuju[i].pimage = img[0]
  //       }
  //       if (that.data.page > 1) {
  //         that.setData({
  //           hotlist: that.data.hotlist.concat(shuju)
  //         })
  //       } else {
  //         that.setData({
  //           hotlist: shuju
  //         })
  //       }
  //     }

  //   })
  // },
  getlist() {
    var that = this
    wx.request({
      url: that.data.href + 'api/User/UserXMSBList',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userid'),
        page: that.data.page,
        number: 10
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        for (let i = 0; i < shuju.length; i++) {
          let img = shuju[i].img.split('&')
          shuju[i].img = img[0]
        }
        if (that.data.page > 1) {
          that.setData({
            list: that.data.hotlist.concat(shuju)
          })
        } else {
          that.setData({
            list: shuju
          })
        }
      }

    })
  },
  goss: function (e) {
    var that = this
    let search = e.detail.value
    that.setData({
      search: search,
      page: 1
    })
    that.gethotxm()
  },
  goproxq(e) {
    var that = this
    let id = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    console.log(id)
    let shuju = that.data.hotlist
    wx.setStorageSync('hotpro', shuju[index])
    wx.navigateTo({
      url: '../xiangmxq/index?id=' + id,
    })
  },
  // getxmtype() {
  //   var that = this
  //   wx.request({
  //     url: that.data.href + 'api/Project/ProjectType',
  //     method: 'POST',
  //     data: {

  //     },    //参数为键值对字符串

  //     success: function (res) {
  //       console.log(res.data)
  //       if (res.data.code == 200) {
  //         let shuju = res.data.data
  //         let array = []
  //         for (let i = 0; i < shuju.length; i++) {
  //           array.push(shuju[i].name)
  //         }
  //         that.setData({
  //           yuanarray: shuju,
  //           array: array
  //         })
  //       }

  //     }

  //   })
  // },
  bindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      index: e.detail.value,
      leixing: that.data.array[e.detail.value]
    })
    that.gethotxm()
  },
  //点击事件，点击弹出选择页
  dianji: function () {
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
          animationData: animation.export()
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
    // var povinceId = that.data.shengshi[that.data.jieguo2[0]].areaId
    // var cityId = that.data.shengshi[that.data.jieguo2[0]].cities[that.data.jieguo2[1]].areaId
    // var areaId = that.data.shengshi[that.data.jieguo2[0]].cities[that.data.jieguo2[1]].counties[that.data.jieguo2[2]].areaId
    var povinceId = that.data.shengshi[that.data.jieguo2[0]].ID
    var cityId = ''
    var areaId = ''
    var dizhi = this.data.jieguo.sheng
    if (that.data.jieguo.shi != undefined) {
      dizhi = dizhi + '-' + this.data.jieguo.shi
      // cityId = that.data.shengshi[that.data.jieguo2[0]].CityLise[that.data.jieguo2[1]].ID

    }
    if (that.data.jieguo.qu != undefined) {
      dizhi = dizhi + '-' + this.data.jieguo.qu
      // areaId = that.data.shengshi[that.data.jieguo2[0]].CityLise[that.data.jieguo2[1]].DistrictLise[that.data.jieguo2[2]].ID
    }
    this.setData({
      dizhi: dizhi,
      animationData: animation.export(),
      povinceId: povinceId,
      cityId: cityId,
      areaId: areaId,
      quyu: this.data.jieguo.shi,
      page: 1,
    });

    that.gethotxm()

    //打印最后选取的结果
    console.log(this.data.jieguo.sheng);
    console.log(povinceId);
    console.log(cityId);

    console.log(areaId);
    console.log(this.data.jieguo2);
  },
  //滚动选择的时候触发事件
  bindChange: function (e) {
    //这里是获取picker-view内的picker-view-column 当前选择的是第几项
    console.log(e.detail.value)
    const val = e.detail.value
    this.setData({
      sheng_index: val[0],
      shi_index: val[1],
      qu_index: val[2],
      jieguo2: e.detail.value
    })
    this.jilian();
    console.log(val);

    console.log(this.data.jieguo);
  },
  //这里是判断省市名称的显示
  jilian: function () {
    var that = this,
      shengshi = that.data.shengshi,
      sheng = [],
      shi = [],
      qu = [],
      qu_index = that.data.qu_index,
      shi_index = that.data.shi_index,
      sheng_index = that.data.sheng_index;
    //遍历所有的省，将省的名字存到sheng这个数组中
    for (let i = 0; i < shengshi.length; i++) {
      sheng.push(shengshi[i].ProvinceName)
    }
    console.log(shengshi[sheng_index])
    if (shengshi[sheng_index].CityLise) {//这里判断这个省级里面有没有市（如数据中的香港、澳门等就没有写市）
      if (shengshi[sheng_index].CityLise[shi_index]) {//这里是判断这个选择的省里面，有没有相应的下标为shi_index的市，因为这里的下标是前一次选择后的下标，比如之前选择的一个省有10个市，我刚好滑到了第十个市，现在又重新选择了省，但是这个省最多只有5个市，但是这时候的shi_index为9，而这里的市根本没有那么多，所以会报错
        //这里如果有这个市，那么把选中的这个省中的所有的市的名字保存到shi这个数组中
        for (let i = 0; i < shengshi[sheng_index].CityLise.length; i++) {
          shi.push(shengshi[sheng_index].CityLise[i].CityName);
        }
        console.log('执行了区级判断');

        if (shengshi[sheng_index].CityLise[shi_index].DistrictLise) {//这里是判断选择的这个市在数据里面有没有区县
          if (shengshi[sheng_index].CityLise[shi_index].DistrictLise[qu_index]) {//这里是判断选择的这个市里有没有下标为qu_index的区县，道理同上面市的选择
            console.log('这里判断有没有进区里');
            //有的话，把选择的这个市里面的所有的区县名字保存到qu这个数组中
            for (let i = 0; i < shengshi[sheng_index].CityLise[shi_index].DistrictLise.length; i++) {
              console.log('这里是写区得');
              qu.push(shengshi[sheng_index].CityLise[shi_index].DistrictLise[i].DistrictName);
            }
          } else {
            //这里和选择市的道理一样
            that.setData({
              qu_index: 0
            });
            for (let i = 0; i < shengshi[sheng_index].CityLise[shi_index].DistrictLise.length; i++) {
              qu.push(shengshi[sheng_index].CityLise[shi_index].DistrictLise[i].DistrictName);
            }
          }
        } else {
          //如果这个市里面没有区县，那么把这个市的名字就赋值给qu这个数组
          qu.push(shengshi[sheng_index].CityLise[shi_index].CityName);
        }
      } else {
        //如果选择的省里面没有下标为shi_index的市，那么把这个下标的值赋值为0；然后再把选中的该省的所有的市的名字放到shi这个数组中
        that.setData({
          shi_index: 0
        });
        for (let i = 0; i < shengshi[sheng_index].CityLise.length; i++) {
          shi.push(shengshi[sheng_index].CityLise[i].CityName);
        }

      }
    } else {
      //如果该省级没有市，那么就把省的名字作为市和区的名字
      shi.push(shengshi[sheng_index].ProvinceName);
      qu.push(shengshi[sheng_index].ProvinceName);
    }
    //选择成功后把相应的数组赋值给相应的变量

    //有时候网络慢，会出现区县选择出现空白，这里是如果出现空白那么执行一次回调
    console.log(sheng.length)
    if (sheng.length == 0 && shi.length == 0 && qu.length == 0) {
      that.jilian();
      console.log('这里执行了回调');
      // console.log();
    }
    console.log(sheng[that.data.sheng_index]);
    console.log(shi[that.data.shi_index]);
    console.log(qu[that.data.qu_index]);
    //把选择的省市区都放到jieguo中
    let jieguo = {
      sheng: sheng[that.data.sheng_index],
      shi: shi[that.data.shi_index],
      qu: qu[that.data.qu_index]
    };
    console.log(sheng)
    that.setData({
      jieguo: jieguo,
      sheng: sheng,
      shi: shi,
      qu: qu
    });

  },
  longTa: function (e) {
    var that = this
    wx.showModal({　　　　//这个不用多说，做过小程序都看得懂
      title: '提示',
      content: '确认删除该记录吗？',
      success: function (res) {
        if (res.confirm) {
          let id = e.currentTarget.id
          wx.showLoading({
            title: '删除中...',
          })
          wx.request({
            url: that.data.href + 'api/ZSFW/XmsbDel',
            method: 'post',
            data: {
              id: id,

            },    //参数为键值对字符串

            success: function (res2) {
              wx.hideLoading()
              console.log(res2.data)
              if (res2.data.code == 200) {
                wx.request({
                  url: that.data.href + 'api/User/UserXMSBList',
                  method: 'POST',
                  data: {
                    userId: wx.getStorageSync('userid'),
                    page: 1,
                    number: 10,
                  },    //参数为键值对字符串
                  success: function (res) {
                    console.log(res.data)
                    let shuju = res.data.data
                    for (let i = 0; i < shuju.length; i++) {
                      let img = shuju[i].img.split('&')
                      shuju[i].img = img[0]
                    }
                    that.setData({
                      list: shuju,
                      page: 1
                    })

                  }

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
  },
  goxiugai: function (e) {
    var that = this
    let index = e.currentTarget.dataset.index
    let shuju = that.data.list
    wx.setStorageSync('xgsj', shuju[index])
    wx.navigateTo({
      url: '../hzglxg/index',
    })
  }
})