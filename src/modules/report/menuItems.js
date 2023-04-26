import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'

export default [
  {
    id: "reportParentMenuId",
    label: i18n.t("submodules.reports.title_plural"),
    icon: "mdi mdi-file-document-multiple",
    code: "fair_tech",
    hasPerm: () => ability.can('view', 'report-organisational') ||
      ability.can('view', 'report-income') ||
      ability.can('view', 'report-sent') ||
      ability.can('view', 'report-gathered') ||
      ability.can('view', 'report-gathered'),
    subItems: [
      {
        id: "organisationalReportMenuId",
        label: i18n.t("submodules.reports.organisational_reports"),
        icon: "mdi mdi-folder-multiple",
        parentId: "reportParentMenuId",
        hasPerm: () => ability.can('view', 'report-organisational') ||
          ability.can('view', 'report-income') ||
          ability.can('view', 'report-sent') ||
          ability.can('view', 'report-gathered') ||
          ability.can('view', 'report-gathered'),
        subItems: [
          {
            id: "createReportMenuId",
            label: i18n.t("submodules.reports.create_report"),
            icon: "mdi mdi-folder",
            link: { name: "OrganizationalReportCreate" },
            parentId: "organisationalReportMenuId",
            hasPerm: () => ability.can('view', 'report-organisational')
          },
          {
            id: "createReportMenuId",
            label: i18n.t("submodules.reports.report_income"),
            icon: "mdi mdi-folder",
            link: { name: "OrganizitionalReportIncome" },
            parentId: "organisationalReportMenuId",
            hasPerm: () => ability.can('view', 'report-income')
          },
          {
            id: "createReportMenuId",
            label: i18n.t("submodules.reports.report_sended"),
            icon: "mdi mdi-folder",
            link: { name: "OrganizitionalReportSent" },
            parentId: "organisationalReportMenuId",
            hasPerm: () => ability.can('view', 'report-sent')
          },
          {
            id: "createReportMenuId",
            label: i18n.t("submodules.reports.report_all"),
            icon: "mdi mdi-folder",
            link: { name: "OrganizitionalReportGathered" },
            parentId: "organisationalReportMenuId",
            hasPerm: () => ability.can('view', 'report-gathered')
          },
          {
            id: "ReportCollectionAssembleMenuId",
            label: i18n.t("submodules.reports.collection_assemble"),
            icon: "mdi mdi-folder",
            link: { name: "ReportCollectionAssemble" },
            parentId: "ReportCollectionAssembleMenuId",
            hasPerm: () => ability.can('view', 'report-gathered')
          },
        ]
      },
    ]
  }
];
