/*
* IMPORT MAIN REGISTER_MODULE ROUTES */
import modules_routes from "@/modules/routes";
import check_routes from "@/modules/check/routes";

export default [
    ...modules_routes,
    ...check_routes,
    {
        path: '/',
        name: 'dashboard',
        meta: {
            authRequired: true,
        },
        component: () => import('./views/dashboards/dashboard'),
        children: []
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
            authRequired: true,
        },
        component: () => import('./views/dashboards/dashboard'),
        children: []
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/shared/views/auth/one-id'),
        meta: {
            public: true, // allow even if not logged in
            onlyWhenLoggedOut: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/shared/views/auth/register'),
        meta: {
            public: true, // allow even if not logged in
            onlyWhenLoggedOut: true
        }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/shared/views/auth/forgot-password'),
        meta: {
            public: true, // allow even if not logged in
            onlyWhenLoggedOut: true
        }
    },
    {
        path: '/pharm-sms/confirm-window/:id',
        name: 'PharmSmsConfirmWindow',
        component: () => import('@/modules/pharm/start/PharmSmsConfirmWindow'),
        meta: {
            public: true,
            onlyWhenLoggedOut: true
        }
    },
]
