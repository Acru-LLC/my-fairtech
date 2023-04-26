import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'tehnik',
        name: 'IntegrationTehnikInfo',
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
                name: 'IntegrationTehnikInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/tehnik-jihatdan-tartibga-solish/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationTehnikInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationTehnikInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/tehnik-jihatdan-tartibga-solish/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationTehnikInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationTehnikInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/tehnik-jihatdan-tartibga-solish/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationTehnikInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
