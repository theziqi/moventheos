//index.js
const app = getApp()
var globaldata = app.globalData;

Page({
  data: {
    userSex: 0,
    sexPicker: ['男', '女'],
    userGrade:0,
    gradePicker:['大一','大二','大三','大四'],
    aimScore:80,
    examDate:'2019-12-12',
    longrunTime: '03:20',
    heightNum: 165,
    weightNum: 50,
    lungNum: 3500,
    cNum: 10,
    dNum: 200,
    eNum: 9.9,
    fNum: 7.9,
    dataP:{}
  },

  sexPickerChange(e) {
    console.log(e);
    this.setData({
      userSex: e.detail.value
    })
  },

  gradePickerChange(e){
    console.log(e);
    this.setData({
      userGrade: e.detail.value
    })
  },

  longrunTimeChange(e) {
    this.setData({
      longrunTime: e.detail.value
    })
  },

  examDateChange(e) {
    this.setData({
      examDate: e.detail.value
    })
  },

  handleChangeHeight({
    detail
  }) {
    this.setData({
      heightNum: detail.value
    })
  },

  handleChangeWeight({
    detail
  }) {
    this.setData({
      weightNum: detail.value
    })
  },

  handleChangeLung({
    detail
  }) {
    this.setData({
      lungNum: detail.value
    })
  },

  handleChange1({
    detail
  }) {
    this.setData({
      cNum: detail.value
    })
  },

  handleChange2({
    detail
  }) {
    this.setData({
      dNum: detail.value
    })
  },

  handleChange3({
    detail
  }) {
    this.setData({
      eNum: detail.value
    })
  },

  handleChange4({
    detail
  }) {
    this.setData({
      fNum: detail.value
    })
  },

  toAna() {
    var that = this;
    this.setData({
      dataP: {
        s: that.data.userSex,
        as:that.data.aimScore,
        ed:that.data.examDate,
        he: that.data.heightNum,
        we: that.data.weightNum,
        lu: that.data.lungNum,
        l: that.data.longrunTime,
        c: that.data.cNum,
        d: that.data.dNum,
        e: that.data.eNum,
        f: that.data.fNum
      }
    });
    wx.setStorage({
      key: 'dataP',
      data: this.data.dataP
    });
    wx.navigateTo({
      url: '/pages/analyses/index?userSex=' + that.data.userSex + '&longrunTime=' + that.data.longrunTime + '&cNum=' + that.data.cNum + '&dNum=' + that.data.dNum + '&eNum=' + that.data.eNum + '&fNum=' + that.data.fNum + '&weightNum=' + that.data.weightNum + '&heightNum=' + that.data.heightNum + '&lungNum=' + that.data.lungNum + '&aimScore=' + that.data.aimScore + '&examDate=' + that.data.examDate
    });
  },

  onLoad: function() {
    try {
      const value = wx.getStorageSync('dataP');
      if (value) {
        this.setData({
          userSex: value.s,
          longrunTime: value.l,
          cNum: value.c,
          dNum: value.d,
          eNum: value.e,
          fNum: value.f,
          heightNum: value.he,
          weightNum: value.we,
          lungNum: value.lu,
          aimScore: value.as,
          examDate: value.ed,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

})