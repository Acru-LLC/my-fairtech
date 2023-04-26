import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'statistics',
        name: 'IntegrationStatisticsInfo',
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
                name: 'IntegrationStatisticsInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/statistics/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationStatisticsInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationStatisticsInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/statistics/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationStatisticsInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationStatisticsInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/statistics/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationStatisticsInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
