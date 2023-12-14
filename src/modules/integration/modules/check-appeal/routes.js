import {ability} from "@/shared/store/ability";

export default [
    {
        name: 'CheckAppeal',
        path: 'check-appeal',
        component: () => import('@/modules/integration/modules/check-appeal/Index.vue'),
        meta: {
            bcTo: {name: "IntegrationCheckAppealMenuIndex"},
            authRequired: true,
            // hasPerm: () => ability.can('view', 'statistics')
        },
    },
    {
        name: 'ServiceMaxsulot',
        path: 'services-maxsulot',
        component: () => import('@/modules/integration/modules/check-appeal/product-info/infos/Main.vue'),
        meta: {
            bcTo: {name: "IntegrationCheckAppealMenuIndex"},
            authRequired: true,
            // hasPerm: () => ability.can('view', 'statistics')
        },
    },
    {
        name: 'ServiceXizmat',
        path: 'services-maxsulot',
        component: () => import('@/modules/integration/modules/check-appeal/product-info/infos/Main2.vue'),
        meta: {
            bcTo: {name: "IntegrationCheckAppealMenuIndex"},
            authRequired: true,
            // hasPerm: () => ability.can('view', 'statistics')
        },
    },
    {
        name: 'ServicesProduct',
        path: 'services-product',
        component: () => import('@/modules/integration/modules/check-appeal/product-info/infos/Menu.vue'),
        meta: {
            bcTo: {name: "IntegrationCheckAppealMenuIndex"},
            authRequired: true,
            // hasPerm: () => ability.can('view', 'statistics')
        },
    },
];


