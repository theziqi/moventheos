var wxCharts = require('../../dist/wxcharts.js');
var app = getApp();
var columnChart = null;

import * as echarts from '../../ec-canvas/echarts';
var util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    over: 0,
    time:'',
    rDay:'',
    userData: {},
    userGrade: {
      lu:null,
      l: null,
      c: null,
      d: null,
      e: null,
      f: null,
      bmi: null,
      all: null
    },
    us: {},
    swtichData: [],
    ec: {
      lazyLoad: true
    }
  },

  dateSub () {
    var start_date = new Date(this.data.time.replace(/-/g, "/"));
    var end_date = new Date(this.data.userData.ed.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    if (day > 0) {
      this.setData({
        rDay: day
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '体测日期已过',
      })
      this.onShow()
    }
  },

  toPlan(){
    wx.redirectTo({
      url: '/pages/plan/index',
    })
  },

  grade0() {
    var userData = this.data.userData;
    var userGrade = this.data.userGrade;
    var bmi = userData.we / ( 0.0001 * userData.he * userData.he);

    if (bmi <= 23.9 & bmi >= 17.9) {
      userGrade.bmi = 100;
    } else if (bmi >= 28.0) {
      userGrade.bmi = 60;
    } else {
      userGrade.bmi = 80;
    } 

    if (userData.l[0] > 6 || (userData.l[0] == 6 && userData.l[1] > 12)) {
      userGrade.l = 0;
    } else if (userData.l[0] == 5 && userData.l[1] > 52) {
      userGrade.l = 10;
    } else if (userData.l[0] == 5 && userData.l[1] > 32) {
      userGrade.l = 20;
    } else if (userData.l[0] == 5 && userData.l[1] > 12) {
      userGrade.l = 30;
    } else if (userData.l[0] == 4 && userData.l[1] > 52) {
      userGrade.l = 40;
    } else if (userData.l[0] == 4 && userData.l[1] > 32) {
      userGrade.l = 50;
    } else if (userData.l[0] == 4 && userData.l[1] > 27) {
      userGrade.l = 60;
    } else if (userData.l[0] == 4 && userData.l[1] > 22) {
      userGrade.l = 62;
    } else if (userData.l[0] == 4 && userData.l[1] > 17) {
      userGrade.l = 64;
    } else if (userData.l[0] == 4 && userData.l[1] > 12) {
      userGrade.l = 66;
    } else if (userData.l[0] == 4 && userData.l[1] > 7) {
      userGrade.l = 68;
    } else if (userData.l[0] == 4 && userData.l[1] > 2) {
      userGrade.l = 70;
    } else if (userData.l[0] == 3 && userData.l[1] > 57) {
      userGrade.l = 72;
    } else if (userData.l[0] == 3 && userData.l[1] > 52) {
      userGrade.l = 74;
    } else if (userData.l[0] == 3 && userData.l[1] > 47) {
      userGrade.l = 76;
    } else if (userData.l[0] == 3 && userData.l[1] > 42) {
      userGrade.l = 78;
    } else if (userData.l[0] == 3 && userData.l[1] > 34) {
      userGrade.l = 80;
    } else if (userData.l[0] == 3 && userData.l[1] > 27) {
      userGrade.l = 85;
    } else if (userData.l[0] == 3 && userData.l[1] > 22) {
      userGrade.l = 90;
    } else if (userData.l[0] == 3 && userData.l[1] > 17) {
      userGrade.l = 95;
    } else if (userData.l[0] < 3 || (userData.l[0] == 3 && userData.l[1] <= 17)) {
      userGrade.l = 100;
    }

    if (userData.c < 5) {
      userGrade.c = 0;
    } else if (userData.c < 6) {
      userGrade.c = 10;
    } else if (userData.c < 7) {
      userGrade.c = 20;
    } else if (userData.c < 8) {
      userGrade.c = 30;
    } else if (userData.c < 9) {
      userGrade.c = 40;
    } else if (userData.c < 10) {
      userGrade.c = 50;
    } else if (userData.c < 11) {
      userGrade.c = 60;
    } else if (userData.c < 12) {
      userGrade.c = 64;
    } else if (userData.c < 13) {
      userGrade.c = 68;
    } else if (userData.c < 14) {
      userGrade.c = 72;
    } else if (userData.c < 15) {
      userGrade.c = 76;
    } else if (userData.c < 16) {
      userGrade.c = 80;
    } else if (userData.c < 17) {
      userGrade.c = 85;
    } else if (userData.c < 18) {
      userGrade.c = 90;
    } else if (userData.c < 19) {
      userGrade.c = 95;
    } else if (userData.c >= 19) {
      userGrade.c = 100;
    }

    if (userData.d < 183) {
      userGrade.d = 0;
    } else if (userData.d < 188) {
      userGrade.d = 10;
    } else if (userData.d < 193) {
      userGrade.d = 20;
    } else if (userData.d < 198) {
      userGrade.d = 30;
    } else if (userData.d < 203) {
      userGrade.d = 40;
    } else if (userData.d < 208) {
      userGrade.d = 50;
    } else if (userData.d < 212) {
      userGrade.d = 60;
    } else if (userData.d < 216) {
      userGrade.d = 62;
    } else if (userData.d < 220) {
      userGrade.d = 64;
    } else if (userData.d < 224) {
      userGrade.d = 66;
    } else if (userData.d < 228) {
      userGrade.d = 68;
    } else if (userData.d < 232) {
      userGrade.d = 70;
    } else if (userData.d < 236) {
      userGrade.d = 72;
    } else if (userData.d < 240) {
      userGrade.d = 74;
    } else if (userData.d < 244) {
      userGrade.d = 76;
    } else if (userData.d < 248) {
      userGrade.d = 78;
    } else if (userData.d < 256) {
      userGrade.d = 80;
    } else if (userData.d < 263) {
      userGrade.d = 85;
    } else if (userData.d < 268) {
      userGrade.d = 90;
    } else if (userData.d < 273) {
      userGrade.d = 95;
    } else if (userData.d >= 273) {
      userGrade.d = 100;
    }

    if (userData.e < -1.3) {
      userGrade.e = 0;
    } else if (userData.e < -0.3) {
      userGrade.e = 10;
    } else if (userData.e < 0.7) {
      userGrade.e = 20;
    } else if (userData.e < 1.7) {
      userGrade.e = 30;
    } else if (userData.e < 2.7) {
      userGrade.e = 40;
    } else if (userData.e < 3.7) {
      userGrade.e = 50;
    } else if (userData.e < 5.1) {
      userGrade.e = 60;
    } else if (userData.e < 6.5) {
      userGrade.e = 62;
    } else if (userData.e < 7.9) {
      userGrade.e = 64;
    } else if (userData.e < 9.3) {
      userGrade.e = 66;
    } else if (userData.e < 10.7) {
      userGrade.e = 68;
    } else if (userData.e < 12.1) {
      userGrade.e = 70;
    } else if (userData.e < 13.5) {
      userGrade.e = 72;
    } else if (userData.e < 14.9) {
      userGrade.e = 74;
    } else if (userData.e < 16.3) {
      userGrade.e = 76;
    } else if (userData.e < 17.7) {
      userGrade.e = 78;
    } else if (userData.e < 19.5) {
      userGrade.e = 80;
    } else if (userData.e < 21.3) {
      userGrade.e = 85;
    } else if (userData.e < 23.1) {
      userGrade.e = 90;
    } else if (userData.e < 24.9) {
      userGrade.e = 95;
    } else if (userData.e >= 24.9) {
      userGrade.e = 100;
    }

    if (userData.f > 10.1) {
      userGrade.f = 0;
    } else if (userData.f > 9.9) {
      userGrade.f = 10;
    } else if (userData.f > 9.7) {
      userGrade.f = 20;
    } else if (userData.f > 9.5) {
      userGrade.f = 30;
    } else if (userData.f > 9.3) {
      userGrade.f = 40;
    } else if (userData.f > 9.1) {
      userGrade.f = 50;
    } else if (userData.f > 8.9) {
      userGrade.f = 60;
    } else if (userData.f > 8.7) {
      userGrade.f = 62;
    } else if (userData.f > 8.5) {
      userGrade.f = 64;
    } else if (userData.f > 8.3) {
      userGrade.f = 66;
    } else if (userData.f > 8.1) {
      userGrade.f = 68;
    } else if (userData.f > 7.9) {
      userGrade.f = 70;
    } else if (userData.f > 7.7) {
      userGrade.f = 72;
    } else if (userData.f > 7.5) {
      userGrade.f = 74;
    } else if (userData.f > 7.3) {
      userGrade.f = 76;
    } else if (userData.f > 7.1) {
      userGrade.f = 78;
    } else if (userData.f > 7.0) {
      userGrade.f = 80;
    } else if (userData.f > 6.9) {
      userGrade.f = 85;
    } else if (userData.f > 6.8) {
      userGrade.f = 90;
    } else if (userData.f > 6.7) {
      userGrade.f = 95;
    } else if (userData.f <= 6.7) {
      userGrade.f = 100;
    }

    if (userData.lu < 2300) {
      userGrade.lu = 0;
    } else if (userData.lu < 2460) {
      userGrade.lu = 10;
    } else if (userData.lu < 2620) {
      userGrade.lu = 20;
    } else if (userData.lu < 2780) {
      userGrade.lu = 30;
    } else if (userData.lu < 2940) {
      userGrade.lu = 40;
    } else if (userData.lu < 3100) {
      userGrade.lu = 50;
    } else if (userData.lu < 3220) {
      userGrade.lu = 60;
    } else if (userData.lu < 3340) {
      userGrade.lu = 62;
    } else if (userData.lu < 3460) {
      userGrade.lu = 64;
    } else if (userData.lu < 3580) {
      userGrade.lu = 66;
    } else if (userData.lu < 3700) {
      userGrade.lu = 68;
    } else if (userData.lu < 3820) {
      userGrade.lu = 70;
    } else if (userData.lu < 3940) {
      userGrade.lu = 72;
    } else if (userData.lu < 4060) {
      userGrade.lu = 74;
    } else if (userData.lu < 4180) {
      userGrade.lu = 76;
    } else if (userData.lu < 4300) {
      userGrade.lu = 78;
    } else if (userData.lu < 4550) {
      userGrade.lu = 80;
    } else if (userData.lu < 4800) {
      userGrade.lu = 85;
    } else if (userData.lu < 4920) {
      userGrade.lu = 90;
    } else if (userData.lu < 5040) {
      userGrade.lu = 95;
    } else if (userData.lu >= 5040) {
      userGrade.lu = 100;
    }

    this.setData({
      userGrade: {
        all: 0.2 * userGrade.f + 0.1 * userGrade.e + 0.1 * userGrade.d + 0.1 * userGrade.c + 0.2 * userGrade.l + 0.15 * userGrade.lu + 0.15 * userGrade.bmi,
        lu: userGrade.lu,
        l: userGrade.l,
        c: userGrade.c,
        d: userGrade.d,
        e: userGrade.e,
        f: userGrade.f,
        bmi: userGrade.bmi,
      }
    });
  },

  grade1() {
    var userData = this.data.userData;
    var userGrade = this.data.userGrade;
    var bmi = userData.we / (0.0001 * userData.he * userData.he);

    if (bmi <= 23.9 & bmi >= 17.2) {
      userGrade.bmi = 100;
    } else if (bmi >= 28.0) {
      userGrade.bmi = 60;
    } else {
      userGrade.bmi = 80;
    } 

    if (userData.l[0] > 5 || (userData.l[0] == 5 && userData.l[1] > 24)) {
      userGrade.l = 0;
    } else if (userData.l[0] == 5 && userData.l[1] > 14) {
      userGrade.l = 10;
    } else if (userData.l[0] == 5 && userData.l[1] > 4) {
      userGrade.l = 20;
    } else if (userData.l[0] == 4 && userData.l[1] > 54) {
      userGrade.l = 30;
    } else if (userData.l[0] == 4 && userData.l[1] > 44) {
      userGrade.l = 40;
    } else if (userData.l[0] == 4 && userData.l[1] > 34) {
      userGrade.l = 50;
    } else if (userData.l[0] == 4 && userData.l[1] > 29) {
      userGrade.l = 60;
    } else if (userData.l[0] == 4 && userData.l[1] > 24) {
      userGrade.l = 62;
    } else if (userData.l[0] == 4 && userData.l[1] > 19) {
      userGrade.l = 64;
    } else if (userData.l[0] == 4 && userData.l[1] > 14) {
      userGrade.l = 66;
    } else if (userData.l[0] == 4 && userData.l[1] > 9) {
      userGrade.l = 68;
    } else if (userData.l[0] == 4 && userData.l[1] > 4) {
      userGrade.l = 70;
    } else if (userData.l[0] == 3 && userData.l[1] > 59) {
      userGrade.l = 72;
    } else if (userData.l[0] == 3 && userData.l[1] > 54) {
      userGrade.l = 74;
    } else if (userData.l[0] == 3 && userData.l[1] > 49) {
      userGrade.l = 76;
    } else if (userData.l[0] == 3 && userData.l[1] > 44) {
      userGrade.l = 78;
    } else if (userData.l[0] == 3 && userData.l[1] > 37) {
      userGrade.l = 80;
    } else if (userData.l[0] == 3 && userData.l[1] > 30) {
      userGrade.l = 85;
    } else if (userData.l[0] == 3 && userData.l[1] > 24) {
      userGrade.l = 90;
    } else if (userData.l[0] == 3 && userData.l[1] > 18) {
      userGrade.l = 95;
    } else if (userData.l[0] < 3 || (userData.l[0] == 3 && userData.l[1] <= 18)) {
      userGrade.l = 100;
    }

    if (userData.c < 16) {
      userGrade.c = 0;
    } else if (userData.c < 18) {
      userGrade.c = 10;
    } else if (userData.c < 20) {
      userGrade.c = 20;
    } else if (userData.c < 22) {
      userGrade.c = 30;
    } else if (userData.c < 24) {
      userGrade.c = 40;
    } else if (userData.c < 26) {
      userGrade.c = 50;
    } else if (userData.c < 28) {
      userGrade.c = 60;
    } else if (userData.c < 30) {
      userGrade.c = 62;
    } else if (userData.c < 32) {
      userGrade.c = 64;
    } else if (userData.c < 34) {
      userGrade.c = 66;
    } else if (userData.c < 36) {
      userGrade.c = 68;
    } else if (userData.c < 38) {
      userGrade.c = 70;
    } else if (userData.c < 40) {
      userGrade.c = 72;
    } else if (userData.c < 42) {
      userGrade.c = 74;
    } else if (userData.c < 44) {
      userGrade.c = 76;
    } else if (userData.c < 46) {
      userGrade.c = 78;
    } else if (userData.c < 49) {
      userGrade.c = 80;
    } else if (userData.c < 52) {
      userGrade.c = 85;
    } else if (userData.c < 54) {
      userGrade.c = 90;
    } else if (userData.c < 56) {
      userGrade.c = 95;
    } else if (userData.c >= 56) {
      userGrade.c = 100;
    }

    if (userData.d < 126) {
      userGrade.d = 0;
    } else if (userData.d < 131) {
      userGrade.d = 10;
    } else if (userData.d < 136) {
      userGrade.d = 20;
    } else if (userData.d < 141) {
      userGrade.d = 30;
    } else if (userData.d < 146) {
      userGrade.d = 40;
    } else if (userData.d < 151) {
      userGrade.d = 50;
    } else if (userData.d < 154) {
      userGrade.d = 60;
    } else if (userData.d < 157) {
      userGrade.d = 62;
    } else if (userData.d < 160) {
      userGrade.d = 64;
    } else if (userData.d < 163) {
      userGrade.d = 66;
    } else if (userData.d < 166) {
      userGrade.d = 68;
    } else if (userData.d < 169) {
      userGrade.d = 70;
    } else if (userData.d < 172) {
      userGrade.d = 72;
    } else if (userData.d < 175) {
      userGrade.d = 74;
    } else if (userData.d < 178) {
      userGrade.d = 76;
    } else if (userData.d < 181) {
      userGrade.d = 78;
    } else if (userData.d < 188) {
      userGrade.d = 80;
    } else if (userData.d < 195) {
      userGrade.d = 85;
    } else if (userData.d < 201) {
      userGrade.d = 90;
    } else if (userData.d < 207) {
      userGrade.d = 95;
    } else if (userData.d >= 207) {
      userGrade.d = 100;
    }

    if (userData.e < -2.0) {
      userGrade.e = 0;
    } else if (userData.e < -2.8) {
      userGrade.e = 10;
    } else if (userData.e < 3.6) {
      userGrade.e = 20;
    } else if (userData.e < 4.4) {
      userGrade.e = 30;
    } else if (userData.e < 5.2) {
      userGrade.e = 40;
    } else if (userData.e < 6.0) {
      userGrade.e = 50;
    } else if (userData.e < 7.3) {
      userGrade.e = 60;
    } else if (userData.e < 8.6) {
      userGrade.e = 62;
    } else if (userData.e < 9.9) {
      userGrade.e = 64;
    } else if (userData.e < 11.2) {
      userGrade.e = 66;
    } else if (userData.e < 12.5) {
      userGrade.e = 68;
    } else if (userData.e < 13.8) {
      userGrade.e = 70;
    } else if (userData.e < 15.1) {
      userGrade.e = 72;
    } else if (userData.e < 16.4) {
      userGrade.e = 74;
    } else if (userData.e < 17.7) {
      userGrade.e = 76;
    } else if (userData.e < 19.0) {
      userGrade.e = 78;
    } else if (userData.e < 20.6) {
      userGrade.e = 80;
    } else if (userData.e < 22.2) {
      userGrade.e = 85;
    } else if (userData.e < 24.0) {
      userGrade.e = 90;
    } else if (userData.e < 25.8) {
      userGrade.e = 95;
    } else if (userData.e >= 25.8) {
      userGrade.e = 100;
    }

    if (userData.f > 11.3) {
      userGrade.f = 0;
    } else if (userData.f > 11.1) {
      userGrade.f = 10;
    } else if (userData.f > 10.9) {
      userGrade.f = 20;
    } else if (userData.f > 10.7) {
      userGrade.f = 30;
    } else if (userData.f > 10.5) {
      userGrade.f = 40;
    } else if (userData.f > 10.3) {
      userGrade.f = 50;
    } else if (userData.f > 10.1) {
      userGrade.f = 60;
    } else if (userData.f > 9.9) {
      userGrade.f = 62;
    } else if (userData.f > 9.7) {
      userGrade.f = 64;
    } else if (userData.f > 9.5) {
      userGrade.f = 66;
    } else if (userData.f > 9.3) {
      userGrade.f = 68;
    } else if (userData.f > 9.1) {
      userGrade.f = 70;
    } else if (userData.f > 8.9) {
      userGrade.f = 72;
    } else if (userData.f > 8.7) {
      userGrade.f = 74;
    } else if (userData.f > 8.5) {
      userGrade.f = 76;
    } else if (userData.f > 8.3) {
      userGrade.f = 78;
    } else if (userData.f > 8.0) {
      userGrade.f = 80;
    } else if (userData.f > 7.7) {
      userGrade.f = 85;
    } else if (userData.f > 7.6) {
      userGrade.f = 90;
    } else if (userData.f > 7.5) {
      userGrade.f = 95;
    } else if (userData.f <= 7.5) {
      userGrade.f = 100;
    }

    if (userData.lu < 1800) {
      userGrade.lu = 0;
    } else if (userData.lu < 1840) {
      userGrade.lu = 10;
    } else if (userData.lu < 1880) {
      userGrade.lu = 20;
    } else if (userData.lu < 1920) {
      userGrade.lu = 30;
    } else if (userData.lu < 1960) {
      userGrade.lu = 40;
    } else if (userData.lu < 2000) {
      userGrade.lu = 50;
    } else if (userData.lu < 2100) {
      userGrade.lu = 60;
    } else if (userData.lu < 2200) {
      userGrade.lu = 62;
    } else if (userData.lu < 2300) {
      userGrade.lu = 64;
    } else if (userData.lu < 2400) {
      userGrade.lu = 66;
    } else if (userData.lu < 2500) {
      userGrade.lu = 68;
    } else if (userData.lu < 2600) {
      userGrade.lu = 70;
    } else if (userData.lu < 2700) {
      userGrade.lu = 72;
    } else if (userData.lu < 2800) {
      userGrade.lu = 74;
    } else if (userData.lu < 2900) {
      userGrade.lu = 76;
    } else if (userData.lu < 3000) {
      userGrade.lu = 78;
    } else if (userData.lu < 3150) {
      userGrade.lu = 80;
    } else if (userData.lu < 3300) {
      userGrade.lu = 85;
    } else if (userData.lu < 3350) {
      userGrade.lu = 90;
    } else if (userData.lu < 3400) {
      userGrade.lu = 95;
    } else if (userData.lu >= 3400) {
      userGrade.lu = 100;
    }

    this.setData({ userGrade: { all: 0.2 * userGrade.f + 0.1 * userGrade.e + 0.1 * userGrade.d + 0.1 * userGrade.c + 0.2 * userGrade.l + 0.15 * userGrade.lu + 0.15 * userGrade.bmi,
      lu: userGrade.lu,
      l: userGrade.l,
      c: userGrade.c,
      d: userGrade.d,
      e: userGrade.e,
      f: userGrade.f,
      bmi: userGrade.bmi, } });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userData: {
        s: options.userSex,
        l: options.longrunTime.split(":"),
        c: options.cNum,
        d: options.dNum,
        e: options.eNum,
        f: options.fNum,
        lu: options.lungNum,
        he: options.heightNum,
        we: options.weightNum,
        ed: options.examDate,
        as: options.aimScore,
      }
    })
    console.log(this.data.userData);
    if (this.data.userData.s == 0) {
      this.grade0();
    } else if (this.data.userData.s = 1) {
      this.grade1();
    } else {
      console.log('no userSex')
    }
    console.log(this.data.userGrade);
    this.setData({
      us: this.data.userGrade,
      swtichData: [
        {
          name:'中长跑',
          data:[this.data.userGrade.l]
        },
        {
          name: '引体/仰卧',
          data: [this.data.userGrade.c]
        },
        {
          name: '立定跳远',
          data: [this.data.userGrade.d]
        },
        {
          name: '坐位体前屈',
          data: [this.data.userGrade.e]
        },
        {
          name: '短跑',
          data: [this.data.userGrade.f]
        },
      ]
    });
    var time = util.formatTime(new Date())
    //为页面中time赋值
    this.setData({
      time: time
    });
    this.dateSub();
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {
/**    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: ['Grade'],
      series: this.data.swtichData,
      yAxis: {
        format: function (val) {
          return val;
        },
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 23
        }
      },
      width: windowWidth,
      height: 250,
    });**/
    this.ecComponent = this.selectComponent('#columnCanvas');
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(chart);
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;
      console.log(chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });

  },

  setOption: function (chart) {
    var that = this;
    const option={
      backgroundColor: "#fff",
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        position: ['73%', '21%']
      },
      grid: {
        containLabel: true,
        left : '3%',
        right:'5%',
        top:'20%',
        bottom:'10%'
      },
      xAxis: [
        {
          type: 'category',
          data: ['肺活量','中长', '引/仰', '立定', '坐体', '短跑'],
          axisTick: {
            alignWithLabel: true
          },
          axisLine:{
            lineStyle:{
              color: "#2cb57f"
            }
          },
          nameTextStyle:{
            fontSize: 8,
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#2cb57f"
            }
          }
        }
      ],
      series: [
        {
          name: '成绩',
          type: 'bar',
          barWidth: '30%',
          data: [this.data.userGrade.lu,this.data.userGrade.l, this.data.userGrade.c, this.data.userGrade.d, this.data.userGrade.e, this.data.userGrade.f],
          itemStyle: {
            normal: {
              color: function (params) {
                //首先定义一个数组 
                var colorList = that.colorL();
                return colorList[params.dataIndex];
              }
            }
          }
        }
      ]
    };
    chart.setOption(option);
  },

  colorL(){
    var gradeArr = [this.data.userGrade.lu, this.data.userGrade.l, this.data.userGrade.c, this.data.userGrade.d, this.data.userGrade.e, this.data.userGrade.f];
    var cl = new Array;
    for(let i in gradeArr){
      if(gradeArr[i]>=80){
        cl[i] = '#C33531'; 
      }else if(gradeArr[i]>=60){
        cl[i] = '#EFE42A';
      }else{
        cl[i] = '#64BD3D';
      }
    }
    return cl;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})