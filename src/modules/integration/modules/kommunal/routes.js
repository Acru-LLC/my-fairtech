import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'kommunal',
        name: 'IntegrationKommunalInfo',
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
                name: 'IntegrationKommunalInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/kommunal/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationKommunalInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationKommunalInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/kommunal/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationKommunalInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationKommunalInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/kommunal/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationKommunalInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
