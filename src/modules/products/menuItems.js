import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'
import petrol_stations_menu from "@/modules/products/petrol-stations/menuItems"

export default [
  {
    id: "productsParentMenuId",
    label: i18n.t("product_dashboard_info.menu_items.settings"),
    // icon: "mdi mdi-cart-variant",
    link:{name: "Settings"}
  }
];
