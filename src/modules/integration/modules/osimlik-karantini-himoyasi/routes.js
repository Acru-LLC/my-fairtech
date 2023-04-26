import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'osimlik',
        name: 'IntegrationOsimlikInfo',
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
                name: 'IntegrationOsimlikInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/osimlik-karantini-himoyasi/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationOsimlikInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationOsimlikInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/osimlik-karantini-himoyasi/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationOsimlikInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationOsimlikInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/osimlik-karantini-himoyasi/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationOsimlikInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
