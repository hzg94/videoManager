import {defineConfig} from "umi";

export default defineConfig({
    routes: [
        {
            path: '/',
            component: 'index'
        },
        {
            path: "/video",
            routes: [
                {
                    path: 'index',
                    component: 'file/videoManager'
                },
                {
                    path: 'import',
                    component: 'file/import'
                },
                {
                    path: 'file',
                    component: 'file/fileManager'
                }
            ]
        },
        {
            path: '/subscribe',
            component: 'subscribe/subscribe'
        },
        {
            path: '/plugins',
            component: 'plugins/pluginsManager'
        },
        {
            path: '/setting',
            component: 'setting/setting'
        }
    ],
    npmClient: 'pnpm',
    plugins: [
        '@umijs/plugins/dist/valtio',
    ],
    //
    proxy: {
        '/api': {
            'target': 'http://127.0.0.1:3000',
            'changeOrigin': true,
        }
    },
    valtio: {},
});
