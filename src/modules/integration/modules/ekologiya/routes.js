import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'ekologiya',
        name: 'IntegrationEkologiyaInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
          // hasPerm: () => ability.can('view', 'ekologiya-info')
        },
        children: [
            {
                name: 'IntegrationEkologiyaInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/ekologiya/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationEkologiyaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'ekologiya')
                },
            },
            {
                name: 'IntegrationEkologiyaInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/ekologiya/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationEkologiyaInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from ekologiya')
                },
            },
            {
                name: 'IntegrationEkologiyaInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/ekologiya/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationEkologiyaInfo"},
                    authRequired: true,
                 // hasPerm: () => ability.can('save', 'ekologiya confirm info')
                },
            },
        ],
    },
];
