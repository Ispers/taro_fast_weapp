import routers from './router';
import define from './define';

const APP_BASE_API = "http://localhost:8083";

export default {
    routes: routers,
    icons: {},
    define: define,
    proxy: {
        '/api': {
            'target': APP_BASE_API,
            'changeOrigin': true,
            'pathRewrite': {
                '^/api': 'api'
            },
        },
        '/auth': {
            'target': APP_BASE_API,
            'changeOrigin': true,
            'pathRewrite': {
                '^/auth': 'auth'
            }
        }
    },
    chainWebpack(config) {
        // 添加 global.js 到入口文件
        config.entry('app').add('./src/global.js');
    },
    npmClient: 'pnpm'
};
