import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './slices/globalSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 使用 localStorage

// 配置 redux-persist 的持久化选项
const persistConfig = {
    key: 'root', // 存储在 localStorage 中的键名
    storage, // 使用 localStorage 作为存储介质
    blacklist: ['routers'], // 不持久化的 reducer 键名
    // whitelist: ['global'] // 指定需要持久化的 reducer 键名
};

// 创建一个持久化的 reducer
const persistedReducer = persistReducer(persistConfig, globalSlice);

// 创建 Redux store
const store = configureStore({
    reducer: {
        global: persistedReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        //关闭redux序列化检测
        serializableCheck: false
    })
});

// 创建持久化存储
const persistor = persistStore(store);

export { store, persistor }