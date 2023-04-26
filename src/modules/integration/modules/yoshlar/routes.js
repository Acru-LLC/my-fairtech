import {ability} from "@/shared/store/ability";

export default [
    {
        name: 'IntegrationYoshlarInfoIndex',
        path: 'yoshlar',
        component: () => import('@/modules/integration/modules/yoshlar/Index.vue'),
        meta: {
            bcTo: {name: "IntegrationYoshlarMenuIndex"},
            authRequired: true,
            // hasPerm: () => ability.can('view', 'statistics')
        },
    },
];
