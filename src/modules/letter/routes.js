/* export default [
    {
        path: '/letter/create',
        name: 'Letter',
        component: () => import('@/modules/letter/create/create-doc'),
        meta: { authRequired: true },
    },
    {
        path: '/letter/income',
        name: 'LetterIncome',
        component: () => import('@/modules/letter/income/income'),
        meta: { authRequired: true },
    },
    {
        path: '/letter/income/:id/:id2',
        name: 'LetterSignature',
        component: () => import('@/modules/letter/income/signature'),
        meta: { authRequired: true },
    },
    {
        path: '/letter/sent',
        name: 'LetterSent',
        component: () => import('@/modules/letter/sent/sent'),
        meta: { authRequired: true },
    },
    {
        path: '/letter/office',
        name: 'Office-DOCUMENT',
        meta: { authRequired: true },
        component: () => import('@/modules/letter/office')
    }
] */

import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";

export default [
    {
        name: "Letter",
        path: "/letter",
        redirect: "/letter",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcLinkText: i18n.t("submodules.application_before_commission.title"),
            bcTo: { name: "Letter" }
        },
        children: [
            // LETTER
            {
                name: "letterMainRoute",
                path: "/letter/",
                redirect: "/letter/create",
                component: {
                    render (c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        name: "LetterMonitor",
                        path: "monitor",
                        component: () => import("@/modules/letter/monitor/monitor"),
                        meta: {
                            hasPerm: () => ability.can('view', 'application-monitor')
                        }
                    },
                    {
                        name: "LetterCreate",
                        path: "create",
                        component: () => import("@/modules/commission/create/Index"),
                        meta: {
                            hasPerm: () => ability.can('view', 'letter-create')
                        }
                    },
                    {
                        name: "LetterCreateSignature",
                        path: "send-for-sign/:id",
                        component: () => import('@/modules/commission/create/SendForSign'),
                        meta: {
                            // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
                        }
                    },
                    {
                        name: "LetterIncome",
                        path: "income",
                        component: () => import('@/modules/letter/income/income'),
                        meta: {
                            hasPerm: () => ability.can('view', 'letter-income')
                        }
                    },
                    {
                        name: "LetterSignature",
                        path: "income/:id/:id2",
                        // id - letterId; id2 - letterAssignmentId
                        component: () => import('@/modules/letter/income/signature'),
                        meta: {
                            // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
                        }
                    },
                    {
                        name: "LetterSignatureToManagement",
                        path: "income/to-management/:id/:id2",
                        component: () => import('@/modules/letter/income/signature'),
                        meta: {
                            // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
                        }
                    },
                    {
                        name: "LetterSent",
                        path: "sent",
                        component: () => import('@/modules/letter/sent/sent'),
                        meta: {
                            hasPerm: () => ability.can('view', 'letter-sent')
                        }
                    },
                    // {
                    //     name: "LetterSignature",
                    //     path: "income/:id/:id2",
                    //     component: () => import('@/modules/letter/sent/sent'),
                    //     meta: {
                    //         // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
                    //     }
                    // },
                    {
                        name: 'Office-DOCUMENT',
                        path: '/letter/office',
                        meta: {
                            // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
                        },
                        component: () => import('@/modules/letter/office')
                    },
                    {
                        name: "LetterVisa",
                        path: "visa",
                        component: () => import('@/modules/letter/visa/visa'),
                        meta: {
                            hasPerm: () => ability.can('view', 'letter-visa')
                        }
                    },
                    {
                        name: "LetterSignature",
                        path: "send_commission/:id",
                        component: () => import('@/modules/letter/income/send_commission'),
                        meta: {
                            // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
                        }
                    },
                    {
                        name: "BeforeCommission",
                        path: "before-commission/:id/:id2",
                        component: () => import('@/modules/letter/income/beforeCommission.vue'),
                        meta: {
                            // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
                        }
                    },
                    {
                        name: "MakeSignedToClosed",
                        path: "make-signed-to-closed/:id/:id2",
                        component: () => import('@/modules/letter/income/beforeCommission.vue'),
                        meta: {
                            // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
                        }
                    },
                    {
                        name: "LetterSignature",
                        path: "to-reject/:id/:id2",
                        component: () => import('@/modules/letter/income/to-reject'),
                        meta: {
                            // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
                        }
                    },
                ]
            },
        ]
    }
]
