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
                name: 'Reporting',
                path: '/reporting/menu',
                component: () => import('@/modules/reporting/menu/Index.vue'),
                meta: {
                    authRequired: true,
                }
            },
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
