import management_menu from "@/modules/management/menuItems";
import references_menu from "@/modules/references/menuItems";
import reestr_contractors_menu from "@/modules/reestr-contractors/menuItems";
import advertisement_menu from "@/modules/advertisement/menuItems";
import letter_menu from "@/modules/letter/menuItems";
import chat_menu from "@/modules/chat/menuItems";
import excel_table from "@/modules/excel-table/menuItems";
import report_menu from "@/modules/report/menuItems";
import products_menu from "@/modules/products/menuItems"
import integration_menu from "@/modules/integration/menuItems"
import sendMessageToPhone from "@/modules/sendMessageToPhone/menuItems"
import wordTemplates from "@/modules/wordTemplates/menuItems"
import pharmMenu from "@/modules/pharm/menuItems"
import i18n from "@/i18n";
import {TokenService} from '@/shared/services/storage.service'

function copy(o) {
  return Object.assign({}, o)
}

// RUXSAT BOR MENULARNI FILTERLAB QAYTAR (EXPORT QIL)
export default [
  ...management_menu,
  ...advertisement_menu,
  ...reestr_contractors_menu,
  ...letter_menu,
  ...products_menu,
  ...report_menu,
  ...excel_table,
  ...integration_menu,
  ...references_menu,
  ...chat_menu,
  ...sendMessageToPhone,
  ...wordTemplates,
  ...pharmMenu,
  {
    id: "ProjectLessons1",
    label: i18n.t("modules.management.project_lessons.title"),
    icon: "mdi mdi-video",
    code: "fair_tech",
    link: { name: "ProjectLessons" },
    parentId: "reportParentMenuId",
    hasPerm: () => !TokenService.getIsOuter()
  },

  // ...fire_price_menu,
].map(copy).filter(function f(o) {
  if ('hasPerm' in o) {
    if (o.hasPerm()) {
      if (o.subItems) {
        o.subItems = o.subItems.map(copy).filter(f)
        return o.subItems.length
      } else {
        return true
      }
    } else {
      return false
    }
  } else {
    if (o.subItems) {
      o.subItems = o.subItems.map(copy).filter(f)
      return o.subItems.length
    } else {
      return true
    }
  }
})
