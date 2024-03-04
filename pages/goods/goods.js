// pages/goods.js

const utils = require('../../utils/util.js');

Page({

  /**
   * Page initial data
   */
  data: {
    advertiseImages: [],
    swiperCurrent: 1,
    swiperAutoplay: false,
    swiperDuration: '500',
    swiperInterval: 5000,
    swiperNavigation: { type: 'dots' },
    swiperImageProps: { mode: 'scaleToFill' },
    cardItems: [],
  },

  init() {
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
      //advertiseImages: images,
      swiperAutoplay: true,
      swiperInterval: 5000,
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    fetchData((data) => {
      this.setData({
        cardItems: data
      });
      this.init();
    });
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
    console.log("advertiseImages 是：" + this.advertiseImages);
    console.log("swiper duration 是：" + this.swiperDuration);
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
    this.init();
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

  },

  handleCardTap: function(event) {
    const good_id = event.currentTarget.dataset.goodid;
    wx.navigateTo({
      url: '../detail/detail?goodId=' + good_id
    })
  }
})

// 使用封装的网络请求函数
async function fetchData(onSuccess) {
  try {
    const url = 'https://yulan.work:8000/goods';
    const method = 'GET';
    const data = { key1: 'value1', key2: 'value2' };

    // 发起网络请求并等待结果
    const result = await utils.request(url, method, data, onSuccess);

    // 处理成功的情况
    console.log(result);
  } catch (error) {
    // 处理错误的情况
    console.error(error);
  }
}