import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'axborot-resurs-duk',
        name: 'IntegrationAxborotResursDUKInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
            // hasPerm: () => ability.can('view', 'axborot-resurs-duk-info')
        },
        children: [
            {
                name: 'IntegrationAxborotResursDUKInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/axborot-resurs-duk/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationAxborotResursDUKInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'axborot-resurs-duk')
                },
            },
            {
                name: 'IntegrationAxborotResursDUKInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/axborot-resurs-duk/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationAxborotResursDUKInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from axborot-resurs-duk')
                },
            },
            {
                name: 'IntegrationAxborotResursDUKInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/axborot-resurs-duk/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationAxborotResursDUKInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'axborot-resurs-duk confirm info')
                },
            },
        ],
    },
];
