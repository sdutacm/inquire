Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(_query: { [queryKey: string]: string }) {

  },

  onTapLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.clipboard,
    });
  },
});
