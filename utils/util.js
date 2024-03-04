const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 封装网络请求函数
function request(url, method, data, onSuccess) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        // 请求成功时，将数据传递给 resolve
        onSuccess(res.data);
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

module.exports = {
  formatTime,
  request: request,
}
