import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'Sugurta-moliya',
        name: 'IntegrationSugurtaMoliyaInfo',
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
                name: 'IntegrationSugurtaMoliyaInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/sugurta-moliya/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationSugurtaMoliyaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationSugurtaMoliyaInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/sugurta-moliya/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationSugurtaMoliyaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationSugurtaMoliyaInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/sugurta-moliya/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationSugurtaMoliyaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
