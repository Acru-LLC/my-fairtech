import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'priceComplexes',
        name: 'FirePriceComplexes',
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
                name: 'FirePriceComplexesIndex',
                path: '',
                component: () => import('@/modules/fire-price/modules/price-complexes/Index.vue'),
                meta: {
                    bcTo: {name: "FirePriceComplexes"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'FirePriceComplexesCreate',
                path: 'create',
                component: () => import('@/modules/fire-price/modules/price-complexes/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "FirePriceComplexes"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'FirePriceComplexesConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/fire-price/modules/price-complexes/Confirm.vue'),
                meta: {
                    bcTo: {name: "FirePriceComplexes"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
