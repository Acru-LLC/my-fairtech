import i18n from "@/i18n";
import { ability } from "@/shared/store/ability";

export default [
  {
    id: "managementParentMenuId",
    label: i18n.t("modules.management.title"),
    icon: "mdi mdi-cog",
    code: "fair_tech",
    hasPerm: () => {
      return ability.can('view', 'departments') ||
        ability.can('view', 'users-and-employees') ||
        ability.can('view', 'outer-users-and-employees') ||
        ability.can('view', 'all-users-and-employees') ||
        ability.can('view', 'all-employees') ||
        ability.can('view', 'roles') ||
        ability.can('view', 'permissions') ||
        ability.can('view', 'department-permissions-by-department-type') ||
        ability.can('view', 'report-templates') ||
        ability.can('view', 'report-columns') ||
        ability.can('view', 'report-rows') ||
        ability.can('view', 'report-rows')
    },
    subItems: [
      {
        id: "management-1",
        label: i18n.t("submodules.organisation_structure.title"),
        icon: "mdi mdi-domain",
        link: { name: "Departments" },
        parentId: "managementParentMenuId",
        hasPerm: () => ability.can('view', 'departments')
      },
      {
        id: "management-2",
        label: i18n.t("submodules.users.inner_users_title"),
        icon: "mdi mdi-briefcase-account-outline",
        link: { name: "UsersAndEmployees" },
        parentId: "managementParentMenuId",
        hasPerm: () => ability.can('view', 'users-and-employees')
      },
      {
        id: "management-3",
        label: i18n.t("submodules.users.outer_users_title"),
        icon: "mdi mdi-briefcase-account-outline",
        link: { name: "OuterUsersAndEmployees" },
        parentId: "managementParentMenuId",
        hasPerm: () => ability.can('view', 'outer-users-and-employees')
      },
      {
        id: "management-4",
        label: i18n.t("submodules.users.all_users"),
        icon: "mdi mdi-account-multiple",
        link: { name: "AllUsersAndEmployees" },
        parentId: "managementParentMenuId",
        hasPerm: () => ability.can('view', 'all-users-and-employees')
      },
      {
        id: "management-5",
        label: i18n.t("submodules.employees.all_employees"),
        icon: "mdi mdi-account-multiple",
        link: { name: "AllEmployees" },
        parentId: "managementParentMenuId",
        hasPerm: () => ability.can('view', 'all-employees')
      },
      {
        id: "management-6",
        label: i18n.t("submodules.roles.title"),
        icon: "mdi mdi-shield-account",
        link: { name: "Roles" },
        parentId: "managementParentMenuId",
        hasPerm: () => ability.can('view', 'roles')
      },
      {
        id: "management-7",
        label: i18n.t("submodules.permissions.title"),
        icon: "mdi mdi-shield-check",
        link: { name: "Permissions" },
        parentId: "managementParentMenuId",
        hasPerm: () => ability.can('view', 'permissions')
      },
      {
        id: "management-7",
        label: i18n.t("submodules.dep_perm_types_by_dep_type.title"),
        icon: "mdi mdi-shield-check",
        link: { name: "DepartmentPermissionsByDepartmentType" },
        parentId: "managementParentMenuId",
        hasPerm: () => ability.can('view', 'department-permissions-by-department-type')
      },
      // REPORT MENU ITEMS
      {
        id: "reportParentMenuId",
        label: i18n.t("submodules.reports.title_plural"),
        icon: "mdi mdi-file-document-multiple",
        subItems: [
          {
            id: "reportTemplates",
            label: i18n.t("submodules.reports.templates"),
            icon: "mdi mdi-file-chart",
            link: { name: "ReportTemplates" },
            parentId: "reportParentMenuId",
            hasPerm: () => ability.can('view', 'report-templates')
          },
          {
            id: "reportTemplates",
            label: i18n.t("submodules.reports.templates_col"),
            icon: "bx bx bx-columns",
            link: { name: "ReportColumns" },
            parentId: "reportParentMenuId",
            hasPerm: () => ability.can('view', 'report-columns')
          },
          {
            id: "reportTemplates",
            label: i18n.t("submodules.reports.templates_row"),
            icon: "bx bx bx-table",
            link: { name: "ReportRows" },
            parentId: "reportParentMenuId",
            hasPerm: () => ability.can('view', 'report-rows')
          },
          {
            id: "reportRoles",
            label: i18n.t("reportRoles"),
            icon: "mdi mdi-shield-check",
            link: { name: "ReportRoles" },
            parentId: "reportParentMenuId",
            hasPerm: () => ability.can('view', 'report-rows')
          }
        ]
      }
    ]
  }
];
