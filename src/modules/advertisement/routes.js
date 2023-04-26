import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";
import EAuctionMonitoringRoutes from '@/modules/advertisement/modules/e-auction-monitoring/routes'


export default [
  {
    name: "Advertisement",
    path: "/advertisement",
    redirect: "/advertisement",
    component: () => import('@/router/views/dashboards/default'),
    meta: {
      bcLinkText: i18n.t("submodules.advertisement.title"),
      bcTo: { name: "Advertisement" }
    },
    children: [
      // PASSPORT INFO
      {
        name: "AdvertisementPassportInfo",
        path: "/advertisement/passport-info",
        redirect: "/advertisement/passport-info",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t("submodules.ad_passport_info.title"),
          bcTo: { name: "AdvertisementPassportInfo" }
        },
        children: [
          {
            name: "AdvertisementPassportInfoMain",
            path: "",
            component: () => import("@/modules/advertisement/modules/ad_passport_info/Index"),
            meta: {
              bcLinkText: i18n.t("submodules.ad_passport_info.title"),
              bcTo: { name: "AdvertisementPassportInfo" },
              hasPerm: () => ability.can('view', 'passport-info')
            },
          },

          {
            name: "AdvertisementPassportInfoAvtoyulTrue",
            path: "avtoyul",
            component: () => import("@/modules/advertisement/modules/ad_passport_info/Index"),
            meta: {
              bcLinkText: i18n.t("submodules.ad_passport_info.title") + " (" + i18n.t("column.belongs_to_uzavtoyul") + ")",
              bcTo: { name: "AdvertisementPassportInfo" },
              hasPerm: () => ability.can('view', 'passport-info')
            },
          },
          {
            name: "AdvertisementPassportInfoAvtoyulFalse",
            path: "not-avtoyul",
            component: () => import("@/modules/advertisement/modules/ad_passport_info/Index"),
            meta: {
              bcLinkText: i18n.t("submodules.ad_passport_info.title") + " (" + i18n.t("column.not_belongs_to_uzavtoyul") + ")",
              bcTo: { name: "AdvertisementPassportInfo" },
              hasPerm: () => ability.can('view', 'passport-info')
            },
          },

          // CREATE/UPDATE BY GOVERNMENT
          {
            name: "CreateAdPassportInfoByGovernment",
            path: "create-by-government",
            component: () => import("@/modules/advertisement/modules/ad_passport_info/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t("submodules.ad_passport_info.title"),
              bcTo: { name: "CreateDepartmentType" },
              hasPerm: () => ability.can('create', 'contractor advertising construction')
            },
          },
          {
            name: "UpdateAdPassportInfoByGovernment",
            path: "update-by-government/:id",
            component: () => import("@/modules/advertisement/modules/ad_passport_info/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refAdPassportInfo',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t("submodules.ad_passport_info.title"),
              hasPerm: () => ability.can('update', 'contractor advertising construction')
            },
          },
          // CREATE/UPDATE BY AGENCY
          {
            name: "CreateAdPassportInfoByAgency",
            path: "create-by-agency",
            component: () => import("@/modules/advertisement/modules/ad_passport_info/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t("submodules.ad_passport_info.title"),
              bcTo: { name: "CreateDepartmentType" },
              hasPerm: () => ability.can('create', 'contractor advertising construction')
            },
          },
          {
            name: "UpdateAdPassportInfoByAgency",
            path: "update-by-agency/:id",
            component: () => import("@/modules/advertisement/modules/ad_passport_info/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refAdPassportInfo',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t("submodules.ad_passport_info.title"),
              hasPerm: () => ability.can('update', 'contractor advertising construction')
            },
          },
          // UPDATE FILES BY AGENCY
          {
            name: "UpdateAdPassportInfoFilesByAgency",
            path: "update-files-by-agency/:id",
            component: () => import("@/modules/advertisement/modules/ad_passport_info/UpdateItemFiles"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refAdPassportInfo',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t("submodules.ad_passport_info.title"),
              hasPerm: () => ability.can('save', 'Second Agent Files')
            },
          },
          // UPDATE FILES BY GOVERNMENT
          {
            name: "UpdateAdPassportInfoFilesByGovernment",
            path: "update-files-by-government/:id",
            component: () => import("@/modules/advertisement/modules/ad_passport_info/UpdateItemFiles"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'refAdPassportInfo',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t("submodules.ad_passport_info.title"),
              hasPerm: () => ability.can('save', 'First Agent Files')
            },
          },
        ]
      },
      {
        name: "AdvertisementMonitoring",
        path: "/advertisement/monitoring",
        component: () => import("@/modules/advertisement/modules/ad_monitoring/VanillaLeaflet"),
        meta: {
          bcLinkText: i18n.t("submodules.ad_monitoring.title"),
          bcTo: { name: "AdvertisementMonitoring" },
          hasPerm: () => ability.can('view', 'monitoring')
        }
      },
      {
        name: "AdvertisementDetails",
        path: "/advertisement/details/:id",
        component: () => import("@/modules/advertisement/pages/AdDetails"),
        meta: {
          bcLinkText: i18n.t("submodules.ad_details.title"),
          bcTo: { name: "AdvertisementDetails" }
        }
      },
      {
        name: "AdvertisementEAuctionDetails",
        path: "/advertisement/details/e-auction/:id",
        component: () => import("@/modules/advertisement/pages/AdEAuctionDetails"),
        meta: {
          bcLinkText: i18n.t("submodules.ad_details.title"),
          bcTo: { name: "AdvertisementEAuctionDetails" }
        }
      },
      //INVENTORY REPORTS
      {
        name: "InventoryReportsByAdIdForMonitoring",
        path: "/advertisement/inventory/reports/:id",
        component: () => import("@/modules/advertisement/pages/InventoryReport"),
        meta: {
          bcLinkText: i18n.t("submodules.inventory_report.title"),
          bcTo: { name: "InventoryReportsByAdIdForMonitoring" }
        }
      },
      ...EAuctionMonitoringRoutes,
      //NOTIFICATIONS
      {
        name: "NotificationsByAdIdForMonitoring",
        path: "/advertisement/notifications/:id",
        component: () => import("@/modules/advertisement/pages/Notification"),
        meta: {
          bcLinkText: i18n.t("submodules.contractor_notification.title"),
          bcTo: { name: "NotificationsByAdIdForMonitoring" }
        }
      },

      // INVENTORY
      {
        name: "InventoryReport",
        path: "report",
        redirect: "inventory-report",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        meta: {
          bcLinkText: i18n.t("submodules.inventory_report.title"),
          bcTo: { name: "InventoryReport" }
        },
        children: [
          {
            name: "InventoryReportAdIndex",
            path: "advertisement-constructions",
            component: () =>
              import("@/modules/advertisement/modules/inventory_report/AdIndex"),
            meta: {
              hasPerm: () => ability.can('view', 'inventory-report')
            }
          },
          {
            name: "InventoryReport",
            path: "inventory-report/:adId",
            component: () =>
              import("@/modules/advertisement/modules/inventory_report/Index"),
            meta: {
              hasPerm: () => ability.can('view', 'inventory-report')
            }
          },
          // CREATE/UPDATE
          {
            name: "CreateInventoryReport",
            path: "create-inventory-report/:adId",
            component: () => import("@/modules/advertisement/modules/inventory_report/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t("submodules.inventory_report.title"),
            },
          },
          {
            name: "UpdateInventoryReport",
            path: "update-inventory-report/:adId/:id",
            component: () => import("@/modules/advertisement/modules/inventory_report/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcLinkText: i18n.t("submodules.inventory_report.title"),
            },
          },
          {
            name: "IncomeInventoryReports",
            path: "/inventory-report-income",
            component: () => import("@/modules/advertisement/modules/inventory_report/pages/IncomeInventoryReports"),
            meta: {
              bcLinkText: i18n.t("submodules.contractor_notification.income"),
              bcTo: { name: "IncomeInventoryReports" },
              hasPerm: () => ability.can('list', 'general inventory report by receiver')
            },
          },
          {
            name: "OutgoingInventoryReports",
            path: "/inventory-report-outgoing",
            component: () => import("@/modules/advertisement/modules/inventory_report/pages/OutgoingInventoryReports"),
            meta: {
              bcLinkText: i18n.t("submodules.contractor_notification.outgoing"),
              bcTo: { name: "OutgoingInventoryReports" },
              hasPerm: () => ability.can('list', 'general inventory report by owner')
            },
          },
          {
            name: "InventoryReportDetails",
            path: "/inventory-report/details/:id",
            component: () => import("@/modules/advertisement/modules/inventory_report/pages/InventoryReportDetails"),
            meta: {
              bcLinkText: i18n.t("submodules.ad_details.title"),
              bcTo: { name: "InventoryReportDetails" }
            }
          }
        ]
      },
    ]
  },
  {
    name: "Contractor",
    path: "/contractor",
    redirect: "/contractor",
    component: () => import('@/router/views/dashboards/default'),
    meta: {
      bcLinkText: i18n.t("submodules.contractor.title"),
      bcTo: { name: "ContractorNotification" }
    },
    children: [
      {
        name: "ContractorNotification",
        path: "/notification",
        redirect: "/notification",
        component: {
          render(c) {
            return c('router-view')
          }
        },
        meta: {
          bcLinkText: i18n.t("submodules.contractor_notification.title"),
          bcTo: { name: "ContractorNotification" }
        },
        children: [
          // ContractorNotification
          {
            name: "ContractorNotificationMain",
            path: "/notification",
            component: () => import('@/modules/advertisement/modules/contractor-notification/Index'),
            meta: {
              bcLinkText: i18n.t("submodules.contractor_notification.title"),
              bcTo: { name: "ContractorNotification" },
              hasPerm: () => ability.can('view', 'advertisement-notification')
            }
          },
          {
            name: "CreateContractorNotification",
            path: "create/:adConstructionId",
            component: () => import("@/modules/advertisement/modules/contractor-notification/CreateOrUpdate"),
            meta: {
              bcLinkText: i18n.t("submodules.contractor_notification.title"),
              bcTo: { name: "CreateContractorNotification" },
              hasPerm: () => ability.can('create', 'advertisement notification')
            },
          },
          {
            name: "UpdateContractorNotification",
            path: "update/:id",
            component: () => import("@/modules/advertisement/modules/contractor-notification/CreateOrUpdate"),
            meta: {
              bcDynamic: true,
              paramName: 'id',
              bcStateVarAndModuleName: {
                stateVar: 'currentItem',
                moduleName: 'contractorNotification',
                stateVarKey: 'name'
              },
              bcLinkText: i18n.t("submodules.contractor_notification.title"),
              hasPerm: () => ability.can('update', 'advertisement notification')
            },
          },
          {
            name: "AdvertisementDetailsById",
            path: "/details/:adId",
            component: () => import("@/modules/advertisement/modules/contractor-notification/pages/AdDetailsById"),
            meta: {
              bcLinkText: i18n.t("submodules.ad_details.title"),
              bcTo: { name: "AdvertisementDetailsById" },
              hasPerm: () => ability.can('get', 'advertisement notification')
            }
          },
          {
            name: "IncomeNotifications",
            path: "/notifications/income",
            component: () => import("@/modules/advertisement/modules/contractor-notification/pages/IncomeNotifications"),
            meta: {
              bcLinkText: i18n.t("submodules.contractor_notification.income"),
              bcTo: { name: "IncomeNotifications" },
              hasPerm: () => ability.can('list', 'income notification')
            },
          },
          {
            name: "OutgoingNotifications",
            path: "/notifications/outgoing",
            component: () => import("@/modules/advertisement/modules/contractor-notification/pages/OutgoingNotifications"),
            meta: {
              bcLinkText: i18n.t("submodules.contractor_notification.outgoing"),
              bcTo: { name: "OutgoingNotifications" },
              hasPerm: () => ability.can('list', 'outgoing notification')
            },
          },
          {
            name: "Notifications",
            path: "/notifications/:notId",
            component: () => import("@/modules/advertisement/modules/contractor-notification/pages/Notifications"),
            meta: {
              bcLinkText: i18n.t("submodules.contractor_notification.all_notifications"),
              bcTo: { name: "Notifications" },
              hasPerm: () => ability.can('list', 'advertisement notification')
            },
          },
        ]
      }
    ]
  }
]
