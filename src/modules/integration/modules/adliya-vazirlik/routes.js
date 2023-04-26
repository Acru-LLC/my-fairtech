import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'adliya',
        name: 'IntegrationAdliyaInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
            // hasPerm: () => ability.can('view', 'adliya-info')
        },
        children: [
            {
                name: 'IntegrationAdliyaInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/adliya-vazirlik/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationAdliyaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'adliya')
                },
            },
            {
                name: 'IntegrationAdliyaInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/adliya-vazirlik/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationAdliyaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from adliya')
                },
            },
            {
                name: 'IntegrationAdliyaInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/adliya-vazirlik/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationAdliyaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'adliya confirm info')
                },
            },
        ],
    },
];
