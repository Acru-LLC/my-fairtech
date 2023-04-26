import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";

export default [
    {
        name: "FlourStations",
        path: "/products/flour-stations",
        redirect: "/products/flour-stations",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcLinkText: i18n.t("submodules.flour_stations.title"),
            bcTo: { name: "FlourStations" }
        },
        children: [
            // LIST_AND_CRUD
            {
                name: "FlourStationsList",
                path: "/products/flour-stations",
                redirect: "/products/flour-stations",
                component: {
                    render (c) {
                        return c('router-view')
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.ad_passport_info.title"),
                    bcTo: { name: "FlourStationsList" }
                },
                children: [
                    {
                        name: "FlourStationsListMain",
                        path: "",
                        component: () => import("@/modules/products/flour-stations/modules/list_and_crud/Index"),
                        meta: {
                            bcLinkText: i18n.t("submodules.ad_passport_info.title"),
                            bcTo: { name: "FlourStationsListMain" },
                            hasPerm: () => ability.can('view', 'flour-stations')
                        },
                    },

                    // CREATE/UPDATE
                    {
                        name: "CreateFlourStation",
                        path: "create",
                        component: () => import("@/modules/products/flour-stations/modules/list_and_crud/CreateOrUpdate"),
                        meta: {
                            hasPerm: () => ability.can('create', 'flour')
                        },
                    },
                    {
                        name: "UpdateFlourStation",
                        path: "update/:id",
                        component: () => import("@/modules/products/flour-stations/modules/list_and_crud/CreateOrUpdate"),
                        meta: {
                            hasPerm: () => ability.can('update', 'flour')
                        },
                    }
                ]
            },
            // MONITORING
            {
                name: "FlourStationsMonitoring",
                path: "/products/flour-stations/monitoring",
                component: () => import("@/modules/products/flour-stations/modules/monitoring/Index"),
                meta: {
                    bcLinkText: i18n.t("submodules.ad_monitoring.title"),
                    bcTo: { name: "FlourStationsMonitoring" },
                    hasPerm: () => ability.can('view', 'flour-stations-monitoring')
                }
            },
            // DETAILS
            {
                name: "FlourStationsDetails",
                path: "/products/flour-stations/details/:id",
                component: () => import("@/modules/products/flour-stations/pages/AdDetails"),
                meta: {
                    bcLinkText: i18n.t("submodules.ad_details.title"),
                    bcTo: { name: "FlourStationsDetails" }
                }
            }
        ]
    }
]
