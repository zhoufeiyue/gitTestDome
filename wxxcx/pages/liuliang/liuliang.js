// pages/liuliang/liuliang.js
var that;
Page({
  data: {
    selected: true,
    selected1: false,
    selected2: false,
    hiddenModal: true,
    tellenght:false,
    attribution: null,
    goods:null,
    clickid:null,
    changegood:null,
    title:"",
    cheackone:false,
    cheacktow:false,
    showcheack:false
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false
    })
  },
  selected2:function(){
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  valueChange:function(e){
    var _value = e.detail.value.replace(/\s/gi, '\n')
    if (_value.length == 11) {
      that = this
      var phone = _value;
      if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        this.setData({
          title:"输入号码不合法！",
          hiddenModal: !this.data.hiddenModal
        });
        setTimeout(function(){
          that.setData({
            hiddenModal: !that.data.hiddenModal
          });
        },1500)
      } else {
          getApp().data.telphone = phone 
          this.checkboxChange(e)
          
      }
    } else {
      // 不满足11位价格隐藏
      this.setData({
         tellenght:false,
         changegood:null,
         clickid:null,
         showcheack:false,
         cheackone:false,
         cheacktow:false,
      })
    }

  },
  checkboxChange:function(e){
    this.setData({
       cheackone:true,
       clickid:null,
       changegood:null,
       showcheack:true
      })
     this.getDatainfo(that,"0") 
  },
  checkboxChangeone:function(){
     this.setData({
       cheackone:true,
       cheacktow:false,
       clickid:null,
       changegood:null
      })
     this.getDatainfo(that,"0") 
  },
  checkboxChangetow:function(){
     this.setData({
       cheackone:false,
       cheacktow:true,
       clickid:null,
       changegood:null
      })
    this.getDatainfo(that,"1") 
  },
  getDatainfo: function (that,result){
    wx.request({
      url: 'http://139.196.220.188:9090/jinli/goods', //仅为示例，并非真实的接口地址
      method: "post",
      data: {
        phone: getApp().data.telphone
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(result=="0"){
            that.setData({
               attribution: res.data.attribution,
               goods: res.data.goods,
               tellenght: true
              });
        }else if(result=="1"){
             that.setData({
                attribution: res.data.attribution,
                goods: res.data.goods_local,
                tellenght: true
              });
        }
      }
    })
  },
  // 点击支付事件
  nowpay:function(){
    if(this.data.changegood){
      // 进行支付处
       console.log(this.data.changegood)
       console.log(getApp().data.telphone)
      }
    else{
      this.setData({
          title:"请选择要购买的流量包",
          hiddenModal: !this.data.hiddenModal
        });
        setTimeout(function(){
          that.setData({
            hiddenModal: !that.data.hiddenModal
          });
        },1500)
    }
  },
  clickinfo:function(e){
    this.setData({
            clickid:e.currentTarget.id,
            changegood:this.data.goods[e.currentTarget.id]
          });
  }
})