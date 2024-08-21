import routers from './router';
import define from './define';

const APP_BASE_API = "https://xxx.xxxx.xx";

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
    npmClient: 'npm'
};
