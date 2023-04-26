import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'soliq',
        name: 'IntegrationSoliqInfo',
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
                name: 'IntegrationSoliqInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/soliq/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationSoliqInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationSoliqInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/soliq/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationSoliqInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationSoliqInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/soliq/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationSoliqInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
