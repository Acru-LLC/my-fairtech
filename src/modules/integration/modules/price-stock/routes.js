import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'price-stock',
        name: 'IntegrationPriceStock',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
            // hasPerm: () => ability.can('view', 'price-stock')
        },
        children: [
            {
                name: 'IntegrationPriceStockRealizationIndex',
                path: 'realization/index',
                component: () => import('@/modules/integration/modules/price-stock/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationPriceStock"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'price-stock')
                },
            },
            {
                name: 'IntegrationPriceStockRealizationUpload',
                path: 'realization/upload',
                component: () => import('@/modules/integration/modules/price-stock/Upload.vue'),
                meta: {
                    bcTo: {name: "IntegrationPriceStock"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'price-stock create')
                },
            },
            {
                name: 'IntegrationPriceStockEmbeddingRealizationIndex',
                path: 'embedding-realization/index',
                component: () => import('@/modules/integration/modules/price-stock/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationPriceStock"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'price-stock')
                },
            },
            {
                name: 'IntegrationPriceStockEmbeddingRealizationUpload',
                path: 'embedding-realization/upload',
                component: () => import('@/modules/integration/modules/price-stock/Upload.vue'),
                meta: {
                    bcTo: {name: "IntegrationPriceStock"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'price-stock create')
                },
            },
        ],
    },
];
