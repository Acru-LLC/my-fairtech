import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'farmasevtika',
        name: 'IntegrationFarmasevtikaInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
             // hasPerm: () => ability.can('view', 'farmasevtika-info')
        },
        children: [
            {
                name: 'IntegrationFarmasevtikaInfoIndex',
                path: 'info',
                component: () => import('@/modules/integration/modules/farmasevtika/info1/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationFarmasevtikaInfoIndex"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'information come from farmasevtika'),
                },
            },
            {
                name: 'ViewIntegrationFarmasevtikaInfoIndex',
                path: 'info1/view/:id',
                component: () => import('@/modules/integration/modules/farmasevtika/info1/View.vue'),
                meta: {
                    bcTo: {name: "ViewIntegrationFarmasevtikaInfoIndex"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'information come from farmasevtika'),
                },
            },
        ],
    },
];
