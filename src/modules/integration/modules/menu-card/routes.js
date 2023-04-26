import {ability} from "@/shared/store/ability";

export default [
    {
        name: 'IntegrationMenuIndex',
        path: 'menu',
        component: () => import('@/modules/integration/modules/menu-card/menu'),
        meta: {
            bcTo: {name: "IntegrationMenuIndex"},
            authRequired: true,
            // hasPerm: () => ability.can('view', 'integration-menu-cards')
        },
    },
];
