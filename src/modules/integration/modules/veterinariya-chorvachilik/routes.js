import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'veterinariya-chorvachilik',
        name: 'IntegrationVeterinariyaChorvachilikInfo',
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
                name: 'IntegrationVeterinariyaChorvachilikInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/veterinariya-chorvachilik/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationVeterinariyaChorvachilikInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationVeterinariyaChorvachilikInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/veterinariya-chorvachilik/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationVeterinariyaChorvachilikInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationVeterinariyaChorvachilikInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/veterinariya-chorvachilik/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationVeterinariyaChorvachilikInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
