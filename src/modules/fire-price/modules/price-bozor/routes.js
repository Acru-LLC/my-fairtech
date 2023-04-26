import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'priceBozor',
        name: 'FirePriceBozor',
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
                name: 'FirePriceBozorIndex',
                path: '',
                component: () => import('@/modules/fire-price/modules/price-bozor/Index.vue'),
                meta: {
                    bcTo: {name: "FirePriceBozor"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'FirePriceBozorCreate',
                path: 'create',
                component: () => import('@/modules/fire-price/modules/price-bozor/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "FirePriceBozor"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'FirePriceBozorConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/fire-price/modules/price-bozor/Confirm.vue'),
                meta: {
                    bcTo: {name: "FirePriceBozor"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
