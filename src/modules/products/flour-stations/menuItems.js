import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'

export default [
    {
        id: "flourStationsParentMenuId",
        label: i18n.t("submodules.flour_stations.parent_title"),
        icon: "mdi mdi-book",
        subItems: [
            {
                id: "flour-stations-1",
                label: i18n.t('submodules.flour_stations.title'),
                icon: "mdi mdi-book",
                link: { name: "FlourStationsList" },
                parentId: "flourStationsParentMenuId",
                hasPerm: () => ability.can('view', 'flour-stations')
            },

            // MONITORING
            {
                id: "flour-stations-2",
                label: i18n.t('submodules.ad_monitoring.title'),
                icon: "mdi mdi-map-search",
                link: { name: "FlourStationsMonitoring" },
                parentId: "flourStationsParentMenuId",
                hasPerm: () => ability.can('view', 'flour-stations-monitoring')
            }
        ]
    }
];