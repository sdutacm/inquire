import { EnumApiStatus, EnumReport } from '../../enums/index';
import { contractCardBalance } from '../../contracts/card';
import { contractLibraryBorrow } from '../../contracts/library';
import { contractScore } from '../../contracts/score';
import { contractDormitoryEnergy, contractDormitoryHealth, contractDormitoryInfo } from '../../contracts/dormitory';
import storage from '../../utils/storage';
import pages from '../../configs/pages';
import { contractSchedule } from '../../contracts/schedule';
import { findNextPendingClass } from '../../utils/schedule';
import { getCurrentMoment } from '../../utils/util';
import { IMyApp } from '../../app';
import { formatAvailableUsage } from '../../utils/dormitory-energy';

const app = getApp<IMyApp>();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pages,
    status: {
      card: EnumApiStatus.fetching,
      library: EnumApiStatus.fetching,
      score: EnumApiStatus.fetching,
      dormitoryHealth: EnumApiStatus.fetching,
      dormitoryEnergy: EnumApiStatus.fetching,
      schedule: EnumApiStatus.fetching,
    },
    balance: undefined,
    borrowNum: undefined,
    score: undefined,
    dormitoryHealth: undefined,
    dormitoryHealthWeek: undefined,
    dormitoryEnergy: undefined,
    dormitoryEnergyAvailableUsage: undefined,
    schedule: undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(_query: { [queryKey: string]: string }) {
    this.fetchAll();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    try {
      await this.fetchAll();
    } catch (e) {
    } finally {
      wx.stopPullDownRefresh({});
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  onShareAppMessage() {
    return {
      title: '抽空查询',
      path: pages.home,
    };
  },

  async fetchCard() {
    this.setData!({
      'status.card': EnumApiStatus.fetching,
    });
    let success = false;
    try {
      const ret = await contractCardBalance(undefined, {
        autoError: 'none',
      });
      if (!ret.error) {
        success = true;
        this.setData!({
          balance: ret.data.balance,
          'status.card': EnumApiStatus.success,
        });
      }
    } catch (e) {
    } finally {
      if (!success) {
        this.setData!({
          'status.card': EnumApiStatus.fail,
        });
        wx.reportMonitor(EnumReport.cardBalanceFail, 1);
      }
    }
  },

  async fetchLibrary() {
    this.setData!({
      'status.library': EnumApiStatus.fetching,
    });
    let success = false;
    try {
      const ret = await contractLibraryBorrow(undefined, {
        autoError: 'none',
      });
      if (!ret.error) {
        success = true;
        this.setData!({
          borrowNum: ret.data.info.length,
          'status.library': EnumApiStatus.success,
        });
        app.globalData.resp.libraryBorrow = ret.data;
      }
    } catch (e) {
    } finally {
      if (!success) {
        this.setData!({
          'status.library': EnumApiStatus.fail,
        });
        app.globalData.resp.libraryBorrow = null;
        wx.reportMonitor(EnumReport.libraryBorrowFail, 1);
      }
    }
  },

  async fetchScore() {
    this.setData!({
      'status.score': EnumApiStatus.fetching,
    });
    let success = false;
    try {
      const ret = await contractScore(undefined, {
        autoError: 'none',
      });
      if (!ret.error) {
        success = true;
        this.setData!({
          score: ret.data.grade,
          'status.score': EnumApiStatus.success,
        });
        app.globalData.resp.score = ret.data;
      }
    } catch (e) {
    } finally {
      if (!success) {
        this.setData!({
          'status.score': EnumApiStatus.fail,
        });
        app.globalData.resp.score = null;
        wx.reportMonitor(EnumReport.scoreFail, 1);
      }
    }
  },

  async fetchDormitoryHealth() {
    this.setData!({
      'status.dormitoryHealth': EnumApiStatus.fetching,
    });
    let success = false;
    try {
      const ret = await contractDormitoryHealth(undefined, {
        autoError: 'none',
      });
      if (!ret.error) {
        success = true;
        this.setData!({
          dormitoryHealth: ret.data[0] ? ret.data[0].score : null,
          dormitoryHealthWeek: ret.data[0] ? ret.data[0].week : null,
          'status.dormitoryHealth': EnumApiStatus.success,
        });
        app.globalData.resp.dormitoryHealth = ret.data;
      }
    } catch (e) {
    } finally {
      if (!success) {
        this.setData!({
          'status.dormitoryHealth': EnumApiStatus.fail,
        });
        app.globalData.resp.dormitoryHealth = null;
        wx.reportMonitor(EnumReport.dormitoryHealthFail, 1);
      }
    }
  },

  async fetchDormitoryEnergy() {
    this.setData!({
      'status.dormitoryEnergy': EnumApiStatus.fetching,
    });
    let success = false;
    try {
      const userInfo = await storage.getUserInfo();
      if (userInfo) {
        const { floor, room } = userInfo;
        const ret = await contractDormitoryEnergy({ floor, room }, {
          autoError: 'none',
        });
        if (!ret.error) {
          success = true;
          this.setData!({
            dormitoryEnergy: ret.data.energy,
            dormitoryEnergyAvailableUsage: formatAvailableUsage(ret.data.lower, ret.data.upper),
            'status.dormitoryEnergy': EnumApiStatus.success,
          });
          app.globalData.resp.dormitoryEnergy = ret.data;
        }
      }
    } catch (e) {
    } finally {
      if (!success) {
        this.setData!({
          'status.dormitoryEnergy': EnumApiStatus.fail,
        });
        app.globalData.resp.dormitoryEnergy = null;
        wx.reportMonitor(EnumReport.dormitoryEnergyFail, 1);
      }
    }
  },

  async fetchSchedule() {
    this.setData!({
      'status.schedule': EnumApiStatus.fetching,
    });
    let success = false;
    try {
      const ret = await contractSchedule(undefined, {
        autoError: 'none',
      });
      console.warn(ret);
      if (!ret.error) {
        success = true;
        const nextClass = findNextPendingClass(ret.data.currentWeek, ret.data.schedule);
        let nc: any = null;
        if (nextClass) {
          nc = {
            durationOfClassList: nextClass.durationOfClassList,
            durationOfWeekList: nextClass.durationOfWeekList,
            classroom: nextClass.classroom,
            className: nextClass.className,
            dayOfWeek: nextClass._dayOfWeek,
            teacherName: nextClass.teacherName,
            beginAfter: nextClass.beginMoment.from(getCurrentMoment(), true),
            beginAt: nextClass.beginMoment.format('ddd HH:mm'),
          };
        }
        this.setData!({
          schedule: nc,
          'status.schedule': EnumApiStatus.success,
        });
        app.globalData.resp.schedule = ret.data;
      }
    } catch (e) {
    } finally {
      if (!success) {
        this.setData!({
          'status.schedule': EnumApiStatus.fail,
        });
        app.globalData.resp.schedule = null;
        wx.reportMonitor(EnumReport.scheduleFail, 1);
      }
    }
  },

  fetchAll() {
    console.log('fetchAll');
    return Promise.all([
      this.fetchCard(),
      this.fetchLibrary(),
      this.fetchScore(),
      this.fetchDormitoryHealth(),
      // this.fetchDormitoryEnergy(),
      this.fetchSchedule(),
    ]);
  },

  logout() {
    try {
      wx.clearStorageSync();
    } catch (e) {
      console.error(e);
    }
    wx.redirectTo({ url: pages.login });
  },

  toAbout() {
    wx.navigateTo({ url: pages.about });
  },
});
