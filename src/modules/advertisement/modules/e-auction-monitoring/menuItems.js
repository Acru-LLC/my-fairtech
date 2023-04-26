import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";

export default [
  {
    id: "e-auction-monitoring-0",
    label: i18n.t('submodules.e_auction_ad_monitoring.e_auction_title'),
    icon: "mdi mdi-file-document-multiple",
    hasPerm: () => ability.can('list', 'contractor advertising construction e auction') ||
       ability.can('get', 'all for map e auction'),
    subItems: [
      {
        id: "e-auction-monitoring-list",
        label: i18n.t('submodules.e_auction_ad_monitoring.ad_passport_details_title'),
        icon: "mdi mdi-file-document-multiple",
        link: { name: "EAuctionMonitoringPassportInfo" },
        hasPerm: () => ability.can('list', 'contractor advertising construction e auction')
      },
      {
        id: "e-auction-monitoring-map",
        label: i18n.t('submodules.e_auction_ad_monitoring.title'),
        icon: "mdi mdi-map-search",
        link: { name: "EAuctionMonitoringMap" },
        hasPerm: () => ability.can('get', 'all for map e auction')
      },
    ]
  },
]