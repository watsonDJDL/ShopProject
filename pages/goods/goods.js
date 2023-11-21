// pages/goods.js
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
      advertiseImages: images,
      cardItems: goodsInfo,
      swiperAutoplay: true,
      swiperInterval: 5000,
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    fetchData(() => {
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

  }
})

const images = [
  'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner1.png',
  'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner2.png',
  'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner3.png',
  'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner4.png',
  'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner5.png',
  'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner6.png',
];

const goodsInfo = [
  { text: 'Card 1', img: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png'},
  { text: 'Card 2', img: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08a.png'},
  { text: 'Card 3', img: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a.png'},
]

// 封装网络请求函数
function request(url, method, data, onSuccess) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        // 请求成功时，将数据传递给 resolve
        onSuccess();
        console.log("这里是res.data" + res.data)
        resolve(res.data);
      },
      fail: (err) => {
        // 请求失败时，将错误信息传递给 reject
        reject(err);
      }
    });
  });
}

// 使用封装的网络请求函数
async function fetchData(onSuccess) {
  try {
    const url = 'http://127.0.0.1:8000/onePiece';
    const method = 'GET';
    const data = { key1: 'value1', key2: 'value2' };

    // 发起网络请求并等待结果
    const result = await request(url, method, data, onSuccess);

    // 处理成功的情况
    console.log(result);
  } catch (error) {
    // 处理错误的情况
    console.error(error);
  }
}