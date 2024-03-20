import price_menu from "@/modules/price/menuItems";
import reporting_menu from "@/modules/reporting/menuItems";

function copy(o) {
  return Object.assign({}, o)
}

// RUXSAT BOR MENULARNI FILTERLAB QAYTAR (EXPORT QIL)
export default [
  ...price_menu,
  // ...reporting_menu
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
