import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'

export default [
    {
        id: "sugarStationsParentMenuId",
        label: i18n.t("submodules.sugar_stations.parent_title"),
        icon: "mdi mdi-spoon-sugar",
        subItems: [
            {
                id: "sugar-stations-1",
                label: i18n.t('submodules.sugar_stations.title'),
                icon: "mdi mdi-spoon-sugar",
                link: { name: "SugarStationsList" },
                parentId: "sugarStationsParentMenuId",
                hasPerm: () => ability.can('view', 'sugar-stations')
            },

            // MONITORING
            {
                id: "sugar-stations-2",
                label: i18n.t('submodules.ad_monitoring.title'),
                icon: "mdi mdi-map-search",
                link: { name: "SugarStationsMonitoring" },
                parentId: "sugarStationsParentMenuId",
                hasPerm: () => ability.can('view', 'sugar-stations-monitoring')
            }
        ]
    }
];