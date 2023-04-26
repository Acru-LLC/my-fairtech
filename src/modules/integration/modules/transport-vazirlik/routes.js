import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'transport',
        name: 'IntegrationTransportInfo',
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
                name: 'IntegrationTransportInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/transport-vazirlik/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationTransportInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationTransportInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/transport-vazirlik/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationTransportInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationTransportInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/transport-vazirlik/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationTransportInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
