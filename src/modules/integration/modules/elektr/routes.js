import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'elektr',
        name: 'IntegrationElektrInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
             // hasPerm: () => ability.can('view', 'elektr-info')
        },
        children: [
            {
                name: 'IntegrationElektrInfoIndex',
                path: 'info',
                component: () => import('@/modules/integration/modules/elektr/Index'),
                meta: {
                    bcTo: {name: "IntegrationElektrInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'elektr')
                },
            },
            // {
            //     name: 'IntegrationElektrInfoIndex',
            //     path: 'info-1',
            //     component: () => import('@/modules/integration/modules/elektr/Index1.vue'),
            //     meta: {
            //         bcTo: {name: "IntegrationElektrInfo"},
            //         authRequired: true,
            //          // hasPerm: () => ability.can('view', 'elektr')
            //     },
            // },
            // {
            //     name: 'IntegrationElektrInfo1Index',
            //     path: 'info-1',
            //     component: () => import('@/modules/integration/modules/elektr/Index1.vue'),
            //     meta: {
            //         bcTo: {name: "IntegrationElektrInfo"},
            //         authRequired: true,
            //          // hasPerm: () => ability.can('view', 'elektr')
            //     },
            // },
            // {
            //     name: 'IntegrationElektrInfo2Index',
            //     path: 'info-2',
            //     component: () => import('@/modules/integration/modules/elektr/Index2'),
            //     meta: {
            //         bcTo: {name: "IntegrationElektrInfo"},
            //         authRequired: true,
            //          // hasPerm: () => ability.can('view', 'elektr')
            //     },
            // },
            // {
            //     name: 'IntegrationElektrInfoCreate',
            //     path: 'create',
            //     component: () => import('@/modules/integration/modules/elektr/CreateOrUpdate.vue'),
            //     meta: {
            //         bcTo: {name: "IntegrationElektrInfo"},
            //         authRequired: true,
            //        // hasPerm: () => ability.can('save', 'information come from elektr')
            //     },
            // },
            // {
            //     name: 'IntegrationElektrInfoConfirm',
            //     path: 'confirm/:id',
            //     component: () => import('@/modules/integration/modules/elektr/Confirm.vue'),
            //     meta: {
            //         bcTo: {name: "IntegrationElektrInfo"},
            //         authRequired: true,
            //       // hasPerm: () => ability.can('save', 'elektr confirm info')
            //     },
            // },
        ],
    },
];
