import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";

export default [
    {
        name: "PetrolStations",
        path: "/products/petrol-stations",
        redirect: "/products/petrol-stations",
        component: () => import('@/router/views/dashboards/default'),
        meta: {
            bcLinkText: i18n.t("submodules.petrol_stations.title"),
            bcTo: { name: "PetrolStations" }
        },
        children: [
            // LIST_AND_CRUD
            {
                name: "PetrolStationsList",
                path: "/products/petrol-stations",
                redirect: "/products/petrol-stations",
                component: {
                    render (c) {
                        return c('router-view')
                    }
                },
                meta: {
                    bcLinkText: i18n.t("submodules.ad_passport_info.title"),
                    bcTo: { name: "PetrolStationsList" }
                },
                children: [
                    {
                        name: "PetrolStationsListMain",
                        path: "",
                        component: () => import("@/modules/products/petrol-stations/modules/list_and_crud/Index"),
                        meta: {
                            bcLinkText: i18n.t("submodules.ad_passport_info.title"),
                            bcTo: { name: "PetrolStationsListMain" },
                            hasPerm: () => ability.can('view', 'petrol-stations')
                        },
                    },

                    // CREATE/UPDATE
                    {
                        name: "CreatePetrolStation",
                        path: "create",
                        component: () => import("@/modules/products/petrol-stations/modules/list_and_crud/CreateOrUpdate"),
                        meta: {
                            hasPerm: () => ability.can('create', 'petrol')
                        },
                    },
                    {
                        name: "UpdatePetrolStation",
                        path: "update/:id",
                        component: () => import("@/modules/products/petrol-stations/modules/list_and_crud/CreateOrUpdate"),
                        meta: {
                            hasPerm: () => ability.can('update', 'petrol')
                        },
                    }
                ]
            },
            // MONITORING
            {
                name: "PetrolStationsMonitoring",
                path: "/products/petrol-stations/monitoring",
                component: () => import("@/modules/products/petrol-stations/modules/monitoring/Index"),
                meta: {
                    bcLinkText: i18n.t("submodules.ad_monitoring.title"),
                    bcTo: { name: "PetrolStationsMonitoring" },
                    hasPerm: () => ability.can('view', 'petrol-stations-monitoring')
                }
            },
            // DETAILS
            {
                name: "PetrolStationsDetails",
                path: "/products/petrol-stations/details/:id",
                component: () => import("@/modules/products/petrol-stations/pages/AdDetails"),
                meta: {
                    bcLinkText: i18n.t("submodules.ad_details.title"),
                    bcTo: { name: "PetrolStationsDetails" }
                }
            }
        ]
    }
]
