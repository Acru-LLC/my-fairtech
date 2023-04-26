import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'

export default [
    {
        id: "bakeryStationsParentMenuId",
        label: i18n.t("submodules.bakery_stations.parent_title"),
        icon: "mdi mdi-bread-slice",
        subItems: [
            {
                id: "bakery-stations-1",
                label: i18n.t('submodules.bakery_stations.title'),
                icon: "mdi mdi-bread-slice",
                link: { name: "BakeryStationsList" },
                parentId: "bakeryStationsParentMenuId",
                hasPerm: () => ability.can('view', 'bakery-stations')
            },

            // MONITORING
            {
                id: "bakery-stations-2",
                label: i18n.t('submodules.ad_monitoring.title'),
                icon: "mdi mdi-map-search",
                link: { name: "BakeryStationsMonitoring" },
                parentId: "bakeryStationsParentMenuId",
                hasPerm: () => ability.can('view', 'bakery-stations-monitoring')
            }
        ]
    }
];