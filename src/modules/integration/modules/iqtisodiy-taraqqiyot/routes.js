import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'iqtisodiy-taraqqiyot',
        name: 'IntegrationIqtisodiyTaraqqiyotInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
        },
        children: [
            {
                name: 'IntegrationIqtisodiyTaraqqiyotInfo',
                path: 'info1',
                component: () => import('@/modules/integration/modules/iqtisodiy-taraqqiyot/info1/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationIntegrationIqtisodiyTaraqqiyot"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'iqtisodiy-taraqqiyot-infos'),
                },
            },
            {
                name: 'IntegrationIqtisodiyTaraqqiyotInfo1Index',
                path: 'info1',
                component: () => import('@/modules/integration/modules/iqtisodiy-taraqqiyot/info1/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationIntegrationIqtisodiyTaraqqiyot"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'iqtisodiy-taraqqiyot-infos'),
                },
            },
            {
                name: 'ViewIntegrationIqtisodiyTaraqqiyotInfo1Index',
                path: 'info1/view/:id',
                component: () => import('@/modules/integration/modules/iqtisodiy-taraqqiyot/info1/View.vue'),
                meta: {
                    bcTo: {name: "IntegrationIntegrationIqtisodiyTaraqqiyot"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'iqtisodiy-taraqqiyot-infos'),
                },
            },
            {
                name: 'IntegrationIqtisodiyTaraqqiyotInfo2Index',
                path: 'info2',
                component: () => import('@/modules/integration/modules/iqtisodiy-taraqqiyot/info2/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationIntegrationIqtisodiyTaraqqiyot"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'iqtisodiy-taraqqiyot-infos'),
                },
            },
            {
                name: 'ViewIntegrationIqtisodiyTaraqqiyotInfo2Index',
                path: 'info2/view/:id',
                component: () => import('@/modules/integration/modules/iqtisodiy-taraqqiyot/info2/View.vue'),
                meta: {
                    bcTo: {name: "IntegrationIntegrationIqtisodiyTaraqqiyot"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'iqtisodiy-taraqqiyot-infos'),
                },
            },
            {
                name: 'IntegrationIqtisodiyTaraqqiyotInfo3Index',
                path: 'info3',
                component: () => import('@/modules/integration/modules/iqtisodiy-taraqqiyot/info3/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationIntegrationIqtisodiyTaraqqiyot"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'iqtisodiy-taraqqiyot-infos'),
                },
            },
            {
                name: 'ViewIntegrationIqtisodiyTaraqqiyotInfo3Index',
                path: 'info3/view/:id',
                component: () => import('@/modules/integration/modules/iqtisodiy-taraqqiyot/info3/View.vue'),
                meta: {
                    bcTo: {name: "IntegrationIntegrationIqtisodiyTaraqqiyot"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'iqtisodiy-taraqqiyot-infos'),
                },
            },
        ],
    }
];
