import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'
import templateSampleRoutes from '@/modules/references/modules/template-sample/routes'
export default [
  {
    name: "References",
    path: "/references",
    redirect: "/references",
    component: () => import('@/router/views/dashboards/default'),
    meta: {
      bcLinkText: i18n.t("submodules.references.title_plural"),
      bcTo: { name: "References" }
    },
    children: [
      // Template-Sample
      ...templateSampleRoutes,

      // Measurament Unit
      {
        name: "MeasuramentUnit",
        path: "/statistic-report/measurement-unit",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t("submodules.measurament_unit.title"),
          bcTo: { name: "MeasuramentUnit" }
        },
        children: [
          {
            name: "StatisticsReportMeasurementUnit",
            path: "/",
            component: () => import('@/modules/references/modules/measurement-unit/Index.vue'),
            meta: {
              // hasPerm: () => ability.can( 'view', 'measurement-unit' )
            }
          },
          {
            name: "CreateMeasurementUnit",
            path: "/create",
            component: () => import("@/modules/references/modules/measurement-unit/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t("submodules.measurament_unit.title"),
              bcTo: { name: "CreateMeasurementUnit" }
            },
          },
          {
            name: "UpdateMeasurementUnit",
            path: "/update/:id",
            component: () => import("@/modules/references/modules/measurement-unit/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refPosition',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t("submodules.measurament_unit.title")
            },
          },
        ]
      },
      // StatisticsReportQuarter
      {
        name: "StatisticsReportQuarterName",
        path: '/',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t("submodules.quarter.title"),
          bcTo: { name: "StatisticsReportQuarterName" }
        },
        children: [
          {
            name: "StatisticsReportQuarter",
            path: "/statistic-report/quarter",
            component: () => import('@/modules/references/modules/quarter/Index.vue'),
            meta: {
              // hasPerm: () => ability.can( 'view', 'quarter' )
            }
          },
          {
            name: "CreateStatisticsReportQuarter",
            path: "/statistic-report/quarter/create",
            component: () => import("@/modules/references/modules/quarter/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t("submodules.quarter.title"),
              bcTo: { name: "CreateStatisticsReportQuarter" }
            },
          },
          {
            name: "UpdateStatisticsReportQuarter",
            path: "/statistic-report/quarter/update/:id",
            component: () => import("@/modules/references/modules/quarter/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refPosition',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t("submodules.quarter.title")
            },
          },
        ]
      },
      // ADVERTISEMENT
      {
        name: "Advertisements",
        path: "/references/advertisement",
        redirect: "/references/advertisement",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t("submodules.advertisement.title"),
          bcTo: { name: "Advertisements" }
        },
        children: [
          {
            name: "AdvertisementLocationTypes",
            path: "/references/advertisement/location-types",
            redirect: "/references/advertisement/location-types",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t("submodules.references.location_type"),
              bcTo: { name: "AdvertisementLocationTypes" }
            },
            children: [
              {
                name: "AdvertisementLocationTypes",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_location_type/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'advertisement-location-types')
                }
              },
              {
                name: "CreateAdvertisementLocationType",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_location_type/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t("submodules.references.location_type"),
                  bcTo: { name: "CreateAdvertisementLocationType" }
                },
              },
              {
                name: "UpdateAdvertisementLocationType",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_location_type/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'refAdvertisementLocationType',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t("submodules.references.location_type")
                },
              },
            ]
          },
          // AD_DESIGN_TYPES
          {
            name: "AdvertisementDesignTypes",
            path: "/references/advertisement/design-types",
            redirect: "/references/advertisement/design-types",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t("submodules.references.ad_design_type"),
              bcTo: { name: "AdvertisementDesignTypes" }
            },
            children: [
              {
                name: "AdvertisementDesignTypes",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_design_type/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'advertisement-design-types')
                }
              },
              {
                name: "CreateAdvertisementDesignType",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_design_type/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t("submodules.references.ad_design_type"),
                  bcTo: { name: "CreateAdvertisementDesignType" }
                },
              },
              {
                name: "UpdateAdvertisementDesignType",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_design_type/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'refAdvertisementDesignType',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t("submodules.references.ad_design_type")
                },
              },
            ]
          },
          // AD_LOCATION_OF_OUTDOOR
          {
            name: "AdvertisementLocationOfOutdoor",
            path: "/references/advertisement/location-of-outdoor",
            redirect: "/references/advertisement/location-of-outdoor",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t("submodules.references.ad_constructive_place"),
              bcTo: { name: "AdvertisementLocationOfOutdoor" }
            },
            children: [
              {
                name: "AdvertisementLocationOfOutdoor",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_location_of_outdoor/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'advertisement-location-of-outdoors')
                }
              },
              {
                name: "CreateAdvertisementLocationOfOutdoor",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_location_of_outdoor/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t("submodules.references.ad_constructive_place"),
                  bcTo: { name: "CreateAdvertisementLocationOfOutdoor" }
                },
              },
              {
                name: "UpdateAdvertisementLocationOfOutdoor",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_location_of_outdoor/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'refAdvertisementLocationOfOutdoor',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t("submodules.references.ad_constructive_place")
                },
              },
            ]
          },
          // AD_PRIVILEGE_COEFFICIENTS
          {
            name: "AdvertisementPrivilegeCoefficients",
            path: "/references/advertisement/privilege-coefficients",
            redirect: "/references/advertisement/privilege-coefficients",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t('column.coefficient'),
              bcTo: { name: "AdvertisementPrivilegeCoefficients" }
            },
            children: [
              {
                name: "AdvertisementPrivilegeCoefficients",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_privilige_coefficient_for_design_type/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'advertisement-privilege-coefficients')
                }
              },
              {
                name: "CreateAdvertisementPrivilegeCoefficient",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_privilige_coefficient_for_design_type/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t('column.coefficient'),
                  bcTo: { name: "CreateAdvertisementPrivilegeCoefficient" }
                },
              },
              {
                name: "UpdateAdvertisementPrivilegeCoefficient",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_privilige_coefficient_for_design_type/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'refAdvertisementPrivilegeCoefficient',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t('column.coefficient')
                },
              },
            ]
          },
          // ADVERTISEMENT DESIGN TYPES BY REGION
          {
            name: "AdvertisementDesignTypesByRegion",
            path: "/references/advertisement/design-types-by-region",
            redirect: "/references/advertisement/design-types-by-region",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t('submodules.ad_design_type_by_regions.title'),
              bcTo: { name: "AdvertisementDesignTypesByRegion" }
            },
            children: [
              {
                name: "AdvertisementDesignTypesByRegion",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_design_types_by_region/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'advertisement-design-types-by-region')
                }
              },
              {
                name: "CreateAdvertisementDesignTypesByRegion",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_design_types_by_region/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t('submodules.ad_design_type_by_regions.title'),
                  bcTo: { name: "CreateAdvertisementDesignTypesByRegion" }
                },
              },
              {
                name: "UpdateAdvertisementDesignTypesByRegion",
                path: "update/:regionId/:adLocationTypeId",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_design_types_by_region/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'refAdvertisementDesignTypesByRegion',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t('submodules.ad_design_type_by_regions.title')
                },
              },
            ]
          },
          // ADVERTISEMENT_SIDES
          {
            name: "AdvertisementSides",
            path: "/references/advertisement/sides",
            redirect: "/references/advertisement/sides",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t("submodules.references.ad_sides"),
              bcTo: { name: "AdvertisementSides" }
            },
            children: [
              {
                name: "AdvertisementSides",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_sides/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'advertisement-sides')
                }
              },
              {
                name: "CreateAdvertisementSide",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_sides/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t("submodules.references.ad_sides"),
                  bcTo: { name: "CreateAdvertisementDesignType" }
                },
              },
              {
                name: "UpdateAdvertisementSide",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_sides/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'refAdvertisementSide',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t("submodules.references.ad_sides")
                },
              },
            ]
          },
          // ADVERTISEMENT_VOLUME_TYPES
          {
            name: "AdvertisementVolumeTypes",
            path: "/references/advertisement/volume-types",
            redirect: "/references/advertisement/volume-types",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t('submodules.ad_volume_types.title'),
              bcTo: { name: "AdvertisementVolumeTypes" }
            },
            children: [
              {
                name: "AdvertisementVolumeTypes",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_volume_types/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'advertisement-volume-types')
                }
              },
              {
                name: "CreateAdvertisementVolumeType",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_volume_types/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t('submodules.ad_volume_types.title'),
                  bcTo: { name: "CreateAdvertisementVolumeType" }
                },
              },
              {
                name: "UpdateAdvertisementVolumeType",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_volume_types/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'refAdvertisementVolumeType',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t('submodules.ad_volume_types.title')
                },
              },
            ]
          },
          // ADVERTISEMENT_VOLUME_TYPES_BY_LOCATION_TYPE
          {
            name: "AdvertisementVolumeTypesByLocationType",
            path: "/references/advertisement/volume-types-by-location-type",
            redirect: "/references/advertisement/volume-types-by-location-type",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t('submodules.ad_volume_types_by_location_type.title'),
              bcTo: { name: "AdvertisementVolumeTypesByLocationType" }
            },
            children: [
              {
                name: "AdvertisementVolumeTypesByLocationType",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_volume_types_by_location_type/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'advertisement-volume-types-by-location-types')
                }
              },
              {
                name: "CreateAdvertisementVolumeTypesByLocationType",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_volume_types_by_location_type/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t('submodules.ad_volume_types_by_location_type.title'),
                  bcTo: { name: "CreateAdvertisementVolumeTypesByLocationType" }
                },
              },
              {
                name: "UpdateAdvertisementVolumeTypesByLocationType",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_volume_types_by_location_type/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'refAdvertisementVolumeTypesByLocationType',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t('submodules.ad_volume_types_by_location_type.title')
                },
              },
            ]
          },
          // ADVERTISEMENT_GROUPS
          {
            name: "AdvertisementGroups",
            path: "/references/advertisement/groups",
            redirect: "/references/advertisement/groups",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t("submodules.references.ad_group"),
              bcTo: { name: "AdvertisementGroups" }
            },
            children: [
              {
                name: "AdvertisementGroups",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_group/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'advertisement-groups')
                }
              },
              {
                name: "CreateAdvertisementGroup",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_group/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t("submodules.references.ad_group"),
                  bcTo: { name: "CreateAdvertisementGroup" }
                },
              },
              {
                name: "UpdateAdvertisementGroup",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_group/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'refAdvertisementGroup',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t("submodules.references.ad_group")
                },
              },
            ]
          },
          // ADVERTISEMENT_ZONES
          {
            name: "AdvertisementZones",
            path: "/references/advertisement/zones",
            redirect: "/references/advertisement/zones",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t("submodules.references.ad_zones"),
              bcTo: { name: "AdvertisementZones" }
            },
            children: [
              {
                name: "AdvertisementZones",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_zone/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'advertisement-zones')
                }
              },
              {
                name: "CreateAdvertisementZone",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_zone/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t("submodules.references.ad_zones"),
                  bcTo: { name: "CreateAdvertisementZone" }
                },
              },
              {
                name: "UpdateAdvertisementZone",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_zone/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'refAdvertisementZone',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t("submodules.references.ad_zones")
                },
              },
            ]
          },
          // ADVERTISEMENT_OBJECT_STATE
          {
            name: "AdvertisementObjectStates",
            path: "/references/advertisement/object-states",
            redirect: "/references/advertisement/object-states",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t("submodules.references.ad_object_state"),
              bcTo: { name: "AdvertisementObjectStates" }
            },
            children: [
              {
                name: "AdvertisementObjectStates",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_object_state/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'advertisement-object-states')
                }
              },
              {
                name: "CreateAdvertisementObjectState",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_object_state/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t("submodules.references.ad_object_state"),
                  bcTo: { name: "CreateAdvertisementObjectState" }
                },
              },
              {
                name: "UpdateAdvertisementObjectState",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_object_state/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'refAdvertisementObjectState',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t("submodules.references.ad_object_state")
                },
              },
            ]
          },
          // ADVERTISEMENT_TYPE
          {
            name: "AdvertisementTypes",
            path: "/references/advertisement/types",
            redirect: "/references/advertisement/types",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t("submodules.references.ad_type"),
              bcTo: { name: "AdvertisementTypes" }
            },
            children: [
              {
                name: "AdvertisementTypes",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_type/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'advertisement-types')
                }
              },
              {
                name: "CreateAdvertisementType",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_type/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t("submodules.references.ad_type"),
                  bcTo: { name: "CreateAdvertisementType" }
                },
              },
              {
                name: "UpdateAdvertisementType",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/ad_type/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'refAdvertisementType',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t("submodules.references.ad_type")
                },
              },
            ]
          },
          // ZONE_COEFFICIENTS
          {
            name: "ZoneCoefficients",
            path: "/references/advertisement/zone-coefficients",
            redirect: "/references/advertisement/zone-coefficients",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t("submodules.references.zone_cofficients"),
              bcTo: { name: "ZoneCoefficients" }
            },
            children: [
              {
                name: "ZoneCoefficients",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/zone_coefficients/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'zone-coefficients')
                }
              },
              {
                name: "CreateZoneCoefficient",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/zone_coefficients/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t("submodules.references.zone_cofficients"),
                  bcTo: { name: "CreateZoneCoefficient" }
                },
              },
              {
                name: "UpdateZoneCoefficient",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/zone_coefficients/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'regZoneCoefficient',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t("submodules.references.zone_cofficients")
                },
              },
            ]
          },
          // MINIMUM_COLLECTIONS
          {
            name: "MinimumCollections",
            path: "/references/advertisement/minimum-collections",
            redirect: "/references/advertisement/minimum-collections",
            component: {
              render(c) {
                return c('router-view')
              }
            },
            meta: {
              bcLinkText: i18n.t("submodules.references.minimum_collection"),
              bcTo: { name: "MinimumCollections" }
            },
            children: [
              {
                name: "MinimumCollections",
                path: "",
                component: () => import("@/modules/references/modules/advertisement/modules/minimum_collections/Index"),
                meta: {
                  hasPerm: () => ability.can('view', 'minimum-collections')
                }
              },
              // INDEX PAGE ROUTE FOR EXTENDED MIN_COLLECTION
              /* {
                                name: "MinimumCollectionsExtended",
                                path: "extended",
                                component: () => import("@/modules/references/modules/advertisement/modules/minimum_collections/Index_extended"),
                            }, */
              {
                name: "CreateMinimumCollection",
                path: "create",
                component: () => import("@/modules/references/modules/advertisement/modules/minimum_collections/CreateOrUpdate"),
                meta: {
                  bcLinkText: i18n.t("submodules.references.minimum_collection"),
                  bcTo: { name: "CreateMinimumCollection" }
                },
              },
              {
                name: "UpdateMinimumCollection",
                path: "update/:id",
                component: () => import("@/modules/references/modules/advertisement/modules/minimum_collections/CreateOrUpdate"),
                meta: {
                  bcDynamic: true,
                  paramName: 'id',
                  bcStateVarAndModuleName: {
                    stateVar: 'currentItem',
                    moduleName: 'regMinimumCollection',
                    stateVarKey: 'name'
                  },
                  bcLinkText: i18n.t("submodules.references.minimum_collection")
                },
              },
              // UPDATE PAGE ROUTE FOR EXTENDED MIN_COLLECTION
              /* {
                                name: "UpdateMinimumCollectionExtended",
                                path: "update/extended/:id",
                                component: () => import("@/modules/references/modules/advertisement/modules/minimum_collections/CreateOrUpdate"),
                                meta: {
                                    bcDynamic: true,
                                    paramName: 'id',
                                    bcStateVarAndModuleName: { stateVar: 'currentItem', moduleName: 'regMinimumCollection', stateVarKey: 'name' },
                                    bcLinkText: '1 кв/м учун минимал йиғим (М)'
                                },
                            }, */
            ]
          },
        ]
      },
      // DEPARTMENT_TYPES
      {
        name: "DepartmentTypes",
        path: "/references/department-types",
        redirect: "/references/department-types",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('column.department_types'),
          bcTo: { name: "DepartmentTypes" }
        },
        children: [
          {
            name: "DepartmentTypes",
            path: "",
            component: () => import("@/modules/references/modules/department_types/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'department-types')
            }
          },
          {
            name: "CreateDepartmentType",
            path: "create",
            component: () => import("@/modules/references/modules/department_types/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t("submodules.department_type.title"),
              bcTo: { name: "CreateDepartmentType" }
            },
          },
          {
            name: "UpdateDepartmentType",
            path: "update/:id",
            component: () => import("@/modules/references/modules/department_types/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refDepartmentType',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t("submodules.department_type.title")
            },
          },
        ]
      },
      // DEPARTMENT_NAMES
      {
        name: "DepartmentNames",
        path: "/references/department-names",
        redirect: "/references/department-names",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('column.department_names'),
          bcTo: { name: "DepartmentNames" }
        },
        children: [
          {
            name: "DepartmentNames",
            path: "",
            component: () => import("@/modules/references/modules/department_names/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'department-names')
            }
          },
          {
            name: "CreateDepartmentName",
            path: "create",
            component: () => import("@/modules/references/modules/department_names/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('column.document_name'),
              bcTo: { name: "CreateDepartmentType" }
            },
          },
          {
            name: "UpdateDepartmentName",
            path: "update/:id",
            component: () => import("@/modules/references/modules/department_names/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refDepartmentName',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('column.document_name')
            },
          },
        ]
      },
      // DEPARTMENT PERMISSION TYPES
      {
        name: "DepartmentPermissionTypes",
        path: "department-permission-types",
        redirect: "department-permission-types",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        meta: {
          bcLinkText: i18n.t("submodules.department_permission_types.title"),
          bcTo: { name: "DepartmentPermissionTypesMain" }
        },
        children: [
          {
            name: "DepartmentPermissionTypesMain",
            path: "",
            component: () =>
              import("@/modules/references/modules/department_permission_types/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'department-permission-types')
            }
          },
          {
            name: "UpdateDepartmentPermissionType",
            path: "update/:id",
            component: () =>
              import("@/modules/references/modules/department_permission_types/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: "id",
              bcStateVarAndModuleName: {
                stateVar: "currentItem",
                moduleName: "referenceDepartmentPermissions",
                stateVarKey: "name"
              },
              bcLinkText: i18n.t("submodules.department_permission_types.title"),
              // hasPerm: () => ability.can('update', 'permission')
            }
          },
        ]
      },
      // CONTRACTOR_STATUSES
      {
        name: "ContractorStatuses",
        path: "/references/contractor-statuses",
        redirect: "/references/contractor-statuses",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('column.contractors_status'),
          bcTo: { name: "ContractorStatuses" }
        },
        children: [
          {
            name: "ContractorStatuses",
            path: "",
            component: () => import("@/modules/references/modules/contractor_statuses/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'contractor-statuses')
            }
          },
          {
            name: "UpdateContractorStatus",
            path: "update/:id",
            component: () => import("@/modules/references/modules/contractor_statuses/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refContractorStatus',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('column.contractors_status')
            },
          },
        ]
      },
      // CONTRACTORS
      {
        name: "Contractors",
        path: "/references/contractors",
        redirect: "/references/contractors",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t("submodules.contractor.title"),
          bcTo: { name: "Contractors" }
        },
        children: [
          {
            name: "Contractors",
            path: "",
            component: () => import("@/modules/references/modules/contractors/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'contractors')
            }
          },
          {
            name: "CreateContractor",
            path: "create",
            component: () => import("@/modules/references/modules/contractors/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t("submodules.contractor.title"),
              bcTo: { name: "CreateContractor" }
            },
          },
          {
            name: "UpdateContractor",
            path: "update/:id",
            component: () => import("@/modules/references/modules/contractors/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refContractor',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t("submodules.contractor.title")
            },
          },
        ]
      },

      // price-stock product-name
      {
        name: "ReferencesPriceStockProductName",
        path: "/references/price-stock/product-name",
        redirect: "/references/price-stock/product-name",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.integration.price_stock.product_name_title'),
          bcTo: { name: "ReferencesPriceStockProductName" }
        },
        children: [
          {
            name: "ReferencesPriceStockProductNameIndex",
            path: "",
            component: () => import("@/modules/references/modules/price-stock/product-name/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'product name')
            }
          },
          {
            name: "ReferencesPriceStockProductNameCreate",
            path: "create",
            component: () => import("@/modules/references/modules/price-stock/product-name/CreateOrUpdate"),
            meta: {
              hasPerm: () => ability.can('create', 'product name')
            },
          },
          {
            name: "ReferencesPriceStockProductNameUpdate",
            path: "update/:id",
            component: () => import("@/modules/references/modules/price-stock/product-name/CreateOrUpdate"),
            meta: {
              hasPerm: () => ability.can('update', 'product name')
            },
          },
        ]
      },

      // price-stock region-name
      {
        name: "ReferencesPriceStockRegionName",
        path: "/references/price-stock/region-name",
        redirect: "/references/price-stock/region-name",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.integration.price_stock.region_name_title'),
          bcTo: { name: "ReferencesPriceStockRegionName" }
        },
        children: [
          {
            name: "ReferencesPriceStockRegionNameIndex",
            path: "",
            component: () => import("@/modules/references/modules/price-stock/region-name/Index"),
            meta: {
              hasPerm: () => ability.can('list', 'region name')
            }
          },
          {
            name: "ReferencesPriceStockRegionNameCreate",
            path: "create",
            component: () => import("@/modules/references/modules/price-stock/region-name/CreateOrUpdate"),
            meta: {
              hasPerm: () => ability.can('create', 'region name')
            },
          },
          {
            name: "ReferencesPriceStockRegionNameUpdate",
            path: "update/:id",
            component: () => import("@/modules/references/modules/price-stock/region-name/CreateOrUpdate"),
            meta: {
              hasPerm: () => ability.can('update', 'region name')
            },
          },
        ]
      },

      // price/product
      {
        name: "ReferencesProduct",
        path: "/references/product",
        redirect: "/references/product",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.product.menu_title'),
          bcTo: { name: "ReferencesProduct" }
        },
        children: [
          {
            name: "ReferencesProductIndex",
            path: "",
            component: () => import("@/modules/references/modules/product/Index"),
            meta: {
              hasPerm: () => ability.can('list', 'products')
            }
          },
          {
            name: "ReferencesProductCreate",
            path: "create",
            component: () => import("@/modules/references/modules/product/CreateOrUpdate"),
            meta: {
              hasPerm: () => ability.can('create', 'products')
            },
          },
        ]
      },

      // NOTIFICATION_STATUSES
      {
        name: "NotificationStatuses",
        path: "/references/notification-statuses",
        redirect: "/references/notification-statuses",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.notification_statuses.title'),
          bcTo: { name: "NotificationStatuses" }
        },
        children: [
          {
            name: "NotificationStatuses",
            path: "",
            component: () => import("@/modules/references/modules/notification_statuses/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'contractor-statuses')
            }
          },
          {
            name: "UpdateNotificationStatus",
            path: "update/:id",
            component: () => import("@/modules/references/modules/notification_statuses/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcLinkText: 'Билдиришнома статуси'
            },
          },
        ]
      },
      // PROFESSIONS
      /* {
                name: "Professions",
                path: "/references/professions",
                redirect: "/references/professions",
                component: {
                    render(c) {
                        return c( 'router-view' )
                    }
                },
                meta: {
                    bcLinkText: "Соҳалар",
                    bcTo: {name: "Professions"}
                },
                children: [
                    {
                        name: "Professions",
                        path: "",
                        component: () => import("@/modules/references/modules/professions/Index"),
                        meta: {
                            hasPerm: () => ability.can( 'view', 'professions' )
                        }
                    },
                    {
                        name: "CreateProfession",
                        path: "create",
                        component: () => import("@/modules/references/modules/professions/CreateOrUpdate"),
                        meta: {
                            bcLinkText: "Соҳалар",
                            bcTo: {name: "CreateProfession"}
                        },
                    },
                    {
                        name: "UpdateProfession",
                        path: "update/:id",
                        component: () => import("@/modules/references/modules/professions/CreateOrUpdate"),
                        meta: {
                            bcDynamic: true,
                            paramName: 'id',
                            bcStateVarAndModuleName: {
                                stateVar: 'currentItem',
                                moduleName: 'refProfession',
                                stateVarKey: 'name'
                            },
                            bcLinkText: 'Соҳалар'
                        },
                    },
                ]
            }, */
      // PRODUCT_OR_SERVICE_TYPES
      {
        name: "ProductOrServiceTypes",
        path: "/references/product-or-service-types",
        redirect: "/references/product-or-service-types",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.product_or_service_types.title'),
          bcTo: { name: "ProductOrServiceTypes" }
        },
        children: [
          {
            name: "ProductOrServiceTypes",
            path: "",
            component: () => import("@/modules/references/modules/product_or_service_types/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'product-or-service-types')
            }
          },
          {
            name: "CreateProductOrServiceType",
            path: "create/:cStatusCode/:cStatusId",
            component: () => import("@/modules/references/modules/product_or_service_types/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.product_or_service_types.title'),
              bcTo: { name: "CreateProductOrServiceType" }
            },
          },
          {
            name: "UpdateProductOrServiceType",
            path: "update/:cStatusCode/:id",
            component: () => import("@/modules/references/modules/product_or_service_types/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refProductOrServiceType',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.product_or_service_types.title')
            },
          },
        ]
      },
      // PRODUCT_OR_SERVICE_TYPES_CHILD
      /* {
                name: "ProductOrServiceTypesChild",
                path: "/references/product-or-service-types-child",
                redirect: "/references/product-or-service-types-child",
                component: {
                    render (c) {
                        return c('router-view')
                    }
                },
                meta: {
                    bcLinkText: i18n.t('submodules.product_or_service_types_child.title'),
                    bcTo: { name: "ProductOrServiceTypesChild" }
                },
                children: [
                    {
                        name: "ProductOrServiceTypesChildMain",
                        path: "",
                        component: () => import("@/modules/references/modules/product_or_service_types_child/Index"),
                        meta: {
                            // hasPerm: () => ability.can('view', 'product-or-service-types-child')
                        }
                    },
                    {
                        name: "CreateProductOrServiceTypeChild",
                        path: "create/:cStatusId",
                        component: () => import("@/modules/references/modules/product_or_service_types_child/CreateOrUpdate"),
                        meta: {
                            bcLinkText: i18n.t('submodules.product_or_service_types_child.title'),
                            bcTo: { name: "CreateProductOrServiceTypeChild" }
                        },
                    },
                    {
                        name: "UpdateProductOrServiceTypeChild",
                        path: "update/:id",
                        component: () => import("@/modules/references/modules/product_or_service_types_child/CreateOrUpdate"),
                        meta: {

                        },
                    },
                ]
            }, */
      // PRODUCT_OR_SERVICES
      {
        name: "ProductOrServices",
        path: "/references/product-or-services",
        redirect: "/references/product-or-services",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.product_or_services.title'),
          bcTo: { name: "ProductOrServices" }
        },
        children: [
          {
            name: "ProductOrServices",
            path: "",
            component: () => import("@/modules/references/modules/product_or_services/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'product-or-services')
            }
          },
          {
            name: "CreateProductOrService",
            path: "create/:cStatusId",
            component: () => import("@/modules/references/modules/product_or_services/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.product_or_services.title'),
              bcTo: { name: "CreateProductOrServiceType" }
            },
          },
          {
            name: "UpdateProductOrService",
            path: "update/:cStatusId/:id",
            component: () => import("@/modules/references/modules/product_or_services/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refProductOrService',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.product_or_services.title')
            },
          },
        ]
      },
      // PRODUCT_OR_SERVICES_estestveniy
      {
        name: "ProductOrServicesEstestveniy",
        path: "/references/product-or-services-estestveniy",
        redirect: "/references/product-or-services-estestveniy",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.product_or_services_estestveniy.title'),
          bcTo: { name: "ProductOrServicesEstestveniy" }
        },
        children: [
          {
            name: "ProductOrServices",
            path: "",
            component: () => import("@/modules/references/modules/product_or_services_estestveniy/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'product-or-services-estestveniy')
            }
          },
          {
            name: "CreateProductOrServiceEstestveniy",
            path: "create/:cStatusId",
            component: () => import("@/modules/references/modules/product_or_services_estestveniy/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.product_or_services_estestveniy.title'),
              bcTo: { name: "CreateProductOrServiceType" }
            },
          },
          {
            name: "UpdateProductOrServiceEstestveniy",
            path: "update/:cStatusId/:id",
            component: () => import("@/modules/references/modules/product_or_services_estestveniy/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refProductOrServiceEstestveniy',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.product_or_services_estestveniy.title')
            },
          },
        ]
      },
      // PRODUCT_OR_SERVICES_daminiriushiy
      {
        name: "ProductOrServicesDaminiriushiy",
        path: "/references/product-or-services-daminiriushiy",
        redirect: "/references/product-or-services-daminiriushiy",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.product_or_services_daminiriushiy.title'),
          bcTo: { name: "ProductOrServicesDaminiriushiy" }
        },
        children: [
          {
            name: "ProductOrServicesDaminiriushiy",
            path: "",
            component: () => import("@/modules/references/modules/product_or_services_daminiriushiy/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'product-or-services-daminiriushiy')
            }
          },
          {
            name: "CreateProductOrServiceDaminiriushiy",
            path: "create/:cStatusId",
            component: () => import("@/modules/references/modules/product_or_services_daminiriushiy/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.product_or_services_daminiriushiy.title'),
              bcTo: { name: "CreateProductOrServiceType" }
            },
          },
          {
            name: "UpdateProductOrServiceDaminiriushiy",
            path: "update/:cStatusId/:id",
            component: () => import("@/modules/references/modules/product_or_services_daminiriushiy/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refProductOrServiceDaminiriushiy',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.product_or_services_daminiriushiy.title')
            },
          },
        ]
      },
      // OKED
      {
        name: "Oked",
        path: "/references/oked",
        redirect: "/references/oked",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('column.oked'),
          bcTo: { name: "Oked" }
        },
        children: [
          {
            name: "OkedMain",
            path: "",
            component: () => import("@/modules/references/modules/oked/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'oked')
            }
          },
          {
            name: "CreateOked",
            path: "create",
            component: () => import("@/modules/references/modules/oked/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('column.oked'),
              bcTo: { name: "CreateOked" }
            },
          },
          {
            name: "UpdateOked",
            path: "update/:id",
            component: () => import("@/modules/references/modules/oked/CreateOrUpdate"),
            meta: {},
          },
        ]
      },
      // SKP
      {
        name: "Skp",
        path: "/references/skp",
        redirect: "/references/skp",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('column.skp_code'),
          bcTo: { name: "Skp" }
        },
        children: [
          {
            name: "SkpMain",
            path: "",
            component: () => import("@/modules/references/modules/skp/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'skp')
            }
          },
          {
            name: "CreateSkp",
            path: "create",
            component: () => import("@/modules/references/modules/skp/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('column.skp_code'),
              bcTo: { name: "CreateSkp" }
            },
          },
          {
            name: "UpdateSkp",
            path: "update/:id",
            component: () => import("@/modules/references/modules/skp/CreateOrUpdate"),
            meta: {},
          },
        ]
      },
      // TNVED
      {
        name: "Tnved",
        path: "/references/tnved",
        redirect: "/references/tnved",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('column.tnved_code'),
          bcTo: { name: "Tnved" }
        },
        children: [
          {
            name: "TnvedMain",
            path: "",
            component: () => import("@/modules/references/modules/tnved/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'tnved')
            }
          },
          {
            name: "CreateTnved",
            path: "create",
            component: () => import("@/modules/references/modules/tnved/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('column.tnved_code'),
              bcTo: { name: "CreateTnved" }
            },
          },
          {
            name: "UpdateTnved",
            path: "update/:id",
            component: () => import("@/modules/references/modules/tnved/CreateOrUpdate"),
            meta: {},
          },
        ]
      },
      // GROUP_OF_INDIVIDUALS
      {
        name: "GroupOfIndividuals",
        path: "/references/group-of-individuals",
        redirect: "/references/group-of-individuals",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('column.group_of_individuals'),
          bcTo: { name: "GroupOfIndividuals" }
        },
        children: [
          {
            name: "GroupOfIndividualsMain",
            path: "",
            component: () => import("@/modules/references/modules/group_of_individuals/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'group-of-individuals')
            }
          },
          {
            name: "CreateGroupOfIndividuals",
            path: "create",
            component: () => import("@/modules/references/modules/group_of_individuals/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('column.group_of_individuals'),
              bcTo: { name: "CreateGroupOfIndividuals" }
            },
          },
          {
            name: "UpdateGroupOfIndividuals",
            path: "update/:id",
            component: () => import("@/modules/references/modules/group_of_individuals/CreateOrUpdate"),
            meta: {},
          },
        ]
      },
      // POSITIONS
      {
        name: "Positions",
        path: "/references/positions",
        redirect: "/references/positions",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('column.positions'),
          bcTo: { name: "Positions" }
        },
        children: [
          {
            name: "Positions",
            path: "",
            component: () => import("@/modules/references/modules/positions/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'positions')
            }
          },
          {
            name: "CreatePosition",
            path: "create",
            component: () => import("@/modules/references/modules/positions/CreateOrUpdate"),
            meta: {
              bcLinkText: "Лавозим",
              bcTo: { name: "CreatePosition" }
            },
          },
          {
            name: "UpdatePosition",
            path: "update/:id",
            component: () => import("@/modules/references/modules/positions/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refPosition',
                stateVarKey: 'name'
              },
              bcLinkText: 'Лавозим'
            },
          },
        ]
      },
      // STATUSES
      {
        name: "Statuses",
        path: "/references/statuses",
        redirect: "/references/statuses",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: "Статус",
          bcTo: { name: "Statuses" }
        },
        children: [
          {
            name: "Statuses",
            path: "",
            component: () => import("@/modules/references/modules/statuses/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'statuses')
            }
          },
          {
            name: "CreateStatus",
            path: "create",
            component: () => import("@/modules/references/modules/statuses/CreateOrUpdate"),
            meta: {
              bcLinkText: "Статус",
              bcTo: { name: "CreateStatus" }
            },
          },
          {
            name: "UpdateStatus",
            path: "update/:id",
            component: () => import("@/modules/references/modules/statuses/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refStatus',
                stateVarKey: 'name'
              },
              bcLinkText: 'Статус'
            },
          },
        ]
      },
      // VALUE_TYPES
      {
        name: "ValueTypes",
        path: "/references/value-types",
        redirect: "/references/value-types",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('column.value_type'),
          bcTo: { name: "ValueTypes" }
        },
        children: [
          {
            name: "ValueTypesMain",
            path: "",
            component: () => import("@/modules/references/modules/value_types/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'value-types')
            }
          },
          {
            name: "UpdateValueType",
            path: "update/:id",
            component: () => import("@/modules/references/modules/value_types/CreateOrUpdate")
          },
        ]
      },
      // DOCUMENT_STATUSES
      {
        name: "DocumentStatuses",
        path: "/references/document-statuses",
        redirect: "/references/document-statuses",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('column.document_status'),
          bcTo: { name: "DocumentStatuses" }
        },
        children: [
          {
            name: "DocumentStatusesMain",
            path: "",
            component: () => import("@/modules/references/modules/document_statuses/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'document-statuses')
            }
          },
          {
            name: "CreateDocumentStatus",
            path: "create",
            component: () => import("@/modules/references/modules/document_statuses/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('column.document_status'),
              bcTo: { name: "CreateDocumentStatus" }
            },
          },
          {
            name: "UpdateDocumentStatus",
            path: "update/:id",
            component: () => import("@/modules/references/modules/document_statuses/CreateOrUpdate"),
            meta: {},
          },
        ]
      },
      // UNITS
      {
        name: "Units",
        path: "/references/units",
        redirect: "/references/units",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('column.units'),
          bcTo: { name: "Units" }
        },
        children: [
          {
            name: "Units",
            path: "",
            component: () => import("@/modules/references/modules/units/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'units')
            }
          },
          {
            name: "CreateUnit",
            path: "create",
            component: () => import("@/modules/references/modules/units/CreateOrUpdate"),
            meta: {
              bcLinkText: "Ўлчов бирлиги",
              bcTo: { name: "CreateUnit" }
            },
          },
          {
            name: "UpdateUnit",
            path: "update/:id",
            component: () => import("@/modules/references/modules/units/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refUnit',
                stateVarKey: 'name'
              },
              bcLinkText: 'Ўлчов бирлиги'
            },
          },
        ]
      },
      // FORM_OF_OWNERSHIP
      {
        name: "FormOfOwnership",
        path: "/references/form-of-ownership",
        redirect: "/references/form-of-ownership",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.form_of_ownership.title'),
          bcTo: { name: "FormOfOwnership" }
        },
        children: [
          {
            name: "FormOfOwnershipMain",
            path: "",
            component: () => import("@/modules/references/modules/form_of_ownership/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'form-of-ownership')
            }
          },
          {
            name: "CreateFormOfOwnership",
            path: "create",
            component: () => import("@/modules/references/modules/form_of_ownership/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.form_of_ownership.title'),
              bcTo: { name: "CreateFormOfOwnership" }
            },
          },
          {
            name: "UpdateFormOfOwnership",
            path: "update/:id",
            component: () => import("@/modules/references/modules/form_of_ownership/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refFormOfOwnership',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.form_of_ownership.title')
            },
          },
        ]
      },
      // GROUP_REGIONS
      {
        name: "GroupRegions",
        path: "/references/group-regions",
        redirect: "/references/group-regions",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.group_regions.title'),
          bcTo: { name: "GroupRegions" }
        },
        children: [
          {
            name: "GroupRegions",
            path: "",
            component: () => import("@/modules/references/modules/group_regions/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'group-regions')
            }
          },
          {
            name: "CreateGroupRegion",
            path: "create",
            component: () => import("@/modules/references/modules/group_regions/CreateOrUpdate"),
            meta: {
              bcLinkText: "Гуруҳ ҳудудлари",
              bcTo: { name: "CreateGroupRegion" }
            },
          },
          {
            name: "UpdateGroupRegion",
            path: "update/:id",
            component: () => import("@/modules/references/modules/group_regions/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'regGroupRegion',
                stateVarKey: 'name'
              },
              bcLinkText: 'Гуруҳ ҳудудлари'
            },
          },
        ]
      },
      // GEO_REGION_QUARTERS
      {
        name: "GeoRegionQuarters",
        path: "/references/geo-region-quarters",
        redirect: "/references/geo-region-quarters",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.quarters.title'),
          bcTo: { name: "GeoRegionQuarters" }
        },
        children: [
          {
            name: "GeoRegionQuarters",
            path: "",
            component: () => import("@/modules/references/modules/geo_region_quarters/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-quarters')
            }
          },
          {
            name: "CreateGeoRegionQuarter",
            path: "create",
            component: () => import("@/modules/references/modules/geo_region_quarters/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.quarters.title'),
              bcTo: { name: "CreateGeoRegionQuarter" }
            },
          },
          {
            name: "UpdateGeoRegionQuarter",
            path: "update/:id",
            component: () => import("@/modules/references/modules/geo_region_quarters/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'regGeoRegionQuarter',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.quarters.title'),
            },
          },
        ]
      },
      // GEO_REGION_STREETS
      {
        name: "GeoRegionStreets",
        path: "/references/geo-region-streets",
        redirect: "/references/geo-region-streets",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.streets.title'),
          bcTo: { name: "GeoRegionStreets" }
        },
        children: [
          {
            name: "GeoRegionStreets",
            path: "",
            component: () => import("@/modules/references/modules/geo_region_streets/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-streets')
            }
          },
          {
            name: "CreateGeoRegionStreet",
            path: "create",
            component: () => import("@/modules/references/modules/geo_region_streets/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.streets.title'),
              bcTo: { name: "CreateGeoRegionStreet" }
            },
          },
          {
            name: "UpdateGeoRegionStreet",
            path: "update/:id",
            component: () => import("@/modules/references/modules/geo_region_streets/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'regGeoRegionStreet',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.streets.title'),
            },
          },
        ]
      },
      // GEO_REGIONS_14
      {
        name: "GeoRegions14",
        path: "/references/geo-all-region",
        redirect: "/references/geo-all-region",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.region_14.title'),
          bcTo: { name: "GeoRegions14" }
        },
        children: [
          {
            name: "GeoRegions14",
            path: "",
            component: () => import("@/modules/references/modules/geo_region_14/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-streets')
            }
          },
          {
            name: "CreateGeoRegions14",
            path: "create",
            component: () => import("@/modules/references/modules/geo_region_14/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.streets.title'),
              bcTo: { name: "CreateGeoRegionStreet" }
            },
          },
          {
            name: "UpdateGeoRegions14",
            path: "update/:id",
            component: () => import("@/modules/references/modules/geo_region_14/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'regGeoRegionStreet',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.streets.title'),
            },
          },
        ]
      },
      {
        name: "WorkDays",
        path: "/references/work-days",
        redirect: "/references/work-days",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.work_days.title'),
          bcTo: { name: "WorkDays" }
        },
        children: [
          {
            name: "WorkDays",
            path: "",
            component: () => import("@/modules/references/modules/work-days/Index"),
            meta: {
              hasPerm: () => true || ability.can('view', 'work-days')
            }
          },
          {
            name: "CreateWorkDays",
            path: "create",
            component: () => import("@/modules/references/modules/work-days/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.work_days.title'),
              bcTo: { name: "CreateWorkDays" }
            },
          },
          {
            name: "UpdateWorkDays",
            path: "update/:id",
            component: () => import("@/modules/references/modules/work-days/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'regWorkDays',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.work_days.title'),
            },
          },
        ]
      },

      /* COMMISSION */

      // PROCESS
      {
        name: "Process",
        path: "/references/process",
        redirect: "/references/process",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.process.title'),
          bcTo: { name: "Process" }
        },
        children: [
          {
            name: "ProcessMain",
            path: "",
            component: () => import("@/modules/references/modules/process/Index"),
            meta: {
              // hasPerm: () => ability.can( 'view', 'mailing-purpose' )
            }
          },
          {
            name: "CreateProcess",
            path: "create",
            component: () => import("@/modules/references/modules/process/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.process.title'),
              bcTo: { name: "CreateMailingPurpose" }
            },
          },
          {
            name: "UpdateProcess",
            path: "update/:id",
            component: () => import("@/modules/references/modules/process/CreateOrUpdate"),
          },
        ]
      },
      // MAILING_PURPOSE
      {
        name: "MailingPurpose",
        path: "/references/mailing-purpose",
        redirect: "/references/mailing-purpose",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.mailing_purpose.title'),
          bcTo: { name: "MailingPurpose" }
        },
        children: [
          {
            name: "MailingPurposeMain",
            path: "",
            component: () => import("@/modules/references/modules/mailing_purpose/Index"),
            meta: {
              // hasPerm: () => ability.can( 'view', 'mailing-purpose' )
            }
          },
          {
            name: "CreateMailingPurpose",
            path: "create",
            component: () => import("@/modules/references/modules/mailing_purpose/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.mailing_purpose.title'),
              bcTo: { name: "CreateMailingPurpose" }
            },
          },
          {
            name: "UpdateMailingPurpose",
            path: "update/:id",
            component: () => import("@/modules/references/modules/mailing_purpose/CreateOrUpdate"),
          },
        ]
      },
      // Complainant
      {
        name: "Complainant",
        path: "/references/complainant",
        redirect: "/references/complainant",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.complainant.title'),
          bcTo: { name: "Complainant" }
        },
        children: [
          {
            name: "Complainant",
            path: "",
            component: () => import("@/modules/references/modules/commission/complainant/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-streets')
            }
          },
          {
            name: "CreateComplainant",
            path: "create",
            component: () => import("@/modules/references/modules/commission/complainant/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.complainant.title'),
              bcTo: { name: "CreateComplainant" }
            },
          },
          {
            name: "UpdateComplainant",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/complainant/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'Complainant',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.complainant.title'),
            },
          },
        ]
      },
      // type of complaint
      {
        name: "typeOfComplaint",
        path: "/references/type-of-complaint",
        redirect: "/references/type-of-complaint",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.type_of_complaint.title'),
          bcTo: { name: "TypeOfComplaint" }
        },
        children: [
          {
            name: "TypeOfComplaint",
            path: "",
            component: () => import("@/modules/references/modules/commission/type_of_complaint/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-streets')
            }
          },
          {
            name: "CreateTypeOfComplaint",
            path: "create",
            component: () => import("@/modules/references/modules/commission/type_of_complaint/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.type_of_complaint.title'),
              bcTo: { name: "CreateTypeOfComplaint" }
            },
          },
          {
            name: "UpdateTypeOfComplaint",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/type_of_complaint/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'TypeOfComplaint',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.type_of_complaint.title'),
            },
          },
        ]
      },
      // confirmation document
      {
        name: "confirmationDocument",
        path: "/references/confirmation-document",
        redirect: "/references/confirmation-document",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.confirmation_document.title'),
          bcTo: { name: "confirmationDocument" }
        },
        children: [
          {
            name: "confirmationDocument",
            path: "",
            component: () => import("@/modules/references/modules/commission/confirmation_document/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-streets')
            }
          },
          {
            name: "CreateconfirmationDocument",
            path: "create",
            component: () => import("@/modules/references/modules/commission/confirmation_document/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.confirmation_document.title'),
              bcTo: { name: "CreateconfirmationDocument" }
            },
          },
          {
            name: "UpdateconfirmationDocument",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/confirmation_document/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'confirmationDocument',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.confirmation_document.title'),
            },
          },
        ]
      },
      // special commission
      {
        name: "specialCommission",
        path: "/references/special-commission",
        redirect: "/references/special-commission",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.special_commission.title'),
          bcTo: { name: "specialCommission" }
        },
        children: [
          {
            name: "specialCommission",
            path: "",
            component: () => import("@/modules/references/modules/commission/special_commission/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-streets')
            }
          },
          {
            name: "CreatespecialCommission",
            path: "create",
            component: () => import("@/modules/references/modules/commission/special_commission/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.special_commission.title'),
              bcTo: { name: "CreatespecialCommission" }
            },
          },
          {
            name: "UpdatespecialCommission",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/special_commission/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'specialCommission',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.special_commission.title'),
            },
          },
        ]
      },
      // special commission type
      {
        name: "specialCommissionType",
        path: "/references/special-commission-type",
        redirect: "/references/special-commission-type",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.special_commission_type.title'),
          bcTo: { name: "specialCommissionType" }
        },
        children: [
          {
            name: "specialCommissionType",
            path: "",
            component: () => import("@/modules/references/modules/commission/special_commission_type/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-streets')
            }
          },
          {
            name: "CreatespecialCommissionType",
            path: "create",
            component: () => import("@/modules/references/modules/commission/special_commission_type/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.special_commission_type.title'),
              bcTo: { name: "CreatespecialCommissionType" }
            },
          },
          {
            name: "UpdatespecialCommissionType",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/special_commission_type/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'specialCommissionType',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.special_commission_type.title'),
            },
          },
        ]
      },
      // work type
      {
        name: "workType",
        path: "/references/work-type",
        redirect: "/references/work-type",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.work_type.title'),
          bcTo: { name: "workType" }
        },
        children: [
          {
            name: "workType",
            path: "",
            component: () => import("@/modules/references/modules/commission/work_type/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-streets')
            }
          },
          {
            name: "CreateworkType",
            path: "create",
            component: () => import("@/modules/references/modules/commission/work_type/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.work_type.title'),
              bcTo: { name: "CreateworkType" }
            },
          },
          {
            name: "UpdateworkType",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/work_type/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'workType',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.work_type.title'),
            },
          },
        ]
      },
      // document type
      {
        name: "documentType",
        path: "/references/document-type",
        redirect: "/references/document-type",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.document_type.title'),
          bcTo: { name: "documentType" }
        },
        children: [
          {
            name: "documentType",
            path: "",
            component: () => import("@/modules/references/modules/commission/document_type/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-streets')
            }
          },
          {
            name: "CreatedocumentType",
            path: "create",
            component: () => import("@/modules/references/modules/commission/document_type/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.document_type.title'),
              bcTo: { name: "CreatedocumentType" }
            },
          },
          {
            name: "UpdatedocumentType",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/document_type/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'documentType',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.document_type.title'),
            },
          },
        ]
      },
      // commission members
      {
        name: "commissionMembers",
        path: "/references/commission-members",
        redirect: "/references/commission-members",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.commission_members.title'),
          bcTo: { name: "commissionMembers" }
        },
        children: [
          {
            name: "commissionMembers",
            path: "",
            component: () => import("@/modules/references/modules/commission/commission_members/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-streets')
            }
          },
          {
            name: "CreatecommissionMembers",
            path: "create",
            component: () => import("@/modules/references/modules/commission/commission_members/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.commission_members.title'),
              bcTo: { name: "CreatecommissionMembers" }
            },
          },
          {
            name: "UpdatecommissionMembers",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/commission_members/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'commissionMembers',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.commission_members.title'),
            },
          },
        ]
      },
      // cscope of violation
      {
        name: "scopeOfViolation",
        path: "/references/scope-of-violation",
        redirect: "/references/scope-of-violation",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.scope_of_violation.title'),
          bcTo: { name: "scopeOfViolation" }
        },
        children: [
          {
            name: "scopeOfViolation",
            path: "",
            component: () => import("@/modules/references/modules/commission/scope_of_violation/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-streets')
            }
          },
          {
            name: "CreatescopeOfViolation",
            path: "create",
            component: () => import("@/modules/references/modules/commission/scope_of_violation/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.scope_of_violation.title'),
              bcTo: { name: "CreatescopeOfViolation" }
            },
          },
          {
            name: "UpdatescopeOfViolation",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/scope_of_violation/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'scopeOfViolation',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.scope_of_violation.title'),
            },
          },
        ]
      },
      // competition law article
      {
        name: "competitionLawArticle",
        path: "/references/competition-law-article",
        redirect: "/references/competition-law-article",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.competition_law_article.title'),
          bcTo: { name: "competitionLawArticle" }
        },
        children: [
          {
            name: "competitionLawArticle",
            path: "",
            component: () => import("@/modules/references/modules/commission/competition_law_article/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'geo-region-streets')
            }
          },
          {
            name: "CreatecompetitionLawArticle",
            path: "create",
            component: () => import("@/modules/references/modules/commission/competition_law_article/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.competition_law_article.title'),
              bcTo: { name: "CreatecompetitionLawArticle" }
            },
          },
          {
            name: "UpdatecompetitionLawArticle",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/competition_law_article/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'competitionLawArticle',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.competition_law_article.title'),
            },
          },
        ]
      },

      // document status
      {
        name: "CommissionDocumentStatus",
        path: "/references/document-status",
        redirect: "/references/document-status",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.document_status.title'),
          bcTo: { name: "CommissionDocumentStatus" }
        },
        children: [
          {
            name: "CommissionDocumentStatus",
            path: "",
            component: () => import("@/modules/references/modules/commission/document_status/Index"),
            meta: {
              // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
            }
          },
          {
            name: "CreateCommissionDocumentStatus",
            path: "create",
            component: () => import("@/modules/references/modules/commission/document_status/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.document_status.title'),
              bcTo: { name: "CreateCommissionDocumentStatus" }
            },
          },
          {
            name: "UpdateCommissionDocumentStatus",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/document_status/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'CommissionDocumentStatus',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.document_status.title'),
            },
          },
        ]
      },

      // reception method
      {
        name: "ReceptionMethod",
        path: "/references/reception-method",
        redirect: "/references/reception-method",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.reception_method.title'),
          bcTo: { name: "ReceptionMethod" }
        },
        children: [
          {
            name: "ReceptionMethod",
            path: "",
            component: () => import("@/modules/references/modules/commission/reception_method/Index"),
            meta: {
              // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
            }
          },
          {
            name: "CreateReceptionMethod",
            path: "create",
            component: () => import("@/modules/references/modules/commission/reception_method/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.reception_method.title'),
              bcTo: { name: "CreateDocumentStatus" }
            },
          },
          {
            name: "UpdateReceptionMethod",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/reception_method/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'ReceptionMethod',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.reception_method.title'),
            },
          },
        ]
      },

      // reception method
      {
        name: "AppealType",
        path: "/references/appeal-type",
        redirect: "/references/appeal-type",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.appeal_type.title'),
          bcTo: { name: "AppealType" }
        },
        children: [
          {
            name: "AppealType",
            path: "",
            component: () => import("@/modules/references/modules/commission/appeal_type/Index"),
            meta: {
              // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
            }
          },
          {
            name: "CreateAppealType",
            path: "create",
            component: () => import("@/modules/references/modules/commission/appeal_type/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.appeal_type.title'),
              bcTo: { name: "CreateDocumentStatus" }
            },
          },
          {
            name: "UpdateAppealType",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/appeal_type/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'AppealType',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.appeal_type.title'),
            },
          },
        ]

      },
      // reception method
      {
        name: "BaseType",
        path: "/references/base-type",
        redirect: "/references/base-type",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.commission.base_type.title'),
          bcTo: { name: "BaseType" }
        },
        children: [
          {
            name: "BaseType",
            path: "",
            component: () => import("@/modules/references/modules/commission/base_type/Index"),
            meta: {
              // hasPerm: () => ability.can( 'view', 'geo-region-streets' )
            }
          },
          {
            name: "CreateBaseType",
            path: "create",
            component: () => import("@/modules/references/modules/commission/base_type/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('submodules.commission.base_type.title'),
              bcTo: { name: "CreateDocumentStatus" }
            },
          },
          {
            name: "UpdateBaseType",
            path: "update/:id",
            component: () => import("@/modules/references/modules/commission/base_type/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'BaseType',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t('submodules.commission.base_type.title'),
            },
          },
        ]

      },
      // Data Types
      {
        name: "DateTypes",
        path: "/references/date-types",
        redirect: "/references/date-types",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('dateTypes'),
          bcTo: { name: "DateTypes" }
        },
        children: [
          {
            name: "DateTypesMain",
            path: "",
            component: () => import("@/modules/references/modules/date-type/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'date-types')
            }
          },
          {
            name: "CreateDateTypes",
            path: "create",
            component: () => import("@/modules/references/modules/date-type/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t('dateTypes'),
              bcTo: { name: "DateTypes" }
            },
          },
          {
            name: "UpdateDateTypes",
            path: "update/:id",
            component: () => import("@/modules/references/modules/date-type/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: { stateVar: 'currentItem', moduleName: 'refDateTypes', stateVarKey: 'name' },
              bcLinkText: i18n.t('dateTypes'),
            },
          }
        ]
      },

      // REFERENCES_LIST_FOR_DYNAMIC_REPORT
      {
        name: "ReferencesListForDynamicReport",
        path: "/references/list",
        redirect: "/references/list",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t('submodules.references_list.title'),
          bcTo: { name: "ReferencesListForDynamicReport" }
        },
        children: [
          {
            name: "ReferencesListForDynamicReportMain",
            path: "",
            component: () => import("@/modules/references/modules/references_list_for_dynamic_report/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'references-list-for-dynamic-report')
            }
          },
          {
            name: "UpdateReferenceForDynamicReport",
            path: "update/:id",
            component: () => import("@/modules/references/modules/references_list_for_dynamic_report/CreateOrUpdate"),
          }
        ]
      },

    ]
  }

]
