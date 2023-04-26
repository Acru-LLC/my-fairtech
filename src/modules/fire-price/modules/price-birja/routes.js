import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'priceBirja',
        name: 'FirePriceBirja',
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
                name: 'FirePriceBirjaImportIndex',
                path: 'import',
                component: () => import('@/modules/fire-price/modules/price-birja/import/Index.vue'),
                meta: {
                    bcTo: {name: "FirePriceBirja"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'dbq-import-product-infos'),
                },
            },
            {
                name: 'FirePriceBirjaExportIndex',
                path: 'export',
                component: () => import('@/modules/fire-price/modules/price-birja/export/Index.vue'),
                meta: {
                    bcTo: {name: "FirePriceBirja"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'dbq-export-product-infos'),
                },
            },
            {
                name: 'ViewFirePriceBirjaImport',
                path: 'import/view/:id',
                component: () => import('@/modules/fire-price/modules/price-birja/import/View.vue'),
                meta: {
                    bcTo: {name: "FirePriceBirja"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'dbq-import-product-infos'),
                },
            },
            {
                name: 'ViewFirePriceBirjaExport',
                path: 'export/view/:id',
                component: () => import('@/modules/fire-price/modules/price-birja/export/View.vue'),
                meta: {
                    bcTo: {name: "FirePriceBirja"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'dbq-export-product-infos'),
                },
            }
        ],
    }
];
