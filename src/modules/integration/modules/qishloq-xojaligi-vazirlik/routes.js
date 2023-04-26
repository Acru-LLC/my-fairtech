import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'qishloq-xojaligi',
        name: 'IntegrationQishloqXojaligiInfo',
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
                name: 'IntegrationQishloqXojaligiInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/qishloq-xojaligi-vazirlik/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationQishloqXojaligiInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationQishloqXojaligiInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/qishloq-xojaligi-vazirlik/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationQishloqXojaligiInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationQishloqXojaligiInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/qishloq-xojaligi-vazirlik/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationQishloqXojaligiInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
