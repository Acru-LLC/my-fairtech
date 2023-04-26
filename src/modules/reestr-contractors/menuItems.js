import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'

export default [
  {
    id: "reestrContractorsParentMenuId",
    label: i18n.t("submodules.reestr.title"),
    icon: "mdi mdi-clipboard-list",
    code: "fair_tech",
    hasPerm: () => ability.can('view', 'natural-monopoly-reestr')
      || ability.can('view', 'dominant-monopoly-reestr'),
    subItems: [
      // NATURAL_MONOPOLY_REESTR
      {
        id: "natural-monopoly-reestr-contractors-id",
        label: i18n.t("submodules.reestr_contractors.natural_reestr_title"),
        icon: "mdi mdi-briefcase-account",
        link: { name: "NaturalReestrContractors" },
        parentId: "reestrContractorsParentMenuId",
        hasPerm: () => ability.can('view', 'natural-monopoly-reestr')
      },
      // DOMINANT_MONOPOLY_REESTR
      {
        id: "dominant-monopoly-reestr-contractors-id",
        label: i18n.t("submodules.reestr_contractors.dominant_reestr_title"),
        icon: "mdi mdi-account-tie",
        link: { name: "DominantReestrContractors" },
        parentId: "reestrContractorsParentMenuId",
        hasPerm: () => ability.can('view', 'dominant-monopoly-reestr')
      },
    ]
  }
];