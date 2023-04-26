import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'

export default [
  {
    id: "excelTableParentMenuId",
    label: i18n.t("submodules.excel.title"),
    icon: "mdi mdi-file-multiple",
    code: "fair_tech",
    hasPerm: () => ability.can('view', 'statistic-report') ||
      ability.can('view', 'update-statistic-report') ||
      ability.can('view', 'statistic-reports') ||
      ability.can('view', 'statistic-reports') ||
      ability.can('view', 'statistic-reports') ||
      ability.can('view', 'statistic-reports') ||
      ability.can('view', 'statistic-reports') ||
      ability.can('view', 'statistic-reports') ||
      ability.can('view', 'statistic-reports') ||
      ability.can('view', 'statistic-reports'),
    subItems: [
      // PK-73 // forecast of final results
      {
        id: "final-forecast",
        label: i18n.t("submodules.final_forecast.title"),
        icon: "bx mdi mdi-percent",
        link: { name: "IndexFinalForecast" },
        hasPerm: () => ability.can('view', 'statistic-report'),
        parentId: "excelTableParentMenuId",
      },
      {
        id: "final-forecast-fill",
        label: i18n.t("submodules.final_forecast.fill_title"),
        icon: "bx mdi mdi-percent",
        link: { name: "IndexFinalForecastFill" },
        hasPerm: () => ability.can('view', 'update-statistic-report'),
        parentId: "excelTableParentMenuId",
      },
      // excel Table 1
      {
        id: "excel-table-1",
        label: i18n.t("submodules.excel.table_name_1"),
        icon: "bx mdi mdi-file-excel",
        link: { name: "ExcelTable1" },
        hasPerm: () => ability.can('view', 'statistic-reports'),
        parentId: "excelTableParentMenuId",
      },
      // excel Table 2
      {
        id: "excel-table-2",
        label: i18n.t("submodules.excel.table_name_2"),
        icon: "bx mdi mdi-file-excel",
        link: { name: "ExcelTable2" },
        hasPerm: () => ability.can('view', 'statistic-reports'),
        parentId: "excelTableParentMenuId",
      },
      // excel Table 3
      {
        id: "excel-table-3",
        label: i18n.t("submodules.excel.table_name_3"),
        icon: "bx mdi mdi-file-excel",
        link: { name: "ExcelTable3" },
        hasPerm: () => ability.can('view', 'statistic-reports'),
        parentId: "excelTableParentMenuId",
      },
      // excel Table 4
      {
        id: "excel-table-4",
        label: i18n.t("submodules.excel.table_name_4"),
        icon: "bx mdi mdi-file-excel",
        link: { name: "ExcelTable4" },
        hasPerm: () => ability.can('view', 'statistic-reports'),
        parentId: "excelTableParentMenuId",
      },
      // excel Table 5
      {
        id: "excel-table-5",
        label: i18n.t("submodules.excel.table_name_5"),
        icon: "bx mdi mdi-file-excel",
        link: { name: "ExcelTable5" },
        hasPerm: () => ability.can('view', 'statistic-reports'),
        parentId: "excelTableParentMenuId",
      },
      // excel Table 6
      {
        id: "excel-table-6",
        label: i18n.t("submodules.excel.table_name_6"),
        icon: "bx mdi mdi-file-excel",
        link: { name: "ExcelTable6" },
        hasPerm: () => ability.can('view', 'statistic-reports'),
        parentId: "excelTableParentMenuId",
      },
      // excel Table 7
      {
        id: "excel-table-7",
        label: i18n.t("submodules.excel.table_name_7"),
        icon: "bx mdi mdi-file-excel",
        link: { name: "ExcelTable7" },
        hasPerm: () => ability.can('view', 'statistic-reports'),
        parentId: "excelTableParentMenuId",
      },
      // excel Table 8
      {
        id: "excel-table-8",
        label: i18n.t("submodules.excel.table_name_8"),
        icon: "bx mdi mdi-file-excel",
        link: { name: "ExcelTable8" },
        hasPerm: () => ability.can('view', 'statistic-reports'),
        parentId: "excelTableParentMenuId",
      },
    ]
  }
];
