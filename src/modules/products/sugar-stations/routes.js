import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";

export default [
    {
        name: "SugarStations",
        path: "/products/sugar-stations",
        redirect: "/products/sugar-stations",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcLinkText: i18n.t("submodules.sugar_stations.title"),
            bcTo: { name: "SugarStations" }
        },
        children: [
            // LIST_AND_CRUD
            {
                name: "SugarStationsList",
                path: "/products/sugar-stations",
                redirect: "/products/sugar-stations",
                component: {
                    render (c) {
                        return c('router-view')
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.ad_passport_info.title"),
                    bcTo: { name: "SugarStationsList" }
                },
                children: [
                    {
                        name: "SugarStationsListMain",
                        path: "",
                        component: () => import("@/modules/products/sugar-stations/modules/list_and_crud/Index"),
                        meta: {
                            bcLinkText: i18n.t("submodules.ad_passport_info.title"),
                            bcTo: { name: "SugarStationsListMain" },
                            hasPerm: () => ability.can('view', 'sugar-stations')
                        },
                    },

                    // CREATE/UPDATE
                    {
                        name: "CreateSugarStation",
                        path: "create",
                        component: () => import("@/modules/products/sugar-stations/modules/list_and_crud/CreateOrUpdate"),
                        meta: {
                            hasPerm: () => ability.can('create', 'sugar')
                        },
                    },
                    {
                        name: "UpdateSugarStation",
                        path: "update/:id",
                        component: () => import("@/modules/products/sugar-stations/modules/list_and_crud/CreateOrUpdate"),
                        meta: {
                            hasPerm: () => ability.can('update', 'sugar')
                        },
                    }
                ]
            },
            // MONITORING
            {
                name: "SugarStationsMonitoring",
                path: "/products/sugar-stations/monitoring",
                component: () => import("@/modules/products/sugar-stations/modules/monitoring/Index"),
                meta: {
                    bcLinkText: i18n.t("submodules.ad_monitoring.title"),
                    bcTo: { name: "SugarStationsMonitoring" },
                    hasPerm: () => ability.can('view', 'sugar-stations-monitoring')
                }
            },
            // DETAILS
            {
                name: "SugarStationsDetails",
                path: "/products/sugar-stations/details/:id",
                component: () => import("@/modules/products/sugar-stations/pages/AdDetails"),
                meta: {
                    bcLinkText: i18n.t("submodules.ad_details.title"),
                    bcTo: { name: "SugarStationsDetails" }
                }
            }
        ]
    }
]
