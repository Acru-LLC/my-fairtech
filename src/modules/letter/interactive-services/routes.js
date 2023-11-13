import { ability } from '@/shared/store/ability'
export default [{
    path: '/check-appeal',
    name: 'Main',
    meta: {
        authRequired: true,
    },
    component: () => import('@/modules/letter/interactive-services/Main'),
    children: [
        {
            name: "Appeals",
            path: "/appeals",
            component: () => import('@/modules/letter/interactive-services/pages/Appeals'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ActivityInfo",
            path: "/activity-info",
            component: () => import('@/shared/views/rais/components/activityInfo'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ActivityRate",
            path: "/activity-rate",
            component: () => import('@/shared/views/rais/components/activityRate'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ActivityAppeals",
            path: "/activity-appeals",
            component: () => import('@/shared/views/rais/components/activityAppeals'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ActivityProvoked",
            path: "/activity-provoked",
            component: () => import('@/shared/views/rais/components/activityProvoked'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ActivityTender",
            path: "/activity-tender",
            component: () => import('@/shared/views/rais/components/activityTender'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ActivityLegal",
            path: "/activity-legal",
            component: () => import('@/shared/views/rais/components/activityLegal'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ActivityControlIshlar",
            path: "/activity-control-ishlar",
            component: () => import('@/shared/views/rais/components/activityControlIshlar'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ActivityControlIjro",
            path: "/activity-control-ijro",
            component: () => import('@/shared/views/rais/components/activityControlIjro'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ActivityLegalAll",
            path: "/activity-control-legal-all",
            component: () => import('@/shared/views/rais/components/legal/all.vue'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ActivityLegalEconomic",
            path: "/activity-control-legal-economic",
            component: () => import('@/shared/views/rais/components/legal/economic.vue'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ActivityLegalPersonal",
            path: "/activity-control-legal-personal",
            component: () => import('@/shared/views/rais/components/legal/personal.vue'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ActivityLegalAdministrative",
            path: "/activity-control-legal-administrative",
            component: () => import('@/shared/views/rais/components/legal/administrative.vue'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "FirstLegalList",
            path: "/activity-first-legal-list",
            component: () => import('@/shared/views/rais/components/legal/firstLegalList.vue'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "SecondLegalList",
            path: "/activity-second-legal-list",
            component: () => import('@/shared/views/rais/components/legal/secondLegalList.vue'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ThirdLegalList",
            path: "/activity-third-legal-list",
            component: () => import('@/shared/views/rais/components/legal/thirdLegalList.vue'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "AlcoholReport",
            path: "/activity-alcohol-report",
            component: () => import('@/shared/views/rais/components/alcoholReport.vue'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "CourtSession",
            path: "/activity-court-session",
            component: () => import('@/shared/views/rais/components/legal/courtSession.vue'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ReportChakana",
            path: "/customer-report-chakana",
            component: () => import('@/shared/views/rais/components/customer/reportChakana.vue'),
            meta: {
                authRequired: true,
            }
        },
        {
            name: "ReportUlgurji",
            path: "/customer-report-ulgurji",
            component: () => import('@/shared/views/rais/components/customer/reportUlgurji.vue'),
            meta: {
                authRequired: true,
            }
        }
    ]
}]
