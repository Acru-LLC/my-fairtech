import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'customs-product',
        name: 'IntegrationCustomsProduct',
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
                name: 'IntegrationCustomsProductImportIndex',
                path: 'import',
                component: () => import('@/modules/integration/modules/customs-product/import/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationCustomsProduct"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'dbq-import-product-infos'),
                },
            },
            {
                name: 'IntegrationCustomsProductExportIndex',
                path: 'export',
                component: () => import('@/modules/integration/modules/customs-product/export/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationCustomsProduct"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'dbq-export-product-infos'),
                },
            },
            {
                name: 'ViewIntegrationCustomsProductImport',
                path: 'import/view/:id',
                component: () => import('@/modules/integration/modules/customs-product/import/View.vue'),
                meta: {
                    bcTo: {name: "IntegrationCustomsProduct"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'dbq-import-product-infos'),
                },
            },
            {
                name: 'ViewIntegrationCustomsProductExport',
                path: 'export/view/:id',
                component: () => import('@/modules/integration/modules/customs-product/export/View.vue'),
                meta: {
                    bcTo: {name: "IntegrationCustomsProduct"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'dbq-export-product-infos'),
                },
            }
        ],
    }
];
