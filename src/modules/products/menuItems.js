import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'
import petrol_stations_menu from "@/modules/products/petrol-stations/menuItems"

export default [
  {
    id: "productsParentMenuId",
    label: i18n.t("column.products"),
    icon: "mdi mdi-cart-variant",
    code: "fair_tech",
    hasPerm: () =>
      ability.can('view', 'bakery-stations') ||
      ability.can('view', 'bakery-stations-monitoring') ||
      ability.can('view', 'flour-stations') ||
      ability.can('view', 'flour-stations-monitoring') ||
      ability.can('view', 'sugar-stations') ||
      ability.can('view', 'sugar-stations-monitoring'),
    subItems: [
      ...petrol_stations_menu,
      {
        id: "bakeryStationsParentMenuId",
        label: i18n.t("submodules.bakery_stations.parent_title"),
        icon: "mdi mdi-bread-slice",
        parentId: "productsParentMenuId",
        hasPerm: () => ability.can('view', 'bakery-stations') ||
          ability.can('view', 'bakery-stations-monitoring'),
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
      },
      {
        id: "flourStationsParentMenuId",
        label: i18n.t("submodules.flour_stations.parent_title"),
        icon: "mdi mdi-book",
        parentId: "productsParentMenuId",
        hasPerm: () => ability.can('view', 'flour-stations') ||
          ability.can('view', 'flour-stations-monitoring'),
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
      },
      {
        id: "sugarStationsParentMenuId",
        label: i18n.t("submodules.sugar_stations.parent_title"),
        icon: "mdi mdi-spoon-sugar",
        parentId: "productsParentMenuId",
        hasPerm: () => ability.can('view', 'sugar-stations') ||
          ability.can('view', 'sugar-stations-monitoring'),
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
    ]
  }
];