
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    array: ['厂房', '园区', '土地', '办公'],
    index: 0,
    leixing: '请选择',
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
    yinc: 1,
    jlts: 0,
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
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          shengshi: res.data.data.Province,
        })
        that.jilian();
      }

    })
    let yuanshuju = wx.getStorageSync('xgsj')
    console.log(yuanshuju)
    that.setData({
      otherO: options.otherO,
      lxr: yuanshuju.people,
      phone: yuanshuju.phone,
      xqname: yuanshuju.name,
      xqms: yuanshuju.content,
      xmid: yuanshuju.id,
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
    this.setData({
      jlts: 0,
      yinc: 1,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      leixingid: e.detail.value,
      leixing: this.data.array[e.detail.value]
    })
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
          animationData: animation.export(),
          yinc: 0,
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
      jieguo: {},
      yinc: 1,
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
    console.log(that.data.jieguo)
    // var povinceId = that.data.shengshi[that.data.jieguo2[0]].areaId
    // var cityId = that.data.shengshi[that.data.jieguo2[0]].cities[that.data.jieguo2[1]].areaId
    // var areaId = that.data.shengshi[that.data.jieguo2[0]].cities[that.data.jieguo2[1]].counties[that.data.jieguo2[2]].areaId
    var povinceId = that.data.shengshi[that.data.jieguo2[0]].ID
    var cityId = ''
    var areaId = ''
    var dizhi = this.data.jieguo.sheng
    if (that.data.jieguo.shi != undefined) {
      dizhi = dizhi + '-' + this.data.jieguo.shi
      cityId = that.data.shengshi[that.data.jieguo2[0]].CityLise[that.data.jieguo2[1]].ID

    }
    if (that.data.jieguo.qu != undefined) {
      dizhi = dizhi + '-' + this.data.jieguo.qu
      areaId = that.data.shengshi[that.data.jieguo2[0]].CityLise[that.data.jieguo2[1]].DistrictLise[that.data.jieguo2[2]].ID
    }
    this.setData({
      dizhi: dizhi,
      animationData: animation.export(),
      povinceId: povinceId,
      cityId: cityId,
      areaId: areaId,
      yinc: 1,
    });

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
  hqxqname: function (e) {
    var that = this
    that.setData({
      xqname: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqlxr: function (e) {
    var that = this
    that.setData({
      lxr: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqphone: function (e) {
    var that = this
    that.setData({
      phone: e.detail.value.replace(/\s+/g, '')
    })
  },

  hqxqms: function (e) {
    var that = this
    that.setData({
      xqms: e.detail.value.replace(/\s+/g, '')
    })
  },
  submit: function () {
    var that = this
    let xqname = that.data.xqname
    let lxr = that.data.lxr.replace(/\s+/g, '')
    let phone = that.data.phone.replace(/\s+/g, '')
    let xqms = that.data.xqms
    let leixing = that.data.leixing
    let leixingid = parseInt(that.data.leixingid) + parseInt(1)
    let sheng = that.data.povinceId
    let shi = that.data.cityId
    let qu = that.data.areaId
    if (xqname == '' || xqname == undefined || xqname == null) {
      wx.showToast({
        title: '请填写需求名称',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (lxr == '' || lxr == undefined || lxr == null) {
      wx.showToast({
        title: '请填写联系人',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    let data = {
      id:that.data.xmid,
      userId: wx.getStorageSync('userid'),
      name: xqname,
      people: lxr,
      phone: phone,
    }
    if (phone == '' || phone == undefined || phone == null) {
      wx.showToast({
        title: '请填写联系电话',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (leixing == '请选择') {
      // wx.showToast({
      //   title: '请选择类型',
      //   icon: 'none',
      //   duration: 1000,
      //   mask: true
      // })
      // return
    } else {
      data.type = leixingid
    }
    if (that.data.dizhi == '请选择') {
      wx.showToast({
        title: '请选择区域',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    } 

      data.shengId = sheng
      data.shiId = shi
      data.quId = qu

    if (xqms == '' || xqms == undefined || xqms == null) {
      // wx.showToast({
      //   title: '请填写详情描述',
      //   icon: 'none',
      //   duration: 1000,
      //   mask: true
      // })
      // return
    } else {
      data.content = xqms
    }



    // data.address = xqdizhi
    wx.showLoading({
      title: '发布中...',
    })
    console.log(data)
    wx.request({
      url: that.data.href + 'api/User/DemandChange',
      method: 'get',
      data: data,    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        // 'content-type': 'application/x-www-form-urlencoded',
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == '200') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
          })
          let cjz = wx.getStorageSync('cjz')
          if (cjz == 1011 || cjz == 1047 || cjz == 1089 || cjz == 1038) {
            setTimeout(function () {
              that.setData({
                jlts: 1,
                yinc: 0,
              })
            }, 1500)
          } else {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 1000)
          }
          //  setTimeout(function(){
          //    wx.navigateBack({
          //      delta:1
          //    })
          //  },1000)
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000,
          })
        }
      }

    })
  },
  closejlts: function () {
    this.setData({
      jlts: 0
    })
    wx.navigateBack({
      delta: 3
    })
  },
})