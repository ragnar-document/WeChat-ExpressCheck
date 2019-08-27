//logs.js

Page({
  data:{
    order_id:'',
    detailList:[],
    toastText:"加载中",
    expName: '',
    company: '',
  },
  onLoad: function(options){
    let order_id = options.order_id;
    let company = options.company;
    console.log(company)
    order_id && this.getData(order_id);
  },
  getData: function(order_id){
    let url = 'https://wuliu.market.alicloudapi.com/kdi';
    let company = this.data.company;
    wx.request({
      header:{
        "Authorization": "APPCODE 982c2dffc21b4b04a04aa6e88616848c"
      },
      url: url,
      data: {
        type: company,
        no: order_id
      },
      success:(res)=>{
        if(res.data.status == 0){
          this.setData({
            detailList:res.data.result.list,
            order_id:order_id,
            expName:res.data.result.expName
          })
        }else{
          this.setData({
            toastText:res.data.msg
          })
        }
      },
      fail: (err) => {
        console.log(err)
        this.setData({
          toastText: '网络发生错误'
        })
      }
    })
  }
})
