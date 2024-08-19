export default {
  pages: [
    'pages/index/index',
    'pages/me/index',
    'pages/docs/index',
    'pages/product/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'taro-Weapp案例',
    backgroundColor: '#eeeeee',
    navigationBarTextStyle: 'black'
  },
  // 使用自定义 tabbar，组件文件 src/custom-tab-bar/index.jsx
  // 如修改list数组，需同步修改组件文件 src/custom-tab-bar/index.jsx 中的 tab
  // 所有作为 TabBar 页面的 config 里需要声明 usingComponents 项，也可以在 app.config 设置全局开启
  tabBar: {
    custom: true, // 自定义 tabBar
    color: '#000000', // tab 上的文字默认颜色，仅支持十六进制颜色
    selectedColor: '#000000', // tab 上的文字选中时的颜色，仅支持十六进制颜色
    backgroundColor: '#000000', // tab 的背景色，仅支持十六进制颜色
    // borderStyle: 'black', // tabbar 上边框的颜色， 仅支持 black / white
    // position: 'bottom', // tabBar 的位置，仅支持 bottom / top
    // tab 的列表，最少 2 个、最多 5 个 tab
    list: [
      {
        pagePath: 'pages/index/index', // 页面路径，必须在 pages 中先定义
        text: '首页', // tab 上按钮文字
        // iconPath: '', // 图片路径，建议尺寸为 81px * 81px
        // selectedIconPath: '', // 选中时的图片路径，建议尺寸为 81px * 81px
      },
      {
        pagePath: 'pages/product/index',
        text: '商品',
      },
      {
        pagePath: 'pages/docs/index',
        text: '文档',
      },
      {
        pagePath: 'pages/me/index',
        text: '我的',
      }
    ]
  },
  // app.config 设置全局开启
  usingComponents: {}
}

