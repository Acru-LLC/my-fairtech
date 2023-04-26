import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'tovar-xomashyo',
        name: 'IntegrationTovarXomashyoInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
            // hasPerm: () => ability.can('view', 'statistics-info')
        },
        children: [
            {
                name: 'IntegrationTovarXomashyoInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/tovar-xomashyo/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationTovarXomashyoInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'statistics')
                },
            },
            {
                name: 'IntegrationTovarXomashyoInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/tovar-xomashyo/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationTovarXomashyoInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from statistics')
                },
            },
            {
                name: 'IntegrationTovarXomashyoInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/tovar-xomashyo/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationTovarXomashyoInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'statistics confirm info')
                },
            },
        ],
    },
];
