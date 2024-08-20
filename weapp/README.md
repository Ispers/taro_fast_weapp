# weapp Taro微信小程序 
二次封装-开箱即用Taro框架
注：个人觉得 TypeScript 过于繁琐，使得小程序过于臃肿，故使用 JavaScript 进行开发

* [Taro](https://taro-docs.jd.com/docs/)
* [NutUI-React](https://nutui.jd.com/taro/react/2x/#/zh-CN/guide/intro-react)
* [react-redux](https://cn.react-redux.js.org/introduction/getting-started/)

#### 项目整合插件
- @nutui/icons-react-taro nutui-icon图标库 
- @tarojs/extend [类似 jQuery 的系列 API](https://taro-docs.jd.com/docs/jquery-like)
- @tarojs/plugin-html 可以使用html标签
- redux-logger、redux-persist redux变化跟踪及持久化

#### 项目构建
node版本 >= 16 推荐 node版本 18 - 20
```
# 由于npm安装会产生幻影依赖（对后期项目部署可能会有影响），推荐使用pnpm作为包管理器
# 配置镜像加速
pnpm config set registry https://registry.npmmirror.com/

# 安装依赖
pnpm install
# yarn
yarn

# 启动服务(微信小程序)
pnpm run dev:weapp
# yarn
yarn dev:weapp

# 构建生产环境
pnpm run build:weapp
# yarn
yarn build:weapp

# watch 同时开启压缩
set NODE_ENV=production && taro build --type weapp --watch # CMD
NODE_ENV=production taro build --type weapp --watch # Bash
```

#### 常见问题
在安装依赖的时候出现由于 React-Native 依赖版本不一致，导致依赖冲突无法安装
解决方案：
```
# 如没有 React-Native 需求，直接忽略强制安装即可
pnpm install --legacy-peer-deps
```

#### 反馈交流
QQ交流群：993719568

#### 诚邀开发者
如果您也想为该项目贡献一份力量，可以通过以下联系方式联系作者
- qq: 1257032868
- Email: [1257032868@qq.com](1257032868@qq.com)