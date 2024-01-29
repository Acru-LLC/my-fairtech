import main_menu from "@/modules/management/menuItems";
import documents_menu from "@/modules/advertisement/menuItems";
import murojaat_menu from "@/modules/reestr-contractors/menuItems";
import interactive_services from "@/modules/integration/menuItems";
import settings_menu from "@/modules/chat/menuItems";
import price_menu from "@/modules/price/menuItems";

function copy(o) {
  return Object.assign({}, o)
}

// RUXSAT BOR MENULARNI FILTERLAB QAYTAR (EXPORT QIL)
export default [
  ...main_menu,
  ...documents_menu,
  ...murojaat_menu,
  ...interactive_services,
  ...settings_menu,
  ...price_menu
  // {
  //   id: "ProjectLessons1",
  //   label: i18n.t("modules.management.project_lessons.title"),
  //   icon: "mdi mdi-video",
  //   code: "fair_tech",
  //   link: { name: "ProjectLessons" },
  //   parentId: "reportParentMenuId",
  //   hasPerm: () => !TokenService.getIsOuter()
  // },

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
