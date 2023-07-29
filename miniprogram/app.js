// app.js
App({
  onShow: function () {
    const timestamp = new Date().getTime();
    const records = wx.getStorageSync('records') || [];
    records.push(timestamp);
    wx.setStorageSync('records', records);
  },
});
