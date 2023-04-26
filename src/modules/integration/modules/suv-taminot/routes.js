import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'suv-taminot',
        name: 'IntegrationSuvTaminotInfo',
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
                name: 'IntegrationSuvTaminotInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/suv-taminot/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationSuvTaminotInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationSuvTaminotInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/suv-taminot/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationSuvTaminotInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationSuvTaminotInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/suv-taminot/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationSuvTaminotInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
