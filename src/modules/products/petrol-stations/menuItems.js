import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'

export default [
    {
        id: "petroliumProductsParentMenuId",
        label: i18n.t("submodules.petrolium_products.title"),
        icon: "mdi mdi-excavator",
        subItems: [
            {
                id: "petrolStationsParentMenuId",
                label: i18n.t("submodules.petrol_stations.title"),
                icon: "mdi mdi-gas-station",
                parentId: "petroliumProductsParentMenuId",
                subItems: [
                    // LIST_AND_CRUD
                    {
                        id: "petrol-stations-1",
                        label: i18n.t('column.petrol'),
                        icon: "mdi mdi-gas-station-outline",
                        link: { name: "PetrolStationsList" },
                        parentId: "petrolStationsParentMenuId",
                        hasPerm: () => ability.can('view', 'petrol-stations')
                    },
                    // MONITORING
                    {
                        id: "petrol-stations-2",
                        label: i18n.t('submodules.ad_monitoring.title'),
                        icon: "mdi mdi-map-search",
                        link: { name: "PetrolStationsMonitoring" },
                        parentId: "petrolStationsParentMenuId",
                        hasPerm: () => ability.can('view', 'petrol-stations-monitoring')
                    }
                ]
            },
        ]
    }
];