import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'davlat-active',
        name: 'IntegrationDavlatActiveInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
            // hasPerm: () => ability.can('view', 'DavlatActive-info')
        },
        children: [
            {
                name: 'IntegrationDavlatActiveInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/davlat-aktivlari/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationDavlatActiveInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'DavlatActive')
                },
            },
            {
                name: 'IntegrationDavlatActiveInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/davlat-aktivlari/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationDavlatActiveInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'information come from DavlatActive')
                },
            },
            {
                name: 'IntegrationDavlatActiveInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/davlat-aktivlari/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationDavlatActiveInfo"},
                    authRequired: true,
                    // hasPerm: () => ability.can('save', 'DavlatActive confirm info')
                },
            },
        ],
    },
];

