import i18n from "@/i18n";
import { ability } from '@/shared/store/ability'

export default [
  {
    id: "chatMainId",
    label: i18n.t('product_dashboard_info.menu_items.settings'),
    // icon: "mdi mdi-chat",
    link: { name: "Settings" }
  }
];
