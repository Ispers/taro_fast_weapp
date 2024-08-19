import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage' // 默认替换
import storage from './redux-persist-taro-storage/src'
import globalSlice from './slices/globalSlice'; // 导入根 reducer

// 配置 redux-persist 的持久化选项
const persistConfig = {
    key: 'taroRootStore', // 存储的键名
    storage, // 使用 Taro 的存储介质
    blacklist: ['tabbarCheckedIndex'], // 不持久化的 reducer 键名
    // whitelist: ['user'] // 指定需要持久化的 reducer 键名
};

// 创建一个持久化的 reducer
const persistedReducer = persistReducer(persistConfig, globalSlice);

// 创建 Redux store
const store = configureStore({
    reducer: {
        global: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        //关闭redux序列化检测
        serializableCheck: false
    }).concat(logger) // 添加redux-logger中间件
});

// 创建持久化存储
const persistor = persistStore(store);

export { store, persistor };


