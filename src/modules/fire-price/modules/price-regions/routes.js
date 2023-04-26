import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'priceRegions',
        name: 'FirePriceRegions',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
            // hasPerm: () => ability.can('view', 'statistics-info')
        },
        children: [
            {
                name: 'FirePriceRegionsIndex',
                path: '',
                component: () => import('@/modules/fire-price/modules/price-regions/Index.vue'),
                meta: {
                    bcTo: {name: "FirePriceRegions"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'FirePriceRegionsCreate',
                path: 'create',
                component: () => import('@/modules/fire-price/modules/price-regions/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "FirePriceRegions"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'FirePriceRegionsConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/fire-price/modules/price-regions/Confirm.vue'),
                meta: {
                    bcTo: {name: "FirePriceRegions"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
