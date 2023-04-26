import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'
import projects_menu from "@/modules/projects/menuItems"
import MenuBadgeComponent from "@/modules/letter/MenuBadgeComponent.vue";

export default [
  {
    id: "letterParentMenuId",
    label: i18n.t("submodules.application_before_commission.title"),
    icon: "mdi mdi-rename-box",
    code: "fair_tech",
    hasPerm: () => ability.can('view', 'projects') ||
      ability.can('view', 'commission-projects') ||
      ability.can('view', 'application-monitor') ||
      ability.can('view', 'letter-create') ||
      ability.can('view', 'letter-visa') ||
      ability.can('view', 'letter-income') ||
      ability.can('view', 'letter-sent'),
    subItems: [
      {
        id: "letterParentMenuId",
        label: i18n.t("submodules.application_before_commission.application"),
        icon: "mdi mdi-text-box-multiple",
        hasPerm: () => ability.can('view', 'application-monitor') ||
          ability.can('view', 'letter-create') ||
          ability.can('view', 'letter-visa') ||
          ability.can('view', 'letter-income') ||
          ability.can('view', 'letter-sent'),
        subItems: [
          // MONITOR
          {
            id: "letter-monitor",
            label: i18n.t('submodules.commission.monitor'),
            icon: "mdi mdi-file-document-multiple",
            badge: {
              component: () => MenuBadgeComponent,
              params: 'monitor',
              variant: 'success',
            },
            link: { name: "LetterMonitor" },
            parentId: "letterParentMenuId",
            hasPerm: () => ability.can('view', 'application-monitor')
          },
          // CREATE
          {
            id: "letter-create",
            label: i18n.t('submodules.doc.work_with_doc'),
            icon: "mdi mdi-file-document-multiple",
            link: { name: "LetterCreate" },
            badge: {
              component: () => MenuBadgeComponent,
              params: 'create',
              variant: 'success',
            },
            parentId: "letterParentMenuId",
            hasPerm: () => ability.can('view', 'letter-create')
          },
          // VISA
          {
            id: "letter-visa",
            label: i18n.t('submodules.dxa.visa'),
            icon: "mdi mdi-file-document-multiple",
            link: { name: "LetterVisa" },
            badge: {
              component: () => MenuBadgeComponent,
              params: 'visa',
              variant: 'success',
            },
            parentId: "letterParentMenuId",
            hasPerm: () => ability.can('view', 'letter-visa')
          },
          // INCOME
          {
            id: "letter-income",
            label: i18n.t('submodules.reports.report_income'),
            icon: "mdi mdi-file-document-multiple",
            link: { name: "LetterIncome" },
            badge: {
              component: () => MenuBadgeComponent,
              params: 'income',
              variant: 'success',
            },
            parentId: "letterParentMenuId",
            hasPerm: () => ability.can('view', 'letter-income')
          },
          // SENT
          {
            id: "letter-sent",
            label: i18n.t('submodules.reports.report_sended'),
            icon: "mdi mdi-file-document-multiple",
            link: { name: "LetterSent" },
            badge: {
              component: () => MenuBadgeComponent,
              params: 'sent',
              variant: 'success',
            },
            parentId: "letterParentMenuId",
            hasPerm: () => ability.can('view', 'letter-sent')
          },
        ]
      },
      ...projects_menu
    ]
  }
];
