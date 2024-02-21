import i18n from "@/i18n";
import {ability} from '@/shared/store/ability'

export default [
    {
        name: "Reporting",
        path: "/reporting",
        redirect: "/reporting",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcTo: {name: "Reporting"}
        },
        children: [
            {
                name: 'Menu',
                path: '/reporting/menu',
                component: () => import('@/modules/reporting/menu/menu.vue'),
                meta: {
                    authRequired: true,
                }
            },
            {
                name: 'ReportingOnline',
                path: '/reporting/online',
                component: () => import('@/modules/reporting/menu/Index.vue'),
                meta: {

                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            // {
            //     name: 'IntegrationMenuIndex',
            //     path: '',
            //     component: () => import('@/modules/integration/modules/menu-card/menu'),
            //     meta: {
            //         bcTo: {name: "IntegrationMenuIndex"},
            //         authRequired: true,
            //     },
            // },
            // {
            //     name: 'priceEnterCostHypermarket',
            //     path: '/price/enter-cost-hypermarket',
            //     component: () => import('@/modules/price/menu/IndexHypermarket.vue'),
            //     meta: {
            //         authRequired: true,
            //     }
            // },
        ]
    }
]
