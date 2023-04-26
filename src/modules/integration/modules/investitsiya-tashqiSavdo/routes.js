import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'investitsiya-tashqi-savdo',
        name: 'IntegrationInvestitsiyaTashqiSavdoInfo',
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
                name: 'IntegrationInvestitsiyaTashqiSavdoInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/investitsiya-tashqiSavdo/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationInvestitsiyaTashqiSavdoInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationInvestitsiyaTashqiSavdoInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/investitsiya-tashqiSavdo/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationInvestitsiyaTashqiSavdoInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationInvestitsiyaTashqiSavdoInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/investitsiya-tashqiSavdo/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationInvestitsiyaTashqiSavdoInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
