import i18n from "@/i18n";
import {ability} from '@/shared/store/ability'

export default [
    {
        name: "Price",
        path: "/price",
        redirect: "/price",
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
                name: "PriceMarkets",
                path: "price-markets",
                component: () => import("@/modules/price/priceMarkets/Index.vue"),
                meta: {
                    // hasPerm: () => ability.can('view', '')
                }
            },
            {
                name: "CreatePriceMarkets",
                path: "price-markets/create",
                component: () => import("@/modules/price/priceMarkets/CreateOrUpdate.vue"),
                meta: {},
            },
            {
                name: "UpdatePriceMarkets",
                path: "price-markets/update/:id",
                component: () => import("@/modules/price/priceMarkets/CreateOrUpdate.vue"),
                meta: {},
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
