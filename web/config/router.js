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
        path: '/401',
        title: '无权访问',
        component: './401',
        layout: false,
        hidden: true
    }
];