import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        menus: [], // 菜单信息
        roles: [], // 角色信息
        routers: [], // 路由列表
        currentRoutePath: '', // 当前路由路径
        user: {}, // 当前登录用户信息
    },
    reducers: {
        setMenu: (state, action) => {
            state.menus = action.payload;
        },
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
        setRouters: (state, action) => {
            state.routers = action.payload;
        },
        setCurrentRoutePath: (state, action) => {
            state.currentRoutePath = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});


// 为每个 case reducer 函数生成 Action creators
export const {
    setMenu,
    setRoles,
    setRouters,
    setCurrentRoutePath,
    setUser
} = globalSlice.actions;

export default globalSlice.reducer;