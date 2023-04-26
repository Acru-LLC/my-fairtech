import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'priceDokon',
        name: 'FirePriceDokon',
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
                name: 'FirePriceDokonIndex',
                path: '',
                component: () => import('@/modules/fire-price/modules/price-dokon/Index.vue'),
                meta: {
                    bcTo: {name: "FirePriceDokon"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'FirePriceDokonCreate',
                path: 'create',
                component: () => import('@/modules/fire-price/modules/price-dokon/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "FirePriceDokon"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'FirePriceDokonConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/fire-price/modules/price-dokon/Confirm.vue'),
                meta: {
                    bcTo: {name: "FirePriceDokon"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
