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
        name: 'InfosProduct',
        path: 'infos-product',
        component: () => import('@/modules/integration/modules/check-appeal/product-info/infos/Main.vue'),
        meta: {
            bcTo: {name: "IntegrationCheckAppealMenuIndex"},
            authRequired: true,
            // hasPerm: () => ability.can('view', 'statistics')
        },
    },
];


