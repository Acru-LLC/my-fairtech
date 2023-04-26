import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'suv-xojaligi',
        name: 'IntegrationSuvXojaligiInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
            // hasPerm: () => ability.can('view', 'SuvXojaligi-info')
        },
        children: [
            {
                name: 'IntegrationSuvXojaligiInfoIndex',
                path: 'info',
                component: () => import('@/modules/integration/modules/suv-xojaligi-vazirlik/info1/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationSuvXojaligiInfoIndex"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'information come from SuvXojaligi'),
                },
            },
            {
                name: 'ViewIntegrationSuvXojaligiInfoIndex',
                path: 'info1/view/:id',
                component: () => import('@/modules/integration/modules/suv-xojaligi-vazirlik/info1/View.vue'),
                meta: {
                    bcTo: {name: "ViewIntegrationSuvXojaligiInfoIndex"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'information come from SuvXojaligi'),
                },
            },
        ],
    },
];
