import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";

export default [
    {
        name: "BakeryStations",
        path: "/products/bakery-stations",
        redirect: "/products/bakery-stations",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcLinkText: i18n.t("submodules.bakery_stations.title"),
            bcTo: { name: "BakeryStations" }
        },
        children: [
            // LIST_AND_CRUD
            {
                name: "BakeryStationsList",
                path: "/products/bakery-stations",
                redirect: "/products/bakery-stations",
                component: {
                    render (c) {
                        return c('router-view')
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.ad_passport_info.title"),
                    bcTo: { name: "BakeryStationsList" }
                },
                children: [
                    {
                        name: "BakeryStationsListMain",
                        path: "",
                        component: () => import("@/modules/products/bakery-stations/modules/list_and_crud/Index"),
                        meta: {
                            bcLinkText: i18n.t("submodules.ad_passport_info.title"),
                            bcTo: { name: "BakeryStationsListMain" },
                            hasPerm: () => ability.can('view', 'bakery-stations')
                        },
                    },

                    // CREATE/UPDATE
                    {
                        name: "CreateBakeryStation",
                        path: "create",
                        component: () => import("@/modules/products/bakery-stations/modules/list_and_crud/CreateOrUpdate"),
                        meta: {
                            hasPerm: () => ability.can('create', 'bakery')
                        },
                    },
                    {
                        name: "UpdateBakeryStation",
                        path: "update/:id",
                        component: () => import("@/modules/products/bakery-stations/modules/list_and_crud/CreateOrUpdate"),
                        meta: {
                            hasPerm: () => ability.can('update', 'bakery')
                        },
                    }
                ]
            },
            // MONITORING
            {
                name: "BakeryStationsMonitoring",
                path: "/products/bakery-stations/monitoring",
                component: () => import("@/modules/products/bakery-stations/modules/monitoring/Index"),
                meta: {
                    bcLinkText: i18n.t("submodules.ad_monitoring.title"),
                    bcTo: { name: "BakeryStationsMonitoring" },
                    hasPerm: () => ability.can('view', 'bakery-stations-monitoring')
                }
            },
            // DETAILS
            {
                name: "BakeryStationsDetails",
                path: "/products/bakery-stations/details/:id",
                component: () => import("@/modules/products/bakery-stations/pages/AdDetails"),
                meta: {
                    bcLinkText: i18n.t("submodules.ad_details.title"),
                    bcTo: { name: "BakeryStationsDetails" }
                }
            }
        ]
    }
]
