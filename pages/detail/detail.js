// pages/detail.js

const utils = require('../../utils/util.js');
Page({

  /**
   * Page initial data
   */
  data: {
    goodDetailInfo: {
      des: "商品详情", 
      name: "商品名称",
      imgs:[],
      originPrice: 0,
      price: 9.9,
    },
    goodId : 0,
    swiperAutoplay: true,
    swiperDuration: '500',
    swiperInterval: 5000,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const goodId = options.goodId;
    this.setData({goodId: goodId})
    console.log('goodId:', goodId);
    if (goodId != null && goodId != "") {
      fetchData(goodId, (data) => {
        this.setData({
          goodDetailInfo: data,
        });
        this.init();
      });
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {
    // 自定义的返回信息
    // const { selectedAttrStr } = this.data;
    const customInfo = {
      imageUrl: this.data.goodDetailInfo.imgs[0],
      title: "编号" + this.data.goodId +  " -" +this.data.goodDetailInfo.name,
      path: `/pages/detail/detail?goodId=${this.data.goodId}`,
    };
    return customInfo;
  },

  handleBackHome: function(event) {
    wx.navigateBack({
      delta: 1, // 返回的页面数，1 表示返回上一页，2 表示返回上两页，以此类推
    })
  }
})

// 使用封装的网络请求函数
async function fetchData(goodId, onSuccess) {
  try {
    const url = 'https://yulan.work:8000/goodDetail';
    const method = 'GET';
    const data = { goodId: goodId};

    // 发起网络请求并等待结果
    const result = await utils.request(url, method, data, onSuccess);

    // 处理成功的情况
    console.log(result);
  } catch (error) {
    // 处理错误的情况
    console.error(error);
  }
}