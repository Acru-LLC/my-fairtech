import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'

export default [
  {
    id: "reestrContractorsParentMenuId",
    label: i18n.t("product_dashboard_info.menu_items.murojaat"),
    // icon: "mdi mdi-clipboard-list",
    // code: "fair_tech",
    // hasPerm: () => ability.can('view', 'natural-monopoly-reestr')
    //   || ability.can('view', 'dominant-monopoly-reestr'),
    subItems: [
      // NATURAL_MONOPOLY_REESTR
      {
        id: "natural-monopoly-reestr-contractors-id",
        label: i18n.t("product_dashboard_info.menu_items.murojaat_create"),
        // icon: "mdi mdi-briefcase-account",
        link: { name: "MurojaatCreate" },
        parentId: "reestrContractorsParentMenuId",
        // hasPerm: () => ability.can('view', 'natural-monopoly-reestr')
      },
      // DOMINANT_MONOPOLY_REESTR
      {
        id: "dominant-monopoly-reestr-contractors-id",
        label: i18n.t("product_dashboard_info.menu_items.drafts"),
        // icon: "mdi mdi-account-tie",
        link: { name: "MurojaatDraft" },
        parentId: "reestrContractorsParentMenuId",
        // hasPerm: () => ability.can('view', 'dominant-monopoly-reestr')
      },
    ]
  }
];
