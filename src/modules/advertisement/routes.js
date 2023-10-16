import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";
import EAuctionMonitoringRoutes from '@/modules/advertisement/modules/e-auction-monitoring/routes'


export default [
  {
    name: "Document",
    path: "/documents",
    component: () => import('@/router/views/dashboards/default')
  },
]
