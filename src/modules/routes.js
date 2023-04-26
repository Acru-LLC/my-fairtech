/*
* MAIN ROUTES REGISTER FOR ALL TOP_MODULES */
import advertisement_routes from "@/modules/advertisement/routes";
import chat_routes from "@/modules/chat/routes";
import commission_routes from "@/modules/commission/routes";
import excel_table from "@/modules/excel-table/routes";
import fire_prices_routes from "@/modules/fire-price/routes";
import integration from "@/modules/integration/routes";
import letter_routes from "@/modules/letter/routes";
import resolution_routes from "@/modules/letter/document/routes";
import management_routes from "@/modules/management/routes";
import petrol_stations_routes from "@/modules/products/petrol-stations/routes"
import sugar_stations_routes from "@/modules/products/sugar-stations/routes"
import bakery_stations_routes from "@/modules/products/bakery-stations/routes"
import flour_stations_routes from "@/modules/products/flour-stations/routes"
import profile_routes from "@/modules/profile/profile-routes"
import projects_routes from "@/modules/projects/routes";
import references_routes from "@/modules/references/routes";
import reestr_contractors_routes from "@/modules/reestr-contractors/routes";
import report_routes from "@/modules/report/routes";
import sendMessage_routes from "@/modules/sendMessageToPhone/router";
import wordTemplates_routes from "@/modules/wordTemplates/router";
import pharm_routes from "@/modules/pharm/routes";
import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";

export default [
  ...advertisement_routes,
  ...chat_routes,
  ...commission_routes,
  ...excel_table,
  ...fire_prices_routes,
  ...integration,
  ...letter_routes,
  ...resolution_routes,
  ...management_routes,
  ...petrol_stations_routes,
  ...sugar_stations_routes,
  ...bakery_stations_routes,
  ...flour_stations_routes,
  ...profile_routes,
  ...projects_routes,
  ...references_routes,
  ...reestr_contractors_routes,
  ...report_routes,
  ...sendMessage_routes,
  ...wordTemplates_routes,
  ...pharm_routes,


  {
    name: "ProjectLessons",
    path: "/project-lesson",
    component: () => import('@/router/views/dashboards/default'),
    meta: {
      bcLinkText: i18n.t("submodules.project-lesson.title"),
      bcTo: { name: "ProjectLessons" },
    },
    children: [
      {
        name: "ProjectLessons",
        path: "",
        component: () => import("@/modules/management/modules/project-lesson/Index"),
      },
      {
        name: "ProjectLessonsCreate",
        path: "create",
        component: () => import("@/modules/management/modules/project-lesson/CreateOrUpdate"),
        meta: {
          bcLinkText: i18n.t("submodules.project-lesson.title"),
          bcTo: { name: "CreateRole" },
          hasPerm: () => ability.can('create', 'project lesson')
        }
      },
      {
        name: "ProjectLessonsUpdate",
        path: "update/:id",
        component: () => import("@/modules/management/modules/project-lesson/CreateOrUpdate"),
        meta: {
          bcDynamic: true,
          bcLinkText: i18n.t("submodules.project-lesson.title"),
          hasPerm: () => ability.can('update', 'project lesson')
        }
      },
    ]
  },
]
