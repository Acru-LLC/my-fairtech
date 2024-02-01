import i18n from "@/i18n";
import {ability} from '@/shared/store/ability'

export default [
    {
        name: "Pharm",
        path: "/pharm",
        redirect: "/pharm",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcLinkText: i18n.t("submodules.application_before_commission.title"),
            bcTo: {name: "Pharm"}
        },
        children: [
            {
                name: 'priceEnterCost',
                path: '/price/enter-cost',
                component: () => import('@/modules/price/menu/Index.vue'),
                meta: {
                    authRequired: true,
                }
            },
            {
                name: 'priceEnterCostHypermarket',
                path: '/price/enter-cost-hypermarket',
                component: () => import('@/modules/price/menu/IndexHypermarket.vue'),
                meta: {
                    authRequired: true,
                }
            },
        ]
    }
]
