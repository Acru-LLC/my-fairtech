import i18n from "@/i18n";

export default [
  {
    name: "EAuctionMonitoringPassportInfo",
    path: "/advertisement/e-auction-monitoring/passport-info",
    component: () => import("@/modules/advertisement/modules/e-auction-monitoring/passport-info/Index"),
    meta: {
      bcLinkText: i18n.t("submodules.ad_details.title"),
      bcTo: { name: "EAuctionMonitoringPassportInfo" }
    }
  },
  //INVENTORY REPORTS
  {
    name: "EAuctionMonitoringMap",
    path: "/advertisement/e-auction-monitoring/map",
    component: () => import("@/modules/advertisement/modules/e-auction-monitoring/map/VanillaLeaflet"),
    meta: {
      bcLinkText: i18n.t("submodules.inventory_report.title"),
      bcTo: { name: "EAuctionMonitoringMap" }
    }
  },
]