/*
* MAIN ROUTES REGISTER FOR ALL TOP_MODULES */

import price_routes from "@/modules/price/routes";
import reporting_routes from "@/modules/reporting/routes";
import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";

export default [
  ...price_routes,
  ...reporting_routes,


  {
    name: "ProjectLessons",
    path: "/project-lesson",
    component: () => import('@/router/views/dashboards/default'),
    meta: {
      bcLinkText: i18n.t("submodules.project-lesson.title"),
      bcTo: { name: "ProjectLessons" },
    },
    children: [    ]
  },
]
