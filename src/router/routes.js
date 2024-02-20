/*
* IMPORT MAIN REGISTER_MODULE ROUTES */
import modules_routes from "@/modules/routes";

export default [
    ...modules_routes,
    {
        path: '/',
        name: 'dashboard',
        meta: {
            public: true,
        },
        component: () => import('./views/dashboards/dashboard'),
        children: []
    },
    {
        path: '/murojaat',
        name: 'MurojaatCreate',
        meta: {
            public: true,
        },
        component: () => import('/src/modules/appeal/MurojatMonitor.vue'),
        children: []
    },
    {
        path: '/online-watching',
        name: 'OnlineWatching',
        meta: {
            public: true,
        },
        component: () => import('/src/modules/online-watching/onlineWatching.vue'),
        children: []
    },
    {
        path: '/product-services',
        name: 'ProductInfoServices',
        meta: {
            public: true
        },
        component: () => import('/src/modules/product/index.vue'),
        children: []
    },
    {
        path: '/tovar-mahsulot',
        name: 'TovarMahsulot',
        meta: {
            public: true
        },
        component: () => import('/src/modules/product/serviceMahsulot.vue'),
        children: []
    },
    {
        path: '/ish-xizmatlar',
        name: 'IshXizmatlar',
        meta: {
            public: true
        },
        component: () => import('/src/modules/product/serviceXizmat.vue'),
        children: []
    },
    {
        path: '/online-report',
        name: 'OnlineReport',
        meta: {
        },
        // component: () => import('/src/modules/appeal/MurojatMonitor.vue'),
        children: []
    }

]
