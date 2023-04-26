import {ability} from "@/shared/store/ability";

export default [
    {
        name: 'IntegrationSSVInfoIndex',
        path: 'ssv',
        component: () => import('@/modules/integration/modules/ssv/Index.vue'),
        meta: {
            bcTo: {name: "IntegrationSSVMenuIndex"},
            authRequired: true,
            // hasPerm: () => ability.can('view', 'statistics')
        },
    },
];


