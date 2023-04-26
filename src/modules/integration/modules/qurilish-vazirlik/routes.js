import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'qurilish',
        name: 'IntegrationQurilishInfo',
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
                name: 'IntegrationQurilishInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/qurilish-vazirlik/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationQurilishInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationQurilishInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/qurilish-vazirlik/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationQurilishInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationQurilishInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/qurilish-vazirlik/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationQurilishInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
