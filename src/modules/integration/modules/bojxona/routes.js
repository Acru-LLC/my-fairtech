import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'bojxona',
        name: 'IntegrationBojxonaInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
            // hasPerm: () => ability.can('view', 'bojxona-info')
        },
        children: [
            {
                name: 'IntegrationBojxonaInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/bojxona/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationBojxonaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'bojxona')
                },
            },
            {
                name: 'IntegrationBojxonaInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/bojxona/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationBojxonaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from bojxona')
                },
            },
            {
                name: 'IntegrationBojxonaInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/bojxona/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationBojxonaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'bojxona confirm info')
                },
            },
        ],
    },
];
