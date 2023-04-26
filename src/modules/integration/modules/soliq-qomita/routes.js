import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'soliqQomita',
        name: 'IntegrationSoliqQomitaInfo',
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
                name: 'IntegrationSoliqQomitaInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/soliq-qomita/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationSoliqQomitaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationSoliqQomitaInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/soliq-qomita/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationSoliqQomitaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationSoliqQomitaInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/soliq-qomita/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationSoliqQomitaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
