import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        user: {}, // 当前登录用户信息
        tabbarCheckedIndex: 0, // 选中的 tabbar 的索引值
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setTabbarCheckedIndex: (state, action) => {
            state.tabbarCheckedIndex = action.payload;
        },
    }
});

// 为每个 case reducer 函数生成 Action creators
export const {
    setUser,
    setTabbarCheckedIndex
} = globalSlice.actions;

export default globalSlice.reducer;