import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { setCurrentRoutePath, setRouters } from "./store/slices/globalSlice";
import { patch } from './utils/menu';
import { getToken } from '@/utils/auth';
import { history, matchRoutes } from 'umi';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

/** 变量*/
let extraRoutes;
const routeWhitelist = ['/Login']; // 免登录白名单

// 修改被 react-router 渲染前的树状路由表
export function patchClientRoutes({ routes }) {
    patch(routes, extraRoutes);
    console.log('CurrentUserRoutes===>', routes);
    store.dispatch(setRouters(routes));
}

// 覆写 render
export function render(oldRender) {
    if (getToken()) {
        const pm = JSON.parse(localStorage.getItem('persist:root')).menus;
        extraRoutes = JSON.parse(pm);
    }
    oldRender();
}

// 监听路由
export function onRouteChange(route) {
    // 监听路由，修改标签页标题
    const r = matchRoutes(route.clientRoutes, route.location.pathname)?.pop()?.route;
    if (r) { document.title = APP_TITLE + ' - ' + r.title || ''; }

    // 缓存当前路由
    store.dispatch(setCurrentRoutePath(route.location.pathname));

    // 登录拦截
    NProgress.start()
    const path = route.location.pathname;
    if (getToken()) {
        // 已登录且要跳转的页面是登录页
        if (path === '/Login') {
            history.replace('/');
        }
        NProgress.done();
    } else {
        /* 未获取到token*/
        if (routeWhitelist.indexOf(path) === -1) { // 不在免登录白名单，全部重定向到登录页
            console.log('不在免登录白名单，全部重定向到登录页');
            history.replace('/Login');
        }
        NProgress.done();
    }
};


// 修改 react-dom渲染时的根组件
export function rootContainer(container, args) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {container}
            </PersistGate>
        </Provider>
    );
}