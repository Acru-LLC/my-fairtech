import i18n from "@/i18n";
import {ability} from "@/shared/store/ability";

export default [
    {
        name: "Pharm",
        path: "/pharm",
        redirect: "/pharm",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcLinkText: i18n.t("submodules.application_before_commission.title"),
            bcTo: {name: "Pharm"}
        },
        children: [
            {
                name: "PharmMonitor",
                path: "monitor",
                component: () => import("@/modules/pharm/monitor/monitor"),
                meta: {
                    // hasPerm: () => ability.can('view', '')
                }
            },
            {
                name: "PharmMonitorCreated",
                path: "monitor-created",
                component: () => import("@/modules/pharm/monitor-created/monitor"),
                meta: {
                    // hasPerm: () => ability.can('view', '')
                }
            },
            {
                name: "AppealWork",
                path: "work-with-document",
                component: () => import("@/modules/pharm/work/projects-grid.vue"),
                meta: {
                    // hasPerm: () => ability.can('view', '')
                }
            },
            {
                name: "PharmStart2",
                path: "pharmacy-list",
                component: () => import("@/modules/pharm/start/Start.vue"),
                meta: {
                    // hasPerm: () => ability.can('view', '')
                }
            },
            {
                name: "PharmStart3",
                path: "send-message",
                component: () => import("@/modules/pharm/start/Start.vue"),
                meta: {
                    // hasPerm: () => ability.can('view', '')
                }
            },
            {
                path: 'main',
                name: 'ApplicationMain',
                meta: {
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'projects')
                },
                component: () => import('@/modules/pharm/work/projects-grid')
            },
            {
                path: 'template',
                name: 'PharmTemplate',
                meta: {
                    authRequired: true,
                    // hasPerm: () => ability.can('view', 'projects')
                },
                component: () => import('@/modules/pharm/template/Index.vue')
            },
            {
                name: "CreatePharmTemplate",
                path: "header/create",
                component: () => import("@/modules/pharm/template/CreateOrUpdate"),
                meta: {
                    bcLinkText: i18n.t('column.document_status'),
                    bcTo: {name: "CreateOrganizations"}
                },
            },
            {
                name: "UpdatePharmTemplate",
                path: "header/update/:id",
                component: () => import("@/modules/pharm/template/CreateOrUpdate"),
                meta: {},
            },
        ]
    }
]
