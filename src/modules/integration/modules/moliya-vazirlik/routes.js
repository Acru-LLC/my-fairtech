import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'moliya',
        name: 'IntegrationMoliyaInfo',
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
                name: 'IntegrationMoliyaInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/moliya-vazirlik/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationMoliyaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationMoliyaInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/moliya-vazirlik/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationMoliyaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationMoliyaInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/moliya-vazirlik/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationMoliyaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
