// W3C HTML 的内置样式
import '@tarojs/taro/html.css'
// 全局引入主题
import '@nutui/nutui-react-taro/dist/styles/theme-jmapp.scss'
import './app.scss';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store' // 状态管理 redux
import { useError, useLaunch } from '@tarojs/taro';
import { info } from './service/auth';
import { setUser } from './store/slices/globalSlice';

const App = ({ children }) => {
  // 小程序初始化完成时的回调
  useLaunch(() => {
    console.log('小程序初始化完成==>获取用户信息');
    info().then(res => {
      console.log('info', res);
      store.dispatch(setUser(res.result));
    });
  });

  // 小程序发生脚本错误或 API 调用报错时触发的回调
  useError((err) => {
    console.log('error: ', err);
  });

  // children 是将要会渲染的页面
  // 解决方案链接 https://github.com/NervJS/taro/issues/6548
  // loading={children} 因为PersistGate延迟了页面组件的实例化，导致小程序 onLoad 时找不到而报错
  // 把页面级组件放到loading里，这样一开始就会有页面级组件
  return (
    <Provider store={store}>
      <PersistGate loading={children} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default App;
