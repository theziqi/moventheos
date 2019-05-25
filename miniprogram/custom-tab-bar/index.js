Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    selected: 0,
    list: [{
        pagePath: "/pages/index/index",
        iconPath: "/images/index.png",
        selectedIconPath: "/images/index_f.png",
        text: "首页"
      },
      {
        pagePath: "/pages/home/index",
        iconPath: "/images/home.png",
        selectedIconPath: "/images/home_f.png",
        text: "我的"
      }
    ]
  },
  methods: {
    switchTab(e) {      
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  },
  pageLifetimes: {
  },
})