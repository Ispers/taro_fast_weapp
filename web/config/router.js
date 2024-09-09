// 此处为固定路由表，非必要不要修改，其他路由均在菜单管理中动态维护
export default [
    {
        path: "/Login",
        title: "登录",
        component: "./Login/index",
        layout: false,
        hidden: true
    },
    {
        path: '/:other/*',
        redirect: '/404',
        layout: false,
        hidden: true
    },
    {
        path: '/404',
        title: '页面走丢了',
        component: './404',
        layout: false,
        hidden: true
    },
    {
        path: '/403',
        title: '无权访问',
        component: './403',
        layout: false,
        hidden: true
    }
];