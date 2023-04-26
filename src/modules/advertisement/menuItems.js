import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'
import EAuctionMonitoringMenuItems from '@/modules/advertisement/modules/e-auction-monitoring/menuItems'

export default [
  {
    id: "advertisementParentMenuId",
    label: i18n.t("submodules.advertisement.title"),
    icon: "mdi mdi-billboard",
    code: "fair_tech",
    hasPerm: () => {
      return ability.can('view', 'passport-info') ||
        ability.can('view', 'monitoring') ||
        ability.can('view', 'advertisement-notification') ||
        ability.can('list', 'income notification') ||
        ability.can('list', 'contractor advertising construction e auction') ||
        ability.can('get', 'all for map e auction') ||
        ability.can('list', 'outgoing notification') ||
        ability.can('view', 'inventory-report') ||
        ability.can('list', 'general inventory report by owner') ||
        ability.can('list', 'general inventory report by receiver')
    },
    subItems: [
      {
        id: "advertisement-0",
        label: i18n.t('submodules.ad_passport_info.title'),
        icon: "mdi mdi-file-document-multiple",
        hasPerm: () => ability.can('view', 'passport-info') || ability.can('view', 'monitoring'),
        subItems: [
          // PASSPORT INFORMATION
          {
            id: "advertisement-1",
            label: i18n.t('submodules.ad_passport_info.title'),
            icon: "mdi mdi-file-document-multiple",
            link: { name: "AdvertisementPassportInfo" },
            parentId: "advertisementParentMenuId",
            hasPerm: () => ability.can('view', 'passport-info')
          },
          // MONITORING ADVERTISEMENTS
          {
            id: "advertisement-2",
            label: i18n.t('submodules.ad_monitoring.title'),
            icon: "mdi mdi-map-search",
            link: { name: "AdvertisementMonitoring" },
            parentId: "advertisementParentMenuId",
            hasPerm: () => ability.can('view', 'monitoring')
          },
        ]
      },
      ...EAuctionMonitoringMenuItems,
      // ADVERTISEMENT NOTIFICATIONS
      {
        id: "contractorNotificationMainId",
        label: i18n.t('submodules.contractor_notification.title'),
        icon: "mdi mdi-account-tie-voice",
        hasPerm: () =>
          ability.can('view', 'advertisement-notification') ||
          ability.can('list', 'income notification') ||
          ability.can('list', 'outgoing notification'),
        subItems: [
          {
            id: "notification-list",
            label: i18n.t("submodules.contractor_notification.list"),
            icon: "mdi mdi-format-list-numbered",
            link: { name: "ContractorNotification" },
            parentId: "contractorNotificationMainId",
            hasPerm: () => ability.can('view', 'advertisement-notification')
          },
          {
            id: "notification-outgoing",
            label: i18n.t("submodules.contractor_notification.outgoing"),
            icon: "mdi mdi-application-export",
            link: { name: "OutgoingNotifications" },
            parentId: "contractorNotificationMainId",
            hasPerm: () => ability.can('list', 'income notification')
          },
          {
            id: "notification-income",
            label: i18n.t("submodules.contractor_notification.income"),
            icon: "mdi mdi-application-import",
            link: { name: "IncomeNotifications" },
            parentId: "contractorNotificationMainId",
            hasPerm: () => ability.can('list', 'outgoing notification')
          }
        ]
      },
      // INVENTORY REPORT
      {
        id: "inventoryReportMainId",
        label: i18n.t('submodules.inventory_report.title'),
        icon: "mdi mdi-notebook-check",
        hasPerm: () => ability.can('view', 'inventory-report') ||
          ability.can('list', 'general inventory report by owner') ||
          ability.can('list', 'general inventory report by receiver'),
        subItems: [
          {
            id: "inventory-report",
            label: i18n.t('submodules.inventory_report.list'),
            icon: "mdi mdi-format-list-numbered",
            link: { name: "InventoryReportAdIndex" },
            parentId: "inventoryReportMainId",
            hasPerm: () => ability.can('view', 'inventory-report')
          },
          {
            id: "inventory-report-outgoing",
            label: i18n.t("submodules.inventory_report.outgoing"),
            icon: "mdi mdi-application-export",
            link: { name: "OutgoingInventoryReports" },
            parentId: "inventoryReportMainId",
            hasPerm: () => ability.can('list', 'general inventory report by owner')
          },
          {
            id: "inventory-report-income",
            label: i18n.t("submodules.inventory_report.income"),
            icon: "mdi mdi-application-import",
            link: { name: "IncomeInventoryReports" },
            parentId: "inventoryReportMainId",
            hasPerm: () => ability.can('list', 'general inventory report by receiver')
          }
        ],
      },
    ]
  }
];