import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'kadastr-soliq',
        name: 'IntegrationKadastrSoliqInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
            hasPerm: () => ability.can('view', 'kadastr-soliq')
        },
        children: [
            {
                name: 'IntegrationKadastrSoliqInfo',
                path: 'info-1',
                component: () => import('@/modules/integration/modules/kadastr/Index1.vue'),
                meta: {
                    bcTo: {name: "IntegrationKadastrSoliqInfo"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'kadastr-soliq')
                },
            },
            {
                name: 'IntegrationKadastrInfo1Index',
                path: 'info-1',
                component: () => import('@/modules/integration/modules/kadastr/Index1.vue'),
                meta: {
                    bcTo: {name: "IntegrationKadastrSoliqInfo"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'kadastr-soliq')
                },
            },
            {
                name: 'IntegrationKadastrInfo2Index',
                path: 'info-2',
                component: () => import('@/modules/integration/modules/kadastr/Index2'),
                meta: {
                    bcTo: {name: "IntegrationKadastrSoliqInfo"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'kadastr-soliq')
                },
            },
            {
                name: 'IntegrationKadastrInfo3Index',
                path: 'info-3',
                component: () => import('@/modules/integration/modules/kadastr/Index3.vue'),
                meta: {
                    bcTo: {name: "IntegrationKadastrSoliqInfo"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'kadastr-soliq')
                },
            }

        ],
    },
];
