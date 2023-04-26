import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'hudud-gaz',
        name: 'IntegrationHududgazInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
            hasPerm: () => ability.can('view', 'hudud-gaz')
        },
        children: [
            {
                name: 'IntegrationHududgazInfoIndex',
                path: 'info-1',
                component: () => import('@/modules/integration/modules/hudud-gaz/Index1.vue'),
                meta: {
                    bcTo: {name: "IntegrationHududgazInfo"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'hudud-gaz')
                },
            },
            {
                name: 'IntegrationHududgazInfo1Index',
                path: 'info-1',
                component: () => import('@/modules/integration/modules/hudud-gaz/Index1.vue'),
                meta: {
                    bcTo: {name: "IntegrationHududgazInfo"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'hudud-gaz')
                },
            },
            {
                name: 'IntegrationHududgazInfo2Index',
                path: 'info-2',
                component: () => import('@/modules/integration/modules/hudud-gaz/Index2'),
                meta: {
                    bcTo: {name: "IntegrationHududgazInfo"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'hudud-gaz')
                },
            },
            {
                name: 'IntegrationHududgazInfo3Index',
                path: 'info-3',
                component: () => import('@/modules/integration/modules/hudud-gaz/Index3.vue'),
                meta: {
                    bcTo: {name: "IntegrationHududgazInfo"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'hudud-gaz')
                },
            },
            {
                name: 'IntegrationHududgazInfo4Index',
                path: 'info-4',
                component: () => import('@/modules/integration/modules/hudud-gaz/Index4.vue'),
                meta: {
                    bcTo: {name: "IntegrationHududgazInfo"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'hudud-gaz')
                },
            },

        ],
    },
];
