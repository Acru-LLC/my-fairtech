import {ability} from "@/shared/store/ability";

export default [
    {
        path: 'e-auction-info',
        name: 'IntegrationEAuctionInfo',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        meta: {
            authRequired: true,
            hasPerm: () => ability.can('view', 'e-auction-info')
        },
        children: [
            {
                name: 'IntegrationEAuctionInfoIndex',
                path: '',
                component: () => import('@/modules/integration/modules/e-auction-info/Index.vue'),
                meta: {
                    bcTo: {name: "IntegrationEAuctionInfo"},
                    authRequired: true,
                    hasPerm: () => ability.can('view', 'e-auction-info')
                },
            },
            {
                name: 'IntegrationEAuctionInfoCreate',
                path: 'create',
                component: () => import('@/modules/integration/modules/e-auction-info/CreateOrUpdate.vue'),
                meta: {
                    bcTo: {name: "IntegrationEAuctionInfo"},
                    authRequired: true,
                    hasPerm: () => ability.can('save', 'information come from e-auction')
                },
            },
            {
                name: 'IntegrationEAuctionInfoConfirm',
                path: 'confirm/:id',
                component: () => import('@/modules/integration/modules/e-auction-info/Confirm.vue'),
                meta: {
                    bcTo: {name: "IntegrationEAuctionInfo"},
                    authRequired: true,
                    hasPerm: () => ability.can('save', 'e-action confirm info')
                },
            },
        ],
    },
];
