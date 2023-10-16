import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'
import projects_menu from "@/modules/projects/menuItems"
import MenuBadgeComponent from "@/modules/letter/MenuBadgeComponent.vue";

export default [
  {
    id: "letterParentMenuId",
    label: i18n.t("product_dashboard_info.menu_items.other_services"),
    // icon: "mdi mdi-rename-box",
    link:{name: "OtherServices"}
  }
];
