import {ability} from "@/shared/store/ability";

export default [
    {
        name: 'IntegrationIIVInfoIndex',
        path: 'iiv',
        component: () => import('@/modules/integration/modules/iiv/Index.vue'),
        meta: {
            bcTo: {name: "IntegrationIIVMenuIndex"},
            authRequired: true,
            // hasPerm: () => ability.can('view', 'statistics')
        },
    },
];
